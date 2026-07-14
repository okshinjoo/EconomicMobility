// Learning modules ("courses"): curated cross-topic reading paths with a
// derived flashcard deck and a final quiz. A course is finished by reading
// every article (tracked by lib/readTracking.ts) and passing the final quiz
// (components/CourseQuiz.tsx), which awards a just-for-fun local badge.
//
// Flashcards are NOT hand-written: getCourseFlashcards() scans the course's
// articles for glossary terms (same matcher ArticleBody uses to auto-link
// them), so the deck is exactly the definitions a reader met in the module.

import { getArticleBySlug } from "./articles";
import type { Article } from "./articles/types";
import { GLOSSARY_PATTERN, slugForSurface, getGlossaryTerm } from "./glossary";

export interface CourseQuizQuestion {
  question: string;
  options: string[];
  /** Index into options. */
  answer: number;
  /** 1–2 plain sentences shown after grading. */
  explain: string;
  /** Article to review when this is answered wrong (must be in the course). */
  sourceSlug: string;
}

export interface Course {
  id: string;
  title: string;
  /** Short goal statement, e.g. "Start your first job knowing where the money goes." */
  goal: string;
  description: string;
  /** Brand-palette accent for the course page, cards, and badge. */
  color: string;
  /** Article slugs in reading order (any topic; that's the point). */
  articleSlugs: string[];
  /** Written to be passed after reading; every question names its source.
   *  Draft courses ship with [] until their final is written. */
  finalQuiz: CourseQuizQuestion[];
  /** Still being built (owner ask, July 2026): the reading path and
   *  flashcards are live, but the final + badge aren't written yet. Cards
   *  and the course page show an honest "in progress" state instead of a
   *  quiz. Flip to false (and write the final) to launch it for real. */
  draft?: boolean;
}

export const PASS_PERCENT = 80;

export const courses: Course[] = [
  {
    id: "first-paycheck",
    title: "Your First Paycheck",
    goal: "Start your first job knowing where the money goes.",
    description:
      "You got the job. This module walks the money side end to end: why the check is smaller than the offer, how to read the stub, setting up your W-4 so there are no April surprises, and where the money should live.",
    color: "#1f9069",
    articleSlugs: [
      "your-first-paycheck",
      "how-to-read-a-pay-stub",
      "how-to-fill-out-w4",
      "opening-first-bank-account",
      "building-a-savings-habit",
    ],
    finalQuiz: [
      {
        question: "What is an emergency fund actually for?",
        options: [
          "Money set aside for surprises like a car repair or a missed shift",
          "Extra money for holidays and gifts",
          "A required deposit your employer holds back",
        ],
        answer: 0,
        explain:
          "An emergency fund is a cushion for the day something goes wrong. Starting one early means a bad week never turns into debt you spend a year digging out of.",
        sourceSlug: "your-first-paycheck",
      },
      {
        question: "Which number on your pay stub should your budget be built on?",
        options: [
          "Gross pay, since that is what you earned",
          "Net pay, the amount that actually lands in your account",
          "The year-to-date total",
        ],
        answer: 1,
        explain:
          "Gross pay is what you earned before anything comes out. Net pay is what you take home, and that is the number your plan runs on.",
        sourceSlug: "how-to-read-a-pay-stub",
      },
      {
        question: "Your pay stub shows a deduction labeled FICA. What is that money doing?",
        options: [
          "Paying a processing fee to your bank",
          "Covering your share of health insurance",
          "Funding Social Security and Medicare",
        ],
        answer: 2,
        explain:
          "FICA comes out of almost everyone's pay. It funds Social Security, which supports you in retirement or disability, and Medicare, which helps cover health care later in life.",
        sourceSlug: "how-to-read-a-pay-stub",
      },
      {
        question: "What does the W-4 form actually control?",
        options: [
          "How much total tax you owe for the year",
          "How much tax your employer withholds from each paycheck",
          "Whether you have to file a tax return in April",
        ],
        answer: 1,
        explain:
          "Your income decides what you owe; the W-4 only controls how much is pulled from each check and sent in ahead of time. You can hand in a new one whenever your life changes.",
        sourceSlug: "how-to-fill-out-w4",
      },
      {
        question: "What should a good first bank account cost you each month?",
        options: [
          "Nothing. The right account charges you nothing to hold your money",
          "A small maintenance fee, usually $10 to $15",
          "It depends on your credit score",
        ],
        answer: 0,
        explain:
          "Fees like monthly maintenance and minimum-balance penalties hit low balances hardest. Online banks and many credit unions offer free checking with no minimums.",
        sourceSlug: "opening-first-bank-account",
      },
      {
        question: "What is the single most powerful move for building a savings habit?",
        options: [
          "Waiting until you feel motivated to save a big amount",
          "Cutting out every fun purchase for a few months",
          "Setting up an automatic transfer to savings the day after payday",
        ],
        answer: 2,
        explain:
          "The money moves before you ever see it, so you live on what is left. Willpower runs out, but a system runs whether you feel like it or not.",
        sourceSlug: "building-a-savings-habit",
      },
    ],
  },
  {
    id: "credit-from-zero",
    title: "Credit From Zero",
    goal: "Build a real credit score from no history at all.",
    description:
      "No credit history means lenders have nothing to go on yet. This module covers what the score measures, how to see your own report free, the safe starter tools, and the two habits that do all the work.",
    color: "#0f5c46",
    articleSlugs: [
      "what-is-a-credit-score",
      "check-credit-free",
      "build-credit-from-zero",
      "credit-utilization",
      "choosing-first-credit-card",
    ],
    finalQuiz: [
      {
        question: "Why does a higher credit score save you money?",
        options: [
          "It proves to lenders that you have a high income",
          "It gets you lower interest rates, which can mean thousands less over a loan's life",
          "It lets you skip payments without penalty",
        ],
        answer: 1,
        explain:
          "The same car loan can come with a low APR for strong credit and a much higher one for thin credit. Over the life of a loan, that gap can be thousands of dollars.",
        sourceSlug: "what-is-a-credit-score",
      },
      {
        question: "Where can you see your credit reports for free, by law?",
        options: [
          "Any site that advertises a free credit report",
          "Your bank, for a small monthly fee",
          "AnnualCreditReport.com, the one official government-backed site",
        ],
        answer: 2,
        explain:
          "AnnualCreditReport.com is the only site authorized by federal law to give you free reports from all three bureaus. If a site asks for a credit card number, you are in the wrong place.",
        sourceSlug: "check-credit-free",
      },
      {
        question: "How does a secured credit card get you approved with no credit history?",
        options: [
          "Your refundable deposit becomes your limit, so the bank takes on almost no risk",
          "It skips the credit bureaus entirely",
          "The bank keeps your deposit as a fee for taking a chance on you",
        ],
        answer: 0,
        explain:
          "You put down a deposit, say $200, and that becomes your spending limit. Because the bank's risk is covered, approval is easy, and many banks refund the deposit after months of on-time payments.",
        sourceSlug: "build-credit-from-zero",
      },
      {
        question: "When does being added as an authorized user on someone's card actually help you?",
        options: [
          "Any time, since being on any account builds credit",
          "Only if you spend money on the card yourself",
          "Only if that person pays on time and keeps their balance low",
        ],
        answer: 2,
        explain:
          "The account's good history can show up on your report even if you never spend a dollar. But their habits land on your report too, so choose someone reliable.",
        sourceSlug: "build-credit-from-zero",
      },
      {
        question: "Your card's limit rises from $1,000 to $2,000 while your $300 balance stays put. What happens to your utilization?",
        options: [
          "It stays at 30% because your balance did not change",
          "It drops from 30% to 15% without you spending less",
          "It goes up, because more credit means more risk",
        ],
        answer: 1,
        explain:
          "Utilization is your balance as a share of your limit, and the common guidance is to stay under 30%. A higher limit with the same balance lowers that share on its own.",
        sourceSlug: "credit-utilization",
      },
      {
        question: "What is the real job of your first credit card?",
        options: [
          "Earning travel points and cash-back rewards",
          "Quietly building a record of on-time payments, month after month",
          "Raising your spending power as fast as possible",
        ],
        answer: 1,
        explain:
          "Starter cards are not about rewards or status. What matters is no annual fee, reporting to all three bureaus, and a track record that becomes a real score.",
        sourceSlug: "choosing-first-credit-card",
      },
    ],
  },
  {
    id: "paying-for-college",
    title: "Paying for College",
    goal: "Get every aid dollar you qualify for, and borrow with your eyes open.",
    description:
      "FAFSA to award letter to loan decision, in order. This module is for the student (or parent) doing this for the first time, with nobody at the kitchen table who's done it before.",
    color: "#c9842a",
    articleSlugs: [
      "fafsa-step-by-step",
      "grants-loans-scholarships",
      "reading-aid-award-letter",
      "federal-vs-private-loans",
      "student-loans-before-you-sign",
    ],
    finalQuiz: [
      {
        question: "Why does filing the FAFSA early matter?",
        options: [
          "Late filers pay a penalty fee",
          "Some aid is first-come, first-served, and many state and school deadlines come months before the federal one",
          "The form gets longer as the year goes on",
        ],
        answer: 1,
        explain:
          "The FAFSA usually opens around October 1, and filing soon after can mean more money. Check your state and school deadlines instead of relying on the June 30 federal one.",
        sourceSlug: "fafsa-step-by-step",
      },
      {
        question: "Which of these describes the federal Pell Grant?",
        options: [
          "A loan you repay after graduation at a low rate",
          "Money you earn through a campus job",
          "Need-based money, up to $7,395 for 2026–27, that you never pay back",
        ],
        answer: 2,
        explain:
          "Grants are gift money, and the Pell Grant is the biggest federal one. Your FAFSA is what determines whether you qualify.",
        sourceSlug: "grants-loans-scholarships",
      },
      {
        question: "An award letter lists a $6,000 loan right next to your grants. How should you count it?",
        options: [
          "As aid, since it lowers what you pay this year",
          "As cost, because it is money you will owe later, with interest",
          "As gift money if it comes from the government",
        ],
        answer: 1,
        explain:
          "Award letters often blend gift aid and loans into one number. Sorting every line into money you keep versus money you repay is what makes the letter tell the truth.",
        sourceSlug: "reading-aid-award-letter",
      },
      {
        question: "What is the right way to compare what two schools would really cost you?",
        options: [
          "Compare their sticker prices",
          "Take each school's cost of attendance and subtract only the grants and scholarships",
          "Pick whichever letter shows the biggest total aid number",
        ],
        answer: 1,
        explain:
          "What is left after gift aid is what you cover with savings, work, or borrowing. Two schools can look the same after aid while one fills the gap with grants and the other with loans.",
        sourceSlug: "reading-aid-award-letter",
      },
      {
        question: "Why should federal student loans come before private ones for almost everyone?",
        options: [
          "Federal loans never charge interest",
          "Federal loans carry protections like income-driven repayment and hardship pauses that private loans usually lack",
          "Private loans always require perfect credit",
        ],
        answer: 1,
        explain:
          "Federal loans bend when your life does. For 2026–27, undergraduate Direct Loans carry a 6.52% fixed rate, while private rates depend on credit and can be variable.",
        sourceSlug: "federal-vs-private-loans",
      },
      {
        question: "The loan in your aid offer is bigger than you actually need. What can you do?",
        options: [
          "Accept part of the loan and decline the rest",
          "Take all of it or none of it",
          "Take it all and save the extra for later",
        ],
        answer: 0,
        explain:
          "You are never required to borrow the full offer. A handy guideline is to keep total borrowing under what you expect to earn in your first year out of school.",
        sourceSlug: "student-loans-before-you-sign",
      },
    ],
  },
  {
    id: "first-apartment",
    title: "Your First Apartment",
    goal: "Rent your first place without getting burned.",
    description:
      "The true cost of living on your own, how applications and leases work, the rights landlords hope you don't know, and how to get your deposit back when you leave.",
    color: "#b7593f",
    articleSlugs: [
      "cost-of-living",
      "renting-your-first-apartment",
      "renting-101-tenant-rights",
      "renters-insurance",
      "security-deposit-back",
    ],
    finalQuiz: [
      {
        question: "Your car insurance costs $600 once a year. How should your budget treat it?",
        options: [
          "Leave it out, since it is not a monthly bill",
          "Count it as $50 a month and set that aside as you go",
          "Plan to cover it with a credit card when it arrives",
        ],
        answer: 1,
        explain:
          "Irregular costs are what wreck budgets, because they are so easy to forget. Adding up yearly costs and dividing by 12 gives you your real monthly number.",
        sourceSlug: "cost-of-living",
      },
      {
        question: "How much cash might you need just to get the keys to a first apartment?",
        options: [
          "Close to three months' rent: a deposit plus first and sometimes last month",
          "Just the first month's rent",
          "Only a small application fee",
        ],
        answer: 0,
        explain:
          "The security deposit is usually about a month's rent, first month is due at move-in, and some landlords collect last month up front too. Plan for the whole pile.",
        sourceSlug: "renting-your-first-apartment",
      },
      {
        question: "You are behind on rent and your landlord threatens to change the locks. Can they?",
        options: [
          "Yes, once rent is late they can act",
          "Yes, as long as they give 24 hours' notice",
          "No. Eviction has to go through the courts, and lockouts and utility shutoffs are illegal",
        ],
        answer: 2,
        explain:
          "A landlord who wants you out has to file a court case and win it, no matter how far behind you are. Changing locks or shutting off heat or water to force you out is illegal.",
        sourceSlug: "renting-101-tenant-rights",
      },
      {
        question: "A fire damages your building. What does your landlord's insurance cover?",
        options: [
          "The building and everything inside, including your belongings",
          "Only the building. Replacing your stuff is on you unless you have renters insurance",
          "Whatever you can prove you owned",
        ],
        answer: 1,
        explain:
          "Landlord policies fix the building, not your laptop, clothes, or furniture. Renters insurance, often $15 to $20 a month, covers your things plus liability and a place to stay.",
        sourceSlug: "renters-insurance",
      },
      {
        question: "Which of these can a landlord fairly deduct from your security deposit?",
        options: [
          "Faded paint and a few small nail holes",
          "Lightly worn carpet from everyday living",
          "A large hole in the wall you made",
        ],
        answer: 2,
        explain:
          "There is a legal line between damage you caused and normal wear and tear. Ordinary aging from living there is not something you can be charged for.",
        sourceSlug: "security-deposit-back",
      },
      {
        question: "What is the single best move-in day habit for getting your deposit back later?",
        options: [
          "Dated photos and video of every existing flaw, emailed to yourself and the landlord",
          "A verbal walkthrough with the landlord",
          "Keeping the receipt for your deposit payment",
        ],
        answer: 0,
        explain:
          "With a clear before-and-after record, it is very hard to charge you for damage that was already there. The same photos on move-out day complete the proof.",
        sourceSlug: "security-deposit-back",
      },
    ],
  },
  {
    id: "start-investing",
    title: "Start Investing",
    goal: "Put your first dollars to work, without gambling.",
    description:
      "The difference between saving and investing, why time matters more than timing, where the cash pile should sit, and how to open an account and buy your first index fund with as little as $50.",
    color: "#157a5a",
    articleSlugs: [
      "saving-vs-investing",
      "magic-of-compound-interest",
      "high-yield-savings-account",
      "opening-first-account",
      "index-funds-explained",
      "start-investing-with-50",
    ],
    finalQuiz: [
      {
        question: "You are saving for a car you plan to buy next year. Where does that money belong?",
        options: [
          "An index fund, so it grows as much as possible",
          "A savings account, since money you need soon should not ride the market's ups and downs",
          "Split between stocks and crypto",
        ],
        answer: 1,
        explain:
          "The rule of thumb: money you will need within a few years belongs in savings, and money you will not touch for many years can be invested, where it has time to recover from dips.",
        sourceSlug: "saving-vs-investing",
      },
      {
        question: "Maya invests $200 a month from age 25 to 35, then stops. Leo invests $200 a month from 35 to 65. Who often ends up with more?",
        options: [
          "Leo, because he invested three times as much money",
          "Maya, because her money had decades longer to compound",
          "They end up almost exactly equal",
        ],
        answer: 1,
        explain:
          "Maya's ten years of contributions often match or beat Leo's thirty, because her earnings had more time to make earnings of their own. Starting early beats starting big.",
        sourceSlug: "magic-of-compound-interest",
      },
      {
        question: "How is a high-yield savings account different from a regular big-bank savings account?",
        options: [
          "It is the same safe, insured account, it just pays far more, often around 4% instead of 0.01% in 2026",
          "It invests your deposit in the stock market for higher returns",
          "It locks your money away for a set term",
        ],
        answer: 0,
        explain:
          "An HYSA works exactly like the savings account you already picture, and FDIC or NCUA insurance protects the deposit. The higher rate mostly comes from online banks skipping expensive branches.",
        sourceSlug: "high-yield-savings-account",
      },
      {
        question: "You open a brokerage account and transfer in $100. Is it invested?",
        options: [
          "Yes, deposits are invested automatically",
          "Yes, as long as it is a retirement account",
          "Not yet. Cash sits idle until you use it to buy something, like an index fund",
        ],
        answer: 2,
        explain:
          "The account is just the container. Money in it does nothing until you buy an investment with it, so do not skip that last step.",
        sourceSlug: "opening-first-account",
      },
      {
        question: "One company in your index fund has a terrible year. Why does that barely hurt you?",
        options: [
          "The fund's managers sell struggling companies quickly",
          "Index funds only include companies that are doing well",
          "Your money is spread across hundreds of companies, so one is a drop in a very large bucket",
        ],
        answer: 2,
        explain:
          "That spreading out is diversification, the closest thing investing has to a free lunch. You lower your risk without giving up much growth.",
        sourceSlug: "index-funds-explained",
      },
      {
        question: "What actually makes it possible to start investing with just $50 today?",
        options: [
          "Zero-minimum accounts and fractional shares that let you buy a sliver of a fund",
          "Special government accounts for beginners",
          "Penny stocks priced under a dollar",
        ],
        answer: 0,
        explain:
          "Most brokerages dropped minimums to $0 and made trades free, and fractional shares mean your $50 gets fully invested. The real mistake is waiting until you have more.",
        sourceSlug: "start-investing-with-50",
      },
    ],
  },
  {
    id: "scam-proof",
    title: "Scam-Proof",
    goal: "Recognize the manipulation playbook before it costs you.",
    description:
      "Every scam runs on the same few tricks. This module teaches the universal red flags, the big formats (fake texts, fake checks, payment-app cons), and exactly what to do in the first hour if one gets through.",
    color: "#0f7d74",
    articleSlugs: [
      "how-to-spot-a-scam",
      "phishing-scams",
      "payment-app-safety",
      "fake-check-scams",
      "if-youve-been-scammed",
    ],
    finalQuiz: [
      {
        question: "A caller about your account says, \"Don't tell your family about this.\" Why is that a red flag?",
        options: [
          "Financial matters are legally confidential anyway",
          "Scammers need you isolated. Real businesses never ask you to keep things secret",
          "It suggests your family may be under investigation",
        ],
        answer: 1,
        explain:
          "Secrecy shows up in scam after scam, right alongside pressure and strange payment methods. An honest company has no reason to cut you off from people you trust.",
        sourceSlug: "how-to-spot-a-scam",
      },
      {
        question: "Your \"bank's fraud department\" calls and asks you to read back the security code they just texted you. What is really happening?",
        options: [
          "Standard identity verification, since they sent the code",
          "A slow but harmless security check",
          "Someone is trying to get into your account, and that code is the key",
        ],
        answer: 2,
        explain:
          "One-time codes exist to keep other people out of your account. A real bank will never ask you to share one, so whoever asks for it is the person breaking in.",
        sourceSlug: "phishing-scams",
      },
      {
        question: "A stranger selling concert tickets online insists you pay with Zelle. Why should that stop you?",
        options: [
          "Payments on these apps are instant and irreversible, with no buyer protection if the tickets never come",
          "Zelle charges high fees on ticket sales",
          "Ticket sales are against Zelle's terms of service",
        ],
        answer: 0,
        explain:
          "Unlike a credit card, there is usually no dispute or chargeback on payment apps. Treat them like cash and use them only with people you know.",
        sourceSlug: "payment-app-safety",
      },
      {
        question: "A new employer mails you a check and asks you to buy equipment by sending money to their \"vendor.\" What is this?",
        options: [
          "Normal onboarding for remote jobs",
          "A fake-check scam. The check will bounce, and the money you sent comes out of your pocket",
          "A sign the company has cash-flow problems",
        ],
        answer: 1,
        explain:
          "A real employer never pays you and then asks you to send money on to someone else. When the check bounces, the bank takes the deposit back, and what you forwarded is gone.",
        sourceSlug: "fake-check-scams",
      },
      {
        question: "You realize money just went to a scammer. What is the very first call to make?",
        options: [
          "The local police, to file a report",
          "The scammer, to demand your money back",
          "Your bank or card company, right away, since fast action can sometimes hold or reverse a transfer",
        ],
        answer: 2,
        explain:
          "The window to flag or reverse a payment is short, so the bank comes first. Reporting to the FTC, IC3, and police matters too, but it comes after that call.",
        sourceSlug: "if-youve-been-scammed",
      },
      {
        question: "After losing money to a scam, you get a call offering to recover it for an upfront fee. What is going on?",
        options: [
          "A legitimate service, since recovery specialists usually charge up front",
          "A government program for fraud victims",
          "Almost always a second scam, sometimes run by the very same people",
        ],
        answer: 2,
        explain:
          "Real authorities never charge you to get your money back. Anyone asking for a fee or information up front to \"recover\" funds is running the recovery scam.",
        sourceSlug: "if-youve-been-scammed",
      },
    ],
  },
  {
    id: "invest-smarter",
    title: "Invest Smarter",
    goal: "Keep more of what your money earns.",
    description:
      "You've made your first investment; this is the second gear. The quiet fees that eat decades of growth, what dividends and taxes actually take, the funds that run themselves, and how to hold steady when the market drops.",
    color: "#1f9069",
    articleSlugs: [
      "expense-ratios-and-fees",
      "dividends-explained",
      "target-date-funds",
      "robo-advisors",
      "investment-taxes-101",
      "market-crashes",
    ],
    finalQuiz: [
      {
        question: "You never see a fund's expense ratio on any bill or statement. How does it get paid?",
        options: [
          "It's skimmed out of the fund's value a little at a time, so your returns are already reduced",
          "It's charged to your card once a year by the brokerage",
          "It only applies when you sell your shares",
        ],
        answer: 0,
        explain:
          "The fee comes out of the fund itself, invisibly, every year you hold it. That's why a 1% fund can quietly cost tens of thousands over decades while a 0.03% fund costs almost nothing.",
        sourceSlug: "expense-ratios-and-fees",
      },
      {
        question: "A stock's dividend yield is triple anything comparable companies pay. What should you conclude?",
        options: [
          "The company is unusually generous, so it's a rare bargain",
          "Something is off: the price has likely fallen hard or the payout is at risk of being cut",
          "Dividends that high are tax-free, so investors bid the yield up",
        ],
        answer: 1,
        explain:
          "Yield is the dividend divided by the price, so a collapsing price makes the yield look gorgeous right before the dividend gets cut. Total return matters, not the headline yield.",
        sourceSlug: "dividends-explained",
      },
      {
        question: "What does a target-date fund do on its own as your retirement year gets closer?",
        options: [
          "Locks your money in place until the year on the label",
          "Moves everything into cash on the target date",
          "Gradually shifts its mix from mostly stocks toward more bonds",
        ],
        answer: 2,
        explain:
          "That slow automatic shift is the glide path: growth-heavy while you're young, steadier as you approach the date. It replaces decades of rebalancing you'd otherwise do by hand.",
        sourceSlug: "target-date-funds",
      },
      {
        question: "What is a robo-advisor's roughly 0.25% yearly fee mostly paying for?",
        options: [
          "A professional picking stocks likely to beat the market",
          "Automatic allocation, rebalancing, and the discipline of staying hands-off",
          "Unlimited meetings with a human financial planner",
        ],
        answer: 1,
        explain:
          "A robo builds a portfolio of cheap index funds and maintains it automatically; it doesn't try to beat the market. The fee mainly buys consistency you might not keep up on your own.",
        sourceSlug: "robo-advisors",
      },
      {
        question: "You sell a winning fund in a regular brokerage account after holding it 11 months. How is the profit taxed for 2026?",
        options: [
          "At the long-term capital gains rates, since any full calendar year counts",
          "It isn't taxed until you spend the money",
          "At your ordinary income rates, because you held it a year or less",
        ],
        answer: 2,
        explain:
          "The one-year line is what separates short-term from long-term gains. Hold past a year and a single filer's 2026 long-term rate is 0% up to $49,450 of taxable income.",
        sourceSlug: "investment-taxes-101",
      },
      {
        question: "The market falls 25% and your account is deep in the red. At what point does that loss become permanent?",
        options: [
          "The moment the drop passes 20% and becomes a bear market",
          "Only if you sell your shares while prices are down",
          "After the downturn lasts longer than a year",
        ],
        answer: 1,
        explain:
          "Until you sell, you own the same shares at a temporarily worse quote. Selling converts the paper loss into a real one, often right before a recovery that arrives with no warning.",
        sourceSlug: "market-crashes",
      },
    ],
  },
  {
    id: "debt-comeback",
    title: "The Debt Comeback",
    goal: "Turn a pile of debts into a plan with an end date.",
    description:
      "Pick a payoff method you'll actually stick with, know your rights when collectors call, negotiate from strength, and shut the door on the traps that pull people back in.",
    color: "#9c4a2e",
    articleSlugs: [
      "paying-off-credit-cards",
      "debt-relief-options",
      "negotiating-debt",
      "debt-collector-rights",
      "payday-loans-and-predatory-lending",
      "avoiding-debt-scams",
    ],
    finalQuiz: [
      {
        question:
          "You want to pay the least total interest across three credit cards. Which balance gets your extra money first?",
        options: [
          "The smallest balance, to knock one out fast",
          "The balance with the highest interest rate",
          "A little extra on each, split evenly",
        ],
        answer: 1,
        explain:
          "That's the avalanche method: highest APR first saves the most money. The snowball (smallest first) costs a bit more but buys quick wins. The best method is the one you'll keep running.",
        sourceSlug: "paying-off-credit-cards",
      },
      {
        question:
          "A company says it can cut your debt in half: just stop paying your cards and pay them instead. What are they selling?",
        options: [
          "Debt settlement, which tanks your credit and offers no guarantee creditors will deal",
          "Debt consolidation, a standard banking product",
          "Nonprofit credit counseling",
        ],
        answer: 0,
        explain:
          "Stopping payments is the settlement playbook: your accounts go delinquent, your score drops, and the creditor may sue instead of settle. A nonprofit credit counselor is the safer first call.",
        sourceSlug: "debt-relief-options",
      },
      {
        question:
          "A collector agrees to settle your $2,000 debt for $800. What must happen before you send a dollar?",
        options: [
          "You record the phone call",
          "You get the agreement in writing",
          "You pay a good-faith deposit to lock the deal",
        ],
        answer: 1,
        explain:
          "A verbal deal can evaporate after you pay. Get the settlement terms in writing first: amount, that it settles the debt in full, and how it will be reported.",
        sourceSlug: "negotiating-debt",
      },
      {
        question:
          "A debt collector threatens to have you arrested tomorrow if you don't pay tonight. What do you know?",
        options: [
          "You should pay something small to show good faith",
          "They're breaking the law. Collectors can't threaten arrest, and you can demand written validation of the debt",
          "You have 24 hours to respond before it goes to court",
        ],
        answer: 1,
        explain:
          "The Fair Debt Collection Practices Act bans threats, harassment, and late-night calls, and gives you the right to demand the debt be validated in writing before anything else happens.",
        sourceSlug: "debt-collector-rights",
      },
      {
        question: "Why does a $300 payday loan so often turn into months of payments?",
        options: [
          "The fee repeats every time the loan rolls over, working out to around 400% APR",
          "Payday lenders add hidden collateral requirements",
          "Banks report payday loans to credit bureaus at double weight",
        ],
        answer: 0,
        explain:
          "The two-week fee looks small, but most borrowers can't repay the full amount plus the fee, so it rolls over, and the fee lands again. That loop is the product.",
        sourceSlug: "payday-loans-and-predatory-lending",
      },
      {
        question:
          "A 'credit repair' service wants $200 up front to remove accurate negative marks. What's the truth?",
        options: [
          "It's worth it for the time saved",
          "Accurate information can't be removed by anyone, and everything legitimate they'd do, you can do yourself for free",
          "Only lawyers can remove negative marks",
        ],
        answer: 1,
        explain:
          "Nobody can erase accurate history, and disputing real errors is free. Charging up front before doing anything is itself illegal under the Credit Repair Organizations Act.",
        sourceSlug: "avoiding-debt-scams",
      },
    ],
  },
  {
    id: "retirement-started",
    title: "Retirement, Started",
    goal: "Open the right account and put future-you on autopilot.",
    description:
      "What the accounts actually are, which one comes first, Roth vs. traditional in plain English, and the setup that runs itself once you've done it.",
    color: "#0c4a39",
    articleSlugs: [
      "retirement-basics",
      "what-is-a-401k",
      "what-is-an-ira",
      "roth-vs-traditional-ira",
      "401k-vs-ira",
    ],
    finalQuiz: [
      {
        question:
          "Two friends each invest $200 a month for retirement. One starts at 25, one at 35. Why is the gap at 65 so large?",
        options: [
          "The early starter picked better funds",
          "Ten extra years of compounding means her earnings spent decades making earnings of their own",
          "Contribution limits were higher in the past",
        ],
        answer: 1,
        explain:
          "Time in the market is the ingredient you can't buy back later. Starting small at 25 routinely beats starting big at 40.",
        sourceSlug: "retirement-basics",
      },
      {
        question:
          "Your employer matches 401(k) contributions up to 4% of your salary. What is that match, honestly stated?",
        options: [
          "A 100% instant return on those dollars, the best deal in personal finance",
          "A loan you repay when you leave the company",
          "A perk that mostly benefits high earners",
        ],
        answer: 0,
        explain:
          "Contribute 4%, and your employer doubles it on the spot. Whatever else your plan looks like, contributing at least to the full match comes first.",
        sourceSlug: "what-is-a-401k",
      },
      {
        question: "How is an IRA different from a 401(k)?",
        options: [
          "An IRA is only for self-employed people",
          "An IRA pays a government-guaranteed return",
          "You open an IRA yourself at any brokerage. No employer involved, and you pick the investments",
        ],
        answer: 2,
        explain:
          "The 401(k) comes through a job; the IRA is yours alone. For 2026 you can put up to $7,500 into an IRA, and it travels with you no matter where you work.",
        sourceSlug: "what-is-an-ira",
      },
      {
        question:
          "You're early in your career and expect to earn (and be taxed) more later. Which IRA flavor usually wins?",
        options: [
          "Traditional, because the deduction is worth more now",
          "Roth: pay today's low tax rate, then withdrawals in retirement are tax-free",
          "They always come out exactly equal",
        ],
        answer: 1,
        explain:
          "Roth means taxed now, never again. Paying tax while your rate is low and letting decades of growth come out tax-free is the classic early-career move.",
        sourceSlug: "roth-vs-traditional-ira",
      },
      {
        question:
          "You have $300 a month for retirement, a 401(k) with a match, and an IRA. What's the widely used order?",
        options: [
          "Fill the IRA completely first, since fees are lower",
          "401(k) up to the full match, then the IRA, then back to the 401(k)",
          "Split it 50/50 from day one",
        ],
        answer: 1,
        explain:
          "The match is free money, so it comes first. After that, an IRA usually offers more fund choices and lower costs. Any remainder goes back into the 401(k).",
        sourceSlug: "401k-vs-ira",
      },
      {
        question: "What happens to the money in your 401(k) if you leave the job?",
        options: [
          "It's forfeited unless you worked there five years",
          "Your own contributions are always yours; you can roll the account into an IRA or a new employer's plan",
          "It converts automatically to a pension",
        ],
        answer: 1,
        explain:
          "Every dollar you contributed is yours, period (employer-match dollars may vest on a schedule). A rollover moves it without taxes or penalties; losing track of old accounts is the real risk.",
        sourceSlug: "what-is-a-401k",
      },
    ],
  },
  {
    id: "taxes-handled",
    title: "Taxes, Handled",
    goal: "File for the first time without fear, or fees.",
    description:
      "Whether you even need to file, what the forms mean, the free ways to do it, why a refund isn't a bonus, and the credit low-income workers leave on the table.",
    color: "#8a6d1f",
    articleSlugs: [
      "do-you-need-to-file",
      "filing-taxes-first-time",
      "understanding-tax-forms",
      "free-ways-to-file",
      "tax-refund-explained",
      "earned-income-tax-credit",
    ],
    finalQuiz: [
      {
        question:
          "You earned $9,000 at a part-time job, below the filing threshold. Why might you file anyway?",
        options: [
          "Filing is legally required at any income",
          "Your employer likely withheld tax from each check, and filing is the only way to get that money back",
          "Not filing lowers your credit score",
        ],
        answer: 1,
        explain:
          "Below the threshold, filing is optional, but any withheld tax stays with the IRS unless you file to claim it. For low earners, that's often hundreds of dollars.",
        sourceSlug: "do-you-need-to-file",
      },
      {
        question: "What's the one document you can't start your tax return without?",
        options: [
          "Your W-2 (or 1099s), which employers must send by the end of January",
          "A letter from the IRS inviting you to file",
          "Last year's tax return",
        ],
        answer: 0,
        explain:
          "The W-2 is your year in one page: what you earned and what was already withheld. If it hasn't arrived by early February, ask your employer. Don't guess the numbers.",
        sourceSlug: "filing-taxes-first-time",
      },
      {
        question: "You got a W-2 from your job and a 1099 for gig work. What's the difference?",
        options: [
          "They're interchangeable names for the same form",
          "The W-2 job withheld taxes as you went; the 1099 income had nothing withheld, so tax on it is still owed",
          "1099 income is tax-free below $10,000",
        ],
        answer: 1,
        explain:
          "That's the trap of gig income: it arrives untaxed. A W-2 job pays your tax bill as you earn; 1099 income leaves the whole bill for filing time.",
        sourceSlug: "understanding-tax-forms",
      },
      {
        question: "What should filing a simple tax return cost you?",
        options: [
          "Around $100 at a preparer, as a necessary safety measure",
          "Nothing: IRS Direct File, Free File, and VITA volunteer sites all file simple returns for $0",
          "A percentage of your refund",
        ],
        answer: 1,
        explain:
          "Most people with straightforward returns qualify to file completely free. Paid storefronts count on you not knowing that, and 'refund advance' products are loans with fees.",
        sourceSlug: "free-ways-to-file",
      },
      {
        question: "Your refund this year is $1,800. What is that money?",
        options: [
          "A reward from the government for filing on time",
          "Interest the IRS pays on your withholding",
          "Your own overpaid tax coming back: an interest-free loan you gave the government all year",
        ],
        answer: 2,
        explain:
          "A big refund means too much was withheld from each check. It feels great, but it was your money all along. Adjusting your W-4 puts it in your paychecks instead.",
        sourceSlug: "tax-refund-explained",
      },
      {
        question:
          "You worked all year at a low wage and owe $0 in tax. What can the Earned Income Tax Credit still do?",
        options: [
          "Nothing: credits only reduce tax you owe",
          "Pay you a refund anyway, because the EITC is refundable (up to $8,231 for 2026)",
          "Roll over to reduce next year's taxes",
        ],
        answer: 1,
        explain:
          "Refundable means the credit can exceed your tax bill and come back as cash. It's one of the largest anti-poverty programs in the country, and millions who qualify never claim it.",
        sourceSlug: "earned-income-tax-credit",
      },
    ],
  },
  {
    id: "aid-season-playbook",
    title: "The Aid Season Playbook",
    goal: "Run October to May like someone who knows the aid game.",
    description:
      "Financial aid is a season with a schedule, and the students who treat it that way get more money. This module runs the whole calendar: the FAFSA, the CSS Profile at the schools that want it, surviving verification, reading award letters side by side, and pushing back when the offer isn't enough.",
    color: "#a3541c",
    articleSlugs: [
      "fafsa-step-by-step",
      "css-profile-explained",
      "fafsa-mistakes",
      "fafsa-verification",
      "reading-aid-award-letter",
      "appealing-financial-aid",
    ],
    finalQuiz: [
      {
        question: "When does the FAFSA open each year?",
        options: ["January 1", "October 1", "The same day classes start"],
        answer: 1,
        explain:
          "October 1. Filing in the fall matters because some aid runs out, and early filers get first crack at it.",
        sourceSlug: "fafsa-step-by-step",
      },
      {
        question: "Who files the CSS Profile?",
        options: [
          "Every college applicant in the country",
          "Only students applying to the roughly 200 schools that require it",
          "Only international students",
        ],
        answer: 1,
        explain:
          "The Profile is required by about 200 mostly private colleges to award their own institutional aid. Each school's aid page says whether it wants one.",
        sourceSlug: "css-profile-explained",
      },
      {
        question: "You're selected for verification. What's the smart read of the situation?",
        options: [
          "You're suspected of fraud and should get a lawyer",
          "It's routine paperwork, but your aid is frozen until you finish it",
          "You can safely ignore it; the aid already showed up in your portal",
        ],
        answer: 1,
        explain:
          "Verification is a routine cross-check that hits low-income applicants often. The only real danger is responding slowly, because nothing pays out until it's done.",
        sourceSlug: "fafsa-verification",
      },
      {
        question: "Two award letters show the same 'total aid.' What can still make one offer thousands better?",
        options: [
          "The mix: how much is grant money versus loans you repay",
          "Which letter arrived first",
          "The font and letterhead quality",
        ],
        answer: 0,
        explain:
          "A package heavy on grants beats one heavy on loans at the same total. The mix is the offer.",
        sourceSlug: "reading-aid-award-letter",
      },
      {
        question: "Your family's income dropped after you filed the FAFSA. What's your move?",
        options: [
          "Nothing; the numbers are locked for the year",
          "Ask the aid office for a professional judgment review with proof of the change",
          "Refile the FAFSA under a different name",
        ],
        answer: 1,
        explain:
          "Aid offices can legally re-run your numbers when real life changes them. It's called professional judgment, and a plain letter with documentation is how you start it.",
        sourceSlug: "appealing-financial-aid",
      },
      {
        question: "Which FAFSA mistake costs families the most aid?",
        options: [
          "Using blue ink instead of black",
          "Assuming they earn too much to qualify and never filing at all",
          "Filing twice in the same year",
        ],
        answer: 1,
        explain:
          "The biggest error is self-rejection. Plenty of aid, including some scholarships and loans, requires a FAFSA on file regardless of income.",
        sourceSlug: "fafsa-mistakes",
      },
    ],
  },
  {
    id: "borrow-smart",
    title: "Borrow Smart",
    goal: "If you have to borrow for school, borrow like you've read the fine print.",
    description:
      "Most students borrow something. This module is the difference between borrowing on purpose and borrowing by default: what to sign and what to refuse, federal versus private, subsidized versus not, how to keep the total down while enrolled, and what repayment actually looks like on the other side.",
    color: "#7c4a12",
    articleSlugs: [
      "student-loans-before-you-sign",
      "federal-vs-private-loans",
      "subsidized-vs-unsubsidized",
      "minimizing-college-debt",
      "dropping-a-class-money",
      "repaying-student-loans",
    ],
    finalQuiz: [
      {
        question: "What's the recommended order for college money?",
        options: [
          "Private loans first, they're fastest",
          "Grants and scholarships, then federal loans, then private only if a gap remains",
          "Whatever the school's preferred lender list suggests",
        ],
        answer: 1,
        explain:
          "Free money first, protected money second, private debt last and smallest. The order is the strategy.",
        sourceSlug: "federal-vs-private-loans",
      },
      {
        question: "What makes a subsidized federal loan the better deal?",
        options: [
          "The government pays the interest while you're in school",
          "It never has to be repaid",
          "It comes with a lower tuition rate",
        ],
        answer: 0,
        explain:
          "Subsidized loans don't grow while you're enrolled at least half-time, because the government covers the interest. Unsubsidized loans quietly compound the whole time.",
        sourceSlug: "subsidized-vs-unsubsidized",
      },
      {
        question: "Before signing any student loan, the number to know is:",
        options: [
          "The monthly payment your total borrowing will demand after graduation",
          "Your school's ranking",
          "The lender's stock price",
        ],
        answer: 0,
        explain:
          "A loan is a claim on your future paychecks. Translating the total into a realistic monthly payment is how you decide if the claim is survivable.",
        sourceSlug: "student-loans-before-you-sign",
      },
      {
        question: "Dropping below half-time enrollment does what to your federal loans?",
        options: [
          "Nothing until graduation",
          "Starts your grace-period clock ticking",
          "Converts them to grants",
        ],
        answer: 1,
        explain:
          "Half-time enrollment is what keeps loans dormant. Slip under it and the countdown to repayment begins, whether or not you meant to start it.",
        sourceSlug: "dropping-a-class-money",
      },
      {
        question: "The cheapest dollar of college debt is:",
        options: [
          "The one you refinance later",
          "The one you never borrow",
          "The one on a rewards credit card",
        ],
        answer: 1,
        explain:
          "Every borrowing decision starts with shrinking the amount: cheaper credits, textbook strategy, working the aid season. Repayment plans manage debt; not borrowing avoids it.",
        sourceSlug: "minimizing-college-debt",
      },
      {
        question: "Six months after you graduate, what happens?",
        options: [
          "Nothing; loans wait until you feel ready",
          "Your federal loan grace period ends and payments begin",
          "Interest is forgiven if you found a job",
        ],
        answer: 1,
        explain:
          "The grace period is six months, then bills arrive. Picking a repayment plan before that first bill, instead of after a missed one, is the whole game.",
        sourceSlug: "repaying-student-loans",
      },
    ],
  },
  {
    id: "transfer-ready",
    title: "Transfer Ready",
    goal: "Land at a four-year school with your credits and your aid intact.",
    description:
      "The community-college-to-university move, end to end: what the route saves, protecting your aid while you're there, choosing target schools by how they'll actually treat you, and comparing offers when the letters land. This module is still being built: the reading path below is live now, and the final (with its badge) is on the way.",
    color: "#4b5f8a",
    draft: true,
    articleSlugs: [
      "community-college-path",
      "keep-your-aid-sap",
      "how-colleges-read-applications",
      "schools-with-generous-aid",
      "in-state-vs-out-of-state",
      "community-college-transfer-money",
      "reading-aid-award-letter",
    ],
    finalQuiz: [],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCourseArticles(course: Course): Article[] {
  return course.articleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => Boolean(a));
}

export interface Flashcard {
  slug: string;
  term: string;
  definition: string;
}

/**
 * Every glossary definition a reader meets in this course's articles, in
 * order of first appearance. Server-side only (walks full article bodies).
 */
export function getCourseFlashcards(course: Course): Flashcard[] {
  const seen = new Set<string>();
  const cards: Flashcard[] = [];
  const re = new RegExp(GLOSSARY_PATTERN, "gi");

  for (const article of getCourseArticles(course)) {
    const chunks: string[] = [];
    for (const block of article.body) {
      if (block.text) chunks.push(block.text);
      if (block.items) chunks.push(...block.items);
    }
    for (const chunk of chunks) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(chunk)) !== null) {
        const slug = slugForSurface(m[1]);
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        const term = getGlossaryTerm(slug);
        if (term) {
          cards.push({
            slug,
            term: term.term,
            definition: term.definition,
          });
        }
      }
    }
  }
  return cards;
}
