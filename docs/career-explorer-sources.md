# Career Explorer data and coverage policy

## Current sources

The Career Explorer uses public federal sources so that cards and profiles do not mix commercial estimates, crowdsourced salaries, or unexplained projections.

| Explorer field | Source | Current vintage |
| --- | --- | --- |
| Median annual/hourly pay, 10th and 90th percentile pay, national employment | [Occupational Employment and Wage Statistics (OEWS)](https://www.bls.gov/oes/tables.htm) | May 2025 |
| Projected growth, annual openings, entry education, related experience, on-the-job training, self-employment share | [Employment Projections: Occupational projections and worker characteristics](https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm) | 2024–34 |
| Plain-language duties and work context | [Occupational Outlook Handbook](https://www.bls.gov/ooh/) | Current page linked on each profile where available |
| Statewide annual/hourly medians | [OEWS state estimates](https://www.bls.gov/oes/current/oessrcma.htm) | May 2025 |
| Detailed tasks, alternate titles, interests, work styles, software examples, and preparation level | [O*NET Database](https://www.onetcenter.org/database.html) | O*NET 30.3 |
| State licensing and recognized certifications | [CareerOneStop](https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx) | Live federal finder linked from every profile |
| Paid apprenticeship openings | [Apprenticeship.gov](https://www.apprenticeship.gov/apprenticeship-job-finder) | Live federal finder linked from careers with a paid route |

`lib/careers.ts` contains card-level facts. `lib/careerDetails.ts` and `lib/careerAdditions.ts` contain SOC mappings and profiles. `lib/careerEnrichment.ts` is generated from the official O*NET workbooks. `public/data/career-state-wages-2025.json` is generated from the BLS OEWS data service and is loaded only when a visitor chooses a state. Every profile displays its SOC code and links back to the relevant federal sources.

O*NET is mapped only when the Career Explorer's SOC and title resolve to a specific occupation with rated task-and-fit data. The current release maps 464 of 474 careers. Ten umbrella or residual careers intentionally omit O*NET details because attaching one narrower specialty—or showing an empty residual profile—would be misleading. State wages are also left blank when BLS suppresses an estimate because the sample is too small.

## What “comprehensive” means here

The August 2026 audit reviewed all 832 detailed line items in the BLS projections table. The published catalog has 474 entries. Inclusion is based on whether a student may reasonably search for the career as a distinct path—not on reaching a larger count.

We include recognizable jobs, meaningful career-ladder steps, distinct licensed specialties, creative careers, academic sciences, and technician paths. We consolidate subject-by-subject postsecondary-teacher codes into College Professor and omit residual “all other” codes, near-identical machine-operator variants, grade-specific duplicates, and summary rows already represented by detailed careers. Military occupations are excluded because comparable civilian OEWS wage data are not available.

Actor, Musician / Singer, and Dancer use hourly wages because BLS publishes hourly but not annual estimates for those irregular schedules. Fishing / Hunting Worker remains in the catalog with pay marked “not published”: the work is recognizable and BLS publishes employment and outlook, but OEWS does not collect a representative wage estimate for this heavily self-employed occupation. We never annualize or invent those figures.

## Refresh workflow

1. Export the national current-year OEWS rows from the official BLS OEWS data application.
2. Export every row of the BLS occupational projections table, preserving the summary rows needed for consolidated careers.
3. Run `scripts/sync-career-data.mjs <oews-json> <projections-json>`.
4. Update `CAREER_DATA_VINTAGE` if either source vintage changed.
5. Run `npm run check:careers`, lint, and the production build.
6. Review new or retired SOC codes manually. The refresh script updates facts; it does not decide that a BLS residual category deserves a new student-facing career.
7. For a new O*NET release, download and extract the Excel database, then run `npm run build:career-enrichment -- /path/to/db_##_#_excel`. Review every unmatched or ambiguous title printed by the script before committing the generated profile and search-index files.
8. For a new OEWS release, update the release code and vintage in `scripts/build-career-state-wages.mjs`, run `npm run build:career-state-wages`, and spot-check at least one large and one small state against the published BLS table.

The large raw source workbooks and API responses are intentionally not checked into the repository. The generated browser-ready state table is checked in so the live site does not depend on BLS availability or API limits. The build scripts record the repeatable field mappings, while this document records the selection policy.
