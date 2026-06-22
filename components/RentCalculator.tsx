"use client";

import { useEffect, useMemo, useState } from "react";
import { Home } from "lucide-react";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";
import {
  Card,
  SectionHeading,
  Label,
  MoneyInput,
  ResultRow,
  ClearBar,
  num,
  usd,
} from "@/components/CalcUI";

interface Snapshot {
  income: string;
  debts: string;
}

export default function RentCalculator() {
  const init: Snapshot = useMemo(() => ({ income: "", debts: "" }), []);
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.rent);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [init]);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.rent, s);
  }, [loaded, s]);

  const income = num(s.income);
  const debts = num(s.debts);
  const ready = income > 0;

  // Classic 30% guideline + the 36% total-debt rule lenders often use.
  const moderate = income * 0.3;
  const conservative = income * 0.25;
  const stretch = income * 0.35;
  const debtAdjusted = Math.max(0, income * 0.36 - debts);
  const recommended =
    debts > 0 ? Math.min(moderate, debtAdjusted) : moderate;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your income" />
          <div className="mt-5">
            <Label>Monthly income (take-home)</Label>
            <MoneyInput
              value={s.income}
              onChange={(v) => setS((p) => ({ ...p, income: v }))}
              placeholder="3,500"
            />
            <p className="mt-2 text-xs text-stone">
              Use your monthly take-home pay. (Try the Paycheck Calculator if
              you&apos;re not sure.)
            </p>
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Other debts" hint="Optional" />
          <div className="mt-5">
            <Label>Other monthly debt payments</Label>
            <MoneyInput
              value={s.debts}
              onChange={(v) => setS((p) => ({ ...p, debts: v }))}
              placeholder="250"
            />
            <p className="mt-2 text-xs text-stone">
              Car payment, student loans, credit card minimums. We&apos;ll make
              sure rent plus these stays manageable.
            </p>
          </div>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-gradient-to-br from-ink-700 to-ink p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Comfortable rent
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? usd(recommended) : "$0"}
              <span className="ml-1 font-sans text-base font-medium text-cream/55">
                /mo
              </span>
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? "based on the 30% guideline"
                : "Enter your income to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow label="Conservative (25%)" value={`${usd(conservative)}/mo`} muted />
                <ResultRow label="Moderate (30%)" value={`${usd(moderate)}/mo`} accent strong />
                <ResultRow label="Stretch (35%)" value={`${usd(stretch)}/mo`} muted />
              </dl>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-forest/40 bg-forest/10 p-3.5">
                <Home className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
                <p className="text-xs leading-5 text-cream/80">
                  {debts > 0 && debtAdjusted < moderate
                    ? `With your other debts, keeping rent near ${usd(
                        debtAdjusted
                      )} keeps your total monthly debt under the ~36% lenders look for.`
                    : "Staying at or below 30% leaves room for everything else — food, transport, savings, and the unexpected."}
                </p>
              </div>
            </div>
          )}
        </div>
        <ClearBar onClear={() => { removeStored(STORAGE_KEYS.rent); setS(init); }} />
      </div>
    </div>
  );
}
