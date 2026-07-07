// The calculator catalog: categories, each anchored by a "main" calculator with
// focused sub-calculators. Drives the /tools hub, the in-page switcher, and the
// "coming soon" placeholders. Add a calculator here, then build its page.

export interface ToolItem {
  slug: string;
  title: string;
  short: string;
  status: "live" | "soon";
  main?: boolean;
}

export interface ToolCategory {
  id: string;
  label: string;
  blurb: string;
  base: string; // the main calculator's path
  items: ToolItem[]; // first/main is the category landing page
}

export const toolCategories: ToolCategory[] = [
  {
    id: "budgeting",
    label: "Budgeting & Income",
    blurb: "Figure out what you take home and where it goes.",
    base: "/tools/budget",
    items: [
      {
        slug: "budget",
        title: "Budget Planner",
        short:
          "Turn your pay into take-home, map it against your spending, and get a plain-language read on your budget.",
        status: "live",
        main: true,
      },
      {
        slug: "paycheck",
        title: "Paycheck Calculator",
        short: "Turn a salary or hourly wage into real take-home pay after taxes.",
        status: "live",
      },
      {
        slug: "rent",
        title: "Rent Affordability",
        short: "How much rent you can comfortably afford on your income.",
        status: "live",
      },
      {
        slug: "emergency-fund",
        title: "Emergency Fund",
        short: "How big yours should be, and how long it'll take to build.",
        status: "live",
      },
      {
        slug: "reality-check",
        title: "Reality Check",
        short: "Pick the life you want; see the salary it takes.",
        status: "live",
      },
    ],
  },
  {
    id: "debt",
    label: "Debt & Loans",
    blurb: "Pay it down faster and see the real cost of borrowing.",
    base: "/tools/debt",
    items: [
      {
        slug: "payoff",
        title: "Debt Payoff",
        short: "Build a plan to clear multiple debts, avalanche or snowball.",
        status: "live",
        main: true,
      },
      {
        slug: "auto-loan",
        title: "Auto Loan",
        short: "Monthly payment and total interest on a car loan.",
        status: "live",
      },
      {
        slug: "mortgage",
        title: "Mortgage",
        short: "Estimate a monthly mortgage payment and lifetime interest.",
        status: "live",
      },
      {
        slug: "credit-card",
        title: "Credit Card Payoff",
        short: "How long it takes to clear a card, and why minimums are a trap.",
        status: "live",
      },
      {
        slug: "dti",
        title: "Debt-to-Income",
        short: "The ratio lenders use, and where you land.",
        status: "live",
      },
    ],
  },
  {
    id: "saving",
    label: "Saving & Investing",
    blurb: "Put your money to work over time.",
    base: "/tools/savings",
    items: [
      {
        slug: "goal",
        title: "Savings Goal",
        short: "What it takes to reach a savings goal, by a date or an amount.",
        status: "live",
        main: true,
      },
      {
        slug: "compound",
        title: "Compound Interest",
        short: "Watch small, steady investing grow over decades.",
        status: "live",
      },
      {
        slug: "retirement",
        title: "Retirement",
        short: "Project your nest egg by the time you retire.",
        status: "live",
      },
      {
        slug: "roth-ira",
        title: "Roth IRA",
        short:
          "Project tax-free retirement growth and see how far a Roth outruns a taxable account.",
        status: "live",
      },
      {
        slug: "investment",
        title: "Investment Growth",
        short: "Grow a one-time investment, with or without contributions.",
        status: "live",
      },
    ],
  },
  {
    id: "college",
    label: "College",
    blurb: "Understand the real cost and what you'd borrow.",
    base: "/tools/college",
    items: [
      {
        slug: "cost",
        title: "College Cost",
        short: "The gap left after aid, and the loans it might take to fill it.",
        status: "live",
        main: true,
      },
      {
        slug: "student-loan",
        title: "Student Loan",
        short: "Monthly payment and total interest on student loans.",
        status: "live",
      },
    ],
  },
];

export function hrefFor(cat: ToolCategory, item: ToolItem): string {
  return item.main ? cat.base : `${cat.base}/${item.slug}`;
}

export function categoryByBase(base: string): ToolCategory | undefined {
  return toolCategories.find((c) => c.base === base);
}
