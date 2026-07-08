import type { TopicId } from "./topics";
import { getTopicArticles } from "./articles";

export interface PathItem {
  title: string;
  blurb: string;
}

export interface PathGroup {
  level: "Start here" | "Go deeper" | "Advanced";
  items: PathItem[];
}

export interface LearnTopic {
  /** Plain-English headline, not just the topic name. */
  headline: string;
  subhead: string;
  /** 1–2 short intro paragraphs, written at a 7th–8th grade reading level. */
  intro: string[];
  /** Difficulty / audience label shown in the meta row. */
  level: string;
  /**
   * Fallback roadmap shown only when a topic has no published articles yet.
   * Optional — once real articles exist they drive the roadmap instead.
   */
  path?: PathGroup[];
  /** Optional cross-link to a relevant calculator. */
  tool?: { label: string; href: string };
  /** Three related topic ids for the footer. */
  related: TopicId[];
}

export const learnContent: Record<TopicId, LearnTopic> = {
  credit: {
    headline: "Credit, explained without the gatekeeping",
    subhead:
      "What a credit score is, what moves it, and how to build one from zero, all in plain English.",
    intro: [
      "Your credit score is a number that tells lenders how likely you are to pay back what you borrow. It quietly shapes whether you can rent an apartment, finance a car, or get a phone plan without a big deposit. Yet almost no one sits you down to explain how it works.",
      "This is the whole picture, start to finish: what builds a score, what dents it, and how to start from nothing.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "What Is a Credit Score?",
            blurb:
              "The five things that make up your score, and which ones matter most.",
          },
          {
            title: "How to Build Credit From Zero",
            blurb:
              "Secured cards, starter cards, and becoming an authorized user when you have no history yet.",
          },
          {
            title: "Reading Your Credit Report",
            blurb:
              "How to pull it for free, and exactly what to check for once you do.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Credit Utilization, Demystified",
            blurb:
              "Why the balance you carry can matter as much as paying on time.",
          },
          {
            title: "What Hurts Your Score (and What Doesn't)",
            blurb: "Common myths vs. the things that truly move the needle.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Repairing Credit After a Setback",
            blurb:
              "A realistic timeline and a calm, step-by-step plan for bouncing back.",
          },
        ],
      },
    ],
    tool: { label: "Debt Payoff Calculator", href: "/tools/debt" },
    related: ["budgeting", "government-aid", "home-ownership"],
  },

  budgeting: {
    headline: "A budget that actually fits your life",
    subhead:
      "A simple plan for where your money goes, not a spreadsheet that makes you feel bad.",
    intro: [
      "A budget is a decision you make once so you don't have to stress about money every day. Once you know the essentials are covered, spending on what matters stops feeling like a guilty secret.",
      "Whether your income is steady, seasonal, or all over the place, there's a way to build a plan that holds up in real life.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "Building Your First Budget",
            blurb:
              "A simple framework for figuring out where your money goes and making a plan that sticks.",
          },
          {
            title: "Needs vs. Wants, Without the Guilt",
            blurb: "A practical way to sort spending that doesn't feel punishing.",
          },
          {
            title: "The 50/30/20 Rule, Explained",
            blurb: "A starting split for needs, wants, and savings, and when to bend it.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Budgeting on an Irregular Income",
            blurb: "How to plan when no two paychecks look the same.",
          },
          {
            title: "Fixing a Budget That Keeps Breaking",
            blurb: "Find the leaks, adjust the plan, and make it hold.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Sinking Funds for the 'Unexpected'",
            blurb:
              "How to plan for car repairs and holidays so they stop blowing up your month.",
          },
        ],
      },
    ],
    tool: { label: "Budget Planner", href: "/tools/budget" },
    related: ["credit", "taxes", "investing"],
  },

  taxes: {
    headline: "Taxes, minus the panic",
    subhead:
      "What you owe, what you can get back, and how to file with confidence.",
    intro: [
      "Taxes feel intimidating mostly because no one explains them. For most people starting out, though, filing is more straightforward than it looks, and it often means money coming back to you rather than out of you.",
      "We'll walk through the forms, the deadlines, and the free ways to get it done right.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "Filing Your Taxes for the First Time",
            blurb: "A step-by-step walkthrough of your very first return.",
          },
          {
            title: "What All Those Forms Mean",
            blurb: "W-2, 1099, W-4: what each one is and when it shows up.",
          },
          {
            title: "Do You Even Need to File?",
            blurb: "When filing is required, and when it's worth it even if it isn't.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Deductions vs. Credits",
            blurb: "The difference, and why credits are usually worth more.",
          },
          {
            title: "Free Ways to File",
            blurb: "Legitimate no-cost options so you never pay to pay taxes.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Taxes When You're Self-Employed",
            blurb:
              "Self-employment tax, quarterly payments, and what changes with 1099 income.",
          },
        ],
      },
    ],
    related: ["budgeting", "college", "government-aid"],
  },

  college: {
    headline: "Paying for college without the guesswork",
    subhead: "How FAFSA, financial aid, scholarships, and loans fit together.",
    intro: [
      "The price on a college's website is rarely what you end up paying. Between FAFSA, grants, scholarships, and aid, there's a whole system built to close the gap between sticker price and what a family can afford.",
      "The catch is that no one hands you the instructions. So here they are.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "FAFSA, Step by Step",
            blurb: "What it is, why it matters, and how to fill it out without dread.",
          },
          {
            title: "Grants vs. Loans vs. Scholarships",
            blurb: "What has to be paid back, what doesn't, and how to chase the free money.",
          },
          {
            title: "Finding Scholarships You'll Actually Win",
            blurb: "Where to look and how to stand out beyond the big national ones.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Reading a Financial Aid Award Letter",
            blurb: "How to compare offers and spot what's a grant vs. a loan in disguise.",
          },
          {
            title: "Understanding Your Unmet Need",
            blurb: "The gap aid doesn't cover, and realistic ways to close it.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Student Loans, Before You Sign",
            blurb: "Federal vs. private, interest, and the questions to ask first.",
          },
        ],
      },
    ],
    tool: { label: "College Cost Estimator", href: "/tools/college" },
    related: ["government-aid", "budgeting", "credit"],
  },

  investing: {
    headline: "Investing, starting from wherever you are",
    subhead:
      "What it means, why it beats saving alone, and how to start with any amount.",
    intro: [
      "Investing is how money grows faster than it would sitting in a savings account, and it isn't reserved for people with cash to spare. You can start with small amounts; the most important ingredient is time, not a big balance.",
      "We'll keep it calm and jargon-free, from your very first account to a real long-term plan.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "What a Stock Actually Is",
            blurb: "Ownership, growth, and why companies sell pieces of themselves.",
          },
          {
            title: "Saving vs. Investing",
            blurb: "When to keep cash safe, and when to let it grow.",
          },
          {
            title: "Opening Your First Account",
            blurb: "Roth IRA vs. brokerage, and how to actually get started.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Index Funds, Explained",
            blurb: "Why the 'boring' option is what most experts quietly recommend.",
          },
          {
            title: "Risk, Diversification, and Time",
            blurb: "How spreading out and waiting beats trying to time the market.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Building a Real Long-Term Strategy",
            blurb: "Asset allocation and thinking past 'just open a Roth IRA.'",
          },
        ],
      },
    ],
    tool: { label: "Savings Goal Calculator", href: "/tools/savings" },
    related: ["budgeting", "taxes", "home-ownership"],
  },

  "home-ownership": {
    headline: "From renting to owning, one clear step at a time",
    subhead: "Mortgages, down payments, and what buying a home really takes.",
    intro: [
      "Owning a home is one of the biggest financial moves you'll ever make, and one of the most mythologized. This guide covers what the words mean and how to tell if you're ready, without the sales pitch.",
      "Even if buying is years away, understanding it now means fewer surprises later.",
    ],
    level: "Beginner to intermediate",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "Renting vs. Buying: An Honest Comparison",
            blurb: "When owning makes sense, and when renting is the smarter money move.",
          },
          {
            title: "What a Mortgage Really Is",
            blurb: "Principal, interest, and how a home loan is paid off over time.",
          },
          {
            title: "How Much Down Payment You Actually Need",
            blurb: "Separating the 20% myth from what's really required.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "15-Year vs. 30-Year Mortgages",
            blurb: "The real trade-off between monthly payment and total interest.",
          },
          {
            title: "The Hidden Costs of Owning",
            blurb: "Taxes, insurance, maintenance: the parts the listing doesn't show.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "What 'Underwater' Means, and How to Avoid It",
            blurb: "Owing more than the home is worth, and how to protect yourself.",
          },
        ],
      },
    ],
    related: ["credit", "budgeting", "investing"],
  },

  "government-aid": {
    headline: "The help you've already paid for",
    subhead:
      "Benefits, programs, and debt relief: what you qualify for and how to apply.",
    intro: [
      "Government programs exist for the moments life gets hard: a stretch between jobs, low income, medical bills, debt that keeps growing. There's no shame in using them. They're built for this, and the hard part is usually knowing they exist at all.",
      "We'll map out what's available and how to apply, in language that respects you.",
    ],
    level: "Beginner-friendly",
    path: [
      {
        level: "Start here",
        items: [
          {
            title: "Benefits You May Qualify For",
            blurb: "Food, healthcare, housing, and unemployment: a plain map of the big ones.",
          },
          {
            title: "How to Actually Apply",
            blurb: "Where to start, what to gather, and what to expect.",
          },
          {
            title: "What 'Debt Relief' Really Means",
            blurb: "The honest version: what helps, what's a scam, and what it costs.",
          },
        ],
      },
      {
        level: "Go deeper",
        items: [
          {
            title: "Income-Driven Student Loan Repayment",
            blurb: "How payments can be tied to what you earn, not a fixed bill.",
          },
          {
            title: "Negotiating and Restructuring Debt",
            blurb: "Realistic options before things reach a breaking point.",
          },
        ],
      },
      {
        level: "Advanced",
        items: [
          {
            title: "Bankruptcy, Explained Without Judgment",
            blurb: "Chapter 7 vs. Chapter 13, and when a fresh start is the right call.",
          },
        ],
      },
    ],
    related: ["budgeting", "credit", "college"],
  },

  "money-safety": {
    headline: "Keep what you've worked for",
    subhead:
      "How to spot a scam, protect your identity and documents, and act fast if someone gets to you.",
    intro: [
      "Scammers don't go after careless people. They go after people who are busy, hopeful, or under pressure, which is all of us at some point. The tactics are built to rush you past your better judgment, and they work on smart people every day.",
      "Almost every scam waves the same few red flags, though, and most of your best defenses are free. Learn the patterns once and you'll keep spotting them for the rest of your life.",
    ],
    level: "Beginner-friendly",
    tool: { label: "Budget Planner", href: "/tools/budget" },
    related: ["credit", "government-aid", "budgeting"],
  },

  insurance: {
    headline: "Insurance, without the runaround",
    subhead:
      "What premiums, deductibles, and copays mean, and how to pick coverage that fits your life and budget.",
    intro: [
      "Insurance is one big idea wrapped in confusing words: you pay a little, regularly, so that a disaster you couldn't afford on your own doesn't wipe you out. Nobody explains the vocabulary, though (premium, deductible, copay), so it's easy to overpay or to skip coverage you need.",
      "We'll translate it all into plain English, starting with how insurance works and moving through the kinds you're most likely to need.",
    ],
    level: "Beginner-friendly",
    related: ["budgeting", "government-aid", "home-ownership"],
  },
};

/** Total number of guides on a topic's roadmap (published articles, with the
 * planned `path` as a fallback before any are live). */
export function guideCount(topicId: TopicId): number {
  const published = getTopicArticles(topicId).length;
  if (published > 0) return published;
  return (learnContent[topicId].path ?? []).reduce(
    (sum, group) => sum + group.items.length,
    0
  );
}

export const LEARN_UPDATED = "Updated July 2026";
