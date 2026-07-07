import type { Article } from "./types";

export const investingSavingsArticles: Article[] = [
  {
    slug: "high-yield-savings-account",
    order: 60,
    topicId: "investing",
    title: "What Is a High-Yield Savings Account?",
    dek: "It's the same safe savings account you already understand, just one that actually pays you for keeping money in it.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "An HYSA is a normal, safe savings account that pays many times more interest.",
      "Compare accounts on three things: the APY, access, and fees.",
      "FDIC or NCUA insurance protects your deposit even if the bank fails.",
      "It's the ideal home for an emergency fund or a short-term goal.",
    ],
    body: [
      {
        type: "p",
        text: "Open the savings account attached to your big-bank checking, and there's a decent chance it pays you almost nothing: pennies a year on hundreds of dollars. It's so little that most people assume that's just how savings works. It isn't. A *high-yield savings account* pays many times more for the exact same kind of deposit, and switching to one is one of the easiest money wins there is.",
      },
      {
        type: "h2",
        text: "It's still just a savings account",
      },
      {
        type: "p",
        text: "Don't let the fancy name throw you. A high-yield savings account — people call it an HYSA — works exactly like the savings account you already picture. You put money in, it sits there safely, and you take it out when you need it. There's no catch, no contract, no risk to the money you deposit. The only real difference is the interest rate.",
      },
      {
        type: "p",
        text: "The reason the rate is so much higher usually comes down to *where* the account lives. Most HYSAs are at online banks, banks with no expensive branches on every corner. They pass those savings on to you as a better rate. The trade-off is there's no lobby to walk into, but you manage everything from your phone, and your money is just as available.",
      },
      {
        type: "h2",
        text: "Your money stays liquid",
      },
      {
        type: "p",
        text: "*Liquid* is a finance word that means easy to get to. An HYSA is liquid: you can move your money back to your checking account whenever you want, usually in a day or two, no penalty. That's what makes it different from a [CD](/learn/investing/what-is-a-cd), where you agree to leave the money alone for a set time. With an HYSA, it's your money, available, earning more while it waits.",
      },
      {
        type: "h2",
        text: "Your deposit is insured",
      },
      {
        type: "p",
        text: "Here's the part that lets you actually relax. Money in a legitimate HYSA is protected by federal insurance: the FDIC if it's a bank, the NCUA if it's a credit union. That insurance covers your deposits up to the legal limit (currently $250,000 per depositor, per bank) even if the bank itself goes under. For almost everyone reading this, that means your savings are simply safe, full stop.",
      },
      {
        type: "tip",
        text: "When you're shopping, confirm the bank is 'FDIC insured' or the credit union is 'NCUA insured'. Those words should be easy to find on its site. A safe online bank states it plainly.",
      },
      {
        type: "h2",
        text: "How to compare accounts",
      },
      {
        type: "p",
        text: "Bank websites list a confusing wall of products (checking, savings, money market, CDs), but comparing places to keep your savings comes down to three things:",
      },
      {
        type: "list",
        items: [
          "**The APY:** how much the account pays you per year. A regular big-bank savings account often pays around 0.01%; an HYSA often pays around **4%** in 2026. If the term is new to you, [What Is APY?](/learn/budgeting/what-is-apy) explains how it works.",
          "**Access:** how quickly and freely you can get your money. Checking is instant, an HYSA takes a day or two, and a CD ties money up for months or years.",
          "**Fees and minimums:** monthly maintenance fees, minimum balances, minimum deposits. The best accounts have none, so skip any that charge them.",
        ],
      },
      {
        type: "p",
        text: "The payoff for switching is real. On a $5,000 balance, the difference between 0.01% and 4% is roughly $200 a year, for doing nothing but moving the money. Most people are well served by a free checking account for daily spending plus one good HYSA for everything they're setting aside.",
      },
      {
        type: "h2",
        text: "The rate moves, so don't get attached to a number",
      },
      {
        type: "p",
        text: "One honest heads-up: the interest rate on an HYSA is *variable*. It rises and falls with the broader economy, so the rate you open with isn't locked in. That's normal and nothing to worry about. Just don't expect a fixed number forever, and don't pick an account today only because of one eye-catching rate that may change next month.",
      },
      {
        type: "h2",
        text: "Saving, not investing",
      },
      {
        type: "p",
        text: "It's worth being clear about what an HYSA is *for*. This is saving, not investing. Your principal (the money you put in) never goes down, which is exactly what you want for cash you might need soon. But that safety has a cost: it won't build long-term wealth the way investing in the market can. An HYSA protects money; it doesn't grow it dramatically.",
      },
      {
        type: "key",
        text: "An HYSA is the perfect home for your emergency fund or any goal you're saving toward in the next few years. Safe, available, and paying you real interest while you wait. It's a parking spot for cash, not a wealth-building engine.",
      },
    ],
    related: ["what-is-a-cd", "saving-vs-investing", "cd-laddering"],
  },

  {
    slug: "what-is-a-cd",
    order: 70,
    topicId: "investing",
    title: "What Is a CD (Certificate of Deposit)?",
    dek: "Promise the bank you won't touch your money for a set time, and it locks in a rate for you in return.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A CD pays a fixed, locked-in rate if you leave the money for a set term.",
      "Take it out early and you usually pay an early-withdrawal penalty.",
      "It's FDIC or NCUA insured and very low-risk.",
      "Use a CD for money you know you won't need until a specific date.",
    ],
    body: [
      {
        type: "p",
        text: "A CD (short for *certificate of deposit*) sounds more complicated than it is. Strip away the name and it's a simple deal with the bank: you agree to leave a chunk of money untouched for a set amount of time, and in exchange the bank locks in an interest rate for that whole stretch. That's the entire idea.",
      },
      {
        type: "h2",
        text: "How the deal works",
      },
      {
        type: "p",
        text: "When you open a CD, you pick a *term*: how long you'll leave the money alone. Terms run from a few months to several years. You also lock in a rate that won't change for that term, no matter what the economy does. Leave the money in for the full term and you get your deposit back plus the interest you were promised. Clean and predictable.",
      },
      {
        type: "list",
        items: [
          "**You choose a term**, say 6 months, 1 year, or 5 years.",
          "**You lock in a fixed rate** for that term, often a little higher than a regular savings account.",
          "**You leave it alone** until the term ends (the date it ends is called *maturity*).",
        ],
      },
      {
        type: "h2",
        text: "The trade-off: you give up access",
      },
      {
        type: "p",
        text: "Here's the catch, and it's the whole point of a CD. In return for that locked-in rate, you're promising not to touch the money. If you pull it out before the term ends, you'll usually owe an *early-withdrawal penalty*, typically some of the interest you earned. It's rarely a disaster, but it can wipe out much of the reason you opened the CD in the first place.",
      },
      {
        type: "p",
        text: "So a CD asks something a savings account never does: commitment. You're trading easy access for a slightly better, guaranteed rate. That trade is great for money you're sure you won't need, and a bad fit for money you might.",
      },
      {
        type: "h2",
        text: "Is it safe?",
      },
      {
        type: "p",
        text: "Yes. A CD is one of the lowest-risk places you can put money. Like a savings account, a CD at a real bank or credit union is covered by federal insurance, FDIC or NCUA, up to the legal limit (currently $250,000 per depositor, per bank). Your principal doesn't move with the market and won't drop. The only real 'risk' is the penalty if you break the term early.",
      },
      {
        type: "h2",
        text: "CD or high-yield savings account?",
      },
      {
        type: "p",
        text: "This is the question that actually matters, and it comes down to one thing: do you know when you'll need the money?",
      },
      {
        type: "list",
        items: [
          "**Use a CD** for money you *know* you won't touch until a specific date, like a down payment two years out or tuition due next fall. You get a locked rate and you're not tempted to spend it.",
          "**Use a [high-yield savings account](/learn/investing/high-yield-savings-account)** for money you might need anytime, your emergency fund especially. It pays a strong rate too, but stays fully liquid with no penalty for taking it out.",
        ],
      },
      {
        type: "tip",
        text: "Never put your emergency fund in a CD. An emergency, by definition, doesn't wait for the term to end, and paying a penalty to reach your own money in a crisis is exactly the trap you're trying to avoid.",
      },
      {
        type: "key",
        text: "A CD trades access for a guaranteed rate. It shines for money with a known deadline. If there's any chance you'll need the cash sooner, a high-yield savings account is the safer call.",
      },
    ],
    related: ["high-yield-savings-account", "cd-laddering", "saving-vs-investing"],
  },

  {
    slug: "cd-laddering",
    order: 10,
    topicId: "investing",
    title: "CD Laddering, Explained",
    dek: "A simple way to grab the higher rates of long CDs without locking up all your cash for years.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Longer CDs usually pay more, but locking everything away for years is risky.",
      "A ladder splits your money across CDs with staggered end dates.",
      "One CD frees up regularly while the rest keep earning higher rates.",
      "As each CD matures, you spend the cash or roll it to the long end.",
    ],
    body: [
      {
        type: "p",
        text: "Once you understand [CDs](/learn/investing/what-is-a-cd), you run into a frustrating little problem. Longer CDs usually pay the best rates, but locking all your money away for, say, five years is risky, because life happens and you might need some of it sooner. So you're stuck choosing between a better rate and keeping your cash within reach. A *CD ladder* is the trick that lets you stop choosing.",
      },
      {
        type: "h2",
        text: "The problem a ladder solves",
      },
      {
        type: "p",
        text: "Put everything in one long CD and you get a great rate, but your whole stash is frozen for years. Put everything in one short CD and your money's available sooner, but you earn less. A ladder splits the difference on purpose: you spread your money across several CDs with *staggered* end dates, so part of it is always coming free while the rest keeps earning the higher long-term rates.",
      },
      {
        type: "h2",
        text: "How a ladder is built",
      },
      {
        type: "p",
        text: "Say you have some money to set aside. Instead of one big CD, you split it into equal pieces and open several CDs that mature in different years: one in a year, one in two, one in three, and so on. Picture rungs on a ladder, each a year apart:",
      },
      {
        type: "steps",
        items: [
          "Decide how much to set aside, and split it into equal parts (say five).",
          "Open CDs with terms one year apart: a 1-year, a 2-year, a 3-year, a 4-year, and a 5-year.",
          "Wait. After year one, your 1-year CD matures and that money is available.",
          "Either use the cash, or roll it into a *new* 5-year CD at the long end of the ladder.",
          "Repeat every year: a CD matures, and you reinvest it at the back of the line.",
        ],
      },
      {
        type: "p",
        text: "After the first few years, the ladder hits its rhythm: every single year, one CD matures and frees up cash, while every dollar still working is earning a long-term rate. You keep feeding matured money to the back, and the cycle just turns.",
      },
      {
        type: "h2",
        text: "Why it works",
      },
      {
        type: "p",
        text: "The payoff is that you stop having to choose between access and rate; you get a slice of both. Part of your money comes within reach at regular intervals, so you're never fully locked out of your own cash. And because you keep rolling maturing money into long terms, most of your money is steadily earning those higher long-term rates instead of sitting in the shortest, lowest one.",
      },
      {
        type: "list",
        items: [
          "**Regular access:** a CD matures on a predictable schedule, so cash frees up at intervals you can count on.",
          "**Better rates:** the bulk of your money rides the higher long-term rates instead of the lowest short one.",
          "**Flexibility:** when a CD matures, you choose. Take the cash if you need it, or reinvest if you don't.",
        ],
      },
      {
        type: "tip",
        text: "A ladder also softens the guesswork on rates. Because a CD comes due every year, you're regularly reinvesting at whatever the going rate is, so you're never stuck with one old rate on your entire balance for years.",
      },
      {
        type: "key",
        text: "A CD ladder hands you the higher rates of long CDs *and* steady access to part of your money, without locking it all up at once. A little setup buys you a savings machine that quietly runs on its own.",
      },
    ],
    related: ["what-is-a-cd", "high-yield-savings-account", "saving-vs-investing"],
  },
];
