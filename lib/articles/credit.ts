import type { Article } from "./types";

export const creditArticles: Article[] = [
  {
    slug: "what-is-a-credit-score",
    order: 10,
    topicId: "credit",
    title: "What Is a Credit Score?",
    dek: "It's just a number that tells lenders how likely you are to pay them back. Here's what's behind it.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A credit score is a three-digit number that predicts how you'll handle borrowed money.",
      "Paying on time and keeping balances low matter most.",
      "Everyone starts without one, and that's normal.",
      "You don't need to be rich to have a great score.",
    ],
    body: [
      {
        type: "p",
        text: "When you apply for a credit card, an apartment, or a car loan, the company wants to guess one thing: will this person pay me back? A credit score is the number they use to make that guess. It's a three-digit number, usually between 300 and 850, and higher is better.",
      },
      {
        type: "p",
        text: "You aren't born with one, and not having a score yet doesn't mean anything is wrong. It just means you haven't borrowed enough yet for the system to have an opinion. Let's break down where the number comes from.",
      },
      {
        type: "h2",
        text: "What the number actually measures",
      },
      {
        type: "p",
        text: "Your score is built from your credit report — a running record of money you've borrowed and how you've handled it. It doesn't know your income, your savings, or your race. It only watches your borrowing habits over time and turns them into a single number.",
      },
      {
        type: "h2",
        text: "What goes into your score",
      },
      {
        type: "p",
        text: "The exact formula is secret, but the big pieces are well known. Roughly, your score breaks down like this:",
      },
      {
        type: "list",
        items: [
          "**Payment history (about 35%):** do you pay on time? This is the single biggest piece.",
          "**Credit utilization (about 30%):** how much of your available credit you're using.",
          "**Length of history (about 15%):** how long you've had credit open.",
          "**New credit and credit mix (the rest):** recent applications and the types of accounts you have.",
        ],
      },
      {
        type: "p",
        text: "Notice what's at the top. The two things that move your score the most — paying on time and not maxing out your cards — are both completely within your control.",
      },
      {
        type: "tip",
        text: "You can check your own score and report for free without hurting either one. Looking at your own credit is called a soft check, and it never costs you points.",
      },
      {
        type: "h2",
        text: "Why your score matters",
      },
      {
        type: "p",
        text: "A higher score doesn't just unlock loans — it makes borrowing cheaper. The same car loan might come with a low APR for someone with strong credit and a much higher one for someone with thin or rough credit. Over the life of a loan, that gap can be thousands of dollars in extra interest.",
      },
      {
        type: "key",
        text: "Your credit score isn't a measure of how much money you have or how good a person you are. It's a measure of one habit: paying back what you borrow, on time. That's a habit anyone can build.",
      },
      {
        type: "p",
        text: "If you're starting from nothing, that's actually good news — you get to build the number the right way from day one. The next article shows you exactly how.",
      },
    ],
    related: ["build-credit-from-zero", "credit-utilization", "reading-your-credit-report"],
  },

  {
    slug: "build-credit-from-zero",
    order: 40,
    topicId: "credit",
    title: "How to Build Credit From Zero",
    dek: "No credit history isn't a dead end. Here are the safest first steps to a real score.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Having no credit is a starting point, not a problem to be ashamed of.",
      "A secured card or being added as an authorized user can get you going.",
      "On-time payments are what actually build the score.",
      "Patience beats every shortcut — credit grows with time.",
    ],
    body: [
      {
        type: "p",
        text: "If you've never borrowed money, lenders can't see how you handle it, so you have what's called a thin file or no credit history. This is incredibly common for students, young people, and anyone new to the country. It's not a black mark — it's a blank page. Here's how to start filling it in safely.",
      },
      {
        type: "h2",
        text: "Start with a secured credit card",
      },
      {
        type: "p",
        text: "A secured credit card is designed for exactly this moment. You put down a refundable deposit — say $200 — and that becomes your spending limit. You use the card like any other, and the deposit just sits there as a safety net for the bank. Because you've lowered their risk, they'll approve you even with no history.",
      },
      {
        type: "p",
        text: "Use it for one small, regular expense — a streaming subscription, a tank of gas — and pay it off in full every month. After several months of on-time payments, many banks refund your deposit and switch you to a regular card.",
      },
      {
        type: "h2",
        text: "Become an authorized user",
      },
      {
        type: "p",
        text: "If someone you trust has a credit card in good standing, they can add you as an authorized user. You get a card linked to their account, and that account's good history can start showing up on your credit report — even if you never spend a dollar on it.",
      },
      {
        type: "tip",
        text: "Being an authorized user only helps if the main cardholder pays on time and keeps their balance low. Their habits land on your report too, so choose someone reliable.",
      },
      {
        type: "h2",
        text: "Other on-ramps",
      },
      {
        type: "list",
        items: [
          "**Credit-builder loans:** small loans where the money is held in savings until you finish paying. Some banks and credit unions offer them.",
          "**Student credit cards:** starter cards built for people in school, often easier to qualify for.",
          "**Becoming a co-signer's borrower:** a parent or relative may co-sign a loan with you — just know the debt is legally theirs too if you can't pay.",
        ],
      },
      {
        type: "h2",
        text: "Then just be boring",
      },
      {
        type: "steps",
        items: [
          "Charge one small thing to your card each month.",
          "Pay the full statement balance on time, every time.",
          "Keep your balance well below your limit.",
          "Wait. Let the months of clean history stack up.",
        ],
      },
      {
        type: "key",
        text: "Building credit isn't about doing something clever. It's about doing one boring thing — paying on time — over and over until the months add up. There's no faster way, and there doesn't need to be.",
      },
      {
        type: "p",
        text: "In about six months of steady use, you'll usually have a real score for the first time. From there, it only grows as you keep the same simple habits going.",
      },
    ],
    related: ["what-is-a-credit-score", "what-hurts-your-score", "credit-utilization"],
  },

  {
    slug: "reading-your-credit-report",
    order: 20,
    topicId: "credit",
    title: "Reading Your Credit Report",
    dek: "Your report is the file your score is built from. Here's how to pull it and what to look for.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Your credit report is a free, detailed record of your borrowing.",
      "You can get it for free, and checking it never hurts your score.",
      "Errors are common — finding them protects your score.",
      "Know the difference between a report and a score.",
    ],
    body: [
      {
        type: "p",
        text: "Your credit score gets all the attention, but the score is just a summary. The real document underneath it is your credit report — a detailed list of your accounts, balances, and whether you've paid on time. If the score is your grade, the report is the full transcript.",
      },
      {
        type: "h2",
        text: "How to get yours for free",
      },
      {
        type: "p",
        text: "In the U.S., you're entitled to free copies of your credit report from the major credit bureaus — the companies that collect this information. You can request them at the official free site, AnnualCreditReport.com. Pulling your own report is a soft check, so it never lowers your score, no matter how often you look.",
      },
      {
        type: "tip",
        text: "A credit report and a credit score are not the same thing. Your free report shows the details but may not include the score itself. Many banks and card apps now show your score free, separately.",
      },
      {
        type: "h2",
        text: "What's inside",
      },
      {
        type: "p",
        text: "When you open your report, you'll see a few main sections. Read each one slowly:",
      },
      {
        type: "list",
        items: [
          "**Personal info:** your name, addresses, and birth date. Make sure it's actually you.",
          "**Accounts:** every credit card and loan, with balances and your payment history month by month.",
          "**Inquiries:** a list of who has checked your credit, including each hard inquiry from an application.",
          "**Public records and collections:** serious items like unpaid debts sent to collections.",
        ],
      },
      {
        type: "h2",
        text: "Hunt for mistakes",
      },
      {
        type: "p",
        text: "Errors on credit reports are surprisingly common, and they can quietly drag down your score. Look for accounts you don't recognize, a payment marked late that you actually paid on time, or a balance that's wrong. An account you never opened can be a sign of identity theft.",
      },
      {
        type: "p",
        text: "If you find a mistake, you have the legal right to dispute it. File the dispute with the credit bureau that's reporting it, include any proof you have, and they're required to investigate. Fixing one bad mark can lift your score noticeably.",
      },
      {
        type: "key",
        text: "Checking your own report is one of the few money tasks that's free, can't hurt you, and might find an error worth real points. Make it a habit — once or twice a year is plenty for most people.",
      },
      {
        type: "p",
        text: "Once you can read your report, the rest of credit gets less mysterious. You're looking at the same information lenders see — and you can fix what's wrong before it costs you.",
      },
    ],
    related: ["what-is-a-credit-score", "what-hurts-your-score", "repairing-credit"],
  },

  {
    slug: "credit-utilization",
    order: 20,
    topicId: "credit",
    title: "Credit Utilization, Demystified",
    dek: "It's the second-biggest thing in your score, and one of the easiest to fix fast.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Utilization is the share of your credit limit you're using.",
      "Lower is better — many people aim to stay under 30%.",
      "It can change your score within a single month.",
      "Paying before the statement closes lowers what gets reported.",
    ],
    body: [
      {
        type: "p",
        text: "Of all the pieces of a credit score, credit utilization is the one people understand the least — and it's also one of the easiest to improve quickly. The good news: once you see how it works, you can often nudge your score up in a matter of weeks.",
      },
      {
        type: "h2",
        text: "What utilization means",
      },
      {
        type: "p",
        text: "Credit utilization is simply the share of your available credit that you're currently using. If you have a credit card with a $1,000 limit and you're carrying a $300 balance, your utilization is 30%. Lower is better, because using a small slice of your limit signals you're not stretched thin.",
      },
      {
        type: "p",
        text: "It applies to revolving credit — credit you can use, repay, and use again, like a credit card. It's measured both per card and across all your cards added together.",
      },
      {
        type: "h2",
        text: "Why it carries so much weight",
      },
      {
        type: "p",
        text: "Utilization makes up roughly 30% of your score — second only to payment history. And unlike the length of your credit history, which only grows with time, utilization can change the moment you pay down a balance. That makes it the fastest lever you have.",
      },
      {
        type: "tip",
        text: "A common rule of thumb is to keep utilization under 30%, and under 10% is even better. On a $1,000 limit, that means trying not to report more than $300 — ideally closer to $100.",
      },
      {
        type: "h2",
        text: "The statement-date trick",
      },
      {
        type: "p",
        text: "Here's the part most people miss. Your card reports your balance to the credit bureaus on your statement closing date, not your due date. So even if you pay in full every month, a big balance can get reported before you pay it off.",
      },
      {
        type: "steps",
        items: [
          "Find your statement closing date in your card's app.",
          "Make a payment a few days before that date to lower the balance that gets reported.",
          "Pay off whatever remains by the due date to avoid interest.",
          "Check your score the next month and watch it respond.",
        ],
      },
      {
        type: "p",
        text: "Another way to lower utilization without spending less: ask for a credit limit increase. If your limit goes from $1,000 to $2,000 and your balance stays at $300, your utilization drops from 30% to 15% on its own.",
      },
      {
        type: "key",
        text: "Utilization resets every month, so a high number isn't permanent damage. Pay a balance down and the next report reflects it. No other part of your score responds this fast.",
      },
    ],
    related: ["what-is-a-credit-score", "what-hurts-your-score", "build-credit-from-zero"],
  },

  {
    slug: "what-hurts-your-score",
    order: 10,
    topicId: "credit",
    title: "What Hurts Your Score (and What Doesn't)",
    dek: "A lot of credit fears are myths. Here's what actually moves the number, and what's harmless.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Late payments and high balances do the most damage.",
      "Checking your own credit never hurts your score.",
      "One hard inquiry is a small, temporary dip.",
      "Closing an old card can backfire.",
    ],
    body: [
      {
        type: "p",
        text: "Credit comes with a lot of folklore. People are scared to check their own score, afraid to ever close a card, convinced one mistake will haunt them forever. Most of it isn't true. Let's separate what genuinely hurts your score from what doesn't.",
      },
      {
        type: "h2",
        text: "What actually hurts",
      },
      {
        type: "list",
        items: [
          "**Late or missed payments.** This is the big one. A payment 30+ days late can drop your score sharply and stay on your report for years.",
          "**High credit utilization.** Maxing out a card, even if you pay it later, signals risk and pulls the number down.",
          "**Accounts in collections.** An unpaid debt handed to a collections agency is a serious mark.",
          "**Applying for lots of credit at once.** Each application adds a hard inquiry, and a pile of them in a short window looks desperate to lenders.",
        ],
      },
      {
        type: "h2",
        text: "What doesn't hurt (despite the rumors)",
      },
      {
        type: "p",
        text: "Plenty of things people worry about are actually harmless:",
      },
      {
        type: "list",
        items: [
          "**Checking your own credit.** Pulling your own score or report is a soft check. You can do it daily and lose zero points.",
          "**Carrying a card with a $0 balance.** You don't need to carry debt or pay interest to build credit — paying in full is ideal.",
          "**Your income or bank balance.** Your score doesn't know or care how much you earn or save.",
          "**A single hard inquiry.** One application usually costs only a few points and fades within a year.",
        ],
      },
      {
        type: "tip",
        text: "Shopping for one loan — say, comparing car loans over two weeks — is usually counted as a single hard inquiry, not many. The scoring formulas expect you to compare offers, so rate-shopping in a short window is fine.",
      },
      {
        type: "h2",
        text: "The closing-a-card trap",
      },
      {
        type: "p",
        text: "It feels responsible to close a card you don't use, but it can quietly hurt you. Closing it erases that card's limit from your total available credit, which can spike your utilization. If it's an old account, closing it also shortens your average credit history.",
      },
      {
        type: "p",
        text: "Unless a card charges an annual fee you don't want to pay, it's often better to keep it open, use it for a small charge now and then, and pay it off.",
      },
      {
        type: "key",
        text: "The two habits that protect your score most are the same two that build it: pay every bill on time, and keep your balances low. Get those right and the smaller stuff barely matters.",
      },
      {
        type: "p",
        text: "If your score has already taken a hit, none of this is permanent. The next article walks through how to recover after a real setback.",
      },
    ],
    related: ["credit-utilization", "repairing-credit", "what-is-a-credit-score"],
  },

  {
    slug: "repairing-credit",
    topicId: "credit",
    title: "Repairing Credit After a Setback",
    dek: "A late payment, a default, even a bankruptcy isn't the end. Here's the realistic road back.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Credit damage fades with time and good habits — it isn't permanent.",
      "Start by getting current and stopping the bleeding.",
      "Negative marks age off your report eventually.",
      "Avoid 'credit repair' scams that promise quick fixes.",
    ],
    body: [
      {
        type: "p",
        text: "Maybe you missed several payments during a hard stretch. Maybe a debt went to collections, or you went through a bankruptcy. It can feel like your credit is ruined for good. It isn't. Credit is designed to recover, and people rebuild from far worse every day. Here's the honest, no-gimmicks path back.",
      },
      {
        type: "h2",
        text: "First, stop the bleeding",
      },
      {
        type: "p",
        text: "Before you can rebuild, the damage has to stop growing. The most important move is to get current on every account you can. A bill that's late this month is still hurting you; once it's paid and current, the wound starts to heal.",
      },
      {
        type: "steps",
        items: [
          "Pull your credit report so you know exactly what you're dealing with.",
          "List every past-due account, smallest fire first.",
          "Get current on what you can, and contact lenders about the rest.",
          "Set up autopay so no new payment is ever missed.",
        ],
      },
      {
        type: "p",
        text: "If you're drowning in payments, call your lenders before you fall further behind. Many have hardship programs, and a creditor would usually rather work out a plan than send your debt to collections.",
      },
      {
        type: "h2",
        text: "Deal with collections carefully",
      },
      {
        type: "p",
        text: "If a debt is already in collections, you have options — but go slowly. Ask for proof the debt is really yours and the amount is right. You can sometimes negotiate to pay less than the full amount. Always get any agreement in writing before you send a dollar.",
      },
      {
        type: "tip",
        text: "Watch out for companies that promise to 'erase bad credit fast' for a fee. Legitimate accurate information can't be deleted on demand, and you can dispute real errors yourself for free. If it sounds too good to be true, it's a scam.",
      },
      {
        type: "h2",
        text: "Rebuild the positive history",
      },
      {
        type: "p",
        text: "Recovery isn't just about removing the bad — it's about stacking up new good. The same tools that build credit from scratch work here too. A secured credit card you pay off monthly creates a fresh stream of on-time payments. Keeping your credit utilization low adds points back over time.",
      },
      {
        type: "h2",
        text: "Let time do its work",
      },
      {
        type: "p",
        text: "Here's the part that's genuinely on your side. Negative marks don't last forever. Most late payments and collections fall off your credit report after about seven years, and even a bankruptcy ages off eventually. Just as important, older damage counts for less the further it recedes — a late payment from four years ago barely registers next to a year of recent on-time payments.",
      },
      {
        type: "key",
        text: "Rebuilding credit is less about erasing the past and more about burying it under new, good history. Every on-time payment from today forward outweighs an old mistake a little more.",
      },
      {
        type: "p",
        text: "Be patient with yourself. Scores recover in months and years, not days, but they do recover. The setback that feels permanent today will, with steady habits, become a footnote.",
      },
    ],
    related: ["what-hurts-your-score", "reading-your-credit-report", "build-credit-from-zero"],
  },
  {
    slug: "build-credit-no-ssn",
    order: 50,
    topicId: "credit",
    title: "Building Credit With No Social Security Number",
    dek: "You don't need an SSN to build U.S. credit — here's how to start with an ITIN.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Credit is built the same way for everyone — your immigration status doesn't show on it.",
      "An ITIN can stand in for an SSN with many lenders.",
      "Secured cards and credit-builder loans are the easiest starting points.",
      "Credit unions and community lenders are often the most welcoming.",
    ],
    body: [
      {
        type: "p",
        text: "Here's something a lot of people are never told: you do not need a Social Security number to build credit in the U.S. If you have an ITIN — an Individual Taxpayer Identification Number the IRS gives to people who can't get an SSN — you have a real path to a credit score. And your immigration status never appears on your credit report. Credit is built the exact same way for everyone: borrow a little, pay it back on time, repeat.",
      },
      {
        type: "h2",
        text: "What an ITIN can do for you",
      },
      {
        type: "p",
        text: "An ITIN is mainly for filing taxes, but many banks, credit unions, and card issuers will also accept it in place of an SSN when you apply for credit. Not every company does, so you may hear 'no' a few times before a 'yes' — that's normal, not a dead end.",
      },
      {
        type: "h2",
        text: "The easiest ways to start",
      },
      {
        type: "list",
        items: [
          "**A secured credit card.** You put down a refundable deposit (say $200) and that becomes your limit. Use it for one small bill, pay it off every month, and you're building history. Some issuers accept an ITIN.",
          "**A credit-builder loan.** The 'loan' sits in a locked savings account while you make small monthly payments; at the end, the money is yours and you've built a payment record. Credit unions and community lenders often offer these.",
          "**Becoming an authorized user.** If someone you trust adds you to their well-managed card, its history can help your credit — and you don't even have to use the card.",
        ],
      },
      {
        type: "tip",
        text: "Credit unions and CDFIs (community development financial institutions) are often the friendliest places to start — they're built to serve people the big banks overlook, and many work with ITINs.",
      },
      {
        type: "h2",
        text: "What actually moves your score",
      },
      {
        type: "p",
        text: "Once you have an account, the rules are the same as for anyone: pay on time, every time, and keep your balance low compared to your limit. That's most of the game. Some services will even add your on-time rent and utility payments to your credit history — worth looking into.",
      },
      {
        type: "key",
        text: "Be careful of companies that target immigrants with high fees and big promises. You should never pay a large fee just to build credit — a basic secured card or a credit union does it for almost nothing.",
      },
      {
        type: "p",
        text: "It takes a few months to see a score and longer to build a strong one, but it compounds. Down the road, that history means easier apartment approvals, smaller deposits, and far better rates when you really need them.",
      },
    ],
    related: ["build-credit-from-zero", "what-is-a-credit-score", "credit-utilization"],
  },
];
