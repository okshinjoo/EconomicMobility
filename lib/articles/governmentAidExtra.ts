import type { Article } from "./types";

export const governmentAidExtraArticles: Article[] = [
  {
    slug: "snap-explained",
    order: 30,
    topicId: "government-aid",
    title: "SNAP (Food Assistance), Explained",
    dek: "Help buying groceries is a benefit you may have already paid into — here's how it works and how to use it without a shred of shame.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "SNAP puts money on a card you use like debit at the grocery store.",
      "Eligibility depends on your income and household size — many working people qualify.",
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
        text: "SNAP stands for Supplemental Nutrition Assistance Program — most people still call it food stamps. The short version: it helps you afford groceries. Let's walk through what it actually is, who it's for, and how to get it.",
      },
      {
        type: "h2",
        text: "What SNAP actually is",
      },
      {
        type: "p",
        text: "SNAP loads money onto a card called an EBT card each month. You swipe it at the grocery store like a debit card, and it covers most food — produce, meat, bread, dairy, snacks, seeds to grow food. It doesn't cover things like alcohol, hot prepared meals, or non-food items, but for filling your fridge, it works almost everywhere groceries are sold.",
      },
      {
        type: "key",
        text: "SNAP isn't a handout you have to feel small about. It's a public program funded by taxes — including ones taken out of your own paychecks. Using it is you accepting help that was built for exactly your situation.",
      },
      {
        type: "h2",
        text: "Who qualifies",
      },
      {
        type: "p",
        text: "This surprises a lot of people: you don't have to be unemployed or have zero income. Plenty of folks who work full time still qualify, especially with kids or high rent. As a rough federal baseline, most households need a gross income under **130% of the poverty line** — about **$2,800 a month** (roughly **$33,600 a year**) for a household of three, and higher for bigger families. Many states set the cutoff *higher* than that, so don't rule yourself out based on a number a friend mentioned — check the current limits where you live.",
      },
      {
        type: "tip",
        text: "Not sure if you'd qualify? Use the free screening tool at Benefits.gov, or call 211. It takes a few minutes and tells you what you might be eligible for — no commitment, no cost, no salesperson.",
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
          "Find your state's SNAP office online (search your state name plus 'SNAP apply') or start at Benefits.gov.",
          "Fill out the application — online, by mail, or in person. Gather ID, proof of income like pay stubs, and your rent and utility costs.",
          "Do a short interview, usually by phone, where a caseworker confirms your details.",
          "Wait for the decision. If approved, your EBT card arrives in the mail, and you'll reapply periodically to keep it.",
        ],
      },
      {
        type: "p",
        text: "If English isn't your first language, you have the right to an interpreter for free — ask for one. And a note for immigrant families: rules about who's eligible can be confusing, and worry about immigration status keeps many people from applying for benefits their *citizen children* clearly qualify for. If that's your situation, get clear information before you assume the answer is no.",
      },
      {
        type: "tip",
        text: "Nobody legitimate ever charges you to apply for SNAP. If someone asks for a fee to 'sign you up' or 'speed up' your benefits, walk away — it's a scam.",
      },
      {
        type: "p",
        text: "Applying for SNAP is just you using a tool that's there for everyone. Feed yourself and your family without guilt, get steady, and the program will be there to step back from whenever you're ready.",
      },
    ],
    related: ["benefits-you-qualify-for", "how-to-apply-for-benefits", "immigrants-and-benefits"],
  },

  {
    slug: "medicaid-explained",
    order: 40,
    topicId: "government-aid",
    title: "Medicaid and Low-Cost Health Coverage",
    dek: "If you can't afford health insurance, there's a good chance you qualify for coverage that costs little or nothing — and skipping care to save money usually backfires.",
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
        text: "Going without health insurance feels like a gamble you can win — until you can't. One bad fall, one infection that won't quit, one surprise diagnosis, and suddenly you're staring at a bill with a number that doesn't feel real. The good news: if money is tight, you may qualify for coverage that costs little or nothing, and far more people are eligible than realize it.",
      },
      {
        type: "h2",
        text: "What Medicaid is",
      },
      {
        type: "p",
        text: "Medicaid is health coverage run jointly by the federal government and each state, built for people with lower incomes. When you qualify, it covers the big stuff — doctor visits, hospital stays, prescriptions, emergencies, often dental and vision — for free or a very small cost. There's no monthly premium for most people who qualify.",
      },
      {
        type: "p",
        text: "Because states run their own versions, the name and the rules vary by state. Some states cover more people than others, and eligibility depends on your income and household size. So the only way to know your real answer is to check where *you* live.",
      },
      {
        type: "key",
        text: "Medicaid exists so that being low on money doesn't mean going without a doctor. It's coverage you're entitled to when you qualify — not charity, and not something to be embarrassed about pulling out at the pharmacy.",
      },
      {
        type: "h2",
        text: "If you don't qualify for Medicaid",
      },
      {
        type: "p",
        text: "Earn a little too much for Medicaid? You're not out of options. Through the health insurance marketplace, the government often pays a big chunk of your monthly premium based on your income. Many people end up with a real plan for a very low monthly cost — sometimes close to nothing — once those subsidies kick in.",
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
          "Start at HealthCare.gov or your state's marketplace — one application checks you for both Medicaid and subsidized plans.",
          "Gather income proof, household details, and immigration documents if they apply to you.",
          "Submit and get matched. If you qualify for Medicaid, you can usually enroll any time of year.",
          "Need help? A free, certified 'navigator' or assister can walk you through it — you never pay for this.",
        ],
      },
      {
        type: "p",
        text: "For immigrant families, eligibility rules can be genuinely confusing, and fear sometimes keeps people from applying for coverage their family qualifies for. If that's you, get accurate information from a navigator or a trusted clinic before deciding the answer is no.",
      },
      {
        type: "p",
        text: "Health coverage isn't a luxury for 'later, when things settle down.' It's the thing that keeps one bad week from turning into years of debt. Find out what you qualify for — your future self will thank you.",
      },
    ],
    related: ["benefits-you-qualify-for", "immigrants-and-benefits", "how-to-apply-for-benefits"],
  },

  {
    slug: "applying-for-unemployment",
    order: 50,
    topicId: "government-aid",
    title: "How to Apply for Unemployment",
    dek: "Losing a job is stressful enough — here's how to claim the benefits you've been paying into, without the process tripping you up.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Unemployment replaces part of your income while you look for work.",
      "It's funded by employer taxes — you earned access to it by working.",
      "Apply right away; benefits usually start from when you file, not when you lost the job.",
      "Most people just need their work history, ID, and a little patience.",
    ],
    body: [
      {
        type: "p",
        text: "Getting laid off, or having your hours vanish, can knock the wind out of you — financially and otherwise. Before the panic sets in, here's something steadying: unemployment insurance exists for this exact moment, and if you've been working, you've almost certainly been paying into it. Claiming it isn't begging. It's collecting on something you earned.",
      },
      {
        type: "h2",
        text: "What unemployment is",
      },
      {
        type: "p",
        text: "Unemployment insurance gives you a portion of your old paycheck — usually a chunk, not the whole thing — for a limited stretch of weeks while you search for a new job. It's meant to keep a roof over your head and food on the table during the gap, so a job loss doesn't snowball into losing everything.",
      },
      {
        type: "key",
        text: "Unemployment is funded mainly by taxes your employers paid on your wages. You're not taking anyone's money — you're using a safety net that was built and paid for on your behalf, for situations exactly like this one.",
      },
      {
        type: "h2",
        text: "Who can usually claim it",
      },
      {
        type: "p",
        text: "The general idea: you lost your job through no fault of your own — a layoff, a closure, reduced hours — and you're able and available to work. Quitting without a good cause or being fired for serious misconduct can complicate things, but don't disqualify yourself in your head. The rules vary by state, and there are more exceptions than people assume.",
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
          "Find your state's unemployment office online (search your state name plus 'unemployment') — you file with your state, not the federal government.",
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
        text: "If your claim gets denied and you believe it's wrong, you can appeal — and people win appeals all the time. A denial is not always the final word.",
      },
      {
        type: "p",
        text: "While the benefits come in, treat them as breathing room, not a finish line. Trim your budget to the essentials, look into other help like SNAP if you need it, and use the time to land somewhere better. You paid into this cushion — let it do its job.",
      },
    ],
    related: ["benefits-you-qualify-for", "snap-explained", "how-to-apply-for-benefits"],
  },

  {
    slug: "debt-relief-options",
    order: 20,
    topicId: "government-aid",
    title: "Debt Settlement vs. Consolidation vs. Counseling",
    dek: "Three things that sound alike, do very different things, and aren't equally trustworthy — here's how to tell them apart.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "Counseling is advice and a plan; consolidation is one new loan; settlement is paying less than you owe.",
      "Nonprofit credit counseling is the safest place to start — and often free.",
      "Settlement can wreck your credit and comes with real risks.",
      "The legitimate help rarely charges big upfront fees.",
    ],
    body: [
      {
        type: "p",
        text: "When debt gets overwhelming, the internet fills up with companies promising to fix it. They throw around words like *settlement*, *consolidation*, and *counseling* almost interchangeably — but they're three very different things, with very different risks. Knowing which is which is how you avoid trading one problem for a worse one.",
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
        text: "Consolidation means rolling several debts into a single new loan or balance, ideally at a lower interest rate. Instead of juggling five credit-card payments, you make one. Done right — a real lower rate, and you don't run the cards back up — it can save money and simplify your life. Done wrong, you just move the debt around, keep the high rate, and add fees.",
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
        text: "Settlement is the aggressive one. The idea is to negotiate with creditors to accept *less* than the full balance — say, paying $6,000 to clear $10,000. It can work, but the risks are serious, and for-profit settlement companies are where a lot of people get burned:",
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
        type: "key",
        text: "Start with nonprofit credit counseling before you ever pay a for-profit company. A free counselor can lay out your real options — including ones that don't trash your credit — without anything to sell you.",
      },
      {
        type: "h2",
        text: "How to tell the trustworthy from the trap",
      },
      {
        type: "p",
        text: "Across all three, a few signals separate legitimate help from the predators circling people in debt:",
      },
      {
        type: "list",
        items: [
          "**Big upfront fees** before anything is done are a major red flag.",
          "**Guarantees** — 'we'll cut your debt in half,' 'we'll fix your credit fast' — are promises no honest company can make.",
          "**Pressure** to sign today, or to stop talking to your creditors entirely, should make you pause.",
          "**'Government program'** name-drops from a private company are often bait. Real government help you can find yourself, for free.",
        ],
      },
      {
        type: "p",
        text: "Debt feels isolating, but you have more legitimate, low-cost options than the ads suggest. Start with free nonprofit counseling, understand which path you're actually on, and you'll make a calmer, smarter call than any high-pressure pitch wants you to.",
      },
    ],
    related: ["what-is-debt-relief", "avoiding-debt-scams", "negotiating-debt"],
  },

  {
    slug: "avoiding-debt-scams",
    order: 50,
    topicId: "government-aid",
    title: "Avoiding Debt-Relief and 'Fix Your Credit Fast' Scams",
    dek: "Scammers hunt people who are stressed about money. Here's how to spot them before they take what little cushion you have.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Scammers target people in debt because they're hopeful and hurried.",
      "Upfront fees, guarantees, and pressure are the three biggest red flags.",
      "Nobody can legally remove accurate, negative info from your credit report.",
      "Real help — nonprofit counseling, the CFPB — is free or low-cost.",
    ],
    body: [
      {
        type: "p",
        text: "Here's an ugly truth: when you're behind on bills, you become a target. Scammers know that worry makes people hopeful and quick to trust, so they flood the ads, the texts, and the robocalls with promises to make your debt disappear. The cruelest part is who they hit — people who can least afford to lose another dollar. Let's make sure that's not you.",
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
          "**Upfront fees.** They want money *before* doing anything real. Legitimate help generally gets paid as it delivers — not for a promise.",
          "**Guarantees.** 'We'll erase your debt.' 'We'll boost your score 100 points.' Nobody can promise those outcomes honestly.",
          "**Pressure.** 'This offer ends today.' 'Sign now.' Urgency is a tactic to stop you from thinking or checking them out.",
        ],
      },
      {
        type: "key",
        text: "If a company asks for a big payment up front, *guarantees* a result, and *pressures* you to decide right now — that's not one yellow flag, it's three red ones. Hang up.",
      },
      {
        type: "h2",
        text: "The 'fix your credit fast' lie",
      },
      {
        type: "p",
        text: "A whole industry promises to magically repair your credit for a fee. Here's the thing they don't say out loud: no one can legally remove accurate negative information from your credit report. Late payments and other true marks fade with time and good habits — they can't be deleted on demand. Anything you can pay a 'credit repair' company to do, you can do yourself for free, including disputing genuine errors.",
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
          "Telling you to **stop all contact with your creditors** and route everything through them — which can leave you blindsided by lawsuits.",
          "Claiming to represent a **special government program** that they alone can get you into. Real government help you find yourself, for free.",
          "Asking you to **pay by gift card, wire, or crypto** — untraceable payments are a giant tell.",
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
          "Talk to a **nonprofit credit counselor** — often free, never high-pressure.",
          "Read up at the **CFPB** and the **FTC**, which publish straightforward, no-cost guidance.",
          "Look up any company's name plus the word 'complaint' or 'scam' before paying a cent.",
          "If something feels off, it's okay to simply walk away. Real help will still be there tomorrow.",
        ],
      },
      {
        type: "p",
        text: "Trust that instinct in your gut. The honest options for getting out of debt don't need to rush you, guarantee you the moon, or take your money before they've earned it. Anyone who does is the problem you're trying to escape — not the solution.",
      },
    ],
    related: ["debt-relief-options", "what-is-debt-relief", "debt-collector-rights"],
  },

  {
    slug: "student-loan-forgiveness",
    topicId: "government-aid",
    title: "Student Loan Forgiveness Programs",
    dek: "PSLF, forgiveness through income-driven plans, and the rest — in plain terms, with one big warning: always check the official source.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Forgiveness wipes out remaining federal loan debt after you meet a program's rules.",
      "PSLF rewards public-service and nonprofit careers after years of payments.",
      "Income-driven plans can forgive what's left after a long repayment period.",
      "Rules change constantly — always verify on the official federal student aid site.",
    ],
    body: [
      {
        type: "p",
        text: "Student loan forgiveness sounds almost too good to be true, and the confusion around it is real — the programs are genuine, but the rules are detailed and they *change a lot*. Before anything else, the single most important habit: verify everything on the official federal student aid site (StudentAid.gov), not on a random blog, a forwarded text, or a company that called you.",
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
        text: "Forgiveness means the government cancels the remaining balance on your loans once you've met a program's requirements. Two big things to know up front: these programs are generally for *federal* student loans, not private ones, and the specifics — who qualifies, how many payments, which plans count — shift with policy. So treat everything below as a starting point to confirm, not as fixed rules.",
      },
      {
        type: "tip",
        text: "Log into StudentAid.gov to see exactly which loans you have and who services them. A surprising number of people don't know whether their loans are federal or private — and it changes everything about your options.",
      },
      {
        type: "h2",
        text: "Public Service Loan Forgiveness (PSLF)",
      },
      {
        type: "p",
        text: "PSLF is the headliner. The basic deal: if you work full time for a qualifying employer — government or many nonprofits — and make a set number of qualifying monthly payments (think years of them) on the right kind of plan, the remaining federal balance can be forgiven. It's powerful for teachers, nurses, public-interest lawyers, social workers, and a lot of other public-service careers.",
      },
      {
        type: "p",
        text: "The catch is that the details trip people up: the wrong loan type, the wrong repayment plan, or a job that doesn't actually qualify can quietly cost you years of progress. That's exactly why you confirm your status as you go, not at the finish line.",
      },
      {
        type: "tip",
        text: "Certify your employment for PSLF *every year*, not just at the end. It's how you catch a problem while there's still time to fix it — instead of discovering at year ten that something didn't count.",
      },
      {
        type: "h2",
        text: "Forgiveness through income-driven repayment",
      },
      {
        type: "p",
        text: "Income-driven repayment (IDR) plans set your monthly payment based on what you earn, and after a long repayment period, they can forgive whatever balance remains. The years required are long, but for people whose debt is large relative to their income, it's a real path — and it doesn't require any particular employer the way PSLF does.",
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
        text: "You never have to pay a company to apply for federal loan forgiveness — applying is free through your loan servicer and StudentAid.gov. Anyone charging a fee to 'enroll' you in a forgiveness program is, at best, charging you for something you can do yourself.",
      },
      {
        type: "p",
        text: "This is genuinely complicated, and even careful people find it confusing — so don't take that as a sign you're not smart enough. Start at StudentAid.gov, find out what loans you actually have, and check the *current* rules there before acting. None of this is individualized legal or financial advice — it's the map you use to ask the right questions of the official source.",
      },
    ],
    related: ["income-driven-repayment", "avoiding-debt-scams", "debt-relief-options"],
  },

  {
    slug: "utility-rent-assistance",
    order: 60,
    topicId: "government-aid",
    title: "Help With Utilities and Rent",
    dek: "Behind on the electric bill or scared of an eviction notice? There's real help for both — and one phone number that can find it for you.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "LIHEAP helps with heating and cooling bills based on your income.",
      "Emergency rental and utility assistance exists in many places — ask early.",
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
        text: "LIHEAP — the Low Income Home Energy Assistance Program — helps households cover the cost of heating and cooling. Depending on where you live, it can help pay an energy bill, handle a crisis like an imminent shut-off, or even cover some weatherizing to lower your bills going forward. Eligibility depends on your income and household size, and how it works varies by state.",
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
        text: "If you remember nothing else, remember this: you can call or text **211**, free and confidential, almost anywhere in the U.S. A real person helps you find local resources — rent help, utility help, food, and more — that fit your situation. It's the single fastest way to cut through the confusion of who-helps-with-what.",
      },
      {
        type: "steps",
        items: [
          "Call or text 211, or visit 211.org, and tell them what you're facing.",
          "Check Benefits.gov to screen for programs like LIHEAP you may qualify for.",
          "Contact your utility company directly to ask about hardship programs and payment plans.",
          "For housing, search for local rental assistance and free tenant legal aid in your city or county.",
        ],
      },
      {
        type: "p",
        text: "Asking for help with rent or utilities isn't a failure — these programs were built precisely so a rough stretch doesn't cost you your home or your power. Make the calls early, lean on 211 to do the searching, and give yourself the room to get back on your feet.",
      },
    ],
    related: ["benefits-you-qualify-for", "how-to-apply-for-benefits", "snap-explained"],
  },
];
