"use client";

// The scholarship finder (July 2026): filter the curated list by stage,
// citizenship-openness, and a fuzzy search box (lib/fuzzy, house rule).
// Ordering is the ACADEMIC year (August first), so the list reads like the
// application season actually unfolds — no Date() involved, so the server
// render and every client agree.

import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { fuzzyScore } from "@/lib/fuzzy";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
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

/** August-first ordering: month 8 sorts 0, July sorts 11, varies sinks. */
function seasonKey(s: Scholarship): number {
  if (s.deadlineMonth === null) return 99;
  return (s.deadlineMonth - 8 + 12) % 12;
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

  // Audience doors (hero links + subnav) deep-link with ?stage / ?undoc / ?q
  // — applied on mount and on every client-side param change.
  useEffect(() => {
    const s = searchParams.get("stage");
    if (s && STAGE_VALUES.includes(s as StudentStage | "all")) {
      setStage(s as StudentStage | "all");
    }
    if (searchParams.get("undoc") === "1") setUndocOnly(true);
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    let list = [...scholarships].sort((a, b) => seasonKey(a) - seasonKey(b));
    if (stage !== "all") list = list.filter((s) => s.stages.includes(stage));
    if (undocOnly) list = list.filter((s) => s.openToUndocumented);
    const q = query.trim();
    if (q) {
      list = list
        .map((s) => ({
          s,
          score: fuzzyScore(q, `${s.name} ${s.who} ${s.amount}`),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.s);
    }
    return list;
  }, [stage, undocOnly, query]);

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
            onClick={() => setStage(value)}
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

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search: transfer, computer science, undocumented, essay…"
        className="mt-4 w-full rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />

      <p className="mt-3 text-sm font-medium text-stone">
        {results.length} of {scholarships.length} scholarships
        {stage !== "all" && ` · ${STAGE_LABELS[stage as StudentStage]}`}
        {undocOnly && " · no citizenship requirement"} — ordered by where
        they fall in the school year.
      </p>

      {/* Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((s) => (
          <a
            key={s.id}
            href={s.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-sm font-bold text-terracotta">
                {s.deadline}
              </p>
              {s.openToUndocumented && (
                <span className="shrink-0 rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                  No citizenship req.
                </span>
              )}
            </div>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
              {s.name}
            </h3>
            <p className="mt-1 font-display text-base font-bold text-forest">
              {s.amount}
            </p>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
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
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-forest">
                Official site
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </p>
          </a>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-6 text-base leading-7 text-stone">
          Nothing matches those filters. Widen the search — and remember this
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
        site by Shinjoo, Empower&apos;s founder — verified {VERIFIED_AS_OF}. Exact dates and amounts shift a little each year, so
        always confirm on the official page before you plan around one —
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
