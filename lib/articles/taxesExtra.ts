import type { Article } from "./types";

export const taxesExtraArticles: Article[] = [
  {
    slug: "tax-refund-explained",
    order: 50,
    topicId: "taxes",
    title: "Your Tax Refund, Explained",
    dek: "That refund check feels like a gift, but it's really your own money coming back. Here's what that means.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A refund means you overpaid taxes during the year, not free money.",
      "A big refund is an interest-free loan you gave the government.",
      "You can adjust your paycheck to keep more of it now instead.",
      "Either way works. The point is to choose on purpose.",
    ],
    body: [
      {
        type: "p",
        text: "Tax season rolls around, you file, and a few weeks later a chunk of money lands in your account. A lot of people count on it, plan around it, even celebrate it. So here's something that surprises almost everyone the first time they hear it: that refund was never extra money. It was always yours.",
      },
      {
        type: "h2",
        text: "Where a refund comes from",
      },
      {
        type: "p",
        text: "Every paycheck, your employer withholds an estimate of the tax you'll owe and sends it to the government on your behalf. If that estimate ran high, you paid in more than you owed, and the refund is the government handing back the difference. (The form that sets the estimate is the W-4; [How to Fill Out a W-4](/learn/taxes/how-to-fill-out-w4) explains how to control it.)",
      },
      {
        type: "p",
        text: "So a $2,400 refund doesn't mean you won anything. It means about $200 a month came out of your checks that you didn't actually owe, and you got it back all at once, months later.",
      },
      {
        type: "key",
        text: "A refund isn't a gift. It's your overpayment coming home, and a big refund means you loaned the government your money all year for free.",
      },
      {
        type: "h2",
        text: "Is a big refund bad?",
      },
      {
        type: "p",
        text: "Not exactly, and this is where it gets personal. Some people love a big refund because it works as forced savings. If money is hard to hold onto, getting a lump sum once a year that you put toward debt, an emergency fund, or a deposit can genuinely change your year.",
      },
      {
        type: "p",
        text: "But that same money spread across your monthly paychecks, an extra $100 or $200, might be the difference between scraping by and breathing easier right now. Only you know which one your life needs.",
      },
      {
        type: "tip",
        text: "If you'd rather keep more of each paycheck, hand your employer a new W-4. Smaller refund, bigger checks. If you'd rather get the lump sum, leave it as is. Both are valid; just pick one on purpose.",
      },
      {
        type: "h2",
        text: "One thing to never skip",
      },
      {
        type: "p",
        text: "Whatever you choose, file your return, even if your income was low and you're not sure you have to. Refunds and credits like the [Earned Income Tax Credit](/learn/taxes/earned-income-tax-credit) only reach you if you file, and [you can usually do it for free](/learn/taxes/free-ways-to-file). Leaving a refund unclaimed is the one mistake worth avoiding.",
      },
      {
        type: "p",
        text: "Your refund isn't magic and it isn't a windfall. It's a number you have some control over. Once you see it that way, you get to decide when you want your own money: now, or later.",
      },
    ],
    related: ["how-to-fill-out-w4", "free-ways-to-file", "earned-income-tax-credit"],
  },

  {
    slug: "how-to-fill-out-w4",
    order: 40,
    topicId: "taxes",
    title: "How to Fill Out a W-4 So Your Paycheck Is Right",
    dek: "The form that decides how much tax comes out of every check, and how to set it so there are no nasty surprises.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "The W-4 tells your employer how much tax to hold from your pay.",
      "Get it wrong one way, you owe in April; the other way, you overpay.",
      "Most single people with one job can keep it simple.",
      "You can hand in a new one any time your life changes.",
    ],
    body: [
      {
        type: "p",
        text: "When you start a job, you get handed a pile of forms, and one of them is the W-4. Nobody explains it, so most people guess, sign, and hope for the best. But this little form quietly decides how much tax disappears from every single paycheck, which makes it worth five careful minutes.",
      },
      {
        type: "h2",
        text: "What the W-4 is actually doing",
      },
      {
        type: "p",
        text: "The W-4 doesn't decide how much tax you *owe*; your income does that. What it controls is *withholding*: how much your employer pulls out of each check and sends to the government ahead of time. You can see the result on the withholding lines of [your pay stub](/learn/budgeting/how-to-read-a-pay-stub).",
      },
      {
        type: "list",
        items: [
          "**Too much withheld:** smaller paychecks, but a refund in the spring.",
          "**Too little withheld:** bigger paychecks now, but a bill you might not be ready for in April.",
        ],
      },
      {
        type: "p",
        text: "The goal isn't to game it. It's to land close to even, so April is a non-event instead of a shock.",
      },
      {
        type: "h2",
        text: "The simple path most people can take",
      },
      {
        type: "p",
        text: "If you're single, have one job, and no one else's income or kids to factor in, the form is shorter than it looks. You don't have to fill in every box.",
      },
      {
        type: "steps",
        items: [
          "Step 1: Your name, address, Social Security number, and filing status (single, married, head of household).",
          "Steps 2–4: For multiple jobs, a working spouse, dependents, or other income. One simple job? You can often skip most of this.",
          "Step 5: Sign and date it, then hand it back to whoever does payroll.",
        ],
      },
      {
        type: "tip",
        text: "Working two jobs, or you and a partner both work? That's the most common reason people accidentally under-withhold and owe in April. The form's Step 2 (and the IRS withholding estimator online) exists exactly for this. Don't skip it if it's you.",
      },
      {
        type: "h2",
        text: "You're allowed to change it",
      },
      {
        type: "p",
        text: "The W-4 isn't permanent, though almost nobody tells you that. Got a raise, picked up a second job, had a kid, got married, or got surprised by [your refund](/learn/taxes/tax-refund-explained) last year? Ask payroll for a fresh W-4 and turn in a new one. You can do this whenever your life changes.",
      },
      {
        type: "key",
        text: "The W-4 isn't a test you pass once. It's a dial you can turn any time your income or family changes, so your paycheck and your April line up.",
      },
      {
        type: "p",
        text: "You don't need to be a tax expert to get this right. You need to know the form exists, what it controls, and that you can always redo it. That's enough to keep your paycheck honest.",
      },
    ],
    related: ["tax-refund-explained", "understanding-tax-forms", "filing-taxes-first-time"],
  },

  {
    slug: "tax-brackets-explained",
    order: 70,
    topicId: "taxes",
    title: "Tax Brackets, Explained",
    dek: "The myth that a raise can leave you with less money has scared people for generations. It's wrong, and here's why.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Tax brackets are tiers. Only the income inside each tier is taxed at that tier's rate.",
      "A raise never drops your total take-home pay.",
      "Your 'tax bracket' is just the rate on your last dollar, not all of it.",
      "Your real overall tax rate is lower than your top bracket.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably heard someone say it, maybe a relative or a coworker: 'Be careful taking that raise. It'll bump you into a higher tax bracket and you'll actually take home less.' It sounds logical. It's also completely false, and believing it has cost people real opportunities.",
      },
      {
        type: "h2",
        text: "Brackets are tiers, not a single switch",
      },
      {
        type: "p",
        text: "The core idea everyone misses: a tax bracket only applies to the income *inside* that bracket, not to your whole paycheck. The tax system is built like a set of stairs. Your first chunk of income is taxed at the lowest rate. The next chunk up is taxed a little more. And so on, only on the dollars that reach each step.",
      },
      {
        type: "p",
        text: "Picture filling a row of buckets. The first bucket fills at a low rate. Only after it's full does any money spill into the next, higher-rate bucket. The money already in the lower buckets keeps its lower rate forever.",
      },
      {
        type: "key",
        text: "Your 'tax bracket' is just the rate on your *last* dollar earned, not on all of it. A raise is always more money in your pocket, never less.",
      },
      {
        type: "h2",
        text: "What actually happens when you get a raise",
      },
      {
        type: "p",
        text: "Say a raise pushes part of your income up into the next bracket. Only the dollars *above* that line get taxed at the higher rate. Everything below the line is taxed exactly as before. So if $1,000 of your raise crosses into a higher tier, you only pay the extra rate on that $1,000, and you still keep most of it. You come out ahead. Always.",
      },
      {
        type: "p",
        text: "There is genuinely no point where earning one more dollar leaves you with less total money. The math simply doesn't work that way.",
      },
      {
        type: "tip",
        text: "For 2026, a single filer's brackets are: **10%** up to $12,400, **12%** up to $50,400, **22%** up to $105,700, **24%** up to $201,775, **32%** up to $256,225, **35%** up to $640,600, and **37%** above that. (The cutoffs roughly double for married couples filing jointly.) They nudge up a little each year for inflation, but the *idea* of marginal brackets never changes.",
      },
      {
        type: "h2",
        text: "Why your real tax rate is lower than you think",
      },
      {
        type: "p",
        text: "Because only your top dollars hit your top bracket, the *average* rate you actually pay across all your income is lower than that top number. Someone whose highest bracket is, say, 22% is paying well under 22% of their total income in federal tax, once you blend in all those lower-taxed lower buckets. And that's before subtracting [deductions and credits](/learn/taxes/deductions-vs-credits), which shrink the bill further.",
      },
      {
        type: "p",
        text: "So the next time someone warns you off a raise, a bonus, or a few extra shifts because of 'the brackets,' you can let that fear go. More income is more income. Take the raise.",
      },
    ],
    related: ["deductions-vs-credits", "understanding-tax-forms", "tax-refund-explained", "investment-taxes-101"],
    quiz: [
      {
        question: "A raise pushes part of your income into a higher bracket. Which dollars get taxed at the higher rate?",
        options: [
          "All of your income for the year",
          "Only the dollars above the bracket line",
          "Your whole raise, but not your old salary",
        ],
        answer: 1,
        explain:
          "Brackets are tiers, so each rate only applies to the income inside that tier. Everything below the line is taxed exactly as before.",
      },
      {
        question: "Can taking a raise ever leave you with less total take-home pay?",
        options: [
          "Yes, if it bumps you into a higher bracket",
          "Yes, but only for large raises",
          "No, a raise is always more money in your pocket",
        ],
        answer: 2,
        explain:
          "Only the dollars above the bracket line get the higher rate, and you keep most of them. There's no point where earning one more dollar leaves you with less.",
      },
      {
        question: "Your top bracket is 22%. What does that mean for your overall tax rate?",
        options: [
          "You pay 22% of your total income in federal tax",
          "Your average rate is actually lower than 22%",
          "You pay 22% on everything once you cross into that bracket",
        ],
        answer: 1,
        explain:
          "Your bracket is just the rate on your last dollar. Because your earlier dollars filled the lower-rate tiers, your average rate across all your income is well under your top bracket.",
      },
    ],
  },

  {
    slug: "gig-1099-taxes",
    order: 120,
    topicId: "taxes",
    title: "Taxes for Gig and 1099 Work",
    dek: "Driving, delivering, freelancing on the side? No one's holding back taxes for you, so here's how to stay ahead of it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "On gig and 1099 work, no taxes come out. That's on you.",
      "Set aside a slice of every payment so April isn't a crisis.",
      "You may owe taxes four times a year, not just once.",
      "Tracking expenses can seriously lower what you owe.",
    ],
    body: [
      {
        type: "p",
        text: "Gig work is freedom: you pick up shifts when you want, drive when you want, take the clients you want. But it comes with a catch nobody mentions when you sign up. At a regular job, taxes get pulled from each paycheck automatically. With gig and 1099 work, that doesn't happen. Every dollar lands in your account untouched, and the tax on it is quietly your job to handle.",
      },
      {
        type: "p",
        text: "That's not a reason to panic. It's a reason to have a system. Here's one.",
      },
      {
        type: "h2",
        text: "First, set money aside as you earn",
      },
      {
        type: "p",
        text: "The single biggest mistake is spending all of what you make, then getting blindsided by a tax bill you have no way to pay. The fix is simple: every time you get paid, move a slice into a separate savings account and treat it as already spent. Because it is; it belongs to the tax bill that's coming.",
      },
      {
        type: "tip",
        text: "A common rough rule is to park somewhere around 25–30% of your gig income for taxes. Your real number depends on your total income and state, so when in doubt, save a little extra. Having too much set aside is a great problem to have.",
      },
      {
        type: "h2",
        text: "Why the bill is bigger than you expect",
      },
      {
        type: "p",
        text: "When you're an employee, you and your employer split the cost of Social Security and Medicare. When you work for yourself, you cover both halves. That's self-employment tax, it comes on top of regular income tax, and it's the reason gig income gets taxed harder than a paycheck. If your side work is turning into a real business, [Taxes When You're Self-Employed](/learn/taxes/self-employment-taxes) goes deeper.",
      },
      {
        type: "h2",
        text: "You might owe four times a year",
      },
      {
        type: "p",
        text: "Because nobody's withholding for you, the government doesn't want to wait until spring. If you expect to owe more than a small amount, you're generally supposed to make *estimated quarterly payments*: roughly four check-ins a year instead of one. Miss them and you can get hit with a small penalty.",
      },
      {
        type: "steps",
        items: [
          "Estimate your gig income for the year as best you can.",
          "Set aside your tax slice from every payment, all year long.",
          "Send a payment to the IRS around each quarterly deadline (usually spring, summer, fall, and the following winter).",
          "File your full return at tax time, where it all gets squared up.",
        ],
      },
      {
        type: "h2",
        text: "Track expenses to lower what you owe",
      },
      {
        type: "p",
        text: "The upside of being taxed like a business: you're taxed on your *profit*, not every dollar that came in. The legitimate costs of doing your work come off the top first. Depending on what you do, that can include:",
      },
      {
        type: "list",
        items: [
          "**Mileage:** the miles you drive for work are often a real deduction. Track them; it adds up fast.",
          "**Supplies and equipment:** phone, tools, a laptop, materials you buy to do the job.",
          "**Fees:** the cut an app or platform takes, payment processing fees, business licenses.",
          "**A home office:** if you use a dedicated space at home for the work, part of your costs may count.",
        ],
      },
      {
        type: "p",
        text: "Keep your records simple but real: a notes app, a folder of receipts, a basic spreadsheet. You don't need fancy software to keep what's rightfully yours.",
      },
      {
        type: "key",
        text: "Gig income isn't all yours to spend. A piece belongs to taxes from day one. Set it aside as you go, track your expenses, and tax time becomes paperwork instead of a panic.",
      },
      {
        type: "p",
        text: "Plenty of [free filing help](/learn/taxes/free-ways-to-file) exists, too. VITA sites can handle many self-employed returns at no cost, and IRS Free File may work depending on your situation. This is general information, not personal tax advice, but with a little system, gig taxes go from scary to routine.",
      },
    ],
    related: ["self-employment-taxes", "deductions-vs-credits", "cant-pay-taxes"],
  },

  {
    slug: "cant-pay-taxes",
    order: 130,
    topicId: "taxes",
    title: "What to Do If You Can't Pay Your Tax Bill",
    dek: "Owing the IRS money you don't have is terrifying, but ignoring it is the one move that makes it worse.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "File your return on time even if you can't pay. They're two different things.",
      "Not filing costs far more than not paying.",
      "The IRS has real payment plans, and you can apply online.",
      "Doing something, even something small, beats hiding from it.",
    ],
    body: [
      {
        type: "p",
        text: "You finish your taxes, you see the number you owe, and your stomach drops, because there's no way you have that much right now. It's a genuinely scary moment, and a lot of people respond by freezing: not filing, not opening the mail, hoping it goes quiet. That instinct is human. It's also the single most expensive thing you can do. Here's the calm version instead.",
      },
      {
        type: "h2",
        text: "File anyway, even with nothing attached",
      },
      {
        type: "p",
        text: "Filing your return and paying your bill are two separate things. You can file on time even if you can't send a dollar with it, and you should, for two reasons.",
      },
      {
        type: "list",
        items: [
          "**The penalty for not filing is much bigger** than the penalty for not paying. Filing on time, even with $0 attached, shrinks the damage dramatically.",
          "**You can't set up a payment plan** until your return is filed. Filing is the door to every option that follows.",
        ],
      },
      {
        type: "key",
        text: "Not paying is a manageable problem. *Not filing* is the one that snowballs. Whatever else you do, file on time.",
      },
      {
        type: "h2",
        text: "Pay what you can, even if it's partial",
      },
      {
        type: "p",
        text: "You don't have to pay all or nothing. Every dollar you send now is a dollar that stops adding interest and penalties. Even a partial payment shrinks the pile and shows you're handling it. Send what you realistically can, then deal with the rest through a plan.",
      },
      {
        type: "h2",
        text: "Set up a payment plan",
      },
      {
        type: "p",
        text: "The IRS would genuinely rather get paid slowly than not at all, so they offer installment plans: you break the balance into smaller monthly payments you can actually manage. For a lot of people, applying takes a few minutes on the IRS website.",
      },
      {
        type: "steps",
        items: [
          "File your return on time, no matter what.",
          "Pay as much as you can toward the balance right away.",
          "Apply for a payment plan on the IRS website (search 'IRS payment plan').",
          "Make your monthly payments. Interest still runs, but the crisis is over.",
        ],
      },
      {
        type: "tip",
        text: "If money is truly dire, not just tight, look up an 'Offer in Compromise' (settling for less than you owe) and 'currently not collectible' status. They're hard to qualify for, but they exist. A free VITA site or a Low Income Taxpayer Clinic can help you figure out if you'd qualify.",
      },
      {
        type: "h2",
        text: "Watch out for who you ask for help",
      },
      {
        type: "p",
        text: "When people are scared about taxes, companies appear promising to 'erase your IRS debt' for a big upfront fee. Be careful; many overpromise and underdeliver. The IRS's own payment plans are free or cheap to set up, and free, trustworthy help exists through VITA and Low Income Taxpayer Clinics.",
      },
      {
        type: "p",
        text: "A tax bill you can't pay feels like a wall. It's really a problem with a known set of steps: file, pay what you can, set up a plan. And if the tax bill is one of several you're juggling, [deciding what to pay first](/learn/budgeting/prioritizing-bills-when-money-is-tight) can help you triage the rest.",
      },
    ],
    related: ["gig-1099-taxes", "free-ways-to-file", "filing-taxes-first-time"],
  },

  {
    slug: "education-tax-credits",
    order: 100,
    topicId: "taxes",
    title: "Education Tax Credits, Explained",
    dek: "If you or your family paid for college or training, the government may owe you money back. Here's how to claim it.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Education credits cut your tax bill dollar-for-dollar for school costs.",
      "The American Opportunity Credit is for your first years of college.",
      "The Lifetime Learning Credit covers almost any course or training.",
      "You need your school's 1098-T form to claim them.",
    ],
    body: [
      {
        type: "p",
        text: "Paying for school, whether it's your own classes, a kid's tuition, or a certificate program to level up at work, is one of the biggest checks a family writes. What a lot of people don't realize is that the government often hands some of that money back at tax time, through education tax credits. If you paid for learning and didn't claim one, you may have left real money on the table.",
      },
      {
        type: "p",
        text: "A quick note on why these matter so much: a credit comes straight off your tax bill, dollar for dollar, which makes it the strongest kind of tax break there is ([Deductions vs. Credits](/learn/taxes/deductions-vs-credits) covers why). Education credits are among the most generous, and there are two big ones to know.",
      },
      {
        type: "h2",
        text: "The American Opportunity Credit",
      },
      {
        type: "p",
        text: "This one is for the early years of a degree: think of a student in their first stretch of college, going at least half-time. It's worth up to **$2,500 per student each year**, and up to **$1,000** of that is *refundable*, meaning it can come back to you as a refund even if you owe little or no tax. For a lot of first-generation students and their families, that refundable part is the whole point.",
      },
      {
        type: "list",
        items: [
          "Built for undergraduates in their first several years of college.",
          "Covers tuition, fees, and required course materials like books.",
          "Part of it can land in your refund even if your tax bill is already zero.",
        ],
      },
      {
        type: "h2",
        text: "The Lifetime Learning Credit",
      },
      {
        type: "p",
        text: "This one is the flexible cousin. It isn't limited to a degree or to your first years: it covers grad school, a single class, a job-skills course, or training to switch careers. It's worth up to **$2,000 per tax return each year**, with no cap on how many years you can claim it. It's a bit smaller and isn't refundable, but it fits the messy, real way people actually keep learning over a lifetime.",
      },
      {
        type: "tip",
        text: "You generally can't claim both credits for the *same* student in the *same* year; you pick the one that helps more. Free filing software and VITA volunteers will usually figure out the better choice for you automatically.",
      },
      {
        type: "h2",
        text: "What you need to claim one",
      },
      {
        type: "p",
        text: "The key piece of paper is the **1098-T**, a form your school sends (often you download it from the student portal) showing what was paid in tuition and fees. Keep receipts for required books and supplies too. Both credits start phasing out once your income passes about **$80,000** (single) or **$160,000** (married filing jointly), and disappear above **$90,000** / **$180,000**, so most students and families qualify in full. Free software or a VITA volunteer will confirm the exact figures for your situation.",
      },
      {
        type: "p",
        text: "Credits are one piece of the paying-for-school puzzle, and they come *after* financial aid does its work. If you haven't sorted out aid yet, start with [FAFSA, Step by Step](/learn/college/fafsa-step-by-step).",
      },
      {
        type: "key",
        text: "If you paid for school, *look* before you file. Education credits can turn a chunk of tuition back into cash, but only if you claim them. Don't leave that money behind.",
      },
      {
        type: "p",
        text: "This is general information, not personal tax advice, and the exact limits change every year. But the headline is simple and worth remembering: education isn't only an expense at tax time. Handled right, part of it can come back to you.",
      },
    ],
    related: ["deductions-vs-credits", "earned-income-tax-credit", "free-ways-to-file"],
  },

  {
    slug: "investment-taxes-101",
    order: 105,
    topicId: "taxes",
    title: "Taxes on Your Investments, Explained",
    dek: "Selling at a profit, collecting dividends: the IRS wants a word. The rules are friendlier than you'd guess, especially if you're patient.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "You're taxed when you sell for a profit or receive dividends, not while investments simply grow.",
      "Holding for more than a year moves you from ordinary rates to much lower long-term rates.",
      "Your brokerage sends a 1099-B and 1099-DIV with the numbers your tax return needs.",
      "Retirement accounts sidestep this entire system, which is a big part of their appeal.",
    ],
    body: [
      {
        type: "p",
        text: "New investors sometimes avoid a regular brokerage account out of a vague fear that it creates some monstrous tax situation. It doesn't. The rules fit on one page, the paperwork mostly fills itself in, and a patient buy-and-hold investor barely interacts with any of it. This is that one page.",
      },
      {
        type: "h2",
        text: "You're taxed on gains you take, not growth you watch",
      },
      {
        type: "p",
        text: "If your fund grows from $1,000 to $5,000 and you don't sell, you owe nothing on that growth, this year or any year you keep holding. Tax enters the picture when you *sell* for more than you paid. The profit is called a capital gain: buy at $1,000, sell at $5,000, and your gain is $4,000. (Sell for less than you paid and you have a capital loss, which gets its own useful role in a moment.)",
      },
      {
        type: "h2",
        text: "The one-year line: short-term vs. long-term",
      },
      {
        type: "p",
        text: "How long you held the investment before selling changes everything. Hold it for one year or less and the gain is *short-term*, taxed at the same ordinary rates as your paycheck, using [the regular brackets](/learn/taxes/tax-brackets-explained). Hold it for more than a year and it becomes *long-term*, with its own gentler rates. For 2026, a single filer pays **0%** on long-term gains up to $49,450 of taxable income, **15%** up to $545,500, and **20%** above that.",
      },
      {
        type: "key",
        text: "Read that 0% again. A student or early-career investor with modest income can sell a long-held investment at a profit and owe no federal tax on the gain at all. Patience isn't just an investing strategy; it's a tax strategy.",
      },
      {
        type: "h2",
        text: "Dividends get sorted the same way",
      },
      {
        type: "p",
        text: "[Dividends](/learn/investing/dividends-explained) are taxed in the year they're paid, even if you reinvest them automatically. Most dividends from established U.S. companies are *qualified*, meaning they get the same low long-term capital gains rates. *Ordinary* (non-qualified) dividends, along with interest from savings accounts and bonds, are taxed at your regular income rates. You don't have to sort any of this yourself; the paperwork does it.",
      },
      {
        type: "h2",
        text: "The paperwork is two forms",
      },
      {
        type: "list",
        items: [
          "**1099-B** lists everything you sold during the year, what you originally paid, and the resulting gains and losses.",
          "**1099-DIV** totals your dividends and marks which portion is qualified.",
        ],
      },
      {
        type: "p",
        text: "Your brokerage posts both early in the year, and tax software (including the [free options](/learn/taxes/free-ways-to-file)) imports them or lets you copy a few boxes. If you sold nothing and earned no dividends, there may be no forms and nothing to report.",
      },
      {
        type: "h2",
        text: "Retirement accounts skip this whole system",
      },
      {
        type: "p",
        text: "Everything above applies to a regular, taxable brokerage account. Inside a [401(k)](/learn/investing/what-is-a-401k) or IRA, there are no capital gains taxes and no dividend taxes, ever, no matter how much you buy, sell, or collect along the way. Traditional accounts tax the money once, as income when you withdraw it in retirement; with a [Roth](/learn/investing/roth-vs-traditional-ira), qualified withdrawals are tax-free entirely. This is the concrete reason the standard advice puts retirement accounts first: the same fund, held in the right container, can grow for 40 years without a single tax form.",
      },
      {
        type: "p",
        text: "Two closing notes for taxable accounts. First, losses aren't wasted: capital losses offset your gains, and up to $3,000 of leftover loss can reduce your ordinary income each year. Second, the *wash-sale rule*: if you sell an investment at a loss and buy the same (or nearly identical) one back within 30 days, the IRS disallows the loss. Neither will matter much if you're doing the boring thing, buying steadily and rarely selling, which conveniently is also the best tax plan there is.",
      },
    ],
    related: ["dividends-explained", "tax-brackets-explained", "roth-vs-traditional-ira", "tax-loss-harvesting"],
  },

  {
    slug: "tax-loss-harvesting",
    order: 150,
    topicId: "taxes",
    title: "Tax-Loss Harvesting, Explained",
    dek: "Selling a loser on purpose can trim your tax bill. The mechanics are simple; the fine print is the wash-sale rule.",
    level: "Advanced",
    readMinutes: 4,
    takeaways: [
      "Selling an investment at a loss creates a capital loss that offsets your capital gains.",
      "Up to $3,000 of leftover loss reduces ordinary income each year; the rest carries forward.",
      "Buying the same investment back within 30 days voids the loss (the wash-sale rule).",
      "It only works in taxable accounts, and for small accounts the dollars are small.",
    ],
    body: [
      {
        type: "p",
        text: "Tax-loss harvesting shows up in robo-advisor marketing and personal-finance articles sounding like something only rich people's accountants do. It's a tax move with two rules, and you can learn both in five minutes. One prerequisite: this piece assumes you know how capital gains work, which [Taxes on Your Investments](/learn/taxes/investment-taxes-101) covers.",
      },
      {
        type: "h2",
        text: "The basic move",
      },
      {
        type: "p",
        text: "Investments drop sometimes. Tax-loss harvesting means selling one while it's down, on purpose, to make the loss official in the eyes of the IRS, then putting the money into a similar (but not identical) investment so you stay in the market. Your portfolio barely changes. What changes is your tax return, because a realized loss has uses.",
      },
      {
        type: "h2",
        text: "What a loss is worth",
      },
      {
        type: "p",
        text: "Losses apply in a fixed order. First, they cancel out capital gains, dollar for dollar and without limit: $5,000 of harvested losses wipes out $5,000 of gains you took elsewhere during the year. If losses exceed gains, up to **$3,000** of the leftover reduces your ordinary income, the same income your paycheck is taxed on ($1,500 if married filing separately). That cap has sat at $3,000 since 1978. Anything beyond it carries forward to future years indefinitely, offsetting gains and income until it's used up.",
      },
      {
        type: "p",
        text: "Run the numbers before getting excited, though. Suppose your $4,000 portfolio drops 10%: harvesting the full $400 loss against ordinary income in the 12% bracket saves about $48. Worth taking if the opportunity is sitting in front of you; not worth building a strategy around. The dollars grow with the account, which is why this technique gets more attention the wealthier the audience.",
      },
      {
        type: "h2",
        text: "The wash-sale rule",
      },
      {
        type: "p",
        text: "The IRS anticipated the obvious cheat: sell, claim the loss, buy right back. The wash-sale rule disallows your loss if you buy the same or a *substantially identical* investment within 30 days before or after the sale. The window runs in both directions, 61 days in total counting the sale date, and it reaches into your IRA and your spouse's accounts too, so you can't dodge it by repurchasing somewhere else.",
      },
      {
        type: "p",
        text: "\"Substantially identical\" is the judgment call. Selling one company's stock and buying a different company's is clearly fine. Selling an S&P 500 index fund and buying another provider's fund tracking the same index is asking for trouble. The standard play is to swap into something similar but genuinely different, say a total-market fund in place of an S&P 500 fund, so you stay invested without voiding the loss.",
      },
      {
        type: "h2",
        text: "Only in taxable accounts",
      },
      {
        type: "p",
        text: "Inside a 401(k), IRA, or HSA there are no capital gains taxes, which means losses there have no tax value to harvest. Everything in this article applies solely to a regular taxable brokerage account. If all your investing happens in retirement accounts, tax-loss harvesting is a strategy you can cheerfully ignore.",
      },
      {
        type: "h2",
        text: "Why robo-advisors advertise it",
      },
      {
        type: "p",
        text: "Harvesting rewards vigilance. Dips can be brief, and a human who checks quarterly misses most of them; software watching daily doesn't. That's why [robo-advisors](/learn/investing/robo-advisors) offer automated harvesting and market it prominently. It's a genuine feature, but know what it is: mostly a deferral, not an erasure. Selling low and rebuying lowers your cost basis, which sets up a larger taxable gain later. The bet, usually a reasonable one, is that a tax break today is worth more than a bigger gain taxed at low long-term rates decades from now.",
      },
      {
        type: "tip",
        text: "Doing it yourself? December is the traditional month: your year's gains and losses are mostly known, and a loss must be realized by December 31 to count for that tax year. One unhurried session, checking the 30-day window before you click sell, covers it.",
      },
    ],
    related: ["investment-taxes-101", "tax-brackets-explained", "robo-advisors"],
  },
];
