// Debt-payoff simulation: avalanche (highest APR first) or snowball (smallest
// balance first), with freed-up minimum payments rolled into the target debt.

export interface DebtInput {
  id: number;
  name: string;
  balance: number;
  apr: number; // annual %
  minPayment: number;
  term?: number; // loan length in months; 0/undefined = revolving (credit card)
}

export type Strategy = "avalanche" | "snowball";

export interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  order: string[]; // names in the order they're cleared
  neverPaysOff: boolean;
  /** A debt whose minimum doesn't even cover its monthly interest, if any. */
  underwaterName: string | null;
}

const CAP = 1200; // 100 years

/** Fixed monthly payment that amortizes `principal` over `months` at `aprPct`. */
export function loanPayment(
  principal: number,
  aprPct: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = aprPct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/**
 * A revolving (credit-card) minimum for the CURRENT balance: about 1% of the
 * balance plus that month's interest, with a $25 floor. This shrinks as the
 * balance falls — which is what keeps minimum-only payers in debt for years.
 */
export function revolvingMinimum(balance: number, aprPct: number): number {
  if (balance <= 0) return 0;
  const monthlyInterest = balance * (aprPct / 100 / 12);
  return Math.min(balance + monthlyInterest, Math.max(25, balance * 0.01 + monthlyInterest));
}

/**
 * Estimate a monthly minimum when the user doesn't know it. With a loan term,
 * it's the amortizing payment; otherwise today's revolving-card minimum.
 */
export function estimateMinPayment(
  balance: number,
  aprPct: number,
  term: number
): number {
  if (balance <= 0) return 0;
  if (term > 0) return loanPayment(balance, aprPct, term);
  return revolvingMinimum(balance, aprPct);
}

function orderDebts(debts: DebtInput[], strategy: Strategy): DebtInput[] {
  const copy = [...debts];
  copy.sort((a, b) =>
    strategy === "avalanche" ? b.apr - a.apr : a.balance - b.balance
  );
  return copy;
}

/**
 * Simulate paying `sum(minPayments) + extra` per month. Returns time to debt
 * free, total interest, and the order debts are cleared in.
 */
export function simulatePayoff(
  debts: DebtInput[],
  extra: number,
  strategy: Strategy
): PayoffResult {
  const active = orderDebts(
    debts.filter((d) => d.balance > 0),
    strategy
  ).map((d) => ({ ...d }));

  if (active.length === 0) {
    return {
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      order: [],
      neverPaysOff: false,
      underwaterName: null,
    };
  }

  // Detect a debt whose minimum can't cover its first-month interest.
  let underwaterName: string | null = null;
  for (const d of active) {
    const monthlyInterest = d.balance * (d.apr / 100 / 12);
    if (d.minPayment <= monthlyInterest && extra <= 0) {
      underwaterName = d.name;
      break;
    }
  }

  const order: string[] = [];
  let months = 0;
  let totalInterest = 0;
  let totalPaid = 0;

  while (active.some((d) => d.balance > 0.005) && months < CAP) {
    months++;
    // 1) Accrue interest.
    for (const d of active) {
      if (d.balance <= 0) continue;
      const interest = d.balance * (d.apr / 100 / 12);
      d.balance += interest;
      totalInterest += interest;
    }
    // 2) Pool of money for this month = all minimums + extra.
    let pool =
      active.reduce((s, d) => s + (d.balance > 0 ? d.minPayment : 0), 0) +
      extra;
    // 3) Pay each debt at least its minimum (capped at balance).
    for (const d of active) {
      if (d.balance <= 0) continue;
      const pay = Math.min(d.minPayment, d.balance, pool);
      d.balance -= pay;
      pool -= pay;
      totalPaid += pay;
    }
    // 4) Throw whatever's left at the target debt(s), in strategy order.
    for (const d of active) {
      if (pool <= 0) break;
      if (d.balance <= 0) continue;
      const pay = Math.min(d.balance, pool);
      d.balance -= pay;
      pool -= pay;
      totalPaid += pay;
    }
    // 5) Record newly cleared debts.
    for (const d of active) {
      if (d.balance <= 0.005 && !order.includes(d.name)) {
        d.balance = 0;
        order.push(d.name);
      }
    }
  }

  const neverPaysOff = months >= CAP;
  return {
    months,
    totalInterest,
    totalPaid,
    order,
    neverPaysOff,
    underwaterName,
  };
}

/**
 * Total remaining balance per month under the plan vs. paying only minimums.
 * Both arrays are padded to the same length for charting.
 */
export function payoffTimeline(
  debts: DebtInput[],
  extra: number,
  strategy: Strategy
): { plan: number[]; minimums: number[] } {
  const active = orderDebts(
    debts.filter((d) => d.balance > 0),
    strategy
  ).map((d) => ({ ...d }));
  const plan: number[] = [active.reduce((s, d) => s + d.balance, 0)];
  let m = 0;
  while (active.some((d) => d.balance > 0.005) && m < CAP) {
    m++;
    for (const d of active)
      if (d.balance > 0) d.balance += d.balance * (d.apr / 100 / 12);
    let pool =
      active.reduce((s, d) => s + (d.balance > 0 ? d.minPayment : 0), 0) + extra;
    for (const d of active) {
      if (d.balance <= 0) continue;
      const pay = Math.min(d.minPayment, d.balance, pool);
      d.balance -= pay;
      pool -= pay;
    }
    for (const d of active) {
      if (pool <= 0) break;
      if (d.balance <= 0) continue;
      const pay = Math.min(d.balance, pool);
      d.balance -= pay;
      pool -= pay;
    }
    plan.push(active.reduce((s, d) => s + Math.max(0, d.balance), 0));
  }

  const md = debts.filter((d) => d.balance > 0).map((d) => ({ ...d }));
  const minimums: number[] = [md.reduce((s, d) => s + d.balance, 0)];
  let mm = 0;
  while (md.some((d) => d.balance > 0.005) && mm < CAP) {
    mm++;
    let progressed = false;
    for (const d of md) {
      if (d.balance <= 0) continue;
      const interest = d.balance * (d.apr / 100 / 12);
      d.balance += interest;
      const min =
        (d.term ?? 0) > 0 ? d.minPayment : revolvingMinimum(d.balance, d.apr);
      const pay = Math.min(min, d.balance);
      if (pay > interest + 1e-9) {
        d.balance -= pay;
        progressed = true;
      }
    }
    minimums.push(md.reduce((s, d) => s + Math.max(0, d.balance), 0));
    if (!progressed) break;
  }

  const len = Math.max(plan.length, minimums.length);
  while (plan.length < len) plan.push(0);
  while (minimums.length < len) minimums.push(minimums[minimums.length - 1]);
  return { plan, minimums };
}

/**
 * Baseline: pay ONLY the minimum on each debt, no extra, no rolling. For a
 * revolving card the minimum is recomputed each month from the current balance
 * (so it shrinks); for an installment loan (a term) it's the fixed scheduled
 * payment. This is the realistic "if you do nothing extra" comparison.
 */
export function minimumsOnly(debts: DebtInput[]): {
  months: number;
  totalInterest: number;
  neverPaysOff: boolean;
} {
  let maxMonths = 0;
  let totalInterest = 0;
  let neverPaysOff = false;

  for (const d of debts) {
    if (d.balance <= 0) continue;
    const r = d.apr / 100 / 12;
    const installment = (d.term ?? 0) > 0;
    let bal = d.balance;
    let m = 0;
    while (bal > 0.005 && m < CAP) {
      const interest = bal * r;
      bal += interest;
      totalInterest += interest;
      const min = installment ? d.minPayment : revolvingMinimum(bal, d.apr);
      const pay = Math.min(min, bal);
      if (pay <= interest + 1e-9) {
        neverPaysOff = true;
        break;
      }
      bal -= pay;
      m++;
    }
    if (m >= CAP) neverPaysOff = true;
    maxMonths = Math.max(maxMonths, m);
  }

  return { months: maxMonths, totalInterest, neverPaysOff };
}
