# Quiz Specification

This is the full spec for the "Find Your Path" quiz, decided in planning conversations before this project had direct file access. Preserved here in full so it never has to be re-created from a chat transcript again. If anything here needs to change, edit this file and the code together.

Topic IDs used throughout (match `lib/topics.ts` and the `/learn/*` routes):

| Topic ID | Label | Route |
|---|---|---|
| `credit` | Credit Scores & Building Credit | `/learn/credit` |
| `budgeting` | Budgeting & Financial Planning | `/learn/budgeting` |
| `taxes` | Taxes & Filing Basics | `/learn/taxes` |
| `college` | Student Loans & College Planning | `/learn/college` |
| `investing` | Getting Started with Investing | `/learn/investing` |
| `home-ownership` | Home Ownership | `/learn/home-ownership` |
| `government-aid` | Government Aid & Debt Relief | `/learn/government-aid` |

---

## 1. Flow Overview

```
Welcome Screen
  -> Q1 (age)
  -> Q2 (situation)
  -> Q3 (topics, multi-select)
  -> Q4 (what's helpful, multi-select)
  -> Q5 (confidence)
  -> Q6 (knowledge check - dynamically built from Q3 + Q5)
  -> Results
```

One question per screen, with a progress indicator. Results screen is a single scrollable page.

---

## 2. Welcome Screen

- **Headline:** "Find Your Path to Financial Freedom" — *update wording to fit the "Empower" rebrand (e.g. "Find Your Starting Point" to match the homepage hero CTA).*
- **Subtext:** "Answer a few quick questions and we'll point you to the tools, guides, and resources that are most relevant to you — no jargon, no pressure, completely free."
- **CTA:** "Start the Quiz →"

---

## 3. Question 1 — Age

**"How old are you?"**
*Helper text: This helps us make sure the resources we recommend are relevant to your stage of life.*

| id | Label |
|---|---|
| `under-18` | Under 18 |
| `18-27` | 18–27 |
| `28-40` | 28–40 |
| `41-plus` | 41 and older |
| `prefer-not-say` | Prefer not to say |

Single select.

---

## 4. Question 2 — Situation

**"Which best describes your current situation?"**
*Helper text: Select the one that fits best.*

| id | Label |
|---|---|
| `student` | I'm a student (high school or college) |
| `working` | I'm working full-time or part-time |
| `between-jobs` | I'm between jobs or currently unemployed |
| `retired` | I'm retired or semi-retired |
| `parent` | I'm a parent or caregiver managing household finances |

Single select.

---

## 5. Question 3 — Topics

**"What topics would you like to learn more about?"**
*Helper text: Select all that apply. We'll build your personalized resource list from these.*

| id | Label |
|---|---|
| `credit` | 💳 Credit scores and building credit |
| `budgeting` | 💰 Budgeting and managing money day-to-day |
| `college` | 🎓 Student loans, college planning, and scholarships |
| `investing` | 📈 Investing and growing wealth |
| `home-ownership` | 🏡 Renting or buying a home |
| `government-aid` | 🏥 Government aid, benefits, and debt relief |
| `taxes` | 🧾 Taxes and filing basics |
| `not-sure` | 📊 I'm not sure, help me figure it out |

Multi-select. The emojis are intentional — they make the options feel less intimidating for younger users.

`not-sure` is **combinable** with specific topics (it's a plain toggle, not exclusive). Behavior depends on whether any real topics were also chosen:

- **Real topics chosen** (with or without `not-sure`): run the normal knowledge check on those topics, and base "where to start" on them. `not-sure` just rides along.
- **Pure `not-sure`** (no real topics): treat it as "all topics" for the "where to start" guidance, *and* run a short **general knowledge check** — a fixed, always-beginner spread of one question each from a few foundational topics (`GENERAL_KC_PICKS`: budgeting, credit, money-safety, taxes). Results show a single combined "Quick knowledge check X/N" card plus the "let's figure it out together" framing. (Previously pure `not-sure` skipped the check entirely, which felt odd for someone who'd asked to test their knowledge.) Like any knowledge check, it's skippable via the in-check skip footer.

---

## 6. Question 4 — What Would Help

**"What would be most helpful to you right now?"**
*Helper text: Select all that apply.*

| id | Label |
|---|---|
| `clear-path` | Point me to the right place to start |
| `tools` | Give me tools I can use right now (calculators, budget planners) |
| `aid-scholarships` | Help me find financial aid, scholarships, or government programs |
| `test-knowledge` | Let me test what I already know with a quiz |
| `browse` | I just want to browse and figure things out myself |

Multi-select. Used to pick which resource cards appear in results (e.g. `tools` → feature the Tools hub card; `aid-scholarships` → feature Government Aid / Scholarship Finder card).

---

## 7. Question 5 — Confidence

**"How confident do you feel about your finances?"**

| id | Label | Knowledge-check tier |
|---|---|---|
| `starting-out` | Just starting out | beginner |
| `finding-footing` | Finding my footing: I know a little but have a lot of questions | beginner |
| `getting-there` | Getting there: I understand the basics and want to go deeper | advanced |
| `pretty-confident` | Pretty confident: I want to sharpen specific skills or fill in gaps | advanced |

Single select. This answer sets the **tier** (`beginner` or `advanced`) used to pick knowledge-check questions in Q6, and is also one of the inputs to the Financial Profile in results.

---

## 8. Question 6 — Knowledge Check

For each real topic selected in Q3, pull **2 questions** from that topic's bank at the tier from Q5. Score = number correct per topic (0–2). If *only* `not-sure` was selected (no real topics), run the general check instead (see §5).

The knowledge check is intentionally not too hard — the goal is calibration, not a test people can fail. Beginner tiers test definitions/recall; advanced tiers test application and judgment calls (not just recall).

**Gentle in-flow feedback (July 2026 owner request).** Answering a knowledge-check question *locks* its options and reveals the result right there, before advancing: the correct option turns green (check), a wrong pick turns terracotta (×), the rest dim. A soft callout below nudges — a warm one-liner (`KC_WRONG` / `KC_RIGHT` in `QuizFlow.tsx`, keyed by the question's within-topic index so back-to-back questions don't repeat) that, on a miss, names the correct answer. Tone stays encouraging by design ("Not quite, and that's completely okay. The answer is …"), never punitive — the check is still calibration, this just makes it personal and teaches in the moment. The reveal is presentation-only; scoring, results feedback, and the confidence-mismatch messages are unchanged.

**The knowledge check is optional.** Some people don't like being quizzed and just want the self-assessment (Q1–Q5) + recommendations. So when the knowledge check is showing, a footer under the nav offers two opt-outs: **"Skip this question"** (advances without answering — that question simply scores as not-correct) and **"Skip to my results"** (sets a `skippedKc` flag and jumps straight to results). When `skippedKc` is set, the results page suppresses the per-topic score feedback entirely (no misleading 0/2 scores) and shows a "Based on what you told us" note instead — recommendations are still driven by Q1–Q5. `skippedKc` is persisted in the saved snapshot so a resumed result matches.

### 💳 Credit

**Beginner**

1. What is a credit score?
   - A record of everything you've ever bought
   - **A number that shows lenders how likely you are to repay debt** ✓
   - Your bank account balance
   - A score you get in a financial class
2. Which of these would help build your credit?
   - Paying your bills late
   - Never using a credit card
   - **Making on-time payments consistently** ✓
   - Closing all your accounts

**Advanced**

1. You have three credit cards. Card A has a $500 limit and $400 balance. Card B has a $2,000 limit and $200 balance. Card C has a $1,000 limit and $0 balance. What is your overall credit utilization rate?
   - 20%
   - 29%
   - 40%
   - **17%** ✓ *(answer key corrected July 2026: $600 / $3,500 ≈ 17%)*
2. You're about to apply for a mortgage and want to maximize your credit score first. You have 6 months. Which strategy is most effective?
   - Open two new credit cards to increase your available credit
   - **Pay down revolving balances and avoid any new credit applications** ✓
   - Close your oldest accounts to simplify your credit profile
   - Dispute all negative items regardless of accuracy
3. *(spare/optional)* You co-signed a loan for a friend two years ago. They've been paying on time, but they just told you they can no longer afford the payments. What is your risk?
   - None — it's their loan, not yours
   - **You may be responsible for the full remaining balance and any missed payments will appear on your credit report** ✓
   - You'll only owe half since you co-signed
   - Your credit is protected because you didn't take out the loan yourself

### 💰 Budgeting

**Beginner**

1. What is a budget?
   - A limit on how much you can earn
   - **A plan for how you'll spend and save your money** ✓
   - A type of bank account
   - A government program for low-income families
2. Which of these is an example of a "need"?
   - A new pair of sneakers
   - A streaming subscription
   - **Rent or housing costs** ✓
   - A dinner out with friends

**Advanced**

1. You earn $3,000 per month after taxes. Using the 50/30/20 rule, how much should go toward savings?
   - $900
   - $1,500
   - **$600** ✓
   - $300
2. You've been overspending in your "wants" category for three months. What's the most effective first step?
   - Cancel all discretionary spending immediately
   - **Review your last 3 months of transactions and identify patterns** ✓
   - Move money from your savings to cover it
   - Ignore it, it will balance out eventually

### 📈 Investing

**Beginner**

1. What is a stock?
   - A type of savings account with guaranteed returns
   - **A share of ownership in a company** ✓
   - A loan you give to a business
   - A government bond
2. Why do people invest money instead of just saving it?
   - Investing is always safer than saving
   - Investing has no risk
   - **Investing can grow money faster than a savings account over time** ✓
   - Banks require you to invest

**Advanced**

1. What does it mean when a portfolio is "diversified"?
   - All investments are in one high-performing stock
   - **Investments are spread across different asset classes to reduce risk** ✓
   - Only international stocks are included
   - The portfolio has never lost value
2. An investor puts $5,000 into an index fund with an average annual return of 7%. Roughly how much will it be worth in 10 years (assuming compound growth)?
   - Around $6,000
   - Around $7,500
   - **Around $9,800** ✓
   - Around $12,000

### 🧾 Taxes

**Beginner**

1. What is a W-2?
   - A form you fill out to get a refund faster
   - **A document from your employer showing your earnings and taxes withheld** ✓
   - A type of savings account
   - A form only self-employed people use
2. When is the typical federal tax filing deadline in the U.S.?
   - January 1st
   - **April 15th** ✓
   - June 30th
   - December 31st

**Advanced**

1. What is the difference between a tax deduction and a tax credit?
   - They are the same thing
   - **A deduction reduces your taxable income; a credit directly reduces your tax bill** ✓
   - A credit reduces your taxable income; a deduction reduces your tax bill
   - Deductions only apply to businesses
2. You're self-employed and made $50,000 this year. What additional tax responsibility do you have that a salaried employee typically doesn't?
   - You don't owe any taxes
   - **You must pay self-employment tax to cover Social Security and Medicare** ✓
   - You automatically get a larger refund
   - You file using a W-2

### 🎓 College & Scholarships

**Beginner**

1. What is FAFSA?
   - A scholarship only for honor students
   - **A free application that determines eligibility for federal financial aid** ✓
   - A type of student loan with high interest
   - A college entrance exam
2. What is the difference between a grant and a student loan?
   - They are the same thing
   - Grants must be repaid; loans do not
   - **Grants do not need to be repaid; loans do** ✓
   - Loans are always better than grants

**Advanced**

1. What is the "Student Aid Index" (SAI) on the FAFSA and how does it affect your aid? *(updated July 2026: the FAFSA replaced EFC with the SAI)*
   - It's the amount your school expects you to fundraise
   - **It's a number used to determine how much financial aid you're eligible for, and a lower SAI generally means more aid** ✓
   - It's only relevant for graduate students
   - It's the total cost of attendance at your school
2. A college's "Cost of Attendance" is $45,000 and your financial aid package is $30,000. What is your "unmet need" if your Student Aid Index is $5,000?
   - $15,000
   - **$10,000** ✓
   - $20,000
   - $40,000

### 🏡 Home Ownership

**Beginner**

1. What is a mortgage?
   - A type of savings account for buying a home
   - **A loan used to purchase a home, repaid over time with interest** ✓
   - A government grant for first-time buyers
   - A home inspection report
2. What does a down payment mean when buying a house?
   - The monthly fee you pay your landlord
   - **The upfront amount you pay toward the home's purchase price** ✓
   - A penalty for paying your mortgage late
   - The cost of homeowner's insurance

**Advanced**

1. You're comparing a 15-year and a 30-year mortgage for the same home. What is the main trade-off?
   - The 30-year has higher monthly payments but less total interest
   - The 15-year has lower monthly payments but more total interest
   - **The 15-year has higher monthly payments but you pay significantly less interest overall** ✓
   - There is no meaningful difference
2. What does it mean for a home to be "underwater"?
   - The home has flood damage
   - **The homeowner owes more on the mortgage than the home is currently worth** ✓
   - The home failed inspection
   - The property taxes exceed the mortgage payment

### 🏥 Government Aid & Debt Relief

**Beginner**

1. What is Medicaid?
   - A savings account for medical expenses
   - **A government health insurance program for people with low income** ✓
   - A type of private health insurance
   - A prescription discount card
2. What does "debt relief" mean?
   - Getting a second job to pay off debt
   - **Programs or strategies that reduce, restructure, or eliminate what you owe** ✓
   - A penalty for not paying your bills
   - A type of credit card

**Advanced**

1. What is the difference between Chapter 7 and Chapter 13 bankruptcy?
   - They are the same process with different names
   - **Chapter 7 liquidates assets to discharge debt; Chapter 13 creates a repayment plan while keeping assets** ✓
   - Chapter 13 is only for businesses
   - Chapter 7 requires a repayment plan
2. Which federal student loan repayment plan bases your monthly payment on your income and family size?
   - Standard Repayment Plan
   - Graduated Repayment Plan
   - **Income-Driven Repayment (IDR)** ✓
   - Extended Repayment Plan

---

## 9. Results Screen

Always renders in this order:

### Part 1 — Your Financial Profile

A 1–2 sentence personalized summary generated from **Q1 (age) + Q2 (situation) + Q5 (confidence)**.

Formula: **[who they are] + [honest acknowledgment of where they are] + [forward-looking statement]**

Reference examples (use as tone models, not a literal lookup table — write one per situation x rough age/confidence band):

- *High school student, just starting:* "You're a high school student just getting started with finances, and showing up this early puts you ahead of the curve."
- *Young professional:* "You're a young professional building the foundation of your financial life. You've got the basics down — now it's time to put them to work."
- *Working adult with questions:* "You're navigating finances as a working adult with some real questions. You're not starting from zero, and we're going to help you fill in the gaps."
- *Older / big decisions ahead (28-40+, advanced confidence):* "You're at a stage where the decisions you make — about homeownership, investing, and planning — have serious long-term impact. Let's make sure you have the right information."
- *Parent/caregiver:* "You're managing a household and juggling a lot. We'll focus on the tools and resources that give you the most value for your time."

### Part 2 — Your Knowledge Check Feedback

Per real topic selected (for *pure* `not-sure`, show the single combined general-check card instead; if the user skipped the knowledge check via `skippedKc`, show the "Based on what you told us" note in place of scores), one of five tones based on knowledge-check score (0/1/2 correct) vs. stated confidence tier:

- **Scored well (2/2 correct):** "Your answers on [topic] show you've got a solid foundation. We'll point you to some deeper resources to keep building on that."
- **Scored partially (1/2 correct):** "You know some of the basics on [topic], but there are some gaps worth filling. We'd suggest starting with our intro guide before jumping to the advanced material."
- **Scored low (0/2 correct):** "[Topic] might be newer territory for you than you thought, and that's okay. We'd recommend starting from the beginning on this one. It's more straightforward than it seems."
- **Confidence mismatch — said confident, scored low** (tier was `advanced` but score is 0): "You mentioned feeling confident about [topic], but some of these questions tripped you up. That happens to a lot of people, and the gaps are usually specific and easy to fill. We've put the foundational resources first so you can build a stronger base."
- **Confidence mismatch — said beginner, scored well** (tier was `beginner` but score is 2): "You said you were just getting started, but your answers on [topic] suggest you know more than you think. Don't sell yourself short: we've included some intermediate resources."

> The confidence-mismatch messages are the most important part — they're what makes the quiz feel honest rather than just flattering. Don't cut these.

### Part 3 — Where to Start

A short numbered list (2–3 items) that prioritizes the user's selected topics, ordered by situation (Q2), with "working" further split by confidence tier (Q5):

| Situation | Suggested order |
|---|---|
| Student, age `under-18` | Budgeting → Credit → College & Scholarships |
| Student, any other age | College & Scholarships → Credit → Budgeting |
| Working, beginner tier | Budgeting → Credit → Taxes |
| Working, advanced tier | Investing → Home Ownership → Taxes |
| Between jobs | Government Aid → Budgeting → Credit |
| Retired | Investing → Government Aid → Taxes |
| Parent / caregiver | Budgeting → College & Scholarships → Government Aid |

**Implementation note:** filter this default order down to topics the user actually selected in Q3. If fewer than 2 remain, fill in from the user's other Q3 selections (in the order they were selected) until there are 2–3. If `not-sure` was selected, just use the situation's default order as-is.

Output format:

> "Based on your answers, here's the order we'd suggest tackling your topics:"
> 1. **Start here: [Topic]** — [one sentence on why this comes first]
> 2. **Then: [Topic]** — [one sentence]
> 3. **When you're ready: [Topic]** — [one sentence]

### Part 4 — Your Resource Cards

3–5 cards, each with a title, one-sentence description, and a link. Pulled from Q3 (topics) + Q4 (what would help) + tier (Q5).

Reference examples:

- *Beginner, selected Credit:* "What Is a Credit Score, and Why Does It Matter? A plain-English breakdown of how credit scores work, what affects them, and how to start building yours from zero." → links to `/learn/credit`
- *Between jobs, selected Government Aid:* "Benefits & Programs You May Qualify For — A breakdown of federal and state programs, from food assistance to unemployment, and how to apply." → `/learn/government-aid`
- *Advanced/confident, selected Investing:* "Beyond the Basics: Building a Real Investment Strategy — Index funds, asset allocation, and how to think about risk. For anyone ready to go deeper than 'open a Roth IRA.'" → `/learn/investing`
- *Q4 included `tools`:* "Tools & Calculators — Budget planners, debt payoff calculators, and more, built to help you understand your numbers and make smarter decisions." → `/tools`
- *Q4 included `test-knowledge`:* "Keep Going: More Quizzes by Topic. Ready to go deeper? Take a focused quiz on any topic to sharpen what you know." → `/learn` (topic quiz hub, once it exists)

### Closing line

> "Bookmark this page or take a screenshot: your results don't expire, and you can retake the quiz whenever your situation changes."

---

## 10. Site Map (context for where Resource Cards link)

Top-level nav: **Start Here / Learn / Tools / Resources / Blog / About**

- **Start Here:** Take the Quiz, How to Use This Website, Glossary of Financial Terms, FAQs
- **Learn:** Credit Scores & Building Credit, Budgeting & Financial Planning, Taxes & Filing Basics, Student Loans & College Planning, Getting Started with Investing, Home Ownership, Government Aid & Debt Relief, Test Your Knowledge (hub for topic quizzes)
- **Tools:** Budget Planner, Debt Payoff Calculator, Savings Goal Calculator, College Cost Estimator, Downloadable Templates
- **Resources:** Scholarship Finder, Government Benefits & Programs, Local Financial Help, Helpful Links
- **Blog:** no dropdown, links straight to `/blog`
- **About:** Our Mission, Who We Are, Contact Us

Many of these pages don't exist yet — mark as "Coming Soon" rather than omitting from nav/results, so resource cards always have *somewhere* to point.

---

## 11. Topic ("Learn") Page Template

Each `/learn/[topic]` page is a **hub**, not a wall of text — short intro, then cards/buttons branching into focused articles. Standard structure:

1. **Page header** — plain-English headline (not just the topic name), one-sentence subheadline, read time + difficulty tag, "Last updated: [month, year]"
2. **Start Here** — 2-3 beginner articles max, so first-time visitors aren't overwhelmed
3. **Go Deeper** — intermediate articles
4. **Advanced Topics** — for people past the basics
5. **Test Your Knowledge** — links to that topic's quiz (beginner + advanced versions, drawn from the bank in section 8)
6. **Tools & Calculators** — relevant calculator(s), if any
7. **Resources** — trusted external links (with disclosure if anything is ever an affiliate/sponsored link)
8. **Related Topics** — 3 links to other Learn pages that naturally connect

Per-article template (for the actual content pages under each hub):

1. Header: plain-English headline, one-sentence subheadline, read time + difficulty + last-updated
2. Quick Summary box (3-4 "what you'll learn" bullets)
3. The Basics (7th-8th grade reading level, short sections)
4. Why It Matters to You (concrete numbers/scenarios, not generalities)
5. Step-by-Step: What to Actually Do (numbered, specific actions)
6. Common Mistakes (3-5)
7. Glossary callouts linking to `/glossary`
8. Tools & Calculators (if applicable)
9. Related Topics (3 links)
10. Test Your Knowledge (mini 3-question quiz)
11. Footer CTA — one clear next step only

Rules: one topic per page, mobile-first, no undisclosed product recommendations.
