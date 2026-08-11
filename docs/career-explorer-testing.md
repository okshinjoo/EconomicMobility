# Career Explorer student-testing and analytics plan

## What we need to learn

The explorer succeeds when a student can move from uncertainty to a defensible next step—not merely when they view many careers. Test whether students can:

1. Find two or three plausible careers without already knowing an exact title.
2. Explain one meaningful trade-off between two careers.
3. Find a real local training, licensing, or apprenticeship route.
4. Compare local median pay with the lifestyle target from Reality Check.
5. Save an editable next step they could actually complete.

## Custom analytics

`lib/careerAnalytics.ts` is the only entry point for custom Career Explorer events. It enforces a property allowlist. Custom events may include counts, broad modes, and action types; they must never include:

- Search text or plan text
- Career ids or titles
- State, metro, ZIP, coordinates, or institution names
- Fit answers or inferred interest types
- Names, email addresses, phone numbers, or account identifiers

The current event funnel is:

| Stage | Event | Allowed properties |
| --- | --- | --- |
| Discover | `Career explorer result opened` | discovery mode, active-filter count, result-count band |
| Explore fit | `Career fit completed` | result count, whether a pattern was present |
| Shortlist | `Career save changed` | save/remove action, shortlist count |
| Compare | `Career comparison changed` | add/remove action, comparison count |
| Localize | `Career local pay selected` | state/metro level, whether a selection exists |
| Find a route | `Career pathway opened` | license/program/apprenticeship type |
| Act | `Career plan changed` | step action, completed count, step count |

Do not treat pageviews or event counts as proof of a good decision. Use them to spot broken transitions and recruit targeted qualitative tests.

## Moderated test: 30–40 minutes

Recruit 8–12 students across high school, community college, four-year college, and early career. Include students considering degree and non-degree routes, at least two mobile-only users, and at least one keyboard or screen-reader user. Do not require students to disclose immigration status, disability, income, exact location, or other sensitive information.

Give the participant this scenario:

> You are considering what to do after your current program or job. Use the Career Explorer to find two paths that could work for you, compare them, find one real route near you, and leave with one next step.

The facilitator should not name controls or teach the interface. Ask the student to think aloud, and note:

- Where they first try to search or filter
- Whether “median,” “openings,” and training labels are understood
- Which comparison fact changes their thinking
- Whether local sources look credible and current
- Whether a suppressed or missing estimate is interpreted correctly
- Whether the plan step feels realistic rather than performative

Finish with five questions:

1. Which career would you investigate next, and why?
2. What is the biggest downside or uncertainty about it?
3. What local route did you find, and what would you verify before applying?
4. What information was missing or hard to trust?
5. What is the next action you saved?

## Success thresholds

- At least 80% find two plausible careers without facilitator help.
- At least 75% can state one evidence-based trade-off.
- At least 70% reach a relevant local route or correctly understand why no result is published.
- At least 75% correctly distinguish median pay from starting pay.
- At least 70% save a specific, feasible next step.
- No critical keyboard, focus, labeling, or screen-reader blocker remains.

If fewer than five participants encounter a task, report observations rather than a percentage.

## Unmoderated follow-up

After the moderated fixes, run a short unmoderated test with 20–30 students. Use the same five tasks, one confidence question before and after, and an optional free-text prompt. Keep responses separate from custom analytics unless participants explicitly consent to linkage.

Review the anonymous funnel weekly for the first month, then monthly. Investigate large drop-offs between opening a profile, saving or comparing, opening a local pathway, and changing a plan. Never optimize for more clicks at the expense of comprehension or decision quality.
