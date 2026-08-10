# Compare Colleges: roster and data provenance

Last refreshed: August 10, 2026

The public finder contains 553 colleges across all 50 states, DC, Puerto Rico, and the US Virgin Islands. It is a comparison catalog, not a ranking. No ordinal rank, score, or implied “best college” order is stored or shown.

## How the 553-school roster is built

The first 122 profiles are the site's editorial core. They preserve the original national set, the all-state coverage expansion, and hand-checked details such as aid and transfer notes.

The remaining 431 profiles are rebuilt by `scripts/build-college-catalog.mjs` in two layers.

The original 378-profile expansion is reconstructed first:

1. Start with U.S. public and private nonprofit institutions that have a school-published Common Data Set record in the CollegeData.FYI archive.
2. Add institutions represented in the archive's current school browser, excluding editorial-core duplicates, sub-institutional records, obvious online/global campuses, and for-profit schools.
3. Fill the remaining catalog space with the largest undergraduate enrollments among the still-eligible source-linked institutions. Enrollment is used only to make the national catalog broadly useful; it is not displayed as a rank.
4. Require a valid admissions rate and a location in one of the 50 states or DC.

Then 53 audited priorities are added by exact IPEDS identifier without displacing a school in the original 500. These close the six largest fall-2024 application-volume gaps in the earlier catalog and add schools students are likely to search for: regional public universities and CUNY campuses, HBCUs, Tribal Colleges, arts-focused colleges, federal service academies, Puerto Rico and USVI institutions, and Southern New Hampshire University as an explicitly labeled online-and-campus option.

The priority additions may use federal baseline data even when a current school-published CDS could not be located. Twenty-three of the 53 link to an official CDS page or document found in the August 2026 audit; the other 30 say that a current CDS was not located and link directly to NCES College Navigator. No C7 factor is inferred from federal data.

This produces a mix of highly selective colleges, large public universities, regional campuses, liberal-arts colleges, HBCUs, religiously affiliated colleges, and institutions with much wider admissions doors. It deliberately does not claim to include every U.S. college or every school a publisher might call “top.”

## Source layers

- Common Data Set documents and normalized extracts: [CollegeData.FYI](https://www.collegedata.fyi/) and its [MIT-licensed source repository](https://github.com/bolewood/collegedata-fyi), plus direct official school CDS pages for priority schools the archive has not indexed. Each archive-derived profile retains both the original source URL and a stable archive record where available.
- Baseline institution, enrollment, admissions, testing, control, and graduation fields: source-labeled NCES/IPEDS and College Scorecard fields exposed by the same public archive. The federal [College Scorecard dataset](https://catalog.data.gov/dataset/college-scorecard) documents the underlying public data.
- Roster audit: the official IPEDS fall-2024 [Admissions and Test Scores file](https://nces.ed.gov/ipeds/complete-data-files/ADM2024.zip) and [Institutional Characteristics file](https://nces.ed.gov/ipeds/complete-data-files/HD2024.zip). Every generated profile links to its institution-specific [NCES College Navigator](https://nces.ed.gov/collegenavigator/) record.
- The Common Data Set field definitions come from the [Common Data Set Initiative](https://commondataset.org/).

The site reads these sources only during the catalog build. The generated TypeScript file is checked in, so visitors do not depend on a third-party API at page load.

## C7 admissions factors

The data model contains all 18 current C7 factors. Generated profiles accept only the four standard ratings: “Very Important,” “Important,” “Considered,” and “Not Considered.” Abbreviations are normalized; checkmarks, numbers, prose, and unfamiliar values are rejected.

A profile is labeled:

- `complete` when all 18 factors pass validation;
- `partial` when at least one but fewer than 18 factors pass;
- `not-extracted` when an archived CDS exists but no reliable C7 values are available;
- `not-encoded` when an official CDS is linked directly but its C7 table has not been encoded;
- `not-found` at the profile level when the source audit did not locate a current school-published CDS.

Near-uniform walls of “Very Important” or “Important” are suppressed because they are a known flattened-PDF extraction failure mode. Missing values remain missing in the public UI.

## Refresh and validation

Run:

```sh
npm run build:college-catalog
npm run check:colleges
```

The validator checks the 553-school total, 431 generated profiles, all 53 priority additions, 423 CDS-linked profiles, 431 federal links, unique IDs and names, valid admissions rates, all-state/DC/territory coverage, HTTPS provenance links, known C7 fields, and consistency between C7 status and extracted values.

Every refresh should also review source-year distribution, admissions-rate outliers, duplicate institutional aliases, C7 extraction patterns, and the public page on desktop and mobile. The freshness registry in `lib/freshness.ts` holds the annual update schedule.
