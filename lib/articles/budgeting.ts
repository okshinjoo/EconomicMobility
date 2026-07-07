import type { Article } from "./types";

export const budgetingArticles: Article[] = [
  {
    slug: "building-your-first-budget",
    order: 10,
    topicId: "budgeting",
    title: "Building Your First Budget",
    dek: "A budget isn't a spreadsheet that judges you. It's a plan that finally tells you where your money goes.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A budget is permission to spend, not a punishment.",
      "Start from what actually hits your account, not your salary.",
      "Four steps get you a working budget in one sitting.",
      "If no one taught you this, that's exactly who it's for.",
    ],
    body: [
      {
        type: "p",
        text: "The first time real money is yours (a paycheck, a tax refund, birthday cash from a relative), it's a strange mix of exciting and a little terrifying. You want to be smart with it. You also might have no idea what *smart* even means, because nobody ever sat you down and explained it.",
      },
      {
        type: "p",
        text: "That's what a budget is for. Not a spreadsheet that makes you feel bad. Just a simple plan for where your money goes, so you stop getting to the end of the month wondering where it all went. And if you're the first in your family figuring this out, you're not behind. This guide was written for exactly that.",
      },
      {
        type: "h2",
        text: "Step 1: Start with what actually lands in your account",
      },
      {
        type: "p",
        text: "The first thing that trips people up: the number on your job offer, your salary, is not the money you get. After taxes and other deductions, what's left is your net income — your take-home pay. That smaller number is what you build a budget on, because it's what you actually have.",
      },
      {
        type: "tip",
        text: "Paid hourly, or your hours bounce around? Budget off a slower month, not your best one. If your plan survives a quiet month, the busy months feel like a bonus instead of a relief.",
      },
      {
        type: "h2",
        text: "Step 2: See where it's actually going",
      },
      {
        type: "p",
        text: "Pull up your last month of bank and card activity and look at it without judging yourself. You're sorting everything into two piles. Fixed costs stay about the same every month; variable costs jump around.",
      },
      {
        type: "list",
        items: [
          "**Fixed:** rent, phone bill, insurance, a bus pass, subscriptions.",
          "**Variable:** groceries, gas, eating out, that one Target run that somehow cost $80.",
        ],
      },
      {
        type: "p",
        text: "Don't aim for perfect. Round to the nearest ten bucks and keep moving. You're looking for patterns you've never actually noticed, not building a flawless ledger.",
      },
      {
        type: "h2",
        text: "Step 3: Give every dollar a job before the month starts",
      },
      {
        type: "p",
        text: "Now match your money to your life *on purpose*, ahead of time. A simple place to start is the [50/30/20 rule](/learn/budgeting/50-30-20-rule): roughly half your take-home for needs, 30% for the stuff that makes life good, and 20% toward savings and paying down debt. It's a starting point, not a law. Bend it to fit you.",
      },
      {
        type: "p",
        text: "The whole goal is one sentence: what you spend plus what you save should land at or under what you bring in. If it doesn't yet, that's not failure. That's the exact information you came here to find.",
      },
      {
        type: "h2",
        text: "Step 4: Check in (it takes ten minutes)",
      },
      {
        type: "steps",
        items: [
          "Pick a day (every other Sunday, say) and glance at your spending for ten minutes.",
          "Over in one category? Pull a little from another. You're steering, not failing.",
          "Move *something* to savings every month, even $20. The habit matters more than the amount.",
          "Redo the whole thing whenever your income or your life changes.",
        ],
      },
      {
        type: "key",
        text: "A budget should fit your life, not the other way around. If a plan keeps falling apart, the plan is wrong, not you.",
      },
      {
        type: "p",
        text: "Your first budget won't be perfect, and it doesn't need to be. You just need to know where your money's going, so you can finally point it somewhere you choose.",
      },
    ],
    related: ["needs-vs-wants", "50-30-20-rule", "opening-first-bank-account"],
    quiz: [
      {
        question: "Which number should your budget be built on?",
        options: [
          "The salary on your job offer",
          "Your take-home pay after taxes and deductions",
          "Your income during your best month",
        ],
        answer: 1,
        explain:
          "Your salary isn't the money you actually get. What lands in your account after taxes and deductions is what you really have to work with.",
      },
      {
        question: "Your hours bounce around from month to month. Which month should you budget off?",
        options: [
          "Your busiest, highest-earning month",
          "A slower month",
          "Whichever month is most recent",
        ],
        answer: 1,
        explain:
          "If your plan survives a quiet month, the busy months feel like a bonus instead of a relief.",
      },
      {
        question: "Halfway through the month, you've overspent in one category. What's the move?",
        options: [
          "Accept the budget failed and start fresh next month",
          "Stop tracking until things calm down",
          "Pull a little from another category and keep going",
        ],
        answer: 2,
        explain:
          "You're steering, not failing. A budget should fit your life, and small mid-month adjustments are exactly how it's supposed to work.",
      },
    ],
  },

  {
    slug: "needs-vs-wants",
    order: 20,
    topicId: "budgeting",
    title: "Needs vs. Wants — Without the Guilt",
    dek: "Sorting your spending isn't about cutting all the joy out of your life. Promise.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A need keeps your life running; a want makes it better.",
      "Plenty of spending is honestly a mix of both.",
      "Unplanned wants cause more damage than wants themselves.",
      "The goal is fewer money regrets, not fewer good times.",
    ],
    body: [
      {
        type: "p",
        text: "Almost every budget asks you to split your spending into needs and wants. That sounds easy until you're staring at your daily coffee, or the money you send to your family, or the gym membership you swear you'll use, wondering which pile any of it goes in. Here's how to sort it, minus the guilt.",
      },
      {
        type: "h2",
        text: "What's actually a need",
      },
      {
        type: "p",
        text: "A need is something your life genuinely can't run without. If skipping it would cost you your home, your job, your health, or your safety, it's a need.",
      },
      {
        type: "list",
        items: [
          "A roof: rent or a mortgage payment.",
          "The lights, the heat, the water.",
          "Groceries (the real ones, not the snack-aisle haul).",
          "Getting to work or class.",
          "Insurance and the minimum payments on any debt.",
        ],
      },
      {
        type: "h2",
        text: "What's a want",
      },
      {
        type: "p",
        text: "A want is anything that makes life nicer but you could technically live without: streaming, takeout, the upgraded phone, a weekend trip. None of these are bad. They're often the whole reason sticking to a budget feels worth it.",
      },
      {
        type: "tip",
        text: "Wants aren't the problem. *Unplanned* wants are. A night out you budgeted for feels amazing. The exact same night out that quietly empties your account feels awful. Same money, totally different feeling.",
      },
      {
        type: "h2",
        text: "When something is honestly both",
      },
      {
        type: "p",
        text: "A lot of life lives in the middle, and that's normal. Food is a need; a $16 delivery order is half want. A phone is a need; the newest model is a want. You don't have to label any of it perfectly. You just want to *notice* the want part, so you're choosing it on purpose instead of by accident.",
      },
      {
        type: "key",
        text: "Sorting needs from wants isn't about cutting all the fun. It's about covering what matters first, so the fun you do have comes guilt-free.",
      },
      {
        type: "p",
        text: "Once your spending is sorted, a framework like the [50/30/20 rule](/learn/budgeting/50-30-20-rule) suddenly clicks, because you already know which dollars are which.",
      },
    ],
    related: ["50-30-20-rule", "building-your-first-budget", "money-and-family"],
  },

  {
    slug: "50-30-20-rule",
    order: 30,
    topicId: "budgeting",
    title: "The 50/30/20 Rule, Explained",
    dek: "The one budgeting idea worth memorizing, and exactly how to bend it when life doesn't fit the math.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Roughly 50% needs, 30% wants, 20% savings and extra debt.",
      "The percentages are of your take-home, not your salary.",
      "It's a starting line you're meant to adjust.",
      "Even a messy version beats no plan at all.",
    ],
    body: [
      {
        type: "p",
        text: "If you only remember one budgeting idea, make it this one. The 50/30/20 rule is famous because it's hard to mess up: three buckets, math you can do in your head. (If you haven't built a budget at all yet, [Building Your First Budget](/learn/budgeting/building-your-first-budget) walks through the full setup.)",
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "Take what actually hits your account each month and split it three ways:",
      },
      {
        type: "list",
        items: [
          "**50% for needs:** rent, utilities, groceries, getting around, insurance, minimum debt payments.",
          "**30% for wants:** going out, hobbies, subscriptions, travel, the good stuff.",
          "**20% for future you:** building an emergency fund, investing, and throwing extra at debt.",
        ],
      },
      {
        type: "p",
        text: "So if your take-home pay is $3,000 a month, that's $1,500 for needs, $900 for wants, and $600 working on your behalf. Clean and simple.",
      },
      {
        type: "h2",
        text: "Why it uses take-home, not salary",
      },
      {
        type: "p",
        text: "The rule runs on the money you keep, not the bigger number before taxes. Those taxes and deductions came out before the paycheck ever reached you, so they're not yours to budget.",
      },
      {
        type: "h2",
        text: "Now bend it to your actual life",
      },
      {
        type: "p",
        text: "In a lot of cities, rent alone eats well past 50% of take-home. If that's you, you're not failing the rule; the rule needs to flex. Maybe it's 60/20/20 right now, or 50/20/30 while you're paying down a debt. Maybe part of your 30% goes to family instead of fun. The exact split matters less than the fact that you *have* one.",
      },
      {
        type: "tip",
        text: "Can't hit 20% for savings yet? Start at 5%. Future you would rather have a small habit that lasts than a perfect number you quit in two weeks.",
      },
      {
        type: "key",
        text: "A messy 50/30/20 still beats no budget. Don't let the perfect plan you won't follow crowd out the rough one you will.",
      },
    ],
    related: ["building-your-first-budget", "needs-vs-wants", "budgeting-irregular-income"],
  },

  {
    slug: "budgeting-irregular-income",
    order: 20,
    topicId: "budgeting",
    title: "Budgeting When Your Paycheck Is Never the Same",
    dek: "Gig work, tips, commissions, seasonal jobs: how to budget when no two months match.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Build your everyday budget around a slow month, not an average.",
      "A buffer account smooths out the good months and the bad.",
      "When money's tight, pay your needs in priority order.",
      "Treat a big month as a chance to get ahead, not to splurge.",
    ],
    body: [
      {
        type: "p",
        text: "Most budgeting advice quietly assumes a steady paycheck shows up every two weeks. For a lot of us, that's just not the world we live in. Tips, gig apps, commission, seasonal work, a few jobs at once. If your income swings, the usual advice can feel useless, so here's an approach built for the swing instead of against it.",
      },
      {
        type: "h2",
        text: "Budget off a slow month, not an average",
      },
      {
        type: "p",
        text: "Look back over the last 6 to 12 months and find a month that was on the lean side but realistic. Not your worst ever, just a quiet one. Build your normal, every-month budget around *that* number. If you can cover your life on a slow month, the good months stop being a relief and start being room to breathe.",
      },
      {
        type: "h2",
        text: "Use a buffer so feast and famine cancel out",
      },
      {
        type: "p",
        text: "This is the move that makes irregular income manageable: stop spending straight out of whatever comes in. In a strong month, leave the extra parked in a separate account. In a slow month, top your budget back up from it. You're basically paying yourself a steady salary and letting the buffer absorb the bumps.",
      },
      {
        type: "tip",
        text: "A [high-yield savings account](/learn/investing/high-yield-savings-account) is a good home for that buffer: your money stays available the moment you need it, but it earns a little interest while it waits.",
      },
      {
        type: "h2",
        text: "When it's tight, pay in order",
      },
      {
        type: "p",
        text: "On a rough month, the order you pay things in matters more than anything: housing and utilities first, then food and getting around, then insurance and minimum debt payments, then everything else. For the full triage, including what can usually wait and how to negotiate with creditors, see [When You Can't Pay Every Bill](/learn/budgeting/prioritizing-bills-when-money-is-tight).",
      },
      {
        type: "h2",
        text: "Make the big months count",
      },
      {
        type: "p",
        text: "When a great month or a surprise payment shows up, the instinct is to finally breathe and spend. Resist it a little. Refill your buffer first, then put extra toward an emergency fund or your highest-interest debt. Good months are your best and sometimes only shot at getting ahead.",
      },
      {
        type: "key",
        text: "Irregular income isn't a dealbreaker. Plan for the valleys and treat the peaks as chances to get ahead, not as spending money that fell from the sky.",
      },
    ],
    related: ["fixing-a-broken-budget", "sinking-funds", "money-and-family"],
  },

  {
    slug: "fixing-a-broken-budget",
    order: 30,
    topicId: "budgeting",
    title: "Why Your Budget Keeps Breaking (and How to Fix It)",
    dek: "If you keep blowing past your plan, you don't need more willpower. You need a better plan.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A budget that always breaks is too tight or too vague.",
      "Find where it actually leaks before you change a thing.",
      "Leave a little room for fun and for surprises.",
      "Automate the important stuff so willpower isn't the plan.",
    ],
    body: [
      {
        type: "p",
        text: "You made a budget. You *meant* it. Three weeks later you're over in two categories, annoyed at yourself, wondering why you even bother. First: this is common, and it almost never means you lack discipline. It usually means the budget needs a tune-up.",
      },
      {
        type: "h2",
        text: "Find the actual leak first",
      },
      {
        type: "p",
        text: "Before you change anything, pull up the last two or three months and look for the pattern. Almost every broken budget breaks in the same one or two spots, usually food, shopping, or a mystery pile called 'other.' You can't patch a leak you haven't found.",
      },
      {
        type: "h2",
        text: "The two usual suspects",
      },
      {
        type: "p",
        text: "Budgets that keep failing tend to fail for the same couple of reasons:",
      },
      {
        type: "list",
        items: [
          "**It's too tight.** You budgeted for the perfect version of yourself, with $0 for fun. Real life shows up, and the whole thing collapses by Thursday.",
          "**It's too vague.** A giant 'miscellaneous' category is quietly hiding the spending that's actually sinking you.",
        ],
      },
      {
        type: "h2",
        text: "Give it room to breathe",
      },
      {
        type: "p",
        text: "Add a real 'fun' line and a small cushion for surprises. A budget with a little slack survives a bad week. A budget stretched to the last dollar snaps the first time your car needs a part or a friend has a birthday. And for the predictable 'surprises' like car repairs and annual bills, [sinking funds](/learn/budgeting/sinking-funds) are the cleaner fix.",
      },
      {
        type: "tip",
        text: "If one category goes over by about the same amount every single month, the honest fix is usually to raise that category and lower another, not to keep promising yourself you'll magically do better.",
      },
      {
        type: "h2",
        text: "Take willpower out of it",
      },
      {
        type: "p",
        text: "The most reliable budgets barely rely on self-control at all. Automate the parts that matter: set savings to move the day after payday, and put your bills on autopay so they're handled before you can spend the money. What you never see, you won't accidentally spend.",
      },
      {
        type: "key",
        text: "A budget isn't a character test. If it keeps breaking, fix the budget, not your opinion of yourself.",
      },
    ],
    related: ["building-your-first-budget", "sinking-funds", "50-30-20-rule"],
  },

  {
    slug: "money-and-family",
    order: 70,
    topicId: "budgeting",
    title: "Helping Family Without Sinking Yourself",
    dek: "Sending money home or supporting family is real and good. Here's how to do it without drowning your own future.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Helping family is a value, not a weakness, but it needs a plan.",
      "Decide on an amount on purpose, before the asks come in.",
      "Your own emergency fund protects everyone you help.",
      "Loving someone and setting a limit are not opposites.",
    ],
    body: [
      {
        type: "p",
        text: "A lot of money advice quietly assumes your paycheck is only yours. For many of us, that was never the deal. You might send money home every month, cover a sibling's books, help a parent who's getting older, or be the person everyone calls when something breaks. That isn't a flaw in your budget. It's one of the most generous things you can do, and it deserves an actual plan rather than guilt and guessing.",
      },
      {
        type: "h2",
        text: "Decide the number before you're asked",
      },
      {
        type: "p",
        text: "The hardest moment to make a good decision is mid-request, when someone you love needs help and you're staring at your bank app. So make the call ahead of time. Pick an amount you can genuinely give each month and build it right into your budget as its own line, same as rent. Now helping isn't a stressful judgment call every time; it's already handled.",
      },
      {
        type: "tip",
        text: "Think of it like the oxygen-mask rule on a plane: you secure your own mask first, not because you matter more, but because you can't help anyone if you pass out. A version of you that's stable can support people for decades. A version that's broke and buried in debt can't.",
      },
      {
        type: "h2",
        text: "Protect the people you help by protecting yourself",
      },
      {
        type: "p",
        text: "An emergency fund isn't selfish here. It's the opposite. If you have a few months of expenses saved and your car dies, you handle it and keep sending support. If you have nothing saved, that same car repair can knock out *everyone* who depends on you, and maybe push you toward high-interest debt trying to cover it all.",
      },
      {
        type: "key",
        text: "Never borrow money you can't repay to give money away. Helping family should not quietly hand your future to a credit card company.",
      },
      {
        type: "h2",
        text: "When you have to say a hard thing",
      },
      {
        type: "p",
        text: "Sometimes the ask is bigger than you can give, and you have to say so. That's brutal when family is involved, and there's often history and obligation tangled into it. A few things that help:",
      },
      {
        type: "list",
        items: [
          "Lead with the love, then the limit: 'I want to help, and this month I can do this much.'",
          "Offer what you actually have. Sometimes it's time, a ride, or help applying for a benefit, not cash.",
          "Be honest that a steady, smaller amount you can sustain beats a big one that wrecks you next month.",
        ],
      },
      {
        type: "p",
        text: "Finding the actual words, especially across a generational or cultural gap, is its own skill. [Talking About Money With Your Family](/learn/budgeting/talking-about-money-with-family) is the companion guide for that conversation. Setting a limit doesn't mean you love anyone less. It means you're planning to be there for the long haul, which is its own kind of devotion.",
      },
    ],
    related: ["talking-about-money-with-family", "budgeting-irregular-income", "sinking-funds"],
  },

  {
    slug: "opening-first-bank-account",
    order: 50,
    topicId: "budgeting",
    title: "Opening Your First Bank Account",
    dek: "Checking, savings, and what you actually need to walk in (or sign up) with.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Checking is for spending; savings is for keeping.",
      "The right account charges you nothing to hold your money.",
      "You usually need an ID and a little cash to start.",
      "No SSN or a past bank problem doesn't have to stop you.",
    ],
    body: [
      {
        type: "p",
        text: "A bank account sounds like the most basic thing in the world, right up until it's your first one, nobody walked you through it, and the bank's website is a wall of fine print. If keeping your money in cash or on a prepaid card is what you know, that's okay. Here's the plain version of how this works.",
      },
      {
        type: "h2",
        text: "Checking vs. savings",
      },
      {
        type: "p",
        text: "You'll usually open two accounts, and they do different jobs:",
      },
      {
        type: "list",
        items: [
          "**Checking** is your day-to-day account. Your paycheck goes in, and you spend from it with a debit card, pay bills, and get cash.",
          "**Savings** is the account you mostly leave alone, where money you're not spending sits and (a little) grows.",
        ],
      },
      {
        type: "p",
        text: "Keeping them separate is a quiet superpower: money you move to savings stops feeling spendable, which is half the battle.",
      },
      {
        type: "h2",
        text: "Pick an account that charges you nothing",
      },
      {
        type: "p",
        text: "A good account costs nothing to hold your money. But some accounts are built to charge you — monthly maintenance fees, minimum-balance penalties, overdraft charges — and those fees hit people with low balances the hardest. Before you commit, read [Bank Fees and Overdrafts](/learn/budgeting/avoiding-bank-fees) so you know exactly what to look for and how to switch each fee off.",
      },
      {
        type: "tip",
        text: "Online banks and many credit unions offer free checking with no minimums and pay real interest on savings. You don't have to accept fees as the price of having a bank.",
      },
      {
        type: "h2",
        text: "What you'll need to open one",
      },
      {
        type: "p",
        text: "It's usually quick, online or in person. You'll generally need a government photo ID, your Social Security number or ITIN, an address, and a small amount to deposit. If you don't have a Social Security number, or a bank closed an account on you in the past, you still have real options: [Getting Into the Banking System Safely](/learn/budgeting/unbanked-underbanked) walks through ITIN accounts and second-chance checking.",
      },
      {
        type: "key",
        text: "The right first account is boring in the best way. It holds your money, charges you nothing, and quietly makes everything else easier: budgeting, saving, getting paid.",
      },
    ],
    related: ["avoiding-bank-fees", "unbanked-underbanked", "building-your-first-budget"],
  },

  {
    slug: "sinking-funds",
    order: 40,
    topicId: "budgeting",
    title: "Sinking Funds: Beating the 'Surprise' Bill",
    dek: "Most 'emergencies' aren't surprises at all. Here's the trick that turns them into a non-event.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A sinking fund saves a little at a time for a known future cost.",
      "It's not the same as an emergency fund; you want both.",
      "Predictable big bills stop wrecking your month.",
      "A few small automatic transfers do all the work.",
    ],
    body: [
      {
        type: "p",
        text: "Car repairs. The holidays. The insurance bill that lands once a year. New tires. We call these 'unexpected,' but be honest: you knew they were coming. A sinking fund is the quiet little trick that turns these budget-wreckers into a shrug.",
      },
      {
        type: "h2",
        text: "What a sinking fund actually is",
      },
      {
        type: "p",
        text: "A sinking fund is money you set aside a bit at a time for one specific, known cost down the road. Instead of getting hit with a $600 bill all at once, you tuck away $50 a month for a year, and the money is simply *there* when the bill shows up. Same cost, zero panic.",
      },
      {
        type: "h2",
        text: "How it's different from an emergency fund",
      },
      {
        type: "p",
        text: "People mix these up, but they do different jobs. An emergency fund is for the truly out-of-nowhere stuff — a job loss, a medical bill you never saw coming. A sinking fund is for the bills you *can* see coming and plan for. You want both: the emergency fund protects you from chaos, and your sinking funds protect you from the calendar.",
      },
      {
        type: "h2",
        text: "Setting one up",
      },
      {
        type: "steps",
        items: [
          "List your predictable big costs for the year: gifts, travel, car maintenance, annual fees.",
          "Add up each one's yearly total, then divide by 12 to get a monthly amount.",
          "Set a small automatic transfer for each, ideally into a [high-yield savings account](/learn/investing/high-yield-savings-account).",
          "When the bill arrives, pay it from the fund, guilt-free, because it was always the plan.",
        ],
      },
      {
        type: "tip",
        text: "You don't need a separate account for every fund. Most people keep one savings account and just track each fund's balance in a note or a simple spreadsheet.",
      },
      {
        type: "key",
        text: "Sinking funds are how people on totally normal incomes seem to never get rattled by a big bill. It isn't luck. They saw the bill coming and quietly saved a little each month.",
      },
    ],
    related: ["budgeting-irregular-income", "fixing-a-broken-budget", "cost-of-living"],
  },
];
