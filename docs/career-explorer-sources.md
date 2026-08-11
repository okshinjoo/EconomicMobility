# Career Explorer data and coverage policy

## Current sources

The Career Explorer uses public federal sources so that cards and profiles do not mix commercial estimates, crowdsourced salaries, or unexplained projections.

| Explorer field | Source | Current vintage |
| --- | --- | --- |
| Median annual/hourly pay, 10th and 90th percentile pay, national employment | [Occupational Employment and Wage Statistics (OEWS)](https://www.bls.gov/oes/tables.htm) | May 2025 |
| Projected growth, annual openings, entry education, related experience, on-the-job training, self-employment share | [Employment Projections: Occupational projections and worker characteristics](https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm) | 2024–34 |
| Plain-language duties and work context | [Occupational Outlook Handbook](https://www.bls.gov/ooh/) | Current page linked on each profile where available |
| Statewide annual/hourly medians | [OEWS state estimates](https://www.bls.gov/oes/2025/may/oessrcst.htm) | May 2025 |
| Metropolitan-area annual/hourly medians | [OEWS metropolitan estimates](https://www.bls.gov/oes/2025/may/oessrcma.htm) | May 2025 |
| Detailed tasks, alternate titles, interests, work styles, software examples, preparation level, and work context | [O*NET Database](https://www.onetcenter.org/database.html) | O*NET 30.3 |
| Public tuition baseline used in entry-cost comparisons | [NCES Digest table 330.20](https://nces.ed.gov/programs/digest/d23/tables/dt23_330.20.asp) | 2022–23 public two-year and four-year averages |
| Full validated interest assessment linked after the optional Empower sampler | [O*NET Interest Profiler](https://www.onetcenter.org/IP.html) | Official 30-question Mini-IP linked; not modified or reproduced |
| State and federal occupational licenses, requirements, and issuing agencies | [CareerOneStop occupational-license download](https://www.careeronestop.org/Developers/Data/occupational-licenses.aspx) | October 2024 nationwide export, latest posted export verified August 10, 2026 |
| Public colleges and technical schools with career-matched programs | [NCES IPEDS institutions and completions](https://nces.ed.gov/ipeds/use-the-data) joined through the [O*NET CIP crosswalk](https://www.onetcenter.org/crosswalks.html) | 2023–24 completions; July 2024 crosswalk |
| Registered Apprenticeship occupation routes | [O*NET RAPIDS crosswalk](https://www.onetcenter.org/crosswalks.html) | March 2026 |
| Registered Apprenticeship sponsors by occupation and state | [Apprenticeship.gov Partner Finder](https://www.apprenticeship.gov/partner-finder/listings) | Live index snapshot August 10, 2026 |
| Current apprenticeship openings | [Apprenticeship.gov Job Finder](https://www.apprenticeship.gov/apprenticeship-job-finder) | Live federal finder linked from every local pathway result |

`lib/careers.ts` contains card-level facts. `lib/careerDetails.ts` and `lib/careerAdditions.ts` contain SOC mappings and profiles. `lib/careerEnrichment.ts` and `lib/careerWorkContext.ts` are generated from the official O*NET workbooks. `public/data/career-state-wages-2025.json` and the state-split `public/data/career-metro-wages/` files are generated from the BLS OEWS data service. `public/data/career-pathways/` contains normalized, state-split licensing, public-program, and Registered Apprenticeship sponsor records. Local files are loaded only after a visitor chooses a state. Every profile displays its SOC code and links back to the relevant federal sources.

O*NET is mapped only when the Career Explorer's SOC and title resolve to a specific occupation with rated task-and-fit data. The current release maps 464 of 474 careers, including 450 with enough Work Context data for physical-demand, schedule, and remote-compatibility summaries. Ten umbrella or residual careers intentionally omit O*NET details because attaching one narrower specialty—or showing an empty residual profile—would be misleading. State and metro wages are also left blank when BLS suppresses an estimate because the sample is too small.

Remote compatibility is an Empower heuristic built from O*NET Work Context signals such as outdoor work, physical proximity, face-to-face interaction, and use of electronic communication. It is not an observed telework rate, employer policy, or promise that a role can be performed remotely. Education-cost comparisons use transparent public-tuition baselines before aid, living costs, books, tools, or program-specific charges; they are not quotes from a particular school.

The twelve-question Career Fit Sampler uses original Empower work-activity prompts and matches the response pattern to O*NET career interests and work styles. It is an exploration aid, not a psychological test. We do not shorten or rewrite the validated O*NET Interest Profiler and call it equivalent; the results page links to the official 30-question Mini-IP for students who want the validated instrument.

The local pathway layer is evidence, not a guarantee. A CareerOneStop record may lag a rule change or omit a local license, so the profile shows its record date and points to the issuing agency for confirmation. An IPEDS completion shows that a public institution awarded a matching credential in 2023–24; it does not guarantee that the program is accepting students now. An Apprenticeship.gov sponsor is a registered sponsor, not necessarily a current job opening, so profiles label it that way and provide a separate live-opening search. Optional distance sorting happens in the visitor's browser and does not store or transmit their location to Empower.

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
7. For a new O*NET release, download and extract the Excel database, then run `npm run build:career-enrichment -- /path/to/db_##_#_excel` and `npm run build:career-work-context -- /path/to/db_##_#_excel`. Review every unmatched or ambiguous title and re-check the remote/physical benchmark occupations before committing generated files.
8. For a new OEWS release, update the release code and vintage in both wage builders. Refresh `scripts/data/bls-metro-area-index-2025.json` from the official release's metropolitan-area index, run `npm run build:career-state-wages` and `npm run build:career-metro-wages`, then spot-check one large and one small state plus one cross-state metro against the published BLS table.
9. When NCES publishes a newer Digest table, update the cited public two-year and four-year tuition averages in `lib/careerDecisionFacts.ts`. Keep the before-aid and excluded-cost disclosures visible.
10. Run `npm run build:career-pathways` to refresh the latest posted CareerOneStop license export, NCES IPEDS institutions/completions, O*NET CIP and RAPIDS crosswalks, and the current Apprenticeship.gov sponsor index. The script discovers the public Apprenticeship.gov search configuration at run time; it does not store the site's public search key.
11. Review both manifests, then spot-check a licensed trade, a healthcare occupation, a bachelor's-level occupation, and a state with sparse records. Confirm that sponsors are described as sponsors rather than openings and that empty results do not claim a license or program does not exist.

The large raw source workbooks and API responses are intentionally not checked into the repository. The generated browser-ready state tables are checked in so the live site does not depend on federal source availability or API limits. Pathway files normalize institutions, licenses, and sponsors once per state, then reference them from each matching career. The build scripts record the repeatable field mappings, while this document records the selection policy.
