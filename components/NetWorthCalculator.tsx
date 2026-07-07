"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  num,
  usd,
  Card,
  SectionHeading,
  Label,
  MoneyInput,
  ClearBar,
} from "@/components/CalcUI";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";

interface Snapshot {
  assets: Record<string, string>;
  debts: Record<string, string>;
}

const ASSET_FIELDS: { id: string; label: string; hint?: string }[] = [
  { id: "cash", label: "Checking & cash" },
  { id: "savings", label: "Savings" },
  { id: "invest", label: "Investments (brokerage)" },
  { id: "retirement", label: "Retirement accounts (401(k), IRA)" },
  { id: "vehicle", label: "Vehicle value", hint: "What it would sell for, not what you paid." },
  { id: "otherAsset", label: "Other (home equity, valuables)" },
];

const DEBT_FIELDS: { id: string; label: string; hint?: string }[] = [
  { id: "cards", label: "Credit card balances" },
  { id: "studentLoans", label: "Student loans" },
  { id: "autoLoan", label: "Car loan balance" },
  { id: "otherDebt", label: "Other debts (personal loans, money owed)" },
];

const empty = (fields: { id: string }[]) =>
  Object.fromEntries(fields.map((f) => [f.id, ""]));

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Record<string, string>>(() => empty(ASSET_FIELDS));
  const [debts, setDebts] = useState<Record<string, string>>(() => empty(DEBT_FIELDS));

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.netWorth);
    if (saved?.assets) {
      setAssets({ ...empty(ASSET_FIELDS), ...saved.assets });
      setDebts({ ...empty(DEBT_FIELDS), ...saved.debts });
    }
  }, []);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.netWorth, { assets, debts } satisfies Snapshot);
  }, [assets, debts]);

  const totals = useMemo(() => {
    const totalAssets = ASSET_FIELDS.reduce((s, f) => s + num(assets[f.id] ?? ""), 0);
    const totalDebts = DEBT_FIELDS.reduce((s, f) => s + num(debts[f.id] ?? ""), 0);
    return { totalAssets, totalDebts, net: totalAssets - totalDebts };
  }, [assets, debts]);

  const { totalAssets, totalDebts, net } = totals;
  const hasInput = totalAssets > 0 || totalDebts > 0;
  const assetShare = totalAssets + totalDebts > 0 ? totalAssets / (totalAssets + totalDebts) : 0;

  const insight = !hasInput
    ? null
    : net < 0
      ? "A negative number is normal early on, especially with student loans in the picture. The direction matters more than today's level: this number climbs as debts shrink and savings grow, so check back each month."
      : net < 10000
        ? "You're above zero, and that puts you ahead of a lot of people at the start. Watch the trend: recheck monthly and the climb becomes its own motivation."
        : "Solid footing. From here the biggest lever is usually moving idle cash toward goals: an emergency fund first, then investing for the long run.";

  const clear = () => {
    setAssets(empty(ASSET_FIELDS));
    setDebts(empty(DEBT_FIELDS));
    removeStored(STORAGE_KEYS.netWorth);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Inputs */}
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="What you own" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ASSET_FIELDS.map((f) => (
              <div key={f.id}>
                <Label>{f.label}</Label>
                <MoneyInput
                  value={assets[f.id] ?? ""}
                  onChange={(v) => setAssets((prev) => ({ ...prev, [f.id]: v }))}
                  placeholder="0"
                />
                {f.hint && <p className="mt-1 text-xs text-stone">{f.hint}</p>}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="What you owe" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {DEBT_FIELDS.map((f) => (
              <div key={f.id}>
                <Label>{f.label}</Label>
                <MoneyInput
                  value={debts[f.id] ?? ""}
                  onChange={(v) => setDebts((prev) => ({ ...prev, [f.id]: v }))}
                  placeholder="0"
                />
                {f.hint && <p className="mt-1 text-xs text-stone">{f.hint}</p>}
              </div>
            ))}
          </div>
        </Card>

        <ClearBar onClear={clear} />
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl bg-forest p-6 text-cream sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            Your net worth
          </p>
          <p className="mt-2 font-display text-5xl font-bold tabular-nums text-amber">
            {hasInput ? usd(net) : "—"}
          </p>
          <p className="mt-1 text-sm text-cream/70">
            what you own minus what you owe
          </p>

          {hasInput && (
            <>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-cream/80">Own</span>
                  <span className="font-display text-lg font-bold tabular-nums">
                    {usd(totalAssets)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-forest-700">
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${assetShare * 100}%` }}
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-cream/80">Owe</span>
                  <span className="font-display text-lg font-bold tabular-nums">
                    {usd(totalDebts)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-forest-700">
                  <div
                    className="h-full rounded-full bg-terracotta"
                    style={{ width: `${(1 - assetShare) * 100}%` }}
                  />
                </div>
              </div>

              {insight && (
                <p className="mt-6 rounded-xl bg-forest-700 p-4 text-sm leading-6 text-cream/85">
                  {insight}
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-sand bg-cream p-5 text-sm leading-6 text-stone">
          Net worth is a snapshot, not a report card. Two guides pair well with
          it:{" "}
          <Link
            href="/learn/investing/building-generational-wealth"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Building Wealth When You&apos;re Starting From Zero
          </Link>{" "}
          and{" "}
          <Link
            href="/learn/budgeting/building-a-savings-habit"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Building a Savings Habit That Sticks
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
