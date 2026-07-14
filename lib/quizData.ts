import { topics, type TopicId } from "./topics";

export const ALL_TOPIC_IDS: TopicId[] = topics.map((t) => t.id);

export type Tier = "beginner" | "advanced";

export interface QuizAnswers {
  q1: string;
  q2: string;
  q3: string[];
  q4: string[];
  q5: string;
}

// Selected option index per knowledge-check question, keyed by topic id.
export type KCAnswers = Record<string, (number | undefined)[]>;

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: "q1" | "q2" | "q3" | "q4" | "q5";
  title: string;
  helper?: string;
  multiSelect: boolean;
  options: QuizOption[];
}

// ---------------------------------------------------------------------------
// Questions 1-5
// ---------------------------------------------------------------------------

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    title: "How old are you?",
    helper:
      "This helps us make sure the resources we recommend are relevant to your stage of life.",
    multiSelect: false,
    options: [
      { id: "under-18", label: "Under 18" },
      { id: "18-27", label: "18–27" },
      { id: "28-40", label: "28–40" },
      { id: "41-plus", label: "41 and older" },
      { id: "prefer-not-say", label: "Prefer not to say" },
    ],
  },
  {
    id: "q2",
    title: "Which best describes your current situation?",
    helper: "Select the one that fits best.",
    multiSelect: false,
    options: [
      { id: "student", label: "I'm a student (high school or college)" },
      { id: "working", label: "I'm working full-time or part-time" },
      {
        id: "between-jobs",
        label: "I'm between jobs or currently unemployed",
      },
      { id: "retired", label: "I'm retired or semi-retired" },
      {
        id: "parent",
        label: "I'm a parent or caregiver managing household finances",
      },
    ],
  },
  {
    id: "q3",
    title: "What topics would you like to learn more about?",
    helper:
      "Select all that apply. We'll build your personalized resource list from these.",
    multiSelect: true,
    options: [
      { id: "credit", label: "Credit scores and building credit" },
      {
        id: "budgeting",
        label: "Budgeting and managing money day-to-day",
      },
      {
        id: "college",
        label: "Student loans, college planning, and scholarships",
      },
      { id: "investing", label: "Investing and growing wealth" },
      { id: "home-ownership", label: "Renting or buying a home" },
      {
        id: "government-aid",
        label: "Government aid, benefits, and debt relief",
      },
      { id: "taxes", label: "Taxes and filing basics" },
      {
        id: "money-safety",
        label: "Spotting scams and protecting your money",
      },
      { id: "insurance", label: "Insurance: health, auto, renters, life" },
      { id: "not-sure", label: "I'm not sure, help me figure it out" },
    ],
  },
  {
    id: "q4",
    title: "What would be most helpful to you right now?",
    helper: "Select all that apply.",
    multiSelect: true,
    options: [
      {
        id: "clear-path",
        label: "Point me to the right place to start",
      },
      {
        id: "tools",
        label:
          "Give me tools I can use right now (calculators, budget planners)",
      },
      {
        id: "aid-scholarships",
        label:
          "Help me find financial aid, scholarships, or government programs",
      },
      {
        id: "test-knowledge",
        label: "Let me test what I already know with a quiz",
      },
      { id: "browse", label: "I just want to browse and figure things out myself" },
    ],
  },
  {
    id: "q5",
    title: "How confident do you feel about your finances?",
    multiSelect: false,
    options: [
      {
        id: "starting-out",
        label: "Just starting out",
      },
      {
        id: "finding-footing",
        label: "Finding my footing: I know a little but have a lot of questions",
      },
      {
        id: "getting-there",
        label: "Getting there: I understand the basics and want to go deeper",
      },
      {
        id: "pretty-confident",
        label:
          "Pretty confident: I want to sharpen specific skills or fill in gaps",
      },
    ],
  },
];

export const TOPIC_NOT_SURE = "not-sure";

// Maps a Q5 answer id to the knowledge-check difficulty tier.
export const confidenceTier: Record<string, Tier> = {
  "starting-out": "beginner",
  "finding-footing": "beginner",
  "getting-there": "advanced",
  "pretty-confident": "advanced",
};

// ---------------------------------------------------------------------------
// Question 6: Knowledge Check question bank
// ---------------------------------------------------------------------------

export interface KnowledgeCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// How many knowledge-check questions to ask per selected topic.
export const KC_QUESTIONS_PER_TOPIC = 2;
/** Cap on how many selected topics get quizzed (owner call July 2026: the
 *  check felt too long) — the first N picks, 2 questions each, 4 max. */
export const MAX_KC_TOPICS = 2;

export const knowledgeCheckBank: Record<
  TopicId,
  Record<Tier, KnowledgeCheckQuestion[]>
> = {
  credit: {
    beginner: [
      {
        question: "What is a credit score?",
        options: [
          "A record of everything you've ever bought",
          "A number that shows lenders how likely you are to repay debt",
          "Your bank account balance",
          "A score you get in a financial class",
        ],
        correctIndex: 1,
      },
      {
        question: "Which of these would help build your credit?",
        options: [
          "Paying your bills late",
          "Never using a credit card",
          "Making on-time payments consistently",
          "Closing all your accounts",
        ],
        correctIndex: 2,
      },
    ],
    advanced: [
      {
        question:
          "You have three credit cards. Card A has a $500 limit and $400 balance. Card B has a $2,000 limit and $200 balance. Card C has a $1,000 limit and $0 balance. What is your overall credit utilization rate?",
        options: ["20%", "29%", "40%", "17%"],
        correctIndex: 3,
      },
      {
        question:
          "You're about to apply for a mortgage and want to maximize your credit score first. You have 6 months. Which strategy is most effective?",
        options: [
          "Open two new credit cards to increase your available credit",
          "Pay down revolving balances and avoid any new credit applications",
          "Close your oldest accounts to simplify your credit profile",
          "Dispute all negative items regardless of accuracy",
        ],
        correctIndex: 1,
      },
      {
        question:
          "You co-signed a loan for a friend two years ago. They've been paying on time, but they just told you they can no longer afford the payments. What is your risk?",
        options: [
          "None: it's their loan, not yours",
          "You may be responsible for the full remaining balance and any missed payments will appear on your credit report",
          "You'll only owe half since you co-signed",
          "Your credit is protected because you didn't take out the loan yourself",
        ],
        correctIndex: 1,
      },
    ],
  },
  budgeting: {
    beginner: [
      {
        question: "What is a budget?",
        options: [
          "A limit on how much you can earn",
          "A plan for how you'll spend and save your money",
          "A type of bank account",
          "A government program for low-income families",
        ],
        correctIndex: 1,
      },
      {
        question: 'Which of these is an example of a "need"?',
        options: [
          "A new pair of sneakers",
          "A streaming subscription",
          "Rent or housing costs",
          "A dinner out with friends",
        ],
        correctIndex: 2,
      },
    ],
    advanced: [
      {
        question:
          "You earn $3,000 per month after taxes. Using the 50/30/20 rule, how much should go toward savings?",
        options: ["$900", "$1,500", "$600", "$300"],
        correctIndex: 2,
      },
      {
        question:
          'You\'ve been overspending in your "wants" category for three months. What\'s the most effective first step?',
        options: [
          "Cancel all discretionary spending immediately",
          "Review your last 3 months of transactions and identify patterns",
          "Move money from your savings to cover it",
          "Ignore it, it will balance out eventually",
        ],
        correctIndex: 1,
      },
    ],
  },
  investing: {
    beginner: [
      {
        question: "What is a stock?",
        options: [
          "A type of savings account with guaranteed returns",
          "A share of ownership in a company",
          "A loan you give to a business",
          "A government bond",
        ],
        correctIndex: 1,
      },
      {
        question: "Why do people invest money instead of just saving it?",
        options: [
          "Investing is always safer than saving",
          "Investing has no risk",
          "Investing can grow money faster than a savings account over time",
          "Banks require you to invest",
        ],
        correctIndex: 2,
      },
    ],
    advanced: [
      {
        question: 'What does it mean when a portfolio is "diversified"?',
        options: [
          "All investments are in one high-performing stock",
          "Investments are spread across different asset classes to reduce risk",
          "Only international stocks are included",
          "The portfolio has never lost value",
        ],
        correctIndex: 1,
      },
      {
        question:
          "An investor puts $5,000 into an index fund with an average annual return of 7%. Roughly how much will it be worth in 10 years (assuming compound growth)?",
        options: [
          "Around $6,000",
          "Around $7,500",
          "Around $9,800",
          "Around $12,000",
        ],
        correctIndex: 2,
      },
    ],
  },
  taxes: {
    beginner: [
      {
        question: "What is a W-2?",
        options: [
          "A form you fill out to get a refund faster",
          "A document from your employer showing your earnings and taxes withheld",
          "A type of savings account",
          "A form only self-employed people use",
        ],
        correctIndex: 1,
      },
      {
        question:
          "When is the typical federal tax filing deadline in the U.S.?",
        options: ["January 1st", "April 15th", "June 30th", "December 31st"],
        correctIndex: 1,
      },
    ],
    advanced: [
      {
        question:
          "What is the difference between a tax deduction and a tax credit?",
        options: [
          "They are the same thing",
          "A deduction reduces your taxable income; a credit directly reduces your tax bill",
          "A credit reduces your taxable income; a deduction reduces your tax bill",
          "Deductions only apply to businesses",
        ],
        correctIndex: 1,
      },
      {
        question:
          "You're self-employed and made $50,000 this year. What additional tax responsibility do you have that a salaried employee typically doesn't?",
        options: [
          "You don't owe any taxes",
          "You must pay self-employment tax to cover Social Security and Medicare",
          "You automatically get a larger refund",
          "You file using a W-2",
        ],
        correctIndex: 1,
      },
    ],
  },
  college: {
    beginner: [
      {
        question: "What is FAFSA?",
        options: [
          "A scholarship only for honor students",
          "A free application that determines eligibility for federal financial aid",
          "A type of student loan with high interest",
          "A college entrance exam",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What is the difference between a grant and a student loan?",
        options: [
          "They are the same thing",
          "Grants must be repaid; loans do not",
          "Grants do not need to be repaid; loans do",
          "Loans are always better than grants",
        ],
        correctIndex: 2,
      },
    ],
    advanced: [
      {
        question:
          'What is the "Student Aid Index" (SAI) on the FAFSA and how does it affect your aid?',
        options: [
          "It's the amount your school expects you to fundraise",
          "It's a number used to determine how much financial aid you're eligible for, and a lower SAI generally means more aid",
          "It's only relevant for graduate students",
          "It's the total cost of attendance at your school",
        ],
        correctIndex: 1,
      },
      {
        question:
          'A college\'s "Cost of Attendance" is $45,000 and your financial aid package is $30,000. What is your "unmet need" if your Student Aid Index is $5,000?',
        options: ["$15,000", "$10,000", "$20,000", "$40,000"],
        correctIndex: 1,
      },
    ],
  },
  "home-ownership": {
    beginner: [
      {
        question: "What is a mortgage?",
        options: [
          "A type of savings account for buying a home",
          "A loan used to purchase a home, repaid over time with interest",
          "A government grant for first-time buyers",
          "A home inspection report",
        ],
        correctIndex: 1,
      },
      {
        question: "What does a down payment mean when buying a house?",
        options: [
          "The monthly fee you pay your landlord",
          "The upfront amount you pay toward the home's purchase price",
          "A penalty for paying your mortgage late",
          "The cost of homeowner's insurance",
        ],
        correctIndex: 1,
      },
    ],
    advanced: [
      {
        question:
          "You're comparing a 15-year and a 30-year mortgage for the same home. What is the main trade-off?",
        options: [
          "The 30-year has higher monthly payments but less total interest",
          "The 15-year has lower monthly payments but more total interest",
          "The 15-year has higher monthly payments but you pay significantly less interest overall",
          "There is no meaningful difference",
        ],
        correctIndex: 2,
      },
      {
        question: 'What does it mean for a home to be "underwater"?',
        options: [
          "The home has flood damage",
          "The homeowner owes more on the mortgage than the home is currently worth",
          "The home failed inspection",
          "The property taxes exceed the mortgage payment",
        ],
        correctIndex: 1,
      },
    ],
  },
  "government-aid": {
    beginner: [
      {
        question: "What is Medicaid?",
        options: [
          "A savings account for medical expenses",
          "A government health insurance program for people with low income",
          "A type of private health insurance",
          "A prescription discount card",
        ],
        correctIndex: 1,
      },
      {
        question: 'What does "debt relief" mean?',
        options: [
          "Getting a second job to pay off debt",
          "Programs or strategies that reduce, restructure, or eliminate what you owe",
          "A penalty for not paying your bills",
          "A type of credit card",
        ],
        correctIndex: 1,
      },
    ],
    advanced: [
      {
        question:
          "What is the difference between Chapter 7 and Chapter 13 bankruptcy?",
        options: [
          "They are the same process with different names",
          "Chapter 7 liquidates assets to discharge debt; Chapter 13 creates a repayment plan while keeping assets",
          "Chapter 13 is only for businesses",
          "Chapter 7 requires a repayment plan",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Which federal student loan repayment plan bases your monthly payment on your income and family size?",
        options: [
          "Standard Repayment Plan",
          "Graduated Repayment Plan",
          "Income-Driven Repayment (IDR)",
          "Extended Repayment Plan",
        ],
        correctIndex: 2,
      },
    ],
  },
  "money-safety": {
    beginner: [
      {
        question:
          "Someone calls claiming to be from your bank and asks you to read back the verification code they just texted you. What should you do?",
        options: [
          "Read them the code so they can confirm it's really you",
          "Never share the code. Hang up and call the number on your card yourself",
          "Give them only the first half of the code to be safe",
          "Text the code instead of saying it out loud",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Which of these is a classic sign that you're dealing with a scam?",
        options: [
          "They let you take your time to decide",
          "They give you an official phone number you can call back",
          "They demand payment by gift card, wire transfer, or cryptocurrency",
          "They mail you a written contract to review",
        ],
        correctIndex: 2,
      },
    ],
    advanced: [
      {
        question:
          "A buyer for something you sold online sends a check for $500 more than the price and asks you to refund the extra. Why is this dangerous?",
        options: [
          "It isn't; the bank already showed the money in your account",
          "The check can bounce days after the funds appear available, leaving you owing the bank the full amount",
          "You'll just have to pay a small fee to keep the extra",
          "Checks always clear instantly, so there's no risk",
        ],
        correctIndex: 1,
      },
      {
        question:
          "In the U.S., who is legally allowed to give you immigration legal advice?",
        options: [
          "Any notary public, since 'notario' means lawyer",
          "A licensed attorney or a DOJ-accredited representative at a recognized organization",
          "Anyone who guarantees they can get you a green card for a fee",
          "A tax preparer or check-cashing store",
        ],
        correctIndex: 1,
      },
    ],
  },
  insurance: {
    beginner: [
      {
        question: "What is a deductible?",
        options: [
          "The monthly amount you pay just to have insurance",
          "The amount you pay out of pocket before insurance starts covering costs",
          "A discount you get for not filing claims",
          "The most the insurer will ever pay out",
        ],
        correctIndex: 1,
      },
      {
        question: "What is a premium?",
        options: [
          "The amount you pay (often monthly) to keep your coverage active",
          "A fee charged each time you file a claim",
          "Money the insurance company pays you every year",
          "A penalty for being uninsured",
        ],
        correctIndex: 0,
      },
    ],
    advanced: [
      {
        question:
          "You rarely see a doctor and want a lower monthly cost. What trade-off should you generally expect?",
        options: [
          "A lower premium usually comes with a higher deductible",
          "A lower premium always means lower total yearly costs",
          "A lower premium means smaller copays at every visit",
          "Premiums and deductibles have nothing to do with each other",
        ],
        correctIndex: 0,
      },
      {
        question: "Who most needs life insurance?",
        options: [
          "Everyone, in equal amounts",
          "People whom others depend on financially, like children or a partner",
          "Only people who are retired",
          "Only people who own a home",
        ],
        correctIndex: 1,
      },
    ],
  },
};

/** Score a topic's knowledge check: how many of the asked questions were answered correctly. */
export function scoreKnowledgeCheck(
  topicId: TopicId,
  tier: Tier,
  selectedIndices: Array<number | null | undefined>
): number {
  const questions = knowledgeCheckBank[topicId][tier].slice(
    0,
    KC_QUESTIONS_PER_TOPIC
  );
  return questions.reduce(
    (score, q, i) => score + (selectedIndices[i] === q.correctIndex ? 1 : 0),
    0
  );
}

// ---------------------------------------------------------------------------
// General "simpler" knowledge check, for people who pick "I'm not sure" on Q3
// and have no specific topics to be quizzed on. A short, always-beginner spread
// across the most foundational topics. Skippable like any knowledge check.
// ---------------------------------------------------------------------------

export const GENERAL_KC_PICKS: { topicId: TopicId; index: number }[] = [
  { topicId: "budgeting", index: 0 },
  { topicId: "credit", index: 0 },
  { topicId: "money-safety", index: 0 },
  { topicId: "taxes", index: 0 },
];

/** Score the general knowledge check: correct answers out of the picks shown. */
export function scoreGeneralCheck(answers: KCAnswers): {
  correct: number;
  total: number;
} {
  let correct = 0;
  for (const { topicId, index } of GENERAL_KC_PICKS) {
    const q = knowledgeCheckBank[topicId].beginner[index];
    if (q && answers[topicId]?.[index] === q.correctIndex) correct += 1;
  }
  return { correct, total: GENERAL_KC_PICKS.length };
}

/** Encouraging, honest feedback for the general knowledge check. */
// Deterministic variant picker: same seed always yields the same phrasing, so
// a resumed or re-rendered result stays consistent, while different topics
// (different seeds) read differently instead of repeating one template.
function seededIndex(seed: string, len: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % len;
}
function pickVariant(variants: string[], seed: string): string {
  return variants[seededIndex(seed, variants.length)];
}

export function getGeneralCheckFeedback(correct: number, total: number): string {
  const pct = total > 0 ? correct / total : 0;
  const seed = `general-${correct}-${total}`;
  if (pct >= 0.75) {
    return pickVariant(
      [
        `You got ${correct} of ${total}. For someone who answered "I'm not sure," you know a fair amount. We'll skip the very basics and point you toward what to sharpen next.`,
        `${correct} of ${total} right, from someone who said they weren't sure. You know more than you gave yourself credit for, so we'll start a notch above the basics.`,
      ],
      seed
    );
  }
  if (pct >= 0.4) {
    return pickVariant(
      [
        `You got ${correct} of ${total}: some solid instincts, a few gaps. The path below starts with the fundamentals so nothing feels shaky.`,
        `${correct} of ${total}: the instincts are there, with a couple of soft spots. We'll begin with the fundamentals so the rest has something to stand on.`,
      ],
      seed
    );
  }
  return pickVariant(
    [
      `You got ${correct} of ${total}, which is a fine place to begin. We've put the clearest, most beginner-friendly guides first so you can build from there.`,
      `${correct} of ${total}, and that's a perfectly good starting line. The friendliest guides are up first so you can build from the ground up.`,
    ],
    seed
  );
}

// ---------------------------------------------------------------------------
// Results: Financial Profile (Part 1)
// ---------------------------------------------------------------------------

export function getFinancialProfile(
  ageId: string,
  situationId: string,
  tier: Tier
): string {
  switch (situationId) {
    case "student":
      return ageId === "under-18"
        ? "You're a high school student just getting started with finances, and showing up this early puts you ahead of the curve. We'll keep things practical and useful for right now."
        : "You're a student building the foundation of your financial life, with real decisions ahead of you: loans, credit, budgeting. We'll help you make them with confidence.";
    case "working":
      return tier === "beginner"
        ? "You're navigating finances as a working adult with some real questions. You're not starting from zero, and we're going to help you fill in the gaps."
        : "You're at a stage where decisions about credit, investing, and planning ahead carry real long-term weight. Let's make sure you have the right information to make them well.";
    case "between-jobs":
      return "You're between jobs right now, which is a good time to get a clearer picture of your finances and the support that's available to you.";
    case "retired":
      return "You're thinking about your finances at a stage where stability and planning ahead matter most. We'll focus on the resources that fit where you are now.";
    case "parent":
      return "You're managing a household and juggling a lot. We'll focus on the tools and resources that give you the most value for your time.";
    default:
      return "You're here to get a clearer picture of your finances, which is a good place to start. Here's what we'd recommend based on your answers.";
  }
}

// ---------------------------------------------------------------------------
// Results: Knowledge Check Feedback (Part 2)
// ---------------------------------------------------------------------------

/**
 * Honest, encouraging feedback on a topic's knowledge-check score.
 * `score` is out of KC_QUESTIONS_PER_TOPIC (currently 0-2).
 */
export function getKnowledgeCheckFeedback(
  topicLabel: string,
  score: number,
  tier: Tier
): string {
  const t = topicLabel;
  // Seeded by topic name alone so multiple selected topics read differently
  // instead of repeating one template (the score/tier already pick the
  // bucket), and a resumed result stays consistent.
  const seed = t;

  if (score >= 2) {
    if (tier === "beginner") {
      return pickVariant(
        [
          `You said you were just getting started, but your answers on ${t} suggest you know more than you think. Don't sell yourself short: we've included some intermediate resources.`,
          `You called yourself a beginner on ${t}, then got both right. We've bumped you past the basics so you're not stuck rereading what you already know.`,
          `Turns out you know ${t} better than you let on: two for two. The resources below lean a little further than "beginner" to keep it interesting.`,
        ],
        seed
      );
    }
    return pickVariant(
      [
        `Your answers on ${t} show you've got a solid foundation. We'll point you to some deeper resources to keep building on that.`,
        `Two for two on ${t}: the foundation is clearly there. What's below leans toward the deeper end so you keep moving.`,
        `You know your way around ${t}. We'll skip the groundwork and point you at what actually adds to what you've got.`,
      ],
      seed
    );
  }

  if (score === 1) {
    return pickVariant(
      [
        `You know some of the basics on ${t}, but there are gaps worth filling. We'd suggest starting with our intro guide before jumping into the advanced material.`,
        `Halfway there on ${t}: you've got the gist, with a spot or two to firm up. The intro guide below closes those quickly.`,
        `One right, one that slipped on ${t}. Nothing a quick pass through the fundamentals won't sort out, and that's exactly where we've pointed you.`,
      ],
      seed
    );
  }

  // score === 0 — keep the confidence-mismatch honesty for the advanced tier.
  if (tier === "advanced") {
    return pickVariant(
      [
        `You mentioned feeling confident about ${t}, but some of these questions tripped you up. That happens to a lot of people, and the gaps are usually specific and easy to fill. We've put the foundational resources first so you can build a stronger base.`,
        `You felt good about ${t}, but these two didn't go your way. No shame in it: the gaps here are usually small and specific. We've led with the fundamentals so you can shore them up fast.`,
        `You rated yourself confident on ${t}, and these questions pushed back a little. More common than you'd think, and quick to fix: start with the foundational guides below.`,
      ],
      seed
    );
  }
  return pickVariant(
    [
      `Your answers suggest ${t} is mostly new territory for you. We'd recommend starting from the beginning on this one; it's more straightforward than it seems.`,
      `${t} looks like fresh ground for you, which is a perfectly fine place to start. Begin with the first guide below; it's friendlier than the jargon makes it sound.`,
      `Looks like ${t} is new to you, and that's good to know: it means the beginner guides below are exactly where you should be, and they move faster than you'd expect.`,
    ],
    seed
  );
}

// ---------------------------------------------------------------------------
// Results: Where to Start (Part 3)
// ---------------------------------------------------------------------------

const topicWhyBlurbs: Record<TopicId, string> = {
  budgeting:
    "Getting your day-to-day finances under control is the foundation everything else builds on.",
  credit:
    "Once your day-to-day money is steady, building credit opens a lot of doors: better rates and easier approvals on almost everything.",
  college:
    "Financial aid decisions are time-sensitive, so this is worth tackling early.",
  investing:
    "With the groundwork in place, this is a good time to start putting your money to work.",
  "home-ownership":
    "This is one of the biggest financial decisions you'll make, so it pays to understand it well before you need it.",
  "government-aid":
    "Knowing what you qualify for can free up real money in the short term while you sort out the rest.",
  taxes:
    "Understanding this now means fewer surprises when filing season comes around, and possibly more money back.",
  "money-safety":
    "One scam can wipe out months of progress, so learning to spot them protects everything else you're building.",
  insurance:
    "The right coverage keeps one emergency, like a hospital visit or a car wreck, from undoing everything else you've built.",
};

const stepLabels = ["Start here", "Then", "When you're ready"];

export interface WhereToStartStep {
  label: string; // "Start here" | "Then" | "When you're ready"
  topicId: TopicId;
  why: string;
}

/** The default topic order for a situation, before filtering to what the user actually picked. */
export function getDefaultTopicOrder(
  situationId: string,
  ageId: string,
  tier: Tier
): TopicId[] {
  switch (situationId) {
    case "student":
      return ageId === "under-18"
        ? ["budgeting", "credit", "college"]
        : ["college", "credit", "budgeting"];
    case "working":
      return tier === "beginner"
        ? ["budgeting", "credit", "taxes"]
        : ["investing", "home-ownership", "taxes"];
    case "between-jobs":
      return ["government-aid", "budgeting", "credit"];
    case "retired":
      return ["investing", "government-aid", "taxes"];
    case "parent":
      return ["budgeting", "college", "government-aid"];
    default:
      return ["budgeting", "credit", "investing"];
  }
}

/**
 * Builds the "Where to Start" list: the situation's default topic order,
 * filtered down to topics the user actually selected, with any other
 * selected topics appended afterward (capped at 3 total).
 */
export function getWhereToStart(
  selectedTopics: TopicId[],
  situationId: string,
  ageId: string,
  tier: Tier
): WhereToStartStep[] {
  const defaultOrder = getDefaultTopicOrder(situationId, ageId, tier);
  const prioritized = defaultOrder.filter((t) => selectedTopics.includes(t));
  const remaining = selectedTopics.filter((t) => !prioritized.includes(t));
  const ordered = [...prioritized, ...remaining].slice(0, 3);

  return ordered.map((topicId, i) => ({
    label: stepLabels[i] ?? stepLabels[stepLabels.length - 1],
    topicId,
    why: topicWhyBlurbs[topicId],
  }));
}

// ---------------------------------------------------------------------------
// Results: Resource Cards (Part 4)
// ---------------------------------------------------------------------------

export interface ResourceCard {
  title: string;
  description: string;
  href: string;
}

export const topicResourceCards: Record<TopicId, Record<Tier, ResourceCard>> = {
  credit: {
    beginner: {
      title: "What Is a Credit Score, and Why Does It Matter?",
      description:
        "A plain-English breakdown of how credit scores work, what affects them, and how to start building yours from zero.",
      href: "/learn/credit",
    },
    advanced: {
      title: "Credit Utilization: The Strategy Behind the Number",
      description:
        "You've heard \"stay below 30%.\" Here's how timing, per-card balances, and your overall profile move your score.",
      href: "/learn/credit",
    },
  },
  budgeting: {
    beginner: {
      title: "Building Your First Budget",
      description:
        "A simple framework for figuring out where your money goes and making a plan that fits your life.",
      href: "/learn/budgeting",
    },
    advanced: {
      title: "Fixing a Budget That Isn't Working",
      description:
        "Already have a budget but keep blowing past it? Here's how to find the leaks and make it stick.",
      href: "/learn/budgeting",
    },
  },
  taxes: {
    beginner: {
      title: "Filing Your Taxes for the First Time",
      description:
        "What a W-2 is, what \"filing\" means, and a step-by-step walkthrough for your first return.",
      href: "/learn/taxes",
    },
    advanced: {
      title: "Deductions, Credits, and Self-Employment Basics",
      description:
        "The difference between a deduction and a credit, plus what changes once you're earning 1099 income.",
      href: "/learn/taxes",
    },
  },
  college: {
    beginner: {
      title: "FAFSA and Financial Aid, Explained",
      description:
        "What FAFSA does for you, the difference between grants and loans, and how to start the process.",
      href: "/learn/college",
    },
    advanced: {
      title: "Understanding Your Financial Aid Award",
      description:
        "How to read your award letter, calculate unmet need, and see what you're on the hook for.",
      href: "/learn/college",
    },
  },
  investing: {
    beginner: {
      title: "Investing 101: What a Stock Is",
      description:
        "The basics of investing, why it beats saving alone, and how to open your first account.",
      href: "/learn/investing",
    },
    advanced: {
      title: "Beyond the Basics: Building a Real Investment Strategy",
      description:
        "Index funds, asset allocation, and how to think about risk. For anyone ready to go deeper than \"open a Roth IRA.\"",
      href: "/learn/investing",
    },
  },
  "home-ownership": {
    beginner: {
      title: "Renting vs. Buying: What to Know First",
      description:
        "Mortgages and down payments explained in plain terms, for anyone who's never bought a home before.",
      href: "/learn/home-ownership",
    },
    advanced: {
      title: "15-Year vs. 30-Year, and Other Big Decisions",
      description:
        "The real trade-offs in mortgage terms, and what it means for a home to be \"underwater.\"",
      href: "/learn/home-ownership",
    },
  },
  "government-aid": {
    beginner: {
      title: "Benefits & Programs You May Qualify For",
      description:
        "A breakdown of federal and state programs, from food assistance to unemployment, and how to apply for them.",
      href: "/learn/government-aid",
    },
    advanced: {
      title: "Debt Relief Options, Explained Honestly",
      description:
        "The real differences between bankruptcy types and income-driven repayment, and when each one makes sense.",
      href: "/learn/government-aid",
    },
  },
  "money-safety": {
    beginner: {
      title: "How to Spot a Scam Before It Costs You",
      description:
        "The handful of red flags behind almost every scam, plus the simple habits that keep your money and identity safe.",
      href: "/learn/money-safety",
    },
    advanced: {
      title: "What to Do If You've Been Scammed",
      description:
        "A calm, shame-free game plan: stop the bleeding, report it the right way, and avoid the follow-up 'recovery' scams.",
      href: "/learn/money-safety",
    },
  },
  insurance: {
    beginner: {
      title: "How Insurance Actually Works",
      description:
        "Premium, deductible, copay: what the confusing words mean, plus which kinds of insurance you need.",
      href: "/learn/insurance",
    },
    advanced: {
      title: "Health Insurance, Explained",
      description:
        "Deductibles, networks, HMO vs. PPO, and where low-cost coverage comes from, so a hospital visit doesn't turn into a catastrophe.",
      href: "/learn/insurance",
    },
  },
};

// Extra cards added based on Question 4 ("what would help") selections.
export const extraResourceCards: Record<string, ResourceCard> = {
  tools: {
    title: "Tools & Calculators",
    description:
      "Budget planners, debt payoff calculators, and more, built to help you understand your numbers and make smarter decisions.",
    href: "/tools",
  },
  "test-knowledge": {
    title: "Keep Going: More Quizzes by Topic",
    description:
      "Ready to go deeper? Take a focused quiz on any topic to sharpen what you know.",
    href: "/learn",
  },
  "aid-scholarships": {
    title: "Scholarship Finder",
    description:
      "A curated list of scholarships and financial aid programs, plus how to apply. Especially useful if college is on your radar.",
    href: "/resources",
  },
  browse: {
    title: "Explore Every Topic",
    description:
      "Not in a rush? Browse the full library of guides and pick whatever looks interesting.",
    href: "/learn",
  },
};

// Shown in place of Knowledge Check Feedback when the user picked "not sure"
// on Q3; they skip the knowledge check entirely.
export const NOT_SURE_MESSAGE =
  "You weren't sure where to focus, and that's what this quiz is for. Based on where you are right now, here's where we'd suggest starting:";

export const CLOSING_LINE =
  "Bookmark this page or take a screenshot: your results don't expire, and you can retake the quiz whenever your situation changes.";
