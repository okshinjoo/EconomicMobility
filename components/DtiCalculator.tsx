"use client";

import { useEffect, useMemo, useState } from "react";
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
  housing: string;
  car: string;
  student: string;
  cards: string;
  other: string;
}

const DEBT_FIELDS: { key: keyof Snapshot; label: string; placeholder: string }[] =
  [
    { key: "housing", label: "Rent / mortgage", placeholder: "1,200" },
    { key: "car", label: "Car payment", placeholder: "300" },
    { key: "student", label: "Student loans", placeholder: "200" },
    { key: "cards", label: "Credit card minimums", placeholder: "60" },
    { key: "other", label: "Other loans", placeholder: "0" },
  ];

export default function DtiCalculator() {
  const init: Snapshot = useMemo(
    () => ({
      income: "",
      housing: "",
      car: "",
      student: "",
      cards: "",
      other: "",
    }),
    []
  );
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.dti);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [init]);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.dti, s);
  }, [loaded, s]);

  const set = (k: keyof Snapshot, v: string) => setS((p) => ({ ...p, [k]: v }));

  const income = num(s.income);
  const totalDebt = DEBT_FIELDS.reduce((sum, f) => sum + num(s[f.key]), 0);
  const dti = income > 0 ? (totalDebt / income) * 100 : 0;
  const ready = income > 0;

  const band =
    dti <= 36
      ? { tone: "good", color: "var(--color-forest)", label: "Healthy", note: "Lenders generally see 36% or below as comfortable. You have room to breathe." }
      : dti <= 43
        ? { tone: "tight", color: "var(--color-amber)", label: "Manageable", note: "Still within reach for most loans, but paying down a debt or two would help." }
        : { tone: "bad", color: "var(--color-terracotta)", label: "High", note: "Above ~43% makes borrowing harder. Lowering debt or raising income would ease the strain." };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your income" />
          <div className="mt-5">
            <Label>Gross monthly income (before taxes)</Label>
            <MoneyInput
              value={s.income}
              onChange={(v) => set("income", v)}
              placeholder="4,000"
            />
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Monthly debt payments" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {DEBT_FIELDS.map((f) => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                <MoneyInput
                  value={s[f.key]}
                  onChange={(v) => set(f.key, v)}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone">
            Include only debt payments. Utilities, groceries, and
            subscriptions don&apos;t count.
          </p>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Your debt-to-income
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? `${dti.toFixed(0)}%` : "—"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? `${usd(totalDebt)} of debt on ${usd(income)} income`
                : "Enter your income to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              {/* gauge */}
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, dti)}%`, background: band.color }}
                />
                {/* 36% and 43% markers */}
                <span className="absolute top-0 h-full w-px bg-cream/30" style={{ left: "36%" }} />
                <span className="absolute top-0 h-full w-px bg-cream/30" style={{ left: "43%" }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-cream/45">
                <span>0%</span>
                <span>36%</span>
                <span>43%+</span>
              </div>

              <div
                className="mt-5 rounded-xl border p-3.5"
                style={{
                  borderColor: `${band.color}80`,
                  background: `${band.color}1a`,
                }}
              >
                <p className="text-sm font-bold" style={{ color: band.color }}>
                  {band.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-cream/75">
                  {band.note}
                </p>
              </div>

              <dl className="mt-5 space-y-2.5 text-sm">
                <ResultRow label="Total monthly debt" value={usd(totalDebt)} strong />
                <ResultRow label="Gross monthly income" value={usd(income)} muted />
              </dl>
            </div>
          )}
        </div>
        <ClearBar onClear={() => { removeStored(STORAGE_KEYS.dti); setS(init); }} />
      </div>
    </div>
  );
}
