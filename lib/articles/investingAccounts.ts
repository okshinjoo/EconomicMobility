import type { Article } from "./types";

export const investingAccountsArticles: Article[] = [
  {
    slug: "roth-vs-traditional-ira",
    order: 30,
    topicId: "investing",
    title: "Roth vs. Traditional IRA",
    dek: "Same retirement account, two ways to handle the taxes. The whole choice comes down to *when* you get the break.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Roth means pay tax now; Traditional means pay tax later.",
      "Roth withdrawals in retirement, including all the growth, can be tax-free.",
      "Roth contributions (not the earnings) can usually come out anytime.",
      "For a lot of young people just starting out, Roth is an especially good fit.",
    ],
    body: [
      {
        type: "p",
        text: "An IRA is one of the best tools out there for building long-term wealth, because the government gives it a tax advantage to nudge you into saving. (New to the account itself? Start with [What Is an IRA?](/learn/investing/what-is-an-ira)) But the moment you go to open one, you hit a fork in the road: Roth or Traditional? They sound technical, but the real difference is simple, and it's worth understanding before you pick.",
      },
      {
        type: "h2",
        text: "The whole difference: when you get the tax break",
      },
      {
        type: "p",
        text: "Both versions let your money grow without getting taxed along the way. The only thing that changes is *when* the IRS takes its cut: on the way in, or on the way out.",
      },
      {
        type: "list",
        items: [
          "**Traditional IRA:** you may be able to deduct your contributions now, so you lower your taxable income this year (pre-tax). The money grows tax-deferred. Then you pay regular income tax when you withdraw it in retirement.",
          "**Roth IRA:** you contribute money you've *already* paid tax on. It grows, and when you take qualified withdrawals in retirement, including all the growth on top, you owe nothing. It comes out completely tax-free.",
        ],
      },
      {
        type: "p",
        text: "To see what tax-free growth means in practice: say you put $6,000 into a Roth over a few years, and decades later it has grown to $40,000. That $34,000 of growth? You never pay tax on a cent of it. In a regular investment account, you'd owe tax on those gains.",
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
        text: "It hinges on a guess: will your tax rate be *higher* or *lower* when you retire than it is today? If you expect to be in a lower tax bracket later, the Traditional break-now approach can make sense. If you expect to earn more (and be taxed more) down the road, locking in today's lower rate with a Roth can be the better deal.",
      },
      {
        type: "p",
        text: "That's exactly why Roth tends to be so attractive for young people just getting started. Early in your career, your income (and tax rate) is often as low as it'll ever be. Paying a little tax now to make decades of future growth tax-free can be a genuinely great trade. This is general guidance rather than personalized advice, but it's why so many first-time savers lean Roth.",
      },
      {
        type: "h2",
        text: "A few practical differences worth knowing",
      },
      {
        type: "list",
        items: [
          "**Income limits:** Roth IRAs have income-eligibility rules; high earners can get phased out of contributing directly. Traditional IRAs don't cap who can contribute, though they do affect whether you can deduct.",
          "**Flexibility:** with a Roth, the money you *contributed* (not the earnings) can generally be withdrawn anytime, tax- and penalty-free, since you already paid tax on it. That makes a Roth quietly flexible if life happens.",
          "**Required withdrawals:** Traditional IRAs eventually force you to start taking money out (required minimum distributions) later in life. Roth IRAs have no such requirement for the original owner, so the money can keep growing untouched.",
        ],
      },
      {
        type: "tip",
        text: "Don't get stuck on the perfect choice. The biggest mistake isn't picking the 'wrong' one; it's not opening an IRA at all. Either version, funded consistently, beats a flawless plan you never start.",
      },
      {
        type: "p",
        text: "For 2026, you can put up to **$7,500** total into IRAs (**$8,600** if you're 50+). Roth IRAs also have income limits: your ability to contribute directly starts phasing out once your income passes about **$153,000** (single) or **$242,000** (married filing jointly). Both figures rise a little most years. A qualified tax professional can tell you which version fits your situation. This is general education, not individualized advice. But once you understand pay-now versus pay-later, the choice stops feeling intimidating.",
      },
    ],
    related: ["what-is-an-ira", "401k-vs-ira", "retirement-accounts-explained", "investment-taxes-101"],
  },

  {
    slug: "401k-vs-ira",
    order: 40,
    topicId: "investing",
    title: "401(k) vs. IRA",
    dek: "Two of the best retirement accounts you can use, and how a lot of people get the most out of both.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A 401(k) comes through your employer; an IRA you open yourself.",
      "401(k)s often include an employer match. That's free money.",
      "IRAs give you a far wider menu of investments to choose from.",
      "A common game plan: match first, then IRA, then back to the 401(k).",
    ],
    body: [
      {
        type: "p",
        text: "Both a [401(k)](/learn/investing/what-is-a-401k) and an [IRA](/learn/investing/what-is-an-ira) are tax-advantaged retirement accounts; the government gives them special treatment to reward you for saving for the long haul. People sometimes think they have to choose one. You don't. They do different jobs, and the smartest play is often to use both, in a particular order.",
      },
      {
        type: "h2",
        text: "How they actually differ",
      },
      {
        type: "list",
        items: [
          "**401(k):** offered through your *employer*. You fund it straight out of your paycheck via payroll deduction, before you ever see the money. It usually has a higher annual contribution limit, and many employers add a *match*; the trade-off is that your investment choices are limited to the menu your plan offers.",
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
        text: "If your job offers a 401(k) match, pay attention: this is the closest thing to free money you'll find. A match means your employer chips in alongside you, often something like a percentage of your pay, as long as you contribute too. Skipping it is leaving part of your compensation on the table.",
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
        text: "There's no one-size-fits-all answer, but here's a sequence a lot of people follow as general guidance, not personalized advice:",
      },
      {
        type: "steps",
        items: [
          "Contribute to your 401(k) at least enough to capture the *full* employer match.",
          "Then fund an IRA, where the wider investment menu and added flexibility often shine. A [Roth IRA](/learn/investing/roth-vs-traditional-ira) especially, if you're early in your career.",
          "Still have more to invest? Circle back to the 401(k) and keep adding, up to its higher limit.",
        ],
      },
      {
        type: "tip",
        text: "Changing jobs? Your 401(k) doesn't have to stay behind. You can usually roll it into an IRA or a new employer's plan so your savings follow you instead of getting stranded.",
      },
      {
        type: "p",
        text: "For 2026, the 401(k) lets you contribute up to **$24,500** of your own pay (on top of any match), while the IRA limit is **$7,500**. That gap is the 'higher limit' the 401(k) has going for it. Both rise a little most years, and a qualified tax professional can help you tailor the order to your situation. This is general education, not individualized advice. The big idea is simpler than it looks: grab the free match, then build from there.",
      },
    ],
    related: ["what-is-a-401k", "what-is-an-ira", "roth-vs-traditional-ira"],
  },

  {
    slug: "what-is-an-hsa",
    order: 50,
    topicId: "investing",
    title: "What Is an HSA?",
    dek: "One of the most tax-advantaged accounts that exists, and one most people barely use.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "An HSA pairs with a qualifying high-deductible health plan. That's the gate.",
      "It has a rare 'triple tax advantage' most accounts can't touch.",
      "It is *not* use-it-or-lose-it. The money rolls over and is yours to keep.",
      "Many HSAs let you invest the balance, so it can grow like a retirement account.",
    ],
    body: [
      {
        type: "p",
        text: "Health Savings Accounts get almost no attention, which is a shame, because an HSA is quietly one of the most tax-advantaged accounts in existence. Most people who could use one either don't have it set up or treat it like a glorified piggy bank. Here's why it's worth a real look.",
      },
      {
        type: "h2",
        text: "First, the one requirement",
      },
      {
        type: "p",
        text: "You can only contribute to an HSA if you're enrolled in an HSA-eligible *high-deductible health plan* (HDHP). That's the gate, full stop. No qualifying plan, no HSA contributions. If deductibles and plan types are still fuzzy, [Health Insurance, Explained](/learn/insurance/health-insurance-explained) covers the vocabulary; if you're not sure what kind of plan you have, check with your insurer or your job's benefits info before you go any further.",
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
          "**While it sits:** the money grows tax-free, with no tax on the interest or investment gains.",
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
        text: "This is the part people most often get wrong, so let's be clear. An HSA is *not* an FSA. With a Flexible Spending Account, money you don't spend by year's end can vanish. An HSA is the opposite: the balance rolls over year after year, and it's yours to keep even if you change jobs or health plans. It just sits there, waiting for you.",
      },
      {
        type: "p",
        text: "Better still, many HSAs let you *invest* the balance once it hits a certain level, so the money can grow over decades much like a retirement account, not just sit as cash.",
      },
      {
        type: "h2",
        text: "The 'stealth retirement account' trick",
      },
      {
        type: "p",
        text: "Here's why some people deliberately leave their HSA alone and let it grow: after age 65, you can withdraw the money for *any* reason, not just medical. At that point a non-medical withdrawal is simply taxed like ordinary income, with no penalty, basically like a Traditional retirement account. And withdrawals for qualified medical costs stay tax-free at any age, even in retirement, when health expenses tend to climb.",
      },
      {
        type: "tip",
        text: "Don't confuse an HSA with an FSA, and remember the hard rule: you must have the qualifying high-deductible health plan to contribute. If you sign up for an HSA without the right plan, you can run into trouble at tax time.",
      },
      {
        type: "p",
        text: "For 2026, you can contribute up to **$4,400** to an HSA with self-only coverage, or **$8,750** with a family plan (plus an extra $1,000 if you're 55 or older). The IRS adjusts these most years and sets the rules for what counts as a qualifying plan or expense; a qualified tax professional can confirm whether an HSA fits you. This is general education, not individualized advice. But if you've got the right health plan, an HSA is one of the most overlooked deals around.",
      },
    ],
    related: ["retirement-accounts-explained", "high-yield-savings-account", "saving-vs-investing"],
  },

  {
    slug: "bonds-explained",
    order: 80,
    topicId: "investing",
    title: "Bonds, Explained",
    dek: "A bond is just a loan you make. Here's how they work, and why a calm corner of your portfolio matters.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A bond is a loan you make to a government or company.",
      "Bonds are generally steadier and lower-risk than stocks, with lower expected returns.",
      "When interest rates rise, existing bond prices fall (and vice versa).",
      "Most people own bonds through funds, and hold them for stability and diversification.",
    ],
    body: [
      {
        type: "p",
        text: "Stocks get all the attention, but bonds are the quiet, steadying half of a lot of smart portfolios. They sound complicated. They're not. Once you see what a bond actually *is*, the whole thing clicks.",
      },
      {
        type: "h2",
        text: "What a bond actually is",
      },
      {
        type: "p",
        text: "A bond is a loan that *you* make. Instead of borrowing money, you lend it to a government or a company. In return, they pay you interest along the way, and at the end of the agreed term (called maturity) they give your original money back. That's it. You're the lender, and you get paid for it.",
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
          "**A stock is ownership.** You buy a slice of a company and ride its ups and downs: bigger potential gains, bigger swings.",
          "**A bond is a loan.** You're owed interest and your principal back, which generally makes bonds steadier and lower-risk, but with lower expected returns to match.",
        ],
      },
      {
        type: "h2",
        text: "The main types, in plain terms",
      },
      {
        type: "list",
        items: [
          "**Government / Treasury bonds:** loans to a national government, among the safest, since governments rarely fail to pay.",
          "**Municipal bonds:** loans to states, cities, or local projects, often with some tax perks.",
          "**Corporate bonds:** loans to companies, typically a bit more risk, and a bit more interest to compensate.",
        ],
      },
      {
        type: "h2",
        text: "The one counterintuitive risk",
      },
      {
        type: "p",
        text: "Here's the quirk worth memorizing: when interest rates rise, the prices of existing bonds fall; when rates drop, existing bond prices rise. They move in opposite directions. This is called interest-rate risk.",
      },
      {
        type: "p",
        text: "Why? Imagine you own a bond paying 3% and new bonds start paying 5%. Nobody wants your lower-paying bond at full price anymore, so its market value dips until the math evens out. The bond itself still pays what it promised, but its price on the market drops. That's all interest-rate risk really means.",
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
        text: "You *can* buy individual bonds, but most people don't bother. Instead they own bond *funds*: a single fund that holds hundreds of bonds at once. That spreads the risk around and means you don't have to research and manage each bond yourself. It's the same convenience logic as owning an [index fund](/learn/investing/index-funds-explained) instead of hand-picking stocks.",
      },
      {
        type: "tip",
        text: "Bonds tend to hold up (or even rise) exactly when stocks are falling. That's the point. A mix of both smooths out the ride, so a rough stretch in the stock market doesn't sink your whole portfolio at once.",
      },
      {
        type: "h2",
        text: "Why bonds belong in a portfolio",
      },
      {
        type: "p",
        text: "Bonds aren't there to make you rich fast; that's the stock side's job. They're there for stability and diversification. Because they often zig when stocks zag, holding some of both is one of the simplest ways to keep your overall investments steadier through the inevitable bumps. The right mix depends on your goals and timeline, which makes this general education rather than individualized advice, but the calm role bonds play is worth understanding either way.",
      },
    ],
    related: ["what-is-a-stock", "risk-and-diversification", "index-funds-explained"],
  },

  {
    slug: "rebalancing-your-portfolio",
    order: 50,
    topicId: "investing",
    title: "Rebalancing: The Once-a-Year Habit",
    dek: "Your portfolio drifts away from the mix you chose, slowly and silently. Once a year, you put it back.",
    level: "Advanced",
    readMinutes: 4,
    takeaways: [
      "Drift means your stock-bond mix shifts on its own as stocks outgrow bonds.",
      "Left alone, your portfolio gets riskier without you ever deciding that.",
      "Once a year is enough, and the whole job takes about 15 minutes.",
      "In a taxable account, rebalance with new money instead of selling to avoid a tax bill.",
    ],
    body: [
      {
        type: "p",
        text: "When you set up your portfolio, you picked a mix: maybe 80% stocks and 20% bonds, or whatever balance of growth and stability fit your timeline. (If you never consciously picked one, [Risk and Diversification](/learn/investing/risk-and-diversification) is the place to start; this article assumes that groundwork.) The catch is that no portfolio holds its shape on its own. Rebalancing is the small annual chore that puts it back.",
      },
      {
        type: "h2",
        text: "What drift is",
      },
      {
        type: "p",
        text: "Stocks usually grow faster than bonds. That's the whole reason you own them, and it's also why your mix won't stay where you set it. Say you start with $10,000 split 80/20. After a strong three-year run for stocks, the stock side may have grown enough to make the split 88/12. You didn't buy anything, sell anything, or decide anything. Your portfolio became more aggressive by itself.",
      },
      {
        type: "p",
        text: "That matters because the mix *was* the decision. An 88/12 portfolio falls harder in a crash than the 80/20 you signed up for. And drift runs furthest after long bull markets, which is exactly when a downturn does the most damage. Rebalancing means trimming what grew and adding to what lagged until you're back at your target, so the risk level stays the one you chose.",
      },
      {
        type: "h2",
        text: "The calendar method",
      },
      {
        type: "p",
        text: "You don't need software or a spreadsheet. The simplest approach is a date on the calendar:",
      },
      {
        type: "steps",
        items: [
          "Pick one day a year you'll remember: your birthday, New Year's week, the day after you file taxes.",
          "Log in and check what percentage of your portfolio each holding makes up. Most brokerages show this on the main screen.",
          "Compare those percentages to your targets. If nothing is off by more than a few points, close the tab. You're done for the year.",
          "If something is meaningfully off (five percentage points is a common threshold), move money until the mix matches your targets again.",
        ],
      },
      {
        type: "p",
        text: "The whole session runs about 15 minutes, and in many years it ends at step three.",
      },
      {
        type: "h2",
        text: "Rebalance with new money before you sell",
      },
      {
        type: "p",
        text: "How you get back to target matters for taxes. In a regular brokerage account, selling your winners creates a capital gain, and [the IRS taxes gains you take](/learn/taxes/investment-taxes-101). The gentler move is to rebalance with new money: point your next several contributions entirely at whatever is underweight (usually bonds, after a good stretch for stocks) until the mix corrects itself. Same destination, no tax bill.",
      },
      {
        type: "p",
        text: "Inside a 401(k) or IRA, none of that caution applies. Trades in retirement accounts aren't taxable events, so you can sell and buy freely and rebalance in one sitting. If you hold similar investments in both kinds of accounts, do your selling inside the retirement account and let new money do the work in the taxable one.",
      },
      {
        type: "h2",
        text: "Or let a fund handle it",
      },
      {
        type: "p",
        text: "If this sounds like a chore you'll never do, you can buy your way out of it. A [target-date fund](/learn/investing/target-date-funds) rebalances internally and gradually shifts more conservative as your retirement year approaches. A [robo-advisor](/learn/investing/robo-advisors) rebalances your account automatically, often whenever it drifts past a set band. If your entire investing life is a target-date fund in a 401(k), rebalancing is already being done for you, and you can skip the calendar reminder.",
      },
      {
        type: "tip",
        text: "More is not better here. Checking monthly invites tinkering, and tinkering is how long-term plans die. A yearly rebalance captures nearly all the benefit; the discipline matters more than the frequency.",
      },
      {
        type: "p",
        text: "Put a repeating date in your phone now. Those 15 minutes a year are what keep the risk level you chose from quietly becoming one you didn't.",
      },
    ],
    related: ["risk-and-diversification", "target-date-funds", "long-term-strategy"],
  },

  {
    slug: "rsus-and-espp",
    order: 60,
    topicId: "investing",
    title: "Stock From Your Job: RSUs and ESPPs",
    dek: "What restricted stock units and purchase plans are worth, how they're taxed, and the one risk they share.",
    level: "Advanced",
    readMinutes: 4,
    takeaways: [
      "RSUs are taxed as ordinary income when they vest, like a cash bonus paid in shares.",
      "Selling RSUs as soon as they vest is a reasonable default, not a rookie move.",
      "An ESPP discount (often 15%) is some of the most reliable extra money in an offer.",
      "Your salary and your portfolio riding on one company is real concentration risk.",
    ],
    body: [
      {
        type: "p",
        text: "More jobs now pay part of your compensation in company stock, and not only at tech giants. The two forms you're most likely to meet are restricted stock units (RSUs) and employee stock purchase plans (ESPPs). Neither is complicated once you see when the tax happens and what risk you're carrying.",
      },
      {
        type: "h2",
        text: "RSUs: a bonus that arrives as shares",
      },
      {
        type: "p",
        text: "A restricted stock unit is a promise: stay employed here, and on certain dates you'll receive shares. The schedule is called vesting, commonly a chunk each quarter or year over four years, sometimes with a one-year cliff before anything vests at all.",
      },
      {
        type: "p",
        text: "The tax is simpler than people fear. On the day shares vest, their market value counts as ordinary income, the same as salary. It lands on your W-2, and your employer typically withholds some shares to cover the tax, the way taxes come out of a paycheck. From that day forward, the shares are ordinary stock you own: hold them, and any further gain or loss follows [the regular capital gains rules](/learn/taxes/investment-taxes-101), measured from the price at vest.",
      },
      {
        type: "key",
        text: "Vested RSUs are a cash bonus your employer paid in shares. Ask yourself: if the bonus had come as cash, would you spend it buying your company's stock? If not, selling at vest is consistent, not disloyal.",
      },
      {
        type: "p",
        text: "That's why the sell-at-vest default is respectable. You owe the income tax either way, and selling immediately adds little or no extra tax, since the shares have barely moved since vesting. What selling does is turn a concentrated bet into money you can diversify.",
      },
      {
        type: "h2",
        text: "ESPPs: buying at a discount",
      },
      {
        type: "p",
        text: "An employee stock purchase plan lets you set aside part of each paycheck (often up to 10% of pay, capped at $25,000 of stock per year by IRS rule) to buy company shares at a discount, commonly 15% below market price. Many plans add a lookback: you pay the lower of the price at the start or the end of the purchase period, which can stretch the discount further.",
      },
      {
        type: "p",
        text: "Bought at a 15% discount and sold promptly, the shares lock in that gain, minus some tax on the discount, which counts as ordinary income. After the 401(k) match, an ESPP discount is often the closest thing to free money in a compensation package. The tax paperwork is fiddly, but your plan documents and tax software sort most of it.",
      },
      {
        type: "h2",
        text: "The risk both of them share",
      },
      {
        type: "p",
        text: "Concentration. Your paycheck already depends on your employer; stock compensation stacks your portfolio on the same company, so one bad year for the business can hit your income and your savings at once. Employees of collapsed companies have learned that lesson the hard way. [Risk and Diversification](/learn/investing/risk-and-diversification) covers why spreading out matters, and with employer stock the case is doubled. A common rule of thumb is to keep any single company, especially the one that signs your paychecks, under about 10% of your portfolio.",
      },
      {
        type: "h2",
        text: "Reading equity in a job offer",
      },
      {
        type: "list",
        items: [
          "**The vesting schedule.** Four years with a one-year cliff is standard; anything slower deserves a question.",
          "**What the grant is worth today**, not the recruiter's projection. Private-company shares can stay unsellable for years, and may end up worth nothing.",
          "**Refreshes.** Ask whether new grants come annually or your equity flatlines once the initial grant vests.",
          "**ESPP terms.** The discount percentage, and whether there's a lookback.",
        ],
      },
      {
        type: "p",
        text: "Equity is one line in a bigger picture; [Reading a Job Offer](/learn/budgeting/reading-a-job-offer) walks through the rest. When the shares arrive, treat them like the paycheck they are: take the guaranteed part, and be deliberate about how much of your future stays riding on one ticker.",
      },
    ],
    related: ["risk-and-diversification", "what-is-a-stock", "investment-taxes-101"],
  },

  {
    slug: "annuities-explained",
    order: 70,
    topicId: "investing",
    title: "Annuities: What They Are and Why the Pitch Is So Smooth",
    dek: "An insurance contract that turns a lump sum into income. Useful in one narrow case, oversold nearly everywhere else.",
    level: "Advanced",
    readMinutes: 4,
    takeaways: [
      "An annuity is an insurance contract: you hand over money, the insurer pays you income.",
      "Simple immediate annuities can make sense for retirees who want a pension-like floor.",
      "The variable and indexed versions sold to young savers tend to carry high fees, high commissions, and long surrender periods.",
      "Ask how the seller is paid before you ask anything else.",
    ],
    body: [
      {
        type: "p",
        text: "Sooner or later, someone may try to sell you an annuity: a relative's financial guy, a workplace seminar, a free-dinner retirement talk. The product has a legitimate core and a salesforce that regularly overshoots it, so it's worth understanding both before the pitch finds you.",
      },
      {
        type: "h2",
        text: "What an annuity is",
      },
      {
        type: "p",
        text: "An annuity is a contract with an insurance company. You give the insurer money, as a lump sum or a series of payments, and in exchange it promises to pay you income, starting right away or at some future date, often for as long as you live. Strip away the brochure and that's the whole product: insurance against outliving your money.",
      },
      {
        type: "h2",
        text: "The narrow case where they earn their keep",
      },
      {
        type: "p",
        text: "The version with the cleanest reputation is the single premium immediate annuity, or SPIA. A retiree hands the insurer, say, $100,000 at age 67 and receives a fixed monthly check for life. For someone without a pension who wants their basic bills covered no matter what markets do or how long they live, that trade can be entirely rational. It's simple, it's easy to comparison-shop across insurers, and there's little for a salesperson to hide.",
      },
      {
        type: "p",
        text: "Notice who that product serves: a person at or near retirement, converting savings into a floor of guaranteed income. If you're decades away from retirement, you are not that person, and the annuities marketed to you are usually a different animal.",
      },
      {
        type: "h2",
        text: "The versions that get sold hard",
      },
      {
        type: "p",
        text: "Variable annuities and indexed annuities are the ones pushed on younger savers, and the pitch is polished: market growth with no downside, tax deferral, guaranteed income later. The reasons for suspicion are structural, not conspiratorial:",
      },
      {
        type: "list",
        items: [
          "**Commissions.** These products often pay the seller 5% or more of everything you put in, which is why the pitch is so warm and so persistent.",
          "**Surrender charges.** Want your money back within the first 7 to 10 years? Many contracts charge a penalty that starts around 7% and steps down slowly. The commission is the reason the exit door costs so much.",
          "**Layered fees.** Variable annuities commonly run 2% to 3% a year once you stack the insurance charge, fund fees, and riders. A plain index fund costs a small fraction of that.",
          "**A redundant tax perk.** Tax deferral is the headline benefit, but a 401(k) or IRA gives you better tax treatment with none of these costs. An annuity's tax advantage mostly matters after those accounts are maxed out, which is rarely the situation of the person being pitched.",
        ],
      },
      {
        type: "h2",
        text: "Four questions that clarify things quickly",
      },
      {
        type: "list",
        items: [
          "**How are you paid**, and how much do you earn if I buy this?",
          "**What is the total annual cost**, every fee and rider included?",
          "**What do I pay to get out** in year three?",
          "**Are you a fiduciary** for this recommendation, legally required to put my interests first?",
        ],
      },
      {
        type: "p",
        text: "That last one matters most. A fiduciary adviser must act in your best interest. Many annuity sellers are held only to a looser suitability standard, meaning the product has to roughly fit you, not serve you best. Neither standard makes a person dishonest, but commissions shape recommendations, and you deserve to know what's shaping this one. An honest seller answers all four questions without flinching.",
      },
      {
        type: "p",
        text: "None of this makes annuities a scam. A real annuity from a rated insurer is a legal, regulated product and occasionally the right one. But the same warm pitch style also dresses up outright fraud, fake guaranteed-return products with nothing behind them; [Investment Fraud](/learn/money-safety/investment-fraud) covers that end of the spectrum. For most young investors, the order of operations is unchanged: fund the boring accounts first, and treat any product that pays its seller thousands of dollars to be enthusiastic with matching skepticism.",
      },
    ],
    related: ["retirement-basics", "compare-investment-vehicles", "investment-fraud"],
  },
];
