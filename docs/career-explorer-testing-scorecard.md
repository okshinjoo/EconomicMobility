# Career Explorer moderated-testing scorecard

Create one copy of the session section per participant. Use an anonymous session id such as `S01`; keep recruiting details somewhere access-controlled and separate from product notes. Do not record names, contact information, exact locations, account identifiers, immigration status, disability details, income, or anything a participant did not volunteer for the research.

## Session record

| Field | Entry |
| --- | --- |
| Anonymous session id | |
| Date | |
| Facilitator | |
| Broad student context | High school / community college / four-year college / early career |
| Route under consideration | Degree / non-degree / unsure |
| Device | Phone / tablet / laptop / desktop |
| Input mode tested | Touch / mouse / keyboard / screen reader |

Read the scenario exactly as written in the main testing plan. Do not point out controls or explain vocabulary unless the participant has already failed the task and you are recording a facilitator prompt.

### Task outcomes

Use `Independent`, `Prompted`, or `Not completed`. A prompt means the facilitator named a control, explained where to go, or corrected the participant's interpretation.

| Task | Outcome | What the participant tried first | Evidence or breakdown |
| --- | --- | --- | --- |
| Find two plausible careers without knowing an exact title | | | |
| State one meaningful trade-off between two careers | | | |
| Find a relevant local license, public program, or apprenticeship route | | | |
| Compare local median pay with a Reality Check lifestyle target | | | |
| Save a specific, feasible next step | | | |

### Comprehension checks

Record the participant's own words before interpreting them.

| Check | Correct / partial / incorrect | Participant's explanation |
| --- | --- | --- |
| Median pay is not starting pay | | |
| Openings include replacement openings, not only new jobs | | |
| A sponsor is not necessarily hiring now | | |
| A reported program completion does not guarantee current admission | | |
| The fit sampler is a starting point, not a verdict | | |

### Closing questions

1. Which career would you investigate next, and why?
2. What is its biggest downside or uncertainty?
3. Which local route did you find, and what would you verify before applying?
4. What information was missing or hard to trust?
5. What next action did you save?

### Session observations

- Strongest moment:
- Largest hesitation:
- Credibility concern:
- Accessibility or focus issue:
- Unexpected search term or career title:
- Facilitator prompts given:

## Cross-session findings log

Log observed behavior, not design opinions. Combine entries only when the underlying breakdown is the same.

| Finding id | Task | Observed evidence | Sessions affected | Severity | Proposed response | Status |
| --- | --- | --- | ---: | --- | --- | --- |
| CE-01 | | | | | | Open |

Severity definitions:

- **Critical:** prevents completing a core task, creates a materially wrong decision, exposes private data, or blocks keyboard/screen-reader use. Must fix before launch.
- **High:** causes repeated failure or misunderstanding for a core task. Fix before launch unless follow-up testing disproves it.
- **Medium:** creates hesitation or avoidable effort but participants can recover. Fix when the change is clear and low-risk; otherwise test the proposed change.
- **Low:** isolated polish or preference that does not affect comprehension or completion. Do not change the product solely to satisfy one comment.

## Synthesis table

Calculate percentages only when at least five participants attempted the task. Otherwise report the count and observations.

| Release measure | Independent successes | Attempts | Result | Threshold | Pass? |
| --- | ---: | ---: | ---: | ---: | --- |
| Found two plausible careers | | | | 80% | |
| Stated an evidence-based trade-off | | | | 75% | |
| Reached or correctly interpreted a local route | | | | 70% | |
| Distinguished median pay from starting pay | | | | 75% | |
| Saved a specific, feasible next step | | | | 70% | |

## Release decision

- [ ] At least 8 moderated sessions completed across the intended student mix.
- [ ] At least two sessions used a phone-sized screen.
- [ ] At least one session tested keyboard or screen-reader use.
- [ ] Every success threshold is met or has a documented follow-up decision.
- [ ] No critical issue remains open.
- [ ] Every high-severity issue is fixed and rechecked or explicitly disproved by follow-up evidence.
- [ ] The final source, privacy, and freshness checks pass.
- [ ] The focused Career Explorer browser tests and production build pass.

Record the final decision as `Launch`, `Fix and retest`, or `Do not launch`, followed by the evidence that supports it.
