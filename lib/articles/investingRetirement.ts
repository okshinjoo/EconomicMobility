import type { Article } from "./types";

export const investingRetirementArticles: Article[] = [
  {
    slug: "what-is-a-401k",
    order: 90,
    topicId: "investing",
    title: "What Is a 401(k)?",
    dek: "The retirement account your job hands you — and the quiet way it builds wealth while you're busy living your life.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A 401(k) is a retirement account offered through your employer.",
      "Money comes straight out of your paycheck and gets invested.",
      "It's tax-advantaged — and the Roth option flips when you pay tax.",
      "It's for retirement, so pulling money out early usually costs you.",
    ],
    body: [
      {
        type: "p",
        text: "You start a new job, and somewhere in the pile of paperwork is something called a *401(k)*. Maybe HR mentioned it quickly. Maybe you clicked past it because it sounded like grown-up stuff for later. Here's the plain version of what it actually is — and why it might be one of the most useful boxes you'll ever check.",
      },
      {
        type: "p",
        text: "A 401(k) is a retirement savings account you get *through your employer*. The weird name is just the slice of the tax code it comes from. You don't open it at a bank yourself — your job sets it up, and you opt in.",
      },
      {
        type: "h2",
        text: "Money comes out before you can spend it",
      },
      {
        type: "p",
        text: "This is the part that makes it work. You pick a percentage of each paycheck to contribute, and it gets pulled out *automatically* — before the money ever lands in your checking account. You never see it, so you never get the chance to spend it. Saving stops being a willpower battle you fight every month and becomes something that just happens in the background.",
      },
      {
        type: "h2",
        text: "The money doesn't just sit there — it's invested",
      },
      {
        type: "p",
        text: "A 401(k) isn't a piggy bank where cash sits still. The money you put in gets *invested*, usually in a menu of funds you choose from when you sign up. Over years and decades, those investments grow — that's the whole point. You're not saving for next month; you're building something for a version of you that's 40 years older.",
      },
      {
        type: "tip",
        text: "Overwhelmed by the fund menu? Many plans offer a *target-date fund* — you pick the one with the year closest to when you'll retire, and it handles the investing mix for you. It's a totally reasonable place to start.",
      },
      {
        type: "h2",
        text: "Why it's 'tax-advantaged'",
      },
      {
        type: "p",
        text: "Here's the perk the government built in to nudge you to save. A traditional 401(k) takes your contributions out *before* taxes — which lowers the income you get taxed on *this year*. The money then grows untouched by taxes for decades, and you pay income tax later, when you withdraw it in retirement.",
      },
      {
        type: "p",
        text: "Many plans also offer a *Roth 401(k)*, which flips the deal: you contribute money you've *already* paid tax on, and in exchange your qualified withdrawals in retirement — including all that growth — come out tax-free. Same account type, two different timelines for when the tax bill hits.",
      },
      {
        type: "h2",
        text: "The catch most people miss",
      },
      {
        type: "p",
        text: "A 401(k) is built for *retirement*, and the tax breaks come with a string attached: this money is supposed to stay put. If you pull it out early — generally before age 59½ — you'll usually owe regular income tax on it *plus* a 10% penalty on top. There are some specific exceptions, but the default assumption should be: once it's in, leave it alone.",
      },
      {
        type: "key",
        text: "A 401(k) turns saving into a habit you don't have to think about: money leaves your paycheck automatically, gets invested, and grows for decades — with a tax break for letting it.",
      },
      {
        type: "p",
        text: "For 2026, you can put in up to **$24,500** of your own pay (or **$32,500** if you're 50 or older, with the catch-up) — and that's *separate* from any match your employer adds on top. These limits tick up most years for inflation, so it's worth confirming the current figure at IRS.gov. For anything specific to your situation, a qualified tax professional is worth the conversation.",
      },
      {
        type: "tip",
        text: "If your employer offers a *match*, that's free money you don't want to leave behind — it can be the single best reason to start contributing today. See *The 401(k) and the Free Money of a Match*.",
      },
    ],
    related: ["401k-and-match", "what-is-an-ira", "retirement-accounts-explained"],
  },

  {
    slug: "what-is-an-ira",
    order: 110,
    topicId: "investing",
    title: "What Is an IRA?",
    dek: "A retirement account you open and run yourself — no job required, and a lot more freedom in what you invest in.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "An IRA is a retirement account you open yourself — no employer needed.",
      "You choose your own investments, with far more freedom than a 401(k).",
      "It's tax-advantaged, and the IRS caps how much you can add each year.",
      "It comes in two flavors — Roth and Traditional — that tax you differently.",
    ],
    body: [
      {
        type: "p",
        text: "A 401(k) only shows up if your job offers one. So what if you're self-employed, working a place that doesn't have one, or you just want your *own* retirement account that nobody can take away when you change jobs? That's exactly what an IRA is for.",
      },
      {
        type: "p",
        text: "IRA stands for *Individual Retirement Account*, and the key word is *individual*. You open it yourself, at a brokerage or a bank, and you control it. No employer involved, no HR paperwork — just you, deciding to invest in your future.",
      },
      {
        type: "h2",
        text: "Almost anyone with a job can open one",
      },
      {
        type: "p",
        text: "The main requirement is straightforward: you generally need *earned income* — money from working — to contribute. A part-time job, a gig, a side hustle, your first real paycheck. If you're earning, you can usually open an IRA, often online in less time than it takes to set up a new app.",
      },
      {
        type: "h2",
        text: "You pick the investments — and there are a lot more of them",
      },
      {
        type: "p",
        text: "This is where an IRA really shines compared to a typical 401(k). A 401(k) limits you to the menu of funds your employer chose. An IRA opens the whole grocery store: index funds, ETFs, individual stocks, bonds, and more. For someone who wants more say in where their money goes, that freedom is a big deal.",
      },
      {
        type: "tip",
        text: "More choice doesn't mean you have to get fancy. Plenty of people keep their entire IRA in one or two broad, low-cost index funds and call it a day. Freedom to choose isn't pressure to overcomplicate.",
      },
      {
        type: "h2",
        text: "It's tax-advantaged, with a yearly limit",
      },
      {
        type: "p",
        text: "Like a 401(k), an IRA comes with a tax break designed to reward you for saving for the long haul. In exchange, the IRS sets an *annual contribution limit* — a cap on how much you can put in each year. For 2026, that limit is **$7,500** (or **$8,600** if you're 50 or older, thanks to a 'catch-up' allowance). The number nudges up most years for inflation, so it's worth confirming at IRS.gov, but that's the ballpark.",
      },
      {
        type: "h2",
        text: "Two flavors: Roth and Traditional",
      },
      {
        type: "p",
        text: "IRAs come in two main types, and the difference comes down to *when* you get your tax break:",
      },
      {
        type: "list",
        items: [
          "**Traditional IRA** — you may be able to deduct contributions now (a tax break *today*), the money grows tax-deferred, and you pay income tax when you withdraw it in retirement.",
          "**Roth IRA** — you contribute money you've *already* paid tax on, and qualified withdrawals later — including all the growth — come out tax-free.",
        ],
      },
      {
        type: "p",
        text: "Which one fits you depends on your situation, and it's worth understanding properly before you choose. We break the decision down in *Roth vs. Traditional IRA*, and if you're weighing an IRA against a workplace plan, *401(k) vs. IRA* compares them side by side.",
      },
      {
        type: "h2",
        text: "Remember what it's for",
      },
      {
        type: "p",
        text: "An IRA is a *retirement* account, so the same rule applies as with a 401(k): the money is meant to stay invested for the long haul. Pulling earnings out early — generally before age 59½ — usually means income tax plus a 10% penalty, with some specific exceptions. The rules are detailed and they change, so for your specifics, lean on IRS.gov or a qualified tax professional.",
      },
      {
        type: "key",
        text: "An IRA is the retirement account you own outright: you open it, you choose the investments, and it follows you no matter where you work or for whom.",
      },
    ],
    related: ["roth-vs-traditional-ira", "401k-vs-ira", "what-is-a-401k"],
  },

  {
    slug: "retirement-accounts-explained",
    order: 80,
    topicId: "investing",
    title: "Retirement & Tax-Advantaged Accounts, Explained",
    dek: "A plain map of the accounts that quietly build wealth — and why starting young is the biggest advantage you'll ever have.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "'Tax-advantaged' means the government gives you a tax break to save.",
      "The main accounts: 401(k)/403(b) at work, IRAs you open, and the HSA.",
      "Starting early matters more than the dollar amount — time does the work.",
      "Common guidance: grab any match, kill high-interest debt, then keep saving.",
    ],
    body: [
      {
        type: "p",
        text: "Retirement can feel like the least urgent thing in the world when you're young and the rent is due *now*. But the accounts built for it are some of the most powerful money tools you'll ever touch — and understanding them early is a genuine head start. Let's draw the map.",
      },
      {
        type: "h2",
        text: "First, what does 'tax-advantaged' even mean?",
      },
      {
        type: "p",
        text: "You'll see the phrase *tax-advantaged* everywhere in this corner of money, and it's simpler than it sounds. Normally, the government taxes your income and your investment gains. With these special accounts, it agrees to *go easier on the taxes* — sometimes now, sometimes later — as a deliberate nudge to get you saving for the future. It's basically a reward for being patient. Take the reward.",
      },
      {
        type: "h2",
        text: "The main accounts, in one plain map",
      },
      {
        type: "p",
        text: "There are a handful of these accounts, and each has a job. Here's the quick tour:",
      },
      {
        type: "list",
        items: [
          "**401(k) or 403(b) — through your job.** Money comes straight out of your paycheck and gets invested. The 403(b) is the same idea for schools and nonprofits. More in *What Is a 401(k)?*",
          "**IRA — you open it yourself.** A retirement account you control at a brokerage or bank, with way more investment freedom than a workplace plan. More in *What Is an IRA?*",
          "**HSA — a health account that moonlights as a retirement account.** If you have the right kind of health plan, an HSA gives you a rare *triple* tax break, and after a certain age it can act like a stealth retirement fund. More in *What Is an HSA?*",
        ],
      },
      {
        type: "p",
        text: "Most people don't need all of these on day one. The point of the map is just to know what exists, so the words stop being intimidating.",
      },
      {
        type: "h2",
        text: "The real secret: start early",
      },
      {
        type: "p",
        text: "If you take one thing from this whole article, take this. The single biggest advantage in retirement saving isn't how much money you make — it's *time*. Money you invest in your 20s has decades to grow, and thanks to compounding, your earnings start earning their own earnings. A dollar invested young does far more work than a dollar invested later. (We dig into the math in *The Magic of Compound Interest*.)",
      },
      {
        type: "p",
        text: "That's genuinely good news if you're starting out with very little. You may not have much to invest yet — but you have the one ingredient money can't buy back: a long runway. Someone who starts small and young often ends up ahead of someone who starts big but late.",
      },
      {
        type: "key",
        text: "Time is the biggest lever you have — bigger than the amount. A little money invested in your 20s can outgrow a lot of money invested in your 40s. Starting early is the closest thing to a cheat code retirement saving has.",
      },
      {
        type: "h2",
        text: "A common order people follow",
      },
      {
        type: "p",
        text: "Once you've got a little breathing room to invest, where should it go first? There's a priority order a lot of financial educators point to. It's *general* guidance, not a plan tailored to you — but it's a sensible way to think about the sequence:",
      },
      {
        type: "steps",
        items: [
          "**Grab any employer match first.** If your job matches part of your 401(k) contributions, that's free money — capturing it usually comes before anything else.",
          "**Knock out high-interest debt.** Paying off something like a credit card charging 20%+ is a guaranteed return that's hard for any investment to beat.",
          "**Keep funding tax-advantaged accounts.** With the match captured and the expensive debt gone, keep feeding your 401(k), IRA, or HSA so that long runway can do its thing.",
        ],
      },
      {
        type: "tip",
        text: "Don't let this list paralyze you. If all you can do this month is start contributing enough to get part of your match, that's a real, meaningful first step. You can layer in the rest over time.",
      },
      {
        type: "p",
        text: "One honest note to close on: the rules around these accounts are detailed and they change year to year. This article is general education to help the words make sense — it isn't individualized financial advice. For current limits and rules, check IRS.gov, and for guidance built around *your* situation, talk to a qualified tax or financial professional.",
      },
    ],
    related: [
      "magic-of-compound-interest",
      "what-is-a-401k",
      "what-is-an-ira",
      "what-is-an-hsa",
    ],
  },
];
