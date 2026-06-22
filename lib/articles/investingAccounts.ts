import type { Article } from "./types";

export const investingAccountsArticles: Article[] = [
  {
    slug: "roth-vs-traditional-ira",
    order: 80,
    topicId: "investing",
    title: "Roth vs. Traditional IRA",
    dek: "Same retirement account, two ways to handle the taxes — and the whole choice comes down to *when* you get the break.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Roth means pay tax now; Traditional means pay tax later.",
      "Roth withdrawals in retirement — including all the growth — can be tax-free.",
      "Roth contributions (not the earnings) can usually come out anytime.",
      "For a lot of young people just starting out, Roth is an especially good fit.",
    ],
    body: [
      {
        type: "p",
        text: "An IRA — Individual Retirement Account — is one of the best tools out there for building long-term wealth, because the government gives it a tax advantage to nudge you into saving. But the moment you go to open one, you hit a fork in the road: Roth or Traditional? They sound technical, but the real difference is simple, and it's worth understanding before you pick.",
      },
      {
        type: "h2",
        text: "The whole difference: when you get the tax break",
      },
      {
        type: "p",
        text: "Both versions let your money grow without getting taxed along the way. The only thing that changes is *when* the IRS takes its cut — on the way in, or on the way out.",
      },
      {
        type: "list",
        items: [
          "**Traditional IRA:** you may be able to deduct your contributions now, so you lower your taxable income this year (pre-tax). The money grows tax-deferred. Then you pay regular income tax when you withdraw it in retirement.",
          "**Roth IRA:** you contribute money you've *already* paid tax on. It grows, and when you take qualified withdrawals in retirement — including all the growth on top — you owe nothing. It comes out completely tax-free.",
        ],
      },
      {
        type: "key",
        text: "Roth = pay tax now, withdraw tax-free later. Traditional = get the break now, pay tax later. That's the entire decision in one line.",
      },
      {
        type: "h2",
        text: "So which one wins?",
      },
      {
        type: "p",
        text: "It hinges on a guess: will your tax rate be *higher* or *lower* when you retire than it is today? If you expect to be in a lower tax bracket later, the Traditional break-now approach can make sense. If you expect to earn more — and be taxed more — down the road, locking in today's lower rate with a Roth can be the better deal.",
      },
      {
        type: "p",
        text: "That's exactly why Roth tends to be so attractive for young people just getting started. Early in your career, your income (and tax rate) is often as low as it'll ever be. Paying a little tax now to make decades of future growth tax-free can be a genuinely great trade. Think of this as general guidance, not personalized advice — but it's why so many first-time savers lean Roth.",
      },
      {
        type: "h2",
        text: "A few practical differences worth knowing",
      },
      {
        type: "list",
        items: [
          "**Income limits:** Roth IRAs have income-eligibility rules — high earners can get phased out of contributing directly. Traditional IRAs don't cap who can contribute, though they do affect whether you can deduct.",
          "**Flexibility:** with a Roth, the money you *contributed* (not the earnings) can generally be withdrawn anytime, tax- and penalty-free, since you already paid tax on it. That makes a Roth quietly flexible if life happens.",
          "**Required withdrawals:** Traditional IRAs eventually force you to start taking money out — required minimum distributions — later in life. Roth IRAs have no such requirement for the original owner, so the money can keep growing untouched.",
        ],
      },
      {
        type: "tip",
        text: "Don't get stuck on the perfect choice. The biggest mistake isn't picking the 'wrong' one — it's not opening an IRA at all. Either version, funded consistently, beats a flawless plan you never start.",
      },
      {
        type: "p",
        text: "For 2026, you can put up to **$7,500** total into IRAs (**$8,600** if you're 50+). Roth IRAs also have income limits — your ability to contribute directly starts phasing out once your income passes about **$153,000** (single) or **$242,000** (married filing jointly). These figures shift most years, so confirm at IRS.gov, and a qualified tax professional can tell you which version fits your situation. This is general education, not individualized advice. But once you understand pay-now versus pay-later, the choice stops feeling intimidating.",
      },
    ],
    related: ["roth-ira-explained", "401k-vs-ira", "retirement-accounts-explained"],
  },

  {
    slug: "401k-vs-ira",
    order: 90,
    topicId: "investing",
    title: "401(k) vs. IRA",
    dek: "Two of the best retirement accounts you can use — and how a lot of people get the most out of both.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A 401(k) comes through your employer; an IRA you open yourself.",
      "401(k)s often include an employer match — that's free money.",
      "IRAs give you a far wider menu of investments to choose from.",
      "A common game plan: match first, then IRA, then back to the 401(k).",
    ],
    body: [
      {
        type: "p",
        text: "Both a 401(k) and an IRA are tax-advantaged retirement accounts — the government gives them special treatment to reward you for saving for the long haul. People sometimes think they have to choose one. You don't. They do different jobs, and the smartest play is often to use both, in a particular order.",
      },
      {
        type: "h2",
        text: "How they actually differ",
      },
      {
        type: "list",
        items: [
          "**401(k):** offered through your *employer*. You fund it straight out of your paycheck via payroll deduction, before you ever see the money. It usually has a higher annual contribution limit, and many employers add a *match* — but your investment choices are limited to the menu your plan offers.",
          "**IRA:** you open it *yourself* at a brokerage. The trade-off flips: you get a far wider range of investments to pick from, but a lower contribution limit and no employer match.",
        ],
      },
      {
        type: "p",
        text: "One more thing: both accounts come in Traditional and Roth flavors, so the pay-tax-now-or-later question applies to each of them too.",
      },
      {
        type: "h2",
        text: "The employer match is the headline",
      },
      {
        type: "p",
        text: "If your job offers a 401(k) match, pay attention — this is the closest thing to free money you'll find. A match means your employer chips in alongside you, often something like a percentage of your pay, as long as you contribute too. Skipping it is leaving part of your compensation on the table.",
      },
      {
        type: "key",
        text: "If your employer matches your 401(k) and you're not contributing enough to get the full match, you're turning down free money. Grab it first, before anything else.",
      },
      {
        type: "h2",
        text: "A common way people use them together",
      },
      {
        type: "p",
        text: "There's no one-size-fits-all answer, but here's a sequence a lot of people follow as general guidance — not personalized advice:",
      },
      {
        type: "steps",
        items: [
          "Contribute to your 401(k) at least enough to capture the *full* employer match. Don't leave any of that free money behind.",
          "Then fund an IRA, where the wider investment menu and added flexibility often shine — a Roth IRA especially if you're early in your career.",
          "Still have more to invest? Circle back to the 401(k) and keep adding, up to its higher limit.",
        ],
      },
      {
        type: "tip",
        text: "Changing jobs? Your 401(k) doesn't have to stay behind. You can usually roll it into an IRA or a new employer's plan so your savings follow you instead of getting stranded.",
      },
      {
        type: "p",
        text: "For 2026, the 401(k) lets you contribute up to **$24,500** of your own pay (on top of any match), while the IRA limit is **$7,500** — that's the 'higher limit' the 401(k) has going for it. Both rise a little most years, so confirm at IRS.gov, and a qualified tax professional can help you tailor the order to your situation. This is general education, not individualized advice. The big idea is simpler than it looks: grab the free match, then build from there.",
      },
    ],
    related: ["401k-and-match", "roth-vs-traditional-ira", "retirement-accounts-explained"],
  },

  {
    slug: "what-is-an-hsa",
    order: 100,
    topicId: "investing",
    title: "What Is an HSA?",
    dek: "One of the most tax-advantaged accounts that exists — and one most people barely use.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "An HSA pairs with a qualifying high-deductible health plan — that's the gate.",
      "It has a rare 'triple tax advantage' most accounts can't touch.",
      "It is *not* use-it-or-lose-it — the money rolls over and is yours to keep.",
      "Many HSAs let you invest the balance, so it can grow like a retirement account.",
    ],
    body: [
      {
        type: "p",
        text: "Health Savings Accounts get almost no attention, which is a shame — because an HSA is quietly one of the most tax-advantaged accounts in existence. Most people who could use one either don't have it set up or treat it like a glorified piggy bank. Here's why it's worth a real look.",
      },
      {
        type: "h2",
        text: "First, the one requirement",
      },
      {
        type: "p",
        text: "You can only contribute to an HSA if you're enrolled in an HSA-eligible *high-deductible health plan* — an HDHP. That's the gate, full stop. No qualifying plan, no HSA contributions. If you're not sure what kind of health plan you have, check with your insurer or your job's benefits info before you go any further.",
      },
      {
        type: "h2",
        text: "The famous 'triple tax advantage'",
      },
      {
        type: "p",
        text: "Most accounts give you a tax break in one spot. An HSA gives you three, which is why people who know about it get a little starry-eyed:",
      },
      {
        type: "list",
        items: [
          "**Going in:** contributions are pre-tax (or you deduct them), lowering your taxable income.",
          "**While it sits:** the money grows tax-free — no tax on the interest or investment gains.",
          "**Coming out:** withdrawals for qualified medical expenses are tax-free too.",
        ],
      },
      {
        type: "key",
        text: "Pre-tax in, tax-free growth, tax-free out for medical costs. Almost no other account pulls off all three at once.",
      },
      {
        type: "h2",
        text: "It is NOT use-it-or-lose-it",
      },
      {
        type: "p",
        text: "This is the part people most often get wrong, so let's be clear. An HSA is *not* an FSA. With a Flexible Spending Account, money you don't spend by year's end can vanish. An HSA is the opposite: the balance rolls over year after year, and it's yours to keep — even if you change jobs or health plans. It just sits there, waiting for you.",
      },
      {
        type: "p",
        text: "Better still, many HSAs let you *invest* the balance once it hits a certain level, so the money can grow over decades much like a retirement account — not just sit as cash.",
      },
      {
        type: "h2",
        text: "The 'stealth retirement account' trick",
      },
      {
        type: "p",
        text: "Here's why some people deliberately leave their HSA alone and let it grow: after age 65, you can withdraw the money for *any* reason, not just medical. At that point a non-medical withdrawal is simply taxed like ordinary income, with no penalty — basically like a Traditional retirement account. And withdrawals for qualified medical costs stay tax-free at any age, even in retirement, when health expenses tend to climb.",
      },
      {
        type: "tip",
        text: "Don't confuse an HSA with an FSA, and remember the hard rule: you must have the qualifying high-deductible health plan to contribute. If you sign up for an HSA without the right plan, you can run into trouble at tax time.",
      },
      {
        type: "p",
        text: "For 2026, you can contribute up to **$4,400** to an HSA with self-only coverage, or **$8,750** with a family plan (plus an extra $1,000 if you're 55 or older). The IRS adjusts these most years and sets the rules for what counts as a qualifying plan or expense, so confirm at IRS.gov, and a qualified tax professional can confirm whether an HSA fits you. This is general education, not individualized advice. But if you've got the right health plan, an HSA is one of the most overlooked deals around.",
      },
    ],
    related: ["high-yield-savings-account", "retirement-accounts-explained", "saving-vs-investing"],
  },

  {
    slug: "bonds-explained",
    order: 60,
    topicId: "investing",
    title: "Bonds, Explained",
    dek: "A bond is just a loan you make — here's how they work, and why a calm corner of your portfolio matters.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A bond is a loan you make to a government or company.",
      "Bonds are generally steadier and lower-risk than stocks — with lower expected returns.",
      "When interest rates rise, existing bond prices fall (and vice versa).",
      "Most people own bonds through funds, and hold them for stability and diversification.",
    ],
    body: [
      {
        type: "p",
        text: "Stocks get all the attention, but bonds are the quiet, steadying half of a lot of smart portfolios. They sound complicated. They're not. Once you see what a bond actually *is*, the whole thing clicks — so let's keep it calm and concrete.",
      },
      {
        type: "h2",
        text: "What a bond actually is",
      },
      {
        type: "p",
        text: "A bond is basically a loan that *you* make. Instead of borrowing money, you lend it — to a government or a company. In return, they pay you interest along the way, and at the end of the agreed term (called maturity) they give your original money back. That's it. You're the lender, and you get paid for it.",
      },
      {
        type: "h2",
        text: "How that's different from a stock",
      },
      {
        type: "p",
        text: "This is the cleanest way to keep the two straight:",
      },
      {
        type: "list",
        items: [
          "**A stock is ownership.** You buy a slice of a company and ride its ups and downs — bigger potential gains, bigger swings.",
          "**A bond is a loan.** You're owed interest and your principal back, which generally makes bonds steadier and lower-risk — but with lower expected returns to match.",
        ],
      },
      {
        type: "h2",
        text: "The main types, in plain terms",
      },
      {
        type: "list",
        items: [
          "**Government / Treasury bonds:** loans to a national government — among the safest, since governments rarely fail to pay.",
          "**Municipal bonds:** loans to states, cities, or local projects, often with some tax perks.",
          "**Corporate bonds:** loans to companies — typically a bit more risk, and a bit more interest to compensate.",
        ],
      },
      {
        type: "h2",
        text: "The one counterintuitive risk",
      },
      {
        type: "p",
        text: "Here's the quirk worth memorizing: when interest rates rise, the prices of existing bonds fall — and when rates drop, existing bond prices rise. They move in opposite directions. This is called interest-rate risk.",
      },
      {
        type: "p",
        text: "Why? Imagine you own a bond paying 3% and new bonds start paying 5%. Nobody wants your lower-paying bond at full price anymore, so its market value dips until the math evens out. The bond itself still pays what it promised — but its price on the market drops. That's all interest-rate risk really means.",
      },
      {
        type: "key",
        text: "Interest rates up, existing bond prices down. Interest rates down, existing bond prices up. They always move opposite each other.",
      },
      {
        type: "h2",
        text: "How most people actually own bonds",
      },
      {
        type: "p",
        text: "You *can* buy individual bonds, but most people don't bother. Instead they own bond *funds* — a single fund that holds hundreds of bonds at once. That spreads the risk around and means you don't have to research and manage each bond yourself. It's the same convenience logic as owning an index fund instead of hand-picking stocks.",
      },
      {
        type: "tip",
        text: "Bonds tend to hold up — or even rise — exactly when stocks are falling. That's the point. A mix of both smooths out the ride, so a rough stretch in the stock market doesn't sink your whole portfolio at once.",
      },
      {
        type: "h2",
        text: "Why bonds belong in a portfolio",
      },
      {
        type: "p",
        text: "Bonds aren't there to make you rich fast — that's the stock side's job. They're there for stability and diversification. Because they often zig when stocks zag, holding some of both is one of the simplest ways to keep your overall investments steadier through the inevitable bumps. The right mix depends on your goals and timeline, which makes this general education rather than individualized advice — but the calm role bonds play is worth understanding either way.",
      },
    ],
    related: ["what-is-a-stock", "risk-and-diversification", "index-funds-explained"],
  },
];
