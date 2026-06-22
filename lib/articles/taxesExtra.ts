import type { Article } from "./types";

export const taxesExtraArticles: Article[] = [
  {
    slug: "tax-refund-explained",
    order: 50,
    topicId: "taxes",
    title: "Your Tax Refund, Explained",
    dek: "That refund check feels like a gift — but it's really your own money coming back. Here's what that means.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A refund means you overpaid taxes all year — not free money.",
      "A big refund is an interest-free loan you gave the government.",
      "You can adjust your paycheck to keep more of it now instead.",
      "There's no wrong answer — just a choice you get to make on purpose.",
    ],
    body: [
      {
        type: "p",
        text: "Tax season rolls around, you file, and a few weeks later a chunk of money lands in your account. It feels like a bonus — a little reward for getting through the year. A lot of people count on it, plan around it, even celebrate it. So here's something that surprises almost everyone the first time they hear it: that refund was never extra money. It was always yours.",
      },
      {
        type: "h2",
        text: "Where a refund actually comes from",
      },
      {
        type: "p",
        text: "Every paycheck, your employer holds back a slice for taxes and sends it to the government on your behalf. That's called *withholding*. It's a guess — an estimate of what you'll owe by the end of the year. If that guess was too high, you paid in more than you actually owed. The refund is the government handing back the difference.",
      },
      {
        type: "p",
        text: "So a $2,400 refund doesn't mean you won anything. It means about $200 a month came out of your checks that you didn't actually owe — and you got it back all at once, months later.",
      },
      {
        type: "key",
        text: "A refund isn't a gift. It's your overpayment coming home. A big refund means you loaned the government your money all year — for free.",
      },
      {
        type: "h2",
        text: "Is a big refund bad?",
      },
      {
        type: "p",
        text: "Not exactly — and this is where it gets personal. Some people love a big refund because it's forced savings. If money is hard to hold onto, getting a lump sum once a year that you put toward debt, an emergency fund, or a deposit can genuinely change your year. That's real, and it counts.",
      },
      {
        type: "p",
        text: "But that same money in your monthly paycheck — an extra $100 or $200 — might be the difference between scraping by and breathing easier right now. Only you know which one your life needs.",
      },
      {
        type: "tip",
        text: "If you'd rather keep more each paycheck, you adjust it with a form called the W-4 at work. Smaller refund, bigger checks. If you'd rather get the lump sum, leave it as is. Both are valid — just pick on purpose.",
      },
      {
        type: "h2",
        text: "One thing to never skip",
      },
      {
        type: "p",
        text: "Whatever you choose, file your return — even if your income was low and you're not sure you have to. Refunds and credits like the Earned Income Tax Credit only reach you if you file, and you can usually do it for free through IRS Free File or a VITA site near you. Leaving a refund unclaimed is the one mistake worth avoiding.",
      },
      {
        type: "p",
        text: "Your refund isn't magic and it isn't a windfall. It's a number you have some control over. Once you see it that way, you get to decide when you want your own money — now, or later.",
      },
    ],
    related: ["how-to-fill-out-w4", "free-ways-to-file", "earned-income-tax-credit"],
  },

  {
    slug: "how-to-fill-out-w4",
    order: 40,
    topicId: "taxes",
    title: "How to Fill Out a W-4 So Your Paycheck Is Right",
    dek: "The form that decides how much tax comes out of every check — and how to set it so there are no nasty surprises.",
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
        text: "When you start a job, you get handed a pile of forms, and one of them is the W-4. Nobody explains it, so most people just guess, sign, and hope for the best. But this little form quietly decides how much tax disappears from every single paycheck — so it's worth five honest minutes.",
      },
      {
        type: "h2",
        text: "What the W-4 is actually doing",
      },
      {
        type: "p",
        text: "The W-4 doesn't decide how much tax you *owe* — your income does that. What it controls is *withholding*: how much your employer pulls out of each check and sends to the government ahead of time. Think of it as setting the dial on the faucet.",
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
          "Step 5: Sign and date it. That's it — hand it back to whoever does payroll.",
        ],
      },
      {
        type: "tip",
        text: "Working two jobs, or you and a partner both work? That's the most common reason people accidentally under-withhold and owe in April. The form's Step 2 (and the IRS withholding estimator online) exists exactly for this — don't skip it if it's you.",
      },
      {
        type: "h2",
        text: "You're allowed to change it",
      },
      {
        type: "p",
        text: "Here's what almost nobody tells you: the W-4 isn't permanent. Got a raise, picked up a second job, had a kid, got married, or just got surprised by your refund last year? Ask payroll for a fresh W-4 and turn in a new one. You can do this whenever your life changes.",
      },
      {
        type: "key",
        text: "The W-4 isn't a test you pass once. It's a dial you can turn any time your income or family changes — so your paycheck and your April line up.",
      },
      {
        type: "p",
        text: "You don't need to be a tax expert to get this right. You just need to know the form exists, what it controls, and that you can always redo it. That's enough to keep your paycheck honest.",
      },
    ],
    related: ["tax-refund-explained", "understanding-tax-forms", "filing-taxes-first-time"],
  },

  {
    slug: "tax-brackets-explained",
    order: 30,
    topicId: "taxes",
    title: "Tax Brackets, Explained",
    dek: "The myth that a raise can leave you with less money has scared people for generations. Let's kill it for good.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Tax brackets are tiers — only the income inside each tier is taxed at that tier's rate.",
      "A raise never drops your total take-home pay.",
      "Your 'tax bracket' is just the rate on your last dollar, not all of it.",
      "Your real overall tax rate is lower than your top bracket.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably heard someone say it, maybe a relative or a coworker: 'Be careful taking that raise — it'll bump you into a higher tax bracket and you'll actually take home less.' It sounds logical. It's also completely false, and believing it has cost people real opportunities. Let's clear it up once and for all.",
      },
      {
        type: "h2",
        text: "Brackets are tiers, not a single switch",
      },
      {
        type: "p",
        text: "Here's the core idea everyone misses: a tax bracket only applies to the income *inside* that bracket — not to your whole paycheck. The tax system is built like a set of stairs. Your first chunk of income is taxed at the lowest rate. The next chunk up is taxed a little more. And so on, only on the dollars that reach each step.",
      },
      {
        type: "p",
        text: "Think of it like filling buckets. The first bucket fills at a low rate. Only after it's full does any money spill into the next, higher-rate bucket. The money already in the lower buckets keeps its lower rate forever.",
      },
      {
        type: "key",
        text: "Your 'tax bracket' is just the rate on your *last* dollar earned — not on all of it. A raise is always more money in your pocket, never less.",
      },
      {
        type: "h2",
        text: "Let's walk through a raise",
      },
      {
        type: "p",
        text: "Say a raise pushes part of your income up into the next bracket. Only the dollars *above* that line get taxed at the higher rate. Everything below the line is taxed exactly as before. So if $1,000 of your raise crosses into a higher tier, you only pay the extra rate on that $1,000 — and you still keep most of it. You come out ahead. Always.",
      },
      {
        type: "p",
        text: "There is genuinely no point where earning one more dollar leaves you with less total money. The math simply doesn't work that way.",
      },
      {
        type: "tip",
        text: "For 2026, a single filer's brackets are: **10%** up to $12,400, **12%** up to $50,400, **22%** up to $105,700, **24%** up to $201,775, **32%** up to $256,225, **35%** up to $640,600, and **37%** above that. (The cutoffs roughly double for married couples filing jointly.) They nudge up a little each year for inflation, so confirm the current ones when you need them — but the *idea* of marginal brackets never changes.",
      },
      {
        type: "h2",
        text: "Why your real tax rate is lower than you think",
      },
      {
        type: "p",
        text: "Because only your top dollars hit your top bracket, the *average* rate you actually pay across all your income is lower than that top number. Someone whose highest bracket is, say, 22% is paying well under 22% of their total income in federal tax, once you blend in all those lower-taxed lower buckets.",
      },
      {
        type: "p",
        text: "So the next time someone warns you off a raise, a bonus, or a few extra shifts because of 'the brackets' — you can let that fear go. More income is more income. Take the raise.",
      },
    ],
    related: ["deductions-vs-credits", "understanding-tax-forms", "tax-refund-explained"],
  },

  {
    slug: "gig-1099-taxes",
    order: 60,
    topicId: "taxes",
    title: "Taxes for Gig and 1099 Work",
    dek: "Driving, delivering, freelancing, side-hustling? No one's holding back taxes for you — so here's how to stay ahead of it.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "On gig and 1099 work, no taxes come out — that's on you.",
      "Set aside a slice of every payment so April isn't a crisis.",
      "You may owe taxes four times a year, not just once.",
      "Tracking expenses can seriously lower what you owe.",
    ],
    body: [
      {
        type: "p",
        text: "Gig work is freedom: you pick up shifts when you want, drive when you want, take the clients you want. But it comes with a catch nobody mentions when you sign up. With a regular job, taxes get pulled from each paycheck automatically. With gig and 1099 work, that doesn't happen — every dollar lands in your account untouched, and the tax on it is quietly your job to handle.",
      },
      {
        type: "p",
        text: "That's not a reason to panic. It's just a reason to have a system. Here's one.",
      },
      {
        type: "h2",
        text: "First, set money aside as you earn",
      },
      {
        type: "p",
        text: "The single biggest mistake is spending all of what you make, then getting blindsided by a tax bill you have no way to pay. The fix is simple: every time you get paid, move a slice into a separate savings account and pretend it was never yours. Because it wasn't — it belongs to the tax bill that's coming.",
      },
      {
        type: "tip",
        text: "A common rough rule is to park somewhere around 25–30% of your gig income for taxes — your real number depends on your total income and state. When in doubt, save a little extra. Having too much set aside is a great problem to have.",
      },
      {
        type: "h2",
        text: "Why self-employment tax catches people off guard",
      },
      {
        type: "p",
        text: "Here's the part that stings. When you're an employee, you and your employer split the cost of Social Security and Medicare. When you work for yourself, you cover *both* halves — that's the self-employment tax, and it's on top of regular income tax. It's the reason your tax bill on gig income feels bigger than you expected.",
      },
      {
        type: "h2",
        text: "You might owe four times a year",
      },
      {
        type: "p",
        text: "Because nobody's withholding for you, the government doesn't want to wait until spring. If you expect to owe more than a small amount, you're generally supposed to make *estimated quarterly payments* — roughly four check-ins a year instead of one. Miss them and you can get hit with a small penalty.",
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
        text: "Track expenses — they lower what you owe",
      },
      {
        type: "p",
        text: "Here's the upside of self-employment: you're taxed on your *profit*, not every dollar that came in. The legitimate costs of doing your work come off the top first. Depending on what you do, that can include:",
      },
      {
        type: "list",
        items: [
          "**Mileage** — the miles you drive for work are often a real deduction (track them; it adds up fast).",
          "**Supplies and equipment** — phone, tools, a laptop, materials you buy to do the job.",
          "**Fees** — the cut an app or platform takes, payment processing fees, business licenses.",
          "**A home office** — if you use a dedicated space at home for the work, part of your costs may count.",
        ],
      },
      {
        type: "p",
        text: "Keep your records simple but real — a notes app, a folder of receipts, a basic spreadsheet. You don't need fancy software to keep what's rightfully yours.",
      },
      {
        type: "key",
        text: "Gig income isn't all yours to spend. A piece belongs to taxes from day one — set it aside as you go, track your expenses, and tax time becomes paperwork instead of a panic.",
      },
      {
        type: "p",
        text: "Plenty of free help exists, too. VITA sites can handle many self-employed returns at no cost, and IRS Free File may work depending on your situation. This is general information, not personal tax advice — but with a little system, gig taxes go from scary to routine.",
      },
    ],
    related: ["self-employment-taxes", "deductions-vs-credits", "cant-pay-taxes"],
  },

  {
    slug: "cant-pay-taxes",
    order: 80,
    topicId: "taxes",
    title: "What to Do If You Can't Pay Your Tax Bill",
    dek: "Owing the IRS money you don't have is terrifying — but ignoring it is the one move that makes it worse.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "File your return on time even if you can't pay — they're two different things.",
      "Not filing costs far more than not paying.",
      "The IRS has real payment plans, and you can apply online.",
      "Doing something — anything — beats hiding from it.",
    ],
    body: [
      {
        type: "p",
        text: "You finish your taxes, you see the number you owe, and your stomach drops — because there's no way you have that much right now. It's a genuinely scary moment, and a lot of people respond by freezing: not filing, not opening the mail, hoping it goes quiet. That instinct is human. It's also the single most expensive thing you can do. Let's walk through the calm version instead.",
      },
      {
        type: "h2",
        text: "File anyway — this is the most important part",
      },
      {
        type: "p",
        text: "Here's the thing almost nobody knows: filing your return and paying your bill are two separate things. You can — and should — file on time even if you can't send a dollar with it. Why does this matter so much?",
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
        text: "The IRS would genuinely rather get paid slowly than not at all, so they offer installment plans — you break the balance into smaller monthly payments you can actually manage. For a lot of people, you can apply right on the IRS website in a few minutes.",
      },
      {
        type: "steps",
        items: [
          "File your return on time, no matter what.",
          "Pay as much as you can toward the balance right away.",
          "Apply for a payment plan on the IRS website (search 'IRS payment plan').",
          "Make your monthly payments — interest still runs, but the crisis is over.",
        ],
      },
      {
        type: "tip",
        text: "If money is truly dire — not just tight — look up an 'Offer in Compromise' (settling for less than you owe) and 'currently not collectible' status. They're hard to qualify for, but they exist. A free VITA site or a Low Income Taxpayer Clinic can help you figure out if you'd qualify.",
      },
      {
        type: "h2",
        text: "Watch out for who you ask for help",
      },
      {
        type: "p",
        text: "When people are scared about taxes, companies appear promising to 'erase your IRS debt' for a big upfront fee. Be careful — many overpromise and underdeliver. The IRS's own payment plans are free or cheap to set up, and free, trustworthy help exists through VITA and Low Income Taxpayer Clinics.",
      },
      {
        type: "p",
        text: "A tax bill you can't pay feels like a wall. It's really just a problem with a known set of steps. File, pay what you can, set up a plan, and keep breathing. People get through this every single year — and so will you.",
      },
    ],
    related: ["free-ways-to-file", "gig-1099-taxes", "filing-taxes-first-time"],
  },

  {
    slug: "education-tax-credits",
    order: 50,
    topicId: "taxes",
    title: "Education Tax Credits, Explained",
    dek: "If you or your family paid for college or training, the government may owe you money back. Here's how to claim it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Education credits cut your tax bill dollar-for-dollar for school costs.",
      "The American Opportunity Credit is for your first years of college.",
      "The Lifetime Learning Credit covers almost any course or training.",
      "You need your school's 1098-T form to claim them.",
    ],
    body: [
      {
        type: "p",
        text: "Paying for school — your own classes, a kid's tuition, a certificate program to level up at work — is one of the biggest checks a family writes. What a lot of people don't realize is that the government often hands some of that money back at tax time, through education tax credits. If you paid for learning and didn't claim one, you may have left real money on the table.",
      },
      {
        type: "h2",
        text: "Why a credit is so powerful",
      },
      {
        type: "p",
        text: "Quick refresher, because it matters here: a *credit* is far stronger than a deduction. A deduction shaves a bit off the income you're taxed on. A credit comes straight off your tax bill, dollar for dollar. A $1,000 credit means $1,000 less tax — or, in some cases, $1,000 more in your refund.",
      },
      {
        type: "p",
        text: "Education credits are some of the most generous ones out there, and there are two big ones to know.",
      },
      {
        type: "h2",
        text: "The American Opportunity Credit",
      },
      {
        type: "p",
        text: "This one is for the early years of a degree — think a student in their first stretch of college, going at least half-time. It's worth up to **$2,500 per student each year**, and up to **$1,000** of that is *refundable*, meaning it can come back to you as a refund even if you owe little or no tax. For a lot of first-generation students and their families, that refundable part is the whole point.",
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
        text: "This one is the flexible cousin. It's not limited to a degree or to your first years — it covers grad school, a single class, a job-skills course, or training to switch careers. It's worth up to **$2,000 per tax return each year**, with no cap on how many years you can claim it. It's a bit smaller and isn't refundable, but it fits the messy, real way people actually keep learning over a lifetime.",
      },
      {
        type: "tip",
        text: "You generally can't claim both credits for the *same* student in the *same* year — you pick the one that helps more. Free filing software and VITA volunteers will usually figure out the better choice for you automatically.",
      },
      {
        type: "h2",
        text: "What you need to claim one",
      },
      {
        type: "p",
        text: "The key piece of paper is the **1098-T**, a form your school sends (often you download it from the student portal) showing what was paid in tuition and fees. Keep receipts for required books and supplies too. Both credits start phasing out once your income passes about **$80,000** (single) or **$160,000** (married filing jointly), and disappear above **$90,000** / **$180,000** — so most students and families qualify in full. Free software or a VITA volunteer will confirm the exact figures for your situation.",
      },
      {
        type: "key",
        text: "If you paid for school, *look* before you file. Education credits can turn a chunk of tuition back into cash — but only if you claim them. Don't leave that money behind.",
      },
      {
        type: "p",
        text: "This is general information, not personal tax advice, and the exact limits change every year. But the headline is simple and worth remembering: education isn't only an expense at tax time. Handled right, part of it can come back to you.",
      },
    ],
    related: ["deductions-vs-credits", "free-ways-to-file", "earned-income-tax-credit"],
  },
];
