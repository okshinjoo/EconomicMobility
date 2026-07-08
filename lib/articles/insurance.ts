import type { Article } from "./types";

export const insuranceArticles: Article[] = [
  {
    slug: "how-insurance-works",
    order: 10,
    topicId: "insurance",
    title: "How Insurance Actually Works",
    dek: "It feels like paying for nothing, until the day it's the only thing standing between you and a bill you couldn't survive.",
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
        text: "Insurance is one of those things almost nobody explains in plain language. You pay money every month for something you hope you never use, the paperwork seems written to confuse you, and the whole arrangement can feel like a scheme to take your cash. It isn't, but you'd be forgiven for thinking so. Underneath the jargon sits one simple idea.",
      },
      {
        type: "h2",
        text: "The one idea underneath all of it",
      },
      {
        type: "p",
        text: "A huge group of people each pay in a little. Most of them will be fine that year. A few will get hit with something awful, like a car wreck or a long hospital stay, that would cost far more than any one person could cover alone. The money everyone paid in goes to cover those unlucky few. That's the entire machine: many people pooling small payments so no single disaster wipes anyone out.",
      },
      {
        type: "p",
        text: "So you're not buying a product in the usual sense. You're buying *protection against a risk you couldn't survive on your own*. The month nothing goes wrong, your money helped cover someone else. The month disaster lands on you, everyone else's money covers you.",
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
          "**Premium:** what you pay regularly (usually monthly) just to have the coverage. You pay it whether or not anything goes wrong.",
          "**Deductible:** what you pay out of your own pocket *before* insurance starts paying. If your deductible is $1,000, you cover the first $1,000 of a covered loss, and insurance picks up from there.",
          "**Claim:** the request you file when something covered happens and you want the insurer to pay. Filing a claim is you saying, 'this is one of the bad things I was covered for.'",
        ],
      },
      {
        type: "h2",
        text: "The trade-off you get to choose",
      },
      {
        type: "p",
        text: "Premium and deductible move in opposite directions, and you usually get to pick where you land. A higher premium with a lower deductible means you pay more every month but less out of pocket when something happens. Flip it and you pay less every month, but more on the day you need to file a claim.",
      },
      {
        type: "tip",
        text: "A simple way to choose: if you don't have much saved, a lower deductible can be worth the higher monthly premium, because a giant surprise bill is the exact thing you can't absorb. If you have a solid emergency fund, a higher deductible saves you money every month and you can cover the gap if it ever comes.",
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
          "**Usually essential:** health insurance (a serious illness or injury is one of the biggest financial risks there is), and auto insurance if you drive, which is legally required in most places.",
          "**Important once people depend on you:** life insurance if someone relies on your income, and disability coverage if losing your paycheck would sink your household.",
          "**Cheap and worth a look:** [renters insurance](/learn/home-ownership/renters-insurance) protects your belongings for around $15 to $20 a month. The small add-ons companies love to sell, like phone protection and extended warranties, are usually skippable.",
        ],
      },
      {
        type: "p",
        text: "You don't have to buy everything. Cover the disasters you couldn't pay for yourself, and skip paying to insure the small stuff you could. The rest of this topic walks through the big categories one at a time, starting with [health insurance](/learn/insurance/health-insurance-explained).",
      },
    ],
    related: ["health-insurance-explained", "insurance-checkup", "do-you-need-life-insurance"],
    quiz: [
      {
        question: "What's the basic idea underneath all insurance?",
        options: [
          "You save up your own money for emergencies",
          "A big group pools small payments to cover the few who get hit with disaster",
          "The company invests your payments and returns them later",
        ],
        answer: 1,
        explain:
          "Many people each pay in a little, and that pool covers the unlucky few whose bills would be too big to survive alone. That's the entire machine.",
      },
      {
        question: "Your deductible is $1,000. What does that mean when something covered goes wrong?",
        options: [
          "You pay the first $1,000 and insurance picks up from there",
          "Insurance pays the first $1,000 and you cover the rest",
          "You pay $1,000 every month for the coverage",
        ],
        answer: 0,
        explain:
          "The deductible is what you pay out of your own pocket before insurance starts paying. The monthly amount you pay just to have coverage is the premium.",
      },
      {
        question: "You pick a plan with a lower monthly premium. What's the usual trade-off?",
        options: [
          "You get less coverage overall",
          "You can't file claims in the first year",
          "You'll have a higher deductible when something happens",
        ],
        answer: 2,
        explain:
          "Premium and deductible move in opposite directions. Paying less each month usually means paying more out of pocket on the day you need to file a claim.",
      },
    ],
  },

  {
    slug: "health-insurance-explained",
    order: 20,
    topicId: "insurance",
    title: "Health Insurance, Explained",
    dek: "The most confusing insurance there is, broken into the few pieces you actually need to understand.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Premium, deductible, copay, coinsurance, and out-of-pocket max work together over a year.",
      "Staying in-network keeps your costs far lower.",
      "Coverage can come from a job, the marketplace, Medicaid, or a parent's plan.",
      "Going uninsured is one of the biggest financial risks you can take.",
    ],
    body: [
      {
        type: "p",
        text: "Health insurance might be the single most confusing thing in personal finance. It comes loaded with words nobody defines: deductible, copay, coinsurance, network. And the stakes feel high because they are. But it's really just a few moving parts, and once you see how they fit together over a year, the whole thing clicks. (If you haven't read [how insurance works in general](/learn/insurance/how-insurance-works), start there; this builds on it.)",
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
          "**Premium:** what you pay every month just to have the plan, whether or not you see a doctor.",
          "**Deductible:** the amount you pay out of pocket for care before the plan starts sharing the cost. Early in the year, you're often paying this down yourself.",
          "**Copay:** a flat, fixed fee for a specific service, like a set amount for a doctor visit or a prescription. You know it in advance.",
          "**Coinsurance:** your share of a bill as a percentage, once you've met your deductible. If your coinsurance is 20%, you pay 20% and the plan pays the rest.",
          "**Out-of-pocket maximum:** the most you'll have to pay in a year for covered care. Once you hit it, the plan covers 100% of covered costs for the rest of the year. This is the safety net under everything.",
        ],
      },
      {
        type: "p",
        text: "Put it together: you pay your premium every month no matter what. When you need care, you first work through your deductible, then split costs with the plan through copays and coinsurance until you reach your out-of-pocket maximum. After that, the plan covers the rest of the year. That ceiling caps how bad a year can get.",
      },
      {
        type: "key",
        text: "The out-of-pocket maximum is the most important number on a health plan. It's the worst-case price tag for a terrible health year, and capping that worst case is exactly what insurance is for.",
      },
      {
        type: "h2",
        text: "Networks: where you get care matters",
      },
      {
        type: "p",
        text: "Insurers strike deals with certain doctors, hospitals, and pharmacies. That group is the plan's **network**. Staying *in-network* means you pay the lower, agreed-on prices. Going *out-of-network* can cost dramatically more, and sometimes the plan won't cover it at all. Before you book anything non-urgent, check that the provider is in your network.",
      },
      {
        type: "p",
        text: "That difference shows up in the two most common plan types:",
      },
      {
        type: "list",
        items: [
          "**HMO:** usually cheaper, but you generally have to stay in-network and often pick a primary doctor who refers you to specialists. Less flexibility, lower cost.",
          "**PPO:** usually pricier, but you get more freedom to see specialists directly and to use out-of-network providers (still at a higher cost).",
        ],
      },
      {
        type: "h2",
        text: "Where coverage actually comes from",
      },
      {
        type: "p",
        text: "You don't buy health insurance just anywhere. It tends to come from one of a few places:",
      },
      {
        type: "list",
        items: [
          "**A job.** Many employers offer a health plan and pay part of the premium for you. If you have this option, it's usually the easiest place to start.",
          "**The government marketplace.** At **HealthCare.gov** (or your state's own marketplace), you can shop for a plan on your own. Many people qualify for help that lowers the cost, so it's worth checking even if you assume you can't afford it.",
          "**Medicaid.** If your income is low, you may qualify for [Medicaid](/learn/government-aid/medicaid-explained), which provides coverage at little or no cost. Eligibility and how to apply vary by state.",
          "**A parent's plan.** Young adults can stay on a parent's health plan until they turn 26, which can be the simplest and cheapest option while it lasts.",
        ],
      },
      {
        type: "tip",
        text: "Don't assume coverage is out of reach. Plenty of people who qualify for free or low-cost plans never find out because they never check. Start at HealthCare.gov or your state marketplace; it will point you to what you're eligible for, including Medicaid.",
      },
      {
        type: "h2",
        text: "Why going uninsured is so risky",
      },
      {
        type: "p",
        text: "It's tempting to skip insurance when you're young and healthy, because the premium feels like money for nothing. But a single accident or serious illness can produce a bill larger than most people earn in years, and being uninsured doesn't make that bill disappear. It leaves you facing it alone.",
      },
      {
        type: "p",
        text: "Because low-cost and free options exist for a lot of people, being uninsured is often a choice you don't have to make. Spend ten minutes finding out what you qualify for, then use [How to Choose a Health Plan](/learn/insurance/choosing-a-health-plan) to compare your options.",
      },
    ],
    related: ["choosing-a-health-plan", "medicaid-explained", "negotiating-medical-bills"],
    quiz: [
      {
        question: "What does the out-of-pocket maximum on a health plan do?",
        options: [
          "Caps what you pay in a year for covered care; after that, the plan pays 100%",
          "Limits how many doctor visits you can have in a year",
          "Sets the most the plan will ever pay toward your bills",
        ],
        answer: 0,
        explain:
          "It's the worst-case price tag for a terrible health year. Once you hit it, the plan covers 100% of covered costs for the rest of the year, which is exactly what insurance is for.",
      },
      {
        question: "What's the difference between a copay and coinsurance?",
        options: [
          "They're two names for the same thing",
          "A copay is a flat fee you know in advance; coinsurance is your percentage share of a bill",
          "A copay applies to prescriptions only; coinsurance covers everything else",
        ],
        answer: 1,
        explain:
          "A copay is a fixed amount for a specific service, like a doctor visit. Coinsurance is a percentage split with the plan once you've met your deductible.",
      },
      {
        question: "Why does it matter whether a doctor is in your plan's network?",
        options: [
          "Out-of-network doctors are less qualified",
          "In-network care means lower, agreed-on prices; out-of-network can cost far more or not be covered",
          "You need government permission to go out-of-network",
        ],
        answer: 1,
        explain:
          "Insurers strike deals with certain providers, and staying in-network gets you those lower prices. Check that a provider is in your network before booking anything non-urgent.",
      },
    ],
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
        text: "When you're staring at a list of health plans, the instinct is to sort by monthly premium and pick the cheapest one. It feels responsible. It's also the single most common way people end up paying *more*. Choosing well takes about ten extra minutes of looking past that first number. (This article assumes you know the vocabulary. If premium, deductible, copay, and out-of-pocket maximum are still fuzzy, read [Health Insurance, Explained](/learn/insurance/health-insurance-explained) first.)",
      },
      {
        type: "h2",
        text: "Look at the total cost, not the sticker price",
      },
      {
        type: "p",
        text: "The premium is only one piece of what a plan costs you. A low premium usually comes with a high deductible and bigger out-of-pocket costs when you actually use the plan; that's [the trade-off built into all insurance](/learn/insurance/how-insurance-works). The real question isn't the monthly price. It's what the plan will likely cost you over the whole year, all in.",
      },
      {
        type: "p",
        text: "Roughly, your total likely cost is the premium across the year, plus the deductible and copays you'd realistically rack up given how much care you expect to need. A plan that looks cheap monthly can lose badly to a slightly pricier plan once you add in what you'd pay at the doctor.",
      },
      {
        type: "h2",
        text: "Match the plan to your actual life",
      },
      {
        type: "p",
        text: "There's no single best plan, only the best plan for your situation. The deciding factor is usually how much care you expect to use:",
      },
      {
        type: "list",
        items: [
          "**Rarely see a doctor, no ongoing conditions?** A lower-premium, higher-deductible plan often wins. You pay less every month and you're unlikely to hit the deductible. Just make sure you could cover it if something unexpected happened.",
          "**Take regular prescriptions, see specialists, or manage an ongoing condition?** A higher-premium, lower-deductible plan often costs less overall, because the plan starts sharing your frequent costs sooner.",
        ],
      },
      {
        type: "h2",
        text: "Check that your doctors and meds are covered",
      },
      {
        type: "p",
        text: "A plan is only a good deal if it covers the care *you* use. Before you commit, confirm that the doctors you want are in the plan's network and that any prescriptions you take are on the plan's covered list. A cheap plan that doesn't cover your medication, or that sends you out-of-network for your regular doctor, isn't cheap at all.",
      },
      {
        type: "h2",
        text: "How to actually compare two plans",
      },
      {
        type: "steps",
        items: [
          "Write down each plan's premium, deductible, copays, coinsurance, and out-of-pocket maximum side by side.",
          "Estimate how much care you expect this year. Be honest about prescriptions, regular visits, and known conditions.",
          "For each plan, add the year of premiums to the deductible and copays you'd realistically pay. That's your total likely cost.",
          "Confirm your doctors are in-network and your prescriptions are covered under each plan you're seriously considering.",
          "If you're shopping on the marketplace, check whether you qualify for help lowering the cost before you decide. It can change which plan wins.",
          "Pick the plan with the lowest *total* likely cost that still covers your care, not the lowest premium.",
        ],
      },
      {
        type: "tip",
        text: "Shopping on the marketplace? Many people qualify for subsidies that lower what they pay, and the marketplace applies them as you compare plans. Check what you're eligible for at HealthCare.gov or your state marketplace before assuming a plan is out of reach.",
      },
      {
        type: "p",
        text: "Those few extra minutes are the difference between a plan that quietly drains you and one that actually fits your life. The cheapest premium and the cheapest plan are rarely the same thing.",
      },
    ],
    related: ["health-insurance-explained", "dental-vision-insurance", "medicaid-explained"],
  },

  {
    slug: "dental-vision-insurance",
    order: 15,
    topicId: "insurance",
    title: "Dental and Vision Coverage, Explained",
    dek: "These plans work backwards from health insurance: generous with small bills, capped on big ones. That flips the math on whether to buy.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "Dental and vision are usually separate plans with their own premiums and rules.",
      "They cap what the *plan* pays each year, the opposite of health insurance's design.",
      "Dental plans typically pay 100% for preventive care, 80% for basic work, 50% for major work.",
      "If all you need is cleanings or one pair of glasses, paying cash can beat paying premiums.",
    ],
    body: [
      {
        type: "p",
        text: "Here's a surprise that catches a lot of people at their first open enrollment: for adults, teeth and eyes usually aren't covered by health insurance. Dental and vision come as separate plans with their own premiums, either as add-ons through a job or bought on your own. They borrow health insurance's vocabulary, but they work by a different logic, and understanding the difference is what tells you whether they're worth buying.",
      },
      {
        type: "h2",
        text: "The design runs backwards",
      },
      {
        type: "p",
        text: "Health insurance is built to cap *your* worst year: the out-of-pocket maximum limits what you can pay, and the plan absorbs a catastrophe ([Health Insurance, Explained](/learn/insurance/health-insurance-explained) covers how). A dental plan flips that. It comes with an **annual maximum**, often somewhere between $1,000 and $2,000, and that's the most the *plan* will pay in a year. You cover everything beyond it. So dental insurance is generous with routine care and weakest exactly when the bills get big. It's less a safety net than a discount program with a ceiling.",
      },
      {
        type: "key",
        text: "On a health plan, the annual cap protects you. On a dental plan, the annual cap protects the insurer. Once you see that, the rest of the fine print makes sense.",
      },
      {
        type: "h2",
        text: "The 100/80/50 structure",
      },
      {
        type: "p",
        text: "Most dental plans sort care into three tiers and pay a set share of each:",
      },
      {
        type: "list",
        items: [
          "**Preventive, usually covered 100%:** cleanings, routine exams, and X-rays, typically twice a year, often with no deductible.",
          "**Basic work, usually covered around 80%:** fillings and simple extractions. You pay the rest.",
          "**Major work, usually covered around 50%:** crowns, bridges, root canals, dentures. Your half of a crown is real money, and the annual maximum is looming the whole time.",
        ],
      },
      {
        type: "p",
        text: "Two more quirks to check before you buy: many plans make new members wait months (sometimes a year) before covering major work, so you can't sign up the week you need a crown. And the percentages assume in-network dentists, same as health coverage.",
      },
      {
        type: "h2",
        text: "Vision plans are smaller still",
      },
      {
        type: "p",
        text: "A typical vision plan charges a modest premium and gives you a yearly eye exam for a small copay, plus an allowance toward frames, lenses, or contacts. That's roughly the whole product. It's closer to a prepaid discount card than to insurance, which isn't a knock; if you wear glasses or contacts every year, a cheap employer vision plan often pays for itself. If you don't, it's a subscription to something you're not using.",
      },
      {
        type: "h2",
        text: "When paying cash wins",
      },
      {
        type: "p",
        text: "Because these plans cap their own payouts, the math is simple enough to do on a napkin. Add up a year of premiums. Compare it to what you'd pay in cash for the care you realistically use: two cleanings, an eye exam, a pair of glasses. If you have healthy teeth, no plan through work, and an individual policy would cost more than the cleanings it covers, cash wins. The calculation flips when an employer subsidizes the premium (often making it very cheap), when you know major work is coming, or when kids are involved; children's dental and vision are frequently folded into health plans. Either way, keep the preventive visits. Skipped cleanings have a way of coming back as fillings and crowns, which is the expensive tier of the chart above.",
      },
      {
        type: "h2",
        text: "Cheaper care without a plan",
      },
      {
        type: "p",
        text: "No coverage doesn't have to mean no care. Dental schools treat patients at a steep discount, with students working under licensed supervising dentists. Community health centers offer dental care on a sliding scale based on income. Many optometry schools run the same model for eye exams, and some school and community programs provide free vision screenings and glasses for kids. Ask any provider for their cash price too; like [medical bills](/learn/insurance/negotiating-medical-bills), the first number is often not the only number.",
      },
    ],
    related: ["health-insurance-explained", "choosing-a-health-plan", "negotiating-medical-bills"],
  },

  {
    slug: "auto-insurance-basics",
    order: 20,
    topicId: "insurance",
    title: "Auto Insurance Basics",
    dek: "Required almost everywhere, confusing almost everywhere. Here's what each coverage actually does.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "If you drive, auto insurance is legally required in most places.",
      "Liability covers damage you cause others; collision and comprehensive cover your own car.",
      "Your premium depends on your record, your car, your location, and your coverage.",
      "Too little liability can leave you personally on the hook for a huge bill.",
    ],
    body: [
      {
        type: "p",
        text: "If you drive, you need auto insurance. It's the law in most places, and getting caught without it brings its own pile of problems. But car insurance is sold with a wall of coverage names that blur together: liability, collision, comprehensive. Here's what each one does and which ones you actually need.",
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
          "**Liability:** covers the damage and injuries *you cause to other people* in an accident, including their car, their medical bills, and their property. This is the part that's legally required almost everywhere, because it makes sure the people you might hurt get covered.",
          "**Collision:** covers damage to *your own car* from a crash, whether you hit another car or a guardrail.",
          "**Comprehensive:** covers damage to your own car from things that *aren't* a crash: theft, vandalism, fire, hail, a falling tree, hitting an animal.",
        ],
      },
      {
        type: "key",
        text: "Liability protects other people from you. Collision and comprehensive protect your car. Liability is the part you're legally required to carry; the other two are about whether you could afford to fix or replace your own vehicle.",
      },
      {
        type: "p",
        text: "Collision and comprehensive come with a deductible, and it works the same way it does everywhere in insurance: pick a higher deductible and your premium drops, pick a lower one and it rises. [How Insurance Actually Works](/learn/insurance/how-insurance-works) covers that trade-off if you want a refresher.",
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
          "**Your driving record.** Accidents and tickets push your premium up; a clean record keeps it down.",
          "**Where you live.** Rates vary a lot by area, based on things like traffic, theft, and how often claims happen there.",
          "**The car itself.** What it costs to repair or replace, and how often that model gets stolen or wrecked. If you're [shopping for a used car](/learn/budgeting/buying-a-used-car), it's worth pricing insurance for a specific model before you commit to it.",
          "**Your coverage choices.** How much liability you carry, whether you add collision and comprehensive, and the deductible you pick.",
        ],
      },
      {
        type: "h2",
        text: "Why the cheapest policy can backfire",
      },
      {
        type: "p",
        text: "It's tempting to buy the bare-minimum policy and move on. The trap: if you carry only the lowest required liability and you cause a serious accident, your coverage can run out fast, and you're personally responsible for whatever's left. Medical bills and a totaled car can blow past a thin liability limit, and the rest comes out of *your* pocket.",
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
    related: ["after-a-car-accident", "how-insurance-works", "buying-a-used-car"],
  },

  {
    slug: "after-a-car-accident",
    order: 25,
    topicId: "insurance",
    title: "After a Car Accident: The Money Playbook",
    dek: "The minutes after a crash are chaos and the weeks after are paperwork. Here's the whole sequence, from photos at the scene to what happens to your rates.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "At the scene: get safe, document everything, exchange info, and don't debate fault.",
      "When your own policy fixes your car, your deductible comes out first.",
      "A rental car is only covered if you bought rental coverage before the crash.",
      "Small damage is sometimes better handled with cash or small-claims court than a claim.",
    ],
    body: [
      {
        type: "p",
        text: "Nobody thinks clearly right after a crash. Your hands are shaking, the other driver is talking at you, and traffic is inching past. That's exactly why it helps to learn the sequence now, while you're calm: what you do in the first ten minutes shapes everything the insurance companies decide later.",
      },
      {
        type: "h2",
        text: "At the scene",
      },
      {
        type: "steps",
        items: [
          "Check for injuries and get out of traffic. If anyone might be hurt, or the cars are blocking the road, call 911. A police report also becomes powerful evidence later.",
          "Photograph everything before the cars move, if it's safe: both vehicles from multiple angles, license plates, the whole scene, skid marks, traffic signs, and any visible injuries.",
          "Exchange information: names, phone numbers, insurance company and policy number, plate number, and the car's make and model. Photograph their insurance card and license instead of copying by hand.",
          "If anyone saw it happen, ask for their name and number. A neutral witness can settle a he-said-she-said.",
          "Say nothing about fault. Skip 'I'm sorry' and 'I didn't see you.' Stick to facts and checking that everyone's okay.",
        ],
      },
      {
        type: "key",
        text: "Fault is decided later, by insurers and sometimes police, from the evidence. It is not decided by what you blurt out while shaking on the shoulder. Politeness is fine; apologies get quoted back to you.",
      },
      {
        type: "h2",
        text: "Filing the claim",
      },
      {
        type: "p",
        text: "Tell your own insurer about the accident promptly, even if the other driver was clearly at fault; the other driver may tell their company a different story, and yours can't defend you if it doesn't know. From there, an adjuster reviews the evidence, fault gets assigned (sometimes split between drivers), and the damage gets estimated at a shop. If the other driver caused the crash, their liability coverage should pay for your car and your medical bills. If their insurer drags its feet, you can often use your own collision coverage to get repaired now and let your insurer chase theirs for reimbursement, which typically gets your deductible refunded if they collect.",
      },
      {
        type: "h2",
        text: "The deductible and the rental car",
      },
      {
        type: "p",
        text: "Two realities surprise people mid-claim. First, whenever your own collision coverage pays for your repair, your deductible comes out of your pocket before the insurer pays anything ([Auto Insurance Basics](/learn/insurance/auto-insurance-basics) covers the coverage types and how deductibles work). Second, your policy only pays for a rental while your car is in the shop if you bought rental reimbursement coverage beforehand; it's a cheap add-on that a lot of people discover they don't have at the worst moment. When the other driver is at fault, their insurer generally owes for a reasonable rental instead.",
      },
      {
        type: "h2",
        text: "Will your rates go up?",
      },
      {
        type: "p",
        text: "An at-fault accident usually raises your premium at renewal, and the surcharge can follow you for a few years. A claim where you weren't at fault, or a comprehensive claim like hail damage, tends to matter less, though rules vary by company and state. This is why claim size matters: if the damage is $700 and your deductible is $500, you'd collect $200 now and possibly pay far more than that in higher premiums later. For small, single-car dings, get a repair quote first and consider paying cash. For anything involving injuries or another driver, report it; those situations can grow, and you want your insurer on the record from day one.",
      },
      {
        type: "h2",
        text: "The small-claims option",
      },
      {
        type: "p",
        text: "Sometimes the at-fault driver has no insurance, or you decide to skip the claims process for a modest amount. Small-claims court exists for exactly this: filing costs little, you don't need a lawyer, and dollar limits (which vary by state, commonly several thousand dollars) cover most fender-benders. Your scene photos, the police report, repair estimates, and witness contacts are your whole case, which is one more reason the ten minutes of documentation matter. Send the other driver a written demand with your repair estimate first; plenty of these resolve without anyone seeing a courtroom.",
      },
    ],
    related: ["auto-insurance-basics", "how-insurance-works", "buying-a-used-car"],
  },

  {
    slug: "do-you-need-life-insurance",
    order: 30,
    topicId: "insurance",
    title: "Do You Even Need Life Insurance?",
    dek: "Cut through the sales pressure: the honest answer depends entirely on who relies on your income.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Life insurance exists to protect people who depend on your income.",
      "If no one relies on you financially, you may not need much yet.",
      "Term life is simple and affordable; whole life is far pricier.",
      "Salespeople often push the expensive kind, so know the difference first.",
    ],
    body: [
      {
        type: "p",
        text: "Few products come with as much sales pressure as life insurance. Someone may have already told you that you *must* buy a policy right now, ideally an expensive one. So set the pitch aside and start with the real question: does anyone actually depend on your income? (What follows is general education, not advice about your specific situation.)",
      },
      {
        type: "h2",
        text: "What life insurance is really for",
      },
      {
        type: "p",
        text: "Strip away the marketing and life insurance does one thing: if you die, it pays money to the people you name, so that the people who depend on your income aren't left financially stranded. That's the entire purpose. It isn't a way to make anyone rich, and it isn't primarily an investment. It replaces the income people were counting on.",
      },
      {
        type: "key",
        text: "The honest test is simple: would anyone be in financial trouble if your income suddenly disappeared? If yes, life insurance matters. If no, you may not need much, or any, just yet.",
      },
      {
        type: "h2",
        text: "When you probably don't need much yet",
      },
      {
        type: "p",
        text: "If you're single with no kids and nobody relies on your paycheck to get by, you likely don't need a big policy right now. There's no income for it to replace on anyone else's behalf. Buying a large, expensive policy in that situation mostly benefits the person selling it. It's fine to wait until your life actually calls for it.",
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
          "You support family members who count on what you send.",
          "You share a big debt, like a mortgage, that someone would be left carrying alone.",
        ],
      },
      {
        type: "p",
        text: "If any of those describe you, life insurance stops being a sales gimmick and becomes a real way to protect the people you love from a financial shock on top of a personal loss.",
      },
      {
        type: "h2",
        text: "Term vs. whole life",
      },
      {
        type: "p",
        text: "There are two broad kinds, and knowing the difference protects you from getting upsold:",
      },
      {
        type: "list",
        items: [
          "**Term life** covers you for a set period (a 'term,' like 10, 20, or 30 years). It's straightforward and relatively affordable, because it's pure protection with nothing else attached. For most people who need coverage, this is the fit: it protects your family during the years they depend on you.",
          "**Whole life (permanent)** covers you for your entire life and mixes in a savings or investment component. It costs much more for the same amount of protection, and it's the kind salespeople often push hardest, because it earns them more. It can make sense in specific, less common situations, but it's rarely the right starting point.",
        ],
      },
      {
        type: "p",
        text: "If part of the whole-life pitch is that it 'builds savings,' remember that protecting your family and growing your money are separate jobs. Many people are better served by affordable term coverage, with the monthly difference going toward their own [saving and investing](/learn/investing/saving-vs-investing).",
      },
      {
        type: "tip",
        text: "Many jobs offer some life insurance as a benefit, often at low or no cost. Check what your employer already provides before you buy anything on your own. You may have more coverage than you think.",
      },
      {
        type: "p",
        text: "Figure out whether anyone depends on your income first. If nobody does, you can relax about the sales pressure. If someone does, learn the difference between term and whole life before you sign anything, so you walk into the conversation already knowing what you need.",
      },
    ],
    related: ["how-insurance-works", "disability-insurance", "auto-insurance-basics"],
  },

  {
    slug: "disability-insurance",
    order: 35,
    topicId: "insurance",
    title: "Disability Insurance: The Coverage Nobody Mentions",
    dek: "Everything in your financial life runs on your paycheck. This is the insurance that protects the paycheck itself, and you may already have some.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "Disability insurance replaces part of your income when illness or injury keeps you from working.",
      "Short-term coverage handles weeks to months; long-term coverage handles the years after.",
      "Many jobs include coverage already. Check your benefits portal before buying anything.",
      "Social Security disability is slow, strict, and modest. Don't make it the plan.",
    ],
    body: [
      {
        type: "p",
        text: "Ask people what their most valuable asset is and they'll say their car, or maybe their savings. For most working people it's neither. It's the decades of paychecks still ahead of them, the income stream that pays for everything else. Life insurance gets all the attention, but during your working years, a serious illness or injury that stops you from earning is the more common threat, and it's the one almost nobody insures on purpose. Disability insurance does one job: if a medical problem keeps you from working, it replaces part of your paycheck while you recover.",
      },
      {
        type: "h2",
        text: "Short-term vs. long-term",
      },
      {
        type: "p",
        text: "Coverage comes in two lengths, built for two different problems:",
      },
      {
        type: "list",
        items: [
          "**Short-term disability** typically replaces somewhere around half to two-thirds of your pay for a few weeks up to several months, after a brief waiting period. It covers things like surgery recovery, a bad injury, or a rough illness, and it's commonly what pays you during parental leave after childbirth.",
          "**Long-term disability** picks up where short-term ends, often after about three months, and can keep paying a share of your income for years if you still can't work. This is the one that protects you from the true disaster: not six weeks off, but a condition that takes you out of work indefinitely.",
        ],
      },
      {
        type: "p",
        text: "If you can only have one, long-term is the one that matters. A few missed weeks is an emergency-fund problem. A few missed years is the kind of uninsurable-alone catastrophe [insurance exists for](/learn/insurance/how-insurance-works).",
      },
      {
        type: "h2",
        text: "You may already have some",
      },
      {
        type: "p",
        text: "Before buying anything, spend ten minutes in your employer's benefits portal (or ask HR). Many companies include short-term or long-term disability automatically at no cost, or offer it at group rates far cheaper than you could get alone. Look for what percentage of pay it replaces, how long payments last, and how long you must wait before they start. A handful of states also run their own short-term disability or paid family and medical leave programs that cover workers automatically; your state's labor department site will say. Plenty of people are carrying coverage they've never once looked at.",
      },
      {
        type: "h2",
        text: "Why Social Security disability isn't the plan",
      },
      {
        type: "p",
        text: "There is a public backstop: Social Security Disability Insurance (SSDI), which you fund through the payroll taxes on every paycheck. It's real, and for people with long-lasting, severe conditions it matters. But it makes a poor primary plan. The definition of disability is strict (generally, being unable to do substantially any work for at least a year), initial applications take months to process and are frequently denied, appeals can stretch far longer, and the monthly benefit is modest compared to most salaries. SSDI is the floor under the worst cases. It is not a substitute for coverage that starts paying within weeks and reflects your actual income.",
      },
      {
        type: "h2",
        text: "What it costs on your own",
      },
      {
        type: "p",
        text: "If work doesn't offer coverage (common with gig work, restaurant jobs, and small employers), you can buy an individual long-term policy. For a young, healthy person the price is usually manageable, commonly quoted as a rough 1% to 3% of the salary being protected, and locking in a policy while you're healthy is what keeps it cheap. Price scales with how much income you replace, how long the benefit lasts, and how long you can wait before payments begin; choosing a longer waiting period is the classic way to trim the premium, if your emergency fund can bridge the gap.",
      },
      {
        type: "tip",
        text: "One term worth knowing when you compare policies: **own-occupation** coverage pays if you can't do *your* job, while any-occupation coverage pays only if you can't do much of *any* job. Own-occupation costs more and protects you better.",
      },
      {
        type: "p",
        text: "Start with the benefits portal this week. If solid long-term coverage is already there, you're done, and you learned it for free. If it isn't, price a policy while you're young and healthy. Either way, the paycheck that funds [your health coverage](/learn/insurance/health-insurance-explained), your rent, and every plan you have deserves the same protection you'd give a car.",
      },
    ],
    related: ["do-you-need-life-insurance", "insurance-checkup", "health-insurance-explained"],
  },

  {
    slug: "negotiating-medical-bills",
    order: 40,
    topicId: "insurance",
    title: "How to Fight a Medical Bill",
    dek: "That terrifying number is often not final. Here's how to shrink a medical bill before you pay it.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Don't pay in a panic or ignore the bill. Ask for an itemized bill first.",
      "Billing errors are common, and so are programs that lower what you owe.",
      "Nonprofit hospitals are generally required to offer financial assistance. Ask.",
      "Avoid moving medical debt onto a credit card if you possibly can.",
    ],
    body: [
      {
        type: "p",
        text: "A big medical bill in the mailbox is one of the scariest pieces of paper there is. The number can feel final and impossible. It usually isn't. Medical bills are among the most negotiable bills in American life, but only if you know to push back.",
      },
      {
        type: "p",
        text: "The two most tempting moves are the two worst ones: paying immediately in a panic, or ignoring the bill until it grows teeth. There's a calmer middle path, and it starts with a phone call.",
      },
      {
        type: "h2",
        text: "Step one: ask for an itemized bill",
      },
      {
        type: "p",
        text: "The bill you get in the mail is usually just a total, a lump sum with almost no detail. Call the billing office and ask for an *itemized bill*, which lists every single charge line by line. This is how you check the math, and the math is wrong more often than you'd think.",
      },
      {
        type: "p",
        text: "Medical billing is done by people and software, and both make mistakes. Once you have the itemized list, read it like a receipt you don't trust, looking for:",
      },
      {
        type: "list",
        items: [
          "**Duplicate charges:** the same test, room, or supply billed twice.",
          "**Services you never got:** a procedure or medication that wasn't actually yours.",
          "**Wrong quantities:** billed for a full day when you were there for an hour.",
          "**Charges your insurance should have covered:** sometimes a claim was filed wrong, not that you owe the money. If terms like deductible and coinsurance are fuzzy, [Health Insurance, Explained](/learn/insurance/health-insurance-explained) covers them.",
        ],
      },
      {
        type: "tip",
        text: "You're allowed to ask what a charge means in plain English. 'Can you explain this line?' is a completely normal question, and billing offices hear it every day.",
      },
      {
        type: "h2",
        text: "Ask about financial assistance, even if you doubt you qualify",
      },
      {
        type: "p",
        text: "This is the part almost nobody knows about, and it's the most important. Nonprofit hospitals are generally required to offer a *financial assistance* program, sometimes called *charity care*, that can dramatically reduce or even wipe out a bill for people with limited income. Many people who would qualify never apply, simply because no one told them it exists.",
      },
      {
        type: "p",
        text: "You don't have to guess whether you qualify. Call the hospital's billing or financial-assistance office and ask directly: 'Do you have a financial assistance program, and how do I apply?' They'll tell you what paperwork they need. It's worth asking even if you have insurance, and even if your income isn't extremely low, because every hospital sets its own rules. If your income is low, it's also worth checking whether you qualify for [Medicaid](/learn/government-aid/medicaid-explained).",
      },
      {
        type: "key",
        text: "Charity care isn't a favor you're begging for. It's a program hospitals are generally required to have, and asking about it is the single highest-value thing you can do with a big medical bill.",
      },
      {
        type: "h2",
        text: "Ask for a discount or a no-interest payment plan",
      },
      {
        type: "p",
        text: "If you don't qualify for financial assistance, you still have room to move. Hospitals frequently accept less than the sticker price, especially if you can pay something promptly. Two things worth asking for:",
      },
      {
        type: "list",
        items: [
          "**A discount.** Ask if there's a lower 'self-pay' or 'prompt-pay' price. The amount on the bill is often a starting point, not the floor.",
          "**A no-interest payment plan.** Many hospitals will let you split the bill into smaller monthly amounts with *no interest*, which turns a scary total into a manageable line in your budget.",
        ],
      },
      {
        type: "p",
        text: "Be polite, be honest about what you can afford, and don't be afraid to name a number. 'I want to take care of this. Realistically I can pay this much a month. What can we work out?' is a reasonable way to open. You're not being difficult; this is exactly what the billing office is set up to handle.",
      },
      {
        type: "h2",
        text: "The credit card trap",
      },
      {
        type: "p",
        text: "When a bill feels urgent, putting it on a regular credit card, or signing up for a special 'medical credit card' pushed at the front desk, can feel like a quick fix. It usually turns a manageable debt into a worse one.",
      },
      {
        type: "p",
        text: "A medical bill is often negotiable, frequently interest-free once you set up a plan, and tends to be handled more gently than other debt. The moment you move it onto a credit card, you generally lose all of that, and you can be stuck paying high interest on top of the original amount. If you can possibly avoid it, don't trade a flexible bill for an expensive one.",
      },
      {
        type: "h2",
        text: "Know you have protections, too",
      },
      {
        type: "p",
        text: "You also have protections against many *surprise* bills: the kind that show up when you went to an in-network hospital but got treated by an out-of-network doctor you never chose, often in an emergency. If a bill looks like one of these, don't assume you simply owe it. Push back and ask whether it should have been covered.",
      },
      {
        type: "p",
        text: "None of this requires being an expert or being aggressive. It requires knowing the bill is a starting point, not a verdict, and making a few calls before you reach for your wallet.",
      },
    ],
    related: [
      "health-insurance-explained",
      "medicaid-explained",
      "what-happens-if-you-dont-pay-debts",
    ],
  },

  {
    slug: "insurance-checkup",
    order: 5,
    topicId: "insurance",
    title: "The Insurance Checkup: What You Actually Need Right Now",
    dek: "Coverage needs follow your life, not an ad's script. Find your situation on this list, read the guide for it, and skip the rest.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "Your insurance needs map to your life: your body, your lease, your car, and whoever counts on your paycheck.",
      "Disability insurance fits most workers; life insurance only makes sense if someone depends on your income.",
      "Renters insurance is the cheapest serious coverage most people skip.",
      "Extended warranties and flight insurance mostly move money from you to a marketing department.",
    ],
    body: [
      {
        type: "p",
        text: "Insurance ads sell fear in every direction, so it's easy to end up paying for coverage you don't need while a real gap sits open. The fix is a quick checkup. This isn't a sequence to read top to bottom: go down the list, stop at each situation that describes you, and read the guide for that stop. (If premiums and deductibles are still fuzzy, [How Insurance Actually Works](/learn/insurance/how-insurance-works) is the ten-minute foundation for everything below.)",
      },
      {
        type: "h2",
        text: "You have a body",
      },
      {
        type: "p",
        text: "Health coverage is the non-negotiable one, because hospital bills come in amounts no paycheck absorbs. [Health Insurance, Explained](/learn/insurance/health-insurance-explained) covers how the system works and the ways to get covered even on a small income. If you're choosing between plans at work or on the marketplace, [How to Choose a Health Plan](/learn/insurance/choosing-a-health-plan) turns the premium-versus-deductible tradeoff into an actual decision.",
      },
      {
        type: "h2",
        text: "You rent your place",
      },
      {
        type: "p",
        text: "Your landlord's policy covers the building, not one thing you own inside it. [Renters Insurance: Cheap Protection Most People Skip](/learn/home-ownership/renters-insurance) explains the $15-to-$20-a-month policy that replaces your stuff after a fire, theft, or burst pipe.",
      },
      {
        type: "h2",
        text: "You drive",
      },
      {
        type: "p",
        text: "[Auto Insurance Basics](/learn/insurance/auto-insurance-basics) sorts out liability, collision, and comprehensive, and which ones your state and your car actually call for. Keep [After a Car Accident: The Money Playbook](/learn/insurance/after-a-car-accident) in your back pocket for the day you need to know what to photograph, say, and file.",
      },
      {
        type: "h2",
        text: "Someone counts on your paycheck (or nobody does)",
      },
      {
        type: "p",
        text: "For most workers, the biggest unprotected asset is the paycheck itself, which is why [Disability Insurance: The Coverage Nobody Mentions](/learn/insurance/disability-insurance) applies to far more people than life insurance does. Life insurance is the reverse case: [Do You Even Need Life Insurance?](/learn/insurance/do-you-need-life-insurance) gives the honest answer, which is only if someone would be financially stranded without you. No dependents usually means no policy, whatever the salesperson says.",
      },
      {
        type: "h2",
        text: "Teeth and eyes",
      },
      {
        type: "p",
        text: "[Dental and Vision Coverage, Explained](/learn/insurance/dental-vision-insurance) covers why these ride separately from health insurance and when paying cash beats paying premiums.",
      },
      {
        type: "h2",
        text: "A medical bill came back wrong or huge",
      },
      {
        type: "p",
        text: "Not insurance, but the same fight. [How to Fight a Medical Bill](/learn/insurance/negotiating-medical-bills) walks through billing errors, negotiation, and hospital financial-assistance policies before a bill ends up on a credit card.",
      },
      {
        type: "h2",
        text: "The insurance you can skip",
      },
      {
        type: "p",
        text: "Extended warranties on electronics, insurance for a routine flight, coverage on anything you could afford to replace out of pocket: these mostly exist because they're profitable to sell, not because you need them. The test never changes. Insure the disasters you couldn't cover yourself, and self-insure the rest.",
      },
      {
        type: "h2",
        text: "The checkup, in order",
      },
      {
        type: "steps",
        items: [
          "Confirm you have health coverage. It's the one gap that can genuinely wreck you.",
          "Match the middle of the list to your actual life: lease, car, paycheck, dependents.",
          "Cancel or decline the skippable stuff, and put what you were paying toward an emergency fund the size of your biggest deductible.",
        ],
      },
      {
        type: "p",
        text: "Then redo the checkup when life shifts: a new lease, a first car, a baby, a job with different benefits. Each of those moves one line of this list from skippable to necessary, and the guides above will still be here when it does.",
      },
    ],
    related: ["how-insurance-works", "choosing-a-health-plan", "disability-insurance"],
  },
];
