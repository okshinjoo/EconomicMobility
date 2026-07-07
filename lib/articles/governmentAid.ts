import type { Article } from "./types";

export const governmentAidArticles: Article[] = [
  {
    slug: "benefits-you-qualify-for",
    order: 10,
    topicId: "government-aid",
    title: "Benefits You May Qualify For",
    dek: "Public benefits exist to help people through hard stretches. Using them is normal, smart, and exactly what they're for.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Government benefits are funded by taxes you and your neighbors pay. Using them when you need them is the system working as intended.",
      "Many programs cover everyday needs: health coverage, groceries, help when you lose a job, and money toward rent or utilities.",
      "Eligibility usually depends on your income and household size, not on whether you 'deserve' help.",
    ],
    body: [
      {
        type: "p",
        text: "If money is tight, you are not alone, and you have not failed. Public benefits are programs your tax dollars already pay for, built to catch people during the rough patches that happen to almost everyone. Asking for that help is not a handout you should feel ashamed of. It is using a tool that exists for exactly this moment.",
      },
      {
        type: "p",
        text: "The hard part is usually not qualifying. It is knowing what exists in the first place. Here is a quick tour of the main programs, with pointers to a deeper guide on each.",
      },
      {
        type: "h2",
        text: "Health coverage when money is tight",
      },
      {
        type: "p",
        text: "**Medicaid** is free or low-cost health insurance for people with lower incomes. It can cover doctor visits, hospital stays, prescriptions, and care for kids. If you can't afford private insurance and don't get it through a job, Medicaid is often the answer, and children in many families qualify even when the parents don't. [Medicaid and Low-Cost Health Coverage](/learn/government-aid/medicaid-explained) explains who qualifies and how to apply.",
      },
      {
        type: "h2",
        text: "Help putting food on the table",
      },
      {
        type: "p",
        text: "**SNAP**, sometimes still called food stamps, helps you buy groceries. The money lands on a card that works like a debit card at the store. It is meant to stretch a tight food budget so you are not choosing between dinner and the electric bill. [SNAP (Food Assistance), Explained](/learn/government-aid/snap-explained) covers the details, and there are also programs focused on pregnant people, babies, and young children that add food help and nutrition support.",
      },
      {
        type: "h2",
        text: "Money when you lose a job",
      },
      {
        type: "p",
        text: "**Unemployment insurance** gives you temporary income if you lose a job through no fault of your own, like a layoff. You get a portion of your old paycheck for a limited time while you look for new work. It is insurance you paid into, not charity, so file as soon as the job ends. Waiting only delays the money. [How to Apply for Unemployment](/learn/government-aid/applying-for-unemployment) walks through the process.",
      },
      {
        type: "h2",
        text: "Help with rent, heat, and the basics",
      },
      {
        type: "p",
        text: "There are programs that help cover rent, heating and cooling bills, and phone or internet service. Some are run by your state, some by your county, and some by local nonprofits. They often have different names from place to place, so the trick is knowing they exist and asking. [Help With Utilities and Rent](/learn/government-aid/utility-rent-assistance) covers what to look for and the one phone number that can find it all.",
      },
      {
        type: "tip",
        text: "A single benefits screener can check you against dozens of programs at once. Search for your state's benefits website, or try a free national screener, and answer the questions honestly. It takes a few minutes and can surface help you didn't know you qualified for.",
      },
      {
        type: "key",
        text: "Most programs care about your current income and household size, not your past, your credit, or your pride. If your situation changed recently, like a lost job or a new baby, you may qualify now even if you didn't before.",
      },
      {
        type: "p",
        text: "You do not have to wait until you are in crisis to look. Checking what you qualify for is free, private, and smart. Once you know your options, the next step is applying, which is more doable than it looks.",
      },
    ],
    related: ["how-to-apply-for-benefits", "immigrants-and-benefits", "wic-school-meals"],
  },
  {
    slug: "how-to-apply-for-benefits",
    order: 20,
    topicId: "government-aid",
    title: "How to Actually Apply",
    dek: "Applications can feel like a wall of forms. Here's how to get through them without losing your weekend or your patience.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Most benefits are applied for through your state, not the federal government, so start at your state's website.",
      "Gathering a few documents up front makes every application faster and less stressful.",
      "If you're denied, you can appeal. A denial is often a paperwork problem, not a final answer.",
    ],
    body: [
      {
        type: "p",
        text: "Applying for benefits has a reputation for being a nightmare of forms and phone trees. Some of that is fair. But a little preparation turns a frustrating process into a series of small, finishable steps. You do not need to do it all in one sitting. (If you haven't yet figured out which programs fit your situation, start with [Benefits You May Qualify For](/learn/government-aid/benefits-you-qualify-for), then come back here.)",
      },
      {
        type: "h2",
        text: "Start in the right place",
      },
      {
        type: "p",
        text: "Even though many programs are funded federally, you usually apply through your state or county. For health coverage like Medicaid and grocery help like SNAP, your state runs the application. The cleanest starting point is your state's official benefits or human services website. For unemployment insurance, look for your state's labor or workforce agency.",
      },
      {
        type: "tip",
        text: "Stick to official sites that end in .gov. If a website asks you to pay a fee to apply for a government benefit, close the tab. Applying is always free. Anyone charging you is either a scam or selling something you don't need.",
      },
      {
        type: "h2",
        text: "Gather your documents first",
      },
      {
        type: "p",
        text: "Almost every application asks for the same handful of things. Pulling them together before you start means you won't have to abandon the form halfway through to dig for a pay stub.",
      },
      {
        type: "list",
        items: [
          "A photo ID for the adults in your household",
          "Social Security numbers for the people applying",
          "Proof of income, like recent pay stubs or a benefits letter",
          "Proof of where you live, like a lease or a utility bill",
          "Rough monthly costs for rent, utilities, and childcare",
        ],
      },
      {
        type: "h2",
        text: "Work through the application",
      },
      {
        type: "steps",
        items: [
          "Find your state's official benefits website and create an account so you can save your progress.",
          "Fill out the form honestly, listing everyone in your household and your real income.",
          "Upload or mail copies of your documents, keeping the originals for yourself.",
          "Submit, then write down your confirmation number and the date.",
          "Watch your mail and email closely. Many programs require an interview or ask for one more document.",
        ],
      },
      {
        type: "key",
        text: "Answer every request for information by the deadline they give you. The most common reason people lose benefits they actually qualify for is a missed letter or an unreturned call, not a real disqualification.",
      },
      {
        type: "h2",
        text: "If you get denied",
      },
      {
        type: "p",
        text: "A denial is not the end of the road. Read the letter carefully, because it has to tell you why you were denied and how to appeal. Often the problem is small, like a missing pay stub or a number that didn't match. You have the right to appeal, and many appeals succeed once the paperwork is fixed. If you feel stuck, a local legal aid office can help you for free.",
      },
      {
        type: "p",
        text: "Take it one form at a time. The effort of applying is small next to the relief of having coverage, groceries, or income while you get back on your feet.",
      },
    ],
    related: ["benefits-you-qualify-for", "snap-explained", "medicaid-explained"],
  },
  {
    slug: "what-is-debt-relief",
    order: 80,
    topicId: "government-aid",
    title: "What 'Debt Relief' Really Means",
    dek: "The phrase gets thrown around by ads and scammers alike. Here's what it covers, and which guide to read for each path.",
    level: "Beginner",
    readMinutes: 3,
    takeaways: [
      "'Debt relief' is a broad umbrella, not one product. It covers anything that lowers, restructures, or erases what you owe.",
      "The main paths: credit counseling, consolidation, settlement, negotiating yourself, and, as a last resort, bankruptcy.",
      "Before you pay any company a fee, talk to a nonprofit credit counselor. The first conversation is usually free.",
    ],
    body: [
      {
        type: "p",
        text: "If you've heard the phrase **debt relief** in a late-night ad or a robocall, you could be forgiven for thinking it's one specific product. It isn't. Debt relief is an umbrella term for anything that makes your debt easier to handle: lowering your interest rate, combining payments, settling for less than you owe, or in some cases having debt legally erased. Some of it is legitimate and useful. Some of it is a sales pitch. This article is a short map of the territory, with a pointer to the guide that covers each path in depth.",
      },
      {
        type: "h2",
        text: "The main paths, at a glance",
      },
      {
        type: "list",
        items: [
          "**Counseling, consolidation, and settlement.** The three formal routes companies offer. They sound alike and work very differently. [Debt Settlement vs. Consolidation vs. Counseling](/learn/government-aid/debt-relief-options) compares them and explains which to try first.",
          "**Negotiating it yourself.** You can often call a creditor and work out a lower rate, a payment plan, or a settlement with no company involved. [Negotiating and Restructuring Debt](/learn/government-aid/negotiating-debt) walks through the phone call.",
          "**Bankruptcy.** The legal reset for debt you genuinely cannot repay. [Bankruptcy, Explained Without Judgment](/learn/government-aid/bankruptcy-explained) covers how it works and when it makes sense.",
        ],
      },
      {
        type: "h2",
        text: "If you're worried about what happens next",
      },
      {
        type: "p",
        text: "Maybe you're not shopping for a fix yet. You're behind, and you're scared of what's coming. Two guides cover that side: [What Actually Happens If You Can't Pay Your Debts](/learn/government-aid/what-happens-if-you-dont-pay-debts) lays out the real timeline from a missed payment to, rarely, a courtroom, and [Your Rights When a Debt Collector Calls](/learn/government-aid/debt-collector-rights) covers the legal limits on collectors.",
      },
      {
        type: "h2",
        text: "One rule before you talk to anyone",
      },
      {
        type: "p",
        text: "The debt-relief industry has honest players and predators, and the predators advertise harder. Upfront fees, guaranteed results, and pressure to sign today are the big warning signs; [Avoiding Debt-Relief and 'Fix Your Credit Fast' Scams](/learn/government-aid/avoiding-debt-scams) covers them in detail.",
      },
      {
        type: "key",
        text: "Real help is honest about your options, including the ones that don't make them money. Before you sign anything or pay a fee, talk to a nonprofit credit counselor. The conversation is usually free, and it can save you from a company that would charge thousands to make things worse.",
      },
      {
        type: "p",
        text: "Debt relief is real, and it works for many people. Start with the guide that matches where you are. If you only read one, make it the comparison of the three formal paths.",
      },
    ],
    related: ["debt-relief-options", "negotiating-debt", "debt-payoff-roadmap"],
  },
  {
    slug: "income-driven-repayment",
    order: 150,
    topicId: "government-aid",
    title: "Income-Driven Student Loan Repayment",
    dek: "If your federal student loan payment feels impossible, tying it to your income can make it fit your real life.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Income-driven repayment sets your monthly federal student loan payment based on your income and family size, not on what you borrowed.",
      "When your income is low enough, your payment can drop dramatically, sometimes to nothing.",
      "These plans are only for federal student loans, and you have to apply and re-certify your income each year.",
    ],
    body: [
      {
        type: "p",
        text: "A student loan payment that swallows your paycheck is a common and stressful problem. **Income-driven repayment** is a set of federal plans built for exactly that. Instead of locking your payment to the size of your loan, these plans tie it to how much you earn and how many people are in your family. The point is to keep the payment livable.",
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "On a standard plan, your payment is whatever it takes to pay off the loan over a fixed number of years, no matter what you earn. Income-driven repayment flips that. It looks at your income and family size and asks you to pay only a slice of what's left after basic living costs. If you earn very little, your required payment can fall to a small amount, or even zero, for that year.",
      },
      {
        type: "p",
        text: "Here is a plain example. Two people owe the same amount. One earns a comfortable salary and one just lost most of their hours. On an income-driven plan, the person earning less pays less, because the payment follows the paycheck. The debt is the same, but the monthly burden is not.",
      },
      {
        type: "h2",
        text: "Who it's for",
      },
      {
        type: "p",
        text: "These plans are for **federal** student loans. Private student loans from a bank don't qualify, though some private lenders offer their own hardship options worth asking about. If you're not sure which kind you have, log in to the federal student aid website to see them listed, or read [Federal vs. Private Student Loans](/learn/college/federal-vs-private-loans) for the difference.",
      },
      {
        type: "key",
        text: "Income-driven plans only cover federal student loans. If you have private loans, call the lender directly and ask about hardship or reduced-payment options. They won't volunteer them, but many exist.",
      },
      {
        type: "h2",
        text: "The trade-offs to understand",
      },
      {
        type: "p",
        text: "A lower payment is a real relief, but know the strings. Stretching payments over more years can mean paying more interest in total. After a long period of qualifying payments, any remaining balance may be forgiven, though the rules around that change over time; [Student Loan Forgiveness Programs](/learn/government-aid/student-loan-forgiveness) covers how forgiveness works. And you have to re-certify your income every year, or your payment can jump back up.",
      },
      {
        type: "tip",
        text: "Set a yearly reminder to re-certify your income. Missing the re-certification is the most common way people get bumped off their plan and hit with a much higher payment they weren't expecting.",
      },
      {
        type: "h2",
        text: "How to start",
      },
      {
        type: "steps",
        items: [
          "Log in to the official federal student aid website and find your loan servicer.",
          "Use the income-driven repayment application there to compare plans and estimated payments.",
          "Submit the application with your income information.",
          "Mark your calendar to re-certify your income every year, on time.",
        ],
      },
      {
        type: "p",
        text: "If your payment doesn't fit your life, you don't have to white-knuckle it. Tying the payment to your income is a built-in, free option made for moments like this. For the bigger picture of life after graduation, from grace periods to picking a plan, see [Repaying Your Student Loans](/learn/college/repaying-student-loans).",
      },
    ],
    related: ["student-loan-forgiveness", "negotiating-debt"],
  },
  {
    slug: "negotiating-debt",
    order: 100,
    topicId: "government-aid",
    title: "Negotiating and Restructuring Debt",
    dek: "You have more room to negotiate than you think. Creditors often prefer a smaller, real payment over chasing nothing.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Creditors would rather collect something than nothing, which gives you real room to negotiate.",
      "You can ask for a lower interest rate, a payment plan, or a settlement for less than the full balance.",
      "Get any agreement in writing before you pay a cent, and understand the trade-offs first.",
    ],
    body: [
      {
        type: "p",
        text: "Many people assume the amount on a bill is fixed and final. Often it isn't. When a debt is hard to pay, creditors face a choice: work with you and collect something, or play hardball and risk collecting nothing. That choice is your leverage. You can negotiate, and you do not need to be an expert to try.",
      },
      {
        type: "h2",
        text: "What you can ask for",
      },
      {
        type: "p",
        text: "There is no single magic move. Negotiating debt is really a menu of requests, and which one fits depends on whether you can pay something now, need lower payments over time, or are truly underwater.",
      },
      {
        type: "list",
        items: [
          "A lower interest rate, which shrinks how much the debt grows each month.",
          "A hardship or payment plan that spreads what you owe into smaller, steadier amounts.",
          "A settlement, where the creditor agrees to call the debt paid for less than the full balance.",
          "A pause or deferral, which buys time during a short-term crisis like a job loss.",
        ],
      },
      {
        type: "h2",
        text: "How to make the call",
      },
      {
        type: "p",
        text: "Before you dial, get clear on your numbers: what you owe, what you can realistically pay, and what outcome you want. Then call and be honest. Explain your situation plainly, say what you can afford, and ask what they can do. Stay calm and polite. The person on the phone is more likely to help someone working with them than someone yelling at them. (If the debt has already been sold to a collection company, read up on [your rights when a collector calls](/learn/government-aid/debt-collector-rights) before you dial, and ask for proof of the debt first.)",
      },
      {
        type: "steps",
        items: [
          "Write down your balance, your income, and the most you can pay, as a lump sum or monthly.",
          "Call the creditor and ask for the hardship or collections department.",
          "Explain your situation honestly and state the specific arrangement you're hoping for.",
          "If they say no, ask politely whether a supervisor can review it.",
          "Get the final agreement in writing before you pay anything.",
        ],
      },
      {
        type: "key",
        text: "Never pay based on a verbal promise. Get the terms in writing, including the amount, the due dates, and a clear statement that the payment settles the debt. Without that paper, a 'settled' debt can come back to haunt you.",
      },
      {
        type: "h2",
        text: "Know the trade-offs",
      },
      {
        type: "p",
        text: "Settling a debt for less than you owe can ding your credit, and forgiven debt is sometimes treated as income at tax time. That doesn't make settlement a bad choice, especially if the alternative is never paying at all. It just means you should walk in with eyes open. If you're weighing whether to hire help instead of calling yourself, [Debt Settlement vs. Consolidation vs. Counseling](/learn/government-aid/debt-relief-options) compares the formal routes and their risks.",
      },
      {
        type: "tip",
        text: "Try one phone call before ever paying a company to negotiate for you. Plenty of people resolve a debt in a single honest conversation and keep the fees a settlement company would have charged.",
      },
      {
        type: "p",
        text: "Negotiating feels intimidating until you've done it once. Start with your hardest debt, make the call, and remember that the worst they can say is no, which leaves you no worse off than before you asked.",
      },
    ],
    related: ["debt-relief-options", "debt-collector-rights"],
  },
  {
    slug: "bankruptcy-explained",
    order: 170,
    topicId: "government-aid",
    title: "Bankruptcy, Explained Without Judgment",
    dek: "Bankruptcy is a legal tool for a fresh start, not a moral failure. Here's how it works in plain terms.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Bankruptcy is a legal process that erases or reorganizes debt you can't realistically repay, giving you a fresh start.",
      "Chapter 7 wipes out qualifying debts by selling non-essential assets; Chapter 13 sets up a repayment plan that lets you keep your property.",
      "It's a serious step with lasting effects, so talk to a bankruptcy attorney before deciding.",
    ],
    body: [
      {
        type: "p",
        text: "**Bankruptcy** carries a heavy stigma, but strip that away and it's just a legal process the law created on purpose: a structured way to deal with debt you genuinely cannot repay. People file after a job loss, a medical emergency, a divorce, or a business that didn't work out. Using a tool built into the law to get back on your feet is not a character flaw. It's a decision.",
      },
      {
        type: "p",
        text: "This is a plain overview, not legal advice. Bankruptcy has real and lasting consequences, so the goal here is to help you understand it well enough to ask good questions, not to decide alone.",
      },
      {
        type: "h2",
        text: "What bankruptcy does",
      },
      {
        type: "p",
        text: "At its core, bankruptcy hits pause and then resets. The moment you file, most collection efforts have to stop, which alone can be a huge relief if calls and lawsuits are piling up. From there, the process either erases certain debts or reorganizes them into a plan you can actually manage. For everyday people, two paths matter most.",
      },
      {
        type: "h2",
        text: "Chapter 7: the clean slate",
      },
      {
        type: "p",
        text: "**Chapter 7** is the version most people picture. It discharges, meaning legally erases, many common debts like credit cards and medical bills. In exchange, a court-appointed trustee can sell certain assets you own to pay creditors back a little, which is why it's called liquidation. In practice, the law protects a lot of basic property, so many filers keep their everyday belongings. It's typically faster and fits people with limited income and few assets.",
      },
      {
        type: "h2",
        text: "Chapter 13: the repayment plan",
      },
      {
        type: "p",
        text: "**Chapter 13** works differently. Instead of erasing debts right away, it sets up a repayment plan, usually three to five years, where you pay back some or all of what you owe out of your income. The big benefit is that you generally keep your property, including a house you're behind on, by catching up over time. It suits people with steady income who want to protect assets they'd lose under Chapter 7.",
      },
      {
        type: "key",
        text: "The simplest way to hold the two apart: Chapter 7 erases qualifying debt by potentially selling non-essential assets, while Chapter 13 lets you keep your stuff and pay back what you can over several years.",
      },
      {
        type: "h2",
        text: "What it won't do",
      },
      {
        type: "p",
        text: "Bankruptcy is powerful but not unlimited. Some debts usually survive it, including most student loans, recent taxes, and child support. It also stays on your credit report for years and will make borrowing harder for a while. That damage is real, but for many people it's less harmful than the slow bleed of debt they can never get ahead of.",
      },
      {
        type: "tip",
        text: "Most bankruptcy attorneys offer a free or low-cost first consultation. Use it. A good lawyer will tell you honestly whether bankruptcy is even your best move, and which chapter fits, before you commit to anything.",
      },
      {
        type: "h2",
        text: "Deciding whether it's right",
      },
      {
        type: "p",
        text: "Bankruptcy is usually the step you take after other options aren't enough, like [negotiating with your creditors](/learn/government-aid/negotiating-debt) or a repayment plan through a credit counselor. But waiting too long out of shame can cost you, draining savings or a retirement account that bankruptcy might have protected. If your debt is bigger than any realistic plan to repay it, talk to a qualified bankruptcy attorney sooner rather than later.",
      },
      {
        type: "p",
        text: "However you got here, the law gives you a path forward. A fresh start is something you're allowed to want.",
      },
    ],
    related: ["what-is-debt-relief", "negotiating-debt"],
  },
  {
    slug: "debt-collector-rights",
    order: 110,
    topicId: "government-aid",
    title: "Your Rights When a Debt Collector Calls",
    dek: "Collectors have to follow real rules. Knowing them changes the whole conversation.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Collectors can't harass, threaten, or lie to you. It's the law.",
      "You can demand written proof of a debt before you pay anything.",
      "You can't be arrested for owing ordinary consumer debt.",
      "Keep records, and report violations to the CFPB.",
    ],
    body: [
      {
        type: "p",
        text: "A debt collector's whole strategy is pressure: making you feel scared and alone so you'll pay without asking questions. What most people never learn is that a federal law, and often stronger state laws, puts hard limits on what collectors can do. Once you know those limits, the calls lose most of their power.",
      },
      {
        type: "h2",
        text: "What collectors are NOT allowed to do",
      },
      {
        type: "list",
        items: [
          "Call you before 8 a.m. or after 9 p.m., or blow up your phone to harass you.",
          "Threaten you, swear at you, or lie about what you owe.",
          "Pretend to be the police, a lawyer, or a government agency.",
          "Threaten to have you arrested. You can't be jailed for normal consumer debt.",
          "Tell your family, boss, or neighbors about your debt.",
        ],
      },
      {
        type: "h2",
        text: "What you have the right to do",
      },
      {
        type: "p",
        text: "You can demand a debt validation letter: written proof that you actually owe this debt, and how much. Ask for it before you pay a cent, because errors and outright scams are common. You can also tell a collector, in writing, to stop contacting you, and they have to comply. (After that, they can only reach out to confirm they're stopping or to say they're taking you to court.)",
      },
      {
        type: "tip",
        text: "Be careful with very old debt. In some cases, making even a small payment on a debt that's past its time limit can legally restart the clock on it. If a debt is ancient, get advice before you pay.",
      },
      {
        type: "key",
        text: "If a collector threatens to have you arrested or deported over a normal debt, they are breaking the law. Save the message, write down the details, and report them to the Consumer Financial Protection Bureau and your state attorney general.",
      },
      {
        type: "p",
        text: "Owing money is stressful, but it doesn't make you powerless or a criminal. Get everything in writing and keep notes on every call. When you're ready to resolve the debt on your terms, [Negotiating and Restructuring Debt](/learn/government-aid/negotiating-debt) walks through the conversation, and [What Actually Happens If You Can't Pay Your Debts](/learn/government-aid/what-happens-if-you-dont-pay-debts) explains the real timeline if you can't pay at all.",
      },
    ],
    related: ["what-happens-if-you-dont-pay-debts", "negotiating-debt", "collections-explained"],
    quiz: [
      {
        question: "A collector threatens to have you arrested over an unpaid credit card. What's true?",
        options: [
          "It's a real risk you should take seriously",
          "That threat is illegal; you can't be arrested for ordinary consumer debt",
          "It's legal as long as they warn you in writing first",
        ],
        answer: 1,
        explain:
          "You can't be jailed for normal consumer debt, and a collector who threatens arrest is breaking the law. Save the message and report them to the CFPB and your state attorney general.",
      },
      {
        question: "Before paying a collector anything, what can you demand?",
        options: [
          "A debt validation letter: written proof you owe the debt, and how much",
          "A discount of at least half the balance",
          "A phone call from the original lender",
        ],
        answer: 0,
        explain:
          "You have the right to written proof before you pay a cent, and it's worth using because errors and outright scams are common.",
      },
      {
        question: "Why be careful before making even a small payment on a very old debt?",
        options: [
          "Small payments make collectors call more often",
          "Partial payments hurt your credit more than no payments",
          "It can legally restart the clock on a debt that's past its time limit",
        ],
        answer: 2,
        explain:
          "In some cases, paying even a little on a debt past its time limit restarts it legally. If a debt is ancient, get advice before you pay anything.",
      },
    ],
  },
  {
    slug: "immigrants-and-benefits",
    order: 70,
    topicId: "government-aid",
    title: "Immigrants and Public Benefits: Separating Fear From Facts",
    dek: "Many families skip help they're entitled to out of fear. Here's the calm, honest picture.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Fear, not the rules, keeps many families from help they qualify for.",
      "'Public charge' doesn't apply to everyone, and doesn't count most benefits.",
      "Benefits your U.S.-citizen kids use generally don't count against you.",
      "This is a topic for a real expert, and free experts exist.",
    ],
    body: [
      {
        type: "p",
        text: "A lot of immigrant families go without food assistance, health coverage, or school programs they legally qualify for. Often the reason isn't the rules. It's the fear that using help could hurt their immigration case. Some of that fear is reasonable caution, and some of it is confusion that costs families dearly. This article separates the two, carefully. (For a plain rundown of what exists, start with [Benefits You May Qualify For](/learn/government-aid/benefits-you-qualify-for).)",
      },
      {
        type: "h2",
        text: "What 'public charge' actually is",
      },
      {
        type: "p",
        text: "Public charge is a test used in *some* immigration applications, like applying for a green card, that asks whether someone is likely to depend on the government. The key thing people miss: it does not apply to everyone. Many people aren't subject to it at all, including refugees and asylees, many green-card renewals, and citizenship applications.",
      },
      {
        type: "h2",
        text: "What usually does NOT count",
      },
      {
        type: "p",
        text: "Even when public charge does apply, a lot of help is not counted against you. Things commonly excluded include emergency medical care, disaster relief, school meals, WIC, children's health programs, and, importantly, benefits used by your U.S.-citizen children. Using help your kids qualify for generally does not hurt your case.",
      },
      {
        type: "tip",
        text: "Find free, accredited immigration legal help. Nonprofit legal aid organizations exist in most areas. Avoid 'notarios,' who are not lawyers and have steered many families wrong. A short consultation can replace a lot of fear with facts.",
      },
      {
        type: "key",
        text: "Please treat this article as a starting point, not legal advice. Public-charge rules are narrower than rumors suggest, but they've changed over the years and your specific situation is unique. Before deciding to skip a benefit, talk to a qualified immigration attorney or nonprofit, not a rumor, a neighbor, or a notario.",
      },
      {
        type: "p",
        text: "This article can't tell you what to do. What it can do is make sure fear and misinformation don't quietly take food off your table or keep your kids from a doctor when the rules may be on your side. Get real facts for your situation, then decide.",
      },
    ],
    related: ["benefits-you-qualify-for", "how-to-apply-for-benefits", "snap-explained"],
  },
];
