"use client";

// Career Explorer. Facts only, no rankings. The catalog is intentionally
// paged so hundreds of useful careers remain fast to browse.

import { useMemo, useState } from "react";
import Link from "next/link";
import { HandCoins, CaretDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { fuzzyScore, normalize } from "@/lib/fuzzy";
import {
  careers,
  careerPayLabel,
  careerPayPeriod,
  growthLabel,
  CAREER_DATA_VINTAGE,
  FIELD_LABELS,
  EDUCATION_LABELS,
  type CareerField,
} from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";
import { CAREER_SEARCH_TERMS } from "@/lib/careerSearchTerms";
import CareerSaveButton from "@/components/CareerSaveButton";
import CareerSavedTray from "@/components/CareerSavedTray";
import { trackCareerEvent } from "@/lib/careerAnalytics";

type EduFilter = "all" | "nodegree" | "certificate" | "associate" | "bachelor";
type PayFilter = "all" | "under50" | "50to80" | "80to120" | "over120" | "hourly";
type GrowthFilter = "all" | "fast" | "steady" | "shrinking";
type Sort = "openings" | "pay" | "growth" | "az";

const FIELD_IDS = Object.keys(FIELD_LABELS) as CareerField[];
const SHOW_STEP = 48;

const usd = (n: number) => `$${n.toLocaleString()}`;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border-2 px-3 py-1.5 text-[13px] font-bold transition-colors ${
        active
          ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
          : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function CareerExplorer() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState<CareerField | "all">("all");
  const [edu, setEdu] = useState<EduFilter>("all");
  const [pay, setPay] = useState<PayFilter>("all");
  const [growthF, setGrowthF] = useState<GrowthFilter>("all");
  const [earnOnly, setEarnOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("openings");
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(SHOW_STEP);

  const results = useMemo(() => {
    let list = [...careers];
    if (field !== "all") list = list.filter((c) => c.field === field);
    if (edu === "nodegree")
      list = list.filter((c) =>
        ["none", "hs", "some-college"].includes(c.education)
      );
    if (edu === "certificate") list = list.filter((c) => c.education === "certificate");
    if (edu === "associate") list = list.filter((c) => c.education === "associate");
    if (edu === "bachelor")
      list = list.filter((c) =>
        ["bachelor", "master", "doctoral"].includes(c.education)
      );
    if (pay === "under50")
      list = list.filter((c) => c.medianPay != null && c.medianPay < 50000);
    if (pay === "50to80")
      list = list.filter(
        (c) => c.medianPay != null && c.medianPay >= 50000 && c.medianPay < 80000
      );
    if (pay === "80to120")
      list = list.filter(
        (c) => c.medianPay != null && c.medianPay >= 80000 && c.medianPay < 120000
      );
    if (pay === "over120")
      list = list.filter((c) => c.medianPay != null && c.medianPay >= 120000);
    if (pay === "hourly")
      list = list.filter((c) => c.medianPay == null && c.medianHourlyPay != null);
    if (growthF === "fast") list = list.filter((c) => c.growth >= 9);
    if (growthF === "steady") list = list.filter((c) => c.growth >= 2 && c.growth < 9);
    if (growthF === "shrinking") list = list.filter((c) => c.growth < 2);
    if (earnOnly) list = list.filter((c) => c.earnWhileTraining);

    const q = query.trim();
    if (q) {
      const normalizedQuery = normalize(q).trim();
      const matched = list
        .map((c) => {
          const d = getCareerDetail(c.id);
          const normalizedTitle = normalize(c.title).trim();
          const titleMatch =
            ` ${normalizedTitle} `.includes(` ${normalizedQuery} `) ||
            (!normalizedQuery.includes(" ") &&
              normalizedTitle.split(/\s+/).some((word) => word.startsWith(normalizedQuery)));
          return {
            c,
            score:
              (titleMatch ? 2 : 0) +
              fuzzyScore(
                q,
                `${c.title} ${FIELD_LABELS[c.field]} ${c.trainingNote} ${c.note} ${
                d?.whatTheyDo ?? ""
              } ${d?.skills.join(" ") ?? ""} ${CAREER_SEARCH_TERMS[c.id] ?? ""}`
              ),
          };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);
      const titleMatches = matched.filter((result) => result.score >= 2);
      return (titleMatches.length > 0 ? titleMatches : matched).map((result) => result.c);
    }

    if (sort === "openings")
      list.sort(
        (a, b) =>
          (getCareerDetail(b.id)?.annualOpenings ?? -1) -
          (getCareerDetail(a.id)?.annualOpenings ?? -1)
      );
    if (sort === "pay")
      list.sort((a, b) => (b.medianPay ?? -1) - (a.medianPay ?? -1));
    if (sort === "growth") list.sort((a, b) => b.growth - a.growth);
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, field, edu, pay, growthF, earnOnly, sort]);

  const visibleResults = results.slice(0, visibleCount);
  const hasActiveFilters =
    query.trim() !== "" ||
    field !== "all" ||
    edu !== "all" ||
    pay !== "all" ||
    growthF !== "all" ||
    earnOnly;
  const activeFilterCount = [
    field !== "all",
    edu !== "all",
    pay !== "all",
    growthF !== "all",
    earnOnly,
  ].filter(Boolean).length;
  const resultCountBand = results.length < 10
    ? "under_10"
    : results.length < 50
      ? "10_49"
      : results.length < 200
        ? "50_199"
        : "200_plus";

  function clearFilters() {
    setQuery("");
    setField("all");
    setEdu("all");
    setPay("all");
    setGrowthF("all");
    setEarnOnly(false);
    setVisibleCount(SHOW_STEP);
  }

  return (
    <div>
      <div className="space-y-3">
        <label htmlFor="career-search" className="sr-only">
          Search careers
        </label>
        <input
          id="career-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: nurse, electrician, “no degree”, coding…"
          className="w-full rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />

        {/* The audience-defining filter, first and loudest */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEarnOnly(!earnOnly)}
            aria-pressed={earnOnly}
            className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3.5 py-2 text-sm font-bold transition-colors ${
              earnOnly
                ? "border-ink bg-forest text-cream shadow-[2px_2px_0_#11211c]"
                : "border-forest/40 bg-forest/[0.06] text-forest hover:border-forest"
            }`}
          >
            <HandCoins className="h-4 w-4" weight="bold" />
            Earn while you train
          </button>
          <span className="text-[13px] text-stone">
            paid apprenticeships, academies, and employer-funded training only
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Field
          </span>
          {FIELD_IDS.map((f) => (
            <Chip key={f} active={field === f} onClick={() => setField(field === f ? "all" : f)}>
              {FIELD_LABELS[f]}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Training
          </span>
          <Chip active={edu === "nodegree"} onClick={() => setEdu(edu === "nodegree" ? "all" : "nodegree")}>No degree needed</Chip>
          <Chip active={edu === "certificate"} onClick={() => setEdu(edu === "certificate" ? "all" : "certificate")}>Certificate</Chip>
          <Chip active={edu === "associate"} onClick={() => setEdu(edu === "associate" ? "all" : "associate")}>Associate degree</Chip>
          <Chip active={edu === "bachelor"} onClick={() => setEdu(edu === "bachelor" ? "all" : "bachelor")}>Bachelor&apos;s and up</Chip>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Pay
          </span>
          <Chip active={pay === "under50"} onClick={() => setPay(pay === "under50" ? "all" : "under50")}>Under $50k</Chip>
          <Chip active={pay === "50to80"} onClick={() => setPay(pay === "50to80" ? "all" : "50to80")}>$50–80k</Chip>
          <Chip active={pay === "80to120"} onClick={() => setPay(pay === "80to120" ? "all" : "80to120")}>$80–120k</Chip>
          <Chip active={pay === "over120"} onClick={() => setPay(pay === "over120" ? "all" : "over120")}>$120k+</Chip>
          <Chip active={pay === "hourly"} onClick={() => setPay(pay === "hourly" ? "all" : "hourly")}>Hourly-only</Chip>
          <span className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Outlook
          </span>
          <Chip active={growthF === "fast"} onClick={() => setGrowthF(growthF === "fast" ? "all" : "fast")}>Growing fast</Chip>
          <Chip active={growthF === "steady"} onClick={() => setGrowthF(growthF === "steady" ? "all" : "steady")}>Steady</Chip>
          <Chip active={growthF === "shrinking"} onClick={() => setGrowthF(growthF === "shrinking" ? "all" : "shrinking")}>Flat or shrinking</Chip>
          <span className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Sort
          </span>
          <Chip active={sort === "openings"} onClick={() => setSort("openings")}>Annual openings</Chip>
          <Chip active={sort === "pay"} onClick={() => setSort("pay")}>Pay</Chip>
          <Chip active={sort === "growth"} onClick={() => setSort("growth")}>Growth</Chip>
          <Chip active={sort === "az"} onClick={() => setSort("az")}>A–Z</Chip>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Clear all filters
          </button>
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-stone" aria-live="polite">
        {results.length} of {careers.length} careers · {CAREER_DATA_VINTAGE}.
        Median means half earn more, half less — your city and experience move
        it a lot.
      </p>

      <CareerSavedTray />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visibleResults.map((c) => {
          const d = getCareerDetail(c.id);
          const hasAnnualRange = d?.payLow != null && d?.payHigh != null;
          const hasHourlyRange =
            !hasAnnualRange && d?.hourlyPayLow != null && d?.hourlyPayHigh != null;
          const open = openId === c.id;
          return (
            <div key={c.id} className="card-ink flex flex-col rounded-2xl bg-cream p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-medium text-stone">
                    {FIELD_LABELS[c.field]}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold tabular-nums text-forest">
                    {careerPayLabel(c)}
                  </div>
                  <div className="text-[11px] font-semibold text-stone">
                    {careerPayPeriod(c)}
                  </div>
                  {c.medianPay != null && d?.hourlyMedian != null && (
                    <div className="mt-0.5 text-[11px] font-semibold tabular-nums text-stone">
                      ${d.hourlyMedian.toFixed(2)}/hour
                    </div>
                  )}
                </div>
              </div>

              {(hasAnnualRange || hasHourlyRange) && (
                <p className="mt-2 text-[13px] font-semibold text-ink/75">
                  Most earn{" "}
                  <span className="tabular-nums">
                    {hasAnnualRange
                      ? `${usd(d!.payLow!)}–${usd(d!.payHigh!)}`
                      : `$${d!.hourlyPayLow!.toFixed(2)}–$${d!.hourlyPayHigh!.toFixed(2)}/hour`}
                  </span>{" "}
                  <span className="font-medium text-stone">
                    (10th–90th percentile)
                  </span>
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-bold text-ink/70">
                  {EDUCATION_LABELS[c.education]}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    c.growth >= 9
                      ? "bg-forest/10 text-forest"
                      : c.growth < 2
                        ? "bg-terracotta/10 text-terracotta"
                        : "bg-ink/[0.06] text-ink/70"
                  }`}
                >
                  {c.growth > 0 ? "+" : ""}
                  {c.growth}% by 2034 · {growthLabel(c.growth)}
                </span>
                {c.earnWhileTraining && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
                    <HandCoins className="h-3 w-3" weight="bold" />
                    Earn while you train
                  </span>
                )}
              </div>

              <p className="mt-2.5 text-[13px] font-medium text-stone">
                Path: {c.trainingNote}.
              </p>

              {d?.annualOpenings != null && (
                <p className="mt-1 text-[13px] font-semibold text-ink/75">
                  ~{d.annualOpenings.toLocaleString()} openings a year
                </p>
              )}

              <p className="mt-2 text-sm italic leading-6 text-stone">{c.note}</p>

              {/* Inline "quick look" panel */}
              {open && d && (
                <div className="mt-3 space-y-3 border-t-2 border-ink/10 pt-3">
                  <p className="text-sm leading-6 text-ink/85">{d.whatTheyDo}</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <p className="text-[13px] leading-5 text-stone">
                      <span className="font-bold text-ink/70">Where:</span>{" "}
                      {d.workSetting}
                    </p>
                    <p className="text-[13px] leading-5 text-stone">
                      <span className="font-bold text-ink/70">Hours:</span>{" "}
                      {d.hours}
                    </p>
                  </div>
                  {d.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {d.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-ink/15 bg-paper px-2 py-0.5 text-[11px] font-semibold text-ink/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 flex flex-1 flex-wrap items-end justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <CareerSaveButton careerId={c.id} compact />
                  {d && (
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : c.id)}
                      aria-expanded={open}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-forest hover:text-ink"
                    >
                      <CaretDown
                        className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                        weight="bold"
                      />
                      {open ? "Less" : "Quick look"}
                    </button>
                  )}
                </div>
                <Link
                  href={`/students/career-explorer/${c.id}`}
                  onClick={() => trackCareerEvent("Career explorer result opened", {
                    discovery_mode: query.trim() ? "search" : hasActiveFilters ? "filters" : "browse",
                    active_filter_count: activeFilterCount,
                    result_count_band: resultCountBand,
                  })}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-ink underline decoration-amber decoration-2 underline-offset-4 hover:text-forest"
                >
                  Full profile
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < results.length && (
        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + SHOW_STEP)}
            className="rounded-md border-2 border-ink bg-amber px-5 py-2.5 text-sm font-bold text-ink shadow-[3px_3px_0_#11211c] transition-transform hover:-translate-y-0.5"
          >
            Show {Math.min(SHOW_STEP, results.length - visibleCount)} more careers
          </button>
        </div>
      )}

      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-ink/15 bg-cream p-8 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No career matches those filters.
          </p>
          <p className="mt-1 text-sm text-stone">
            Try clearing one filter or searching for a broader skill or field.
          </p>
        </div>
      )}

      <p className="mt-8 text-sm leading-6 text-stone">
        Want a career added?{" "}
        <Link
          href="/contact"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Tell us which one
        </Link>{" "}
        and we&apos;ll pull its BLS profile.
      </p>
    </div>
  );
}
