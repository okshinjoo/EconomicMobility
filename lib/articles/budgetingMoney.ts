import type { Article } from "./types";

export const budgetingMoneyArticles: Article[] = [
  {
    slug: "sending-money-abroad",
    order: 130,
    topicId: "budgeting",
    title: "Sending Money Abroad Without Losing a Chunk to Fees",
    dek: "Two hidden costs quietly shrink every transfer. Here's how to make sure more of your money actually reaches your family.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Every transfer has two costs: the visible fee and a hidden markup in the exchange rate.",
      "Banks are often the most expensive way to send money home.",
      "Compare what your recipient actually receives across two or three services before you send.",
      "Be careful: transfers are hard to reverse, and pressure to use a certain service is a red flag.",
    ],
    body: [
      {
        type: "p",
        text: "If you send money to family in another country — a parent, a sibling, a grandparent — you already know it's one of the most important things your paycheck does. It's called a remittance, and for millions of families it's a lifeline. So it stings to learn that a real chunk of what you send never arrives, lost to fees you can't even see. Once you know where the money leaks, though, you can keep most of it. (Deciding how much you can sustainably send is its own question; [Helping Family Without Sinking Yourself](/learn/budgeting/money-and-family) covers that side. This guide is about making sure what you send arrives.)",
      },
      {
        type: "h2",
        text: "There are two costs, not one",
      },
      {
        type: "p",
        text: "When you send money abroad, you're charged in two different ways, and most people only notice the first one.",
      },
      {
        type: "list",
        items: [
          "**The upfront fee.** This is the obvious one: a flat charge to send the transfer, shown right on the screen.",
          "**The exchange-rate markup.** This is the sneaky one. The service converts your dollars into the other currency at a rate that's a little worse than the real one, and quietly keeps the difference.",
        ],
      },
      {
        type: "p",
        text: "That second cost is where people get burned, because it's invisible. A service can brag about a low fee, or even *zero* fee, and still take more from you through a bad exchange rate than a competitor that charges a small upfront fee and an honest rate.",
      },
      {
        type: "h2",
        text: "Find the real rate, then compare to it",
      },
      {
        type: "p",
        text: "There's a true, fair exchange rate that banks use with each other. It's usually called the *mid-market rate*, and it's the honest number. You can look it up in seconds online or in a search engine. Once you know it, you have a measuring stick: compare the rate a service is actually offering you to the mid-market rate, and the gap is what they're taking on top of their fee.",
      },
      {
        type: "key",
        text: "Don't judge a transfer by its fee. Judge it by the *total amount your family receives*. That single number folds in the fee and the exchange-rate markup together.",
      },
      {
        type: "h2",
        text: "Banks are often the priciest option",
      },
      {
        type: "p",
        text: "It feels natural to send money through your bank, since that's where your money already is. But banks are frequently the *most* expensive choice for international transfers, often with both a higher fee and a worse exchange rate than the alternatives. Dedicated money-transfer services and apps usually cost less, sometimes a lot less. Which one wins can change from country to country and month to month, so it's worth comparing each time rather than assuming.",
      },
      {
        type: "h2",
        text: "Speed and cost pull against each other",
      },
      {
        type: "p",
        text: "Generally, the faster your money arrives, the more you'll pay for it. An instant or same-day transfer can cost noticeably more than one that takes a few business days. If your family needs the money *today*, paying for speed can be completely worth it. But if it can wait a couple of days, the slower option often leaves more in their hands. Decide which matters more for this particular send.",
      },
      {
        type: "h2",
        text: "How to send smart, every time",
      },
      {
        type: "steps",
        items: [
          "Look up the mid-market rate for the two currencies so you know the honest number.",
          "Pull up two or three transfer services and enter the same amount in each.",
          "Ignore the headline fee and look at the bottom line: how much your recipient actually receives.",
          "Pick the one that delivers the most money at a speed that works, and double-check every recipient detail before you confirm.",
        ],
      },
      {
        type: "tip",
        text: "A *strong* scam warning: never send money through a service that a stranger pressures you to use, and never send to someone you haven't verified. Transfers are designed to be fast and final, which means they're very hard to reverse. Confirm the name, country, and account or pickup details carefully. Once it's gone, it's usually gone.",
      },
      {
        type: "p",
        text: "Sending money home is an act of love, and it shouldn't quietly cost you more than it has to. A few minutes of comparing means more of every dollar lands where you meant it to go.",
      },
    ],
    related: ["money-and-family", "avoiding-bank-fees", "new-to-america-money"],
  },

  {
    slug: "how-to-read-a-pay-stub",
    order: 90,
    topicId: "budgeting",
    title: "How to Read Your Pay Stub",
    dek: "That confusing slip of numbers is actually a map of where your money goes before you ever see it.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Gross pay is what you earned; net pay is what you actually take home.",
      "The gap between them is taxes and other deductions, line by line.",
      "FICA funds Social Security and Medicare and comes out of nearly every paycheck.",
      "Checking your stub catches errors and tells you your real take-home rate.",
    ],
    body: [
      {
        type: "p",
        text: "The first time you really look at a pay stub, it can feel like a puzzle written in a language nobody taught you. There's a big number at the top, a smaller number at the bottom, and a stack of mystery deductions in between eating the difference. But a pay stub is really a receipt: it shows exactly where your money goes before it lands in your account. Once you can read it, you'll never feel lost looking at one again.",
      },
      {
        type: "h2",
        text: "Gross pay vs. net pay",
      },
      {
        type: "p",
        text: "Start with the two numbers that matter most:",
      },
      {
        type: "list",
        items: [
          "**Gross pay** is the money you *earned* this pay period: your hourly rate times your hours, or your salary divided across the year. It's the bigger number.",
          "**Net pay** is the money you actually *take home*, what hits your bank account after everything is taken out. This is the number to budget on.",
        ],
      },
      {
        type: "p",
        text: "Everything between gross and net is a deduction. Your stub lists each one, so the whole thing is really just: here's what you made, here's what came out, here's what's left.",
      },
      {
        type: "h2",
        text: "What's coming out, and why",
      },
      {
        type: "p",
        text: "The deductions usually fall into a few buckets:",
      },
      {
        type: "list",
        items: [
          "**Federal income tax withholding.** Money sent to the federal government toward your income taxes throughout the year, so you don't owe it all at once.",
          "**State income tax withholding.** The same idea for your state, if your state has an income tax (some don't).",
          "**FICA.** This funds *Social Security and Medicare*. It might show up as two lines or one, and it comes out of almost everyone's pay. Social Security helps support you in retirement or if you become disabled; Medicare helps cover health care later in life.",
          "**Pre-tax items.** Things like your share of health insurance or money you put into a retirement plan at work. These come out *before* taxes are figured, which can lower the tax you pay.",
        ],
      },
      {
        type: "p",
        text: "*Withholding* just means money taken out a little at a time and sent in on your behalf. It's an estimate of what you'll owe, settled up when you file your tax return. The estimate comes from the W-4 form you filled out when you started the job; [How to Fill Out a W-4 So Your Paycheck Is Right](/learn/taxes/how-to-fill-out-w4) explains how it works and how to adjust it.",
      },
      {
        type: "h2",
        text: "What 'YTD' means",
      },
      {
        type: "p",
        text: "You'll see *YTD* next to a lot of numbers. It stands for *year-to-date*: the running total since January 1. So one column shows what came out *this* paycheck, and the YTD column shows what's come out *all year so far*. It's a handy way to see, at a glance, how much you've earned and paid in over the whole year.",
      },
      {
        type: "h2",
        text: "Why it's worth a two-minute look",
      },
      {
        type: "p",
        text: "Glancing at your stub each pay period is a small habit that pays off:",
      },
      {
        type: "list",
        items: [
          "**Catch mistakes.** Wrong hours, a missing raise, or a deduction that shouldn't be there are easier to fix when you spot them early.",
          "**Know your real hourly rate.** Net pay divided by hours worked is what your time *actually* earns after taxes. It's often a surprise, and useful to know.",
          "**Check your withholding.** If you get a giant refund or a surprise bill at tax time, your withholding may be off. Adjusting your W-4 fixes it going forward.",
        ],
      },
      {
        type: "key",
        text: "Your pay stub is the difference between feeling like money mysteriously disappears and knowing exactly where it went. Read it like a receipt: gross at the top, deductions in the middle, take-home at the bottom.",
      },
      {
        type: "tip",
        text: "Save or screenshot your stubs. They're proof of income when you rent an apartment, apply for a loan, or sort out a tax question, and they're much easier to keep than to track down later.",
      },
    ],
    related: ["your-first-paycheck", "reading-a-job-offer", "building-your-first-budget"],
  },

  {
    slug: "prioritizing-bills-when-money-is-tight",
    order: 120,
    topicId: "budgeting",
    title: "When You Can't Pay Every Bill: What to Pay First",
    dek: "Some months the money just isn't there. Here's a calm, no-shame way to decide what gets paid.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Cover what keeps you safe first: housing, then utilities, then food.",
      "Protect yourself next: insurance and the payments that keep you out of deeper trouble.",
      "Unsecured debts like credit cards can usually wait or be negotiated.",
      "Call your creditors *before* you miss a payment; many will work with you.",
    ],
    body: [
      {
        type: "p",
        text: "Sometimes, after you do the math, there genuinely isn't enough to cover everything this month. If that's you right now, take a breath. This doesn't mean you failed or did something wrong. It happens to careful, hardworking people all the time. What you need in this moment isn't shame; it's a clear order of what to pay first. Let's walk through it calmly.",
      },
      {
        type: "h2",
        text: "The idea: pay for safety first",
      },
      {
        type: "p",
        text: "When you can't pay everything, you stop paying in the order bills happen to arrive and start paying in the order that *protects you most*. The goal is simple: keep yourself housed, safe, and able to keep earning. Money you spend on those things does far more for you than money sent to a credit card this week.",
      },
      {
        type: "h2",
        text: "The triage order",
      },
      {
        type: "p",
        text: "Think of it as a ranked list. Work down it as far as your money goes. This is guidance, not a rigid law, so adjust it to your real situation:",
      },
      {
        type: "steps",
        items: [
          "**Keep your home.** Rent or your mortgage comes first. A roof over your head protects everything else in your life.",
          "**Keep the essentials on.** Electricity, heat, water: the utilities that keep your home livable and safe.",
          "**Keep food on the table.** Groceries for you and anyone you care for. This is non-negotiable.",
          "**Protect yourself.** Insurance you truly need, and the minimum payments that keep you out of deeper trouble, like a car payment if you need that car to get to work.",
          "**Everything else.** Unsecured debts like credit cards come last. Missing one hurts, but it usually won't cost you your home, your power, or your ability to earn.",
        ],
      },
      {
        type: "p",
        text: "Notice what's at the top: the things that, if you lost them, would make everything else *harder*. Losing your housing or your job is far more expensive, in money and stress, than a late credit card payment. And if rent or utilities are the bills you can't cover, real assistance programs exist; [Help With Utilities and Rent](/learn/government-aid/utility-rent-assistance) walks through them, and many are worth applying for early.",
      },
      {
        type: "h2",
        text: "What can usually wait or be negotiated",
      },
      {
        type: "p",
        text: "Credit cards, store cards, and other *unsecured* debts (debts with no physical thing attached that can be taken back) are usually the most flexible. That doesn't mean ignore them. It means they're often where you have room to *negotiate*. Many credit card companies and lenders have hardship programs and would rather set up a smaller payment than get nothing at all. You frequently have more power here than you think.",
      },
      {
        type: "key",
        text: "Call your creditors *before* you miss a payment, not after. Tell them plainly: 'I'm having a hard month and want to figure out a plan.' Companies work with people who reach out far more often than people expect — but you have to make the call.",
      },
      {
        type: "h2",
        text: "The one thing not to do",
      },
      {
        type: "p",
        text: "The worst move is to do nothing: to let the bills pile up unopened because they're stressful to look at. Ignoring a bill doesn't make it smaller. It lets late fees grow, accounts go to collections, and your options shrink. (If something has already gone to collections, read up on [your rights when a debt collector calls](/learn/government-aid/debt-collector-rights); collectors have rules they must follow.) A bill you've called about is a problem you're managing. A bill you're hiding from is a problem that's quietly getting worse.",
      },
      {
        type: "tip",
        text: "When you call, ask specifically about a *hardship plan*, a *lower minimum*, a *due-date change*, or a short *forbearance* (a pause). Write down who you talked to and what you agreed on. Having an arrangement in writing protects you later.",
      },
      {
        type: "p",
        text: "A tight month is survivable. Pay for safety first, talk to the people you owe before things slip, and don't let the fear of opening an envelope cost you more than the bill inside it ever would.",
      },
    ],
    related: ["managing-financial-stress", "negotiating-your-bills", "payday-loans-and-predatory-lending"],
  },

  {
    slug: "avoiding-bank-fees",
    order: 70,
    topicId: "budgeting",
    title: "Bank Fees and Overdrafts — and How to Dodge Them",
    dek: "Banks can quietly drain a tight account a few dollars at a time. Here's how to keep your money yours.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "The right checking account charges you nothing just to hold your money.",
      "Overdraft fees are the big one, and you can opt out so purchases get declined instead.",
      "Free checking with no minimums is common at online banks and credit unions.",
      "If past bank trouble is in the way, second-chance accounts can get you started.",
    ],
    body: [
      {
        type: "p",
        text: "A frustrating truth: banks make a lot of money from fees, and those fees hit hardest exactly when you can least afford them, when your balance is already low. A few dollars here, twenty-something dollars there, and a tight account gets quietly drained by charges that have nothing to do with your spending. The fix isn't to avoid banks. It's to know the traps and sidestep them.",
      },
      {
        type: "h2",
        text: "The fees to know",
      },
      {
        type: "p",
        text: "Most account fees fall into a handful of types. Once you can name them, you can dodge them:",
      },
      {
        type: "list",
        items: [
          "**Monthly maintenance fees.** A charge just to *have* the account. Plenty of banks waive this; many never charge it at all.",
          "**Minimum-balance fees.** A penalty for letting your balance dip below some line. Brutal when money's tight, and completely avoidable with the right account.",
          "**ATM fees.** Charges for using an out-of-network ATM, sometimes from *both* the ATM and your bank. They add up fast on small withdrawals.",
          "**Overdraft fees.** The big one. If you spend more than you have, the bank may cover it *and* charge you a hefty fee, often more than the thing you bought even cost.",
        ],
      },
      {
        type: "h2",
        text: "How to dodge them",
      },
      {
        type: "p",
        text: "Most of these fees are optional once you set things up right. A few concrete moves handle almost all of them:",
      },
      {
        type: "list",
        items: [
          "**Pick a free checking account.** Many online banks and credit unions charge no monthly fee and require no minimum balance. You don't have to accept fees as the price of having a bank.",
          "**Opt *out* of overdraft coverage.** When you opt out, a purchase you can't afford simply gets *declined* instead of going through and triggering a fee. A declined card is a tiny, free embarrassment; an overdraft fee is real money gone.",
          "**Watch your balance.** Turn on low-balance alerts and check the app before a big purchase. Knowing your number is the cheapest protection there is.",
          "**Use in-network ATMs.** Stick to your bank's machines, or choose a bank that reimburses ATM fees, and the charges disappear.",
        ],
      },
      {
        type: "key",
        text: "Opting out of overdraft 'coverage' is one of the highest-value money moves you can make on a tight budget. You're trading a possible decline at the register for never getting hit by a surprise overdraft fee again.",
      },
      {
        type: "h2",
        text: "If you've had trouble before",
      },
      {
        type: "p",
        text: "Maybe a bank closed an account on you years ago, or you've never had one at all. Neither locks you out. Second-chance checking accounts are built for exactly this, and [Getting Into the Banking System Safely](/learn/budgeting/unbanked-underbanked) walks through them, along with opening an account with an ITIN instead of a Social Security number.",
      },
      {
        type: "p",
        text: "Your bank should be a place that holds your money, not a place that nibbles at it. Choose a no-fee account, switch off overdraft, keep an eye on your balance, and the fees that drain so many tight accounts simply stop happening to yours.",
      },
    ],
    related: ["opening-first-bank-account", "unbanked-underbanked", "negotiating-your-bills"],
  },

  {
    slug: "checking-vs-savings",
    order: 55,
    topicId: "budgeting",
    title: "Checking vs. Savings: Where Each Dollar Lives",
    dek: "Two accounts, two different jobs. Getting the split right is most of what 'being organized with money' means.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Checking is for money in motion; savings is for money at rest.",
      "Checking pays essentially nothing, so only your spending money should sit there.",
      "Savings should earn real interest, and a high-yield account is where it does.",
      "An automatic transfer on payday keeps the system running without willpower.",
    ],
    body: [
      {
        type: "p",
        text: "Banks offer two basic kinds of accounts, and the difference sounds like trivia until you realize each one is built for a completely different job. Checking is for money in *motion*: your paycheck lands there, your rent and bills leave from there, your debit card pulls from there. Savings is for money at *rest*: the emergency cushion and the goals you're building toward. Most money mess at the beginning comes from making one account do both jobs.",
      },
      {
        type: "h2",
        text: "The two-account starter system",
      },
      {
        type: "p",
        text: "You don't need a complicated setup. One checking account and one savings account cover almost everything for years. What matters is being clear about what lives where:",
      },
      {
        type: "list",
        items: [
          "**Checking holds this month's money.** The rent, the bills, groceries, transport, and the spending money you've budgeted. If it's leaving your hands within a few weeks, it belongs here.",
          "**Savings holds future money.** Your emergency fund, next semester's books, the security deposit for your next place, the flight home. If you're not spending it this month, it shouldn't sit where your debit card can reach it.",
        ],
      },
      {
        type: "p",
        text: "The line between them is the whole trick. When every dollar sits in checking, your balance always looks bigger than what you can spend, and savings quietly erodes one small purchase at a time.",
      },
      {
        type: "h2",
        text: "Why checking pays nothing, and savings should pay you",
      },
      {
        type: "p",
        text: "Checking accounts pay little or no interest, and that's by design: the bank assumes the money is passing through, not staying. Don't fight it; just don't store money there. Savings is where interest happens, or at least where it should. A traditional big-bank savings account often pays around 0.01%, which is effectively nothing, while a high-yield savings account pays around 4% in 2026. On real balances that gap is real money, and moving is easy: [high-yield savings accounts](/learn/investing/high-yield-savings-account) work like any other savings account, just online and better-paying. If the interest math is new to you, [What Is APY?](/learn/budgeting/what-is-apy) explains how the earning actually works.",
      },
      {
        type: "p",
        text: "One thing people don't always realize: your checking and savings don't have to live at the same bank. A common setup is free checking at a bank with convenient ATMs, plus a high-yield savings account online. Transfers between them take a day or two, which brings up a surprising point.",
      },
      {
        type: "h2",
        text: "A little friction is a feature",
      },
      {
        type: "p",
        text: "Savings is supposed to be slightly harder to reach than checking. No debit card attached, maybe a day's wait to move money over. That tiny delay is enough to stop most impulse raids on your own goals, while still leaving the money fully available for a true emergency. Some banks also limit how many withdrawals you can make from savings each month, so check your account's rules; for money you planned to leave alone anyway, the limit rarely matters.",
      },
      {
        type: "h2",
        text: "Set up the automatic sweep",
      },
      {
        type: "steps",
        items: [
          "Pick an amount you can sustain, even if it's $20 per paycheck.",
          "Set up a recurring automatic transfer from checking to savings, dated the day after your paycheck lands.",
          "Keep a small cushion in checking (even $100 helps) so the transfer never accidentally overdraws you.",
          "Raise the transfer amount when your income goes up, before the extra money finds other plans.",
        ],
      },
      {
        type: "key",
        text: "Budget on your checking balance, not your total. If checking only ever holds this month's money, the number you see when you check your balance is the number you can actually spend, with no mental math required.",
      },
      {
        type: "p",
        text: "That's the whole starter system: spending flows through checking, saving accumulates in savings, and a payday transfer connects them. Later, you might split savings into separate buckets for separate goals ([sinking funds](/learn/budgeting/sinking-funds) are the natural next step), but the two-account version is enough to run a calm financial life for a long time.",
      },
    ],
    related: ["opening-first-bank-account", "what-is-apy", "high-yield-savings-account"],
  },

  {
    slug: "negotiating-your-bills",
    order: 55,
    topicId: "budgeting",
    title: "Yes, You Can Negotiate Your Bills",
    dek: "Internet, phone, fees, even medical bills: many 'fixed' prices are opening offers. Here's how to make the call.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Internet and phone companies have retention discounts reserved for people who ask.",
      "Come to the call with a competitor's real price in hand.",
      "Many one-time bank and card fees get reversed with one polite request.",
      "If they won't budge, switching is the negotiation.",
    ],
    body: [
      {
        type: "p",
        text: "The prices on your monthly bills look official and final. Plenty of them aren't. Internet, phone, streaming bundles, some fees, even medical bills all have more give in them than the invoice suggests, and companies quietly count on most customers never testing that. Negotiating a bill isn't a special skill or a confrontation. It's usually one phone call, a specific request, and a little patience on hold.",
      },
      {
        type: "h2",
        text: "Why asking works",
      },
      {
        type: "p",
        text: "It costs a company far more to win a new customer than to keep an existing one, and internet and phone providers know their churn math cold. That's why they run steep new-customer promotions and why most of them staff a *retention department* whose whole job is talking people out of canceling, with discounts the regular support line can't offer. When your bill creeps up, it's not because your service got better. It's because your promotional rate expired and the company is betting you won't notice or won't call.",
      },
      {
        type: "h2",
        text: "The internet-and-phone playbook",
      },
      {
        type: "steps",
        items: [
          "Check what you're paying now and whether a promo rate recently expired. Your bill or account page will show it.",
          "Look up what competitors in your area charge new customers for similar service, and write the best one down. This number is your leverage.",
          "Look up your own provider's current new-customer offer too. You're about to ask for something close to it.",
          "Call and say you're thinking about canceling because of the price. You'll usually be routed to retention.",
          "Make the specific ask: \"My bill went from $55 to $80. [Competitor] is offering $50 for the same speeds. I'd rather stay. What can you do on price?\"",
          "Let them answer. If the first offer is weak, ask if that's the best available, and be willing to politely hold your ground.",
        ],
      },
      {
        type: "p",
        text: "Stay friendly the whole way through. The person on the line didn't set the price, and agents have real discretion about how hard they dig for discounts on your behalf. Rudeness closes doors; a calm, specific request opens them.",
      },
      {
        type: "tip",
        text: "Whatever deal you get is usually another 12-month promotion, so put its end date on your calendar. An annual 20-minute call is the maintenance fee for never paying the creep-up price.",
      },
      {
        type: "h2",
        text: "Medical bills negotiate too",
      },
      {
        type: "p",
        text: "Medical bills are one of the most negotiable bills there are, between billing errors, financial assistance programs, and plain payment-plan requests. That's a big enough subject to have its own guide: [How to Negotiate a Medical Bill](/learn/insurance/negotiating-medical-bills) walks through requesting an itemized bill, spotting errors, and asking for assistance before you pay a dollar.",
      },
      {
        type: "h2",
        text: "Fee reversals: the easiest call you'll make",
      },
      {
        type: "p",
        text: "A first late fee on a credit card, a one-off overdraft charge, an annual fee on a card you've held for years: these get waived all the time for customers in decent standing who simply ask. The script is short: \"I've been a customer for three years and this is my first late payment. Could you reverse the fee?\" The worst case is a no, and the call takes five minutes. Reversing fees is the cure; setting up your accounts so they stop happening is the prevention, and [Bank Fees and Overdrafts](/learn/budgeting/avoiding-bank-fees) covers that side.",
      },
      {
        type: "h2",
        text: "When to walk",
      },
      {
        type: "p",
        text: "Sometimes retention won't budge, and that's your answer: take the competitor offer you researched in step two. New-customer pricing is the biggest discount in the industry, and switching internet or phone providers costs an afternoon, not a fortune. A provider that only offers its best price to strangers has told you how it values you.",
      },
      {
        type: "p",
        text: "One boundary worth naming: this article is about lowering prices you can afford to pay. If the real problem is that the money isn't there this month, that's a different conversation, about hardship plans and payment priorities, and [What to Pay First](/learn/budgeting/prioritizing-bills-when-money-is-tight) is the guide for it.",
      },
      {
        type: "key",
        text: "Run the math on one call: knocking $25 off your internet bill is $300 a year, tax-free, for 20 minutes of your time. Very few side hustles pay that hourly rate.",
      },
    ],
    related: ["avoiding-bank-fees", "negotiating-medical-bills", "saving-on-a-tight-budget"],
  },

  {
    slug: "turning-18-money",
    order: 15,
    topicId: "budgeting",
    title: "Turning 18: What Just Unlocked",
    dek: "Your signature became legally binding overnight. Here's what that changes about money, and what's worth doing in your first months as an adult.",
    level: "Beginner",
    readMinutes: 3,
    takeaways: [
      "At 18, accounts, contracts, and debts in your name are legally yours.",
      "You can now open your own bank account and start credit; starting the clock early pays off for decades.",
      "Your SSN can open real credit now, which makes it worth actively guarding.",
      "Joint accounts and cosigned loans with family are real debt, not a formality.",
    ],
    body: [
      {
        type: "p",
        text: "Nothing about money feels different the morning you turn 18, but the legal ground under you moved overnight. Your signature is now binding. You can open accounts, sign leases, and take on debt entirely on your own, and you can be held to every bit of it. That cuts both ways: the tools adults use to build a financial life just unlocked, and so did the ways to get hurt. Here's what changed, and what's worth doing about it in your first few months.",
      },
      {
        type: "h2",
        text: "What your signature can do now",
      },
      {
        type: "p",
        text: "Almost everything on this list comes down to one change: you can now enter contracts, and contracts are the rails money runs on. As of your birthday, you can:",
      },
      {
        type: "list",
        items: [
          "Open and fully own a bank account, with no adult on it.",
          "Get a credit card, loan, lease, or phone plan in your own name.",
          "File your own tax return and sign your own FAFSA.",
          "Be sued, sent to collections, or held to any contract you sign.",
        ],
      },
      {
        type: "h2",
        text: "The first few months, in order",
      },
      {
        type: "steps",
        items: [
          "**Open an account that's fully yours.** If your only account is a teen account with a parent as co-owner, you can now hold one solo or convert the one you have. [Opening Your First Bank Account](/learn/budgeting/opening-first-bank-account) covers what to bring and what \"free\" should mean.",
          "**Start your credit history.** Before 18 you couldn't be the primary holder on a credit account; now you can, and the age of your oldest account quietly helps your score for the rest of your life. [How to Build Credit From Zero](/learn/credit/build-credit-from-zero) shows the safe first moves, and [The Credit Factors You Can't Rush](/learn/credit/credit-mix-and-age) explains why a clock started at 18 beats one started at 25.",
          "**Find out whether taxes involve you yet.** Even a part-time job can mean a refund waiting for you when filing isn't strictly required. [Do You Even Need to File?](/learn/taxes/do-you-need-to-file) is the five-minute answer, and [What to Do With Your First Paycheck](/learn/budgeting/your-first-paycheck) explains the deductions you'll see along the way.",
          "**Guard your identity like it's worth something, because now it is.** Your Social Security number can open real credit in your name. [Guarding Your SSN and Important Documents](/learn/money-safety/protecting-your-documents) covers the habits, and a [credit freeze](/learn/credit/credit-freeze) is a free, proactive lock you can set today and lift whenever you apply for something.",
          "**If college is anywhere on your horizon, the FAFSA is yours to file.** It goes in under your name with your signature. [FAFSA, Step by Step](/learn/college/fafsa-step-by-step) walks through it.",
        ],
      },
      {
        type: "h2",
        text: "The new fine print with family",
      },
      {
        type: "p",
        text: "Before 18, being \"added\" to a family account was mostly symbolic. Now a joint account or a cosigned loan makes the debt legally yours, no matter whose idea it was or who promises to pay. That doesn't make helping family wrong; it makes it a real decision. [Helping Family Without Sinking Yourself](/learn/budgeting/money-and-family) covers how to say yes and no without wrecking the relationship.",
      },
      {
        type: "p",
        text: "None of this has to happen in week one. But the bank account and the first credit account are worth doing early, because both get more valuable with time. Pick one and handle it this month.",
      },
    ],
    related: ["opening-first-bank-account", "build-credit-from-zero", "do-you-need-to-file"],
  },
];
