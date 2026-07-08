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
  // --- Insurance (article-sweep expansion, July 2026) ---
  {
    slug: "adjuster",
    term: "adjuster",
    aliases: ["insurance adjuster"],
    definition:
      "The insurance company employee who reviews a claim after an accident: examining the evidence, helping assign fault, and estimating the damage before the insurer pays.",
    related: "insurance",
  },
  {
    slug: "annual-maximum",
    term: "annual maximum",
    definition:
      "The most a dental plan will pay toward your care in a year, often $1,000 to $2,000. You cover everything beyond it, the reverse of health insurance, where the yearly cap limits what you pay.",
    related: "insurance",
  },
  {
    slug: "at-fault",
    term: "at fault",
    aliases: ["at-fault"],
    definition:
      "Legally responsible for causing an accident. Insurers assign fault from the evidence, sometimes splitting it between drivers, and an at-fault accident usually raises your premium at renewal for a few years.",
    related: "insurance",
  },
  {
    slug: "charity-care",
    term: "charity care",
    definition:
      "A hospital program that reduces or wipes out bills for patients with limited income. Nonprofit hospitals are generally required to offer one, but you usually have to ask the billing office and apply.",
    related: "insurance",
  },
  {
    slug: "coinsurance",
    term: "coinsurance",
    definition:
      "Your percentage share of a medical bill once you've met your deductible. With 20% coinsurance on a $1,000 bill, you pay $200 and the plan pays $800.",
    related: "insurance",
  },
  {
    slug: "collision-coverage",
    term: "collision coverage",
    definition:
      "The part of an auto policy that pays to fix your own car after a crash, whether you hit another car or a guardrail. It's optional and comes with a deductible you pay first.",
    related: "insurance",
  },
  {
    slug: "comprehensive-coverage",
    term: "comprehensive coverage",
    definition:
      "The part of an auto policy that covers damage to your car from things other than a crash: theft, vandalism, fire, hail, a falling tree, hitting an animal. Optional, with a deductible.",
    related: "insurance",
  },
  {
    slug: "copay",
    term: "copay",
    definition:
      "A flat fee you pay for a specific service, like $25 for a doctor visit or $10 for a prescription. You know the amount in advance, and the plan covers the rest.",
    related: "insurance",
  },
  {
    slug: "disability-insurance",
    term: "disability insurance",
    definition:
      "Coverage that replaces part of your paycheck when illness or injury keeps you from working. Many jobs include some automatically, so check your benefits portal before buying a policy on your own.",
    related: "insurance",
  },
  {
    slug: "health-insurance-marketplace",
    term: "health insurance marketplace",
    aliases: ["HealthCare.gov"],
    definition:
      "The government-run site (HealthCare.gov, or your state's own version) where you shop for health insurance on your own. Many people qualify for subsidies there that lower the monthly cost, so it's worth checking before assuming a plan is out of reach.",
    related: "insurance",
  },
  {
    slug: "hmo",
    term: "HMO",
    definition:
      "A health plan type that keeps costs down by requiring you to stay in-network and usually pick a primary doctor who refers you to specialists. Less flexibility, lower price.",
    related: "insurance",
  },
  {
    slug: "in-network",
    term: "in-network",
    aliases: ["out-of-network"],
    definition:
      "Describes doctors, hospitals, and pharmacies that have agreed to your health plan's negotiated prices. In-network care costs you far less; out-of-network care can cost dramatically more or not be covered at all.",
    related: "insurance",
  },
  {
    slug: "insurance-claim",
    term: "insurance claim",
    aliases: ["file a claim"],
    definition:
      "The request you file when something covered happens and you want the insurer to pay. A fender-bender or a hospital stay becomes a claim the moment you report it and ask the policy to cover it.",
    related: "insurance",
  },
  {
    slug: "itemized-bill",
    term: "itemized bill",
    definition:
      "A medical bill broken out line by line, showing every charge instead of one lump total. Ask the billing office for one so you can check for duplicate charges, wrong quantities, and services you never got.",
    related: "insurance",
  },
  {
    slug: "liability-coverage",
    term: "liability coverage",
    definition:
      "The part of an auto policy that pays for damage and injuries you cause other people, including their car and their medical bills. It's the coverage the law requires almost everywhere, and carrying too little can leave you personally owing the rest.",
    related: "insurance",
  },
  {
    slug: "life-insurance",
    term: "life insurance",
    definition:
      "Coverage that pays money to the people you name if you die, so anyone who depends on your income isn't left stranded. If nobody relies on your paycheck, you may not need much of it yet.",
    related: "insurance",
  },
  {
    slug: "long-term-disability",
    term: "long-term disability",
    definition:
      "Disability coverage that picks up where short-term ends, often after about three months, and can keep paying part of your income for years if you still can't work. If you can only have one kind, this is the one that matters.",
    related: "insurance",
  },
  {
    slug: "open-enrollment",
    term: "open enrollment",
    definition:
      "The yearly window when you can sign up for or switch health, dental, and vision plans through work or the marketplace. Outside that window, you usually need a big life change, like a move or a new baby, to adjust coverage.",
    related: "insurance",
  },
  {
    slug: "out-of-pocket-maximum",
    term: "out-of-pocket maximum",
    aliases: ["out-of-pocket max"],
    definition:
      "The most you can be required to pay in a year for covered care on a health plan. Once you hit it, the plan pays 100% of covered costs for the rest of the year, which caps how bad a health year can get.",
    related: "insurance",
  },
  {
    slug: "own-occupation",
    term: "own-occupation",
    aliases: ["any-occupation"],
    definition:
      "A disability policy feature that pays if you can't do your own job, even if you could still do some other work. Any-occupation policies pay only if you can't do much of any job, which makes them cheaper but weaker protection.",
    related: "insurance",
  },
  {
    slug: "ppo",
    term: "PPO",
    definition:
      "A health plan type that lets you see specialists directly and use out-of-network providers, at a higher price. More freedom than an HMO, bigger premium.",
    related: "insurance",
  },
  {
    slug: "rental-reimbursement-coverage",
    term: "rental reimbursement coverage",
    definition:
      "A cheap auto policy add-on that pays for a rental car while yours is in the shop after a covered claim. Without it, your own policy generally won't cover the rental, though an at-fault driver's insurer usually owes you one.",
    related: "insurance",
  },
  {
    slug: "self-insure",
    term: "self-insure",
    aliases: ["self-insuring"],
    definition:
      "Covering a risk with your own savings instead of buying a policy. Skipping the extended warranty on a gadget you could afford to replace is self-insuring; the rule is to buy insurance only for disasters you couldn't pay for yourself.",
    related: "insurance",
  },
  {
    slug: "short-term-disability",
    term: "short-term disability",
    definition:
      "Disability coverage that replaces roughly half to two-thirds of your pay for a few weeks up to several months, after a brief waiting period. It covers things like surgery recovery, and it's commonly what pays you during parental leave after childbirth.",
    related: "insurance",
  },
  {
    slug: "small-claims-court",
    term: "small-claims court",
    aliases: ["small claims court"],
    definition:
      "A simplified court for modest money disputes, with limits that vary by state but commonly reach several thousand dollars. Filing costs little and you don't need a lawyer, which makes it a real option when an uninsured driver owes you for repairs.",
    related: "insurance",
  },
  {
    slug: "ssdi",
    term: "SSDI",
    aliases: ["Social Security Disability Insurance"],
    definition:
      "Social Security Disability Insurance, the federal program funded by payroll taxes that pays a modest monthly benefit if a severe condition keeps you from doing substantially any work for at least a year. Applications take months and are often denied, so treat it as a floor under the worst cases rather than a primary plan.",
    related: "insurance",
  },
  {
    slug: "subsidy",
    term: "subsidy",
    definition:
      "Help from the government that lowers what you pay, like the discounts many people get on marketplace health plans. The marketplace applies any subsidy you qualify for as you compare plans, so the sticker premium is often not your price.",
    related: "insurance",
  },
  {
    slug: "surprise-bill",
    term: "surprise bill",
    aliases: ["surprise bills"],
    definition:
      "An unexpected charge from an out-of-network provider you never chose, like an out-of-network doctor who treated you at an in-network hospital during an emergency. Federal protections cover many of these, so push back before assuming you owe it.",
    related: "insurance",
  },
  {
    slug: "term-life-insurance",
    term: "term life insurance",
    aliases: ["term life"],
    definition:
      "Life insurance that covers you for a set period, like 20 or 30 years, and pays out only if you die during that term. It's pure protection with no savings piece attached, which keeps it relatively affordable.",
    related: "insurance",
  },
  {
    slug: "waiting-period",
    term: "waiting period",
    definition:
      "The stretch of time before a policy starts paying: the months a dental plan makes new members wait before covering major work, or the weeks before disability payments begin. Choosing a longer waiting period is a classic way to lower a disability premium.",
    related: "insurance",
  },
  {
    slug: "whole-life-insurance",
    term: "whole life insurance",
    aliases: ["whole life"],
    definition:
      "Life insurance that covers your entire life and mixes in a savings or investment component. It costs much more than term coverage for the same amount of protection, which is why salespeople tend to push it hardest.",
    related: "insurance",
  },
  // --- Credit & money safety (article-sweep expansion, July 2026) ---
  {
    slug: "affinity-fraud",
    term: "affinity fraud",
    definition:
      "Investment fraud that spreads through a trusted community, like a church, campus group, or hometown network, carried by people who honestly believe in it. Trusting your community is the exact thing these criminals abuse.",
    related: "money-safety",
  },
  {
    slug: "annualcreditreport-com",
    term: "AnnualCreditReport.com",
    definition:
      "The only site authorized by federal law to give you free copies of your credit reports from all three bureaus. If a 'free credit report' site asks for a credit card number, you're in the wrong place.",
    related: "credit",
  },
  {
    slug: "balance-transfer",
    term: "balance transfer",
    definition:
      "Moving credit card debt onto a new card or loan with a lower interest rate. It only helps if the new rate is genuinely lower and you don't run the old card back up.",
    related: "credit",
  },
  {
    slug: "buy-now-pay-later",
    term: "buy now, pay later",
    aliases: ["BNPL"],
    definition:
      "A checkout option that splits a purchase into a few payments, often four, usually with no interest if you pay on time. It's still debt: late fees, overlapping plans, and overspending are where it turns costly.",
    related: "credit",
  },
  {
    slug: "cdfi",
    term: "CDFI",
    aliases: ["community development financial institutions"],
    definition:
      "A community development financial institution: a lender built to serve people the big banks overlook. Many offer credit-builder loans and work with ITINs.",
    related: "credit",
  },
  {
    slug: "charge-off",
    term: "charge-off",
    aliases: ["charged off", "charges off"],
    definition:
      "An accounting move where a creditor writes off a debt as a loss, typically after about six months of nonpayment. It does not mean the debt is forgiven; it's usually handed or sold to a collector next.",
    related: "credit",
  },
  {
    slug: "chargeback",
    term: "chargeback",
    definition:
      "A credit card charge reversed after you dispute it, like when something you paid for never arrives. Payment apps, wires, and gift cards have no real equivalent, which is exactly why scammers prefer them.",
    related: "money-safety",
  },
  {
    slug: "check-clearing",
    term: "check clearing",
    definition:
      "When a deposited check has actually been paid by the sender's bank, which can take many days. 'Available' money in your account is not cleared money; a fake check can bounce weeks after the funds appear.",
    related: "money-safety",
  },
  {
    slug: "collections",
    term: "collections",
    aliases: ["collection account"],
    definition:
      "Where an unpaid bill ends up when it's handed to a company whose business is chasing the debt. A collection account can stay on your credit report about seven years, paid or not, though its impact fades with age.",
    related: "credit",
  },
  {
    slug: "consumer-financial-protection-bureau",
    term: "Consumer Financial Protection Bureau",
    aliases: ["CFPB"],
    definition:
      "The federal agency that oversees credit bureaus, lenders, and debt collectors. If a bureau won't fix a genuine error on your report, you can escalate the complaint to them.",
    related: "credit",
  },
  {
    slug: "credit-bureau",
    term: "credit bureau",
    aliases: ["Equifax", "Experian", "TransUnion"],
    definition:
      "A company that keeps a file on how you borrow and repay. The three big ones are Equifax, Experian, and TransUnion; lenders report your accounts to them, and each builds your credit report from what it hears.",
    related: "credit",
  },
  {
    slug: "credit-limit",
    term: "credit limit",
    definition:
      "The most you're allowed to owe on a credit card at once. A $300 balance on a $1,000 limit is 30% utilization, so a higher limit or a lower balance both help your score.",
    related: "credit",
  },
  {
    slug: "credit-builder-loan",
    term: "credit-builder loan",
    aliases: ["credit builder loan"],
    definition:
      "A small loan where the money sits in a locked savings account while you make the monthly payments. At the end the cash is yours, and you've built a record of on-time payments. Banks and credit unions offer them.",
    related: "credit",
  },
  {
    slug: "data-breach",
    term: "data breach",
    definition:
      "When a company holding your information gets hacked and your details leak, sometimes including your Social Security number. After one, freezing your credit at all three bureaus is the strongest free response.",
    related: "money-safety",
  },
  {
    slug: "debt-avalanche",
    term: "debt avalanche",
    definition:
      "A payoff method: pay minimums on everything, then send every extra dollar to the debt with the highest interest rate first. It saves the most money over time.",
    related: "credit",
  },
  {
    slug: "debt-collector",
    term: "debt collector",
    aliases: ["collection agency"],
    definition:
      "A company that chases unpaid debts, either working for the original creditor or after buying the debt outright, often for pennies on the dollar. Federal law limits how and when they can contact you.",
    related: "credit",
  },
  {
    slug: "debt-snowball",
    term: "debt snowball",
    definition:
      "A payoff method: pay minimums on everything, then throw every extra dollar at the smallest balance first. Knocking out a whole debt quickly builds the momentum that keeps people going.",
    related: "credit",
  },
  {
    slug: "dispute",
    term: "dispute",
    definition:
      "A formal request to a credit bureau to fix something wrong on your report, like a payment marked late that you paid on time. It's free, and the bureau generally must investigate within about 30 days and fix the error or explain why it stands.",
    related: "credit",
  },
  {
    slug: "doj-accredited-representative",
    term: "DOJ accredited representative",
    aliases: ["accredited representative"],
    definition:
      "A non-lawyer specifically authorized by the U.S. Department of Justice to give immigration legal advice at a recognized nonprofit. Along with licensed attorneys, they're the only people legally allowed to advise on immigration cases.",
    related: "money-safety",
  },
  {
    slug: "fake-check-scam",
    term: "fake check scam",
    aliases: ["fake-check scam", "overpayment scam"],
    definition:
      "Someone sends you a real-looking check and asks you to send part of the money back or on to a 'vendor.' The check bounces days later, the bank reverses the deposit, and every dollar you sent comes out of your pocket.",
    related: "money-safety",
  },
  {
    slug: "family-emergency-scam",
    term: "family emergency scam",
    aliases: ["family-emergency scam"],
    definition:
      "A caller poses as a relative in urgent trouble, an arrest or an accident, and needs money fast and in secret. Hang up and call the person back at the number you already have for them.",
    related: "money-safety",
  },
  {
    slug: "fee-harvester-card",
    term: "fee harvester card",
    definition:
      "A card aimed at people with no credit that stacks setup fees, monthly fees, and maintenance fees. A plain secured card from a normal bank or credit union is almost always the better deal.",
    related: "credit",
  },
  {
    slug: "fico-score",
    term: "FICO score",
    aliases: ["FICO"],
    definition:
      "The most widely used brand of credit score, running 300 to 850. Lenders pull different versions: FICO 8 is still the most common, while newer FICO 9 and 10 treat things like rent payments and medical collections more gently.",
    related: "credit",
  },
  {
    slug: "finra-brokercheck",
    term: "FINRA BrokerCheck",
    aliases: ["BrokerCheck"],
    definition:
      "A free official lookup at brokercheck.finra.org showing any broker's licenses, employment history, and customer complaints. Pair it with the SEC's adviser database; someone selling investments who appears in neither is your answer.",
    related: "money-safety",
  },
  {
    slug: "fraud-alert",
    term: "fraud alert",
    definition:
      "A free flag on your credit file telling lenders to take extra steps to confirm it's really you before opening an account. You place it with one bureau, and that bureau must tell the other two.",
    related: "credit",
  },
  {
    slug: "ftc",
    term: "FTC",
    aliases: ["Federal Trade Commission"],
    definition:
      "The Federal Trade Commission, the federal consumer-protection agency. Report any fraud at ReportFraud.ftc.gov so there's an official record and the right agencies can act.",
    related: "money-safety",
  },
  {
    slug: "grace-period",
    term: "grace period",
    definition:
      "A window where no interest or payment is due yet: on a credit card, the weeks between the statement and the due date (pay the full statement balance inside it and you owe no interest); on federal student loans, the roughly six months after leaving school before the first bill.",
    related: "credit",
  },
  {
    slug: "hardship-program",
    term: "hardship program",
    aliases: ["hardship plan", "hardship plans", "hardship programs"],
    definition:
      "A lender's plan for customers going through a rough stretch, such as reduced or paused payments. Calling before you fall further behind usually beats waiting; most creditors would rather work out a plan than send a debt to collections.",
    related: "credit",
  },
  {
    slug: "identitytheft-gov",
    term: "IdentityTheft.gov",
    definition:
      "The FTC's free site for identity theft victims. You tell it what happened and it builds a step-by-step recovery plan: the letters to send, who to call, and what to dispute.",
    related: "money-safety",
  },
  {
    slug: "installment-credit",
    term: "installment credit",
    aliases: ["installment loan"],
    definition:
      "A loan you repay in fixed payments over a set term, like a car loan, student loan, or personal loan. The other main type is revolving credit, like a credit card.",
    related: "credit",
  },
  {
    slug: "job-scam",
    term: "job scam",
    aliases: ["employment scam"],
    definition:
      "A fake job offer, often remote with vague duties and surprisingly good pay, built to take your money or identity. A real employer never needs you to pay for anything or move money to start a job.",
    related: "money-safety",
  },
  {
    slug: "legal-aid",
    term: "legal aid",
    aliases: ["legal-aid"],
    definition:
      "Free or low-cost legal help from nonprofit organizations, often priced on a sliding scale based on income. A trustworthy first stop for immigration questions and serious debt problems.",
    related: "government-aid",
  },
  {
    slug: "length-of-credit-history",
    term: "length of credit history",
    aliases: ["credit age"],
    definition:
      "How long you've had credit: the age of your oldest account, the average age of all of them, and how recently you opened the newest. About 15% of your score, and it grows on its own as long as you leave old accounts open.",
    related: "credit",
  },
  {
    slug: "notario-fraud",
    term: "notario fraud",
    aliases: ["notario"],
    definition:
      "Immigration 'help' sold by someone advertising as a 'notario,' trading on the fact that a notario p\u00fablico is a legal professional in many Latin American countries but a U.S. notary is not. Unqualified helpers often file the wrong paperwork and damage real cases.",
    related: "money-safety",
  },
  {
    slug: "notary-public",
    term: "notary public",
    definition:
      "In the U.S., a person authorized to witness signatures, nothing more. A notary is not a lawyer and cannot legally give immigration or legal advice, no matter what an ad says.",
    related: "money-safety",
  },
  {
    slug: "one-time-code",
    term: "one-time code",
    definition:
      "A short code texted or generated to confirm it's really you logging in. It exists to keep other people out of your account, so anyone asking you to read one out loud is the person trying to get in.",
    related: "money-safety",
  },
  {
    slug: "original-creditor",
    term: "original creditor",
    definition:
      "The company you first owed, like the card issuer or clinic, before the debt was handed to a collector. The roughly seven-year clock on a collection runs from when you first fell behind with them, not from when the debt was sold.",
    related: "credit",
  },
  {
    slug: "password-manager",
    term: "password manager",
    definition:
      "An app that creates and remembers a different strong password for every account, so one leaked password can't unlock your whole life. You memorize one master password and it handles the rest.",
    related: "money-safety",
  },
  {
    slug: "pay-for-delete",
    term: "pay for delete",
    definition:
      "Offering to pay a collection in exchange for the collector removing it from your credit report entirely. Some collectors will do it, none are obligated to, so get any promise in writing before sending a dollar.",
    related: "credit",
  },
  {
    slug: "payment-app",
    term: "payment app",
    definition:
      "An app like Venmo, Cash App, or Zelle that sends money instantly. Payments are usually irreversible and carry no buyer protection, so treat every send like handing over cash, and only pay people you know.",
    related: "money-safety",
  },
  {
    slug: "payment-history",
    term: "payment history",
    definition:
      "The record of whether you've paid your bills on time, about 35% of your credit score and the single biggest piece. One payment 30 or more days late can drop your score sharply and stay on your report for years.",
    related: "credit",
  },
  {
    slug: "pig-butchering",
    term: "pig butchering",
    definition:
      "A long-game scam where a warm online contact walks you into a fake investment platform, your on-screen 'balance' grows, and you're urged to put in more. The platform is a stage set, and the money is gone.",
    related: "money-safety",
  },
  {
    slug: "ponzi-scheme",
    term: "Ponzi scheme",
    definition:
      "A fraud that pays 'returns' to earlier investors using new investors' deposits, with nothing real underneath. The tell is smoothness: real markets bounce around, so gains that only go up in tidy identical steps are a story someone is writing.",
    related: "money-safety",
  },
  {
    slug: "pump-and-dump",
    term: "pump-and-dump",
    definition:
      "Promoters quietly buy a cheap stock or token, flood social media with hype, then sell everything near the top and let the price collapse on whoever arrived last. If someone is excited for you to buy what they already own, notice whose exit you're funding.",
    related: "money-safety",
  },
  {
    slug: "rate-shopping",
    term: "rate shopping",
    aliases: ["rate-shopping"],
    definition:
      "Comparing several lenders for one loan, like a car loan or mortgage, within a short window of a couple of weeks. Scoring models usually count all those checks as a single hard inquiry, so comparing offers doesn't pile up damage.",
    related: "credit",
  },
  {
    slug: "recovery-scam",
    term: "recovery scam",
    definition:
      "After you've lost money to a scam, someone contacts you promising to get it back for an upfront fee or some information. It's a second scam, sometimes run by the same people; real authorities never charge to recover your money.",
    related: "money-safety",
  },
  {
    slug: "rent-reporting",
    term: "rent reporting",
    definition:
      "Getting your rent payments added to your credit file so they count toward your history. Some landlords report for free; do-it-yourself services often charge $5 to $10 a month, and it helps most when your file is thin.",
    related: "credit",
  },
  {
    slug: "reshipping-job",
    term: "reshipping job",
    aliases: ["reshipping"],
    definition:
      "A 'job' receiving packages at home and resending them to another address. The goods were bought with stolen cards, and the role exists to hide the fraud trail behind your name and address, which can put you in a criminal investigation.",
    related: "money-safety",
  },
  {
    slug: "romance-scam",
    term: "romance scam",
    definition:
      "A scammer spends weeks or months building a real-feeling relationship, then asks for money: a sudden emergency or a 'can't-lose' investment. Never send money or crypto to someone you haven't met in person.",
    related: "money-safety",
  },
  {
    slug: "safe-word",
    term: "safe word",
    aliases: ["family safe word"],
    definition:
      "A word or phrase your family agrees on in advance that anyone calling about an emergency and money has to say. It takes five minutes at dinner and beats the most convincing cloned voice ever made.",
    related: "money-safety",
  },
  {
    slug: "soft-inquiry",
    term: "soft inquiry",
    aliases: ["soft check"],
    definition:
      "A peek at your credit that never affects your score, like checking your own credit or being pre-screened for an offer. You could rack up a hundred of these and lose zero points.",
    related: "credit",
  },
  {
    slug: "statement-balance",
    term: "statement balance",
    definition:
      "Everything you owed on a credit card when the monthly statement was generated. Pay this full amount by the due date and you owe zero interest.",
    related: "credit",
  },
  {
    slug: "statement-closing-date",
    term: "statement closing date",
    definition:
      "The day each month your card totals your balance and reports it to the credit bureaus. Paying a few days before this date, not just by the due date, lowers the utilization that gets reported.",
    related: "credit",
  },
  {
    slug: "student-credit-card",
    term: "student credit card",
    aliases: ["student card"],
    definition:
      "A starter card built for people in school with little or no credit history. Easier to get approved for, often with no annual fee.",
    related: "credit",
  },
  {
    slug: "thin-file",
    term: "thin file",
    definition:
      "A credit report with little or nothing in it, common for students, young people, and newcomers to the country. Nothing is wrong; there just isn't enough borrowing history yet for the system to score you.",
    related: "credit",
  },
  {
    slug: "validation-rights",
    term: "validation rights",
    definition:
      "Your legal right to make a debt collector prove a debt is real before you pay a cent. Dispute in writing within 30 days of first contact and the collector generally must verify the debt before collecting further.",
    related: "credit",
  },
  {
    slug: "vantagescore",
    term: "VantageScore",
    definition:
      "A credit score brand created by the three credit bureaus, and the model behind many free score apps and landlord checks. Its current versions count rent payments and ignore paid collections and medical collections.",
    related: "credit",
  },
  {
    slug: "vishing",
    term: "vishing",
    definition:
      "Phishing by phone call: someone posing as your bank's fraud department or a government agency to talk you out of a code, password, or payment. Hang up and call the official number on the back of your card.",
    related: "money-safety",
  },
  {
    slug: "voice-cloning",
    term: "voice cloning",
    aliases: ["voice-cloning"],
    definition:
      "Software that imitates a specific person's voice from a short recording, like a social media clip or voicemail greeting. It means a familiar voice on the phone is no longer proof of who's calling.",
    related: "money-safety",
  },
  // --- College & home (article-sweep expansion, July 2026) ---
  {
    slug: "adjustable-rate-mortgage",
    term: "adjustable-rate mortgage",
    definition:
      "A mortgage whose interest rate can change after an initial period, which means the monthly payment can rise. It may start cheaper than a fixed rate, but you carry the risk of increases.",
    related: "home-ownership",
  },
  {
    slug: "appraisal",
    term: "appraisal",
    definition:
      "A professional estimate of what a home is worth, ordered by the lender before it approves a mortgage. It keeps you and the lender from paying more than the home's value.",
    related: "home-ownership",
  },
  {
    slug: "award-letter",
    term: "award letter",
    aliases: ["financial aid award letter", "aid letter"],
    definition:
      "The offer a school sends after your FAFSA listing the grants, scholarships, loans, and work-study it will give you. Letters often blend free money and loans together, so sort them apart before comparing schools.",
    related: "college",
  },
  {
    slug: "closing-costs",
    term: "closing costs",
    definition:
      "The fees due on the day a home sale is finalized, paid on top of the down payment: lender charges, appraisal, title work, government fees, and prepaid taxes and insurance. They often run about 2% to 5% of the home's price.",
    related: "home-ownership",
  },
  {
    slug: "conventional-loan",
    term: "conventional loan",
    definition:
      "A standard mortgage with no government backing. Lenders usually want a credit score around 620 or higher, and putting less than 20% down means paying PMI.",
    related: "home-ownership",
  },
  {
    slug: "daca",
    term: "DACA",
    definition:
      "Deferred Action for Childhood Arrivals, a program that gives some people brought to the US as children protection from deportation and a work permit. DACA students can't get federal student aid, but state aid, school aid, and many scholarships are still open.",
    related: "college",
  },
  {
    slug: "deferment",
    term: "deferment",
    definition:
      "A temporary pause on student loan payments that you arrange with your servicer, often for school, unemployment, or hardship. On subsidized loans, interest stops building during deferment.",
    related: "college",
  },
  {
    slug: "dependent-student",
    term: "dependent student",
    definition:
      "A student whose parents' income and information count on the FAFSA, which covers most students straight out of high school. Independent students, such as older, married, or veteran students, file with their own information only.",
    related: "college",
  },
  {
    slug: "direct-loan",
    term: "Direct Loan",
    definition:
      "The standard federal student loan, borrowed from the government through the FAFSA. Direct Loans come in subsidized and unsubsidized versions and carry fixed rates set each July.",
    related: "college",
  },
  {
    slug: "down-payment-assistance",
    term: "down-payment assistance",
    definition:
      "Grants or low-interest loans that cover part or all of your down payment, usually through a state housing agency or first-time buyer program. A real program never charges a fee to unlock the money.",
    related: "home-ownership",
  },
  {
    slug: "eviction",
    term: "eviction",
    definition:
      "The court process a landlord must use to remove a tenant. Changing your locks, tossing your belongings, or shutting off utilities to push you out is illegal, no matter how far behind on rent you are.",
    related: "home-ownership",
  },
  {
    slug: "fair-housing-laws",
    term: "fair housing laws",
    aliases: ["fair housing"],
    definition:
      "Laws that make it illegal for a landlord to reject or mistreat you because of your race, national origin, religion, family status, and more. They protect everyone, regardless of immigration status.",
    related: "home-ownership",
  },
  {
    slug: "federal-student-loan",
    term: "federal student loan",
    aliases: ["federal loan"],
    definition:
      "A student loan from the government rather than a bank. Federal loans carry fixed rates and safety nets like income-driven repayment and hardship pauses, which is why they come before private loans.",
    related: "college",
  },
  {
    slug: "fha-loan",
    term: "FHA loan",
    definition:
      "A mortgage backed by the Federal Housing Administration, built for buyers with smaller down payments or lower credit scores. Credit minimums often start around 580, lower than conventional loans.",
    related: "home-ownership",
  },
  {
    slug: "first-time-homebuyer-program",
    term: "first-time homebuyer program",
    aliases: ["first-time buyer program"],
    definition:
      "State and local programs that help newer buyers with down-payment money, cheaper loans, or closing costs. 'First-time' usually just means you haven't owned a home in the last few years.",
    related: "home-ownership",
  },
  {
    slug: "gift-aid",
    term: "gift aid",
    definition:
      "Grants and scholarships: money for school you never pay back. On an award letter, gift aid is the part that truly lowers your cost.",
    related: "college",
  },
  {
    slug: "hoa",
    term: "HOA",
    definition:
      "A homeowners association, the group that manages a shared community or condo building. Members pay monthly HOA fees, which belong in your true cost of owning.",
    related: "home-ownership",
  },
  {
    slug: "home-equity",
    term: "home equity",
    definition:
      "The slice of your home you actually own: the home's value minus what you still owe on it. Own a $300,000 home with a $240,000 mortgage and you have $60,000 in equity.",
    related: "home-ownership",
  },
  {
    slug: "home-inspection",
    term: "home inspection",
    definition:
      "A professional check of a home's condition, from the roof to the wiring and plumbing, done before you buy. It's how you find the $8,000 problem before it becomes your problem.",
    related: "home-ownership",
  },
  {
    slug: "homeowners-insurance",
    term: "homeowners insurance",
    aliases: ["home insurance"],
    definition:
      "Insurance that pays to repair or rebuild your home after fire, storms, and other covered damage. Lenders require it, and it's often paid monthly through escrow.",
    related: "home-ownership",
  },
  {
    slug: "housing-finance-agency",
    term: "housing finance agency",
    definition:
      "Your state's official agency for affordable homeownership, and the hub for legitimate first-time buyer programs and down-payment help. Every state has one.",
    related: "home-ownership",
  },
  {
    slug: "in-state-tuition",
    term: "in-state tuition",
    aliases: ["out-of-state tuition"],
    definition:
      "The discounted price a public college charges residents of its own state; students from elsewhere pay the higher out-of-state rate. The gap is often tens of thousands of dollars over a degree.",
    related: "college",
  },
  {
    slug: "jointly-and-severally-liable",
    term: "jointly and severally liable",
    definition:
      "Lease language meaning each roommate owes the entire rent, not just their share. If one person stops paying, the landlord can come after any of you for all of it.",
    related: "home-ownership",
  },
  {
    slug: "loan-estimate",
    term: "Loan Estimate",
    definition:
      "The standardized form a lender must send soon after you apply for a mortgage, itemizing the rate, monthly payment, and every fee. Because all lenders use the same form, it's the tool for comparing offers side by side.",
    related: "home-ownership",
  },
  {
    slug: "loan-forgiveness",
    term: "loan forgiveness",
    definition:
      "Having part or all of a student loan wiped out instead of repaid, usually through public-service work or years on an income-driven plan. Only certain federal loans and jobs qualify.",
    related: "government-aid",
  },
  {
    slug: "loan-servicer",
    term: "loan servicer",
    aliases: ["servicer"],
    definition:
      "The company that handles your student loan day to day: it sends the bills, takes your payments, and answers questions. Log in at StudentAid.gov to see who yours is.",
    related: "college",
  },
  {
    slug: "need-based-aid",
    term: "need-based aid",
    aliases: ["need-based"],
    definition:
      "Aid awarded based on your family's finances rather than grades or talent. Pell Grants, subsidized loans, and work-study are all need-based, which is why filing the FAFSA matters.",
    related: "college",
  },
  {
    slug: "net-price",
    term: "net price",
    definition:
      "What a school actually costs you after subtracting grants and scholarships. A $40,000 school that gives $25,000 in gift aid has a $15,000 net price, which can beat a cheaper-looking school that gives less.",
    related: "college",
  },
  {
    slug: "normal-wear-and-tear",
    term: "normal wear and tear",
    aliases: ["wear and tear"],
    definition:
      "The ordinary aging a rental gets from someone simply living there: faded paint, small nail holes, lightly worn carpet. A landlord can't take it out of your security deposit; real damage is different.",
    related: "home-ownership",
  },
  {
    slug: "origination-fee",
    term: "origination fee",
    definition:
      "What a lender charges to process and set up your loan, usually a percentage of the amount borrowed. It's part of closing costs and shows up on your Loan Estimate.",
    related: "home-ownership",
  },
  {
    slug: "parent-plus-loan",
    term: "Parent PLUS loan",
    definition:
      "A federal loan a parent, not the student, takes out to help pay for college. It appears on award letters as aid, but it's debt the parent owes, so count it as cost.",
    related: "college",
  },
  {
    slug: "pell-grant",
    term: "Pell Grant",
    definition:
      "The main federal grant for undergraduates with financial need, worth up to $7,395 for the 2026\u201327 school year. You qualify through the FAFSA, and you never pay it back.",
    related: "college",
  },
  {
    slug: "pre-qualification",
    term: "pre-qualification",
    definition:
      "A quick, informal estimate of what you might borrow, based on numbers you type into a website. Nothing is verified, so treat it as a guess, not a promise like a pre-approval.",
    related: "home-ownership",
  },
  {
    slug: "private-student-loan",
    term: "private student loan",
    aliases: ["private loan"],
    definition:
      "A student loan from a bank, credit union, or online lender. The rate depends on your credit, can be variable, and the loan usually lacks the protections federal loans come with.",
    related: "college",
  },
  {
    slug: "professional-judgment",
    term: "professional judgment",
    aliases: ["special circumstances"],
    definition:
      "A financial aid officer's power to adjust your aid when the FAFSA missed something real, like a lost job or big medical bills. Ask the school for a professional judgment or special circumstances review.",
    related: "college",
  },
  {
    slug: "property-tax",
    term: "property tax",
    aliases: ["property taxes"],
    definition:
      "A yearly tax homeowners pay their local government, based on the home's value. It's often collected monthly through your mortgage's escrow account, and it can rise as your home's value rises.",
    related: "home-ownership",
  },
  {
    slug: "qualifying-event",
    term: "qualifying event",
    definition:
      "A life change, like turning 26, losing a job, or having a baby, that opens a limited special-enrollment window to get health insurance outside open enrollment. The window is short, often 60 days, so act fast.",
    related: "insurance",
  },
  {
    slug: "refinance",
    term: "refinance",
    aliases: ["refinancing"],
    definition:
      "Replacing your current mortgage with a new one, usually to get a lower rate or payment. It comes with its own closing costs, so the savings have to beat the fees.",
    related: "home-ownership",
  },
  {
    slug: "self-help-aid",
    term: "self-help aid",
    definition:
      "The part of an aid package you earn or repay: loans and work-study. A $5,000 loan listed as aid still costs you $5,000 plus interest later.",
    related: "college",
  },
  {
    slug: "standard-repayment-plan",
    term: "standard repayment plan",
    aliases: ["standard plan"],
    definition:
      "The default federal student loan plan: a fixed monthly payment that clears the loan over a set number of years, usually ten. If it doesn't fit your income, other plans can lower the bill.",
    related: "college",
  },
  {
    slug: "sticker-price",
    term: "sticker price",
    definition:
      "A school's full published price before any aid is subtracted. Almost nobody pays it; what matters is your cost after grants and scholarships.",
    related: "college",
  },
  {
    slug: "sublease",
    term: "sublease",
    definition:
      "Renting out your rental to someone else, who pays you while you stay responsible to the landlord. Most leases require the landlord's permission first.",
    related: "home-ownership",
  },
  {
    slug: "transfer-agreement",
    term: "transfer agreement",
    aliases: ["articulation agreement"],
    definition:
      "A deal between a community college and four-year schools guaranteeing which credits will transfer. Find yours before picking classes so every course counts toward the bachelor's degree.",
    related: "college",
  },
  {
    slug: "underwriting",
    term: "underwriting",
    definition:
      "The lender's deep review of your income, debts, credit, and savings to decide whether to approve your loan. It happens between your application and closing day.",
    related: "home-ownership",
  },
  {
    slug: "unsubsidized-loan",
    term: "unsubsidized loan",
    definition:
      "A federal student loan that charges interest from the day the money arrives, including all your years in school. Unpaid interest gets added to the balance, so a $5,000 loan can be noticeably bigger by graduation.",
    related: "college",
  },
  {
    slug: "variable-rate",
    term: "variable rate",
    definition:
      "An interest rate that can change over the life of a loan, so your payment can climb later. A fixed rate stays the same the whole time.",
    related: "college",
  },
  {
    slug: "work-study",
    term: "work-study",
    aliases: ["Federal Work-Study"],
    definition:
      "A part-time job, usually on campus, offered as part of your financial aid package. The dollar amount on your award letter is the most you can earn, and you collect it as a regular paycheck by working.",
    related: "college",
  },
  // --- Investing & saving (article-sweep expansion, July 2026) ---
  {
    slug: "403b",
    term: "403(b)",
    definition:
      "The 401(k)'s sibling for schools, hospitals, and nonprofits. Money comes out of your paycheck automatically, gets invested, and often earns an employer match.",
    related: "investing",
  },
  {
    slug: "52-week-range",
    term: "52-week range",
    definition:
      "A stock's lowest and highest price over the past year, shown to give today's price context. Near the low is not the same as cheap, and near the high is not the same as finished.",
    related: "investing",
  },
  {
    slug: "actively-managed-fund",
    term: "actively managed fund",
    definition:
      "A fund that pays professionals to pick investments and try to beat the market, often charging 0.5% to 1% a year. Over long stretches, most fail to beat cheap index funds.",
    related: "investing",
  },
  {
    slug: "annuity",
    term: "annuity",
    definition:
      "A contract with an insurance company: you hand over money and it promises to pay you income, often for as long as you live. Simple immediate versions can suit retirees; the ones sold hard to young savers tend to carry high fees and surrender charges.",
    related: "investing",
  },
  {
    slug: "assets-under-management",
    term: "assets under management",
    aliases: ["AUM"],
    definition:
      "The total money a firm or advisor manages for clients. An advisor charging an AUM fee takes a percentage of your balance every year, commonly about 1%.",
    related: "investing",
  },
  {
    slug: "average-annual-return",
    term: "average annual return",
    definition:
      "What an investment earned per year, on average. Check which math is behind it: a simple average of yearly returns can overstate results, while the compound (annualized) figure shows what your money actually did.",
    related: "investing",
  },
  {
    slug: "bear-market",
    term: "bear market",
    definition:
      "A market drop of 20% or more from a recent high, often unfolding over months or years. Uncomfortable but normal; an investing lifetime includes several.",
    related: "investing",
  },
  {
    slug: "bull-market",
    term: "bull market",
    definition:
      "A rising market. The optimistic opposite of a bear market.",
    related: "investing",
  },
  {
    slug: "call-option",
    term: "call option",
    definition:
      "An option giving you the right to buy a stock at a set price by a set date. You buy a call when you're betting the price will go up.",
    related: "investing",
  },
  {
    slug: "capital-gains",
    term: "capital gains",
    definition:
      "The profit from selling an investment for more than you paid. Buy a fund for $1,000, sell for $1,400, and you have a $400 capital gain, which is usually taxable in a regular brokerage account.",
    related: "taxes",
  },
  {
    slug: "cash-management-account",
    term: "cash-management account",
    definition:
      "An account at a brokerage that holds your uninvested cash and sweeps it into partner banks, so it stays FDIC insured and earns a competitive rate while it waits.",
    related: "investing",
  },
  {
    slug: "catch-up-contribution",
    term: "catch-up contribution",
    definition:
      "Extra contribution room for older savers above the normal limit, like an additional $1,100 in an IRA once you're 50 (for 2026). HSAs allow an extra $1,000 starting at 55.",
    related: "investing",
  },
  {
    slug: "cd",
    term: "CD",
    aliases: ["certificate of deposit"],
    definition:
      "A deal with the bank: leave a chunk of money untouched for a set term and it locks in an interest rate for the whole stretch. Pull the money out early and you usually pay a penalty.",
    related: "investing",
  },
  {
    slug: "cd-ladder",
    term: "CD ladder",
    aliases: ["CD laddering"],
    definition:
      "Splitting savings across several CDs with staggered end dates, like a 1-year through a 5-year. One CD matures every year so cash keeps coming free, while the rest earn the higher long-term rates.",
    related: "investing",
  },
  {
    slug: "collateral",
    term: "collateral",
    definition:
      "Something of value a lender can take if you don't repay. With a margin loan, your own portfolio is the collateral; with a car loan, it's the car.",
    related: "credit",
  },
  {
    slug: "concentration-risk",
    term: "concentration risk",
    definition:
      "Having too much riding on one thing. If your paycheck and your portfolio both depend on your employer, one bad year for the company can hit your income and your savings at once.",
    related: "investing",
  },
  {
    slug: "contribution-limit",
    term: "contribution limit",
    definition:
      "The yearly cap on what you can put into a tax-advantaged account. For 2026: $24,500 for a 401(k), $7,500 for an IRA, and $4,400 for a self-only HSA ($8,750 family).",
    related: "investing",
  },
  {
    slug: "corporate-bond",
    term: "corporate bond",
    definition:
      "A loan you make to a company. It carries a bit more risk than a government bond, so it typically pays a bit more interest to compensate.",
    related: "investing",
  },
  {
    slug: "correction",
    term: "correction",
    definition:
      "A market drop of 10% or more from a recent high. Corrections come around every couple of years on average and are usually over within months.",
    related: "investing",
  },
  {
    slug: "cryptocurrency",
    term: "cryptocurrency",
    aliases: ["crypto"],
    definition:
      "Digital money that lives on the internet rather than at any bank or government; Bitcoin is the famous one. Prices can swing 50% in days, which makes it a bet, not a savings plan.",
    related: "investing",
  },
  {
    slug: "day-trading",
    term: "day trading",
    aliases: ["day-trading"],
    definition:
      "Rapidly buying and selling investments within hours or days, hoping to profit from short-term swings. Most day traders end up behind someone who simply held a boring index fund.",
    related: "investing",
  },
  {
    slug: "dividend",
    term: "dividend",
    definition:
      "A cash payment some companies make to shareholders out of their profits, usually every three months. Funds collect the dividends from the companies they hold and pass them through to you.",
    related: "investing",
  },
  {
    slug: "dividend-yield",
    term: "dividend yield",
    definition:
      "A stock's yearly dividend divided by its price. A $50 stock paying $1 a year yields 2%. A yield towering over everything around it is usually a warning, not a gift.",
    related: "investing",
  },
  {
    slug: "dollar-cost-averaging",
    term: "dollar-cost averaging",
    definition:
      "Investing a fixed amount on a regular schedule no matter what the market is doing, like $100 on the first of every month. You automatically buy more shares when prices are low and fewer when they're high.",
    related: "investing",
  },
  {
    slug: "drip",
    term: "DRIP",
    aliases: ["dividend reinvestment plan"],
    definition:
      "A brokerage setting that automatically uses each dividend to buy more shares. Those new shares pay dividends too, which keeps the compounding going without you touching anything.",
    related: "investing",
  },
  {
    slug: "early-withdrawal-penalty",
    term: "early withdrawal penalty",
    aliases: ["early-withdrawal penalty"],
    definition:
      "The cost of taking money out before you're supposed to. On a CD it's usually some of the interest you earned; on a retirement account before age 59\u00bd it's typically income tax plus a 10% penalty.",
    related: "investing",
  },
  {
    slug: "earned-income",
    term: "earned income",
    definition:
      "Money you make by working: wages, tips, gig pay, self-employment income. You generally need some to contribute to an IRA.",
    related: "investing",
  },
  {
    slug: "equity",
    term: "equity",
    definition:
      "The part of something you truly own after subtracting what's borrowed against it. Buy $10,000 of stock using $5,000 of margin and your equity is $5,000. The word also covers stock-based pay from a job.",
    related: "investing",
  },
  {
    slug: "espp",
    term: "ESPP",
    aliases: ["employee stock purchase plan"],
    definition:
      "A workplace plan that lets you buy your company's stock through payroll deductions at a discount, commonly 15% below market price.",
    related: "investing",
  },
  {
    slug: "etf",
    term: "ETF",
    definition:
      "A fund that holds many investments at once and trades on the market all day like a stock. You can often buy a single share, or even a fraction of one.",
    related: "investing",
  },
  {
    slug: "expense-ratio",
    term: "expense ratio",
    definition:
      "A fund's yearly fee, taken as a percentage of whatever you have invested in it. A 0.03% ratio costs $3 a year per $10,000; a 1% ratio costs $100 for the same job.",
    related: "investing",
  },
  {
    slug: "fiduciary",
    term: "fiduciary",
    definition:
      "An advisor legally required to put your interests first. Many sellers are held only to a looser standard, so 'are you a fiduciary for this recommendation?' is a clarifying question to ask.",
    related: "investing",
  },
  {
    slug: "fractional-shares",
    term: "fractional shares",
    definition:
      "A slice of a single share, so you can buy $10 of a fund whose full shares cost $500. It's what lets a small monthly contribution get fully invested every time.",
    related: "investing",
  },
  {
    slug: "fsa",
    term: "FSA",
    aliases: ["Flexible Spending Account"],
    definition:
      "A workplace account for health costs where unspent money can vanish at the end of the year. Not the same as an HSA, which rolls over and stays yours for good.",
    related: "insurance",
  },
  {
    slug: "fund-of-funds",
    term: "fund of funds",
    definition:
      "A fund whose holdings are other funds rather than individual stocks or bonds. Target-date funds work this way: one purchase, several broad funds inside.",
    related: "investing",
  },
  {
    slug: "glide-path",
    term: "glide path",
    definition:
      "The schedule a target-date fund follows as it slowly shifts from mostly stocks toward mostly bonds over the decades before your retirement year.",
    related: "investing",
  },
  {
    slug: "hedge",
    term: "hedge",
    definition:
      "An investment made to offset risk somewhere else in your portfolio rather than to make money on its own. Funds short stocks to hedge, not to swing for the fences.",
    related: "investing",
  },
  {
    slug: "high-deductible-health-plan",
    term: "high-deductible health plan",
    aliases: ["HDHP"],
    definition:
      "A health plan with lower monthly premiums and a higher deductible. Being enrolled in a qualifying one is what makes you eligible to contribute to an HSA.",
    related: "insurance",
  },
  {
    slug: "hsa",
    term: "HSA",
    aliases: ["Health Savings Account"],
    definition:
      "A health account with a rare triple tax break: pre-tax money in, tax-free growth, tax-free withdrawals for medical costs. You can only contribute if you have a qualifying high-deductible health plan, and the balance rolls over year after year.",
    related: "investing",
  },
  {
    slug: "inflation",
    term: "inflation",
    definition:
      "The gradual rise in prices that makes each dollar buy a little less over time. It's why cash sitting still slowly loses buying power, and part of why people invest at all.",
    related: "investing",
  },
  {
    slug: "interest-rate-risk",
    term: "interest-rate risk",
    definition:
      "The rule that existing bond prices fall when interest rates rise, and rise when rates fall. If new bonds pay 5%, nobody wants your old 3% bond at full price anymore.",
    related: "investing",
  },
  {
    slug: "ipo",
    term: "IPO",
    aliases: ["initial public offering", "going public"],
    definition:
      "The first time a private company sells shares to the general public on a stock exchange. Exciting for the company, but the hype often means everyday buyers pay an expensive price.",
    related: "investing",
  },
  {
    slug: "ira",
    term: "IRA",
    aliases: ["Individual Retirement Account"],
    definition:
      "A retirement account you open yourself at a brokerage, no employer needed. It's tax-advantaged, capped at $7,500 a year for 2026, and comes in Roth and Traditional versions.",
    related: "investing",
  },
  {
    slug: "leverage",
    term: "leverage",
    definition:
      "Using borrowed money so a small amount controls a larger position. It amplifies both directions: a 20% move in the stock becomes a 40% move in your own money.",
    related: "investing",
  },
  {
    slug: "liquidity",
    term: "liquidity",
    aliases: ["liquid"],
    definition:
      "How quickly you can turn something back into cash without a penalty or a haircut. A savings account is very liquid; a CD or a house is not.",
    related: "investing",
  },
  {
    slug: "load-fee",
    term: "load fee",
    aliases: ["no-load"],
    definition:
      "A sales commission some mutual funds charge when you buy or sell, sometimes around 5% off the top. Funds without one are called no-load funds, and there are enough excellent ones that you never need to pay a load.",
    related: "investing",
  },
  {
    slug: "margin",
    term: "margin",
    definition:
      "A loan from your broker, secured by your investments, used to buy more investments. Interest runs the whole time, and losses come entirely out of your money, never the loan.",
    related: "investing",
  },
  {
    slug: "margin-call",
    term: "margin call",
    definition:
      "Your broker's demand for more cash when a margined position falls too far. Miss it and the broker can sell your holdings without your permission, often at the worst prices of a crash.",
    related: "investing",
  },
  {
    slug: "market-capitalization",
    term: "market capitalization",
    aliases: ["market cap"],
    definition:
      "A company's total price tag: the share price multiplied by the number of shares that exist. A $10 stock with 10 billion shares is a $100 billion company, which is why share price alone says nothing about size.",
    related: "investing",
  },
  {
    slug: "market-crash",
    term: "market crash",
    definition:
      "A sudden, violent market drop over days or weeks rather than months. The word describes the speed of the fall, not its size.",
    related: "investing",
  },
  {
    slug: "market-maker",
    term: "market maker",
    definition:
      "A firm that stands ready to buy and sell a stock all day, which is why your trade fills in seconds. Some pay brokers to route orders their way, a practice called payment for order flow.",
    related: "investing",
  },
  {
    slug: "maturity",
    term: "maturity",
    definition:
      "The date a bond or CD reaches the end of its term and pays your original money back. A 5-year CD opened today matures in five years.",
    related: "investing",
  },
  {
    slug: "money-market-account",
    term: "money market account",
    definition:
      "A bank savings account with a little checking mixed in, often a debit card or a few checks a month, at rates near a high-yield savings account. Different from a money market fund, which is an investment, not an insured deposit.",
    related: "investing",
  },
  {
    slug: "municipal-bond",
    term: "municipal bond",
    definition:
      "A loan you make to a state, city, or local project, often with tax perks on the interest you earn.",
    related: "investing",
  },
  {
    slug: "mutual-fund",
    term: "mutual fund",
    definition:
      "A fund that pools money from many investors to buy a basket of stocks or bonds, priced once a day after the market closes. Some have minimum buy-ins, like $1,000 to start.",
    related: "investing",
  },
  {
    slug: "offering-price",
    term: "offering price",
    definition:
      "The price set the night before an IPO starts trading, at which shares go to a select group of mostly large institutional investors. It's the headline number regular investors almost never get.",
    related: "investing",
  },
  {
    slug: "opening-price",
    term: "opening price",
    definition:
      "The first price a newly public stock actually trades at when the market opens. Demand can push it far above the offering price, and that higher number is usually where regular investors start.",
    related: "investing",
  },
  {
    slug: "options-trading",
    term: "options trading",
    definition:
      "Contracts that give you the right, but not the obligation, to buy or sell a stock at a set price by a set date. They're leveraged and they expire: many end up worthless, losing 100% of what was paid.",
    related: "investing",
  },
  {
    slug: "ordinary-income",
    term: "ordinary income",
    definition:
      "Income taxed at the same rates as your paycheck, as opposed to the gentler rates on long-term capital gains. Interest, REIT dividends, and traditional 401(k) withdrawals all count.",
    related: "taxes",
  },
  {
    slug: "pe-ratio",
    term: "P/E ratio",
    aliases: ["price-to-earnings ratio"],
    definition:
      "The share price divided by the company's earnings per share over the past year. A P/E of 20 means you're paying $20 for every $1 of annual profit the company generates.",
    related: "investing",
  },
  {
    slug: "paper-loss",
    term: "paper loss",
    definition:
      "A drop in the value of an investment you still own. You hold the same shares; the market is just quoting a worse price today. It only becomes a real loss if you sell while prices are down.",
    related: "investing",
  },
  {
    slug: "payment-for-order-flow",
    term: "payment for order flow",
    definition:
      "Money that market-making firms pay a brokerage to route customers' trades their way. It's part of how $0-commission brokers still earn revenue every time you trade.",
    related: "investing",
  },
  {
    slug: "portfolio",
    term: "portfolio",
    definition:
      "All of your investments viewed as one collection: stocks, bonds, funds, and cash together. The overall mix matters more than any single holding in it.",
    related: "investing",
  },
  {
    slug: "pullback",
    term: "pullback",
    definition:
      "A drop of less than 10% from a recent market high. Pullbacks happen constantly and rarely deserve the headlines they get.",
    related: "investing",
  },
  {
    slug: "put-option",
    term: "put option",
    definition:
      "An option giving you the right to sell a stock at a set price by a set date. You buy a put when you're betting the price will fall, or to protect shares you already own.",
    related: "investing",
  },
  {
    slug: "qualified-dividend",
    term: "qualified dividend",
    definition:
      "A dividend that meets IRS rules to be taxed at the lower long-term capital gains rates instead of like your paycheck. Most dividends from established U.S. companies qualify; most REIT dividends don't.",
    related: "taxes",
  },
  {
    slug: "rebalancing",
    term: "rebalancing",
    definition:
      "Nudging your portfolio back to the mix you originally chose, usually once a year. If a strong run for stocks turns your 80/20 split into 88/12, you add to bonds until it's back at 80/20.",
    related: "investing",
  },
  {
    slug: "reit",
    term: "REIT",
    aliases: ["real estate investment trust"],
    definition:
      "A company that owns income-producing real estate, like apartment buildings or warehouses, and trades like a stock. By law it must pay out at least 90% of its taxable income to shareholders as dividends.",
    related: "investing",
  },
  {
    slug: "required-minimum-distribution",
    term: "required minimum distribution",
    definition:
      "The withdrawals the IRS eventually forces you to start taking from traditional retirement accounts later in life. Roth IRAs have no such requirement for the original owner.",
    related: "investing",
  },
  {
    slug: "robo-advisor",
    term: "robo-advisor",
    definition:
      "An investing service run by software. You answer a short questionnaire and it builds, invests, and rebalances a diversified portfolio for you, typically for about 0.25% a year.",
    related: "investing",
  },
  {
    slug: "rollover",
    term: "rollover",
    definition:
      "Moving retirement money from one account to another without taxes or penalties, like shifting an old job's 401(k) into an IRA so your savings follow you instead of getting stranded.",
    related: "investing",
  },
  {
    slug: "roth-401k",
    term: "Roth 401(k)",
    definition:
      "A 401(k) option where you contribute money you've already paid tax on, and qualified withdrawals in retirement, growth included, come out tax-free.",
    related: "investing",
  },
  {
    slug: "rsu",
    term: "RSU",
    aliases: ["restricted stock unit"],
    definition:
      "Your employer's promise to hand you company shares on future dates if you stay. On the day shares vest, their value is taxed as ordinary income, like a cash bonus paid in stock.",
    related: "investing",
  },
  {
    slug: "shareholder",
    term: "shareholder",
    definition:
      "Anyone who owns at least one share of a company's stock. Shareholders are part-owners, entitled to any dividends the company pays.",
    related: "investing",
  },
  {
    slug: "short-selling",
    term: "short selling",
    aliases: ["shorting"],
    definition:
      "Betting a stock will fall by selling borrowed shares now and buying them back later, hopefully cheaper. The gain is capped at 100%, but the possible loss has no ceiling, because prices can keep rising.",
    related: "investing",
  },
  {
    slug: "short-squeeze",
    term: "short squeeze",
    definition:
      "A feedback loop where a rising price forces short sellers to buy shares back, which pushes the price even higher. Squeezes have vaporized professional funds.",
    related: "investing",
  },
  {
    slug: "sipc",
    term: "SIPC",
    definition:
      "Insurance that protects the holdings in your brokerage account if the brokerage itself fails, up to legal limits. It does not protect against your investments losing value; nothing covers that.",
    related: "investing",
  },
  {
    slug: "speculative",
    term: "speculative",
    definition:
      "Describes an investment that behaves more like a bet than a plan, where the price rests on what the next buyer will pay rather than on steady earnings. Crypto and options are speculative; only use money you can fully afford to lose.",
    related: "investing",
  },
  {
    slug: "stock-exchange",
    term: "stock exchange",
    definition:
      "The public marketplace where shares are bought and sold. A company's stock has to be listed on one before anyone with a brokerage account can trade it.",
    related: "investing",
  },
  {
    slug: "strike-price",
    term: "strike price",
    definition:
      "The set price an option lets you buy or sell the stock at. Whether an option pays off depends on where the stock lands relative to its strike before expiration.",
    related: "investing",
  },
  {
    slug: "suitability-standard",
    term: "suitability standard",
    definition:
      "The looser rule some financial salespeople work under: the product only has to roughly fit you, not serve you best. Commissions can shape what gets recommended.",
    related: "investing",
  },
  {
    slug: "surrender-charge",
    term: "surrender charge",
    definition:
      "The penalty many annuities charge to get your money back in the early years, often starting around 7% and stepping down slowly over 7 to 10 years.",
    related: "investing",
  },
  {
    slug: "target-date-fund",
    term: "target-date fund",
    definition:
      "A single fund holding a complete mix of stocks and bonds that automatically gets more conservative as the year in its name approaches. Pick the fund closest to the year you'll turn about 65 and it handles the rest.",
    related: "investing",
  },
  {
    slug: "tax-advantaged",
    term: "tax-advantaged",
    definition:
      "Describes an account the government taxes more gently to encourage saving, like a 401(k), IRA, or HSA. The break comes either when money goes in or when it comes out.",
    related: "investing",
  },
  {
    slug: "tax-deferred",
    term: "tax-deferred",
    aliases: ["tax deferral"],
    definition:
      "Growth that isn't taxed while it happens. In a traditional 401(k) or IRA, gains compound untaxed for decades and you pay income tax when you withdraw.",
    related: "investing",
  },
  {
    slug: "tax-loss-harvesting",
    term: "tax-loss harvesting",
    definition:
      "Selling an investment that has dipped to capture the loss for your taxes, then replacing it with a similar one so you stay invested. The captured loss can trim your tax bill.",
    related: "investing",
  },
  {
    slug: "ticker-symbol",
    term: "ticker symbol",
    aliases: ["ticker"],
    definition:
      "The short letter code that identifies a stock or fund on an exchange, like MPLM. You use it to look up a quote or place a trade.",
    related: "investing",
  },
  {
    slug: "time-horizon",
    term: "time horizon",
    definition:
      "How long until you'll actually need the money. A 30-year horizon can ride out crashes, so it can hold more stocks; money you need next year belongs in savings.",
    related: "investing",
  },
  {
    slug: "timing-the-market",
    term: "timing the market",
    aliases: ["time the market"],
    definition:
      "Trying to buy right before the market rises and sell right before it falls. Even professionals rarely guess right, and missing a handful of the market's best days can wreck a decade of returns.",
    related: "investing",
  },
  {
    slug: "total-return",
    term: "total return",
    definition:
      "An investment's full payoff: price growth plus any dividends or interest, counted together. A stock that grows 5% and pays a 2% dividend returned 7%.",
    related: "investing",
  },
  {
    slug: "trading-commission",
    term: "trading commission",
    definition:
      "A fee charged per trade for buying or selling an investment. Every major brokerage now charges $0 commissions on stocks and ETFs, so paying one today is a red flag.",
    related: "investing",
  },
  {
    slug: "traditional-ira",
    term: "traditional IRA",
    definition:
      "An IRA where contributions may be deductible now, the money grows tax-deferred, and withdrawals in retirement are taxed as regular income. The mirror image of a Roth.",
    related: "investing",
  },
  {
    slug: "treasury-bond",
    term: "Treasury bond",
    definition:
      "A loan you make to the U.S. government, which pays you interest and returns your money at the end of the term. Among the safest investments there are.",
    related: "investing",
  },
  {
    slug: "vesting",
    term: "vesting",
    definition:
      "The schedule on which promised benefits actually become yours, like RSUs arriving in chunks over four years, sometimes with a one-year cliff before anything vests. Leave before shares vest and you forfeit them.",
    related: "investing",
  },
  {
    slug: "volatility",
    term: "volatility",
    definition:
      "How much and how fast an investment's price swings. A savings account barely moves; crypto can drop 50% in days. More volatility means a bumpier ride, not automatically a worse investment.",
    related: "investing",
  },
  {
    slug: "volume",
    term: "volume",
    definition:
      "The number of shares that changed hands today. Volume running several times its average means something happened, and it's worth finding out what before you act.",
    related: "investing",
  },
  // --- Budgeting, banking & earning (article-sweep expansion, July 2026) ---
  {
    slug: "211",
    term: "211",
    definition:
      "A free, confidential phone and text line that connects you to local help in your community: food, rent and utility assistance, and other programs. You just call or text the number 211.",
    related: "government-aid",
  },
  {
    slug: "annual-fee",
    term: "annual fee",
    aliases: ["annual fees"],
    definition:
      "A yearly charge just for holding a credit card or account. Plenty of good cards charge none, and long-time customers can often get one waived by asking.",
    related: "credit",
  },
  {
    slug: "apy",
    term: "APY",
    aliases: ["Annual Percentage Yield"],
    definition:
      "Annual Percentage Yield: how much your money grows in a year just for sitting in the account, with compounding included. $1,000 at 4% APY earns about $40 in a year; at a big bank's 0.01% it earns a dime.",
    related: "budgeting",
  },
  {
    slug: "atm-fee",
    term: "ATM fee",
    aliases: ["ATM fees"],
    definition:
      "A charge for using an ATM outside your bank's network, sometimes from both the machine's owner and your own bank. Sticking to in-network machines, or a bank that reimburses the fees, makes them disappear.",
    related: "budgeting",
  },
  {
    slug: "autopay",
    term: "autopay",
    definition:
      "A setting that pays a bill automatically on its due date from your account. It keeps bills handled before you can spend the money, though you still need enough in the account to cover them.",
    related: "budgeting",
  },
  {
    slug: "check-casher",
    term: "check casher",
    aliases: ["check cashing", "check cashers"],
    definition:
      "A storefront that turns your paycheck into cash for a fee, often a few percent of the check. On a $1,000 paycheck that can be $20 or $30 gone every payday; a free bank account does the same job for nothing.",
    related: "budgeting",
  },
  {
    slug: "checking-account",
    term: "checking account",
    definition:
      "The bank account for money in motion. Your paycheck lands here, and rent, bills, and debit card purchases come out of it, so it should only hold this month's money.",
    related: "budgeting",
  },
  {
    slug: "cost-of-living",
    term: "cost of living",
    definition:
      "What your life actually costs each month: rent, bills, food, transportation, plus irregular costs like car repairs averaged in. It is the line your income has to clear, and it swings widely from city to city.",
    related: "budgeting",
  },
  {
    slug: "credit-counseling",
    term: "credit counseling",
    definition:
      "Help from a trained counselor, usually at a nonprofit agency, who reviews your whole money picture and helps you build a plan, often at no cost. Avoid companies that charge big upfront fees for the same promise.",
    related: "credit",
  },
  {
    slug: "credit-union",
    term: "credit union",
    definition:
      "A member-owned, nonprofit version of a bank. With no shareholders to pay, fees tend to be lower, loan rates friendlier, and staff more willing to work with second-chance or ITIN situations.",
    related: "budgeting",
  },
  {
    slug: "creditor",
    term: "creditor",
    aliases: ["creditors"],
    definition:
      "Any company or person you owe money to: a card company, a lender, a hospital billing office. Many creditors will set up a payment plan if you call before you miss a payment.",
    related: "credit",
  },
  {
    slug: "debit-card",
    term: "debit card",
    definition:
      "A card that pulls money straight out of your checking account the moment you use it. You are spending money you already have, not borrowing like with a credit card.",
    related: "budgeting",
  },
  {
    slug: "depreciation",
    term: "depreciation",
    definition:
      "The value something loses over time, especially a car. New cars lose value fastest, which is a big reason a solid used car is usually the better deal on a tight budget.",
    related: "budgeting",
  },
  {
    slug: "employer-match",
    term: "employer match",
    aliases: ["401(k) match"],
    definition:
      "Money your employer adds to your 401(k) when you contribute, like 50 cents for every dollar up to a limit. Contributing enough to grab the full match is an instant 50 to 100% return that nothing else pays.",
    related: "investing",
  },
  {
    slug: "envelope-method",
    term: "envelope method",
    definition:
      "A budgeting method where each spending category gets a set amount of cash in a labeled envelope, and when the envelope is empty, spending there stops until next month. Apps and some banks do the same thing with digital buckets.",
    related: "budgeting",
  },
  {
    slug: "exchange-rate",
    term: "exchange rate",
    definition:
      "The price of swapping one currency for another, like dollars into pesos. Transfer services often use a rate slightly worse than the real one and quietly keep the difference.",
    related: "budgeting",
  },
  {
    slug: "fdic",
    term: "FDIC",
    aliases: ["FDIC-insured"],
    definition:
      "The Federal Deposit Insurance Corporation, which insures money in bank accounts up to $250,000 per person, per bank. If the bank fails, you get your money back.",
    related: "budgeting",
  },
  {
    slug: "freelancing",
    term: "freelancing",
    aliases: ["freelance"],
    definition:
      "Getting paid directly by clients for a skill you already have, like writing, design, tutoring, or repairs. It usually pays better than gig apps once you build a little reputation.",
    related: "budgeting",
  },
  {
    slug: "gap-insurance",
    term: "gap insurance",
    definition:
      "Coverage that pays the difference if your car is totaled while you still owe more on the loan than the car is worth. It is often pitched as a dealership add-on, and you can usually buy it cheaper elsewhere.",
    related: "insurance",
  },
  {
    slug: "gig-work",
    term: "gig work",
    aliases: ["gig apps"],
    definition:
      "Earning money through flexible per-task jobs like driving, delivering, or errand apps. You choose your hours, but you cover your own costs and no taxes are taken out for you.",
    related: "budgeting",
  },
  {
    slug: "independent-contractor",
    term: "independent contractor",
    definition:
      "A worker who is self-employed rather than an employee, so no taxes are withheld and minimum wage and overtime rules do not apply. Some employers mislabel real employees as contractors to dodge those protections.",
    related: "taxes",
  },
  {
    slug: "itin",
    term: "ITIN",
    aliases: ["Individual Taxpayer Identification Number"],
    definition:
      "A free tax ID number the IRS issues to people who are not eligible for a Social Security number. It lets you file taxes, and many banks and lenders accept it to open accounts and build credit.",
    related: "taxes",
  },
  {
    slug: "joint-account",
    term: "joint account",
    definition:
      "A bank account owned by two or more people, where every owner fully controls all the money. Once you turn 18, joining an account or loan with family makes the money and debts legally yours too.",
    related: "budgeting",
  },
  {
    slug: "late-fee",
    term: "late fee",
    aliases: ["late fees"],
    definition:
      "A charge added when you pay a bill after its due date. A first late fee often gets reversed if you call and politely ask, especially with a decent payment history.",
    related: "credit",
  },
  {
    slug: "lifestyle-inflation",
    term: "lifestyle inflation",
    aliases: ["lifestyle creep"],
    definition:
      "When spending rises to swallow every raise, so you earn more for years and never feel further ahead. The fix is sending part of each raise to savings before you get used to spending it.",
    related: "budgeting",
  },
  {
    slug: "medicare",
    term: "Medicare",
    definition:
      "The federal health insurance program mainly for people 65 and older, funded by part of the FICA tax taken out of your paycheck.",
    related: "government-aid",
  },
  {
    slug: "mid-market-rate",
    term: "mid-market rate",
    definition:
      "The true exchange rate banks use with each other, easy to look up online. Compare it to the rate a transfer service offers you; the gap is the hidden cost on top of the fee.",
    related: "budgeting",
  },
  {
    slug: "minimum-wage",
    term: "minimum wage",
    definition:
      "The lowest hourly pay the law allows where you work. Many states and cities set theirs higher than the federal rate, and being paid below it is wage theft.",
    related: "budgeting",
  },
  {
    slug: "money-factor",
    term: "money factor",
    definition:
      "The finance charge built into a car lease payment, playing the role interest plays on a loan. It is quoted as a tiny decimal; multiplying it by 2,400 shows roughly the interest rate you are paying.",
    related: "budgeting",
  },
  {
    slug: "money-order",
    term: "money order",
    definition:
      "A prepaid paper payment you buy with cash and use like a check, common for people without a bank account. Each one costs a small fee, which adds up fast if it is how you pay every bill.",
    related: "budgeting",
  },
  {
    slug: "money-scripts",
    term: "money scripts",
    aliases: ["money script"],
    definition:
      "Unspoken beliefs about money absorbed growing up, like 'spending is dangerous' or 'we don't talk about money.' They quietly shape adult choices until you notice them and decide which ones still fit your life.",
    related: "budgeting",
  },
  {
    slug: "monthly-maintenance-fee",
    term: "monthly maintenance fee",
    aliases: ["maintenance fee"],
    definition:
      "A charge some banks bill you just for having the account. Plenty of banks and credit unions never charge one, so there is no reason to pay it.",
    related: "budgeting",
  },
  {
    slug: "multi-level-marketing",
    term: "multi-level marketing",
    aliases: ["MLM"],
    definition:
      "A business where your income depends on recruiting people under you, not just selling a product. Most participants lose money, and the profits flow to whoever sits at the top of the pyramid.",
    related: "money-safety",
  },
  {
    slug: "ncua",
    term: "NCUA",
    aliases: ["NCUA-insured"],
    definition:
      "The National Credit Union Administration, which insures credit union deposits up to $250,000 per person. It is the credit union version of FDIC insurance.",
    related: "budgeting",
  },
  {
    slug: "overtime",
    term: "overtime",
    aliases: ["time-and-a-half"],
    definition:
      "Extra pay for hourly work past 40 hours in a week, generally at 1.5 times your normal rate. At $16 an hour, overtime hours pay $24, and most hourly jobs cannot legally skip it.",
    related: "budgeting",
  },
  {
    slug: "paid-time-off",
    term: "paid time off",
    definition:
      "Vacation days, sick days, and holidays you get paid for without working. It has real dollar value even though it never shows up in the salary line.",
    related: "budgeting",
  },
  {
    slug: "pay-period",
    term: "pay period",
    definition:
      "The stretch of work one paycheck covers, such as one week, two weeks, or a month. Your pay stub shows what you earned for the current pay period alongside year-to-date totals.",
    related: "budgeting",
  },
  {
    slug: "pay-stub",
    term: "pay stub",
    aliases: ["pay stubs"],
    definition:
      "The receipt attached to your paycheck: what you earned at the top, every deduction in the middle, and what actually hit your account at the bottom. Reading it is how you catch pay errors and know your real take-home rate.",
    related: "budgeting",
  },
  {
    slug: "pay-yourself-first",
    term: "pay yourself first",
    aliases: ["pay-yourself-first"],
    definition:
      "A savings method where money moves to savings the moment you get paid, before you spend on anything else. You live on what is left, instead of trying to save whatever remains at the end of the month, which is usually nothing.",
    related: "budgeting",
  },
  {
    slug: "payday-loan",
    term: "payday loan",
    aliases: ["payday loans", "payday lender", "payday lenders"],
    definition:
      "A small short-term loan meant to be repaid from your next paycheck, with fees that work out to staggeringly high interest rates. One loan often rolls into the next, creating a cycle that is brutal to escape.",
    related: "government-aid",
  },
  {
    slug: "pre-tax",
    term: "pre-tax",
    definition:
      "Taken out of your paycheck before taxes are calculated, like health insurance premiums or 401(k) contributions. Pre-tax deductions lower your taxable income, so each dollar costs you less than a dollar of take-home pay.",
    related: "taxes",
  },
  {
    slug: "prepaid-card",
    term: "prepaid card",
    definition:
      "A card you load money onto ahead of time and spend down like a debit card, no bank account required. Convenient, but reload and monthly fees quietly eat into your balance.",
    related: "budgeting",
  },
  {
    slug: "remittance",
    term: "remittance",
    definition:
      "Money you send to family in another country. Comparing services matters, because the upfront fee plus the exchange-rate markup decide how much actually arrives.",
    related: "budgeting",
  },
  {
    slug: "savings-account",
    term: "savings account",
    definition:
      "A bank account for money at rest: the emergency fund and goals you are building toward. Keeping it separate from checking makes the money stop feeling spendable.",
    related: "budgeting",
  },
  {
    slug: "second-chance-checking",
    term: "second-chance checking account",
    aliases: ["second-chance checking"],
    definition:
      "A checking account built for people a bank turned down over past account problems, like an old unpaid overdraft. Use it responsibly for a while and you can usually graduate to a regular free account.",
    related: "budgeting",
  },
  {
    slug: "side-hustle",
    term: "side hustle",
    aliases: ["side hustles"],
    definition:
      "Work outside your main job for extra income, like gig apps, freelancing, or selling things. The money is taxable with nothing withheld, so set a slice of every payment aside for the tax bill.",
    related: "budgeting",
  },
  {
    slug: "social-security",
    term: "Social Security",
    definition:
      "The federal program that pays you monthly income in retirement or if you become disabled, funded by the FICA tax on nearly every paycheck.",
    related: "government-aid",
  },
  {
    slug: "social-security-number",
    term: "Social Security number",
    aliases: ["SSN"],
    definition:
      "The nine-digit number the government uses to track your earnings and identity. Once you are 18 it can open real credit in your name, which is exactly why it is worth guarding.",
    related: "money-safety",
  },
  {
    slug: "title-loan",
    term: "title loan",
    aliases: ["car-title loan", "car-title loans"],
    definition:
      "A loan borrowed against your car, using its title as collateral. Miss payments and the lender can take the car, which for many people means losing the way they get to work.",
    related: "government-aid",
  },
  {
    slug: "total-compensation",
    term: "total compensation",
    definition:
      "Everything a job pays you, not just the salary: health coverage, a 401(k) match, paid time off, and other benefits. Two offers with the same salary can be thousands of dollars apart once you add it all up.",
    related: "budgeting",
  },
  {
    slug: "unsecured-debt",
    term: "unsecured debt",
    aliases: ["unsecured debts"],
    definition:
      "Debt with no physical thing attached that can be taken back, like credit cards and medical bills. When money is tight these are usually the most flexible bills to negotiate, since the lender's main option is working with you.",
    related: "credit",
  },
  {
    slug: "wage-theft",
    term: "wage theft",
    definition:
      "An employer keeping pay you legally earned: paying below minimum wage, skipping overtime, taking tips, or making you work off the clock. It is common, usually illegal, and your rights generally apply regardless of immigration status.",
    related: "budgeting",
  },
  {
    slug: "windfall",
    term: "windfall",
    aliases: ["windfalls"],
    definition:
      "A lump of money that arrives outside your normal paychecks: a tax refund, a bonus, back pay, birthday cash. On a tight budget, windfalls are often your biggest chances to build savings before the money gets absorbed into everyday life.",
    related: "budgeting",
  },
  {
    slug: "year-to-date",
    term: "year-to-date",
    aliases: ["YTD"],
    definition:
      "The running total since January 1, shown on pay stubs next to earnings and deductions. One column shows this paycheck; the YTD column shows everything so far this year.",
    related: "budgeting",
  },
  {
    slug: "zero-based-budget",
    term: "zero-based budget",
    definition:
      "A budgeting method where you assign every dollar of your take-home pay a job before the month starts, until no dollar is left without a purpose. Bring home $2,500 and all $2,500 gets handed out on paper: rent, groceries, savings, even the fun line.",
    related: "budgeting",
  },
  // --- Taxes & government aid (article-sweep expansion, July 2026) ---
  {
    slug: "1098-t",
    term: "1098-T",
    definition:
      "The form your school sends showing what was paid in tuition and fees for the year, usually posted in the student portal. You need it to claim education tax credits.",
    related: "taxes",
  },
  {
    slug: "1099-b",
    term: "1099-B",
    definition:
      "The tax form your brokerage sends listing everything you sold during the year, what you originally paid, and the resulting gains and losses. Tax software imports it or lets you copy a few boxes.",
    related: "taxes",
  },
  {
    slug: "1099-div",
    term: "1099-DIV",
    definition:
      "The tax form your brokerage sends totaling the dividends you received during the year and marking which portion is qualified for lower tax rates.",
    related: "taxes",
  },
  {
    slug: "1099-nec",
    term: "1099-NEC",
    definition:
      "The tax form reporting pay for freelance, gig, or contract work. Unlike a W-2, it usually shows no tax withheld, which means the tax on that income is still yours to pay.",
    related: "taxes",
  },
  {
    slug: "american-opportunity-credit",
    term: "American Opportunity Credit",
    definition:
      "A tax credit worth up to $2,500 per student each year for the first years of college, covering tuition, fees, and required course materials. Up to $1,000 of it is refundable, so it can pay you even if you owe no tax.",
    related: "taxes",
  },
  {
    slug: "bank-levy",
    term: "bank levy",
    definition:
      "When a creditor takes money directly from your bank account to collect a debt, allowed only after winning a court judgment. Certain benefits deposited in the account are often protected.",
    related: "government-aid",
  },
  {
    slug: "capital-loss",
    term: "capital loss",
    aliases: ["capital losses"],
    definition:
      "What you have when you sell an investment for less than you paid. Losses cancel out your capital gains, and up to $3,000 of leftover loss can reduce your ordinary income each year.",
    related: "taxes",
  },
  {
    slug: "certified-acceptance-agent",
    term: "Certified Acceptance Agent",
    definition:
      "A person or business the IRS authorizes to verify your identity documents when you apply for an ITIN, so you don't have to mail away your passport. Many offer free or low-cost help alongside tax filing.",
    related: "taxes",
  },
  {
    slug: "chapter-13",
    term: "Chapter 13",
    definition:
      "The bankruptcy type that sets up a three-to-five-year repayment plan out of your income instead of erasing debts right away. The main draw is keeping your property, including a house you're behind on.",
    related: "government-aid",
  },
  {
    slug: "chapter-7",
    term: "Chapter 7",
    definition:
      "The bankruptcy type that legally erases qualifying debts like credit cards and medical bills, in exchange for possibly selling non-essential assets. It's typically faster and fits people with limited income and few assets.",
    related: "government-aid",
  },
  {
    slug: "chip",
    term: "CHIP",
    aliases: ["Children's Health Insurance Program"],
    definition:
      "Free or low-cost health coverage for kids in families that earn too much for Medicaid but can't afford private insurance. It covers checkups, shots, and dental, and kids often qualify even when their parents don't.",
    related: "government-aid",
  },
  {
    slug: "cost-basis",
    term: "cost basis",
    definition:
      "What you originally paid for an investment, used to measure your gain or loss when you sell. Buy at $2,000, sell at $2,600, and your $2,000 basis makes the taxable gain $600.",
    related: "investing",
  },
  {
    slug: "court-summons",
    term: "court summons",
    aliases: ["summons"],
    definition:
      "The legal papers telling you you're being sued and giving you a deadline to respond. Ignoring one can mean losing the case automatically, so always respond, even without a lawyer.",
    related: "government-aid",
  },
  {
    slug: "debt-consolidation",
    term: "debt consolidation",
    aliases: ["consolidation"],
    definition:
      "Rolling several debts into one new loan, ideally at a lower interest rate. One payment replaces five, but it only helps if the new loan genuinely costs less and the old cards stay paid off.",
    related: "government-aid",
  },
  {
    slug: "debt-management-plan",
    term: "debt management plan",
    definition:
      "An arrangement set up by a nonprofit credit counselor where you make one monthly payment to the agency and it pays your creditors, often at interest rates it negotiated down for you.",
    related: "government-aid",
  },
  {
    slug: "debt-settlement",
    term: "debt settlement",
    definition:
      "Getting a creditor to accept less than the full balance to call a debt done, like paying $6,000 to clear $10,000. It can damage your credit, and forgiven debt can count as taxable income.",
    related: "government-aid",
  },
  {
    slug: "debt-validation-letter",
    term: "debt validation letter",
    definition:
      "Written proof, which you can demand from any collector, that a debt is really yours and the amount is right. Ask for it before paying a cent, because errors and outright scams are common.",
    related: "government-aid",
  },
  {
    slug: "dependent",
    term: "dependent",
    definition:
      "Someone you support financially, usually a child or relative, whom you claim on your tax return. Claiming a dependent can unlock credits, and being claimed as one lowers the income level at which you must file.",
    related: "taxes",
  },
  {
    slug: "discharge",
    term: "discharge",
    definition:
      "The legal erasing of a debt so you no longer owe it. Bankruptcy can discharge credit cards and medical bills, and some federal student loans can be discharged after a school's fraud or a lasting disability.",
    related: "government-aid",
  },
  {
    slug: "ebt-card",
    term: "EBT card",
    aliases: ["EBT", "eWIC card"],
    definition:
      "The debit-style card that benefits like SNAP load onto each month. You swipe it at the register like any bank card, and it covers most groceries.",
    related: "government-aid",
  },
  {
    slug: "eitc",
    term: "EITC",
    aliases: ["Earned Income Tax Credit"],
    definition:
      "A refundable tax credit for people who work and earn a low-to-moderate income. It can be worth thousands of dollars, especially with kids, and you only get it by filing a return, even in years you weren't required to file.",
    related: "taxes",
  },
  {
    slug: "federal-poverty-level",
    term: "federal poverty level",
    aliases: ["poverty line"],
    definition:
      "The government's yearly income benchmark for each household size, used to decide who qualifies for programs. Benefits usually use a multiple of it, like SNAP's cutoff near 130% or WIC's at 185%.",
    related: "government-aid",
  },
  {
    slug: "filing-status",
    term: "filing status",
    definition:
      "The category you file taxes under, like single, married filing jointly, or head of household. It sets your standard deduction and where your bracket cutoffs fall.",
    related: "taxes",
  },
  {
    slug: "filing-threshold",
    term: "filing threshold",
    definition:
      "The income level above which you are required to file a tax return. It generally matches the standard deduction, and earning under it makes filing optional, though filing anyway is how you claim a refund.",
    related: "taxes",
  },
  {
    slug: "head-of-household",
    term: "head of household",
    definition:
      "A filing status for unmarried people who pay more than half the cost of keeping up a home for a child or other dependent. It comes with a bigger standard deduction and friendlier brackets than filing single.",
    related: "taxes",
  },
  {
    slug: "installment-plan",
    term: "installment plan",
    definition:
      "An IRS payment plan that breaks a tax bill you can't pay into smaller monthly payments. Applying takes a few minutes online, and while interest keeps running, the crisis is over.",
    related: "taxes",
  },
  {
    slug: "irs-free-file",
    term: "IRS Free File",
    definition:
      "A partnership between the IRS and tax software companies that lets filers under an income limit use guided tax software at no cost. One of several genuinely free ways to file a simple return.",
    related: "taxes",
  },
  {
    slug: "itemize",
    term: "itemize",
    definition:
      "To list out specific deductions one by one instead of taking the flat standard deduction. It only pays off when those individual deductions add up to more than the standard amount, which is uncommon early on.",
    related: "taxes",
  },
  {
    slug: "lifetime-learning-credit",
    term: "Lifetime Learning Credit",
    definition:
      "A tax credit worth up to $2,000 per return for almost any tuition, from grad school to a single job-skills class. There's no limit on how many years you can claim it, but it isn't refundable.",
    related: "taxes",
  },
  {
    slug: "liheap",
    term: "LIHEAP",
    aliases: ["Low Income Home Energy Assistance Program"],
    definition:
      "A program that helps lower-income households pay heating and cooling bills. Depending on your state, it can cover part of an energy bill, stop an imminent shut-off, or fund weatherizing to lower future bills.",
    related: "government-aid",
  },
  {
    slug: "long-term-capital-gains",
    term: "long-term capital gains",
    aliases: ["long-term gains"],
    definition:
      "Profits on investments held more than one year before selling, taxed at lower rates than your paycheck. People with modest incomes can pay 0% federal tax on them, which makes patience a tax strategy.",
    related: "taxes",
  },
  {
    slug: "low-income-taxpayer-clinic",
    term: "Low Income Taxpayer Clinic",
    definition:
      "A free or low-cost clinic that helps lower-income taxpayers resolve problems with the IRS, like disputes or bills they can't pay. Many are run by law schools and nonprofits.",
    related: "taxes",
  },
  {
    slug: "married-filing-jointly",
    term: "married filing jointly",
    definition:
      "The filing status for married couples who combine their income on one tax return. It carries the largest standard deduction, and the bracket cutoffs are roughly double those for single filers.",
    related: "taxes",
  },
  {
    slug: "navigator",
    term: "navigator",
    definition:
      "A free, certified helper who walks you through applying for marketplace health coverage or Medicaid. You never pay for a navigator's help.",
    related: "government-aid",
  },
  {
    slug: "offer-in-compromise",
    term: "Offer in Compromise",
    definition:
      "An IRS agreement to settle a tax debt for less than you owe when paying in full would be a genuine hardship. It's hard to qualify for, and free help like a Low Income Taxpayer Clinic can tell you if you might.",
    related: "taxes",
  },
  {
    slug: "paycheck-advance",
    term: "paycheck advance",
    aliases: ["cash advance"],
    definition:
      "Getting part of your pay before payday, through your employer or an app. Employer advances are often interest-free; advance apps can stack tips, subscriptions, and instant-transfer fees that quietly add up to a high rate.",
    related: "government-aid",
  },
  {
    slug: "payroll-tax",
    term: "payroll tax",
    aliases: ["payroll taxes"],
    definition:
      "The Social Security and Medicare taxes taken out of every paycheck, together known as FICA. Employees split the bill with their employer; self-employed people pay both halves.",
    related: "taxes",
  },
  {
    slug: "pslf",
    term: "PSLF",
    aliases: ["Public Service Loan Forgiveness"],
    definition:
      "A program that forgives your remaining federal student loan balance after years of qualifying payments while working full time for the government or many nonprofits. Certify your employment every year so problems surface early.",
    related: "government-aid",
  },
  {
    slug: "public-charge",
    term: "public charge",
    definition:
      "A test used in some immigration applications, like green card requests, asking whether someone is likely to depend on the government. It doesn't apply to everyone, and most benefits, including help your U.S.-citizen kids use, don't count against you.",
    related: "government-aid",
  },
  {
    slug: "quarterly-estimated-payments",
    term: "quarterly estimated payments",
    aliases: ["estimated quarterly payments"],
    definition:
      "Tax payments you send the IRS four times a year when no employer is withholding for you, common with gig and freelance income. Skipping them can mean a small penalty at filing time.",
    related: "taxes",
  },
  {
    slug: "re-certify",
    term: "re-certify",
    aliases: ["re-certification"],
    definition:
      "To re-submit your income and family size each year to stay on an income-driven student loan plan. Miss the deadline and your payment can jump back up without warning.",
    related: "government-aid",
  },
  {
    slug: "refund-advance-loan",
    term: "refund advance loan",
    aliases: ["refund-advance loan"],
    definition:
      "A loan against your expected tax refund, sold by tax-prep companies as a way to get money faster. The fees eat into a refund that would have arrived free within a few weeks anyway.",
    related: "taxes",
  },
  {
    slug: "refundable-credit",
    term: "refundable credit",
    definition:
      "A tax credit that can pay you cash beyond wiping out your tax bill. If you owe $200 and claim a $1,000 refundable credit, the extra $800 comes back to you as a refund.",
    related: "taxes",
  },
  {
    slug: "rent-to-own",
    term: "rent-to-own",
    definition:
      "Paying weekly or monthly for furniture or electronics until you own them. By the time you do, you've often paid several times what the item costs in a store.",
    related: "government-aid",
  },
  {
    slug: "self-employment-tax",
    term: "self-employment tax",
    definition:
      "The tax that covers both halves of Social Security and Medicare when you work for yourself. An employer normally pays half, so being your own boss means the whole bill lands on you, on top of regular income tax.",
    related: "taxes",
  },
  {
    slug: "statute-of-limitations",
    term: "statute of limitations",
    definition:
      "The legal time limit after which a creditor generally can't win a lawsuit over an old debt. The length varies by state and debt type, and even a small payment on an old debt can restart the clock.",
    related: "government-aid",
  },
  {
    slug: "sun-bucks",
    term: "SUN Bucks",
    aliases: ["Summer EBT"],
    definition:
      "Summer grocery money for school-age kids who normally get free or reduced-price school meals. Most eligible families are enrolled automatically, and the money arrives on an EBT card while school is out.",
    related: "government-aid",
  },
  {
    slug: "tanf",
    term: "TANF",
    definition:
      "Temporary Assistance for Needy Families, a state-run program that provides cash assistance to very low-income families with children. Getting TANF often automatically satisfies the income test for other help, like WIC.",
    related: "government-aid",
  },
  {
    slug: "tax-bracket",
    term: "tax bracket",
    aliases: ["tax brackets"],
    definition:
      "One of the income tiers the tax system uses, each with its own rate. Only the dollars inside a tier get taxed at that tier's rate, so moving into a higher bracket never shrinks your take-home pay.",
    related: "taxes",
  },
  {
    slug: "vita",
    term: "VITA",
    definition:
      "Volunteer Income Tax Assistance, a free IRS-backed program where trained volunteers prepare tax returns at no cost. It serves lower-income filers, students, older adults, and people who speak English as a second language.",
    related: "taxes",
  },
  {
    slug: "wage-garnishment",
    term: "wage garnishment",
    aliases: ["garnishment"],
    definition:
      "When part of your paycheck goes straight to a creditor under a court order, usually after the creditor sues and wins. Some income, like certain government benefits, is legally protected from it.",
    related: "government-aid",
  },
  {
    slug: "wash-sale-rule",
    term: "wash-sale rule",
    definition:
      "An IRS rule that cancels your tax loss if you sell an investment and buy the same or a nearly identical one within 30 days before or after the sale. Swapping into a genuinely different fund keeps the loss valid.",
    related: "taxes",
  },
  {
    slug: "wic",
    term: "WIC",
    aliases: ["Women, Infants, and Children"],
    definition:
      "A nutrition program for pregnant women, new mothers, babies, and children under five. Each month it loads specific healthy foods onto a card and adds nutrition guidance and breastfeeding support.",
    related: "government-aid",
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
