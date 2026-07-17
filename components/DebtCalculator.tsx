"use client";

import { useEffect, useMemo, useState } from "react";
import { TrendDown as TrendingDown, Info } from "@phosphor-icons/react/dist/ssr";
import {
  simulatePayoff,
  minimumsOnly,
  payoffTimeline,
  estimateMinPayment,
  type DebtInput,
  type Strategy,
} from "@/lib/debtPayoff";
import { Donut, Legend, TrendChart } from "@/components/Charts";
import { readBudgetSummary } from "@/lib/calcImports";
import { LinkSimple as Link2 } from "@phosphor-icons/react/dist/ssr";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";
import {
  Card,
  SectionHeading,
  Label,
  MoneyInput,
  ResultRow,
  AddButton,
  RemoveButton,
  ClearBar,
  num,
  usd,
  formatDuration,
} from "@/components/CalcUI";

interface DebtRow {
  id: number;
  name: string;
  balance: string;
  apr: string;
  term: string; // optional loan length in months
  minPayment: string;
}

const DEFAULT_DEBTS: DebtRow[] = [
  { id: 1, name: "Credit card", balance: "", apr: "", term: "", minPayment: "" },
  { id: 2, name: "Car loan", balance: "", apr: "", term: "", minPayment: "" },
];

interface Snapshot {
  debts: DebtRow[];
  extra: string;
  strategy: Strategy;
}

let nextId = 100;

export default function DebtCalculator() {
  const [debts, setDebts] = useState<DebtRow[]>(DEFAULT_DEBTS);
  const [extra, setExtra] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("avalanche");
  const [loaded, setLoaded] = useState(false);
  const [budgetImport, setBudgetImport] = useState<{ leftover: number } | null>(
    null
  );
  useEffect(() => {
    const b = readBudgetSummary();
    if (b && b.leftover > 0) setBudgetImport({ leftover: b.leftover });
  }, []);

  useEffect(() => {
    const s = loadJSON<Snapshot>(STORAGE_KEYS.debt);
    if (s) {
      if (Array.isArray(s.debts) && s.debts.length) setDebts(s.debts);
      setExtra(s.extra ?? "");
      setStrategy(s.strategy ?? "avalanche");
      const ids = (s.debts ?? []).map((d) => d.id);
      if (ids.length) nextId = Math.max(nextId, ...ids) + 1;
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.debt, { debts, extra, strategy });
  }, [loaded, debts, extra, strategy]);

  function handleClear() {
    removeStored(STORAGE_KEYS.debt);
    setDebts(DEFAULT_DEBTS);
    setExtra("");
    setStrategy("avalanche");
  }

  const addDebt = () =>
    setDebts((p) => [
      ...p,
      { id: nextId++, name: "", balance: "", apr: "", term: "", minPayment: "" },
    ]);
  const updateDebt = (id: number, patch: Partial<DebtRow>) =>
    setDebts((p) => p.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const removeDebt = (id: number) =>
    setDebts((p) => p.filter((d) => d.id !== id));

  const debtInputs: DebtInput[] = useMemo(
    () =>
      debts.map((d) => {
        const balance = num(d.balance);
        const apr = num(d.apr);
        const userMin = num(d.minPayment);
        // Fall back to an estimate (amortized payment if a term is given,
        // otherwise a credit-card-style minimum).
        const minPayment =
          userMin > 0 ? userMin : estimateMinPayment(balance, apr, num(d.term));
        return {
          id: d.id,
          name: d.name.trim() || "Debt",
          balance,
          apr,
          minPayment,
          term: num(d.term),
        };
      }),
    [debts]
  );

  const totalBalance = debtInputs.reduce((s, d) => s + d.balance, 0);
  const totalMin = debtInputs.reduce(
    (s, d) => s + (d.balance > 0 ? d.minPayment : 0),
    0
  );
  const extraN = num(extra);
  const hasDebt = totalBalance > 0;

  const plan = useMemo(
    () => simulatePayoff(debtInputs, extraN, strategy),
    [debtInputs, extraN, strategy]
  );
  const baseline = useMemo(() => minimumsOnly(debtInputs), [debtInputs]);
  const timeline = useMemo(
    () => payoffTimeline(debtInputs, extraN, strategy),
    [debtInputs, extraN, strategy]
  );

  const interestSaved =
    !baseline.neverPaysOff && !plan.neverPaysOff
      ? baseline.totalInterest - plan.totalInterest
      : 0;
  const monthsSaved =
    !baseline.neverPaysOff && !plan.neverPaysOff
      ? baseline.months - plan.months
      : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="Your debts" />
          <div className="mt-5 space-y-4">
            {debts.map((d) => {
              const estMin = estimateMinPayment(
                num(d.balance),
                num(d.apr),
                num(d.term)
              );
              return (
                <div
                  key={d.id}
                  className="rounded-2xl border border-sand bg-paper/60 p-4"
                >
                  <div className="flex items-center gap-2">
                    <input
                      value={d.name}
                      onChange={(e) =>
                        updateDebt(d.id, { name: e.target.value })
                      }
                      placeholder="Debt name"
                      className="min-w-0 flex-1 rounded-xl border border-sand bg-paper px-4 py-2.5 text-sm font-medium text-ink focus:border-amber focus:outline-none"
                    />
                    <RemoveButton onClick={() => removeDebt(d.id)} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <LabeledMini label="Balance" prefix="$">
                      <input
                        value={d.balance}
                        onChange={(e) =>
                          updateDebt(d.id, { balance: e.target.value })
                        }
                        inputMode="decimal"
                        placeholder="2,000"
                        className="w-full rounded-lg border border-sand bg-paper py-2 pl-6 pr-2 text-sm text-ink focus:border-amber focus:outline-none"
                      />
                    </LabeledMini>
                    <LabeledMini label="APR" suffix="%">
                      <input
                        value={d.apr}
                        onChange={(e) =>
                          updateDebt(d.id, { apr: e.target.value })
                        }
                        inputMode="decimal"
                        placeholder="22"
                        className="w-full rounded-lg border border-sand bg-paper py-2 pl-2.5 pr-6 text-sm text-ink focus:border-amber focus:outline-none"
                      />
                    </LabeledMini>
                    <LabeledMini label="Term (if a loan)" suffix="mo">
                      <input
                        value={d.term}
                        onChange={(e) =>
                          updateDebt(d.id, { term: e.target.value })
                        }
                        inputMode="decimal"
                        placeholder="optional"
                        className="w-full rounded-lg border border-sand bg-paper py-2 pl-2.5 pr-8 text-sm text-ink focus:border-amber focus:outline-none"
                      />
                    </LabeledMini>
                    <LabeledMini label="Min / mo" prefix="$">
                      <input
                        value={d.minPayment}
                        onChange={(e) =>
                          updateDebt(d.id, { minPayment: e.target.value })
                        }
                        inputMode="decimal"
                        placeholder={
                          num(d.balance) > 0 && estMin > 0
                            ? `≈ ${usd(estMin)}`
                            : "50"
                        }
                        className="w-full rounded-lg border border-sand bg-paper py-2 pl-6 pr-2 text-sm text-ink focus:border-amber focus:outline-none"
                      />
                    </LabeledMini>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs leading-5 text-stone">
            Don&apos;t know your minimum? Leave it blank and we&apos;ll estimate
            it. For a loan with a set length, add the term and we&apos;ll use its
            real payment.
          </p>
          <AddButton onClick={addDebt} label="Add a debt" />
        </Card>

        <Card>
          <SectionHeading step={2} title="Your strategy" />
          <div className="mt-5">
            <Label>Extra you can pay each month</Label>
            <MoneyInput value={extra} onChange={setExtra} placeholder="100" />
            {budgetImport && (
              <button
                type="button"
                onClick={() => setExtra(String(budgetImport.leftover))}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition-colors hover:text-ink"
              >
                <Link2 className="h-3.5 w-3.5" />
                Use my budget leftover ({usd(budgetImport.leftover)}/mo)
              </button>
            )}
            <p className="mt-2 text-xs text-stone">
              On top of the minimums above. Even a little speeds things up a lot.
            </p>
          </div>

          <div className="mt-5">
            <Label>Pay off in what order?</Label>
            <div className="inline-flex rounded-full border border-sand bg-paper p-1">
              {(
                [
                  ["avalanche", "Highest rate first"],
                  ["snowball", "Smallest balance first"],
                ] as [Strategy, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStrategy(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    strategy === value
                      ? "bg-ink text-cream"
                      : "text-stone hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone">
              {strategy === "avalanche"
                ? "Avalanche: targets your highest-interest debt first. Saves the most money."
                : "Snowball: clears your smallest balance first, for quick wins that keep you going."}
            </p>
          </div>
        </Card>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Debt-free in
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {hasDebt && !plan.neverPaysOff
                ? formatDuration(plan.months)
                : "—"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {!hasDebt
                ? "Add a debt to start"
                : plan.neverPaysOff
                  ? "Your payments don't cover the interest yet"
                  : `paying ${usd(totalMin + extraN)}/mo total`}
            </p>
          </div>

          {hasDebt && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow
                  label="Total you owe"
                  value={usd(totalBalance)}
                  strong
                />
                <ResultRow
                  label="Interest you'll pay"
                  value={usd(plan.totalInterest)}
                  muted
                />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow
                    label="Total paid"
                    value={usd(plan.totalPaid)}
                    strong
                    accent
                  />
                </div>
              </dl>

              {!plan.neverPaysOff && (
                <div className="mt-7 flex items-center gap-5">
                  <Donut
                    segments={[
                      {
                        value: totalBalance,
                        color: "var(--color-forest)",
                        label: "Principal",
                      },
                      {
                        value: plan.totalInterest,
                        color: "var(--color-terracotta)",
                        label: "Interest",
                      },
                    ]}
                    centerTop={usd(plan.totalPaid)}
                    centerSub="total paid"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="mb-3 text-xs font-medium text-cream/55">
                      Where your money goes
                    </p>
                    <Legend
                      items={[
                        {
                          color: "var(--color-forest)",
                          label: "Principal",
                          value: usd(totalBalance),
                        },
                        {
                          color: "var(--color-terracotta)",
                          label: "Interest",
                          value: usd(plan.totalInterest),
                        },
                      ]}
                    />
                  </div>
                </div>
              )}

              {interestSaved > 1 && (
                <div className="mt-7 rounded-2xl border border-ink-600 bg-ink/50 p-4">
                  <p className="mb-3 text-xs font-medium text-cream/55">
                    Balance over time
                  </p>
                  <TrendChart
                    series={[
                      {
                        data: timeline.minimums,
                        color: "var(--color-stone)",
                        dashed: true,
                      },
                      {
                        data: timeline.plan,
                        color: "var(--color-forest)",
                        fill: true,
                      },
                    ]}
                    startLabel="Now"
                    endLabel={formatDuration(timeline.minimums.length - 1)}
                  />
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-cream/75">
                      <span className="h-2.5 w-2.5 rounded-full bg-forest" />
                      Your plan
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-cream/75">
                      <span className="h-2.5 w-2.5 rounded-full bg-stone" />
                      Minimums only
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm font-bold text-forest">
                    You save {usd(interestSaved)} in interest
                  </p>
                  <p className="text-xs leading-5 text-cream/70">
                    and you&apos;re debt-free about {formatDuration(monthsSaved)}{" "}
                    sooner.
                  </p>
                </div>
              )}

              {plan.neverPaysOff && plan.underwaterName && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-terracotta/40 bg-terracotta/10 p-3.5">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta" />
                  <p className="text-xs leading-5 text-cream/80">
                    The minimum on{" "}
                    <span className="font-semibold">{plan.underwaterName}</span>{" "}
                    barely covers its interest. Add even a small extra payment to
                    start making progress.
                  </p>
                </div>
              )}

              {plan.order.length > 1 && !plan.neverPaysOff && (
                <div className="mt-6">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-cream/55">
                    <TrendingDown className="h-3.5 w-3.5" />
                    Payoff order
                  </p>
                  <ol className="mt-3 space-y-2">
                    {plan.order.map((name, i) => (
                      <li
                        key={name}
                        className="flex items-center gap-2.5 text-sm text-cream/85"
                      >
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber text-xs font-bold text-ink">
                          {i + 1}
                        </span>
                        {name}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>

        <ClearBar onClear={handleClear} />
      </div>
    </div>
  );
}

function LabeledMini({
  label,
  prefix,
  suffix,
  children,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-1 block text-[11px] font-medium text-stone">
        {label}
      </span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-stone">
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-stone">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
