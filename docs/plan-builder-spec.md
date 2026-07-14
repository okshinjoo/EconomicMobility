# The Plan Builder — intake + plan structure (v1 draft)

*Drafted July 12, 2026, owner-approved direction: make the product revolve
around a personalized, living plan. This doc is the starting point for that
build — read it fully before writing any code, and keep it updated like
quiz-spec.md.*

## What v1 is (and isn't)

A conversational-feeling intake (one screen, five questions) that sends the
answers to Claude, which composes a **personal plan out of things we already
have** — guides, calculators, courses, challenges, journeys, real deadlines.
The plan renders as a living checklist dashboard ("My Plan") that checks
itself off as the visitor actually does things, using the same derived
trackers journeys use.

v1 is NOT:
- **Individualized financial advice.** Never "borrow at most $X" — instead
  teach the rule ("keep total loans under your expected first-year salary")
  and deep-link the college calculator with their numbers pre-filled so they
  see the payment themselves. Same insight, site stays a teacher. This is a
  hard line (Anthropic compliance answers + minors on the site).
- A scholarship matcher (needs a maintained database — separate decision).
- New content. Every plan item must resolve to something real on the site.

## Intake — five questions that actually change the plan

Principle: don't ask what we already know (profile goals, quiz results, read
history all pre-fill), and don't ask anything that doesn't change the output.

1. **"What's the one money thing you want to get done?"** — goal chips (the
   9 GOAL_OPTIONS) + a free-text line for specifics ("transfer with under
   $20k of debt"). Picks the journey skeleton; free text personalizes item
   phrasing and ordering.
2. **"Where are you right now?"** — high school / community college /
   4-year / transferring / working / between things. Gates the college
   items (FAFSA cycle, transfer-specific guides) and tone.
3. **"What's money like month to month?"** — steady paycheck / irregular /
   none yet / supported by family. Decides whether budgeting-first or
   income-first items lead, and whether projections are possible.
4. **"Anyone counting on you, or helping you?"** — on my own / family helps
   me / I help family. Gates benefits-cliff, emergency-fund sizing guidance,
   and the family-firstgen community pointer.
5. **"Any date or number attached?"** — optional target ("$1,200 by
   August", "FAFSA before the state deadline"). Drives dated items and the
   projection widget.

Under the form, the standing promises: anonymous until saved, synced to the
account if signed in, never sold (link /privacy).

## The plan object

Stored at `empower:my-plan:v1` (add to MAP_KEYS union sync — snapshots
prefer local, same as everything else).

```ts
interface MyPlan {
  createdAt: string;          // ISO
  intake: IntakeAnswers;      // verbatim, for "re-plan" and display
  headline: string;           // "Your transfer-semester money plan"
  items: PlanItem[];
}
interface PlanItem {
  id: string;                 // stable, for check-state
  kind: "guide" | "tool" | "course" | "challenge" | "deadline" | "habit";
  title: string;              // imperative: "File the FAFSA"
  why: string;                // ONE sentence tied to their intake
  href: string;               // must resolve to a real page
  dueDate?: string;           // only from the DEADLINES registry
  doneKey?: string;           // slug/href/id for derived auto-check
}
```

Done-detection: reuse the journey checker (read map, visited tools, course/
challenge badges, topic-quiz scores) for items with a `doneKey`; `habit` and
`deadline` items are manually checkable (a real checkbox — the one place we
store new state, inside the plan object itself).

## The AI route — /api/plan

Same shape as /api/chat and /api/comment (Node route, ANTHROPIC_API_KEY,
fail-closed):

1. Build the grounding context server-side: the matching journey's stages,
   top-ranked guides for the free-text goal (lib/fuzzy via rankItems), the
   relevant tools from toolsRegistry, and the DEADLINES registry (below).
2. Ask Claude (claude-opus-4-8 with adaptive thinking since session 5;
   started on claude-haiku-4-5) for the plan as **structured JSON only** —
   items may ONLY reference hrefs/slugs present in the context.
3. **Validate every item server-side** (the journeys resolve-check pattern):
   unknown slug → drop the item. Fewer than 3 surviving items → fall back
   (was 4; lowered in session 5 so honest short plans survive).
4. Fallback (no key / API error / bad JSON): a deterministic plan built
   straight from the matching journey — the feature degrades to "journeys
   with a nicer intake," never breaks.

New lib: `lib/deadlines.ts` — the ONLY source of dates. FAFSA opens/closes,
federal tax day, Pell/loan-rate reset (July 1), state FAFSA deadlines later
if we want them. Yearly-update burden, same as article figures.

## The dashboard — /plan

- Checklist grouped Now / Next / Done (done items sink, never hide — memory
  contract).
- One projection widget, deterministic math only: if a Budget Planner or
  Savings Goal snapshot exists, "At your current $X/mo leftover, you're on
  track for ~$Y by <their date>" — computed client-side from THEIR saved
  calculator inputs, recomputed on every visit, clearly labeled an estimate.
  No snapshot → the widget becomes a prompt to run the Budget Planner.
- "Re-plan" button: rerun intake pre-filled with last answers.
- Nav: fold into "Your Path" (journeys stay; the plan is the personal layer
  on top). Start-here step and quiz-results handoff once it exists.

## Safety rails (all inherited, none new)

- No individualized advice — teach the rule + open the calculator.
- Crisis/scam nudges same as the chat system prompt.
- Grounded-only output, validated server-side; numbers only from the user's
  own calculator snapshots or the deadlines registry.
- Accounts stay optional: plan lives on-device until they sign in.

## Status

**Session 1 SHIPPED (July 13, 2026):** lib/deadlines.ts, lib/plan.ts
(PLAN_KEY snapshot — account sync needs no changes), app/api/plan/route.ts
(keyed-catalog composition: the model only echoes catalog keys, so invented
links are impossible; deterministic journey fallback on missing key or any
AI failure, aiComposed flag), components/PlanApp.tsx (five-question intake
prefilled from profile + plan checklist with derived auto-checks and manual
deadline/habit checkboxes), /plan page. Verified end to end with the $20k
transfer scenario (fallback path locally; AI path engages in production
where ANTHROPIC_API_KEY exists). Page is deliberately UNLINKED from nav
until session 2.

**Session 2 SHIPPED (July 13, 2026):** Now/Next/Done grouping (Now = first
three undone, done items sink — memory contract), "Your Path" is now a nav
DROPDOWN (My Plan + Guided paths, per this spec's fold-in call), /journey
carries an amber My Plan promo band, start-here step 02 hands to /plan
("Get your plan"), quiz results end with a forest plan-CTA band, /plan is
in ⌘K search + sitemap, and re-plan pre-fills the previous answers.

**Session 3 SHIPPED (July 13, 2026):** ProjectionCard in PlanApp —
deterministic math only, from readBudgetSummary() (the visitor's own saved
Budget Planner inputs, recomputed via the real tax engine each visit).
Light parse of the intake target (a $ amount + a month name; anything
unparseable falls back to a generic six-month projection). Three states:
no snapshot -> run-the-planner prompt; leftover <= 0 -> gentle
budget-first note; leftover > 0 -> "on track for ~$Y by <Month>" with an
over/short comparison when a target amount parsed. Always labeled an
estimate. Verified with a seeded $38k/CA snapshot: "$717/month leftover ->
about $3,585 by December — past your $1,200 target."

**Session 4 SHIPPED (July 13, 2026) — the conversational layer (owner ask:
"talk to an AI... it summarizes what you told it and repeats it back...
you should be able to leave feedback"):**

- **Interview phase** (`POST /api/plan {phase:"interview", messages}`):
  Claude (same haiku model) runs a guided intake — ONE question per turn,
  listening only, never advising (system prompt forbids advice/numbers;
  crisis nudge to /resources). When it has goal/stage/income/family (+ an
  optional target), it stops and returns `{done, summary, intake}` — the
  summary is the played-back "here's what I heard" and the intake is
  validated server-side (goal must be a real journey id; bad enums coerce
  to safe defaults — the human-readable summary is what the person
  actually confirms).
- **Confirm-back**: the client (ChatIntake in PlanApp) renders the summary
  with "Did I get that right?" — *That's right → build* passes the
  confirmed summary into the build prompt ("their confirmed story");
  *Not quite* reopens the chat and the model re-summarizes with fixes.
- **Review loop**: after ANY build the plan opens in review mode — an
  amber bar asks "Does this plan look right?" *Looks right* dismisses.
  *Something's off* opens a feedback box, and every item grows a
  "Doesn't fit?" flag toggle. `{phase:"revise"}` sends intake + the
  current plan (as hrefs mapped back to catalog keys, flags marked) +
  the feedback; the model reworks it under the SAME catalog-only rules
  and validation. Revise NEVER falls back to a fresh deterministic plan
  (that would clobber theirs) — on no-key/AI-failure it returns
  `{unavailable}` and the client keeps the plan with a try-later note.
- **Knowns (July 13 addendum)**: the client sends standing answers with
  every interview turn — About-you signals (income/family from
  lib/aboutYou), the profile's student stage (hs/cc/uni mapped to the
  intake's stage ids), and profile goals as a confirm-don't-re-ask hint.
  The route validates them against the same enums (sanitizeKnowns) and
  appends an ALREADY-KNOWN block to the interview system prompt: skip
  those questions, fold the facts into the played-back summary (so the
  person can still correct them at the confirm step), and trust the
  conversation over the profile on any conflict. The opener tells the
  person their profile answers are being skipped.
- **Degradation**: no key → interview returns `{unavailable}` and the
  client silently switches to the classic five-question form (which
  stays as the re-plan path and the "Prefer the quick form?" escape).
  Verified headless locally: chat → form fallback → build → review bar →
  flag + feedback → unavailable note with plan intact → dismiss.

**Session 5 SHIPPED (July 13, 2026) — plan-AI quality pass (owner verdict:
"my plan AI kind of sucks"):**

- **Model bump**: the route's MODEL is now claude-opus-4-8 with adaptive
  thinking (`thinking: {type: "adaptive"}` on every call; anthropic-version
  header unchanged). max_tokens raised to 3000 (build/revise) and 1000
  (interview), timeout 20s → 30s for the bigger model. All refusal/
  stop_reason handling and every fallback path unchanged: no key → fallback
  plan for build, `{unavailable}` for interview/revise; revise still never
  clobbers.
- **Done-awareness (the big fix — plans were assigning guides the person
  already read)**: the client (buildPlan, ChatIntake interview turns,
  ReviewBar revise) now sends `done: {reads, tools, courses}` — read-map
  slugs, visited tool hrefs, course badge ids, built post-mount and capped
  at 100 each. The route sanitizes (strings only, length caps) and prefixes
  matching catalog entries' note with "ALREADY DONE by this person". Build
  prompt rule: never assign an already-done item as a step, but it MAY be
  referenced in another item's why ("since you've already read X…"). The
  interview prompt gets one line — they've read N guides on <topics>; keep
  the no-recommending rule, but the summary may acknowledge momentum.
- **Prompt sharpening (build)**: the "why" must quote or closely paraphrase
  the person's own words where available (detail / target /
  confirmedSummary); deadline items must be placed by actual calendar
  proximity (the intake now carries today's date, ordering-only; the d:
  notes carry the deadline dates); filler is forbidden — 8-12 items only
  when genuinely distinct, fewer strong steps beat padding. Server-side
  validation minimum lowered 4 → 3 to match.

**Session 6 SHIPPED (July 13, 2026) — the personalized path (owner-approved:
My Plan gets journey-style stages + the roadmap-trail presentation):**

- **Stages in generation**: the build/revise output schema is now
  `{"headline", "stages": [{"title", "why", "items": [{"ref","title","why"}]}]}`
  (3-4 stages, each a small milestone with its own one-sentence why).
  Server validation is unchanged per item (catalog refs only, unknown refs
  dropped, dedupe by href, 12-item cap enforced during collection so stage
  itemIds stay consistent); stages with zero surviving items are dropped;
  if stages are missing/malformed the parser falls back to the old flat
  `items` shape — a plan without stages is always legal. `MyPlan` gained
  optional `stages?: PlanStage[]` (`{title, why, itemIds}`) — BACKWARD
  COMPATIBLE: plans saved before session 6 keep working untouched and
  render the checklist.
- **Fallback gets stages free**: fallbackPlan already walked the journey's
  stages — it now carries each stage's milestone/why into plan.stages, plus
  a final "Mark the dates" stage for the appended deadline items. The
  no-key plan renders the full trail.
- **Presentation**: /plan (and /students/plan via the shared view) renders
  the plan as a ROADMAP TRAIL by default — JourneyPath's visual language
  (winding START→FINISH SVG, glowing progress stroke, milestone nodes with
  checks, pulsing amber current ring, stage cards with "You are here")
  driven by plan.stages + the same isDone checker. Node positions are
  measured off the path at runtime (getPointAtLength) so 3-5 stages all
  sit on the curve (journeys are always 4; plans vary). A Path/List toggle
  (persisted at `empower:plan-view:v1`) switches to the Now/Next/Done
  checklist, which is unchanged. Plans without stages (old saves, flat AI
  output) show the checklist only, no toggle. Review mode (flags + the
  feedback bar) works in BOTH views; manual deadline/habit checkboxes work
  in both; items a stage doesn't cover render in an "Also on your plan"
  card (memory contract — nothing hides).
- **Journey index**: when a saved plan exists, /journey leads with a
  "Made for you" card (client-side, post-mount, no hydration mismatch)
  linking /plan with the plan's headline + live progress, and the generic
  amber "build my plan" promo band removes itself (`PlanPromoBand`, now
  its own client component) — personalization replacing generic
  prominence, per the nav-audit principle. No plan → band as before.
- **Verified headless** (real Chrome CDP, no key): fallback plan renders
  the 5-stage trail with "You are here" + Next up; toggle to list and back
  persists across reloads; an old-shape plan seeded into localStorage
  renders the checklist with no toggle and zero console errors; review
  flags work in both views; /students/plan mirrors with zero main-frame
  link leaks; /journey and /students/journey both swap band → card.
  npm run build passes; leakhunt clean (308 pages, 0 leaks).

**Session 7 tuning (July 14, owner live-test feedback):** zero questions
overshot — the guide built immediately without asking if anything else
should be covered. Rule is now BUILD FIRST, ASK LITTLE: clear goal ->
one warm catch-all question ("anything else you want this plan to
cover — another goal, a date, a number?") -> summary on the very next
turn regardless of the answer. Cap stays two questions total.

**Session 7 (July 13, 2026, owner: "it asks too many questions"):**
BUILD FIRST, ASK LATER. Interview rules now jump straight to the
confirm-back summary when the first message names a clear goal, filling
unknowns with safe stated defaults ("I will assume money comes in
unevenly — correct me if not") — hard cap of TWO questions per
interview, background detail belongs in the plan and its revision
loop. Composition rule: START WITH A DOING STEP — when the catalog has
a matching tool, step 1 is that tool with an imperative title (budget
goals open with the Budget Planner as "Track what is coming in and
what is going out"; it already persists + syncs, and auto-checks via
visited-tools). The deterministic fallback now also orders each stage
tool-first, so the no-AI plan leads with doing too.

**GO-LIVE: nothing left to configure.** ANTHROPIC_API_KEY already lives in
Vercel (shared with chat + comment review), the route falls back safely
without it, and no schema changes were needed. After the next push, run
one real intake on the live site and confirm the plan comes back
aiComposed:true (the fallback plan says "built from your goal's guided
path" under the headline — if that line shows in production, check Vercel
logs for /api/plan).

## Build order (one session each)

1. **Intake + route:** intake UI, lib/deadlines.ts, /api/plan with
   validation + journey fallback. Test with the "$20k transfer student"
   scenario from the owner's brief.
2. **Dashboard:** /plan page, storage + account sync, derived auto-checks,
   re-plan flow, nav wiring.
3. **Living layer:** projection widget from calculator snapshots, polish,
   CLAUDE.md + this doc updated, go-live checklist.

## Session 8 — the way back to the chat (July 14, 2026)

Owner: "if you choose 'prefer the quick form?' there's no way back to the AI."

- `Intake` takes optional `onUseChat`; when present it renders a
  "Rather talk it through? Back to the guide" link at the top of the form.
- `ChatIntake.onUseForm` now carries a reason: `"choice"` (the visitor
  clicked the quick-form link) vs `"unavailable"` (interview API returned
  {unavailable} or the network failed). PlanApp sets `chatDown` on
  "unavailable" and withholds `onUseChat` — no bouncing into a chat that
  instantly degrades back to the form.
- Re-plan still lands on the prefilled form (unchanged), now with the same
  way back when the chat is up.

## Session 9 — the plan shelf (July 14, 2026)

Owner: "make it so you can make multiple plans and import up to three to
save on your profile."

- `lib/plan.ts`: `PLAN_SHELF_KEY` = `empower:my-plans:v1` (auto-synced like
  every empower:* key), `MAX_SAVED_PLANS` = 3, `SavedPlan` {id, savedAt,
  plan} where id = plan.createdAt (every build mints a fresh stamp).
  `saveToShelf` re-saves in place for a known id and returns "full" only
  for a NEW plan when 3 slots are taken. `savePlan` (the active-plan write
  path) also syncs the shelf copy, so manual checks/revisions never leave
  a stale profile snapshot.
- The ACTIVE plan stays at PLAN_KEY — PlanCard, JourneyIndex made-for-you,
  and the student mirror keep reading it unchanged.
- `PlanShelf` strip renders under the PlanView header: save button with
  live count, per-plan rows (headline + goal label, Current chip, Open,
  remove ×), full-shelf nudge. Opening a saved plan swaps it in as active;
  switching away from an UNSAVED active plan asks first. Removing the
  current plan keeps it open, just no longer saved.

## Session 10 — tools are first-class (July 14, 2026)

Owner: "don't be afraid to recommend more tools in your plan — filling out
tools is one of the best ways to gain understanding."

- buildCatalog now adds every catalog guide's paired calculator
  (lib/articleTools by slug, falling back to learnContent[topic].tool), so
  the model sees 2-5 goal-relevant tools per catalog instead of only the
  journeys' one-per-stage attachments. Verified per goal: budget 4,
  credit 2, debt 3, emergency 4, invest 3, college 3, transfer 3, home 3,
  retirement 5.
- Build prompt gained the "TOOLS ARE FIRST-CLASS, not garnish" rule:
  weave 2-4 tools through the plan, each placed where its numbers unblock
  the next step; a read + its paired tool beats two reads. The existing
  doing-step-first rule stands.

## Session 11 — goal check-ins feed the plan (July 14, 2026)

Owner: "feed those check-ins into the plan AI's knowns so a 'getting
there' goal changes what the plan recommends."

- gatherKnowns (PlanApp) now includes `checkins` (goal id -> status from
  lib/goalCheckins). Knowns rides BOTH the interview POST (already did) and
  now the build + revise POSTs.
- Route: Knowns.checkins sanitized (valid GOAL_IDS + CHECKIN_LABELS
  statuses). Interview knownsBlock gains a "self-reported progress" line so
  the played-back summary can acknowledge momentum. Build/revise gain
  `checkinLine(goal, checkins)` — a SOFT line for TODAY'S goal only:
  started/halfway -> "lead with the next moves, not square-one basics";
  done -> "keep-it-going / next-level pass, open past the basics";
  not-started/absent -> no line. A lean, never a filter (mirrors
  readingLevelLine).
- Hero reword: "One plan that's yours" -> "Plans that are yours" + subcopy
  notes building one per goal and saving up to three (session 9 shelf).
