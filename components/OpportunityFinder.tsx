"use client";

// The opportunity finder (July 2026): the ScholarshipFinder pattern applied
// to internships, fellowships, research, and programs — type chips + stage
// chips + citizenship toggle + fuzzy search (lib/fuzzy, house rule), with
// academic-year ordering and no Date() so server and client agree. Deep-
// linkable via ?type= / ?stage= / ?undoc=1 / ?q= (audience doors + subnav),
// applied on mount and on client-side param changes.

import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { fuzzyScore } from "@/lib/fuzzy";
import {
  opportunities,
  OPPS_VERIFIED_AS_OF,
  TYPE_LABELS,
  type Opportunity,
  type OpportunityType,
  type OppStage,
} from "@/lib/opportunities";

const STAGE_LABELS: Record<OppStage, string> = {
  "high-school": "High school",
  college: "In college",
  transfer: "Transferring",
};

const TYPE_VALUES: (OpportunityType | "all")[] = [
  "all",
  "internship",
  "fellowship",
  "research",
  "program",
];
const STAGE_VALUES: (OppStage | "all")[] = [
  "all",
  "high-school",
  "college",
  "transfer",
];

/** August-first ordering: month 8 sorts 0, July sorts 11, rolling sinks. */
function seasonKey(o: Opportunity): number {
  if (o.deadlineMonth === null) return 99;
  return (o.deadlineMonth - 8 + 12) % 12;
}

export default function OpportunityFinder() {
  const searchParams = useSearchParams();
  const [type, setType] = useState<OpportunityType | "all">("all");
  const [stage, setStage] = useState<OppStage | "all">("all");
  const [undocOnly, setUndocOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(30);

  useEffect(() => {
    const t = searchParams.get("type");
    if (t && TYPE_VALUES.includes(t as OpportunityType | "all")) {
      setType(t as OpportunityType | "all");
    }
    const s = searchParams.get("stage");
    if (s && STAGE_VALUES.includes(s as OppStage | "all")) {
      setStage(s as OppStage | "all");
    }
    if (searchParams.get("undoc") === "1") setUndocOnly(true);
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    setVisible(30);
  }, [type, stage, undocOnly, query]);

  const results = useMemo(() => {
    let list = [...opportunities].sort((a, b) => seasonKey(a) - seasonKey(b));
    if (type !== "all") list = list.filter((o) => o.type === type);
    if (stage !== "all") list = list.filter((o) => o.stages.includes(stage));
    if (undocOnly) list = list.filter((o) => o.openToUndocumented);
    const q = query.trim();
    if (q) {
      list = list
        .map((o) => ({
          o,
          score: fuzzyScore(
            q,
            `${o.name} ${o.who} ${o.compensation} ${TYPE_LABELS[o.type]} ${(o.tags ?? []).join(" ")}`
          ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.o);
    }
    return list;
  }, [type, stage, undocOnly, query]);

  return (
    <div>
      {/* Type chips */}
      <div className="flex flex-wrap items-center gap-2">
        {TYPE_VALUES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            aria-pressed={type === value}
            className={`rounded-md border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
              type === value
                ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
            }`}
          >
            {value === "all"
              ? "All types"
              : value === "research"
                ? "Research"
                : `${TYPE_LABELS[value]}s`}
          </button>
        ))}
      </div>

      {/* Stage chips + citizenship toggle */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {STAGE_VALUES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStage(value)}
            aria-pressed={stage === value}
            className={`rounded-md border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
              stage === value
                ? "border-ink bg-forest text-cream shadow-[2px_2px_0_#11211c]"
                : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
            }`}
          >
            {value === "all" ? "Any stage" : STAGE_LABELS[value]}
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
        placeholder="Search: paid research, coding, media, policy, summer…"
        className="mt-4 w-full rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />

      <p className="mt-3 text-sm font-medium text-stone">
        {results.length} of {opportunities.length} opportunities
        {type !== "all" && ` · ${type === "research" ? "Research" : TYPE_LABELS[type as OpportunityType] + "s"}`}
        {stage !== "all" && ` · ${STAGE_LABELS[stage as OppStage]}`}
        {undocOnly && " · no citizenship requirement"} — ordered by where
        they fall in the school year.
      </p>

      {/* Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.slice(0, visible).map((o) => (
          <a
            key={o.id}
            href={o.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-sm font-bold text-terracotta">
                {o.deadline}
              </p>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                  {TYPE_LABELS[o.type]}
                </span>
                {o.openToUndocumented && (
                  <span className="rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                    No citizenship req.
                  </span>
                )}
              </span>
            </div>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
              {o.name}
            </h3>
            <p className="mt-1 font-display text-base font-bold text-forest">
              {o.compensation}
            </p>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
              {o.who}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              {o.stages.map((st) => (
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
          Nothing matches those filters — widen the search. And remember your
          campus has its own layer nobody's database lists: career centers,
          department research openings, and professors who say yes to a good
          email.
        </p>
      )}

      <p className="mt-8 rounded-xl border border-sand bg-cream p-4 text-sm leading-6 text-stone">
        Every entry checked by hand against the program&apos;s official site
        by Shinjoo, Empower&apos;s founder — verified {OPPS_VERIFIED_AS_OF}.
        Cycles and stipends shift a little each year, so confirm on the
        official page before you plan around one. We never list programs
        that charge to attend or exist to harvest your resume. Know a real
        one we&apos;re missing? Email{" "}
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
