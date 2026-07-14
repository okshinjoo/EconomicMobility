import type { Article } from "./types";

export const governmentAidExtraArticles: Article[] = [
  {
    slug: "snap-explained",
    order: 30,
    topicId: "government-aid",
    title: "SNAP (Food Assistance), Explained",
    dek: "Help buying groceries is a benefit you've likely already paid into. Here's how it works and how to apply.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "SNAP puts money on a card you use like debit at the grocery store.",
      "Eligibility depends on your income and household size; many working people qualify.",
      "Applying is free, and you never pay anyone to do it for you.",
      "Using it is normal and smart, not something to hide.",
    ],
    body: [
      {
        type: "p",
        text: "Maybe your hours got cut. Maybe you're a student stretching a tiny budget, or a parent doing the math on groceries again at the register. Whatever brought you here, know this up front: SNAP exists *for* this. It's one of the most ordinary, widely used programs in the country, and needing it doesn't say anything bad about you.",
      },
      {
        type: "p",
        text: "SNAP stands for Supplemental Nutrition Assistance Program, though most people still call it food stamps. The short version: it helps you afford groceries. Here's what it covers, who qualifies, and how to apply.",
      },
      {
        type: "h2",
        text: "What SNAP actually is",
      },
      {
        type: "p",
        text: "SNAP loads money onto a card called an EBT card each month. You swipe it at the grocery store like a debit card, and it covers most food: produce, meat, bread, dairy, snacks, even seeds to grow food. It doesn't cover things like alcohol, hot prepared meals, or non-food items, but for filling your fridge, it works almost everywhere groceries are sold.",
      },
      {
        type: "key",
        text: "SNAP isn't a handout you have to feel small about. It's a public program funded by taxes, including ones taken out of your own paychecks. Using it is accepting help that was built for exactly your situation.",
      },
      {
        type: "h2",
        text: "Who qualifies",
      },
      {
        type: "p",
        text: "This surprises a lot of people: you don't have to be unemployed or have zero income. Plenty of folks who work full time still qualify, especially with kids or high rent. As a rough federal baseline, most households need a gross income under **130% of the poverty line**, which works out to about **$2,890 a month** (roughly **$34,700 a year**) for a household of three, and higher for bigger families. Many states set the cutoff *higher* than that, so don't rule yourself out based on a number a friend mentioned.",
      },
      {
        type: "tip",
        text: "Not sure if you'd qualify? Use the free benefit finder at USA.gov, or call 211. It takes a few minutes, costs nothing, and commits you to nothing.",
      },
      {
        type: "h2",
        text: "How to apply",
      },
      {
        type: "p",
        text: "You apply through your state's SNAP or human-services agency, not the federal government directly. The basic path looks like this:",
      },
      {
        type: "steps",
        items: [
          "Find your state's SNAP office online (search your state name plus 'SNAP apply') or start with the benefit finder at USA.gov.",
          "Fill out the application, online, by mail, or in person. Gather ID, proof of income like pay stubs, and your rent and utility costs.",
          "Do a short interview, usually by phone, where a caseworker confirms your details.",
          "Wait for the decision. If approved, your EBT card arrives in the mail, and you'll reapply periodically to keep it.",
        ],
      },
      {
        type: "p",
        text: "If English isn't your first language, you have the right to a free interpreter, so ask for one. And a note for immigrant families: worry about immigration status keeps many people from applying for benefits their *citizen children* clearly qualify for. Before you assume the answer is no, read [Immigrants and Public Benefits](/learn/government-aid/immigrants-and-benefits), which separates the facts from the fear.",
      },
      {
        type: "tip",
        text: "Nobody legitimate ever charges you to apply for SNAP. If someone asks for a fee to 'sign you up' or 'speed up' your benefits, walk away. It's a scam.",
      },
      {
        type: "p",
        text: "Applying for SNAP is just you using a tool that's there for everyone. It costs nothing but time, and the worst outcome is a no that leaves you exactly where you started. Check the limits where you live, gather your pay stubs, and start the application.",
      },
    ],
    related: ["benefits-you-qualify-for", "how-to-apply-for-benefits", "immigrants-and-benefits", "wic-school-meals"],
    quiz: [
      {
        question: "How do you actually use SNAP benefits at the store?",
        options: [
          "You trade paper vouchers for approved foods",
          "Money loads onto an EBT card you swipe like a debit card",
          "The store bills the government after you check out",
        ],
        answer: 1,
        explain:
          "SNAP loads money onto an EBT card each month, and you use it like a debit card for most groceries. It doesn't cover things like alcohol, hot prepared meals, or non-food items.",
      },
      {
        question: "Do you have to be unemployed to qualify for SNAP?",
        options: [
          "Yes, SNAP is only for people with no income",
          "No; plenty of people who work full time still qualify",
          "Only if you have children at home",
        ],
        answer: 1,
        explain:
          "Eligibility depends on income and household size. The rough federal baseline is a gross income under 130% of the poverty line, and many states set their cutoff even higher.",
      },
      {
        question: "Someone offers to sign you up for SNAP for a $40 fee. What is that?",
        options: [
          "A normal expedited application service",
          "A processing fee some states charge",
          "A scam; applying for SNAP is always free",
        ],
        answer: 2,
        explain:
          "Nobody legitimate ever charges you to apply for SNAP. You apply for free through your state's SNAP agency, and screening tools like USA.gov's benefit finder cost nothing too.",
      },
    ],
  },

  {
    slug: "medicaid-explained",
    order: 40,
    topicId: "government-aid",
    title: "Medicaid and Low-Cost Health Coverage",
    dek: "If you can't afford health insurance, there's a good chance you qualify for coverage that costs little or nothing.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Medicaid is free or very low-cost health coverage based on your income.",
      "Even if you don't qualify for Medicaid, marketplace subsidies can slash your premium.",
      "Kids often qualify even when parents don't, through CHIP.",
      "Coverage protects you from the bills that quietly cause bankruptcies.",
    ],
    body: [
      {
        type: "p",
        text: "Going without health insurance feels like a gamble you can win, right up until you can't. One bad fall, one infection that won't quit, one surprise diagnosis, and suddenly you're staring at a bill with a number that doesn't feel real. If money is tight, though, you may qualify for coverage that costs little or nothing, and far more people are eligible than realize it.",
      },
      {
        type: "h2",
        text: "What Medicaid is",
      },
      {
        type: "p",
        text: "Medicaid is health coverage run jointly by the federal government and each state, built for people with lower incomes. When you qualify, it covers the big stuff: doctor visits, hospital stays, prescriptions, emergencies, often dental and vision. There's no monthly premium for most people who qualify.",
      },
      {
        type: "p",
        text: "Because states run their own versions, the name and the rules vary by state. Some states cover more people than others, and eligibility depends on your income and household size. So the only way to know your real answer is to check where *you* live.",
      },
      {
        type: "key",
        text: "Medicaid exists so that being low on money doesn't mean going without a doctor. It's coverage you're entitled to when you qualify, not charity, and not something to be embarrassed about pulling out at the pharmacy.",
      },
      {
        type: "h2",
        text: "If you don't qualify for Medicaid",
      },
      {
        type: "p",
        text: "Earn a little too much for Medicaid? You're not out of options. Through the health insurance marketplace, the government often pays part of your monthly premium based on your income. The extra-generous pandemic-era subsidies ended after 2025, so plans cost more than they did a couple of years ago, but the income-based help is still real and can cut the price substantially. (If words like premium and deductible are still fuzzy, [Health Insurance, Explained](/learn/insurance/health-insurance-explained) covers how coverage works piece by piece.)",
      },
      {
        type: "tip",
        text: "Don't guess your premium from the sticker price online before subsidies are applied. The number most people actually pay is far lower. Run your real income through the marketplace to see *your* price.",
      },
      {
        type: "h2",
        text: "Coverage for kids: CHIP",
      },
      {
        type: "p",
        text: "Here's something parents miss all the time: even if you don't qualify for Medicaid, your children often still do, through a program called CHIP (the Children's Health Insurance Program). It covers checkups, shots, dental, and more at low or no cost. If you're skipping your own coverage, please at least check your kids' eligibility.",
      },
      {
        type: "h2",
        text: "How to apply",
      },
      {
        type: "steps",
        items: [
          "Start at HealthCare.gov or your state's marketplace. One application checks you for both Medicaid and subsidized plans.",
          "Gather income proof, household details, and immigration documents if they apply to you.",
          "Submit and get matched. If you qualify for Medicaid, you can usually enroll any time of year.",
          "Need help? A free, certified 'navigator' or assister can walk you through it. You never pay for this.",
        ],
      },
      {
        type: "p",
        text: "For immigrant families, eligibility rules can be genuinely confusing, and fear sometimes keeps people from applying for coverage their family qualifies for. If that's you, get accurate information from a navigator or a trusted clinic before deciding the answer is no.",
      },
      {
        type: "p",
        text: "Health coverage isn't a luxury for 'later, when things settle down.' It's what keeps one bad week from turning into years of debt. Set aside an hour, run your income through the marketplace, and find out what you qualify for.",
      },
    ],
    related: ["benefits-you-qualify-for", "immigrants-and-benefits", "how-to-apply-for-benefits"],
  },

  {
    slug: "applying-for-unemployment",
    order: 50,
    topicId: "government-aid",
    title: "How to Apply for Unemployment",
    dek: "Losing a job is stressful enough. Here's how to claim the benefits you've been paying into, without the process tripping you up.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Unemployment replaces part of your income while you look for work.",
      "It's funded by employer taxes; you earned access to it by working.",
      "Apply right away; benefits usually start from when you file, not when you lost the job.",
      "Most people just need their work history, ID, and a little patience.",
    ],
    body: [
      {
        type: "p",
        text: "Getting laid off, or having your hours vanish, can knock the wind out of you, financially and otherwise. Before the panic sets in, here's something steadying: unemployment insurance exists for this exact moment, and if you've been working, you've almost certainly been paying into it. Claiming it isn't begging. It's collecting on something you earned.",
      },
      {
        type: "h2",
        text: "What unemployment is",
      },
      {
        type: "p",
        text: "Unemployment insurance gives you a portion of your old paycheck (a chunk, not the whole thing) for a limited stretch of weeks while you search for a new job. It's meant to keep a roof over your head and food on the table during the gap, so a job loss doesn't snowball into losing everything.",
      },
      {
        type: "key",
        text: "Unemployment is funded mainly by taxes your employers paid on your wages. The safety net was built and paid for on your behalf, for situations exactly like this one.",
      },
      {
        type: "h2",
        text: "Who can usually claim it",
      },
      {
        type: "p",
        text: "The general idea: you lost your job through no fault of your own (a layoff, a closure, reduced hours) and you're able and available to work. Quitting without a good cause or being fired for serious misconduct can complicate things, but don't disqualify yourself in your head. The rules vary by state, and there are more exceptions than people assume.",
      },
      {
        type: "tip",
        text: "Apply the same week your job ends, even if you're not sure you qualify. Benefits usually run from your filing date forward, so waiting 'until things calm down' can cost you weeks of money you'll never get back.",
      },
      {
        type: "h2",
        text: "How to apply",
      },
      {
        type: "steps",
        items: [
          "Find your state's unemployment office online (search your state name plus 'unemployment'). You file with your state, not the federal government.",
          "Gather your info: ID, Social Security number, dates and pay from recent jobs, and your former employer's details.",
          "File your claim online or by phone, then watch for any required next steps like confirming your identity.",
          "Keep certifying. Most states make you check in weekly or biweekly to confirm you're still looking for work and to keep payments coming.",
        ],
      },
      {
        type: "p",
        text: "A heads-up so it doesn't rattle you: the systems can be slow, the websites clunky, and the first payment may take a few weeks. That's frustratingly normal. File anyway, keep your confirmation numbers, and follow up if you hear nothing.",
      },
      {
        type: "tip",
        text: "If your claim gets denied and you believe it's wrong, you can appeal, and people win appeals all the time. A denial is not always the final word.",
      },
      {
        type: "p",
        text: "While the benefits come in, treat them as breathing room, not a finish line. Trim your budget to the essentials, look into other help like [SNAP](/learn/government-aid/snap-explained) if you need it, and use the time to land somewhere better. You paid into this cushion. Let it do its job.",
      },
    ],
    related: ["benefits-you-qualify-for", "snap-explained", "how-to-apply-for-benefits"],
  },

  {
    slug: "debt-relief-options",
    order: 90,
    topicId: "government-aid",
    title: "Debt Settlement vs. Consolidation vs. Counseling",
    dek: "Three things that sound alike, do very different things, and aren't equally trustworthy. Here's how to tell them apart.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Counseling is advice and a plan; consolidation is one new loan; settlement is paying less than you owe.",
      "Nonprofit credit counseling is the safest place to start, and often free.",
      "Settlement can wreck your credit and comes with real risks.",
      "The legitimate help rarely charges big upfront fees.",
    ],
    body: [
      {
        type: "p",
        text: "When debt gets overwhelming, the internet fills up with companies promising to fix it. They throw around words like *settlement*, *consolidation*, and *counseling* almost interchangeably, but these are three very different things, with very different risks. Knowing which is which is how you avoid trading one problem for a worse one.",
      },
      {
        type: "h2",
        text: "Credit counseling: advice and a plan",
      },
      {
        type: "p",
        text: "Credit counseling is the gentlest option, and usually the best first stop. You sit down (often by phone or online) with a counselor at a nonprofit agency who reviews your whole financial picture for free and helps you build a plan. If it makes sense, they may set up a *debt management plan*: you make one monthly payment to them, and they distribute it to your creditors, often at a lower interest rate they negotiated.",
      },
      {
        type: "tip",
        text: "Look specifically for *nonprofit* credit counseling. Reputable agencies will talk to you for free, won't pressure you, and are upfront about any small fees. The National Foundation for Credit Counseling is a well-known place to find one.",
      },
      {
        type: "h2",
        text: "Debt consolidation: one new loan",
      },
      {
        type: "p",
        text: "Consolidation means rolling several debts into a single new loan or balance, ideally at a lower interest rate. Instead of juggling five credit-card payments, you make one. Done right, with a genuinely lower rate and the discipline not to run the cards back up, it can save money and simplify your life. Done wrong, you just move the debt around, keep the high rate, and add fees.",
      },
      {
        type: "p",
        text: "Consolidation is a tool, not a cure. It helps when the new loan genuinely costs less and you've fixed what caused the debt. It hurts when it becomes a way to ignore the underlying problem.",
      },
      {
        type: "h2",
        text: "Debt settlement: paying less than you owe",
      },
      {
        type: "p",
        text: "Settlement is the aggressive one. The idea is to negotiate with creditors to accept *less* than the full balance (say, paying $6,000 to clear $10,000). It can work, but the risks are serious, and for-profit settlement companies are where a lot of people get burned:",
      },
      {
        type: "list",
        items: [
          "Your credit can take a heavy hit, often because they tell you to *stop paying* your debts while they negotiate.",
          "Late fees and interest can pile up during that silence, and creditors can sue you.",
          "Forgiven debt can count as taxable income.",
          "Many companies charge hefty fees and can't actually guarantee the results they imply.",
        ],
      },
      {
        type: "p",
        text: "You can also negotiate a settlement yourself, directly with the creditor, before paying anyone to do it. [Negotiating and Restructuring Debt](/learn/government-aid/negotiating-debt) walks through that phone call step by step.",
      },
      {
        type: "key",
        text: "Start with nonprofit credit counseling before you ever pay a for-profit company. A free counselor can lay out your real options, including ones that don't trash your credit, without anything to sell you.",
      },
      {
        type: "p",
        text: "One thing to carry across all three: legitimate help doesn't demand big fees up front, guarantee results, or pressure you to sign today. The warning signs are covered in detail in [Avoiding Debt-Relief and 'Fix Your Credit Fast' Scams](/learn/government-aid/avoiding-debt-scams).",
      },
      {
        type: "p",
        text: "Debt feels isolating, but you have more legitimate, low-cost options than the ads suggest. Start with free nonprofit counseling, understand which path you're actually on, and you'll make a calmer, smarter call than any high-pressure pitch wants you to.",
      },
    ],
    related: ["what-is-debt-relief", "negotiating-debt", "avoiding-debt-scams", "debt-payoff-roadmap"],
  },

  {
    slug: "avoiding-debt-scams",
    order: 140,
    topicId: "government-aid",
    title: "Avoiding Debt-Relief and 'Fix Your Credit Fast' Scams",
    dek: "Scammers hunt people who are stressed about money. Here's how to spot them before they take what little cushion you have.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Scammers target people in debt because they're hopeful and hurried.",
      "Upfront fees, guarantees, and pressure are the three biggest red flags.",
      "Nobody can legally remove accurate, negative info from your credit report.",
      "Real help, like nonprofit counseling and the CFPB, is free or low-cost.",
    ],
    body: [
      {
        type: "p",
        text: "When you're behind on bills, you become a target. Scammers know that worry makes people hopeful and quick to trust, so they flood the ads, the texts, and the robocalls with promises to make your debt disappear. The cruelest part is who they hit: people who can least afford to lose another dollar. This guide covers the scams aimed specifically at people in debt. For the general anatomy of scams (fake texts, impostor calls, phony prizes), see [How to Spot a Scam Before It Costs You](/learn/money-safety/how-to-spot-a-scam).",
      },
      {
        type: "h2",
        text: "The three red flags that catch most scams",
      },
      {
        type: "p",
        text: "You don't need to memorize a hundred schemes. Almost all of them wave at least one of these flags:",
      },
      {
        type: "list",
        items: [
          "**Upfront fees.** They want money *before* doing anything real. Legitimate help generally gets paid as it delivers, not for a promise.",
          "**Guarantees.** 'We'll erase your debt.' 'We'll boost your score 100 points.' Nobody can promise those outcomes honestly.",
          "**Pressure.** 'This offer ends today.' 'Sign now.' Urgency is a tactic to stop you from thinking or checking them out.",
        ],
      },
      {
        type: "key",
        text: "If a company asks for a big payment up front, *guarantees* a result, and *pressures* you to decide right now, that's not one yellow flag. It's three red ones. Hang up.",
      },
      {
        type: "h2",
        text: "The 'fix your credit fast' lie",
      },
      {
        type: "p",
        text: "A whole industry promises to magically repair your credit for a fee. What they don't say out loud: no one can legally remove accurate negative information from your credit report. Late payments and other true marks fade with time and good habits; they can't be deleted on demand. Anything you can pay a 'credit repair' company to do, you can do yourself for free, including disputing genuine errors.",
      },
      {
        type: "tip",
        text: "You can dispute real mistakes on your credit report yourself, at no cost, directly with the credit bureaus. The CFPB (Consumer Financial Protection Bureau) has free, plain-language guides on exactly how.",
      },
      {
        type: "h2",
        text: "Other moves scammers love",
      },
      {
        type: "list",
        items: [
          "Telling you to **stop all contact with your creditors** and route everything through them, which can leave you blindsided by lawsuits.",
          "Claiming to represent a **special government program** that they alone can get you into. Real government help you find yourself, for free.",
          "Asking you to **pay by gift card, wire, or crypto**. An untraceable payment is a giant tell.",
          "Pushing you to **borrow against your home or retirement** to pay off other debt without explaining the danger.",
        ],
      },
      {
        type: "h2",
        text: "Where the real help is",
      },
      {
        type: "p",
        text: "The legitimate stuff is quieter and cheaper than the scams shouting at you. Before you trust anyone, slow down and start here:",
      },
      {
        type: "steps",
        items: [
          "Talk to a **nonprofit credit counselor** (often free, never high-pressure). [Debt Settlement vs. Consolidation vs. Counseling](/learn/government-aid/debt-relief-options) explains what they do.",
          "Read up at the **CFPB** and the **FTC**, which publish straightforward, no-cost guidance.",
          "Look up any company's name plus the word 'complaint' or 'scam' before paying a cent.",
          "If something feels off, it's okay to simply walk away. Real help will still be there tomorrow.",
        ],
      },
      {
        type: "p",
        text: "Trust that instinct in your gut. The honest options for getting out of debt don't need to rush you, guarantee you the moon, or take your money before they've earned it. Anyone who does is the problem you're trying to escape, not the solution.",
      },
    ],
    related: ["debt-relief-options", "what-is-debt-relief", "debt-collector-rights"],
  },

  {
    slug: "student-loan-forgiveness",
    order: 160,
    topicId: "government-aid",
    title: "Student Loan Forgiveness Programs",
    dek: "PSLF, forgiveness through income-driven plans, and the rest, in plain terms, with one big warning: always check the official source.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Forgiveness wipes out remaining federal loan debt after you meet a program's rules.",
      "PSLF rewards public-service and nonprofit careers after years of payments.",
      "Income-driven plans can forgive what's left after a long repayment period.",
      "Rules change constantly. Always verify on the official federal student aid site.",
    ],
    body: [
      {
        type: "p",
        text: "Student loan forgiveness sounds almost too good to be true, and the confusion around it is real: the programs are genuine, but the rules are detailed and they change often. Before anything else, the single most important habit is to verify everything on the official federal student aid site (StudentAid.gov), not on a random blog, a forwarded text, or a company that called you.",
      },
      {
        type: "p",
        text: "With that anchor in place, here's the plain-language map of the main programs, so you at least know what to look up.",
      },
      {
        type: "h2",
        text: "First, the ground rules",
      },
      {
        type: "p",
        text: "Forgiveness means the government cancels the remaining balance on your loans once you've met a program's requirements. Two big things to know up front: these programs are generally for *federal* student loans, not private ones, and the specifics (who qualifies, how many payments, which plans count) shift with policy. So treat everything below as a starting point to confirm, not as fixed rules. If you're earlier in the process and just mapping out repayment, start with [Repaying Your Student Loans](/learn/college/repaying-student-loans).",
      },
      {
        type: "tip",
        text: "Log into StudentAid.gov to see exactly which loans you have and who services them. A surprising number of people don't know whether their loans are federal or private, and it changes everything about your options.",
      },
      {
        type: "h2",
        text: "Public Service Loan Forgiveness (PSLF)",
      },
      {
        type: "p",
        text: "PSLF is the headliner. The basic deal: if you work full time for a qualifying employer (government or many nonprofits) and make a set number of qualifying monthly payments on the right kind of plan (think years of them), the remaining federal balance can be forgiven. It's powerful for teachers, nurses, public-interest lawyers, social workers, and a lot of other public-service careers.",
      },
      {
        type: "p",
        text: "The catch is that the details trip people up: the wrong loan type, the wrong repayment plan, or a job that doesn't actually qualify can quietly cost you years of progress. That's exactly why you confirm your status as you go, not at the finish line.",
      },
      {
        type: "tip",
        text: "Certify your employment for PSLF *every year*, not just at the end. It's how you catch a problem while there's still time to fix it, instead of discovering at year ten that something didn't count.",
      },
      {
        type: "h2",
        text: "Forgiveness through income-driven repayment",
      },
      {
        type: "p",
        text: "Income-driven repayment (IDR) plans set your monthly payment based on what you earn ([Income-Driven Student Loan Repayment](/learn/government-aid/income-driven-repayment) explains how they work). After a long repayment period, these plans can forgive whatever balance remains. The years required are long, but for people whose debt is large relative to their income, it's a real path, and it doesn't require any particular employer the way PSLF does.",
      },
      {
        type: "h2",
        text: "Other programs worth a look",
      },
      {
        type: "list",
        items: [
          "**Teacher Loan Forgiveness** for teaching several years in certain low-income schools.",
          "**Profession-specific programs** for some nurses, doctors, and others who serve high-need areas.",
          "**Borrower defense and disability discharge** in specific situations, like a school that defrauded you or a total, lasting disability.",
        ],
      },
      {
        type: "key",
        text: "You never have to pay a company to apply for federal loan forgiveness. Applying is free through your loan servicer and StudentAid.gov. Anyone charging a fee to 'enroll' you in a forgiveness program is, at best, charging you for something you can do yourself.",
      },
      {
        type: "p",
        text: "This is genuinely complicated, and even careful people find it confusing, so don't take that as a sign you're not smart enough. Start at StudentAid.gov, find out what loans you actually have, and check the *current* rules there before acting. None of this is individualized legal or financial advice; it's the map you use to ask the right questions of the official source.",
      },
    ],
    related: ["income-driven-repayment", "avoiding-debt-scams"],
  },

  {
    slug: "utility-rent-assistance",
    order: 60,
    topicId: "government-aid",
    title: "Help With Utilities and Rent",
    dek: "Behind on the electric bill or scared of an eviction notice? There's real help for both, and one phone number that can find it for you.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "LIHEAP helps with heating and cooling bills based on your income.",
      "Emergency rental and utility assistance exists in many places. Ask early.",
      "Dialing 211 connects you to local help for nearly any need.",
      "Reaching out before you fall behind gives you the most options.",
    ],
    body: [
      {
        type: "p",
        text: "Few things feel scarier than a shut-off notice on the fridge or the threat of losing your home. If you're there right now, take a breath: there are real programs for both keeping your lights on and keeping your housing, and you don't have to find them all alone. The earlier you reach out, the more doors stay open.",
      },
      {
        type: "h2",
        text: "Help with utility bills: LIHEAP",
      },
      {
        type: "p",
        text: "LIHEAP, the Low Income Home Energy Assistance Program, helps households cover the cost of heating and cooling. Depending on where you live, it can help pay an energy bill, handle a crisis like an imminent shut-off, or even cover some weatherizing to lower your bills going forward. Eligibility depends on your income and household size, and how it works varies by state.",
      },
      {
        type: "tip",
        text: "Don't wait for the shut-off notice. Many utility companies also have their own hardship programs and payment plans, and they're far more flexible with customers who call *before* the account is in crisis.",
      },
      {
        type: "h2",
        text: "Help with rent",
      },
      {
        type: "p",
        text: "Rental assistance is patchier and depends heavily on where you live and what's funded at the moment, but it's worth pursuing hard. Depending on your area, you might find emergency rental assistance, local charities and faith groups that cover a month in a pinch, or programs that step in specifically to prevent an eviction.",
      },
      {
        type: "key",
        text: "If you ever get an eviction notice, don't ignore it and don't panic-move out. Many areas offer free legal aid for tenants, and reaching out the same day you get the notice gives you the best shot at staying or buying time.",
      },
      {
        type: "h2",
        text: "The one number that finds it all: 211",
      },
      {
        type: "p",
        text: "If you remember nothing else, remember this: you can call or text **211**, free and confidential, almost anywhere in the U.S. A real person helps you find local resources that fit your situation, from rent help to utility help to food. It's the single fastest way to cut through the confusion of who-helps-with-what.",
      },
      {
        type: "steps",
        items: [
          "Call or text 211, or visit 211.org, and tell them what you're facing.",
          "Use the benefit finder at USA.gov to screen for programs like LIHEAP you may qualify for.",
          "Contact your utility company directly to ask about hardship programs and payment plans.",
          "For housing, search for local rental assistance and free tenant legal aid in your city or county.",
        ],
      },
      {
        type: "p",
        text: "Asking for help with rent or utilities isn't a failure. These programs were built precisely so a rough stretch doesn't cost you your home or your power. Make the calls early, lean on 211 to do the searching, and if a benefits application is part of the answer, [How to Actually Apply](/learn/government-aid/how-to-apply-for-benefits) walks through the paperwork.",
      },
    ],
    related: ["benefits-you-qualify-for", "how-to-apply-for-benefits", "snap-explained", "free-legal-help"],
  },

  {
    slug: "payday-loans-and-predatory-lending",
    order: 120,
    topicId: "government-aid",
    title: "Payday Loans and Predatory Lending",
    dek: "These businesses cluster where money is tightest, because they make the most money when you're desperate.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "A payday loan's fee usually works out to a staggering yearly rate, often around 400%.",
      "The real trap is the 'rollover,' where you can't repay and the debt grows.",
      "Car-title loans, rent-to-own, and high-cost installment loans run the same play.",
      "Real alternatives exist: a credit union, a payment plan, 211, or your employer.",
    ],
    body: [
      {
        type: "p",
        text: "Notice how check-cashing places, payday lenders, and 'easy cash' storefronts seem to cluster in low-income and immigrant neighborhoods, not wealthy ones? That's not an accident. These businesses do their best business when people are stretched thin and out of options, when you need money *today* and the bank feels out of reach. That's an industry built to profit from a hard moment, not a verdict on how anyone handles money. Here's how it works, so it can't work on you.",
      },
      {
        type: "h2",
        text: "How a payday loan actually works",
      },
      {
        type: "p",
        text: "A payday loan is a small, short-term loan: you borrow a few hundred dollars and promise to pay it back on your next payday, usually in about two weeks. The fee sounds small at the counter, maybe $15 for every $100 you borrow. The problem is what that fee means once you stretch it out over a year.",
      },
      {
        type: "p",
        text: "That little fee translates into an *annual percentage rate* (APR) that's often around 400%. For comparison, even a high-interest credit card is usually under 30%. A payday loan is many times more expensive, not just a little worse.",
      },
      {
        type: "key",
        text: "A payday loan isn't really designed to be paid off in two weeks. It's designed to be *rolled over*, and that's where the trap snaps shut.",
      },
      {
        type: "p",
        text: "Here's the trap. When payday comes, most people can't spare the whole loan plus the fee. (That's the exact situation that sent them in.) So the lender lets you 'roll it over': pay just the fee and push the loan to next payday. You pay again, and the original debt hasn't moved an inch. Many people roll a single loan over and over, paying far more in fees than they ever borrowed, sinking deeper every two weeks while the balance just sits there.",
      },
      {
        type: "h2",
        text: "The cousins that run the same play",
      },
      {
        type: "p",
        text: "Payday loans have relatives that use the same playbook: a tempting offer up front, a punishing cost underneath.",
      },
      {
        type: "list",
        items: [
          "**Car-title loans.** You borrow against your car and hand over the title. Miss the payments and the lender can take your car, which may be the very thing you need to get to work. Losing it can cost you far more than the loan.",
          "**Rent-to-own.** You make weekly or monthly payments on furniture or electronics. By the time you own it, you've often paid several times what the item actually costs in a store.",
          "**High-cost installment loans.** Like a payday loan stretched over months instead of weeks. The longer term sounds gentler, but the sky-high rate means you can pay back double or more.",
        ],
      },
      {
        type: "p",
        text: "A softer-looking relative is the buy now, pay later button at checkout. It's nowhere near payday-loan territory, but it has its own fine print and its own ways of stacking up; [Buy Now, Pay Later: Read the Fine Print](/learn/credit/buy-now-pay-later) covers it.",
      },
      {
        type: "h2",
        text: "What to do instead",
      },
      {
        type: "p",
        text: "If you're staring down an urgent bill, you have [more options than the storefront wants you to believe](/learn/government-aid/need-cash-fast). Before you sign anything, try these:",
      },
      {
        type: "steps",
        items: [
          "**Ask a credit union about a small loan.** Many offer small-dollar or 'payday alternative' loans at a fraction of the cost. You usually have to be a member, but joining is often easy and cheap.",
          "**Call the creditor or utility and ask for a payment plan.** Phone, electric, and medical providers will often split a bill or push back a due date if you simply ask. Asking costs nothing.",
          "**Dial 211 for local emergency help.** It's a free, confidential line that connects you to local assistance for rent, utilities, and food. Sometimes the bill you're borrowing for can be covered outright.",
          "**Ask your employer about a paycheck advance.** Some workplaces will advance pay you've already earned, with no interest at all.",
        ],
      },
      {
        type: "tip",
        text: "Even some 'cash advance' or 'paycheck advance' apps that feel friendly can carry hidden costs: optional 'tips,' subscription fees, or instant-transfer charges that quietly add up to a high rate. Read what it actually costs before you rely on one.",
      },
      {
        type: "p",
        text: "Needing money fast doesn't make you irresponsible, but it does make you exactly the customer these lenders are built for. Knowing how the trap works, and that real alternatives exist, is how you keep one bad week from turning into months of debt.",
      },
    ],
    related: ["prioritizing-bills-when-money-is-tight", "avoiding-bank-fees", "what-is-debt-relief"],
  },

  {
    slug: "what-happens-if-you-dont-pay-debts",
    order: 130,
    topicId: "government-aid",
    title: "What Actually Happens If You Can't Pay Your Debts",
    dek: "The fear of the unknown makes debt scarier than it is. Here's the calm, factual version of what really happens.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Unpaid debt follows a slow, predictable path, not a sudden disaster.",
      "You have legal rights, and old debt eventually passes a time limit.",
      "The worst move is ignoring a court summons. Never do that.",
      "There are better paths long before things ever reach a courtroom.",
    ],
    body: [
      {
        type: "p",
        text: "When you can't pay a bill, your imagination usually fills in the worst: people showing up at your door, everything taken overnight, total catastrophe. That fear can be paralyzing, and it's usually scarier than the reality. So here is what happens, calmly and in order. Knowing the steps is how you stop being afraid of them.",
      },
      {
        type: "h2",
        text: "The path a missed payment takes",
      },
      {
        type: "p",
        text: "Debt trouble is a slow progression, not a single event, and each stage takes time. Here's the usual order of things:",
      },
      {
        type: "steps",
        items: [
          "**You miss a payment.** First come late fees, and after a stretch, a ding to your credit score.",
          "**It goes to collections.** After a while, the original lender may hand or sell the debt to a collection company, who then comes after it.",
          "**The creditor may sue.** For unpaid debt, a creditor or collector *can* take you to court. This is a possibility, not an instant or automatic step.",
          "**If they win, there's a judgment.** That's a court ruling that you owe the money, and it can open the door to collecting it more forcefully.",
        ],
      },
      {
        type: "p",
        text: "After a judgment, a creditor may be able to pursue *wage garnishment* (taking a portion of your paycheck) or a *bank levy* (pulling money from your account). That sounds frightening, so here's the reassuring part most people never hear.",
      },
      {
        type: "h2",
        text: "Two things that should make you breathe easier",
      },
      {
        type: "h3",
        text: "1. You have rights, and old debt loses its teeth",
      },
      {
        type: "p",
        text: "Debt collectors are not allowed to do whatever they want. The law sets real limits on how and when they can contact you and what they can say, and you can push back when they cross the line. [Your Rights When a Debt Collector Calls](/learn/government-aid/debt-collector-rights) spells out exactly what they can and can't do.",
      },
      {
        type: "p",
        text: "On top of that, debt doesn't stay suable forever. There's a *statute of limitations*, a time limit after which a creditor generally can't successfully sue you over an old debt. How long it lasts varies depending on where you live and the type of debt, so don't assume a number. The key idea is that very old debt loses much of its legal teeth.",
      },
      {
        type: "tip",
        text: "Some of your income and benefits are legally protected from garnishment. Certain government benefits, for example, often can't be taken. Don't assume everything you have is up for grabs; the law shields more than people expect.",
      },
      {
        type: "h3",
        text: "2. The single worst move: ignoring a court summons",
      },
      {
        type: "p",
        text: "If you ever receive legal papers, a court summons saying you're being sued, do *not* ignore them. This is the most important sentence in this whole article. When someone ignores a summons, the court can rule against them automatically, by *default*, simply because they never showed up to tell their side. People lose cases they might have fought, or even won, just by staying silent.",
      },
      {
        type: "key",
        text: "Never ignore legal papers. A court summons is not something to throw in a drawer. Responding, even just to say you got it, protects you from losing automatically. This is the line that matters most.",
      },
      {
        type: "h2",
        text: "The off-ramps come long before any courtroom",
      },
      {
        type: "p",
        text: "Almost none of this has to happen. The progression above is what's *possible* if a debt is ignored for a long time, but there are exits at every stage, and the earlier you take one, the better. If you're behind or about to be, here's where to turn:",
      },
      {
        type: "list",
        items: [
          "**Talk to your creditors.** They often prefer a payment plan over chasing you, and one phone call can pause the whole progression. [Negotiating and Restructuring Debt](/learn/government-aid/negotiating-debt) shows how to make that call.",
          "**Get free help.** A nonprofit credit counselor can look at your full picture and build a real plan, at little or no cost.",
          "**Learn the formal options.** [What 'Debt Relief' Really Means](/learn/government-aid/what-is-debt-relief) maps every path, from consolidation to bankruptcy.",
        ],
      },
      {
        type: "key",
        text: "The progression toward court is slow and full of exits. Acting early (a call, a plan, free help) keeps you in control and almost always beats waiting until a summons shows up.",
      },
      {
        type: "p",
        text: "One important note: this is general education to help you understand how debt collection works, not legal advice for your specific situation. If you're being sued or genuinely worried, contact a *legal aid* office. Many offer free help to people who qualify, and someone who can see the details can advise you on your actual case.",
      },
    ],
    related: ["debt-collector-rights", "negotiating-debt", "what-is-debt-relief", "free-legal-help"],
  },

  {
    slug: "wic-school-meals",
    order: 35,
    topicId: "government-aid",
    title: "WIC, School Meals, and Feeding Your Family",
    dek: "WIC, school meals, and summer grocery money are three separate programs with the same goal: your kids eating well. Here's who qualifies and how to sign up.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "WIC covers pregnancy through age 5 with monthly food benefits and real support.",
      "Under the guidelines effective July 2026, a family of three qualifies for WIC up to $50,542 a year.",
      "School meal applications are confidential and take minutes; many schools now feed everyone free.",
      "SUN Bucks adds $120 per child for summer groceries, usually automatically.",
    ],
    body: [
      {
        type: "p",
        text: "Groceries are where a tight budget hurts most, and kids make the math harder: formula, school lunches, the summer weeks when the school cafeteria disappears. There's a set of programs built for exactly this stretch of life, and the same thing is true of all of them that's true of [SNAP](/learn/government-aid/snap-explained): they're ordinary, widely used, and funded by taxes you've contributed to. Using them is feeding your family, not failing it.",
      },
      {
        type: "h2",
        text: "WIC: pregnancy through age 5",
      },
      {
        type: "p",
        text: "WIC (Women, Infants, and Children) serves pregnant women, new mothers, babies, and children up to their fifth birthday. Each month it provides specific healthy foods (milk, eggs, fruits and vegetables, whole grains, baby formula) loaded onto an eWIC card you use at the register. It also comes with things a grocery benefit doesn't: nutrition guidance, breastfeeding support, and referrals to other help. Dads, grandparents, and guardians can apply on behalf of children in their care.",
      },
      {
        type: "p",
        text: "Eligibility is category plus income. The income line is 185% of the federal poverty level, measured on gross income. Under the guidelines effective July 2026, that's $50,542 a year (about $4,212 a month) for a family of three, and $61,050 a year for a family of four. Two quirks work in your favor: a pregnant woman counts as two people when sizing the household, and if your family already gets SNAP, Medicaid, or TANF, you meet the income test automatically.",
      },
      {
        type: "tip",
        text: "WIC and SNAP aren't either/or. Plenty of families use both at once: WIC covers its specific food list, and SNAP covers the rest of the cart.",
      },
      {
        type: "h2",
        text: "Free and reduced-price school meals",
      },
      {
        type: "p",
        text: "Every public school offers free or reduced-price breakfast and lunch to kids whose family income qualifies: free at or below 130% of the poverty line, reduced-price up to 185% (the same line WIC uses). You apply with a short form from the school office or district website, any time of year, and the application is confidential. Kids in families getting SNAP are usually enrolled automatically.",
      },
      {
        type: "p",
        text: "A growing number of schools skip the paperwork entirely and serve free meals to every student, through a federal option for lower-income districts and, in some states, statewide free-meals laws. If that's your district, there's nothing to apply for. If you're not sure, ask the front office; it's a routine question they answer constantly.",
      },
      {
        type: "h2",
        text: "SUN Bucks: groceries for the summer",
      },
      {
        type: "p",
        text: "The gap these programs used to leave was summer. Summer EBT, branded SUN Bucks, closes part of it: $120 per eligible school-age child (for summer 2026), loaded onto an EBT card for groceries while school's out. Most kids who get free or reduced-price school meals, or whose families get SNAP or Medicaid, are enrolled automatically, and the money arrives as a lump sum or in monthly chunks depending on the state. The benefits expire a few months after they're issued, so use them once they land.",
      },
      {
        type: "h2",
        text: "How to get started",
      },
      {
        type: "steps",
        items: [
          "For WIC: search your state name plus 'WIC,' or call your local health department to book an appointment. Bring ID, proof of address, and proof of income (or your SNAP or Medicaid card, which settles the income question).",
          "For school meals: ask the school office for the meal application, or find it on the district website. Ten minutes, once a year.",
          "For SUN Bucks: usually nothing; watch the mail in late spring. If your child qualifies but nothing arrives, your state's SUN Bucks page has an application.",
          "Not sure what else you'd qualify for? [How to Actually Apply](/learn/government-aid/how-to-apply-for-benefits) covers the screening tools and paperwork habits that make all of this smoother.",
        ],
      },
      {
        type: "p",
        text: "One more thing for immigrant parents, because fear keeps too many eligible kids unenrolled: WIC and school meals are not part of any public charge decision, and applying for your children doesn't count against you. [Immigrants and Public Benefits](/learn/government-aid/immigrants-and-benefits) separates the facts from the rumors. Feeding your kids well on a tight budget is exactly what these programs are for.",
      },
    ],
    related: ["snap-explained", "benefits-you-qualify-for", "immigrants-and-benefits"],
  },

  {
    slug: "free-legal-help",
    order: 135,
    topicId: "government-aid",
    title: "Free Legal Help Exists",
    dek: "Eviction notices, debt lawsuits, benefit denials: the moments you most need a lawyer are the moments you can least afford one. Here's where the free help is.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Legal aid offices handle civil cases free for people under income limits.",
      "Law school clinics and court self-help centers are open to nearly everyone.",
      "LSC.gov and LawHelp.org can find your local options in minutes.",
      "Responding by the deadline matters more than having the perfect lawyer.",
    ],
    body: [
      {
        type: "p",
        text: "There's a particular sinking feeling to legal trouble when money's tight: papers taped to your door, a summons in the mail, a denial letter that reads like it was written to confuse you. The other side has lawyers. You assume you can't have one, so you do the worst possible thing, which is nothing. That assumption misses an entire network of free legal help that exists in this country, built precisely for this, and most of the people it was built for never call.",
      },
      {
        type: "h2",
        text: "When free legal help earns its keep",
      },
      {
        type: "p",
        text: "You don't need a lawyer for everything. But some situations are lopsided enough, with a landlord's or collector's attorney on one side and real stakes on yours, that even a single consultation changes the outcome:",
      },
      {
        type: "list",
        items: [
          "**Eviction.** Tenants with lawyers keep their homes at far higher rates than tenants without, and a growing number of cities now guarantee free counsel in eviction cases. Know [your rights as a tenant](/learn/home-ownership/renting-101-tenant-rights), and get help the day a notice appears.",
          "**Debt collection lawsuits.** Most people sued over a debt never respond and lose automatically. A legal aid lawyer can spot defenses you'd never see: a debt too old to sue on, a collector who can't prove the debt is yours. [What Actually Happens If You Can't Pay Your Debts](/learn/government-aid/what-happens-if-you-dont-pay-debts) explains why the summons is the one piece of mail you never ignore.",
          "**Benefit denials.** Denied SNAP, Medicaid, unemployment, or disability, and sure the decision is wrong? Appeals are exactly the kind of case legal aid handles every day.",
          "**Wage problems and unsafe housing.** Unpaid wages, a security deposit held hostage, a landlord ignoring dangerous conditions: all standard legal aid territory.",
        ],
      },
      {
        type: "h2",
        text: "Legal aid societies",
      },
      {
        type: "p",
        text: "Legal aid offices are nonprofit law firms whose job is representing people who can't pay, free of charge, in civil matters. (For criminal charges, the public defender's office fills this role.) Most limit eligibility by income, commonly to households around 125% of the federal poverty line, though limits vary by office and case type, so apply even if you're not sure you fit. Housing, benefits, consumer debt, and family safety cases usually get priority.",
      },
      {
        type: "p",
        text: "Finding yours is easy. The Legal Services Corporation, the federally funded nonprofit behind legal aid nationwide, has a 'Find Legal Aid' lookup at LSC.gov, and LawHelp.org lists free legal resources state by state.",
      },
      {
        type: "h2",
        text: "Law school clinics",
      },
      {
        type: "p",
        text: "Law schools run clinics where students handle real cases under the supervision of licensed attorneys, free. Clinics tend to specialize (housing, immigration, tax, small claims), the work is careful because it's graded, and income limits are often looser than legal aid's. If there's a law school within reach, search its name plus 'legal clinic.'",
      },
      {
        type: "h2",
        text: "Court self-help centers",
      },
      {
        type: "p",
        text: "Many courthouses now have self-help centers staffed to walk you through forms, filing steps, and deadlines at no cost. They can't take your side or argue strategy, but a huge share of self-represented people lose on paperwork and missed deadlines rather than on the merits, and that's precisely what these centers prevent. While you're there, ask about fee waivers; courts routinely waive filing fees for people with low incomes.",
      },
      {
        type: "h2",
        text: "If something's already in motion",
      },
      {
        type: "steps",
        items: [
          "Write down every deadline on the papers you received. The deadline is the whole ballgame.",
          "Contact legal aid the same day if you can, through LSC.gov or LawHelp.org, and say clearly what the deadline is.",
          "If they can't take your case, ask for a referral: a law school clinic, a bar association's free or low-cost referral line, a court self-help center.",
          "If the deadline arrives and you still have no lawyer, respond anyway. A simple written answer, filed on time, keeps you in the game, and a self-help center can show you how.",
        ],
      },
      {
        type: "p",
        text: "None of this requires knowing the law. It requires making two or three phone calls before a deadline instead of after. The help is free; the only expensive part is waiting.",
      },
    ],
    related: ["what-happens-if-you-dont-pay-debts", "debt-collector-rights", "renting-101-tenant-rights"],
  },

  {
    slug: "debt-payoff-roadmap",
    order: 85,
    topicId: "government-aid",
    title: "Getting Out of Debt: Start Where You're Standing",
    dek: "Seven starting points, one map. Skip the generic advice and jump straight to the guide that matches the debt you actually have.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "There's no universal first step out of debt; the right move depends on your situation, not a formula.",
      "Behind on rent, utilities, or food? Essentials outrank every debt payment.",
      "Collector calls and lawsuits are rights problems first, payment problems second.",
      "Free help exists at every stage: nonprofit credit counseling and legal aid.",
    ],
    body: [
      {
        type: "p",
        text: "Most debt advice quietly assumes everyone starts from the same place: steady income, a couple of credit cards, room to maneuver. Real debt is messier. The right first move for someone dodging collector calls is different from the right first move for someone with a payday loan rolling over every two weeks. So instead of a sequence, this is a map. Find the line that sounds like your week and go straight to that guide.",
      },
      {
        type: "h2",
        text: "Find your situation",
      },
      {
        type: "h3",
        text: "You're behind on rent, utilities, or groceries",
      },
      {
        type: "p",
        text: "Essentials outrank every debt, full stop. [When You Can't Pay Every Bill](/learn/budgeting/prioritizing-bills-when-money-is-tight) covers what to pay first when you can't pay everything, and [Help With Utilities and Rent](/learn/government-aid/utility-rent-assistance) can take a bill off your plate entirely.",
      },
      {
        type: "h3",
        text: "A payday or cash-advance loan keeps rolling over",
      },
      {
        type: "p",
        text: "That loop is built to be hard to exit, and breaking it comes before any other payoff plan. [Payday Loans and Predatory Lending](/learn/government-aid/payday-loans-and-predatory-lending) covers the exit routes.",
      },
      {
        type: "h3",
        text: "Debt collectors are calling",
      },
      {
        type: "p",
        text: "Learn your rights before you pay or promise anything; collectors follow rules, and you have more leverage than the calls suggest. Start with [Your Rights When a Debt Collector Calls](/learn/government-aid/debt-collector-rights), then see [Collections, From First Notice to Gone](/learn/credit/collections-explained) for how the debt shows up on your credit file and eventually leaves it.",
      },
      {
        type: "h3",
        text: "It's credit cards",
      },
      {
        type: "p",
        text: "[How to Pay Off a Credit Card](/learn/credit/paying-off-credit-cards) lays out the payoff methods and how to pick one. Then run your real balances through the [Debt Payoff calculator](/tools/debt) to see your actual payoff date and what an extra $50 a month does to it.",
      },
      {
        type: "h3",
        text: "It's student loans",
      },
      {
        type: "p",
        text: "Federal loans have a safety valve most borrowers never use: payments sized to your income, sometimes as low as $0. [Income-Driven Student Loan Repayment](/learn/government-aid/income-driven-repayment) explains how to get on a plan.",
      },
      {
        type: "h3",
        text: "It's everything at once",
      },
      {
        type: "p",
        text: "When you can't tell which fire to fight, get oriented before you act. [What 'Debt Relief' Really Means](/learn/government-aid/what-is-debt-relief) maps the whole landscape, and [Debt Settlement vs. Consolidation vs. Counseling](/learn/government-aid/debt-relief-options) compares the big three, including nonprofit credit counseling, which is usually the best free starting point.",
      },
      {
        type: "h3",
        text: "You've been sued, or bankruptcy is on the table",
      },
      {
        type: "p",
        text: "[What Actually Happens If You Can't Pay Your Debts](/learn/government-aid/what-happens-if-you-dont-pay-debts) explains the timeline from missed payment to judgment, and [Bankruptcy, Explained Without Judgment](/learn/government-aid/bankruptcy-explained) covers when a legal reset is the rational move. Don't face a court date alone when [free legal help](/learn/government-aid/free-legal-help) exists.",
      },
      {
        type: "h2",
        text: "Wherever you're standing",
      },
      {
        type: "steps",
        items: [
          "Stop new borrowing where you can. A hole that's still being dug can't be filled.",
          "Protect essentials first: housing, utilities, food, and transportation to work.",
          "Pick the one guide above that matches your situation and act on that alone. Ignore ads promising to erase your debt for a fee; [Avoiding Debt-Relief and 'Fix Your Credit Fast' Scams](/learn/government-aid/avoiding-debt-scams) shows how to spot them.",
        ],
      },
      {
        type: "p",
        text: "Situations change, and the map still works when yours does. Settle the collector problem and you're back at the credit-card line; get the payday loan closed and the everything-at-once section gets shorter. Come back and pick your new starting point.",
      },
    ],
    related: ["what-is-debt-relief", "debt-relief-options", "what-happens-if-you-dont-pay-debts"],
  },
  {
    slug: "benefits-cliffs",
    topicId: "government-aid",
    title: "Benefits Cliffs: When a Raise Costs You Money",
    dek: "Sometimes earning $50 more a month means losing $300 in help. Here's how to see the cliff before you step off it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Some benefits end abruptly at an income line instead of phasing out.",
      "A raise can genuinely leave your household with less each month.",
      "You can check the math before accepting new hours or a new wage.",
      "Long-term, growth usually wins. The goal is crossing cliffs on purpose.",
    ],
    body: [
      {
        type: "p",
        text: "There's a problem with help programs that almost nobody explains ahead of time: they have income limits, and some of those limits are cliffs, not slopes. Stay a dollar under the line and you keep the benefit. Earn a dollar over and the whole thing can vanish. For a family getting help with food, health coverage, and child care, a small raise can trigger losses bigger than the raise itself. If that's ever happened to you, you weren't imagining it, and you did nothing wrong.",
      },
      {
        type: "h2",
        text: "Where the cliffs are",
      },
      {
        type: "list",
        items: [
          "[SNAP](/learn/government-aid/snap-explained) uses a gross income test, 130% of the federal poverty line in most states, about $1,700 a month for a single person under the guidelines in effect for 2026. Some states use higher limits, which softens the edge.",
          "[Medicaid](/learn/government-aid/medicaid-explained) in expansion states ends near 138% of the poverty line. Crossing it means moving to a marketplace plan, which subsidies can make affordable, but rarely free.",
          "Child care assistance and housing vouchers vary by state and often have the steepest cliffs of all, worth hundreds a month.",
          "Not everything is a cliff: the [Earned Income Tax Credit](/learn/taxes/earned-income-tax-credit) phases out gradually, so more earnings never wipe out more than they add.",
        ],
      },
      {
        type: "h2",
        text: "Do the math before, not after",
      },
      {
        type: "steps",
        items: [
          "List what your household actually receives each month: food help, health coverage, child care, housing, utilities.",
          "Before accepting a raise, extra shifts, or a second job, compare your new gross monthly income against each program's limit. The [per-state finder on our Resources page](/resources) links where to check yours.",
          "If the new income lands just past a line, ask whether the timing can flex: some cliffs matter less crossed in January than in November, because programs count income over different periods.",
          "Report income changes honestly and on time. Overpayments get clawed back later, at the worst possible moment.",
        ],
      },
      {
        type: "key",
        text: "Never quietly turn down growth to protect a benefit without doing the math first. Sometimes staying under the line is genuinely the right short-term call, but make it a calculation, not a fear.",
      },
      {
        type: "h2",
        text: "Crossing on purpose",
      },
      {
        type: "p",
        text: "The way through a cliff is momentum: a raise big enough to clear the loss, savings built up ([even a starter fund](/learn/investing/high-yield-savings-account)) to bridge the transition, and grabbing every gradual program (EITC, marketplace subsidies) on the far side. A one-time bump that costs you $100 a month stings; a career that keeps climbing buries the cliff behind you. If a raise would strand you mid-cliff, that's also a fact worth naming out loud to an employer: some will adjust hours or timing to help.",
      },
      {
        type: "tip",
        text: "Dial 211 or use your state's benefits calculator before a job change. Caseworkers and nonprofit navigators run cliff math every day and will do it with you for free.",
      },
    ],
    related: ["benefits-you-qualify-for", "snap-explained", "earned-income-tax-credit"],
  },
  {
    slug: "need-cash-fast",
    topicId: "government-aid",
    title: "Need Cash Fast? Your Options, Ranked",
    dek: "When the car dies or the check comes up short, here's the full list, from cheapest to most dangerous.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "There's a clear ranking, and payday loans are at the very bottom.",
      "Asking the biller for a payment plan beats borrowing almost every time.",
      "Credit unions make small emergency loans with capped rates.",
      "The best option is the one that's over in a month, not the easiest one tonight.",
    ],
    body: [
      {
        type: "p",
        text: "Money emergencies don't wait for payday. When you need a few hundred dollars this week, the options in front of you are wildly unequal: some cost nothing, and one of them costs 400% a year. This is the whole menu, best to worst, so a bad week doesn't turn into a bad year.",
      },
      {
        type: "h2",
        text: "Before you borrow anything",
      },
      {
        type: "steps",
        items: [
          "Ask the biller directly for more time or a payment plan. Utilities, hospitals, landlords, even mechanics say yes constantly. [What to pay first](/learn/budgeting/prioritizing-bills-when-money-is-tight) helps you triage while you negotiate.",
          "Check for help you already qualify for: [utility and rent assistance](/learn/government-aid/utility-rent-assistance) exists precisely for this, and 211 connects you to local emergency funds.",
          "Sell something or pick up one fast shift. Unsexy, interest-free.",
        ],
      },
      {
        type: "h2",
        text: "Reasonable ways to borrow",
      },
      {
        type: "list",
        items: [
          "Your emergency fund, if you have one. This is its job; spend it guilt-free and rebuild after.",
          "A Payday Alternative Loan (PAL) from a federal credit union: $200 to $2,000, rates capped at 28%, repayment over months instead of two weeks. You may need to join the credit union, which often costs $5.",
          "A small personal loan from a bank, credit union, or reputable online lender, with a fixed rate and fixed end date.",
          "A 0% intro credit card if your credit allows, paid off within the intro window.",
          "Borrowing from family, treated like a real loan: amount, date, and repayment written down, so the money problem doesn't become a family problem.",
        ],
      },
      {
        type: "h2",
        text: "Expensive: think twice",
      },
      {
        type: "list",
        items: [
          "Carrying the expense on a regular credit card. At 21% to 24%, fine for one tight month, corrosive as a habit.",
          "A 401(k) loan: you repay yourself, but the money stops growing, and if you lose the job the balance can come due fast.",
          "Buy-now-pay-later stacking: each plan looks harmless, and [four of them at once quietly become a payday-sized problem](/learn/credit/buy-now-pay-later).",
          "Credit card cash advances: a fee up front, a higher rate than purchases, and interest that starts the same day, with no grace period.",
        ],
      },
      {
        type: "h2",
        text: "Last resorts that usually make it worse",
      },
      {
        type: "p",
        text: "[Payday loans](/learn/government-aid/payday-loans-and-predatory-lending) and car title loans are built to trap: fees that work out to around 400% a year, two-week terms most borrowers can't meet, and rollovers that turn $300 into months of payments. A title loan can also cost you the car you need for work. If you're already caught in one, you're not stupid and you're not alone; that guide covers the exits, and a [nonprofit credit counselor](/learn/government-aid/debt-relief-options) can help you restructure the rest.",
      },
      {
        type: "key",
        text: "The ranking in one line: ask for time, then ask for help, then borrow cheap and boring, and never borrow at triple digits.",
      },
      {
        type: "tip",
        text: "Once this emergency passes, give future-you a head start: the [Starter Fund Sprint challenge](/challenges/starter-fund-sprint) walks you to your first $500 cushion, $20 at a time.",
      },
    ],
    related: ["prioritizing-bills-when-money-is-tight", "payday-loans-and-predatory-lending", "utility-rent-assistance"],
  },
];
