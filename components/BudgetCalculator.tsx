"use client";

import AnimatedNumber from "@/components/AnimatedNumber";
import SaveToProfile from "@/components/SaveToProfile";

import { useEffect, useMemo, useState } from "react";
import { Plus, X, Info, ArrowCounterClockwise as RotateCcw, LinkSimple as Link2 } from "@phosphor-icons/react/dist/ssr";
import {
  estimateTaxes,
  FILING_OPTIONS,
  US_STATES,
  hasStateIncomeTax,
  type FilingStatus,
} from "@/lib/taxData";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";
import { getBudgetInsights, type BudgetStatus } from "@/lib/budgetInsights";
import { readDebtSummary } from "@/lib/calcImports";
import { Donut } from "@/components/Charts";

type IncomeType = "salary" | "hourly";
type Frequency = "monthly" | "annual";
type SalaryPeriod = "annual" | "monthly" | "biweekly" | "weekly";
type TaxBasis = "gross" | "net";

const SALARY_PERIODS: { id: SalaryPeriod; label: string; perYear: number }[] = [
  { id: "annual", label: "per year", perYear: 1 },
  { id: "monthly", label: "per month", perYear: 12 },
  { id: "biweekly", label: "every 2 weeks", perYear: 26 },
  { id: "weekly", label: "per week", perYear: 52 },
];

interface IncomeRow {
  id: number;
  label: string;
  amount: string;
  frequency: Frequency;
}

interface ExpenseRow {
  id: number;
  label: string;
  amount: string;
}

interface BudgetSnapshot {
  incomeType: IncomeType;
  salary: string;
  salaryPeriod: SalaryPeriod;
  taxBasis: TaxBasis;
  hourlyWage: string;
  hoursPerWeek: string;
  filing: FilingStatus;
  stateCode: string;
  city: string;
  otherIncome: IncomeRow[];
  expenses: ExpenseRow[];
}

const DEFAULT_EXPENSES: ExpenseRow[] = [
  { id: 1, label: "Rent / housing", amount: "" },
  { id: 2, label: "Utilities", amount: "" },
  { id: 3, label: "Groceries", amount: "" },
  { id: 4, label: "Transportation", amount: "" },
  { id: 5, label: "Phone & internet", amount: "" },
  { id: 6, label: "Insurance", amount: "" },
  { id: 7, label: "Subscriptions", amount: "" },
];

const num = (v: string) => {
  // Strip thousands separators and $ first — parseFloat("1,500") reads 1.
  const n = parseFloat(v.replace(/[$,\s_]/g, ""));
  return isNaN(n) || n < 0 ? 0 : n;
};

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

let nextId = 100;

export default function BudgetCalculator() {
  const [incomeType, setIncomeType] = useState<IncomeType>("salary");
  const [salary, setSalary] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>("annual");
  const [taxBasis, setTaxBasis] = useState<TaxBasis>("gross");
  const [hourlyWage, setHourlyWage] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");

  const [filing, setFiling] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");

  const [otherIncome, setOtherIncome] = useState<IncomeRow[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRow[]>(DEFAULT_EXPENSES);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const s = loadJSON<BudgetSnapshot>(STORAGE_KEYS.budget);
    if (s) {
      setIncomeType(s.incomeType ?? "salary");
      setSalary(s.salary ?? "");
      setSalaryPeriod(s.salaryPeriod ?? "annual");
      setTaxBasis(s.taxBasis ?? "gross");
      setHourlyWage(s.hourlyWage ?? "");
      setHoursPerWeek(s.hoursPerWeek ?? "40");
      setFiling(s.filing ?? "single");
      setStateCode(s.stateCode ?? "");
      setCity(s.city ?? "");
      if (Array.isArray(s.otherIncome)) setOtherIncome(s.otherIncome);
      if (Array.isArray(s.expenses)) setExpenses(s.expenses);
      // Keep new-row ids from colliding with restored ones.
      const ids = [...(s.otherIncome ?? []), ...(s.expenses ?? [])].map(
        (r) => r.id
      );
      if (ids.length) nextId = Math.max(nextId, ...ids) + 1;
    }
    setLoaded(true);
  }, []);

  // Persist on any change, but only after the initial load.
  useEffect(() => {
    if (!loaded) return;
    const snapshot: BudgetSnapshot = {
      incomeType,
      salary,
      salaryPeriod,
      taxBasis,
      hourlyWage,
      hoursPerWeek,
      filing,
      stateCode,
      city,
      otherIncome,
      expenses,
    };
    saveJSON(STORAGE_KEYS.budget, snapshot);
  }, [
    loaded,
    incomeType,
    salary,
    salaryPeriod,
    taxBasis,
    hourlyWage,
    hoursPerWeek,
    filing,
    stateCode,
    city,
    otherIncome,
    expenses,
  ]);

  function handleClear() {
    removeStored(STORAGE_KEYS.budget);
    setIncomeType("salary");
    setSalary("");
    setSalaryPeriod("annual");
    setTaxBasis("gross");
    setHourlyWage("");
    setHoursPerWeek("40");
    setFiling("single");
    setStateCode("");
    setCity("");
    setOtherIncome([]);
    setExpenses(DEFAULT_EXPENSES);
  }

  // --- derived values ---
  const wagesAnnual = useMemo(() => {
    if (incomeType === "salary") {
      const perYear =
        SALARY_PERIODS.find((p) => p.id === salaryPeriod)?.perYear ?? 1;
      return num(salary) * perYear;
    }
    return num(hourlyWage) * num(hoursPerWeek) * 52;
  }, [incomeType, salary, salaryPeriod, hourlyWage, hoursPerWeek]);

  const otherAnnual = useMemo(
    () =>
      otherIncome.reduce(
        (sum, r) =>
          sum + num(r.amount) * (r.frequency === "monthly" ? 12 : 1),
        0
      ),
    [otherIncome]
  );

  // When the user says their income is already after-tax, skip estimation and
  // treat what they entered as take-home.
  const taxes = useMemo(() => {
    if (taxBasis === "net") {
      const gross = Math.max(0, wagesAnnual) + Math.max(0, otherAnnual);
      return {
        gross,
        federal: 0,
        socialSecurity: 0,
        medicare: 0,
        state: 0,
        local: 0,
        localLabel: undefined,
        totalTax: 0,
        net: gross,
        effectiveRate: 0,
      };
    }
    return estimateTaxes(wagesAnnual, otherAnnual, filing, stateCode, city);
  }, [taxBasis, wagesAnnual, otherAnnual, filing, stateCode, city]);

  const netMonthly = taxes.net / 12;
  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + num(e.amount), 0),
    [expenses]
  );
  const leftover = netMonthly - totalExpenses;
  const hasIncome = taxes.gross > 0;

  const insights = useMemo(
    () =>
      getBudgetInsights(
        netMonthly,
        expenses.map((e) => ({ label: e.label, amount: num(e.amount) }))
      ),
    [netMonthly, expenses]
  );

  // --- mutators ---
  const addOtherIncome = () =>
    setOtherIncome((p) => [
      ...p,
      { id: nextId++, label: "", amount: "", frequency: "monthly" },
    ]);
  const updateOtherIncome = (id: number, patch: Partial<IncomeRow>) =>
    setOtherIncome((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const removeOtherIncome = (id: number) =>
    setOtherIncome((p) => p.filter((r) => r.id !== id));

  const addExpense = () =>
    setExpenses((p) => [...p, { id: nextId++, label: "", amount: "" }]);
  const updateExpense = (id: number, patch: Partial<ExpenseRow>) =>
    setExpenses((p) => p.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const removeExpense = (id: number) =>
    setExpenses((p) => p.filter((e) => e.id !== id));

  // Import: pull total monthly debt payments from the Debt Payoff calculator.
  const [debtImport, setDebtImport] = useState<{
    monthlyPayment: number;
    count: number;
  } | null>(null);
  useEffect(() => setDebtImport(readDebtSummary()), []);
  const DEBT_LABEL = "Debt payments (imported)";
  function importDebts() {
    if (!debtImport) return;
    const amount = String(debtImport.monthlyPayment);
    setExpenses((p) => {
      const idx = p.findIndex((e) => e.label === DEBT_LABEL);
      if (idx >= 0) {
        const copy = [...p];
        copy[idx] = { ...copy[idx], amount };
        return copy;
      }
      return [...p, { id: nextId++, label: DEBT_LABEL, amount }];
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      {/* ---------------- Inputs ---------------- */}
      <div className="space-y-6">
        {/* Income */}
        <Card>
          <SectionHeading step={1} title="Your income" />

          <div className="mt-5 inline-flex rounded-full border border-sand bg-paper p-1">
            {(["salary", "hourly"] as IncomeType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setIncomeType(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                  incomeType === t
                    ? "bg-ink text-cream"
                    : "text-stone hover:text-ink"
                }`}
              >
                {t === "salary" ? "Salary" : "Hourly"}
              </button>
            ))}
          </div>

          {incomeType === "salary" ? (
            <div className="mt-5">
              <Label>Your salary</Label>
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <MoneyInput
                    value={salary}
                    onChange={setSalary}
                    placeholder="55,000"
                  />
                </div>
                <select
                  value={salaryPeriod}
                  onChange={(e) =>
                    setSalaryPeriod(e.target.value as SalaryPeriod)
                  }
                  className="flex-shrink-0 rounded-xl border border-sand bg-paper px-3 py-3 text-ink focus:border-amber focus:outline-none"
                >
                  {SALARY_PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              {wagesAnnual > 0 && salaryPeriod !== "annual" && (
                <p className="mt-2 text-sm text-stone">
                  That&apos;s about{" "}
                  <span className="font-semibold text-ink">
                    {usd(wagesAnnual)}
                  </span>{" "}
                  a year.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Hourly wage</Label>
                <MoneyInput
                  value={hourlyWage}
                  onChange={setHourlyWage}
                  placeholder="22.50"
                />
              </div>
              <div>
                <Label>Hours per week</Label>
                <PlainInput
                  value={hoursPerWeek}
                  onChange={setHoursPerWeek}
                  placeholder="40"
                  suffix="hrs"
                />
              </div>
              {wagesAnnual > 0 && (
                <p className="text-sm text-stone sm:col-span-2">
                  That&apos;s about{" "}
                  <span className="font-semibold text-ink">
                    {usd(wagesAnnual)}
                  </span>{" "}
                  a year (× 52 weeks).
                </p>
              )}
            </div>
          )}

          <div className="mt-5">
            <Label>Is that before or after taxes?</Label>
            <div className="inline-flex rounded-full border border-sand bg-paper p-1">
              {(
                [
                  ["gross", "Before taxes"],
                  ["net", "After taxes"],
                ] as [TaxBasis, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTaxBasis(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    taxBasis === value
                      ? "bg-ink text-cream"
                      : "text-stone hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone">
              {taxBasis === "gross"
                ? "We'll estimate what you keep after taxes."
                : "You entered take-home pay, so we'll skip the tax estimate."}
            </p>
          </div>
        </Card>

        {/* Location & filing: only relevant when estimating taxes */}
        {taxBasis === "gross" && (
        <Card>
          <SectionHeading
            step={2}
            title="Where you live"
            hint="Adds estimated taxes"
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>State</Label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
              >
                <option value="">Select a state…</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>City (optional)</Label>
              <PlainInput
                value={city}
                onChange={setCity}
                placeholder="e.g. New York City"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Filing status</Label>
              <select
                value={filing}
                onChange={(e) => setFiling(e.target.value as FilingStatus)}
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
          {stateCode && !hasStateIncomeTax(stateCode) && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-forest/10 px-3 py-2 text-sm font-medium text-forest">
              <Info className="h-4 w-4" />
              {US_STATES.find((s) => s.code === stateCode)?.name} has no state
              income tax on wages.
            </p>
          )}
        </Card>
        )}

        {/* Other income */}
        <Card>
          <SectionHeading
            step={taxBasis === "gross" ? 3 : 2}
            title="Other income"
            hint="Side gigs, benefits, support…"
          />
          {otherIncome.length === 0 && (
            <p className="mt-4 text-sm text-stone">
              Nothing here yet. Add any income beyond your main job.
            </p>
          )}
          <div className="mt-4 space-y-3">
            {otherIncome.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <input
                  value={row.label}
                  onChange={(e) =>
                    updateOtherIncome(row.id, { label: e.target.value })
                  }
                  placeholder="Source (e.g. freelance)"
                  className="min-w-0 flex-1 rounded-xl border border-sand bg-paper px-4 py-2.5 text-sm text-ink focus:border-amber focus:outline-none"
                />
                <div className="relative w-28 flex-shrink-0">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone">
                    $
                  </span>
                  <input
                    value={row.amount}
                    onChange={(e) =>
                      updateOtherIncome(row.id, { amount: e.target.value })
                    }
                    inputMode="decimal"
                    placeholder="0"
                    className="w-full rounded-xl border border-sand bg-paper py-2.5 pl-7 pr-2 text-sm text-ink focus:border-amber focus:outline-none"
                  />
                </div>
                <select
                  value={row.frequency}
                  onChange={(e) =>
                    updateOtherIncome(row.id, {
                      frequency: e.target.value as Frequency,
                    })
                  }
                  className="flex-shrink-0 rounded-xl border border-sand bg-paper px-2 py-2.5 text-sm text-ink focus:border-amber focus:outline-none"
                >
                  <option value="monthly">/mo</option>
                  <option value="annual">/yr</option>
                </select>
                <RemoveButton onClick={() => removeOtherIncome(row.id)} />
              </div>
            ))}
          </div>
          <AddButton onClick={addOtherIncome} label="Add income source" />
        </Card>

        {/* Expenses */}
        <Card>
          <SectionHeading
            step={taxBasis === "gross" ? 4 : 3}
            title="Monthly expenses"
            hint="What you spend each month"
          />
          <div className="mt-4 space-y-3">
            {expenses.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <input
                  value={row.label}
                  onChange={(e) =>
                    updateExpense(row.id, { label: e.target.value })
                  }
                  placeholder="Expense name"
                  className="min-w-0 flex-1 rounded-xl border border-sand bg-paper px-4 py-2.5 text-sm text-ink focus:border-amber focus:outline-none"
                />
                <div className="relative w-32 flex-shrink-0">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone">
                    $
                  </span>
                  <input
                    value={row.amount}
                    onChange={(e) =>
                      updateExpense(row.id, { amount: e.target.value })
                    }
                    inputMode="decimal"
                    placeholder="0"
                    className="w-full rounded-xl border border-sand bg-paper py-2.5 pl-7 pr-3 text-sm text-ink focus:border-amber focus:outline-none"
                  />
                </div>
                <RemoveButton onClick={() => removeExpense(row.id)} />
              </div>
            ))}
          </div>
          <AddButton onClick={addExpense} label="Add expense" />

          {debtImport && (
            <button
              type="button"
              onClick={importDebts}
              className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-forest/30 bg-forest/5 p-4 text-left transition-colors hover:border-forest/50"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-forest/15 text-forest">
                <Link2 className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">
                  Import {usd(debtImport.monthlyPayment)}/mo from Debt Payoff
                </span>
                <span className="block text-xs text-stone">
                  Pulls the payments from your {debtImport.count}{" "}
                  {debtImport.count === 1 ? "debt" : "debts"} in as an expense.
                </span>
              </span>
              <Plus className="h-4 w-4 flex-shrink-0 text-forest" />
            </button>
          )}
        </Card>
      </div>

      {/* ---------------- Results ---------------- */}
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-ink-700 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Your monthly take-home
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {hasIncome ? <AnimatedNumber value={netMonthly} format={usd} /> : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {hasIncome
                ? `${usd(taxes.net)} per year`
                : "Add your income to start"}
            </p>
          </div>

          {hasIncome && (
            <>
              {/* income breakdown bar (only when estimating taxes) */}
              {taxBasis === "net" ? (
                <div className="flex items-start gap-2 p-7 text-sm text-cream/70">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber" />
                  <span>
                    You entered take-home pay, so there&apos;s no tax estimate
                    to show. Switch to &ldquo;Before taxes&rdquo; to see the
                    breakdown.
                  </span>
                </div>
              ) : (
              <div className="p-7">
                <BreakdownBar taxes={taxes} />

                <dl className="mt-6 space-y-2.5 text-sm">
                  <Row label="Gross income" value={usd(taxes.gross)} strong />
                  <Row
                    label="Federal tax"
                    value={`– ${usd(taxes.federal)}`}
                    muted
                  />
                  <Row
                    label="Social Security + Medicare"
                    value={`– ${usd(taxes.socialSecurity + taxes.medicare)}`}
                    muted
                  />
                  {taxes.state > 0 && (
                    <Row
                      label="State tax (est.)"
                      value={`– ${usd(taxes.state)}`}
                      muted
                    />
                  )}
                  {taxes.local > 0 && (
                    <Row
                      label={taxes.localLabel ?? "Local tax"}
                      value={`– ${usd(taxes.local)}`}
                      muted
                    />
                  )}
                  <div className="border-t border-ink-600 pt-2.5">
                    <Row
                      label="Take-home"
                      value={usd(taxes.net)}
                      strong
                      accent
                    />
                  </div>
                  <p className="pt-1 text-xs text-cream/45">
                    Effective tax rate ≈{" "}
                    {(taxes.effectiveRate * 100).toFixed(1)}%
                  </p>
                </dl>
              </div>
              )}

              {/* budget summary */}
              <div className="border-t border-ink-600 bg-ink-700 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  Monthly budget
                </p>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label="Take-home" value={usd(netMonthly)} />
                  <Row
                    label="Expenses"
                    value={`– ${usd(totalExpenses)}`}
                    muted
                  />
                  <div className="border-t border-ink-600 pt-2.5">
                    <Row
                      label={leftover >= 0 ? "Left to save / spend" : "Over budget by"}
                      value={usd(Math.abs(leftover))}
                      strong
                      tone={leftover >= 0 ? "good" : "bad"}
                    />
                  </div>
                </dl>

                {/* Budget verdict + category flags */}
                {insights.status && (
                  <div className="mt-5">
                    <StatusCallout status={insights.status} />
                    {insights.flags.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {insights.flags.map((flag, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-xs leading-5 text-cream/70"
                          >
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* 50/30/20 guide */}
                <div className="mt-6">
                  <p className="text-xs font-medium text-cream/55">
                    A 50/30/20 guide for {usd(netMonthly)}/mo
                  </p>
                  <div className="mt-3 space-y-2">
                    <GuideRow label="Needs (50%)" value={usd(netMonthly * 0.5)} pct={50} tone="forest" />
                    <GuideRow label="Wants (30%)" value={usd(netMonthly * 0.3)} pct={30} tone="amber" />
                    <GuideRow label="Savings (20%)" value={usd(netMonthly * 0.2)} pct={20} tone="terracotta" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 px-1">
          <p className="text-xs leading-5 text-stone">
            Estimates only, based on 2026 federal figures and simplified state
            rates. Pre-tax deductions (401(k), health insurance) aren&apos;t
            included. This isn&apos;t tax advice.
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-sand pt-3">
            <SaveToProfile thing="budget" className="min-w-0" />
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-semibold text-stone transition-colors hover:text-terracotta"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- small presentational helpers ----------------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-cream p-6 shadow-[5px_5px_0_#11211c] sm:p-7">
      {children}
    </div>
  );
}

function StatusCallout({ status }: { status: BudgetStatus }) {
  const styles: Record<BudgetStatus["tone"], string> = {
    // This callout sits on the DARK take-home card, so greens use the brighter
    // `emerald` (dark `forest` text would vanish on the dark background).
    bad: "border-terracotta/50 bg-terracotta/10 text-terracotta",
    tight: "border-amber/50 bg-amber/10 text-amber",
    ok: "border-emerald/40 bg-emerald/15 text-emerald",
    good: "border-emerald/40 bg-emerald/15 text-emerald",
  };
  return (
    <div className={`rounded-xl border p-3.5 ${styles[status.tone]}`}>
      <p className="text-sm font-bold">{status.headline}</p>
      <p className="mt-1 text-xs leading-5 text-cream/75">{status.detail}</p>
    </div>
  );
}

function SectionHeading({
  step,
  title,
  hint,
}: {
  step: number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 flex-shrink-0 -rotate-2 items-center justify-center rounded-md border-2 border-ink bg-amber text-sm font-bold text-ink shadow-[2px_2px_0_#11211c]">
        {step}
      </span>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      {hint && (
        <span className="ml-auto text-xs font-medium text-stone">{hint}</span>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

function MoneyInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone">
        $
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-paper py-3 pl-8 pr-4 text-ink focus:border-amber focus:outline-none"
      />
    </div>
  );
}

function PlainInput({
  value,
  onChange,
  placeholder,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={suffix ? "numeric" : "text"}
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
      />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">
          {suffix}
        </span>
      )}
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-stone transition-colors hover:bg-terracotta/10 hover:text-terracotta"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
  accent,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
  accent?: boolean;
  tone?: "good" | "bad";
}) {
  const valueColor = accent
    ? "text-amber"
    : tone === "good"
      ? "text-emerald" // brighter green, readable on the dark take-home card
      : tone === "bad"
        ? "text-terracotta"
        : "text-cream";
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-cream/55" : "text-cream/80"}>{label}</dt>
      <dd
        className={`${strong ? "font-display text-base font-bold" : "font-medium"} ${valueColor}`}
      >
        {value}
      </dd>
    </div>
  );
}

function BreakdownBar({
  taxes,
}: {
  taxes: ReturnType<typeof estimateTaxes>;
}) {
  const g = taxes.gross || 1;
  const fica = taxes.socialSecurity + taxes.medicare;
  const stateLocal = taxes.state + taxes.local;
  return (
    <div className="flex items-center gap-5">
      <Donut
        segments={[
          { value: taxes.net, color: "var(--color-forest)", label: "Take-home" },
          { value: taxes.federal, color: "var(--color-stone)", label: "Federal" },
          { value: fica, color: "var(--color-amber)", label: "FICA" },
          {
            value: stateLocal,
            color: "var(--color-terracotta)",
            label: "State/local",
          },
        ]}
        centerTop={`${Math.round((taxes.net / g) * 100)}%`}
        centerSub="take-home"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2 text-xs text-cream/70">
        <Legend color="var(--color-forest)" label="Take-home" />
        <Legend color="var(--color-stone)" label="Federal" />
        <Legend color="var(--color-amber)" label="FICA" />
        {stateLocal > 0 && (
          <Legend color="var(--color-terracotta)" label="State / local" />
        )}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function GuideRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: string;
  pct: number;
  tone: "forest" | "amber" | "terracotta";
}) {
  const bg =
    tone === "forest"
      ? "var(--color-emerald)" // brighter green bar, visible on the dark card
      : tone === "amber"
        ? "var(--color-amber)"
        : "var(--color-terracotta)";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-cream/70">{label}</span>
        <span className="font-medium text-cream">{value}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: bg }} />
      </div>
    </div>
  );
}
