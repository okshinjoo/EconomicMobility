// Compare Colleges data (July 2026 — the parked preview goes live; owner ask:
// "some are need blind, some aren't — some consider religious affiliation,
// some are more holistic than others").
//
// Every profile is drawn from the college's OWN published Common Data Set
// (section C7 "relative importance of factors"), admissions releases, and aid
// pages — the 2024–25 cycle unless a note says otherwise. Honesty rules, same
// bar as the scholarships list:
//   - Figures are year-tagged; admit rates move yearly, so a point or two of
//     difference is noise, not signal.
//   - A missing value (null) means the college doesn't publish it — render
//     "—", never invent a number. GPA is a free-text NOTE (weighting systems
//     differ too much for a sortable cross-school number to be honest).
//   - No rankings, ever (house rule): sort by published facts only.
// Re-verify each cycle like article figures. To add a college: fill what its
// CDS actually says and leave the rest null.

export type C7Rating = "very" | "important" | "considered" | "no";

export type FactorId =
  | "rigor"
  | "gpa"
  | "rank"
  | "essay"
  | "recs"
  | "interview"
  | "ecs"
  | "talent"
  | "character"
  | "firstGen"
  | "legacy"
  | "interest"
  | "religion"
  | "work";

export const FACTOR_LABELS: Record<FactorId, string> = {
  rigor: "Course rigor",
  gpa: "GPA",
  rank: "Class rank",
  essay: "Essays",
  recs: "Recommendations",
  interview: "Interview",
  ecs: "Extracurriculars",
  talent: "Talent / ability",
  character: "Character",
  firstGen: "First-gen status",
  legacy: "Legacy (family ties)",
  interest: "Demonstrated interest",
  religion: "Religious affiliation",
  work: "Work experience",
};

export const RATING_LABELS: Record<C7Rating, string> = {
  very: "Very important",
  important: "Important",
  considered: "Considered",
  no: "Not considered",
};

export interface CollegeProfile {
  id: string;
  name: string;
  /** "Cambridge, MA" */
  place: string;
  control: "public" | "private";
  /** Religious affiliation, when the college has one. */
  religious?: string;
  /** Percent admitted, with the cycle it comes from. */
  admitRate: number;
  admitYear: string;
  /** null = policy in flux / not encoded — render "—". */
  testPolicy: "required" | "optional" | "blind" | null;
  testNote?: string;
  /** Published GPA info as free text (weighted vs unweighted differs). */
  gpaNote: string | null;
  /** all = need-blind incl. international · domestic = need-blind for US
   *  applicants · aware = ability to pay can be a factor. */
  needBlind: "all" | "domestic" | "aware";
  meetsFullNeed: boolean;
  aidNote?: string;
  /** CDS C7 extract — ONLY the cells we're confident of; missing = unknown. */
  factors: Partial<Record<FactorId, C7Rating>>;
  /** One honest line of personality/context. */
  note: string;
  /** Transfer admission (CDS section D) — absent = not encoded yet.
   *  The door that matters most for community-college students. */
  transfer?: {
    /** Percent of transfer applicants admitted; null = not published. */
    admitRate: number | null;
    admitYear?: string;
    /** GPA to apply / typical admitted GPA, free text (null = not published). */
    gpaNote: string | null;
    /** One-line transfer reality: guarantees, CC priority, tiny intake. */
    note?: string;
  };
}

/** The cycle most figures come from — shown publicly, re-verify yearly. */
export const COLLEGE_DATA_VINTAGE = "2024–25 admissions cycle";

export const colleges: CollegeProfile[] = [
  {
    id: "harvard",
    name: "Harvard University",
    place: "Cambridge, MA",
    control: "private",
    admitRate: 3.6,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "Reinstated for fall 2025 applicants",
    gpaNote: null,
    needBlind: "all",
    meetsFullNeed: true,
    aidNote: "No-loan aid; EVERYTHING free under $100k family income, tuition free under $200k (2025–26)",
    factors: {
      rigor: "considered",
      essay: "considered",
      ecs: "considered",
      character: "considered",
      legacy: "considered",
      interest: "no",
      religion: "no",
    },
    note: "Its CDS rates nearly every factor just “considered” — the fully holistic read, no formula to game.",
    transfer: {
      admitRate: 1,
      admitYear: "fall 2023",
      gpaNote: null,
      note: "Around 15 transfer spots a year — effectively a lottery.",
    },
  },
  {
    id: "mit",
    name: "MIT",
    place: "Cambridge, MA",
    control: "private",
    admitRate: 4.5,
    admitYear: "fall 2024",
    testPolicy: "required",
    gpaNote: null,
    needBlind: "all",
    meetsFullNeed: true,
    aidNote: "Tuition free under $200k family income (2025–26)",
    factors: {
      character: "very",
      rigor: "very",
      essay: "important",
      interview: "important",
      ecs: "important",
      talent: "important",
      firstGen: "considered",
      legacy: "no",
      interest: "no",
      religion: "no",
    },
    note: "One of the few that says outright: legacy counts for nothing.",
    transfer: {
      admitRate: 4,
      admitYear: "fall 2023",
      gpaNote: null,
      note: "A few dozen admits a year — transfer is HARDER than freshman admission here.",
    },
  },
  {
    id: "yale",
    name: "Yale University",
    place: "New Haven, CT",
    control: "private",
    admitRate: 3.7,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "“Test-flexible” — AP/IB scores can stand in for SAT/ACT",
    gpaNote: null,
    needBlind: "all",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "very",
      recs: "important",
      character: "important",
      legacy: "considered",
      interest: "no",
      religion: "no",
    },
    note: "Reads applications in committee, two readers minimum — context matters more than any single number.",
    transfer: {
      admitRate: null,
      gpaNote: null,
      note: "Tiny transfer class, plus the Eli Whitney program for nontraditional students returning to school.",
    },
  },
  {
    id: "stanford",
    name: "Stanford University",
    place: "Stanford, CA",
    control: "private",
    admitRate: 3.9,
    admitYear: "fall 2023",
    testPolicy: "required",
    testNote: "Reinstated for fall 2025 applicants",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "very",
      ecs: "important",
      character: "important",
      legacy: "no",
      interest: "no",
      religion: "no",
    },
    note: "California banned legacy preference at private colleges from fall 2025 — it no longer counts here.",
    transfer: {
      admitRate: null,
      gpaNote: null,
      note: "Only a few dozen spots a year — but community-college and nontraditional students are genuinely part of that class.",
    },
  },
  {
    id: "amherst",
    name: "Amherst College",
    place: "Amherst, MA",
    control: "private",
    admitRate: 9,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "all",
    meetsFullNeed: true,
    aidNote: "No-loan aid for every aided student",
    factors: {
      rigor: "very",
      essay: "important",
      firstGen: "considered",
      legacy: "no",
      interest: "no",
    },
    note: "Dropped legacy preference in 2021 — one of the first elite colleges to do it.",
    transfer: {
      admitRate: null,
      gpaNote: null,
      note: "Actively recruits community-college transfers — rare among elite liberal-arts colleges.",
    },
  },
  {
    id: "bowdoin",
    name: "Bowdoin College",
    place: "Brunswick, ME",
    control: "private",
    admitRate: 8,
    admitYear: "fall 2023",
    testPolicy: "optional",
    testNote: "Test-optional since 1969 — the original",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    aidNote: "No-loan aid",
    factors: {
      rigor: "very",
      essay: "important",
      character: "important",
      interest: "considered",
    },
    note: "Small, writing-heavy, and genuinely test-optional — scores truly aren’t missed.",
  },
  {
    id: "dartmouth",
    name: "Dartmouth College",
    place: "Hanover, NH",
    control: "private",
    admitRate: 5.3,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "Reinstated for fall 2025 applicants",
    gpaNote: null,
    needBlind: "all",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "important",
      recs: "important",
      legacy: "considered",
      interest: "no",
    },
    note: "Went need-blind for international applicants in 2022 — one of a handful.",
  },
  {
    id: "brown",
    name: "Brown University",
    place: "Providence, RI",
    control: "private",
    admitRate: 5.2,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "Reinstated for fall 2025 applicants",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    aidNote: "Need-blind for international applicants starting with fall 2025 admits",
    factors: {
      rigor: "very",
      essay: "very",
      character: "important",
      legacy: "considered",
      interest: "no",
    },
    note: "The open curriculum school — essays about how you’d actually use that freedom carry weight.",
  },
  {
    id: "georgetown",
    name: "Georgetown University",
    place: "Washington, DC",
    control: "private",
    religious: "Catholic (Jesuit)",
    admitRate: 13,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "Never dropped testing — one of the only ones",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "important",
      interview: "important",
      recs: "important",
    },
    note: "Uses its own application (not the Common App) and interviews nearly every applicant.",
  },
  {
    id: "notre-dame",
    name: "University of Notre Dame",
    place: "Notre Dame, IN",
    control: "private",
    religious: "Catholic",
    admitRate: 11,
    admitYear: "fall 2024",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "important",
      character: "important",
      religion: "considered",
      legacy: "considered",
    },
    note: "Catholic character is real here — religious affiliation is a considered factor, not a checkbox.",
  },
  {
    id: "boston-college",
    name: "Boston College",
    place: "Chestnut Hill, MA",
    control: "private",
    religious: "Catholic (Jesuit)",
    admitRate: 16,
    admitYear: "fall 2024",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    factors: {
      rigor: "very",
      essay: "important",
      character: "important",
    },
    note: "Jesuit school that admits students of every faith; meets full need without the Ivy sticker shock.",
  },
  {
    id: "baylor",
    name: "Baylor University",
    place: "Waco, TX",
    control: "private",
    religious: "Baptist",
    admitRate: 46,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "aware",
    meetsFullNeed: false,
    factors: {
      gpa: "very",
      rigor: "important",
      religion: "considered",
    },
    note: "A big religious university where faith is part of campus life but not a bar to admission.",
  },
  {
    id: "byu",
    name: "BYU (Brigham Young)",
    place: "Provo, UT",
    control: "private",
    religious: "Latter-day Saints (LDS)",
    admitRate: 67,
    admitYear: "fall 2023",
    testPolicy: null,
    gpaNote: null,
    needBlind: "aware",
    meetsFullNeed: false,
    aidNote: "LDS members pay roughly $6,500/yr tuition (2024–25)",
    factors: {
      gpa: "very",
      religion: "very",
      character: "important",
    },
    note: "Requires an ecclesiastical endorsement — religious commitment is central to admission here.",
  },
  {
    id: "berea",
    name: "Berea College",
    place: "Berea, KY",
    control: "private",
    religious: "Christian (nondenominational heritage)",
    admitRate: 33,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "aware",
    meetsFullNeed: true,
    aidNote: "Every admitted student receives a full-tuition scholarship",
    factors: {
      gpa: "very",
      character: "important",
      work: "considered",
    },
    note: "The inverse of need-aware: Berea ONLY admits students with financial need — no tuition, work program instead.",
  },
  {
    id: "vanderbilt",
    name: "Vanderbilt University",
    place: "Nashville, TN",
    control: "private",
    admitRate: 5.1,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    aidNote: "Opportunity Vanderbilt: no-loan aid",
    factors: {
      rigor: "very",
      gpa: "very",
      essay: "important",
      ecs: "important",
    },
    note: "One of the few super-selectives with serious full-ride MERIT scholarships on top of need aid.",
  },
  {
    id: "rice",
    name: "Rice University",
    place: "Houston, TX",
    control: "private",
    admitRate: 7.8,
    admitYear: "fall 2024",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: true,
    aidNote: "The Rice Investment: sliding-scale aid reaching well into middle incomes",
    factors: {
      rigor: "very",
      essay: "important",
      character: "important",
      interest: "considered",
    },
    note: "Small classes, residential colleges, and one of the strongest aid programs in Texas.",
  },
  {
    id: "uc-berkeley",
    name: "UC Berkeley",
    place: "Berkeley, CA",
    control: "public",
    admitRate: 12,
    admitYear: "fall 2024",
    testPolicy: "blind",
    testNote: "All UCs are test-blind — scores are never seen",
    gpaNote: "≈ 4.3–4.6 weighted (middle 50% of admits)",
    needBlind: "domestic",
    meetsFullNeed: false,
    aidNote: "Blue & Gold plan covers in-state tuition under $100k family income",
    factors: {
      rigor: "very",
      gpa: "very",
      essay: "important",
      firstGen: "considered",
      recs: "no",
      legacy: "no",
      interest: "no",
      religion: "no",
    },
    note: "UC “comprehensive review”: no test scores, no recommendation letters, no legacy — your record and your PIQ essays.",
    transfer: {
      admitRate: 25,
      admitYear: "fall 2023",
      gpaNote: "3.0 minimum for CA residents; admitted transfers average ≈3.9",
      note: "Junior-level transfers only; California community colleges get priority by UC policy.",
    },
  },
  {
    id: "ucla",
    name: "UCLA",
    place: "Los Angeles, CA",
    control: "public",
    admitRate: 9,
    admitYear: "fall 2024",
    testPolicy: "blind",
    testNote: "All UCs are test-blind — scores are never seen",
    gpaNote: "≈ 4.2–4.6 weighted (middle 50% of admits)",
    needBlind: "domestic",
    meetsFullNeed: false,
    aidNote: "Blue & Gold plan covers in-state tuition under $100k family income",
    factors: {
      rigor: "very",
      gpa: "very",
      essay: "important",
      firstGen: "considered",
      recs: "no",
      legacy: "no",
      interest: "no",
      religion: "no",
    },
    note: "The most-applied-to university in America — same UC review as Berkeley, no legacy, no letters.",
    transfer: {
      admitRate: 26,
      admitYear: "fall 2024",
      gpaNote: "2.4 minimum to apply (higher for most majors); admitted transfers average ≈3.9",
      note: "About 9 in 10 admitted transfers come from California community colleges — the designed path.",
    },
  },
  {
    id: "ut-austin",
    name: "UT Austin",
    place: "Austin, TX",
    control: "public",
    admitRate: 29,
    admitYear: "fall 2024",
    testPolicy: "required",
    testNote: "Reinstated for fall 2025 applicants",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: false,
    factors: {
      rank: "very",
      rigor: "important",
      essay: "important",
      legacy: "no",
    },
    note: "Texans in roughly the top 6% of their class are auto-admitted by law — the clearest formula in the country.",
    transfer: {
      admitRate: null,
      gpaNote: null,
      note: "Transfer admission is major-dependent — business and CS run far tougher than the average.",
    },
  },
  {
    id: "michigan",
    name: "University of Michigan",
    place: "Ann Arbor, MI",
    control: "public",
    admitRate: 18,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: false,
    aidNote: "Go Blue Guarantee: free in-state tuition under $125k family income",
    factors: {
      rigor: "very",
      gpa: "very",
      essay: "important",
      firstGen: "considered",
    },
    note: "A public that reads like a private — essays and context genuinely move decisions.",
    transfer: {
      admitRate: 40,
      admitYear: "fall 2023",
      gpaNote: "3.0 minimum recommended; competitive admits run higher",
      note: "Roughly double the freshman admit rate — a genuinely wider second door.",
    },
  },
  {
    id: "alabama",
    name: "University of Alabama",
    place: "Tuscaloosa, AL",
    control: "public",
    admitRate: 80,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: false,
    aidNote: "Published merit tables: strong GPA + test = automatic large scholarships, even for out-of-state",
    factors: {
      gpa: "very",
      rigor: "considered",
    },
    note: "The formula-friendly path: hit the published numbers and both admission and merit money are near-automatic.",
  },
  {
    id: "csulb",
    name: "Cal State Long Beach",
    place: "Long Beach, CA",
    control: "public",
    admitRate: 40,
    admitYear: "fall 2023",
    testPolicy: "blind",
    testNote: "CSUs dropped the SAT/ACT permanently in 2022",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: false,
    factors: {
      gpa: "very",
      rigor: "considered",
      essay: "no",
      recs: "no",
      interview: "no",
      ecs: "no",
      legacy: "no",
      interest: "no",
    },
    note: "CSUs admit on a GPA-based eligibility index — no essays, no recommendations, no interviews at all.",
    transfer: {
      admitRate: null,
      gpaNote: "2.0+ with an Associate Degree for Transfer",
      note: "An ADT from a California community college guarantees CSU admission — the surest four-year path in the state.",
    },
  },
  {
    id: "howard",
    name: "Howard University",
    place: "Washington, DC",
    control: "private",
    admitRate: 35,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "aware",
    meetsFullNeed: false,
    factors: {
      gpa: "very",
      rigor: "important",
      essay: "considered",
      ecs: "considered",
    },
    note: "The flagship HBCU — real merit scholarships and an alumni network that opens doors for decades.",
  },
  {
    id: "asu",
    name: "Arizona State University",
    place: "Tempe, AZ",
    control: "public",
    admitRate: 90,
    admitYear: "fall 2023",
    testPolicy: "optional",
    gpaNote: null,
    needBlind: "domestic",
    meetsFullNeed: false,
    factors: {
      gpa: "very",
      rank: "important",
    },
    note: "Assured admission by published GPA/class-rank standards — if you qualify, you’re in. Access is the mission.",
    transfer: {
      admitRate: null,
      gpaNote: null,
      note: "Guaranteed transfer pathways (MyPath2ASU) from hundreds of community colleges.",
    },
  },
];
