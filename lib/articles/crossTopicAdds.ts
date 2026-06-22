import type { Article } from "./types";

export const crossTopicAddsArticles: Article[] = [
  {
    slug: "payday-loans-and-predatory-lending",
    order: 60,
    topicId: "government-aid",
    title: "Payday Loans and Predatory Lending",
    dek: "These businesses cluster where money is tightest — because they make the most money when you're desperate.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "A payday loan's fee usually works out to a staggering yearly rate — often around 400%.",
      "The real trap is the 'rollover,' where you can't repay and the debt grows.",
      "Car-title loans, rent-to-own, and high-cost installment loans run the same play.",
      "Real alternatives exist — a credit union, a payment plan, 211, or your employer.",
    ],
    body: [
      {
        type: "p",
        text: "Notice how check-cashing places, payday lenders, and 'easy cash' storefronts seem to cluster in low-income and immigrant neighborhoods, not wealthy ones? That's not an accident. These businesses do their best business when people are stretched thin and out of options — when you need money *today* and the bank feels out of reach. This isn't about being bad with money. It's about an industry built to profit from a hard moment. Here's how it works, so it can't work on you.",
      },
      {
        type: "h2",
        text: "How a payday loan actually works",
      },
      {
        type: "p",
        text: "A payday loan is a small, short-term loan — you borrow a few hundred dollars and promise to pay it back on your next payday, usually in about two weeks. The fee sounds small at the counter: maybe $15 for every $100 you borrow. The problem is what that fee means once you stretch it out over a year.",
      },
      {
        type: "p",
        text: "That little fee translates into an *annual percentage rate* — APR — that's often around 400%. For comparison, even a high-interest credit card is usually under 30%. You're not borrowing at a slightly worse rate than a card. You're borrowing at a rate many times higher.",
      },
      {
        type: "key",
        text: "A payday loan isn't really designed to be paid off in two weeks — it's designed to be *rolled over*. That's where the trap snaps shut.",
      },
      {
        type: "p",
        text: "Here's the trap. When payday comes, most people can't spare the whole loan plus the fee — that's the exact situation that sent them in. So the lender lets you 'roll it over': pay just the fee and push the loan to next payday. You pay again, and the original debt hasn't moved an inch. Many people roll a single loan over and over, paying far more in fees than they ever borrowed, sinking deeper every two weeks while the balance just sits there.",
      },
      {
        type: "h2",
        text: "The cousins that run the same play",
      },
      {
        type: "p",
        text: "Payday loans have relatives that use the same playbook — a tempting offer up front, a punishing cost underneath:",
      },
      {
        type: "list",
        items: [
          "**Car-title loans** — you borrow against your car and hand over the title. Miss the payments and the lender can take your car, which may be the very thing you need to get to work. Losing it can cost you far more than the loan.",
          "**Rent-to-own** — you make weekly or monthly payments on furniture or electronics. By the time you own it, you've often paid several times what the item actually costs in a store.",
          "**High-cost installment loans** — like a payday loan stretched over months instead of weeks. The longer term sounds gentler, but the sky-high rate means you can pay back double or more.",
        ],
      },
      {
        type: "h2",
        text: "What to do instead",
      },
      {
        type: "p",
        text: "If you're staring down an urgent bill, you have more options than the storefront wants you to believe. Before you sign anything, try these:",
      },
      {
        type: "steps",
        items: [
          "**Ask a credit union about a small loan.** Many offer small-dollar or 'payday alternative' loans at a fraction of the cost. You usually have to be a member, but joining is often easy and cheap.",
          "**Call the creditor or utility and ask for a payment plan.** Phone, electric, and medical providers will often split a bill or push back a due date if you simply ask — that costs you nothing.",
          "**Dial 211 for local emergency help.** It's a free, confidential line that connects you to local assistance for rent, utilities, and food. Sometimes the bill you're borrowing for can be covered outright.",
          "**Ask your employer about a paycheck advance.** Some workplaces will advance pay you've already earned, with no interest at all.",
        ],
      },
      {
        type: "tip",
        text: "Even some 'cash advance' or 'paycheck advance' apps that feel friendly can carry hidden costs — optional 'tips,' subscription fees, or instant-transfer charges that quietly add up to a high rate. Read what it actually costs before you rely on one.",
      },
      {
        type: "p",
        text: "Needing money fast doesn't make you irresponsible — it makes you human, and it's exactly the moment these lenders are built to exploit. Knowing how the trap works, and that real alternatives exist, is how you keep one bad week from turning into months of debt.",
      },
    ],
    related: ["prioritizing-bills-when-money-is-tight", "avoiding-bank-fees", "what-is-debt-relief"],
  },

  {
    slug: "buy-now-pay-later",
    order: 80,
    topicId: "credit",
    title: "Buy Now, Pay Later: Read the Fine Print",
    dek: "Splitting a purchase into a few payments feels free — here's what's actually going on at checkout.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Buy now, pay later usually splits a purchase into a few payments, often with no interest if you pay on time.",
      "The catches are late fees, juggling several plans, and quietly spending more.",
      "Missed payments can hurt you — and some plans now report to credit bureaus.",
      "Simple rule: it's still debt, so only use it for something you could buy outright today.",
    ],
    body: [
      {
        type: "p",
        text: "You're about to check out online, and there it is: 'Or 4 payments of $19.' One tap and the price suddenly feels painless. These buy now, pay later services — BNPL for short — are everywhere now, at nearly every online checkout and plenty of stores. They're not evil, and they're not free money. They're a tool, and like any tool, you want to know exactly what it does before you grab it.",
      },
      {
        type: "h2",
        text: "How it works",
      },
      {
        type: "p",
        text: "The classic version splits your purchase into a handful of equal payments — often four — spread over several weeks. You pay the first chunk at checkout and the rest on a set schedule. The appeal is that there's frequently *no interest* — but only *if* you pay on time. Pay as agreed and a $80 item really does cost $80, just spaced out.",
      },
      {
        type: "p",
        text: "That 'if you pay on time' is the whole game. The moment you slip, the friendly free split can turn into something that costs you.",
      },
      {
        type: "h2",
        text: "The catches hiding in the fine print",
      },
      {
        type: "list",
        items: [
          "**Late fees.** Miss a payment and you can get charged — turning that 'no interest' deal into an expensive one.",
          "**It nudges you to overspend.** A $200 jacket feels like '$50' in your head. That trick gets you to buy things, and sizes of things, you wouldn't if you were handing over real cash.",
          "**Juggling several at once.** Each plan feels tiny, but three or four overlapping ones can quietly add up to more than you can cover when all the due dates land.",
          "**It can affect your credit.** Missed payments can be sent to collections, and some providers now report your plans to the credit bureaus — meaning your slip-ups (and good habits) may show up on your credit history.",
        ],
      },
      {
        type: "key",
        text: "Buy now, pay later is still *debt*. The split-up payments don't change that — you've borrowed money and promised to pay it back.",
      },
      {
        type: "h2",
        text: "One simple rule",
      },
      {
        type: "p",
        text: "Here's the test that keeps BNPL safe: only use it for something you could already afford to buy outright today. If the cash is sitting in your account and you'd just rather not pay all at once, fine — the split is a convenience. But if you're reaching for BNPL *because* you can't actually afford the thing yet, that's the warning sign. That's borrowing to buy something you don't have the money for, which is how a string of 'painless' payments turns into a stressful month.",
      },
      {
        type: "tip",
        text: "Before you tap that button, add up every BNPL payment you already have coming. If the new one pushes the total past what you can comfortably cover on your next payday, skip it or wait.",
      },
      {
        type: "p",
        text: "Used carefully, splitting a payment now and then is no crime. Just go in with your eyes open: it's debt with a friendly face, and the fine print is where it stops being free.",
      },
    ],
    related: ["what-hurts-your-score", "build-credit-from-zero"],
  },

  {
    slug: "payment-app-safety",
    order: 50,
    topicId: "money-safety",
    title: "Using Venmo, Cash App, and Zelle Safely",
    dek: "These apps move money like cash — fast, easy, and almost impossible to claw back. That's exactly why scammers love them.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Sending money on these apps is usually instant and irreversible — treat it like handing over cash.",
      "There's typically no buyer or seller protection, so don't pay strangers for goods.",
      "Learn the common scams: the 'accidental payment,' fake support, and fake screenshots.",
      "Lock down your account with a strong password, two-factor, and an app lock.",
    ],
    body: [
      {
        type: "p",
        text: "Splitting rent, paying back a friend for tacos, sending a few bucks to a cousin — payment apps like Venmo, Cash App, and Zelle make it effortless. That same effortlessness is exactly what makes them a scammer's favorite tool. The money moves like cash: fast, and gone. Here's how to use them without getting burned.",
      },
      {
        type: "key",
        text: "The one rule that matters most: sending money on these apps is usually *instant and irreversible*. Treat it like handing someone cash on the street — only send to people you actually know and trust.",
      },
      {
        type: "p",
        text: "Sit with that for a second, because it's the whole thing. When you send a payment, there's often no 'undo,' no chargeback, no bank that swoops in to reverse it. If you wire cash to the wrong person — or the wrong person tricks you into sending it — that money is usually just gone. Banks and cards have protections that these apps mostly don't.",
      },
      {
        type: "h2",
        text: "Why you shouldn't pay strangers for stuff",
      },
      {
        type: "p",
        text: "On a credit card, if you pay for something and it never arrives, you can dispute the charge. On these apps, there's typically *no buyer or seller protection*. So when someone selling concert tickets or a phone online insists you pay by Venmo or Zelle, that's a giant red flag. The classic scam: you send the money, and the 'seller' — and the item — vanish. Use these apps for people you know, not strangers selling things.",
      },
      {
        type: "h2",
        text: "Scams to recognize on sight",
      },
      {
        type: "list",
        items: [
          "**The 'oops, wrong person' trick.** A stranger sends you money, then messages saying it was an accident and begs you to send it back. Their original payment was often stolen or fraudulent and will be reversed — but the money *you* send is real and gone. Don't send it back; report it in the app.",
          "**Fake 'bank' or 'support' contacts.** Someone calls, texts, or messages claiming to be your bank or the app's support team, warning of 'suspicious activity' and walking you through 'protecting' your account — which really means moving money to them. Real support will never ask you to send them a payment.",
          "**Fake payment screenshots.** A 'buyer' shows you a screenshot 'proving' they paid, then asks you to ship the item or send change. A screenshot is not money. Only trust what you actually see land in your own account.",
        ],
      },
      {
        type: "h2",
        text: "Lock down your account",
      },
      {
        type: "p",
        text: "Because the money moves so fast, your account security really matters. A few minutes of setup protects you:",
      },
      {
        type: "steps",
        items: [
          "Use a **strong, unique password** for the app — not one you reuse anywhere else.",
          "Turn on **two-factor authentication**, so a login also needs a code only you can get.",
          "Set an **app lock** — a PIN, fingerprint, or face scan — so no one who grabs your phone can send money.",
          "**Double-check the name and handle** before you hit send. One wrong username and the cash is gone.",
        ],
      },
      {
        type: "tip",
        text: "If a stranger pressures you to move money *fast* — to 'lock in a deal,' 'fix' your account, or 'return' a payment — slow all the way down. Urgency is the scammer's main tool, because thinking it through is what kills the scam.",
      },
      {
        type: "p",
        text: "Payment apps are genuinely useful — just respect what they are. They move money like cash, so guard them like cash, and they'll stay the convenient little tool they're supposed to be.",
      },
    ],
    related: ["how-to-spot-a-scam", "phishing-scams", "identity-theft"],
  },

  {
    slug: "renting-your-first-apartment",
    order: 30,
    topicId: "home-ownership",
    title: "Renting Your First Apartment",
    dek: "What landlords check, the upfront money to expect, and how to not get burned by a rental scam.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Landlords usually look at your income (often a rough 3x-rent guideline), credit, and rental history.",
      "Budget for upfront costs: a security deposit plus often first — and sometimes last — month's rent.",
      "A co-signer can help if your income or credit isn't enough on its own.",
      "Never pay a deposit on a place you (or someone you trust) haven't seen in person.",
    ],
    body: [
      {
        type: "p",
        text: "Your first apartment is a huge step — and the rental world is full of paperwork, fees, and a few traps that nobody warns first-timers about. You don't need to know everything. You just need to walk in knowing what landlords look for, what it'll cost up front, and the one scam that catches people every single year. Let's get you ready.",
      },
      {
        type: "h2",
        text: "What landlords check",
      },
      {
        type: "p",
        text: "When you apply, a landlord is asking one quiet question: *will this person pay the rent, every month, on time?* To answer it, they usually look at three things:",
      },
      {
        type: "list",
        items: [
          "**Your income.** A common guideline is that your monthly income should be about *three times* the rent. It's a rough rule, not a law, but it's why proof of income — pay stubs or an offer letter — comes up fast.",
          "**Your credit.** They may pull your credit to see how you've handled bills and debt. Thin or no credit history isn't a dead end, but expect it to come up.",
          "**Your rental history.** Past landlords or references, to check you paid rent and didn't trash the place. If this is your *first* place, it's normal not to have this yet — say so.",
        ],
      },
      {
        type: "h2",
        text: "The money you need up front",
      },
      {
        type: "p",
        text: "The rent is only part of the cost of moving in. The upfront pile can surprise you, so plan for it:",
      },
      {
        type: "list",
        items: [
          "**Security deposit** — usually about one month's rent, held in case of damage or unpaid rent. You can get it back when you leave if you've kept the place in good shape.",
          "**First month's rent** — due at or before move-in, on top of the deposit.",
          "**Sometimes last month's rent too** — some landlords ask for it up front, which means you might need close to three months' rent just to get the keys.",
        ],
      },
      {
        type: "h2",
        text: "What a co-signer is, and when you'd need one",
      },
      {
        type: "p",
        text: "If your income or credit isn't quite enough on its own — common when you're young or new to the country — a landlord may ask for a *co-signer* (also called a guarantor). That's someone with stronger income or credit who signs the lease alongside you and promises to cover the rent if you can't. It's a real responsibility you're asking of them, so make sure they understand it. A willing co-signer can be the thing that gets you approved when your own file is still thin.",
      },
      {
        type: "h2",
        text: "Read the lease before you sign",
      },
      {
        type: "p",
        text: "The lease is the contract, and once you sign, you're bound by what's *in it* — not by what anyone promised out loud. Read the whole thing first, and look specifically for:",
      },
      {
        type: "steps",
        items: [
          "**How long it lasts** — a year, month-to-month? — and what happens if you need to leave early.",
          "**Who pays which utilities** — is heat, water, electric, or internet included, or on you?",
          "**The rules** — pets, guests, late-rent fees, what you can change, how to give notice.",
          "Anything you don't understand — *ask before signing*, not after.",
        ],
      },
      {
        type: "key",
        text: "Never wire money or pay a deposit for a place you — or someone you trust — haven't seen and verified in person. This is the single most common rental scam.",
      },
      {
        type: "p",
        text: "Here's how that scam runs: a listing looks great and cheap, the 'landlord' is somehow out of town and can't show it, and they pressure you to send a deposit *now* to 'hold' it before someone else grabs it. The apartment isn't theirs — sometimes it doesn't exist — and your money disappears. Be suspicious of any 'landlord' who can't meet you, won't let you see the place, or rushes you. A real one expects you to look before you pay.",
      },
      {
        type: "tip",
        text: "Once you're in, look into renters insurance — it's often only a few dollars a month and covers your stuff if there's a theft, fire, or flood. Cheap protection for the things you worked hard to buy.",
      },
      {
        type: "p",
        text: "Renting your first place is mostly about knowing what's normal so the unusual stuff jumps out. Show your income, read every line, see it with your own eyes before any money moves — and that first set of keys is yours, on your terms.",
      },
    ],
    related: ["renting-101-tenant-rights", "prioritizing-bills-when-money-is-tight", "avoiding-bank-fees"],
  },
];
