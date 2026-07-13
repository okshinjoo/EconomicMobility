import type { Article } from "./types";

export const collegeExtraArticles: Article[] = [
  {
    slug: "schools-with-generous-aid",
    order: 28,
    topicId: "college",
    title: "Some Schools Just Pay Better: How to Find Them",
    dek: "Aid generosity varies more between schools than almost anything else about them. Build your list around the ones that actually pay.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Two schools that would both admit you can differ by $20,000 a year in what you'd pay.",
      "Every college is required to post a net price calculator; it's the most underused tool in admissions.",
      "Average net price by income bracket tells you more than any ranking.",
      "Apply to a list built around generosity and you graduate with choices instead of regrets.",
    ],
    body: [
      {
        type: "p",
        text: "Families compare schools on rankings, campus tours, and dining halls, then treat the aid offer as weather: whatever arrives, arrives. Flip that. Generosity is measurable before you apply anywhere, and the spread is enormous. The same student, same grades, same FAFSA, can owe wildly different amounts at schools of similar quality, purely because of how each one funds aid.",
      },
      {
        type: "h2",
        text: "Why some schools pay better",
      },
      {
        type: "p",
        text: "Aid money comes from somewhere: endowment earnings, state funding, tuition revenue shuffled into discounts. Schools with big endowments per student can afford grant-heavy packages and promises like meeting [full need](/learn/college/need-blind-colleges). Schools without that cushion lean on loans and gapping, admitting you with a package that quietly doesn't cover the [gap](/learn/college/understanding-unmet-need). Neither is villainy; it's budget math. Your job is knowing which kind of school you're applying to before you fall in love.",
      },
      {
        type: "h2",
        text: "The fifteen-minute check, per school",
      },
      {
        type: "steps",
        items: [
          "Run the school's **net price calculator** with honest family numbers. Every college is required to have one; search the school name plus \"net price calculator.\" The estimate is the closest thing to an early award letter you'll get.",
          "Look up the school's **average net price by income bracket** on the federal College Scorecard site (collegescorecard.ed.gov). The number for YOUR bracket is the real sticker.",
          "Find the aid page's own claims: what share of need do they meet, and do packages lean grants or loans?",
          "Note whether merit scholarships exist and what earns them; at many schools, strong-but-not-top applicants collect merit money a reach school would never offer.",
        ],
      },
      {
        type: "h2",
        text: "Building the list around money",
      },
      {
        type: "p",
        text: "A money-smart application list usually has three layers: a generous reach or two (the meets-full-need tier, where getting in solves the money), a core of schools whose calculators produced numbers your family can survive, and an in-state option whose price you've verified rather than assumed. What it shouldn't include: any school whose calculator output was a fantasy for your family, unless you'd genuinely accept the debt.",
      },
      {
        type: "tip",
        text: "Calculators assume simple finances. Divorced parents, a small business, or unusual income can throw estimates off, at exactly the schools that ask for the [CSS Profile](/learn/college/css-profile-explained). Treat those estimates as rough and email the aid office your questions; how they answer tells you plenty.",
      },
      {
        type: "key",
        text: "You can't negotiate your way out of applying to the wrong schools. Generosity is public information; use it while your list is still a draft.",
      },
    ],
    related: ["need-blind-colleges", "private-vs-public-aid", "reading-aid-award-letter"],
  },
  {
    slug: "private-vs-public-aid",
    order: 29,
    topicId: "college",
    title: "Private vs. Public: Who Actually Charges You Less?",
    dek: "The $85,000 private college and the $30,000 state school are both lying to you a little. Sticker price is where the story starts, not ends.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Publics run on state subsidy and low-ish stickers; privates run on high stickers with steep discounts.",
      "For low-income students, a wealthy private school is often the cheapest option on the list.",
      "For middle incomes and thin-endowment privates, the public flagship usually wins.",
      "Compare net price per school, never category versus category.",
    ],
    body: [
      {
        type: "p",
        text: "Ask most families and they'll tell you public means affordable and private means expensive. The truth is stranger: the two run on completely different pricing systems, and which one costs YOU less depends mostly on your family's income and the specific schools involved.",
      },
      {
        type: "h2",
        text: "How each machine works",
      },
      {
        type: "list",
        items: [
          "**Public colleges** are subsidized by state taxes, which is why in-state stickers are lower and why [residency rules](/learn/college/in-state-vs-out-of-state) matter so much. Their aid leans on federal grants and state programs; their own institutional grants are usually modest.",
          "**Private colleges** post high stickers almost nobody pays. The real system is discounting: institutional grants funded by endowments and tuition itself. At wealthy privates the discounts are enormous and need-based; at less wealthy ones they're merit bait spread thin.",
        ],
      },
      {
        type: "h2",
        text: "Who wins, by situation",
      },
      {
        type: "list",
        items: [
          "**Low income, strong record:** wealthy privates that meet [full need](/learn/college/need-blind-colleges) often beat every public option, sometimes costing near zero. This is the most under-applied-to path in American admissions.",
          "**Middle income:** the squeeze zone. Privates may calculate more \"ability to pay\" than feels real; the in-state flagship's sticker is often the honest floor. Run both calculators before assuming either.",
          "**Any income, ordinary private:** a thin-endowment private at $60,000 sticker with a $20,000 merit scholarship still costs double the state school. A discount is not a deal if the remainder is unaffordable.",
          "**Starting at community college:** beats both on price for the first two years; the [transfer play](/learn/college/community-college-transfer-money) is its own well-marked path.",
        ],
      },
      {
        type: "h2",
        text: "The only comparison that counts",
      },
      {
        type: "p",
        text: "Category thinking fails because the spread inside each category dwarfs the gap between them. The comparison that works is one you've already met: [net price](/glossary#net-price), this school, your numbers. Run the calculators, check the Scorecard brackets, and let each school compete as itself, not as a category.",
      },
      {
        type: "tip",
        text: "Don't cross a private school off for its sticker before running its calculator, and don't trust a public school's sticker until you've added housing, fees, and books. Both categories hide the real number, in opposite directions.",
      },
      {
        type: "key",
        text: "Public vs. private is a pricing-system difference, not a price difference. Your income bracket and the specific school decide the winner, every time.",
      },
    ],
    related: ["schools-with-generous-aid", "in-state-vs-out-of-state", "community-college-path"],
  },
  {
    slug: "early-decision-explained",
    order: 26,
    topicId: "college",
    title: "Early Decision: The Binding Fine Print",
    dek: "ED can genuinely boost your admission odds. It can also lock you into a school before you've seen a single competing aid offer. Both are true.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Early decision is binding: admitted means attending, before other offers exist.",
      "Early action gives most of the timing benefit with none of the lock-in.",
      "ED's real cost is losing the power to compare and negotiate aid offers.",
      "There's one accepted exit: if the aid truly doesn't work, you can be released.",
    ],
    body: [
      {
        type: "p",
        text: "Applying early comes in two flavors that sound alike and could not be more different. Early action (EA) means you apply by November, hear back early, and stay free to choose any school by May. Early decision (ED) means you apply by November, hear back early, and if they say yes, you're going. You sign that commitment before you apply. For families where money decides things, that difference is everything.",
      },
      {
        type: "h2",
        text: "Why people do it anyway",
      },
      {
        type: "p",
        text: "Admission rates for ED applicants often run meaningfully higher than regular-decision rates at the same school. Some of that is the applicant pool, but some is real: colleges love a guaranteed yes, and they fill a large share of their classes early. If one school is truly your first choice and the numbers work, ED is a legitimate edge. The catch lives in that second condition.",
      },
      {
        type: "h2",
        text: "What ED costs you",
      },
      {
        type: "list",
        items: [
          "**Comparison power.** You'll never see the [award letters](/learn/college/reading-aid-award-letter) other schools would have sent, so you can't spot a better deal or use one offer to [appeal](/learn/college/appealing-financial-aid) another.",
          "**Time.** The whole decision compresses into fall of senior year, before some families have even run the numbers.",
          "**Leverage.** A school that already has your commitment has less reason to stretch its offer.",
        ],
      },
      {
        type: "h2",
        text: "The escape hatch, honestly described",
      },
      {
        type: "p",
        text: "ED agreements have one recognized exit: if the aid package genuinely doesn't make attendance possible, you can ask to be released, and schools grant it. But you're the one deciding against their aid office's math, the timing is tight, and walking away means starting over in regular decision season. It's a parachute, not a plan.",
      },
      {
        type: "h2",
        text: "A decision rule that holds up",
      },
      {
        type: "steps",
        items: [
          "Run the school's net price calculator with real family numbers before applying ED, not after admission.",
          "If the calculator's estimate would work for your family, ED to a clear first choice is reasonable.",
          "If the estimate is shaky, or your family's finances are complicated (a business, divorce, variable income), apply early action instead and keep your options.",
          "Never ED to a school whose aid you're hoping will surprise you. Hope is not a financial plan.",
        ],
      },
      {
        type: "tip",
        text: "Applying ED usually means filing the [CSS Profile](/learn/college/css-profile-explained) and FAFSA by early November. If you're considering it, aid season starts in October of senior year, not spring.",
      },
      {
        type: "key",
        text: "ED trades your negotiating power for an admissions edge. Make that trade only when the calculator says you can afford the school without negotiating.",
      },
    ],
    related: ["need-blind-colleges", "reading-aid-award-letter", "css-profile-explained"],
  },
  {
    slug: "need-blind-colleges",
    order: 27,
    topicId: "college",
    title: "Need-Blind, Meets Full Need: What the Labels Really Promise",
    dek: "These two phrases get used like synonyms. They aren't, and the difference decides whether a school's promise means anything for your bill.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Need-blind describes admissions: your finances don't affect the decision to admit you.",
      "Meets-full-need describes aid: the school covers the gap its own formula finds.",
      "The powerful combination is both at once, and only a short list of schools offers it.",
      "Many of these policies exclude international and sometimes undocumented students; check the exact wording.",
    ],
    body: [
      {
        type: "p",
        text: "College marketing loves the phrase need-blind. It sounds like a promise about money. It isn't. It's a promise about the admissions committee: they decide whether to admit you without looking at your family's finances. A school can be perfectly need-blind and still hand you an aid package with a canyon of [unmet need](/learn/college/understanding-unmet-need) in it.",
      },
      {
        type: "h2",
        text: "The two labels, untangled",
      },
      {
        type: "list",
        items: [
          "**Need-blind:** finances don't influence the admit decision. Says nothing about what they'll give you.",
          "**Need-aware (or need-sensitive):** finances can influence some admit decisions, usually at the margins. Less scary than it sounds, and often paired with strong aid for those admitted.",
          "**Meets full demonstrated need:** whatever need the school's formula calculates, the aid package covers, with grants, work-study, and sometimes loans. Says nothing about how they admit.",
          "**No-loan pledge:** a subset of generous schools packages aid without loans at all, or below an income threshold. The strongest version of the promise.",
        ],
      },
      {
        type: "h2",
        text: "The combination that changes lives",
      },
      {
        type: "p",
        text: "A school that is need-blind AND meets full need is saying: we'll admit you without caring that you're broke, then cover what our formula says you can't pay. As of 2026 that combination exists at a short list of wealthy schools, places like Harvard, Yale, Princeton, MIT, and Amherst, with a few dozen more meeting full need while admitting need-aware. For a low-income student with the grades, these schools routinely cost less than a state flagship. That sentence surprises almost every family who hears it, which is exactly why it's worth knowing.",
      },
      {
        type: "h2",
        text: "Read the fine print your situation requires",
      },
      {
        type: "p",
        text: "Need-blind policies often apply only to U.S. citizens and permanent residents; a smaller list extends it to international students, and policies for [undocumented students](/learn/college/undocumented-daca-aid) vary school by school. \"Full need\" also means need as the school calculates it, usually via the [CSS Profile](/learn/college/css-profile-explained), which can see your family differently than the FAFSA does. The label is where you start reading, not where you stop.",
      },
      {
        type: "tip",
        text: "On any aid page, hunt for two sentences: the one starting \"Admission is need-blind for...\" and the one starting \"We meet 100% of demonstrated need for...\" Whoever appears after \"for\" is who the promise covers.",
      },
      {
        type: "key",
        text: "Need-blind gets you in the door without your wallet voting. Meets-full-need pays the bill. Only together do they mean what people think either one means alone.",
      },
    ],
    related: ["schools-with-generous-aid", "understanding-unmet-need", "early-decision-explained"],
  },
  {
    slug: "scholarship-displacement",
    order: 24,
    topicId: "college",
    title: "When Winning a Scholarship Shrinks Your Aid",
    dek: "Some schools reduce your aid package when outside money arrives. Know the rule before award season so no win goes to waste.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "You must report outside scholarships to your school; hiding them can cost you your aid.",
      "The good schools trim loans and work-study first, so your scholarship replaces debt.",
      "The bad version, displacement, trims grants instead, leaving you no better off.",
      "One email to the aid office tells you which kind of school you're dealing with.",
    ],
    body: [
      {
        type: "p",
        text: "You grind through applications, you win $3,000 from a [real scholarship](/learn/college/finding-scholarships), and then the fine print bites: your school adjusts your aid package because outside money changed your numbers. Whether that adjustment helps you or erases your win depends entirely on your school's policy, and you can learn it in advance.",
      },
      {
        type: "h2",
        text: "Why packages get adjusted at all",
      },
      {
        type: "p",
        text: "Federal rules cap your total aid at your cost of attendance, and at your calculated need for need-based programs. When an outside scholarship arrives, the school has to make room for it. The only question is what they remove to do it.",
      },
      {
        type: "h2",
        text: "The two versions",
      },
      {
        type: "list",
        items: [
          "**Loans and work-study go first (the good version):** your scholarship replaces money you'd have had to borrow or earn. You graduate with less debt. This is the policy at many schools.",
          "**Grants go first (displacement):** the school pulls its own grant back dollar for dollar, your bill doesn't move, and your scholarship effectively paid the school instead of you.",
        ],
      },
      {
        type: "h2",
        text: "The one email worth sending",
      },
      {
        type: "p",
        text: "Before you accept an offer, or the moment you win outside money, ask the aid office plainly: \"If I bring in an outside scholarship, what gets reduced first?\" Put it in writing so the answer is on record. If the policy is displacement, ask whether the scholarship can apply to a summer term, next year, or a computer purchase inside your cost of attendance; providers and schools can often shift the timing so the money still helps you.",
      },
      {
        type: "tip",
        text: "Always report every outside award. It feels tempting not to, but unreported scholarships surface eventually, and the clawback hits harder than any adjustment would have.",
      },
      {
        type: "key",
        text: "A scholarship should shrink your debt, not your grant. One written question tells you whether it will.",
      },
    ],
    related: ["finding-scholarships", "reading-aid-award-letter", "understanding-unmet-need"],
  },
  {
    slug: "dropping-a-class-money",
    order: 46,
    topicId: "college",
    title: "Before You Drop That Class: The Money Math",
    dek: "Dropping a class can be free, or it can cost you a refund, your aid pace, even your loan grace period. The calendar decides.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Drop before the add/drop deadline and it's usually free and invisible.",
      "After that, a W doesn't touch your GPA but still counts against your aid pace.",
      "Falling below half-time can start your loan clock and stop parts of your aid.",
      "Five minutes with the academic calendar beats a semester of consequences.",
    ],
    body: [
      {
        type: "p",
        text: "Sometimes dropping a class is the right call: a schedule that isn't working, a professor mismatch, a life that got heavier than the syllabus. The decision itself isn't the trap. The timing is, because the same click costs nothing in week one and real money in week ten.",
      },
      {
        type: "h2",
        text: "The three windows",
      },
      {
        type: "steps",
        items: [
          "**Add/drop period (usually the first week or two):** the class vanishes from your record and your bill. This is the free window; use it aggressively.",
          "**After add/drop, before the withdrawal deadline:** you get a W on the transcript. No GPA damage, usually no tuition back, and the credits still count as attempted for your [aid pace](/learn/college/keep-your-aid-sap).",
          "**After the withdrawal deadline:** you're taking the grade. At this point, finishing usually beats failing strategically.",
        ],
      },
      {
        type: "h2",
        text: "The half-time cliff",
      },
      {
        type: "p",
        text: "Aid assumes an enrollment level. Drop below half-time (typically 6 credits) and federal loans begin their grace-period countdown, some grants recalculate, and if you're on a parent's insurance or other student-status benefits, those can wobble too. Dropping from 15 credits to 12 is a very different move than dropping from 9 to 6; count where you'll land before you click.",
      },
      {
        type: "p",
        text: "Withdrawing from everything mid-term is its own bigger event, with rules about returning aid you've only partly earned; if that's where your semester is heading, read [taking a break from college](/learn/college/taking-a-break-from-college) first and talk to the aid office before the registrar.",
      },
      {
        type: "tip",
        text: "Ask two offices, not one: the registrar tells you the transcript consequence, but only financial aid can tell you the money consequence. The second call is the one students skip.",
      },
      {
        type: "key",
        text: "The class you drop in week one costs nothing. The same class in week ten can cost a refund, your pace, and your loan clock. Check the calendar first.",
      },
    ],
    related: ["keep-your-aid-sap", "taking-a-break-from-college", "repaying-student-loans"],
  },
  {
    slug: "emergency-aid-on-campus",
    order: 47,
    topicId: "college",
    title: "Broke Mid-Semester? Your Campus Has Emergency Money",
    dek: "Most colleges keep quiet funds for exactly this moment: emergency grants, food pantries, and completion money. Here's where to knock.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Many campuses run emergency grant funds for one-time crises, often a few hundred dollars paid fast.",
      "Campus food pantries and basic-needs centers exist for students, not just 'other people.'",
      "The financial aid office can re-evaluate your aid mid-year when your situation changes.",
      "Asking early beats dropping out; these funds exist to keep you enrolled.",
    ],
    body: [
      {
        type: "p",
        text: "A car dies, hours get cut, a family emergency eats the rent money. For students living close to the edge, a $400 surprise can genuinely end a semester. What almost nobody tells you at orientation: your campus probably has money and food set aside for exactly this, and using it is what it's for.",
      },
      {
        type: "h2",
        text: "Emergency grants",
      },
      {
        type: "p",
        text: "Many colleges run small emergency or completion funds: one-time grants for a crisis that threatens your enrollment. Amounts are usually a few hundred dollars, decisions come fast, and it's aid, not a loan. Search your school's site for \"emergency grant\" or \"student emergency fund,\" or ask the dean of students office directly. Community colleges often route this through the foundation office.",
      },
      {
        type: "h2",
        text: "Food and basic needs",
      },
      {
        type: "p",
        text: "Campus food pantries are now common, and a growing number of schools run basic-needs centers that bundle the pantry with help applying for [SNAP](/learn/government-aid/snap-explained), transit passes, and emergency housing contacts. No shame calculation belongs here: the pantry exists because students like you funded the need, and using it protects the money that keeps you enrolled.",
      },
      {
        type: "h2",
        text: "When the change is bigger than one bad month",
      },
      {
        type: "p",
        text: "If a parent lost a job or your family's income dropped since you filed the FAFSA, that's not an emergency-fund problem; that's grounds for a [professional judgment appeal](/learn/college/appealing-financial-aid) that can raise your aid for the whole year. The emergency grant buys you the month; the appeal fixes the year.",
      },
      {
        type: "steps",
        items: [
          "Name the exact dollar gap and what it threatens (rent, a bill, staying enrolled).",
          "Hit the dean of students or basic-needs office and ask what emergency funds exist.",
          "Apply the same day; these funds move on speed.",
          "If income changed, book the aid office for an appeal in the same week.",
          "Off campus, dial 211 for local rent and utility help.",
        ],
      },
      {
        type: "key",
        text: "Colleges lose students over $400 problems all the time, and they know it. The money to stop it exists; it just waits for you to ask.",
      },
    ],
    related: ["appealing-financial-aid", "keep-your-aid-sap", "taking-a-break-from-college"],
  },
  {
    slug: "cutting-textbook-costs",
    order: 25,
    topicId: "college",
    title: "Textbooks Without the $400 Semester",
    dek: "Course materials are the most negotiable bill in college. Rent, borrow, go open-source, and dodge the access-code trap.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Never buy anything before the first class meeting; syllabi change and 'required' often isn't.",
      "Library course reserves, rentals, and older editions cover most classes for a fraction of retail.",
      "Free open educational resources (OER) are real textbooks, increasingly assigned on purpose.",
      "Access codes are the one true trap; sometimes the code is the assignment portal and you need it.",
    ],
    body: [
      {
        type: "p",
        text: "The bookstore list for one semester can run hundreds of dollars, and it's priced for people who don't ask questions. Course materials are the most flexible line in your whole college budget: with a week of patience you can usually cut the bill by more than half.",
      },
      {
        type: "h2",
        text: "The order to try, cheapest first",
      },
      {
        type: "steps",
        items: [
          "Wait for the first class. Professors regularly say which books are truly required and which are shelf decoration.",
          "Check the library: many put required texts on course reserve for free borrowing.",
          "Search for the book as an open educational resource; OER textbooks are free and legal, and some departments assign them deliberately.",
          "Rent (bookstore or online) or buy used; compare with the ISBN, not the title.",
          "Consider one edition back, but ask the professor first; page numbers and problem sets sometimes shift.",
        ],
      },
      {
        type: "h2",
        text: "The access-code trap",
      },
      {
        type: "p",
        text: "Some courses grade homework through a publisher's online platform, and the access code is the product. A used book won't include a working code, so for those classes, the cheapest legal route is usually buying the code alone, sometimes bundled with a digital text. Confirm with the professor before spending anything.",
      },
      {
        type: "tip",
        text: "If a required code or book is genuinely out of reach, say so to the professor in week one. Loaner copies, library links, and quiet workarounds exist far more often than anyone advertises, and asking early reads as serious, not needy.",
      },
      {
        type: "key",
        text: "Sticker price is the price for people who buy everything, new, before day one. Be none of those things.",
      },
    ],
    related: ["minimizing-college-debt", "emergency-aid-on-campus", "work-study-explained"],
  },
  {
    slug: "fafsa-verification",
    order: 12,
    topicId: "college",
    title: "Picked for FAFSA Verification? Here's the Play",
    dek: "Verification isn't an accusation and it isn't optional. It's paperwork with a clock on it, and your aid is frozen until you finish.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Verification is a routine audit of your FAFSA answers, not a sign you did something wrong.",
      "Your aid doesn't pay out until verification is complete.",
      "Respond to every request fast; slow paperwork quietly becomes lost aid.",
      "Low-income students get selected often, so expect it and don't panic.",
    ],
    body: [
      {
        type: "p",
        text: "You filed the [FAFSA](/learn/college/fafsa-step-by-step), you got your aid offer, and then an email arrives: you've been selected for verification. It reads like you're in trouble. You're not. Verification is the aid system double-checking a sample of applications, and applications from low-income families get pulled into that sample all the time. The danger isn't the audit; it's ignoring it.",
      },
      {
        type: "h2",
        text: "What verification actually is",
      },
      {
        type: "p",
        text: "The school compares what you entered on the FAFSA against documents: tax information, household size, sometimes proof of high school completion or identity. Since the FAFSA now pulls most tax data straight from the IRS, many verifications are just confirming the pieces the transfer couldn't cover, like who actually lives in your household.",
      },
      {
        type: "h2",
        text: "The part that costs people money",
      },
      {
        type: "p",
        text: "Until verification is done, your aid is provisional. Grants don't disburse, loans don't pay out, and at some schools your classes can be dropped for nonpayment while you wait. Every week you sit on the request is a week your money sits behind glass. Some students never finish the paperwork at all and silently lose aid they had already been offered.",
      },
      {
        type: "steps",
        items: [
          "Read the request carefully; schools list exactly which documents they want in your student portal.",
          "Send precisely what's asked, through the school's own upload system, not email attachments.",
          "Screenshot or save confirmation of every submission with the date.",
          "Check the portal weekly until the status flips to complete.",
          "If a document is impossible to get, call the aid office and say so; they have alternatives for real situations.",
        ],
      },
      {
        type: "tip",
        text: "Household size trips up more verifications than taxes do. Count everyone your parent supports, not just who's on a lease or a tax return, and answer consistently with what the FAFSA says.",
      },
      {
        type: "key",
        text: "Verification is a gate, not a wall. The students who lose money are the ones who never walk through it.",
      },
    ],
    related: ["fafsa-step-by-step", "fafsa-mistakes", "appealing-financial-aid"],
  },
  {
    slug: "keep-your-aid-sap",
    order: 45,
    topicId: "college",
    title: "Keeping Your Aid: The GPA and Pace Rules Nobody Mentions",
    dek: "Financial aid isn't a one-time prize. Schools re-check your grades and completed credits every year, and falling short can end it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Satisfactory Academic Progress (SAP) decides whether your aid continues.",
      "Most schools require around a 2.0 GPA and completing about two-thirds of attempted credits.",
      "Withdrawn and failed classes still count as attempted, which drags your pace down.",
      "A failed SAP check can be appealed, and real-life reasons often win.",
    ],
    body: [
      {
        type: "p",
        text: "Every award letter comes with an invisible condition: keep making progress or the money stops. Schools call it Satisfactory Academic Progress, and they check it at least once a year. Nobody frames it this way at orientation, but a rough semester isn't just a GPA problem. It can be a losing-your-Pell-Grant problem.",
      },
      {
        type: "h2",
        text: "The two numbers that matter",
      },
      {
        type: "list",
        items: [
          "**A GPA floor**, most often around 2.0 for undergraduates.",
          "**A pace rule**: completing roughly two-thirds of the credits you attempt. Sign up for 12, finish at least 8, or the math starts working against you.",
        ],
      },
      {
        type: "p",
        text: "The pace rule is the quiet one. A W from [dropping a class](/learn/college/dropping-a-class-money) doesn't touch your GPA, but it still counts as attempted and unfinished, and enough of them will fail your pace check even with good grades. Your school's exact numbers live in its SAP policy; read yours once so you know your floor.",
      },
      {
        type: "h2",
        text: "What happens when you fall short",
      },
      {
        type: "p",
        text: "Usually a warning term first, with aid intact. Fall short again and aid stops until you're back above the line. That's the moment students drop out over money when they didn't have to, because the next step exists and works:",
      },
      {
        type: "h2",
        text: "The SAP appeal",
      },
      {
        type: "p",
        text: "If something real knocked your semester sideways, illness, a family crisis, a job you couldn't refuse, you can appeal. Write plainly what happened, attach what proof you have, and include a realistic plan for getting back on track. Schools approve honest appeals regularly; the process resembles an [aid appeal](/learn/college/appealing-financial-aid) and the same directness wins.",
      },
      {
        type: "tip",
        text: "If a term is going badly, talk to the aid office before grades post. Fixing a schedule in week eight beats appealing a suspension in week eighteen.",
      },
      {
        type: "key",
        text: "Aid is renewed, not owned. Know your GPA floor and your pace number the way you know your rent.",
      },
    ],
    related: ["dropping-a-class-money", "appealing-financial-aid", "taking-a-break-from-college"],
  },
  {
    slug: "css-profile-explained",
    order: 22,
    topicId: "college",
    title: "The CSS Profile, Explained",
    dek: "About 200 colleges want a second aid form beyond the FAFSA. Here's what it asks, what it costs, and why low-income families usually pay nothing.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "The CSS Profile unlocks a school's own institutional aid, separate from federal aid.",
      "It's free for families making up to $100,000; otherwise $25 for the first school and $16 per additional school.",
      "It opens October 1, the same day as the FAFSA, and early-decision applicants need it earliest.",
      "It asks deeper questions than the FAFSA, including home equity and a noncustodial parent's finances.",
    ],
    body: [
      {
        type: "p",
        text: "Filing the [FAFSA](/learn/college/fafsa-step-by-step) unlocks federal money: Pell Grants, work-study, federal loans. But at a couple hundred colleges, mostly private ones with big aid budgets, there's a second form standing between you and the school's own money: the CSS Profile, run by the College Board. Schools like these often give out far more of their own institutional aid than the government does, so at the places that ask for it, this form can matter even more than the FAFSA.",
      },
      {
        type: "h2",
        text: "Who actually needs it",
      },
      {
        type: "p",
        text: "Only students applying to schools that require it, and each school's financial aid page says plainly whether it does. The list runs around 200 colleges and scholarship programs, heavy on private universities and small liberal-arts colleges. State schools mostly don't use it. Check every school on your list, because filing it for a school that doesn't want it is wasted effort, and skipping it at a school that does can cost you the biggest aid package you'd have gotten anywhere.",
      },
      {
        type: "h2",
        text: "What it costs, and who pays nothing",
      },
      {
        type: "p",
        text: "For 2026-27 the Profile costs $25 for the first school and $16 for each additional one. But here's the part too many families never learn: it's automatically free if your family income is up to $100,000. No separate waiver application, no extra form; the fee simply doesn't appear when your answers show you qualify. If you're a first-gen or low-income student staring at that fee, odds are good you won't pay it.",
      },
      {
        type: "h2",
        text: "How it digs deeper than the FAFSA",
      },
      {
        type: "p",
        text: "The Profile exists because schools giving out their own millions want a fuller picture than the federal formula. Expect questions the FAFSA never asks:",
      },
      {
        type: "list",
        items: [
          "**Home equity** on the house you live in, which the FAFSA ignores.",
          "**Small-business and farm finances**, even ones the FAFSA skips.",
          "**Medical expenses and private-school tuition** for siblings, which can work in your favor.",
          "**Both parents' finances when they're divorced or separated**: many Profile schools also want the noncustodial parent's information on a separate form.",
        ],
      },
      {
        type: "tip",
        text: "No contact with a noncustodial parent? Schools grant waivers for that form when there's no relationship or there's a safety issue. Email each school's aid office and ask for their noncustodial waiver process; a counselor, teacher, or social worker letter usually supports it.",
      },
      {
        type: "h2",
        text: "Timing: October 1, earlier if you apply early",
      },
      {
        type: "p",
        text: "The Profile opens October 1 each year, the same day as the FAFSA. Deadlines belong to each school, not to the College Board, and they arrive in waves: early-decision and early-action applicants often need it by early to mid November, while regular-decision deadlines usually land January through February. File both forms in the fall and you never have to think about which wave you're in.",
      },
      {
        type: "p",
        text: "After you submit, some schools also ask for tax documents through the College Board's IDOC upload system. Treat any IDOC email as real homework with a due date; aid offices won't finalize your package without it.",
      },
      {
        type: "h2",
        text: "The play, start to finish",
      },
      {
        type: "steps",
        items: [
          "List your schools and mark which ones require the Profile; their aid pages say so.",
          "Create a College Board account (the same one used for the SAT and AP works).",
          "Gather the same documents as for the FAFSA, plus mortgage and business records if they apply.",
          "File in October alongside your FAFSA, earliest deadlines first.",
          "Watch for IDOC or school follow-ups, and compare the [award letters](/learn/college/reading-aid-award-letter) when they arrive.",
        ],
      },
      {
        type: "key",
        text: "The FAFSA opens the government's wallet. The Profile opens the school's, and at the schools that ask for it, that wallet is usually bigger.",
      },
    ],
    related: ["fafsa-step-by-step", "reading-aid-award-letter", "appealing-financial-aid"],
  },
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
    related: ["community-college-transfer-money", "in-state-vs-out-of-state", "minimizing-college-debt"],
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
  {
    slug: "community-college-transfer-money",
    order: 61,
    topicId: "college",
    title: "Transferring from Community College: The Money Side",
    dek: "The discount only pays out if your credits land. How to protect the math with transfer agreements, keep your aid moving, and grab the money that exists only for transfer students.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "Every course that transfers is a course you never pay for twice.",
      "Official agreements (like ASSIST.org in California) tell you exactly which courses count, before you register.",
      "Your aid doesn't follow you automatically: file the FAFSA every year and compare the new school's offer.",
      "Some sizable scholarships are open only to transfer students.",
    ],
    body: [
      {
        type: "p",
        text: "If you started at a community college with a plan to transfer, you picked one of the smartest money routes in higher education. [The Community College Path](/learn/college/community-college-path) covers why the math works. This guide is about protecting that math, because the savings aren't automatic. They depend on your credits actually counting when you arrive.",
      },
      {
        type: "key",
        text: "A federal study found that transfer students lose about 40% of their credits on average. A lost credit is a course you paid for once at the community college and will pay for again at the university, in tuition and in time. The whole money game of transferring is keeping that number near zero.",
      },
      {
        type: "h2",
        text: "The math you're protecting",
      },
      {
        type: "p",
        text: "In California, community college tuition is $46 per unit in 2026, about $1,380 for a full-time year, and the California College Promise Grant waives those fees entirely for many low-income students. Compare that to roughly $6,800 a year in tuition at a Cal State or about $15,000 at a UC for 2026\u201327. Two years at the low price plus two at the high price is the discount. Two years at the low price that *don't count* is the trap.",
      },
      {
        type: "h2",
        text: "Make every course count: the California map",
      },
      {
        type: "p",
        text: "California writes the deal down. An articulation agreement is the official record of which courses at your community college satisfy which requirements at a specific university, and the whole set is public and searchable.",
      },
      {
        type: "list",
        items: [
          "**ASSIST.org** is the official course-by-course database for transfers to UC and CSU (free, no account needed). Pick your college, your target campus, and your major, and it shows exactly what to take.",
          "**Cal-GETC** is the single general-education pattern for students who started fall 2025 or later (it replaced the old IGETC pattern). Finish it and your general-ed requirements travel with you.",
          "**An ADT (Associate Degree for Transfer)** comes with a guarantee: earn it and a Cal State must admit you with junior standing, so nothing gets re-litigated on arrival.",
          "**UC TAG (Transfer Admission Guarantee)** offers guaranteed admission at six UC campuses if you hit the course and GPA marks. The exceptions are Berkeley, UCLA, and San Diego, which you can still apply to normally.",
        ],
      },
      {
        type: "steps",
        items: [
          "Before registering each term, check ASSIST for your major and target campus, and take only courses that appear there.",
          "Confirm your Cal-GETC progress with a counselor every term, in writing (email counts).",
          "Keep a folder with the syllabus for every course you take. If a credit is ever questioned, the syllabus is your evidence for the appeal.",
          "If your target school changes, re-run the ASSIST check that week, not at application time.",
        ],
      },
      {
        type: "tip",
        text: "Keep score while you do this. The [student tracker](/students/tracker) counts your units toward the 60-unit transfer mark, flags the courses you haven't confirmed yet, and shows the dollars every transferable course protects.",
      },
      {
        type: "h2",
        text: "Outside California",
      },
      {
        type: "p",
        text: "Every state has some version of this, just less centralized. Your community college's transfer center keeps the articulation agreements it holds with nearby universities, and many states publish statewide guaranteed-transfer course lists. Ask the transfer center two questions: which agreements exist with your target schools, and which courses on your plan are covered. Get the answer in writing and keep the syllabus folder anyway.",
      },
      {
        type: "h2",
        text: "Your aid moves with you (mostly)",
      },
      {
        type: "p",
        text: "Federal aid works at community colleges, so [file the FAFSA every year](/learn/college/fafsa-step-by-step), including the years you think you're too cheap to qualify for anything. When you transfer, your aid doesn't transfer with you; the new school builds a fresh package from that year's FAFSA. Packages differ wildly between campuses, so when offers arrive, [compare them side by side](/tools/college/compare-offers) on net price, not sticker price. California students without citizenship paperwork use the CADAA instead of the FAFSA; [aid without papers](/learn/college/undocumented-daca-aid) walks through it.",
      },
      {
        type: "h2",
        text: "Money that exists only for transfer students",
      },
      {
        type: "p",
        text: "Transferring puts you in a smaller applicant pool for certain awards, and some are large. The Jack Kent Cooke Undergraduate Transfer Scholarship awards up to $55,000 a year (2026) specifically to high-achieving community college students heading to four-year schools. Phi Theta Kappa, the community college honor society, runs its own scholarship pipeline. And many universities post transfer-specific merit awards that first-year applicants can't touch. [Finding Scholarships You'll Actually Win](/learn/college/finding-scholarships) covers how to run the search; just add the word 'transfer' to it.",
      },
      {
        type: "h2",
        text: "Budget for the transfer season itself",
      },
      {
        type: "list",
        items: [
          "**Application fees.** UC charges $80 per campus (2026), but its fee waiver covers up to four campuses for low- and middle-income applicants. CSU charges $70 per campus with its own waiver. Both waivers live inside the application itself; you don't hunt for them separately.",
          "**The enrollment deposit** at your new school, typically due in spring before you attend.",
          "**The move.** Housing deposits and first-month costs land before your new aid disburses, so they come out of savings. [A savings plan](/tools/savings) started two terms early takes the panic out of it.",
          "**Work hours.** If your job doesn't move with you, budget for a gap between the old paycheck and a new one on campus.",
        ],
      },
      {
        type: "tip",
        text: "Book a counselor appointment the same week each term, and bring the ASSIST printout. Fifteen minutes a term is the cheapest insurance in higher education.",
      },
      {
        type: "p",
        text: "None of this requires genius. It requires checking the map before you register, keeping receipts, and asking for the money that's already set aside for people making exactly your move. You did the hard part when you chose the route.",
      },
    ],
    related: ["community-college-path", "fafsa-step-by-step", "finding-scholarships"],
  },
];
