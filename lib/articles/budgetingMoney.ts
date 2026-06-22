import type { Article } from "./types";

export const budgetingMoneyArticles: Article[] = [
  {
    slug: "sending-money-abroad",
    order: 130,
    topicId: "budgeting",
    title: "Sending Money Abroad Without Losing a Chunk to Fees",
    dek: "Two hidden costs quietly shrink every transfer — here's how to make sure more of your money actually reaches your family.",
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
        text: "If you send money to family in another country — a parent, a sibling, a grandparent — you already know it's one of the most important things your paycheck does. It's called a remittance, and for millions of families it's a lifeline. So it stings to learn that a real chunk of what you send never arrives, lost to fees you can't even see. The good news: once you know where the money leaks, you can keep most of it.",
      },
      {
        type: "h2",
        text: "There are two costs, not one",
      },
      {
        type: "p",
        text: "When you send money abroad, you're charged in two different ways — and most people only notice the first one.",
      },
      {
        type: "list",
        items: [
          "**The upfront fee.** This is the obvious one: a flat charge to send the transfer, shown right on the screen.",
          "**The exchange-rate markup.** This is the sneaky one. The service converts your dollars into the other currency at a rate that's a little worse than the real one — and quietly keeps the difference.",
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
        text: "There's a true, fair exchange rate that banks use with each other — it's usually called the *mid-market rate*. Think of it as the honest number. You can look it up in seconds online or in a search engine. Once you know it, you have a measuring stick: compare the rate a service is actually offering you to the mid-market rate, and the gap is what they're taking on top of their fee.",
      },
      {
        type: "key",
        text: "Don't judge a transfer by its fee. Judge it by the *total amount your family receives* — that single number folds in the fee and the exchange-rate markup together.",
      },
      {
        type: "h2",
        text: "Banks are often the priciest option",
      },
      {
        type: "p",
        text: "It feels natural to send money through your bank — it's where your money already is. But banks are frequently the *most* expensive choice for international transfers, often with both a higher fee and a worse exchange rate than the alternatives. Dedicated money-transfer services and apps usually cost less, sometimes a lot less. Which one wins can change from country to country and month to month, so it's worth comparing each time rather than assuming.",
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
          "Ignore the headline fee and look at the bottom line — how much your recipient actually receives.",
          "Pick the one that delivers the most money at a speed that works, and double-check every recipient detail before you confirm.",
        ],
      },
      {
        type: "tip",
        text: "A *strong* scam warning: never send money through a service that a stranger pressures you to use, and never send to someone you haven't verified. Transfers are designed to be fast and final, which means they're very hard to reverse. Confirm the name, country, and account or pickup details carefully — once it's gone, it's usually gone.",
      },
      {
        type: "p",
        text: "Sending money home is an act of love, and it shouldn't quietly cost you more than it has to. A few minutes of comparing means more of every dollar lands where you meant it to go.",
      },
    ],
    related: ["money-and-family", "avoiding-bank-fees", "opening-first-bank-account"],
  },

  {
    slug: "how-to-read-a-pay-stub",
    order: 80,
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
        text: "The first time you really look at a pay stub, it can feel like a puzzle written in a language nobody taught you. There's a big number at the top, a smaller number at the bottom, and a stack of mystery deductions in between eating the difference. But your pay stub isn't trying to confuse you — it's actually a receipt that shows exactly where your money goes before it lands in your account. Once you can read it, you'll never feel lost looking at one again.",
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
          "**Gross pay** is the money you *earned* this pay period — your hourly rate times your hours, or your salary divided across the year. It's the bigger number.",
          "**Net pay** is the money you actually *take home* — what hits your bank account after everything is taken out. This is the number to budget on.",
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
          "**Federal income tax withholding** — money sent to the federal government toward your income taxes throughout the year, so you don't owe it all at once.",
          "**State income tax withholding** — the same idea for your state, if your state has an income tax (some don't).",
          "**FICA** — this funds *Social Security and Medicare*. It might show up as two lines or one, and it comes out of almost everyone's pay. Social Security helps support you in retirement or if you become disabled; Medicare helps cover health care later in life.",
          "**Pre-tax items** — things like your share of health insurance or money you put into a retirement plan at work. These come out *before* taxes are figured, which can lower the tax you pay.",
        ],
      },
      {
        type: "p",
        text: "*Withholding* just means money taken out a little at a time and sent in on your behalf. It's an estimate of what you'll owe, settled up when you file your tax return.",
      },
      {
        type: "h2",
        text: "What 'YTD' means",
      },
      {
        type: "p",
        text: "You'll see *YTD* next to a lot of numbers. It stands for *year-to-date* — the running total since January 1. So one column shows what came out *this* paycheck, and the YTD column shows what's come out *all year so far*. It's a handy way to see, at a glance, how much you've earned and paid in over the whole year.",
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
          "**Know your real hourly rate.** Net pay divided by hours worked is what your time *actually* earns after taxes — often a surprise, and useful to know.",
          "**Check your withholding.** If you get a giant refund or a surprise bill at tax time, your withholding may be off, and there's a form at work you can adjust.",
        ],
      },
      {
        type: "key",
        text: "Your pay stub is the difference between feeling like money mysteriously disappears and knowing exactly where it went. Read it like a receipt — gross at the top, deductions in the middle, take-home at the bottom.",
      },
      {
        type: "tip",
        text: "Save or screenshot your stubs. They're proof of income when you rent an apartment, apply for a loan, or sort out a tax question — and they're much easier to keep than to track down later.",
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
      "Protect yourself next — insurance and the payments that keep you out of deeper trouble.",
      "Unsecured debts like credit cards can usually wait or be negotiated.",
      "Call your creditors *before* you miss a payment — many will work with you.",
    ],
    body: [
      {
        type: "p",
        text: "Sometimes, after you do the math, there genuinely isn't enough to cover everything this month. If that's you right now, take a breath. This doesn't mean you failed or did something wrong — it happens to careful, hardworking people all the time. What you need in this moment isn't shame; it's a clear order of what to pay first. Let's walk through it calmly.",
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
        text: "Think of it as a ranked list. Work down it as far as your money goes — this is guidance, not a rigid law, so adjust it to your real situation:",
      },
      {
        type: "steps",
        items: [
          "**Keep your home.** Rent or your mortgage comes first. A roof over your head protects everything else in your life.",
          "**Keep the essentials on.** Electricity, heat, water — the utilities that keep your home livable and safe.",
          "**Keep food on the table.** Groceries for you and anyone you care for. This is non-negotiable.",
          "**Protect yourself.** Insurance you truly need, and the minimum payments that keep you out of deeper trouble — like a car payment if you need that car to get to work.",
          "**Everything else.** Unsecured debts like credit cards come last. Missing one hurts, but it usually won't cost you your home, your power, or your ability to earn.",
        ],
      },
      {
        type: "p",
        text: "Notice what's at the top: the things that, if you lost them, would make everything else *harder*. Losing your housing or your job is far more expensive — in money and stress — than a late credit card payment. That's why they come first.",
      },
      {
        type: "h2",
        text: "What can usually wait or be negotiated",
      },
      {
        type: "p",
        text: "Credit cards, store cards, and other *unsecured* debts (debts with no physical thing attached that can be taken back) are usually the most flexible. That doesn't mean ignore them — it means they're often where you have room to *negotiate*. Many credit card companies and lenders have hardship programs and would rather set up a smaller payment than get nothing at all. You frequently have more power here than you think.",
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
        text: "The worst move is to do nothing — to let the bills pile up unopened because they're stressful to look at. Ignoring a bill doesn't make it smaller; it lets late fees grow, accounts go to collections, and your options shrink. A bill you've called about is a problem you're managing. A bill you're hiding from is a problem that's quietly getting worse.",
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
    related: ["managing-financial-stress", "payday-loans-and-predatory-lending", "building-your-first-budget"],
  },

  {
    slug: "avoiding-bank-fees",
    order: 70,
    topicId: "budgeting",
    title: "Bank Fees and Overdrafts — and How to Dodge Them",
    dek: "Banks can quietly drain a tight account a few dollars at a time. Here's how to keep your money yours.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "The right checking account charges you nothing just to hold your money.",
      "Overdraft fees are the big one — and you can opt out so purchases get declined instead.",
      "Free checking with no minimums is common at online banks and credit unions.",
      "If past bank trouble is in the way, second-chance accounts can get you started.",
    ],
    body: [
      {
        type: "p",
        text: "Here's a frustrating truth: banks make a lot of money from fees, and those fees hit hardest exactly when you can least afford them — when your balance is already low. A few dollars here, thirty-something dollars there, and a tight account gets quietly drained by charges that have nothing to do with your spending. The fix isn't to avoid banks. It's to know the traps and sidestep them.",
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
          "**Monthly maintenance fees** — a charge just to *have* the account. Plenty of banks waive this; many never charge it at all.",
          "**Minimum-balance fees** — a penalty for letting your balance dip below some line. Brutal when money's tight, and completely avoidable with the right account.",
          "**ATM fees** — charges for using an out-of-network ATM, sometimes from *both* the ATM and your bank. They add up fast on small withdrawals.",
          "**Overdraft fees** — the big one. If you spend more than you have, the bank may cover it *and* charge you a hefty fee — often more than the thing you bought even cost.",
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
        text: "Maybe you've had an account closed, or you've never had one and don't know where to start — that's more common than you'd think, and it doesn't lock you out. Look into a *second-chance account*: a type of checking account built for people who've had banking problems in the past or are starting fresh. It's a real path back into the system, and from there you can graduate to a standard free account over time.",
      },
      {
        type: "tip",
        text: "If you don't have a bank account yet at all (being 'unbanked' is common and nothing to be ashamed of), opening even a basic free checking account is a big step forward — it ends check-cashing fees and gives your money a safe, fee-free home.",
      },
      {
        type: "p",
        text: "Your bank should be a place that holds your money, not a place that nibbles at it. Choose a no-fee account, switch off overdraft, keep an eye on your balance, and the fees that drain so many tight accounts simply stop happening to yours.",
      },
    ],
    related: ["opening-first-bank-account", "what-is-apy", "payday-loans-and-predatory-lending"],
  },
];
