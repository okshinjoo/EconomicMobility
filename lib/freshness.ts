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
    what: `${careers.length} careers (comprehensive): median pay + pay range (10th–90th pct) + U.S. employment + annual openings, growth (2024–34 projections), typical entry education.`,
    files: ["lib/careers.ts", "lib/careerDetails.ts"],
    publicVintage: CAREER_DATA_VINTAGE,
    lastVerified: "July 18, 2026. TWO vintages by design: the original 100 carry May 2025 OEWS pay (31 with the verified payLow/payHigh/numJobs range, 69 pending the API-quota backfill). WAVES 1–5 added 257 careers (100 → 357, comprehensive) from the BLS Employment Projections table (2024 wage + 2024–34 growth/openings/education) — their May 2025 pay range backfills from the OEWS API later. annualOpenings (2024–34 avg) was added for all via the EP table. Cards/pages show an em dash where a range is still pending; top-coded medians render as \"$239,200+\" via payLabel(). Wave 5 added the aspirational low-headcount careers (surgeon, AI researcher, nurse anesthetist, etc.). Remaining uncovered SOCs are residual/niche or lack an honest annual wage (actors/musicians/military — deliberately excluded).",
    cadence: "Each spring when BLS publishes the new OEWS wage survey; projections refresh in fall (2025–35 set expected fall 2026).",
    nextDueISO: "2026-11-15",
    recipe:
      "BACKFILL FIRST (owed): fill payLow/payHigh/numJobs for the ~69 careers still missing them in lib/careerDetails.ts. METHOD (much easier than downloading zips): the BLS public JSON API at api.bls.gov/publicAPI/v2/timeseries/data/ works keyless (POST {seriesid:[...], latest:'true'}, cap 25 series/query, ~25 queries/day per IP). OEWS national series id = 'OEUN' + 13 zeros + <6-digit SOC, no dash> + <datatype>; datatypes 01=employment, 11=annual p10, 13=annual median, 15=annual p90. Every career's SOC already lives in lib/careerDetails.ts (the `soc` field) — pull the ones missing payLow, strip the dash, query. Verify each by matching API datatype-13 to that career's stored medianPay (in lib/careers.ts) before trusting p10/p90; a mismatch means the SOC is wrong (the 69 pending SOCs are hand-assigned and unverified). THEN ONGOING: FALL 2026 the 2025–35 projections publish — update growth + projection years. SPRING 2027 May 2026 OEWS — re-pull all series by SOC via the same API, update medianPay/payLow/payHigh/numJobs, bump CAREER_DATA_VINTAGE. Spot-check earnWhileTraining flags each pass (strict rule: genuinely paid pathways only). EXPANSION SOURCE (adding more careers): the BLS Employment Projections 'Occupational projections and worker characteristics' table (bls.gov/emp/tables/occupational-projections-and-characteristics.htm) is a static HTML table of all ~832 detailed occupations with SOC, growth %, annual openings, 2024 median wage, and typical entry education — scrape it in a real browser (parse the live DOM table), NO rate limit. That is the master occupation list + the growth/openings/education source; OEWS API supplies the May 2025 median + 10th/90th range per SOC. New careers can ship on EP data immediately (2024 wage, tagged) and upgrade to May 2025 via the API backfill.",
  },
  {
    id: "colleges-cds",
    name: "Compare Colleges — CDS profiles",
    what: `${colleges.length} colleges: admit rates, C7 factor weights, need/test policies, aid notes.`,
    files: ["lib/collegeProfiles.ts"],
    publicVintage: COLLEGE_DATA_VINTAGE,
    lastVerified: "July 2026",
    cadence: "Each admissions cycle, when the new Common Data Sets publish (fall–winter).",
    nextDueISO: "2026-12-01",
    recipe:
      "Pull each school's 2025–26 CDS (usually at <school>.edu 'common data set'), update admit rate + C7 rows + test policy, re-check need-blind/meets-full-need claims against current aid pages, bump COLLEGE_DATA_VINTAGE. Null still means not-published — never invent.",
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
    lastVerified: "July 18, 2026",
    cadence: "Yearly.",
    nextDueISO: "2027-07-01",
    recipe:
      "node scripts/check-scholarships.mjs on every URL; browser-confirm 403s before cutting; refresh 'Typically <month>' deadlines that shifted; keep the curation bar (no fees, no data harvesting); bump VERIFIED_AS_OF.",
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
