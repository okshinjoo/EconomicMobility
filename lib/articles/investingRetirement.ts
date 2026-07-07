import type { Article } from "./types";

export const investingRetirementArticles: Article[] = [
  {
    slug: "what-is-a-401k",
    order: 90,
    topicId: "investing",
    title: "What Is a 401(k)?",
    dek: "The retirement account your job hands you, and the quiet way it builds wealth while you're busy living your life.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "A 401(k) is a retirement account offered through your employer.",
      "Money comes straight out of your paycheck and gets invested.",
      "An employer match is free money; contribute enough to get all of it.",
      "It's for retirement, so pulling money out early usually costs you.",
    ],
    body: [
      {
        type: "p",
        text: "You start a new job, and somewhere in the pile of paperwork is something called a *401(k)*. Maybe HR mentioned it quickly. Maybe you clicked past it because it sounded like grown-up stuff for later. Here's the plain version of what it is, and why it might be one of the most useful boxes you'll ever check.",
      },
      {
        type: "p",
        text: "A 401(k) is a retirement savings account you get *through your employer*. The odd name comes from the slice of the tax code that created it. You don't open it at a bank yourself; your job sets it up, and you opt in. If you're the first in your family navigating an American job with benefits, the paperwork can feel like a foreign language. Push through it once. This is one of the few forms that can quietly make you tens of thousands of dollars richer.",
      },
      {
        type: "h2",
        text: "Money comes out before you can spend it",
      },
      {
        type: "p",
        text: "This is the part that makes it work. You pick a percentage of each paycheck to contribute, and it gets pulled out *automatically*, before the money ever lands in your checking account. You never see it, so you never get the chance to spend it. Saving stops being a willpower battle you fight every month and becomes something that just happens in the background.",
      },
      {
        type: "h2",
        text: "Your money gets invested",
      },
      {
        type: "p",
        text: "A 401(k) isn't a piggy bank where cash sits still. The money you put in gets *invested*, usually in a menu of funds you choose from when you sign up. Over years and decades, those investments grow; that's the whole point. You're not saving for next month. You're building something for a version of you that's 40 years older.",
      },
      {
        type: "tip",
        text: "Overwhelmed by the fund menu? Many plans offer a *target-date fund*: you pick the one with the year closest to when you'll retire, and it handles the investing mix for you. It's a reasonable place to start.",
      },
      {
        type: "h2",
        text: "The match: free money from your employer",
      },
      {
        type: "p",
        text: "Many employers will *match* what you put in, up to a limit. A typical setup is 'dollar for dollar up to 4% of your pay': you contribute 4%, they add another 4% on top, and your savings double instantly. If you earn $40,000 and contribute 4%, that's $1,600 a year from you, and another $1,600 from your employer, every single year, for free. Skipping it is like turning down a raise.",
      },
      {
        type: "key",
        text: "Find out your company's match and contribute *at least* enough to get all of it. That's usually the highest-priority move in all of investing. There's no other place you get an instant 100% return just for showing up.",
      },
      {
        type: "h2",
        text: "Why it's 'tax-advantaged'",
      },
      {
        type: "p",
        text: "Here's the perk the government built in to nudge you to save. A traditional 401(k) takes your contributions out *before* taxes, which lowers the income you get taxed on *this year*. The money then grows untouched by taxes for decades, and you pay income tax later, when you withdraw it in retirement.",
      },
      {
        type: "p",
        text: "Many plans also offer a *Roth 401(k)*, which flips the deal: you contribute money you've *already* paid tax on, and in exchange your qualified withdrawals in retirement, including all that growth, come out tax-free. Same account type, two different timelines for when the tax bill hits.",
      },
      {
        type: "h2",
        text: "The catch most people miss",
      },
      {
        type: "p",
        text: "A 401(k) is built for *retirement*, and the tax breaks come with a string attached: this money is supposed to stay put. If you pull it out early (generally before age 59½), you'll usually owe regular income tax on it *plus* a 10% penalty on top. There are some specific exceptions, but the default assumption should be: once it's in, leave it alone.",
      },
      {
        type: "h2",
        text: "No 401(k) at your job?",
      },
      {
        type: "p",
        text: "Plenty of jobs, especially part-time, gig, or smaller employers, don't offer one at all. That's okay. You can open an [IRA](/learn/investing/what-is-an-ira) on your own and get many of the same long-term benefits. The account matters less than the habit of putting money in.",
      },
      {
        type: "p",
        text: "For 2026, you can put in up to **$24,500** of your own pay (or **$32,500** if you're 50 or older, with the catch-up). That's *separate* from any match your employer adds on top. These limits tick up most years for inflation. For anything specific to your situation, a qualified tax professional is worth the conversation.",
      },
      {
        type: "key",
        text: "A 401(k) turns saving into a habit you don't have to think about: money leaves your paycheck automatically, gets invested, and grows for decades, with a tax break for letting it.",
      },
    ],
    related: ["401k-vs-ira", "what-is-an-ira", "retirement-accounts-explained", "target-date-funds"],
    quiz: [
      {
        question: "How does money get into a 401(k)?",
        options: [
          "You transfer it from your checking account each month",
          "It comes out of each paycheck automatically, before you can spend it",
          "Your employer funds it entirely on its own",
        ],
        answer: 1,
        explain:
          "You pick a percentage of your pay and it's pulled out automatically before it ever reaches your checking account, so saving stops being a monthly willpower battle.",
      },
      {
        question: "Your employer matches contributions dollar for dollar up to 4% of your pay. What's the smart move?",
        options: [
          "Contribute at least enough to get the full match",
          "Skip the 401(k) and open an IRA instead",
          "Contribute 1% to start; the match doesn't add up to much",
        ],
        answer: 0,
        explain:
          "The match is free money, an instant 100% return on what you put in. Getting all of it is usually the highest-priority move in all of investing.",
      },
      {
        question: "What usually happens if you pull money out of a 401(k) before age 59½?",
        options: [
          "Nothing; it's your money to take whenever",
          "You owe regular income tax plus a 10% penalty",
          "You just lose that year's employer match",
        ],
        answer: 1,
        explain:
          "The tax breaks come with a string attached: the money is meant to stay put for retirement. Pull it out early and you'll usually owe income tax plus a 10% penalty on top.",
      },
    ],
  },

  {
    slug: "what-is-an-ira",
    order: 100,
    topicId: "investing",
    title: "What Is an IRA?",
    dek: "A retirement account you open and run yourself. No job required, and a lot more freedom in what you invest in.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "An IRA is a retirement account you open yourself, no employer needed.",
      "You choose your own investments, with far more freedom than a 401(k).",
      "It's tax-advantaged, and the IRS caps how much you can add each year.",
      "It comes in two flavors, Roth and Traditional, that tax you differently.",
    ],
    body: [
      {
        type: "p",
        text: "A 401(k) only shows up if your job offers one. So what if you're self-employed, working somewhere that doesn't have one, or you want your *own* retirement account that nobody can take away when you change jobs? That's exactly what an IRA is for.",
      },
      {
        type: "p",
        text: "IRA stands for *Individual Retirement Account*, and the key word is *individual*. You open it yourself, at a brokerage or a bank, and you control it. No employer, no HR paperwork: just you, deciding to invest in your future. And like any retirement account, an IRA isn't an investment itself. It's a container that holds the investments you pick.",
      },
      {
        type: "h2",
        text: "Almost anyone with a job can open one",
      },
      {
        type: "p",
        text: "The main requirement is straightforward: you generally need *earned income* (money from working) to contribute. A part-time job, a gig, a side hustle, your first real paycheck. If you're earning, you can usually open an IRA, often online in less time than it takes to set up a new app.",
      },
      {
        type: "h2",
        text: "You pick the investments",
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
        text: "Like a 401(k), an IRA comes with a tax break designed to reward you for saving for the long haul. In exchange, the IRS sets an *annual contribution limit*, a cap on how much you can put in each year. For 2026, that limit is **$7,500** (or **$8,600** if you're 50 or older, thanks to a 'catch-up' allowance). The number nudges up most years for inflation.",
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
          "**Traditional IRA:** you may be able to deduct contributions now (a tax break *today*), the money grows tax-deferred, and you pay income tax when you withdraw it in retirement.",
          "**Roth IRA:** you contribute money you've *already* paid tax on, and qualified withdrawals later, including all the growth, come out tax-free.",
        ],
      },
      {
        type: "p",
        text: "Which one fits you depends on your situation, and it's worth understanding properly before you choose. We break the decision down in [Roth vs. Traditional IRA](/learn/investing/roth-vs-traditional-ira), and if you're weighing an IRA against a workplace plan, [401(k) vs. IRA](/learn/investing/401k-vs-ira) compares them side by side.",
      },
      {
        type: "h2",
        text: "Remember what it's for",
      },
      {
        type: "p",
        text: "An IRA is a *retirement* account, so the same rule applies as with a 401(k): the money is meant to stay invested for the long haul. Pulling earnings out early (generally before age 59½) usually means income tax plus a 10% penalty, with some specific exceptions. The rules are detailed and they change, so for your specifics, lean on IRS.gov or a qualified tax professional.",
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
    dek: "A short map of the accounts that quietly build wealth: which one exists for what, and where to start.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "'Tax-advantaged' means the government gives you a tax break to save.",
      "401(k)s come through a job; IRAs you open yourself; HSAs pair with certain health plans.",
      "Grab any employer match first; it's free money.",
      "This is the map. Each account has its own full guide.",
    ],
    body: [
      {
        type: "p",
        text: "Retirement can feel like the least urgent thing in the world when the rent is due *now*. But the accounts built for it are some of the most powerful money tools you'll ever touch, and it helps to know what each one is for before you need it. Consider this the map; each account on it has its own full guide.",
      },
      {
        type: "h2",
        text: "What 'tax-advantaged' means",
      },
      {
        type: "p",
        text: "Normally, the government taxes your income and your investment gains. With these special accounts, it agrees to go easier on the taxes, sometimes now and sometimes later, as a deliberate nudge to get you saving for the future. It's a reward for being patient. Take the reward.",
      },
      {
        type: "h2",
        text: "The accounts, and what each is for",
      },
      {
        type: "list",
        items: [
          "**[401(k)](/learn/investing/what-is-a-401k)** (or 403(b) at schools and nonprofits): the retirement account you get through a job. Money comes straight out of your paycheck and gets invested, and many employers add matching money on top.",
          "**[IRA](/learn/investing/what-is-an-ira)**: the retirement account you open yourself at a brokerage, with far more investment freedom than a workplace plan. It comes in two versions, and [Roth vs. Traditional IRA](/learn/investing/roth-vs-traditional-ira) explains how to pick.",
          "**[HSA](/learn/investing/what-is-an-hsa)**: a health account with a rare triple tax break that can quietly double as a retirement account, if you have a qualifying high-deductible health plan.",
        ],
      },
      {
        type: "p",
        text: "Most people don't need all of these on day one. The point of the map is knowing what exists, so the words stop being intimidating.",
      },
      {
        type: "h2",
        text: "A common order people follow",
      },
      {
        type: "steps",
        items: [
          "**Grab any employer match first.** If your job matches part of your 401(k) contributions, that's free money; capturing it usually comes before anything else.",
          "**Knock out high-interest debt.** Paying off something like a credit card charging 20%+ is a guaranteed return that's hard for any investment to beat.",
          "**Keep funding tax-advantaged accounts.** With the match captured and the expensive debt gone, keep feeding your 401(k), IRA, or HSA.",
        ],
      },
      {
        type: "p",
        text: "Whichever account you start with, starting early matters more than starting big. [Retirement, When It's 40 Years Away](/learn/investing/retirement-basics) makes the case for why, and *The Magic of Compound Interest* shows the math.",
      },
      {
        type: "p",
        text: "One honest note to close on: the rules around these accounts are detailed and they change year to year. This is general education, not individualized advice. For guidance built around *your* situation, talk to a qualified tax or financial professional.",
      },
    ],
    related: ["what-is-a-401k", "what-is-an-ira", "what-is-an-hsa"],
  },
];
