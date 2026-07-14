# Navigation audit — July 13, 2026

Owner directive: **prioritize clear navigation over more features — there's a lot of information at once.**

Method: headless-Chrome CDP crawl of 45 key surfaces on localhost:3000 (main frame + student frame) at 1440×900, extracting every anchor with region (header / footer / body), visibility (CSS-hidden dropdown panels and the mobile drawer counted separately), and fold position; plus a read of `lib/nav.ts`, `components/StudentHeader.tsx`, `components/Footer.tsx`, and both homepages. Signed-in account overview measured via `/dev/account-preview`. Crawl data: scratchpad `nav-crawl.json` (regenerate with `nav-crawl.mjs`).

Headline numbers:

- **514 distinct internal destinations** are linked from just the 45 crawled surfaces.
- **Student header: 67 anchors → 56 declared destinations (44 unique pages).** Main header: 46 anchors → 33 unique pages. The student subnav is now *bigger* than the main nav it was meant to simplify.
- **Densest pages:** `/students` homepage (10 bands, 76 visible links), `/` homepage (9 bands, 65 visible links), topic hubs (~7 bands, 65–67 links).
- **Worst duplicate door:** `/students/deadlines` is linked **14 times from the `/students` homepage alone** (+3 header anchors).

---

## 1. Route + door inventory

### Menu inventories (from source)

**Main nav (`lib/nav.ts`)** — 7 entries: Learn (9 topics + 5 footer), Your Path (2), Tools (4 categories + 2 footer), Resources (4 hash-anchors), Community (4), About (6), For Students (plain link). Footer (`components/Footer.tsx`): 3 columns × 5 links.

**Student subnav (`components/StudentHeader.tsx` `NAV`)** — 8 entries, 39 dropdown items + 16 footer links + Overview = **56 destinations**:

| Entry | Items | Footer links | Total |
|---|---|---|---|
| Overview | — | — | 1 |
| Guides ▾ | 7 | 2 | 9 |
| Your Path ▾ | 4 | 3 | 7 |
| Deadlines ▾ | 6 | 2 | 8 |
| Scholarships ▾ | 6 | 5 | 11 |
| Opportunities ▾ | 5 | 0 | 5 |
| Community ▾ | 3 | 0 | 3 |
| Tools ▾ | 8 | 4 | 12 |

### Entry points per key destination

"Doors" = header anchor instances + footer + distinct crawled pages with a *visible* body link. (The hidden mobile drawer adds one more global surface to every top-level destination; not counted below.)

| Destination | Header anchors | Footer | Body pages linking it | Notes |
|---|---|---|---|---|
| `/students` | 2 main + 3 student | — | 6 (incl. `/` ×4) | also in every main page's mobile drawer |
| `/students/deadlines` | 3 (stu) | — | 3 — but `/students` alone links it **14×** | worst same-page duplication |
| `/students/scholarships` | **6 (stu)** — trigger, 2 items, 3 audience doors | — | 4 (incl. `/` ×3) | most header anchors of any page |
| `/students/opportunities` | 4 (stu) | — | 2 (incl. `/` ×3) | homepage links it 3× (stats band, promo banner, pillar) |
| FAFSA guide (student mirror) | 2 (Guides ▾ + Deadlines ▾) | — | **7** (hub, deadlines ×2, journey ×2, course ×2, home…) | most-doored single article: ~9 doors |
| Paying-for-College course (stu) | 2 (Guides ▾ + Your Path ▾) | — | 3 | + 3 more doors in main frame (`/courses`, `/journey/college`, `/life`) — **~8 doors across frames** |
| College journey (stu) | **3** (Your Path trigger + item + Guides ▾ item) | — | 2 | + main-frame `/journey` |
| Student Tracker | 2 (Your Path ▾ + Tools ▾) | — | 4 | duplicated across two menus |
| `finding-scholarships` guide (stu) | 2 (Deadlines ▾ footer + Scholarships ▾) | — | 5 | |
| `work-study-explained` (stu) | 2 (Scholarships ▾ + Opportunities ▾) | — | 4 | duplicated across two menus |
| `/ask` | 1 main + 1 stu | 1 | 4 — but `/` alone links it **5×** | second-worst same-page duplication |
| `/learn` | 2 (trigger + footer item) | 1 | 11 | fine — it's the hub |
| `/quiz` | **0** | 1 | 11 | the centerpiece has **no header door** — footer + homepage/band links only |
| `/resources` | **5 main** (trigger + 4 hash items) | 1 | 0 body | dropdown is 4 anchors into one page |
| `/plan` | 1 main + 1 stu | — | 1–2 | thin for a flagship |
| `/blog` | 1 | — | **0** | reached only via Community ▾ |
| `/journey/college` (main) | 0 | — | 1 | main-frame journey is thin; student mirror has 5+ doors |

**Worst duplicate-door offenders:** (1) `/students/deadlines` — 17 anchors across header + one page; (2) FAFSA step-by-step — ~9 doors in the student frame; (3) Paying-for-College course — ~8 doors across frames (2 menus + courses hub + journey + life + stay-on-track band); (4) `/students/scholarships` — 10 header/home anchors; (5) college journey — 3 header anchors in 2 different menus; (6) Student Tracker and work-study-explained — each in 2 dropdowns; (7) `/ask` — 5 links from the main homepage.

---

## 2. Task paths

Clicks = user actions (opening a CSS hover dropdown is free on desktop; on touch the trigger navigates to the hub, adding one page-scan). "Competing links" = visible links on the surfaces crossed.

### Student tasks

| Task | From `/students` | From `/` |
|---|---|---|
| Find a scholarship | **1 click** — Scholarships ▾ → Finder. Competing: 8 nav entries, then an 11-link panel. (Or the homepage pillar card, competing with 76 on-page links.) | **1–2 clicks** — For Students → Scholarships ▾ (2), or scroll to the For Students band (1, past ~40 of 65 links). No main-header scholarship door. |
| Check a deadline | **0–1 clicks** — six dates render on the homepage; hub = 1 click via Deadlines ▾. But 14 same-destination links compete with each other. | **2 clicks** — For Students → Deadlines. (1 via the homepage band if scrolled.) |
| Read the FAFSA guide | **1 click** — Guides ▾ → FAFSA, Step by Step (9-link panel; the same article also sits in Deadlines ▾ — two menus claim it). | **2 clicks** — Learn ▾ → College → Start-here banner (14-link panel, then a 67-link hub), or For Students → Guides ▾. |
| Track units | **1 click** — Your Path ▾ → Tracker (also in Tools ▾). | **2 clicks** — For Students → Your Path ▾. **Zero main-frame doors** — invisible unless you find the microsite first. |
| Ask the community a question | **1 click** to `/ask` via Community ▾ (note: silently *exits* the student frame), or **2 clicks** to post in the Students channel. | **1 click** — Community ▾ → Ask & Answers; **2** to post in the feed. |

### Adult tasks (from `/`)

| Task | Path | Decision load |
|---|---|---|
| Budget calculator | **1 click** — Tools ▾ → "Budget & paycheck" (`/tools/budget`) | 8 nav entries → 6-link panel. Clean. |
| Credit guide | **2 clicks** — Learn ▾ → Credit Scores → pick a guide | 14-link panel → 65-link hub with 7 bands. The hub is the load. |
| Take the quiz | **1 click** — hero CTA. From any *other* page: footer only (full-page scroll) | The site's centerpiece has no persistent door; deep visitors must know to scroll to the footer. |

Reading: **menu paths are short (1–2 clicks everywhere) — the problem is never depth, it's width.** Every hover shows 5–12 choices, every landing page shows 30–76 more, and the same destination greets you 3–14 times on the way.

---

## 3. Density measures

Bands = `<section>` elements in `<main>` (measured in DOM). Fold = visible links with top < 900px at 1440×900 (includes ~8–10 header links). Totals = visible links (hidden dropdown/mobile-drawer anchors excluded).

| Page | Bands | Above-fold links | Total visible links | Flag |
|---|---|---|---|---|
| `/students` | **10** | 14 | **76** | **OVER — both counts** |
| `/` | **9** | **25** | 65 | **OVER — bands, fold at limit** |
| `/learn` | 5 | **27** | 44 | fold over (topic grid — acceptable for an index) |
| `/students/learn` | 5 | **29** | 46 | fold over (same grid + student chrome) |
| `/learn/college` | 7 | 11 | 65 | near-flag: 5 theme sections + banner + extras |
| `/students/learn/college` | 7 | 13 | 67 | same |
| `/learn/budgeting` | 7 | 11 | 67 | same pattern |
| `/students/scholarships` | 4 | 19 | 69 | high totals, but it IS a directory — OK |
| `/students/opportunities` | 3 | 19 | 66 | directory — OK |
| `/students/deadlines` | 4 | 15 | 41 | OK |
| `/students/tools` | 2 | 19 | 50 | OK |
| `/tools` | 5 | 14 | 31 | OK |
| `/community` | 2 | 11 | 50 | OK |
| Article page (FAFSA) | 2 | 16 | 42 | ~5 cross-sell surfaces after the body (see §4) |
| `/account` (signed out) | 1 | 10 | 25 | OK |
| Account overview (`/dev/account-preview`) | 2 | 14 | 31 | OK — dashboard is already lean |
| `/glossary` | 3 | 155 | 733 | A–Z index — exempt by nature |

Flagged: **`/students` (10 bands / 76 links), `/` (9 bands / 25 above-fold / 65 links)**, the topic-grid folds on `/learn` + `/students/learn`, and the 7-band topic hubs.

---

## 4. Proposed leaner IA

Ground rules respected throughout: college-first order in student menus; **memory contract** — lists sink, never hide, and every cut *moves* content to a hub, deletes nothing; personalization (StageDash, WelcomeBack) *replaces* generic doors rather than adding more.

### 4a. Student dropdowns → ≤5 items + one footer row

**Guides ▾** (7+2 → 4+3). Keep: College & aid guides · FAFSA, Step by Step · Transfer money guide · Student life essentials. Footer row: All nine money topics · Glossary · Compare Colleges (preview). **Moves:** Paying-for-College (course) and pay-for-college path *out* — they are verbatim duplicates of Your Path ▾ items (canonical home). Compare Colleges demotes to footer (it's a preview, not a guide).

**Your Path ▾** (4+3 → unchanged). Already ≤5 and college-first. This is the **canonical home** for the course, the path, the Tracker, and My Plan.

**Deadlines ▾** (6+2 → 2+2). Keep: The money calendar · Email reminders. Footer row: FAFSA, Step by Step · First-time taxes. **Moves:** FAFSA mistakes, Repaying student loans, Scholarship season, Before-you-sign — all already live in the `/students/deadlines` hub's six-guide band (built July 13 exactly for this). The hub owns the inventory; the menu is a door, not a shelf.

**Scholarships ▾** (6+5 → 5+3). Keep: The Scholarship Finder · Winning scholarships · Undocumented & DACA aid · Big national databases · Grants vs. loans vs. scholarships. Footer row: the three audience doors (In high school? / Transferring? / No citizenship?) — they're the personalization story, keep them. **Moves:** Work-study → Opportunities ▾ only (one menu owns it; it's an earning door). Reading an award letter + Appealing your aid → the finder page / college hub "Paying for it" section (already shelved there).

**Opportunities ▾** (5 → 5, unchanged) — becomes work-study's canonical menu.

**Community ▾** (3 → 3, unchanged). Add "(main site)" hint text on the Ask item so the frame exit isn't silent.

**Tools ▾** (8+4 → 5+4). Keep: All tools · College Cost · Compare Aid Offers · Student Loan · Paycheck (college-first). Footer row: Budget · Reality Check · Templates · Letter Generator. **Moves:** Student Tracker → Your Path ▾ only (dedupe); Rent + Emergency Fund → `/students/tools` hub (already listed there).

Net: student header 56 → **~38 destinations**, no content lost, every removed item still one click away inside its hub.

### 4b. Students homepage → ≤6 bands

Current 10: hero · StageDash · pillar door-cards · Opportunities promo banner · calendar band (6 date rows) · starter guides + stay-on-track · shelf (2 door cards) · ASSIST card · tools band · community band.

Proposed 6:
1. **Hero** (keep).
2. **StageDash** (keep — this is the personalization that earns the cuts below).
3. **Pillar door-cards** (keep, absorb two bands): the Opportunities *banner* folds into its pillar card ("New" chip on the card); the calendar band collapses to a **next-two-dates line inside the Deadlines pillar card** + its one link. Content moves nowhere — `/students/deadlines` already owns all 11 dates, .ics, reminders.
4. **Starter guides + stay-on-track column** (keep as the one editorial band; the stay-on-track column's course/journey doors are fine here — but they become the page's *only* course/journey doors).
5. **Community band** (keep).
6. **One compact "everything else" footer band**: college-shelf door + All-tools door + ASSIST line — the survivors of the shelf, tools, and ASSIST bands, as three one-line doors.

**Cuts (all content re-homed, per memory contract):** shelf band → `/students/learn/college` + `/students/learn` (both already complete); tools band → `/students/tools` hub; ASSIST card → shows via StageDash for the cc stage (add it to the cc pool in `lib/studentRecs.ts`) + stays on the transfer guide/course — personalization replaces the generic door. Result: 76 visible links → roughly 45, and `/students/deadlines` drops from 14 links to 2.

### 4c. ONE cross-sell band per page

Rule: a page gets **one** band whose job is selling another surface. Its own content and its hub's inventory don't count.

Violators → survivor:
- **`/`** (For Students band + Ask band ×5 links + quiz band + roadmaps pointer + students pointer lines): survivor = **For Students band**; Ask shrinks to one link inside the community band; the two pointer lines under the topic grid consolidate to one.
- **`/students`**: survivor = **pillar door-cards** (per §4b).
- **Article pages** (`ArticleFollowUps`: topic-quiz card + tool card + roadmap card + related articles + roadmap banner up top): RelatedArticles is content, keep. Of the three prompt cards, **show only the first undone one** (priority: topic quiz → tool → roadmap) instead of stacking all three; the memory contract already hides done ones — this extends it to "one at a time." Keep the top roadmap banner.
- **Topic hubs** (start-here banner + per-section grids + quiz card + tool link + related topics + students invite): survivor = **topic quiz/tool card**; the students invite chip stays only on college/student-life pages (existing rule) but drops from hubs that already show the banner.
- **`/students/deadlines`** (reminders band + 6 guides + 4 tools): reminders is the page's own feature, guides are inventory; the **4-tools band is the cross-sell** — cut to one All-tools line.
- **`/tools` hub** (templates promo + letters promo + quiz band): survivor = **templates promo**; letters stays as a plain registry card, quiz band goes (footer has it).
- **`/journey` + `/journey/college`** (plan promo + course attachments + next-up): survivor = **the trail card's Next-up box**; the plan promo band on `/journey` stays (it's the hub), drops from individual journey pages.

### 4d. Duplicate-door dedupe (canonical + at most one contextual)

| Destination | Canonical door | One contextual door | Kill |
|---|---|---|---|
| `/students/deadlines` | Deadlines ▾ | next-two-dates line in the Deadlines pillar card | the 6-row calendar band's 14 links; `/students/scholarships` inline link stays as body prose |
| FAFSA guide | Guides ▾ + college-hub start-here banner (same frame position) | Deadlines ▾ footer row | Deadlines ▾ *item*, duplicate journey/course inline stack (leave prose links) |
| Paying-for-College course | Your Path ▾ | college journey's stage attachment | Guides ▾ item, stay-on-track duplicate once §4b lands |
| College journey | Your Path ▾ ("Pay for college — the path") | quiz results / JourneyIndex | Guides ▾ item, Your Path trigger already points there (fine — same menu) |
| Student Tracker | Your Path ▾ | `/students/tools` hub card | Tools ▾ item |
| `work-study-explained` | Opportunities ▾ | Scholarships finder page prose | Scholarships ▾ item |
| `/ask` | Community ▾ (both frames) | one homepage link (community band) | the other 4 homepage links |
| `/students` (from main) | top-level **For Students** | homepage For Students band | Learn ▾ footer item; extra homepage links |
| `finding-scholarships` | Scholarships ▾ | `/students/deadlines` guide row | Deadlines ▾ footer item |
| `/students/scholarships` | Scholarships ▾ trigger+item (same panel OK) | homepage pillar card | homepage stats-band + tracker duplicate links |

One **addition**, not a cut: give `/quiz` a persistent door (Your Path ▾ already has "The 2-minute quiz" in the *student* frame; add the same footer item to the main Your Path ▾). Zero header doors for the centerpiece is the inverse navigation bug.

---

## 5. Implementation plan (3 sessions, by impact)

**Session 1 — menus (biggest win, smallest risk; ~2–3 h).** ✅ **DONE July 13, 2026** — student header 56 → **44** declared destinations (Overview 1 · Guides 4+3 · Your Path 4+3 · Deadlines 2+2 · Scholarships 5+3 · Opportunities 5 · Community 3 · Tools 5+4; §4a's kept-item lists followed exactly — they sum to 44, not the ~38 estimate); main nav: Learn ▾ For-students footer dupe cut, "The 2-minute quiz" added to Your Path ▾ footer (/quiz's first header door); fit clean 1024–1728 (no xl+ scroll, 244px+ slack at 1280), leak crawl 0 leaks / 0 broken over 308 pages.
Trim `StudentHeader.tsx` NAV per §4a (56 → ~38); dedupe course/path/tracker/work-study/FAFSA items; add "(main site)" hint on the Ask item; main nav: drop Learn ▾ "For students" footer duplicate, add quiz to Your Path ▾ footer. Files: `components/StudentHeader.tsx`, `lib/nav.ts`. Verify: leak-hunt crawler + this audit's crawler rerun; check the 1280px fit rule (fewer items only helps). No content moves needed — every re-homed item already exists in its hub.

**Session 2 — students homepage 10 → 6 bands (~half day).**
§4b: fold Opportunities banner + calendar rows into the pillar cards, build the compact everything-else band, move ASSIST into the cc StageDash pool (`lib/studentRecs.ts`), delete shelf/tools bands. Files: `app/students/page.tsx`, `lib/studentRecs.ts`. Verify: screenshots at 1440 + 390, leak crawler, anchors `#calendar`/`#shelf` must still resolve (keep ids on the surviving band or redirect to the hubs).

**Session 3 — one-cross-sell rule on the main frame (~half day+).**
§4c: homepage Ask dedupe + band merge (9 → ~7 bands), `ArticleFollowUps` "first undone prompt only," topic-hub and `/tools` and `/students/deadlines` band trims. Files: `app/page.tsx`, `components/ArticleFollowUps.tsx`, `app/learn/[topic]` view, `app/tools/page.tsx`, `app/students/deadlines/page.tsx`. Verify: crawler rerun (targets: `/` ≤ 7 bands & ≤ 55 links, article pages ≤ 2 prompt cards), memory-contract spot-checks (read/done states still sink, never vanish). Update CLAUDE.md's homepage/students notes in the same change.

Honest sizing: sessions 2–3 touch owner-styled surfaces — budget review screenshots for her. Everything here is subtractive or a move; no new features, per the directive.
