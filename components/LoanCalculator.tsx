"use client";

import AnimatedNumber from "@/components/AnimatedNumber";

import { useEffect, useMemo, useState } from "react";
import { loanPayment } from "@/lib/debtPayoff";
import { Donut, Legend } from "@/components/Charts";
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

export interface AmountField {
  key: string;
  label: string;
  placeholder: string;
  subtract?: boolean; // a down payment / trade-in reduces the loan
}

export interface LoanConfig {
  storageKey: keyof typeof STORAGE_KEYS;
  amountFields: AmountField[];
  termPresets: number[]; // in `termUnit`
  defaultTerm: string;
  termUnit: "months" | "years";
  defaultRate: string;
  rateLabel: string;
  /** Optional monthly add-ons (e.g. property tax, insurance) that don't change the loan. */
  addOns?: { key: string; label: string; placeholder: string }[];
  principalLabel: string;
  cardTitle: string;
}

export default function LoanCalculator({ config }: { config: LoanConfig }) {
  const init = useMemo(() => {
    const v: Record<string, string> = { term: config.defaultTerm, rate: config.defaultRate };
    config.amountFields.forEach((f) => (v[f.key] = ""));
    config.addOns?.forEach((f) => (v[f.key] = ""));
    return v;
  }, [config]);

  const [vals, setVals] = useState<Record<string, string>>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const s = loadJSON<Record<string, string>>(STORAGE_KEYS[config.storageKey]);
    if (s) setVals({ ...init, ...s });
    setLoaded(true);
  }, [config.storageKey, init]);

  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS[config.storageKey], vals);
  }, [loaded, vals, config.storageKey]);

  const set = (k: string, v: string) => setVals((p) => ({ ...p, [k]: v }));
  const clear = () => {
    removeStored(STORAGE_KEYS[config.storageKey]);
    setVals(init);
  };

  const principal = Math.max(
    0,
    config.amountFields.reduce(
      (s, f) => s + (f.subtract ? -1 : 1) * num(vals[f.key]),
      0
    )
  );
  const months =
    config.termUnit === "years" ? num(vals.term) * 12 : num(vals.term);
  const rate = num(vals.rate);
  const pAndI = loanPayment(principal, rate, months);
  const addOnTotal =
    config.addOns?.reduce((s, f) => s + num(vals[f.key]), 0) ?? 0;
  const monthly = pAndI + addOnTotal;
  const totalPaid = pAndI * months;
  const interest = Math.max(0, totalPaid - principal);
  const ready = principal > 0 && months > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title={config.cardTitle} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {config.amountFields.map((f) => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                <MoneyInput
                  value={vals[f.key] ?? ""}
                  onChange={(v) => set(f.key, v)}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Rate & term" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{config.rateLabel}</Label>
              <PlainInput
                value={vals.rate}
                onChange={(v) => set("rate", v)}
                placeholder={config.defaultRate}
                suffix="%"
              />
            </div>
            <div>
              <Label>Loan term</Label>
              <PlainInput
                value={vals.term}
                onChange={(v) => set("term", v)}
                placeholder={config.defaultTerm}
                suffix={config.termUnit === "years" ? "yrs" : "mo"}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {config.termPresets.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("term", String(t))}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  num(vals.term) === t
                    ? "border-ink bg-ink text-cream"
                    : "border-sand bg-paper text-stone hover:border-ink/30"
                }`}
              >
                {t} {config.termUnit === "years" ? "yrs" : "mo"}
              </button>
            ))}
          </div>

          {config.addOns && (
            <div className="mt-6 space-y-4 border-t border-sand pt-5">
              <p className="text-sm font-medium text-ink">
                Monthly extras (optional)
              </p>
              {config.addOns.map((f) => (
                <div key={f.key}>
                  <Label>{f.label}</Label>
                  <MoneyInput
                    value={vals[f.key] ?? ""}
                    onChange={(v) => set(f.key, v)}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Monthly payment
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? <AnimatedNumber value={monthly} format={usd} /> : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? addOnTotal > 0
                  ? `${usd(pAndI)} loan + ${usd(addOnTotal)} extras`
                  : `${usd(principal)} at ${rate}% for ${vals.term} ${
                      config.termUnit === "years" ? "yrs" : "mo"
                    }`
                : "Enter the numbers to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow label={config.principalLabel} value={usd(principal)} strong />
                <ResultRow
                  label="Total interest"
                  value={usd(interest)}
                  muted
                />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow
                    label="Total of payments"
                    value={usd(totalPaid)}
                    strong
                    accent
                  />
                </div>
              </dl>

              <div className="mt-7 flex items-center gap-5">
                <Donut
                  segments={[
                    {
                      value: principal,
                      color: "var(--color-forest)",
                      label: "Loan",
                    },
                    {
                      value: interest,
                      color: "var(--color-terracotta)",
                      label: "Interest",
                    },
                  ]}
                  centerTop={usd(totalPaid)}
                  centerSub="total paid"
                />
                <div className="min-w-0 flex-1">
                  <p className="mb-3 text-xs font-medium text-cream/55">
                    Principal vs. interest
                  </p>
                  <Legend
                    items={[
                      {
                        color: "var(--color-forest)",
                        label: config.principalLabel,
                        value: usd(principal),
                      },
                      {
                        color: "var(--color-terracotta)",
                        label: "Interest",
                        value: usd(interest),
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
