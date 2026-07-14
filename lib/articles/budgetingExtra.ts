import type { Article } from "./types";

export const budgetingExtraArticles: Article[] = [
  {
    slug: "budgeting-methods",
    order: 10,
    topicId: "budgeting",
    title: "Budgeting Methods That Actually Work",
    dek: "Zero-based, envelope, pay-yourself-first: three proven systems, and how to pick the one that fits your real life.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "There's no single 'right' budget; there are a few good systems.",
      "Zero-based gives every dollar a job before the month starts.",
      "Envelope makes overspending almost impossible.",
      "Pay-yourself-first puts savings first and lets the rest sort itself out.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably tried to budget before and quit. Most people have. It usually wasn't *you* that failed; it was a method that didn't fit how you actually live. A budget that works for a salaried office worker can be useless for someone juggling tips and gig apps. So instead of forcing yourself into one system, look at three real ones and find your match. (If you've never budgeted at all, start with [Building Your First Budget](/learn/budgeting/building-your-first-budget) and come back once the basics feel comfortable.)",
      },
      {
        type: "h2",
        text: "Zero-based: every dollar gets a job",
      },
      {
        type: "p",
        text: "With a zero-based budget, you take your take-home pay and assign every single dollar to something *before* the month begins (needs, wants, savings, debt) until you have zero dollars left unassigned. Not zero dollars in your account. Zero dollars without a purpose.",
      },
      {
        type: "p",
        text: "Say you bring home $2,500. You'd hand out all $2,500 on paper: $1,000 to rent, $400 to groceries, $200 to gas, and so on, right down to the last $50 for a 'fun' line. When you're done, income minus everything you assigned equals zero. It feels intense at first, and it is more work than the other two systems, but nothing slips through the cracks.",
      },
      {
        type: "tip",
        text: "Zero-based pairs well with a budgeting app, but a notebook works too. The tool matters less than the rule: no dollar gets to wander off without you noticing.",
      },
      {
        type: "h2",
        text: "Envelope: when a category's money is gone, you stop",
      },
      {
        type: "p",
        text: "The envelope method is old-school and effective for the categories that always blow up, like groceries, eating out, and shopping. You decide an amount for each, put that cash in a labeled envelope, and when an envelope is empty, you're done spending there until next month. No swiping, no 'I'll catch up later.'",
      },
      {
        type: "p",
        text: "If keeping cash on hand is what you grew up with, this one will feel natural. You don't have to use literal envelopes, either; plenty of apps and even some banks let you split money into digital 'buckets' that do the exact same thing.",
      },
      {
        type: "h2",
        text: "Pay-yourself-first: savings comes off the top",
      },
      {
        type: "p",
        text: "This one flips the usual order. Instead of saving whatever's left at the end of the month (usually nothing), you move money to savings *the moment you get paid*, before you spend on anything else. Then you live on what's left, guilt-free.",
      },
      {
        type: "p",
        text: "It's the lowest-effort system here, which is exactly why it works for so many people. You don't track every category. You protect your savings first and let the rest flow. Even $25 a paycheck builds a real habit once it's automatic — [Building a Savings Habit That Sticks](/learn/budgeting/building-a-savings-habit) covers how to set that up.",
      },
      {
        type: "h2",
        text: "Picking your match",
      },
      {
        type: "list",
        items: [
          "**Want control and detail?** Zero-based. You'll know where every dollar lives.",
          "**Keep overspending in a couple of categories?** Envelope. The empty envelope is the brake.",
          "**Hate tracking and just want to save?** Pay-yourself-first. Set it and forget it.",
        ],
      },
      {
        type: "key",
        text: "You can mix them, too. Lots of people pay themselves first *and* use envelopes for groceries and going out. The best method is the one you'll still be doing in three months.",
      },
      {
        type: "p",
        text: "Don't overthink the choice. Pick the one that sounds the least painful, run it for a month, and adjust. A budget is a tool you're allowed to swap out until one fits. And whichever you pick, a week of [tracking your spending](/learn/budgeting/tracking-your-spending) first makes the numbers real instead of guesses.",
      },
    ],
    related: ["building-a-savings-habit", "building-your-first-budget", "50-30-20-rule"],
  },

  {
    slug: "tracking-your-spending",
    order: 40,
    topicId: "budgeting",
    title: "How to Track Your Spending Without Losing Your Mind",
    dek: "You don't need a fancy app or a perfect spreadsheet, just a habit that takes a few minutes and tells you the truth.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Tracking is just noticing, not judging.",
      "Pick the easiest method you'll actually keep doing.",
      "A few minutes a week beats a perfect system you quit.",
      "The goal is patterns, not a flawless ledger.",
    ],
    body: [
      {
        type: "p",
        text: "Ever get to the end of the month and genuinely wonder where your money went? You weren't reckless. You just didn't watch it go. That's the whole secret of tracking spending: not discipline, not a fancy app, just *looking*. And it's less painful than you think.",
      },
      {
        type: "h2",
        text: "Why tracking matters more than budgeting",
      },
      {
        type: "p",
        text: "A budget is a guess about the future; tracking shows you the actual past. You can plan to spend $300 on food all you want. Tracking is what tells you it was really $480. You can't fix what you can't see, and tracking is just turning the lights on.",
      },
      {
        type: "h2",
        text: "Pick the method you'll actually stick with",
      },
      {
        type: "p",
        text: "There's no prize for the fanciest system. Pick whichever of these you'd genuinely keep up:",
      },
      {
        type: "list",
        items: [
          "**The app way.** Link your bank to a budgeting app and let it sort your spending automatically. Least effort, but you have to trust it with your info.",
          "**The spreadsheet way.** A simple sheet with date, amount, and category. More work, total control.",
          "**The notes way.** Jot every purchase in your phone's notes app the second you make it. Old-fashioned, but you *feel* every dollar.",
        ],
      },
      {
        type: "tip",
        text: "If you're just starting, don't track forever. Track everything for one honest month. That single month usually shows you the leaks, and from there you only need to watch the categories that surprised you.",
      },
      {
        type: "h2",
        text: "Make it a tiny weekly ritual",
      },
      {
        type: "p",
        text: "The people who keep this up don't do anything heroic. Once a week (Sunday coffee, payday, whenever), they spend five minutes looking at what they spent. That's it. No app can replace that little moment of *oh, that's where it's going.*",
      },
      {
        type: "h2",
        text: "Don't let one bad week end it",
      },
      {
        type: "p",
        text: "You will forget to log things. You'll have a chaotic week where you track nothing. That's normal and it's fine. Tracking isn't all-or-nothing; a month with a few gaps still teaches you more than not tracking at all. Just pick it back up.",
      },
      {
        type: "key",
        text: "Tracking is about awareness, not guilt. Once you can see your spending clearly, you get to make real choices instead of being surprised every month.",
      },
      {
        type: "p",
        text: "A sensible first step: pick your method and track one full month. That month of honest data is what makes [your first budget](/learn/budgeting/building-your-first-budget) realistic instead of a guess.",
      },
    ],
    related: ["building-a-savings-habit", "building-your-first-budget", "fixing-a-broken-budget"],
  },

  {
    slug: "unbanked-underbanked",
    order: 60,
    topicId: "budgeting",
    title: "Getting Into the Banking System Safely",
    dek: "If you've been locked out of banks, or burned by them, here's how to get a real account and stop paying to use your own money.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A past bank problem doesn't lock you out forever; second-chance accounts exist.",
      "You can often open an account with an ITIN, not just a Social Security number.",
      "Credit unions are member-owned and tend to be friendlier and cheaper.",
      "Check cashers and payday lenders are the most expensive way to handle money.",
    ],
    body: [
      {
        type: "p",
        text: "Maybe a bank closed your account years ago over an overdraft. Maybe no one in your family ever had one, so cash and money orders are just how things are done. Maybe you don't have a Social Security number and assumed banks were off-limits. None of that means you're stuck. Getting into the banking system safely is one of the highest-value moves you can make, because it stops you from paying fees just to touch your own paycheck.",
      },
      {
        type: "h2",
        text: "Why staying outside the banks costs you",
      },
      {
        type: "p",
        text: "Living on cash and check cashers feels simpler, but it's quietly expensive. Cashing a check can cost a few percent every single time. On a $1,000 paycheck, that might be $20 or $30 gone, every payday, just to get *your own money*. Money orders, prepaid card fees, and the risk of carrying cash all add up. A free checking account does the same job for $0.",
      },
      {
        type: "h2",
        text: "If a bank closed your account before",
      },
      {
        type: "p",
        text: "Banks share a record of past account problems, and one bad chapter can get you turned down. But it's not a life sentence. Ask specifically about a **second-chance checking account** — these are built for exactly this situation. They may charge a small monthly fee at first, but if you use it responsibly for a while, you can usually graduate to a normal free account.",
      },
      {
        type: "h2",
        text: "If you don't have a Social Security number",
      },
      {
        type: "p",
        text: "Something a lot of people don't know: many banks and credit unions let you open an account with an **ITIN** (Individual Taxpayer Identification Number) instead of a Social Security number. You'll typically bring an ITIN, a government or consular photo ID, and proof of address. Call ahead and ask which documents that specific branch accepts. It varies, and asking saves a wasted trip.",
      },
      {
        type: "tip",
        text: "Credit unions are often the warmest place to start. They're member-owned nonprofits, which usually means lower fees, smaller minimums, and staff more willing to work with second-chance situations or ITIN accounts. Look for one that serves your community or where you work.",
      },
      {
        type: "h2",
        text: "Steer clear of the predators",
      },
      {
        type: "p",
        text: "As you get set up, know that some businesses make their money off people who feel they have no other option. Be careful here:",
      },
      {
        type: "list",
        items: [
          "**Payday lenders.** Short-term loans with fees that work out to staggeringly high interest. One loan often turns into a cycle that's brutal to escape.",
          "**Car-title loans.** Borrow against your car and you can lose the car. Avoid.",
          "**Check cashers.** Fine in a pinch, but a costly habit. A real bank account replaces them.",
          "**'Instant' refund or advance offers.** They hand you your own money early and keep a slice. Patience is cheaper.",
        ],
      },
      {
        type: "p",
        text: "If a place is eager to give you money *fast* and *easy*, that speed is usually what you're overpaying for. [Payday Loans and Predatory Lending](/learn/government-aid/payday-loans-and-predatory-lending) covers how these traps work in detail.",
      },
      {
        type: "key",
        text: "Real banks and credit unions are slower than the storefront lenders, and far cheaper. They're the safe road in.",
      },
      {
        type: "p",
        text: "This article is general guidance, not advice about your exact situation. The next step is simple: pick one nearby credit union or a well-known bank, call, and ask what you'd need to open a free checking account. When you're ready, [Opening Your First Bank Account](/learn/budgeting/opening-first-bank-account) walks through the actual how-to.",
      },
    ],
    related: ["checking-vs-savings", "opening-first-bank-account", "new-to-america-money"],
  },

  {
    slug: "what-is-apy",
    order: 110,
    topicId: "budgeting",
    title: "What Is APY? Making Your Savings Actually Grow",
    dek: "Two savings accounts can hold the same money, and one quietly pays you while the other does nothing. The difference is APY.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "APY is the yearly rate your savings earns, compounding included.",
      "Many big-bank savings accounts pay almost nothing.",
      "High-yield savings accounts can pay far more for the same money.",
      "Compounding means your interest starts earning interest, too.",
    ],
    body: [
      {
        type: "p",
        text: "Picture two people who each put $5,000 in savings and don't touch it for a year. One earns about fifty cents. The other earns over a hundred dollars. Same money, same year, no extra work. The only difference is a little three-letter term most people skim right past: APY.",
      },
      {
        type: "h2",
        text: "What APY actually means",
      },
      {
        type: "p",
        text: "APY stands for Annual Percentage Yield. In plain words, it's how much your money grows in a year just for sitting in the account, already including the bonus from compounding (more on that in a second). The higher the APY, the more the bank pays *you* for keeping your money there.",
      },
      {
        type: "p",
        text: "The catch that costs people real money: many large, familiar banks pay a tiny APY on basic savings, so small your balance barely moves. Meanwhile, **high-yield savings accounts**, often at online banks and credit unions, can pay many times more for the exact same dollars.",
      },
      {
        type: "h2",
        text: "Why compounding makes it better than it sounds",
      },
      {
        type: "p",
        text: "Compounding is the quiet hero. When your savings earns interest, that interest gets added to your balance, and then *it* starts earning interest too. Your money makes money, and then that money makes money. It's slow at first and then genuinely satisfying over time. ([The Magic of Compound Interest](/learn/investing/magic-of-compound-interest) shows how far this goes over the years.)",
      },
      {
        type: "tip",
        text: "Rates move with the economy: in 2026 the best high-yield savings accounts have been paying somewhere around **4%**, versus close to **0.01%** at many big banks. So don't chase an exact number; just check the current APY before you open anything and make sure you're not stuck in an account paying next to nothing.",
      },
      {
        type: "h2",
        text: "What to do about it",
      },
      {
        type: "p",
        text: "Look up the APY on your current savings account; it's often shockingly low. If it's paying next to nothing, consider moving your savings, especially your emergency fund, to a high-yield account. [What Is a High-Yield Savings Account?](/learn/investing/high-yield-savings-account) covers how these accounts work and how to shop for one. Whatever you pick, make sure it's FDIC- or NCUA-insured — that's your money-is-protected stamp.",
      },
      {
        type: "key",
        text: "Your emergency fund and savings should live in a high-yield account. The money stays just as safe and just as available; it simply earns more while it waits.",
      },
      {
        type: "p",
        text: "You don't need to follow the economy to benefit from this. Check your rate once, move the money if it's earning nothing, and let the account do the rest.",
      },
    ],
    related: ["building-a-savings-habit", "saving-on-a-tight-budget", "sinking-funds"],
  },

  {
    slug: "saving-on-a-tight-budget",
    order: 50,
    topicId: "budgeting",
    title: "Saving Money When There's Barely Any to Save",
    dek: "When every dollar is already spoken for, saving feels impossible. Here's where the room actually hides.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Saving on a tight budget is about consistency, not size.",
      "Even $5 a week is a real, working savings habit.",
      "Tiny fixed costs and fees quietly drain tight budgets.",
      "Windfalls like tax refunds are your biggest chances to get ahead.",
    ],
    body: [
      {
        type: "p",
        text: "Most money articles skip right past a basic fact: sometimes there isn't extra money. Rent's up, groceries cost more, and the advice to 'just save 20%' can feel almost insulting. If that's where you are, you're not doing anything wrong. This article is about where saving hides when every dollar is already spoken for.",
      },
      {
        type: "h2",
        text: "Start smaller than feels worth it",
      },
      {
        type: "p",
        text: "When money's tight, the goal is to keep a small habit alive that can grow later, not to save a lot right now. Five dollars a week is $260 a year: a real emergency cushion built from an amount you'll barely feel. The mechanics of making that automatic, and why a tiny automated amount beats waiting for 'extra' money, are covered in [Building a Savings Habit That Sticks](/learn/budgeting/building-a-savings-habit). What that guide can't do is find you the five dollars. That's what the rest of this one is for.",
      },
      {
        type: "h2",
        text: "Hunt the quiet leaks first",
      },
      {
        type: "p",
        text: "When there's no slack, the savings usually hides in small recurring costs, not big sacrifices. These add up shockingly fast:",
      },
      {
        type: "list",
        items: [
          "**Forgotten subscriptions.** That streaming service or app fee you stopped using months ago.",
          "**Bank and overdraft fees.** Switch to a free account and stop paying to hold your own money.",
          "**Check-cashing and money-order fees.** A bank account erases these entirely.",
          "**The 'small' daily buy.** Not to ban it, just to *notice* it; $4 a day is over $1,400 a year.",
        ],
      },
      {
        type: "h2",
        text: "Use the windfalls before they vanish",
      },
      {
        type: "p",
        text: "On a tight budget, your real savings chances often arrive in lumps: a tax refund, a bonus, back pay, birthday money, a side gig that paid off. The instinct is to absorb it into everyday life, where it disappears without a trace. Instead, grab even part of it for savings the moment it lands.",
      },
      {
        type: "p",
        text: "A tax refund especially can be a once-a-year shot at a real cushion. Sending even a few hundred dollars of it straight to savings, before it has a chance to evaporate, can do more than months of squeezing pennies.",
      },
      {
        type: "h2",
        text: "Be gentle with yourself about the pace",
      },
      {
        type: "p",
        text: "Some months you'll save nothing, because something broke or someone needed help. That's not failure; that's a tight budget being a tight budget. Saving on low income isn't a straight line up. It's stubborn: you keep the habit alive, you protect it when you can, and you don't quit just because a hard month happened.",
      },
      {
        type: "key",
        text: "A tiny amount saved consistently beats a big amount you keep waiting to be able to afford. The habit is the whole thing. The dollars grow on their own once life gives you room.",
      },
      {
        type: "p",
        text: "If you want a place to start this week, do the leak hunt: pull up your last bank statement, find one recurring charge you don't need, and redirect that amount to savings. Money you were already spending doesn't feel like a sacrifice.",
      },
    ],
    related: ["building-a-savings-habit", "what-is-apy", "budgeting-irregular-income"],
  },

  {
    slug: "cost-of-living",
    order: 60,
    topicId: "budgeting",
    title: "What It Really Costs to Live",
    dek: "The rent is only the beginning. Here's the full, honest picture of what a life actually costs each month.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Your true cost of living is far more than rent.",
      "Hidden and irregular costs catch people off guard.",
      "Knowing your real number tells you what you must earn.",
      "Where you live can change the math more than how you spend.",
    ],
    body: [
      {
        type: "p",
        text: "Ask most people what it costs them to live and they'll name their rent. But rent is just the headline. The real cost of living is the whole quiet pile underneath it: the bills, the small leaks, the once-a-year surprises. Until you know that true number, you're flying blind. You can't tell whether a job pays enough, whether you can move out, or how much breathing room you actually have.",
      },
      {
        type: "h2",
        text: "Start with the obvious, then keep going",
      },
      {
        type: "p",
        text: "Everyone counts the big monthly costs. List yours first:",
      },
      {
        type: "list",
        items: [
          "**Housing.** Rent or mortgage, plus renters insurance.",
          "**Utilities.** Electric, gas, water, internet, phone.",
          "**Food.** Groceries, plus the eating out you'll realistically do.",
          "**Transportation.** Car payment, gas, insurance, and repairs, or transit fares.",
          "**Health.** Insurance premiums, copays, prescriptions.",
        ],
      },
      {
        type: "h2",
        text: "The costs that ambush you",
      },
      {
        type: "p",
        text: "This is where people underestimate their life by hundreds of dollars a month. These don't hit every month, which is exactly why they're easy to forget, and exactly why they wreck budgets:",
      },
      {
        type: "list",
        items: [
          "**Annual or twice-a-year bills.** Car registration, insurance paid in lumps, certain taxes.",
          "**Replacements.** Clothes, shoes, a phone that finally dies, a worn-out mattress.",
          "**Care costs.** Childcare, money sent to family, a pet's vet visit.",
          "**Just-being-alive costs.** Haircuts, toiletries, a birthday gift, the dentist.",
        ],
      },
      {
        type: "tip",
        text: "To find your *real* monthly number, add up these irregular costs for a whole year and divide by 12. A $600 yearly car insurance bill is really $50 a month; treat it that way and it never blindsides you. Setting that money aside as you go is exactly what [sinking funds](/learn/budgeting/sinking-funds) are for.",
      },
      {
        type: "h2",
        text: "What knowing the number buys you",
      },
      {
        type: "p",
        text: "Once you know your true cost of living, everything gets clearer. You can look at [a job offer](/learn/budgeting/reading-a-job-offer) and know at a glance whether it covers your life or leaves you short. You can tell how much of a raise is real and how much gets eaten by costs. You stop guessing and start deciding with actual facts.",
      },
      {
        type: "h2",
        text: "Where you live changes the whole equation",
      },
      {
        type: "p",
        text: "Cost of living swings wildly by place. The same paycheck that feels tight in an expensive city can feel comfortable a few hours away. This matters most around big decisions: a move, a new job, helping family decide where to settle. Sometimes the fastest way to fix a budget isn't spending less; it's living somewhere the math simply works better.",
      },
      {
        type: "key",
        text: "Your true cost of living is the most useful number in your whole financial life. It's the line your income has to clear. Once you know it, you're never negotiating or planning blind again.",
      },
      {
        type: "p",
        text: "Sit down once and build this number honestly, irregular costs and all. It might be higher than you expected, but a number you can see is a number you can plan around. That's worth far more than a comfortable guess.",
      },
    ],
    related: ["sinking-funds", "building-your-first-budget", "reading-a-job-offer"],
  },

  {
    slug: "building-a-savings-habit",
    order: 100,
    topicId: "budgeting",
    title: "Building a Savings Habit That Sticks",
    dek: "The people who save aren't more disciplined than you. They've built a system that runs whether they feel like it or not.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A habit beats motivation; willpower runs out, systems don't.",
      "Automating savings is the single most powerful move.",
      "Start small enough that it's almost impossible to fail.",
      "Naming your savings goal makes it far easier to keep.",
    ],
    body: [
      {
        type: "p",
        text: "Most people think saving money is about discipline: gritting your teeth and going without. But the people who actually save aren't more disciplined than you. They've set things up so saving happens automatically, on its own, without a daily fight. That's a system, not a personality trait, and you can build it this week.",
      },
      {
        type: "h2",
        text: "Why willpower keeps losing",
      },
      {
        type: "p",
        text: "Relying on motivation to save is like relying on a good mood to do the dishes: it works until it doesn't. Some months you're inspired; most months you're tired and the money quietly gets spent. A habit removes the decision entirely. You're not choosing to save each time. You've already chosen, once.",
      },
      {
        type: "h2",
        text: "Automate first — it does the heavy lifting",
      },
      {
        type: "p",
        text: "If you do only one thing from this whole article, do this: set up an automatic transfer to savings the day after payday. The money moves before you ever see it, before it can become groceries or a night out. You live on what's left and don't miss what was never in front of you.",
      },
      {
        type: "tip",
        text: "Keep your savings at a *different* bank than your checking, ideally a [high-yield savings account](/learn/investing/high-yield-savings-account). A few extra clicks to reach it is just enough friction to stop the impulse 'I'll borrow from savings' moment.",
      },
      {
        type: "h2",
        text: "Start so small you can't fail",
      },
      {
        type: "p",
        text: "The biggest mistake is starting too ambitious: $300 a month, feeling the pinch, quitting in week two. Flip it. Start with an amount so small it's almost silly, like $10 a paycheck. The point right now is proving to yourself that you're someone who saves, not the dollar amount. You raise the amount later, once the habit is real. And if even $10 feels out of reach, that's a different problem with its own playbook — [Saving Money When There's Barely Any to Save](/learn/budgeting/saving-on-a-tight-budget) is about finding the room first.",
      },
      {
        type: "h2",
        text: "Give the money a name",
      },
      {
        type: "p",
        text: "'Savings' is vague and easy to raid. A *named* goal is something you protect. When the account is labeled for a specific thing, spending it suddenly feels like stealing from your own future. Try goals like:",
      },
      {
        type: "list",
        items: [
          "**Emergency fund.** Your first and most important cushion.",
          "**A deposit.** For an apartment, a used car, a fresh start.",
          "**A trip home.** To see family you haven't seen in too long.",
          "**Breathing room.** Just not living paycheck to paycheck anymore.",
        ],
      },
      {
        type: "key",
        text: "Automate a small amount, give it a name, and don't break the chain. The habit matters more than the number, because the habit is what's still standing a year from now.",
      },
      {
        type: "p",
        text: "You don't need more income or more willpower to start. You need one automatic transfer and one tiny amount. Set the transfer for the day after your next payday, and the system carries it from there.",
      },
    ],
    related: ["saving-on-a-tight-budget", "what-is-apy", "budgeting-methods", "money-order-of-operations"],
  },

  {
    slug: "know-your-rights-as-a-worker",
    order: 120,
    topicId: "budgeting",
    title: "Getting Paid What You're Owed: Your Rights as a Worker",
    dek: "Wage theft is common, quiet, and usually illegal. Here's how to spot it, and why your status doesn't change your right to be paid.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Wage theft is common and often illegal, even when it feels normal.",
      "Overtime, minimum wage, and breaks have real legal protections.",
      "These protections generally apply regardless of immigration status.",
      "Keeping your own record of hours is your strongest move.",
    ],
    body: [
      {
        type: "p",
        text: "A lot of people, especially in low-wage and immigrant jobs, get cheated out of money they earned and never realize it's against the law. It gets treated as just 'how the job works.' But being shorted on your pay isn't normal, and in many cases it isn't legal. This is general education, not legal advice, but knowing the basics is how you stop quietly losing money that's yours.",
      },
      {
        type: "h2",
        text: "What wage theft actually looks like",
      },
      {
        type: "p",
        text: "Wage theft isn't always someone obviously stealing from you. It's usually small and routine, which is exactly why it works. Some of the common forms:",
      },
      {
        type: "list",
        items: [
          "**Paid below minimum wage.** Being paid less per hour than the law requires where you work.",
          "**Not paid for all your hours.** Being told to clock out and keep working, working through unpaid breaks, or doing setup and cleanup 'off the clock.'",
          "**No overtime.** For most hourly workers, hours over 40 in a week generally have to be paid at time-and-a-half. Some jobs are exceptions, but many that skip overtime shouldn't.",
          "**Stolen tips.** A manager or owner taking a cut of tips that should be yours.",
          "**Fake 'independent contractor' labels.** Being called a contractor to dodge minimum wage, overtime, and other protections, even though you're really treated like an employee.",
        ],
      },
      {
        type: "p",
        text: "If a few of these sound familiar, you're not imagining it, and you're not being greedy for noticing. You did the work. You're owed the pay.",
      },
      {
        type: "h2",
        text: "The part that matters most: your status doesn't erase your rights",
      },
      {
        type: "p",
        text: "This is the part too many people are never told, often on purpose. Core wage protections (the right to be paid for the hours you worked, at least minimum wage, with overtime where it applies) generally apply *regardless of your immigration status*. An employer who hints that you can't complain because of your status is often counting on fear to get away with not paying you.",
      },
      {
        type: "key",
        text: "You have the right to be paid for work you actually did, and that right generally doesn't depend on your immigration status. If anyone tells you otherwise to avoid paying you, that's a reason to get accurate advice, not to stay silent.",
      },
      {
        type: "p",
        text: "Because every situation is different and the details get complicated fast, this is exactly the kind of thing to check with a real source rather than take a coworker's word on. Free legal aid organizations and the government agencies below exist for this.",
      },
      {
        type: "h2",
        text: "Keep your own record",
      },
      {
        type: "p",
        text: "If your employer is shorting your hours, their records won't help you, so keep your own. This is the single most powerful, low-effort thing you can do, and you can start today.",
      },
      {
        type: "steps",
        items: [
          "Each shift, jot down the date, the time you started, the time you stopped, and any breaks.",
          "Note your pay rate and what you were actually paid each period.",
          "Keep your pay stubs, texts about your schedule, and anything in writing.",
          "Store it somewhere that's yours: a notebook, a notes app, a personal email to yourself.",
        ],
      },
      {
        type: "tip",
        text: "You don't need anything fancy. A running note on your phone with shift times is enough to show a pattern later, especially once you compare it against [your pay stub](/learn/budgeting/how-to-read-a-pay-stub). The point is that the record is yours and your employer can't quietly change it.",
      },
      {
        type: "h2",
        text: "Where to go for help",
      },
      {
        type: "p",
        text: "If you think you're being underpaid, you don't have to confront your boss alone or just absorb the loss. You can file a complaint with the U.S. Department of Labor's Wage and Hour Division, or with your state's labor agency. These complaints can often be made confidentially.",
      },
      {
        type: "list",
        items: [
          "**The U.S. Department of Labor (Wage and Hour Division)** handles minimum wage and overtime complaints, and has resources in multiple languages.",
          "**Your state labor agency** may offer additional protections beyond federal law.",
          "**Free legal aid and worker centers** can help you understand your specific situation, often at no cost.",
        ],
      },
      {
        type: "p",
        text: "Knowing your rights is how you stop being quietly cheated out of money you earned, not a way of picking a fight. The law is on the side of getting paid for your work.",
      },
    ],
    related: [
      "how-to-read-a-pay-stub",
      "your-first-paycheck",
      "reading-a-job-offer",
    ],
  },

  {
    slug: "buying-a-used-car",
    order: 130,
    topicId: "budgeting",
    title: "Buying a Used Car Without Getting Ripped Off",
    dek: "A car might be the biggest thing you ever buy, and the process is full of traps. Here's how to walk in ready.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "Budget for the total cost of owning a car, not just the monthly payment.",
      "Line up your own financing before you ever walk into a dealer.",
      "Always get an independent inspection and check the car's history.",
      "Negotiate the total price, not the monthly payment.",
    ],
    body: [
      {
        type: "p",
        text: "For a lot of young people, a car is the biggest purchase they've ever made, and the whole process is built in a way that can quietly cost you thousands if you don't know the moves. The traps are predictable, though. Walk in knowing how they work, and you flip the whole thing in your favor.",
      },
      {
        type: "h2",
        text: "Budget for the *whole* car, not the payment",
      },
      {
        type: "p",
        text: "The most expensive mistake is thinking about a car as one number: the monthly payment. A car costs far more than that to actually own, and the extra costs are the ones that sink people. Before you shop, add up everything:",
      },
      {
        type: "list",
        items: [
          "**Insurance.** Required, and it can be a real chunk every month.",
          "**Gas.** Depends on the car and how far you drive.",
          "**Maintenance and repairs.** Oil changes, tires, brakes, and the surprises.",
          "**Registration, taxes, and fees.** The paperwork costs of owning a car where you live.",
        ],
      },
      {
        type: "p",
        text: "When all of that fits in your budget, not just the loan payment, *then* you know what you can really afford. A car you can technically make payments on but can't afford to insure and fix isn't affordable. The [auto loan calculator](/tools/debt/auto-loan) will show you what a given price, rate, and term actually cost per month before you shop.",
      },
      {
        type: "h2",
        text: "Get your financing lined up first",
      },
      {
        type: "p",
        text: "The move that quietly saves people the most: arrange your loan *before* you walk into the dealership. Go to a bank or credit union and ask about a *pre-approval*. They tell you how much they'll lend and at what rate, in writing, ahead of time.",
      },
      {
        type: "p",
        text: "Why it matters: dealers make money on financing, too. If their loan is your only option, you have no leverage. If you already have a pre-approval in your pocket, the dealer has to *beat* it to win your business. Either you get a better rate or you keep the one you walked in with. You can't lose.",
      },
      {
        type: "tip",
        text: "Credit unions are often worth a look for car loans. Many offer competitive rates and are used to working with first-time borrowers, and having a pre-approval also makes you a more serious buyer at the lot.",
      },
      {
        type: "h2",
        text: "Do your homework on the actual car",
      },
      {
        type: "p",
        text: "Before you fall in love with a specific car, two non-negotiables protect you from buying someone else's problem:",
      },
      {
        type: "list",
        items: [
          "**Check the value.** Look up what that make, model, year, and mileage is roughly worth, so you know whether the asking price is fair before you ever talk numbers.",
          "**Check the history and get it inspected.** Pull the vehicle history report for accidents and title problems, then have your *own* independent mechanic inspect it before you buy. A used car you didn't inspect is a gamble; the inspection fee is tiny next to a hidden engine problem.",
        ],
      },
      {
        type: "p",
        text: "If a seller won't let you take the car to an independent mechanic, treat that as your answer and walk. An honest seller has no reason to refuse.",
      },
      {
        type: "h2",
        text: "Negotiate the total price, never the monthly payment",
      },
      {
        type: "p",
        text: "This is the single most important habit at the dealership, and it's where most bad deals hide. A salesperson will almost always steer you toward 'What do you want your monthly payment to be?' It sounds helpful. It's a trap.",
      },
      {
        type: "key",
        text: "Always negotiate the *total price* of the car, not the monthly payment. A low monthly payment can hide a high price, a high interest rate, or a loan stretched out for years that costs you far more in the end. Lock the total price first; talk financing after.",
      },
      {
        type: "h2",
        text: "The whole process, step by step",
      },
      {
        type: "steps",
        items: [
          "Set your true budget, including insurance, gas, maintenance, and fees.",
          "Get pre-approved for a loan at a bank or credit union before you shop.",
          "Find cars in your range and look up what each one is actually worth.",
          "Test drive it, pull its history report, and have your own mechanic inspect it.",
          "Negotiate the total price (not the monthly payment) and compare the dealer's financing against your pre-approval.",
          "Read everything before you sign, and decline add-ons you didn't plan for.",
        ],
      },
      {
        type: "h2",
        text: "Watch the signing table",
      },
      {
        type: "p",
        text: "The last room, the finance office, is where extras get piled on after you think you're done. You'll be offered things like extended warranties, paint protection, gap insurance, and other add-ons, sometimes with pressure and a 'today only' feel. Some have value; many don't.",
      },
      {
        type: "p",
        text: "You're allowed to say no to every one of them, take your time, and ask for any cost in writing. If anyone makes you feel rushed or cornered, that's your signal to slow down, not to speed up. A good deal is still a good deal tomorrow.",
      },
      {
        type: "p",
        text: "You don't need to be a tough negotiator or a car expert to buy a used car well. Know the few places the process is rigged, show up prepared, and be willing to walk away.",
      },
    ],
    related: [
      "leasing-vs-buying-car",
      "auto-insurance-basics",
      "what-happens-if-you-dont-pay-debts",
    ],
  },

  {
    slug: "new-to-america-money",
    order: 45,
    topicId: "budgeting",
    title: "New to the U.S.: Your First Year of American Money",
    dek: "A map of the American money system for your first year here: banking, credit, taxes, and which guide to read at each step.",
    level: "Beginner",
    readMinutes: 3,
    takeaways: [
      "Getting into a real bank account is the first move; everything else builds on it.",
      "An ITIN opens doors to banking, credit, and tax filing if you don't have an SSN.",
      "Your credit history starts at zero here no matter what you built back home.",
      "Some scams are aimed specifically at newcomers; learn them before they find you.",
    ],
    body: [
      {
        type: "p",
        text: "Moving to the United States means learning a new money system on top of everything else: unfamiliar banks, a credit score you've never had, a tax agency with its own alphabet of forms, and plenty of people offering confident wrong answers. You don't have to figure it all out at once. This page is a map of the first year, in the order that works, with a guide for each step when you're ready for the details. One note before the list: nothing here is advice about your immigration situation. It's an explanation of how the money system works, and every step below is something people in all kinds of situations do every day.",
      },
      {
        type: "h2",
        text: "The first-year route",
      },
      {
        type: "steps",
        items: [
          "**Get your money into a real bank.** Check cashers and prepaid cards take a cut of every paycheck, and cash can't be replaced if it's stolen. [Getting Into the Banking System Safely](/learn/budgeting/unbanked-underbanked) covers second-chance accounts and opening one with an ITIN, and [Opening Your First Bank Account](/learn/budgeting/opening-first-bank-account) walks through the actual visit.",
          "**Get an ITIN if you don't have a Social Security number.** This free IRS-issued number lets you file taxes, and many banks and lenders accept it in place of an SSN. [Filing Taxes With an ITIN](/learn/taxes/filing-with-itin) explains what it is and how to apply.",
          "**Start your credit history.** Whatever credit you had back home didn't cross the border with you; everyone starts at zero here, and the sooner you begin, the sooner apartments, car loans, and good rates open up. [Building Credit With No Social Security Number](/learn/credit/build-credit-no-ssn) covers the ITIN route, and [How to Build Credit From Zero](/learn/credit/build-credit-from-zero) covers the standard one.",
          "**Learn the actual rules on public benefits.** Rumor and fear keep many families away from programs their children clearly qualify for. [Immigrants and Public Benefits](/learn/government-aid/immigrants-and-benefits) separates the facts from the folklore.",
          "**Send money home without losing a chunk of it.** Transfer services differ far more than they look, mostly in costs you can't see. [Sending Money Abroad](/learn/budgeting/sending-money-abroad) shows how to compare them, and [Helping Family Without Sinking Yourself](/learn/budgeting/money-and-family) helps you decide how much sending is sustainable.",
          "**Learn the scams aimed at you.** Some scammers specifically target newcomers, often posing as immigration officials or paid 'helpers.' [Scams That Target Immigrant Families](/learn/money-safety/immigrant-scams) names the common ones, and [How to Spot a Scam Before It Costs You](/learn/money-safety/how-to-spot-a-scam) teaches the red flags that apply everywhere.",
          "**File your first tax return.** If you earn money here, tax season (January to mid-April) involves you, and filing is often how people get money *back*. [Filing Your Taxes for the First Time](/learn/taxes/filing-taxes-first-time) is the walkthrough, and [Free Ways to File](/learn/taxes/free-ways-to-file) means you never have to pay a storefront preparer.",
        ],
      },
      {
        type: "h2",
        text: "A pace that works",
      },
      {
        type: "p",
        text: "The first two steps are worth doing in your first month or two, because they make everything after them easier. Credit can start as soon as you're banked. The rest can wait until it's relevant: benefits when you need them, transfers when you send, taxes when the season arrives. The only hard deadline on the list is the tax one; returns for a year are generally due the following April 15.",
      },
      {
        type: "p",
        text: "If you do one thing this week, make it step one. Call or visit a nearby credit union or a well-known bank and ask what you'd need to open a free checking account. Everything else on this list gets easier once your money has a safe place to live.",
      },
    ],
    related: ["unbanked-underbanked", "sending-money-abroad", "immigrants-and-benefits"],
  },
  {
    slug: "your-first-benefits-enrollment",
    topicId: "budgeting",
    title: "Your First Benefits Enrollment, Form by Form",
    dek: "HR hands you a packet and a deadline. Here's the order to tackle it in, and which boxes quietly matter most.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "You usually get about 30 days from your start date. After that, most choices lock until next year.",
      "The 401(k) match line is the highest-paid decision in the packet.",
      "This guide routes you to the right deep-dive at each form.",
      "Doing nothing is also a choice, and usually the worst one.",
    ],
    body: [
      {
        type: "p",
        text: "New job, first week, and HR sends over a stack of enrollment forms with words like 'elections' and 'pre-tax' and a deadline. If there's nobody at home who's filled these out before, the packet can feel like a test you never studied for. It isn't a test. It's five decisions, they go in a sensible order, and every one of them has a full guide on this site. This page is the map.",
      },
      {
        type: "key",
        text: "The deadline is real: most employers give new hires about 30 days to enroll. Miss it, and outside of big life events you generally wait for the annual open-enrollment window to fix anything.",
      },
      {
        type: "h2",
        text: "Form 1: the W-4 (your paycheck's accuracy)",
      },
      {
        type: "p",
        text: "This one decides how much tax comes out of each check. For a single person with one job, the default is usually fine; get it wrong in either direction and you're giving up money now or owing it in April. [How to fill out a W-4](/learn/taxes/how-to-fill-out-w4) walks every line.",
      },
      {
        type: "h2",
        text: "Form 2: the health plan (the biggest bill)",
      },
      {
        type: "p",
        text: "Don't pick by premium alone; the deductible and out-of-pocket maximum decide what a bad year actually costs you. [How to choose a health plan](/learn/insurance/choosing-a-health-plan) gives you the honest comparison method, and if a high-deductible plan is on the menu, it may come with the HSA below.",
      },
      {
        type: "h2",
        text: "Form 3: the 401(k) (the free-money line)",
      },
      {
        type: "p",
        text: "If your employer matches contributions, enrolling at least up to the full match is the single highest-paying choice in the packet: it's a 100% return on those dollars. [What is a 401(k)?](/learn/investing/what-is-a-401k) covers the mechanics, and a target-date fund is a perfectly good first pick inside it. If money is genuinely too tight, start at 1% to 2% and raise it each raise.",
      },
      {
        type: "h2",
        text: "Form 4: HSA or FSA (the tax-free health money)",
      },
      {
        type: "list",
        items: [
          "An [HSA](/learn/investing/what-is-an-hsa) comes only with high-deductible plans, rolls over forever, and is yours for life. For 2026 you can put in up to $4,400 for self-only coverage. If you have one available, even $20 a paycheck builds a real medical cushion.",
          "An FSA is use-it-or-lose-it by the deadline (plans may let a small amount carry over), so fund it only to what you'll genuinely spend on care, glasses, or prescriptions this year.",
        ],
      },
      {
        type: "h2",
        text: "Form 5: the checkboxes people skip",
      },
      {
        type: "list",
        items: [
          "Disability insurance: often free or cheap through work, and it protects the paycheck everything else depends on. [The coverage nobody mentions](/learn/insurance/disability-insurance) explains why it matters more than life insurance for most young workers.",
          "Life insurance: the free employer-paid base amount is worth taking; whether you need more depends on who depends on you. [Do you even need life insurance?](/learn/insurance/do-you-need-life-insurance) is the two-minute answer.",
          "Beneficiary forms: fill them in. This decides who gets the money in your 401(k) and life insurance, and it overrides everything else.",
          "Commuter or other pre-tax perks: nice if you'll truly use them; skip if not.",
        ],
      },
      {
        type: "h2",
        text: "Done. Now check the first paycheck",
      },
      {
        type: "p",
        text: "Elections made, one last step: when the first full paycheck lands, [read the stub](/learn/budgeting/how-to-read-a-pay-stub) and confirm the deductions match what you picked. Payroll mistakes happen, and they're easiest to fix in week two, not month six. Then build the budget on the number that's actually arriving, starting with [what to do with your first paycheck](/learn/budgeting/your-first-paycheck).",
      },
      {
        type: "tip",
        text: "Big life changes (marriage, a baby, losing other coverage) reopen your benefits outside the annual window. If your situation shifts mid-year, ask HR about a 'qualifying life event' before assuming you're stuck.",
      },
    ],
    related: ["reading-a-job-offer", "your-first-paycheck", "how-to-read-a-pay-stub"],
  },
];
