"use client";

// The scholarship finder (July 2026): filter the curated list by stage,
// citizenship-openness, and a fuzzy search box (lib/fuzzy, house rule).
//
// DEADLINE AWARENESS (July 17, owner: "include deadlines, and don't show
// any with deadlines that are already closed — show them greyed out with
// when applications open again"): month granularity is all the data has,
// so the honest model is cycles. An award is IN SEASON when its next
// deadline is within 6 months (windows open a few months ahead); 7-11
// months out means this year's cycle just closed — those grey out, sink
// below the open ones, and name the next cycle's typical deadline month
// + year. The clock arrives POST-MOUNT (nowMonth state), so the server
// render (season order, nothing greyed) and the client's first paint
// still agree — same hydration discipline as the rest of the site.

import { useEffect, useMemo, useState } from "react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";
import { fuzzyScore } from "@/lib/fuzzy";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import { readContext, scholarshipDefault } from "@/lib/personalization";
import {
  scholarships,
  VERIFIED_AS_OF,
  type Scholarship,
  type StudentStage,
} from "@/lib/scholarships";

const STAGE_LABELS: Record<StudentStage, string> = {
  "high-school": "High school",
  college: "In college",
  transfer: "Transferring",
};

/** August-first ordering: month 8 sorts 0, July sorts 11, varies sinks.
 *  (Pre-mount order only — once the clock arrives, deadline proximity
 *  takes over.) */
function seasonKey(s: Scholarship): number {
  if (s.deadlineMonth === null) return 99;
  return (s.deadlineMonth - 8 + 12) % 12;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

/** Months until the next occurrence of the deadline month (0 = this
 *  month); null for rolling/varies. */
function monthsUntil(s: Scholarship, nowMonth: number): number | null {
  if (s.deadlineMonth === null) return null;
  return (s.deadlineMonth - nowMonth + 12) % 12;
}

/** Closed for this cycle: the deadline passed 1-5 months ago (next one is
 *  7-11 months out). Within 6 months counts as in season. */
function isClosedCycle(s: Scholarship, nowMonth: number | null): boolean {
  if (nowMonth === null) return false;
  const until = monthsUntil(s, nowMonth);
  return until !== null && until >= 7;
}

/** Largest dollar figure in the display amount, for amount sorting.
 *  "Full tuition/ride" outranks any number; no figure at all sinks. */
function amountValue(s: Scholarship): number {
  if (/full\s+(tuition|ride|cost)/i.test(s.amount)) return 10_000_000;
  const nums = [...s.amount.matchAll(/\$([\d,]+)/g)].map((m) =>
    parseInt(m[1].replace(/,/g, ""), 10)
  );
  return nums.length ? Math.max(...nums) : 0;
}

type SortKey = "deadline" | "amount" | "name";

/** "January 2027" for the next occurrence of the deadline month. */
function nextDeadlineLabel(s: Scholarship, nowMonth: number, nowYear: number): string {
  const until = monthsUntil(s, nowMonth);
  if (until === null || s.deadlineMonth === null) return s.deadline;
  const year = s.deadlineMonth >= nowMonth ? nowYear : nowYear + 1;
  return `${MONTH_NAMES[s.deadlineMonth - 1]} ${year}`;
}

const STAGE_VALUES: (StudentStage | "all")[] = [
  "all",
  "high-school",
  "college",
  "transfer",
];

export default function ScholarshipFinder() {
  const frame = useFrame();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<StudentStage | "all">("all");
  const [undocOnly, setUndocOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(30);
  // The clock, post-mount (see the header comment).
  const [now, setNow] = useState<{ m: number; y: number } | null>(null);
  useEffect(() => {
    const d = new Date();
    setNow({ m: d.getMonth() + 1, y: d.getFullYear() });
  }, []);
  // When the opening stage came from the person's profile, we say so (subtle,
  // editable) — never a claim of confirmed eligibility, just where we started.
  const [autoNote, setAutoNote] = useState("");
  const [sort, setSort] = useState<SortKey>("deadline");

  // Audience doors (hero links + subnav) deep-link with ?stage / ?undoc / ?q
  // — applied on mount and on every client-side param change.
  useEffect(() => {
    const s = searchParams.get("stage");
    if (s && STAGE_VALUES.includes(s as StudentStage | "all")) {
      setStage(s as StudentStage | "all");
      setAutoNote(""); // an explicit deep-link is a manual choice, not a guess
    }
    if (searchParams.get("undoc") === "1") setUndocOnly(true);
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  // Profile-based default (mount-once). Skipped when the URL already names a
  // stage (that intent wins) — otherwise start where the person's normalized
  // profile points, with an editable "Started with X" note.
  useEffect(() => {
    if (searchParams.get("stage")) return;
    const { stage: guess, reason } = scholarshipDefault(readContext());
    if (guess) {
      setStage(guess);
      setAutoNote(`Started with ${STAGE_LABELS[guess]} because ${reason}.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any manual stage pick clears the profile note.
  function pickStage(next: StudentStage | "all") {
    setStage(next);
    setAutoNote("");
  }

  useEffect(() => {
    setVisible(30);
  }, [stage, undocOnly, query, sort]);

  const { open, closed } = useMemo(() => {
    let list = [...scholarships].sort((a, b) => seasonKey(a) - seasonKey(b));
    if (stage !== "all") list = list.filter((s) => s.stages.includes(stage));
    if (undocOnly) list = list.filter((s) => s.openToUndocumented);
    const q = query.trim();
    if (q) {
      list = list
        .map((s) => ({
          s,
          score: fuzzyScore(q, `${s.name} ${s.who} ${s.amount} ${(s.tags ?? []).join(" ")}`),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.s);
    }
    if (now === null) return { open: list, closed: [] as Scholarship[] };
    // The open/closed partition ALWAYS holds; the chosen sort applies
    // within each side. Deadline sort: soonest first (rolling floats
    // mid-list at 6.5), search keeping relevance order. An explicit
    // amount/name sort overrides relevance — the person asked for it.
    const bySort = (a: Scholarship, b: Scholarship): number => {
      if (sort === "amount") return amountValue(b) - amountValue(a);
      if (sort === "name") return a.name.localeCompare(b.name);
      const ua = monthsUntil(a, now.m) ?? 6.5;
      const ub = monthsUntil(b, now.m) ?? 6.5;
      return ua - ub;
    };
    const openList = list.filter((s) => !isClosedCycle(s, now.m));
    if (sort !== "deadline" || !q) openList.sort(bySort);
    const closedList = list
      .filter((s) => isClosedCycle(s, now.m))
      .sort(
        sort === "deadline"
          ? (a, b) => (monthsUntil(a, now.m) ?? 99) - (monthsUntil(b, now.m) ?? 99)
          : bySort
      );
    return { open: openList, closed: closedList };
  }, [stage, undocOnly, query, now, sort]);
  const results = useMemo(() => [...open, ...closed], [open, closed]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["all", "All"],
            ["high-school", STAGE_LABELS["high-school"]],
            ["college", STAGE_LABELS.college],
            ["transfer", STAGE_LABELS.transfer],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => pickStage(value)}
            aria-pressed={stage === value}
            className={`rounded-md border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
              stage === value
                ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
        <label className="ml-1 flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={undocOnly}
            onChange={(e) => setUndocOnly(e.target.checked)}
            className="h-4 w-4 accent-forest"
          />
          No citizenship requirement
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: transfer, computer science, undocumented, essay…"
          className="w-full flex-1 rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <label className="flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border-2 border-ink/15 bg-cream px-3 py-2.5 text-base font-semibold text-ink focus:border-ink focus:outline-none"
          >
            <option value="deadline">Next deadline</option>
            <option value="amount">Biggest amount</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>

      <p className="mt-3 text-sm font-medium text-stone">
        {now === null ? (
          <>
            {results.length} of {scholarships.length} scholarships
            {stage !== "all" && ` · ${STAGE_LABELS[stage as StudentStage]}`}
            {undocOnly && " · no citizenship requirement"}
          </>
        ) : (
          <>
            {open.length} open now
            {closed.length > 0 &&
              ` · ${closed.length} between cycles (greyed, at the end)`}
            {stage !== "all" && ` · ${STAGE_LABELS[stage as StudentStage]}`}
            {undocOnly && " · no citizenship requirement"}
          </>
        )}
        {sort === "deadline"
          ? ", ordered by next deadline."
          : sort === "amount"
            ? ", biggest amounts first (full rides on top, unlisted amounts last)."
            : ", alphabetical."}
      </p>

      {autoNote && (
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-forest">
          <span className="font-semibold">{autoNote}</span>
          <button
            type="button"
            onClick={() => pickStage("all")}
            className="font-semibold underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Show all
          </button>
        </p>
      )}

      {/* Cards — open cycles first, closed cycles greyed at the end */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.slice(0, visible).map((s) => {
          const closedCycle = now !== null && isClosedCycle(s, now.m);
          const until = now === null ? null : monthsUntil(s, now.m);
          const thisMonth = until === 0;
          return (
            <a
              key={s.id}
              href={s.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                closedCycle
                  ? "group flex h-full flex-col rounded-xl border-2 border-sand bg-cream/50 p-5 opacity-75 transition-opacity hover:opacity-100"
                  : "card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
              }
            >
              <div className="flex items-start justify-between gap-3">
                {closedCycle && now !== null ? (
                  <p className="text-sm font-bold text-stone">
                    Closed for this cycle · reopens ahead of{" "}
                    {nextDeadlineLabel(s, now.m, now.y)}
                  </p>
                ) : (
                  <p className="font-display text-sm font-bold text-terracotta">
                    {now !== null && s.deadlineMonth !== null
                      ? `Deadline: typically ${nextDeadlineLabel(s, now.m, now.y)}`
                      : s.deadline}
                    {thisMonth && (
                      <span className="ml-2 rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                        This month
                      </span>
                    )}
                  </p>
                )}
                {s.openToUndocumented && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      closedCycle ? "bg-stone/30 text-ink/60" : "bg-forest text-cream"
                    }`}
                  >
                    No citizenship req.
                  </span>
                )}
              </div>
              <h3
                className={`mt-1.5 font-display text-lg font-bold leading-snug ${
                  closedCycle
                    ? "text-ink/60"
                    : "text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4"
                }`}
              >
                {s.name}
              </h3>
              <p
                className={`mt-1 font-display text-base font-bold ${
                  closedCycle ? "text-stone" : "text-forest"
                }`}
              >
                {s.amount}
              </p>
              <p className={`mt-1.5 flex-1 text-sm leading-6 ${closedCycle ? "text-stone/80" : "text-stone"}`}>
                {s.who}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                {s.stages.map((st) => (
                  <span
                    key={st}
                    className="text-[11px] font-bold uppercase tracking-wide text-ink/50"
                  >
                    {STAGE_LABELS[st]}
                  </span>
                ))}
                <span
                  className={`ml-auto inline-flex items-center gap-1 text-sm font-semibold ${
                    closedCycle ? "text-stone" : "text-forest"
                  }`}
                >
                  Official site
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </p>
            </a>
          );
        })}
      </div>

      {results.length > visible && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 30)}
            className="btn-ink inline-flex items-center rounded-md bg-cream px-6 py-2.5 text-sm font-bold text-ink"
          >
            Show {Math.min(30, results.length - visible)} more
          </button>
        </div>
      )}

      {results.length === 0 && (
        <p className="mt-6 text-base leading-7 text-stone">
          Nothing matches those filters. Widen the search, and remember this
          list is a curated starting lineup, not the whole universe:{" "}
          <a
            href={frameHref("/learn/college/finding-scholarships", frame)}
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Finding Scholarships You&apos;ll Actually Win
          </a>{" "}
          covers how to dig further.
        </p>
      )}

      <p className="mt-8 rounded-xl border border-sand bg-cream p-4 text-sm leading-6 text-stone">
        Every entry checked by hand against the program&apos;s official
        site by Shinjoo, Empower&apos;s founder, and verified {VERIFIED_AS_OF}. Exact dates and amounts shift a little each year, so
        always confirm on the official page before you plan around one;
        that&apos;s where the link on each card goes. We never list
        scholarships that charge fees or exist to harvest your data. Run a
        real scholarship we should include? Email{" "}
        <a
          href="mailto:scholarships@economicmobilityproject.org"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          scholarships@economicmobilityproject.org
        </a>
        .
      </p>
    </div>
  );
}
