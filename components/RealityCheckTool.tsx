"use client";

import AnimatedNumber from "@/components/AnimatedNumber";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowCounterClockwise as RotateCcw } from "@phosphor-icons/react/dist/ssr";
import {
  lifestyleCategories,
  salaryForLifestyle,
  type LifestyleCategory,
  type RealityResult,
} from "@/lib/realityCheck";
import { US_STATES } from "@/lib/taxData";
import { readBudgetSummary } from "@/lib/calcImports";
import { getReadMap } from "@/lib/readTracking";
import { Donut, Legend } from "@/components/Charts";
import { MoneyInput, num } from "@/components/CalcUI";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Follow-up reads for people who already have a real budget saved,
 *  most on-topic first; the first unread one gets recommended. */
const NEXT_READS = [
  { slug: "cost-of-living", title: "What It Really Costs to Live" },
  { slug: "50-30-20-rule", title: "The 50/30/20 Rule, Explained" },
  { slug: "building-your-first-budget", title: "Building Your First Budget" },
  { slug: "needs-vs-wants", title: "Needs vs. Wants, Without the Guilt" },
];

/** Jump$tart-style grouped slides: a few related questions per screen
 *  instead of one per click. Ids reference lifestyleCategories. */
// Choice-based categories come first (four slides), then every type-it-in
// category lands together on the final slide, beside the state picker.
const SLIDES: { title: string; blurb: string; cats: string[] }[] = [
  {
    title: "Home",
    blurb: "Where you live and what keeps the lights on.",
    cats: ["housing", "home-bills"],
  },
  {
    title: "Day to day",
    blurb: "The stuff that happens every single week.",
    cats: ["food", "transport", "phone"],
  },
  {
    title: "The grown-up line items",
    blurb: "The ones most calculators skip.",
    cats: ["health", "student-loans"],
  },
  {
    title: "Clothes, pets & the household",
    blurb: "The odds and ends that still add up.",
    cats: ["style", "pets", "extras"],
  },
  {
    title: "Your own numbers",
    blurb:
      "These swing too much from person to person for us to guess, so type what fits your life. Leave any blank and we count it as $0.",
    cats: ["debts", "fun", "travel", "family", "savings"],
  },
];

interface Snapshot {
  picks: Record<string, string>;
  stateCode: string;
  /** Corrected monthly amounts, keyed by category id. Also holds the typed
   *  amounts for free-entry categories (fun, travel, savings). */
  overrides?: Record<string, string>;
  /** "high" = big expensive city; scales the housing estimates. */
  col?: "high" | "normal";
  /** Set when the run reaches results (resume marker). */
  complete?: boolean;
}

const catById = (id: string): LifestyleCategory =>
  lifestyleCategories.find((c) => c.id === id)!;

export default function RealityCheckTool() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [stateCode, setStateCode] = useState("");
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [col, setCol] = useState<"" | "high" | "normal">("");
  const [slide, setSlide] = useState(0); // 0..SLIDES.length-1, then results
  const resultStep = SLIDES.length;
  const totalCats = lifestyleCategories.length;

  // Resume a finished check ("pick up where you left off" convention).
  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.realityCheck);
    // New snapshots carry a complete flag; older ones had a pick per category.
    // Snapshots from before the debt split (a "debt" pick) don't map onto the
    // new categories, so those start fresh rather than resume with holes.
    if (
      saved?.picks &&
      !saved.picks["debt"] &&
      (saved.complete || Object.keys(saved.picks).length === totalCats)
    ) {
      setPicks(saved.picks);
      setStateCode(saved.stateCode ?? "");
      setOverrides(saved.overrides ?? {});
      setCol(saved.col ?? "normal");
      setSlide(resultStep);
    }
  }, [totalCats, resultStep]);

  /** Our estimate for a category from its pick (big-city pricing when chosen). */
  const estimateFor = (catId: string): number => {
    const cat = catById(catId);
    const opt = cat.options.find((o) => o.id === picks[catId]);
    if (!opt) return 0;
    return col === "high" && opt.monthlyHigh !== undefined
      ? opt.monthlyHigh
      : opt.monthly;
  };
  /** What actually counts: their correction if they made one, else our estimate. */
  const effectiveFor = (catId: string): number =>
    overrides[catId] !== undefined && overrides[catId] !== ""
      ? num(overrides[catId])
      : estimateFor(catId);

  const monthlyTotal = lifestyleCategories.reduce(
    (sum, c) => sum + effectiveFor(c.id),
    0
  );

  const persist = (next?: Partial<Snapshot>) =>
    saveJSON(STORAGE_KEYS.realityCheck, {
      picks,
      stateCode,
      overrides,
      col: col || "normal",
      complete: true,
      ...next,
    } satisfies Snapshot);

  const restart = () => {
    setPicks({});
    setStateCode("");
    setOverrides({});
    setCol("");
    setSlide(0);
  };

  // ── Results ────────────────────────────────────────────────────────────────
  if (slide === resultStep) {
    const result: RealityResult = salaryForLifestyle(monthlyTotal, stateCode);
    // The honest presentation: a $5,000 band, not fake-precise dollars.
    const bandLo = Math.floor(result.grossSalary / 5000) * 5000;
    const bandHi = bandLo + 5000;
    const minWageMultiple = result.hourly / 7.25;
    const verdict =
      result.grossSalary < 45000
        ? "A modest setup, and very reachable. Lots of first jobs clear this bar."
        : result.grossSalary < 75000
          ? "A solid middle-class life. Reachable, but it usually takes a plan (or a roommate)."
          : result.grossSalary < 110000
            ? "A comfortable life that most people need years of raises to afford. Worth knowing early."
            : "The full package costs more than most households in America earn. Now you know what the lifestyle influencers aren't saying.";

    const segments = lifestyleCategories
      .map((c) => ({ label: c.short, color: c.color, value: effectiveFor(c.id) }))
      .filter((s) => s.value > 0);

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-forest p-6 text-cream sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            Your reality check
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            That life costs about <AnimatedNumber value={monthlyTotal} format={usd} /> a month.
          </h2>
          <p className="mt-2 text-base leading-7 text-cream/75">{verdict}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-forest-700 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                Salary you&apos;d need
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-amber">
                {usd(bandLo)}–{usd(bandHi)}
              </p>
              <p className="mt-1 text-xs text-cream/60">
                before taxes{stateCode ? "" : " (no state tax counted)"}
              </p>
            </div>
            <div className="rounded-xl bg-forest-700 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                That&apos;s per hour
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-amber">
                about {usd(Math.round(result.hourly))}
              </p>
              <p className="mt-1 text-xs text-cream/60">
                full-time, {minWageMultiple.toFixed(1)}× the $7.25 federal minimum
              </p>
            </div>
            <div className="rounded-xl bg-forest-700 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                Taxes take about
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-amber">
                {(result.effectiveRate * 100).toFixed(0)}%
              </p>
              <p className="mt-1 text-xs text-cream/60">
                which is why the salary is bigger than the spending
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <Donut
              segments={segments}
              centerTop={usd(monthlyTotal)}
              centerSub="per month"
            />
            <div className="w-full">
              <Legend
                items={segments.map((s) => ({
                  color: s.color,
                  label: s.label,
                  value: `${usd(s.value)}/mo`,
                }))}
              />
            </div>
          </div>
        </div>

        {/* The receipt: how we valued each pick, correctable */}
        <div className="mt-6 rounded-2xl border-2 border-ink bg-cream p-6 shadow-[4px_4px_0_#11211c] sm:p-7">
          <p className="font-display text-lg font-semibold text-ink">
            How we priced your picks
          </p>
          <p className="mt-1.5 text-sm leading-6 text-stone">
            These are national ballparks; things like fun, travel, and savings
            vary hugely from person to person. If a number looks wrong for
            your life, type over it and everything above updates.
          </p>
          <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {lifestyleCategories.map((cat) => {
              const pick = cat.options.find((o) => o.id === picks[cat.id]);
              const pickLabel = cat.freeEntry
                ? overrides[cat.id]
                  ? "Your number, as typed"
                  : "Left blank, counted as $0"
                : cat.id === "housing" && col === "high" && pick
                  ? `${pick.label} (big-city pricing)`
                  : (pick?.label ?? "—");
              const edited =
                !cat.freeEntry &&
                overrides[cat.id] !== undefined &&
                overrides[cat.id] !== "" &&
                num(overrides[cat.id]) !== estimateFor(cat.id);
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-4 border-b border-sand pb-3"
                >
                  <div className="min-w-0">
                    <p
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: cat.color }}
                    >
                      {cat.short}
                      {edited && (
                        <span className="ml-2 font-semibold normal-case tracking-normal text-stone">
                          your number
                        </span>
                      )}
                    </p>
                    <p className="truncate text-sm font-medium text-ink">
                      {pickLabel}
                    </p>
                  </div>
                  <div className="w-28 shrink-0">
                    <MoneyInput
                      value={overrides[cat.id] ?? String(estimateFor(cat.id))}
                      onChange={(v) => {
                        const next = { ...overrides, [cat.id]: v };
                        setOverrides(next);
                        persist({ overrides: next });
                      }}
                      placeholder={String(estimateFor(cat.id))}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NextStep grossSalary={result.grossSalary} monthlyTotal={monthlyTotal} />

        <div className="mt-6">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
            Try a different life
          </button>
        </div>
      </div>
    );
  }

  // ── Grouped question slides ───────────────────────────────────────────────
  const group = SLIDES[slide];
  // Free-entry money boxes never gate: leaving one blank just counts as $0.
  const catAnswered = (id: string) =>
    catById(id).freeEntry ? true : Boolean(picks[id]);
  const answered =
    group.cats.every(catAnswered) && (slide !== 0 || col !== "");
  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="mx-auto max-w-2xl">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {slide > 0 && (
              <button
                type="button"
                onClick={() => setSlide(slide - 1)}
                aria-label="Back"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sand bg-cream text-ink transition-colors hover:border-ink/30"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <span className="text-sm font-semibold tabular-nums text-stone">
              {slide + 1} of {SLIDES.length}
            </span>
          </div>
          <span className="text-sm font-medium text-stone">
            The prices come at the end.
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-amber transition-[width] duration-300"
            style={{ width: `${((slide + 1) / (SLIDES.length + 1)) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="mt-6 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {group.title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-stone">{group.blurb}</p>

      <div className="mt-6 space-y-8">
        {slide === 0 && (
          <fieldset>
            <legend className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
              What kind of city?
            </legend>
            <p className="mt-1 text-xs leading-5 text-stone">
              Rent in the biggest, priciest cities runs very differently from
              everywhere else. This scales the housing estimates.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(
                [
                  {
                    id: "high",
                    label: "A big, expensive city",
                    blurb: "New York, LA, SF, Boston, DC and company.",
                  },
                  {
                    id: "normal",
                    label: "A typical city or town",
                    blurb: "Most of the country, honestly.",
                  },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCol(opt.id)}
                  className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                    col === opt.id
                      ? "border-ink bg-forest/[0.08] shadow-[3px_3px_0_#11211c]"
                      : "border-ink/20 bg-cream hover:border-ink"
                  }`}
                >
                  <span className="block text-sm font-semibold text-ink">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-stone">
                    {opt.blurb}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {group.cats.map((catId) => {
          const cat = catById(catId);
          if (cat.freeEntry) {
            // Amounts vary too widely for presets: type the real number.
            return (
              <fieldset key={catId}>
                <legend
                  className="text-sm font-bold uppercase tracking-[0.14em]"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </legend>
                <p className="mt-1 max-w-md text-xs leading-5 text-stone">
                  {cat.freeEntry.hint}
                </p>
                <div className="mt-3 w-40">
                  <MoneyInput
                    value={overrides[catId] ?? ""}
                    onChange={(v) =>
                      setOverrides((prev) => ({ ...prev, [catId]: v }))
                    }
                    placeholder="0"
                  />
                </div>
                <p className="mt-1 text-xs text-stone">
                  per month &middot; leave it blank and we count $0
                </p>
              </fieldset>
            );
          }
          return (
            <fieldset key={catId}>
              <legend
                className="text-sm font-bold uppercase tracking-[0.14em]"
                style={{ color: cat.color }}
              >
                {cat.title}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {cat.options.map((opt) => {
                  const selected = picks[catId] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setPicks((prev) => ({ ...prev, [catId]: opt.id }))
                      }
                      className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                        selected
                          ? "border-ink bg-forest/[0.08] shadow-[3px_3px_0_#11211c]"
                          : "border-ink/20 bg-cream hover:border-ink"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {opt.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-stone">
                        {opt.blurb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        {isLast && (
          <fieldset>
            <legend className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
              Where would this life happen?
            </legend>
            <p className="mt-1 text-xs leading-5 text-stone">
              State income tax changes the answer. Skip it and we&apos;ll count
              federal taxes only.
            </p>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="mt-3 w-full max-w-sm rounded-lg border border-sand bg-cream px-4 py-3 text-base text-ink focus:border-amber focus:outline-none"
            >
              <option value="">Skip (federal taxes only)</option>
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </fieldset>
        )}
      </div>

      <div className="mt-8">
        <button
          type="button"
          disabled={!answered}
          onClick={() => {
            if (isLast) {
              persist();
              setSlide(resultStep);
            } else {
              setSlide(slide + 1);
              window.scrollTo({ top: 0 });
            }
          }}
          className="btn-ink rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {isLast ? "Show me the number" : "Next"}
        </button>
        {!answered && (
          <p className="mt-2 text-xs text-stone">
            Pick an option in each section to keep going. Money boxes can
            stay blank; blank counts as $0.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * The one referral under the results, chosen from what this device has
 * already done. No saved budget -> point at the Budget Planner so the
 * salary becomes a real after-tax picture. Budget already filled out ->
 * compare it to this lifestyle and recommend the first unread follow-up
 * article. Budget saved AND all the reads read -> nothing to push.
 */
function NextStep({
  grossSalary,
  monthlyTotal,
}: {
  grossSalary: number;
  monthlyTotal: number;
}) {
  const frame = useFrame();
  const budget = readBudgetSummary();

  if (!budget) {
    return (
      <div className="mt-6 rounded-2xl border border-sand bg-cream p-6">
        <p className="font-display text-lg font-semibold text-ink">
          Now see it after taxes
        </p>
        <p className="mt-2 text-sm leading-6 text-stone">
          {usd(grossSalary)} is the sticker, not what hits your account. Put
          it into the{" "}
          <Link
            href={frameHref("/tools/budget", frame)}
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Budget Planner
          </Link>{" "}
          to see the monthly take-home, then build this life in it line by
          line and watch what&apos;s left over.
        </p>
      </div>
    );
  }

  const read = getReadMap();
  const nextRead = NEXT_READS.find((a) => !read[a.slug]);
  if (!nextRead) return null;

  const diff = budget.netMonthly - monthlyTotal;
  const comparison =
    budget.netMonthly > 0
      ? diff >= 0
        ? `Your saved budget has you taking home about ${usd(budget.netMonthly)} a month, so this life fits with ${usd(diff)} to spare. `
        : `Your saved budget has you taking home about ${usd(budget.netMonthly)} a month, so this life runs ${usd(-diff)} past it. `
      : "";

  return (
    <div className="mt-6 rounded-2xl border border-sand bg-cream p-6">
      <p className="font-display text-lg font-semibold text-ink">
        How it squares with your real budget
      </p>
      <p className="mt-2 text-sm leading-6 text-stone">
        {comparison}
        These numbers are national ballparks; your city writes its own. A
        good next read:{" "}
        <Link
          href={frameHref(`/learn/budgeting/${nextRead.slug}`, frame)}
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          {nextRead.title}
        </Link>
        .
      </p>
    </div>
  );
}
