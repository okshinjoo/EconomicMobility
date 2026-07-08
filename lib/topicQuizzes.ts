// Topic-level mini quizzes: 5 questions spanning a topic's guides, for the
// key topics only (absence is deliberate — not every topic needs one).
// Served at /learn/[topic]/quiz; suggested from every article of the topic.
// Each question carries a sourceSlug so a wrong answer links "Review: <guide>".
// Question stems must not duplicate article-level `quiz` blocks or course
// finals (same rule as lib/courses.ts).

import type { TopicId } from "./topics";
import type { ArticleQuizQuestion } from "./articles/types";

export interface TopicQuizQuestion extends ArticleQuizQuestion {
  /** Slug of the guide that teaches this question's fact. */
  sourceSlug: string;
}

export const topicQuizzes: Partial<Record<TopicId, TopicQuizQuestion[]>> = {
  "budgeting": [
    {
      question:
        "You've got a spare $50, a credit card at 22% interest, and a job that adds 50 cents for every dollar you put in the 401(k). Where does that $50 go first?",
      options: [
        "The credit card, since 22% is a brutal rate",
        "The 401(k), enough to grab the full match",
        "A regular savings account, to stay flexible",
        "Split it evenly so nothing gets neglected",
      ],
      answer: 1,
      explain:
        "The match turns your dollar into $1.50 the moment it lands, an instant 50% return that even a 22% card can't outrun. The card comes next in line, not first.",
      sourceSlug: "money-order-of-operations",
    },
    {
      question:
        "Car registration hits every December, and every December it wrecks your budget. What's the fix?",
      options: [
        "Pull from your emergency fund, that's what it's for",
        "Put it on a credit card and pay it down over the spring",
        "A sinking fund: set aside a little each month for a bill you know is coming",
        "Keep a bigger cushion in checking just in case",
      ],
      answer: 2,
      explain:
        "A bill that arrives on schedule isn't an emergency, it's a calendar item. Tucking away one-twelfth of it each month turns the December hit into a shrug, and saves the emergency fund for the truly out-of-nowhere stuff.",
      sourceSlug: "sinking-funds",
    },
    {
      question:
        "A money-transfer app brags about zero fees for sending cash to your family abroad. Where might it still be taking a cut?",
      options: [
        "It can't, zero fees means the full amount arrives",
        "In the exchange rate, by converting at a worse rate than the real one and keeping the difference",
        "Through a tax the government adds to every transfer",
        "By charging your family a pickup fee required by law",
      ],
      answer: 1,
      explain:
        "The exchange-rate markup is the invisible second cost of every transfer. Judge a service by the total your family actually receives, not by the headline fee.",
      sourceSlug: "sending-money-abroad",
    },
    {
      question:
        "Money's tight and you're dreading a surprise overdraft fee. What actually switches those fees off?",
      options: [
        "Signing up for overdraft coverage so the bank has your back",
        "Keeping receipts so you can dispute the fee later",
        "Only using cash for the rest of the month",
        "Opting out of overdraft coverage so a purchase you can't afford simply gets declined",
      ],
      answer: 3,
      explain:
        "Overdraft 'coverage' is what triggers the fee: the bank lets the purchase through and then charges you for it. Opt out and the card just gets declined, a tiny free embarrassment instead of real money gone.",
      sourceSlug: "avoiding-bank-fees",
    },
    {
      question:
        "You finish setting up a zero-based budget for the month. What is supposed to be at zero?",
      options: [
        "Dollars that don't have a job assigned yet",
        "Your bank account balance by the end of the month",
        "Your spending on wants",
        "Your credit card balance",
      ],
      answer: 0,
      explain:
        "Zero-based budgeting means assigning every dollar of take-home to something, needs, wants, savings, or debt, before the month begins. It's zero dollars without a purpose, not zero dollars in your account.",
      sourceSlug: "budgeting-methods",
    },
  ],
  "credit": [
    {
      question:
        "A collector calls about a debt you don't recognize. What's the move?",
      options: [
        "Pay a small amount right away to show good faith",
        "Ask for written proof of the debt before paying anything",
        "Ignore it; if it isn't yours it will go away on its own",
        "Give them your bank details so they can confirm your identity",
      ],
      answer: 1,
      explain:
        "Debts get sold and resold with sloppy paperwork, so make the collector validate the debt in writing first. Dispute it in writing within 30 days and they generally have to verify it before collecting further.",
      sourceSlug: "collections-explained",
    },
    {
      question:
        "A $300 hospital bill slipped through the cracks and went to collections. Will it show up on your credit report?",
      options: [
        "Yes, right away, like any other collection",
        "Yes, but only after 90 days",
        "No. Medical collections under $500 never appear on your report at all",
        "Only if you refuse to set up a payment plan",
      ],
      answer: 2,
      explain:
        "The bureaus keep medical collections under $500 off reports entirely, and even bigger ones get a full year before they can appear. Paid medical collections are removed completely.",
      sourceSlug: "medical-debt-and-credit",
    },
    {
      question:
        "An uncle insists you should leave a small balance on your card each month so the bank sees you 'using' credit. What's the truth?",
      options: [
        "Paying the statement in full builds the exact same credit and costs you zero interest",
        "He's right; a small unpaid balance builds your score faster",
        "Carrying a balance helps, but only if it's under 10% of your limit",
        "It makes no difference as long as you pay the minimum",
      ],
      answer: 0,
      explain:
        "Carrying a balance just hands the card company interest for nothing. Using the card and paying it off in full builds your score the same way, for free.",
      sourceSlug: "credit-myths",
    },
    {
      question:
        "You paid a service to report your rent, and the score in your free credit app went up. Then a lender's check showed no change. Why?",
      options: [
        "The service must have reported to the wrong bureau",
        "Rent only counts after two full years of payments",
        "Many lenders still pull FICO 8, which ignores rental accounts entirely",
        "Lenders can see the rent but are required to disregard it",
      ],
      answer: 2,
      explain:
        "VantageScore and the newer FICO 9 and 10 count reported rent, but FICO 8, still the version a large share of lenders use, skips rental accounts. The same year of rent can lift one score and do nothing for another.",
      sourceSlug: "rent-reporting",
    },
    {
      question:
        "You set up a credit freeze at Equifax after a breach letter. Is your file locked?",
      options: [
        "Yes, one bureau is required to tell the other two",
        "Yes, but only for six months",
        "No, freezes only work if you also pay for credit monitoring",
        "Not yet. A freeze has to be placed at each of the three bureaus separately",
      ],
      answer: 3,
      explain:
        "A freeze at one bureau doesn't cover the others, so set it up at Equifax, Experian, and TransUnion. It's the fraud alert that only needs one bureau, which then must notify the other two.",
      sourceSlug: "credit-freeze",
    },
  ],
  "taxes": [
    {
      question:
        "You're single, under 65, and earned $12,000 at a part-time job in 2026, with taxes withheld from every check. Do you have to file?",
      options: [
        "Yes, anyone with a job has to file",
        "No, you're under the $16,100 threshold, but filing is the only way to get your withheld money back",
        "No, and the IRS won't accept returns from people who aren't required to file",
        "Only if your employer tells you to",
      ],
      answer: 1,
      explain:
        "Below the threshold you aren't required to file, but the money withheld from your checks sits with the government until you file and claim it. Skip the return and you leave your own money behind.",
      sourceSlug: "do-you-need-to-file",
    },
    {
      question:
        "Tax software offers you a choice: a $1,000 deduction or a $1,000 credit. Which saves you more?",
      options: [
        "The deduction, because it lowers your income",
        "They're worth exactly the same",
        "The credit, because it cuts your tax bill dollar for dollar",
        "It depends on whether you're getting a refund",
      ],
      answer: 2,
      explain:
        "A $1,000 credit takes a full $1,000 straight off what you owe. A $1,000 deduction only saves you the tax on that $1,000, usually a few hundred dollars.",
      sourceSlug: "deductions-vs-credits",
    },
    {
      question:
        "Your cousin got a $2,400 refund and calls it their yearly bonus from the IRS. What was that money, really?",
      options: [
        "A reward the government pays people who file on time",
        "About $200 a month of their own pay, over-withheld all year and handed back without interest",
        "Free money from credits everyone automatically gets",
        "Extra pay their employer owed them",
      ],
      answer: 1,
      explain:
        "A refund is your own overpayment coming home, which makes a big one an interest-free loan you gave the government. Adjusting your W-4 is how you choose bigger checks now instead.",
      sourceSlug: "tax-refund-explained",
    },
    {
      question:
        "You start delivering for an app, and every payment lands in your account in full. What's the catch?",
      options: [
        "Nothing was withheld for taxes, so a slice of each payment, roughly 25 to 30%, should go straight into savings",
        "The app already paid your taxes, so you're all set",
        "Gig income is tax-free below a certain amount",
        "You only owe taxes if the app mails you a form",
      ],
      answer: 0,
      explain:
        "Unlike a paycheck, gig income arrives with no taxes taken out, and the bill is yours to handle, often quarterly. Setting aside a slice as you earn is what keeps April from becoming a crisis.",
      sourceSlug: "gig-1099-taxes",
    },
    {
      question:
        "You earn money in the U.S. but can't get a Social Security number. Can you file a tax return?",
      options: [
        "No, an SSN is required to file",
        "Yes, but only through a paid storefront preparer",
        "No, and trying to file would only cause you problems",
        "Yes, with an ITIN, a tax ID the IRS issues regardless of immigration status",
      ],
      answer: 3,
      explain:
        "The IRS's job is collecting taxes, not immigration enforcement, and it issues ITINs for exactly this. Filing can mean a refund and a useful paper trail, and VITA sites can help you do it for free.",
      sourceSlug: "filing-with-itin",
    },
  ],
  "investing": [
    {
      question:
        "You're investing money you won't touch for 30 years. What does that long runway change, according to the guides?",
      options: [
        "You can comfortably hold more stocks, because a rough year has decades to recover",
        "Nothing; risk is risk no matter when you need the money",
        "You should keep it all in savings so three decades of interest can add up",
        "You can skip diversifying, since time cancels out any single bad bet",
      ],
      answer: 0,
      explain:
        "Your time horizon, more than anything, should shape how much risk you take: with decades to go, a downturn is a wait, not a disaster. Diversification still matters, since it keeps one bad bet from sinking you.",
      sourceSlug: "risk-and-diversification",
    },
    {
      question:
        "You invest $100 on the first of every month, no matter what. The market drops hard in March. What does your plan quietly do for you?",
      options: [
        "Pauses your purchase until prices recover",
        "Buys more shares than usual, because your $100 goes further at lower prices",
        "Locks in a loss, since buying during a drop is bad timing",
        "Nothing; a fixed schedule only helps when prices are rising",
      ],
      answer: 1,
      explain:
        "That's the point of dollar-cost averaging: the same fixed amount automatically buys more when prices are low and less when they're high, which is exactly what you'd want to do on purpose, without any decision from you.",
      sourceSlug: "dollar-cost-averaging",
    },
    {
      question:
        "You're 22 and earning less than you probably ever will. Why do the guides say a Roth IRA can be an especially good fit right now?",
      options: [
        "It lets you deduct contributions now and skip taxes forever",
        "It has a much higher contribution limit than a Traditional IRA",
        "You pay tax now, while your rate is low, and qualified withdrawals later, growth included, come out tax-free",
        "Roth accounts earn a higher interest rate than Traditional ones",
      ],
      answer: 2,
      explain:
        "Roth means pay tax now, withdraw tax-free later. Early in a career your tax rate is often as low as it will ever be, so paying a little tax today to make decades of growth tax-free can be a genuinely great trade.",
      sourceSlug: "roth-vs-traditional-ira",
    },
    {
      question:
        "Tuition is due next fall, and your emergency fund needs a home too. Which account gets which pile?",
      options: [
        "Both in a CD; the locked rate beats a savings account",
        "Tuition money in a CD, emergency fund in a high-yield savings account",
        "Both in a high-yield savings account; CDs are too risky",
        "Emergency fund in a CD, tuition money in checking",
      ],
      answer: 1,
      explain:
        "A CD shines for money with a known deadline, like tuition due next fall. An emergency, by definition, doesn't wait for a term to end, so that fund stays liquid in an HYSA with no penalty to reach it.",
      sourceSlug: "what-is-a-cd",
    },
    {
      question:
        "A friend won't buy a $900 stock because it's 'way more expensive' than a $9 one. What number actually measures a company's size?",
      options: [
        "The share price; a higher price means a bigger company",
        "The 52-week range",
        "The dividend yield",
        "Market cap: the share price times the number of shares that exist",
      ],
      answer: 3,
      explain:
        "Companies choose how many slices to cut themselves into, so the price of one slice tells you almost nothing. Market cap is the market's price tag for the whole company, and it's what lets you compare two businesses fairly.",
      sourceSlug: "how-to-read-a-stock-quote",
    },
  ],
  "college": [
    {
      question:
        "You have one free evening for scholarship applications: a famous national award, or a $500 scholarship from a local community group. Where do the guides point you?",
      options: [
        "The national one; bigger money is always worth the shot first",
        "Neither; scholarships mostly go to students with perfect GPAs",
        "The local one; far fewer people apply, so your odds are much better",
        "Whichever one charges the smaller application fee",
      ],
      answer: 2,
      explain:
        "Thousands of people chase every giant national award, while small local scholarships get far fewer applicants; a $500 local award you win beats a $20,000 one you don't. And a real scholarship never charges a fee to apply.",
      sourceSlug: "finding-scholarships",
    },
    {
      question:
        "You're undocumented, so federal aid is generally off the table. Does that mean college money is too?",
      options: [
        "Yes; the FAFSA is the only path to any aid",
        "No, but private loans are the only option left",
        "No; many states offer in-state tuition and their own aid, and plenty of scholarships don't require citizenship or an SSN",
        "Yes, unless a school agrees to waive tuition entirely",
      ],
      answer: 2,
      explain:
        "No federal aid usually doesn't mean no aid at all. State policies vary a lot, some schools offer their own aid, and organizations like TheDream.US run scholarships built exactly for this, so start by looking up your state's policy.",
      sourceSlug: "undocumented-daca-aid",
    },
    {
      question:
        "Your award letter says 'Federal Work-Study: $2,500.' What is that, really?",
      options: [
        "A grant that gets applied straight to your tuition bill",
        "A job offer: the most you can earn at a part-time, class-friendly job, paid as a regular paycheck",
        "A loan you repay after graduation",
        "Cash deposited to your student account at the start of the semester",
      ],
      answer: 1,
      explain:
        "The dollar figure is a cap on what you can earn by actually working, not money handed to you. Claim a spot early, because funds can run out and the good positions fill fast.",
      sourceSlug: "work-study-explained",
    },
    {
      question:
        "A parent lost their job after you filed the FAFSA, and your aid offer doesn't reflect it. What now?",
      options: [
        "Nothing; the first offer is final",
        "Refile the FAFSA and hope the numbers update on their own",
        "Take out a private loan to cover the difference",
        "Ask the aid office for a 'special circumstances' review, with a short letter and proof attached",
      ],
      answer: 3,
      explain:
        "Your first offer is often a starting point, not a verdict. A respectful, specific appeal with documents attached, like a layoff notice, is normal and free, and the worst they can say is no.",
      sourceSlug: "appealing-financial-aid",
    },
    {
      question:
        "Your first student loan bill arrives and the standard payment doesn't fit your paycheck. What's the move?",
      options: [
        "Skip payments until you earn more; they'll pause automatically",
        "Contact your servicer or StudentAid.gov and ask about income-driven repayment or a temporary pause",
        "Pay a company that offers to fix your loans for a fee",
        "Put the payments on a credit card to buy time",
      ],
      answer: 1,
      explain:
        "Falling behind isn't the disaster; staying silent is. Income-driven repayment can tie the bill to what you earn, and deferment or forbearance can pause a rough stretch, but only if you ask before it becomes a crisis.",
      sourceSlug: "repaying-student-loans",
    },
  ],
  "money-safety": [
    {
      question:
        "A late-night caller sounds exactly like your nephew and needs bail money sent right now. Why isn't the familiar voice proof it's really him?",
      options: [
        "Voice-cloning software can copy a real voice from a short recording, like a social media clip",
        "Phone lines distort voices too much to trust either way",
        "It is proof; if the voice matches, it's him",
        "Scammers only use texts, so a phone call is probably real",
      ],
      answer: 0,
      explain:
        "Voice-cloning tools need only a short clip, like a video or voicemail greeting, to imitate someone you love. Hang up and call him back at the number you already have, or ask for the family safe word.",
      sourceSlug: "family-emergency-scams",
    },
    {
      question:
        "A stranger sends you $200 on a payment app, then messages begging you to send it back. It was 'an accident.' What now?",
      options: [
        "Send it back; keeping it would be stealing",
        "Send back half until they prove who they are",
        "Don't send anything. Report it in the app",
        "Move it to your bank account first, then return it",
      ],
      answer: 2,
      explain:
        "The 'accidental' payment was often made with a stolen card and will be reversed, while the money you send back is real and gone. Report it inside the app instead of paying anyone.",
      sourceSlug: "payment-app-safety",
    },
    {
      question:
        "A remote 'package inspection' job just wants you to receive packages at home and reship them. Where's the harm if they're paying you?",
      options: [
        "There isn't any; reshipping is a normal entry-level logistics job",
        "The goods are usually bought with stolen cards, and the job hides the fraud trail behind your name and address",
        "The only risk is shipping costs coming out of your paycheck",
        "It's fine as long as you never open the packages",
      ],
      answer: 1,
      explain:
        "Reshipping 'jobs' exist to launder merchandise bought with stolen credit cards, and the trail ends at your door. People who take them can end up inside a fraud investigation, and some are never paid at all.",
      sourceSlug: "job-scams",
    },
    {
      question:
        "Someone at your church shares an investment that has gone up the same tidy amount every single month for two years. What's the red flag?",
      options: [
        "Nothing; steady growth is exactly what a good investment looks like",
        "It's only a problem if the returns are over 20% a year",
        "Investments shared within a close community are generally safe",
        "Real markets bounce around, so perfectly smooth gains are the classic Ponzi tell",
      ],
      answer: 3,
      explain:
        "A Ponzi scheme pays 'returns' out of new investors' deposits, so statements look eerily smooth until the new money stops. Scammers target tight-knit communities on purpose, so check the seller on FINRA BrokerCheck or the SEC's adviser database first.",
      sourceSlug: "investment-fraud",
    },
    {
      question:
        "A 'notario' near you charges to prepare immigration paperwork and promises results. What should your family know?",
      options: [
        "In the U.S., a notary public is not a lawyer and can't legally give immigration advice",
        "Notarios are licensed for immigration cases, just cheaper than attorneys",
        "It's fine as long as the office looks professional and gives receipts",
        "A written guarantee of a green card makes the deal safe",
      ],
      answer: 0,
      explain:
        "In many countries a notario is a trained legal professional, but a U.S. notary public only witnesses signatures. Only a licensed attorney or a DOJ accredited representative can give immigration legal advice, and no honest one guarantees an outcome for a fee.",
      sourceSlug: "immigrant-scams",
    },
  ],
};

export function getTopicQuiz(id: TopicId): TopicQuizQuestion[] | undefined {
  const q = topicQuizzes[id];
  return q && q.length > 0 ? q : undefined;
}

export const TOPIC_QUIZ_IDS = () =>
  (Object.keys(topicQuizzes) as TopicId[]).filter((id) => getTopicQuiz(id));
