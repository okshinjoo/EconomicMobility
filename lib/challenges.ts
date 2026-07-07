// Group challenges: self-paced action checklists anyone can join (no account
// — progress lives in localStorage, like courses). The "group" part is each
// challenge's official community thread, where people share how it's going
// through the same moderated comment flow as the rest of the feed.
//
// Steps are actions, not reading assignments; a step may link a guide or tool
// that helps. Finishing every step earns a local-only badge, same spirit as
// course badges.

export interface ChallengeStep {
  id: string;
  title: string;
  detail: string;
  link?: { label: string; href: string };
}

export interface Challenge {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** e.g. "One week, one step a day" */
  pace: string;
  color: string;
  steps: ChallengeStep[];
  /** The official thread on /community for swapping progress. */
  communityPostId: string;
}

export const challenges: Challenge[] = [
  {
    id: "money-reset-week",
    title: "The Money Reset Week",
    tagline: "Seven days to know exactly where you stand.",
    description:
      "Not a savings sprint and not a guilt trip. One small action a day for a week, and by Sunday you know where your money goes, what it costs you to live, and the one change most worth making.",
    pace: "One week, one step a day",
    color: "#c9842a",
    communityPostId: "thread-money-reset-week",
    steps: [
      {
        id: "track-1",
        title: "Write down everything you spend today",
        detail:
          "Notes app, receipt pile, whatever works. No judging, no changing anything yet. Just see it.",
        link: { label: "How to track without losing your mind", href: "/learn/budgeting/tracking-your-spending" },
      },
      {
        id: "track-2",
        title: "Track day two, and star anything that surprised you",
        detail:
          "The surprises are the point. Most budgets leak in places nobody thinks to look.",
      },
      {
        id: "bills",
        title: "List your fixed bills and their due dates",
        detail:
          "Rent, phone, subscriptions, minimum payments. One list, one place. This is the skeleton of your budget.",
      },
      {
        id: "subscription",
        title: "Cancel or downgrade one thing you don't really use",
        detail:
          "One forgotten subscription or an overpriced plan. Even $12 a month is $144 a year back in your pocket.",
      },
      {
        id: "autopilot",
        title: "Set up one automatic transfer to savings",
        detail:
          "Any amount counts; $10 on payday is a system, and systems beat willpower.",
        link: { label: "Building a savings habit that sticks", href: "/learn/budgeting/building-a-savings-habit" },
      },
      {
        id: "credit",
        title: "Pull your free credit report",
        detail:
          "AnnualCreditReport.com, ten minutes. You're just looking: accounts you recognize, anything that seems off.",
        link: { label: "How to check your credit for free", href: "/learn/credit/check-credit-free" },
      },
      {
        id: "budget",
        title: "Build your budget with this week's real numbers",
        detail:
          "You now have actual spending data and a bill list. Put them into the Budget Planner and see the whole picture.",
        link: { label: "Open the Budget Planner", href: "/tools/budget" },
      },
    ],
  },
  {
    id: "no-spend-weekend",
    title: "The No-Spend Weekend",
    tagline: "48 hours, zero optional spending, one honest reset.",
    description:
      "Groceries you already bought, bills already scheduled, and nothing else from Friday night to Monday morning. It's not about the money you save this weekend; it's about noticing every moment you reach for your card without thinking.",
    pace: "One weekend",
    color: "#d26a4c",
    communityPostId: "thread-no-spend-weekend",
    steps: [
      {
        id: "plan",
        title: "Plan the weekend before it starts",
        detail:
          "Free plans beat willpower: library, park, that project you keep postponing, cooking what's already in the fridge. Decide Friday afternoon.",
      },
      {
        id: "prep",
        title: "Handle the traps in advance",
        detail:
          "Meals sketched out, gas tank filled, deliveries already ordered paused. A no-spend weekend fails at 7pm Saturday when there's nothing for dinner.",
      },
      {
        id: "weekend",
        title: "Do the 48 hours",
        detail:
          "Every time you almost spend, jot one line: what it was and what mood you were in. That list is worth more than the savings.",
      },
      {
        id: "reflect",
        title: "Move what you didn't spend, and read your list",
        detail:
          "Estimate what a normal weekend costs you, transfer that to savings, and look at your almost-spent list. The patterns you see are next month's budget wins.",
        link: { label: "Needs vs. wants, without the guilt", href: "/learn/budgeting/needs-vs-wants" },
      },
    ],
  },
  {
    id: "credit-checkup",
    title: "The Credit Check-Up",
    tagline: "Five steps to know your credit is clean and working for you.",
    description:
      "Most people have never actually read their own credit report. This challenge fixes that: pull all three, read them like a pro, catch anything wrong, and leave with your utilization number and a protection plan.",
    pace: "One sitting, or five short days",
    color: "#0f5c46",
    communityPostId: "thread-credit-checkup",
    steps: [
      {
        id: "pull",
        title: "Pull your reports from all three bureaus",
        detail:
          "AnnualCreditReport.com is the one official free site. Equifax, Experian, TransUnion; download or save all three.",
        link: { label: "How to check your credit for free", href: "/learn/credit/check-credit-free" },
      },
      {
        id: "read",
        title: "Read each section and recognize every account",
        detail:
          "Personal info, accounts, payment history, inquiries. You're hunting for anything you don't recognize.",
        link: { label: "Reading your credit report", href: "/learn/credit/reading-your-credit-report" },
      },
      {
        id: "dispute",
        title: "Flag and dispute anything wrong",
        detail:
          "Wrong balance, account that isn't yours, a late payment you made on time. Disputes are free and the bureaus must investigate.",
        link: { label: "Disputing an error", href: "/learn/credit/disputing-credit-errors" },
      },
      {
        id: "utilization",
        title: "Work out your utilization",
        detail:
          "Total balances divided by total limits. Under 30% is the guideline; under 10% is where scores shine.",
        link: { label: "Credit utilization, demystified", href: "/learn/credit/credit-utilization" },
      },
      {
        id: "protect",
        title: "Pick your protection: freeze or alert",
        detail:
          "If you're not opening new credit soon, a free freeze at all three bureaus shuts the door on fraud. Ten minutes, reversible any time.",
        link: { label: "Credit freezes and fraud alerts", href: "/learn/credit/credit-freeze" },
      },
    ],
  },
];

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}
