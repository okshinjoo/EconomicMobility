import type { Article } from "./types";

export const collegeArticles: Article[] = [
  {
    slug: "fafsa-step-by-step",
    order: 10,
    topicId: "college",
    title: "FAFSA, Step by Step",
    dek: "The FAFSA is the one form that unlocks most college aid — and it's completely free to file.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "The FAFSA is the gateway to grants, work-study, and federal loans.",
      "It's always free — never pay a site to file it for you.",
      "Gather a few documents first and the form goes faster.",
      "File early and file every year you're in school.",
    ],
    body: [
      {
        type: "p",
        text: "If college aid feels like a locked door, the FAFSA is the key. FAFSA stands for the Free Application for Federal Student Aid, and it's the form that decides what grants, work-study, and federal loans you can get. Fill out this one form and schools use it to build your aid offer.",
      },
      {
        type: "p",
        text: "If you're the first in your family to do this, you are not behind and you are not alone. Plenty of students fill out the FAFSA with no one to ask. Let's walk through it together.",
      },
      {
        type: "h2",
        text: "It's free — really",
      },
      {
        type: "p",
        text: "The word **free** is right there in the name. You never have to pay to file the FAFSA, and any website that asks you for money to submit it is one to skip. The official form lives at the federal student aid site, and that's the only place you need.",
      },
      {
        type: "h2",
        text: "Gather your stuff first",
      },
      {
        type: "p",
        text: "The form goes much faster if you collect a few things before you start. You don't need all of it memorized — you just need it nearby.",
      },
      {
        type: "list",
        items: [
          "Your Social Security number (or Alien Registration number, if you have one).",
          "Your most recent tax return and income records — and a parent's, if you're a dependent student.",
          "Records of any savings, checking, and other money you have.",
          "A list of the schools you're considering, so the form can send your info to each one.",
        ],
      },
      {
        type: "tip",
        text: "Create your account username and password ahead of time. If you're a dependent student, a parent will need their own account too — setting both up early saves a headache later.",
      },
      {
        type: "h2",
        text: "Fill it out, step by step",
      },
      {
        type: "steps",
        items: [
          "Create your account and log in to the official federal student aid site.",
          "Enter your personal details and the schools you want to receive your information.",
          "Add your income and asset information — many people can import tax data directly, which cuts down on typing and mistakes.",
          "If you're a dependent student, invite your parent to add their part and sign.",
          "Review everything, sign, and submit. You'll get a confirmation that it went through.",
        ],
      },
      {
        type: "h2",
        text: "File early, every year",
      },
      {
        type: "p",
        text: "Some aid is first-come, first-served, so filing soon after the form opens can mean more money. The FAFSA usually opens around **October 1** for the next school year, and the federal deadline runs to **June 30** of that school year — but many states and schools set their own deadlines *months* earlier, so check yours and don't wait until the last week. One more thing: the FAFSA isn't a one-time task. You file a new one for each school year you want aid.",
      },
      {
        type: "key",
        text: "The FAFSA can look intimidating, but it's mostly copying numbers off forms you already have. Filing it — even if you think your family earns too much — is how you find out what help is on the table.",
      },
      {
        type: "p",
        text: "Once your FAFSA is in, schools start building your aid offer. Knowing the kinds of aid you might see next makes that letter a lot less confusing.",
      },
    ],
    related: ["grants-loans-scholarships", "reading-aid-award-letter"],
  },

  {
    slug: "grants-loans-scholarships",
    order: 30,
    topicId: "college",
    title: "Grants vs. Loans vs. Scholarships",
    dek: "Some college money you keep, and some you pay back. Knowing which is which changes everything.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Grants and scholarships are money you don't repay.",
      "Loans are borrowed money you pay back, usually with interest.",
      "Free money should always come before borrowed money.",
      "Most students end up using a mix of all three.",
    ],
    body: [
      {
        type: "p",
        text: "College aid comes in a few flavors, and they are not the same. The single most important question to ask about any dollar offered to you is simple: do I have to pay this back? Get that straight and the whole picture gets clearer.",
      },
      {
        type: "h2",
        text: "Grants: money you keep",
      },
      {
        type: "p",
        text: "A grant is money for school — often based on financial need — that you do not have to pay back. It's as close to free money as it gets. The biggest federal one is the **Pell Grant**, worth up to **$7,395** for the 2025–26 school year for students with the most need. Grants usually come from the government or your school, and your FAFSA is what determines whether you qualify for the federal ones.",
      },
      {
        type: "h2",
        text: "Scholarships: also money you keep",
      },
      {
        type: "p",
        text: "A scholarship is also money you don't repay, but it's usually awarded for something specific — your grades, a talent, your background, or your field of study. Scholarships can come from your school, local groups, companies, and foundations. You can win more than one, and they stack on top of your other aid.",
      },
      {
        type: "key",
        text: "Grants and scholarships are gift money. You never pay them back. That makes them the best dollars in your whole aid package — chase these first.",
      },
      {
        type: "h2",
        text: "Loans: money you pay back",
      },
      {
        type: "p",
        text: "A student loan is money you borrow to pay for school and repay later, almost always with interest — the extra cost of borrowing. A $5,000 loan doesn't stay $5,000; over time you pay back that amount plus interest on top. Loans aren't bad, and many students need them. But borrowed money is the opposite of gift money, so it belongs last in line.",
      },
      {
        type: "tip",
        text: "Federal student loans usually come with lower, fixed rates and more flexible repayment options than private ones. If you do borrow, look at federal loans first.",
      },
      {
        type: "h2",
        text: "Putting them in order",
      },
      {
        type: "p",
        text: "Most students use a mix, and that's completely normal. The smart order is the same for everyone: take all the grants and scholarships you can get, then work-study if it's offered, and only then borrow what you truly need.",
      },
      {
        type: "p",
        text: "When your aid offer arrives, you'll see these types side by side. Telling them apart is the first step to reading that letter with confidence.",
      },
    ],
    related: ["finding-scholarships", "reading-aid-award-letter"],
  },

  {
    slug: "finding-scholarships",
    order: 40,
    topicId: "college",
    title: "Finding Scholarships You'll Actually Win",
    dek: "You don't need a perfect GPA to win a scholarship. You need to apply for the right ones.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Smaller, local scholarships are often easier to win.",
      "There's free money for all kinds of students, not just top students.",
      "A little organization beats a lot of luck.",
      "Never pay a fee to apply for a scholarship.",
    ],
    body: [
      {
        type: "p",
        text: "Lots of students skip scholarships because they assume you need a 4.0 and a list of trophies to win one. Not true. A scholarship is money for school you don't repay, and there are scholarships for nearly every kind of person — your hometown, your heritage, your hobby, your major, even your part-time job. The trick is applying for the ones you can actually win.",
      },
      {
        type: "h2",
        text: "Go small and local",
      },
      {
        type: "p",
        text: "Everyone chases the giant national scholarships, which means thousands of people apply for each one. Smaller, local awards — from a community group, a local business, your church, or your school district — get far fewer applicants. A $500 local scholarship you actually win beats a $20,000 one you don't.",
      },
      {
        type: "tip",
        text: "Start with your school counselor and your school's financial aid office. They often keep a list of local scholarships that never get posted online — and far fewer students hear about them.",
      },
      {
        type: "h2",
        text: "Look in the right places",
      },
      {
        type: "list",
        items: [
          "Your high school or college counseling and financial aid offices.",
          "Free scholarship search sites — never ones that charge a fee.",
          "Local groups: rotary clubs, unions, community foundations, places of worship.",
          "Your parents' employers, and your own employer if you work.",
          "Groups tied to your background, interests, or planned major.",
        ],
      },
      {
        type: "h2",
        text: "Stay organized",
      },
      {
        type: "p",
        text: "Most scholarships are lost to missed deadlines, not weak applications. Keep a simple list — a spreadsheet or even a notebook — with each scholarship, what it needs, and when it's due. Write one strong personal essay you can adjust for several applications instead of starting from scratch each time.",
      },
      {
        type: "h2",
        text: "Watch for scams",
      },
      {
        type: "p",
        text: "Here's a rule that will protect you: a real scholarship never asks you to pay to apply. If a site charges a fee, guarantees you'll win, or asks for your bank account to 'hold' your award, walk away. Real scholarship money flows to you, never from you.",
      },
      {
        type: "key",
        text: "Applying for scholarships is one of the best-paying things you can do with your time. A few hours on a small local award can be worth more per hour than almost any job — and that money you keep.",
      },
      {
        type: "p",
        text: "Every scholarship you win shrinks what you might have to borrow. Once the offers come in, the next job is reading your aid letter and seeing how it all fits together.",
      },
    ],
    related: ["grants-loans-scholarships", "reading-aid-award-letter"],
  },

  {
    slug: "reading-aid-award-letter",
    order: 10,
    topicId: "college",
    title: "Reading a Financial Aid Award Letter",
    dek: "These letters mix free money and loans together. Here's how to see what a school really costs you.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Award letters often blend gift aid and loans into one number.",
      "Separate money you keep from money you repay.",
      "Compare schools by what you'd actually owe, not the sticker price.",
      "You can ask the financial aid office to explain or reconsider.",
    ],
    body: [
      {
        type: "p",
        text: "You filed the FAFSA, you applied, and now a financial aid award letter shows up. It tells you what aid a school is offering. The problem is that many of these letters are confusing on purpose — they can make a school look more affordable than it is by mixing very different kinds of money together.",
      },
      {
        type: "h2",
        text: "Start with the cost of attendance",
      },
      {
        type: "p",
        text: "Every letter should be measured against the cost of attendance — the school's full yearly price, including tuition, fees, housing, food, books, and other expenses. This is the real number to beat. If the letter only shows tuition, find the full cost of attendance so you're comparing apples to apples.",
      },
      {
        type: "h2",
        text: "Sort the aid into two piles",
      },
      {
        type: "p",
        text: "This is the most important move you can make. Go line by line and split every item into two groups:",
      },
      {
        type: "list",
        items: [
          "**Gift aid:** grants and scholarships you never repay. This is the good stuff.",
          "**Self-help aid:** loans you pay back, and work-study you earn by working a job.",
        ],
      },
      {
        type: "p",
        text: "A loan listed on the letter can look like the school is giving you money, but it isn't — it's money you'll owe later, with interest. Once you separate the piles, the letter starts telling you the truth.",
      },
      {
        type: "tip",
        text: "Watch for a Parent PLUS loan or other loans listed as 'aid.' They lower the number you pay today, but they raise what your family owes tomorrow. Count them as cost, not help.",
      },
      {
        type: "h2",
        text: "Find your real out-of-pocket cost",
      },
      {
        type: "p",
        text: "Now do one piece of simple math. Take the cost of attendance and subtract only your gift aid — the grants and scholarships. What's left is roughly what you'll need to cover with savings, work, or borrowing. That number, not the school's sticker price, is what you should compare across schools.",
      },
      {
        type: "key",
        text: "Two schools can have the same 'after-aid' total, but one fills the gap with grants and the other with loans. The one with more gift aid is almost always the better deal, even if the headline number looks the same.",
      },
      {
        type: "h2",
        text: "Ask questions — it's allowed",
      },
      {
        type: "p",
        text: "If a letter confuses you, call or email the school's financial aid office and ask them to walk you through it. And if your family's money situation has changed — a lost job, a big medical bill — you can ask them to review your offer again. People do this all the time, and asking costs nothing.",
      },
      {
        type: "p",
        text: "Once you've found your real cost at each school, you may still see a gap between what you can pay and what aid covers. That gap has a name, and it's worth understanding before you decide.",
      },
    ],
    related: ["understanding-unmet-need", "grants-loans-scholarships"],
  },

  {
    slug: "understanding-unmet-need",
    order: 20,
    topicId: "college",
    title: "Understanding Your Unmet Need",
    dek: "When aid doesn't cover the whole bill, the leftover gap is your unmet need. Here's how to close it.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Unmet need is the cost of attendance minus all your aid.",
      "It's the real gap you have to fill yourself.",
      "A big gap is a signal to compare schools carefully.",
      "There are several ways to shrink it before you borrow.",
    ],
    body: [
      {
        type: "p",
        text: "Sometimes you add up all your grants, scholarships, and aid, hold it up against a school's price, and there's still a gap. That leftover gap has a name: unmet need. It's the part of the bill your aid doesn't reach — and the part you have to figure out how to cover.",
      },
      {
        type: "h2",
        text: "The simple math behind it",
      },
      {
        type: "p",
        text: "Unmet need is easier than it sounds. Take the cost of attendance — the school's full yearly price — and subtract every bit of aid you're getting. Whatever's left is your unmet need.",
      },
      {
        type: "p",
        text: "Picture a school that costs $25,000 a year. If your grants, scholarships, and other aid add up to $18,000, your unmet need is $7,000. That $7,000 is the real question mark you have to answer for each year you attend.",
      },
      {
        type: "h2",
        text: "Why it matters so much",
      },
      {
        type: "p",
        text: "The unmet need is what's left for you to cover with savings, a job, family help, or borrowing. A school with a higher sticker price can actually leave you with a smaller gap if it gives generous gift aid. So when you compare schools, compare their unmet need — not their advertised price.",
      },
      {
        type: "key",
        text: "A large unmet need every year is a warning light. Multiply that yearly gap by four and ask honestly how you'd cover it. A cheaper-looking school with a smaller gap can leave you far better off.",
      },
      {
        type: "h2",
        text: "Ways to shrink the gap",
      },
      {
        type: "p",
        text: "A gap isn't the end of the story. Before you assume you have to borrow the whole thing, try these:",
      },
      {
        type: "list",
        items: [
          "Keep applying for scholarships — even small ones chip the gap down.",
          "Ask the financial aid office to reconsider, especially if your finances changed.",
          "Look at work-study or a part-time job to cover part of it as you go.",
          "Compare schools by their gap, and weigh a more affordable option.",
        ],
      },
      {
        type: "tip",
        text: "If your family's income dropped after you filed the FAFSA, ask the school about a 'professional judgment' or appeal. A counselor there can sometimes adjust your aid based on what's true now, not last year.",
      },
      {
        type: "h2",
        text: "When borrowing is what's left",
      },
      {
        type: "p",
        text: "If you've shrunk the gap as much as you can and still need to borrow, that can be a reasonable choice — as long as you go in with your eyes open. Borrowing a little for a degree you'll finish is very different from borrowing a lot with no plan.",
      },
      {
        type: "p",
        text: "Before you sign for any loan, it's worth understanding exactly what you're agreeing to. A few minutes now can save you years of regret.",
      },
    ],
    related: ["student-loans-before-you-sign", "reading-aid-award-letter"],
  },

  {
    slug: "student-loans-before-you-sign",
    order: 10,
    topicId: "college",
    title: "Student Loans, Before You Sign",
    dek: "Borrowing for school is a real commitment. Know the key terms before you put your name on it.",
    level: "Advanced",
    readMinutes: 7,
    takeaways: [
      "Subsidized loans don't grow while you're in school; unsubsidized ones do.",
      "Federal loans usually beat private loans on terms and protections.",
      "Only borrow what you truly need — you can decline part of an offer.",
      "Understand repayment before you sign, not after you graduate.",
    ],
    body: [
      {
        type: "p",
        text: "A student loan can be a fair trade — borrowed money now for a degree that pays off later. But a loan is a real promise, and the terms vary a lot. Before you sign anything, it's worth slowing down to understand exactly what you're agreeing to. This is the kind of decision that's easy to rush and hard to undo.",
      },
      {
        type: "h2",
        text: "Subsidized vs. unsubsidized",
      },
      {
        type: "p",
        text: "If you take a federal loan, you may be offered two types, and the difference is real money. With a subsidized loan, the government covers the interest while you're in school, so the balance doesn't grow until after you leave. With an unsubsidized loan, interest starts piling up right away — even while you're still in class.",
      },
      {
        type: "p",
        text: "Say you borrow $5,000 your first year. With a subsidized loan, you still owe about $5,000 when you graduate. With an unsubsidized loan, interest has been quietly adding up the whole time, so you owe more than you borrowed before you've made a single payment.",
      },
      {
        type: "key",
        text: "When you have the choice, take subsidized loans before unsubsidized ones. Same borrowed amount, but the subsidized version costs you less because it isn't growing while you study.",
      },
      {
        type: "h2",
        text: "Federal before private",
      },
      {
        type: "p",
        text: "Loans also come from two worlds. Federal loans come from the government and tend to have fixed rates, options to pause payments during hard times, and income-driven repayment plans that tie your bill to what you earn. Private loans come from banks and lenders, and their terms are often less forgiving — sometimes with variable rates that can climb.",
      },
      {
        type: "tip",
        text: "A private loan may ask for a co-signer — often a parent — which means that person is on the hook to repay if you can't. Co-signing makes the debt legally theirs too, so go in knowing what it means for both of you.",
      },
      {
        type: "h2",
        text: "Borrow only what you need",
      },
      {
        type: "p",
        text: "Just because a loan is offered doesn't mean you have to take all of it. You can accept part of a loan and decline the rest. A handy guideline: try not to borrow more in total than you expect to earn in your first year out of school. Less debt now means more freedom later.",
      },
      {
        type: "h2",
        text: "Read the terms before you sign",
      },
      {
        type: "p",
        text: "Before you agree, find the answers to a few plain questions. They're all in the paperwork, and a financial aid officer will help you find them.",
      },
      {
        type: "list",
        items: [
          "What's the interest rate, and is it fixed or variable?",
          "When do payments start — after graduation, or sooner?",
          "What will the monthly payment be, and for how many years?",
          "What happens if I lose my job or need to pause payments?",
        ],
      },
      {
        type: "p",
        text: "It helps to picture the payment landing in a future budget. A loan that sounds small today becomes a real line item competing with rent, groceries, and an emergency fund once you're out in the world.",
      },
      {
        type: "key",
        text: "Signing a student loan is a promise your future self has to keep. Borrow as little as you can, choose federal and subsidized first, and never sign a loan whose terms you can't explain back in your own words.",
      },
      {
        type: "p",
        text: "Done thoughtfully, borrowing for school is a tool, not a trap. Take the free money first, borrow only what you need, and you'll start your career with options instead of regret.",
      },
    ],
    related: ["understanding-unmet-need", "grants-loans-scholarships"],
  },
  {
    slug: "undocumented-daca-aid",
    order: 70,
    topicId: "college",
    title: "Paying for College as an Undocumented or DACA Student",
    dek: "Federal aid may be off the table — but state aid, school aid, and scholarships often aren't.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "No federal aid usually doesn't mean no aid at all.",
      "Many states offer in-state tuition and state aid to undocumented students.",
      "Plenty of scholarships don't require citizenship or an SSN.",
      "A college access counselor can map your specific options.",
    ],
    body: [
      {
        type: "p",
        text: "If you're undocumented or a DACA recipient, you may have heard that college is closed to you, or that you can't get any help paying for it. That's not the full story. Federal financial aid is generally off the table — but a lot of other money isn't, and students in your exact situation graduate every year.",
      },
      {
        type: "h2",
        text: "Start with your state",
      },
      {
        type: "p",
        text: "This is the big one, because it varies enormously: many states offer in-state tuition (a huge discount) and their own financial aid to undocumented students, often through a separate application instead of the FAFSA. Some states offer a lot; some offer nothing. So the first move is to look up your state's specific policy — search your state's name plus 'aid for undocumented students,' or ask a college's financial aid office directly.",
      },
      {
        type: "h2",
        text: "Three more places money comes from",
      },
      {
        type: "list",
        items: [
          "**The college itself.** Some schools — especially well-funded private ones — offer their own aid to undocumented students. Ask each school point-blank what they provide.",
          "**Private scholarships.** Many don't require citizenship or an SSN. Search specifically for ones that say so; organizations like TheDream.US exist precisely for this.",
          "**Work, if you have DACA.** A work permit lets DACA recipients earn legally, which can help cover costs and may affect how some states treat you.",
        ],
      },
      {
        type: "tip",
        text: "When you search scholarships, filter for 'no citizenship required' or 'open to undocumented students.' There are real, sizable ones — your status doesn't disqualify you from private money.",
      },
      {
        type: "key",
        text: "These rules change with politics and differ by state, so don't rely on a rumor or an old web page. Talk to a college access counselor or an immigrant-rights organization — many help students through this for free, and they know what's true right now.",
      },
      {
        type: "p",
        text: "It's more work than it should be, and that's not fair. But 'harder' isn't 'impossible' — and the people who've done it before you left a trail. Use it.",
      },
    ],
    related: ["finding-scholarships", "fafsa-step-by-step", "grants-loans-scholarships"],
  },
];
