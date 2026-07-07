import type { Article } from "./types";

export const investingExtraArticles: Article[] = [
  {
    slug: "etf-vs-mutual-fund",
    order: 70,
    topicId: "investing",
    title: "ETF vs. Mutual Fund vs. Index Fund",
    dek: "Three terms that get thrown around like everyone already knows them. Here's the plain version.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A fund is a basket holding many investments at once.",
      "'Index fund' describes a strategy; ETF and mutual fund describe a structure.",
      "ETFs trade like stocks; mutual funds price once a day.",
      "For most beginners, a low-cost index fund in either form is plenty.",
    ],
    body: [
      {
        type: "p",
        text: "ETF. Mutual fund. Index fund. People toss these around like the meaning is obvious, and if you nod along while quietly having no idea, you're in good company. Once you see how they overlap, the whole thing untangles in a few minutes.",
      },
      {
        type: "h2",
        text: "Start with what a fund is",
      },
      {
        type: "p",
        text: "A fund is a *basket*. Instead of buying one company's stock and hoping it does well, you buy a share of a basket that already holds hundreds or thousands of companies. Your money is spread out, so one bad apple barely dents the whole bunch. That spreading-out is called diversification, and it's one of the smartest things a beginner can do.",
      },
      {
        type: "h2",
        text: "These answer different questions",
      },
      {
        type: "p",
        text: "The confusion comes from treating these as three competing products. They aren't. They describe different *aspects* of a fund:",
      },
      {
        type: "list",
        items: [
          "**Index fund** describes the *strategy*: the fund tries to match a whole market (like 'the 500 biggest U.S. companies') instead of paying someone to pick winners. [Index Funds, Explained](/learn/investing/index-funds-explained) covers why that works so well.",
          "**ETF** and **mutual fund** describe the *structure*: the wrapper the fund comes in and how you buy it.",
        ],
      },
      {
        type: "p",
        text: "So an index fund can come *as* an ETF or *as* a mutual fund. They're not opposites. A fund can be an index fund and an ETF at the same time, because those describe two different things about it.",
      },
      {
        type: "h2",
        text: "ETF vs. mutual fund: the real differences",
      },
      {
        type: "p",
        text: "Once you know they're both just baskets, the differences are small and practical:",
      },
      {
        type: "list",
        items: [
          "**ETFs** trade all day like a stock, so the price moves minute to minute. You can often buy a single share, sometimes even a fraction of one.",
          "**Mutual funds** price once per day, after the market closes. Some have minimum buy-ins, like $1,000 or $3,000 to start.",
        ],
      },
      {
        type: "tip",
        text: "Whichever wrapper you choose, hunt for the *expense ratio*, the yearly fee the fund charges. Lower is better. A difference between 0.03% and 1% sounds tiny but can quietly cost you thousands over a few decades.",
      },
      {
        type: "key",
        text: "For most people just starting out, a low-cost *index* fund (whether it's shaped like an ETF or a mutual fund) is an excellent, boring, dependable choice. You don't need to overthink the wrapper.",
      },
      {
        type: "p",
        text: "Don't let the vocabulary scare you off. Strip away the jargon and you're choosing one simple, diversified basket, then leaving it alone for a long, long time.",
      },
    ],
    related: ["index-funds-explained", "expense-ratios-and-fees", "risk-and-diversification", "start-investing-with-50"],
  },

  {
    slug: "magic-of-compound-interest",
    order: 30,
    topicId: "investing",
    title: "The Magic of Compound Interest",
    dek: "The one math trick that quietly turns small, steady money into a genuinely large pile.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Compounding is your earnings making their own earnings.",
      "Time matters more than the amount you start with.",
      "Starting a few years earlier can beat saving much more later.",
      "Small, consistent amounts add up in ways that feel unfair.",
    ],
    body: [
      {
        type: "p",
        text: "There's a piece of math so powerful that people have called it the eighth wonder of the world. It's not flashy and it's not complicated. It's just this: money can make money, and then *that* money makes money too. It's called compound interest, and it quietly rewards anyone who starts early, even with almost nothing.",
      },
      {
        type: "h2",
        text: "What compounding actually means",
      },
      {
        type: "p",
        text: "Say you invest $100 and it grows 10% in a year. Now you have $110. The next year, you don't just earn on your original $100: you earn on the full $110. Then $121. Then $133. Your *earnings* start earning. A snowball rolling downhill gets bigger faster the longer it rolls, and that's exactly what your money does over time.",
      },
      {
        type: "h2",
        text: "Why starting early beats starting big",
      },
      {
        type: "p",
        text: "This is the part that surprises people. The biggest lever isn't how much you invest — it's how *long* it gets to grow. Consider two people, using a 7% average annual return as a rough historical example (not a promise — markets go up and down):",
      },
      {
        type: "list",
        items: [
          "**Maya** invests $200 a month from age 25 to 35, then stops completely: ten years of contributions, then nothing.",
          "**Leo** waits, then invests $200 a month from age 35 all the way to 65, thirty years straight.",
        ],
      },
      {
        type: "p",
        text: "Maya put in money for ten years; Leo for thirty. Yet because Maya's money had decades longer to compound, she often ends up with *as much or more* than Leo, despite investing a fraction of what he did. Time did the work her wallet didn't have to.",
      },
      {
        type: "tip",
        text: "If you can't invest much yet, don't wait until you can. Even $20 or $50 a month, started now, can outrun a much bigger amount you start years from today. The early dollars are worth the most because they grow the longest.",
      },
      {
        type: "key",
        text: "Compound interest is the rare advantage that doesn't care how much money you have, only how early you begin. Time is the one resource a young person has more of than anyone. Spend it.",
      },
      {
        type: "p",
        text: "You don't need to be rich to make this work. You need to start, stay consistent, and give it the one thing it's hungry for: years.",
      },
    ],
    related: ["saving-vs-investing", "dollar-cost-averaging", "retirement-basics"],
    quiz: [
      {
        question: "What is compound interest, in plain terms?",
        options: [
          "A bonus rate banks pay their longest-standing customers",
          "Your earnings start making earnings of their own",
          "Interest that only kicks in on large accounts",
        ],
        answer: 1,
        explain:
          "When $100 grows to $110, the next year you earn on the full $110, not just the original $100. Like a snowball rolling downhill, it grows faster the longer it rolls.",
      },
      {
        question: "What's the biggest lever in how much compounding builds for you?",
        options: [
          "How much money you start with",
          "How long the money gets to grow",
          "Picking investments that never go down",
        ],
        answer: 1,
        explain:
          "Time matters more than the amount. That's why Maya, who invested for only ten years starting at 25, often ends up with as much or more than Leo, who invested for thirty years starting at 35.",
      },
      {
        question: "You can only spare $20 a month right now. What's the smart move?",
        options: [
          "Wait until you can invest a bigger amount",
          "Keep it in checking until it adds up to something worth investing",
          "Start investing it now and stay consistent",
        ],
        answer: 2,
        explain:
          "Even $20 or $50 a month started now can outrun a much bigger amount started years later. The early dollars are worth the most because they grow the longest.",
      },
    ],
  },

  {
    slug: "dollar-cost-averaging",
    order: 110,
    topicId: "investing",
    title: "Dollar-Cost Averaging",
    dek: "How to invest steadily without the impossible job of guessing what the market does next.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "It means investing a fixed amount on a regular schedule, no matter the price.",
      "It frees you from trying to time the market, which almost nobody can do.",
      "You automatically buy more when prices are low, less when they're high.",
      "Consistency beats cleverness for most everyday investors.",
    ],
    body: [
      {
        type: "p",
        text: "Every new investor eventually asks the same nervous question: *is now a good time to buy?* What if it drops right after? What if I wait and it climbs? Dollar-cost averaging is the calm answer to all of it: a way to invest steadily without ever needing to predict the future.",
      },
      {
        type: "h2",
        text: "What it actually is",
      },
      {
        type: "p",
        text: "Dollar-cost averaging means investing a *fixed amount on a regular schedule* (say $100 on the first of every month) no matter what the market is doing that day. Up, down, sideways: you invest the same amount, on the same day, and you don't agonize over it. That's the whole method.",
      },
      {
        type: "h2",
        text: "Why it works so well",
      },
      {
        type: "p",
        text: "When prices are high, your $100 buys fewer shares. When prices are low, that same $100 buys more. So you're automatically buying *more* when things are cheap and *less* when things are pricey. That's exactly what you'd want to do on purpose, happening without any decision from you.",
      },
      {
        type: "tip",
        text: "Trying to 'time the market' (buy at the bottom, sell at the top) is something even full-time professionals get wrong constantly. Dollar-cost averaging sidesteps that impossible game. You stop guessing and keep showing up.",
      },
      {
        type: "h2",
        text: "It also protects you from yourself",
      },
      {
        type: "p",
        text: "The hardest part of investing isn't math; it's emotion. When markets drop, every instinct screams *stop, sell, run.* When they soar, you want to pile in at the worst moment. A fixed automatic schedule takes the panic and the hype out of your hands entirely. The plan keeps going even when your nerves don't.",
      },
      {
        type: "h2",
        text: "How to set it up",
      },
      {
        type: "steps",
        items: [
          "Pick an amount you can comfortably invest every month, even a small one.",
          "Choose a simple, diversified investment to put it in, like a broad index fund.",
          "Automate it: set the same transfer and purchase to happen on the same day each month.",
          "Then mostly ignore it. Let it run for years without tinkering.",
        ],
      },
      {
        type: "key",
        text: "You don't have to be smart about *when* to invest. You have to be consistent about *that* you invest. Boring, automatic, and steady beats clever and anxious almost every time.",
      },
    ],
    related: ["long-term-strategy", "magic-of-compound-interest", "market-crashes", "start-investing-with-50"],
  },

  {
    slug: "investing-mistakes",
    order: 120,
    topicId: "investing",
    title: "Beginner Investing Mistakes to Avoid",
    dek: "Most early investing mistakes aren't about picking wrong. They come from acting on fear or hype.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Selling in a panic when markets drop locks in your losses.",
      "Chasing hot tips and hype is how beginners get burned.",
      "High fees quietly eat your returns for decades.",
      "The biggest mistake of all is never starting.",
    ],
    body: [
      {
        type: "p",
        text: "Most people imagine the big investing mistake is picking the 'wrong' stock. It almost never is. The real damage usually comes from how we *behave*: selling in a panic, chasing the hot thing, or paying fees we never noticed. Every one of these is avoidable once you see it coming.",
      },
      {
        type: "h2",
        text: "Mistake 1: Panic-selling when the market drops",
      },
      {
        type: "p",
        text: "Markets fall sometimes. It's normal, it's expected, and it always feels terrible. The mistake is selling everything when you see red, because that turns a temporary dip into a permanent loss. If you sell low, you've locked it in. Investors who simply held on through scary drops have, historically, watched things recover and keep climbing.",
      },
      {
        type: "tip",
        text: "A drop in the market isn't your money vanishing — it's the same shares on sale. If you're investing for decades, downturns are when your steady contributions buy the most. The hardest move, doing nothing, is often the right one.",
      },
      {
        type: "h2",
        text: "Mistake 2: Chasing hype and hot tips",
      },
      {
        type: "p",
        text: "A coworker's 'can't-lose' stock. A coin blowing up on social media. The thing that already tripled and 'is just getting started.' By the time something is loud enough for you to hear about it, the easy money is usually gone, and you're at real risk of buying right at the top.",
      },
      {
        type: "list",
        items: [
          "If someone *promises* big returns, that's a warning sign, not a green light.",
          "If you can't explain in one sentence what you're buying, slow down.",
          "Boring and diversified beats exciting and concentrated, almost always.",
        ],
      },
      {
        type: "h2",
        text: "Mistake 3: Ignoring fees",
      },
      {
        type: "p",
        text: "Fees feel tiny, so people wave them off. They shouldn't. A fund charging 1% a year instead of 0.05% can quietly siphon off tens of thousands of dollars over a working lifetime, money that should have been compounding for *you*. Always check what a fund or advisor charges, and lean toward low-cost options.",
      },
      {
        type: "h2",
        text: "Mistake 4: Waiting until you feel 'ready'",
      },
      {
        type: "p",
        text: "This is the big one, and it's the most understandable. If money was tight growing up, or no one taught you any of this, sitting on the sidelines feels safe. But time is the one advantage you can't buy back. Every year you wait is a year your money *didn't* get to grow. You learn by starting small, not by waiting to feel like an expert.",
      },
      {
        type: "key",
        text: "Successful investing is less about being brilliant and more about avoiding the obvious traps: don't panic, don't chase hype, don't overpay in fees, and don't wait forever to begin.",
      },
    ],
    related: ["long-term-strategy", "expense-ratios-and-fees", "risk-and-diversification", "crypto-explained"],
  },

  {
    slug: "retirement-basics",
    order: 20,
    topicId: "investing",
    title: "Retirement, When It's 40 Years Away",
    dek: "Saving for something four decades out feels absurd, until you see how much easier it is now than later.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "Retirement saving is ordinary investing with a very long runway.",
      "Starting in your 20s means you can save far less overall.",
      "The habit matters more than the amount at first.",
      "Special accounts reward you for it; the account map covers them.",
    ],
    body: [
      {
        type: "p",
        text: "Saving for retirement at 25 can feel almost silly. You might be juggling rent, student loans, and helping family, and someone wants you to set aside money for a version of you that won't exist for forty years? Stick with me, because the math here is wild: the further away retirement is, the *easier* it is to fund.",
      },
      {
        type: "h2",
        text: "Retirement saving is just long-runway investing",
      },
      {
        type: "p",
        text: "There's nothing exotic about a 'retirement fund.' It's the same investing you'd do anyway, usually in simple, diversified funds, just aimed at a goal that's decades out. That long runway is a gift, because it gives compound growth an enormous amount of time to work.",
      },
      {
        type: "h2",
        text: "Why starting young is almost cheating",
      },
      {
        type: "p",
        text: "Because of [compounding](/learn/investing/magic-of-compound-interest), the early years carry the most weight. Someone who starts in their twenties can often reach the same finish line saving a *much smaller* amount each month than someone who starts in their forties. Same destination, a fraction of the effort, purely because they started sooner.",
      },
      {
        type: "tip",
        text: "You don't need to fund a whole retirement at 25. You need to *start the habit* at 25. A small amount, automated and left alone, does more than a big amount you scramble to save in a panic at 50.",
      },
      {
        type: "h2",
        text: "The accounts can wait; the start can't",
      },
      {
        type: "p",
        text: "The system offers real tax breaks for retirement saving, through accounts like the 401(k) you get through a job and the IRA you open yourself. You don't need to master them before you begin. When you're ready for the details, [Retirement & Tax-Advantaged Accounts, Explained](/learn/investing/retirement-accounts-explained) is a short map of which account exists for what, and [What Is a 401(k)?](/learn/investing/what-is-a-401k) covers the one most people meet first.",
      },
      {
        type: "p",
        text: "One rule of thumb is worth knowing even before you read any of that: if your job matches 401(k) contributions, putting in enough to capture the full match is usually the first move. It's part of your pay, and the match doubles your money on the spot.",
      },
      {
        type: "key",
        text: "Retirement being far away isn't the problem. It's the advantage: the distance is exactly what lets small, early contributions turn into something large.",
      },
    ],
    related: ["retirement-accounts-explained", "magic-of-compound-interest", "what-is-a-401k", "annuities-explained"],
  },

  {
    slug: "crypto-explained",
    order: 40,
    topicId: "investing",
    title: "A Calm Word on Crypto",
    dek: "No hype, no fear of missing out. Just an honest, risk-first look at what crypto actually is.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "Crypto is a digital asset that can swing wildly in value.",
      "It's speculative, closer to a bet than to a savings plan.",
      "The space is full of scams aimed at newcomers.",
      "Only ever use money you can fully afford to lose.",
    ],
    body: [
      {
        type: "p",
        text: "You've heard the stories: someone who got rich overnight, the friend who 'should have bought years ago.' Crypto comes wrapped in a lot of noise, hype, and fear of missing out. This is an honest, grounded look at what it is and the risks that come with it, so you can decide with clear eyes.",
      },
      {
        type: "h2",
        text: "What crypto actually is",
      },
      {
        type: "p",
        text: "Cryptocurrency is a kind of digital money or digital asset that lives on the internet, not at any bank or government. Bitcoin is the famous one; there are thousands of others. Some people find the technology genuinely fascinating. For our purposes, the important thing is how it tends to *behave* as an investment.",
      },
      {
        type: "h2",
        text: "The volatility is the whole story",
      },
      {
        type: "p",
        text: "This is the part you cannot skip. Crypto prices can swing enormously: it's normal for a coin to drop 30%, 50%, even more in a matter of days, then maybe bounce back, then drop again. A savings account barely moves. Crypto can move like a rollercoaster with no safety bar. That's not a flaw being fixed; that's what it is right now.",
      },
      {
        type: "key",
        text: "Because of those wild swings, crypto is *speculative*, much closer to placing a bet than to a steady, long-term plan. It is the opposite of a safe place to park money you'll need.",
      },
      {
        type: "h2",
        text: "Be honest about the scams",
      },
      {
        type: "p",
        text: "It's painful but necessary to say plainly: the crypto world is crawling with scams, and they often target people who are new, hopeful, or short on cash and looking for a way up. Watch for the classic traps:",
      },
      {
        type: "list",
        items: [
          "Anyone *guaranteeing* profits or 'doubling your money.' That's always a lie.",
          "A stranger online who befriends you and steers you toward an investment.",
          "Pressure to act *right now* before you've had time to think or research.",
          "A coin pumped hard on social media that nobody can actually explain.",
        ],
      },
      {
        type: "h2",
        text: "If you still want to explore it",
      },
      {
        type: "p",
        text: "Curiosity is fine. If you choose to dip in, do it from a place of strength, not desperation. The order matters: cover your needs, build an emergency fund, and invest in boring long-term basics *first*. Only after that should any spare, truly-can-lose money even be on the table.",
      },
      {
        type: "tip",
        text: "The one rule that protects you: *only invest money you can afford to lose completely.* If losing every dollar of it would hurt your rent, your bills, or your family, that money does not belong in crypto. Full stop.",
      },
      {
        type: "p",
        text: "Crypto isn't a shortcut out of a tight spot, and treating it like one is exactly how people get hurt. Build your foundation first. Anything speculative comes last, with money you've already decided you can live without.",
      },
    ],
    related: ["investing-mistakes", "risk-and-diversification", "saving-vs-investing"],
  },

  {
    slug: "building-generational-wealth",
    order: 150,
    topicId: "investing",
    title: "Building Wealth When You're Starting From Zero",
    dek: "If you're the first in your family to try this, here's the honest truth about how wealth actually gets built.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "Wealth is what you own that grows over time, not the size of your paycheck.",
      "Starting from zero is hard, but it's absolutely possible.",
      "The real engine is time plus consistency, not a huge salary.",
      "You can be the person who breaks the cycle for everyone after you.",
    ],
    body: [
      {
        type: "p",
        text: "There's a quiet belief a lot of us grow up with: rich people are just *other* people. Wealth feels like something that belongs to families who already had it, not to someone working a regular job and figuring money out alone. If that's you, the first in your family to even attempt this, read this slowly. The truth is more hopeful, and more honest, than what anyone probably told you.",
      },
      {
        type: "h2",
        text: "Wealth isn't what you earn — it's what you own",
      },
      {
        type: "p",
        text: "People assume wealth means a big paycheck. It doesn't. Plenty of people earn a lot and own almost nothing, and plenty of people with modest incomes quietly build real security.",
      },
      {
        type: "p",
        text: "*Wealth is owning things that grow while you live your life.* Your income covers today: rent, food, the bills. Wealth is the stuff working in the background, like money in a retirement account, investments that compound, eventually maybe a home. Your paycheck feeds you now. Your assets are what feed future-you, and the people who come after you.",
      },
      {
        type: "key",
        text: "Don't measure wealth by your salary. Measure it by what you own that's quietly growing, even if it's small right now, even if it's $50. That's the real scoreboard.",
      },
      {
        type: "h2",
        text: "Let's be honest about the wealth gap",
      },
      {
        type: "p",
        text: "If building wealth feels harder for you than for some people you know, you're not imagining it. For a lot of reasons (history, who got to own land and homes, who could pass things down, who was locked out of those chances), many families never got to build assets, let alone hand them to their kids. So some people inherit a head start, and some people inherit a starting line of zero.",
      },
      {
        type: "p",
        text: "That gap is real, and naming it matters, because here's what it means for *you*: starting from zero is not a personal failing. It's not because your family didn't try hard enough. It's a system you were born into, and understanding that frees you up to stop feeling behind and start building.",
      },
      {
        type: "h2",
        text: "The engine isn't a big salary. It's time and consistency.",
      },
      {
        type: "p",
        text: "This is the part that genuinely changes lives, so hold onto it. You do not need a high income to build wealth. The real engine is small amounts of money, invested early, left alone to grow, over a long time. That's it.",
      },
      {
        type: "p",
        text: "It works because of [compound interest](/learn/investing/magic-of-compound-interest): your money earns growth, and then that growth earns growth too, and over years it snowballs. The magic ingredient isn't the size of what you put in. It's *time*. Someone who invests a little starting in their twenties can end up far ahead of someone who invests much more but waits until their forties.",
      },
      {
        type: "p",
        text: "So if you're young and broke and feel like you've missed the boat: you haven't. Time is the one thing money can't buy back later, and right now you have more of it than anyone.",
      },
      {
        type: "h2",
        text: "How this actually looks, day to day",
      },
      {
        type: "steps",
        items: [
          "Cover your needs and build a small emergency cushion first. Wealth is built on stable ground, not on top of a crisis.",
          "Start investing something, even a tiny amount. [Starting with $50](/learn/investing/start-investing-with-50) is enough; the habit matters more than the size.",
          "Automate it, so a fixed amount moves on its own every payday and willpower never enters the picture.",
          "Then mostly leave it alone, add to it when you can, and let time and compounding do the heavy lifting.",
        ],
      },
      {
        type: "tip",
        text: "Don't wait until you 'have enough' to start; that day can feel like it never comes. A small amount invested consistently, starting now, beats a big amount you keep promising you'll get to later.",
      },
      {
        type: "h2",
        text: "You're building for more than yourself",
      },
      {
        type: "p",
        text: "Here's the part that makes the slow, boring work worth it. When you build wealth as the first person in your family to do it, you're not just helping yourself. You're changing what's *normal* for everyone who comes after you: a younger sibling, a future kid, a cousin watching how you do it.",
      },
      {
        type: "p",
        text: "The head start you never got, you can become. Not overnight, not with one lucky break, but steadily, with small consistent moves that compound for decades. That's how cycles break: not in a single dramatic moment, but in a thousand quiet, deliberate ones.",
      },
      {
        type: "key",
        text: "You don't need to be rich to start building wealth. You need to start, stay consistent, and give it time. The person who breaks the cycle is someone who began, and that person can be you.",
      },
      {
        type: "p",
        text: "One honest note: this is general education to help you understand how wealth-building works, not personalized advice for your exact situation. As your money grows, it's worth learning more and, when it makes sense, talking to a trustworthy professional.",
      },
    ],
    related: ["magic-of-compound-interest", "saving-vs-investing", "start-investing-with-50"],
  },

  {
    slug: "how-to-pick-a-brokerage",
    order: 15,
    topicId: "investing",
    title: "How to Pick a Brokerage",
    dek: "Trades are free everywhere now, so the real differences are elsewhere. What to compare, and why boring names win.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Nearly every major brokerage now charges $0 commissions and $0 minimums, so price isn't the comparison anymore.",
      "Compare fractional shares, account types, and fund lineups instead.",
      "Some apps are designed to make you trade more, which is good for them and bad for you.",
      "The big, boring names are genuinely fine. Picking one is not a high-stakes decision.",
    ],
    body: [
      {
        type: "p",
        text: "Plenty of people stall for months on one question: *which brokerage should I use?* It feels like a high-stakes choice, the kind you could get badly wrong. Some relief up front: this decision used to matter a lot, and it mostly doesn't anymore. The major brokerages have converged so much that the realistic worst case is opening an account somewhere perfectly good instead of somewhere marginally better.",
      },
      {
        type: "h2",
        text: "The old comparison is dead",
      },
      {
        type: "p",
        text: "Brokerages used to compete on commissions, the fee charged per trade. That war ended: at essentially every major brokerage, buying and selling stocks and ETFs now costs $0, and account minimums are gone too. So any comparison chart built around trading costs is a relic. The differences that remain are smaller and quieter.",
      },
      {
        type: "h2",
        text: "What actually differs now",
      },
      {
        type: "list",
        items: [
          "**Fractional shares.** The ability to buy $10 of a fund whose shares cost $500. Most big brokerages offer this, but check, because it's what lets a small, steady contribution get fully invested every time.",
          "**Account types.** You'll want a place that offers a Roth IRA alongside a regular brokerage account, so you don't have to move later. All the big names do.",
          "**Their own cheap funds.** Several major brokerages run excellent index funds with rock-bottom expense ratios that are cheapest (or exclusive) on their own platform.",
          "**Cash handling and small print.** What interest your uninvested cash earns, and whether there are fees for things like paper statements or transferring your account out.",
        ],
      },
      {
        type: "h2",
        text: "Watch how the app treats you",
      },
      {
        type: "p",
        text: "One difference that doesn't show up in any comparison table: some trading apps are built like games. Push alerts about hot stocks, lists of the day's biggest movers, celebration animations when you trade. That design isn't an accident. Even with $0 commissions, brokerages earn money when you trade, partly through *payment for order flow*, where market-making firms pay the broker to route your orders their way. More taps means more revenue for them, and [more trading is reliably worse for you](/learn/investing/investing-mistakes). A good sign is an app that makes automatic investing easy and day-trading unexciting.",
      },
      {
        type: "h2",
        text: "The boring names are fine",
      },
      {
        type: "p",
        text: "Fidelity, Schwab, and Vanguard are the standard answers for a reason: decades of history, $0 commissions and minimums, fractional investing, full account lineups, and their own ultra-cheap index funds. Accounts at legitimate brokerages also carry SIPC protection, which covers you if the brokerage itself fails (though not against your investments losing value; nothing covers that). You do not need a hot new app to invest well, and you should be suspicious of any platform whose main selling point is excitement.",
      },
      {
        type: "steps",
        items: [
          "Pick one established brokerage. Flip a coin between the big names if you have to; it matters that little.",
          "Open the account type that fits your goal, walked through in [Opening Your First Account](/learn/investing/opening-first-account).",
          "Set up an automatic monthly transfer from your bank, even a small one.",
          "Buy a broad, low-cost index fund with it, and let the app's notifications stay ignored.",
        ],
      },
      {
        type: "key",
        text: "The brokerage is the store, not the groceries. Once you're buying low-cost diversified funds on a schedule, which store you're standing in barely changes the outcome. Pick a solid one and move on to the decisions that count.",
      },
    ],
    related: ["opening-first-account", "start-investing-with-50", "robo-advisors"],
  },
];
