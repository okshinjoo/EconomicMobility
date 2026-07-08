"use client";

import AnimatedNumber from "@/components/AnimatedNumber";

import { useEffect, useMemo, useState } from "react";
import { projectRoth, rothLimit } from "@/lib/rothIra";
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

interface Snapshot {
  starting: string;
  annual: string;
  currentAge: string;
  retireAge: string;
  rate: string;
  taxRate: string;
}

const init: Snapshot = {
  starting: "",
  annual: "7500",
  currentAge: "25",
  retireAge: "65",
  rate: "7",
  taxRate: "22",
};

const TAXABLE_COLOR = "rgba(251,248,241,0.55)";

export default function RothIraCalculator() {
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.rothIra);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.rothIra, s);
  }, [loaded, s]);

  const set = (k: keyof Snapshot, v: string) => setS((p) => ({ ...p, [k]: v }));
  const clear = () => {
    removeStored(STORAGE_KEYS.rothIra);
    setS(init);
  };

  const currentAgeN = num(s.currentAge);
  const annualN = num(s.annual);
  const limit = rothLimit(currentAgeN);
  const overLimit = annualN > limit;

  const proj = useMemo(
    () =>
      projectRoth({
        startingBalance: num(s.starting),
        annualContribution: annualN,
        currentAge: currentAgeN,
        retireAge: num(s.retireAge),
        ratePct: num(s.rate),
        taxRatePct: num(s.taxRate),
      }),
    [s.starting, annualN, currentAgeN, s.retireAge, s.rate, s.taxRate]
  );

  const { ready } = proj;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="What you're putting in" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Starting balance</Label>
              <MoneyInput
                value={s.starting}
                onChange={(v) => set("starting", v)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Annual contribution</Label>
              <MoneyInput
                value={s.annual}
                onChange={(v) => set("annual", v)}
                placeholder="7500"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className={`text-xs ${overLimit ? "text-terracotta" : "text-stone"}`}>
              {overLimit
                ? `Over the 2026 limit of ${usd(limit)}${currentAgeN >= 50 ? " (50+)" : ""}. Contributions above this aren't allowed.`
                : `2026 limit: ${usd(limit)}/yr${currentAgeN >= 50 ? " (includes 50+ catch-up)" : ", or $8,600 at age 50+"}.`}
            </p>
            {annualN !== limit && (
              <button
                type="button"
                onClick={() => set("annual", String(limit))}
                className="flex-shrink-0 text-xs font-semibold text-forest underline-offset-2 hover:underline"
              >
                Use the max
              </button>
            )}
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Time & growth" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
            <div>
              <Label>Annual return</Label>
              <PlainInput
                value={s.rate}
                onChange={(v) => set("rate", v)}
                placeholder="7"
                suffix="%"
              />
            </div>
            <div>
              <Label>Your tax rate</Label>
              <PlainInput
                value={s.taxRate}
                onChange={(v) => set("taxRate", v)}
                placeholder="22"
                suffix="%"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone">
            The tax rate is only used to compare a Roth against a regular taxable
            account; a Roth itself is never taxed on qualified withdrawals.
            Historically stocks have returned ~7%/yr after inflation, but returns
            aren&apos;t guaranteed.
          </p>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              {ready
                ? `At age ${proj.retireAge}, tax-free`
                : "At retirement, tax-free"}
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? <AnimatedNumber value={proj.rothBalance} format={usd} /> : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? `${usd(proj.rothGrowth)} of that is tax-free growth`
                : "Add a contribution to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow
                  label="What you contributed"
                  value={usd(proj.contributions)}
                  strong
                />
                <ResultRow
                  label="Tax-free growth"
                  value={`+ ${usd(proj.rothGrowth)}`}
                  tone="good"
                />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow
                    label="Roth IRA balance"
                    value={usd(proj.rothBalance)}
                    strong
                    accent
                  />
                </div>
              </dl>

              {/* The Roth advantage vs. a taxable account */}
              <div className="mt-6 rounded-2xl border border-ink-600 bg-ink-700/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/55">
                  Why a Roth?
                </p>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <ResultRow
                    label="Same money, taxable account"
                    value={usd(proj.taxableBalance)}
                    muted
                  />
                  <ResultRow
                    label="Roth advantage"
                    value={`+ ${usd(proj.rothAdvantage)}`}
                    tone="good"
                    strong
                  />
                </dl>
                <p className="mt-3 text-xs leading-5 text-cream/55">
                  Because a Roth is never taxed on growth, you keep about{" "}
                  {usd(proj.rothAdvantage)} more than you would in a regular
                  taxable account at {num(s.taxRate)}% tax.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-5">
                <Donut
                  segments={[
                    {
                      value: proj.contributions,
                      color: "var(--color-forest)",
                      label: "Contributions",
                    },
                    {
                      value: proj.rothGrowth,
                      color: "var(--color-amber)",
                      label: "Growth",
                    },
                  ]}
                  centerTop={usd(proj.rothBalance)}
                  centerSub="tax-free"
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
                        value: usd(proj.contributions),
                      },
                      {
                        color: "var(--color-amber)",
                        label: "Tax-free growth",
                        value: usd(proj.rothGrowth),
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-xs font-medium text-cream/55">
                  Roth vs. taxable account over time
                </p>
                <TrendChart
                  series={[
                    {
                      data: proj.rothSeries,
                      color: "var(--color-forest)",
                      fill: true,
                    },
                    {
                      data: proj.taxableSeries,
                      color: TAXABLE_COLOR,
                      dashed: true,
                    },
                  ]}
                  startLabel="Now"
                  endLabel={`${proj.years} yrs`}
                />
                <div className="mt-3">
                  <Legend
                    items={[
                      {
                        color: "var(--color-forest)",
                        label: "Roth (tax-free)",
                        value: usd(proj.rothBalance),
                      },
                      {
                        color: TAXABLE_COLOR,
                        label: "Taxable account",
                        value: usd(proj.taxableBalance),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <ClearBar onClear={clear} />
      </div>
    </div>
  );
}
