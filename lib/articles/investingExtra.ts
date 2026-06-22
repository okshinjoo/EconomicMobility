import type { Article } from "./types";

export const investingExtraArticles: Article[] = [
  {
    slug: "roth-ira-explained",
    order: 120,
    topicId: "investing",
    title: "The Roth IRA, Explained",
    dek: "A quiet little account that might be the closest thing to a superpower a young person has.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A Roth IRA holds investments — it's not an investment itself.",
      "You put in money you've already paid tax on, and the growth comes out tax-free.",
      "Starting young is the whole trick, because time does the heavy lifting.",
      "You can open one yourself, with a small amount, today.",
    ],
    body: [
      {
        type: "p",
        text: "Here's a sentence that sounds too good to be true: there's an account where your money can grow for decades, and when you finally take it out in retirement, you owe *zero* tax on all that growth. That account is a Roth IRA, and if you're young, it might be the single most powerful tool you've got.",
      },
      {
        type: "p",
        text: "If nobody in your family ever talked about retirement accounts, this can sound like something for other people — people with money managers and golf memberships. It's not. A Roth IRA is for regular people putting away regular amounts. Let's clear it up.",
      },
      {
        type: "h2",
        text: "First, what a Roth IRA actually is",
      },
      {
        type: "p",
        text: "A Roth IRA isn't an investment. It's a *container* — a special account you put investments inside. Think of it like a lunchbox: the lunchbox isn't your lunch, it just holds it and keeps it special. Inside the Roth, you might hold an index fund, for example. The account is the wrapper that gives your money its tax superpower.",
      },
      {
        type: "h2",
        text: "Why the 'tax-free' part is such a big deal",
      },
      {
        type: "p",
        text: "Here's the trade. With a Roth, you put in money you've *already* paid income tax on — so there's no tax break today. In exchange, every dollar of growth on top of that comes out completely tax-free later.",
      },
      {
        type: "p",
        text: "Say you put in $6,000 over a few years, and decades later it has grown to $40,000. That $34,000 of growth? You never pay tax on a cent of it. In a regular investment account, you'd owe tax on those gains. The Roth quietly hands them all to future you.",
      },
      {
        type: "tip",
        text: "A Roth tends to shine for younger people, because you're probably in a lower tax bracket now than you'll be later. You're choosing to pay the tax while it's cheap, then locking in tax-free growth for the long haul.",
      },
      {
        type: "h2",
        text: "How to actually open one",
      },
      {
        type: "p",
        text: "You don't need permission or a special job. You open a Roth IRA yourself through a brokerage — many let you start with very little — and then pick something simple, like a broad index fund, to hold inside it. There's a yearly limit on how much you can add — **$7,500** for 2026 (**$8,600** if you're 50 or older) — but most people starting out are nowhere near it anyway.",
      },
      {
        type: "key",
        text: "A Roth IRA isn't a rich-person thing. It's a young-person thing. The less money and the more time you have, the more this account is built for *you* — start small, start now.",
      },
      {
        type: "p",
        text: "You don't have to understand every rule to begin. Open the account, put in what you can, choose one simple fund, and let time do the part that feels like magic.",
      },
    ],
    related: ["retirement-basics", "magic-of-compound-interest", "index-funds-explained"],
  },

  {
    slug: "401k-and-match",
    order: 100,
    topicId: "investing",
    title: "The 401(k) and the Free Money of a Match",
    dek: "Your job might be offering to hand you free money. A lot of people accidentally say no.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A 401(k) is a retirement account you fund straight from your paycheck.",
      "An employer match is literally free money for retirement.",
      "Not contributing enough to get the full match leaves cash on the table.",
      "It's mostly automatic once you set it up.",
    ],
    body: [
      {
        type: "p",
        text: "Imagine your boss walked over and said, 'For every dollar you save, I'll add one of mine.' You'd take that deal instantly. That deal exists — it's called a 401(k) match — and an astonishing number of people leave it sitting on the table without realizing it.",
      },
      {
        type: "h2",
        text: "What a 401(k) even is",
      },
      {
        type: "p",
        text: "A 401(k) is a retirement account that some employers offer. The money comes out of your paycheck automatically, before you ever see it, and gets invested for the long haul. Because it's automatic, you barely feel it leave — which is exactly what makes it work.",
      },
      {
        type: "p",
        text: "If you're the first in your family navigating an American job with benefits, the paperwork can feel like a foreign language. Push through it once. This is one of the few forms that can quietly make you tens of thousands of dollars richer.",
      },
      {
        type: "h2",
        text: "The match is the whole point",
      },
      {
        type: "p",
        text: "Here's the part to tattoo on your brain. Many employers will *match* what you put in, up to a limit. A common setup looks like this:",
      },
      {
        type: "list",
        items: [
          "You contribute, and your employer adds money on top of yours.",
          "A typical match might be 'dollar for dollar up to 4% of your pay.'",
          "So if you put in 4%, they put in 4% — your savings just doubled, instantly.",
        ],
      },
      {
        type: "p",
        text: "If you earn $40,000 and contribute 4%, that's $1,600 a year from you — and another $1,600 from your employer, every single year, for free. Skipping it is like turning down a raise.",
      },
      {
        type: "tip",
        text: "Find out your company's match and contribute *at least* enough to get all of it. That's usually the highest-priority move in all of investing — there's no other place you get an instant 100% return just for showing up.",
      },
      {
        type: "h2",
        text: "What to do if there's no match (or no 401(k))",
      },
      {
        type: "p",
        text: "Plenty of jobs — especially part-time, gig, or smaller employers — don't offer a 401(k) at all. That's okay. You can open a retirement account on your own, like a Roth IRA, and get many of the same long-term benefits. The account matters less than the habit of putting money in.",
      },
      {
        type: "key",
        text: "If your employer offers a match, getting the full amount comes before almost everything else. It is the closest thing to free money you'll ever be handed — don't leave it behind.",
      },
    ],
    related: ["roth-ira-explained", "retirement-basics", "magic-of-compound-interest"],
  },

  {
    slug: "etf-vs-mutual-fund",
    order: 20,
    topicId: "investing",
    title: "ETF vs. Mutual Fund vs. Index Fund",
    dek: "Three terms that get thrown around like everyone already knows them. Here's the plain version.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A fund is a basket holding many investments at once.",
      "'Index fund' describes a strategy; ETF and mutual fund describe a structure.",
      "ETFs trade like stocks; mutual funds price once a day.",
      "For most beginners, a low-cost index fund — either form — is plenty.",
    ],
    body: [
      {
        type: "p",
        text: "ETF. Mutual fund. Index fund. People toss these around like the meaning is obvious, and if you nod along while quietly having no idea, you're in good company. The good news: once you see how they overlap, the whole thing untangles in about five minutes.",
      },
      {
        type: "h2",
        text: "Start with what a fund is",
      },
      {
        type: "p",
        text: "A fund is just a *basket*. Instead of buying one company's stock and hoping it does well, you buy a share of a basket that already holds hundreds or thousands of companies. Your money is spread out, so one bad apple barely dents the whole bunch. That spreading-out is called diversification, and it's one of the smartest things a beginner can do.",
      },
      {
        type: "h2",
        text: "The key insight: these answer different questions",
      },
      {
        type: "p",
        text: "Here's what trips everyone up. These three words aren't three competing products. They're describing different *aspects* of a fund:",
      },
      {
        type: "list",
        items: [
          "**Index fund** describes the *strategy* — it simply tries to match a whole market (like 'the 500 biggest U.S. companies') instead of paying someone to pick winners.",
          "**ETF** and **mutual fund** describe the *structure* — the wrapper the fund comes in and how you buy it.",
        ],
      },
      {
        type: "p",
        text: "So an index fund can come *as* an ETF or *as* a mutual fund. They're not opposites. A fund can be an index fund and an ETF at the same time — those describe two different things about it.",
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
        text: "Whichever wrapper you choose, hunt for the *expense ratio* — the yearly fee the fund charges. Lower is better. A difference between 0.03% and 1% sounds tiny but can quietly cost you thousands over a few decades.",
      },
      {
        type: "key",
        text: "For most people just starting out, a low-cost *index* fund — whether it's shaped like an ETF or a mutual fund — is a genuinely excellent, boring, dependable choice. You don't need to overthink the wrapper.",
      },
      {
        type: "p",
        text: "Don't let the vocabulary scare you off. Strip away the jargon and you're really choosing one simple, diversified basket — then leaving it alone for a long, long time.",
      },
    ],
    related: ["index-funds-explained", "risk-and-diversification", "start-investing-with-50"],
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
        text: "There's a piece of math so powerful that people have called it the eighth wonder of the world. It's not flashy and it's not complicated. It's just this: money can make money, and then *that* money makes money too. It's called compound interest, and it quietly rewards anyone who starts early — even with almost nothing.",
      },
      {
        type: "h2",
        text: "What compounding actually means",
      },
      {
        type: "p",
        text: "Say you invest $100 and it grows 10% in a year. Now you have $110. The next year, you don't just earn on your original $100 — you earn on the full $110. Then $121. Then $133. Your *earnings* start earning. A snowball rolling downhill gets bigger faster the longer it rolls, and that's exactly what your money does over time.",
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
          "**Maya** invests $200 a month from age 25 to 35, then stops completely — ten years, then nothing.",
          "**Leo** waits, then invests $200 a month from age 35 all the way to 65 — thirty years straight.",
        ],
      },
      {
        type: "p",
        text: "Maya put in money for ten years; Leo for thirty. Yet because Maya's money had decades longer to compound, she often ends up with *as much or more* than Leo — despite investing a fraction of what he did. Time did the work her wallet didn't have to.",
      },
      {
        type: "tip",
        text: "If you can't invest much yet, don't wait until you can. Even $20 or $50 a month, started now, can outrun a much bigger amount you start years from today. The early dollars are worth the most because they grow the longest.",
      },
      {
        type: "key",
        text: "Compound interest is the rare advantage that doesn't care how much money you have — only how early you begin. Time is the one resource a young person has more of than anyone. Spend it.",
      },
      {
        type: "p",
        text: "You don't need to be rich to make this work. You just need to start, stay consistent, and give it the one thing it's hungry for: years.",
      },
    ],
    related: ["roth-ira-explained", "dollar-cost-averaging", "saving-vs-investing"],
  },

  {
    slug: "dollar-cost-averaging",
    order: 40,
    topicId: "investing",
    title: "Dollar-Cost Averaging",
    dek: "How to invest steadily without the impossible job of guessing what the market does next.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "It means investing a fixed amount on a regular schedule, no matter the price.",
      "It frees you from trying to time the market — which almost nobody can do.",
      "You automatically buy more when prices are low, less when they're high.",
      "Consistency beats cleverness for most everyday investors.",
    ],
    body: [
      {
        type: "p",
        text: "Every new investor eventually asks the same nervous question: *is now a good time to buy?* What if it drops right after? What if I wait and it climbs? Dollar-cost averaging is the calm answer to all of it — a way to invest steadily without ever needing to predict the future.",
      },
      {
        type: "h2",
        text: "What it actually is",
      },
      {
        type: "p",
        text: "Dollar-cost averaging means investing a *fixed amount on a regular schedule* — say $100 on the first of every month — no matter what the market is doing that day. Up, down, sideways: you invest the same amount, on the same day, and you don't agonize over it. That's the whole method.",
      },
      {
        type: "h2",
        text: "Why it works so well",
      },
      {
        type: "p",
        text: "Here's the quiet genius of it. When prices are high, your $100 buys fewer shares. When prices are low, that same $100 buys more. So you're automatically buying *more* when things are cheap and *less* when things are pricey — exactly what you'd want to do on purpose, happening without any decision from you.",
      },
      {
        type: "tip",
        text: "Trying to 'time the market' — buy at the bottom, sell at the top — is something even full-time professionals get wrong constantly. Dollar-cost averaging quietly sidesteps that whole impossible game. You stop guessing and just keep showing up.",
      },
      {
        type: "h2",
        text: "It also protects you from yourself",
      },
      {
        type: "p",
        text: "The hardest part of investing isn't math — it's emotion. When markets drop, every instinct screams *stop, sell, run.* When they soar, you want to pile in at the worst moment. A fixed automatic schedule takes the panic and the hype out of your hands entirely. The plan keeps going even when your nerves don't.",
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
          "Automate it — set the same transfer and purchase to happen on the same day each month.",
          "Then mostly ignore it. Let it run for years without tinkering.",
        ],
      },
      {
        type: "key",
        text: "You don't have to be smart about *when* to invest. You just have to be consistent about *that* you invest. Boring, automatic, and steady beats clever and anxious almost every time.",
      },
    ],
    related: ["long-term-strategy", "magic-of-compound-interest", "start-investing-with-50"],
  },

  {
    slug: "investing-mistakes",
    order: 50,
    topicId: "investing",
    title: "Beginner Investing Mistakes to Avoid",
    dek: "Most early investing mistakes aren't about picking wrong — they're about acting on fear or hype.",
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
        text: "Most people imagine the big investing mistake is picking the 'wrong' stock. It almost never is. The real damage usually comes from how we *behave* — selling in a panic, chasing the hot thing, or paying fees we never noticed. The good news? Every one of these is avoidable once you see it coming.",
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
        text: "A coworker's 'can't-lose' stock. A coin blowing up on social media. The thing that already tripled and 'is just getting started.' By the time something is loud enough for you to hear about it, the easy money is usually gone — and you're at real risk of buying right at the top.",
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
        text: "Fees feel tiny, so people wave them off. They shouldn't. A fund charging 1% a year instead of 0.05% can quietly siphon off tens of thousands of dollars over a working lifetime — money that should have been compounding for *you*. Always check what a fund or advisor charges, and lean toward low-cost options.",
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
        text: "Successful investing is less about being brilliant and more about avoiding the obvious traps: don't panic, don't chase hype, don't overpay in fees, and *don't* wait forever to begin.",
      },
    ],
    related: ["long-term-strategy", "risk-and-diversification", "crypto-explained"],
  },

  {
    slug: "retirement-basics",
    order: 110,
    topicId: "investing",
    title: "Retirement, When It's 40 Years Away",
    dek: "Saving for something four decades out feels absurd — until you see how much easier it is now than later.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Retirement saving is just investing with a very long runway.",
      "Special accounts give you tax breaks for doing it.",
      "Starting in your 20s means you can save far less overall.",
      "A simple order of moves keeps it from feeling overwhelming.",
    ],
    body: [
      {
        type: "p",
        text: "Saving for retirement at 25 can feel almost silly. You might be juggling rent, student loans, and helping family — and someone wants you to set aside money for a version of you that won't exist for forty years? Stick with me, because the math here is wild: the further away retirement is, the *easier* it is to fund.",
      },
      {
        type: "h2",
        text: "Retirement saving is just long-runway investing",
      },
      {
        type: "p",
        text: "There's nothing exotic about a 'retirement fund.' It's the same investing you'd do anyway — usually in simple, diversified funds — just aimed at a goal that's decades out. That long runway is a gift, because it gives compound growth an enormous amount of time to work.",
      },
      {
        type: "h2",
        text: "Why starting young is almost cheating",
      },
      {
        type: "p",
        text: "Because of compounding, the early years carry the most weight. Someone who starts in their twenties can often reach the same finish line saving a *much smaller* amount each month than someone who starts in their forties. Same destination — a fraction of the effort — purely because they started sooner.",
      },
      {
        type: "tip",
        text: "You don't need to fund a whole retirement at 25. You need to *start the habit* at 25. A small amount, automated and left alone, does more than a big amount you scramble to save in a panic at 50.",
      },
      {
        type: "h2",
        text: "The accounts that reward you for it",
      },
      {
        type: "p",
        text: "The system actually offers you tax breaks for saving toward retirement, through special accounts. You don't need to master all of them — just know the main two:",
      },
      {
        type: "list",
        items: [
          "**401(k)** — offered through some jobs, funded from your paycheck, often with an employer match (free money).",
          "**IRA** (including the **Roth IRA**) — one you open yourself, great if your job offers no plan or you want to save more.",
        ],
      },
      {
        type: "h2",
        text: "A simple order to follow",
      },
      {
        type: "steps",
        items: [
          "If your job offers a 401(k) match, contribute enough to grab all of it first — that's free money.",
          "Build a small emergency fund so a surprise doesn't force you to raid your investments.",
          "Open a Roth IRA and contribute what you comfortably can toward it.",
          "Increase the amount a little whenever your income grows.",
        ],
      },
      {
        type: "key",
        text: "Retirement being far away isn't the problem — it's the superpower. The distance is exactly what lets small, early contributions turn into something large. Future you is counting on present you to start.",
      },
    ],
    related: ["roth-ira-explained", "401k-and-match", "magic-of-compound-interest"],
  },

  {
    slug: "crypto-explained",
    order: 20,
    topicId: "investing",
    title: "A Calm Word on Crypto",
    dek: "No hype, no fear of missing out — just an honest, risk-first look at what crypto actually is.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "Crypto is a digital asset that can swing wildly in value.",
      "It's speculative — closer to a bet than to a savings plan.",
      "The space is full of scams aimed at newcomers.",
      "Only ever use money you can fully afford to lose.",
    ],
    body: [
      {
        type: "p",
        text: "You've heard the stories — someone who got rich overnight, the friend who 'should have bought years ago.' Crypto comes wrapped in a lot of noise, hype, and fear of missing out. This won't be that. Just an honest, grounded look at what it is and the risks that come with it, so you can decide with clear eyes.",
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
        text: "This is the part you cannot skip. Crypto prices can swing enormously — it's normal for a coin to drop 30%, 50%, even more in a matter of days, then maybe bounce back, then drop again. A savings account barely moves. Crypto can move like a rollercoaster with no safety bar. That's not a flaw being fixed; that's just what it is right now.",
      },
      {
        type: "key",
        text: "Because of those wild swings, crypto is *speculative* — much closer to placing a bet than to a steady, long-term plan. It is the opposite of a safe place to park money you'll need.",
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
          "Anyone *guaranteeing* profits or 'doubling your money' — that's always a lie.",
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
        text: "Crypto isn't a shortcut out of a tight spot — treating it like one is exactly how people get hurt. Build your foundation first. Anything speculative comes last, with money you've already decided you can live without.",
      },
    ],
    related: ["investing-mistakes", "risk-and-diversification", "saving-vs-investing"],
  },
];
