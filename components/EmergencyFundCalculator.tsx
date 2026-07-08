"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
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

interface Snapshot {
  expenses: string;
  months: string;
  current: string;
  monthly: string;
}

export default function EmergencyFundCalculator() {
  const init: Snapshot = useMemo(
    () => ({ expenses: "", months: "3", current: "", monthly: "" }),
    []
  );
  const [s, setS] = useState<Snapshot>(init);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.emergencyFund);
    if (saved) setS({ ...init, ...saved });
    setLoaded(true);
  }, [init]);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.emergencyFund, s);
  }, [loaded, s]);

  const set = (k: keyof Snapshot, v: string) => setS((p) => ({ ...p, [k]: v }));

  const expenses = num(s.expenses);
  const monthsTarget = num(s.months) || 3;
  const current = num(s.current);
  const monthly = num(s.monthly);

  const target = expenses * monthsTarget;
  const gap = Math.max(0, target - current);
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const monthsToBuild = monthly > 0 ? gap / monthly : Infinity;
  const ready = expenses > 0;
  const done = ready && gap <= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your safety net" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Essential monthly expenses</Label>
              <MoneyInput
                value={s.expenses}
                onChange={(v) => set("expenses", v)}
                placeholder="2,000"
              />
            </div>
            <div>
              <Label>Months of cushion</Label>
              <PlainInput
                value={s.months}
                onChange={(v) => set("months", v)}
                placeholder="3"
                suffix="mo"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[3, 6].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => set("months", String(m))}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  num(s.months) === m
                    ? "border-ink bg-ink text-cream"
                    : "border-sand bg-paper text-stone hover:border-ink/30"
                }`}
              >
                {m} months
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone">
            Count only the essentials: rent, food, utilities, transport,
            minimum debt payments. Most people aim for 3 to 6 months.
          </p>
        </Card>

        <Card>
          <SectionHeading step={2} title="Building it" hint="Optional" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Saved so far</Label>
              <MoneyInput
                value={s.current}
                onChange={(v) => set("current", v)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Saving each month</Label>
              <MoneyInput
                value={s.monthly}
                onChange={(v) => set("monthly", v)}
                placeholder="150"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Your target fund
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {ready ? usd(target) : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {ready
                ? `${monthsTarget} months of essentials`
                : "Enter your expenses to start"}
            </p>
          </div>

          {ready && (
            <div className="p-7">
              <div className="mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cream/70">Progress</span>
                  <span className="font-medium text-cream">
                    {usd(current)} of {usd(target)}
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-forest transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <dl className="space-y-2.5 text-sm">
                <ResultRow
                  label="Still to save"
                  value={usd(gap)}
                  strong
                  tone={done ? "good" : undefined}
                />
                {!done && monthly > 0 && (
                  <ResultRow
                    label="Time to fully funded"
                    value={formatDuration(monthsToBuild)}
                    accent
                  />
                )}
              </dl>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-forest/40 bg-forest/10 p-3.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
                <p className="text-xs leading-5 text-cream/80">
                  {done
                    ? "You're fully funded. That's a real cushion against life's surprises."
                    : monthly > 0
                      ? `Saving ${usd(monthly)} a month gets you there in about ${formatDuration(
                          monthsToBuild
                        )}. Even a partial fund beats none.`
                      : "Start with a small goal; even $500 covers a lot of common emergencies. Add a monthly amount to see your timeline."}
                </p>
              </div>
            </div>
          )}
        </div>
        <ClearBar onClear={() => { removeStored(STORAGE_KEYS.emergencyFund); setS(init); }} />
      </div>
    </div>
  );
}
