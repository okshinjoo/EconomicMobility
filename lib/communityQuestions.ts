import type { TopicId } from "./topics";

// Answered community questions, shown on /blog. These are content you curate:
// when a good question comes in through the Ask box, write a plain-language
// answer and add it here. Keep the voice warm and specific (see lib/articles).

export interface CommunityQA {
  /** Stable slug used as the anchor id (#ask-...). */
  id: string;
  question: string;
  /** Answer as one or more short paragraphs. */
  answer: string[];
  topic?: TopicId;
  /** Optional "go deeper" link to a guide or tool. */
  link?: { label: string; href: string };
}

export const communityQuestions: CommunityQA[] = [
  {
    id: "no-credit-history",
    question: "I have no credit history at all. What's the fastest honest way to start?",
    answer: [
      "Start with a tool built for exactly this: a secured credit card (you put down a small refundable deposit that becomes your limit) or a credit-builder loan from a credit union. Both report your on-time payments to the credit bureaus, which is what actually builds a score.",
      "Then keep two habits boringly consistent: pay the full balance on time every month, and keep what you owe well below your limit. There's no secret fast-track, and anyone promising to “boost” your score for a fee is selling something you can do yourself for free.",
    ],
    topic: "credit",
    link: { label: "Read: Build Credit From Zero", href: "/learn/credit" },
  },
  {
    id: "debt-or-save-first",
    question: "Should I pay off debt or build savings first?",
    answer: [
      "Do a little of both, in order. First, set aside a small starter cushion (even a few hundred dollars) so the next surprise doesn't go straight onto a credit card. That tiny buffer is what keeps you from sliding backward.",
      "Once that's in place, throw your extra money at high-interest debt (credit cards especially), since that interest grows faster than almost any savings account. After the expensive debt is gone, shift back to building a fuller emergency fund.",
    ],
    topic: "budgeting",
    link: { label: "Try the Debt Payoff Calculator", href: "/tools/debt" },
  },
  {
    id: "benefits-shame",
    question: "Is it bad to use government benefits like SNAP if I'm working?",
    answer: [
      "Not at all, and you don't have to be unemployed to qualify. Plenty of people who work full time do, especially with kids or high rent. These programs are funded by taxes, including ones taken out of your own paychecks, so using them is accepting help that was built for your situation.",
      "Applying is free, and nobody legitimate ever charges you to sign up. If money is tight, it's worth five minutes to check what you qualify for.",
    ],
    topic: "government-aid",
    link: { label: "Read: SNAP, Explained", href: "/learn/government-aid/snap-explained" },
  },
  {
    id: "rent-share",
    question: "How much of my paycheck should go to rent?",
    answer: [
      "A common rule of thumb is to keep rent around 30% of your take-home pay, but treat that as a guidepost, not a law. In expensive cities it's often higher, and that's okay if the rest of your budget still works.",
      "The real test comes after rent: can you cover your other needs, chip at any debt, and save even a little? If rent leaves nothing for those, that's the signal to adjust.",
    ],
    topic: "budgeting",
    link: { label: "Try the Rent Affordability Calculator", href: "/tools/budget/rent" },
  },
  {
    id: "irs-gift-card-call",
    question:
      "Someone called saying I owe the IRS and have to pay with gift cards right now or I'll be arrested. Is this real?",
    answer: [
      "No. That's a scam, full stop. The IRS does not call out of the blue demanding immediate payment by gift card, wire, or app, and it does not threaten to have you arrested over the phone. The urgency and the gift-card request are the tells.",
      "Hang up. Don't pay, don't share any information, and don't trust the number on your screen (scammers fake those). If you're genuinely worried, look up the agency's real number yourself and call them.",
    ],
    topic: "money-safety",
    link: { label: "Read: How to Spot a Scam", href: "/learn/money-safety/how-to-spot-a-scam" },
  },
];
