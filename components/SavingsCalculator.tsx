"use client";

import { useEffect, useMemo, useState } from "react";
import { Target, Link2 } from "lucide-react";
import { readBudgetSummary } from "@/lib/calcImports";
import {
  monthlyToReachGoal,
  monthsToReachGoal,
  growthSeries,
} from "@/lib/savingsGoal";
import { Donut, Legend, TrendChart } from "@/components/Charts";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";
import {
  Card,
  SectionHeading,
  Label,
  MoneyInput,
  PlainInput,
  ResultRow,
  ClearBar,
  num,
  usd,
  formatDuration,
} from "@/components/CalcUI";

type Mode = "date" | "amount";
type Unit = "months" | "years";

interface Snapshot {
  mode: Mode;
  goal: string;
  current: string;
  timeValue: string;
  timeUnit: Unit;
  monthly: string;
  apy: string;
}

export default function SavingsCalculator() {
  const [mode, setMode] = useState<Mode>("date");
  const [goal, setGoal] = useState("");
  const [current, setCurrent] = useState("");
  const [timeValue, setTimeValue] = useState("12");
  const [timeUnit, setTimeUnit] = useState<Unit>("months");
  const [monthly, setMonthly] = useState("");
  const [budgetLeftover, setBudgetLeftover] = useState<number | null>(null);
  useEffect(() => {
    const b = readBudgetSummary();
    if (b && b.leftover > 0) setBudgetLeftover(b.leftover);
  }, []);
  const [apy, setApy] = useState("4");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const s = loadJSON<Snapshot>(STORAGE_KEYS.savings);
    if (s) {
      setMode(s.mode ?? "date");
      setGoal(s.goal ?? "");
      setCurrent(s.current ?? "");
      setTimeValue(s.timeValue ?? "12");
      setTimeUnit(s.timeUnit ?? "months");
      setMonthly(s.monthly ?? "");
      setApy(s.apy ?? "4");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.savings, {
      mode,
      goal,
      current,
      timeValue,
      timeUnit,
      monthly,
      apy,
    });
  }, [loaded, mode, goal, current, timeValue, timeUnit, monthly, apy]);

  function handleClear() {
    removeStored(STORAGE_KEYS.savings);
    setMode("date");
    setGoal("");
    setCurrent("");
    setTimeValue("12");
    setTimeUnit("months");
    setMonthly("");
    setApy("4");
  }

  const goalN = num(goal);
  const currentN = num(current);
  const apyN = num(apy);
  const months = timeUnit === "years" ? num(timeValue) * 12 : num(timeValue);

  const byDate = useMemo(
    () => monthlyToReachGoal(goalN, currentN, months, apyN),
    [goalN, currentN, months, apyN]
  );
  const byAmount = useMemo(
    () => monthsToReachGoal(goalN, currentN, num(monthly), apyN),
    [goalN, currentN, monthly, apyN]
  );

  const hasGoal = goalN > 0;

  // Growth curve + contribution/interest split for whichever mode is active.
  const planMonthly = mode === "date" ? byDate.monthly : num(monthly);
  const planMonths =
    mode === "date" ? months : byAmount.reachable ? byAmount.months : 0;
  const series = useMemo(
    () => growthSeries(currentN, planMonthly, apyN, planMonths),
    [currentN, planMonthly, apyN, planMonths]
  );
  const contributed =
    mode === "date" ? byDate.totalContributed : byAmount.totalContributed;
  const interestEarned =
    mode === "date" ? byDate.interestEarned : byAmount.interestEarned;
  const projected = series[series.length - 1] ?? currentN;
  const showCharts = hasGoal && planMonths > 0 && series.length > 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your goal" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>How much do you want to save?</Label>
              <MoneyInput value={goal} onChange={setGoal} placeholder="5,000" />
            </div>
            <div>
              <Label>Already saved (optional)</Label>
              <MoneyInput
                value={current}
                onChange={setCurrent}
                placeholder="0"
              />
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Your plan" />
          <div className="mt-5 inline-flex rounded-full border border-sand bg-paper p-1">
            {(
              [
                ["date", "I have a deadline"],
                ["amount", "I have a monthly amount"],
              ] as [Mode, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  mode === value
                    ? "bg-ink text-cream"
                    : "text-stone hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === "date" ? (
            <div className="mt-5">
              <Label>Reach it in…</Label>
              <div className="flex gap-2">
                <div className="w-32 flex-shrink-0">
                  <PlainInput
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="12"
                  />
                </div>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as Unit)}
                  className="rounded-xl border border-sand bg-paper px-3 py-3 text-ink focus:border-amber focus:outline-none"
                >
                  <option value="months">months</option>
                  <option value="years">years</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <Label>I can save each month…</Label>
              <MoneyInput
                value={monthly}
                onChange={setMonthly}
                placeholder="250"
              />
              {budgetLeftover && (
                <button
                  type="button"
                  onClick={() => setMonthly(String(budgetLeftover))}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition-colors hover:text-ink"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Use my budget leftover ({usd(budgetLeftover)}/mo)
                </button>
              )}
            </div>
          )}

          <div className="mt-5">
            <Label>Interest rate / APY (optional)</Label>
            <div className="w-40">
              <PlainInput value={apy} onChange={setApy} placeholder="4" suffix="%" />
            </div>
            <p className="mt-2 text-xs text-stone">
              A high-yield savings account often pays around 4%. Use 0 to ignore
              interest.
            </p>
          </div>
        </Card>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            {mode === "date" ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  Save each month
                </p>
                <p className="mt-2 font-display text-5xl font-bold">
                  {hasGoal ? usd(byDate.monthly) : "$0"}
                </p>
                <p className="mt-1 text-sm text-cream/70">
                  {hasGoal
                    ? byDate.alreadyThere
                      ? "You're already there!"
                      : `to reach ${usd(goalN)} in ${formatDuration(months)}`
                    : "Enter a goal to start"}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  Time to your goal
                </p>
                <p className="mt-2 font-display text-5xl font-bold">
                  {hasGoal
                    ? byAmount.alreadyThere
                      ? "Done"
                      : byAmount.reachable
                        ? formatDuration(byAmount.months)
                        : "—"
                    : "—"}
                </p>
                <p className="mt-1 text-sm text-cream/70">
                  {!hasGoal
                    ? "Enter a goal to start"
                    : byAmount.alreadyThere
                      ? "You're already there!"
                      : byAmount.reachable
                        ? `saving ${usd(num(monthly))}/mo toward ${usd(goalN)}`
                        : "Add a monthly amount to reach this goal"}
                </p>
              </>
            )}
          </div>

          {hasGoal && (
            <div className="p-7">
              {mode === "date" ? (
                <dl className="space-y-2.5 text-sm">
                  <ResultRow label="Goal" value={usd(goalN)} strong />
                  {currentN > 0 && (
                    <ResultRow
                      label="Already saved"
                      value={usd(currentN)}
                      muted
                    />
                  )}
                  <ResultRow
                    label="You'll contribute"
                    value={usd(byDate.totalContributed)}
                    muted
                  />
                  {byDate.interestEarned > 0 && (
                    <ResultRow
                      label="Interest earned"
                      value={`+ ${usd(byDate.interestEarned)}`}
                      tone="good"
                    />
                  )}
                </dl>
              ) : (
                <dl className="space-y-2.5 text-sm">
                  <ResultRow label="Goal" value={usd(goalN)} strong />
                  <ResultRow
                    label="You'll contribute"
                    value={usd(byAmount.totalContributed)}
                    muted
                  />
                  {byAmount.interestEarned > 0 && (
                    <ResultRow
                      label="Interest earned"
                      value={`+ ${usd(byAmount.interestEarned)}`}
                      tone="good"
                    />
                  )}
                  {byAmount.reachable && (
                    <div className="border-t border-ink-600 pt-2.5">
                      <ResultRow
                        label="Balance at goal"
                        value={usd(byAmount.finalBalance)}
                        strong
                        accent
                      />
                    </div>
                  )}
                </dl>
              )}

              {showCharts && (
                <>
                  <div className="mt-7 flex items-center gap-5">
                    <Donut
                      segments={[
                        {
                          value: currentN + contributed,
                          color: "var(--color-forest)",
                          label: "What you put in",
                        },
                        {
                          value: interestEarned,
                          color: "var(--color-amber)",
                          label: "Interest",
                        },
                      ]}
                      centerTop={usd(projected)}
                      centerSub="projected"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="mb-3 text-xs font-medium text-cream/55">
                        What gets you there
                      </p>
                      <Legend
                        items={[
                          {
                            color: "var(--color-forest)",
                            label: "What you put in",
                            value: usd(currentN + contributed),
                          },
                          {
                            color: "var(--color-amber)",
                            label: "Interest earned",
                            value: usd(interestEarned),
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="mt-7">
                    <p className="mb-3 text-xs font-medium text-cream/55">
                      Balance over time
                    </p>
                    <TrendChart
                      series={[
                        {
                          data: series,
                          color: "var(--color-forest)",
                          fill: true,
                        },
                      ]}
                      startLabel="Now"
                      endLabel={formatDuration(planMonths)}
                    />
                  </div>
                </>
              )}

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-forest/40 bg-forest/10 p-3.5">
                <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
                <p className="text-xs leading-5 text-cream/80">
                  {mode === "date"
                    ? byDate.alreadyThere
                      ? "Your current savings already cover this goal."
                      : `Setting aside ${usd(
                          byDate.monthly
                        )} automatically each payday is the easiest way to stay on track.`
                    : byAmount.reachable
                      ? `Bumping your monthly amount up even a little gets you there faster.`
                      : "With no monthly contribution and no interest, this goal won't be reached. Add a monthly amount."}
                </p>
              </div>
            </div>
          )}
        </div>

        <ClearBar onClear={handleClear} />
      </div>
    </div>
  );
}
