// Savings-goal math with optional compound growth (monthly compounding).

export interface SavingsByDate {
  monthly: number; // required monthly contribution
  totalContributed: number;
  interestEarned: number;
  alreadyThere: boolean;
}

export interface SavingsByAmount {
  months: number; // months to reach the goal (Infinity if never)
  reachable: boolean;
  finalBalance: number;
  totalContributed: number;
  interestEarned: number;
  alreadyThere: boolean;
}

/** Balance per month (index 0 = today) for a steady monthly contribution. */
export function growthSeries(
  current: number,
  monthly: number,
  annualRatePct: number,
  months: number
): number[] {
  const r = annualRatePct / 100 / 12;
  const n = Math.min(Math.max(0, Math.round(months)), 1200);
  const out: number[] = [Math.max(0, current)];
  let bal = Math.max(0, current);
  for (let i = 0; i < n; i++) {
    bal = bal * (1 + r) + monthly;
    out.push(bal);
  }
  return out;
}

/** How much to set aside each month to hit `goal` in `months`. */
export function monthlyToReachGoal(
  goal: number,
  current: number,
  months: number,
  annualRatePct: number
): SavingsByDate {
  if (months <= 0) {
    return {
      monthly: Math.max(0, goal - current),
      totalContributed: Math.max(0, goal - current),
      interestEarned: 0,
      alreadyThere: current >= goal,
    };
  }
  const r = annualRatePct / 100 / 12;
  const growth = Math.pow(1 + r, months);
  const futureCurrent = current * growth;
  const needed = goal - futureCurrent;
  if (needed <= 0) {
    return {
      monthly: 0,
      totalContributed: 0,
      interestEarned: 0,
      alreadyThere: true,
    };
  }
  const annuityFactor = r === 0 ? months : (growth - 1) / r;
  const monthly = needed / annuityFactor;
  const totalContributed = monthly * months;
  const interestEarned = goal - current - totalContributed;
  return {
    monthly,
    totalContributed,
    interestEarned: Math.max(0, interestEarned),
    alreadyThere: false,
  };
}

/** How long until `monthly` contributions reach `goal`. */
export function monthsToReachGoal(
  goal: number,
  current: number,
  monthly: number,
  annualRatePct: number
): SavingsByAmount {
  if (current >= goal) {
    return {
      months: 0,
      reachable: true,
      finalBalance: current,
      totalContributed: 0,
      interestEarned: 0,
      alreadyThere: true,
    };
  }
  const r = annualRatePct / 100 / 12;
  if (monthly <= 0 && r <= 0) {
    return {
      months: Infinity,
      reachable: false,
      finalBalance: current,
      totalContributed: 0,
      interestEarned: 0,
      alreadyThere: false,
    };
  }
  let balance = current;
  let months = 0;
  const CAP = 1200; // 100 years
  while (balance < goal && months < CAP) {
    balance = balance * (1 + r) + monthly;
    months++;
  }
  const reachable = balance >= goal;
  const totalContributed = monthly * months;
  return {
    months: reachable ? months : Infinity,
    reachable,
    finalBalance: balance,
    totalContributed,
    interestEarned: Math.max(0, balance - current - totalContributed),
    alreadyThere: false,
  };
}
