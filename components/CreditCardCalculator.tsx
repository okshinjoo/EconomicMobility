"use client";

import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import { simulatePayoff, loanPayment } from "@/lib/debtPayoff";
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
  formatDuration,
} from "@/components/CalcUI";

type Mode = "payment" | "date";

interface Snapshot {
  mode: Mode;
  balance: string;
  apr: string;
  payment: string;
  months: string;
}

export default function CreditCardCalculator() {
  const init: Snapshot = useMemo(
    () => ({ mode: "payment", balance: "", apr: "22", payment: "", months: "12" }),
    []
  );
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.creditCard);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [init]);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.creditCard, s);
  }, [loaded, s]);

  const set = (k: keyof Snapshot, v: string) => setS((p) => ({ ...p, [k]: v }));

  const balance = num(s.balance);
  const apr = num(s.apr);
  const ready = balance > 0 && apr >= 0;

  const byPayment = useMemo(
    () =>
      simulatePayoff(
        [{ id: 1, name: "Card", balance, apr, minPayment: num(s.payment) }],
        0,
        "avalanche"
      ),
    [balance, apr, s.payment]
  );
  const targetMonths = num(s.months);
  const requiredPayment = loanPayment(balance, apr, targetMonths);

  const months = s.mode === "payment" ? byPayment.months : targetMonths;
  const interest =
    s.mode === "payment"
      ? byPayment.totalInterest
      : Math.max(0, requiredPayment * targetMonths - balance);
  const totalPaid = balance + interest;
  const neverPays = s.mode === "payment" && byPayment.neverPaysOff;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your card" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Balance</Label>
              <MoneyInput
                value={s.balance}
                onChange={(v) => set("balance", v)}
                placeholder="2,500"
              />
            </div>
            <div>
              <Label>Interest rate (APR)</Label>
              <PlainInput
                value={s.apr}
                onChange={(v) => set("apr", v)}
                placeholder="22"
                suffix="%"
              />
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading step={2} title="Your plan" />
          <div className="mt-5 inline-flex rounded-full border border-sand bg-paper p-1">
            {(
              [
                ["payment", "I'll pay a set amount"],
                ["date", "I want it gone by a date"],
              ] as [Mode, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => set("mode", value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  s.mode === value ? "bg-ink text-cream" : "text-stone hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {s.mode === "payment" ? (
            <div className="mt-5">
              <Label>I&apos;ll pay each month</Label>
              <MoneyInput
                value={s.payment}
                onChange={(v) => set("payment", v)}
                placeholder="150"
              />
            </div>
          ) : (
            <div className="mt-5">
              <Label>Pay it off in</Label>
              <PlainInput
                value={s.months}
                onChange={(v) => set("months", v)}
                placeholder="12"
                suffix="months"
              />
            </div>
          )}
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-gradient-to-br from-ink-700 to-ink p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              {s.mode === "payment" ? "Debt-free in" : "Pay each month"}
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {!ready
                ? "—"
                : s.mode === "payment"
                  ? neverPays
                    ? "—"
                    : formatDuration(months)
                  : usd(requiredPayment)}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {!ready
                ? "Enter your balance to start"
                : s.mode === "payment"
                  ? neverPays
                    ? "that payment won't cover the interest"
                    : `paying ${usd(num(s.payment))}/mo`
                  : `to clear ${usd(balance)} in ${targetMonths} months`}
            </p>
          </div>

          {ready && !neverPays && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow label="Balance" value={usd(balance)} strong />
                <ResultRow label="Interest you'll pay" value={usd(interest)} muted />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow label="Total paid" value={usd(totalPaid)} strong accent />
                </div>
              </dl>

              <div className="mt-7 flex items-center gap-5">
                <Donut
                  segments={[
                    { value: balance, color: "var(--color-forest)", label: "Balance" },
                    { value: interest, color: "var(--color-terracotta)", label: "Interest" },
                  ]}
                  centerTop={usd(totalPaid)}
                  centerSub="total paid"
                />
                <div className="min-w-0 flex-1">
                  <p className="mb-3 text-xs font-medium text-cream/55">
                    Balance vs. interest
                  </p>
                  <Legend
                    items={[
                      { color: "var(--color-forest)", label: "Balance", value: usd(balance) },
                      { color: "var(--color-terracotta)", label: "Interest", value: usd(interest) },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {ready && neverPays && (
            <div className="flex items-start gap-2 p-7 text-sm text-cream/80">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta" />
              <span>
                At {apr}% APR, {usd(num(s.payment))}/month doesn&apos;t cover the
                interest, so the balance never goes down. Try a higher payment.
              </span>
            </div>
          )}
        </div>
        <ClearBar onClear={() => { removeStored(STORAGE_KEYS.creditCard); setS(init); }} />
      </div>
    </div>
  );
}
