import type { Article } from "./types";

export const collegeExtraArticles: Article[] = [
  {
    slug: "federal-vs-private-loans",
    order: 70,
    topicId: "college",
    title: "Federal vs. Private Student Loans",
    dek: "Two loans can have the same dollar amount and be wildly different deals. Here's how to tell them apart.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Federal loans come with protections private loans simply don't have.",
      "For almost everyone, federal loans should come first.",
      "A private loan can quietly cost far more over time.",
      "Borrow federal up to what you need before you even look at private.",
    ],
    body: [
      {
        type: "p",
        text: "A loan is a loan, right? You borrow money, you pay it back. So it can feel like it shouldn't matter much *who* you borrow from. But with student loans, it matters enormously — two loans for the exact same amount can turn into completely different futures. If no one in your family has borrowed for school before, this is the difference worth understanding first.",
      },
      {
        type: "h2",
        text: "What makes federal loans different",
      },
      {
        type: "p",
        text: "Federal student loans come from the government, and they carry built-in protections that private loans usually don't. These aren't small perks — they're the things that keep a rough patch from becoming a disaster.",
      },
      {
        type: "list",
        items: [
          "**Fixed interest rates** set by law, so your rate can't suddenly jump on you.",
          "**Income-driven repayment** — your monthly payment can be tied to what you actually earn.",
          "**Pauses when life hits** — options to postpone payments if you lose a job or hit hardship.",
          "**Possible forgiveness** through certain public-service or repayment programs.",
        ],
      },
      {
        type: "h2",
        text: "Where private loans come in",
      },
      {
        type: "p",
        text: "Private loans come from banks, credit unions, and online lenders. Some are fine. But the rate often depends on your credit (or a co-signer's), it can be variable — meaning it climbs over time — and you generally don't get the safety nets above. Miss payments and there's far less room to breathe.",
      },
      {
        type: "tip",
        text: "If a lender reaches out *first* with a slick offer, slow down. The genuinely better deal — federal aid — is the one you go looking for through the FAFSA, not the one that finds you in your inbox.",
      },
      {
        type: "h2",
        text: "The order that protects you",
      },
      {
        type: "p",
        text: "Think of it as a staircase. Use up free money first — grants and scholarships, which you never repay. Then federal loans, up to what you actually need. Only if there's still a real gap do you consider a private loan, and even then, borrow as little as you can.",
      },
      {
        type: "key",
        text: "Federal almost always goes first. Same borrowed dollars, but federal loans bend when your life does — private loans usually don't.",
      },
      {
        type: "p",
        text: "For the 2025–26 school year, federal Direct Loans for undergraduates carry a **6.39%** fixed interest rate, and a dependent student can borrow **$5,500** their first year, **$6,500** their second, and **$7,500** each year after — up to **$31,000** total. Rates reset every July and limits change occasionally, so confirm the current numbers, and your school's financial aid office can walk you through exactly what you've been offered. That conversation is free, and it's their job.",
      },
    ],
    related: ["student-loans-before-you-sign", "subsidized-vs-unsubsidized", "grants-loans-scholarships"],
  },

  {
    slug: "subsidized-vs-unsubsidized",
    order: 40,
    topicId: "college",
    title: "Subsidized vs. Unsubsidized Loans",
    dek: "One word in your aid letter decides whether the government pays your interest while you're in school. It's worth knowing which.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Subsidized loans: the government covers interest while you're in school.",
      "Unsubsidized loans: interest builds the whole time, including in school.",
      "Subsidized loans are need-based; take them first.",
      "Paying even a little interest early can save you real money.",
    ],
    body: [
      {
        type: "p",
        text: "Your aid letter lists two kinds of federal loans, and the names are almost designed to make your eyes glaze over: *subsidized* and *unsubsidized*. But the difference between them is real money — sometimes hundreds or thousands of dollars by the time you graduate. Let's make it plain.",
      },
      {
        type: "h2",
        text: "What 'subsidized' actually means",
      },
      {
        type: "p",
        text: "With a subsidized loan, the government pays your interest while you're in school at least half-time, and during certain grace and pause periods. So a $5,000 subsidized loan is still right around $5,000 when you graduate — your debt isn't quietly growing while you're sitting in class.",
      },
      {
        type: "h2",
        text: "What 'unsubsidized' means",
      },
      {
        type: "p",
        text: "With an unsubsidized loan, interest starts adding up the day the money hits your account and keeps going the entire time — including all four (or more) years you're in school. If you don't pay that interest as it builds, it gets added to your balance, and then you start paying interest *on the interest*. That's how a loan grows while you're not looking.",
      },
      {
        type: "tip",
        text: "On an unsubsidized loan, even tiny payments while you're still in school help. Putting $25 a month toward the interest keeps it from piling onto your balance — and that's money you'd otherwise pay interest on for years.",
      },
      {
        type: "h2",
        text: "Which one you'll be offered",
      },
      {
        type: "p",
        text: "Subsidized loans are need-based, so they go to students whose financial picture shows the need — exactly why filling out the FAFSA carefully matters. Unsubsidized loans are available more broadly. If you're offered both, take the subsidized one first; it's simply the better deal.",
      },
      {
        type: "key",
        text: "Subsidized = the government covers interest while you're in school. Unsubsidized = it doesn't, and the clock is already running. Same loan amount, different cost.",
      },
      {
        type: "p",
        text: "There are caps. A dependent undergraduate can borrow **$5,500** the first year, **$6,500** the second, and **$7,500** each year after — but only part of each can be *subsidized* (**$3,500**, then **$4,500**, then **$5,500**), with the rest unsubsidized. These limits shift occasionally, so confirm the current caps. And if your aid letter is hard to read, your financial aid office will tell you which of your loans is which — don't guess on something this important.",
      },
    ],
    related: ["federal-vs-private-loans", "reading-aid-award-letter", "student-loans-before-you-sign"],
  },

  {
    slug: "work-study-explained",
    order: 50,
    topicId: "college",
    title: "Work-Study, Explained",
    dek: "It's a campus job built around your class schedule — and the money is part of your financial aid.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Work-study is a need-based, part-time job tied to your aid.",
      "The schedule is built to fit around your classes.",
      "Your earnings are yours — usually a regular paycheck.",
      "The award is a limit, not a guarantee; you earn it by working.",
    ],
    body: [
      {
        type: "p",
        text: "You see 'Federal Work-Study' on your aid letter, maybe with a dollar amount next to it, and it's not obvious what you're supposed to do with that. Is it free money? A loan? Something you sign? Here's the short, honest version.",
      },
      {
        type: "h2",
        text: "What work-study really is",
      },
      {
        type: "p",
        text: "Work-study is a part-time job, usually right on campus, that's part of your financial aid package. It's need-based, which is another reason the FAFSA matters. The dollar figure on your letter isn't cash handed to you — it's the *most* you can earn through the program. You get there by actually working and collecting a paycheck, just like any job.",
      },
      {
        type: "h2",
        text: "Why it's better than a random job",
      },
      {
        type: "list",
        items: [
          "**Built around class.** Work-study jobs are made for students, so supervisors expect your schedule to come first.",
          "**Often on campus.** Less commuting, less time lost — sometimes you're working steps from your next class.",
          "**Resume-friendly.** Many roles sit in offices, labs, or libraries, which can connect to what you're studying.",
          "**Aid-aware.** In many cases these earnings are treated more kindly when you fill out next year's FAFSA.",
        ],
      },
      {
        type: "tip",
        text: "Work-study funds can run out, and good positions fill early. The moment you know it's part of your package, ask the financial aid or student employment office how to find and claim a spot — don't wait until the semester starts.",
      },
      {
        type: "h2",
        text: "How you actually get paid",
      },
      {
        type: "p",
        text: "You usually get a regular paycheck for the hours you work, and the money is yours to use — for books, transit, food, whatever you need. Some programs let you direct earnings toward tuition, but often it lands in your hands to cover the everyday costs that quietly add up.",
      },
      {
        type: "key",
        text: "Work-study is a job, not a gift — but it's a job designed to fit a student's life. If it's offered to you, it's usually worth claiming.",
      },
    ],
    related: ["grants-loans-scholarships", "reading-aid-award-letter", "fafsa-step-by-step"],
  },

  {
    slug: "community-college-path",
    order: 60,
    topicId: "college",
    title: "The Community College Path",
    dek: "Two years at a community college, then transfer up — a route that can cut the cost of a degree dramatically.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Community college tuition is a fraction of a four-year school's.",
      "You can transfer credits toward a bachelor's degree.",
      "Your diploma comes from where you finish, not where you start.",
      "Transfer agreements make the path smoother than it looks.",
    ],
    body: [
      {
        type: "p",
        text: "There's a quiet myth that community college is the lesser option — a backup, not a real path. Forget that. For a lot of smart, ambitious people, starting at a community college and transferring up is one of the most financially intelligent moves you can make. It's not settling. It's strategy.",
      },
      {
        type: "h2",
        text: "Why it costs so much less",
      },
      {
        type: "p",
        text: "Community college tuition is typically a small fraction of what a four-year school charges. The first two years of almost any degree are general courses — English, math, intro sciences — and you can take those for far less. Same foundational classes, dramatically smaller bill.",
      },
      {
        type: "p",
        text: "Picture a degree where the first two years cost a few thousand dollars instead of tens of thousands. That gap is money you don't have to borrow — and debt you never have to repay.",
      },
      {
        type: "h2",
        text: "How transferring up works",
      },
      {
        type: "p",
        text: "After your first two years, you transfer to a four-year college to finish your bachelor's degree. The credits you earned come with you, so you pick up where you left off. And here's the part that surprises people: your final diploma comes from the four-year school where you *graduate* — not the community college where you started.",
      },
      {
        type: "tip",
        text: "Many states and schools have **transfer agreements** (sometimes called articulation agreements) that guarantee your community college credits will count at specific four-year schools. Find these *before* you pick classes, so every credit you earn actually transfers.",
      },
      {
        type: "h2",
        text: "Making sure the credits count",
      },
      {
        type: "steps",
        items: [
          "Pick the four-year schools you might transfer to, even loosely, early on.",
          "Ask both schools' advisors which community college courses transfer cleanly.",
          "Take classes that fit those transfer agreements, not random electives.",
          "Keep your grades up — transfer admission and scholarships often hinge on them.",
        ],
      },
      {
        type: "key",
        text: "Starting at community college isn't a smaller dream. It can be the same degree for a fraction of the cost — as long as you plan the transfer from day one.",
      },
      {
        type: "p",
        text: "A transfer advisor at either school can map this out with you for free. Lean on them. They've helped hundreds of students walk this exact path, even when no one at home has.",
      },
    ],
    related: ["in-state-vs-out-of-state", "minimizing-college-debt", "grants-loans-scholarships"],
  },

  {
    slug: "in-state-vs-out-of-state",
    order: 60,
    topicId: "college",
    title: "In-State vs. Out-of-State Tuition",
    dek: "The same public university can charge you two very different prices, depending on where the state says you live.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Public colleges charge residents far less than non-residents.",
      "Residency rules are set by each state and vary a lot.",
      "The price difference can be tens of thousands of dollars.",
      "Sometimes you can establish residency — but plan ahead.",
    ],
    body: [
      {
        type: "p",
        text: "Two students sit in the same lecture hall, take the same class, earn the same degree — and one of them paid two or three times more in tuition. The only difference? Which state each one calls home. At public colleges, where you live can change the price tag more than almost anything else.",
      },
      {
        type: "h2",
        text: "Why residents pay less",
      },
      {
        type: "p",
        text: "Public colleges are funded partly by the taxpayers of their state. So those states give their own residents a steep discount — that's in-state tuition. Students from elsewhere pay the full, unsubsidized rate, which is out-of-state tuition. We're often talking a difference of tens of thousands of dollars over a degree.",
      },
      {
        type: "h2",
        text: "How residency actually works",
      },
      {
        type: "p",
        text: "Here's where it gets tricky: every state writes its own residency rules, and they vary a lot. Generally they look at things like how long you've lived there, where you pay taxes, your driver's license, and whether you're financially independent or claimed by a parent. Simply moving to a state to attend college usually does *not* make you a resident for tuition.",
      },
      {
        type: "tip",
        text: "Because the rules differ so much by state — and have real exceptions for things like military families, certain regional agreements, and some states' policies for local high school graduates — never assume. Check the specific residency rules for the exact schools you're considering, in writing.",
      },
      {
        type: "h2",
        text: "Ways the price gap shrinks",
      },
      {
        type: "list",
        items: [
          "**Your own state's schools** are the default low-cost option — start there.",
          "**Regional tuition agreements** let students in neighboring states pay reduced rates at some schools.",
          "**Establishing residency** is possible in some states if you plan well ahead and meet every requirement.",
          "**Out-of-state scholarships** sometimes close the gap for strong applicants — ask the school directly.",
        ],
      },
      {
        type: "key",
        text: "At a public college, residency can be the single biggest factor in your bill. Before you fall for an out-of-state school, find out what it actually costs *you* — not the sticker price.",
      },
      {
        type: "p",
        text: "Residency rules are dense, and getting them wrong is expensive. The admissions or financial aid office can tell you exactly where you'd stand and whether any path to in-state rates exists. Ask before you commit.",
      },
    ],
    related: ["community-college-path", "minimizing-college-debt", "understanding-unmet-need"],
  },

  {
    slug: "appealing-financial-aid",
    order: 30,
    topicId: "college",
    title: "How to Appeal Your Financial Aid",
    dek: "If your aid offer doesn't match your real situation, you can ask for more — and a good letter often works.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Your first aid offer is not always the final word.",
      "An appeal is a polite, documented request — not a complaint.",
      "Changed circumstances and special expenses are strong reasons.",
      "The worst they say is no, and you're no worse off for asking.",
    ],
    body: [
      {
        type: "p",
        text: "Your financial aid letter arrives, the gap between aid and cost is bigger than you can cover, and it feels final. Here's something nobody tells first-generation students: that offer is often a starting point, not a verdict. You can appeal — and a clear, honest letter can genuinely get you more money.",
      },
      {
        type: "h2",
        text: "When an appeal makes sense",
      },
      {
        type: "p",
        text: "An appeal isn't about arguing the school was wrong. It's about telling them something the FAFSA didn't capture — usually a real change or an expense the standard formula missed. Strong reasons include:",
      },
      {
        type: "list",
        items: [
          "**A drop in income** — a parent lost a job or had hours cut since you filed.",
          "**A death or divorce** that changed your family's finances.",
          "**Big medical bills** or other unavoidable costs the formula didn't see.",
          "**A better offer** from a comparable school you can point to.",
        ],
      },
      {
        type: "h2",
        text: "How to write the letter",
      },
      {
        type: "p",
        text: "Keep it respectful, specific, and short. You're not demanding — you're explaining. Name the school's exact term for it (often a 'special circumstances' or 'professional judgment' review) and address it to the financial aid office.",
      },
      {
        type: "steps",
        items: [
          "Open by thanking them and saying you hope to attend — make your interest clear.",
          "Explain plainly what changed or what the formula didn't account for.",
          "Attach proof: a layoff notice, medical bills, a competing aid letter.",
          "State directly that you're asking them to review your aid, then thank them again.",
        ],
      },
      {
        type: "tip",
        text: "Send it early and follow up by phone. A real human in the aid office reads these, and a calm, organized appeal with documents attached is far easier to say yes to than a vague one.",
      },
      {
        type: "key",
        text: "Asking for more aid is normal, expected, and free. The worst outcome is the same answer you already have — so the only real mistake is not asking.",
      },
      {
        type: "p",
        text: "If writing the letter feels intimidating, a college access program or a counselor can help you draft it for free. You don't have to know the magic words. You just have to tell the truth, clearly, with proof.",
      },
    ],
    related: ["reading-aid-award-letter", "understanding-unmet-need", "fafsa-mistakes"],
  },

  {
    slug: "fafsa-mistakes",
    order: 20,
    topicId: "college",
    title: "Common FAFSA Mistakes That Cost You Aid",
    dek: "Small errors on the FAFSA can quietly shrink your aid or hold it up for weeks. Here's what to watch.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Most FAFSA mistakes are simple and completely avoidable.",
      "Leaving it blank when unsure is worse than asking for help.",
      "Submitting early often means more available aid.",
      "Double-check names, numbers, and who counts as a parent.",
    ],
    body: [
      {
        type: "p",
        text: "The FAFSA is the form that unlocks most financial aid — grants, federal loans, work-study, even a lot of scholarships. Which means a small slip on it doesn't just cause a typo; it can cost you actual money. The good news: almost every common mistake is easy to dodge once someone points it out. So let's point them out.",
      },
      {
        type: "h2",
        text: "The mistakes that cost you money",
      },
      {
        type: "list",
        items: [
          "**Filing late or not at all.** Some aid is first-come, first-served — when the money's gone, it's gone. The FAFSA usually opens around October 1; file as close to that as you can, and check your state and school deadlines (many are far earlier than the federal June 30 cutoff).",
          "**Leaving fields blank.** A blank can read as 'unanswered' and stall everything. If an amount is zero, write 0.",
          "**Mismatched info.** A name or Social Security number that doesn't match official records can freeze your whole application.",
          "**Listing the wrong parent.** Whose information counts depends on specific rules, especially with divorce or separation — get this one right.",
        ],
      },
      {
        type: "h2",
        text: "The 'I'll skip it' trap",
      },
      {
        type: "p",
        text: "Two beliefs quietly stop people from filing, and both are usually wrong. The first: 'My family makes too much to qualify.' Plenty of aid isn't purely income-based, and some loans and scholarships need the FAFSA regardless. The second: 'It's too confusing, I'll deal with it later.' Later is how deadlines get missed.",
      },
      {
        type: "tip",
        text: "Don't guess on a question you don't understand — guessing wrong can cost you aid. Free help exists: your school counselor, the financial aid office, and college-access nonprofits walk students through the FAFSA every single year, no charge.",
      },
      {
        type: "h2",
        text: "A quick check before you submit",
      },
      {
        type: "steps",
        items: [
          "Confirm names and Social Security numbers match official documents exactly.",
          "Make sure no required field is blank — use 0 where the answer is zero.",
          "Double-check you reported the correct parent's information.",
          "List every school you're considering, even the maybes.",
          "Submit, then save your confirmation and watch for follow-up requests.",
        ],
      },
      {
        type: "key",
        text: "The FAFSA isn't a test you can fail — it's a form you want to get right. Slow down, ask for free help when you're stuck, and file early.",
      },
    ],
    related: ["fafsa-step-by-step", "appealing-financial-aid", "undocumented-daca-aid"],
  },

  {
    slug: "minimizing-college-debt",
    order: 20,
    topicId: "college",
    title: "Getting Through College With as Little Debt as Possible",
    dek: "A full strategy for finishing your degree owing the smallest amount you possibly can.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Free money and smart school choices beat borrowing every time.",
      "Borrow only what you truly need, never the full offer.",
      "Cutting time-to-degree is one of the biggest savings of all.",
      "Small habits across four years add up to far less debt.",
    ],
    body: [
      {
        type: "p",
        text: "You can absolutely get a degree. The real question — the one that shapes your twenties — is how much debt you carry out the other side. Two people can earn the same diploma and graduate worlds apart: one owing very little, one buried. The difference is rarely luck. It's a stack of deliberate choices made over four years. Here's the playbook.",
      },
      {
        type: "h2",
        text: "Pile up the money you never repay",
      },
      {
        type: "p",
        text: "Every free dollar is a dollar you don't borrow *and* don't pay interest on later — so this comes first, always. Grants and scholarships are the foundation.",
      },
      {
        type: "list",
        items: [
          "File the FAFSA early and carefully — it's the gate to grants and federal aid.",
          "Apply for scholarships relentlessly, including small local ones with little competition.",
          "Keep applying every year, not just as a senior in high school.",
          "Take any work-study you're offered to cover living costs without borrowing.",
        ],
      },
      {
        type: "h2",
        text: "Choose the school for the real price, not the sticker",
      },
      {
        type: "p",
        text: "Where you go drives what you owe. An in-state public school, or starting at a community college and transferring up, can cut the cost of a degree dramatically — for the same credits and, in the end, the same diploma. A 'cheaper' school that gives you generous aid can beat a 'prestigious' one that hands you loans.",
      },
      {
        type: "tip",
        text: "Compare schools by their **net price** — what you'd actually pay after grants and scholarships — not the headline tuition. The expensive-looking school sometimes costs you less, and the cheap-looking one sometimes costs more. Run the real numbers.",
      },
      {
        type: "h2",
        text: "Borrow like it's a tool, not a faucet",
      },
      {
        type: "p",
        text: "When you do borrow, two rules carry most of the weight. First, exhaust federal loans before touching private ones — they bend when your life does. Second, never borrow the full amount offered just because it's there. Take only what covers the real gap; that leftover refund check is money you'll repay with interest for years.",
      },
      {
        type: "h2",
        text: "Finish faster and spend smarter",
      },
      {
        type: "p",
        text: "Time is one of the biggest hidden costs of college. Every extra semester is more tuition, more living costs, more borrowing. And the daily choices add up too — they're not small.",
      },
      {
        type: "steps",
        items: [
          "Take a full course load and map your degree so you graduate on time, or early.",
          "Knock out general requirements cheaply — community college, credit-by-exam, transferable courses.",
          "Buy used or rented textbooks, or borrow them from the library.",
          "Use the campus you're already paying for — health services, gym, events, free food.",
          "Live on a real budget so you don't borrow to cover everyday spending.",
        ],
      },
      {
        type: "key",
        text: "Minimizing debt isn't one heroic decision — it's a hundred ordinary ones. Free money first, the right school next, borrow as little as you can, and finish on time.",
      },
      {
        type: "p",
        text: "You won't get every call perfect, and you don't have to. A financial aid counselor or a college-access program can help you weigh these choices — for free — so you walk across that stage owing as little as possible, and step into the rest of your life lighter.",
      },
    ],
    related: ["community-college-path", "federal-vs-private-loans", "student-loans-before-you-sign"],
  },
];
