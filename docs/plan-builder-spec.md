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
2. Ask Claude (claude-haiku-4-5 to start) for the plan as **structured JSON
   only** — items may ONLY reference hrefs/slugs present in the context.
3. **Validate every item server-side** (the journeys resolve-check pattern):
   unknown slug → drop the item. Fewer than 4 surviving items → fall back.
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

**Session 2 next:** Now/Next/Done grouping, nav wiring ("Your Path"
dropdown or top-level decision for the owner), start-here/quiz-results
handoffs, search + sitemap entries, re-plan pre-filled with last answers
(currently starts blank).

## Build order (one session each)

1. **Intake + route:** intake UI, lib/deadlines.ts, /api/plan with
   validation + journey fallback. Test with the "$20k transfer student"
   scenario from the owner's brief.
2. **Dashboard:** /plan page, storage + account sync, derived auto-checks,
   re-plan flow, nav wiring.
3. **Living layer:** projection widget from calculator snapshots, polish,
   CLAUDE.md + this doc updated, go-live checklist.
