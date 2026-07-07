import type { Article } from "./types";

export const budgetingEarningArticles: Article[] = [
  {
    slug: "your-first-paycheck",
    order: 80,
    topicId: "budgeting",
    title: "What to Do With Your First Paycheck",
    dek: "The money from a first real job is a big deal. Here's a simple, no-pressure playbook for it.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Your take-home pay is smaller than your salary. Start there.",
      "Cover your real needs first, then give the rest a job.",
      "Send a little to savings *before* lifestyle creeps up.",
      "Watch for lifestyle inflation, when spending eats every raise.",
    ],
    body: [
      {
        type: "p",
        text: "Your first real paycheck is a moment. After all the years of being told money would matter someday, here it is: actual money, with your name on it, that you earned. It's exciting, and it's a little nerve-racking, because now there's a quiet question underneath: *am I doing this right?* You don't need a perfect plan. You just need a few simple moves, and you'll be ahead of most people who never got taught any of this.",
      },
      {
        type: "h2",
        text: "First, know what you actually keep",
      },
      {
        type: "p",
        text: "The part that surprises almost everyone: the first paycheck is smaller than expected. The salary or hourly rate you were promised is the number *before* taxes and other deductions come out. What's left, what actually lands in your account, is your take-home pay, and that's the number your whole plan runs on.",
      },
      {
        type: "p",
        text: "Pull up your pay stub the first time you get paid and actually read it. It lists what you earned and every dollar that got taken out: federal and state taxes, Social Security and Medicare, maybe health insurance or retirement. It's not money vanishing into thin air, and seeing where it goes makes the smaller number a lot less alarming.",
      },
      {
        type: "tip",
        text: "If the deductions look confusing, you're not missing something obvious; pay stubs are genuinely cryptic the first few times. [How to Read Your Pay Stub](/learn/budgeting/how-to-read-a-pay-stub) breaks every line down in plain language. And how much tax comes out is set by your W-4, the form you filled out when you were hired — [here's how to get it right](/learn/taxes/how-to-fill-out-w4).",
      },
      {
        type: "h2",
        text: "Cover your needs before anything else",
      },
      {
        type: "p",
        text: "Before you think about spending or saving, make sure the essentials are handled. Rent, food, getting to work, your phone, insurance, any minimum debt payments: the stuff your life genuinely can't run without. Those come off the top. Everything else is a decision you get to make on purpose.",
      },
      {
        type: "h2",
        text: "Split the rest — and pay future you first",
      },
      {
        type: "p",
        text: "Once needs are covered, divide what's left in a way that builds a good habit early. A clean starting point is the [50/30/20 rule](/learn/budgeting/50-30-20-rule): most of your take-home for needs, a chunk for the things that make life good, and a slice for savings. The exact percentages matter less than the *order*.",
      },
      {
        type: "key",
        text: "Pay future you first. Move a little to savings the moment you get paid, before you spend a dollar of it. Even a small amount, automatically, builds a cushion and a habit at the same time.",
      },
      {
        type: "p",
        text: "That cushion has a name worth knowing: an emergency fund. It's money set aside for the day something goes wrong, like a car repair, a missed shift, or a surprise bill. Starting one now, while you can, means a bad week never turns into a debt you spend a year digging out of.",
      },
      {
        type: "h2",
        text: "Watch out for lifestyle creep",
      },
      {
        type: "p",
        text: "This is the trap that quietly catches people for *years*. When your income goes up (a raise, a better job, more hours), your spending tends to rise right along with it. A nicer apartment, better takeout, the upgraded phone. It feels earned, and a little of it is fine. But if spending always rises to swallow every raise, you can make a lot more money over time and somehow never feel any further ahead. That's *lifestyle inflation*, and one move beats it: when your income jumps, send some of the increase to savings *before* you get used to spending it.",
      },
      {
        type: "p",
        text: "You don't have to get any of this perfect with your first paycheck. Cover what matters, save a little, and stay aware of where the rest is going. Those are the habits that make every paycheck after this one easier.",
      },
    ],
    related: ["how-to-read-a-pay-stub", "building-your-first-budget", "turning-18-money"],
    quiz: [
      {
        question: "Why is your first paycheck smaller than the pay rate you were promised?",
        options: [
          "Your employer made a mistake you should report",
          "Taxes and other deductions come out before it reaches you",
          "New employees are paid less for the first few checks",
        ],
        answer: 1,
        explain:
          "The rate you were promised is the number before taxes, Social Security, Medicare, and other deductions. Your take-home pay is what's left, and that's the number your plan runs on.",
      },
      {
        question: "When should you move money into savings?",
        options: [
          "The moment you get paid, before you spend anything",
          "At the end of the month, with whatever's left over",
          "Once you're earning enough to save a big amount",
        ],
        answer: 0,
        explain:
          "Paying future you first means the savings actually happen. Even a small automatic amount builds a cushion and a habit at the same time.",
      },
      {
        question: "What is lifestyle inflation?",
        options: [
          "When rising prices make your paycheck buy less",
          "When your rent goes up every year",
          "When your spending rises to swallow every raise",
        ],
        answer: 2,
        explain:
          "If spending always climbs with income, you can earn more for years and never feel further ahead. Sending part of each raise to savings before you get used to it is the fix.",
      },
    ],
  },

  {
    slug: "reading-a-job-offer",
    order: 90,
    topicId: "budgeting",
    title: "How to Read a Job Offer (It's More Than the Salary)",
    dek: "Two jobs can offer the same salary and be worth wildly different amounts. Here's how to see the whole picture.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "The salary is one piece of a much bigger number.",
      "Benefits like health insurance, retirement, and time off have real dollar value.",
      "An employer 401(k) match is essentially free money you shouldn't leave behind.",
      "Compare total compensation, and ask questions before you say yes.",
    ],
    body: [
      {
        type: "p",
        text: "When a job offer comes in, your eyes go straight to one number: the salary. That's natural. It's the number everyone asks about. But it's genuinely only part of what a job is worth. Two offers with the exact same salary can leave you thousands of dollars apart by the end of the year, depending on everything *around* that number. Learning to see the whole picture is one of the most valuable money skills there is, and almost nobody is taught it.",
      },
      {
        type: "h2",
        text: "Salary is just the headline",
      },
      {
        type: "p",
        text: "The salary or hourly wage tells you what you'll earn for the work itself. It matters a lot, but it's the *headline*, not the whole story. The full story is called total compensation: your pay plus everything else the job provides that has real value. Once you start adding that up, offers can look very different from how they looked at first glance.",
      },
      {
        type: "h2",
        text: "The benefits that actually move the needle",
      },
      {
        type: "p",
        text: "These are the pieces worth weighing alongside the salary:",
      },
      {
        type: "list",
        items: [
          "**Health insurance.** If the job covers most of your premium, that's a major benefit — paying for your own health coverage is expensive. Check how much *you'd* pay out of each paycheck and what the plan actually covers.",
          "**Retirement plan and the match.** Many employers offer a 401(k) and will *match* part of what you put in. More on this below; it's the part people most often overlook.",
          "**Paid time off.** Paid vacation, sick days, and holidays are days you get paid without working. More of them is real value, even though it never shows up in the salary line.",
          "**Everything else.** Tuition help, transit passes, a phone stipend, parental leave, bonuses. None of it is in the salary number, but all of it is money or time in your pocket.",
        ],
      },
      {
        type: "key",
        text: "An employer [401(k) match](/learn/investing/what-is-a-401k) is as close to free money as it gets. If your job adds, say, fifty cents for every dollar you contribute up to some limit, that's an instant return on your own savings — money you walk away from if you don't contribute enough to get the full match. When you can, contribute at least enough to grab all of it.",
      },
      {
        type: "h2",
        text: "How to compare two offers fairly",
      },
      {
        type: "p",
        text: "When you're weighing offers, don't just line up the salaries. Try to weigh the whole package, and remember that a job with a slightly lower salary but strong health coverage, a good match, and more time off can genuinely be the richer offer. A few things to factor in:",
      },
      {
        type: "list",
        items: [
          "What you'd actually pay for health insurance out of each paycheck, and how good the coverage is.",
          "Whether there's a retirement match, and how much you'd have to contribute to get all of it.",
          "How much paid time off you get, and whether the schedule fits your life.",
          "Real costs of the job, like a long commute, required equipment, or a city where everything costs more.",
        ],
      },
      {
        type: "tip",
        text: "Don't try to do the tax math in your head. Pay is taxed before it reaches you, and the after-tax difference between two salaries is smaller than the gap looks. Lean on a take-home estimator and [our pay-stub guide](/learn/budgeting/how-to-read-a-pay-stub) instead of guessing.",
      },
      {
        type: "h2",
        text: "Ask questions before you accept",
      },
      {
        type: "p",
        text: "It is completely normal, expected even, to ask questions about an offer before saying yes. It does not make you look ungrateful or difficult. Good things to ask: When does health insurance start? Is there a 401(k) match, and how does it work? How much paid time off, and how does it build up? Is there a waiting period before benefits kick in? You can also ask for a day or two to think it over; reasonable employers won't blink.",
      },
      {
        type: "p",
        text: "One more practical note: once you start, there's usually a benefits *enrollment* window, a short period where you choose your health plan, set your retirement contribution, and pick other options. Don't sleep through it. Missing it can mean waiting a whole year to enroll or leaving that match on the table. Read what HR sends you, and ask if anything's unclear.",
      },
      {
        type: "p",
        text: "The salary gets you in the door of the conversation. The full package is what you're actually agreeing to. Look at all of it, ask your questions, and you'll choose the offer that's genuinely best for you, not just the one with the biggest headline.",
      },
    ],
    related: ["how-to-ask-for-a-raise", "your-first-paycheck", "how-to-read-a-pay-stub"],
  },

  {
    slug: "how-to-ask-for-a-raise",
    order: 100,
    topicId: "budgeting",
    title: "How to Ask for a Raise",
    dek: "It feels terrifying. It's also normal, expected, and very learnable. Here's how to do it calmly.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Asking for a raise is normal and expected, not greedy.",
      "Build your case with specific wins and added responsibilities.",
      "Know a rough market rate for your role before you ask.",
      "Timing and a calm, simple script do most of the work.",
    ],
    body: [
      {
        type: "p",
        text: "For a lot of people, asking for a raise feels almost physically impossible. If you grew up being told to keep your head down, be grateful for what you have, and not make a fuss, walking into your boss's office to ask for more money can feel terrifying, even rude. So let's say the most important thing first: asking is normal. Employers expect it. It is part of how working actually works, and getting good at it can be worth more over a career than almost any other money skill. (If the problem is pay you've already *earned* going missing, that's not a raise conversation; see [Getting Paid What You're Owed](/learn/budgeting/know-your-rights-as-a-worker).)",
      },
      {
        type: "key",
        text: "Asking for a raise is not greedy. You're asking to be paid fairly for work you're already doing. The worst realistic outcome is a 'not right now,' which is just information you can use.",
      },
      {
        type: "h2",
        text: "Build your case first",
      },
      {
        type: "p",
        text: "A raise conversation goes a lot better when you walk in with evidence instead of just a feeling. Your job before the conversation is to gather it.",
      },
      {
        type: "steps",
        items: [
          "Write down your wins. List specific things you've accomplished — projects you finished, problems you solved, goals you hit. Use real numbers wherever you can.",
          "Note what's grown. Have you taken on responsibilities beyond what you were originally hired for? Are you training others, covering more, owning something new? That's a stronger case than time served alone.",
          "Find a rough market rate. Look up what people in your role, your area, and your level of experience typically earn, using public salary sites or people you trust in the field. You want a realistic range, not a dream number.",
          "Decide your ask. Settle on a specific figure or range that's grounded in your value and that market rate, so the conversation isn't vague.",
        ],
      },
      {
        type: "h2",
        text: "Time it well",
      },
      {
        type: "p",
        text: "*When* you ask matters almost as much as how. Good moments tend to be after a clear win, during a scheduled performance review, when you've just taken on more, or when the company is doing well. Tougher moments: right after the business has had a bad stretch, during layoffs, or when your manager is visibly underwater. You can't always control the timing, but a little patience for a good window helps.",
      },
      {
        type: "h2",
        text: "Keep the conversation calm and simple",
      },
      {
        type: "p",
        text: "You don't need a dramatic speech. A short, steady, specific ask lands better than a nervous ramble. Something like:",
      },
      {
        type: "p",
        text: "*\"Thanks for making time. Over the past year I've taken on [specific responsibilities] and delivered [specific results]. Based on that and on what's typical for this role, I'd like to talk about adjusting my pay to [your number or range]. Can we make that work?\"*",
      },
      {
        type: "p",
        text: "Then comes the hard part: stop talking and let them respond. Silence feels uncomfortable, but it's not your job to fill it. Stay calm, stay friendly, and let them think.",
      },
      {
        type: "tip",
        text: "If the answer is no or not yet, don't take it as a door slamming. Ask the most useful question there is: *\"What would I need to do to get there, and can we set a time to revisit this?\"* That turns a 'no' into a roadmap and a follow-up date.",
      },
      {
        type: "p",
        text: "You won't always get a yes, and that's okay. But you almost never get what you don't ask for, and the asking gets less scary each time you do it. Prepare, stay calm, and treat it as the normal conversation it actually is.",
      },
    ],
    related: ["reading-a-job-offer", "cost-of-living", "your-first-paycheck"],
  },

  {
    slug: "side-hustles-honestly",
    order: 110,
    topicId: "budgeting",
    title: "Side Hustles, Honestly",
    dek: "A hype-free look at earning extra money: what actually works, what's a scam, and the tax part nobody mentions.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Real side income usually trades your time for money, and that's fine.",
      "Legit options: gig work, freelancing a skill, selling things.",
      "If it asks you to *pay* to start or promises easy riches, be very skeptical.",
      "Side income is taxable with nothing withheld, so set some aside.",
    ],
    body: [
      {
        type: "p",
        text: "The internet is loud about side hustles. Everywhere you look, someone's promising you can replace your income from your couch, be your own boss, and quit your job by next quarter. Some of that is real. A lot of it is a sales pitch. This is the honest version, with no get-rich-quick energy: how people actually earn a little extra, how to spot the traps, and the one boring detail almost nobody warns you about.",
      },
      {
        type: "h2",
        text: "What actually works",
      },
      {
        type: "p",
        text: "Most legitimate side income comes down to a few familiar shapes:",
      },
      {
        type: "list",
        items: [
          "**Gig work.** Driving, delivering, task and errand apps. Steady demand, flexible hours, and you can usually start fast. The pay is modest and you cover your own costs, like gas and wear on your car.",
          "**Freelancing a skill.** Getting paid for something you can already do — writing, design, tutoring, photography, fixing things, handiwork. This tends to pay better than gig work once you build a little reputation.",
          "**Selling things.** Flipping secondhand finds, making something by hand, clearing out stuff you no longer use. Real money, though it takes time to source, list, and ship.",
        ],
      },
      {
        type: "key",
        text: "The honest part: almost all real side income trades your time for money. That's not a knock on it; it's just the truth. A side hustle can ease a tight stretch or fund a goal, but it usually won't fix a budget that doesn't add up. The math underneath still has to work.",
      },
      {
        type: "h2",
        text: "How to spot the scams and traps",
      },
      {
        type: "p",
        text: "Wherever people need extra money, someone is trying to take it. The pitches dressed up as 'opportunities' tend to follow the same patterns. Be very skeptical when you see these:",
      },
      {
        type: "list",
        items: [
          "**It asks you to *pay* to start.** Legitimate work pays *you*. If you have to buy a starter kit, pay for 'training,' or front money for inventory before you earn a cent, that's a major red flag.",
          "**It promises big, easy, guaranteed money.** Real earning is rarely fast or effortless. 'Make thousands a week from home, no experience needed' is the language of a scam, not a job.",
          "**Your income depends on recruiting other people.** That's the signature of a multi-level marketing (MLM) setup, where most participants lose money and the real money flows to whoever's at the top and recruited everyone below.",
          "**It pressures you to decide *right now*.** Urgency ('spots are almost gone,' 'this price ends tonight') is designed to stop you from thinking it through or looking it up.",
        ],
      },
      {
        type: "tip",
        text: "Before joining anything that wants money up front, search its name plus the word 'scam' or 'complaints,' and ask plainly: how do *I* actually get paid, and who's making money off *me*? A real opportunity survives those questions easily.",
      },
      {
        type: "h2",
        text: "The tax part nobody mentions",
      },
      {
        type: "p",
        text: "Now the detail that catches people off guard: money you earn from a side hustle or gig work is taxable income, but unlike a regular paycheck, *no taxes are taken out for you*. With a normal job, taxes come out before you ever see the money. With side income, the full amount hits your account, and you're responsible for the taxes on it later.",
      },
      {
        type: "p",
        text: "That trips up a lot of first-time gig workers, who spend it all and then owe a chunk at tax time. The fix is to set aside a portion of every payment in savings so the bill doesn't blindside you. How much to set aside, what to track, and how to file are their own subject: [Taxes for Gig and 1099 Work](/learn/taxes/gig-1099-taxes) walks through all of it, and [Taxes When You're Self-Employed](/learn/taxes/self-employment-taxes) goes deeper if the hustle turns into a real business.",
      },
      {
        type: "p",
        text: "A side hustle can be genuinely worth it. Just go in clear-eyed: pick something legitimate, ignore anyone promising easy riches, set aside money for taxes, and treat it as a helpful boost, not a magic fix.",
      },
    ],
    related: ["budgeting-irregular-income", "your-first-paycheck", "managing-financial-stress"],
  },

  {
    slug: "leasing-vs-buying-car",
    order: 140,
    topicId: "budgeting",
    title: "Leasing vs. Buying a Car",
    dek: "The lease payment looks friendlier. Here's the math behind it, and who actually comes out ahead.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A lease is a long-term rental: lower payments, and you own nothing at the end.",
      "Mileage caps and wear charges can quietly erase the payment advantage.",
      "Leasing means a car payment forever; buying means the payments eventually stop.",
      "On a tight budget, a solid used car is almost always the better answer.",
    ],
    body: [
      {
        type: "p",
        text: "The ads make it look obvious: lease a brand-new car for $299 a month, or finance the same car for something like $550. If you compare only the monthly payments, leasing wins every time. That's exactly why the comparison is framed that way. To decide for real, you have to look at what each payment is actually buying you.",
      },
      {
        type: "h2",
        text: "What a lease actually is",
      },
      {
        type: "p",
        text: "A lease is a long-term rental with a dressed-up vocabulary. You pay for the chunk of value the car loses while you drive it (the depreciation), plus a finance charge the industry calls a *money factor*, plus fees. After two or three years you hand the keys back and own nothing. The payment is lower than a loan payment because you're only paying for a slice of the car, and that's fair enough, as long as you're clear that at the end of a loan you own a car and at the end of a lease you own a memory.",
      },
      {
        type: "h2",
        text: "The fine print that changes the math",
      },
      {
        type: "list",
        items: [
          "**Mileage caps.** Most leases allow 10,000 to 12,000 miles a year. Go over and you pay per mile at turn-in, commonly somewhere around 25 cents. Drive 5,000 miles too many over the lease and that's roughly $1,250 due at once. Your contract states your exact cap and rate; read it before you sign, not after.",
          "**Wear-and-tear charges.** Normal use is included, but the lease company decides what 'normal' means. Scuffed wheels, a stained seat, a door ding, a chipped windshield: each can show up as a charge when you return the car.",
          "**Fees at both ends.** An acquisition fee to start (often $600 to $1,000) and a disposition fee to leave (often $300 to $400), plus taxes and registration. These rarely make it into the ad.",
          "**The always-a-payment cycle.** When the lease ends, you have no car and no trade-in, so the natural move is to lease again. Do that for a decade and you've made 120 car payments with nothing to show for them.",
        ],
      },
      {
        type: "h2",
        text: "Compare total cost, not monthly cost",
      },
      {
        type: "p",
        text: "Run both paths over the same six years. Two back-to-back three-year leases at $299 is about $21,500 before fees and any mileage charges, and at the end you own nothing and are still paying. Buying a $22,000 car with a five-year loan costs more per month while the loan runs, but year six is payment-free and you're holding a car you can drive for years or trade in. The longer you keep a car after the loan ends, the more decisively buying wins. The [auto loan calculator](/tools/debt/auto-loan) will show you what any price, rate, and term really cost per month, which makes this comparison concrete instead of vibes-based.",
      },
      {
        type: "h2",
        text: "When leasing genuinely fits",
      },
      {
        type: "p",
        text: "Leasing isn't a scam; it's a specific product for a specific customer. It can make sense if all of these are true: you want a new car every few years and you're honest that you're paying for that preference, your annual mileage is low and predictable, and the payment fits your budget with real room to spare. You also get a car that's under warranty the entire time, which means repair surprises mostly aren't your problem. If that describes you and you've done the total-cost math, a lease is a legitimate choice.",
      },
      {
        type: "h2",
        text: "On a tight budget, the answer is used",
      },
      {
        type: "p",
        text: "If money is tight, the lease-versus-new-purchase debate is mostly a distraction, because the strongest option isn't in it. A reliable used car, bought carefully, costs less to buy, less to insure, and loses value far more slowly than anything new. [Buying a Used Car Without Getting Ripped Off](/learn/budgeting/buying-a-used-car) covers the whole process, including budgeting for the full cost of ownership rather than the sticker.",
      },
      {
        type: "key",
        text: "Whatever you drive off in, never negotiate on the monthly payment alone. Dealers can hit any payment you name by stretching the term or burying costs. Negotiate the total price of the car (or the full cost of the lease), and let the payment fall out of that.",
      },
    ],
    related: ["buying-a-used-car", "auto-insurance-basics", "sinking-funds"],
  },
];
