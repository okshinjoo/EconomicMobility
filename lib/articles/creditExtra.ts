import type { Article } from "./types";

export const creditExtraArticles: Article[] = [
  {
    slug: "how-credit-cards-work",
    order: 50,
    topicId: "credit",
    title: "How Credit Cards Actually Work",
    dek: "Before you swipe, here's the part nobody explains: how the bill, the interest, and that tiny minimum payment fit together.",
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
        text: "You get the card in the mail, you swipe it, and it just *works*. The store hands you the thing, and no money seems to leave your account. For a second it can feel like free money. It isn't. It's a loan, a small one, every single time you tap. Once you see how the pieces fit, a credit card goes from scary to genuinely useful.",
      },
      {
        type: "p",
        text: "If nobody in your family used credit cards, or only used them in a panic, this is for you. There's nothing shameful about not knowing this. It was never taught.",
      },
      {
        type: "h2",
        text: "What happens when you swipe",
      },
      {
        type: "p",
        text: "When you pay with a credit card, the card company covers the cost for you right then, and you now owe *them*. Every purchase gets added to a running tab called your balance. Once a month they total it all up and send you a bill, your statement. That statement is the heart of the whole thing.",
      },
      {
        type: "h2",
        text: "The grace period: your free pass",
      },
      {
        type: "p",
        text: "After your statement arrives, you get a stretch of time (usually a few weeks) before the payment is due. That's the grace period. If you pay the *entire* statement balance before the due date, you owe no interest at all. None. You borrowed money for free.",
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
        text: "If you don't pay it all off, the grace period disappears and the card starts charging interest on what's left. Credit card interest is steep, averaging around 21% to 24% a year in 2026, so check the rate on your own card. And it compounds, meaning you get charged interest on top of interest. That's how a balance can quietly grow even after you've stopped using the card.",
      },
      {
        type: "h2",
        text: "Why the minimum payment is a trap",
      },
      {
        type: "p",
        text: "Your bill lists a minimum payment: a small amount, maybe $35 on a $1,000 balance. It looks generous, but the minimum is the *least* you can pay to stay out of trouble, and paying only that keeps you in debt for years while interest piles on. The card company loves the minimum. It's how the whole thing makes money off you.",
      },
      {
        type: "tip",
        text: "Set up autopay for the *full statement balance*, not the minimum. Do it once and you'll never accidentally trigger interest or a late fee again. It's the single best move a new cardholder can make.",
      },
      {
        type: "p",
        text: "Used this way (swipe, then pay in full) a credit card is one of the safest, cheapest ways to build a credit history. If you're already carrying a balance you can't clear this month, [How to Pay Off a Credit Card](/learn/credit/paying-off-credit-cards) has the plan. And when you're ready to pick a card, start with [Choosing Your First Credit Card](/learn/credit/choosing-first-credit-card).",
      },
    ],
    related: ["choosing-first-credit-card", "paying-off-credit-cards", "credit-utilization"],
  },

  {
    slug: "choosing-first-credit-card",
    order: 60,
    topicId: "credit",
    title: "Choosing Your First Credit Card",
    dek: "You don't need a fancy card with a long waitlist. You need the right starter card, and here's how to spot one.",
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
        text: "Shopping for a first credit card can feel like being shown the door before you've knocked. The flashy cards with travel points and big rewards usually want a credit history you don't have yet. That isn't a rejection of you; those cards aren't built for someone starting from zero. The cards that *are* built for you are quieter, and better for the job.",
      },
      {
        type: "h2",
        text: "Two cards made for beginners",
      },
      {
        type: "p",
        text: "If you're new to credit, a student, or new to the country, two kinds of card are designed with you in mind:",
      },
      {
        type: "list",
        items: [
          "**Student cards** are meant for people in school with little or no credit history. They're easier to get approved for, often with no annual fee.",
          "**Secured cards** ask for a refundable deposit (say $200) that becomes your credit limit. The deposit makes approval simple, and you get it back when you close the card in good standing or move up to a regular one.",
        ],
      },
      {
        type: "p",
        text: "A secured card can feel like a catch. You're putting up your own money? But that's exactly why it works: the deposit takes the risk off the lender, so almost anyone can get approved and start building a real history. [How to Build Credit From Zero](/learn/credit/build-credit-from-zero) covers how to use one once it arrives.",
      },
      {
        type: "key",
        text: "The point of your first card isn't rewards or status. It's to quietly prove, month after month, that you pay what you owe on time. That track record is the thing that's actually valuable.",
      },
      {
        type: "h2",
        text: "What to look for",
      },
      {
        type: "p",
        text: "When you're comparing starter cards, most of the shiny features don't matter yet. These few things do:",
      },
      {
        type: "list",
        items: [
          "**No annual fee, ideally.** Plenty of good starter cards cost nothing to hold. A fee can be worth it later, but you don't need one now.",
          "**Reports to all three credit bureaus.** This is how your good habits become a credit score. Almost all real cards do this; confirm it anyway.",
          "**A path to grow.** A secured card that 'graduates' to an unsecured one, or returns your deposit, beats one that strands you.",
          "**The interest rate.** It matters less if you pay in full every month ([How Credit Cards Actually Work](/learn/credit/how-credit-cards-work) explains why), but check it anyway, in case life happens.",
        ],
      },
      {
        type: "tip",
        text: "Be careful with 'fee harvester' cards aimed at people with no credit: the ones stacking setup fees, monthly fees, and maintenance fees. A plain secured card from a normal bank or credit union is almost always the better deal.",
      },
      {
        type: "h2",
        text: "Watch out for the upsell",
      },
      {
        type: "p",
        text: "Once you have a card and start using it well, offers will show up: bigger limits, new cards, 'pre-approved' everything. None of it is urgent. Your first card only has to do one simple job well. Let it.",
      },
      {
        type: "p",
        text: "Pick a boring, low-cost starter card, use it for small everyday things, and pay it off in full. In a year, you'll have something a flashy card could never have given you on day one: a history.",
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
    readMinutes: 6,
    takeaways: [
      "Always pay more than the minimum. Even a little more changes everything.",
      "Two proven methods: knock out the smallest debt or the priciest one.",
      "Stopping new charges is half the battle.",
      "A small buffer fund keeps you from sliding right back.",
    ],
    body: [
      {
        type: "p",
        text: "Credit card debt has a particular kind of weight to it. You make a payment, and somehow the balance barely moves. You're running and running and the floor keeps sliding back under you. That feeling is real, and it's not because you're bad with money; card interest is built to keep you running. The way off is a plan, not more guilt.",
      },
      {
        type: "h2",
        text: "Why the minimum keeps you stuck",
      },
      {
        type: "p",
        text: "When you pay only the minimum, most of that payment goes to interest and barely any touches what you borrowed, so the balance shrinks at a crawl. ([How Credit Cards Actually Work](/learn/credit/how-credit-cards-work) explains the mechanics behind this.) The moment you pay *more* than the minimum, the extra goes straight to the actual debt, and the whole thing starts to move.",
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
        text: "If you have more than one card or debt, you need an order to pay them in. Two methods both work; pick the one that fits how your brain works:",
      },
      {
        type: "list",
        items: [
          "**The snowball:** pay minimums on everything, then throw every extra dollar at your *smallest* balance first. Knock it out, feel the win, roll that payment onto the next one. Good if you need momentum to stay motivated.",
          "**The avalanche:** same idea, but you attack the debt with the *highest interest rate* first. It saves you the most money over time. Good if the math is what keeps you going.",
        ],
      },
      {
        type: "p",
        text: "There's no wrong choice here. The best method is the one you'll stick with. Most people quit because of lost motivation, not bad math, so if the snowball keeps you in the game, the snowball wins.",
      },
      {
        type: "h2",
        text: "Stop the bleeding while you pay",
      },
      {
        type: "p",
        text: "You can't bail out a boat that's still taking on water. While you're paying down a card, stop adding new charges to it. Tuck the card in a drawer, take it off your phone, and switch to your debit card or cash for everyday spending. Paying down a balance you're still feeding is a slow way to go nowhere.",
      },
      {
        type: "tip",
        text: "If your interest rate is brutal, look into a balance transfer or a personal loan, but only at a genuinely *lower* rate, and only if you won't run the card back up. [Debt Settlement vs. Consolidation vs. Counseling](/learn/government-aid/debt-relief-options) compares the bigger restructuring options.",
      },
      {
        type: "h2",
        text: "Stay off the treadmill for good",
      },
      {
        type: "p",
        text: "Lots of people pay off a card and land right back in debt within a year. Not from carelessness, but because the *reason* they used the card never went away. Often it's one surprise expense with no cushion behind it.",
      },
      {
        type: "steps",
        items: [
          "While paying down debt, still set aside a small buffer, even $500, so the next flat tire doesn't go on the card.",
          "Once a card hits zero, keep it open and use it lightly. Closing it can ding your score.",
          "Switch to paying the full statement balance every month, so interest never comes back.",
          "Redirect what you *were* paying on debt straight into savings. You already lived without that money; now it works for you.",
        ],
      },
      {
        type: "p",
        text: "Climbing off the credit card treadmill is slow and unglamorous, and it works. Every extra dollar you send is a dollar that stops costing you interest forever.",
      },
    ],
    related: ["how-credit-cards-work", "credit-utilization", "repairing-credit"],
  },

  {
    slug: "check-credit-free",
    order: 20,
    topicId: "credit",
    title: "How to Check Your Credit for Free",
    dek: "You have a legal right to see your own credit file, free, from the official source. Here's exactly where to look.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Three companies, the credit bureaus, keep your credit files.",
      "AnnualCreditReport.com is the official free, government-backed site.",
      "Checking your own credit never lowers your score.",
      "A report and a score are two different things. You want both.",
    ],
    body: [
      {
        type: "p",
        text: "Somewhere out there, companies you've never spoken to are keeping a file on how you handle money. That sounds unsettling, and the first time you learn it, it is. But the file is *about you*, and you have the legal right to see it for free, whenever you want. Most people never do, because no one told them they could.",
      },
      {
        type: "h2",
        text: "Who keeps your credit file",
      },
      {
        type: "p",
        text: "Three big companies, called credit bureaus, collect your credit history: **Equifax, Experian, and TransUnion**. Lenders report to them, and each bureau packages what it hears into your credit report. They don't always have identical information, which is exactly why it's worth checking all three.",
      },
      {
        type: "h2",
        text: "The one official free site",
      },
      {
        type: "p",
        text: "Remember this part, because the internet is full of lookalike sites that try to charge you or sign you up for things. There is one official, government-backed site for your free reports:",
      },
      {
        type: "key",
        text: "**AnnualCreditReport.com** is the only site authorized by federal law to give you free copies of your credit reports from all three bureaus. If a 'free credit report' site asks for a credit card number, you're in the wrong place.",
      },
      {
        type: "p",
        text: "You can pull your reports from each of the three bureaus there, free, as often as once a week; the bureaus made weekly access permanent in 2023. So there's no need to ration your looks. Checking each bureau a few times a year keeps an eye on things without paying anyone.",
      },
      {
        type: "h2",
        text: "A report is not a score",
      },
      {
        type: "p",
        text: "People mix these two up constantly, so to be clear:",
      },
      {
        type: "list",
        items: [
          "Your **credit report** is the detailed record: your accounts, balances, payment history, and anything that's gone wrong. It's the *story*.",
          "Your **credit score** is a single number, calculated *from* that story, that lenders use as a quick summary.",
        ],
      },
      {
        type: "p",
        text: "AnnualCreditReport.com gives you the reports. For the score, lots of banks, credit card apps, and free services now show it at no cost; check whether yours already does. You want to see both: the number, and the story behind it.",
      },
      {
        type: "tip",
        text: "Checking your *own* credit is a soft check. It has zero effect on your score, no matter how often you look. ([Hard vs. Soft Credit Inquiries](/learn/credit/hard-vs-soft-inquiries) explains why.) So look. There's no penalty for keeping an eye on your own file.",
      },
      {
        type: "p",
        text: "Pulling your credit for the first time can feel like opening a report card you didn't know existed. Whatever it says, you're now in the loop. Once the report is in front of you, [Reading Your Credit Report](/learn/credit/reading-your-credit-report) walks through each section and what to check.",
      },
    ],
    related: ["reading-your-credit-report", "what-is-a-credit-score", "hard-vs-soft-inquiries", "first-year-of-credit"],
  },

  {
    slug: "disputing-credit-errors",
    order: 60,
    topicId: "credit",
    title: "Disputing an Error on Your Credit Report",
    dek: "Mistakes on credit reports are more common than you'd think, and fixing them is your right, not a favor.",
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
        text: "You pull your credit report, and something's off. An account you don't recognize. A payment marked late that you know you paid on time. An old debt that should've fallen off years ago. Your stomach drops. Take a breath: errors on credit reports are genuinely common, and the system has a built-in way to fix them. Disputing one is a legal right, not a favor you have to beg for.",
      },
      {
        type: "h2",
        text: "Why this matters more than it seems",
      },
      {
        type: "p",
        text: "A single wrong entry, like a late payment that wasn't or an account that isn't yours, can drag your score down and cost you a loan, an apartment, or a better interest rate. What's on your report gets treated as fact until you prove otherwise. A mistake left alone is a mistake that costs you.",
      },
      {
        type: "h2",
        text: "What counts as an error",
      },
      {
        type: "p",
        text: "Read your report line by line and flag anything that's genuinely wrong:",
      },
      {
        type: "list",
        items: [
          "Accounts you never opened. This can be a sign of identity theft; if you suspect it, see [Protecting Yourself From Identity Theft](/learn/money-safety/identity-theft).",
          "Payments marked late that you made on time.",
          "A balance or credit limit that's plainly incorrect.",
          "A debt old enough that it should have aged off your report.",
          "Someone else's information mixed into your file. It happens with similar names.",
        ],
      },
      {
        type: "h2",
        text: "How to file the dispute",
      },
      {
        type: "p",
        text: "You dispute directly with the credit bureau that's showing the error: Equifax, Experian, or TransUnion. If the same mistake shows up on more than one report, file with each one. Here's the path:",
      },
      {
        type: "steps",
        items: [
          "Pull a current copy of the report ([How to Check Your Credit for Free](/learn/credit/check-credit-free) shows where) and mark exactly what's wrong.",
          "File the dispute with that bureau online, by mail, or by phone. Be specific about the entry and why it's wrong.",
          "Attach any proof you have: bank statements, payoff letters, anything that backs you up.",
          "Keep a copy of everything you send. A mailed dispute with a return receipt gives you a paper trail.",
        ],
      },
      {
        type: "key",
        text: "Once you file, the bureau generally has to investigate, usually within about 30 days, and either fix the error or explain why it stands. They can't just ignore you. That's the law working in your favor.",
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
        text: "Sometimes a dispute comes back denied. You still have options: you can add a short statement to your file giving your side, and you can take a serious problem to the Consumer Financial Protection Bureau, the federal agency that oversees this. Persistence pays here.",
      },
      {
        type: "p",
        text: "Cleaning an error off your report is one of the most satisfying money chores there is. It's free, it's your right, and it can lift your score without you changing a single spending habit.",
      },
    ],
    related: ["reading-your-credit-report", "credit-freeze", "medical-debt-and-credit"],
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
      "Checking your own credit is always soft. Look freely.",
      "Applying for new credit usually triggers a hard inquiry.",
      "Rate-shopping in a short window often counts as just one hit.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably heard that 'checking your credit hurts it.' That nugget gets passed around families and friend groups as gospel, and it scares people away from ever looking at their own credit. It's half true, and the half that's wrong is the part that matters most. The key is the difference between a soft inquiry and a hard one.",
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
        text: "Checking your own credit is *always* a soft inquiry. It cannot lower your score. The fear of 'looking too much' keeps people in the dark for no reason. Look as often as you like.",
      },
      {
        type: "h2",
        text: "Hard inquiries: a small, temporary dip",
      },
      {
        type: "p",
        text: "A hard inquiry happens when you *apply* for credit (a card, a car loan, an apartment, a phone plan) and the lender pulls your full report to decide. This one can knock your score down a little, usually a few points, and it fades within a year or so. One here and there is no big deal.",
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
        text: "There's a fair rule built into the system. When you're shopping for *one* thing (a car loan, a mortgage, student loans) and several lenders check your credit within a short window, the scoring models usually count it as a single inquiry. You're rewarded for comparing offers, not punished for it.",
      },
      {
        type: "tip",
        text: "Doing serious rate shopping? Cluster your applications into a tight window, a couple of weeks, so they fold into one inquiry instead of several. Comparing rates is smart; the system is built to let you.",
      },
      {
        type: "h2",
        text: "How much to worry",
      },
      {
        type: "p",
        text: "Not much. Hard inquiries are one of the *smallest* parts of your credit score; your payment history and credit utilization matter far, far more. [What Hurts Your Score (and What Doesn't)](/learn/credit/what-hurts-your-score) puts the pieces in proportion. Don't let inquiry anxiety stop you from applying for credit you need.",
      },
      {
        type: "p",
        text: "Check your own credit all you want; it's free and harmless. Save the caution for actual applications, and even then, a thoughtful one now and then won't hurt you in any way that lasts.",
      },
    ],
    related: ["what-hurts-your-score", "check-credit-free", "credit-utilization"],
  },

  {
    slug: "credit-myths",
    order: 70,
    topicId: "credit",
    title: "Credit Myths Your Family May Have Taught You",
    dek: "The credit 'advice' that gets passed down with love is often dead wrong. Let's gently set the record straight.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Carrying a balance does *not* help your score. It just costs you.",
      "Checking your own credit never hurts it.",
      "You don't have to go into debt to build credit.",
      "Good intentions can still pass down bad money advice.",
    ],
    body: [
      {
        type: "p",
        text: "Money advice travels through families like recipes: handed down with love, repeated with total confidence, and sometimes plain wrong. The person who told you 'always carry a little balance' wasn't trying to mislead you. They were trying to help with the best information they had. But some of these myths quietly cost people real money for years. So let's clear a few up, gently.",
      },
      {
        type: "h2",
        text: "Myth: 'Carrying a balance helps your credit'",
      },
      {
        type: "p",
        text: "This is the big one, and it's everywhere. The idea is that leaving some debt unpaid each month shows the bank you're 'using' credit. It does not. You get the exact same credit-building benefit by paying your statement in full, and you pay zero interest doing it. Carrying a balance hands the card company your money for nothing. ([How Credit Cards Actually Work](/learn/credit/how-credit-cards-work) explains the grace period that makes this possible.)",
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
        text: "This one keeps people scared of their own credit. The truth: checking your own credit never lowers your score. Only applying for new credit causes a small, temporary dip, and that's a different action entirely. [Hard vs. Soft Credit Inquiries](/learn/credit/hard-vs-soft-inquiries) explains the difference.",
      },
      {
        type: "h2",
        text: "Myth: 'You have to go into debt to build credit'",
      },
      {
        type: "p",
        text: "A lot of people avoid credit cards entirely because they think building credit means taking on debt. Understandable: if you watched debt hurt your family, steering clear feels safe. But building credit and going into debt aren't the same thing. You can build a strong score by using a card for small purchases and paying it off every month, never owing interest, never carrying debt at all.",
      },
      {
        type: "h2",
        text: "A few more that get passed around",
      },
      {
        type: "list",
        items: [
          "**'Closing old cards helps.'** Usually the opposite; closing a card can lower your score. [What Hurts Your Score (and What Doesn't)](/learn/credit/what-hurts-your-score) explains the trap.",
          "**'You only have one credit score.'** You have several, from different models and bureaus. They tend to move together, so don't sweat small differences.",
          "**'Income is part of your score.'** It isn't. A modest income with a perfect payment record can outscore a high earner who pays late.",
          "**'Debit cards build credit.'** They don't. Debit spends your own money, so nothing gets reported as credit history.",
        ],
      },
      {
        type: "tip",
        text: "When you hear a credit 'rule,' ask one question: does it require you to pay interest or stay in debt? If yes, be suspicious. Most real credit-building costs you nothing.",
      },
      {
        type: "p",
        text: "None of this means the people who taught you were foolish. They were navigating a confusing system with no map, same as you. Now you've got a slightly better one, and you get to pass *that* down instead.",
      },
    ],
    related: ["how-credit-cards-work", "what-hurts-your-score", "build-credit-from-zero"],
  },

  {
    slug: "credit-freeze",
    order: 70,
    topicId: "credit",
    title: "Credit Freezes and Fraud Alerts",
    dek: "Two free tools that stop someone from opening accounts in your name, and which one to reach for when.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A credit freeze locks your file so no one can open new credit.",
      "A fraud alert warns lenders to double-check it's really you.",
      "Both are free, and a freeze is the stronger of the two.",
      "Freezing your credit doesn't hurt your score at all.",
    ],
    body: [
      {
        type: "p",
        text: "Imagine a stranger walking into a bank, using your name and your Social Security number, and walking out with a credit card you'll get blamed for. That's identity theft, and it's the kind of thing that keeps people up at night, especially after one of those 'your data was in a breach' letters. The reassuring news: you have two free tools that shut this down, and almost nobody uses them.",
      },
      {
        type: "h2",
        text: "The credit freeze: lock the door",
      },
      {
        type: "p",
        text: "A credit freeze is the strong one. When you freeze your credit, lenders can't pull your credit report, which means no one can open a new account in your name (not even you) until you lift it. Since most lenders won't approve credit without checking a report, a freeze slams the door on new-account fraud.",
      },
      {
        type: "key",
        text: "A credit freeze is free, and it does *not* affect your credit score in any way. You're not closing anything or borrowing anything. You're locking your file so strangers can't open new accounts.",
      },
      {
        type: "p",
        text: "There's one catch: you have to set it up at all three bureaus separately (Equifax, Experian, and TransUnion), because a freeze at one doesn't cover the others. And when *you* want to apply for something, you temporarily 'thaw' it, then refreeze. That's a minor hassle for a serious layer of protection.",
      },
      {
        type: "h2",
        text: "The fraud alert: a heads-up to lenders",
      },
      {
        type: "p",
        text: "A fraud alert is the lighter-touch option. It doesn't lock anything. Instead, it flags your file so that lenders take extra steps to confirm it's really you before opening an account. Your credit still works normally; there's just a speed bump for fraudsters.",
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
          "**Freeze:** the strongest protection. Best if you've been through identity theft, your info was in a breach, or you don't plan to open new credit soon.",
          "**Fraud alert:** lighter. Good if you want a warning system without the thaw-and-refreeze dance, or while you're actively applying for things.",
        ],
      },
      {
        type: "tip",
        text: "You can use both at once. Many people freeze their credit *and* place a fraud alert: belt and suspenders. Since both are free, there's little reason not to layer them if you're worried.",
      },
      {
        type: "h2",
        text: "If you think fraud already happened",
      },
      {
        type: "p",
        text: "Spotted an account you don't recognize on your report? Freeze your credit and [dispute the bogus accounts](/learn/credit/disputing-credit-errors) with the bureaus right away. For the full response plan, including reporting the theft to the Federal Trade Commission, see [Protecting Yourself From Identity Theft](/learn/money-safety/identity-theft).",
      },
      {
        type: "p",
        text: "These tools sat unused for years because hardly anyone knew they were free and easy. Now you do. Locking down your own credit takes a few minutes and costs nothing.",
      },
    ],
    related: ["disputing-credit-errors", "reading-your-credit-report", "check-credit-free"],
  },

  {
    slug: "buy-now-pay-later",
    order: 80,
    topicId: "credit",
    title: "Buy Now, Pay Later: Read the Fine Print",
    dek: "Splitting a purchase into a few payments feels free. Here's what's going on behind that friendly button.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Buy now, pay later usually splits a purchase into a few payments, often with no interest if you pay on time.",
      "The catches are late fees, juggling several plans, and quietly spending more.",
      "Missed payments can hurt you, and some plans now report to credit bureaus.",
      "Simple rule: it's still debt, so only use it for something you could buy outright today.",
    ],
    body: [
      {
        type: "p",
        text: "You're about to check out online, and there it is: 'Or 4 payments of $19.' One tap and the price suddenly feels painless. These buy now, pay later services (BNPL for short) are everywhere now, at nearly every online checkout and plenty of stores. They're not evil, and they're not free money. They're a tool, and like any tool, you want to know exactly what it does before you grab it.",
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "The classic version splits your purchase into a handful of equal payments, often four, spread over several weeks. You pay the first chunk at checkout and the rest on a set schedule. The appeal is that there's frequently *no interest*, but only *if* you pay on time. Pay as agreed and an $80 item really does cost $80, just spaced out.",
      },
      {
        type: "p",
        text: "That 'if you pay on time' is the whole game. The moment you slip, the friendly free split can turn into something that costs you.",
      },
      {
        type: "h2",
        text: "The catches hiding in the fine print",
      },
      {
        type: "list",
        items: [
          "**Late fees.** Miss a payment and you can get charged, turning that 'no interest' deal into an expensive one.",
          "**It nudges you to overspend.** A $200 jacket feels like '$50' in your head. That trick gets you to buy things, and sizes of things, you wouldn't if you were handing over real cash.",
          "**Juggling several at once.** Each plan feels tiny, but three or four overlapping ones can quietly add up to more than you can cover when all the due dates land.",
          "**It can affect your credit.** Missed payments can be sent to collections, and some providers now report your plans to the credit bureaus, meaning your slip-ups (and good habits) may show up on your credit history.",
        ],
      },
      {
        type: "key",
        text: "Buy now, pay later is still *debt*. The split-up payments don't change that. You've borrowed money and promised to pay it back.",
      },
      {
        type: "h2",
        text: "One simple rule",
      },
      {
        type: "p",
        text: "The test that keeps BNPL safe: only use it for something you could already afford to buy outright today. If the cash is sitting in your account and you'd rather not pay all at once, fine; the split is a convenience. But if you're reaching for BNPL *because* you can't afford the thing yet, that's the warning sign. Borrowing to buy something you don't have the money for is how a string of 'painless' payments turns into a stressful month.",
      },
      {
        type: "tip",
        text: "Before you tap that button, add up every BNPL payment you already have coming. If the new one pushes the total past what you can comfortably cover on your next payday, skip it or wait.",
      },
      {
        type: "p",
        text: "Used carefully, splitting a payment now and then is no crime. Go in with your eyes open: it's debt with a friendly face, and the fine print is where it stops being free. For the far harsher products that prey on tight months, like payday and title loans, see [Payday Loans and Predatory Lending](/learn/government-aid/payday-loans-and-predatory-lending).",
      },
    ],
    related: ["how-credit-cards-work", "what-hurts-your-score"],
  },

  {
    slug: "rent-reporting",
    order: 55,
    topicId: "credit",
    title: "Turn Your Rent Into Credit History",
    dek: "You've been paying a major bill on time for years and getting no credit for it. Here's how rent reporting works, and when it's worth a fee.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Rent doesn't appear on your credit report unless someone reports it.",
      "Some landlords report free; do-it-yourself services often charge monthly.",
      "VantageScore and newer FICO models count rent; the older FICO 8 most lenders use ignores it.",
      "It helps most when your credit file is thin or brand new.",
    ],
    body: [
      {
        type: "p",
        text: "Rent is probably the biggest bill you pay, the one you'd never dream of missing, and the credit bureaus have no idea you pay it. Mortgage payments show up on credit reports automatically because lenders report them. Landlords aren't lenders, and the vast majority never report anything. So a decade of flawless rent payments usually builds exactly zero credit history.",
      },
      {
        type: "p",
        text: "Rent reporting changes that: it gets your payments added to your credit file so they start counting for you. It can genuinely help, especially if your file is thin, but the services that do it range from free to quietly expensive, and not every credit score even looks at rent. Here's how to size it up.",
      },
      {
        type: "h2",
        text: "How rent gets onto your report",
      },
      {
        type: "p",
        text: "There are three main routes:",
      },
      {
        type: "list",
        items: [
          "**Your landlord or property manager reports it.** Larger management companies increasingly offer this through a reporting service, sometimes free, sometimes as a small opt-in. Ask your leasing office; if it's free, this is the easiest win available.",
          "**You sign up with a rent-reporting service yourself.** These companies verify your payments, usually by linking the bank account you pay from or your payment portal, and send the history to the credit bureaus on your behalf.",
          "**Your bank or credit app includes it as a perk.** A few checking accounts and credit-monitoring apps now bundle rent reporting at no extra charge. Check what you already have before paying anyone new.",
        ],
      },
      {
        type: "p",
        text: "One caution before you link anything: some services report the bad months along with the good ones. If your rent is sometimes late, a reporting service can turn a private problem into one lenders can see. Know your own track record before you volunteer it.",
      },
      {
        type: "h2",
        text: "Watch the fees",
      },
      {
        type: "p",
        text: "The do-it-yourself services are where costs sneak in. Typical pricing runs around $5 to $10 a month, and many charge a one-time fee, often $50 or more, to 'backreport' your past year or two of payments. That can add up to $100 or more a year for a service whose entire job is passing along information about a bill you already pay.",
      },
      {
        type: "key",
        text: "Before paying for rent reporting, ask three questions. Which of the three bureaus does it report to? (Some report to only one, which sharply limits the benefit.) What does it cost per year, including sign-up and backreporting fees? And does it report late payments too, or only on-time ones?",
      },
      {
        type: "h2",
        text: "Which scores actually count rent",
      },
      {
        type: "p",
        text: "This is the part the ads skip. VantageScore (versions 3.0 and 4.0, the models behind many free score apps and a lot of landlord checks) includes rent payments whenever they're in your file. FICO is split: the newer versions, FICO 9 and 10, count reported rent, but FICO 8, still the version a large share of lenders pull, ignores rental accounts entirely.",
      },
      {
        type: "p",
        text: "So the same year of reported rent can lift the score one company sees and do nothing for another. That's not a reason to skip it; it's a reason to keep expectations realistic. Reported rent can also help outside the score itself: some lenders, especially in mortgage underwriting, look at verified rent history directly when weighing a thin-file applicant.",
      },
      {
        type: "h2",
        text: "What it realistically does",
      },
      {
        type: "p",
        text: "Rent reporting shines when your file is thin: few accounts, a short history, or [building from nothing](/learn/credit/build-credit-from-zero). Adding a year or two of on-time payments to a nearly empty file gives the scoring models something real to work with, and the gains for thin files can be meaningful. If you already have several accounts and years of history, one more positive line moves the needle much less. And it can't outweigh genuine negatives; a collection or a string of late card payments will still dominate.",
      },
      {
        type: "p",
        text: "A sensible order of operations: ask your landlord first, since free reporting through the property is the best deal going. Check whether a bank account or app you already use includes it. Only then consider paying, and if you do, pull your reports a few months later ([free, from the official site](/learn/credit/check-credit-free)) to confirm the payments are actually showing up.",
      },
    ],
    related: ["build-credit-from-zero", "build-credit-no-ssn", "check-credit-free"],
  },

  {
    slug: "collections-explained",
    order: 80,
    topicId: "credit",
    title: "Collections, From First Notice to Gone",
    dek: "What happens when a debt goes to collections, what paying actually fixes, and when the mark finally falls off your report.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A charged-off debt isn't forgiven; it's usually sold to a collector for pennies on the dollar.",
      "You can make a collector prove the debt is real before you pay a cent.",
      "A collection stays on your report about seven years, paid or not, and fades in impact.",
      "'Pay for delete' is real but never guaranteed. Get any promise in writing.",
    ],
    body: [
      {
        type: "p",
        text: "The letter comes from a company you've never heard of, about a debt you half remember, for an amount that looks wrong. Collections is the corner of the credit world with the worst reputation and the most confusion, so here's the whole arc: how a bill ends up there, what your rights are, and how it eventually goes away.",
      },
      {
        type: "h2",
        text: "From missed payment to collection agency",
      },
      {
        type: "p",
        text: "No debt starts in collections. First the original creditor (the card company, the clinic, the utility) spends months trying to collect it themselves, with statements, late fees, and calls. If that fails, typically after around six months of nonpayment, the creditor 'charges off' the account: an accounting move where they write the debt off as a loss on their books.",
      },
      {
        type: "p",
        text: "A charge-off does not mean the debt is forgiven. It usually means the opposite. The creditor either hires a collection agency to chase it or sells the debt outright, often for a few cents on the dollar, to a company whose entire business is collecting it. Your credit report can now show two entries (the original charged-off account and the new collection account), which looks like two debts but is one.",
      },
      {
        type: "h2",
        text: "Your first move: make them prove it",
      },
      {
        type: "p",
        text: "Debts get sold and resold, and the paperwork gets sloppy along the way. Wrong amounts, wrong people, and debts too old to sue over are all common. So before you pay a collector anything, use your validation rights: after first contact, the collector must send you written details of the debt, and if you dispute it in writing within 30 days, they generally have to verify it before collecting further. [Your Rights When a Debt Collector Calls](/learn/government-aid/debt-collector-rights) covers the full set of rules, including the limits on how and when they can contact you.",
      },
      {
        type: "h2",
        text: "Should you pay, and does it help?",
      },
      {
        type: "p",
        text: "Paying a collection does a few real things: it stops the balance from growing, ends the calls, and takes a lawsuit off the table. What it does for your score depends on the scoring model. Newer models (VantageScore 3.0 and 4.0, and FICO 9) ignore paid collections entirely, so paying can genuinely lift those scores. The older FICO 8 scores the account the same paid or unpaid, though a paid collection still reads better to any human, like a landlord, reviewing your report.",
      },
      {
        type: "p",
        text: "You'll also hear about 'pay for delete': offering payment in exchange for the collector removing the account from your report altogether. It's worth asking for, and some collectors will do it, but none are obligated to, and the bureaus discourage the practice. If a collector agrees, get it in writing before you send a dollar, and don't build your plan around it.",
      },
      {
        type: "tip",
        text: "Be careful with small 'good faith' payments on old debts. In some states, a payment or even a written promise to pay can restart the clock on how long a collector can sue you. Before paying anything on a debt that's years old, learn where it stands; [What Actually Happens If You Can't Pay Your Debts](/learn/government-aid/what-happens-if-you-dont-pay-debts) explains the time limits.",
      },
      {
        type: "h2",
        text: "When it finally disappears",
      },
      {
        type: "p",
        text: "A collection account can stay on your credit report for about seven years, counted from the date you first fell behind with the original creditor, not from when the collector bought the debt. Paying doesn't restart that clock, and neither does the debt being sold to a new agency. The mark also loses force as it ages: a five-year-old collection followed by years of clean payments hurts far less than a fresh one.",
      },
      {
        type: "p",
        text: "Two last things. If you're ever served with a lawsuit over a collection, respond; ignoring a summons is how people lose automatically. And once the dust settles, the road back is well mapped: [Repairing Credit After a Setback](/learn/credit/repairing-credit) covers rebuilding, mark by mark.",
      },
    ],
    related: ["debt-collector-rights", "repairing-credit", "medical-debt-and-credit"],
  },

  {
    slug: "medical-debt-and-credit",
    order: 90,
    topicId: "credit",
    title: "Medical Bills and Your Credit Report",
    dek: "The rules here changed three times in four years. Here's what's actually true in 2026, and what to do before a bill gets anywhere near your credit.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Medical bills only reach your credit if they go to collections, and even then special rules apply.",
      "Paid medical collections come off your report, and bills under $500 never appear at all.",
      "You get a full year before an unpaid medical collection can show up. Use it.",
      "A 2025 federal rule removing all medical debt was struck down in court, so bureau policies and state laws are what protect you now.",
    ],
    body: [
      {
        type: "p",
        text: "A hospital stay comes with enough worry before the bill shows up. Then the envelope arrives, with a number that may or may not reflect what insurance will eventually pay, and underneath it hums a fear: is this going to wreck my credit? The honest answer, as of 2026, is that medical bills have far less power over your credit than most people believe, and far less than they had a few years ago. But the rules changed several times recently, so a lot of what you'll hear is out of date.",
      },
      {
        type: "h2",
        text: "A medical bill is not a credit account",
      },
      {
        type: "p",
        text: "Your doctor and hospital don't report to the credit bureaus. Paying a medical bill late doesn't show up the way a late credit card payment does. A medical bill can only touch your credit report if it goes unpaid long enough that the provider hands it to a collection agency, and even then, protections apply that no other kind of debt gets.",
      },
      {
        type: "h2",
        text: "The three protections in effect right now",
      },
      {
        type: "p",
        text: "In 2022 and 2023, the three big credit bureaus (Equifax, Experian, and TransUnion) voluntarily changed how they handle medical collections, and those policies still stand in 2026:",
      },
      {
        type: "list",
        items: [
          "**Paid medical collections come off your report entirely.** Once you or your insurer pays, the mark is removed, not just updated. No other type of collection gets this treatment.",
          "**Medical collections under $500 never appear at all**, no matter how long they go unpaid.",
          "**An unpaid medical collection can't appear for a full year** after the debt goes to collections. That waiting period exists precisely because medical billing is slow and error-prone.",
        ],
      },
      {
        type: "key",
        text: "That year is your window. It's time to make insurance pay what it should, fix billing errors, apply for financial assistance, or set up a payment plan, all before anything touches your credit.",
      },
      {
        type: "h2",
        text: "The federal rule that almost changed everything",
      },
      {
        type: "p",
        text: "In January 2025, the Consumer Financial Protection Bureau finalized a rule that would have removed medical debt from credit reports entirely and barred lenders from using it. Industry groups sued, and in July 2025 a federal court struck the rule down before it ever took effect. So there is no federal ban: the bureau policies above are the national baseline.",
      },
      {
        type: "p",
        text: "A number of states have gone further and passed their own laws restricting or banning medical debt on credit reports. Protections genuinely vary by state, so if a medical collection is looming, check what your state's law says before assuming the worst.",
      },
      {
        type: "h2",
        text: "How scores treat what does show up",
      },
      {
        type: "p",
        text: "Even when a medical collection lands on your report, the scoring models disagree about it. VantageScore's current models (3.0 and 4.0) ignore medical collections completely. Newer FICO versions (9 and 10) count them but weigh them less than other collections. The older FICO 8, still widely used by lenders, treats a medical collection like any other. Same bill, three different answers, depending on which score a lender pulls.",
      },
      {
        type: "h2",
        text: "What to do, in order",
      },
      {
        type: "steps",
        items: [
          "Don't pay a bill you don't understand. Ask for an itemized bill and check it against what your insurance processed; wrong codes and duplicate charges are common.",
          "If insurance should have covered it, appeal. Insurers reverse denials more often than people expect.",
          "Ask the provider about financial assistance and payment plans. [How to Fight a Medical Bill](/learn/insurance/negotiating-medical-bills) walks through the script; nonprofit hospitals are required to have assistance programs.",
          "If a medical collection on your report is wrong, already paid, under $500, or newer than a year, [dispute it](/learn/credit/disputing-credit-errors). These appear in error all the time.",
        ],
      },
      {
        type: "p",
        text: "If a bill has already gone to collections, the [collections playbook](/learn/credit/collections-explained) applies, with one upgrade: because paid medical collections vanish from your report, paying or settling a medical collection cleans your file in a way paying an ordinary collection doesn't. That's worth knowing before you decide what to pay first.",
      },
    ],
    related: ["negotiating-medical-bills", "collections-explained", "disputing-credit-errors"],
  },

  {
    slug: "credit-mix-and-age",
    order: 20,
    topicId: "credit",
    title: "The Credit Factors You Can't Rush",
    dek: "Length of history and credit mix reward patience, not activity. Here's what they measure, and the quiet ways people sabotage them.",
    level: "Advanced",
    readMinutes: 5,
    takeaways: [
      "Credit age and mix together make up roughly a quarter of your score.",
      "Your file gets older on its own; new accounts are what set it back.",
      "Keep old cards open, and let closed loans keep aging on your report.",
      "Never take on a loan you don't need just to improve your 'mix.'",
    ],
    body: [
      {
        type: "p",
        text: "Most credit advice is about doing something: pay this down, dispute that, set up autopay. Two scoring factors work the other way. Length of credit history and credit mix mostly reward the person who set things up sensibly and then left them alone. You can't rush either one, which is exactly why it's worth knowing how not to slow them down.",
      },
      {
        type: "h2",
        text: "What these factors measure",
      },
      {
        type: "p",
        text: "**Length of history** looks at how long you've had credit: the age of your oldest account, the average age of all of them, and how recently you opened the newest. **Credit mix** looks at variety: revolving credit (credit cards) versus installment credit (car loans, student loans, personal loans). In the FICO formula, length is about 15% of your score and mix about 10%. ([What Is a Credit Score?](/learn/credit/what-is-a-credit-score) has the full breakdown.)",
      },
      {
        type: "p",
        text: "A quarter of the score sounds like a lot until you see what the other three quarters are: whether you pay on time, and how much of your limits you use. Lenders care most about behavior; age and variety are supporting evidence. That has a practical meaning. A perfect mix will never rescue a file with late payments, and a 'bad' mix will never sink a file with years of on-time history.",
      },
      {
        type: "h2",
        text: "The patience tactics",
      },
      {
        type: "list",
        items: [
          "**Keep your oldest card alive.** Closing it eventually shortens your history and can spike your utilization; [What Hurts Your Score](/learn/credit/what-hurts-your-score) covers the trap. An old no-fee card is worth keeping open with one small recurring charge on it, so the issuer doesn't close it for inactivity.",
          "**Borrow someone else's history.** Being added as an authorized user on a family member's long-held, well-managed card can bring that account's age onto your report. [How to Build Credit From Zero](/learn/credit/build-credit-from-zero) explains how to do it safely.",
          "**Space out new accounts.** Every account you open lowers your average age, and three new cards in a year can knock a young file's average down sharply. If you don't need it, don't open it.",
          "**Let closed accounts keep working.** Accounts closed in good standing generally stay on your report for up to ten years, aging and helping the whole time. A paid-off car loan isn't gone; it's quietly vouching for you.",
        ],
      },
      {
        type: "h2",
        text: "What not to do",
      },
      {
        type: "p",
        text: "The classic mistake is hearing 'credit mix' and going shopping for debt: a small personal loan you don't need, financing you'd otherwise skip, all to 'diversify.' The math is terrible. Mix is about 10% of your score; the interest on an unnecessary loan is real money out the door every month, in exchange for a handful of points, maybe.",
      },
      {
        type: "key",
        text: "If a move requires paying interest for the sole purpose of helping your score, it's a bad move. (The one honest near-exception, a credit-builder loan for someone starting with nothing, is a build-from-zero tool, not a mix strategy.)",
      },
      {
        type: "p",
        text: "Mix takes care of itself over a normal life. Most people pick up an installment loan eventually (a car, school) without trying, and the factor is forgiving in the meantime: plenty of people with nothing but credit cards and spotless habits have excellent scores.",
      },
      {
        type: "p",
        text: "These are the slowest factors, and that's also their strength: they're the hardest to lose. Every month your accounts sit open, paid, and boring, your file gets a little older and a little stronger. On this part of the score, the calendar does the heavy lifting. Your only job is not to interrupt it.",
      },
    ],
    related: ["what-is-a-credit-score", "what-hurts-your-score", "build-credit-from-zero"],
  },

  {
    slug: "first-year-of-credit",
    order: 5,
    topicId: "credit",
    title: "Your First Year of Credit, Month by Month",
    dek: "No score, no history, no idea where to begin? Here's the whole first year, mapped to the guides that cover each move.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "Months 1–2: open one starter account that reports to the bureaus and put it on autopay.",
      "Months 3–6: pay on time and keep utilization low; pull your free report to confirm the account is reporting.",
      "Scores typically need about six months of history to exist at all, so don't chase a number early.",
      "By month 12 you have a file worth guarding: a credit freeze is free and takes minutes.",
    ],
    body: [
      {
        type: "p",
        text: "Credit building has a frustrating shape: the work is front-loaded and the results lag by months. Scoring models generally need about six months of history before you have a score at all, so your first year is less about chasing a number and more about running quiet habits until the number shows up. Here's the year, month by month.",
      },
      {
        type: "h2",
        text: "Months 1–2: get one account reporting",
      },
      {
        type: "p",
        text: "Everything starts with a single account that reports to the credit bureaus. [How to Build Credit From Zero](/learn/credit/build-credit-from-zero) walks through the starter tools (secured cards, credit-builder loans, becoming an authorized user) and how to pick one. No Social Security number? You still have real options; [Building Credit With No Social Security Number](/learn/credit/build-credit-no-ssn) covers the ITIN route.",
      },
      {
        type: "steps",
        items: [
          "Open one starter account and turn on autopay for the full balance the day it arrives.",
          "Give it a single small recurring charge, like a phone bill or a streaming subscription.",
          "Then leave it alone. One account is enough to start a file.",
        ],
      },
      {
        type: "h2",
        text: "Months 3–6: run the two habits",
      },
      {
        type: "p",
        text: "With the account open, only two behaviors move the needle: pay on time, every time, and keep the balance small relative to the limit. [Credit Utilization, Demystified](/learn/credit/credit-utilization) explains the second in detail, and [What Hurts Your Score (and What Doesn't)](/learn/credit/what-hurts-your-score) puts both in proportion so you don't sweat things that barely matter.",
      },
      {
        type: "p",
        text: "Somewhere in this stretch, pull your credit report for the first time. It costs nothing ([How to Check Your Credit for Free](/learn/credit/check-credit-free) shows where), and the goal is simply to confirm your account is actually being reported and nothing on the file surprises you.",
      },
      {
        type: "h2",
        text: "Month 6 and after: read the file properly",
      },
      {
        type: "p",
        text: "Around the six-month mark, most people who've had an account reporting the whole time will see a score generate. Whatever it is, don't judge it yet; young files score conservatively, and time fixes that on its own. This is the moment to sit down with [Reading Your Credit Report](/learn/credit/reading-your-credit-report) and go through every section line by line, because from here on this document follows you.",
      },
      {
        type: "h2",
        text: "Months 9–12: what a year buys you, and guarding it",
      },
      {
        type: "p",
        text: "A year of clean history is a real asset. Secured-card issuers often review accounts around this point to graduate you to a regular card and return your deposit, landlords see an actual file when they screen you, and better card offers start to make sense ([Choosing Your First Credit Card](/learn/credit/choosing-first-credit-card) covers how to compare them, and [Hard vs. Soft Credit Inquiries](/learn/credit/hard-vs-soft-inquiries) explains what shopping around does and doesn't cost).",
      },
      {
        type: "p",
        text: "That same file is now worth stealing. [Credit Freezes and Fraud Alerts](/learn/credit/credit-freeze) shows how to lock it: a freeze is free, takes minutes, and blocks anyone from opening accounts in your name. You thaw it whenever you apply for something yourself.",
      },
      {
        type: "p",
        text: "On timelines, keep your expectations qualitative: roughly six months to have a score, a year to have one lenders take a little seriously, and years of the same two habits to have a great one. The habits never change as the number grows. Only the stakes do.",
      },
    ],
    related: ["build-credit-from-zero", "credit-utilization", "check-credit-free"],
  },
];
