// Roth IRA projection. A Roth is funded with after-tax dollars, then grows and
// is withdrawn TAX-FREE in retirement. The value of a Roth (vs. an ordinary
// taxable account) is that none of the growth is ever taxed — so the headline
// comparison is "Roth balance" vs. "the same money in a taxable account," where
// the taxable account loses a slice of its return to taxes each year.
//
// Simplified, clearly-labeled estimate: the taxable account's return is reduced
// by the marginal tax rate (a standard "tax drag" approximation). Real outcomes
// depend on capital-gains treatment, holding periods, and your bracket.

// 2026 IRS Roth IRA contribution limits ($7,500 base + $1,100 catch-up at 50+).
// Update yearly when the IRS releases new figures (announced each fall).
export const ROTH_LIMIT = 7500;
export const ROTH_LIMIT_50PLUS = 8600;

/** Annual contribution limit for a given age (catch-up at 50+). */
export function rothLimit(age: number): number {
  return age >= 50 ? ROTH_LIMIT_50PLUS : ROTH_LIMIT;
}

export interface RothProjection {
  years: number;
  retireAge: number;
  rothSeries: number[]; // balance at the end of each year (index 0 = today)
  taxableSeries: number[];
  contributions: number; // total put in (starting balance + all contributions)
  rothBalance: number; // tax-free at retirement
  rothGrowth: number; // rothBalance - contributions
  taxableBalance: number; // the same money in a taxable account
  rothAdvantage: number; // rothBalance - taxableBalance (tax saved)
  ready: boolean;
}

export function projectRoth(input: {
  startingBalance: number;
  annualContribution: number;
  currentAge: number;
  retireAge: number;
  ratePct: number;
  taxRatePct: number;
}): RothProjection {
  const { startingBalance, annualContribution, currentAge, retireAge } = input;
  const years = Math.min(Math.max(0, Math.round(retireAge - currentAge)), 80);
  const r = input.ratePct / 100;
  // Taxable account: returns taxed each year at the marginal rate.
  const rTax = r * (1 - Math.min(1, Math.max(0, input.taxRatePct / 100)));

  const rothSeries: number[] = [startingBalance];
  const taxableSeries: number[] = [startingBalance];
  let roth = startingBalance;
  let taxable = startingBalance;
  for (let i = 0; i < years; i++) {
    roth = roth * (1 + r) + annualContribution;
    taxable = taxable * (1 + rTax) + annualContribution;
    rothSeries.push(roth);
    taxableSeries.push(taxable);
  }

  const contributions = startingBalance + annualContribution * years;
  const rothBalance = roth;
  const taxableBalance = taxable;

  return {
    years,
    retireAge,
    rothSeries,
    taxableSeries,
    contributions,
    rothBalance,
    rothGrowth: Math.max(0, rothBalance - contributions),
    taxableBalance,
    rothAdvantage: Math.max(0, rothBalance - taxableBalance),
    ready: years > 0 && (startingBalance > 0 || annualContribution > 0),
  };
}
