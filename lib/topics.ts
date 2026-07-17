import { CreditCard, Wallet, Receipt, GraduationCap, TrendUp as TrendingUp, House as HomeIcon, Handshake as HeartHandshake, ShieldCheck, Umbrella } from "@phosphor-icons/react/dist/ssr";
import type { Icon as LucideIcon } from "@phosphor-icons/react";

export type TopicId =
  | "credit"
  | "budgeting"
  | "taxes"
  | "college"
  | "investing"
  | "home-ownership"
  | "government-aid"
  | "money-safety"
  | "insurance";

export interface Topic {
  id: TopicId;
  icon: LucideIcon;
  title: string;
  /** Compact label for tight UI (tiles, chips) — e.g. "Credit" vs the full title. */
  short: string;
  description: string;
  href: string;
  color: string;
  image: string;
}

export const topics: Topic[] = [
  {
    id: "credit",
    icon: CreditCard,
    title: "Credit Scores & Building Credit",
    short: "Credit",
    description:
      "Understand how credit works, what affects your score, and how to build or rebuild it from scratch.",
    href: "/learn/credit",
    color: "#0f5c46",
    image: "/images/topics/credit.jpg",
  },
  {
    id: "budgeting",
    icon: Wallet,
    title: "Budgeting & Financial Planning",
    short: "Budgeting",
    description:
      "Learn how to manage your money day-to-day, create a budget that actually works, and plan for the future.",
    href: "/learn/budgeting",
    color: "#1f9069",
    image: "/images/topics/budgeting.jpg",
  },
  {
    id: "taxes",
    icon: Receipt,
    title: "Taxes & Filing Basics",
    short: "Taxes",
    description:
      "Demystify tax season. Learn what you owe, what you can deduct, and how to file with confidence.",
    href: "/learn/taxes",
    color: "#2c5547",
    image: "/images/topics/taxes.jpg",
  },
  {
    id: "college",
    icon: GraduationCap,
    title: "Student Loans & College Planning",
    short: "College & Student Loans",
    description:
      "Navigate FAFSA, financial aid, scholarships, and student loan repayment without the overwhelm.",
    href: "/learn/college",
    color: "#c9842a",
    image: "/images/topics/college.jpg",
  },
  {
    id: "investing",
    icon: TrendingUp,
    title: "Getting Started with Investing",
    short: "Investing",
    description:
      "Learn what investing actually means, how to start with any budget, and how to grow your money over time.",
    href: "/learn/investing",
    color: "#157a5a",
    image: "/images/topics/investing.jpg",
  },
  {
    id: "home-ownership",
    icon: HomeIcon,
    title: "Home Ownership",
    short: "Home Ownership",
    description:
      "From renting to buying: understand mortgages, down payments, and what it really takes to own a home.",
    href: "/learn/home-ownership",
    color: "#b7593f",
    image: "/images/topics/home-ownership.jpg",
  },
  {
    id: "government-aid",
    icon: HeartHandshake,
    title: "Government Aid & Debt Relief",
    short: "Government Aid",
    description:
      "Find out what programs you qualify for, how to apply for benefits, and your options for managing debt.",
    href: "/learn/government-aid",
    color: "#d26a4c",
    image: "/images/topics/government-aid.jpg",
  },
  {
    id: "money-safety",
    icon: ShieldCheck,
    title: "Protecting Your Money",
    short: "Money Safety",
    description:
      "Spot scams before they start, guard your identity and documents, and know exactly what to do if someone targets you.",
    href: "/learn/money-safety",
    color: "#0f7d74",
    image: "/images/topics/money-safety.jpg",
  },
  {
    id: "insurance",
    icon: Umbrella,
    title: "Insurance Basics",
    short: "Insurance",
    description:
      "Health, auto, renters, and life insurance: what the confusing words mean and how to pick coverage without overpaying.",
    href: "/learn/insurance",
    color: "#3f6478",
    image: "/images/topics/insurance.jpg",
  },
];

export function getTopic(id: TopicId): Topic {
  const topic = topics.find((t) => t.id === id);
  if (!topic) {
    throw new Error(`Unknown topic id: ${id}`);
  }
  return topic;
}
