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

import { VERIFIED_AS_OF } from "@/lib/scholarships";
import { OPPS_VERIFIED_AS_OF } from "@/lib/opportunities";
import { COLLEGE_DATA_VINTAGE } from "@/lib/collegeProfiles";
import { CAREER_DATA_VINTAGE } from "@/lib/careers";

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
    what: "100 careers: median pay (May 2024 OES), growth (2024–34 projections), typical entry education.",
    files: ["lib/careers.ts"],
    publicVintage: CAREER_DATA_VINTAGE,
    lastVerified: "July 2026",
    cadence: "Each spring, when BLS publishes the new OES wage survey.",
    nextDueISO: "2026-08-15",
    recipe:
      "The May 2025 OES published in spring 2026, so a refresh is already possible: update medianPay per occupation from bls.gov/oes, keep growth on the 2024–34 projections until the next projection cycle, bump CAREER_DATA_VINTAGE, and spot-check earnWhileTraining flags (strict rule: genuinely paid pathways only).",
  },
  {
    id: "colleges-cds",
    name: "Compare Colleges — CDS profiles",
    what: "100 colleges: admit rates, C7 factor weights, need/test policies, aid notes.",
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
    what: "68 verified paid internships, fellowships, and programs.",
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
    what: "186 hand-verified awards.",
    files: ["lib/scholarships.ts"],
    publicVintage: VERIFIED_AS_OF,
    lastVerified: "July 2026",
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
