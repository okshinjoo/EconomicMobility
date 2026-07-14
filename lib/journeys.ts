// Guided journeys: the "hold your hand" layer the library was missing.
// Each journey is keyed to a member goal (same ids as GOAL_OPTIONS in
// lib/profile.ts) and walks it in ordered STAGES — each stage is a small
// milestone with a plain-English "why", 2–4 guides, and at most one tool /
// course / challenge / quiz attachment. Journeys never teach; they sequence
// what already exists (articles, tools, courses, challenges) into a path
// with a visible "you are here".
//
// Design rules:
// - A stage is finishable in one sitting or one errand. Small wins, often.
// - Attachments are the action step ("now go DO it"), guides are the prep.
// - Progress is derived client-side (components/JourneyPath.tsx) from the
//   same trackers everything else uses: read map, visited tools, course /
//   challenge badges, topic-quiz scores. Nothing new to store or sync.

import type { TopicId } from "./topics";

export type JourneyId =
  | "credit"
  | "debt"
  | "budget"
  | "emergency"
  | "invest"
  | "college"
  | "transfer"
  | "home"
  | "retirement"
  | "safety";

export interface JourneyStage {
  id: string;
  /** The milestone, phrased as something you'll have done. */
  milestone: string;
  /** One sentence on why this stage comes now. */
  why: string;
  articleSlugs: string[];
  tool?: { label: string; href: string };
  courseId?: string;
  challengeId?: string;
  /** Topic with a /learn/[topic]/quiz page — the stage's checkpoint. */
  topicQuiz?: TopicId;
}

export interface Journey {
  id: JourneyId;
  /** Mirrors the profile goal wording so the tie-in is obvious. */
  title: string;
  /** The outcome, honestly stated. */
  promise: string;
  color: string;
  topic: TopicId;
  stages: JourneyStage[];
}

export const journeys: Journey[] = [
  {
    id: "credit",
    title: "Build my credit",
    promise: "From no history (or a bruised score) to credit that opens doors.",
    color: "#0f5c46",
    topic: "credit",
    stages: [
      {
        id: "understand",
        milestone: "Know what the score actually measures",
        why: "Ten minutes of how-it-works saves you years of myth-driven mistakes.",
        articleSlugs: ["what-is-a-credit-score", "check-credit-free", "credit-myths"],
      },
      {
        id: "first-line",
        milestone: "Open your first line of credit",
        why: "Nothing builds history like an account reporting on-time payments.",
        articleSlugs: [
          "build-credit-from-zero",
          "how-credit-cards-work",
          "choosing-first-credit-card",
        ],
        courseId: "credit-from-zero",
      },
      {
        id: "protect",
        milestone: "Learn what moves the score and what doesn't",
        why: "Two habits (pay on time, keep balances low) do almost all the work.",
        articleSlugs: [
          "credit-utilization",
          "what-hurts-your-score",
          "hard-vs-soft-inquiries",
        ],
        challengeId: "credit-checkup",
        topicQuiz: "credit",
      },
      {
        id: "yearone",
        milestone: "Run your first year on rails",
        why: "A month-by-month plan turns 'build credit' from a wish into a routine.",
        articleSlugs: [
          "first-year-of-credit",
          "cosigning-explained",
          "rent-reporting",
          "credit-freeze",
        ],
      },
    ],
  },
  {
    id: "debt",
    title: "Pay off debt",
    promise: "A plan you can actually run, whatever you owe and whoever's calling.",
    color: "#b7593f",
    topic: "government-aid",
    stages: [
      {
        id: "picture",
        milestone: "See the whole picture without panic",
        why: "You can't plan around debts you haven't listed, and order matters when money is tight.",
        articleSlugs: [
          "debt-payoff-roadmap",
          "prioritizing-bills-when-money-is-tight",
          "what-happens-if-you-dont-pay-debts",
        ],
      },
      {
        id: "method",
        milestone: "Pick your payoff method and run the numbers",
        why: "Avalanche or snowball: a method you'll stick with beats a perfect one you won't.",
        articleSlugs: [
          "paying-off-credit-cards",
          "balance-transfers-and-consolidation-loans",
          "debt-relief-options",
        ],
        tool: { label: "Debt Payoff Calculator", href: "/tools/debt" },
      },
      {
        id: "collectors",
        milestone: "Handle collectors from strength",
        why: "Collectors follow rules. Knowing them changes every conversation.",
        articleSlugs: [
          "debt-collector-rights",
          "collections-explained",
          "negotiating-debt",
        ],
        courseId: "debt-comeback",
      },
      {
        id: "stay-out",
        milestone: "Close the doors debt came in through",
        why: "The payday-loan and 'fix it fast' industries are waiting for a weak week.",
        articleSlugs: [
          "need-cash-fast",
          "payday-loans-and-predatory-lending",
          "avoiding-debt-scams",
        ],
      },
    ],
  },
  {
    id: "budget",
    title: "Get better at budgeting",
    promise: "A budget that survives real life, not a spreadsheet you abandon by March.",
    color: "#15624b",
    topic: "budgeting",
    stages: [
      {
        id: "see-it",
        milestone: "Find out where the money actually goes",
        why: "You can't steer what you can't see; a week of honest tracking is the map.",
        articleSlugs: ["tracking-your-spending", "needs-vs-wants"],
        tool: { label: "Budget Planner", href: "/tools/budget" },
      },
      {
        id: "build-it",
        milestone: "Build a plan that fits your paycheck",
        why: "Percent rules and methods exist so you don't design a budget from scratch.",
        articleSlugs: [
          "building-your-first-budget",
          "50-30-20-rule",
          "budgeting-methods",
        ],
      },
      {
        id: "real-life",
        milestone: "Make it survive surprises and weird paychecks",
        why: "Budgets don't break on rent day; they break on the 'surprise' bill you saw coming.",
        articleSlugs: [
          "sinking-funds",
          "fixing-a-broken-budget",
          "budgeting-irregular-income",
        ],
        challengeId: "money-reset-week",
      },
      {
        id: "level-up",
        milestone: "Squeeze more out of the same income",
        why: "Once the plan holds, the wins come from bills you negotiate and order-of-operations moves.",
        articleSlugs: [
          "money-order-of-operations",
          "negotiating-your-bills",
          "saving-on-a-tight-budget",
        ],
        topicQuiz: "budgeting",
      },
    ],
  },
  {
    id: "emergency",
    title: "Build an emergency fund",
    promise: "A cushion big enough that a bad week stays a bad week.",
    color: "#1f9069",
    topic: "investing",
    stages: [
      {
        id: "why-where",
        milestone: "Pick where the cushion should live",
        why: "The right account is safe, separate, and actually pays you to save.",
        articleSlugs: [
          "building-a-savings-habit",
          "checking-vs-savings",
          "high-yield-savings-account",
        ],
      },
      {
        id: "target",
        milestone: "Set a target you can hit this year",
        why: "$500 saved beats $10,000 planned. Start with one month's essentials.",
        articleSlugs: ["what-is-apy", "saving-on-a-tight-budget"],
        tool: { label: "Savings Goal Calculator", href: "/tools/savings" },
      },
      {
        id: "automate",
        milestone: "Automate it and get the first $500 in",
        why: "Willpower runs out; a payday-timed transfer doesn't.",
        articleSlugs: ["sinking-funds"],
        challengeId: "starter-fund-sprint",
      },
      {
        id: "grow",
        milestone: "Park the growing pile somewhere smarter",
        why: "Once the fund is real, small rate differences start to matter.",
        articleSlugs: ["what-is-a-cd", "compare-savings-accounts"],
      },
    ],
  },
  {
    id: "invest",
    title: "Start investing",
    promise: "From 'what's a stock?' to your first index fund, without gambling.",
    color: "#157a5a",
    topic: "investing",
    stages: [
      {
        id: "foundations",
        milestone: "Get the three ideas everything rests on",
        why: "Saving vs. investing, compounding, and what a stock is: that's the whole foundation.",
        articleSlugs: [
          "saving-vs-investing",
          "magic-of-compound-interest",
          "what-is-a-stock",
        ],
      },
      {
        id: "account",
        milestone: "Open your first brokerage account",
        why: "The account is free and takes an evening; it's the step people stall on for years.",
        articleSlugs: [
          "opening-first-account",
          "how-to-pick-a-brokerage",
          "index-funds-explained",
        ],
        courseId: "start-investing",
      },
      {
        id: "first-dollars",
        milestone: "Put your first $50 to work",
        why: "A small real investment teaches more than a year of reading about one.",
        articleSlugs: [
          "start-investing-with-50",
          "dollar-cost-averaging",
          "investing-mistakes",
        ],
        tool: { label: "Compound Growth Calculator", href: "/tools/savings/compound" },
      },
      {
        id: "steady",
        milestone: "Learn to hold steady when markets don't",
        why: "The plan only works if a red month can't shake you out of it.",
        articleSlugs: [
          "risk-and-diversification",
          "expense-ratios-and-fees",
          "market-crashes",
        ],
        courseId: "invest-smarter",
        topicQuiz: "investing",
      },
    ],
  },
  {
    id: "college",
    title: "Pay for college",
    promise: "Every aid dollar you qualify for, and loans only with your eyes open.",
    color: "#c9842a",
    topic: "college",
    stages: [
      {
        id: "free-money",
        milestone: "File the FAFSA and chase the gift money",
        why: "Grants and scholarships never get repaid, so they're the money to fight for first.",
        articleSlugs: ["fafsa-step-by-step", "fafsa-mistakes", "finding-scholarships"],
      },
      {
        id: "offers",
        milestone: "Decode the award letters",
        why: "Letters blend gifts and loans on purpose. Untangling them changes the decision.",
        articleSlugs: ["grants-loans-scholarships", "reading-aid-award-letter"],
        tool: { label: "Compare Aid Offers", href: "/tools/college/compare-offers" },
        courseId: "paying-for-college",
      },
      {
        id: "borrow",
        milestone: "Borrow the least, on the best terms",
        why: "If you do borrow, federal-first and only what the first-year salary can carry.",
        articleSlugs: [
          "federal-vs-private-loans",
          "subsidized-vs-unsubsidized",
          "student-loans-before-you-sign",
        ],
      },
      {
        id: "cut-costs",
        milestone: "Cut the sticker price itself",
        why: "The cheapest loan is the one you never need.",
        articleSlugs: [
          "community-college-path",
          "work-study-explained",
          "minimizing-college-debt",
        ],
        topicQuiz: "college",
      },
    ],
  },
  {
    id: "home",
    title: "Buy a home someday",
    promise: "Rent smart now; walk into a mortgage prepared, not hopeful.",
    color: "#a3542f",
    topic: "home-ownership",
    stages: [
      {
        id: "rent-smart",
        milestone: "Win at renting first",
        why: "Renting well (rights, deposits, insurance) funds and protects the someday.",
        articleSlugs: [
          "renting-vs-buying",
          "renting-101-tenant-rights",
          "security-deposit-back",
        ],
      },
      {
        id: "runway",
        milestone: "Start the two-year runway",
        why: "Down payment and credit score are built on a calendar, not in a weekend.",
        articleSlugs: [
          "first-home-runway",
          "saving-for-down-payment",
          "down-payment-basics",
        ],
        tool: { label: "Savings Goal Calculator", href: "/tools/savings" },
      },
      {
        id: "mortgage",
        milestone: "Speak mortgage before you shop",
        why: "Pre-approval and rate literacy are negotiating power at the table.",
        articleSlugs: [
          "what-is-a-mortgage",
          "credit-score-to-buy",
          "getting-pre-approved",
        ],
        tool: { label: "Mortgage Calculator", href: "/tools/debt/mortgage" },
      },
      {
        id: "close",
        milestone: "Close without surprises",
        why: "PMI, closing costs, and the hidden costs of owning are where budgets get ambushed.",
        articleSlugs: [
          "first-time-buyer-programs",
          "pmi-explained",
          "closing-costs",
          "hidden-costs-of-owning",
        ],
      },
    ],
  },
  {
    id: "retirement",
    title: "Plan for retirement",
    promise: "Future-you funded on autopilot, whatever age you're starting from.",
    color: "#0c4a39",
    topic: "investing",
    stages: [
      {
        id: "see-path",
        milestone: "See the path from your age",
        why: "The plan differs at 18, 30, and 50, but every version leans on compounding.",
        articleSlugs: [
          "retirement-basics",
          "retirement-path",
          "magic-of-compound-interest",
        ],
      },
      {
        id: "accounts",
        milestone: "Know the accounts and their superpowers",
        why: "401(k), IRA, Roth: the tax breaks are the whole reason these accounts exist.",
        articleSlugs: ["what-is-a-401k", "what-is-an-ira", "roth-vs-traditional-ira"],
        courseId: "retirement-started",
        tool: { label: "Retirement Calculator", href: "/tools/savings/retirement" },
      },
      {
        id: "set-up",
        milestone: "Set yours up and pick the fund",
        why: "Match first, then IRA, and a target-date fund makes the picking painless.",
        articleSlugs: [
          "401k-vs-ira",
          "retirement-accounts-explained",
          "target-date-funds",
        ],
        tool: { label: "Roth IRA Calculator", href: "/tools/savings/roth-ira" },
      },
      {
        id: "hands-off",
        milestone: "Learn the once-a-year maintenance",
        why: "From here the job is contributions up, hands off the wheel in crashes.",
        articleSlugs: ["rebalancing-your-portfolio", "market-crashes"],
      },
    ],
  },
  {
    id: "safety",
    title: "Protect my money from scams",
    promise: "The manipulation playbook, learned before it costs you.",
    color: "#0f7d74",
    topic: "money-safety",
    stages: [
      {
        id: "playbook",
        milestone: "Learn the universal red flags",
        why: "Every scam runs on the same few tricks: urgency, secrecy, weird payment methods.",
        articleSlugs: ["how-to-spot-a-scam", "phishing-scams", "payment-app-safety"],
      },
      {
        id: "lock-down",
        milestone: "Lock down your accounts in one afternoon",
        why: "An hour of tune-up closes the doors most scams walk through.",
        articleSlugs: [
          "security-tune-up",
          "protecting-your-documents",
          "identity-theft",
        ],
        courseId: "scam-proof",
      },
      {
        id: "big-cons",
        milestone: "Recognize the big cons by name",
        why: "Fake checks, fake jobs, fake romance: seen once in an article, spotted forever.",
        articleSlugs: ["fake-check-scams", "job-scams", "romance-scams"],
      },
      {
        id: "if-it-happens",
        milestone: "Know the first hour if one gets through",
        why: "Fast, right-order action is the difference between a scare and a loss.",
        articleSlugs: ["if-youve-been-scammed", "credit-freeze"],
        topicQuiz: "money-safety",
      },
    ],
  },
  {
    id: "transfer",
    title: "Transfer without losing money",
    promise: "Community college to a four-year degree, with every unit and every dollar making the trip with you.",
    color: "#9c4a2e",
    topic: "college",
    stages: [
      {
        id: "map-the-route",
        milestone: "Know your transfer route and what it saves",
        why: "The community-college discount only pays off if your courses actually transfer, so the route comes before the schedule.",
        articleSlugs: ["community-college-path", "community-college-transfer-money"],
        tool: { label: "College Cost Calculator", href: "/tools/college" },
      },
      {
        id: "confirm-every-unit",
        milestone: "Confirm every course against the agreement",
        why: "Transferability belongs to the articulation agreement, not to hope. Check before you register, every term.",
        articleSlugs: ["dropping-a-class-money", "keep-your-aid-sap"],
        tool: { label: "Student Tracker", href: "/students/tracker" },
      },
      {
        id: "aid-at-the-four-year",
        milestone: "Run aid season for your target schools",
        why: "Transfer students file the same forms, and the aid can differ wildly between schools that would all take you.",
        articleSlugs: ["fafsa-step-by-step", "css-profile-explained", "scholarship-displacement"],
        courseId: "aid-season-playbook",
      },
      {
        id: "compare-and-commit",
        milestone: "Compare offers and commit with eyes open",
        why: "The decision is a money decision: net price after grants, not sticker, and not loyalty to a name.",
        articleSlugs: ["reading-aid-award-letter", "appealing-financial-aid", "in-state-vs-out-of-state"],
        tool: { label: "Compare Aid Offers", href: "/tools/college/compare-offers" },
      },
    ],
  },
];

export function getJourney(id: string): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

/** Quiz/learn topic → the journey that continues it (for cross-links). */
export const journeyByTopic: Partial<Record<TopicId, JourneyId>> = {
  budgeting: "budget",
  credit: "credit",
  investing: "invest",
  college: "college",
  "home-ownership": "home",
  "money-safety": "safety",
  "government-aid": "debt",
};
