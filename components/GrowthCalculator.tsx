"use client";

import AnimatedNumber from "@/components/AnimatedNumber";

import { useEffect, useMemo, useState } from "react";
import { growthSeries } from "@/lib/savingsGoal";
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
} from "@/components/CalcUI";

export interface GrowthConfig {
  storageKey: keyof typeof STORAGE_KEYS;
  timeMode: "years" | "ages";
  initialLabel: string;
  monthlyLabel: string;
  rateLabel: string;
  defaultRate: string;
  cardTitle: string;
  resultLabel: string; // e.g. "In 30 years you'd have" / "At retirement you'd have"
}

interface Snapshot {
  initial: string;
  monthly: string;
  rate: string;
  years: string;
  currentAge: string;
  retireAge: string;
}

export default function GrowthCalculator({ config }: { config: GrowthConfig }) {
  const init = useMemo<Snapshot>(
    () => ({
      initial: "",
      monthly: "",
      rate: config.defaultRate,
      years: "30",
      currentAge: "25",
      retireAge: "65",
    }),
    [config.defaultRate]
  );

  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS[config.storageKey]);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [config.storageKey, init]);

  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS[config.storageKey], s);
  }, [loaded, s, config.storageKey]);

  const set = (k: keyof Snapshot, v: string) =>
    setS((p) => ({ ...p, [k]: v }));
  const clear = () => {
    removeStored(STORAGE_KEYS[config.storageKey]);
    setS(init);
  };

  const initialN = num(s.initial);
  const monthlyN = num(s.monthly);
  const rateN = num(s.rate);
  const months =
    config.timeMode === "ages"
      ? Math.max(0, num(s.retireAge) - num(s.currentAge)) * 12
      : num(s.years) * 12;

  const series = useMemo(
    () => growthSeries(initialN, monthlyN, rateN, months),
    [initialN, monthlyN, rateN, months]
  );
  const finalBalance = series[series.length - 1] ?? initialN;
  const contributed = initialN + monthlyN * months;
  const interest = Math.max(0, finalBalance - contributed);
  const ready = months > 0 && (initialN > 0 || monthlyN > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title={config.cardTitle} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{config.initialLabel}</Label>
              <MoneyInput
                value={s.initial}
                onChange={(v) => set("initial", v)}
                placeholder="500"
              />
            </div>
            <div>
              <Label>{config.monthlyLabel}</Label>
              <MoneyInput
                value={s.monthly}
                onChange={(v) => set("monthly", v)}
                placeholder="100"
              />
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Time & growth" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {config.timeMode === "ages" ? (
              <>
                <div>
                  <Label>Your age now</Label>
                  <PlainInput
                    value={s.currentAge}
                    onChange={(v) => set("currentAge", v)}
                    placeholder="25"
                  />
                </div>
                <div>
                  <Label>Retirement age</Label>
                  <PlainInput
                    value={s.retireAge}
                    onChange={(v) => set("retireAge", v)}
                    placeholder="65"
                  />
                </div>
              </>
            ) : (
              <div>
                <Label>Number of years</Label>
                <PlainInput
                  value={s.years}
                  onChange={(v) => set("years", v)}
                  placeholder="30"
                  suffix="yrs"
                />
              </div>
            )}
            <div>
              <Label>{config.rateLabel}</Label>
              <PlainInput
                value={s.rate}
                onChange={(v) => set("rate", v)}
                placeholder={config.defaultRate}
                suffix="%"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone">
            Historically the stock market has returned about 7% a year after
            inflation, but returns aren&apos;t guaranteed. Use a lower number to
            be cautious.
          </p>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              {config.resultLabel}
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? <AnimatedNumber value={finalBalance} format={usd} /> : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? `${usd(interest)} of that is growth`
                : "Add an amount to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow
                  label="What you put in"
                  value={usd(contributed)}
                  strong
                />
                <ResultRow
                  label="Growth (compounding)"
                  value={`+ ${usd(interest)}`}
                  tone="good"
                />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow
                    label="Future balance"
                    value={usd(finalBalance)}
                    strong
                    accent
                  />
                </div>
              </dl>

              <div className="mt-7 flex items-center gap-5">
                <Donut
                  segments={[
                    {
                      value: contributed,
                      color: "var(--color-forest)",
                      label: "Contributions",
                    },
                    {
                      value: interest,
                      color: "var(--color-amber)",
                      label: "Growth",
                    },
                  ]}
                  centerTop={usd(finalBalance)}
                  centerSub="future value"
                />
                <div className="min-w-0 flex-1">
                  <p className="mb-3 text-xs font-medium text-cream/55">
                    What builds it
                  </p>
                  <Legend
                    items={[
                      {
                        color: "var(--color-forest)",
                        label: "What you put in",
                        value: usd(contributed),
                      },
                      {
                        color: "var(--color-amber)",
                        label: "Growth",
                        value: usd(interest),
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
                  endLabel={`${Math.round(months / 12)} yrs`}
                />
              </div>
            </div>
          )}
        </div>
        <ClearBar onClear={clear} />
      </div>
    </div>
  );
}
