// "Life moments": curated bundles for the moments people actually search from.
// Each moment ties together the guides, tool, and course/challenge that fit —
// the site's answer to Fidelity/Schwab "life events" pages, in our voice.

import type { TopicId } from "./topics";

export interface Moment {
  id: string;
  title: string;
  tagline: string;
  color: string;
  /** TopicMark to show. */
  markTopic: TopicId;
  reads: { label: string; href: string }[];
  tool?: { label: string; href: string };
  course?: { label: string; href: string };
  challenge?: { label: string; href: string };
}

export const moments: Moment[] = [
  {
    id: "first-job",
    title: "I just got my first job",
    tagline: "The paycheck, the forms, and the habits that start now.",
    color: "#1f9069",
    markTopic: "budgeting",
    reads: [
      { label: "What to Do With Your First Paycheck", href: "/learn/budgeting/your-first-paycheck" },
      { label: "How to Fill Out a W-4", href: "/learn/taxes/how-to-fill-out-w4" },
      { label: "Checking vs. Savings", href: "/learn/budgeting/checking-vs-savings" },
    ],
    tool: { label: "Paycheck Calculator", href: "/tools/budget/paycheck" },
    course: { label: "Your First Paycheck", href: "/courses/first-paycheck" },
  },
  {
    id: "moving-out",
    title: "I'm moving out",
    tagline: "First apartment, real bills, no surprises.",
    color: "#b7593f",
    markTopic: "home-ownership",
    reads: [
      { label: "Renting Your First Apartment", href: "/learn/home-ownership/renting-your-first-apartment" },
      { label: "What It Really Costs to Live", href: "/learn/budgeting/cost-of-living" },
      { label: "Roommates and Money", href: "/learn/home-ownership/roommates-and-money" },
    ],
    tool: { label: "Rent Affordability Calculator", href: "/tools/budget/rent" },
    course: { label: "Your First Apartment", href: "/courses/first-apartment" },
  },
  {
    id: "college-bound",
    title: "I'm heading to college",
    tagline: "Get every aid dollar, borrow with eyes open.",
    color: "#c9842a",
    markTopic: "college",
    reads: [
      { label: "FAFSA, Step by Step", href: "/learn/college/fafsa-step-by-step" },
      { label: "Reading a Financial Aid Award Letter", href: "/learn/college/reading-aid-award-letter" },
      { label: "Student Loans, Before You Sign", href: "/learn/college/student-loans-before-you-sign" },
    ],
    tool: { label: "College Cost Calculator", href: "/tools/college" },
    course: { label: "Paying for College", href: "/courses/paying-for-college" },
  },
  {
    id: "graduating",
    title: "I'm graduating",
    tagline: "Loans wake up in six months. Get ahead of all of it.",
    color: "#0f5c46",
    markTopic: "college",
    reads: [
      { label: "Graduating? Your Money Checklist", href: "/learn/college/graduation-money-checklist" },
      { label: "Repaying Your Student Loans", href: "/learn/college/repaying-student-loans" },
      { label: "What Is a 401(k)?", href: "/learn/investing/what-is-a-401k" },
    ],
    tool: { label: "Student Loan Calculator", href: "/tools/college/student-loan" },
    course: { label: "Your First Paycheck", href: "/courses/first-paycheck" },
  },
  {
    id: "first-card",
    title: "I want my first credit card",
    tagline: "Build the score without learning the hard lessons.",
    color: "#0f5c46",
    markTopic: "credit",
    reads: [
      { label: "How to Build Credit From Zero", href: "/learn/credit/build-credit-from-zero" },
      { label: "Choosing Your First Credit Card", href: "/learn/credit/choosing-first-credit-card" },
      { label: "How Credit Cards Actually Work", href: "/learn/credit/how-credit-cards-work" },
    ],
    tool: { label: "Credit Card Payoff Calculator", href: "/tools/debt/credit-card" },
    course: { label: "Credit From Zero", href: "/courses/credit-from-zero" },
    challenge: { label: "The Credit Check-Up", href: "/challenges/credit-checkup" },
  },
  {
    id: "money-tight",
    title: "Money is tight right now",
    tagline: "Triage first, help second, no shame anywhere.",
    color: "#d26a4c",
    markTopic: "government-aid",
    reads: [
      { label: "When You Can't Pay Every Bill", href: "/learn/budgeting/prioritizing-bills-when-money-is-tight" },
      { label: "Benefits You May Qualify For", href: "/learn/government-aid/benefits-you-qualify-for" },
      { label: "Saving When There's Barely Any to Save", href: "/learn/budgeting/saving-on-a-tight-budget" },
    ],
    tool: { label: "Budget Planner", href: "/tools/budget" },
    challenge: { label: "The Money Reset Week", href: "/challenges/money-reset-week" },
  },
  {
    id: "start-investing",
    title: "I'm ready to start investing",
    tagline: "First account, first $50, no gambling.",
    color: "#157a5a",
    markTopic: "investing",
    reads: [
      { label: "Saving vs. Investing", href: "/learn/investing/saving-vs-investing" },
      { label: "Opening Your First Account", href: "/learn/investing/opening-first-account" },
      { label: "Index Funds, Explained", href: "/learn/investing/index-funds-explained" },
    ],
    tool: { label: "Investment Growth Calculator", href: "/tools/savings/investment" },
    course: { label: "Start Investing", href: "/courses/start-investing" },
  },
  {
    id: "been-scammed",
    title: "I think I've been scammed",
    tagline: "Move fast, in the right order. This is fixable.",
    color: "#0f7d74",
    markTopic: "money-safety",
    reads: [
      { label: "What to Do If You've Been Scammed", href: "/learn/money-safety/if-youve-been-scammed" },
      { label: "Protecting Yourself From Identity Theft", href: "/learn/money-safety/identity-theft" },
      { label: "Credit Freezes and Fraud Alerts", href: "/learn/credit/credit-freeze" },
    ],
    tool: { label: "Letter Generator", href: "/tools/letters" },
    course: { label: "Scam-Proof", href: "/courses/scam-proof" },
  },
];
