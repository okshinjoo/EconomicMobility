import type { TopicId } from "./topics";

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** Other surface forms that should also link to this entry. */
  aliases?: string[];
  /** Plain-English, 1–2 sentences. */
  definition: string;
  related?: TopicId;
}

// Keep definitions jargon-free and concrete. The article renderer auto-links
// the first occurrence of any term/alias below (see components/ArticleBody.tsx).
export const glossary: GlossaryTerm[] = [
  // --- Credit ---
  {
    slug: "credit-score",
    term: "credit score",
    definition:
      "A three-digit number (usually 300–850) that tells lenders how likely you are to repay money you borrow. Higher is better.",
    related: "credit",
  },
  {
    slug: "credit-report",
    term: "credit report",
    definition:
      "The detailed record of your accounts, balances, and payment history that your credit score is built from.",
    related: "credit",
  },
  {
    slug: "credit-utilization",
    term: "credit utilization",
    aliases: ["utilization rate", "utilization"],
    definition:
      "The share of your available credit you're using. Owing $200 on a card with a $1,000 limit is 20% utilization. Lower is better.",
    related: "credit",
  },
  {
    slug: "apr",
    term: "APR",
    aliases: ["annual percentage rate"],
    definition:
      "Annual Percentage Rate: the yearly cost of borrowing money, shown as a percentage. The higher the APR, the more interest you pay.",
    related: "credit",
  },
  {
    slug: "interest",
    term: "interest",
    definition:
      "The cost of borrowing money, or the money you earn for saving it, usually set as a percentage of the amount.",
  },
  {
    slug: "secured-credit-card",
    term: "secured credit card",
    aliases: ["secured card"],
    definition:
      "A starter credit card backed by a refundable cash deposit, designed to help people build credit from scratch.",
    related: "credit",
  },
  {
    slug: "authorized-user",
    term: "authorized user",
    definition:
      "Someone added to another person's credit card account. The account's history can help the authorized user build credit.",
    related: "credit",
  },
  {
    slug: "hard-inquiry",
    term: "hard inquiry",
    aliases: ["hard inquiries", "hard pull"],
    definition:
      "A check of your credit report when you apply for new credit. It can lower your score slightly for a short time.",
    related: "credit",
  },
  {
    slug: "revolving-credit",
    term: "revolving credit",
    definition:
      "Credit you can use, repay, and use again up to a set limit. A credit card is the most common kind.",
    related: "credit",
  },
  {
    slug: "co-sign",
    term: "co-sign",
    aliases: ["co-signer", "cosign"],
    definition:
      "To promise to repay someone else's loan if they can't. As a co-signer, the debt is legally yours too.",
  },

  // --- Budgeting ---
  {
    slug: "budget",
    term: "budget",
    definition:
      "A plan for how you'll spend and save your money, usually month by month.",
    related: "budgeting",
  },
  {
    slug: "net-income",
    term: "net income",
    aliases: ["take-home pay", "after-tax income", "take home pay"],
    definition:
      "The money you keep from your paycheck after taxes and other deductions. Also called take-home pay.",
    related: "budgeting",
  },
  {
    slug: "gross-income",
    term: "gross income",
    definition:
      "Your total pay before any taxes or deductions are taken out.",
    related: "budgeting",
  },
  {
    slug: "fixed-expenses",
    term: "fixed expenses",
    aliases: ["fixed expense"],
    definition:
      "Costs that stay about the same each month, like rent, a car payment, or insurance.",
    related: "budgeting",
  },
  {
    slug: "variable-expenses",
    term: "variable expenses",
    aliases: ["variable expense"],
    definition:
      "Costs that change month to month, like groceries, gas, or going out.",
    related: "budgeting",
  },
  {
    slug: "fifty-thirty-twenty",
    term: "50/30/20 rule",
    aliases: ["50/30/20"],
    definition:
      "A simple budget guide: spend about 50% of take-home pay on needs, 30% on wants, and 20% on savings and extra debt payments.",
    related: "budgeting",
  },
  {
    slug: "emergency-fund",
    term: "emergency fund",
    definition:
      "Money set aside for surprise costs like a car repair, a medical bill, or a lost job, so you don't have to borrow to cover them.",
    related: "budgeting",
  },
  {
    slug: "sinking-fund",
    term: "sinking fund",
    definition:
      "Money you save a little at a time for a known future cost, like holidays or new tires, so it doesn't blow up your budget.",
    related: "budgeting",
  },
  {
    slug: "high-yield-savings",
    term: "high-yield savings account",
    aliases: ["high-yield savings", "high-yield savings accounts"],
    definition:
      "A savings account that pays much more interest than a regular one, often offered by online banks.",
    related: "budgeting",
  },
  {
    slug: "compound-interest",
    term: "compound interest",
    definition:
      "Interest that earns interest. Over time, your money grows faster because you earn returns on your past returns, too.",
    related: "investing",
  },

  // --- Taxes ---
  {
    slug: "w-2",
    term: "W-2",
    definition:
      "A form your employer sends each year showing how much you earned and how much tax was already withheld from your pay.",
    related: "taxes",
  },
  {
    slug: "1099",
    term: "1099",
    aliases: ["1099 form"],
    definition:
      "A tax form reporting income that didn't come from a regular employer, such as freelance, gig, or contract work.",
    related: "taxes",
  },
  {
    slug: "w-4",
    term: "W-4",
    definition:
      "A form you give your employer that tells them how much tax to withhold from each paycheck.",
    related: "taxes",
  },
  {
    slug: "withholding",
    term: "withholding",
    aliases: ["withheld", "withhold"],
    definition:
      "The portion of your paycheck your employer sends to the government for taxes before you ever see it.",
    related: "taxes",
  },
  {
    slug: "tax-deduction",
    term: "tax deduction",
    aliases: ["deduction", "deductions"],
    definition:
      "Something that lowers the amount of your income that gets taxed, so you owe a bit less.",
    related: "taxes",
  },
  {
    slug: "tax-credit",
    term: "tax credit",
    aliases: ["tax credits"],
    definition:
      "A dollar-for-dollar reduction of the tax you owe. A $500 credit cuts your tax bill by $500.",
    related: "taxes",
  },
  {
    slug: "standard-deduction",
    term: "standard deduction",
    definition:
      "A flat amount most people subtract from their income so it isn't taxed, instead of itemizing each deduction.",
    related: "taxes",
  },
  {
    slug: "taxable-income",
    term: "taxable income",
    definition:
      "The portion of your income that's actually taxed, after deductions are subtracted.",
    related: "taxes",
  },
  {
    slug: "tax-refund",
    term: "tax refund",
    aliases: ["refund"],
    definition:
      "Money the government returns to you when you had more tax withheld during the year than you actually owed.",
    related: "taxes",
  },
  {
    slug: "fica",
    term: "FICA",
    definition:
      "The payroll taxes taken from your paycheck that fund Social Security and Medicare.",
    related: "taxes",
  },

  // --- College ---
  {
    slug: "fafsa",
    term: "FAFSA",
    definition:
      "The Free Application for Federal Student Aid, the form that decides what grants, loans, and aid you qualify for. It costs nothing to file.",
    related: "college",
  },
  {
    slug: "grant",
    term: "grant",
    aliases: ["grants"],
    definition:
      "Money for school that you do not have to pay back, usually awarded based on financial need.",
    related: "college",
  },
  {
    slug: "scholarship",
    term: "scholarship",
    aliases: ["scholarships"],
    definition:
      "Money for school you don't repay, usually awarded for need, grades, talent, or background.",
    related: "college",
  },
  {
    slug: "student-loan",
    term: "student loan",
    aliases: ["student loans"],
    definition:
      "Money you borrow to pay for school and repay later, usually with interest.",
    related: "college",
  },
  {
    slug: "subsidized-loan",
    term: "subsidized loan",
    definition:
      "A federal student loan where the government covers the interest while you're in school. Cheaper than unsubsidized.",
    related: "college",
  },
  {
    slug: "cost-of-attendance",
    term: "cost of attendance",
    definition:
      "A school's total yearly price before any aid: tuition, fees, housing, food, books, and more.",
    related: "college",
  },
  {
    slug: "unmet-need",
    term: "unmet need",
    definition:
      "The gap left over when your financial aid doesn't fully cover a school's cost of attendance.",
    related: "college",
  },

  // --- Investing ---
  {
    slug: "stock",
    term: "stock",
    aliases: ["stocks"],
    definition:
      "A small piece of ownership in a company. If the company grows, your share can become worth more.",
    related: "investing",
  },
  {
    slug: "bond",
    term: "bond",
    aliases: ["bonds"],
    definition:
      "A loan you give to a company or government that pays you back with interest over time. Generally lower risk than stocks.",
    related: "investing",
  },
  {
    slug: "index-fund",
    term: "index fund",
    aliases: ["index funds"],
    definition:
      "An investment that holds a little of many companies at once, spreading out risk. A simple, low-cost way to invest.",
    related: "investing",
  },
  {
    slug: "diversification",
    term: "diversification",
    aliases: ["diversified", "diversify"],
    definition:
      "Spreading your money across many investments so one bad pick doesn't sink everything.",
    related: "investing",
  },
  {
    slug: "roth-ira",
    term: "Roth IRA",
    definition:
      "A retirement account you fund with money you've already paid tax on, so qualified withdrawals later are tax-free.",
    related: "investing",
  },
  {
    slug: "401k",
    term: "401(k)",
    aliases: ["401k"],
    definition:
      "A retirement account offered through a job, often with the employer adding free matching money.",
    related: "investing",
  },
  {
    slug: "brokerage-account",
    term: "brokerage account",
    definition:
      "An account you use to buy and sell investments like stocks and index funds.",
    related: "investing",
  },
  {
    slug: "asset-allocation",
    term: "asset allocation",
    definition:
      "How you divide your investments among types like stocks and bonds to match your goals and comfort with risk.",
    related: "investing",
  },

  // --- Home ownership ---
  {
    slug: "mortgage",
    term: "mortgage",
    aliases: ["mortgages"],
    definition:
      "A loan used to buy a home, paid back over many years with interest. The home is collateral until it's paid off.",
    related: "home-ownership",
  },
  {
    slug: "down-payment",
    term: "down payment",
    definition:
      "The cash you pay upfront toward a home's price. The rest is covered by your mortgage.",
    related: "home-ownership",
  },
  {
    slug: "principal",
    term: "principal",
    definition:
      "The original amount you borrowed, not counting interest.",
  },
  {
    slug: "escrow",
    term: "escrow",
    definition:
      "An account your lender uses to hold and pay your property taxes and home insurance for you, bundled into your monthly payment.",
    related: "home-ownership",
  },
  {
    slug: "pmi",
    term: "PMI",
    aliases: ["private mortgage insurance"],
    definition:
      "Private Mortgage Insurance, an extra monthly cost lenders add when your down payment is under 20%.",
    related: "home-ownership",
  },
  {
    slug: "fixed-rate-mortgage",
    term: "fixed-rate mortgage",
    definition:
      "A mortgage whose interest rate and monthly payment stay the same for the whole loan.",
    related: "home-ownership",
  },
  {
    slug: "underwater",
    term: "underwater",
    definition:
      "Owing more on your mortgage than your home is currently worth.",
    related: "home-ownership",
  },

  // --- Government aid & debt relief ---
  {
    slug: "medicaid",
    term: "Medicaid",
    definition:
      "A government program that provides free or low-cost health insurance to people with limited income.",
    related: "government-aid",
  },
  {
    slug: "snap",
    term: "SNAP",
    aliases: ["food stamps"],
    definition:
      "The Supplemental Nutrition Assistance Program, which helps pay for groceries. It used to be called food stamps.",
    related: "government-aid",
  },
  {
    slug: "unemployment-insurance",
    term: "unemployment insurance",
    aliases: ["unemployment benefits"],
    definition:
      "Temporary payments from the government to help cover costs while you're out of work through no fault of your own.",
    related: "government-aid",
  },
  {
    slug: "debt-relief",
    term: "debt relief",
    definition:
      "Programs or strategies that reduce, restructure, or eliminate debt you can't manage on your own.",
    related: "government-aid",
  },
  {
    slug: "income-driven-repayment",
    term: "income-driven repayment",
    aliases: ["income-driven repayment plan", "idr"],
    definition:
      "A federal student loan plan that ties your monthly payment to what you earn and your family size.",
    related: "government-aid",
  },
  {
    slug: "bankruptcy",
    term: "bankruptcy",
    definition:
      "A legal process for people who can't repay their debts, giving them a fresh start by erasing or restructuring what they owe.",
    related: "government-aid",
  },
  {
    slug: "phishing",
    term: "phishing",
    aliases: ["smishing"],
    definition:
      "A fake message (email, text, or call) pretending to be a company or agency you trust, designed to trick you into giving up passwords, codes, or money. Real organizations don't ask for those over a link they sent you.",
    related: "money-safety",
  },
  {
    slug: "identity-theft",
    term: "identity theft",
    definition:
      "When someone uses your personal information, like your Social Security number, to open accounts or claim benefits pretending to be you. Catching it early is why you check your credit report.",
    related: "money-safety",
  },
  {
    slug: "credit-freeze",
    term: "credit freeze",
    aliases: ["security freeze"],
    definition:
      "A free lock you place with each credit bureau so nobody can open new credit in your name until you unlock it. It doesn't affect your score or your existing cards.",
    related: "money-safety",
  },
  {
    slug: "wire-transfer",
    term: "wire transfer",
    definition:
      "A way to send money directly from one bank account to another. Once it's sent, it's usually gone for good, which is why scammers ask for it.",
    related: "money-safety",
  },
  {
    slug: "two-factor-authentication",
    term: "two-factor authentication",
    aliases: ["2FA"],
    definition:
      "A second lock on an account: after your password, you confirm it's really you with a code or app. It stops most break-ins even when a password leaks.",
    related: "money-safety",
  },
  {
    slug: "security-deposit",
    term: "security deposit",
    definition:
      "Money (often one month's rent) a landlord holds while you rent, to cover damage beyond normal wear and tear. If you leave the place in good shape, you're entitled to it back.",
    related: "home-ownership",
  },
  {
    slug: "lease",
    term: "lease",
    definition:
      "The contract between you and a landlord: how much rent, for how long, and what each side is responsible for. Everything you agreed to (and everything you didn't) lives in this document.",
    related: "home-ownership",
  },
  {
    slug: "renters-insurance",
    term: "renters insurance",
    definition:
      "A cheap policy (often $15–$30 a month) that covers your belongings and liability while renting. The landlord's insurance covers the building, not your stuff.",
    related: "home-ownership",
  },
  {
    slug: "premium",
    term: "premium",
    definition:
      "The amount you pay for an insurance policy, usually monthly, whether or not you ever file a claim. It's the price of being covered.",
    related: "insurance",
  },
  {
    slug: "deductible",
    term: "deductible",
    definition:
      "What you pay out of your own pocket before insurance starts paying. A lower deductible usually means a higher premium, and the reverse.",
    related: "insurance",
  },
  {
    slug: "overdraft",
    term: "overdraft",
    aliases: ["overdraft fee"],
    definition:
      "When you spend more than your account holds and the bank covers the gap, usually charging a fee. You can opt out so a too-big purchase declines instead.",
    related: "budgeting",
  },
];

const bySlug = new Map(glossary.map((t) => [t.slug, t]));

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return bySlug.get(slug);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Build a single alternation of every term + alias, longest first so multi-word
// terms win over their substrings. Surface forms map back to a slug + definition.
const surfaceToSlug = new Map<string, string>();
const surfaces: string[] = [];
for (const entry of glossary) {
  for (const form of [entry.term, ...(entry.aliases ?? [])]) {
    surfaceToSlug.set(form.toLowerCase(), entry.slug);
    surfaces.push(form);
  }
}
surfaces.sort((a, b) => b.length - a.length);

/** Regex source (no flags) matching any glossary surface form on word-ish boundaries. */
export const GLOSSARY_PATTERN = `(?<![\\w-])(${surfaces
  .map(escapeRegExp)
  .join("|")})(?![\\w-])`;

export function slugForSurface(surface: string): string | undefined {
  return surfaceToSlug.get(surface.toLowerCase());
}
