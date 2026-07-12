import type { Article } from "./types";

export const collegeExtraArticles: Article[] = [
  {
    slug: "federal-vs-private-loans",
    order: 40,
    topicId: "college",
    title: "Federal vs. Private Student Loans",
    dek: "Two loans can have the same dollar amount and be wildly different deals. Here's how to tell them apart.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Federal loans come with protections private loans don't.",
      "For almost everyone, federal loans should come first.",
      "A private loan can quietly cost far more over time.",
      "Use federal loans up to what you need before you look at private ones.",
    ],
    body: [
      {
        type: "p",
        text: "A loan is a loan, right? You borrow money, you pay it back. So it can feel like it shouldn't matter much *who* you borrow from. With student loans, it matters enormously: two loans for the exact same amount can turn into completely different futures. If no one in your family has borrowed for school before, this is the difference worth understanding first.",
      },
      {
        type: "h2",
        text: "What makes federal loans different",
      },
      {
        type: "p",
        text: "Federal student loans come from the government, and they carry built-in protections that private loans usually don't. Those protections are no small perks; they're what keeps a rough patch from becoming a disaster.",
      },
      {
        type: "list",
        items: [
          "**Fixed interest rates** set by law, so your rate can't suddenly jump on you.",
          "**[Income-driven repayment](/learn/government-aid/income-driven-repayment):** your monthly payment can be tied to what you earn.",
          "**Pauses when life hits:** options to postpone payments if you lose a job or hit hardship.",
          "**Possible [forgiveness](/learn/government-aid/student-loan-forgiveness)** through certain public-service or repayment programs.",
        ],
      },
      {
        type: "h2",
        text: "Where private loans come in",
      },
      {
        type: "p",
        text: "Private loans come from banks, credit unions, and online lenders. Some are fine. But the rate often depends on your credit (or a co-signer's), it can be variable, meaning it climbs over time, and you generally don't get the safety nets above. Miss payments and there's far less room to breathe.",
      },
      {
        type: "tip",
        text: "If a lender reaches out *first* with a slick offer, slow down. The better deal is the federal aid you go looking for through the FAFSA, not the loan that finds you in your inbox.",
      },
      {
        type: "h2",
        text: "The order that protects you",
      },
      {
        type: "p",
        text: "Use up free money first: grants and scholarships, which you never repay. Then federal loans, up to what you actually need. Only if there's still a real gap do you consider a private loan, and even then, borrow as little as you can.",
      },
      {
        type: "key",
        text: "Federal almost always goes first. Same borrowed dollars, but federal loans bend when your life does; private loans usually don't.",
      },
      {
        type: "p",
        text: "For the 2026–27 school year, federal Direct Loans for undergraduates carry a **6.52%** fixed interest rate, and a dependent student can borrow **$5,500** their first year, **$6,500** their second, and **$7,500** each year after, up to **$31,000** total. (Rates reset every July for new loans; a loan keeps the rate it started with.) One more layer worth knowing before you accept an offer: federal loans themselves come in two types, [subsidized and unsubsidized](/learn/college/subsidized-vs-unsubsidized), and the difference is real money.",
      },
    ],
    related: ["subsidized-vs-unsubsidized", "student-loans-before-you-sign", "grants-loans-scholarships"],
  },

  {
    slug: "subsidized-vs-unsubsidized",
    order: 50,
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
        text: "Your aid letter lists two kinds of federal loans, and the names are almost designed to make your eyes glaze over: *subsidized* and *unsubsidized*. But the difference between them is real money, sometimes hundreds or thousands of dollars by the time you graduate.",
      },
      {
        type: "h2",
        text: "What 'subsidized' means",
      },
      {
        type: "p",
        text: "With a subsidized loan, the government pays your interest while you're in school at least half-time, and during certain grace and pause periods. So a $5,000 subsidized loan is still right around $5,000 when you graduate. Your debt isn't quietly growing while you're sitting in class.",
      },
      {
        type: "h2",
        text: "What 'unsubsidized' means",
      },
      {
        type: "p",
        text: "With an unsubsidized loan, interest starts adding up the day the money hits your account and keeps going the entire time, including all four (or more) years you're in school. If you don't pay that interest as it builds, it gets added to your balance, and then you start paying interest *on the interest*. That's how a loan grows while you're not looking.",
      },
      {
        type: "tip",
        text: "On an unsubsidized loan, even tiny payments while you're still in school help. Putting $25 a month toward the interest keeps it from piling onto your balance, and that's money you'd otherwise pay interest on for years.",
      },
      {
        type: "h2",
        text: "Which one you'll be offered",
      },
      {
        type: "p",
        text: "Subsidized loans are need-based, so they go to students whose financial picture shows the need. That's one more reason [filling out the FAFSA carefully](/learn/college/fafsa-step-by-step) matters. Unsubsidized loans are available more broadly. If you're offered both, take the subsidized one first; it's simply the better deal.",
      },
      {
        type: "key",
        text: "Subsidized = the government covers interest while you're in school. Unsubsidized = it doesn't, and the clock is already running. Same loan amount, different cost.",
      },
      {
        type: "p",
        text: "There are caps. A dependent undergraduate can borrow **$5,500** the first year, **$6,500** the second, and **$7,500** each year after, but only part of each can be *subsidized* (**$3,500**, then **$4,500**, then **$5,500**), with the rest unsubsidized. If your aid letter is hard to read, your financial aid office will tell you which of your loans is which. And before you accept anything, [Student Loans, Before You Sign](/learn/college/student-loans-before-you-sign) has the checklist.",
      },
    ],
    related: ["federal-vs-private-loans", "student-loans-before-you-sign", "reading-aid-award-letter"],
    quiz: [
      {
        question: "What does \"subsidized\" mean on a federal student loan?",
        options: [
          "The loan has a lower interest rate than other loans",
          "The government pays the interest while you're in school",
          "You don't have to repay it if you graduate",
        ],
        answer: 1,
        explain:
          "With a subsidized loan, the government covers your interest while you're in school at least half-time, so a $5,000 loan is still about $5,000 when you graduate.",
      },
      {
        question: "On an unsubsidized loan, when does interest start building?",
        options: [
          "After you graduate",
          "After your grace period ends",
          "The day the money hits your account",
        ],
        answer: 2,
        explain:
          "Interest runs the entire time you're in school, and if you don't pay it as it builds, it gets added to your balance and you start paying interest on the interest.",
      },
      {
        question: "Your aid letter offers both a subsidized and an unsubsidized loan. Which should you take first?",
        options: [
          "The unsubsidized one, since it's available to more students",
          "It doesn't matter; they cost the same in the end",
          "The subsidized one; it's simply the better deal",
        ],
        answer: 2,
        explain:
          "Same loan amount, different cost. Because the government covers a subsidized loan's interest during school, it should always be the first one you accept.",
      },
    ],
  },

  {
    slug: "work-study-explained",
    order: 50,
    topicId: "college",
    title: "Work-Study, Explained",
    dek: "It's a campus job built around your class schedule, and the money is part of your financial aid.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Work-study is a need-based, part-time job tied to your aid.",
      "The schedule is built to fit around your classes.",
      "Your earnings are yours, usually as a regular paycheck.",
      "The award is a limit, not a guarantee; you earn it by working.",
    ],
    body: [
      {
        type: "p",
        text: "You see 'Federal Work-Study' on your aid letter, maybe with a dollar amount next to it, and it's not obvious what you're supposed to do with that. Is it free money? A loan? Something you sign? The short answer: it's a job offer.",
      },
      {
        type: "h2",
        text: "What work-study really is",
      },
      {
        type: "p",
        text: "Work-study is a part-time job, usually right on campus, that's part of your financial aid package. It's need-based, which is another reason [the FAFSA](/learn/college/fafsa-step-by-step) matters. The dollar figure on your letter is the *most* you can earn through the program, not cash handed to you, and you get there by actually working and collecting a paycheck, just like any job.",
      },
      {
        type: "h2",
        text: "Why it's better than a random job",
      },
      {
        type: "list",
        items: [
          "**Built around class.** Work-study jobs are made for students, so supervisors expect your schedule to come first.",
          "**Often on campus.** Less commuting and less time lost; sometimes you're working steps from your next class.",
          "**Resume-friendly.** Many roles sit in offices, labs, or libraries, which can connect to what you're studying.",
          "**Aid-aware.** In many cases these earnings are treated more kindly when you fill out next year's FAFSA.",
        ],
      },
      {
        type: "tip",
        text: "Work-study funds can run out, and good positions fill early. The moment you know it's part of your package, ask the financial aid or student employment office how to find and claim a spot. Don't wait until the semester starts.",
      },
      {
        type: "h2",
        text: "How you get paid",
      },
      {
        type: "p",
        text: "You usually get a regular paycheck for the hours you work, and the money is yours to use for books, transit, food, whatever you need. Some programs let you direct earnings toward tuition, but often it lands in your hands to cover the everyday costs that quietly add up.",
      },
      {
        type: "key",
        text: "Work-study is a job, not a gift, but it's a job designed to fit a student's life. If it's offered to you, it's usually worth claiming.",
      },
    ],
    related: ["grants-loans-scholarships", "reading-aid-award-letter", "fafsa-step-by-step"],
  },

  {
    slug: "community-college-path",
    order: 60,
    topicId: "college",
    title: "The Community College Path",
    dek: "Two years at a community college, then transfer up: a route that can cut the cost of a degree dramatically.",
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
        text: "There's a quiet myth that community college is the lesser option, a backup rather than a real path. Forget that. For a lot of smart, ambitious people, starting at a community college and transferring up is one of the most financially intelligent moves available.",
      },
      {
        type: "h2",
        text: "Why it costs so much less",
      },
      {
        type: "p",
        text: "Community college tuition is typically a small fraction of what a four-year school charges. The first two years of almost any degree are general courses (English, math, intro sciences), and you can take those for far less. Same foundational classes, dramatically smaller bill.",
      },
      {
        type: "p",
        text: "Picture a degree where the first two years cost a few thousand dollars instead of tens of thousands. That gap is money you don't have to borrow, and debt you never have to repay.",
      },
      {
        type: "h2",
        text: "How transferring up works",
      },
      {
        type: "p",
        text: "After your first two years, you transfer to a four-year college to finish your bachelor's degree. The credits you earned come with you, so you pick up where you left off. The part that surprises people: your final diploma comes from the four-year school where you *graduate*, not the community college where you started.",
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
          "Keep your grades up; transfer admission and scholarships often hinge on them.",
        ],
      },
      {
        type: "key",
        text: "Starting at community college isn't a smaller dream. It can be the same degree for a fraction of the cost, as long as you plan the transfer from day one.",
      },
      {
        type: "p",
        text: "A transfer advisor at either school can map this out with you for free. Lean on them. And when you choose the four-year school, [in-state tuition](/learn/college/in-state-vs-out-of-state) usually keeps the second half of the degree affordable too.",
      },
    ],
    related: ["in-state-vs-out-of-state", "minimizing-college-debt", "grants-loans-scholarships"],
  },

  {
    slug: "in-state-vs-out-of-state",
    order: 70,
    topicId: "college",
    title: "In-State vs. Out-of-State Tuition",
    dek: "The same public university can charge you two very different prices, depending on where the state says you live.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Public colleges charge residents far less than non-residents.",
      "Residency rules are set by each state and vary a lot.",
      "The price difference can be tens of thousands of dollars.",
      "Sometimes you can establish residency, but plan ahead.",
    ],
    body: [
      {
        type: "p",
        text: "Two students sit in the same lecture hall, take the same class, earn the same degree, and one of them paid two or three times more in tuition. The only difference is which state each one calls home. At public colleges, where you live can change the price tag more than almost anything else.",
      },
      {
        type: "h2",
        text: "Why residents pay less",
      },
      {
        type: "p",
        text: "Public colleges are funded partly by the taxpayers of their state, so those states give their own residents a steep discount. That's in-state tuition. Students from elsewhere pay the full, unsubsidized rate, which is out-of-state tuition. The difference is often tens of thousands of dollars over a degree.",
      },
      {
        type: "h2",
        text: "How residency actually works",
      },
      {
        type: "p",
        text: "Every state writes its own residency rules, and they vary a lot. Generally they look at things like how long you've lived there, where you pay taxes, your driver's license, and whether you're financially independent or claimed by a parent. Simply moving to a state to attend college usually does *not* make you a resident for tuition purposes.",
      },
      {
        type: "tip",
        text: "The rules have real exceptions, for military families, certain regional agreements, and some states' policies for local high school graduates. So never assume. Check the specific residency rules for the exact schools you're considering, in writing.",
      },
      {
        type: "h2",
        text: "Ways the price gap shrinks",
      },
      {
        type: "list",
        items: [
          "**Your own state's schools** are the default low-cost option. Start there.",
          "**Regional tuition agreements** let students in neighboring states pay reduced rates at some schools.",
          "**Establishing residency** is possible in some states if you plan well ahead and meet every requirement.",
          "**Out-of-state scholarships** sometimes close the gap for strong applicants. Ask the school directly.",
        ],
      },
      {
        type: "key",
        text: "At a public college, residency can be the single biggest factor in your bill. Before you fall for an out-of-state school, find out what it actually costs *you*, not the sticker price.",
      },
      {
        type: "p",
        text: "Residency rules are dense, and getting them wrong is expensive. The admissions or financial aid office can tell you exactly where you'd stand and whether any path to in-state rates exists. And if the out-of-state math doesn't work, [the community college path](/learn/college/community-college-path) is another way to keep the total down.",
      },
    ],
    related: ["community-college-path", "minimizing-college-debt", "understanding-unmet-need"],
  },

  {
    slug: "appealing-financial-aid",
    order: 30,
    topicId: "college",
    title: "How to Appeal Your Financial Aid",
    dek: "If your aid offer doesn't match your real situation, you can ask for more. A good letter often works.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Your first aid offer is not always the final word.",
      "An appeal is a polite, documented request, not a complaint.",
      "Changed circumstances and special expenses are strong reasons.",
      "The worst they say is no, and you're no worse off for asking.",
    ],
    body: [
      {
        type: "p",
        text: "Your financial aid letter arrives, [the gap between aid and cost](/learn/college/understanding-unmet-need) is bigger than you can cover, and it feels final. It usually isn't. Especially for first-generation students with no one to coach them, the first offer reads like a verdict when it's often a starting point. You can appeal, and a clear, honest letter can genuinely get you more money.",
      },
      {
        type: "h2",
        text: "When an appeal makes sense",
      },
      {
        type: "p",
        text: "An appeal tells the school something the FAFSA didn't capture, usually a real change or an expense the standard formula missed, rather than arguing they got it wrong. Strong reasons include:",
      },
      {
        type: "list",
        items: [
          "**A drop in income:** a parent lost a job or had hours cut since you filed.",
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
        text: "Keep it respectful, specific, and short. You're not demanding; you're explaining. Name the school's exact term for it (often a 'special circumstances' or 'professional judgment' review) and address it to the financial aid office.",
      },
      {
        type: "steps",
        items: [
          "Open by thanking them and saying you hope to attend, so your interest is clear.",
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
        text: "Asking for more aid is normal, expected, and free. The worst outcome is the same answer you already have, so the only real mistake is not asking.",
      },
      {
        type: "p",
        text: "If writing the letter feels intimidating, a college access program or a counselor can help you draft it for free. You don't have to know magic words. You have to tell the truth, clearly, with proof.",
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
    readMinutes: 5,
    takeaways: [
      "Most FAFSA mistakes are simple and completely avoidable.",
      "Leaving it blank when unsure is worse than asking for help.",
      "Submitting early often means more available aid.",
      "Double-check names, numbers, and who counts as a parent.",
    ],
    body: [
      {
        type: "p",
        text: "The FAFSA is the form that unlocks most financial aid: grants, federal loans, work-study, even a lot of scholarships. Which means a small slip on it doesn't just cause a typo. It can cost you real money. Almost every common mistake is easy to dodge once someone points it out. (If you haven't filed yet, [FAFSA, Step by Step](/learn/college/fafsa-step-by-step) walks through the form itself; this article is about what trips people up.)",
      },
      {
        type: "h2",
        text: "The mistakes that cost you money",
      },
      {
        type: "list",
        items: [
          "**Filing late or not at all.** Some aid is first-come, first-served; when the money's gone, it's gone. File as soon as you can after the form opens, and check your state and school deadlines, many of which land far earlier than the federal cutoff.",
          "**Leaving fields blank.** A blank can read as 'unanswered' and stall everything. If an amount is zero, write 0.",
          "**Mismatched info.** A name or Social Security number that doesn't match official records can freeze your whole application.",
          "**Listing the wrong parent.** Whose information counts depends on specific rules, especially with divorce or separation. Get this one right.",
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
        text: "Don't guess on a question you don't understand; guessing wrong can cost you aid. Free help exists: your school counselor, the financial aid office, and college-access nonprofits walk students through the FAFSA every single year, no charge.",
      },
      {
        type: "h2",
        text: "A quick check before you submit",
      },
      {
        type: "steps",
        items: [
          "Confirm names and Social Security numbers match official documents exactly.",
          "Make sure no required field is blank; use 0 where the answer is zero.",
          "Double-check you reported the correct parent's information.",
          "List every school you're considering, even the maybes.",
          "Submit, then save your confirmation and watch for follow-up requests.",
        ],
      },
      {
        type: "key",
        text: "The FAFSA isn't a test you can fail. It's a form you want to get right: slow down, ask for free help when you're stuck, and file early.",
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
    readMinutes: 6,
    takeaways: [
      "Free money and smart school choices beat borrowing every time.",
      "Borrow only what you truly need, never the full offer.",
      "Cutting time-to-degree is one of the biggest savings of all.",
      "Small habits across four years add up to far less debt.",
    ],
    body: [
      {
        type: "p",
        text: "You can absolutely get a degree. The real question, the one that shapes your twenties, is how much debt you carry out the other side. Two people can earn the same diploma and graduate worlds apart: one owing very little, one buried. The difference is rarely luck. It's a stack of deliberate choices made over four years.",
      },
      {
        type: "h2",
        text: "Pile up the money you never repay",
      },
      {
        type: "p",
        text: "Every free dollar is a dollar you don't borrow and don't pay interest on later, so this comes first, always. Each piece has its own guide; the strategy itself is short.",
      },
      {
        type: "list",
        items: [
          "File the FAFSA early and carefully, every year you're in school, not just the first.",
          "Apply for scholarships relentlessly. [Small local awards](/learn/college/finding-scholarships) have the best odds, and they stack.",
          "Take any [work-study](/learn/college/work-study-explained) you're offered, so living costs don't quietly turn into loans.",
        ],
      },
      {
        type: "h2",
        text: "Choose the school for the real price, not the sticker",
      },
      {
        type: "p",
        text: "Where you go drives what you owe. An in-state public school, or [starting at a community college](/learn/college/community-college-path) and transferring up, can cut the cost of a degree dramatically, for the same credits and, in the end, the same diploma. A 'cheaper' school that gives you generous aid can beat a 'prestigious' one that hands you loans.",
      },
      {
        type: "tip",
        text: "Compare schools by their **net price**, meaning what you'd actually pay after grants and scholarships, not the headline tuition. The expensive-looking school sometimes costs you less, and the cheap-looking one sometimes costs more. Run the real numbers.",
      },
      {
        type: "h2",
        text: "Borrow like it's a tool, not a faucet",
      },
      {
        type: "p",
        text: "When you do borrow, two rules carry most of the weight. First, exhaust [federal loans before touching private ones](/learn/college/federal-vs-private-loans); they bend when your life does. Second, never borrow the full amount offered just because it's there. Take only what covers the real gap. That leftover refund check is money you'll repay with interest for years.",
      },
      {
        type: "h2",
        text: "Finish faster and spend smarter",
      },
      {
        type: "p",
        text: "Time is one of the biggest hidden costs of college. Every extra semester is more tuition, more living costs, more borrowing. The daily choices add up too.",
      },
      {
        type: "steps",
        items: [
          "Take a full course load and map your degree so you graduate on time, or early.",
          "Knock out general requirements cheaply: community college, credit-by-exam, transferable courses.",
          "Buy used or rented textbooks, or borrow them from the library.",
          "Use the campus you're already paying for: health services, gym, events, free food.",
          "Live on a real budget so you don't borrow to cover everyday spending.",
        ],
      },
      {
        type: "key",
        text: "Minimizing debt isn't one heroic decision. It's a hundred ordinary ones: free money first, the right school next, borrow as little as you can, and finish on time.",
      },
      {
        type: "p",
        text: "You won't get every call perfect, and you don't have to. A financial aid counselor or a college-access program can help you weigh these choices, for free, so you walk across that stage owing as little as possible.",
      },
    ],
    related: ["community-college-path", "federal-vs-private-loans", "student-loans-before-you-sign"],
  },

  {
    slug: "repaying-student-loans",
    order: 30,
    topicId: "college",
    title: "Repaying Your Student Loans (the Part After Graduation)",
    dek: "You borrowed for school, and the bill is coming. Here's what to do before it does.",
    level: "Advanced",
    readMinutes: 5,
    takeaways: [
      "Find your loan servicer and see every federal loan in one place at StudentAid.gov.",
      "Your grace period ends sooner than you think, so learn your first payment date now.",
      "If the standard payment doesn't fit your income, other plans exist.",
      "Never ignore the loans. There are real options long before default.",
    ],
    body: [
      {
        type: "p",
        text: "Signing for student loans and *repaying* them feel like two completely different worlds. When you borrowed, school was the goal and the bill felt far away. Now you've graduated (or left), and that bill is suddenly real. Nobody hands you a clear instruction sheet for this part, so here it is, in plain language.",
      },
      {
        type: "h2",
        text: "First, find out who you actually owe",
      },
      {
        type: "p",
        text: "You don't pay the government directly, and this trips up almost everyone. Your federal loans are handled by a company called a *servicer*: they send the bills, take your payments, and answer your questions. You might have more than one loan, and you might not even remember signing for all of them.",
      },
      {
        type: "p",
        text: "So before anything else, go to **StudentAid.gov** and log in. That's the official government site, and it shows you every federal student loan you have in one place: the balances, the interest rates, and who your servicer is. This is your home base for the whole repayment journey. Bookmark it.",
      },
      {
        type: "tip",
        text: "StudentAid.gov is free and official; it ends in *.gov*. If a company calls or texts offering to 'help' with your loans for a fee, be careful. The real help is free, and it lives at StudentAid.gov.",
      },
      {
        type: "h2",
        text: "Know your grace period",
      },
      {
        type: "p",
        text: "Federal loans usually give you a *grace period*: a stretch of time, often a few months after you graduate, leave school, or drop below part-time, before your first payment is due. It's a real gift, but it's also where people get caught off guard. The months pass, life is busy, and then a bill shows up that you weren't ready for.",
      },
      {
        type: "p",
        text: "Don't let that happen. Check StudentAid.gov or ask your servicer for your exact first-payment date, and put it on your calendar now. Knowing the date turns a stressful surprise into something you've already planned for.",
      },
      {
        type: "h2",
        text: "Pick a plan you can afford",
      },
      {
        type: "p",
        text: "When repayment starts, you'll usually land on the *standard plan* by default: a fixed monthly payment that clears the loan over a set number of years. It's predictable, and if you can comfortably afford it, it gets you done faster.",
      },
      {
        type: "p",
        text: "If that payment is more than your paycheck can handle, you don't have to white-knuckle it. [Income-driven repayment](/learn/government-aid/income-driven-repayment) can tie your monthly bill to what you earn and your family size, and certain jobs can qualify you for [loan forgiveness programs](/learn/government-aid/student-loan-forgiveness) down the road. Both have their own guides; what matters here is knowing they exist before you decide you can't afford your loans.",
      },
      {
        type: "h2",
        text: "Set up autopay",
      },
      {
        type: "p",
        text: "Once you know your plan, set up automatic payments through your servicer. Two reasons this is almost always worth it:",
      },
      {
        type: "list",
        items: [
          "**You'll never miss a payment by accident.** It comes out on schedule, so a busy month or a forgotten due date can't hurt your credit.",
          "**You often get a small interest discount** just for enrolling in autopay.",
        ],
      },
      {
        type: "h2",
        text: "The one rule: don't go silent",
      },
      {
        type: "p",
        text: "If money gets tight, the worst possible move is to stop opening the mail and hope it goes away. Unpaid federal loans eventually fall into *default*, and the consequences are serious: damaged credit, the full balance coming due, and in some cases money taken straight from your paycheck or tax refund.",
      },
      {
        type: "p",
        text: "There are options long before it ever gets there. If you're struggling, contact your servicer and ask about a lower payment through income-driven repayment, or about *deferment* and *forbearance*, which pause or reduce payments temporarily during a rough stretch.",
      },
      {
        type: "key",
        text: "Falling behind isn't the disaster; staying silent is. The moment payments feel impossible, reach out to your servicer or go to StudentAid.gov. Help exists, but only if you ask before it's a crisis.",
      },
    ],
    related: ["income-driven-repayment", "student-loan-forgiveness", "graduation-money-checklist"],
  },

  {
    slug: "graduation-money-checklist",
    order: 70,
    topicId: "college",
    title: "Graduating? Your Money Checklist",
    dek: "Between the ceremony and your first paycheck, a handful of small money tasks set up the next several years.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Your student-loan grace period is about six months, and it starts at graduation.",
      "Your W-4 and your 401(k) match are first-week job tasks, not someday tasks.",
      "Moving out costs more up front than the rent number suggests.",
      "You can stay on a parent's health plan until you turn 26, but plan the handoff.",
    ],
    body: [
      {
        type: "p",
        text: "Graduation compresses a strange amount of financial life into a few months: student loans wake up, a first real paycheck arrives, maybe a move to a new city, and a stack of benefits paperwork nobody explained in class. None of it is hard on its own. The trouble is that it all lands at once, while you're busy with everything else. This is the short list of what to handle, roughly in the order the deadlines arrive.",
      },
      {
        type: "h2",
        text: "The grace-period clock is already running",
      },
      {
        type: "p",
        text: "Federal student loans give you a grace period of about six months after you graduate (or drop below half-time) before the first payment is due. Graduate in May and the bill lands around November. That window is not a vacation from the loans; it's your setup time. Use it to log into StudentAid.gov, find your servicer, and pick a repayment plan you can actually afford. [Repaying Your Student Loans](/learn/college/repaying-student-loans) walks through every step, and doing it in month one beats scrambling in month six.",
      },
      {
        type: "h2",
        text: "First job: two pieces of paperwork that matter",
      },
      {
        type: "p",
        text: "In the flood of first-week onboarding forms, two deserve real attention. The first is your W-4, which controls how much tax comes out of each paycheck. Fill it out carelessly and you'll either hand the government an interest-free loan all year or get a surprise bill in April; [How to Fill Out a W-4](/learn/taxes/how-to-fill-out-w4) shows you how to get it right in a few minutes.",
      },
      {
        type: "p",
        text: "The second is your retirement plan enrollment. If your employer offers a 401(k) match, contribute at least enough to get all of it, starting with your first paycheck. The match is part of your pay, and skipping it is working for less than you were offered. Waiting until you 'feel settled' is the most common mistake new grads make with it, because the first years of contributions are the ones with the most decades to grow. [What Is a 401(k)?](/learn/investing/what-is-a-401k) covers how the whole thing works.",
      },
      {
        type: "h2",
        text: "Budget the move like a skeptic",
      },
      {
        type: "p",
        text: "If the new job means a new city, price the move honestly before you commit to an apartment. The first month typically stacks a security deposit, first month's rent (sometimes last month's too), any application and broker fees, the truck or movers, and the unglamorous haul of things a first apartment needs, from a mattress to a shower curtain. Depending on the city, that pile can easily run a few thousand dollars before your first paycheck arrives. If the math is tight, negotiating a later start date, a signing bonus, or relocation help is a normal ask, and so is a cheaper first apartment than the one you can technically afford.",
      },
      {
        type: "h2",
        text: "Health insurance and the age-26 rule",
      },
      {
        type: "p",
        text: "Under federal law you can stay on a parent's health plan until you turn 26, even after you graduate, move out, or start a job. That's often the simplest bridge. When your employer offers its own coverage, compare the two: the employer plan is frequently cheaper once you count what your parent pays to keep you on theirs. And mark your 26th birthday, because aging off a parent's plan is a qualifying event that opens a limited special-enrollment window. Miss it and you can be stuck uninsured until the next open enrollment. If premiums, deductibles, and networks are still fuzzy concepts, [Health Insurance, Explained](/learn/insurance/health-insurance-explained) is the primer.",
      },
      {
        type: "h2",
        text: "The checklist",
      },
      {
        type: "steps",
        items: [
          "Log into StudentAid.gov, find your servicer and your first payment date, and pick a repayment plan.",
          "Fill out your W-4 deliberately, not on autopilot.",
          "Enroll in the 401(k) at least up to the full match, from paycheck one.",
          "Price the move (deposit, first month, fees, furniture) before signing a lease.",
          "Decide your health-insurance path, and calendar your 26th birthday if you're on a parent's plan.",
          "Set up a small automatic transfer to savings so an emergency fund starts growing with your first paycheck.",
        ],
      },
      {
        type: "p",
        text: "An afternoon spent on this list in the month after graduation quietly pays for itself for years: no missed first loan payment, no April tax surprise, no decade of forfeited 401(k) match. Then get back to celebrating; you earned that part.",
      },
    ],
    related: ["repaying-student-loans", "how-to-fill-out-w4", "what-is-a-401k"],
  },

  {
    slug: "college-money-roadmap",
    order: 5,
    topicId: "college",
    title: "College Money, Start to Finish",
    dek: "One map of the whole arc: the forms before you enroll, the moves that keep debt down each year, and the plan for paying it back.",
    level: "Intermediate",
    readMinutes: 3,
    takeaways: [
      "College money runs in four phases: before, every year, final year, and after.",
      "Do the pre-enrollment steps in order: FAFSA, award letters, comparison, then loans.",
      "The FAFSA renews every year you're enrolled; missing it can cost a year of aid.",
      "After graduation, choose a repayment plan on purpose instead of taking the default.",
    ],
    body: [
      {
        type: "p",
        text: "College money decisions cluster at four moments: before you commit to a school, every year you're enrolled, the last stretch before graduation, and the repayment years after. Each moment has its own guides on this site. This page puts them in order so you always know which phase you're in and which guide comes next. None of it assumes family money, a college fund, or a parent who has done this before; the map works the same whether you're the first in your family to go or the fifth.",
      },
      {
        type: "h2",
        text: "Before you commit to a school",
      },
      {
        type: "p",
        text: "Everything in this phase happens before you sign anything, and the order matters because each step feeds the next. If you're still fuzzy on which aid is free money and which is borrowed, [Grants vs. Loans vs. Scholarships](/learn/college/grants-loans-scholarships) is the two-minute primer.",
      },
      {
        type: "steps",
        items: [
          "**File the FAFSA.** It's the single form behind grants, federal loans, and work-study, and filing early matters because some aid runs out. [FAFSA, Step by Step](/learn/college/fafsa-step-by-step) walks the whole form.",
          "**Decode each award letter.** Schools mix grants and loans together in ways that make expensive offers look generous. [Reading a Financial Aid Award Letter](/learn/college/reading-aid-award-letter) shows how to find the real price.",
          "**Put your offers side by side.** The [Compare Aid Offers tool](/tools/college/compare-offers) takes two award letters and shows the true net price of each.",
          "**Pause before signing any loan.** Ten minutes here can shape ten years. [Student Loans, Before You Sign](/learn/college/student-loans-before-you-sign) is the checklist.",
        ],
      },
      {
        type: "h2",
        text: "Every year you're enrolled",
      },
      {
        type: "p",
        text: "The FAFSA is not one-and-done. It renews every single year you're in school, and a missed renewal can cost a year of aid. [Common FAFSA Mistakes That Cost You Aid](/learn/college/fafsa-mistakes) covers renewal slip-ups along with the rest. While you're enrolled, three other things deserve an annual look:",
      },
      {
        type: "list",
        items: [
          "**Work-study**, if it's in your package, works differently from a normal job. [Work-Study, Explained](/learn/college/work-study-explained) covers how to claim and use it.",
          "**Borrowing less while you're there** beats any repayment strategy later. [Getting Through College With as Little Debt as Possible](/learn/college/minimizing-college-debt) is the playbook.",
          "**Scholarships aren't only for high-school seniors.** Plenty target current students, so [Finding Scholarships You'll Actually Win](/learn/college/finding-scholarships) is worth a pass every year.",
        ],
      },
      {
        type: "h2",
        text: "Your final year",
      },
      {
        type: "p",
        text: "Graduation compresses a lot of money tasks into a few months: loans waking up, a first real paycheck, a stack of benefits paperwork. [Graduating? Your Money Checklist](/learn/college/graduation-money-checklist) is the one page to work through before and right after the ceremony.",
      },
      {
        type: "h2",
        text: "After graduation",
      },
      {
        type: "steps",
        items: [
          "**Set up repayment during your grace period**, not after it ends. [Repaying Your Student Loans](/learn/college/repaying-student-loans) covers finding your servicer and picking a plan.",
          "**If the standard payment doesn't fit your income**, you don't have to white-knuckle it. [Income-Driven Student Loan Repayment](/learn/government-aid/income-driven-repayment) explains the plans that scale the bill to what you earn.",
        ],
      },
      {
        type: "key",
        text: "One caution that applies to every phase: you never have to pay anyone to file the FAFSA, find scholarships, or \"fix\" your student loans. Anyone charging for those is selling you something the government and your school give away free.",
      },
      {
        type: "p",
        text: "You won't need every guide at once. Find the phase you're in, read the one or two guides it points to, and come back when the next phase starts.",
      },
    ],
    related: ["fafsa-step-by-step", "reading-aid-award-letter", "graduation-money-checklist"],
  },
  {
    slug: "taking-a-break-from-college",
    topicId: "college",
    title: "Taking a Break From College: The Money Checklist",
    dek: "Stopping out is common and nothing to be ashamed of. But the money side has tripwires, and they start the day you drop below half-time.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Dropping below half-time starts your student loans' 6-month grace period.",
      "Withdrawing mid-semester can force your school to return aid and bill you for it.",
      "An official leave of absence protects you in ways just walking away doesn't.",
      "A break survived with a plan is a comma, not a period.",
    ],
    body: [
      {
        type: "p",
        text: "Maybe money ran out, maybe family needs you, maybe the major stopped making sense. Whatever the reason, plenty of students step away from college for a while, and many come back and finish. The mistake isn't taking a break. The mistake is leaving without doing the twenty minutes of money homework first, because several clocks start ticking the moment you stop being a student.",
      },
      {
        type: "h2",
        text: "Clock 1: your loan grace period starts",
      },
      {
        type: "p",
        text: "Federal student loans give you a 6-month grace period before payments start, and it begins when you graduate, leave, OR drop below half-time enrollment. A 'break' and 'dropping out' look identical to your loan servicer. One protection worth knowing: re-enroll at least half-time before the 6 months run out, and you keep your full grace period for later. If you don't, payments begin, and [repaying your student loans](/learn/college/repaying-student-loans) becomes your next read. If payments would be impossible, [income-driven repayment](/learn/government-aid/income-driven-repayment) can take them as low as $0 while your income is low.",
      },
      {
        type: "key",
        text: "Before you leave, log into StudentAid.gov, see exactly what you owe and who your servicer is, and put the grace-period end date in your phone. The students who get hurt are the ones who find out by missing a payment they never knew existed.",
      },
      {
        type: "h2",
        text: "Clock 2: the aid you already received this term",
      },
      {
        type: "p",
        text: "Financial aid is 'earned' day by day through the semester. Withdraw before about the 60% mark of the term, and federal rules make the school send back the unearned share of your aid. The school then often bills YOU for the tuition that aid was covering. This is the infamous surprise bill, and it's why the timing of your exit matters: finishing the current term, or at least passing the 60% point, can be worth thousands. Ask the financial aid office to run the 'return of aid' math for your exact date before you decide anything.",
      },
      {
        type: "h2",
        text: "Do it officially or it costs you",
      },
      {
        type: "steps",
        items: [
          "Talk to the financial aid office BEFORE you stop attending. Ghosting your classes can mean failing grades, which damage the academic-progress standing your future aid depends on.",
          "Ask about an official leave of absence. An approved leave (up to 180 days) can keep your loans in in-school status and holds your spot.",
          "Get the withdrawal or leave in writing, with the effective date.",
          "Complete exit counseling if it's required. It's a short online module, and skipping it doesn't skip the loans.",
          "Before you go, ask the registrar whether any unpaid balance would hold your transcript, and settle or set up a payment plan if so. Rules on transcript holds have loosened in many states, but don't assume.",
        ],
      },
      {
        type: "h2",
        text: "What a break does NOT cost you",
      },
      {
        type: "list",
        items: [
          "Your Pell Grant eligibility doesn't burn while you're away. The lifetime limit (about six years' worth) only counts terms you actually received it.",
          "Your credits generally keep. If you return elsewhere, the [community college path](/learn/college/community-college-path) is often the cheapest bridge back to a four-year degree.",
          "Your FAFSA isn't ruined. File it again for the year you return, like [the step-by-step guide](/learn/college/fafsa-step-by-step) shows. Aid offices see returning students constantly.",
        ],
      },
      {
        type: "h2",
        text: "Make the break a plan, not a drift",
      },
      {
        type: "p",
        text: "Give the break a shape: a return term written down, a savings target while you work ([even a small cushion](/learn/investing/high-yield-savings-account) changes your options), and one conversation with an advisor about what re-entry takes. Students who leave with a date come back at far higher rates than students who leave with a shrug. Your degree can wait a year. It just shouldn't have to wait on a bill you didn't see coming.",
      },
      {
        type: "tip",
        text: "If the reason you're leaving is money, appeal first. Schools can adjust aid mid-year when circumstances change, and [how to appeal your financial aid](/learn/college/appealing-financial-aid) takes an afternoon. The break you're planning might not be necessary.",
      },
    ],
    related: ["repaying-student-loans", "community-college-path", "appealing-financial-aid"],
  },
];
