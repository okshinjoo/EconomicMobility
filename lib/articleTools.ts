// Per-article "try it yourself" calculator link, keyed by article slug. Falls
// back to the topic-level tool (lib/learnContent.ts) when an article isn't here.

export const articleTools: Record<string, { label: string; href: string }> = {
  // Credit
  "credit-utilization": {
    label: "Credit Card Payoff Calculator",
    href: "/tools/debt/credit-card",
  },
  "repairing-credit": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },

  // Budgeting
  "building-your-first-budget": { label: "Budget Planner", href: "/tools/budget" },
  "50-30-20-rule": { label: "Budget Planner", href: "/tools/budget" },
  "budgeting-irregular-income": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "sinking-funds": {
    label: "Emergency Fund Calculator",
    href: "/tools/budget/emergency-fund",
  },
  "how-to-read-a-pay-stub": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "your-first-paycheck": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "reading-a-job-offer": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "prioritizing-bills-when-money-is-tight": {
    label: "Budget Planner",
    href: "/tools/budget",
  },
  "renting-your-first-apartment": {
    label: "Rent Affordability Calculator",
    href: "/tools/budget/rent",
  },
  "payday-loans-and-predatory-lending": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },
  "buy-now-pay-later": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },

  // Taxes
  "filing-taxes-first-time": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "understanding-tax-forms": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },

  // Investing
  "what-is-a-stock": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },
  "saving-vs-investing": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "opening-first-account": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },
  "index-funds-explained": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "risk-and-diversification": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "long-term-strategy": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "start-investing-with-50": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "high-yield-savings-account": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "what-is-a-cd": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "cd-laddering": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "retirement-accounts-explained": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "what-is-a-401k": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "what-is-an-ira": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "roth-vs-traditional-ira": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "401k-vs-ira": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "what-is-an-hsa": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "bonds-explained": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },
  "compare-investment-vehicles": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },
  "average-rate-of-return": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },

  // College
  "understanding-unmet-need": {
    label: "College Cost Estimator",
    href: "/tools/college",
  },
  "student-loans-before-you-sign": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },

  // Home ownership
  "renting-vs-buying": {
    label: "Rent Affordability Calculator",
    href: "/tools/budget/rent",
  },
  "renting-101-tenant-rights": {
    label: "Rent Affordability Calculator",
    href: "/tools/budget/rent",
  },
  "filing-with-itin": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "what-is-a-mortgage": { label: "Mortgage Calculator", href: "/tools/debt/mortgage" },
  "down-payment-basics": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "15-vs-30-year-mortgage": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "hidden-costs-of-owning": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },

  // Government aid & debt relief
  "income-driven-repayment": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "negotiating-debt": { label: "Debt Payoff Calculator", href: "/tools/debt" },
  "bankruptcy-explained": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },
};
