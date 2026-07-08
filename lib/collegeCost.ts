// College cost / unmet-need estimator. Figures the yearly gap between cost and
// aid, the loans needed to fill it, and a rough monthly repayment afterward.

export interface CollegeInput {
  costPerYear: number;
  years: number;
  grantsPerYear: number; // grants + scholarships (don't repay)
  familyPerYear: number; // family + savings contribution
  workPerYear: number; // earnings while in school
}

export interface CollegeResult {
  totalCost: number;
  totalAid: number;
  gapPerYear: number;
  totalLoans: number;
  /** Estimated monthly payment on the loans over a standard 10-year term. */
  monthlyRepayment: number;
  totalRepaid: number;
  coveredShare: number; // 0..1 of cost covered without loans
}

// Federal undergrad Direct Loan rate for the repayment estimate (2026–27
// rate, 6.52%; resets each July 1).
const LOAN_RATE = 0.0652;
const REPAY_MONTHS = 120; // standard 10-year repayment

function monthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function estimateCollege(input: CollegeInput): CollegeResult {
  const years = Math.max(0, input.years);
  const aidPerYear =
    Math.max(0, input.grantsPerYear) +
    Math.max(0, input.familyPerYear) +
    Math.max(0, input.workPerYear);
  const gapPerYear = Math.max(0, input.costPerYear - aidPerYear);

  const totalCost = input.costPerYear * years;
  const totalAid = aidPerYear * years;
  const totalLoans = gapPerYear * years;
  const monthly = monthlyPayment(totalLoans, LOAN_RATE, REPAY_MONTHS);

  return {
    totalCost,
    totalAid,
    gapPerYear,
    totalLoans,
    monthlyRepayment: monthly,
    totalRepaid: monthly * REPAY_MONTHS,
    coveredShare:
      input.costPerYear > 0
        ? Math.min(1, aidPerYear / input.costPerYear)
        : 1,
  };
}

export const COLLEGE_LOAN_RATE_PCT = LOAN_RATE * 100;
export const COLLEGE_REPAY_YEARS = REPAY_MONTHS / 12;
