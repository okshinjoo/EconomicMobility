import type { Article } from "./types";

export const investingMarketsArticles: Article[] = [
  {
    slug: "compare-investment-vehicles",
    order: 90,
    topicId: "investing",
    title: "Comparing Common Investment Vehicles",
    dek: "Stocks, bonds, funds, CDs, real estate: a quick-reference map of the main ways to put money to work.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Every investment trades off three things: potential return, risk, and how easily you can sell.",
      "Higher potential return almost always means higher risk. There's no free lunch.",
      "Funds let you own a little of everything, which spreads out risk.",
      "For most beginners, a low-cost index fund is the boring, sensible default.",
    ],
    body: [
      {
        type: "p",
        text: "Once you decide to invest, the next question is *in what?* The menu can feel endless, but almost everything sorts into a handful of buckets. This page is the quick reference: what each bucket is, what it trades off, and where to read more.",
      },
      {
        type: "h2",
        text: "The three things every investment trades off",
      },
      {
        type: "list",
        items: [
          "**Return:** how much it might grow your money over time.",
          "**Risk:** how much it can swing, or how much you could lose.",
          "**Liquidity:** how quickly you can turn it back into cash without a penalty.",
        ],
      },
      {
        type: "p",
        text: "Here's the rule that ties them together: higher potential return almost always comes with higher risk. Anything promising big rewards with no risk is either misunderstood or a scam. That single idea will protect you more than any stock tip.",
      },
      {
        type: "h2",
        text: "The main vehicles, at a glance",
      },
      {
        type: "list",
        items: [
          "**Stocks:** a tiny slice of ownership in one company. High potential return, high risk, easy to sell.",
          "**Bonds:** a loan you make to a government or company that pays you interest. Lower return, lower risk, fairly steady. More in [Bonds, Explained](/learn/investing/bonds-explained).",
          "**Funds (index funds, ETFs, mutual funds):** a basket holding many stocks or bonds at once, so one bad company barely matters. The beginner-friendly workhorse. More in [ETF vs. Mutual Fund vs. Index Fund](/learn/investing/etf-vs-mutual-fund).",
          "**High-yield savings and CDs:** the safe, boring corner. Low return, very low risk, federally insured. Great for money you'll need soon, not for long-term growth. More in [What Is a High-Yield Savings Account?](/learn/investing/high-yield-savings-account) and [What Is a CD?](/learn/investing/what-is-a-cd)",
          "**Real estate:** property you own to rent out or sell later, or REITs (funds that own real estate so you don't have to). Can pay income, but it's less liquid and takes more work or money to start.",
          "**Crypto and options:** speculative and volatile, closer to a bet than a plan. Only with money you can fully afford to lose, and only after the basics are covered. More in [A Calm Word on Crypto](/learn/investing/crypto-explained).",
        ],
      },
      {
        type: "key",
        text: "Notice the pattern: toward stocks, crypto, and options, the potential reward *and* the risk both climb. Toward bonds, CDs, and savings, both shrink. Where you sit depends on your goal and how soon you'll need the money.",
      },
      {
        type: "h2",
        text: "How to actually use this",
      },
      {
        type: "p",
        text: "Match the vehicle to the timeline. Money you need within a year or two should sit somewhere safe, like a high-yield savings account or a CD, because you can't afford for it to drop right when you need it. Money you won't touch for decades, like retirement savings, can ride out the ups and downs of stocks, where the long-term growth lives.",
      },
      {
        type: "tip",
        text: "You don't have to choose between all of these. A single low-cost index fund already holds hundreds or thousands of companies. For a lot of people, that one boring choice, held for the long haul, *is* the strategy.",
      },
    ],
    related: ["bonds-explained", "etf-vs-mutual-fund", "risk-and-diversification"],
  },

  {
    slug: "average-rate-of-return",
    order: 140,
    topicId: "investing",
    title: "How to Calculate an Average Rate of Return",
    dek: "Two ways to average returns, and why the simple one can quietly fool you.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "The simple average just adds up the yearly returns and divides by the number of years.",
      "It's easy, but it overstates how you actually did when returns bounce around.",
      "The compound (annualized) return tells you what your money truly earned per year.",
      "When in doubt, the compound version is the honest number.",
    ],
    body: [
      {
        type: "p",
        text: "'Average return' sounds like one simple idea, but there are two ways to calculate it, and they can give very different answers. Knowing the difference keeps you from being fooled by a number that looks better than reality.",
      },
      {
        type: "h2",
        text: "The simple average",
      },
      {
        type: "p",
        text: "This is the one most people mean. You add up each year's return and divide by the number of years. If an investment returned 10%, then 5%, then 9% over three years, the simple average is (10 + 5 + 9) ÷ 3 = **8% per year**. Quick, easy, and fine when returns are fairly steady.",
      },
      {
        type: "h2",
        text: "Why the simple average can lie",
      },
      {
        type: "p",
        text: "The problem shows up when returns swing hard. Picture an investment that gains 50% one year, then loses 50% the next. The simple average is (50 − 50) ÷ 2 = **0%**, which sounds like you broke even. But watch what actually happens to $100:",
      },
      {
        type: "list",
        items: [
          "Year 1: $100 grows 50% → **$150**.",
          "Year 2: $150 falls 50% → **$75**.",
        ],
      },
      {
        type: "p",
        text: "You didn't break even; you *lost* $25, a quarter of your money. The 0% 'average' hid a real loss, because a 50% drop hurts more than a 50% gain helps. That gap is exactly why the simple average can mislead.",
      },
      {
        type: "h2",
        text: "The compound (annualized) return",
      },
      {
        type: "p",
        text: "The honest number is the *compound* annual growth rate: what your money actually earned per year once you account for the ups and downs feeding into each other. The formula is simpler than it looks:",
      },
      {
        type: "key",
        text: "Compound return = (ending value ÷ starting value) raised to the power of (1 ÷ number of years), minus 1.",
      },
      {
        type: "p",
        text: "For the example above: $75 ÷ $100 = 0.75. Raise that to the power of 1/2 (because it's two years) and you get about 0.866. Subtract 1, and the result is roughly **−13.4% per year**. That's the truth, a real loss, even though the simple average said 0%.",
      },
      {
        type: "h2",
        text: "Which one should you use?",
      },
      {
        type: "list",
        items: [
          "Use the **simple average** for a rough, quick sense of typical yearly performance.",
          "Use the **compound return** when you want the honest answer about what your money actually did, especially over many years or through big swings.",
        ],
      },
      {
        type: "tip",
        text: "When a fund or an ad brags about its 'average annual return,' check whether it's the simple or the compound figure. The compound one is harder to dress up, which is exactly why the honest sources lead with it.",
      },
      {
        type: "p",
        text: "You don't need to do this math by hand. A compound interest calculator does it instantly, but knowing what's under the hood means a flashy 'average' will never trick you again.",
      },
    ],
    related: ["magic-of-compound-interest", "compare-investment-vehicles", "risk-and-diversification"],
  },

  {
    slug: "what-is-an-ipo",
    order: 130,
    topicId: "investing",
    title: "What Is an IPO?",
    dek: "What 'going public' means, why companies do it, and why the first day is rarely the bargain it seems.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "An IPO is the first time a private company sells shares to the general public.",
      "Companies do it mainly to raise money and let early backers cash out.",
      "The hype around a hot IPO often means you're buying at an expensive moment.",
      "There's no rule that says you have to get in early. Patience is allowed.",
    ],
    body: [
      {
        type: "p",
        text: "You'll hear that a buzzy company is 'going public' or 'having its IPO,' usually wrapped in breathless headlines. IPO stands for **initial public offering**, and underneath the excitement it's a fairly simple event, one worth understanding before you let the hype pull you in.",
      },
      {
        type: "h2",
        text: "What 'going public' actually means",
      },
      {
        type: "p",
        text: "Most companies start out *private*, owned by their founders, employees, and a handful of early investors. The general public can't buy in. An IPO is the moment that changes: the company sells shares on a public stock exchange for the first time, so anyone with a brokerage account can become a part-owner.",
      },
      {
        type: "h2",
        text: "Why companies do it",
      },
      {
        type: "list",
        items: [
          "**To raise money.** Selling new shares brings in a large pile of cash the company can use to grow, hire, or pay off debt.",
          "**To let early people cash out.** Founders, employees, and early investors finally get a way to turn their shares into real money.",
          "**For visibility and credibility.** Being publicly traded raises a company's profile and can make it easier to borrow or make deals.",
        ],
      },
      {
        type: "h2",
        text: "Why a hot IPO isn't a free ticket",
      },
      {
        type: "p",
        text: "It's tempting to think getting in 'on day one' is a shortcut to riches. Reality is messier. By the time a company everyone's talking about goes public, the excitement is often baked into the price, meaning you may be buying at an expensive, hyped-up moment. Plenty of famous IPOs jumped on day one and then sank for months or years afterward.",
      },
      {
        type: "key",
        text: "An IPO is exciting for the *company*. It is not automatically a good deal for *you*. New public companies can be volatile, and the story you're hearing is usually the optimistic one.",
      },
      {
        type: "tip",
        text: "There's no prize for buying the instant a stock goes public. If you believe in a company, you can watch it trade for a while, let the early frenzy settle, and decide with a clearer head. 'I missed the first day' has cost almost no one anything.",
      },
      {
        type: "p",
        text: "IPOs are a normal part of how the market works, not a secret door to wealth. Treat a new stock like any other: understand the business, ignore the hype, and never bet money you can't afford to lose on a first-day pop.",
      },
    ],
    related: ["what-is-a-stock", "opening-vs-offering-price", "investing-mistakes"],
  },

  {
    slug: "opening-vs-offering-price",
    order: 20,
    topicId: "investing",
    title: "Opening Price vs. Offering Price",
    dek: "The IPO price you read about isn't the price you can actually buy at. Here's the gap.",
    level: "Advanced",
    readMinutes: 5,
    takeaways: [
      "The offering price is set before trading and goes to a select group of early investors.",
      "The opening price is the first price shares actually trade at on the open market.",
      "Regular investors almost always buy at the opening price, not the offering price.",
      "The gap between the two is why a 'first-day pop' rarely lands in your pocket.",
    ],
    body: [
      {
        type: "p",
        text: "When a company [goes public](/learn/investing/what-is-an-ipo), you'll see two different prices thrown around, and confusing them is how a lot of everyday investors get a nasty surprise. They're called the *offering price* and the *opening price*, and the difference between them matters more than almost anything else about an IPO.",
      },
      {
        type: "h2",
        text: "The offering price",
      },
      {
        type: "p",
        text: "The **offering price** (sometimes called the IPO price) is set the night before the stock starts trading. The company and its bankers pick a number (say $20 a share) and sell shares at that price to a select group of mostly large, institutional investors. This is the headline number you see in the news: 'Company X priced its IPO at $20.'",
      },
      {
        type: "h2",
        text: "The opening price",
      },
      {
        type: "p",
        text: "The **opening price** is what actually happens the next morning, when shares hit the open market and anyone can trade them. Now supply and demand take over. If everyone's excited, the first real trade might happen at $35, not $20. That first market price is the opening price, and it can be wildly different from the offering price.",
      },
      {
        type: "key",
        text: "Here's the catch: regular investors almost never get the offering price. By the time you can click 'buy,' you're trading at the opening price, the higher, hyped-up one. The cheap seats were already taken before the market opened.",
      },
      {
        type: "h2",
        text: "Why this trips people up",
      },
      {
        type: "p",
        text: "Picture that $20 IPO that opens at $35. The news cheers a 75% 'first-day pop.' But that gain went to the insiders who bought at $20. If you bought at the $35 open and the stock drifts back toward $25 over the following weeks (which happens often), *you* lost money on the same IPO the headlines called a smash hit.",
      },
      {
        type: "tip",
        text: "When you read 'the stock soared on its first day,' ask: soared from *which* price? The pop is measured from the offering price almost nobody outside the deal could buy at. Your starting line is the opening price, and it's usually much higher.",
      },
      {
        type: "p",
        text: "None of this means IPOs are bad, just that the exciting number isn't the one you'd pay. Knowing the gap between offering and opening price turns a confusing headline into something you can see clearly: who actually got the deal, and who's buying the hype.",
      },
    ],
    related: ["what-is-an-ipo", "what-is-a-stock", "investing-mistakes"],
  },

  {
    slug: "options-explained",
    order: 10,
    topicId: "investing",
    title: "What Are Options?",
    dek: "Calls, puts, and an honest look at why this corner of investing is far riskier than it appears.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "An option is a contract giving you the right (not the obligation) to buy or sell at a set price.",
      "A call bets a price goes up; a put bets it goes down.",
      "You can lose the entire amount you paid, often fast, when an option expires worthless.",
      "Options are advanced and speculative. Most people are better off without them.",
    ],
    body: [
      {
        type: "p",
        text: "Options have a reputation: exciting, fast-moving, and the kind of thing confident people on the internet swear by. They're also one of the easiest ways for a beginner to lose money in a hurry. This is the plain version, with an honest look at the risk, so you can decide with clear eyes.",
      },
      {
        type: "h2",
        text: "The core idea",
      },
      {
        type: "p",
        text: "An option is a *contract*. It gives you the right, but not the obligation, to buy or sell a stock at a specific price (called the *strike price*) by a specific date (the *expiration*). You pay an upfront fee for that right, called the *premium*. If things don't go your way, you can simply walk away, but you lose what you paid.",
      },
      {
        type: "h2",
        text: "Calls and puts",
      },
      {
        type: "list",
        items: [
          "**A call** is the right to *buy* at the strike price. You buy a call when you're betting the stock will go *up*.",
          "**A put** is the right to *sell* at the strike price. You buy a put when you're betting the stock will go *down*, or to protect shares you already own.",
        ],
      },
      {
        type: "p",
        text: "Quick way to remember it: you *call* something up, you *put* something down.",
      },
      {
        type: "h2",
        text: "Why they're so much riskier than they look",
      },
      {
        type: "p",
        text: "Options are *leveraged*, meaning a small amount of money controls a much larger amount of stock. That cuts both ways. A small move in the stock can multiply your money or wipe it out. And options have an expiration date, so unlike a stock you can hold forever, an option can hit zero and vanish if your bet doesn't pay off in time.",
      },
      {
        type: "list",
        items: [
          "Many options expire **worthless**, meaning you lose 100% of the premium you paid.",
          "The clock is always working against you, even if you're 'right' but too slow.",
          "*Selling* options (as opposed to buying them) can expose you to losses far larger than what you put in.",
        ],
      },
      {
        type: "key",
        text: "Buying options is closer to placing a timed bet than to investing. It's possible to do thoughtfully, but it is speculative, fast, and unforgiving: the opposite of the slow, boring, diversified approach that quietly builds wealth.",
      },
      {
        type: "tip",
        text: "Don't confuse these with *employee stock options*, the kind a job might offer as part of your pay. Those are a different thing entirely (a chance to buy your company's shares), and they're not the high-speed trading contracts described here.",
      },
      {
        type: "p",
        text: "If you're still building your foundation (an emergency fund, steady index-fund investing, retirement contributions), options aren't a missing piece you need. They're an advanced tool, and there's zero shame in deciding they're not for you. The people who build real wealth rarely needed them.",
      },
    ],
    related: ["what-is-a-stock", "investing-mistakes", "risk-and-diversification"],
  },
];
