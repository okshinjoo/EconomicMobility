"use client";

import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import {
  estimateTaxes,
  FILING_OPTIONS,
  US_STATES,
  hasStateIncomeTax,
  type FilingStatus,
} from "@/lib/taxData";
import { Donut } from "@/components/Charts";
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

type IncomeType = "salary" | "hourly";
type Period = "annual" | "monthly" | "biweekly" | "weekly";

const PERIODS: { id: Period; label: string; perYear: number }[] = [
  { id: "annual", label: "per year", perYear: 1 },
  { id: "monthly", label: "per month", perYear: 12 },
  { id: "biweekly", label: "every 2 weeks", perYear: 26 },
  { id: "weekly", label: "per week", perYear: 52 },
];

interface Snapshot {
  incomeType: IncomeType;
  salary: string;
  period: Period;
  hourlyWage: string;
  hoursPerWeek: string;
  filing: FilingStatus;
  stateCode: string;
  city: string;
}

export default function PaycheckCalculator() {
  const init: Snapshot = useMemo(
    () => ({
      incomeType: "salary",
      salary: "",
      period: "annual",
      hourlyWage: "",
      hoursPerWeek: "40",
      filing: "single",
      stateCode: "",
      city: "",
    }),
    []
  );
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.paycheck);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [init]);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.paycheck, s);
  }, [loaded, s]);

  const set = <K extends keyof Snapshot>(k: K, v: Snapshot[K]) =>
    setS((p) => ({ ...p, [k]: v }));
  const clear = () => {
    removeStored(STORAGE_KEYS.paycheck);
    setS(init);
  };

  const wagesAnnual =
    s.incomeType === "salary"
      ? num(s.salary) * (PERIODS.find((p) => p.id === s.period)?.perYear ?? 1)
      : num(s.hourlyWage) * num(s.hoursPerWeek) * 52;

  const taxes = useMemo(
    () => estimateTaxes(wagesAnnual, 0, s.filing, s.stateCode, s.city),
    [wagesAnnual, s.filing, s.stateCode, s.city]
  );
  const ready = taxes.gross > 0;
  const fica = taxes.socialSecurity + taxes.medicare;
  const stateLocal = taxes.state + taxes.local;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your pay" />
          <div className="mt-5 inline-flex rounded-full border border-sand bg-paper p-1">
            {(["salary", "hourly"] as IncomeType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("incomeType", t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                  s.incomeType === t
                    ? "bg-ink text-cream"
                    : "text-stone hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {s.incomeType === "salary" ? (
            <div className="mt-5">
              <Label>Salary</Label>
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <MoneyInput
                    value={s.salary}
                    onChange={(v) => set("salary", v)}
                    placeholder="55,000"
                  />
                </div>
                <select
                  value={s.period}
                  onChange={(e) => set("period", e.target.value as Period)}
                  className="flex-shrink-0 rounded-xl border border-sand bg-paper px-3 py-3 text-ink focus:border-amber focus:outline-none"
                >
                  {PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Hourly wage</Label>
                <MoneyInput
                  value={s.hourlyWage}
                  onChange={(v) => set("hourlyWage", v)}
                  placeholder="22.50"
                />
              </div>
              <div>
                <Label>Hours per week</Label>
                <PlainInput
                  value={s.hoursPerWeek}
                  onChange={(v) => set("hoursPerWeek", v)}
                  placeholder="40"
                  suffix="hrs"
                />
              </div>
            </div>
          )}
        </Card>

        <Card>
          <SectionHeading step={2} title="Where you live" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>State</Label>
              <select
                value={s.stateCode}
                onChange={(e) => set("stateCode", e.target.value)}
                className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
              >
                <option value="">Select a state…</option>
                {US_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>City (optional)</Label>
              <PlainInput
                value={s.city}
                onChange={(v) => set("city", v)}
                placeholder="e.g. New York City"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Filing status</Label>
              <select
                value={s.filing}
                onChange={(e) => set("filing", e.target.value as FilingStatus)}
                className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
              >
                {FILING_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {s.stateCode && !hasStateIncomeTax(s.stateCode) && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-forest/10 px-3 py-2 text-sm font-medium text-forest">
              <Info className="h-4 w-4" />
              {US_STATES.find((st) => st.code === s.stateCode)?.name} has no state
              income tax on wages.
            </p>
          )}
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-gradient-to-br from-ink-700 to-ink p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Take-home pay
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? usd(taxes.net / 12) : "$0"}
              <span className="ml-1 font-sans text-base font-medium text-cream/55">
                /mo
              </span>
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? `${usd(taxes.net / 26)} every 2 weeks · ${usd(taxes.net)}/yr`
                : "Enter your pay to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <div className="flex items-center gap-5">
                <Donut
                  segments={[
                    { value: taxes.net, color: "var(--color-forest)", label: "Take-home" },
                    { value: taxes.federal, color: "var(--color-stone)", label: "Federal" },
                    { value: fica, color: "var(--color-amber)", label: "FICA" },
                    { value: stateLocal, color: "var(--color-terracotta)", label: "State/local" },
                  ]}
                  centerTop={`${Math.round((taxes.net / taxes.gross) * 100)}%`}
                  centerSub="take-home"
                />
                <dl className="min-w-0 flex-1 space-y-2 text-sm">
                  <ResultRow label="Gross pay" value={usd(taxes.gross)} strong />
                  <ResultRow label="Federal tax" value={`– ${usd(taxes.federal)}`} muted />
                  <ResultRow
                    label="Soc. Security + Medicare"
                    value={`– ${usd(fica)}`}
                    muted
                  />
                  {stateLocal > 0 && (
                    <ResultRow label="State / local" value={`– ${usd(stateLocal)}`} muted />
                  )}
                </dl>
              </div>
              <p className="mt-5 border-t border-ink-600 pt-3 text-xs text-cream/45">
                Effective tax rate ≈ {(taxes.effectiveRate * 100).toFixed(1)}%.
                Estimate based on 2025 federal figures; excludes 401(k), health,
                and other pre-tax deductions.
              </p>
            </div>
          )}
        </div>
        <ClearBar onClear={clear} />
      </div>
    </div>
  );
}
