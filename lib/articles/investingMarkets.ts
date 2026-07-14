import type { Article } from "./types";

export const investingMarketsArticles: Article[] = [
  {
    slug: "compare-investment-vehicles",
    order: 90,
    topicId: "investing",
    title: "Comparing Common Investment Vehicles",
    dek: "Stocks, bonds, funds, cash, REITs, and crypto, measured against the same four yardsticks and matched to the jobs they do well.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Judge every investment on four things: risk, return character, liquidity, and effort.",
      "Higher expected return always rides with higher risk. Nothing on this list is a free lunch.",
      "Your time horizon, not your opinion of the asset, should pick the vehicle.",
      "For long-term money, a low-cost index fund is the sensible default.",
    ],
    body: [
      {
        type: "p",
        text: "Once you decide to invest, the next question is *in what?* The menu can feel endless, but almost everything sorts into a handful of buckets, and the buckets get much easier to compare once you measure them all against the same yardsticks. This guide does exactly that, then finishes with the part most comparisons skip: which job each vehicle is actually for.",
      },
      {
        type: "h2",
        text: "The four yardsticks",
      },
      {
        type: "list",
        items: [
          "**Risk:** how far the value can swing, and how much you could lose.",
          "**Return character:** not just how much it might earn, but *how*. Steady interest, slow compounding, or feast-and-famine.",
          "**Liquidity:** how fast you can turn it back into cash without a penalty or a haircut.",
          "**Effort:** how much research, upkeep, and nerve it demands from you.",
        ],
      },
      {
        type: "p",
        text: "One rule ties the first two together: higher expected return always comes packaged with higher risk. Anything promising big rewards with no risk is either misunderstood or a scam. That single idea will protect you more than any stock tip ever will.",
      },
      {
        type: "h2",
        text: "The vehicles, one by one",
      },
      {
        type: "h3",
        text: "Individual stocks",
      },
      {
        type: "p",
        text: "A stock is a slice of ownership in one company, so your result depends on how that one company does. The return character is lumpy: a great pick can multiply, a bad one can go to zero, and even good companies swing 30% in an ordinary year. Liquidity is excellent (you can sell in seconds on any market day), but the effort is the highest here. Owning single stocks responsibly means researching businesses and stomaching their bad quarters, which is why most people should hold stocks through funds instead.",
      },
      {
        type: "h3",
        text: "Bonds",
      },
      {
        type: "p",
        text: "A bond is a loan you make to a government or company, which pays you interest and then returns your money. The return character is the opposite of a stock's: steady, contractual, and capped. Risk is much lower (though bond *prices* do wobble when interest rates move), liquidity is good, and effort is minimal if you hold them through a fund. Bonds are the stabilizer in a portfolio, not the engine. [Bonds, Explained](/learn/investing/bonds-explained) goes deeper.",
      },
      {
        type: "h3",
        text: "Index funds and ETFs",
      },
      {
        type: "p",
        text: "A fund is a basket holding hundreds or thousands of stocks or bonds at once, so no single company can sink you. A broad stock index fund keeps the long-run growth of the stock market while sanding off the single-company disasters, and the effort rounds to zero: no research, no timing, just regular contributions. Liquidity is same-day. This combination (market-level returns, spread-out risk, no homework) is why funds are the workhorse for ordinary investors. [ETF vs. Mutual Fund vs. Index Fund](/learn/investing/etf-vs-mutual-fund) sorts out the wrappers.",
      },
      {
        type: "h3",
        text: "Cash: HYSAs and CDs",
      },
      {
        type: "p",
        text: "The safe corner. A [high-yield savings account](/learn/investing/high-yield-savings-account) pays real interest with instant-ish access; a [CD](/learn/investing/what-is-a-cd) pays a locked rate in exchange for a locked term. Risk to your principal is essentially zero (both are federally insured), which is exactly why the return is the lowest on this list: over decades, cash barely outruns inflation. Perfect for money you'll need soon, a quiet drag on money you won't.",
      },
      {
        type: "h3",
        text: "REITs",
      },
      {
        type: "p",
        text: "A REIT is a company that owns income-producing real estate and trades like a stock, so you get landlord-style income with none of the landlord work and full same-day liquidity. Risk sits near stock territory, and the return character tilts toward dividends rather than price growth. [REITs: Real Estate Without the House](/learn/investing/what-is-a-reit) covers the details, including the tax wrinkle that makes them fit best inside retirement accounts.",
      },
      {
        type: "h3",
        text: "Crypto",
      },
      {
        type: "p",
        text: "Maximum risk, feast-or-famine return character, decent liquidity on major coins, and high effort if you count the nerve required to hold through 70% drawdowns. There's no underlying business or interest payment, just what the next buyer will pay. If you want exposure anyway, [A Calm Word on Crypto](/learn/investing/crypto-explained) makes the case for keeping it a small, capped slice of money you can afford to lose.",
      },
      {
        type: "h2",
        text: "Match the vehicle to the job",
      },
      {
        type: "p",
        text: "The right question is never \"which of these is best?\" It's \"when will I need this money?\" Time horizon does most of the deciding for you:",
      },
      {
        type: "list",
        items: [
          "**Within 2 years:** cash only. An HYSA or a CD, because a market dip right before you need the money would be a disaster you can't wait out.",
          "**2 to 5 years:** mostly cash and bonds. Some growth is fine, but the recovery time after a bad stretch is short.",
          "**5 years and beyond:** mostly stock index funds. You have time to ride out crashes, and this is where long-run growth lives.",
          "**Decades (retirement money):** stock funds doing the heavy lifting, with bonds added gradually as the finish line approaches.",
        ],
      },
      {
        type: "key",
        text: "You don't have to collect all of these. A single low-cost index fund already holds hundreds of companies, and pairing it with a good savings account covers both ends of the timeline. For a lot of people, that boring two-piece setup *is* the strategy.",
      },
    ],
    related: ["bonds-explained", "etf-vs-mutual-fund", "what-is-a-reit", "annuities-explained"],
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
        text: "The problem shows up when returns [swing hard](/learn/investing/risk-and-diversification). Picture an investment that gains 50% one year, then loses 50% the next. The simple average is (50 − 50) ÷ 2 = **0%**, which sounds like you broke even. But watch what actually happens to $100:",
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
        text: "You don't need to do this math by hand. A [compound interest](/learn/investing/magic-of-compound-interest) calculator does it instantly, but knowing what's under the hood means a flashy 'average' will never trick you again.",
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
        text: "Most companies start out *private*, owned by their founders, employees, and a handful of early investors. The general public can't buy in. An IPO is the moment that changes: the company sells shares on a public stock exchange for the first time, so anyone with a [brokerage account](/learn/investing/how-to-pick-a-brokerage) can become a part-owner.",
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
        text: "IPOs are a normal part of how the market works, not a secret door to wealth. Treat a new stock like any other: understand the business, ignore the hype, and never bet money you can't afford to lose on a [first-day pop](/learn/investing/opening-vs-offering-price).",
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
        text: "Regular investors almost never get the offering price. By the time you can click 'buy,' you're trading at the opening price, the higher, hyped-up one. The cheap seats were already taken before the market opened.",
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
    related: ["what-is-an-ipo", "how-to-read-a-stock-quote", "investing-mistakes"],
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
        text: "Buying options is closer to placing a timed bet than to investing. It's possible to do thoughtfully, but it is speculative, fast, and unforgiving: the opposite of the [slow, boring, diversified approach](/learn/investing/long-term-strategy) that quietly builds wealth.",
      },
      {
        type: "tip",
        text: "Don't confuse these with *employee stock options*, the kind a job might offer as part of your pay. Those are a different thing entirely (a chance to buy your company's shares), and they're not the high-speed trading contracts described here.",
      },
      {
        type: "p",
        text: "If you're still building your foundation (an emergency fund, steady [index-fund](/learn/investing/index-funds-explained) investing, retirement contributions), options aren't a missing piece you need. They're an advanced tool, and there's zero shame in deciding they're not for you. The people who build real wealth rarely needed them.",
      },
    ],
    related: ["margin-and-short-selling", "investing-mistakes", "risk-and-diversification", "markets-tour"],
  },

  {
    slug: "expense-ratios-and-fees",
    order: 75,
    topicId: "investing",
    title: "The Quiet Fee That Eats Your Returns",
    dek: "Funds never send you a bill. The fee comes out anyway, and over decades it can cost more than you'd believe.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "An expense ratio is a fund's yearly fee, taken as a percentage of whatever you hold.",
      "The gap between 0.03% and 1% can add up to tens of thousands of dollars over a working lifetime.",
      "Every fund publishes its expense ratio. It takes seconds to check before you buy.",
      "Load fees and advisor fees stack on top, so watch for those too.",
    ],
    body: [
      {
        type: "p",
        text: "Most costs in life announce themselves. A fund fee doesn't. No bill arrives, no line item shows up on a statement, and yet money leaves your account every single year you own the fund. It's called the expense ratio, and because it's invisible, it's the fee people ignore for decades. That's exactly why it deserves five minutes of your attention now.",
      },
      {
        type: "h2",
        text: "What an expense ratio is",
      },
      {
        type: "p",
        text: "The expense ratio is the fund's yearly operating fee, charged as a percentage of whatever you have invested in it. A 0.03% ratio means you pay $3 a year for every $10,000 you hold. A 1% ratio means $100 a year on the same $10,000. The fund skims it out of its own value a little at a time, so the returns you see are already after the fee. You never write a check, which is precisely why it's so easy to overpay without noticing.",
      },
      {
        type: "h2",
        text: "What the difference costs over decades",
      },
      {
        type: "p",
        text: "Say you invest $10,000, the market averages 7% a year, and you leave it alone for 40 years. The only difference between these two outcomes is the fee:",
      },
      {
        type: "list",
        items: [
          "In a fund charging **0.03%**, you end with roughly **$148,000**.",
          "In a fund charging **1%**, you end with roughly **$103,000**.",
        ],
      },
      {
        type: "p",
        text: "Same money, same market, same 40 years of patience. The higher fee cost you about $45,000, close to a third of the growth your money would have produced. The damage is so large because the fee compounds against you: every dollar paid in fees is also a dollar that never gets to earn returns for the rest of your life. If you want to run your own version, plug two different return rates into an investment calculator, one with the fee subtracted, and watch the lines split.",
      },
      {
        type: "key",
        text: "A 1% fee sounds like pocket change. Over a working lifetime it behaves more like a silent partner who takes a third of your profits and none of your risk.",
      },
      {
        type: "h2",
        text: "Where to find a fund's expense ratio",
      },
      {
        type: "p",
        text: "Every fund is required to publish it. Search the fund's ticker symbol on your brokerage's site or any finance site and look for the number labeled \"expense ratio,\" usually right near the price. Broad index funds commonly charge between 0.02% and 0.20%; actively managed funds often charge 0.5% to 1% or more for the promise (rarely kept) of beating the market. [Index Funds, Explained](/learn/investing/index-funds-explained) covers why the cheap, boring option tends to win anyway.",
      },
      {
        type: "h2",
        text: "Two other fees worth catching",
      },
      {
        type: "list",
        items: [
          "**Load fees.** Some mutual funds charge a sales commission when you buy or sell, sometimes around 5% off the top before your money is even invested. Funds without one are called *no-load* funds, and there are so many excellent ones that there's essentially never a reason to pay a load.",
          "**Advisory (AUM) fees.** Some financial advisors charge a percentage of your *assets under management*, commonly about 1% a year, and that sits on top of whatever the funds themselves charge. [Robo-advisors](/learn/investing/robo-advisors) do a slimmed-down version of the same job for around 0.25%.",
        ],
      },
      {
        type: "p",
        text: "None of this means fees are evil; running a fund costs something. It means the burden of proof is on the expensive option. Before you buy any fund, find its expense ratio. If it's above roughly 0.2% for a plain index fund, or the fund charges a load, keep looking. The 15-second check might be the highest-paid quarter minute of your life.",
      },
    ],
    related: ["etf-vs-mutual-fund", "index-funds-explained", "investing-mistakes"],
  },

  {
    slug: "dividends-explained",
    order: 85,
    topicId: "investing",
    title: "Dividends, Explained",
    dek: "Some investments pay you cash while you hold them. What dividends are, what to do with them, and the yield trap to avoid.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A dividend is a slice of a company's profit paid out to shareholders, usually quarterly.",
      "Reinvesting dividends automatically is how small payments turn into serious compounding.",
      "In a regular brokerage account, dividends are taxed the year you receive them.",
      "A sky-high yield is usually a warning sign, not a gift.",
    ],
    body: [
      {
        type: "p",
        text: "Owning a stock can pay you in two ways. The one everyone knows is the price going up. The quieter one is the dividend: cash the company sends you periodically for holding its shares. Understanding how dividends work (and how they're taxed) matters, because they're a bigger share of long-term returns than most beginners guess.",
      },
      {
        type: "h2",
        text: "What a dividend actually is",
      },
      {
        type: "p",
        text: "When a company earns a profit, it has choices: reinvest in the business, pay down debt, or hand some cash back to its owners. That last option is a dividend, typically a set amount per share paid every three months. Older, steadier companies (utilities, big consumer brands) tend to pay them; younger companies usually don't, preferring to pour every dollar into growth. Neither approach is better by itself. It's a difference in style, not in quality.",
      },
      {
        type: "p",
        text: "You don't need to own individual stocks to collect dividends. A fund gathers the dividends from every company it holds and passes them through to you, so an ordinary index fund quietly pays dividends too.",
      },
      {
        type: "h2",
        text: "Reinvest them and let them snowball",
      },
      {
        type: "p",
        text: "You can take dividends as cash, but the powerful move for a long-term investor is reinvesting them: using each payment to buy more shares automatically. Brokerages call this a DRIP (dividend reinvestment plan), and it's usually a single toggle in your account settings. Each reinvested dividend buys shares that pay their own dividends, which buy more shares, and so on. It's [compound interest](/learn/investing/magic-of-compound-interest) wearing a different outfit, and over decades it does a surprising share of the work. Fractional shares make it exact: a $12 dividend buys $12 of the fund, down to the penny, with nothing left sitting idle.",
      },
      {
        type: "h2",
        text: "The tax preview",
      },
      {
        type: "p",
        text: "In a regular brokerage account, dividends count as income in the year they're paid, even if you reinvested every cent. Most dividends from established U.S. companies are *qualified*, which means they're taxed at the gentler long-term capital gains rates; *ordinary* (non-qualified) dividends are taxed like your paycheck. The full picture, including the 2026 rates, lives in [Taxes on Your Investments, Explained](/learn/taxes/investment-taxes-101). Inside a 401(k) or IRA, none of this yearly taxation happens, which is one more reason those accounts are the best home for long-term money.",
      },
      {
        type: "h2",
        text: "Why chasing yield backfires",
      },
      {
        type: "p",
        text: "A stock's *dividend yield* is its yearly dividend divided by its price. Once people learn that, some start hunting for the highest yield they can find, and that's where trouble starts. A yield far above everything around it usually means one of two things: the price has crashed (bad news the dividend hasn't caught up with yet), or the payout is about to be cut. Companies in trouble often show gorgeous yields right before the dividend disappears.",
      },
      {
        type: "key",
        text: "A dividend isn't free money on top of your investment. When a company pays out cash, its share price drops by roughly that amount, because the company is now worth that much less. What matters is *total return*: price growth and dividends together.",
      },
      {
        type: "p",
        text: "The sane way to hold dividends is the unglamorous one: own a broad, diversified fund, switch on automatic reinvestment, and let the payments compound in the background. Collecting yield can feel like income, but for money you're growing over decades, the dividends you never see are the ones doing the most good.",
      },
    ],
    related: ["what-is-a-stock", "how-to-read-a-stock-quote", "investment-taxes-101"],
  },

  {
    slug: "target-date-funds",
    order: 95,
    topicId: "investing",
    title: "Target-Date Funds: One Fund, Whole Plan",
    dek: "The fund with a year in its name is the closest thing investing has to autopilot. Here's how it works and what to watch.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A target-date fund is a complete, diversified portfolio inside a single fund.",
      "Its glide path automatically shifts from stocks toward bonds as your retirement year approaches.",
      "Pick the fund closest to the year you'll turn about 65, then adjust for your own taste.",
      "Fees vary wildly between providers doing nearly the same job. Check before you buy.",
    ],
    body: [
      {
        type: "p",
        text: "Scroll through a 401(k) menu and you'll see funds named things like \"Target Retirement 2065.\" That year isn't decoration. It's the whole strategy: tell the fund roughly when you plan to retire, and it handles everything else, for decades, without another decision from you.",
      },
      {
        type: "h2",
        text: "One fund that holds other funds",
      },
      {
        type: "p",
        text: "A target-date fund is a *fund of funds*: a single wrapper holding several broad funds inside it, typically U.S. stocks, international stocks, and bonds. Buy one share and you own a sliver of thousands of companies plus a helping of bonds, already balanced in sensible proportions. For someone who doesn't want to assemble that mix themselves from [index funds](/learn/investing/index-funds-explained), it's the entire portfolio in one purchase.",
      },
      {
        type: "h2",
        text: "The glide path",
      },
      {
        type: "p",
        text: "What makes these funds clever is that the mix doesn't stay fixed. When your target year is 40 years away, the fund holds mostly stocks, because you have decades to ride out drops and stocks are where long-run growth lives. As the year approaches, it gradually shifts toward bonds and steadier holdings, protecting what you've built as you get close to needing it. That slow, automatic shift is called the glide path, and it replaces the rebalancing and risk-adjusting an investor would otherwise have to remember to do for 40 years straight.",
      },
      {
        type: "h2",
        text: "How to pick your year",
      },
      {
        type: "steps",
        items: [
          "Take the year you were born and add about 65. That's your rough retirement year.",
          "Round to the nearest fund offered; they usually come in five-year steps (2055, 2060, 2065).",
          "Want to be more aggressive? Pick a later year, which keeps you in stocks longer. More cautious? Pick an earlier one.",
          "Buy that one fund and keep contributing. There is no step five.",
        ],
      },
      {
        type: "h2",
        text: "Fees vary wildly",
      },
      {
        type: "p",
        text: "Two target-date funds with the same year on the label can charge very different prices. Series built from index funds often cost around 0.1% a year, while actively managed versions can charge 0.5% or more for nearly the same ride. Over a career, that gap is real money, the same quiet drain covered in [The Quiet Fee That Eats Your Returns](/learn/investing/expense-ratios-and-fees). Before you buy, check the expense ratio, and if your 401(k)'s target-date option is expensive, it may still be worth it for the employer match, but know what you're paying.",
      },
      {
        type: "tip",
        text: "If your job auto-enrolled you in a [401(k)](/learn/investing/what-is-a-401k), there's a decent chance you already own a target-date fund. It's the most common default investment, which is a compliment: regulators and employers picked it as the option that's hardest to get wrong.",
      },
      {
        type: "h2",
        text: "What the year doesn't mean",
      },
      {
        type: "p",
        text: "Two misreadings are worth clearing up. The year is not a lock: your money isn't frozen until 2065, and you can sell or switch funds whenever you want (though inside a retirement account, the account's own withdrawal rules still apply). And the year is not a guarantee: the fund doesn't promise any particular balance when the date arrives. It manages your risk along the way; the market still decides the returns. One more placement note: these funds shine inside retirement accounts, where their internal shuffling has no tax consequences, and they're a little less efficient in a regular taxable brokerage account.",
      },
      {
        type: "key",
        text: "A target-date fund is designed to be your *whole* portfolio. Owning three of them, or pairing one with five other funds, cancels the simplicity you're paying for. One fund, fed consistently, is the entire point.",
      },
    ],
    related: ["what-is-a-401k", "expense-ratios-and-fees", "index-funds-explained", "rebalancing-your-portfolio"],
  },

  {
    slug: "robo-advisors",
    order: 105,
    topicId: "investing",
    title: "Robo-Advisors: What You Get for 0.25%",
    dek: "Apps that invest for you have real strengths and a real cost. An honest comparison against doing it yourself.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A robo-advisor builds and maintains a diversified portfolio for you automatically.",
      "The typical fee is about 0.25% a year, on top of the funds' own expense ratios.",
      "Doing the same thing yourself with index funds costs almost nothing extra.",
      "The fee mostly buys discipline. For some people that's a bargain.",
    ],
    body: [
      {
        type: "p",
        text: "A robo-advisor is an investing service that runs on software instead of meetings. You answer a short questionnaire, the app builds you a portfolio, and from then on it manages the details automatically. The pitch is \"investing without the homework,\" and unlike a lot of financial pitches, this one is mostly true. The question is whether it's worth the fee.",
      },
      {
        type: "h2",
        text: "What a robo-advisor actually does",
      },
      {
        type: "list",
        items: [
          "**Builds your allocation.** Based on your age, goals, and how you answered questions about risk, it picks a mix of low-cost stock and bond index funds, the same asset allocation decision a human advisor would make.",
          "**Invests every deposit.** Money you send in gets invested automatically, so cash never sits idle and you never forget the last step.",
          "**Rebalances.** When stocks surge or slump and your mix drifts, it quietly trades back to the target so your risk level stays where you set it.",
          "**Harvests tax losses.** In a taxable account, some robos sell investments that have dipped and replace them with similar ones, capturing losses that can trim your tax bill.",
        ],
      },
      {
        type: "h2",
        text: "What it costs, honestly",
      },
      {
        type: "p",
        text: "The going rate is about 0.25% of your balance per year, which is $25 a year on $10,000, plus the expense ratios of the underlying funds (usually cheap ones). Compare the alternatives: doing it yourself with a [target-date fund](/learn/investing/target-date-funds) or a broad index fund costs no extra layer at all, while a traditional human advisor often charges around 1% of your assets every year, four times the robo's rate, and frequently with account minimums that shut out beginners anyway. Some human advisors charge flat or hourly fees instead, which can be a fair deal when your situation genuinely needs one.",
      },
      {
        type: "p",
        text: "Notice what a robo does *not* promise: beating the market. It builds roughly the same diversified portfolio you could build yourself and maintains it well. On a starter balance, the fee is coffee money; on the large balance you hope to have someday, 0.25% of a lot is a lot, so it's a decision worth revisiting every few years as your account grows.",
      },
      {
        type: "h2",
        text: "So who should use one?",
      },
      {
        type: "p",
        text: "Be honest with yourself about behavior, because that's what the fee really buys. The math says a DIY index-fund investor keeps the 0.25%. The catch is that the math only works if you consistently invest, never panic-sell, and rebalance occasionally, and [the most expensive investing mistakes](/learn/investing/investing-mistakes) are behavioral, not technical. A robo that keeps you automated and hands-off through a scary market can earn its fee many times over.",
      },
      {
        type: "list",
        items: [
          "**DIY fits you** if one boring fund plus an automatic monthly transfer sounds doable and you can leave it alone.",
          "**A robo fits you** if you want it handled, you like the extras like rebalancing and tax-loss harvesting, and paying 0.25% beats not starting.",
          "**A human advisor fits you** when life gets complicated: a business, an inheritance, equity compensation, or a plan involving more than investing.",
        ],
      },
      {
        type: "key",
        text: "There's no wrong door here. A robo-advisor, a target-date fund, and a hand-built index portfolio all land in roughly the same place: diversified, low-cost, long-term. The worst option is the fourth one, waiting years to choose.",
      },
      {
        type: "p",
        text: "If you go the robo route, stick to established names, check the full fee schedule (a few charge monthly subscriptions instead, which can be steep on small balances), and resist the upsells into fancier products. The simple version is the good version.",
      },
    ],
    related: ["target-date-funds", "expense-ratios-and-fees", "how-to-pick-a-brokerage"],
  },

  {
    slug: "market-crashes",
    order: 35,
    topicId: "investing",
    title: "Crashes, Corrections, and Bear Markets",
    dek: "Someday your balance will drop hard and fast. Knowing the vocabulary and the history now is what keeps you calm then.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "A correction is a 10% drop; a bear market is 20% or more; a crash is sudden and violent.",
      "Downturns are a normal, recurring feature of markets, not a malfunction.",
      "A loss only becomes permanent when you sell while prices are down.",
      "For a young investor, the right response to a crash is usually to keep buying.",
    ],
    body: [
      {
        type: "p",
        text: "If you invest for decades, this is guaranteed: at some point you will open your account and see it worth dramatically less than it was a few weeks earlier. Headlines will be apocalyptic. People around you will be selling. What you do in that moment will matter more than almost any other investing decision you make, and the preparation for it starts now, while everything is calm.",
      },
      {
        type: "h2",
        text: "The vocabulary of a bad stretch",
      },
      {
        type: "list",
        items: [
          "**A dip or pullback** is a drop of less than 10% from a recent high. These happen constantly and barely deserve the news coverage they get.",
          "**A correction** is a drop of 10% or more. Uncomfortable, common, and usually over within months.",
          "**A bear market** is a drop of 20% or more, often unfolding over months or years. (Its opposite, a rising market, is a bull market.)",
          "**A crash** is a sudden, violent plunge over days or weeks rather than months. Crashes usually overlap with one of the above; the word describes the speed.",
        ],
      },
      {
        type: "h2",
        text: "What history actually shows",
      },
      {
        type: "p",
        text: "Corrections come around every couple of years on average. Bear markets are rarer but a certainty over an investing lifetime; plan to live through several. In the 2008–09 financial crisis, the U.S. market lost roughly half its value over about a year and a half. In early 2020, it dropped about a third in five weeks, one of the fastest falls ever recorded, and was back at record highs within months. Every downturn in U.S. market history, including the Great Depression, has eventually been recovered and surpassed. That's not a promise about the future, but it's the base rate, and betting against it has been the losing side for a century.",
      },
      {
        type: "h2",
        text: "Why selling is the trap",
      },
      {
        type: "p",
        text: "During a drop, your loss exists only on paper. You still own the same shares of the same companies; the market is just quoting you a worse price today. Selling is the act that converts a temporary markdown into a permanent loss, and it sets up the second half of the mistake: recoveries tend to arrive suddenly, with some of the market's best single days landing right in the middle of its worst stretches. People who sell to \"wait for things to settle\" routinely miss the rebound, then buy back in at higher prices. [Panic-selling tops the list of beginner mistakes](/learn/investing/investing-mistakes) for a reason.",
      },
      {
        type: "key",
        text: "A crash doesn't destroy shares. It transfers them, at discount prices, from people who had to sell (or panicked) to people who kept buying. Decide now which side of that trade you want to be on.",
      },
      {
        type: "h2",
        text: "What a young investor should actually do",
      },
      {
        type: "p",
        text: "Mostly nothing, and that's not a joke. If you're decades from needing the money, a bear market is the best sale you'll ever be offered on the exact thing you were planning to buy anyway. Keep your automatic contributions running: [dollar-cost averaging](/learn/investing/dollar-cost-averaging) means every paycheck's investment now buys more shares than it did before the drop. Keep your emergency fund in cash so a job loss during a downturn never forces you to sell investments at the bottom. And check your account less, not more; nobody makes better decisions refreshing a red screen.",
      },
      {
        type: "p",
        text: "The investors who get hurt worst in crashes are usually the ones who never expected one. Now you do. When it comes (and it will), you'll have seen the pattern before: a scary drop, a chorus of doom, a recovery that started before the news turned good. Boring consistency, once again, wins by default.",
      },
    ],
    related: ["investing-mistakes", "margin-and-short-selling", "long-term-strategy"],
  },

  {
    slug: "how-to-read-a-stock-quote",
    order: 125,
    topicId: "investing",
    title: "How to Read a Stock Quote",
    dek: "Price, market cap, P/E, yield, range, volume: what each number on a quote page tells you, walked through on a full example.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A stock's price by itself tells you almost nothing; market cap is what measures a company's size.",
      "The P/E ratio shows what you're paying for each dollar of the company's profit.",
      "The 52-week range and volume give context, not buy signals.",
      "A quote describes a stock. It doesn't tell you whether to buy it.",
    ],
    body: [
      {
        type: "p",
        text: "Look up any [stock](/learn/investing/what-is-a-stock) in a brokerage app and you get a wall of numbers, most of them unlabeled beyond a cryptic abbreviation. Only six of them do most of the work, though, and once you can read those, every quote page on the internet becomes legible. Here's each one, then a full read-through of a made-up company so you can see them working together.",
      },
      {
        type: "h2",
        text: "Price: the number that means the least",
      },
      {
        type: "p",
        text: "The big number at the top is just the cost of one share, and on its own it tells you almost nothing. A $900 stock is not \"more expensive\" than a $9 stock in any way that matters, because companies choose how many slices to cut themselves into. One company might be split into 50 million shares, another into 15 billion. Judging a company by its share price is like judging a pizza by the size of one slice without asking how many slices there are.",
      },
      {
        type: "h2",
        text: "Market cap: the company's actual size",
      },
      {
        type: "p",
        text: "Market capitalization is the share price multiplied by the number of shares that exist. That's the market's price tag for the entire company, and it's the number that lets you compare two businesses fairly. A $10 stock with 10 billion shares is a $100 billion giant; a $500 stock with 20 million shares is a $10 billion company a tenth its size. You'll hear companies sorted by this figure into large cap, mid cap, and small cap, and as a rule, smaller means bouncier.",
      },
      {
        type: "h2",
        text: "P/E ratio: what you pay for a dollar of profit",
      },
      {
        type: "p",
        text: "The price-to-earnings ratio divides the share price by the company's earnings per share over the past year. A P/E of 20 means you're paying $20 for every $1 of annual profit the company generates. A high P/E says investors expect earnings to grow fast (or that the stock is overpriced); a low one says expectations are modest (or the business is in trouble). Neither is automatically good or bad, and a P/E is most useful compared against similar companies rather than read in isolation. If the field is blank, the company isn't profitable yet, which is worth knowing all by itself.",
      },
      {
        type: "h2",
        text: "Dividend yield: the cash it pays you",
      },
      {
        type: "p",
        text: "Dividend yield is the year's dividends divided by the share price, so a $50 stock paying $1 a year yields 2%. Many growth companies pay nothing, which is a style choice, not a flaw. And a yield that towers over everything around it is usually a warning rather than a gift, for reasons [Dividends, Explained](/learn/investing/dividends-explained) covers.",
      },
      {
        type: "h2",
        text: "52-week range: where today sits",
      },
      {
        type: "p",
        text: "This is the stock's lowest and highest price over the past year, and it exists to give today's price context. A stock near its 52-week high has been climbing; one near its low has had a rough year. Resist the urge to treat either as a signal. \"Near its low\" is not the same as cheap, and \"near its high\" is not the same as finished.",
      },
      {
        type: "h2",
        text: "Volume: how much it's trading",
      },
      {
        type: "p",
        text: "Volume is the number of shares that changed hands today, usually shown next to an average. For big companies it mostly confirms you can buy and sell easily. The interesting case is a spike: volume running several times its average means something happened (earnings, news, a rumor), and it's worth finding out what before you act.",
      },
      {
        type: "h2",
        text: "A worked example",
      },
      {
        type: "p",
        text: "Here's the quote for a fictional company, Maple & Main Coffee Co., ticker MPLM:",
      },
      {
        type: "list",
        items: [
          "**Price:** $42.10",
          "**Market cap:** $21.1 billion",
          "**P/E ratio:** 20.0",
          "**Dividend yield:** 2.0%",
          "**52-week range:** $31.40 – $47.80",
          "**Volume:** 3.1M (avg 2.9M)",
        ],
      },
      {
        type: "p",
        text: "Now read it like a sentence. The $42 price means nothing alone, but the $21 billion market cap says this is a large, established company (about 500 million shares exist, since $42.10 × 500M ≈ $21.1B). A P/E of 20 means buyers are paying $20 per $1 of profit: moderate expectations, neither a moonshot nor a bargain bin. The 2% yield says it shares profits with owners, roughly $0.84 per share a year. Today's price sits in the upper half of its 52-week range, so it's had a decent year without being at a peak. And volume is running right at its average: no news, nothing unusual, just an ordinary Tuesday for a steady company.",
      },
      {
        type: "key",
        text: "That's what a quote can do: describe the company's size, price tag, payout, and recent path in ten seconds. What it can't do is tell you whether the business is worth owning. A quote is the label on the box, not the contents.",
      },
    ],
    related: ["what-is-a-stock", "dividends-explained", "what-is-an-ipo", "markets-tour"],
  },

  {
    slug: "margin-and-short-selling",
    order: 15,
    topicId: "investing",
    title: "Margin and Short Selling: The Sharp Tools",
    dek: "Borrowed money and borrowed shares can multiply gains, multiply losses, and let your broker sell you out at the worst possible moment.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "Margin means investing with borrowed money: every gain and loss is amplified, and interest runs the whole time.",
      "A margin call can force you to sell at the bottom of a crash, with no vote.",
      "Short selling caps your possible gain at 100% while leaving your possible loss unlimited.",
      "These are professional tools. Skipping them costs a long-term investor nothing.",
    ],
    body: [
      {
        type: "p",
        text: "At some point your brokerage will offer to upgrade you to a margin account, usually framed as unlocking your account's full potential. This article explains what you'd actually be unlocking: the two sharpest tools in retail investing, how each one works, and who genuinely needs them. The answer to that last one is almost certainly not you, and that's less an insult than the happy conclusion.",
      },
      {
        type: "h2",
        text: "Buying on margin",
      },
      {
        type: "p",
        text: "Margin is a loan from your broker, secured by your investments, used to buy more investments. Brokers typically let you borrow up to about half of a purchase. Say you have $5,000 and borrow $5,000 more to buy $10,000 of a stock. If it rises 20%, your position is worth $12,000; pay back the $5,000 loan and you have $7,000, a 40% gain on your own money (before interest). Leverage made a good year twice as good.",
      },
      {
        type: "p",
        text: "Now run it backward. The stock falls 20%, the position is worth $8,000, and the loan is still exactly $5,000, because losses never touch the debt. Your equity is $3,000: a 40% loss on the same 20% move. Leverage has no opinion about direction. It doubles whatever happens, and the interest meter runs either way.",
      },
      {
        type: "h2",
        text: "The margin call",
      },
      {
        type: "p",
        text: "Brokers require your own equity to stay above a maintenance level, often somewhere around 25% to 35% of the position. Fall below it and you get a margin call: deposit more cash immediately or the broker sells your holdings to pay itself back. Read that again, because it's the part people miss. The broker can sell your investments without your permission, at whatever the market price is that day. And since prices fall fastest in a panic, margin calls cluster in [crashes](/learn/investing/market-crashes), converting temporary paper losses into permanent real ones at the exact bottom. A cash investor can wait out a bad year; a margined investor may not be given the choice.",
      },
      {
        type: "h2",
        text: "Why brokers keep offering it",
      },
      {
        type: "p",
        text: "Margin loans are one of the most profitable things a brokerage does. The interest rate typically sits far above anything safe pays you, it accrues daily, and the loan is nearly risk-free for the broker because your own portfolio is the collateral and they can liquidate it the moment things get tight. None of that makes margin evil, but it should reframe the pop-up: an upgrade offer is a sales pitch for a loan, not advice about your portfolio.",
      },
      {
        type: "h2",
        text: "Short selling",
      },
      {
        type: "p",
        text: "Short selling is a bet that a stock will fall, and the mechanics are a clever bit of borrowing:",
      },
      {
        type: "steps",
        items: [
          "Borrow shares from your broker (say 100 shares of a $50 stock).",
          "Sell them immediately for $5,000.",
          "Wait, hoping the price drops.",
          "Buy 100 shares back later, ideally cheaper (at $35, that costs $3,500).",
          "Return the borrowed shares and keep the difference: $1,500, minus borrowing fees.",
        ],
      },
      {
        type: "p",
        text: "While you're short, you pay a fee to borrow the shares, and if the company pays a dividend, you owe it to the shares' real owner. The clock works against you the entire time.",
      },
      {
        type: "h2",
        text: "The asymmetry that makes shorting brutal",
      },
      {
        type: "p",
        text: "When you buy a stock, the worst case is losing 100% of what you put in, while the upside is uncapped. Shorting flips that upside down. The best case is the stock going to zero, a 100% gain. The worst case has no floor, because there's no ceiling on a stock price: short at $50 and watch it run to $200, and you've lost triple your maximum possible win. Rising prices can even force shorts to buy back shares, pushing the price higher still, a feedback loop called a short squeeze that has vaporized professional funds. Capped upside, unlimited downside, fees the whole way: that's the deal.",
      },
      {
        type: "h2",
        text: "Who genuinely uses these",
      },
      {
        type: "p",
        text: "Professionals, mostly, and usually not the way headlines suggest. Funds short stocks to *hedge* (offsetting risk elsewhere in a portfolio, not swinging for the fences), market makers use margin as day-to-day plumbing, and short sellers who research frauds occasionally do markets a real service. What these users share is risk limits, rules, and money they can afford to lose. For someone building wealth through steady fund investing, neither tool adds anything: the whole point of the long-term approach is that time and compounding do the work without borrowing. If a bad market can force you to sell, you've handed away the one advantage a patient investor has, and [the costliest investing mistakes](/learn/investing/investing-mistakes) all start exactly there.",
      },
      {
        type: "key",
        text: "Margin and short selling don't make you a more advanced investor; they make your outcomes more extreme. There is no stage of ordinary wealth-building where either one is a required course. Knowing how they work, and politely declining, is the advanced move.",
      },
    ],
    related: ["options-explained", "investing-mistakes", "market-crashes"],
  },

  {
    slug: "what-is-a-reit",
    order: 45,
    topicId: "investing",
    title: "REITs: Real Estate Without the House",
    dek: "How to collect rent checks without a mortgage, a tenant, or a clogged drain, and the tax wrinkle to know before you start.",
    level: "Advanced",
    readMinutes: 5,
    takeaways: [
      "A REIT is a company that owns income-producing real estate; you buy shares of it like a stock.",
      "REITs must pay out at least 90% of their taxable income as dividends, so the yields run high.",
      "A broad REIT index fund beats picking individual REITs for almost everyone.",
      "REIT dividends are usually taxed as ordinary income, which makes retirement accounts their best home.",
    ],
    body: [
      {
        type: "p",
        text: "Real estate is the investment everyone's uncle swears by, and the objection is always the same: you need a down payment, a mortgage, and a willingness to answer a broken-water-heater call. A REIT removes all three. It's the way to own a slice of apartment buildings, warehouses, and cell towers for the price of a single share, collecting your cut of the rent while someone else fixes the plumbing.",
      },
      {
        type: "h2",
        text: "What a REIT actually is",
      },
      {
        type: "p",
        text: "REIT stands for *real estate investment trust*: a company whose business is owning (or financing) income-producing property. One REIT might hold hundreds of apartment complexes; others specialize in warehouses, hospitals, shopping centers, data centers, or the cell towers your phone talks to. The company collects rent from thousands of tenants and passes the profits to its shareholders. Most large REITs trade on stock exchanges, so buying in takes seconds in a brokerage account, and selling out does too. That last part deserves emphasis: it's real estate you can exit on a Tuesday afternoon, something no landlord can say.",
      },
      {
        type: "h2",
        text: "The 90% rule",
      },
      {
        type: "p",
        text: "REITs live under a special deal in the tax code. A company that qualifies pays no corporate income tax on the profits it distributes, and in exchange it *must* pay out at least 90% of its taxable income to shareholders as dividends, every year. That one rule shapes everything about how REITs behave. The payout requirement means yields run well above the typical stock's, which is the main attraction. It also means a REIT keeps little profit to reinvest, so you shouldn't expect the explosive price growth a tech company might deliver. A REIT is built to be an income machine, not a rocket.",
      },
      {
        type: "h2",
        text: "How to actually hold one",
      },
      {
        type: "p",
        text: "You can buy shares of a single REIT the way you'd buy any stock, but that concentrates you in one management team and usually one property type, and judging an office landlord's balance sheet is genuinely hard. The saner route for most people is a REIT *index fund*, which holds a broad basket of them across every sector for one low fee, the same diversification logic covered in [Index Funds, Explained](/learn/investing/index-funds-explained). Worth knowing before you add anything: if you already own a total-market index fund, you own REITs, since they're part of the market. A separate REIT fund is a deliberate extra tilt toward real estate, not a box you're required to check.",
      },
      {
        type: "h2",
        text: "The tax wrinkle",
      },
      {
        type: "p",
        text: "Those generous dividends come with a catch. Most stock dividends are *qualified* and get the gentler long-term capital gains rates, but the bulk of REIT dividends don't qualify: they're taxed as ordinary income, at the same rates as your paycheck. The mechanics live in [Taxes on Your Investments, Explained](/learn/taxes/investment-taxes-101). The practical takeaway is about placement: inside a 401(k) or IRA, the yearly dividend tax never happens, so REITs are one of the classic things to hold in a retirement account rather than a regular brokerage account.",
      },
      {
        type: "h2",
        text: "REIT vs. actually buying property",
      },
      {
        type: "p",
        text: "The comparison people really want is REIT versus rental house, and it's less lopsided than either camp admits. The REIT wins on entry price (one share versus a down payment), diversification (hundreds of buildings versus one), liquidity, and effort. The house wins on leverage (a mortgage lets a small down payment control a large asset), control, and the fact that you can live in it, which no fund can offer. If the choice you're weighing is a home for yourself, that's a different decision with its own math, laid out in [Renting vs. Buying](/learn/home-ownership/renting-vs-buying). If the goal is purely investment exposure to real estate, the REIT fund gets you there with a fraction of the money and none of the 2 a.m. phone calls.",
      },
      {
        type: "key",
        text: "A REIT turns real estate into something you can buy by the share: high, steady dividends by law, instant liquidity, zero landlording. Hold it as a broad fund, keep it in a retirement account if you can, and treat it as a slice of a portfolio rather than the whole plate.",
      },
    ],
    related: ["dividends-explained", "compare-investment-vehicles", "renting-vs-buying"],
  },

  {
    slug: "markets-tour",
    order: 5,
    topicId: "investing",
    title: "The Markets Tour: From Stock Quote to Options",
    dek: "Ten advanced guides in reading order, from decoding a quote page to options, margin, and crashes. None of it is required. All of it kills the mystique.",
    level: "Advanced",
    readMinutes: 4,
    takeaways: [
      "Nothing on this tour is required to invest well; a plain index fund beats most people who master all of it.",
      "Read in order: the quote page and dividends supply the vocabulary that IPOs, options, and margin assume.",
      "Understanding the machinery is fraud protection. Pitches lose their power when nothing sounds mysterious.",
      "Knowing how options work and buying index funds anyway is what most professionals do with their own money.",
    ],
    body: [
      {
        type: "p",
        text: "Start with the honest disclaimer: nothing on this page is required to invest well. A plain [index fund](/learn/investing/index-funds-explained), bought on a schedule and left alone, quietly outperforms most people who can define every term below. So why take the tour? Because the machinery of the market is exactly where hustlers hide. Every \"guaranteed options income\" and \"pre-IPO opportunity\" pitch depends on you not knowing how these parts work, and the mystique dies the moment you do. Ten guides, in the order they build on each other.",
      },
      {
        type: "h2",
        text: "The tour, stop by stop",
      },
      {
        type: "steps",
        items: [
          "**Learn to read a quote page.** [How to Read a Stock Quote](/learn/investing/how-to-read-a-stock-quote) decodes the six numbers that do most of the work on any quote, which gives every later stop a shared vocabulary.",
          "**Follow the cash.** [Dividends, Explained](/learn/investing/dividends-explained) covers the payments some companies send shareholders, including why the tallest yield on the screen is usually a warning rather than a gift.",
          "**Watch a company go public.** [What Is an IPO?](/learn/investing/what-is-an-ipo) walks through how a private business becomes a stock anyone can buy.",
          "**Then look closer at day one.** [Opening Price vs. Offering Price](/learn/investing/opening-vs-offering-price) explains the gap between the price insiders pay and the price you would, which is most of the reason \"getting in on the IPO\" rarely means what people hope.",
          "**Learn what an average return hides.** [How to Calculate an Average Rate of Return](/learn/investing/average-rate-of-return) shows what \"the market averages 10%\" really means, and why almost no individual year looks average.",
          "**See the whole shelf at once.** [Comparing Common Investment Vehicles](/learn/investing/compare-investment-vehicles) lines up stocks, bonds, funds, and the rest by risk, return, and effort, so each product has a place instead of a sales pitch.",
          "**Add the real-estate aisle.** [REITs: Real Estate Without the House](/learn/investing/what-is-a-reit) covers owning buildings by the share instead of by the mortgage.",
          "**Now the sharp tools: options.** [What Are Options?](/learn/investing/options-explained) explains the contracts behind most get-rich-fast screenshots, and why the same leverage that mints those screenshots produces far more quiet zeros.",
          "**And the sharper ones: borrowed money.** [Margin and Short Selling: The Sharp Tools](/learn/investing/margin-and-short-selling) covers the two techniques where losses can exceed what you put in.",
          "**Finish with the machinery under stress.** [Crashes, Corrections, and Bear Markets](/learn/investing/market-crashes) shows what a panic looks like from the inside, and why the people who sell into it are the ones who lock in the loss.",
        ],
      },
      {
        type: "h2",
        text: "How to walk it",
      },
      {
        type: "p",
        text: "In order, ideally. The early stops are pure vocabulary, and the later ones lean on it: options make little sense before you can read a quote, and the IPO pricing gap lands harder once you know what a dividend yield is. But every guide also stands alone, so if a coworker just mentioned covered calls or a cousin is excited about a REIT, jump straight to that stop and come back.",
      },
      {
        type: "p",
        text: "You'll know the tour worked when a pitch like \"we sell options for guaranteed monthly income\" stops sounding impressive. Before, it works because it's opaque. After it, you can pick the sentence apart: guaranteed by whom, paid from what, and what happens in a bad month? Fraudsters need an audience that finds the market mysterious, which is why [investment fraud](/learn/money-safety/investment-fraud) leans so hard on jargon. And if you finish all ten stops and still choose a boring index fund, that isn't a failure of nerve. It's the same conclusion most professionals reach with their own money.",
      },
    ],
    related: ["how-to-read-a-stock-quote", "options-explained", "index-funds-explained"],
  },
];
