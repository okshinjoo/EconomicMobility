import type { Article } from "./types";

export const taxesArticles: Article[] = [
  {
    slug: "filing-taxes-first-time",
    order: 20,
    topicId: "taxes",
    title: "Filing Your Taxes for the First Time",
    dek: "Filing taxes sounds scary, but it's mostly copying numbers from a few forms. Here's the whole thing, start to finish.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Filing taxes is mostly reporting income you already earned.",
      "Your employer and the government already have most of the numbers.",
      "Most first-time filers can do it for free, online.",
      "Filing on time matters even if you can't pay right away.",
    ],
    body: [
      {
        type: "p",
        text: "If this is your first time filing taxes, take a breath. It feels official and intimidating, but at its core, filing is telling the government how much you earned and how much tax was already taken out. Often the answer is that they owe *you* money back.",
      },
      {
        type: "p",
        text: "You don't need to be a math person, and you don't need to pay anyone. (Not sure you're required to file at all? Start with [Do You Even Need to File?](/learn/taxes/do-you-need-to-file), then come back.) Here's the process, step by step.",
      },
      {
        type: "h2",
        text: "What 'filing' actually means",
      },
      {
        type: "p",
        text: "Throughout the year, if you have a job, a slice of each paycheck gets sent to the government for taxes. That's called withholding. Filing a tax return is the once-a-year step where you add up your income, compare it to what was already withheld, and settle up. If too much was taken out, you get a tax refund. If too little was taken out, you pay the difference.",
      },
      {
        type: "h2",
        text: "Gather your documents",
      },
      {
        type: "p",
        text: "You don't have to remember anything. The places that paid you send you forms, usually in January or early February. Wait until they all arrive before you file.",
      },
      {
        type: "list",
        items: [
          "A **W-2** from each employer, showing what you earned and what was withheld.",
          "A **1099** if you did freelance, gig, or contract work, or earned interest at a bank.",
          "Your Social Security number or ITIN, and the same for anyone you claim.",
          "Last year's return, if you filed one (not required, just helpful).",
        ],
      },
      {
        type: "tip",
        text: "Forms can show up in the mail *and* in an online account from your employer or bank. If a job you left still owes you a W-2, check your old online pay portal first. It's often posted there before the mail arrives.",
      },
      {
        type: "h2",
        text: "File your return",
      },
      {
        type: "steps",
        items: [
          "Pick free tax software or a free filing program. [Free Ways to File](/learn/taxes/free-ways-to-file) covers your options.",
          "Type in the numbers from your W-2 and any 1099 forms. The software asks for them box by box.",
          "Answer the simple questions it asks about you, like whether you're a student or living on your own.",
          "Let it do the math, then review the result: a refund coming to you, or a balance you owe.",
          "Submit it electronically and save a copy for your records.",
        ],
      },
      {
        type: "p",
        text: "The software handles the standard deduction, the brackets, and the forms behind the scenes. You're mostly copying numbers and clicking next.",
      },
      {
        type: "h2",
        text: "Know the deadline",
      },
      {
        type: "p",
        text: "Federal taxes are due **April 15** most years (it slides to the next business day when the 15th lands on a weekend or holiday). If you're owed a refund, there's no penalty for filing late, though there's also no reason to leave your own money sitting. If you owe, filing on time matters a lot.",
      },
      {
        type: "key",
        text: "Even if you can't pay what you owe, still file by the deadline. The penalty for not filing is much bigger than the penalty for not paying, and [payment plans exist](/learn/taxes/cant-pay-taxes) if you ask.",
      },
      {
        type: "p",
        text: "Your first return is the hardest one, and it's still manageable. Next year you'll know exactly what to expect.",
      },
    ],
    related: ["do-you-need-to-file", "understanding-tax-forms", "free-ways-to-file"],
    quiz: [
      {
        question: "What does filing a tax return actually do?",
        options: [
          "It pays a brand-new bill on top of what came out of your paychecks",
          "It adds up your income, compares it to what was already withheld, and settles up",
          "It registers you with the government so you're allowed to keep working",
        ],
        answer: 1,
        explain:
          "Taxes were already coming out of your paychecks all year. Filing settles the difference: too much withheld means a refund, too little means you pay the gap.",
      },
      {
        question: "Where do the numbers on your return come from?",
        options: [
          "You estimate them from memory as best you can",
          "You have to request them from the IRS by mail",
          "Forms like your W-2 and 1099s, sent by the places that paid you",
        ],
        answer: 2,
        explain:
          "You don't have to remember anything. Employers and banks send the forms in January or early February, and the software asks for the numbers box by box.",
      },
      {
        question: "You owe taxes but can't pay by the deadline. What should you do?",
        options: [
          "File on time anyway and look into a payment plan",
          "Wait to file until you've saved up the full amount",
          "Skip filing, since you can't pay yet anyway",
        ],
        answer: 0,
        explain:
          "The penalty for not filing is much bigger than the penalty for not paying. File by the deadline and ask about a payment plan.",
      },
    ],
  },

  {
    slug: "understanding-tax-forms",
    order: 30,
    topicId: "taxes",
    title: "What All Those Forms Mean",
    dek: "W-2, 1099, W-4: the alphabet soup of tax forms, translated into plain English.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A W-2 is for employees; a 1099 is for everyone else who paid you.",
      "A W-4 is what you fill out to control your withholding.",
      "You don't fill out a W-2 or 1099. They get sent to you.",
      "Keep every form until your return is filed and accepted.",
    ],
    body: [
      {
        type: "p",
        text: "Tax forms have names like W-2 and 1099 that tell you nothing about what they do. But there are only a few you'll deal with early on, and each one has a simple job. Here's the cheat sheet.",
      },
      {
        type: "h2",
        text: "The W-2: your job's annual summary",
      },
      {
        type: "p",
        text: "If you have a regular job, your employer sends you a W-2 each January. It's a one-page summary of the past year: how much you earned and how much was already withheld for federal taxes, state taxes, Social Security, and Medicare. You'll copy these numbers straight into your tax return.",
      },
      {
        type: "p",
        text: "If you worked two jobs, you get two W-2s, one from each. Wait for all of them before you file.",
      },
      {
        type: "h2",
        text: "The 1099: income without an employer",
      },
      {
        type: "p",
        text: "A 1099 reports money that didn't come through a normal paycheck. There are several versions, but the idea is the same: someone paid you, and now they're telling the government about it.",
      },
      {
        type: "list",
        items: [
          "**1099-NEC:** pay for freelance, gig, or contract work, like driving or design jobs.",
          "**1099-INT:** interest your bank paid you on savings.",
          "**1099-G:** certain government payments, like unemployment benefits.",
        ],
      },
      {
        type: "p",
        text: "Unlike a W-2, a 1099 usually shows no tax withheld. That matters: the tax on that money may not be paid yet, and you might owe some when you file. [Taxes for Gig and 1099 Work](/learn/taxes/gig-1099-taxes) covers how to stay ahead of it.",
      },
      {
        type: "h2",
        text: "The W-4: the one you fill out",
      },
      {
        type: "p",
        text: "This is the form that trips people up, because it's the only one of these you fill in yourself. When you start a job, you hand your employer a W-4, and it tells them how much tax to withhold from each paycheck. Set it wrong in one direction and you owe in April; set it wrong in the other and your checks are smaller all year. [How to Fill Out a W-4](/learn/taxes/how-to-fill-out-w4) walks through it line by line.",
      },
      {
        type: "tip",
        text: "Got a surprise tax bill or a giant refund last year? You can hand your employer a new W-4 any time to adjust your withholding. You don't have to wait for a new job.",
      },
      {
        type: "key",
        text: "A simple rule of thumb: forms that *report* what happened (W-2, 1099) get sent to you. Forms that *set up* what happens next (W-4) get filled out by you.",
      },
      {
        type: "p",
        text: "Keep every form somewhere safe, whether that's a folder or a photo on your phone, until your return is filed and accepted. If a number ever gets questioned, these are your proof.",
      },
    ],
    related: ["filing-taxes-first-time", "how-to-fill-out-w4", "do-you-need-to-file"],
  },

  {
    slug: "do-you-need-to-file",
    order: 10,
    topicId: "taxes",
    title: "Do You Even Need to File?",
    dek: "Not everyone is required to file a tax return. Filing anyway is often worth it.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Whether you must file depends mostly on how much you earned.",
      "Low earners often aren't required to file at all.",
      "Filing anyway is how you claim a refund you're owed.",
      "Some credits put money in your pocket even with little income.",
    ],
    body: [
      {
        type: "p",
        text: "Here's a question almost nobody answers for you: do you have to file a tax return at all? If you earned very little (a part-time job, a summer gig), you might not be required to. But \"not required\" and \"shouldn't\" are two different things.",
      },
      {
        type: "h2",
        text: "When you're required to file",
      },
      {
        type: "p",
        text: "Whether you must file mostly comes down to how much you made and how you made it. There's an income threshold each year. For 2026, a single person under 65 generally has to file if they earned more than **$16,100**; the threshold matches the standard deduction and is higher if you're married or older. Earning above it means you're required to file. A few situations lower that bar or create their own rules. If you had self-employment income of $400 or more, for example, you have to file regardless.",
      },
      {
        type: "list",
        items: [
          "You earned more than the year's filing threshold from a job.",
          "You had **1099** income (freelance or gig work) above a small amount, even a few hundred dollars.",
          "You owe a special tax, like self-employment tax on side income.",
          "Someone can claim you as a dependent and your income passes the dependent's lower threshold.",
        ],
      },
      {
        type: "h2",
        text: "Why you'd file even when you don't have to",
      },
      {
        type: "p",
        text: "If your employer withheld taxes from your paychecks during the year, that money is sitting with the government. The only way to get your tax refund is to file a return and ask for it. Skip filing, and you leave your own money behind.",
      },
      {
        type: "p",
        text: "It adds up. A student who worked part-time and had a bit withheld from each check could have a few hundred dollars waiting.",
      },
      {
        type: "h2",
        text: "Refundable credits can pay you",
      },
      {
        type: "p",
        text: "Some tax credits are \"refundable,\" which means they can pay you even if you owed no tax to begin with. The biggest one for working people is the [Earned Income Tax Credit](/learn/taxes/earned-income-tax-credit), which can be worth thousands of dollars. You claim it by filing a return; there's no other way to get it.",
      },
      {
        type: "tip",
        text: "Even with little or no income, filing creates an official record for that year. That record can help when you apply for financial aid, a loan, an apartment, or immigration paperwork down the road.",
      },
      {
        type: "key",
        text: "When in doubt, file. It's usually free, it's how you claim money you're owed, and a return on record protects you if a question ever comes up later.",
      },
      {
        type: "p",
        text: "If you're genuinely unsure whether you're required to file, free filing software will walk you through a few questions and tell you. And if the answer is yes, [Filing Your Taxes for the First Time](/learn/taxes/filing-taxes-first-time) covers the whole process.",
      },
    ],
    related: ["filing-taxes-first-time", "earned-income-tax-credit", "free-ways-to-file"],
  },

  {
    slug: "deductions-vs-credits",
    order: 80,
    topicId: "taxes",
    title: "Deductions vs. Credits",
    dek: "Both lower your tax bill, but in very different ways. Knowing which is which can save you real money.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A deduction lowers the income you get taxed on.",
      "A credit lowers the tax you owe, dollar for dollar.",
      "A credit is usually worth more than a deduction of the same size.",
      "Most people take the standard deduction and move on.",
    ],
    body: [
      {
        type: "p",
        text: "Deductions and credits both shrink your tax bill, so people use the words like they mean the same thing. They don't. Understanding the difference is one of the highest-value few minutes you can spend on taxes.",
      },
      {
        type: "h2",
        text: "A deduction lowers what gets taxed",
      },
      {
        type: "p",
        text: "A tax deduction reduces the amount of your income that the government taxes in the first place. Taxes aren't charged on every dollar you earn; they're charged on your taxable income, which is what's left after deductions come off the top.",
      },
      {
        type: "p",
        text: "Say you earned $30,000 and you have a $5,000 deduction. Now only $25,000 gets taxed. You don't save the whole $5,000. You save the tax on that $5,000, which is a slice of it — and the size of the slice depends on [your tax bracket](/learn/taxes/tax-brackets-explained).",
      },
      {
        type: "h2",
        text: "The standard deduction does this for you",
      },
      {
        type: "p",
        text: "Most people don't hunt for deductions at all. They take the standard deduction, a flat amount nearly everyone can subtract from their income, no receipts required. For 2026 it's **$16,100** if you file single and **$32,200** if you're married filing jointly. It rises a little each year for inflation, but it's always substantial, and it's why a big chunk of your income is never taxed at all.",
      },
      {
        type: "p",
        text: "The alternative is to \"itemize\": list out specific deductions one by one. That only beats the standard deduction if your individual deductions add up to more than the flat amount, which is uncommon early on.",
      },
      {
        type: "h2",
        text: "A credit lowers the tax itself",
      },
      {
        type: "p",
        text: "A tax credit is the stronger tool. Instead of shrinking your taxable income, it cuts your tax bill directly, dollar for dollar. A $500 credit takes $500 straight off what you owe. Some credits are even \"refundable,\" meaning they can come back to you as cash when they exceed the tax you owed.",
      },
      {
        type: "key",
        text: "A $1,000 credit and a $1,000 deduction are not equal. The credit saves you a full $1,000. The deduction saves you only the tax on $1,000, often a few hundred. Dollar for dollar, credits win.",
      },
      {
        type: "h2",
        text: "Which ones might apply to you",
      },
      {
        type: "p",
        text: "Tax software asks the questions that surface these for you, but it helps to know what to watch for:",
      },
      {
        type: "list",
        items: [
          "The [Earned Income Tax Credit](/learn/taxes/earned-income-tax-credit) for lower-income workers, which is refundable and can pay you back.",
          "[Education credits](/learn/taxes/education-tax-credits) for college costs like tuition and fees.",
          "Credits for contributing to a retirement account on a modest income.",
        ],
      },
      {
        type: "tip",
        text: "When good software asks about your school, your job, or your savings, answer carefully. Those questions are hunting for credits you qualify for, and clicking through too fast is how people miss free money.",
      },
      {
        type: "p",
        text: "You don't have to memorize any of this. Just remember: deductions shrink the income that's taxed, credits shrink the tax, and credits are the heavy hitters.",
      },
    ],
    related: ["tax-brackets-explained", "earned-income-tax-credit", "education-tax-credits"],
  },

  {
    slug: "free-ways-to-file",
    order: 60,
    topicId: "taxes",
    title: "Free Ways to File",
    dek: "You almost never need to pay to file a simple tax return. Here's how to do it for nothing.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Most simple returns can be filed for free.",
      "Free programs exist for lower- and middle-income filers.",
      "Free in-person help is available in many communities.",
      "Watch for 'free' that turns paid at checkout.",
    ],
    body: [
      {
        type: "p",
        text: "Tax companies spend a fortune advertising, so it's easy to assume filing costs money. For a simple return, it usually shouldn't. If your taxes are mostly [a W-2 and maybe a 1099](/learn/taxes/understanding-tax-forms), you have several genuinely free paths.",
      },
      {
        type: "h2",
        text: "Free government and nonprofit options",
      },
      {
        type: "p",
        text: "There are official, no-cost ways to file that many people qualify for, especially on lower and middle incomes. These are run or backed by the government, not by companies trying to upsell you.",
      },
      {
        type: "list",
        items: [
          "Free guided software programs offered through the government for filers under an income limit.",
          "Free fillable forms online, if you're comfortable doing the return yourself.",
        ],
      },
      {
        type: "h2",
        text: "Free in-person help",
      },
      {
        type: "p",
        text: "If you'd rather sit with a real person, free help exists and is genuinely good. Trained volunteers prepare returns at no cost for students, lower-income filers, older adults, and people who speak English as a second language. Search for free tax-prep help near you, or ask your school or local library.",
      },
      {
        type: "tip",
        text: "Many colleges run free tax-help events during filing season, sometimes with volunteers who speak multiple languages and understand student and first-time-filer situations. It's a good place to start if you feel unsure.",
      },
      {
        type: "h2",
        text: "Watch the 'free' that isn't",
      },
      {
        type: "p",
        text: "Some popular paid apps advertise \"free\" filing, then push you into a paid tier the moment your return is anything but the simplest, or charge extra to file your state return. The price often appears only at the very end, after you've done all the work.",
      },
      {
        type: "key",
        text: "Before you start typing in numbers, confirm the service is free for *your* situation, including your state return. If a fee suddenly appears at checkout, you can stop and switch to a truly free option. You don't owe them anything until you file.",
      },
      {
        type: "h2",
        text: "What you'll need on hand",
      },
      {
        type: "p",
        text: "Whichever route you pick, gather your forms first so you're not hunting mid-filing: your W-2s, any 1099s, your Social Security number or ITIN, and a bank account number if you want [your refund](/learn/taxes/tax-refund-explained) sent straight to you. Direct deposit is the fastest way to get your money.",
      },
      {
        type: "p",
        text: "Paying to file a simple return is one of the easiest expenses to avoid. A little checking up front keeps that money in your pocket.",
      },
    ],
    related: ["filing-taxes-first-time", "do-you-need-to-file", "earned-income-tax-credit"],
  },

  {
    slug: "self-employment-taxes",
    order: 140,
    topicId: "taxes",
    title: "Taxes When You're Self-Employed",
    dek: "When working for yourself becomes a real business, the tax system treats you like one. Here's what changes.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "When you work for yourself, you're taxed on profit, not everything you bring in.",
      "Self-employment tax is both halves of Social Security and Medicare.",
      "Separate accounts and steady records make everything easier.",
      "Nothing is withheld for you, so paying as you go is your job.",
    ],
    body: [
      {
        type: "p",
        text: "If you've moved past the occasional side gig into steady work for yourself (freelancing under your own name, selling regularly, building a client list), the tax system treats you as a business, even a business of one. That changes what you're taxed on, what you owe, and what you're expected to keep track of. If you're newer to this and mostly do app or platform work, start with [Taxes for Gig and 1099 Work](/learn/taxes/gig-1099-taxes); it covers the starter system of setting money aside and paying quarterly.",
      },
      {
        type: "h2",
        text: "You're taxed on profit, not revenue",
      },
      {
        type: "p",
        text: "The tax system doesn't tax every dollar your work brings in. It taxes your *profit*: what's left after the legitimate costs of doing the work come off the top. The expense categories that matter for gig work (mileage, supplies, platform fees, the work share of your phone or internet) apply here too, plus whatever your particular business genuinely requires to run. Every documented expense lowers your taxable income, which makes your records worth real money.",
      },
      {
        type: "p",
        text: "Save receipts and keep a running log. A basic spreadsheet or a cheap app is plenty. You need the totals at filing time, and you need proof if anyone ever asks.",
      },
      {
        type: "h2",
        text: "What self-employment tax is",
      },
      {
        type: "p",
        text: "At a regular job, FICA (the payroll taxes that fund Social Security and Medicare) gets split between you and your employer. When you work for yourself, you're both, so you cover both halves. That combined amount is called self-employment tax, and it comes *on top of* the regular income tax you'd owe anyway.",
      },
      {
        type: "p",
        text: "It sounds harsh, but it's the same Social Security and Medicare everyone pays. You're seeing the whole bill instead of half of it. It's also the main reason a tax bill on self-employment income runs bigger than people expect.",
      },
      {
        type: "h2",
        text: "Run it like a business",
      },
      {
        type: "p",
        text: "Because no employer is withholding anything, the discipline has to come from you, and a few habits do most of the work:",
      },
      {
        type: "list",
        items: [
          "**Keep a separate account for tax money.** Each time you're paid, move a set share into it; many freelancers park somewhere around a quarter to a third of each payment to be safe. Live on the rest as if the tax portion was already gone.",
          "**Pay as you go.** Once you earn a meaningful amount on your own, the government expects quarterly estimated payments rather than one bill in April. Paying quarterly avoids a penalty and keeps the balance from piling up.",
          "**Log expenses as they happen**, not in a panicked reconstruction the week taxes are due.",
        ],
      },
      {
        type: "key",
        text: "Two habits cover almost everything: set aside a share of every payment for taxes, and track your work expenses. Do those, and self-employment taxes become routine paperwork instead of a yearly crisis.",
      },
      {
        type: "p",
        text: "Working for yourself is a real way to build skills and income. Handle the tax side from the start, and if a year ever ends with a bill you can't cover, [there's a playbook for that too](/learn/taxes/cant-pay-taxes).",
      },
    ],
    related: ["gig-1099-taxes", "deductions-vs-credits", "cant-pay-taxes"],
  },
  {
    slug: "filing-with-itin",
    order: 110,
    topicId: "taxes",
    title: "Filing Taxes With an ITIN",
    dek: "No Social Security number? You can still file, and often should. Here's how it works.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "An ITIN lets you file taxes when you can't get an SSN.",
      "The IRS's job is taxes, not immigration enforcement.",
      "Filing can mean a refund and a paper trail that may matter later.",
      "Free, ITIN-savvy help exists. Don't overpay a sketchy tax shop.",
    ],
    body: [
      {
        type: "p",
        text: "If you earn money in the U.S. but can't get a Social Security number, you can still file taxes using an ITIN, an Individual Taxpayer Identification Number from the IRS. A lot of people are scared to file, or assume they can't. But for many, filing is both required and genuinely worth it.",
      },
      {
        type: "h2",
        text: "What an ITIN is",
      },
      {
        type: "p",
        text: "An ITIN is a tax ID for people who aren't eligible for an SSN. The IRS issues it regardless of immigration status; its purpose is to collect taxes, full stop. You apply with Form W-7, usually filed together with your first tax return, or through a Certified Acceptance Agent who can verify your documents.",
      },
      {
        type: "h2",
        text: "Why bother filing",
      },
      {
        type: "list",
        items: [
          "You might get a **refund** if too much was withheld from your pay.",
          "You may qualify for some tax credits (the rules differ from SSN filers, and free help can sort out which ones apply to you).",
          "It builds a **record of paying taxes**, which can matter in some immigration situations down the road.",
          "If you're required to file, filing keeps you on the right side of the law.",
        ],
      },
      {
        type: "p",
        text: "Taxes aren't the only system an ITIN can open up, either. It can also be a starting point for [building credit without a Social Security number](/learn/credit/build-credit-no-ssn).",
      },
      {
        type: "tip",
        text: "VITA sites and Certified Acceptance Agents can help you get an ITIN and file for free or low cost, often with multilingual staff. Don't pay a storefront 'tax office' a giant fee for something you can get done for free.",
      },
      {
        type: "key",
        text: "Filing taxes is a legal obligation and, for the IRS, just about taxes. But how taxes interact with your specific immigration case is a legal question. For that, talk to an accredited immigration attorney or nonprofit, not a tax preparer.",
      },
      {
        type: "p",
        text: "Not being able to get an SSN doesn't lock you out of the tax system or the money it can return to you. It means one extra form and finding a preparer who knows ITINs. Plenty do, [for free](/learn/taxes/free-ways-to-file).",
      },
    ],
    related: ["filing-taxes-first-time", "do-you-need-to-file", "free-ways-to-file"],
  },
  {
    slug: "earned-income-tax-credit",
    order: 90,
    topicId: "taxes",
    title: "The Tax Credit Low-Income Workers Leave Behind",
    dek: "The Earned Income Tax Credit can put thousands back in your pocket, but only if you claim it.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "The EITC is a refund for working people with low-to-moderate income.",
      "It can be worth thousands, even if you owe no tax at all.",
      "You only get it if you file, even when you weren't required to.",
      "Free tax help will check if you qualify.",
    ],
    body: [
      {
        type: "p",
        text: "Every year, billions of dollars in tax refunds go unclaimed. That's money belonging to working people who simply didn't know to ask, and a big chunk of it is the Earned Income Tax Credit, or EITC. If you work and don't earn a lot, this is the one to know about.",
      },
      {
        type: "h2",
        text: "What it is",
      },
      {
        type: "p",
        text: "The EITC is a *refundable* credit, which means it can come back to you as cash even if your tax bill is zero. (If the difference between [deductions and credits](/learn/taxes/deductions-vs-credits) is fuzzy, that's a five-minute read.) For a worker with kids, the EITC can be worth several thousand dollars. Without kids, it's smaller, but it's still real money.",
      },
      {
        type: "h2",
        text: "Who can get it",
      },
      {
        type: "p",
        text: "The basics: you need income from working (a job or self-employment), your total income has to be under a limit that depends on your family size, and you (and your spouse and any qualifying kids) generally need a valid Social Security number. For 2026 the credit is worth up to **$664** with no kids, **$4,427** with one child, **$7,316** with two, and **$8,231** with three or more. Income limits scale with family size, from roughly **$20,000** with no kids up to about **$70,000** for a married couple with three kids. The numbers shift a little each year; free tax software applies the right ones for you automatically.",
      },
      {
        type: "tip",
        text: "Filing with an ITIN means you usually can't claim the *federal* EITC, but several states offer their own version that ITIN filers can claim. It's worth asking a preparer about your state specifically.",
      },
      {
        type: "key",
        text: "You only get the EITC if you file a return, even if your income was low enough that you weren't required to file. Skipping your taxes can mean skipping thousands of dollars that are yours.",
      },
      {
        type: "p",
        text: "And don't pay extra to get it 'faster.' Skip the refund-advance loans with their fees. [File for free](/learn/taxes/free-ways-to-file) through a program like IRS Free File or VITA, claim the credit, and the refund comes.",
      },
    ],
    related: ["free-ways-to-file", "do-you-need-to-file", "deductions-vs-credits"],
  },
];
