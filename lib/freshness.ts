// The freshness registry (July 17, 2026, owner ask: "turn annual upkeep
// from memory-dependent to systematic"). Every dated dataset on the site,
// in one place: what it is, when it was last verified, when it's next due,
// and the exact re-verify recipe. Rendered at /admin/freshness (noindex,
// bookmark it); scripts/check-freshness.mjs (npm run check:freshness)
// exits loudly when anything is overdue.
//
// RULES: (1) when you re-verify a dataset, bump its lastVerified +
// nextDueISO here IN THE SAME COMMIT as the data change — and bump the
// public vintage constant (VERIFIED_AS_OF etc.) where one exists; those
// constants stay the single source for what READERS see, this registry is
// the schedule. (2) When a new year-tagged dataset ships, add an entry.
// nextDueISO must stay a literal ISO string — the check script regexes it.

import { scholarships } from "./scholarships";
import { opportunities } from "./opportunities";
import { colleges } from "./collegeProfiles";
import { VERIFIED_AS_OF } from "@/lib/scholarships";
import { OPPS_VERIFIED_AS_OF } from "@/lib/opportunities";
import { COLLEGE_DATA_VINTAGE } from "@/lib/collegeProfiles";
import { careers, CAREER_DATA_VINTAGE } from "@/lib/careers";

export interface FreshnessEntry {
  id: string;
  name: string;
  /** What the dataset is, with its live size/scope. */
  what: string;
  /** Where the data lives (edit here) — repo paths. */
  files: string[];
  /** The public vintage label readers see, where one exists. */
  publicVintage?: string;
  lastVerified: string;
  cadence: string;
  /** Literal ISO date — the check script regexes this field. */
  nextDueISO: string;
  /** Exactly how to re-verify, step by step. */
  recipe: string;
}

export const freshness: FreshnessEntry[] = [
  {
    id: "careers-bls",
    name: "Career Explorer — BLS data",
    what: `${careers.length} distinct careers: national, state, and metro pay + pay range + U.S. employment + annual openings, growth, entry education, 464 specific O*NET task-and-fit profiles, and 450 O*NET work-context profiles.`,
    files: [
      "lib/careers.ts",
      "lib/careerDetails.ts",
      "lib/careerAdditions.ts",
      "scripts/sync-career-data.mjs",
      "scripts/check-careers.mjs",
      "lib/careerEnrichment.ts",
      "lib/careerWorkContext.ts",
      "lib/careerDecisionFacts.ts",
      "lib/careerFit.ts",
      "lib/careerSearchTerms.ts",
      "public/data/career-state-wages-2025.json",
      "public/data/career-metro-wages/*.json",
      "scripts/data/bls-metro-area-index-2025.json",
      "scripts/build-career-enrichment.mjs",
      "scripts/build-career-work-context.mjs",
      "scripts/build-career-state-wages.mjs",
      "scripts/build-career-metro-wages.mjs",
      "docs/career-explorer-sources.md",
    ],
    publicVintage: CAREER_DATA_VINTAGE,
    lastVerified: "August 10, 2026. All 474 careers were reconciled to May 2025 OEWS national pay and employment plus BLS 2024–34 growth, openings, education, experience, training, and self-employment fields. The explorer carries 21,430 publishable state wage records, 387 unique metropolitan areas with 119,494 state-area-career records, 464 O*NET 30.3 task-and-fit profiles, and 450 O*NET work-context profiles. Ten umbrella or residual occupations remain intentionally unmapped rather than borrowing a narrower specialty. Suppressed wage estimates remain blank. Remote compatibility is clearly labeled as an Empower heuristic, and entry-cost comparisons disclose their NCES public-tuition baseline and exclusions.",
    cadence: "Each spring when BLS publishes the new OEWS wage survey; projections refresh in fall (2025–35 set expected fall 2026).",
    nextDueISO: "2026-11-15",
    recipe:
      "Retrieve the current national OEWS datatype table from data.bls.gov and the full Occupational projections table from bls.gov. Run scripts/sync-career-data.mjs; refresh state and metro tables with both BLS wage builders and an updated official area-index snapshot; refresh O*NET enrichment and work context from the same database release; and update the NCES public-tuition baseline when its source table changes. Update public vintages, then run npm run check:careers, lint, and build. Manually review new, retired, unmatched, or ambiguous SOCs against docs/career-explorer-sources.md; never force a broad career onto one narrow O*NET specialty. Re-check strict earnWhileTraining claims, heuristic disclosures, and the federal licensing/apprenticeship links.",
  },
  {
    id: "colleges-cds",
    name: "Compare Colleges — CDS profiles",
    what: `${colleges.length} colleges across all 50 states, DC, Puerto Rico, and the US Virgin Islands: admit rates, an 18-factor current C7 model, need/test policies, aid notes.`,
    files: [
      "lib/collegeProfiles.ts",
      "lib/collegeProfilesExpanded.ts",
      "scripts/build-college-catalog.mjs",
      "scripts/check-college-profiles.mjs",
    ],
    publicVintage: COLLEGE_DATA_VINTAGE,
    lastVerified: "August 10, 2026 (expanded to 553 schools; 423 profiles link to a school-published CDS, all 431 generated profiles link to NCES College Navigator, and 53 student-demand/access priorities were added without displacing the original 500; strict C7 extraction preserves partial and unavailable tables).",
    cadence: "Each admissions cycle, when the new Common Data Sets publish (fall–winter).",
    nextDueISO: "2026-12-01",
    recipe:
      "Run npm run build:college-catalog to refresh the 431 generated profiles from the public CDS archive, direct school sources, and NCES/IPEDS baseline facts, then npm run check:colleges. Review source-age and extraction-status counts, re-audit the 53 IPEDS-pinned priority schools, spot-check C7 factors and outlier figures against school-published documents, update the 122 editorial core profiles directly, and bump COLLEGE_DATA_VINTAGE. Preserve blank, partial, unencoded, and unavailable source tables instead of guessing; keep school, federal, and archive-record links current.",
  },
  {
    id: "career-pathways",
    name: "Career Explorer — local pathways",
    what: "State and federal licensing requirements, public institutions with recent career-matched completions, approved Registered Apprenticeship occupations, and current registered sponsors across all 50 states plus DC.",
    files: [
      "components/CareerLocalPathways.tsx",
      "scripts/build-career-pathways.mjs",
      "scripts/check-careers.mjs",
      "public/data/career-pathways/*.json",
      "docs/career-explorer-sources.md",
    ],
    lastVerified: "August 10, 2026. Rebuilt from the latest posted CareerOneStop nationwide license export (October 2024), 2023–24 NCES IPEDS institutions and completions, the July 2024 O*NET CIP crosswalk, the March 2026 O*NET RAPIDS crosswalk, and a live Apprenticeship.gov Partner Finder sponsor snapshot. Generated coverage includes 21,462 license matches, 142,493 public-program matches, and more than 32,000 registered-sponsor matches. Records are state-split, source-dated, and framed as leads to verify rather than guarantees of current rules, admission, or hiring.",
    cadence: "Quarterly for sponsors and license-export availability; annually when NCES publishes a new IPEDS completions file or O*NET refreshes either crosswalk.",
    nextDueISO: "2026-11-10",
    recipe:
      "Run npm run build:career-pathways, then npm run check:careers. Review public/data/career-pathways/manifest.json for source vintages and count shifts. Spot-check California electrician, a licensed healthcare occupation, a bachelor's-level occupation, and a small-state career. Confirm CareerOneStop has not posted a newer nationwide export; confirm NCES and O*NET URLs still point to the intended vintages; verify that Apprenticeship.gov sponsor records remain distinguishable from current job openings; then update this entry's verification date and next due date.",
  },
  {
    id: "opportunities",
    name: "Opportunity Finder",
    what: `${opportunities.length} verified paid internships, fellowships, and programs.`,
    files: ["lib/opportunities.ts"],
    publicVintage: OPPS_VERIFIED_AS_OF,
    lastVerified: "July 2026",
    cadence: "Yearly, before the spring application season (many summer-2027 cycles open Sept 2026 – Jan 2027).",
    nextDueISO: "2027-01-15",
    recipe:
      "node scripts/check-opportunities.mjs on every URL (403s are usually bot-walls — confirm in a real browser). Re-check SHPEP's funding caveat and BofA Student Leaders eligibility first; verify pay/eligibility still match each entry's who/compensation; cut anything defunct or newly unpaid; bump OPPS_VERIFIED_AS_OF.",
  },
  {
    id: "tax-figures",
    name: "Tax + retirement figures in articles and calculators",
    what: "2026 federal brackets, standard deduction, FICA, EITC, 401(k)/IRA/HSA limits — stated as hard numbers across the library.",
    files: ["lib/taxData.ts", "lib/rothIra.ts", "lib/articles/*.ts (year-tagged figures)"],
    lastVerified: "July 2026",
    cadence: "Yearly in January, once the IRS's fall announcements settle.",
    nextDueISO: "2027-01-15",
    recipe:
      "Update lib/taxData.ts (brackets/deduction/FICA), lib/rothIra.ts (ROTH_LIMIT/ROTH_LIMIT_50PLUS), then grep articles for 'For 2026' / '2026 tax year' and update each figure with its year tag. Update the current-values paragraph in CLAUDE.md's Articles section last.",
  },
  {
    id: "student-aid-figures",
    name: "Student aid figures (Pell, loan rates)",
    what: "Pell max ($7,395) and Direct Loan rate (6.52%) for 2026–27, stated in the college guides.",
    files: ["lib/articles/college*.ts"],
    lastVerified: "July 2026",
    cadence: "Every July 1 — loan rates reset then; Pell per award year.",
    nextDueISO: "2027-07-01",
    recipe:
      "Grep the college articles for 'Pell' and the loan rate; update to the 2027–28 values with fresh year tags. Same pass as the money calendar below.",
  },
  {
    id: "scholarships",
    name: "Scholarship Finder",
    what: `${scholarships.length} hand-verified awards.`,
    files: ["lib/scholarships.ts"],
    publicVintage: VERIFIED_AS_OF,
    lastVerified:
      "July 19, 2026 (full source audit: every officialUrl classified official/authorized; checker now also catches login-wall redirects and separates bot-wall 403s).",
    cadence: "Yearly.",
    nextDueISO: "2027-07-01",
    recipe:
      "node scripts/check-scholarships.mjs on every URL; browser-confirm 403 bot-walls and '200 but LOGIN page' hits before cutting (iMIS association sites bounce dead pages to sign-in URLs that return 200); refresh 'Typically <month>' deadlines that shifted; keep the curation bar (no fees, no data harvesting, no aggregator/directory sources); bump VERIFIED_AS_OF. ELIGIBILITY LAYER (Aug 2026): also spot-check the geo/eligibility overlays on entries whose pages changed, work down the needs-review records in data/scholarship-classifications.json against official pages (upgrade method who-derived → agent/manual), and run npm run check:scholarship-tags before shipping. ILLINOIS/ISAC (time-boxed): the 2027-28 Alternative Application criteria publish ~Oct 1, 2026 (isac.org/AlternativeApp) — if undocumented eligibility returns, restore openToUndocumented on illinois-map + golden-apple-scholars (dated comments in lib/scholarships.ts).",
  },
  {
    id: "state-resources",
    name: "State resource highlights",
    what: "19 states' standout programs (free-college promises, state EITCs).",
    files: ["lib/stateResources.ts"],
    lastVerified: "July 2026",
    cadence: "Yearly.",
    nextDueISO: "2027-07-01",
    recipe:
      "Check Oregon Promise (funding pressure) and NY Essential Plan (eligibility tightened mid-2026) first, then every highlight URL: still official, still operating, terms unchanged. Absence of a state stays deliberate.",
  },
  {
    id: "money-calendar",
    name: "Student money calendar + deadline registry",
    what: "11 recurring dates (FAFSA windows, tax day, decision day, loan-rate reset…).",
    files: ["lib/studentCalendar.ts", "lib/deadlines.ts"],
    lastVerified: "July 2026",
    cadence: "Every July 1 (anchored to the loan-rate reset).",
    nextDueISO: "2027-07-01",
    recipe:
      "Confirm each date still holds for the coming cycle (FAFSA open Oct 1, state deadlines via /resources, CSS Profile Oct 1, Decision Day May 1). lib/deadlines.ts also feeds the .ics downloads and the email reminders — both inherit the fix.",
  },
  {
    id: "reality-check-costs",
    name: "Reality Check lifestyle costs",
    what: "National-ballpark monthly costs behind the pick-your-life stepper.",
    files: ["lib/realityCheck.ts"],
    lastVerified: "July 2026",
    cadence: "Yearly, alongside the tax-figure pass.",
    nextDueISO: "2027-01-15",
    recipe:
      "Sanity-check each category's preset costs against current national ballparks (rent, groceries, car, phone); nudge stale ones. The solver needs no changes — costs only.",
  },
  {
    id: "machine-trio",
    name: "'How the machine works' guides — live situations",
    what: "RealPage litigation framed as ongoing; private equity in 401(k)s post-2025 EO; FTC junk-fee rule status.",
    files: [
      "lib/articles/homeOwnershipExtra.ts (why-rent-keeps-going-up)",
      "lib/articles/investingMarkets.ts (private-equity-explained)",
      "lib/articles/budgetingMoney.ts (junk-fees)",
    ],
    lastVerified: "July 2026",
    cadence: "Yearly — these guides describe fights that are still moving.",
    nextDueISO: "2027-07-01",
    recipe:
      "Check whether the RealPage suits settled or resolved, whether 401(k) private-equity options actually appeared in mainstream plans, and whether the FTC all-in pricing rule survived intact; update the 'as of' phrasing in each guide.",
  },
];

/** Status vs. a given date: overdue / due within 60 days / fresh. */
export function freshnessStatus(
  entry: FreshnessEntry,
  now: Date
): "overdue" | "due-soon" | "fresh" {
  const due = new Date(entry.nextDueISO + "T00:00:00");
  if (due <= now) return "overdue";
  if (due.getTime() - now.getTime() < 60 * 24 * 60 * 60 * 1000) return "due-soon";
  return "fresh";
}
