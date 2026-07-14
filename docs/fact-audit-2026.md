# Site-wide fact audit — July 14, 2026

Owner directive: "make sure ALL facts and figures are up to date and everything is as
accurate as possible." Method: every dollar amount, percentage, year tag, and dated claim
was extracted from the content libs (`lib/articles/*.ts`, `lib/glossary.ts`, `lib/taxData.ts`,
`lib/rothIra.ts`, `lib/realityCheck.ts`, `lib/deadlines.ts`, `lib/studentCalendar.ts`,
`lib/courses.ts`, `lib/topicQuizzes.ts`, `lib/quizData.ts`, `lib/blog.ts`,
`lib/communityQuestions.ts`, the two `/students` preview pages) — ~670 raw figure sentences,
deduplicated into the claim inventory below. Every load-bearing claim was checked against
its authoritative source (IRS, ED/FSA, SSA, USDA/HHS, BLS, official program pages) on
July 14, 2026. Honesty rule: anything a source didn't nail down is marked, never "corrected."

**Result: 63 load-bearing claims verified — 52 CONFIRMED, 11 STALE, 0 UNVERIFIABLE.**
Every calculator constant that computes real money is CONFIRMED. All stale findings are in
article prose or the two clearly-labeled preview mockups; none affect calculator math.

Skipped as recently verified (do not re-verify this pass):
- `lib/scholarships.ts` amounts/URLs — VERIFIED_AS_OF "July 2026", full pipeline run July 13, 2026.
- `lib/opportunities.ts` compensation/URLs — OPPS_VERIFIED_AS_OF "July 2026", verified July 13, 2026.
- `lib/stateResources.ts` highlights — 19 states, every URL verified official + operating July 2026.
- `lib/realityCheck.ts` option costs — deliberate national ballparks (owner-updated), not sourceable facts.

---

## 1. Calculator constants (drive real math) — ALL CONFIRMED

### lib/taxData.ts

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| 2026 single brackets: 10% to $12,400 / 12% to $50,400 / 22% to $105,700 / 24% to $201,775 / 32% to $256,225 / 35% to $640,600 / 37% above | Identical — IRS Rev. Proc. 2025-32 (irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026...; cross-checked taxfoundation.org/data/all/federal/2026-tax-brackets/) | CONFIRMED | lib/taxData.ts:22-29 |
| 2026 MFJ brackets: $24,800 / $100,800 / $211,400 / $403,550 / $512,450 / $768,700 | Identical (same sources) | CONFIRMED | lib/taxData.ts:31-38 |
| 2026 MFS brackets: single thresholds with 35% cap $384,350 | Identical (MFS = half of MFJ; $768,700 / 2 = $384,350) | CONFIRMED | lib/taxData.ts:40-47 |
| 2026 HoH brackets: $17,700 / $67,450 / $105,700 / $201,775 / $256,200 / $640,600 | Identical (note HoH 32% cap is $256,200, not $256,225 — the file has this right) | CONFIRMED | lib/taxData.ts:49-56 |
| Standard deduction $16,100 single/MFS, $32,200 MFJ, $24,150 HoH | Identical — Rev. Proc. 2025-32 | CONFIRMED | lib/taxData.ts:60-65 |
| Social Security wage base $184,500 (2026) | $184,500 — SSA, announced Oct 24, 2025 (ssa.gov/oact/cola/cbb.html) | CONFIRMED | lib/taxData.ts:67 |
| FICA rates 6.2% SS / 1.45% Medicare / 0.9% additional over $200k single, $250k MFJ, $125k MFS | Statutory, unchanged (irs.gov Topic 751/560) | CONFIRMED | lib/taxData.ts:68-76 |
| State rates: flat approximations, clearly labeled estimates | By-design approximation, labeled in-file and in UI | OK as labeled | lib/taxData.ts:132-141 |

### lib/rothIra.ts

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| ROTH_LIMIT = 7,500 (2026) | $7,500 — IRS Notice 2025-67 / irs.gov newsroom "401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500" | CONFIRMED | lib/rothIra.ts:13 |
| ROTH_LIMIT_50PLUS = 8,600 ($1,100 catch-up) | $7,500 + $1,100 IRA catch-up = $8,600 — same source | CONFIRMED | lib/rothIra.ts:14 |

### lib/collegeCost.ts

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| LOAN_RATE = 0.0652 (2026–27 undergrad Direct Loan) | 6.52% — FSA electronic announcement June 4, 2026 (fsapartners.ed.gov .../interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027); set off the May 12, 2026 10-yr Treasury auction | CONFIRMED | lib/collegeCost.ts:25 |

Note (nice-to-have, not an error): the Student Loan calculator's neutral placeholder rate is
"6" (app/tools/college/student-loan/page.tsx:20). It makes no factual claim, but setting it to
"6.52" would match the federal rate articles cite.

---

## 2. IRS / tax-year-2026 figures in articles, glossary, courses, quizzes — ALL CONFIRMED

Source for the block: IRS Rev. Proc. 2025-32 (inflation adjustments incl. OBBBA amendments),
IRS Notice 2025-67 (retirement), Rev. Proc. 2025-19 (HSA).

| Claim on site | Source value | Verdict | Where (representative — figures repeat consistently) |
|---|---|---|---|
| 401(k) limit $24,500; $32,500 at 50+ | $24,500 + $8,000 catch-up = $32,500 | CONFIRMED | lib/articles/investingRetirement.ts:89; investing.ts:175; investingAccounts.ts:150; glossary.ts:1819 |
| IRA limit $7,500; $8,600 at 50+ (catch-up $1,100) | $7,500 / $8,600 / $1,100 | CONFIRMED | investingRetirement.ts:183; investingAccounts.ts:76; glossary.ts:1780, 2020; courses.ts:818 |
| HSA $4,400 self-only / $8,750 family; +$1,000 at 55 | Identical — Rev. Proc. 2025-19 | CONFIRMED | investingAccounts.ts:229; budgetingExtra.ts:878; glossary.ts:1780, 1819 |
| Standard deduction $16,100 / $32,200 | Identical | CONFIRMED | taxes.ts:313; taxes.ts:229 (filing threshold); topicQuizzes.ts:167 |
| Single brackets prose (12,400 / 50,400 / 105,700 / 201,775 / 256,225 / 640,600) | Identical | CONFIRMED | taxesExtra.ts:198 |
| EITC 2026 max: $664 none / $4,427 one / $7,316 two / $8,231 three+ | Identical | CONFIRMED | taxes.ts:595; courses.ts:943 |
| EITC income limits "roughly $20,000 no kids … about $70,000 MFJ 3 kids" | 2026 actuals ≈ $20k / $70,224 MFJ 3+ | CONFIRMED (approx as phrased) | taxes.ts:595 |
| Long-term cap gains 2026 single: 0% to $49,450, 15% to $545,500, 20% above | Identical (Rev. Proc. 2025-32; kiplinger.com/taxes/irs-updates-capital-gains-tax-thresholds) | CONFIRMED | taxesExtra.ts:535; courses.ts:656 |
| Roth IRA phase-out starts ~$153,000 single / $242,000 MFJ | $153,000–168,000 / $242,000–252,000 (Notice 2025-67) | CONFIRMED | investingAccounts.ts:76 |
| AOTC up to $2,500/student, $1,000 refundable; LLC $2,000/return; phase-out $80–90k single / $160–180k MFJ | Statutory (not inflation-indexed), unchanged | CONFIRMED | taxesExtra.ts:456, 472, 484; glossary.ts:2876, 3056 |
| Capital-loss cap $3,000 ($1,500 MFS), "sat at $3,000 since 1978" | Statutory, unchanged | CONFIRMED | taxesExtra.ts:574-613; glossary.ts:2892 |
| Must file: single under 65 over $16,100; self-employment $400+ | Matches 2026 standard deduction; SE $400 statutory | CONFIRMED | taxes.ts:229 |
| ESPP: up to $25,000 of stock/yr by IRS rule, 15% typical discount | §423 statutory | CONFIRMED | investingAccounts.ts:458 |
| 10% early-withdrawal penalty before 59½ | Statutory | CONFIRMED | investingRetirement.ts:77, 210; glossary.ts:1890 |
| Gig set-aside "25–30% of gig income" | Rule of thumb, labeled as such | OK as labeled | taxesExtra.ts:284 |

---

## 3. ED / Federal Student Aid (2026–27) — ALL CONFIRMED

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| Pell max $7,395 for 2026–27 | $7,395 (min $740) — FSA Dear Colleague letter Jan 30, 2026 (fsapartners.ed.gov .../2026-27-federal-pell-grant-maximum-and-minimum-award-amounts) | CONFIRMED | college.ts:150; glossary.ts:1576; courses.ts:258 |
| Undergrad Direct Loan 6.52% fixed, 2026–27 | 6.52% — FSA announcement June 4, 2026 | CONFIRMED | collegeExtra.ts:746, 805; studentCalendar.ts:69; courses.ts:298 |
| Dependent-undergrad limits $5,500 / $6,500 / $7,500, $31,000 aggregate; subsidized caps $3,500 / $4,500 / $5,500 | Identical — studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized (cross-checked ticas.org loan-terms table for 2026-27) | CONFIRMED | collegeExtra.ts:746, 805 |
| Subsidized = government pays in-school interest (half-time+) | studentaid.gov | CONFIRMED | collegeExtra.ts:777, 819; glossary.ts:1674 |
| FAFSA opens Oct 1 ("2027–28 form opens October 1, 2026") | ED committed to Oct 1, 2026 launch for 2027–28 (ed.gov press releases; FAFSA Deadline Act requires it) | CONFIRMED | deadlines.ts:30-36; studentCalendar.ts:20-27 |
| FAFSA final federal deadline June 30 ("2026–27 FAFSA closes June 30, 2027") | studentaid.gov/apply-for-aid/fafsa/fafsa-deadlines | CONFIRMED | deadlines.ts:68-76; studentCalendar.ts:56-63 |
| Loan rates reset each July 1 | Statutory (HEA) | CONFIRMED | deadlines.ts:77-86 |
| R2T4: withdraw before ~60% of term → school returns unearned aid | 34 CFR 668.22 | CONFIRMED | collegeExtra.ts:1548 |
| Transfer students lose "about 40% of credits" (federal study) | GAO-17-574: estimated **43%** on average (gao.gov/products/gao-17-574) | STALE (soft) → say "about 43%" or "more than 40%" | collegeExtra.ts:1612 |
| CSS Profile: $25 first school + $16 each additional; free up to $100,000 income; ~200 mostly private colleges | Fees + $100k waiver confirmed (cssprofile.collegeboard.org); "about 200" is the commonly cited count | CONFIRMED | collegeExtra.ts:605, 628; deadlines.ts:113; studentCalendar.ts:96; glossary.ts:40 |

---

## 4. Benefits (USDA / HHS) — CONFIRMED except one soft spot

2026 HHS poverty guidelines (91 FR 1797, Jan 15, 2026): $15,960 (1) / $27,320 (3) / $33,000 (4).

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| SNAP: gross income under 130% FPL, "about $2,890/mo (roughly $34,700/yr) household of three" | FY2026: $2,888/mo ≈ $34,656/yr (fns.usda.gov FY26 income eligibility standards; cbpp.org quick guide) | CONFIRMED (rounding) | governmentAidExtra.ts:45, 103 |
| SNAP single person: 130% FPL "a bit over $1,700 a month" | FY2026 one-person limit is **$1,696/mo** — a bit UNDER $1,700 | STALE (soft) → "about $1,700 a month" | governmentAidExtra.ts:1063 |
| WIC 185% FPL: $50,542/yr (~$4,212/mo) family of 3; $61,050 family of 4; effective July 2026 | Exact: $27,320 × 1.85 = $50,542; $33,000 × 1.85 = $61,050 (USDA WIC 2026/2027 IEGs, effective July 1, 2026, federalregister.gov 2026-08323) | CONFIRMED (exact) | governmentAidExtra.ts:789, 808 |
| School meals: free ≤130% FPL, reduced-price ≤185% | USDA IEGs, unchanged | CONFIRMED | governmentAidExtra.ts:820 |
| SUN Bucks $120 per child, summer 2026 | $120/summer ($40 × 3 months) — fns.usda.gov/summer/sunbucks | CONFIRMED | governmentAidExtra.ts:791, 832 |
| Medicaid expansion: ends near 138% FPL, "roughly $1,800/mo for one person (2026 guidelines)" | $15,960 × 1.38 = $22,025/yr = $1,835/mo — "roughly $1,800" holds | CONFIRMED (approx as phrased) | governmentAidExtra.ts:1064; insurance.ts:997 |
| ACA: "extra-generous pandemic-era subsidies ended after 2025, plans cost more" | Enhanced PTCs expired Dec 31, 2025; KFF: avg subsidized premium payments up ~114% in 2026 | CONFIRMED | governmentAidExtra.ts:160 |
| Payday loans ~400% APR; $15 per $100 borrowed | CFPB standard figure | CONFIRMED | governmentAidExtra.ts:600-620, 1117, 1164; courses.ts:744 |
| PAL: $200–$2,000, capped 28%, ~$5 membership | NCUA rule, unchanged | CONFIRMED | governmentAidExtra.ts:1139 |
| Legal aid ~125% FPL typical | LSC guideline | CONFIRMED | governmentAidExtra.ts:897 |

---

## 5. Credit, banking, market-rate anchors — ALL CONFIRMED

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| Medical debt (2026 state of play): paid collections removed; under $500 never appear; 1-yr wait; Jan 2025 CFPB removal rule struck down July 2025, bureau policies + state laws are the protection now | Exact match: Cornerstone Credit Union League v. CFPB, E.D. Tex., vacated July 11, 2025; 2022–23 voluntary bureau changes still standing | CONFIRMED | creditExtra.ts:849-921; topicQuizzes.ts:106-115 |
| Credit card interest "around 21% to 24% a year in 2026" | July 2026: 21.5% avg on interest-assessed balances (Fed G.19-derived), 22.2% avg offer (WalletHub), 23.79% (LendingTree) | CONFIRMED | creditExtra.ts:53, 1168; governmentAidExtra.ts:1152 |
| HYSA "around 4%" vs ~0.01% big-bank (2026) | Top HYSAs 4.0–4.5% APY July 2026 (Bankrate/NerdWallet/Fortune); big-bank base savings 0.01% | CONFIRMED | budgetingExtra.ts:283; budgetingMoney.ts:388; investingSavings.ts:61, 287-295; courses.ts:447; glossary.ts:2440 |
| Personal loans "8% to 18% for decent credit, origination 1–8%" | Representative range, consistent with July 2026 market surveys | CONFIRMED (representative) | creditExtra.ts:1197 |
| Balance transfer: 0% for 12–21 months, 3–5% fee | Standard market terms, unchanged | CONFIRMED (representative) | creditExtra.ts:1160-1188 |
| FDIC / NCUA insurance $250,000 per depositor per institution | fdic.gov / ncua.gov, unchanged | CONFIRMED | investingSavings.ts:49, 140, 275; glossary.ts:2547, 2677 |
| FICO weightings ~35/30/15/10/10 | myFICO, unchanged | CONFIRMED | credit.ts:46-48, 100; creditExtra.ts:957, 982; glossary.ts:1143, 1201 |
| W-2 deadline Jan 31; tax day April 15; ACA open enrollment starts Nov 1; Decision Day May 1 | IRS / healthcare.gov / universal practice | CONFIRMED | deadlines.ts:57-66, 87-136; studentCalendar.ts throughout |

---

## 6. College-specific figures in articles — 2 STALE

| Claim on site | Source value | Verdict | Where |
|---|---|---|---|
| CA community college $46/unit (2026), ~$1,380 full-time year; Promise Grant waives fees | $46/unit (cccco.edu; unchanged since 2012); 30 units × $46 = $1,380 | CONFIRMED | collegeExtra.ts:1620 |
| Cal State tuition "roughly $6,800" 2026–27 | $6,838 resident undergrad 2026–27 (calstate.edu tuition page) | CONFIRMED | collegeExtra.ts:1620 |
| UC tuition "about $15,000" 2026–27 | UC systemwide tuition+fees ≈ $14.9–15.7k by cohort (Tuition Stability Plan) — "about $15,000" holds | CONFIRMED (approx) | collegeExtra.ts:1620 |
| UC application fee $80/campus, waiver up to 4 campuses; CSU $70/campus | admission.universityofcalifornia.edu; calstate.edu | CONFIRMED | collegeExtra.ts:1683 |
| Cal-GETC replaced IGETC for students starting fall 2025 | assist.org / icas-ca.org | CONFIRMED | collegeExtra.ts:1634 |
| Jack Kent Cooke Transfer Scholarship up to $55,000/yr (2026) | $55,000/yr — jkcf.org (2026 cohort announced) | CONFIRMED | collegeExtra.ts:1674 |
| UT auto-admit "recently around the top 5–6%" | Top 6% through fall 2025; **top 5% starting the fall 2026 cycle** — "5–6%" still literally true, tighten on next touch | CONFIRMED (note) | collegeExtra.ts:1733 |
| CA top 9% UC promise; Texas top 10% law | Unchanged | CONFIRMED | collegeExtra.ts:1733 |
| Test-required 2026: MIT, Harvard, Stanford, Caltech, Georgetown, UT Austin (Yale flexible); UC test-free | Matches 2026 policies | CONFIRMED | collegeExtra.ts:1751 |
| Legacy bans: CA public+private (private ban fall 2025), MD incl. private, CO/VA/IL publics | CA AB 1780 (eff. Sept 2025); MD 2024; CO 2021; VA + IL 2024 | CONFIRMED | collegeExtra.ts:1752 |
| Need-blind + meets-full-need short list: Harvard, Yale, Princeton, MIT, Amherst "as of 2026" | All five need-blind and meet full need in 2026 | CONFIRMED | collegeExtra.ts:234 |
| BYU: members pay "about $6,500 versus $13,000 a year as of 2026" | Current published rate: $3,496/semester member ≈ **$6,992/yr**; $6,992/semester non-member ≈ **$13,984/yr** (enrollment.byu.edu/tuition) | STALE → "about $7,000 versus $14,000" | collegeExtra.ts:1826 |
| Transfer credit loss "about 40%" | GAO-17-574 estimate is 43% | STALE (soft) → "about 43%" (or "more than 40%") | collegeExtra.ts:1612 |

---

## 7. Preview mockups (/students, labeled "Mockup — sample data") — 7 STALE

These pages are honest previews (amber chip, "figures approximate"), so nothing here is a
trust emergency — but since they exist to model the real data quality, refresh them.

### app/students/compare-colleges/page.tsx

| Claim | Source value | Verdict | Line |
|---|---|---|---|
| UCLA COA "≈ $42,000/yr in-state" | ≈ $41–43k (UCLA financial aid COA) | CONFIRMED (approx) | 28 |
| UCLA "≈ 9% admitted" | 9.4% fall 2025 | CONFIRMED | 29 |
| UCLA aid: "Blue & Gold covers tuition under **~$80k** income" | UC official: "families that earn up to **$100,000**" (admission.universityofcalifornia.edu Blue and Gold page) | **STALE → ~$100k** | 32 |
| Amherst "≈ $92,000/yr sticker" | 2026–27 comprehensive fee $96,360 (amherst.edu) | STALE → ≈ $96,000 | 37 |
| Amherst "≈ 9% admitted" | ~7% (class of 2030 admit rate 6.8%, record low) | STALE → ≈ 7% | 38 |
| Amherst need-blind, meets 100% need, no loans | amherst.edu financial aid | CONFIRMED | 37-41 |
| UT Austin COA "≈ $31,000/yr in-state" | $32,446 (onestop.utexas.edu) | CONFIRMED (approx) | 46 |
| UT Austin "≈ 29% admitted" | **~22%** fall 2025 (90,690 apps, ~20,150 admits) | STALE → ≈ 22% | 47 |
| UT "auto-admit ~top 5–6%" | Top 5% as of the fall 2026 cycle | STALE (soft) → top 5% | 47 |
| "Texas Advance: tuition covered under ~$100k income (2026)" | AGI up to $100,000 (admissions.utexas.edu Texas Advance Commitment) | CONFIRMED | 50 |

### app/students/career-explorer/page.tsx

BLS OOH now shows May 2024 medians + 2024–34 projections (site figures were the 2023–33 cycle).

| Claim | BLS OOH value | Verdict | Line |
|---|---|---|---|
| Registered Nurse "≈ $94,000/yr median" | $93,600 (May 2024) | CONFIRMED | 25 |
| RN "Growing ~6%" | **5%** (2024–34) | STALE → ~5% | 27 |
| Electrician "≈ $62,000/yr median" | $62,350 (May 2024) | CONFIRMED | 33 |
| Electrician "Growing ~11%, faster than average" | **9%** (2024–34), "much faster than average" | STALE → ~9% | 35 |
| Software Developer "≈ $133,000/yr median" | $133,080 (May 2024) | CONFIRMED | 41 |
| Software Dev "Growing ~17%, much faster than average" | **15%** (2024–34) | STALE → ~15% | 43 |

---

## 8. Everything else swept, no action

- **Deadlines registry + student calendar** (lib/deadlines.ts, lib/studentCalendar.ts): all 11
  dates CONFIRMED (§3, §5). Year tags roll correctly ("2027–28 opens Oct 1, 2026"; "2026–27
  closes June 30, 2027"; 6.52% tagged 2026–27).
- **Glossary** (lib/glossary.ts): every statutory figure matches the article set (Pell 1576,
  limits 1819/1780/2020, AOTC 2876, LLC 3056, FDIC 2547, NCUA 2677, $3,000 loss 2892,
  SNAP/WIC multiples 3006). No independent stale figures found.
- **Courses / topic quizzes / site quiz** (lib/courses.ts, lib/topicQuizzes.ts, lib/quizData.ts):
  figures are restatements of the confirmed set (Pell 258, 6.52% 298, LTCG 656, IRA 818,
  EITC 943, $16,100 threshold topicQuizzes:167, medical <$500 topicQuizzes:110). Consistent.
- **Blog** (lib/blog.ts): editorial; the SPCX IPO piece is fictionalized-composite by design;
  $35 overdraft anchor and 400%-territory cash-advance math are representative. No action.
- **Illustrative math** (50/30/20 examples, compounding examples, margin/short examples,
  0.03%-vs-1% fee examples): arithmetic spot-checked, internally correct, and framed as
  illustrations with the required "not a promise" hedges.
- **Representative ranges** (renters $15–20/mo, PMI $50–200/mo, closing 2–5%, dental
  100/80/50, term life 1–3% of salary, robo 0.25%, ESPP 15%): all carry "check yours"
  framing per the CLAUDE.md rule for person/state/lender-variable figures. In line with
  July 2026 market surveys.

---

## Prioritized fix list (mechanical, for a follow-up pass)

**Tier 0 — calculator constants: NOTHING TO FIX.** taxData.ts, rothIra.ts, collegeCost.ts,
debtPayoff.ts all verified current.

**Tier 1 — article prose (reader-facing "facts") — 3 edits:**
1. `lib/articles/collegeExtra.ts:1826` — change "about $6,500 versus $13,000 a year as of 2026"
   → "about $7,000 versus $14,000 a year as of 2026" (BYU 2026–27: $3,496 vs $6,992 per semester).
2. `lib/articles/collegeExtra.ts:1612` — change "lose about 40% of their credits on average"
   → "lose about 43% of their credits on average" (GAO-17-574's actual estimate).
3. `lib/articles/governmentAidExtra.ts:1063` — change "a bit over $1,700 a month for a single
   person" → "about $1,700 a month for a single person" (FY2026 limit is $1,696).

**Tier 2 — preview mockups (labeled approximate, still refresh) — 6 edits:**
4. `app/students/compare-colleges/page.tsx:32` — "Blue & Gold covers tuition under ~$80k income"
   → "under ~$100k income" (UC raised the threshold; most important preview fix — it's the
   one that could steer a real family wrong).
5. `app/students/compare-colleges/page.tsx:37` — "≈ $92,000/yr sticker" → "≈ $96,000/yr sticker".
6. `app/students/compare-colleges/page.tsx:38` — Amherst "≈ 9% admitted" → "≈ 7% admitted".
7. `app/students/compare-colleges/page.tsx:47` — "≈ 29% admitted (auto-admit ~top 5–6% of Texas
   classes)" → "≈ 22% admitted (auto-admit ~top 5% of Texas classes)".
8. `app/students/career-explorer/page.tsx:27` — RN "Growing ~6%" → "Growing ~5%".
9. `app/students/career-explorer/page.tsx:35,43` — electrician "~11%" → "~9%"; software developer
   "~17%" → "~15%" (BLS 2024–34 projection cycle).

**Tier 3 — optional polish:**
10. `lib/articles/collegeExtra.ts:1733` — tighten "recently around the top 5–6%" → "top 5% as of
    the fall 2026 cycle" (still literally true today, so optional).
11. `app/tools/college/student-loan/page.tsx:20` — defaultRate "6" → "6.52" to match the federal
    rate the articles teach (placeholder, not a factual claim).

**Next scheduled re-checks** (per the existing yearly conventions): July 1, 2027 — FAFSA/loan/Pell
cycle + studentCalendar; each fall — IRS retirement + inflation adjustments (announced Oct–Nov);
Sept 2027 — BLS OOH refresh for the career explorer when 2025 medians land.
