# Scholarship Finder — eligibility taxonomy & discovery redesign (PROPOSAL)

Status: **ALL PHASES SHIPPED August 7, 2026** (owner approved the spec, then
directed all phases run in one pass, waiving the interim review gates).
- Phase 1: taxonomy registry `lib/scholarshipTaxonomy.ts` (97 nodes),
  `eligibility`/`geo` schema fields, provenance sidecar
  `data/scholarship-classifications.json`, gate `npm run check:scholarship-tags`.
- Phase 2: geo overlay initially shipped with 502 state-bound + 11 national
  records, and eligibility with 1,111 entries. METHOD NOTE: classifications
  use the officially-verified `who` sentences from the 2026-08-05 audit as
  the verification chain (`who-derived` provenance), with direct official-page
  research for ambiguous records. The queue was worked Aug 7 2026 and geo
  coverage was then completed across all 1,222 overlay records: 576
  state-bound + 646 national, covering all 1,220 currently published awards
  with zero needs-review records. Eligibility also covers all 1,220 published
  awards. The durable manual-resolution record is
  `data/scholarship-classification-resolutions.json`.
- Phase 3: synonym-expanded fuzzy haystacks, query boilerplate stripping,
  one "Filter by X" suggestion chip, strength-boosted ranking.
- Phase 4: Your-state select (hard geo filter while browsing), field-of-study
  select, More-filters panel (counts, OR-within/AND-across dimensions),
  removable pills, deep links (`?state/?field/?tag`), card chips (For: /
  Preference:).
- Phase 5: optional Match Me (`lib/scholarshipMatch.ts`,
  `empower:scholarship-profile:v1`) — deterministic verdicts; with matching ON
  the state/field selects become profile answers and nothing is excluded
  (mismatches sink greyed with reasons). Ethnicity is never asked.
Date: August 7, 2026. Dataset analyzed: 1,222 published entries
(post the 2026-08-05 QC audit, commit 63972a3).

Goal, in the owner's words: *internally, the database should understand
eligibility and niche criteria in a highly structured and accurate way;
externally, finding relevant scholarships should feel simple, fast, and
intuitive.* The curated finder and the external "More places to search"
launcher tier stay strictly separate — nothing here touches the launchers.

---

## 1 · Assessment of the current Scholarship Finder

What exists today (`components/ScholarshipFinder.tsx`, 549 lines, client):

- **Entry**: four audience doors on the page hero (`?stage=`, `?undoc=1`)
  pre-set filters; a profile-based stage default with an editable
  "Started with X" note. No account, no form, browse instantly.
- **Filters**: stage chips (All / High school / In college / Transferring),
  one "No citizenship requirement" checkbox, a saved/applied "Your list"
  overlay.
- **Search**: `lib/fuzzy` over `name + who + amount + tags` — typo-tolerant,
  relevance-ordered.
- **Sorts**: Next deadline (cycle-aware: 7–11-months-out awards grey out and
  sink with their reopen month), Biggest amount (regex max-dollar; full rides
  top), Name A–Z.
- **Cards**: deadline line + "This month" chip, no-citizenship chip, name,
  amount, the one-sentence `who`, stage labels, official-site link,
  Save / Mark applied.
- **Trust layer**: verified-by-Shinjoo footer, VERIFIED_AS_OF, suggest-a-
  scholarship band.

**Verdict: the finder is good and its philosophy is right.** The weakness is
purely that *eligibility knowledge lives in prose*. A student in Ohio scrolls
past Texas-residents-only awards; a piano player can't ask for music awards
except by luckily typing a word that appears in the `who` sentence or a tag;
nothing distinguishes "must be" from "preference given to."

## 2 · Assessment of the existing schema

`lib/scholarships.ts` — one static, hand-curated TS array. Schema:

| Field | Structure | Assessment |
|---|---|---|
| `stages: StudentStage[]` | **structured enum** | Solid. Keep as-is — it is the primary axis and the audience doors depend on it. |
| `openToUndocumented?: boolean` | **structured, conservatively set** (62 entries) | Solid. Keep as the canonical citizenship flag — a verified boolean beats a tag. |
| `who: string` | free text | The display sentence. Good editorial voice; keep as the card's human explanation. It is *not* queryable data. |
| `tags?: string[]` | free text, search-only | The problem child: **1,023 distinct tags, 645 used exactly once**, with variant spellings (`state-scholarship` / `state scholarship`, `community-college` / `community college`, `first-gen` / `first-generation`, `native` / `native-american` / `native american`). Useful as search fodder, useless as filters. |
| `amount`, `deadline`, `deadlineMonth` | display string + month int | Fine. The amount-sort regex works; deadline honesty model (month granularity, "Typically …") stays. |
| Geography | **buried in prose/tags** | ~686 of 1,642 pre-audit entries mentioned a state; post-audit the state programs remain a large fraction. Residency is almost always a *hard* requirement, and today the finder cannot act on it at all. |
| Eligibility strength | **not represented** | ~20 `who` sentences contain preference language, ~109 contain must/required language — the distinction exists in the prose and is lost to the machine. |

Also in place since Aug 5–6: `lib/scholarshipCuration.generated.ts` +
`lib/scholarshipAmountFloorExceptions.generated.ts` — audit provenance
(passed / removal / manual-review sets, owner-approved exceptions). This is
exactly the provenance discipline Part 5 asks for; the classification
pipeline below adopts the same generated-file pattern.

**What must be preserved** (unchanged, non-negotiable):

1. Browse-immediately, no account, no personal questions.
2. The four audience doors + stage chips as the primary entry.
3. All three sorts, the open/closed cycle partition, month-granularity honesty.
4. Save / Mark applied, "Your list", account sync.
5. `lib/fuzzy` as the search engine (house rule).
6. The verification footer, curation bar, and the separate launcher tier.
7. The memory contract: nothing is ever hidden from a browsing user —
   things sink and grey, they don't disappear.

---

## 3 · Proposed taxonomy (grounded in the actual 1,222 records)

Six dimensions carry real weight in this dataset. Frequencies below are from
the live records (tag + prose probes), not hypotheticals:

| Dimension | Evidence in data | Examples |
|---|---|---|
| **Field of study / career** | stem 95 · trades 85 · business 64 · nursing 26 · arts 27 · music 19 · accounting/CPA 23+ · aviation 14 · agriculture 24 · education 27 | `field.stem.engineering`, `field.trades.welding`, `field.arts.music` |
| **Identity & heritage** | heritage 60 · first-gen 34 · women 33 · black 27 · lgbtq 17+ · native 19+ · latino 14+ · aapi | `identity.first-gen`, `identity.women` |
| **Life circumstances** | disability 76 · foster 45 · health-condition 29 (cancer 10) · loss of a parent 13 · caregivers 9 · migrant-family 8 · justice-impacted 6 | `circumstance.foster-care`, `circumstance.health.cancer-survivor` |
| **Service & affiliation** | military family 59+ · veterans 30 · employer 36 · faith 19+13 · union-family 12 · first-responder 10+ · honor societies, 4-H, scouting | `affiliation.military.gold-star`, `affiliation.employer` |
| **Basis of award** | need-based 94 · merit 30 · essay/competition 24+ · service-commitment (teacher-pipeline 14, nurse corps) | `basis.need`, `basis.talent-competition` |
| **Geography** | state programs 179 tagged; state-bound entries are roughly 40 % of the list | *not tags — a structured field, see §4* |

### Registry shape

New file `lib/scholarshipTaxonomy.ts` — a flat registry with parent pointers
(dot-path ids make hierarchy self-evident):

```ts
export interface TaxonomyNode {
  id: string;            // "field.arts.music.piano"
  label: string;         // "Piano"
  parent?: string;       // "field.arts.music"
  synonyms?: string[];   // ["pianist", "keyboard"] — search-only, never shown
  sensitive?: boolean;   // circumstance.* mostly true — governs Match Me UX
}
```

- **Matching is hierarchical**: filtering on `field.arts.music` matches any
  descendant (`…music.piano`, `…music.vocal`). One `descendantsOf()` helper.
- **Depth cap 4.** Piano exists as a *leaf*, never as navigation. The UI
  only ever surfaces levels 1–2; deeper levels are reachable through search
  and the searchable field picker.
- **Curation bar for new nodes**: a niche gets a node only when ≥1 real
  entry needs it — the registry grows from records, never speculatively.
  (Rule of thumb: sibling nodes with 0 entries are deleted, not kept "for
  completeness.")
- Draft top-2-level tree (≈60 nodes total to start, sized to *this* data):

```
field:      stem (engineering, computer-science, geoscience, math-actuarial)
            health (nursing, medicine-prehealth, allied-health, dental, OT/PT)
            business (accounting-cpa, finance, insurance-risk, marketing, hospitality)
            trades (welding, electrical, hvac, automotive, construction, aviation-maintenance, diesel)
            arts (music [instrumental, vocal, composition], visual-design, writing, film-media, performing)
            education-teaching · journalism-media · agriculture · aviation-flight
            public-service · psychology-social-work · architecture-planning · environment-conservation
identity:   black · latino · native · aapi · women · lgbtq · first-gen · immigrant-refugee
circumstance: foster-care
            disability (blind-low-vision, deaf-hoh, learning-adhd, autism, physical, chronic-illness)
            health (cancer-survivor, cancer-family, specific-condition)
            loss-of-parent · caregiver · homeless · justice-impacted
            migrant-farmworker · recovery · adult-learner
affiliation: military (gold-star, veteran-self, active-duty-family, guard-reserve)
            first-responder-family · employer · union-family · religious
            membership (honor-society, 4h-scouting, greek)
basis:      need · merit-academic · talent-competition · essay-contest
            service-commitment (teacher-pipeline, health-shortage)
            athletics
```

Deliberately **not** dimensions: GPA thresholds, ages, enrollment intensity
(full/part-time) — real requirements, but they belong in the `who` sentence,
not the taxonomy; filtering on them would demand data we can't verify at
scale and questions we don't want to ask. Citizenship stays the existing
boolean. Student stage stays the existing `stages` field.

---

## 4 · Proposed schema

Additive only — every new field optional, so nothing breaks mid-migration
and unclassified entries behave exactly as today:

```ts
export type CriterionStrength = "required" | "preferred" | "relevant";

export interface EligibilityTag {
  tag: string;                 // taxonomy id, e.g. "field.arts.music"
  strength: CriterionStrength;
}

export interface Scholarship {
  // …every existing field stays untouched…

  /** Structured eligibility, classified from the OFFICIAL page.
   *  Absent = not yet classified (finder treats as today). Empty array =
   *  classified as GENERAL (no niche criteria). */
  eligibility?: EligibilityTag[];

  /** Structured geography. Residency listed here is always a HARD
   *  requirement (that's what the field means). Absent = not yet
   *  classified; { scope: "national" } = verified national. */
  geo?: { scope: "national" | "states"; states?: string[] };  // "TX", "CA"
}
```

Semantics — this is the load-bearing part:

- **required** — the applicant must satisfy it ("must be", "open only to",
  "applicants are"). Piano-required means non-pianists are not eligible.
- **preferred** — eligible without it; provider explicitly gives preference
  ("preference given to", "priority", "preferred but not required").
- **relevant** — no stated rule, but the award is plainly aimed at this
  group ("students interested in music are encouraged to apply").
- **GENERAL** — `eligibility: []`. A real classification ("we checked; no
  niche criteria"), distinct from `undefined` ("not yet checked").

A scholarship holds many tags with different strengths — e.g. undergrad
(stages) + STEM required + women required + first-gen preferred + need
relevant. Each strength is set from what the official rules actually say,
never from vibes.

**Provenance lives in a sidecar, not the shipped schema** — pattern copied
from the QC audit files: `data/scholarship-classifications.json` (or a
`.generated.ts` that no client component imports):

```jsonc
{ "id": "glenn-miller-scholarship-competition",
  "classifiedAt": "2026-08-12",
  "sourceUrl": "https://glennmiller.org/scholarships/",
  "method": "agent",            // agent | manual
  "confidence": "verified",     // verified | needs-review
  "evidence": "…quoted eligibility sentence from the official page…" }
```

**Bundle honesty**: the full list already ships client-side. ~4 tags × 1,222
entries adds roughly 250 KB raw / ~30 KB gzipped (slugs compress hard). If
that ever bites, the escape hatch is the search-index precedent: serve the
list from a force-static API route and fetch on mount. Not needed now;
flagged so it's a decision, not a surprise.

`tags` (the free-text field) stays during migration as search fodder, then
shrinks to only what the taxonomy + synonyms don't cover (proper nouns,
program-specific words). Never displayed, as today.

---

## 5 · REQUIRED vs PREFERRED vs RELEVANT — how each layer uses it

| Layer | required | preferred | relevant |
|---|---|---|---|
| **Filtering** | Checking a filter includes all three strengths (a music filter should surface music-relevant awards). Cards say which. | included | included |
| **Geography filter** | Selecting a state shows national + that state and **drops other states' required-residency awards** — the one place hard exclusion is correct while browsing, because it's factual, not personal. | — | — |
| **Search ranking** | strongest boost | medium | light |
| **Card display** | "For: music students" chip (solid) | "Preference: first-gen" chip (outlined, lighter) | no chip — relevance shows through search/filters, not badges |
| **Match Me** | unmet → *Likely not eligible* (sinks, greyed, explained — never hidden) | unmet → no penalty; met → upgrades toward Strong match. **Never treated as a requirement.** | met → upgrades toward Strong match |
| **Eligibility explanations** | "Requires Ohio residency." | "You're eligible; preference is given to first-generation students." | "Especially relevant to music students." |

The two failure modes this design forbids:
1. Preference promoted to requirement (locks eligible students out).
2. A required criterion soft-pedaled as relevant (wastes a student's
   application on an award they can't win).
When classification is uncertain between two strengths, the rule is: assign
the **weaker** strength and flag `needs-review` — the conservative error
direction for browsing (nobody is wrongly excluded), corrected by review.

---

## 6 · Migration & classification strategy

No big-bang. The same wave mechanics as the scholarship expansion itself
(batches, evidence, verify, ship), reusing the QC audit's provenance
pattern:

1. **Seed pass (cheap, local)** — normalize the existing 1,023 free-text
   tags into taxonomy candidates (`first-gen`/`first-generation` → one node)
   and parse the `who` sentences for stated strengths ("preference for…").
   Output: *draft* classifications marked `confidence: needs-review`. Never
   shipped as-is — this only orders the work.
2. **Official-source waves (~120–150 entries per batch)** — research agents
   fetch each award's official eligibility page, quote the operative
   sentence as evidence, and emit tags + strengths under hard rules:
   - must / only / open to → `required`
   - preference / priority / additional consideration → `preferred`
   - encouraged / aimed at / especially → `relevant`
   - **never** infer from the award's title; **never** let a broad category
     imply a narrow niche (music award ≠ piano required); ambiguity →
     weaker strength + `needs-review`.
3. **Adversarial verify on every `required`** — a second, independent pass
   tries to *refute* each required tag (the costly error is a false
   requirement: it silently buries the award for everyone else in Match Me).
   Same lesson as the opportunities pipeline: finders overclaim; verifiers
   catch it.
4. **Review queue** — `needs-review` records surface in a small
   `/admin/scholarship-review` style list (or a doc table, owner's pick) —
   same closure discipline as the Aug 5 audit queue.
5. **Ship per wave.** Classified entries light up in search/filters
   immediately; unclassified entries behave exactly as today. A
   `scripts/check-scholarship-tags.mjs` gate: every `eligibility.tag` must
   exist in the registry, every classified entry must have a provenance
   record, exit 1 otherwise (the `check:links` pattern).
6. **Freshness**: one `lib/freshness.ts` entry — classifications re-verify
   on the same yearly sweep as the URLs (rules change less often than
   deadlines; spot-check strengths on the entries whose pages changed).

---

## 7–8 · Default finder UI & desktop experience

The default view keeps its exact skeleton and adds **one row**:

```
[All] [High school] [In college] [Transferring]   ☐ No citizenship requirement
[ Search: piano, nursing, single mom, veteran…  ]  [Sort: Next deadline ▾]
[Your state ▾]  [Field of study ▾]  [More filters]        ← NEW (one row)
1,204 open now · 18 between cycles …
```

- **Your state** — single select, the highest-value new filter (~40 % of the
  list is state-bound). Behavior: national awards + your state's, other
  states' residency-required awards drop. Persisted locally; prefilled from
  Match Me if it exists, never required.
- **Field of study** — searchable select showing the ~14 top-level fields;
  typing reaches subcategories and leaves ("pia…" → Music → includes piano).
  Selecting a parent includes all descendants.
- **More filters** — a collapsed panel (not a drawer on desktop; it expands
  in place below the row). Inside, grouped checkboxes, *only groups and
  options that have live entries, with counts*:
  - **Military & service** (military family, gold-star, veteran, first
    responder family…)
  - **Life circumstances** (foster care, disability, health condition, lost
    a parent, caregiver…) — one calm line above the group: "Only used to
    filter this list on this device."
  - **Identity** (first-gen, women, Black, Latino, Native, AAPI, LGBTQ+…)
  - **Award basis** (need-based, merit, competition/contest…)
- Active filters render as removable `×` pills above the count line, with
  one "Clear all". The count line already exists; it now names active
  filters (it already does this for stage/undoc).
- **Never shown**: a dropdown per niche. Piano, violin, cello live *inside*
  Music via search and the field picker — exactly the brief's rule.
- Audience doors gain matching deep-link params (`?state=OH`,
  `?field=field.trades`) so guides can slice the finder contextually.

Everything else — cards grid, cycle greying, Your list, verification footer,
suggest band — unchanged.

## 9 · Mobile experience

- Stage chips: unchanged (they already wrap).
- The new filter row collapses to two controls: `[Filters (2)]` `[Sort ▾]` —
  the Filters button opens a **bottom-sheet drawer** (state select, field
  search, the grouped checkboxes), Apply/Clear buttons pinned at its foot.
  Count badge shows active-filter count.
- Active-filter pills scroll horizontally in one thin row.
- Result count + "Clear all" stay visible above the cards.
- No-results state keeps today's honest copy and adds one line naming the
  narrowest active filter ("Nothing matches Music in Ohio — try clearing
  Ohio: 12 national music awards exist").

## 10 · Search system (no paid infra)

1,222 records, client-side, already fuzzy — the right architecture is more
signal, not more machinery:

- **Synonyms from the registry** — each node's `synonyms` fold into the
  fuzzy haystack of every scholarship carrying that tag (or a descendant).
  "piano" then finds every `field.arts.music`-tagged award even when the
  word never appears in its prose.
- **Query → filter suggestion** — when query tokens fuzzy-match a taxonomy
  node, show one suggestion chip above results: *"Filter by Music (19) ×"*.
  Click converts the search into the structured filter. Typed searches keep
  working as pure text search — the chip is an offer, not a takeover.
- **Phrase stripping** — "scholarships for piano players" strips the
  boilerplate head ("scholarships for", "awards for") before scoring, so
  natural-language phrasing behaves like keywords. `lib/fuzzy` untouched;
  this is a pre-processing step in the finder.
- **Strength-aware ranking** — tag hits add to the fuzzy score: required >
  preferred > relevant, then the existing name/who weighting.

Worked queries: *piano players* → music-tagged (required first) ·
*cancer survivors* → `circumstance.health.cancer-survivor` + synonym
"survivor" · *children of veterans* → `affiliation.military` descendants ·
*Economics majors* → `field.business.finance`/econ synonyms · *transfer
students studying nursing* → "transfer" hits the stage synonym → suggestion
chip sets stage=transfer, "nursing" matches `field.health.nursing`.

**Why no AI search**: embeddings/LLM query parsing would add a vendor bill,
latency, and an inference layer to a 1,222-item list whose entire semantic
space fits in ~60 taxonomy nodes + synonyms. Cost of the proposal above: $0
and no new dependencies. If the list someday reaches 5,000+ with fuzzier
user language, revisit; the structured tags built now are exactly what an
AI layer would need anyway.

## 11 · Optional "Match me" experience

A collapsed card between the controls and the grid: **"Get matched —
optional. Answers stay on this device (and your account if you sign in),
and only sort this list."**

- **Progressive, all-optional steps**: stage (prefilled from the existing
  profile default) → state → field of study → then explicit *opt-in*
  expanders: "Family & service connections?" (military family, first
  responder, union, employer) → "Anything else that fits you?" (the
  sensitive circumstance list, each phrased as an offer, with a skip-all).
  Nothing is a wall; closing the card mid-way keeps whatever was given.
- Storage: `empower:scholarship-profile:v1`, added to accountSync MAP_KEYS,
  cleared with one "Forget this" link. Feeds `readContext()`-style prefills
  both ways (stage from profile in; nothing flows out to other surfaces
  without its own consent moment).
- **Deterministic verdicts** (no AI), computed per scholarship:
  - **Strong match** — all known requireds satisfied + ≥1 preferred/relevant
    matched. *"Strong match: open to undergrads; preference for
    first-generation students — that's you."*
  - **Likely eligible** — all known requireds satisfied. *"Likely eligible:
    open to undergraduates nationwide."*
  - **More info needed** — a required dimension the user didn't answer.
    *"Has a state-residency requirement — add your state to check."*
  - **Likely not eligible** — a known required unmet. Sinks below, greyed
    (the closed-cycle pattern), with the reason: *"Requires Texas
    residency."* Never hidden; never phrased as a verdict on the person.
  - Wording never claims certainty — "appears", "likely" — and every card
    keeps its official-site link as the final word.
- Matched view = a sort overlay on the same list (like Your list), not a
  separate page. Turning it off restores the plain finder instantly.

## 12 · Card design

Today's card + **at most one new line** (chips, max 2, priority order):

1. The most specific `required` niche tag → `For: music students` /
   `For: children of fallen service members` (solid outline chip).
2. One `preferred` tag if room → `Preference: first-gen` (lighter chip).
3. `relevant` tags never chip — they surface via search/filter, not badges.
4. GENERAL awards get no new chips (most cards stay exactly as clean as
   today — only genuinely niche awards grow a line).

Stage labels, no-citizenship chip, deadline, amount, who-sentence, save
row: unchanged. When Match Me is on, the chip line is replaced by the
verdict line (one line, colored dot + reason). The full requirement list
stays where it lives today: the official site (we deliberately have no
detail page to drift out of date — the `who` sentence + chips + official
link is the honest surface).

## 13 · Worked examples (real records, current data)

| Award | stages | geo | eligibility (tag → strength) |
|---|---|---|---|
| **Gates** (broad) | high-school | national | `basis.need → required` (Pell-eligible), `identity.minority-serving → required`, `basis.merit-academic → relevant`. |
| **TEXAS Grant** (state) | hs, college | states: [TX] | `basis.need → required`. Geography does the heavy lifting — structured, not a tag. |
| **Glenn Miller Scholarship Competition** (niche talent) | hs, college | national | `field.arts.music → required`, `basis.talent-competition → required`. A pianist finds it via "piano" (synonym on music.instrumental); a non-musician's Match Me sinks it: "Requires a music audition." |
| **Spencer RMI Undergraduate** (the preference case) | college | national | `field.business.insurance-risk → preferred` (official: "RMI major preferred **but not required**"), `field.business → relevant`. A biology major browsing insurance careers still sees it as open — exactly the distinction the brief demands. |
| **Fallen Patriots** (hard family circumstance) | all three | national | `affiliation.military.gold-star → required`, `circumstance.loss-of-parent → required`, `basis.need → relevant`. Never surfaces as a "likely match" for anyone who hasn't matched those; findable by "children of veterans" search. |
| **NM Childhood Cancer Survivor** | hs, college | national | `circumstance.health.cancer-survivor → required`, `basis.need → required`. Citizenship stays the boolean (`openToUndocumented` absent = not verified open). |
| **Aysen Tunca (SPS)** (stacked strengths) | college | national | `field.stem → required`, `identity.women → required`, `affiliation.membership.honor-society → required` (SPS member), `identity.first-gen → preferred`. One award, four criteria, three strengths — the schema holds it without flattening. |

## 14 · User journeys

- **A · "Deadlines coming soon"** — lands, does nothing: default sort is
  already next-deadline with this-month chips. Zero new friction.
- **B · Economics major** — types "economics" → suggestion chip "Filter by
  Business & Finance (64)" or just reads relevance-ranked results. One
  interaction.
- **C · Piano player** — types "piano" → synonym match on music-tagged
  awards, required-first. Sees `For: music students` chips. Two of them are
  competitions — the basis chip says so.
- **D · Unusual life circumstance** — opens More filters → Life
  circumstances → sees only *real* options with counts (foster care 45,
  disability 70+, cancer 10, lost a parent 13…). The counts themselves
  answer "do scholarships exist for people like me?" — yes, and here's how
  many. Nothing about them was asked; they opened a list.
- **E · "Let me browse"** — today's experience, pixel-for-pixel, until they
  touch a new control.
- **F · "Tell the site once"** — Match Me, five optional questions, verdict-
  sorted list with reasons; profile persists locally + account sync;
  one-click forget.

## 15 · Incremental implementation plan

Each phase ships independently and leaves the finder fully working:

| Phase | Scope | Risk |
|---|---|---|
| **1. Foundations** | Taxonomy registry + `EligibilityTag`/`geo` types + check script + provenance sidecar format. Pilot-classify ~150 entries (the state programs first — geo is mechanical and highest-value). No UI change. | none (additive) |
| **2. Classification waves** | Official-source batches of ~120–150 with evidence + adversarial verify on requireds + review queue. Geo likely completes in 1–2 waves; full eligibility over several. | editorial time |
| **3. Search upgrade** | Synonyms in haystack, phrase stripping, suggestion chips, strength-aware ranking. Works with partial classification. | low |
| **4. Filter UI** | State select, field picker, More-filters panel, pills, mobile drawer, card chips. Options render only where classified data exists. | medium (the visible change — owner reviews design first) |
| **5. Match Me** | Profile card, verdict engine, matched view, storage + sync. | medium (copy sensitivity — owner reviews wording) |

Suggested review gates: owner approves this spec → phase 1–2 run → owner
sees the classified data in a review table → phases 3–4 UI mock before
build → phase 5 copy review before build.

---

### Explicitly out of scope / unchanged

- The external launcher tier ("More places to search") — never mixed in.
- Sorting options — all three preserved verbatim.
- The `who` sentence, verification footer, audience doors, save/applied.
- No account requirement anywhere; no sensitive question ever blocks browse.
- No AI/paid search infrastructure.
