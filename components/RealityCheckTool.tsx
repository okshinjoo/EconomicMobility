"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import {
  lifestyleCategories,
  salaryForLifestyle,
  type RealityResult,
} from "@/lib/realityCheck";
import { US_STATES } from "@/lib/taxData";
import { Donut, Legend } from "@/components/Charts";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

interface Snapshot {
  picks: Record<string, string>;
  stateCode: string;
}

/** picks: categoryId -> optionId. Steps: one category at a time, then state, then results. */
export default function RealityCheckTool() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [stateCode, setStateCode] = useState("");
  const [step, setStep] = useState(0); // 0..categories.length-1, then state step, then results
  const total = lifestyleCategories.length;
  const stateStep = total;
  const resultStep = total + 1;

  // Resume a finished check ("pick up where you left off" convention).
  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.realityCheck);
    if (saved?.picks && Object.keys(saved.picks).length === total) {
      setPicks(saved.picks);
      setStateCode(saved.stateCode ?? "");
      setStep(resultStep);
    }
  }, [total, resultStep]);

  const monthlyFor = (catId: string): number => {
    const cat = lifestyleCategories.find((c) => c.id === catId);
    const opt = cat?.options.find((o) => o.id === picks[catId]);
    return opt?.monthly ?? 0;
  };
  const monthlyTotal = lifestyleCategories.reduce(
    (sum, c) => sum + monthlyFor(c.id),
    0
  );

  const pick = (catId: string, optId: string) => {
    setPicks((prev) => ({ ...prev, [catId]: optId }));
    // Small pause so the selection registers visually before advancing.
    setTimeout(() => setStep((s) => Math.min(s + 1, stateStep)), 180);
  };

  const finish = () => {
    saveJSON(STORAGE_KEYS.realityCheck, { picks, stateCode } satisfies Snapshot);
    setStep(resultStep);
  };

  const restart = () => {
    setPicks({});
    setStateCode("");
    setStep(0);
  };

  // ── Results ────────────────────────────────────────────────────────────────
  if (step === resultStep) {
    const result: RealityResult = salaryForLifestyle(monthlyTotal, stateCode);
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
      .map((c) => ({ label: c.short, color: c.color, value: monthlyFor(c.id) }))
      .filter((s) => s.value > 0);

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-forest p-6 text-cream sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            Your reality check
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            That life costs {usd(monthlyTotal)} a month.
          </h2>
          <p className="mt-2 text-base leading-7 text-cream/75">{verdict}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-forest-700 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                Salary you&apos;d need
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-amber">
                {usd(result.grossSalary)}
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
                {usd(Math.round(result.hourly))}
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

        <div className="mt-6 rounded-2xl border border-sand bg-cream p-6">
          <p className="font-display text-lg font-semibold text-ink">
            Make it real
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-stone">
            <li>
              See what {usd(result.grossSalary)} looks like per
              paycheck in the{" "}
              <Link href="/tools/budget/paycheck" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                Paycheck Calculator
              </Link>
              .
            </li>
            <li>
              Build the real version of this in the{" "}
              <Link href="/tools/budget" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                Budget Planner
              </Link>
              .
            </li>
            <li>
              Read{" "}
              <Link href="/learn/budgeting/cost-of-living" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                What It Really Costs to Live
              </Link>
              . The numbers here are national ballparks; your city writes its
              own.
            </li>
          </ul>
          <button
            type="button"
            onClick={restart}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
            Try a different life
          </button>
        </div>
      </div>
    );
  }

  // ── State picker step ─────────────────────────────────────────────────────
  if (step === stateStep) {
    return (
      <div className="mx-auto max-w-2xl">
        <StepHeader
          index={stateStep}
          total={total + 1}
          monthlyTotal={monthlyTotal}
          onBack={() => setStep(total - 1)}
        />
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Last one: where would this life happen?
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone">
          State income tax changes how big the salary has to be. Skip it and
          we&apos;ll count federal taxes only.
        </p>
        <select
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          className="mt-5 w-full max-w-sm rounded-lg border border-sand bg-cream px-4 py-3 text-base text-ink focus:border-amber focus:outline-none"
        >
          <option value="">Skip (federal taxes only)</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="mt-6">
          <button
            type="button"
            onClick={finish}
            className="rounded-md bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-amber-deep hover:text-cream"
          >
            Show me the number
          </button>
        </div>
      </div>
    );
  }

  // ── Category steps ────────────────────────────────────────────────────────
  const cat = lifestyleCategories[step];
  return (
    <div className="mx-auto max-w-2xl">
      <StepHeader
        index={step}
        total={total + 1}
        monthlyTotal={monthlyTotal}
        onBack={step > 0 ? () => setStep(step - 1) : undefined}
      />
      <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {cat.title}
      </h2>
      <div className="mt-5 space-y-3">
        {cat.options.map((opt) => {
          const selected = picks[cat.id] === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => pick(cat.id, opt.id)}
              className={`flex w-full items-baseline justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
                selected
                  ? "border-forest bg-forest/[0.08]"
                  : "border-sand bg-cream hover:border-ink/30"
              }`}
            >
              <span>
                <span className="block font-semibold text-ink">{opt.label}</span>
                <span className="mt-0.5 block text-sm leading-6 text-stone">
                  {opt.blurb}
                </span>
              </span>
              <span className="shrink-0 font-display text-lg font-bold tabular-nums" style={{ color: cat.color }}>
                {opt.monthly === 0 ? "$0" : `${usd(opt.monthly)}/mo`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepHeader({
  index,
  total,
  monthlyTotal,
  onBack,
}: {
  index: number;
  total: number;
  monthlyTotal: number;
  onBack?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sand bg-cream text-ink transition-colors hover:border-ink/30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <span className="text-sm font-semibold tabular-nums text-stone">
            {index + 1} of {total + 1}
          </span>
        </div>
        <span className="text-sm font-semibold text-ink">
          Running total:{" "}
          <span className="font-display tabular-nums text-forest">
            {usd(monthlyTotal)}/mo
          </span>
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-amber transition-[width] duration-300"
          style={{ width: `${((index + 1) / (total + 2)) * 100}%` }}
        />
      </div>
    </div>
  );
}
