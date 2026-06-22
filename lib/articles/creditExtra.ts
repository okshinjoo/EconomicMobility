import type { Article } from "./types";

export const creditExtraArticles: Article[] = [
  {
    slug: "how-credit-cards-work",
    order: 50,
    topicId: "credit",
    title: "How Credit Cards Actually Work",
    dek: "Before you swipe, here's the part nobody explains: how the bill, the interest, and that tiny minimum payment really fit together.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A credit card is a short-term loan, not free money.",
      "Pay the full statement balance and you owe zero interest.",
      "The minimum payment is a trap dressed up as a kindness.",
      "Used carefully, a card is one of the safest ways to build credit.",
    ],
    body: [
      {
        type: "p",
        text: "You get the card in the mail, you swipe it, and it just *works*. The store hands you the thing, no money seems to leave your account. For a second it can feel like free money. It isn't — it's a loan, a tiny one, every single time you tap. The good news: once you see how the pieces fit, a credit card goes from scary to genuinely useful.",
      },
      {
        type: "p",
        text: "If nobody in your family used credit cards — or only ever used them in a panic — this is for you. There's nothing shameful about not knowing this. It was never taught.",
      },
      {
        type: "h2",
        text: "What happens when you swipe",
      },
      {
        type: "p",
        text: "When you pay with a credit card, the card company covers the cost for you right then. You now owe *them*. Every purchase gets added to a running tab called your balance. Once a month they total it all up and send you a bill — your statement. That statement is the heart of the whole thing.",
      },
      {
        type: "h2",
        text: "The grace period: your free pass",
      },
      {
        type: "p",
        text: "Here's the part that changes everything. After your statement arrives, you get a stretch of time — usually a few weeks — before the payment is due. That's the grace period. If you pay the *entire* statement balance before the due date, you owe no interest at all. None. You essentially borrowed money for free.",
      },
      {
        type: "key",
        text: "Pay your full statement balance every month and a credit card never costs you a cent in interest. This is the whole game. Everything else is a footnote.",
      },
      {
        type: "h2",
        text: "Interest: what it costs to carry a balance",
      },
      {
        type: "p",
        text: "If you *don't* pay it all off, the grace period disappears and the card starts charging interest on what's left. Credit card interest is steep — often somewhere around 20% or more a year, so check the current rate on your own card. And it compounds, meaning you get charged interest on top of interest. That's how a balance can quietly grow even when you've stopped using the card.",
      },
      {
        type: "h2",
        text: "Why the minimum payment is a trap",
      },
      {
        type: "p",
        text: "Your bill lists a minimum payment — a small amount, maybe $35 on a $1,000 balance. It looks generous. It isn't. The minimum is the *least* you can pay to stay out of trouble, and paying only that keeps you in debt for years while interest piles on. The card company loves the minimum. It's how the whole thing makes money off you.",
      },
      {
        type: "tip",
        text: "Set up autopay for the *full statement balance*, not the minimum. Do this once and you'll never accidentally trigger interest or a late fee again. It's the single best move a new cardholder can make.",
      },
      {
        type: "p",
        text: "Used this way — swipe, then pay it off in full — a credit card is one of the safest, cheapest ways to build a credit history. The card does the work of proving you're reliable, and you never pay them a dime for the privilege.",
      },
    ],
    related: ["choosing-first-credit-card", "credit-utilization", "build-credit-from-zero"],
  },

  {
    slug: "choosing-first-credit-card",
    order: 60,
    topicId: "credit",
    title: "Choosing Your First Credit Card",
    dek: "You don't need a fancy card with a long waitlist. You need the right starter card — and here's how to spot one.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Your first card's job is to build credit, not to dazzle you.",
      "Student and secured cards are built for people just starting out.",
      "A secured card uses your own deposit, so approval is easy.",
      "Watch the annual fee and the interest rate before you sign up.",
    ],
    body: [
      {
        type: "p",
        text: "Shopping for a first credit card can feel like being shown the door before you've knocked. The flashy cards with travel points and big rewards usually want a credit history you don't have yet. That's not a rejection of you — it's just that they're not built for someone starting from zero. The cards that *are* built for you are quieter, and honestly, better for the job.",
      },
      {
        type: "h2",
        text: "Two cards made for beginners",
      },
      {
        type: "p",
        text: "If you're starting out — new to credit, a student, new to the country — two kinds of card are designed with you in mind:",
      },
      {
        type: "list",
        items: [
          "**Student cards** — meant for people in school with little or no credit history. Easier to get approved for, often with no annual fee.",
          "**Secured cards** — you put down a refundable deposit (say $200), and that becomes your credit limit. The deposit makes approval simple, and you get it back when you close the card in good standing or move up to a regular one.",
        ],
      },
      {
        type: "p",
        text: "A secured card sometimes feels like a catch — *you're* putting up the money? But that's exactly why it works. The deposit takes the risk off the lender, so almost anyone can get approved and start building a real credit history.",
      },
      {
        type: "key",
        text: "The point of your first card isn't rewards or status. It's to quietly prove, month after month, that you pay what you owe on time. That track record is the thing that's actually valuable.",
      },
      {
        type: "h2",
        text: "What to actually look for",
      },
      {
        type: "p",
        text: "When you're comparing starter cards, most of the shiny features don't matter yet. These few things do:",
      },
      {
        type: "list",
        items: [
          "**No annual fee, ideally.** Plenty of good starter cards cost nothing to hold. A fee can be worth it later, but you don't need one now.",
          "**Reports to all three credit bureaus.** This is how your good habits actually become a credit score. Almost all real cards do this — just confirm it.",
          "**A path to grow.** A secured card that 'graduates' to an unsecured one, or gives your deposit back, beats one that strands you.",
          "**The interest rate.** It matters less if you pay in full every month — but check it anyway, in case life happens.",
        ],
      },
      {
        type: "tip",
        text: "Be careful with 'fee harvester' cards aimed at people with no credit — the ones stacking setup fees, monthly fees, and maintenance fees. A plain secured card from a normal bank or credit union is almost always the better deal.",
      },
      {
        type: "h2",
        text: "Watch out for the upsell",
      },
      {
        type: "p",
        text: "Once you have a card and start using it well, offers will start showing up — bigger limits, new cards, 'pre-approved' everything. None of it is urgent. Your first card only has to do one simple job well. Let it.",
      },
      {
        type: "p",
        text: "Pick a boring, low-cost starter card, use it for small everyday things, and pay it off in full. That's it. In a year, you'll have something a flashy card could never have given you on day one: a history.",
      },
    ],
    related: ["how-credit-cards-work", "build-credit-from-zero", "build-credit-no-ssn"],
  },

  {
    slug: "paying-off-credit-cards",
    order: 40,
    topicId: "credit",
    title: "How to Pay Off a Credit Card and Stay Off the Treadmill",
    dek: "Getting out of card debt is part math, part momentum. Here's a plan that works even when the balance feels hopeless.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "Always pay more than the minimum — even a little more changes everything.",
      "Two proven methods: knock out the smallest debt or the priciest one.",
      "Stopping new charges is half the battle.",
      "A small buffer fund keeps you from sliding right back.",
    ],
    body: [
      {
        type: "p",
        text: "Credit card debt has a particular kind of weight to it. You make a payment, and somehow the balance barely moves. You're running and running and the floor keeps sliding back under you. That feeling is real, and it's not because you're bad with money — it's because card interest is built to keep you running. The way off isn't more guilt. It's a plan.",
      },
      {
        type: "h2",
        text: "First, understand why you feel stuck",
      },
      {
        type: "p",
        text: "When you pay only the minimum, most of that payment goes straight to interest, and barely any touches what you actually borrowed. The balance shrinks at a crawl. That's the treadmill. The moment you pay *more* than the minimum, extra money goes to the actual debt — and the whole thing starts to move.",
      },
      {
        type: "key",
        text: "Paying even a little over the minimum is the difference between years of debt and months of it. There is no payment too small to matter, but the minimum alone keeps you stuck.",
      },
      {
        type: "h2",
        text: "Two ways to attack the balance",
      },
      {
        type: "p",
        text: "If you have more than one card or debt, you need an order to pay them in. Two methods both work — pick the one that fits how your brain works:",
      },
      {
        type: "list",
        items: [
          "**The snowball:** pay minimums on everything, then throw every extra dollar at your *smallest* balance first. Knock it out, feel the win, roll that payment onto the next one. Great if you need momentum to stay motivated.",
          "**The avalanche:** same idea, but you attack the debt with the *highest interest rate* first. It saves you the most money over time. Great if the math is what keeps you going.",
        ],
      },
      {
        type: "p",
        text: "There's no wrong choice here. The best method is the one you'll actually stick with. Most people quit because of lost motivation, not bad math — so if the snowball keeps you in the game, the snowball wins.",
      },
      {
        type: "h2",
        text: "Stop the bleeding while you pay",
      },
      {
        type: "p",
        text: "You can't bail out a boat that's still taking on water. While you're paying down a card, try to stop adding new charges to it. Tuck the card in a drawer, take it off your phone, switch to your debit card or cash for everyday spending. Paying down a balance you're still feeding is a slow way to go nowhere.",
      },
      {
        type: "tip",
        text: "If your interest rate is brutal, look into a balance transfer or a personal loan with a lower rate — but only if it has a *lower* rate and you won't just run the card back up. Used wrong, it's a way to dig two holes instead of one.",
      },
      {
        type: "h2",
        text: "Stay off the treadmill for good",
      },
      {
        type: "p",
        text: "Here's the part most advice skips. Lots of people pay off a card and land right back in debt within a year — not from carelessness, but because the *reason* they used the card never went away. Often it's that one surprise expense with no cushion behind it.",
      },
      {
        type: "steps",
        items: [
          "While paying down debt, still set aside a small buffer — even $500 — so the next flat tire doesn't go on the card.",
          "Once a card hits zero, keep it open and use it lightly. Closing it can actually ding your score.",
          "Switch to paying the full statement balance every month, so interest never comes back.",
          "Redirect what you *were* paying on debt straight into savings. You already lived without that money — now it works for you.",
        ],
      },
      {
        type: "p",
        text: "Climbing off the credit card treadmill is one of the most freeing money moves there is. It's slow, it's unglamorous, and it absolutely works. Every extra dollar you send is a dollar that stops costing you interest forever.",
      },
    ],
    related: ["credit-utilization", "what-hurts-your-score", "repairing-credit"],
  },

  {
    slug: "check-credit-free",
    order: 30,
    topicId: "credit",
    title: "How to Check Your Credit for Free",
    dek: "You're allowed to see your own credit — for free, from the official source. Here's exactly where to look and what you'll find.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Three companies — the credit bureaus — keep your credit files.",
      "AnnualCreditReport.com is the official free, government-backed site.",
      "Checking your own credit never lowers your score.",
      "A report and a score are two different things — you want both.",
    ],
    body: [
      {
        type: "p",
        text: "Somewhere out there, companies you've never spoken to are keeping a file on how you handle money. That sounds unsettling, and the first time you learn it, it kind of is. But here's the empowering part: that file is *about you*, and you have the legal right to see it — for free, whenever you want. Most people never do, simply because no one told them they could.",
      },
      {
        type: "h2",
        text: "Who keeps your credit file",
      },
      {
        type: "p",
        text: "There are three big companies — called credit bureaus — that collect your credit history: **Equifax, Experian, and TransUnion**. Lenders report to them, and they package it all into your credit report. They don't always have identical information, which is exactly why it's worth checking all three.",
      },
      {
        type: "h2",
        text: "The one official free site",
      },
      {
        type: "p",
        text: "This is the part to remember, because the internet is full of lookalike sites that try to charge you or sign you up for things. There is one official, government-backed site for your free reports:",
      },
      {
        type: "key",
        text: "**AnnualCreditReport.com** is the only site authorized by federal law to give you free copies of your credit reports from all three bureaus. If a 'free credit report' site asks for a credit card number, you're in the wrong place.",
      },
      {
        type: "p",
        text: "You can pull your reports from each of the three bureaus there. A common move is to space them out — one bureau every few months — so you're keeping an eye on things all year long without paying anyone.",
      },
      {
        type: "h2",
        text: "Report vs. score — they're different",
      },
      {
        type: "p",
        text: "People mix these two up constantly, so let's be clear:",
      },
      {
        type: "list",
        items: [
          "Your **credit report** is the detailed record — your accounts, balances, payment history, anything that's gone wrong. It's the *story*.",
          "Your **credit score** is a single number, calculated *from* that story, that lenders use as a quick summary.",
        ],
      },
      {
        type: "p",
        text: "AnnualCreditReport.com gives you the reports. For the score, lots of banks, credit card apps, and free services now show it to you at no cost — check whether yours already does. You want to see both: the number, and the story behind it.",
      },
      {
        type: "tip",
        text: "Checking your *own* credit is a 'soft' check. It has zero effect on your score, no matter how often you look. So look. There's no penalty for keeping an eye on your own file.",
      },
      {
        type: "p",
        text: "Pulling your credit for the first time can feel like opening a report card you didn't know existed. Whatever it says, you're now in the loop — and that's the whole point. You can't fix or build what you can't see.",
      },
    ],
    related: ["reading-your-credit-report", "disputing-credit-errors", "what-is-a-credit-score"],
  },

  {
    slug: "disputing-credit-errors",
    order: 60,
    topicId: "credit",
    title: "Disputing an Error on Your Credit Report",
    dek: "Mistakes on credit reports are more common than you'd think — and fixing them is your right, not a favor.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Credit report errors are common and can quietly hurt your score.",
      "You have a legal right to dispute anything that's wrong.",
      "File the dispute directly with the bureau, with proof.",
      "The bureau generally must investigate, usually within about 30 days.",
    ],
    body: [
      {
        type: "p",
        text: "You pull your credit report, and something's off. An account you don't recognize. A payment marked late that you know you paid on time. An old debt that should've fallen off years ago. Your stomach drops. Take a breath — errors on credit reports are genuinely common, and the system has a built-in way to fix them. This isn't you begging for mercy. It's a right.",
      },
      {
        type: "h2",
        text: "Why this matters more than it seems",
      },
      {
        type: "p",
        text: "A single wrong entry — a late payment that wasn't, an account that isn't yours — can drag your score down and cost you a loan, an apartment, or a better interest rate. The stuff on your report gets treated as fact until you prove otherwise. So a mistake left alone is a mistake that costs you.",
      },
      {
        type: "h2",
        text: "What actually counts as an error",
      },
      {
        type: "p",
        text: "Read your report line by line and flag anything that's genuinely wrong:",
      },
      {
        type: "list",
        items: [
          "Accounts you never opened (this can be a sign of identity theft).",
          "Payments marked late that you made on time.",
          "A balance or credit limit that's plainly incorrect.",
          "A debt that's old enough it should have aged off your report.",
          "Someone else's information mixed into your file — it happens with similar names.",
        ],
      },
      {
        type: "h2",
        text: "How to file the dispute",
      },
      {
        type: "p",
        text: "You dispute directly with the credit bureau that's showing the error — Equifax, Experian, or TransUnion. If the same mistake shows up on more than one report, file with each one. Here's the path:",
      },
      {
        type: "steps",
        items: [
          "Get a current copy of the report from AnnualCreditReport.com and mark exactly what's wrong.",
          "File the dispute with that bureau — online, by mail, or by phone. Be specific about the entry and why it's wrong.",
          "Attach any proof you have: bank statements, payoff letters, anything that backs you up.",
          "Keep a copy of everything you send. A mailed dispute with a return receipt gives you a paper trail.",
        ],
      },
      {
        type: "key",
        text: "Once you file, the bureau generally has to investigate — usually within about 30 days — and either fix the error or explain why it stands. They can't just ignore you. That's the law working in your favor.",
      },
      {
        type: "tip",
        text: "Stick to the facts and skip the emotion. 'This account is not mine' or 'this payment was on time, see attached' works far better than a long, angry letter. Clear and boring wins disputes.",
      },
      {
        type: "h2",
        text: "If they don't fix it",
      },
      {
        type: "p",
        text: "Sometimes a dispute comes back denied. You're not out of options — you can add a short statement to your file giving your side, and you can take a serious problem to the Consumer Financial Protection Bureau, the federal agency that oversees this. Persistence pays here.",
      },
      {
        type: "p",
        text: "Cleaning an error off your report is one of the most satisfying money chores there is. It's free, it's your right, and it can lift your score without you changing a single spending habit.",
      },
    ],
    related: ["reading-your-credit-report", "check-credit-free", "credit-freeze"],
  },

  {
    slug: "hard-vs-soft-inquiries",
    order: 30,
    topicId: "credit",
    title: "Hard vs. Soft Credit Inquiries",
    dek: "Some credit checks ding your score and some don't touch it. Knowing the difference saves you from worrying about the wrong things.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A soft inquiry never affects your score; a hard one can, a little.",
      "Checking your own credit is always soft — look freely.",
      "Applying for new credit usually triggers a hard inquiry.",
      "Rate-shopping in a short window often counts as just one hit.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably heard that 'checking your credit hurts it.' That nugget gets passed around families and friend groups as gospel, and it scares people away from ever looking at their own credit. It's half true and half myth — and the half that's wrong is the part that matters most. The key is the difference between a soft inquiry and a hard one.",
      },
      {
        type: "h2",
        text: "Soft inquiries: harmless",
      },
      {
        type: "p",
        text: "A soft inquiry is a peek at your credit that doesn't affect your score at all. It happens when you check your own credit, when a card company pre-screens you for an offer, or when an employer runs a background check. You could rack up a hundred of these and your score wouldn't budge.",
      },
      {
        type: "key",
        text: "Checking your own credit is *always* a soft inquiry. It cannot lower your score. The fear of 'looking too much' keeps people in the dark for no reason — look as often as you like.",
      },
      {
        type: "h2",
        text: "Hard inquiries: a small, temporary dip",
      },
      {
        type: "p",
        text: "A hard inquiry happens when you actually *apply* for credit — a card, a car loan, an apartment, a phone plan — and the lender pulls your full report to decide. This one can knock your score down a little, usually just a few points, and it fades within a year or so. One here and there is no big deal.",
      },
      {
        type: "p",
        text: "Where it adds up is volume. Applying for several cards or loans in a short stretch stacks up hard inquiries, and to a lender that can look like you're scrambling for money. So apply with some intention, not buckshot.",
      },
      {
        type: "h2",
        text: "The rate-shopping exception",
      },
      {
        type: "p",
        text: "Here's a fair rule built into the system. When you're shopping for *one* thing — a car loan, a mortgage, student loans — and several lenders check your credit within a short window, the scoring models usually count it as a single inquiry. You're rewarded for comparing offers, not punished for it.",
      },
      {
        type: "tip",
        text: "Doing serious rate shopping? Cluster your applications into a tight window — a couple of weeks — so they fold into one inquiry instead of several. Comparing rates is smart; the system is built to let you.",
      },
      {
        type: "h2",
        text: "How much to actually worry",
      },
      {
        type: "p",
        text: "Honestly? Not much. Hard inquiries are one of the *smallest* parts of your credit score. Your payment history and how much of your limit you use matter far, far more. Don't let inquiry anxiety stop you from applying for credit you actually need.",
      },
      {
        type: "p",
        text: "So check your own credit all you want — it's free and harmless. Save the caution for actual applications, and even then, a thoughtful one now and then won't hurt you in any way that lasts.",
      },
    ],
    related: ["what-hurts-your-score", "what-is-a-credit-score", "check-credit-free"],
  },

  {
    slug: "credit-myths",
    order: 70,
    topicId: "credit",
    title: "Credit Myths Your Family May Have Taught You",
    dek: "The credit 'advice' that gets passed down with love is often dead wrong. Let's gently set the record straight.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Carrying a balance does *not* help your score — it just costs you.",
      "Checking your own credit never hurts it.",
      "You don't have to go into debt to build credit.",
      "Good intentions can still pass down bad money advice.",
    ],
    body: [
      {
        type: "p",
        text: "Money advice travels through families like recipes — handed down with love, repeated with total confidence, and sometimes just plain wrong. The person who told you 'always carry a little balance' wasn't trying to mislead you. They were trying to help with the best information they had. But some of these myths quietly cost people real money for years. So let's clear a few up, gently.",
      },
      {
        type: "h2",
        text: "Myth: 'Carrying a balance helps your credit'",
      },
      {
        type: "p",
        text: "This is the big one, and it's everywhere. The idea is that leaving some debt unpaid each month shows the bank you're 'using' credit. It does not. You get the exact same credit-building benefit by paying your statement in full — and you pay *zero* interest doing it. Carrying a balance just hands the card company your money for nothing.",
      },
      {
        type: "key",
        text: "You never need to carry a balance to build credit. Using the card and paying it off in full builds your score *and* costs you nothing. Anyone who tells you otherwise is costing you interest.",
      },
      {
        type: "h2",
        text: "Myth: 'Checking your own score hurts it'",
      },
      {
        type: "p",
        text: "This one keeps people scared of their own credit. The truth: checking your own credit is a soft inquiry, and soft inquiries never lower your score. You could check every day and nothing would happen. Only *applying* for new credit causes the small, temporary dip — and that's a different action entirely.",
      },
      {
        type: "h2",
        text: "Myth: 'You have to go into debt to build credit'",
      },
      {
        type: "p",
        text: "A lot of people avoid credit cards entirely because they think building credit means taking on debt. Understandable — if you watched debt hurt your family, steering clear feels safe. But building credit and going into debt aren't the same thing. You can build a strong score by using a card for small purchases and paying it off every month, never owing interest, never carrying debt at all.",
      },
      {
        type: "h2",
        text: "A few more that get passed around",
      },
      {
        type: "list",
        items: [
          "**'Closing old cards helps.'** Usually the opposite — closing a card can shorten your history and raise how much of your limit you're using, both of which can *lower* your score.",
          "**'You only have one credit score.'** You have several, from different models and bureaus. They tend to move together, so don't sweat small differences.",
          "**'Income is part of your score.'** It isn't. A modest income with a perfect payment record can outscore a high earner who pays late.",
          "**'Debit cards build credit.'** They don't — debit spends your own money, so nothing gets reported as credit history.",
        ],
      },
      {
        type: "tip",
        text: "When you hear a credit 'rule,' ask one question: does it require you to pay interest or stay in debt? If yes, be suspicious. Most real credit-building costs you nothing.",
      },
      {
        type: "p",
        text: "None of this means the people who taught you were foolish. They were navigating a confusing system with no map, same as you. Now you've got a slightly better one — and you get to pass *that* down instead.",
      },
    ],
    related: ["what-is-a-credit-score", "build-credit-from-zero", "credit-utilization"],
  },

  {
    slug: "credit-freeze",
    order: 70,
    topicId: "credit",
    title: "Credit Freezes and Fraud Alerts",
    dek: "Two free tools that stop someone from opening accounts in your name — and which one to reach for when.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A credit freeze locks your file so no one can open new credit.",
      "A fraud alert warns lenders to double-check it's really you.",
      "Both are free, and a freeze is the stronger of the two.",
      "Freezing your credit doesn't hurt your score at all.",
    ],
    body: [
      {
        type: "p",
        text: "Imagine a stranger walking into a bank, using your name and your Social Security number, and walking out with a credit card you'll get blamed for. That's identity theft, and it's the kind of thing that keeps people up at night — especially if you've ever gotten one of those 'your data was in a breach' letters. The reassuring news: you have two free tools that shut this down, and almost nobody uses them.",
      },
      {
        type: "h2",
        text: "The credit freeze: lock the door",
      },
      {
        type: "p",
        text: "A credit freeze is the strong one. When you freeze your credit, lenders can't pull your credit report — which means no one can open a new account in your name, not even you, until you lift it. Since most lenders won't approve credit without checking your report, a freeze basically slams the door on new-account fraud.",
      },
      {
        type: "key",
        text: "A credit freeze is free, and it does *not* affect your credit score in any way. You're not closing anything or borrowing anything — you're just locking your file so strangers can't open new accounts.",
      },
      {
        type: "p",
        text: "There's one catch: you have to set it up at all three bureaus separately — Equifax, Experian, and TransUnion — because a freeze at one doesn't cover the others. And when *you* want to apply for something, you temporarily 'thaw' it, then refreeze. That's a minor hassle for a serious layer of protection.",
      },
      {
        type: "h2",
        text: "The fraud alert: a heads-up to lenders",
      },
      {
        type: "p",
        text: "A fraud alert is the lighter-touch option. It doesn't lock anything — instead, it flags your file so that lenders take extra steps to confirm it's really you before opening an account. Your credit still works normally; there's just a speed bump for fraudsters.",
      },
      {
        type: "p",
        text: "A nice bonus: unlike a freeze, you only have to place a fraud alert with *one* bureau, and that bureau is required to tell the other two. One call covers all three.",
      },
      {
        type: "h2",
        text: "Which one should you use?",
      },
      {
        type: "list",
        items: [
          "**Freeze** — the strongest protection, best if you've been through identity theft, your info was in a breach, or you simply don't plan to open new credit soon.",
          "**Fraud alert** — lighter, good if you want a warning system without the thaw-and-refreeze dance, or while you're actively applying for things.",
        ],
      },
      {
        type: "tip",
        text: "You can use both at once. Many people freeze their credit *and* place a fraud alert — belt and suspenders. Since both are free, there's little reason not to layer them if you're worried.",
      },
      {
        type: "h2",
        text: "If you think fraud already happened",
      },
      {
        type: "p",
        text: "Spotted an account you don't recognize on your report? Act fast: freeze your credit, dispute the bogus accounts with the bureaus, and report identity theft to the Federal Trade Commission, which gives you an official recovery plan. Moving quickly limits the damage and gives you a paper trail.",
      },
      {
        type: "p",
        text: "These tools sat unused for years because hardly anyone knew they were free and easy. Now you do. Locking down your own credit is one of the most quietly powerful money moves you can make — and it costs you nothing but a few minutes.",
      },
    ],
    related: ["disputing-credit-errors", "reading-your-credit-report", "check-credit-free"],
  },
];
