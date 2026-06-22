import type { Article } from "./types";

export const insuranceArticles: Article[] = [
  {
    slug: "how-insurance-works",
    order: 10,
    topicId: "insurance",
    title: "How Insurance Actually Works",
    dek: "It feels like paying for nothing — until the day it's the only thing standing between you and a disaster you couldn't afford.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Insurance spreads one person's disaster across a big group of people.",
      "Premium, deductible, and claim are the three words you really need.",
      "A lower premium usually means a higher deductible, and vice versa.",
      "A few kinds of insurance are essential; the rest are optional.",
    ],
    body: [
      {
        type: "p",
        text: "Insurance is one of those things almost nobody explains in plain language. You pay money every month for something you hope you never use, the paperwork is written to confuse you, and the whole thing can feel like a scam designed to take your cash. It isn't — but you'd be forgiven for thinking so. Let's strip it down to what's actually going on.",
      },
      {
        type: "h2",
        text: "The one idea underneath all of it",
      },
      {
        type: "p",
        text: "Here's the core trick, and it's genuinely simple. A huge group of people each pay in a little bit. Most of them will be fine that year. But a few will get hit with something awful — a car wreck, a hospital stay, a house fire — that would cost far more than any one person could cover alone. The money everyone paid in gets used to cover those unlucky few.",
      },
      {
        type: "p",
        text: "So you're not really buying a product. You're buying *protection against a risk you couldn't survive on your own*. The month nothing goes wrong, your money helped cover someone else. The month disaster lands on you, everyone else's money covers you. That's the whole deal.",
      },
      {
        type: "key",
        text: "Insurance isn't for the small stuff you could pay for yourself. It's for the rare, enormous bill that would otherwise wreck you. That's exactly what makes it worth it.",
      },
      {
        type: "h2",
        text: "The three words everyone trips on",
      },
      {
        type: "p",
        text: "Almost all the confusion comes from a handful of terms. Learn these three and you can read most of a policy:",
      },
      {
        type: "list",
        items: [
          "**Premium** — what you pay regularly (usually monthly) just to have the coverage. You pay it whether or not anything goes wrong. Think of it as the price of being protected.",
          "**Deductible** — what you pay out of your own pocket *before* insurance starts paying. If your deductible is $1,000, you cover the first $1,000 of a covered loss, then insurance picks up from there.",
          "**Claim** — when something covered happens and you ask the insurer to pay. Filing a claim is you saying, 'this is one of the bad things I was covered for — your turn.'",
        ],
      },
      {
        type: "h2",
        text: "The trade-off you get to choose",
      },
      {
        type: "p",
        text: "Premium and deductible move in opposite directions, and you usually get to pick where you land. A *higher premium with a lower deductible* means you pay more every month but less out of pocket when something happens. A *lower premium with a higher deductible* means you pay less every month but more out of pocket if you ever need it.",
      },
      {
        type: "tip",
        text: "A simple way to choose: if you don't have much saved, a lower deductible can be worth a higher monthly premium — because a giant out-of-pocket bill is the exact thing you can't absorb. If you have a solid emergency fund, a higher deductible saves you money every month and you can cover the gap if it ever comes.",
      },
      {
        type: "h2",
        text: "What most people actually need",
      },
      {
        type: "p",
        text: "Not all insurance is created equal. Some kinds protect you from a bill that could genuinely ruin you; others are optional add-ons. Roughly speaking:",
      },
      {
        type: "list",
        items: [
          "**Usually essential:** health insurance (a serious illness or injury is one of the biggest financial risks there is), and auto insurance if you drive — it's legally required in most places.",
          "**Important once people depend on you:** life insurance, if someone relies on your income, and disability coverage if losing your paycheck would sink you.",
          "**Nice-to-have or situational:** renters insurance (cheap and genuinely useful), plus the small add-ons companies love to sell — phone protection, extended warranties, travel insurance. Skip these unless they truly fit your situation.",
        ],
      },
      {
        type: "p",
        text: "You don't have to buy everything. The goal is to cover the disasters you couldn't pay for yourself, and not waste money insuring the small stuff you could.",
      },
    ],
    related: ["health-insurance-explained", "auto-insurance-basics", "do-you-need-life-insurance"],
  },

  {
    slug: "health-insurance-explained",
    order: 20,
    topicId: "insurance",
    title: "Health Insurance, Explained",
    dek: "The most confusing insurance there is — broken into the few pieces you actually need to understand.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "Premium, deductible, copay, coinsurance, and out-of-pocket max work together over a year.",
      "Staying in-network keeps your costs far lower.",
      "Coverage can come from a job, the marketplace, Medicaid, or a parent's plan.",
      "Going uninsured is one of the biggest financial risks you can take.",
    ],
    body: [
      {
        type: "p",
        text: "Health insurance might be the single most confusing thing in personal finance. It comes loaded with words nobody defines — deductible, copay, coinsurance, network — and the stakes feel high because they are. But it's really just a few moving parts. Once you see how they fit together over a year, the whole thing clicks.",
      },
      {
        type: "h2",
        text: "The building blocks, in order",
      },
      {
        type: "p",
        text: "Picture a single year of having a health plan. Here's what each term means and when it kicks in:",
      },
      {
        type: "list",
        items: [
          "**Premium** — what you pay every month just to have the plan, whether or not you see a doctor. This is the baseline cost of being covered.",
          "**Deductible** — the amount you pay out of pocket for care before the plan starts sharing the cost. Early in the year, you're often paying this down yourself.",
          "**Copay** — a flat, fixed fee for a specific service, like a set amount for a doctor visit or a prescription. You know it in advance.",
          "**Coinsurance** — after you've met your deductible, your share of a bill as a percentage. If your coinsurance is 20%, you pay 20% and the plan pays the rest.",
          "**Out-of-pocket maximum** — the most you'll have to pay in a year for covered care. Once you hit it, the plan covers 100% of covered costs for the rest of the year. This is the safety net under everything.",
        ],
      },
      {
        type: "p",
        text: "Put it together: you pay your premium every month no matter what. When you need care, you first work through your deductible, then split costs with the plan through copays and coinsurance — until you hit your out-of-pocket maximum, after which the plan covers the rest of the year. That ceiling is the whole point: it caps how bad a year can get.",
      },
      {
        type: "key",
        text: "The out-of-pocket maximum is the most important number on a health plan. It's the worst-case price tag for a terrible health year — and it's exactly the kind of catastrophe insurance exists to cap.",
      },
      {
        type: "h2",
        text: "Network: where you get care matters",
      },
      {
        type: "p",
        text: "Insurers strike deals with certain doctors, hospitals, and pharmacies — that group is the plan's **network**. Staying *in-network* means you pay the lower, agreed-on prices. Going *out-of-network* can cost you dramatically more, and sometimes the plan won't cover it at all. Before you book anything non-urgent, it's worth checking that the provider is in your network.",
      },
      {
        type: "p",
        text: "That difference shows up in the two most common plan types:",
      },
      {
        type: "list",
        items: [
          "**HMO** — usually cheaper, but you generally have to stay in-network and often pick a primary doctor who refers you to specialists. Less flexibility, lower cost.",
          "**PPO** — usually pricier, but you get more freedom to see specialists directly and use out-of-network providers (still at a higher cost). More flexibility, higher cost.",
        ],
      },
      {
        type: "h2",
        text: "Where coverage actually comes from",
      },
      {
        type: "p",
        text: "You don't buy health insurance just anywhere — it tends to come from one of a few places:",
      },
      {
        type: "list",
        items: [
          "**A job.** Many employers offer a health plan and pay part of the premium for you. If you have this option, it's usually the easiest place to start.",
          "**The government marketplace.** At **HealthCare.gov** (or your state's own marketplace), you can shop for a plan on your own. Many people qualify for help that lowers the cost — it's worth checking even if you assume you can't afford it.",
          "**Medicaid.** If your income is low, you may qualify for Medicaid, which provides coverage at little or no cost. Eligibility and how to apply vary by state.",
          "**A parent's plan.** Young adults can often stay on a parent's health plan into their mid-20s, which can be the simplest and cheapest option while it lasts.",
        ],
      },
      {
        type: "tip",
        text: "Don't assume coverage is out of reach. Lots of people who qualify for free or low-cost plans never find out because they never check. Start at HealthCare.gov or your state marketplace — it'll point you to what you're eligible for, including Medicaid.",
      },
      {
        type: "h2",
        text: "Why going uninsured is so risky",
      },
      {
        type: "p",
        text: "It's tempting to skip insurance when you're young and healthy — the premium feels like money for nothing. But a single accident or serious illness can produce a bill larger than most people earn in years, and being uninsured doesn't make that bill disappear. It just leaves you facing it alone. That's the exact financial catastrophe insurance is built to prevent.",
      },
      {
        type: "p",
        text: "The good news: because low-cost and free options exist for a lot of people, being uninsured is often a choice you don't actually have to make. It's worth ten minutes to find out what you qualify for.",
      },
    ],
    related: ["choosing-a-health-plan", "medicaid-explained", "benefits-you-qualify-for"],
  },

  {
    slug: "choosing-a-health-plan",
    order: 10,
    topicId: "insurance",
    title: "How to Choose a Health Plan",
    dek: "The cheapest premium is almost never the cheapest plan. Here's how to compare them for real.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Compare total likely cost, not just the monthly premium.",
      "Match the plan to how much care you actually expect to use.",
      "Check that your doctors and prescriptions are covered in-network.",
      "A low premium almost always hides a high deductible.",
    ],
    body: [
      {
        type: "p",
        text: "When you're staring at a list of health plans, the instinct is to sort by the monthly premium and pick the cheapest one. It feels responsible. It's also the single most common way people end up paying *more*. Choosing a plan well takes about ten extra minutes of looking past that first number — here's how to do it.",
      },
      {
        type: "h2",
        text: "Look at the total cost, not the sticker price",
      },
      {
        type: "p",
        text: "The premium is only one piece of what a plan costs you. A plan with a low premium often comes with a high deductible and bigger out-of-pocket costs when you actually use it. The real question isn't 'what's the monthly price?' — it's 'what will this plan likely cost me over the whole year, all in?'",
      },
      {
        type: "p",
        text: "Roughly, your total likely cost is: the premium across the year, plus the deductible and copays you'd realistically rack up based on how much care you expect to need. A plan that looks cheap monthly can lose badly to a slightly pricier plan once you add in what you'd pay at the doctor.",
      },
      {
        type: "h2",
        text: "Match the plan to your actual life",
      },
      {
        type: "p",
        text: "There's no single best plan — only the best plan *for your situation*. The deciding factor is usually how much care you expect to use:",
      },
      {
        type: "list",
        items: [
          "**Rarely see a doctor, no ongoing conditions?** A lower-premium, higher-deductible plan often wins. You pay less every month, and you're unlikely to hit the deductible — just make sure you could cover it if something unexpected happened.",
          "**Take regular prescriptions, see specialists, or manage an ongoing condition?** A higher-premium, lower-deductible plan often costs less overall, because the plan starts sharing your frequent costs sooner.",
        ],
      },
      {
        type: "key",
        text: "The trade-off in one line: a low premium almost always means a high deductible. You're choosing whether to pay more every month, or more on the day you actually need care.",
      },
      {
        type: "h2",
        text: "Check that your doctors and meds are covered",
      },
      {
        type: "p",
        text: "A plan is only a good deal if it covers the care *you* use. Before you commit, confirm that the doctors you want are in the plan's network, and that any prescriptions you take are on the plan's covered list. A cheap plan that doesn't cover your medication or sends you out-of-network for your doctor isn't cheap at all.",
      },
      {
        type: "h2",
        text: "How to actually compare two plans",
      },
      {
        type: "steps",
        items: [
          "Write down each plan's premium, deductible, copays, coinsurance, and out-of-pocket maximum side by side.",
          "Estimate how much care you expect this year — be honest about prescriptions, regular visits, or known conditions.",
          "For each plan, add the year of premiums to the deductible and copays you'd realistically pay. That's your total likely cost.",
          "Confirm your doctors are in-network and your prescriptions are covered under each plan you're seriously considering.",
          "If you're shopping on the marketplace, check whether you qualify for help lowering the cost before you decide — it can change which plan wins.",
          "Pick the plan with the lowest *total* likely cost that still covers your care — not the lowest premium.",
        ],
      },
      {
        type: "tip",
        text: "Shopping on the marketplace? Many people qualify for subsidies that lower what they pay, and the marketplace applies them as you compare plans. Always check what you're eligible for at HealthCare.gov or your state marketplace before assuming a plan is out of reach.",
      },
      {
        type: "p",
        text: "Spending those few extra minutes is the difference between a plan that quietly drains you and one that actually fits your life. The cheapest premium and the cheapest plan are rarely the same thing.",
      },
    ],
    related: ["health-insurance-explained", "how-insurance-works", "medicaid-explained"],
  },

  {
    slug: "auto-insurance-basics",
    order: 20,
    topicId: "insurance",
    title: "Auto Insurance Basics",
    dek: "Required almost everywhere, confusing almost everywhere — here's what each coverage actually does.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "If you drive, auto insurance is legally required in most places.",
      "Liability covers damage you cause others; collision and comprehensive cover your own car.",
      "Your premium depends on your record, your car, your location, and your coverage.",
      "Too little liability can leave you personally on the hook for a huge bill.",
    ],
    body: [
      {
        type: "p",
        text: "If you drive, you need auto insurance — it's the law in most places, and getting caught without it brings its own pile of problems. But car insurance is sold with a wall of coverage names that all blur together. Liability, collision, comprehensive — what's the difference, and which do you actually need? Here's the plain version.",
      },
      {
        type: "h2",
        text: "The three coverages that matter most",
      },
      {
        type: "p",
        text: "Most of an auto policy comes down to three coverages, and the key distinction is simple: some protect *other people* from you, and some protect *your own car*.",
      },
      {
        type: "list",
        items: [
          "**Liability** — covers the damage and injuries *you cause to other people* in an accident: their car, their medical bills, their property. This is the part that's legally required almost everywhere, because it makes sure the people you might hurt get covered.",
          "**Collision** — covers damage to *your own car* from a crash, whether you hit another car or a guardrail. This one's about repairing or replacing your vehicle.",
          "**Comprehensive** — covers damage to your own car from things that *aren't* a crash: theft, vandalism, fire, hail, a tree falling, hitting an animal. Basically the bad luck that isn't a collision.",
        ],
      },
      {
        type: "key",
        text: "Liability protects other people from you. Collision and comprehensive protect your car. Liability is the part you're legally required to carry; the other two are about whether you can afford to fix your own vehicle.",
      },
      {
        type: "h2",
        text: "The deductible works the same way here",
      },
      {
        type: "p",
        text: "Collision and comprehensive come with a deductible — the amount you pay out of pocket before insurance covers the rest of a repair. Pick a higher deductible and your premium drops, but you'll owe more out of pocket if you ever file a claim. Pick a lower deductible and you'll pay a higher premium for the peace of mind. It's the same trade-off you see across all insurance.",
      },
      {
        type: "h2",
        text: "What moves your premium up or down",
      },
      {
        type: "p",
        text: "Two people can pay wildly different prices for similar coverage. A handful of factors drive it:",
      },
      {
        type: "list",
        items: [
          "**Your driving record** — accidents and tickets push your premium up; a clean record keeps it down.",
          "**Where you live** — rates vary a lot by area, based on things like traffic, theft, and how often claims happen there.",
          "**The car itself** — what it costs to repair or replace, and how often that model gets stolen or wrecked.",
          "**Your coverage choices** — how much liability you carry, whether you add collision and comprehensive, and the deductible you pick.",
        ],
      },
      {
        type: "h2",
        text: "Why the cheapest policy can backfire",
      },
      {
        type: "p",
        text: "It's tempting to buy the bare-minimum policy and move on. But here's the trap: if you carry only the lowest required liability and you cause a serious accident, your coverage can run out fast — and you're personally responsible for whatever's left. Medical bills and a totaled car can blow past a thin liability limit easily, and the rest comes out of *your* pocket.",
      },
      {
        type: "tip",
        text: "Don't shop on price alone. Carrying solid liability coverage usually costs only a little more each month, and it's what stands between you and a life-altering bill if you're ever at fault in a bad crash. That's the part worth not cutting.",
      },
      {
        type: "p",
        text: "Once you understand these pieces, an auto policy stops being a mystery. Required liability protects others, collision and comprehensive protect your car, and your premium reflects your risk and your choices. From there, you're shopping on purpose instead of guessing.",
      },
    ],
    related: ["how-insurance-works", "building-your-first-budget", "do-you-need-life-insurance"],
  },

  {
    slug: "do-you-need-life-insurance",
    order: 30,
    topicId: "insurance",
    title: "Do You Even Need Life Insurance?",
    dek: "Cut through the sales pressure: the honest answer depends entirely on who relies on your income.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Life insurance exists to protect people who depend on your income.",
      "If no one relies on you financially, you may not need much yet.",
      "Term life is simple and affordable; whole life is far pricier.",
      "Salespeople often push the expensive kind — know the difference first.",
    ],
    body: [
      {
        type: "p",
        text: "Few products come with as much sales pressure as life insurance. Someone may have already told you that you *must* buy a policy right now, ideally an expensive one. So let's set the pitch aside and answer the real question honestly: do you actually need life insurance? This is general education, not a sales pitch or advice about your specific situation — but the basic logic is something anyone can learn.",
      },
      {
        type: "h2",
        text: "What life insurance is really for",
      },
      {
        type: "p",
        text: "Strip away the marketing and life insurance does one thing: if you die, it pays money to the people you name — so that the people who *depend on your income* aren't left financially stranded. That's the entire purpose. Not to make anyone rich, not as an investment scheme. It replaces the income people were counting on.",
      },
      {
        type: "key",
        text: "The honest test is simple: would anyone be in financial trouble if your income suddenly disappeared? If yes, life insurance matters. If no, you may not need much — or any — just yet.",
      },
      {
        type: "h2",
        text: "When you probably don't need much yet",
      },
      {
        type: "p",
        text: "If you're single, no kids, and nobody relies on your paycheck to get by, you likely don't need a big policy right now. There's no income for it to replace on anyone else's behalf. Buying a large, expensive policy in that situation mostly benefits the person selling it. It's fine to wait until your life actually calls for it.",
      },
      {
        type: "h2",
        text: "When it genuinely matters",
      },
      {
        type: "p",
        text: "The picture flips the moment people depend on you financially:",
      },
      {
        type: "list",
        items: [
          "You have kids who rely on your income.",
          "You have a partner who'd struggle to cover the bills without you.",
          "You support family members — parents, siblings, relatives — who count on what you send.",
          "You share a big debt, like a mortgage, that someone would be left carrying.",
        ],
      },
      {
        type: "p",
        text: "If any of those describe you, life insurance stops being a sales gimmick and becomes a real way to protect the people you love from a financial shock on top of a personal loss.",
      },
      {
        type: "h2",
        text: "Term vs. whole life — the difference they don't always explain",
      },
      {
        type: "p",
        text: "There are two broad kinds, and understanding them protects you from getting upsold:",
      },
      {
        type: "list",
        items: [
          "**Term life** — covers you for a set period (a 'term,' like 10, 20, or 30 years). It's straightforward and relatively affordable, because it's pure protection with nothing fancy attached. For most people who need coverage, this is what actually fits — it protects your family during the years they depend on you.",
          "**Whole life (permanent) life** — covers you for your entire life and mixes in a savings or investment component. It costs much more for the same amount of protection, and it's the kind salespeople often push hardest, because it earns them more. It can make sense in specific, less common situations — but it's rarely the right starting point.",
        ],
      },
      {
        type: "tip",
        text: "Many jobs offer some life insurance as a benefit, often at low or no cost. It's worth knowing what your employer already provides before you buy anything on your own — you may have more coverage than you think.",
      },
      {
        type: "p",
        text: "Bottom line: figure out whether anyone depends on your income first. If they don't, you can relax about the sales pressure. If they do, learn the difference between term and whole life before you sign anything — and remember this is general education, not individualized advice. The point is to walk into the conversation already knowing what you actually need.",
      },
    ],
    related: ["how-insurance-works", "auto-insurance-basics", "building-your-first-budget"],
  },
];
