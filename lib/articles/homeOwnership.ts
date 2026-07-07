import type { Article } from "./types";

export const homeOwnershipArticles: Article[] = [
  {
    slug: "renting-vs-buying",
    order: 10,
    topicId: "home-ownership",
    title: "Renting vs. Buying: An Honest Comparison",
    dek: "Buying a home is a big decision, not a default one. Here's a clear-eyed look at what each path really costs and what fits your life right now.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Renting buys flexibility and a predictable monthly cost. It isn't wasted money.",
      "Buying can build wealth, but only if you stay put long enough to cover the upfront and selling costs.",
      "The right choice depends on how long you'll stay, your savings, and how steady your income feels.",
      "Plenty of financially healthy people rent on purpose.",
    ],
    body: [
      {
        type: "p",
        text: "You've probably heard that renting is 'throwing money away' and that buying is always the smart move. The truth is more honest and more useful: both choices have real costs and real benefits. The best one for you depends on your money, your plans, and your life right now.",
      },
      {
        type: "h2",
        text: "What renting really gives you",
      },
      {
        type: "p",
        text: "When you rent, you pay a landlord for the right to live somewhere. In return you get flexibility. If your job moves you to another city, you can leave at the end of your lease. You also don't pay for a broken water heater or a new roof, because those are the owner's problem, not yours.",
      },
      {
        type: "p",
        text: "The trade-off is that your monthly payment builds no ownership. When the lease ends, you own nothing. That's the part people call 'wasted' money, but it's really the price of a place to live with very little risk attached.",
      },
      {
        type: "h2",
        text: "What buying really gives you",
      },
      {
        type: "p",
        text: "When you buy, you usually take out a mortgage, which is just a loan used to buy a home. Part of each monthly payment slowly pays down what you owe, so over many years you build ownership in the place. If the home's value rises, that growth is yours too.",
      },
      {
        type: "p",
        text: "But buying comes with costs renters never see: property taxes, home insurance, repairs, and thousands of dollars in upfront fees just to close the deal. On a $300,000 home, those [closing costs](/learn/home-ownership/closing-costs) can easily run $9,000 or more before you spend a single night there.",
      },
      {
        type: "key",
        text: "Buying tends to pay off only if you stay long enough. As a rough rule, plan to stay at least five years, so the home's growth can cover what you spent buying and later selling it.",
      },
      {
        type: "h2",
        text: "The questions that actually decide it",
      },
      {
        type: "list",
        items: [
          "How long will you stay? A move in two years usually favors renting.",
          "Do you have savings for a down payment **plus** an emergency cushion?",
          "Is your income steady enough to handle a surprise $4,000 repair?",
          "Would owning tie you down somewhere you're not sure you want to be?",
        ],
      },
      {
        type: "tip",
        text: "Compare the full monthly cost of owning, not just the loan payment. Add in taxes, insurance, and a repair fund ([the hidden costs of owning](/learn/home-ownership/hidden-costs-of-owning) walks through them). A $1,600 mortgage payment can quietly become $2,100 a month once everything is counted.",
      },
      {
        type: "h2",
        text: "There's no wrong answer",
      },
      {
        type: "p",
        text: "Plenty of financially healthy people rent for years on purpose. Plenty of others buy and love it. Neither group is doing money 'wrong.' If renting fits your life right now, [Renting Your First Apartment](/learn/home-ownership/renting-your-first-apartment) is the next read. If you're leaning toward buying, start with [What a Mortgage Really Is](/learn/home-ownership/what-is-a-mortgage) and work forward from there.",
      },
    ],
    related: ["renting-your-first-apartment", "what-is-a-mortgage", "hidden-costs-of-owning"],
  },

  {
    slug: "what-is-a-mortgage",
    order: 60,
    topicId: "home-ownership",
    title: "What a Mortgage Really Is",
    dek: "It sounds complicated, but the idea is simple: a mortgage is a loan for a home. Here's how the pieces fit together so you can read your own numbers.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A mortgage is a long-term loan you use to buy a home, paid back in monthly pieces over many years.",
      "Each payment splits into principal (the amount you borrowed) and interest, the cost of borrowing.",
      "Your payment may also bundle in property taxes and insurance through an escrow account.",
    ],
    body: [
      {
        type: "p",
        text: "Almost no one buys a home with cash, so most people borrow. A mortgage is simply a loan used to buy a home, with the home itself acting as a guarantee. If you stop paying for a long time, the lender can take the home back. That sounds scary, but for most owners it just means steady monthly payments for many years.",
      },
      {
        type: "h2",
        text: "Principal and interest",
      },
      {
        type: "p",
        text: "Every mortgage payment is built from two main parts. The principal is the actual amount you borrowed. The interest is what the lender charges you for the loan, almost like a rental fee on the money. Early on, most of your payment goes to interest. Over time, more of it goes to principal, until the loan is finally paid off.",
      },
      {
        type: "p",
        text: "Say you borrow $250,000. In the first year, a big slice of each payment covers interest, and only a little chips away at that $250,000. By year 20, that has flipped, and you're knocking down what you owe much faster.",
      },
      {
        type: "h2",
        text: "Fixed rate vs. adjustable rate",
      },
      {
        type: "p",
        text: "A fixed-rate mortgage keeps the same interest rate for the entire loan, so your principal-and-interest payment never changes. That predictability is why many people choose it. An adjustable-rate mortgage can start lower but change later, which means your payment can rise. If a stable payment helps you sleep, the fixed version is the simpler choice.",
      },
      {
        type: "h2",
        text: "Escrow: the part people forget",
      },
      {
        type: "p",
        text: "Many lenders also collect money each month for your property taxes and home insurance, then pay those bills for you. They hold that money in an escrow account. So your monthly payment might be $1,500 for the loan plus another $400 for taxes and insurance, for a total of $1,900 leaving your bank.",
      },
      {
        type: "key",
        text: "When you see a monthly mortgage payment quoted, ask whether it includes taxes and insurance. The loan-only number can be hundreds of dollars lower than what you'll actually pay.",
      },
      {
        type: "h2",
        text: "How the loan gets paid off",
      },
      {
        type: "steps",
        items: [
          "You borrow a set amount, such as $250,000, at an agreed interest rate.",
          "You make the same payment every month for the loan's length, often 30 years ([15-year loans](/learn/home-ownership/15-vs-30-year-mortgage) are the other common choice).",
          "Each payment covers that month's interest first, then reduces what you owe.",
          "Over time the balance shrinks, and the final payment brings it to zero.",
        ],
      },
      {
        type: "tip",
        text: "Even a small extra payment toward principal each year can shorten your loan and cut the total interest you pay. Just tell your lender to apply the extra to the balance, not to next month's bill.",
      },
      {
        type: "p",
        text: "That's the whole machine. A mortgage is a long, steady loan, split into principal and interest, sometimes bundled with taxes and insurance. Once you can name those parts, the paperwork stops feeling like a foreign language. The next question is the upfront cash: [how much down payment you actually need](/learn/home-ownership/down-payment-basics).",
      },
    ],
    related: ["renting-vs-buying", "down-payment-basics", "15-vs-30-year-mortgage"],
    quiz: [
      {
        question: "In the early years of a mortgage, where does most of each monthly payment go?",
        options: [
          "Paying down the amount you borrowed",
          "Interest, the cost of borrowing",
          "Property taxes and insurance",
        ],
        answer: 1,
        explain:
          "Early on, a big slice of each payment covers interest and only a little chips away at the principal. Over time that flips, and you pay down what you owe much faster.",
      },
      {
        question: "What's the main appeal of a fixed-rate mortgage over an adjustable-rate one?",
        options: [
          "It always starts with a lower interest rate",
          "You skip paying interest after the first few years",
          "Your principal-and-interest payment never changes",
        ],
        answer: 2,
        explain:
          "A fixed rate keeps the same interest rate for the entire loan, so the payment is predictable. An adjustable rate can start lower but rise later.",
      },
      {
        question: "A lender quotes you a $1,500 monthly payment. What should you ask before trusting that number?",
        options: [
          "Whether it includes property taxes and insurance",
          "Whether you can skip payments in hard months",
          "Whether the bank rounds payments up or down",
        ],
        answer: 0,
        explain:
          "Many lenders collect taxes and insurance through an escrow account on top of the loan payment. The loan-only number can be hundreds of dollars lower than what actually leaves your bank.",
      },
    ],
  },

  {
    slug: "down-payment-basics",
    order: 70,
    topicId: "home-ownership",
    title: "How Much Down Payment You Actually Need",
    dek: "The '20% down' rule scares a lot of people out of buying. Here's what's really required, and why you may need far less than you think.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A down payment is the upfront cash you put toward the home; you borrow the rest.",
      "You don't always need 20% down. Many loans allow much smaller amounts.",
      "Putting less than 20% down usually means paying PMI, an added monthly cost that protects the lender.",
      "The best down payment leaves you with a home you can afford and a safety net intact.",
    ],
    body: [
      {
        type: "p",
        text: "A down payment is the chunk of the price you pay upfront in cash, while the mortgage covers the rest. On a $250,000 home, a 10% down payment is $25,000, and you'd borrow the other $225,000. The bigger your down payment, the less you borrow and the lower your monthly payment.",
      },
      {
        type: "h2",
        text: "The 20% myth",
      },
      {
        type: "p",
        text: "Somewhere along the way, 'you must put 20% down' became common wisdom. It isn't true. Twenty percent is a helpful target, but it's not a requirement. Many loan programs let you buy with far less, and some allow as little as 3% to 5% down for buyers who qualify.",
      },
      {
        type: "p",
        text: "On that same $250,000 home, 20% down is $50,000, which can take years to save. A 5% down payment is $12,500, which puts a home within reach much sooner for a lot of people.",
      },
      {
        type: "h2",
        text: "The trade-off: PMI",
      },
      {
        type: "p",
        text: "When you put down less than 20%, lenders usually require private mortgage insurance: an extra monthly charge, often $50 to $200 a month, that protects the lender if you stop paying. It isn't permanent, and once you owe less than 80% of the home's value you can usually have it removed. [PMI, Explained](/learn/home-ownership/pmi-explained) covers exactly how that works.",
      },
      {
        type: "h2",
        text: "Bigger down payment vs. keeping cash",
      },
      {
        type: "p",
        text: "A larger down payment lowers your loan and may skip PMI. But draining your entire savings to reach 20% can backfire. If you have no cushion left and the furnace dies, you're stuck. It's often smarter to put a bit less down and keep an emergency fund than to be 'house rich and cash poor.'",
      },
      {
        type: "list",
        items: [
          "A bigger down payment means a smaller loan and lower monthly payments.",
          "Reaching 20% lets you avoid PMI entirely.",
          "A smaller down payment gets you into a home sooner and keeps more cash on hand.",
          "Whatever you choose, try to keep a few months of expenses in savings.",
        ],
      },
      {
        type: "tip",
        text: "Before you assume you can't afford a home, look up [first-time buyer programs](/learn/home-ownership/first-time-buyer-programs) and low-down-payment loan options. Many people qualify to put down far less than the 20% number stuck in their head.",
      },
      {
        type: "p",
        text: "There's no single magic number. The right down payment gets you into a home you can comfortably afford while leaving you a safety net. Once you've picked a target, [Saving for a Down Payment, Realistically](/learn/home-ownership/saving-for-down-payment) covers where to keep the money and how to build it up.",
      },
    ],
    related: ["what-is-a-mortgage", "saving-for-down-payment", "pmi-explained"],
  },

  {
    slug: "15-vs-30-year-mortgage",
    order: 120,
    topicId: "home-ownership",
    title: "15-Year vs. 30-Year Mortgages",
    dek: "Both loans pay off the same home, but they feel very different month to month, and they add up very differently over time.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A 15-year mortgage has higher monthly payments but costs far less in total interest.",
      "A 30-year mortgage has lower, easier payments but you pay much more interest over time.",
      "The lower payment of a 30-year loan can be the safer choice when it protects your budget.",
      "You can take a 30-year loan and still pay it off faster by adding extra to principal.",
    ],
    body: [
      {
        type: "p",
        text: "When you pick a mortgage, one big choice is how long you'll take to pay it back. The two most common lengths are 15 years and 30 years. They buy the same house, but they shape your budget and your total cost in very different ways. (If principal and interest are still fuzzy, [What a Mortgage Really Is](/learn/home-ownership/what-is-a-mortgage) covers the basics first.)",
      },
      {
        type: "h2",
        text: "The core trade-off",
      },
      {
        type: "p",
        text: "A 15-year loan squeezes the same principal into half the time, so each monthly payment is bigger. A 30-year loan spreads it out, so each payment is smaller and easier to fit into your budget. That's the whole tension: pay more each month and finish fast, or pay less each month and take longer.",
      },
      {
        type: "h2",
        text: "Why the 15-year saves so much",
      },
      {
        type: "p",
        text: "Because you're borrowing the money for fewer years, interest has less time to pile up. On a $250,000 loan, a 30-year term can cost well over $100,000 in total interest across the life of the loan. A 15-year term on the same amount often cuts that interest cost by more than half.",
      },
      {
        type: "p",
        text: "Fifteen-year loans also tend to carry slightly lower rates, which deepens the savings. The catch is real, though: the monthly payment might be hundreds of dollars higher, which not every budget can handle.",
      },
      {
        type: "key",
        text: "The 15-year loan saves you the most money over time. The 30-year loan protects you the most each month. Both can be the 'right' answer, depending on which risk worries you more.",
      },
      {
        type: "h2",
        text: "Why a 30-year can still be smart",
      },
      {
        type: "p",
        text: "A lower required payment gives you breathing room. If your income dips or a big expense hits, a smaller monthly bill is easier to keep paying. Some people choose a 30-year loan on purpose, then pay a little extra toward principal in good months. That way they keep the flexibility but still chip away faster when they can.",
      },
      {
        type: "tip",
        text: "Want to pay off a home fast but keep a safety net? Take the 30-year loan and add extra to the balance when you can. You get the lower required payment and the freedom to speed up, without locking yourself into a bigger bill.",
      },
      {
        type: "h2",
        text: "How to decide",
      },
      {
        type: "steps",
        items: [
          "Find the monthly payment for both the 15-year and 30-year version of your loan.",
          "Make sure the higher 15-year payment still leaves room for savings and emergencies.",
          "Compare the total interest each loan would cost over its full life.",
          "Pick the longest term you're comfortable with, then decide whether to prepay.",
        ],
      },
      {
        type: "p",
        text: "Neither choice is a mistake. A 15-year loan rewards a strong, steady budget with big interest savings. A 30-year loan trades some of that savings for monthly safety. Choose the one that lets you sleep at night and still cover the rest of your life.",
      },
    ],
    related: ["what-is-a-mortgage", "hidden-costs-of-owning", "underwater-mortgage"],
  },

  {
    slug: "hidden-costs-of-owning",
    order: 150,
    topicId: "home-ownership",
    title: "The Hidden Costs of Owning",
    dek: "The mortgage payment is just the start. Owning comes with bills renters never see, and planning for them keeps homeownership from feeling like a trap.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "The true cost of owning is far more than the monthly mortgage payment.",
      "Property taxes, insurance, maintenance, and repairs can add hundreds of dollars a month.",
      "A common guideline is to expect about 1% of the home's value a year on upkeep.",
      "Setting aside a repair fund each month keeps surprise costs from becoming a crisis.",
    ],
    body: [
      {
        type: "p",
        text: "When people picture the cost of owning a home, they usually picture the mortgage payment. But that payment is only one line on the bill. Owning brings a whole set of costs that renters simply never deal with, and ignoring them is how new owners get blindsided.",
      },
      {
        type: "h2",
        text: "Property taxes and insurance",
      },
      {
        type: "p",
        text: "Once you own, you owe property taxes to your local government every year, and they can rise as your home's value rises. You also need home insurance to protect against fire, storms, and other damage. Together these can add several hundred dollars to your monthly cost, often paid through your escrow account along with the loan.",
      },
      {
        type: "h2",
        text: "Maintenance and repairs",
      },
      {
        type: "p",
        text: "This is the big one people underestimate. Roofs wear out. Water heaters fail. Appliances break at the worst possible time. A common guideline is to expect to spend about 1% of your home's value each year on upkeep. On a $300,000 home, that's roughly $3,000 a year, or $250 a month, even in a year when nothing dramatic happens.",
      },
      {
        type: "key",
        text: "When you're deciding what you can afford, add taxes, insurance, and a repair fund on top of the mortgage. A home with a $1,700 loan payment can easily cost $2,300 a month all in.",
      },
      {
        type: "h2",
        text: "The costs that hide in the corners",
      },
      {
        type: "list",
        items: [
          "HOA or condo fees, which can run from modest to several hundred dollars a month.",
          "Higher utility bills, since you're now heating and cooling more space.",
          "Lawn care, pest control, and seasonal upkeep you used to ignore as a renter.",
          "One-time costs after moving in, like a new fridge, blinds, or basic tools.",
        ],
      },
      {
        type: "h2",
        text: "How to stay ahead of it",
      },
      {
        type: "p",
        text: "The fix isn't to fear these costs but to plan for them. Treat upkeep as a regular bill, not a surprise. If you quietly set money aside every month, a $1,200 repair becomes an annoyance instead of an emergency that lands on a credit card.",
      },
      {
        type: "tip",
        text: "Open a separate savings account just for your home and auto-transfer a set amount each month. It's a classic [sinking fund](/learn/budgeting/sinking-funds): when the dishwasher dies, you pay from that account and barely feel it.",
      },
      {
        type: "p",
        text: "None of this means owning is a bad idea. It just means the real price tag is bigger than the mortgage alone. Budget for the whole thing, and homeownership stays a source of stability instead of stress.",
      },
    ],
    related: ["renting-vs-buying", "closing-costs", "underwater-mortgage"],
  },

  {
    slug: "underwater-mortgage",
    order: 160,
    topicId: "home-ownership",
    title: "What 'Underwater' Means — and How to Avoid It",
    dek: "Being underwater means owing more than your home is worth. It's uncomfortable but understandable, and a few habits make it far less likely.",
    level: "Advanced",
    readMinutes: 6,
    takeaways: [
      "You're underwater when you owe more on your mortgage than the home is currently worth.",
      "It usually happens when home values fall or when you bought with very little down.",
      "A solid down payment, an affordable loan, and time are your best protections.",
      "Staying put and paying on time often turns a paper problem into a non-event.",
    ],
    body: [
      {
        type: "p",
        text: "Sometimes a home is worth less than what you still owe on it. When that happens, people say the mortgage is 'underwater,' or that the owner has negative equity. It's an uncomfortable spot, but it's not a moral failing, and understanding how it happens is the first step to avoiding it.",
      },
      {
        type: "h2",
        text: "How a home ends up underwater",
      },
      {
        type: "p",
        text: "Imagine you buy a home for $250,000 and borrow $240,000 after a small down payment. If home prices in your area later fall and your home is now worth $220,000, you still owe around $238,000. You owe more than the home would sell for, so you're underwater by roughly $18,000.",
      },
      {
        type: "p",
        text: "Two things make this more likely: putting very little down at the start, so you own only a sliver of the home, and a drop in local home values. Combine the two and even a steady, on-time borrower can end up here through no fault of their own.",
      },
      {
        type: "h2",
        text: "Why it matters",
      },
      {
        type: "p",
        text: "Being underwater mostly becomes a problem when you need to move or sell. If you sell for less than you owe, you have to cover the gap out of pocket. It can also make refinancing harder. As long as you can keep making payments and stay put, though, it's often a paper problem that time can heal as you pay down the loan.",
      },
      {
        type: "key",
        text: "Your equity is the home's value minus what you owe. The faster you build equity, through your down payment and your monthly principal, the more cushion you have if values dip.",
      },
      {
        type: "h2",
        text: "How to lower the odds",
      },
      {
        type: "steps",
        items: [
          "Put down a [meaningful down payment](/learn/home-ownership/down-payment-basics) so you start with real equity, not almost none.",
          "Borrow less than the most you're approved for, leaving room if values slip.",
          "Avoid stretching into a home right at the top of your budget in a hot market.",
          "Add a little extra to principal over time to build equity faster.",
        ],
      },
      {
        type: "tip",
        text: "Don't panic if your home value dips and you go slightly underwater while you're staying put and paying on time. Each payment chips away at what you owe, and values often recover. Selling in a hurry is what turns a paper problem into a real loss.",
      },
      {
        type: "h2",
        text: "The honest bottom line",
      },
      {
        type: "p",
        text: "No one can promise that home values only go up, and pretending otherwise is how people get hurt. But a healthy down payment, a loan you can comfortably afford, and a plan to stay a while make being underwater both less likely and less painful if it ever happens. Buy with a margin of safety, and you give yourself room to ride out the dips.",
      },
    ],
    related: ["down-payment-basics", "hidden-costs-of-owning", "15-vs-30-year-mortgage"],
  },
  {
    slug: "renting-101-tenant-rights",
    order: 30,
    topicId: "home-ownership",
    title: "Renting 101: Your Rights as a Tenant",
    dek: "Once you've signed a lease, the law is on your side more than you might think. Here's what a landlord can and can't do.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "A landlord can't evict you without going through the courts, and can't change your locks or shut off utilities to push you out.",
      "Your home has to be livable: working heat, water, and basic safety.",
      "Fair housing laws protect you regardless of where you're from, and immigration status doesn't erase them.",
      "Tenant unions and legal aid offices help with exactly these problems, often for free.",
    ],
    body: [
      {
        type: "p",
        text: "Most people rent long before they ever buy, and renting comes with real rights that nobody bothers to explain. Knowing them is the difference between getting pushed around and standing on solid ground. (Still hunting for a place? [Renting Your First Apartment](/learn/home-ownership/renting-your-first-apartment) covers applications, upfront costs, and reading the lease. This article is about what protects you after you've signed.)",
      },
      {
        type: "h2",
        text: "They can't just kick you out",
      },
      {
        type: "p",
        text: "Eviction is a court process. A landlord who wants you out has to file a case and win it. They cannot change the locks, throw your belongings on the curb, or shut off your heat, water, or electricity to force you to leave. Every one of those moves is illegal, no matter what the landlord claims or how far behind on rent you are.",
      },
      {
        type: "h2",
        text: "The place has to be livable",
      },
      {
        type: "p",
        text: "Landlords are required to keep the home fit to live in: working heat, running water, and basic safety. When something important breaks, ask for the repair in writing so there's a dated record of the request. If serious problems go ignored, your city or state's tenant rules spell out what you can do next, and a local tenant union or legal aid office can walk you through it.",
      },
      {
        type: "h2",
        text: "Discrimination is illegal",
      },
      {
        type: "p",
        text: "Fair housing laws make it illegal for a landlord to turn you away or treat you worse because of your race, national origin, religion, family status, and more. These protections apply to everyone.",
      },
      {
        type: "key",
        text: "Your immigration status does not erase these protections. If a landlord threatens you or breaks the rules, look up your city or state's tenant rights, or find a local tenant union or legal aid office. That help is often free.",
      },
      {
        type: "h2",
        text: "One more right worth its own guide",
      },
      {
        type: "p",
        text: "Your security deposit is your money; the landlord just holds it, and has to return it within a window your state sets unless you caused real damage. The documentation habits that make sure it comes back are in [How to Get Your Security Deposit Back](/learn/home-ownership/security-deposit-back).",
      },
      {
        type: "p",
        text: "None of this requires a lawyer on retainer. It requires knowing the floor: eviction only through a court, a livable home, equal treatment, and your deposit handled by the rules. Add [cheap renters insurance](/learn/home-ownership/renters-insurance) and you've covered the basics of renting well.",
      },
    ],
    related: ["renting-your-first-apartment", "security-deposit-back", "renters-insurance"],
  },
];
