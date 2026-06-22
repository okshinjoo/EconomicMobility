# Content Roadmap — toward 100+ articles

Current count: **142** across **9 topics** (**Budgeting 26**, Credit 16, Taxes 14,
College 15, **Investing 25**, Home 16, Government Aid 16, Protecting Your Money 9,
**Insurance 5** — new 9th topic). Latest batch added: remittances, pay stub,
prioritizing bills, bank fees, money mindset/stress/family-talks, job offers,
raises, side hustles, first paycheck (Budgeting); payday/predatory lending
(Gov Aid); Buy Now Pay Later (Credit); payment-app safety (Money Safety); renting
your first apartment (Home); and the new Insurance topic (how insurance works,
health insurance, choosing a plan, auto, life).
The ★ mission-critical articles are done, each original topic is rounded out to
~15, and the new scams/fraud topic is live. Investing was expanded with a
cash-savings + retirement-accounts cluster (HYSA, CDs, CD laddering, what-is-a-401k,
what-is-an-ira, retirement/tax-advantaged overview, Roth-vs-Traditional, 401k-vs-IRA,
HSA, bonds — in `lib/articles/investingSavings.ts` / `investingRetirement.ts` /
`investingAccounts.ts`). The "extra" batches live in `lib/articles/<topic>Extra.ts`
(merged by `topicId` in `index.ts`).

**Done since 104:** (1) a human accuracy pass on the agent-written drafts — the
Government Aid batch and the verifiable numbers across Taxes/Investing/Credit/
Home were reviewed and came back clean (evergreen framing, no dated hardcoded
limits, sensitive topics route to official sources/free help). (2) The new
**Protecting Your Money** topic (`money-safety`) was scaffolded end-to-end
(`topics.ts`, `learnContent.ts`, `quizData.ts` records + Q3 option) and given 8
articles.

**Still optional:** the remaining new topics below (Insurance, Earning More,
Money & Your Head). This file is the working plan — add articles to
`lib/articles/<topic>.ts`, and they appear in the topic roadmap automatically
(grouped by `level`).

## Principles
- **Skip** NerdWallet/Bankrate's product reviews and rate articles ("best HYSA,"
  "CD rates for June," card reviews). They're lead-gen, go stale, and aren't
  education. We keep the evergreen explainers and how-tos.
- **Double down** on what those sites barely cover but our audience lives every
  day — marked **★** below. This is our edge: no-SSN/ITIN credit and taxes,
  undocumented/DACA aid, tenant rights, debt-collector rights, benefits without
  shame, supporting family. NerdWallet won't write these; we must.
- Match the **humanized voice** of the rewritten Budgeting topic (warm, specific,
  audience-aware, no fabricated founder anecdotes).

---

## Budgeting & Income — have 8, +7 → 15
✓ Building Your First Budget · Needs vs. Wants · The 50/30/20 Rule · Budgeting on
an Irregular Income · Why Your Budget Keeps Breaking · Helping Family Without
Sinking Yourself ★ · Opening Your First Bank Account · Sinking Funds
- Budgeting methods compared (zero-based, envelope, pay-yourself-first)
- How to actually track your spending (apps, notebook, the simple way)
- **Unbanked & underbanked: getting into the banking system safely ★**
- What is APY / interest on your savings, in plain terms
- Cutting costs without making life miserable (saving on a tight budget)
- Cost of living: what it really takes to live in your city
- Building a savings habit that sticks (automating, challenges)

## Credit — have 6, +9 → 15
✓ What Is a Credit Score · Build Credit From Zero · Reading Your Credit Report ·
Credit Utilization · What Hurts Your Score · Repairing Credit
- **Building credit with no SSN / as an immigrant (ITIN, secured cards, credit-builder loans) ★**
- How credit cards actually work (interest, grace period, the statement)
- Choosing your first credit card (student & secured)
- How to pay off a credit card — and stay off the treadmill
- Checking your credit for free (the 3 bureaus, AnnualCreditReport)
- Disputing an error on your credit report
- Hard vs. soft inquiries (what actually dings your score)
- **Credit myths your family may have taught you ★**
- Credit freezes & fraud alerts: when and how

## Taxes — have 6, +8 → 14
✓ Filing Your Taxes for the First Time · What All Those Forms Mean · Do You Even
Need to File? · Deductions vs. Credits · Free Ways to File · Self-Employment Taxes
- Your tax refund, explained (and why a huge one isn't a gift)
- How to fill out a W-4 so your paycheck is right
- **The Earned Income Tax Credit (EITC): money low-income workers leave behind ★**
- **Filing taxes with an ITIN (no SSN) ★**
- Tax brackets, explained (earning more never costs you money)
- Gig & 1099 taxes: what to set aside
- What to do if you can't pay your tax bill
- Education tax credits (American Opportunity & Lifetime Learning)

## College — have 6, +9 → 15
✓ FAFSA, Step by Step · Grants vs. Loans vs. Scholarships · Finding Scholarships ·
Reading a Financial Aid Award Letter · Understanding Your Unmet Need · Student
Loans, Before You Sign
- Federal vs. private student loans (and why federal first)
- Subsidized vs. unsubsidized loans
- Work-study, explained
- **Undocumented & DACA students: paths to paying for college ★**
- The community college path (and transferring up)
- In-state vs. out-of-state tuition & residency
- Appealing your financial aid (the letter that gets more money)
- Common FAFSA mistakes that cost you aid
- Getting through college with as little debt as possible

## Investing — have 6, +9 → 15
✓ What a Stock Actually Is · Saving vs. Investing · Opening Your First Account ·
Index Funds, Explained · Risk, Diversification, and Time · Building a Real
Long-Term Strategy
- The Roth IRA, explained (a young person's superpower)
- 401(k) and the free money of an employer match
- **How to start investing with $50 ★**
- ETF vs. mutual fund vs. index fund
- The magic of compound interest (the start-early math)
- Dollar-cost averaging: investing without timing the market
- Common beginner mistakes that cost real money
- Retirement basics when it's 40 years away
- A calm word on crypto (and hype in general)

## Home Ownership & Renting — have 6, +9 → 15
✓ Renting vs. Buying · What a Mortgage Really Is · How Much Down Payment ·
15- vs. 30-Year Mortgages · The Hidden Costs of Owning · What 'Underwater' Means
- **Renting 101: your rights as a tenant (leases, deposits, red flags) ★**
- **Renters insurance: cheap protection most renters skip ★**
- Getting your security deposit back
- Saving for a down payment, realistically
- First-time homebuyer programs & assistance
- What credit score you actually need to buy
- Getting pre-approved (and what lenders look at)
- PMI, explained — and how to get rid of it
- Closing costs: the fees nobody warns you about

## Government Aid & Debt Relief — have 6, +9 → 15
✓ Benefits You May Qualify For · How to Actually Apply · What 'Debt Relief' Means ·
Income-Driven Repayment · Negotiating Debt · Bankruptcy, Explained
- SNAP, explained (eligibility, applying, using it without shame)
- Medicaid & low-cost health coverage
- How to apply for unemployment
- **Your rights against debt collectors (and how to use them) ★**
- Debt settlement vs. consolidation vs. counseling — which is which
- **Avoiding debt-relief and "fix your credit fast" scams ★**
- Student loan forgiveness programs (PSLF and friends)
- Utility & rent assistance (LIHEAP, emergency funds)
- **Immigrants & public benefits: what's safe to use (public-charge basics) ★**

**Subtotal across 7 topics: ~104 articles.** Past 100 without new topics.

---

## Optional new topics (more reach, bigger lift — needs a `TopicId` + quiz entry)
- ~~**Protecting Your Money (scams & fraud) ★**~~ — **DONE (8 articles).**
  how-to-spot-a-scam · identity-theft · phishing-scams · fake-check-scams ·
  romance-scams · protecting-your-documents · if-youve-been-scammed ·
  immigrant-scams ★ (notario fraud, fake USCIS/IRS calls, fee scams). Reviewed for
  accuracy (FTC/IC3/IdentityTheft.gov reporting channels; routes immigration help
  to licensed attorneys / DOJ-accredited reps only).
- **Insurance Basics** — health insurance 101, picking a plan, renters/auto, do
  you need life insurance. (~5)
- **Earning More** — your first-job money checklist, asking for a raise, side
  hustles honestly, freelancing/1099 basics. (~5)
- **Money & Your Head** — money scripts you inherited, scarcity mindset, talking
  about money, financial stress. (~4)

---

## Suggested build order
1. The **★ mission-critical** articles first (no-SSN credit, ITIN taxes,
   undocumented aid, tenant rights, debt-collector rights, immigrants & benefits,
   EITC, unbanked) — these are the ones no other site serves.
2. Then round out each existing topic to ~15.
3. Then consider the **Protecting Your Money** topic.

Build method that worked for the first 42: write 1 reference article in the
humanized voice, then fan out parallel agents per topic against it, then verify
the build + related-link integrity.
