import type { Article } from "./types";

export const budgetingExtraArticles: Article[] = [
  {
    slug: "budgeting-methods",
    order: 10,
    topicId: "budgeting",
    title: "Budgeting Methods That Actually Work",
    dek: "Zero-based, envelope, pay-yourself-first — three proven systems, and how to pick the one that fits your real life.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "There's no single 'right' budget — there are a few good systems.",
      "Zero-based gives every dollar a job before the month starts.",
      "Envelope makes overspending almost impossible.",
      "Pay-yourself-first puts savings first and lets the rest sort itself out.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably tried to budget before and quit. Most people have. Here's the thing nobody tells you: it usually wasn't *you* that failed — it was that the method didn't fit how you actually live. A budget that works for a salaried office worker can be useless for someone juggling tips and gig apps. So instead of forcing yourself into one system, let's look at three real ones and find your match.",
      },
      {
        type: "h2",
        text: "Method 1: Zero-based — every dollar gets a job",
      },
      {
        type: "p",
        text: "With a zero-based budget, you take your take-home pay and assign every single dollar to something *before* the month begins — needs, wants, savings, debt — until you have zero dollars left unassigned. Not zero dollars in your account. Zero dollars without a purpose.",
      },
      {
        type: "p",
        text: "Say you bring home $2,500. You'd hand out all $2,500 on paper: $1,000 to rent, $400 to groceries, $200 to gas, and so on, right down to the last $50 for a 'fun' line. When you're done, income minus everything-you-assigned equals zero. It feels intense at first, but it's powerful — nothing slips through the cracks.",
      },
      {
        type: "tip",
        text: "Zero-based pairs perfectly with a budgeting app, but a notebook works just as well. The magic isn't the tool — it's that no dollar gets to wander off without you noticing.",
      },
      {
        type: "h2",
        text: "Method 2: Envelope — when you spend by category, you stop",
      },
      {
        type: "p",
        text: "The envelope method is old-school and incredibly effective for the categories that always blow up — groceries, eating out, shopping. You decide an amount for each, put that cash in a labeled envelope, and when an envelope is empty, you're done spending there until next month. No swiping, no 'I'll catch up later.'",
      },
      {
        type: "p",
        text: "If keeping cash on hand is what you grew up with, this one will feel natural. And you don't have to use literal envelopes — plenty of apps and even some banks let you split money into digital 'buckets' that do the exact same thing.",
      },
      {
        type: "h2",
        text: "Method 3: Pay-yourself-first — savings comes off the top",
      },
      {
        type: "p",
        text: "This one flips the usual order. Instead of saving whatever's left at the end of the month (which is usually nothing), you move money to savings *the moment you get paid* — before you spend on anything else. Then you live on what's left, guilt-free.",
      },
      {
        type: "p",
        text: "It's the lowest-effort system here, which is exactly why it works for so many people. You don't track every category. You just protect your savings first and let the rest flow. Even $25 a paycheck, automated, builds a real habit.",
      },
      {
        type: "h2",
        text: "So which one is yours?",
      },
      {
        type: "list",
        items: [
          "**Want control and detail?** Zero-based — you'll know where every dollar lives.",
          "**Keep overspending in a couple of categories?** Envelope — the empty envelope is the brake.",
          "**Hate tracking and just want to save?** Pay-yourself-first — set it and forget it.",
        ],
      },
      {
        type: "key",
        text: "You can mix them, too. Lots of people pay themselves first *and* use envelopes for groceries and going out. The best method is the one you'll still be doing in three months.",
      },
      {
        type: "p",
        text: "Don't overthink which to pick. Choose the one that sounds the least painful, run it for a month, and adjust. A budget isn't a vow — it's a tool you're allowed to swap out until one feels right.",
      },
    ],
    related: ["building-a-savings-habit", "building-your-first-budget", "50-30-20-rule"],
  },

  {
    slug: "tracking-your-spending",
    order: 40,
    topicId: "budgeting",
    title: "How to Track Your Spending Without Losing Your Mind",
    dek: "You don't need a fancy app or a perfect spreadsheet — just a habit that takes a few minutes and tells you the truth.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Tracking is just noticing — not judging.",
      "Pick the easiest method you'll actually keep doing.",
      "A few minutes a week beats a perfect system you quit.",
      "The goal is patterns, not a flawless ledger.",
    ],
    body: [
      {
        type: "p",
        text: "Ever get to the end of the month and genuinely wonder where your money went? You weren't reckless. You just didn't watch it go. That's the whole secret of tracking spending — not discipline, not a fancy app, just *looking*. And it's way less painful than you think.",
      },
      {
        type: "h2",
        text: "Why tracking matters more than budgeting",
      },
      {
        type: "p",
        text: "Here's a quiet truth: a budget is a guess about the future, but tracking shows you the actual past. You can plan to spend $300 on food all you want — tracking is what tells you it was really $480. You can't fix what you can't see, and tracking is just turning the lights on.",
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
          "**The app way** — link your bank to a budgeting app and let it sort your spending automatically. Least effort, but you have to trust it with your info.",
          "**The spreadsheet way** — a simple sheet with date, amount, and category. More work, total control.",
          "**The notes way** — jot every purchase in your phone's notes app the second you make it. Old-fashioned, but you *feel* every dollar.",
        ],
      },
      {
        type: "tip",
        text: "If you're just starting, don't track forever. Track everything for one honest month. That single month usually shows you the leaks — and from there, you only need to watch the categories that surprised you.",
      },
      {
        type: "h2",
        text: "Make it a tiny weekly ritual",
      },
      {
        type: "p",
        text: "The people who keep this up don't do anything heroic. Once a week — Sunday coffee, payday, whenever — they spend five minutes looking at what they spent. That's it. No app can replace that little moment of *oh, that's where it's going.*",
      },
      {
        type: "h2",
        text: "Don't let one bad week end it",
      },
      {
        type: "p",
        text: "You will forget to log things. You'll have a chaotic week where you track nothing. That's normal and it's fine. Tracking isn't all-or-nothing — a month with a few gaps still teaches you more than not tracking at all. Just pick it back up.",
      },
      {
        type: "key",
        text: "Tracking isn't about guilt. It's about awareness. Once you can see your spending clearly, you get to make real choices instead of being surprised every month.",
      },
      {
        type: "p",
        text: "Start tonight. Open your notes app, write down what you spent today, and you've already begun. Everything else is just keeping that small habit alive.",
      },
    ],
    related: ["building-a-savings-habit", "building-your-first-budget", "fixing-a-broken-budget"],
  },

  {
    slug: "unbanked-underbanked",
    order: 60,
    topicId: "budgeting",
    title: "Getting Into the Banking System Safely",
    dek: "If you've been locked out of banks — or burned by them — here's how to get a real account and stop paying to use your own money.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A past bank problem doesn't lock you out forever — second-chance accounts exist.",
      "You can often open an account with an ITIN, not just a Social Security number.",
      "Credit unions are member-owned and tend to be friendlier and cheaper.",
      "Check cashers and payday lenders are the most expensive way to handle money.",
    ],
    body: [
      {
        type: "p",
        text: "Maybe a bank closed your account years ago over an overdraft. Maybe no one in your family ever had one, so cash and money orders are just how things are done. Maybe you don't have a Social Security number and assumed banks were off-limits. None of that means you're stuck. Getting into the banking system safely is one of the highest-value moves you can make — it stops you from paying fees just to touch your own paycheck.",
      },
      {
        type: "h2",
        text: "Why staying outside the banks costs you",
      },
      {
        type: "p",
        text: "Living on cash and check cashers feels simpler, but it's quietly expensive. Cashing a check can cost a few percent every single time — on a $1,000 paycheck, that might be $20 or $30 gone, every payday, just to get *your own money*. Money orders, prepaid card fees, and the risk of carrying cash all add up. A free checking account does the same job for $0.",
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
        text: "Here's something a lot of people don't know: many banks and credit unions let you open an account with an **ITIN** (Individual Taxpayer Identification Number) instead of a Social Security number. You'll typically bring an ITIN, a government or consular photo ID, and proof of address. Call ahead and ask which documents that specific branch accepts — it varies, and asking saves a wasted trip.",
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
          "**Payday lenders** — short-term loans with fees that work out to staggeringly high interest. One loan often turns into a cycle that's brutal to escape.",
          "**Car-title loans** — borrow against your car and you can lose the car. Avoid.",
          "**Check cashers** — fine in a pinch, but a costly habit. A real bank account replaces them.",
          "**'Instant' refund or advance offers** — they hand you your own money early and keep a slice. Patience is cheaper.",
        ],
      },
      {
        type: "key",
        text: "If a place is eager to give you money *fast* and *easy*, that speed is usually what you're overpaying for. Real banks and credit unions are slower and far cheaper — and they're the safe road in.",
      },
      {
        type: "p",
        text: "This article is general guidance, not advice about your exact situation. The next step is simple: pick one nearby credit union or a well-known bank, call them, and ask what you'd need to open a free checking account. That one phone call is how a lot of people finally get in from the cold.",
      },
    ],
    related: ["opening-first-bank-account", "what-is-apy", "building-a-savings-habit"],
  },

  {
    slug: "what-is-apy",
    order: 100,
    topicId: "budgeting",
    title: "What Is APY? Making Your Savings Actually Grow",
    dek: "Two savings accounts can hold the same money — and one quietly pays you while the other does nothing. The difference is APY.",
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
        text: "Picture two people who each put $5,000 in savings and don't touch it for a year. One earns a few cents. The other earns over a hundred dollars. Same money, same year, no extra work. The only difference is a little three-letter term most people skim right past: APY.",
      },
      {
        type: "h2",
        text: "What APY actually means",
      },
      {
        type: "p",
        text: "APY stands for Annual Percentage Yield. In plain words, it's how much your money grows in a year just for sitting in the account — already including the bonus from compounding (more on that in a second). The higher the APY, the more the bank pays *you* for keeping your money there.",
      },
      {
        type: "p",
        text: "Here's the catch that costs people real money: many large, familiar banks pay a tiny APY on basic savings — so small your balance barely moves. Meanwhile, **high-yield savings accounts**, often at online banks and credit unions, can pay many times more for the exact same dollars.",
      },
      {
        type: "h2",
        text: "Why compounding makes it better than it sounds",
      },
      {
        type: "p",
        text: "Compounding is the quiet hero. When your savings earns interest, that interest gets added to your balance — and then *it* starts earning interest too. Your money makes money, and then that money makes money. It's slow at first and then genuinely satisfying over time.",
      },
      {
        type: "tip",
        text: "Rates move with the economy — in 2026 the best high-yield savings accounts have been paying somewhere around **4%**, versus close to **0.01%** at many big banks. So don't chase an exact number; just check the current APY before you open anything and make sure you're not stuck in an account paying next to nothing.",
      },
      {
        type: "h2",
        text: "What to actually do about it",
      },
      {
        type: "steps",
        items: [
          "Look up the APY on your current savings account — it's often shockingly low.",
          "Compare it to a high-yield savings account at a reputable online bank or credit union.",
          "Make sure the account is FDIC- or NCUA-insured (that's your money-is-protected stamp).",
          "Move your savings — especially your emergency fund — somewhere it earns its keep.",
        ],
      },
      {
        type: "key",
        text: "Your emergency fund and savings should live in a high-yield account. The money stays just as safe and just as available — it simply earns more while it waits. There's no reason to leave that on the table.",
      },
      {
        type: "p",
        text: "You don't need to understand the economy to benefit from this. You just need to put your savings where it's respected. Same effort, same money — a better account does the rest.",
      },
    ],
    related: ["building-a-savings-habit", "saving-on-a-tight-budget", "sinking-funds"],
  },

  {
    slug: "saving-on-a-tight-budget",
    order: 40,
    topicId: "budgeting",
    title: "Saving Money When There's Barely Any to Save",
    dek: "When every dollar is already spoken for, saving feels impossible — but small, stubborn habits add up faster than you'd believe.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Saving on a tight budget is about consistency, not size.",
      "Even $5 a week is a real, working savings habit.",
      "Tiny fixed costs and fees quietly drain tight budgets.",
      "Automating a small amount beats waiting for 'extra' money.",
    ],
    body: [
      {
        type: "p",
        text: "Let's be honest about something most money articles skip: sometimes there isn't extra money. Rent's up, groceries cost more, and the advice to 'just save 20%' can feel almost insulting. If that's where you are, you're not doing anything wrong. But even here, there's a way in — and it starts much smaller than people tell you.",
      },
      {
        type: "h2",
        text: "Forget the big number — start absurdly small",
      },
      {
        type: "p",
        text: "When money's tight, the goal isn't to save a lot. It's to *become a person who saves*, even a little. Five dollars a week is $260 a year. That's a real emergency cushion built from an amount you'll barely feel. The habit is the win; the dollar amount catches up later when life loosens.",
      },
      {
        type: "tip",
        text: "Automate it so willpower never has to show up. Set $5 or $10 to move to savings the day after payday. What you don't see, you don't spend — and you won't have to 'find' money that's already gone before you notice it.",
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
          "**Forgotten subscriptions** — that streaming service or app fee you stopped using months ago.",
          "**Bank and overdraft fees** — switch to a free account and stop paying to hold your own money.",
          "**Check-cashing and money-order fees** — a bank account erases these entirely.",
          "**The 'small' daily buy** — not to ban it, just to *notice* it; $4 a day is over $1,400 a year.",
        ],
      },
      {
        type: "h2",
        text: "Use the windfalls before they vanish",
      },
      {
        type: "p",
        text: "On a tight budget, your real savings chances often arrive in lumps — a tax refund, a bonus, back pay, birthday money, a side gig that paid off. The instinct is to absorb it into everyday life, where it disappears without a trace. Instead, grab even part of it for savings the moment it lands.",
      },
      {
        type: "p",
        text: "A tax refund especially can be a once-a-year shot at a real cushion. Sending even a few hundred dollars of it straight to savings — before it has a chance to evaporate — can do more than months of squeezing pennies.",
      },
      {
        type: "h2",
        text: "Be gentle with yourself about the pace",
      },
      {
        type: "p",
        text: "Some months you'll save nothing, because something broke or someone needed help. That's not failure — that's a tight budget being a tight budget. Saving on low income isn't a straight line up. It's stubborn: you keep the habit alive, you protect it when you can, and you don't quit just because a hard month happened.",
      },
      {
        type: "key",
        text: "A tiny amount saved consistently beats a big amount you keep waiting to be able to afford. The habit is the whole thing. The dollars grow on their own once life gives you room.",
      },
      {
        type: "p",
        text: "Start with five dollars this week. Not because five dollars changes your life — but because the person who saves five dollars is the same person who'll save fifty when things ease up. You're building *that* person, starting now.",
      },
    ],
    related: ["building-a-savings-habit", "what-is-apy", "budgeting-irregular-income"],
  },

  {
    slug: "cost-of-living",
    order: 50,
    topicId: "budgeting",
    title: "What It Really Costs to Live",
    dek: "The rent is only the beginning — here's the full, honest picture of what a life actually costs each month.",
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
        text: "Ask most people what it costs them to live and they'll name their rent. But rent is just the headline. The real cost of living is the whole quiet pile underneath it — the bills, the small leaks, the once-a-year surprises. Until you know that true number, you're flying blind: you can't tell if a job pays enough, if you can move out, or how much breathing room you actually have.",
      },
      {
        type: "h2",
        text: "Start with the obvious — then keep going",
      },
      {
        type: "p",
        text: "Everyone counts the big monthly costs. List yours first:",
      },
      {
        type: "list",
        items: [
          "**Housing** — rent or mortgage, and don't forget renters insurance.",
          "**Utilities** — electric, gas, water, internet, phone.",
          "**Food** — groceries plus the eating out you'll realistically do.",
          "**Transportation** — car payment, gas, insurance, repairs — or transit fares.",
          "**Health** — insurance premiums, copays, prescriptions.",
        ],
      },
      {
        type: "h2",
        text: "The costs that ambush you",
      },
      {
        type: "p",
        text: "Here's where people underestimate their life by hundreds of dollars a month. These don't hit every month, which is exactly why they're easy to forget — and exactly why they wreck budgets:",
      },
      {
        type: "list",
        items: [
          "**Annual or twice-a-year bills** — car registration, insurance paid in lumps, certain taxes.",
          "**Replacements** — clothes, shoes, a phone that finally dies, a worn-out mattress.",
          "**Care costs** — childcare, money sent to family, a pet's vet visit.",
          "**Just-being-alive costs** — haircuts, toiletries, a birthday gift, the dentist.",
        ],
      },
      {
        type: "tip",
        text: "To find your *real* monthly number, add up these irregular costs for a whole year and divide by 12. A $600 yearly car insurance bill is really $50 a month — treat it that way and it never blindsides you. (This is exactly what a sinking fund is for.)",
      },
      {
        type: "h2",
        text: "Why your number is your power number",
      },
      {
        type: "p",
        text: "Once you know your true cost of living, everything gets clearer. You can look at a job offer and instantly know whether it covers your life or leaves you short. You can tell how much of a raise is real versus eaten by costs. You stop guessing and start deciding with actual facts.",
      },
      {
        type: "h2",
        text: "Where you live changes the whole equation",
      },
      {
        type: "p",
        text: "Cost of living swings wildly by place. The same paycheck that feels tight in an expensive city can feel comfortable a few hours away. This matters most around big decisions — a move, a new job, helping family decide where to settle. Sometimes the fastest way to fix a budget isn't spending less; it's living somewhere the math simply works better.",
      },
      {
        type: "key",
        text: "Your true cost of living is the most useful number in your whole financial life. It's the line your income has to clear — and once you know it, you're never negotiating or planning blind again.",
      },
      {
        type: "p",
        text: "Sit down once and build this number honestly, irregular costs and all. It might be higher than you expected — but a number you can see is a number you can plan around. That's worth far more than a comfortable guess.",
      },
    ],
    related: ["sinking-funds", "building-your-first-budget", "saving-on-a-tight-budget"],
  },

  {
    slug: "building-a-savings-habit",
    order: 110,
    topicId: "budgeting",
    title: "Building a Savings Habit That Sticks",
    dek: "Saving isn't about being good with money — it's about building a system so saving happens whether you feel like it or not.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A habit beats motivation — willpower runs out, systems don't.",
      "Automating savings is the single most powerful move.",
      "Start small enough that it's almost impossible to fail.",
      "Naming your savings goal makes it far easier to keep.",
    ],
    body: [
      {
        type: "p",
        text: "Most people think saving money is about discipline — gritting your teeth and going without. But the people who actually save aren't more disciplined than you. They've just set things up so saving happens automatically, on its own, without a daily fight. That's not a personality trait. It's a system, and you can build it this week.",
      },
      {
        type: "h2",
        text: "Why willpower keeps losing",
      },
      {
        type: "p",
        text: "Relying on motivation to save is like relying on a good mood to do the dishes — it works until it doesn't. Some months you're inspired; most months you're tired and the money quietly gets spent. A habit removes the decision entirely. You're not choosing to save each time; you've already chosen, once.",
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
        text: "Keep your savings at a *different* bank than your checking, ideally a high-yield one. A few extra clicks to reach it is just enough friction to stop the impulse 'I'll just borrow from savings' moment.",
      },
      {
        type: "h2",
        text: "Start so small you can't fail",
      },
      {
        type: "p",
        text: "The biggest mistake is starting too ambitious — $300 a month — feeling the pinch, and quitting in week two. Flip it. Start with an amount so small it's almost silly, like $10 a paycheck. The point right now isn't the money; it's proving to yourself that you're someone who saves. You raise the amount later, once the habit is real.",
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
          "**Emergency fund** — your first and most important cushion.",
          "**A deposit** — for an apartment, a used car, a fresh start.",
          "**A trip home** — to see family you haven't seen in too long.",
          "**Breathing room** — just not living paycheck to paycheck anymore.",
        ],
      },
      {
        type: "key",
        text: "Automate a small amount, give it a name, and don't break the chain. The habit matters more than the number — because the habit is what's still standing a year from now.",
      },
      {
        type: "p",
        text: "You don't need more income or more willpower to start. You need one automatic transfer and one tiny amount. Set it up today, and let the system carry you while you go live your life.",
      },
    ],
    related: ["saving-on-a-tight-budget", "what-is-apy", "budgeting-methods"],
  },
];
