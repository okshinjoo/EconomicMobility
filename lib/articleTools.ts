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
  "paying-off-credit-cards": {
    label: "Credit Card Payoff Calculator",
    href: "/tools/debt/credit-card",
  },
  "how-credit-cards-work": {
    label: "Credit Card Payoff Calculator",
    href: "/tools/debt/credit-card",
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
  "what-is-apy": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "saving-on-a-tight-budget": {
    label: "Savings Goal Calculator",
    href: "/tools/savings",
  },
  "building-a-savings-habit": {
    label: "Savings Goal Calculator",
    href: "/tools/savings",
  },
  "cost-of-living": {
    label: "Reality Check",
    href: "/tools/budget/reality-check",
  },
  "buying-a-used-car": {
    label: "Auto Loan Calculator",
    href: "/tools/debt/auto-loan",
  },
  "leasing-vs-buying-car": {
    label: "Auto Loan Calculator",
    href: "/tools/debt/auto-loan",
  },
  "how-to-ask-for-a-raise": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
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
  "investment-taxes-101": {
    label: "Roth IRA Calculator",
    href: "/tools/savings/roth-ira",
  },
  "how-to-fill-out-w4": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "tax-refund-explained": {
    label: "Paycheck Calculator",
    href: "/tools/budget/paycheck",
  },
  "tax-brackets-explained": {
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
  "compare-savings-accounts": {
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
    label: "Roth IRA Calculator",
    href: "/tools/savings/roth-ira",
  },
  "retirement-basics": {
    label: "Retirement Calculator",
    href: "/tools/savings/retirement",
  },
  "magic-of-compound-interest": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "dollar-cost-averaging": {
    label: "Compound Interest Calculator",
    href: "/tools/savings/compound",
  },
  "building-generational-wealth": {
    label: "Net Worth Tracker",
    href: "/tools/budget/net-worth",
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
  "expense-ratios-and-fees": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },
  "market-crashes": {
    label: "Investment Growth Calculator",
    href: "/tools/savings/investment",
  },

  // College
  "understanding-unmet-need": {
    label: "College Cost Estimator",
    href: "/tools/college",
  },
  "federal-vs-private-loans": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "subsidized-vs-unsubsidized": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "repaying-student-loans": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "minimizing-college-debt": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "appealing-financial-aid": {
    label: "Compare Aid Offers",
    href: "/tools/college/compare-offers",
  },
  "student-loans-before-you-sign": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "community-college-transfer-money": {
    label: "Compare Aid Offers",
    href: "/tools/college/compare-offers",
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
  "getting-pre-approved": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "pmi-explained": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "closing-costs": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "credit-score-to-buy": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "underwater-mortgage": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "first-time-buyer-programs": {
    label: "Mortgage Calculator",
    href: "/tools/debt/mortgage",
  },
  "saving-for-down-payment": {
    label: "Savings Goal Calculator",
    href: "/tools/savings",
  },
  "first-home-runway": {
    label: "Savings Goal Calculator",
    href: "/tools/savings",
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
  "reading-aid-award-letter": {
    label: "Compare Aid Offers",
    href: "/tools/college/compare-offers",
  },
  "student-loan-forgiveness": {
    label: "Student Loan Calculator",
    href: "/tools/college/student-loan",
  },
  "debt-relief-options": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },
  "what-happens-if-you-dont-pay-debts": {
    label: "Debt Payoff Calculator",
    href: "/tools/debt",
  },
};
