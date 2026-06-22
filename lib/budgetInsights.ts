// Plain-language read on a budget: an overall verdict plus flags for any
// category that's notably higher than a typical share of take-home pay.
// Benchmarks are rough rules of thumb (as a share of monthly take-home),
// meant for friendly guidance — not precise financial advice.

export interface ExpenseInput {
  label: string;
  amount: number;
}

export type InsightTone = "bad" | "tight" | "ok" | "good";

export interface BudgetStatus {
  tone: InsightTone;
  headline: string;
  detail: string;
}

export interface BudgetInsights {
  status: BudgetStatus | null;
  flags: string[];
}

interface Benchmark {
  key: string;
  label: string;
  keywords: string[];
  target: number; // typical share of take-home
  flagAt: number; // flag when above this share
}

const BENCHMARKS: Benchmark[] = [
  {
    key: "housing",
    label: "Housing",
    keywords: ["rent", "housing", "mortgage", "lease"],
    target: 0.3,
    flagAt: 0.4,
  },
  {
    key: "transport",
    label: "Transportation",
    keywords: ["transport", "car", "gas", "auto", "commut", "fuel"],
    target: 0.15,
    flagAt: 0.2,
  },
  {
    key: "food",
    label: "Food & groceries",
    keywords: ["grocer", "food", "dining", "eat", "meal"],
    target: 0.12,
    flagAt: 0.18,
  },
  {
    key: "utilities",
    label: "Utilities",
    keywords: ["utilit", "electric", "water", "heat", "power"],
    target: 0.08,
    flagAt: 0.12,
  },
  {
    key: "insurance",
    label: "Insurance",
    keywords: ["insurance"],
    target: 0.1,
    flagAt: 0.15,
  },
  {
    key: "phone",
    label: "Phone & internet",
    keywords: ["phone", "internet", "wifi", "cell"],
    target: 0.04,
    flagAt: 0.07,
  },
  {
    key: "subs",
    label: "Subscriptions",
    keywords: ["subscription", "streaming", "entertain"],
    target: 0.04,
    flagAt: 0.07,
  },
];

const pct = (x: number) => `${Math.round(x * 100)}%`;

export function getBudgetInsights(
  netMonthly: number,
  expenses: ExpenseInput[]
): BudgetInsights {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  if (netMonthly <= 0 || total <= 0) return { status: null, flags: [] };

  const leftover = netMonthly - total;
  const savedShare = leftover / netMonthly;

  let status: BudgetStatus;
  if (leftover < 0) {
    // Spending more than you bring in.
    status = {
      tone: "bad",
      headline: "Whoa there — that doesn't add up.",
      detail: `Your expenses are about ${pct(
        total / netMonthly
      )} of your take-home, so you're spending more than you bring in. Time to trim somewhere.`,
    };
  } else if (savedShare < 0.12) {
    // Covering everything, but saving little — expenses run high.
    status = {
      tone: "tight",
      headline: "Your expenses run a little high.",
      detail: `You're covering everything, but only about ${pct(
        savedShare
      )} is left to save. Trimming a category or two would give you more breathing room.`,
    };
  } else if (savedShare < 0.28) {
    // Right around the 20% savings target.
    status = {
      tone: "ok",
      headline: "You're on track.",
      detail: `About ${pct(
        savedShare
      )} of your take-home is left over — right around the 20% most budgets aim to save.`,
    };
  } else {
    // Expenses are low relative to income.
    status = {
      tone: "good",
      headline: "Lots of room to spare.",
      detail: `Your expenses are low — you're keeping about ${pct(
        savedShare
      )} of your take-home to save and invest. Nice work (just double-check you've added every expense).`,
    };
  }

  // Tally each spending category and flag the ones running high.
  const sums = new Map<string, number>();
  for (const e of expenses) {
    if (e.amount <= 0) continue;
    const b = BENCHMARKS.find((bm) =>
      bm.keywords.some((k) => e.label.toLowerCase().includes(k))
    );
    if (b) sums.set(b.key, (sums.get(b.key) ?? 0) + e.amount);
  }

  const flags: string[] = [];
  for (const b of BENCHMARKS) {
    const sum = sums.get(b.key);
    if (!sum) continue;
    const share = sum / netMonthly;
    if (share > b.flagAt) {
      flags.push(
        `${b.label} is about ${pct(share)} of your take-home — higher than the ~${pct(
          b.target
        )} most budgets aim for.`
      );
    }
  }

  return { status, flags: flags.slice(0, 3) };
}
