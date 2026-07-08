import type { Article } from "./types";

export const investingArticles: Article[] = [
  {
    slug: "what-is-a-stock",
    order: 10,
    topicId: "investing",
    title: "What a Stock Actually Is",
    dek: "Owning stock means owning a tiny slice of a real company. Here's what that really means.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A stock is a small piece of ownership in a company.",
      "Share prices rise and fall; that's normal.",
      "You make money when a share grows in value or pays a dividend.",
      "You don't need to pick winners to invest.",
    ],
    body: [
      {
        type: "p",
        text: "The word *stock* sounds like it belongs to people in suits yelling on a trading floor. It isn't. A stock is a small piece of ownership in a company, and once you see it that way, a lot of the mystery falls away.",
      },
      {
        type: "p",
        text: "If investing has always felt like it's for other people, this is a good place to start. You don't need a finance degree or a pile of money. You need to understand what you're buying.",
      },
      {
        type: "h2",
        text: "Owning a slice of a company",
      },
      {
        type: "p",
        text: "When a company wants to raise money, it can sell off small pieces of itself to the public. Each piece is a share of stock. Buy one, and you own a tiny part of that business: its products, its profits, its future. If thousands of people each own a few shares, together they own the whole company.",
      },
      {
        type: "p",
        text: "Imagine a pizza shop split into a million slices of paper ownership. Buy 100 of them and you own a hundred-millionth of the shop. It's a small stake, but it's real.",
      },
      {
        type: "h2",
        text: "Why prices go up and down",
      },
      {
        type: "p",
        text: "A share's price reflects what people are willing to pay for that slice right now. When a company looks like it's growing, more people want in, and the price rises. When it stumbles or the whole market gets nervous, prices fall. This bouncing around is normal. It's the cost of admission, not a sign something is broken.",
      },
      {
        type: "key",
        text: "Prices dropping doesn't mean you did something wrong. Over short stretches, stocks always wobble. The point of investing is the long stretch, where the wobbles tend to smooth out.",
      },
      {
        type: "h2",
        text: "How a stock makes you money",
      },
      {
        type: "p",
        text: "There are two ways a share can pay off. The first is growth: you buy a share, the company grows over the years, and the share becomes worth more than you paid. The second is a dividend, a small cash payment some companies make to owners out of their profits, usually a few times a year.",
      },
      {
        type: "tip",
        text: "You don't have to pick individual companies to own stock. Most beginners get their stock through a single [index fund](/learn/investing/index-funds-explained) that holds hundreds of companies at once, which spreads the risk around.",
      },
      {
        type: "p",
        text: "That's all a stock is: a small claim on a real business and its future. You don't need to predict which company will win. When you invest, you're becoming a part-owner of the companies people use every day.",
      },
    ],
    related: ["saving-vs-investing", "index-funds-explained", "dividends-explained", "rsus-and-espp"],
  },

  {
    slug: "saving-vs-investing",
    order: 20,
    topicId: "investing",
    title: "Saving vs. Investing",
    dek: "They do different jobs, and matching the right one to the right goal makes both easier.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Saving keeps money safe and ready; investing grows it over time.",
      "Save first, then invest what you won't need soon.",
      "Investing carries risk, but time is on your side.",
      "You can do both at once. They serve different goals.",
    ],
    body: [
      {
        type: "p",
        text: "People use *saving* and *investing* like they mean the same thing. They don't. Both are smart, but they do different jobs, and matching the right one to the right goal is half the battle.",
      },
      {
        type: "h2",
        text: "What saving is for",
      },
      {
        type: "p",
        text: "Saving is money you keep safe and easy to reach. It sits in the bank, doesn't lose value, and is ready the moment you need it. That makes it perfect for short-term goals and surprises: an emergency fund, next year's car repair, a trip you're planning. The trade-off is that it grows slowly. A [high-yield savings account](/learn/investing/high-yield-savings-account) helps it earn a little interest, but it won't make you wealthy.",
      },
      {
        type: "h2",
        text: "What investing is for",
      },
      {
        type: "p",
        text: "Investing is money you put to work for the long haul, usually five years or more. When you buy a stock, a bond, or a fund, you're aiming for real growth over time. (A [bond](/learn/investing/bonds-explained) is a loan you make to a company or government; it's generally steadier than a stock.) The catch is that investments can fall in value, especially in the short term. That risk is exactly why they can grow more than savings over many years.",
      },
      {
        type: "key",
        text: "Simple rule of thumb: money you'll need within a few years belongs in savings. Money you won't touch for many years can be invested, where it has time to grow through the ups and downs.",
      },
      {
        type: "h2",
        text: "Why time changes everything",
      },
      {
        type: "p",
        text: "Investing rewards patience because of [compound interest](/learn/investing/magic-of-compound-interest): your money earns returns, and then those returns earn returns too. Left alone for decades, even modest amounts can snowball. That snowball needs time to roll, which is why investing is for long-term goals and saving is for the near ones.",
      },
      {
        type: "tip",
        text: "You don't have to choose one or the other. A common order is: build a small emergency fund in savings first, then start investing for the future while keeping that cushion intact.",
      },
      {
        type: "h2",
        text: "Doing both",
      },
      {
        type: "p",
        text: "The healthiest money setup usually has both jobs covered. Savings keeps you steady when life surprises you, so you're never forced to sell investments at a bad moment. Investing quietly grows the money you won't need for a long time. Together, they cover today and build toward tomorrow.",
      },
    ],
    related: ["what-is-a-stock", "opening-first-account", "risk-and-diversification"],
  },

  {
    slug: "opening-first-account",
    order: 40,
    topicId: "investing",
    title: "Opening Your First Account",
    dek: "The hardest part of investing is starting. Here's exactly how to open an account and put in your first dollar.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "You invest through an account, not by buying stocks directly.",
      "Retirement accounts come with valuable tax perks.",
      "If your job offers a match, that's free money worth grabbing.",
      "Opening an account is quick, and starting small is fine.",
    ],
    body: [
      {
        type: "p",
        text: "One fact makes investing far less scary: you don't buy investments out of thin air. You open an account, put money in it, and use that account to buy what you want. Picking the right type of account is most of the decision.",
      },
      {
        type: "h2",
        text: "The account is the container",
      },
      {
        type: "p",
        text: "An investing account is a basket that holds your investments. The money you add can sit as cash until you use it to buy a stock or a fund. Different baskets come with different rules and tax perks, so it's worth knowing the main three.",
      },
      {
        type: "h2",
        text: "The three accounts worth knowing",
      },
      {
        type: "list",
        items: [
          "**401(k):** a retirement account offered through a job. Money often comes straight out of your paycheck before taxes, and many employers add free matching money on top.",
          "**Roth IRA:** a retirement account you open yourself. You put in money you've already paid tax on, and qualified withdrawals later in life come out tax-free.",
          "**Brokerage account:** a flexible account with no special tax perks and no rules about when you can take money out. Good for goals beyond retirement.",
        ],
      },
      {
        type: "p",
        text: "Retirement accounts let you add money only up to a yearly limit: for 2026, that's **$7,500** for an IRA or Roth IRA, and **$24,500** for a 401(k) through work. (Both rise a bit most years.) A regular brokerage account has no such cap. If you want a fuller tour of the retirement options, [Retirement & Tax-Advantaged Accounts, Explained](/learn/investing/retirement-accounts-explained) maps them out.",
      },
      {
        type: "key",
        text: "If your job offers to match part of your 401(k), contribute at least enough to get the full match. It's part of your pay you'd otherwise leave behind, and the closest thing to free money you'll find.",
      },
      {
        type: "h2",
        text: "How to actually open one",
      },
      {
        type: "steps",
        items: [
          "Pick where it lives. For a 401(k), ask your employer. For a Roth IRA or brokerage account, choose a reputable online brokerage.",
          "Sign up online. You'll enter your name, address, Social Security number, and bank details; it usually takes about 15 minutes.",
          "Link your bank and move in your first deposit, even if it's small.",
          "Choose an investment to buy with that cash. Many beginners start with a single broad index fund.",
        ],
      },
      {
        type: "tip",
        text: "Your money isn't invested just because it's in the account. Cash sitting there does nothing until you use it to buy something. Don't forget that last step.",
      },
      {
        type: "p",
        text: "Starting small isn't just okay; it's smart. Open the account, get one dollar invested, and you've already done the part most people put off for years. You can always add more once it feels familiar.",
      },
    ],
    related: ["saving-vs-investing", "how-to-pick-a-brokerage", "index-funds-explained", "start-investing-with-50"],
  },

  {
    slug: "index-funds-explained",
    order: 60,
    topicId: "investing",
    title: "Index Funds, Explained",
    dek: "One simple investment that holds hundreds of companies at once, and why so many people swear by it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "An index fund holds many companies in one investment.",
      "It spreads your risk automatically.",
      "Low fees mean more of your money stays invested.",
      "It's a hands-off way to match the whole market.",
    ],
    body: [
      {
        type: "p",
        text: "If you only ever learn about one type of investment, make it the index fund. It's the tool that lets ordinary people invest sensibly without picking stocks, watching the news, or guessing what comes next.",
      },
      {
        type: "h2",
        text: "What an index fund holds",
      },
      {
        type: "p",
        text: "An index fund is a single investment that holds a little of many companies at once. Instead of buying one company's stock and hoping it does well, you buy a fund that owns hundreds or thousands of companies together. An *index* is a list that tracks a slice of the market (for example, 500 large U.S. companies). A fund built to match that list rises and falls along with the whole group.",
      },
      {
        type: "p",
        text: "So when you put $100 into one of these funds, that money gets spread in tiny amounts across every company in the index. You instantly own a sliver of all of them.",
      },
      {
        type: "h2",
        text: "Why spreading out matters",
      },
      {
        type: "p",
        text: "Owning hundreds of companies gives you [diversification](/learn/investing/risk-and-diversification): your money is spread out, so one company having a terrible year barely dents you. If you'd bet everything on a single stock and it crashed, you'd feel it badly. In an index fund, that one company is a drop in a very large bucket.",
      },
      {
        type: "key",
        text: "Diversification is the closest thing investing has to a free lunch. You lower your risk without giving up much potential growth, simply by not putting all your money in one place.",
      },
      {
        type: "h2",
        text: "Why fees deserve your attention",
      },
      {
        type: "p",
        text: "Every fund charges [a small yearly fee](/learn/investing/expense-ratios-and-fees), taken as a percentage of what you have invested. It sounds tiny, but over decades it adds up to real money. Index funds are popular partly because their fees are usually very low: they follow a list instead of paying experts to pick stocks. Lower fees mean more of your money stays yours and keeps [compounding](/learn/investing/magic-of-compound-interest).",
      },
      {
        type: "tip",
        text: "When comparing funds, look for the *expense ratio*. A difference between 0.03% and 0.75% may look trivial, but on a growing balance over 30 years it can cost you thousands.",
      },
      {
        type: "h2",
        text: "Hands-off by design",
      },
      {
        type: "p",
        text: "The quiet appeal of an index fund is that it asks almost nothing of you. You're not trying to beat the market, just match it, and even the pros have historically struggled to do better than that. You buy in, keep adding over time, and let it ride. For most people building wealth slowly, that simplicity is the whole point.",
      },
    ],
    related: ["what-is-a-stock", "etf-vs-mutual-fund", "risk-and-diversification"],
  },

  {
    slug: "risk-and-diversification",
    order: 100,
    topicId: "investing",
    title: "Risk, Diversification, and Time",
    dek: "Risk in investing is something to manage, not something to flee. Here's how the pieces fit together.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Risk and potential reward go hand in hand.",
      "Diversification softens the blow of any single loss.",
      "A longer time horizon lets you take more risk safely.",
      "Asset allocation is how you set your risk on purpose.",
    ],
    body: [
      {
        type: "p",
        text: "Risk is the word that scares people away from investing. But risk is a dial you can set, not a monster to run from. Understanding three ideas (risk, diversification, and time) turns investing from a gamble into a plan.",
      },
      {
        type: "h2",
        text: "Risk and reward travel together",
      },
      {
        type: "p",
        text: "Every investment trades risk for potential reward. Safe choices like a savings account barely move, so they barely grow. Stocks can swing hard, which is uncomfortable, but that same movement is why they've grown more over long periods. You can't get strong long-term growth without accepting some bumps along the way. The two come as a pair.",
      },
      {
        type: "h2",
        text: "Diversification spreads the risk",
      },
      {
        type: "p",
        text: "You can't erase risk, but you can spread it out. Diversification means holding many different investments so no single one can sink you. Mix in different companies, different industries, even [bonds](/learn/investing/bonds-explained) alongside your stocks, and a bad result in one corner gets cushioned by the others. This is why a broad [index fund](/learn/investing/index-funds-explained) feels steadier than a single stock: the losses and gains average out.",
      },
      {
        type: "key",
        text: "Diversification doesn't promise you'll never lose money. It promises you won't lose everything because of one bad bet. That difference is what keeps people invested long enough to succeed.",
      },
      {
        type: "h2",
        text: "Time is your secret weapon",
      },
      {
        type: "p",
        text: "The longer you plan to stay invested, the more risk you can comfortably take. If you won't touch the money for 30 years, a rough year barely matters; there's plenty of time to recover and keep growing through [compound interest](/learn/investing/magic-of-compound-interest). If you need the money next year, a downturn could force you to sell at a loss. Your time horizon, more than anything, should shape how much risk you take on.",
      },
      {
        type: "tip",
        text: "When the market drops and you have decades to go, that's often the worst time to sell and the best time to keep buying. Selling in a panic locks in a loss that might have recovered.",
      },
      {
        type: "h2",
        text: "Setting your risk on purpose",
      },
      {
        type: "p",
        text: "The way you dial in risk is called asset allocation — how you divide your money among types of investments, mainly stocks and bonds. More stocks means more growth potential and more ups and downs. More bonds means a steadier ride with smaller gains. A younger investor with time to spare often leans toward stocks; someone close to needing the money usually shifts toward bonds.",
      },
      {
        type: "p",
        text: "There's no single right mix, only the one that fits your goals and lets you sleep at night. Pick an allocation you can stick with through a scary headline, and you've already beaten most of the danger.",
      },
    ],
    related: ["index-funds-explained", "bonds-explained", "long-term-strategy", "rebalancing-your-portfolio"],
  },

  {
    slug: "long-term-strategy",
    order: 30,
    topicId: "investing",
    title: "Building a Real Long-Term Strategy",
    dek: "The most powerful investing strategy is also the most boring: invest steadily, keep costs low, and wait.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "A good strategy is simple, automatic, and consistent.",
      "Investing the same amount on a schedule beats timing the market.",
      "Compound growth rewards the patient over decades.",
      "Doing less, more consistently, usually wins.",
    ],
    body: [
      {
        type: "p",
        text: "Once you understand stocks, accounts, and risk, the last piece is tying it together into a strategy you'll actually follow for decades. The strategy that works best for most people is refreshingly dull: no hot tips, no constant trading, just a few solid habits repeated for a long time.",
      },
      {
        type: "h2",
        text: "Start with the boring foundation",
      },
      {
        type: "p",
        text: "A strong long-term plan usually rests on a few simple choices: invest in broadly diversified, low-cost funds; spread your money sensibly with an asset allocation that fits your timeline; and use accounts with tax perks, like a 401(k) or Roth IRA, before a plain brokerage account. None of this is flashy. All of it works.",
      },
      {
        type: "h2",
        text: "Invest on autopilot",
      },
      {
        type: "p",
        text: "The single most reliable habit is investing a fixed amount on a regular schedule (say, every payday) no matter what the market is doing. This is called [dollar-cost averaging](/learn/investing/dollar-cost-averaging). Over time it smooths out your average price and takes the guesswork out of *when* to invest.",
      },
      {
        type: "tip",
        text: "Automate the transfer so it happens before you can second-guess it. Money invested on a schedule you never see is money you won't be tempted to spend or hold back during a scary week.",
      },
      {
        type: "h2",
        text: "Stop trying to time the market",
      },
      {
        type: "p",
        text: "It's tempting to wait for the 'perfect' moment to buy or to sell before a crash. But even professionals rarely guess right, and missing a handful of the market's best days can wreck a decade of returns. Time *in* the market beats timing the market. Staying invested through the ups and downs is what lets your money compound.",
      },
      {
        type: "key",
        text: "The biggest threat to your returns usually isn't the market itself but your own urge to react to it. A plan you stick to through the scary times will almost always beat a clever one you abandon.",
      },
      {
        type: "h2",
        text: "Let compounding do the heavy lifting",
      },
      {
        type: "p",
        text: "Here's why patience pays. Imagine you invest $200 a month and earn a 7% average annual return (roughly the long-run historical average for a broad stock market, used here only as an illustration, not a promise). After 10 years you'd have far more than you put in, and after 30 years the growth dwarfs your contributions entirely. That gap is compound interest at work: your returns start earning their own returns.",
      },
      {
        type: "p",
        text: "This is also why starting early matters more than starting big. A small amount invested in your twenties has decades to compound, often outpacing a much larger amount started later. The most valuable thing you can give your money is time.",
      },
      {
        type: "h2",
        text: "Then leave it alone",
      },
      {
        type: "p",
        text: "Once your plan is running, the hardest work is doing nothing. Check in once or twice a year to make sure your allocation still fits, nudge it back if it's drifted, and otherwise let it ride. Investing rewards patience over activity. Set it up well, keep adding, and let time and compounding carry the load.",
      },
    ],
    related: ["index-funds-explained", "risk-and-diversification", "dollar-cost-averaging", "market-crashes"],
  },
  {
    slug: "start-investing-with-50",
    order: 50,
    topicId: "investing",
    title: "How to Start Investing With $50",
    dek: "You don't need thousands, and you don't need a finance degree. You need to start, and time does the rest.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Fractional shares let you start with a few dollars.",
      "One broad index fund is a perfectly good first investment.",
      "Automate a small amount and let compounding work.",
      "Starting small now beats starting big 'someday.'",
    ],
    body: [
      {
        type: "p",
        text: "The biggest myth about investing is that it's for people who already have money. It used to be a little true: minimums were high and fees ate small balances alive. Not anymore. Today you can start with $50, even $5, and the hardest part is beginning.",
      },
      {
        type: "h2",
        text: "Why small amounts work now",
      },
      {
        type: "p",
        text: "Two things changed. First, most apps and brokerages dropped their minimums to $0 and made trades free. Second, fractional shares: instead of needing $300 for one share of something, you can buy a $10 sliver of it. So your $50 can actually be invested, not just sit there.",
      },
      {
        type: "h2",
        text: "A simple first move",
      },
      {
        type: "steps",
        items: [
          "Open a Roth IRA or a regular brokerage account. Many have no minimum and take a few minutes.",
          "Put your money into one broad index fund, which spreads it across hundreds of companies at once.",
          "Set up a small automatic transfer, even $25 a month, so investing happens without you thinking about it.",
          "Then leave it alone. Checking it daily only makes it harder.",
        ],
      },
      {
        type: "tip",
        text: "Buying a little every month, no matter what the market's doing, is called [dollar-cost averaging](/learn/investing/dollar-cost-averaging). It quietly saves you from the impossible job of guessing the perfect time to buy.",
      },
      {
        type: "key",
        text: "The real mistake isn't picking the 'wrong' fund. It's waiting until you 'have enough.' Time in the market is the ingredient you can't buy later, so start with what you have now.",
      },
      {
        type: "p",
        text: "Skip the noise: the hot stock tips, the crypto your cousin swears by, the day-trading apps that feel like a casino. A boring index fund and a few decades is how ordinary people build wealth. Curious what $50 a month could become? Run it through the Compound Interest calculator and watch.",
      },
    ],
    related: ["opening-first-account", "what-is-a-stock", "index-funds-explained", "robo-advisors"],
  },
];
