// Cross-calculator import: read another calculator's saved (localStorage) data
// and surface the one number that's useful to pull into the current tool.

import { STORAGE_KEYS, loadJSON } from "./storage";
import { estimateMinPayment } from "./debtPayoff";
import { estimateTaxes, type FilingStatus } from "./taxData";

const PERIOD_PER_YEAR: Record<string, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
};

const n = (v: unknown): number => {
  const x = parseFloat(String(v ?? ""));
  return isNaN(x) || x < 0 ? 0 : x;
};

interface DebtRowLike {
  balance?: string;
  apr?: string;
  term?: string;
  minPayment?: string;
}

/** Total monthly debt payment from the Debt Payoff calculator, if saved. */
export function readDebtSummary(): { monthlyPayment: number; count: number } | null {
  const s = loadJSON<{ debts?: DebtRowLike[]; extra?: string }>(
    STORAGE_KEYS.debt
  );
  if (!s?.debts?.length) return null;
  let monthly = 0;
  let count = 0;
  for (const d of s.debts) {
    const balance = n(d.balance);
    if (balance <= 0) continue;
    const userMin = n(d.minPayment);
    monthly +=
      userMin > 0 ? userMin : estimateMinPayment(balance, n(d.apr), n(d.term));
    count++;
  }
  if (count === 0) return null;
  monthly += n(s.extra);
  return { monthlyPayment: Math.round(monthly), count };
}

interface BudgetSnap {
  incomeType?: string;
  salary?: string;
  salaryPeriod?: string;
  taxBasis?: string;
  hourlyWage?: string;
  hoursPerWeek?: string;
  filing?: FilingStatus;
  stateCode?: string;
  city?: string;
  otherIncome?: { amount?: string; frequency?: string }[];
  expenses?: { amount?: string }[];
}

/** Take-home, expenses, and leftover recomputed from the Budget Planner, if saved. */
export function readBudgetSummary(): {
  netMonthly: number;
  totalExpenses: number;
  leftover: number;
} | null {
  const s = loadJSON<BudgetSnap>(STORAGE_KEYS.budget);
  if (!s) return null;

  const wages =
    s.incomeType === "salary"
      ? n(s.salary) * (PERIOD_PER_YEAR[s.salaryPeriod ?? "annual"] ?? 1)
      : n(s.hourlyWage) * n(s.hoursPerWeek) * 52;
  const other = (s.otherIncome ?? []).reduce(
    (sum, r) => sum + n(r.amount) * (r.frequency === "monthly" ? 12 : 1),
    0
  );
  if (wages + other <= 0) return null;

  const netAnnual =
    s.taxBasis === "net"
      ? wages + other
      : estimateTaxes(wages, other, s.filing ?? "single", s.stateCode ?? "", s.city ?? "")
          .net;
  const netMonthly = netAnnual / 12;
  const totalExpenses = (s.expenses ?? []).reduce(
    (sum, e) => sum + n(e.amount),
    0
  );

  return {
    netMonthly: Math.round(netMonthly),
    totalExpenses: Math.round(totalExpenses),
    leftover: Math.round(netMonthly - totalExpenses),
  };
}
