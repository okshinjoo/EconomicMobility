#!/usr/bin/env node

// Rebuild the generated 431-school expansion from source-linked public data.
// Primary admissions data and C7 factors come from school-published Common
// Data Sets when schools publish them. NCES/IPEDS supplies the transparent
// baseline for schools whose current CDS could not be located, plus identity,
// enrollment, testing, control, graduation, and admit-rate gaps. The generated
// file is checked in so the public site never depends on an API at runtime.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { coreColleges } from "../lib/collegeProfiles.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "lib/collegeProfilesExpanded.ts");
const BASE_TOTAL = 500;
const BASE_GENERATED_COUNT = BASE_TOTAL - coreColleges.length;
const TARGET_TOTAL = 553;
const GENERATED_COUNT = TARGET_TOTAL - coreColleges.length;
const API_ORIGIN = "https://api.collegedata.fyi";
const WEB_ORIGIN = "https://www.collegedata.fyi";
const CLIENT_NAME = "empower-economic-mobility-project";
const VERIFIED = "August 2026";

// These additions close the largest fall-2024 application-volume gaps in the
// original 500, then widen the catalog for public access, HBCUs, arts and
// service-academy applicants, Puerto Rico/USVI, and Tribal Colleges. IPEDS IDs
// keep the roster exact even when public-facing names change.
const PRIORITY_SCHOOLS = [
  { ipedsId: 137351, aliases: ["USF"] }, // University of South Florida
  { ipedsId: 218663, aliases: ["South Carolina", "USC Columbia"] },
  { ipedsId: 196413 }, // Syracuse University
  { ipedsId: 183026, aliases: ["SNHU"], format: "online-and-campus" },
  { ipedsId: 137847, aliases: ["UTampa"] },
  { ipedsId: 186399, aliases: ["Rutgers Newark"] },
  { ipedsId: 186371, aliases: ["Rutgers Camden"] },
  { ipedsId: 110608, aliases: ["CSUN", "Cal State Northridge"] },
  { ipedsId: 110538, aliases: ["Chico State", "Cal State Chico"] },
  { ipedsId: 196060, aliases: ["UAlbany", "SUNY Albany"] },
  { ipedsId: 190594, aliases: ["Hunter College"] },
  { ipedsId: 190549, aliases: ["Brooklyn College"] },
  { ipedsId: 190664, aliases: ["Queens College"] },
  { ipedsId: 190637, aliases: ["Lehman College"] },
  { ipedsId: 204857, aliases: ["Ohio U"] },
  { ipedsId: 207388, aliases: ["Oklahoma State", "OSU Stillwater"] },
  { ipedsId: 228769, aliases: ["UT Arlington", "UTA"] },
  { ipedsId: 227368, aliases: ["UTRGV"] },
  { ipedsId: 228796, aliases: ["UTEP"] },
  { ipedsId: 203517, aliases: ["Kent State"] },
  { ipedsId: 153603 }, // Iowa State University
  { ipedsId: 136172, aliases: ["UNF"] },
  { ipedsId: 164076 }, // Towson University
  { ipedsId: 142115 }, // Boise State University
  { ipedsId: 220862 }, // University of Memphis
  { ipedsId: 188030, aliases: ["NMSU"] },
  { ipedsId: 199148, aliases: ["UNC Greensboro", "UNCG"] },
  { ipedsId: 195809, aliases: ["St. John's"] },
  { ipedsId: 138947, tags: ["HBCU"] },
  { ipedsId: 160621, aliases: ["Southern University"], tags: ["HBCU"] },
  { ipedsId: 100654, aliases: ["Alabama A&M"], tags: ["HBCU"] },
  { ipedsId: 163453, tags: ["HBCU"] },
  { ipedsId: 227526, aliases: ["Prairie View A&M", "PVAMU"], tags: ["HBCU"] },
  { ipedsId: 102377, tags: ["HBCU"] },
  { ipedsId: 232937, tags: ["HBCU"] },
  { ipedsId: 234155, tags: ["HBCU"] },
  { ipedsId: 220181, tags: ["HBCU"] },
  { ipedsId: 132602, tags: ["HBCU"] },
  { ipedsId: 229063, tags: ["HBCU"] },
  { ipedsId: 199999, aliases: ["WSSU"], tags: ["HBCU"] },
  { ipedsId: 140951, aliases: ["SCAD"], tags: ["Arts-focused"] },
  { ipedsId: 217493, aliases: ["RISD"], tags: ["Arts-focused"] },
  { ipedsId: 193654, aliases: ["Parsons"], tags: ["Arts-focused"] },
  { ipedsId: 190372, aliases: ["Cooper Union"], tags: ["Arts-focused"] },
  { ipedsId: 192110, aliases: ["Juilliard"], tags: ["Arts-focused"] },
  { ipedsId: 133553, aliases: ["Embry-Riddle", "ERAU"], tags: ["Aviation-focused"] },
  { ipedsId: 130624, aliases: ["USCGA"], tags: ["Service academy"] },
  { ipedsId: 197027, aliases: ["USMMA", "Kings Point"], tags: ["Service academy"] },
  { ipedsId: 243221, aliases: ["UPR Rio Piedras", "UPRRP"] },
  { ipedsId: 243197, aliases: ["UPR Mayaguez", "UPRM"] },
  { ipedsId: 243665, aliases: ["UVI"], tags: ["HBCU"] },
  { ipedsId: 155140, aliases: ["Haskell"], tags: ["Tribal College"] },
  { ipedsId: 187745, aliases: ["IAIA"], tags: ["Tribal College", "Arts-focused"] },
];

// Official school pages found during the August 2026 source audit. These are
// used even when the shared archive has not indexed the document. C7 values
// stay blank unless a complete table could be read without ambiguity.
const PRIORITY_CDS = new Map([
  [137351, { year: "2025-26", url: "https://www.usf.edu/ods/data-tools/cds.aspx" }],
  [218663, { year: "2024-25", url: "https://sc.edu/about/offices_and_divisions/institutional_research_assessment_and_analytics/institutional_effectiveness/common_data_set/index.php" }],
  [186399, {
    year: "2023-24",
    url: "https://oirap.rutgers.edu/CDS/2023/Newark%20CDS_2023-2024_final_V1.pdf",
    factors: {
      rigor: "very", rank: "considered", gpa: "very", tests: "no",
      essay: "important", recs: "no", interview: "no", ecs: "considered",
      talent: "no", character: "no", firstGen: "considered", legacy: "no",
      geography: "considered", residency: "considered", religion: "no",
      volunteer: "considered", work: "considered", interest: "considered",
    },
    testPolicy: "blind",
  }],
  [186371, { year: "2023-24", url: "https://oirap.rutgers.edu/CDS/2023/Camden%20CDS_2023-2024_final_V1.pdf" }],
  [110608, { year: "2025-26", url: "https://www.csun.edu/institutional-research/explore-csun-data/common-data-set" }],
  [110538, { year: "2025-26", url: "https://www.csuchico.edu/ir/additional-data/common-data-set.shtml" }],
  [196060, { year: "2025-26", url: "https://www.albany.edu/common-data-set-2025-2026" }],
  [190664, { year: "2017-18", url: "https://www.qc.cuny.edu/oie/college-rankings-and-ratings/" }],
  [204857, { year: "2025-26", url: "https://www.ohio.edu/iea/university-data" }],
  [207388, { year: "2025-26", url: "https://ira.okstate.edu/cds" }],
  [227368, { year: "2023-24", url: "https://www.utrgv.edu/sair/data-reports/index.htm" }],
  [228796, { year: "2025-26", url: "https://www.utep.edu/planning/cierp/institutional-research/common-data-set/cds-pdf-reports.html" }],
  [203517, { year: "2025-26", url: "https://www.kent.edu/ir/common-dataset-cds" }],
  [153603, { year: "2025-26", url: "https://www.ir.iastate.edu/common-data-set" }],
  [136172, {
    year: "2025-26",
    url: "https://www.unf.edu/ir/common-data-set/2025.html",
    factors: {
      rigor: "very", rank: "no", gpa: "very", tests: "important",
      essay: "no", recs: "no", interview: "no", ecs: "considered",
      talent: "considered", character: "no", firstGen: "no", legacy: "no",
      geography: "no", residency: "no", religion: "no", volunteer: "no",
      work: "no", interest: "considered",
    },
    testPolicy: "required",
  }],
  [164076, { year: "2025-26", url: "https://www.towson.edu/ir/commondataset.html" }],
  [142115, {
    year: "2025-26",
    url: "https://www.boisestate.edu/ie/data-and-reporting/common-data-set-2025-26/",
    factors: {
      rigor: "no", rank: "no", gpa: "very", tests: "considered",
      essay: "considered", recs: "considered", interview: "no", ecs: "no",
      talent: "considered", character: "no", firstGen: "no", legacy: "no",
      geography: "no", residency: "no", religion: "no", volunteer: "no",
      work: "no", interest: "no",
    },
  }],
  [220862, { year: "2024-25", url: "https://www.memphis.edu/oir/oirweb/WebReports/ProfilesAndFactbooks/CDS2024_2025.pdf" }],
  [199148, { year: "2025-26", url: "https://ire.uncg.edu/surveys-research/surveys/" }],
  [227526, { year: "2019-20", url: "https://www.pvamu.edu/ir/" }],
  [132602, { year: "2024-25", url: "https://www.cookman.edu/ie/ieresearch/reports.html" }],
  [133553, {
    year: "2023-24",
    url: "https://erau.edu/institutional-research/common-data-set/2023-2024-daytona-beach",
    factors: {
      rigor: "important", rank: "important", gpa: "very", tests: "considered",
      essay: "considered", recs: "considered", interview: "no", ecs: "important",
      talent: "important", character: "important", firstGen: "no", legacy: "considered",
      geography: "no", residency: "no", religion: "no", volunteer: "no",
      work: "considered", interest: "considered",
    },
  }],
  [243665, { year: "2022-23", url: "https://www.uvi.edu/research/institutional-research-and-planning/surveys/reports.html" }],
]);

const FACTOR_FIELDS = {
  "C.701": "rigor",
  "C.702": "rank",
  "C.703": "gpa",
  "C.704": "tests",
  "C.705": "essay",
  "C.706": "recs",
  "C.707": "interview",
  "C.708": "ecs",
  "C.709": "talent",
  "C.710": "character",
  "C.711": "firstGen",
  "C.712": "legacy",
  "C.713": "geography",
  "C.714": "residency",
  "C.715": "religion",
  "C.716": "volunteer",
  "C.717": "work",
  "C.718": "interest",
};

const FACTOR_LABELS = {
  rigor: "course rigor",
  rank: "class rank",
  gpa: "GPA",
  tests: "test scores",
  essay: "the essay",
  recs: "recommendations",
  interview: "the interview",
  ecs: "extracurriculars",
  talent: "talent or ability",
  character: "character",
  firstGen: "first-generation status",
  legacy: "legacy ties",
  geography: "geographic residence",
  residency: "state residency",
  religion: "religious affiliation",
  volunteer: "volunteer work",
  work: "work experience",
  interest: "demonstrated interest",
};

const FEDERAL_FIELDS = [
  "control",
  "undergraduate_enrollment",
  "admit_rate_total",
  "bachelor_6yr_grad_rate",
  "sat_composite_p25",
  "sat_composite_p75",
  "act_composite_p25",
  "act_composite_p75",
];

const ALLOWED_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC", "PR", "VI",
]);

// Manual profiles sometimes use the student's everyday name while the CDS
// archive uses the formal IPEDS name. These aliases prevent duplicate cards.
const CORE_EXTERNAL_IDS = {
  mit: "mit",
  byu: "brigham-young-university",
  "uc-berkeley": "uc-berkeley",
  ucla: "ucla",
  "ut-austin": "ut-austin",
  alabama: "the-university-of-alabama",
  csulb: "california-state-university-long-beach",
  asu: "arizona-state-university-campus-immersion",
  caltech: "california-institute-of-technology",
  "case-western": "case-western-reserve-university",
  unc: "unc",
  gatech: "georgia-tech",
  wisconsin: "uw-madison",
  "penn-state": "penn-state",
  umass: "university-of-massachusetts-amherst",
  ucsd: "uc-san-diego",
  "uc-irvine": "uc-irvine",
  "uc-davis": "uc-davis",
  ucsb: "uc-santa-barbara",
  "uc-santa-cruz": "university-of-california-santa-cruz",
  "uc-riverside": "university-of-california-riverside",
  "uc-merced": "university-of-california-merced",
  "cuny-baruch": "cuny-bernard-m-baruch-college",
  "cal-poly-slo": "california-polytechnic-state-university-san-luis-obispo",
  "west-point": "united-states-military-academy",
  "naval-academy": "united-states-naval-academy",
  tulane: "tulane-university-of-louisiana",
  "nc-at": "north-carolina-a-and-t-state-university",
  "new-mexico": "university-of-new-mexico-main-campus",
  oklahoma: "university-of-oklahoma-norman-campus",
};

function canonicalName(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\bthe\b/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

function yearStart(value) {
  const year = Number(String(value ?? "").slice(0, 4));
  return Number.isFinite(year) ? year : 0;
}

function parseJsonLines(text) {
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function pickLatest(rows, keyOf, yearOf) {
  const chosen = new Map();
  for (const row of rows) {
    const key = keyOf(row);
    const previous = chosen.get(key);
    if (!previous || yearOf(row) > yearOf(previous)) chosen.set(key, row);
  }
  return chosen;
}

function normalizeRating(value) {
  const compact = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  if (compact === "veryimportant" || compact === "vi") return "very";
  if (compact === "important" || compact === "i") return "important";
  if (compact === "considered" || compact === "c") return "considered";
  if (compact === "notconsidered" || compact === "nc") return "no";
  return null;
}

function policyFrom(fields) {
  const uses = String(fields.get("C.801") ?? "").toLowerCase();
  const rule = String(fields.get("C.802") ?? "").toLowerCase();
  if (uses === "no" || rule.includes("not used") || rule.includes("not considered")) {
    return "blind";
  }
  if (rule === "required" || rule.includes("adms_req")) return "required";
  if (
    rule.includes("consider") ||
    rule.includes("recommend") ||
    rule.includes("not required")
  ) {
    return "optional";
  }
  return null;
}

function numberOrNull(value) {
  if (value == null || value === "") return null;
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function range(low, high) {
  const a = numberOrNull(low);
  const b = numberOrNull(high);
  return a != null && b != null && a <= b ? `${a}–${b}` : null;
}

function roundedPercent(value) {
  const number = numberOrNull(value);
  return number == null ? null : Math.round(number * 10) / 10;
}

function listPhrase(items) {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function noteFromFactors(factors) {
  const entries = Object.entries(factors);
  if (entries.length === 0) {
    return "Admissions and outcome figures are available; a reliable C7 factor extract is not yet available for this source.";
  }
  const very = entries
    .filter(([, rating]) => rating === "very")
    .map(([factor]) => FACTOR_LABELS[factor]);
  const important = entries
    .filter(([, rating]) => rating === "important")
    .map(([factor]) => FACTOR_LABELS[factor]);
  if (very.length > 0) {
    const lead = `Its CDS calls ${listPhrase(very.slice(0, 4))} very important`;
    return important.length > 0
      ? `${lead}; ${listPhrase(important.slice(0, 3))} also ${important.length === 1 ? "carries" : "carry"} weight.`
      : `${lead}.`;
  }
  if (important.length > 0) {
    return `Its CDS gives the most weight to ${listPhrase(important.slice(0, 4))}.`;
  }
  return "Its CDS reports the available C7 factors as considered or not considered, with no factor marked important or very important.";
}

function isUsableSource(source) {
  return Boolean(
    source &&
      !source.removed_at &&
      !source.sub_institutional &&
      source.extraction_status === "extracted" &&
      source.data_quality_flag !== "blank_template" &&
      yearStart(source.canonical_year) >= 2018 &&
      /^https:\/\//.test(source.source_url ?? "") &&
      !String(source.source_url).includes("CDS-2025-2026-Summary-of-Changes")
  );
}

async function publicKey() {
  const html = await fetch(`${WEB_ORIGIN}/api`).then((response) => {
    if (!response.ok) throw new Error(`API docs returned ${response.status}`);
    return response.text();
  });
  const match = html.match(/eyJ[a-zA-Z0-9_.-]{100,}/);
  if (!match) throw new Error("Could not find the public read-only API key");
  return match[0];
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "X-CollegeData-Client": CLIENT_NAME },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function fetchRows(resource, query, key) {
  const rows = [];
  for (let offset = 0; ; offset += 1000) {
    const url = new URL(`${API_ORIGIN}/rest/v1/${resource}`);
    for (const [name, value] of Object.entries(query)) url.searchParams.set(name, value);
    url.searchParams.set("limit", "1000");
    url.searchParams.set("offset", String(offset));
    const response = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "X-CollegeData-Client": CLIENT_NAME,
      },
    });
    if (!response.ok) {
      throw new Error(`${resource} offset ${offset} returned ${response.status}: ${await response.text()}`);
    }
    const page = await response.json();
    rows.push(...page);
    if (page.length < 1000) break;
  }
  return rows;
}

function federalValue(facts, schoolId, field) {
  return facts.get(schoolId)?.get(field);
}

function profileFor(candidate, context) {
  const { browser, source, identity, factorsByDocument, facts } = context;
  const manualCds = candidate.priority
    ? PRIORITY_CDS.get(Number(identity.ipeds_id))
    : null;
  const fieldRows = source?.document_id
    ? factorsByDocument.get(source.document_id) ?? new Map()
    : new Map();
  const factors = manualCds?.factors ? { ...manualCds.factors } : {};
  if (!manualCds) {
    for (const [fieldId, factorId] of Object.entries(FACTOR_FIELDS)) {
      const rating = normalizeRating(fieldRows.get(fieldId));
      if (rating) factors[factorId] = rating;
    }
  }
  // A nearly uniform wall of "very important" or "important" values is a
  // known failure mode when flattened PDFs lose their checked-column layout.
  // Suppress the whole C7 extract instead of presenting a plausible-looking
  // but misleading factor profile.
  const ratingCounts = Object.values(factors).reduce((counts, rating) => {
    counts[rating] = (counts[rating] ?? 0) + 1;
    return counts;
  }, {});
  if ((ratingCounts.very ?? 0) >= 15 || (ratingCounts.important ?? 0) >= 15) {
    for (const factorId of Object.keys(factors)) delete factors[factorId];
  }

  const factorCount = Object.keys(factors).length;
  const c7Status =
    factorCount === 18
      ? "complete"
      : factorCount > 0
        ? "partial"
        : manualCds
          ? "not-encoded"
          : source
            ? "not-extracted"
            : null;
  const schoolFacts = facts.get(candidate.school_id) ?? new Map();
  const controlLabel = schoolFacts.get("control")?.value_label ?? "";
  const control = controlLabel.startsWith("Public") ? "public" : "private";
  const browserRate = numberOrNull(browser?.acceptance_rate);
  const federalRate = numberOrNull(schoolFacts.get("admit_rate_total")?.value_numeric);
  const admitRate = roundedPercent(browserRate != null ? browserRate * 100 : federalRate);
  const admissionYear = browser?.year_start ?? schoolFacts.get("admit_rate_total")?.data_year;
  const undergrads =
    numberOrNull(browser?.undergrad_enrollment_scorecard) ??
    numberOrNull(schoolFacts.get("undergraduate_enrollment")?.value_numeric) ??
    numberOrNull(identity.undergraduate_enrollment);
  const gradRate = roundedPercent(
    schoolFacts.get("bachelor_6yr_grad_rate")?.value_numeric
  );
  const satRange = range(
    browser?.sat_composite_p25 ?? schoolFacts.get("sat_composite_p25")?.value_numeric,
    browser?.sat_composite_p75 ?? schoolFacts.get("sat_composite_p75")?.value_numeric
  );
  const actRange = range(
    browser?.act_composite_p25 ?? schoolFacts.get("act_composite_p25")?.value_numeric,
    browser?.act_composite_p75 ?? schoolFacts.get("act_composite_p75")?.value_numeric
  );
  const archiveUrl = source
    ? browser?.archive_url ??
      `${WEB_ORIGIN}/schools/${candidate.school_id}/${source.canonical_year}`
    : null;
  const cds = manualCds
    ? {
        year: manualCds.year,
        url: manualCds.url,
        verified: VERIFIED,
        c7Status,
        ...(archiveUrl ? { archiveUrl } : {}),
      }
    : source
      ? {
          year: source.canonical_year,
          url: source.source_url,
          verified: VERIFIED,
          c7Status,
          ...(archiveUrl ? { archiveUrl } : {}),
        }
      : null;
  const federalYear = String(
    schoolFacts.get("admit_rate_total")?.data_year ??
      schoolFacts.get("undergraduate_enrollment")?.data_year ??
      2024
  );
  const note = factorCount > 0
    ? noteFromFactors(factors)
    : manualCds
      ? "The school publishes a Common Data Set, but its current C7 factor table has not been encoded yet."
      : source
        ? noteFromFactors(factors)
        : "Federal admissions and outcome figures are included; a current school-published Common Data Set was not located during this update.";

  return {
    id: `${candidate.priority ? "catalog" : "cds"}-${candidate.school_id}`,
    name: candidate.school_name,
    place: `${identity.city}, ${identity.state}`,
    control,
    ...(candidate.priority?.format ? { format: candidate.priority.format } : {}),
    ...(candidate.priority?.aliases ? { aliases: candidate.priority.aliases } : {}),
    ...(candidate.priority?.tags ? { tags: candidate.priority.tags } : {}),
    religious: null,
    undergrads,
    satRange,
    actRange,
    gradRate,
    admitRate,
    admitYear: `fall ${admissionYear ?? yearStart(source.canonical_year)}`,
    testPolicy: manualCds?.testPolicy ?? policyFrom(fieldRows),
    gpaNote: null,
    needBlind: null,
    meetsFullNeed: null,
    factors,
    note,
    ...(cds ? { cds } : { cdsSearchStatus: "not-found" }),
    federal: {
      year: federalYear,
      url: `https://nces.ed.gov/collegenavigator/?id=${identity.ipeds_id}`,
      verified: VERIFIED,
    },
  };
}

async function main() {
  const key = await publicKey();
  const [schoolsText, sourcesText, browserRows, federalRows] =
    await Promise.all([
      fetchText(`${WEB_ORIGIN}/snapshots/latest/schools.jsonl`),
      fetchText(`${WEB_ORIGIN}/snapshots/latest/sources.jsonl`),
      fetchRows("school_browser_rows", { select: "*", order: "school_name" }, key),
      fetchRows(
        "school_facts_unified",
        {
          in_scope: "eq.true",
          field_key: `in.(${FEDERAL_FIELDS.join(",")})`,
          select:
            "school_id,school_name,city,state,data_year,field_key,value_numeric,value_text,value_label,release_type,quality_flag",
          order: "school_id,field_key,data_year.desc",
        },
        key
      ),
    ]);

  const schools = parseJsonLines(schoolsText);
  const sources = parseJsonLines(sourcesText);
  const schoolById = new Map(schools.map((school) => [school.school_id, school]));
  const schoolByIpeds = new Map(
    schools.map((school) => [Number(school.ipeds_id), school])
  );
  const sourceByDocument = new Map(sources.map((source) => [source.document_id, source]));
  const latestSource = pickLatest(
    sources.filter(isUsableSource),
    (source) => source.school_id,
    (source) => yearStart(source.canonical_year)
  );

  const facts = new Map();
  for (const row of federalRows) {
    if (!facts.has(row.school_id)) facts.set(row.school_id, new Map());
    const schoolFacts = facts.get(row.school_id);
    const previous = schoolFacts.get(row.field_key);
    const previousPriority = previous?.release_type === "final" ? 1 : 0;
    const rowPriority = row.release_type === "final" ? 1 : 0;
    if (
      !previous ||
      row.data_year > previous.data_year ||
      (row.data_year === previous.data_year && rowPriority > previousPriority)
    ) {
      schoolFacts.set(row.field_key, row);
    }
  }

  const latestBrowser = pickLatest(
    browserRows.filter((row) => !row.sub_institutional && row.data_quality_flag !== "blank_template"),
    (row) => row.school_id,
    (row) => row.year_start
  );

  const coreNames = new Set(coreColleges.map((college) => canonicalName(college.name)));
  const coveredExternalIds = new Set(Object.values(CORE_EXTERNAL_IDS));
  for (const college of coreColleges) {
    coveredExternalIds.add(college.id);
    for (const row of latestBrowser.values()) {
      if (canonicalName(row.school_name) === canonicalName(college.name)) {
        coveredExternalIds.add(row.school_id);
      }
    }
  }

  const usedNames = new Set(coreNames);
  const candidates = [];
  const rejectionCounts = {};
  const reject = (reason) => {
    rejectionCounts[reason] = (rejectionCounts[reason] ?? 0) + 1;
    return false;
  };
  const addCandidate = (
    candidate,
    browser = null,
    { allowFederalOnly = false, priority = null } = {}
  ) => {
    const identity =
      schoolById.get(candidate.school_id) ?? schoolByIpeds.get(candidate.ipeds_id);
    const source = browser
      ? sourceByDocument.get(browser.document_id) ?? latestSource.get(candidate.school_id)
      : latestSource.get(candidate.school_id);
    const nameKey = canonicalName(candidate.school_name);
    const control = federalValue(facts, candidate.school_id, "control")?.value_label ?? "";
    const browserRate = numberOrNull(browser?.acceptance_rate);
    const federalRate = numberOrNull(
      federalValue(facts, candidate.school_id, "admit_rate_total")?.value_numeric
    );
    if (!identity) return reject("missing identity");
    if (!ALLOWED_STATES.has(identity.state)) return reject("outside 50 states/DC");
    if (!isUsableSource(source) && !allowFederalOnly) {
      return reject("no usable CDS source");
    }
    if (usedNames.has(nameKey)) return reject("duplicate name");
    if (coveredExternalIds.has(candidate.school_id)) return reject("core profile");
    if (!control) return reject("missing control");
    if (control.includes("for-profit") && !control.includes("not-for-profit")) {
      return reject("for-profit");
    }
    if (browserRate == null && federalRate == null) return reject("missing admit rate");
    if (
      !priority &&
      /online|global campus|worldwide|continuing education/i.test(candidate.school_name)
    ) {
      return reject("online/global campus");
    }
    usedNames.add(nameKey);
    candidates.push({
      ...candidate,
      browser,
      identity,
      source: isUsableSource(source) ? source : null,
      priority,
    });
    return true;
  };

  const currentCandidates = [...latestBrowser.values()].sort((a, b) =>
    a.school_name.localeCompare(b.school_name)
  );
  for (const row of currentCandidates) addCandidate(row, row);

  const fillerCandidates = [...latestSource.values()]
    .filter((source) => !latestBrowser.has(source.school_id))
    .map((source) => {
      const identity = schoolById.get(source.school_id) ?? schoolByIpeds.get(source.ipeds_id);
      return {
        school_id: source.school_id,
        school_name: source.school_name,
        ipeds_id: source.ipeds_id,
        enrollment:
          numberOrNull(federalValue(facts, source.school_id, "undergraduate_enrollment")?.value_numeric) ??
          numberOrNull(identity?.undergraduate_enrollment) ??
          0,
        sourceYear: yearStart(source.canonical_year),
      };
    })
    .sort((a, b) => b.enrollment - a.enrollment || b.sourceYear - a.sourceYear);

  for (const row of fillerCandidates) {
    if (candidates.length >= BASE_GENERATED_COUNT) break;
    addCandidate(row);
  }

  if (candidates.length !== BASE_GENERATED_COUNT) {
    throw new Error(
      `Could not reconstruct the original ${BASE_GENERATED_COUNT}-profile generated roster; found ${candidates.length}`
    );
  }

  // Add the 53 audited student-demand and access priorities by IPEDS ID after
  // reconstructing the original 500-school edition, so no prior school is
  // displaced.
  for (const priority of PRIORITY_SCHOOLS) {
    const identity = schoolByIpeds.get(priority.ipedsId);
    if (!identity) {
      reject(`priority IPEDS ${priority.ipedsId} missing identity`);
      continue;
    }
    addCandidate(identity, latestBrowser.get(identity.school_id), {
      allowFederalOnly: true,
      priority,
    });
  }

  // A missing priority should not make the public build unusable; fill the
  // slot with the next source-linked profile and expose the rejection count.
  for (const row of fillerCandidates) {
    if (candidates.length >= GENERATED_COUNT) break;
    addCandidate(row);
  }

  if (candidates.length < GENERATED_COUNT) {
    console.error({
      latestBrowserSchools: latestBrowser.size,
      latestUsableSources: latestSource.size,
      federalFactSchools: facts.size,
      candidates: candidates.length,
      rejectionCounts,
    });
    throw new Error(
      `Only found ${candidates.length} usable additions; need ${GENERATED_COUNT}`
    );
  }

  const selected = candidates.slice(0, GENERATED_COUNT);
  const selectedDocumentIds = selected
    .map((candidate) => candidate.source?.document_id)
    .filter(Boolean);
  const documentChunks = [];
  for (let index = 0; index < selectedDocumentIds.length; index += 40) {
    documentChunks.push(selectedDocumentIds.slice(index, index + 40));
  }
  const fieldRows = (
    await Promise.all(
      documentChunks.map((documentIds) =>
        fetchRows(
          "cds_fields",
          {
            document_id: `in.(${documentIds.join(",")})`,
            field_id: `in.(${[...Object.keys(FACTOR_FIELDS), "C.801", "C.802"].join(",")})`,
            select:
              "document_id,school_id,field_id,value_text,value_status,data_quality_flag",
          },
          key
        )
      )
    )
  ).flat();
  const factorsByDocument = new Map();
  for (const row of fieldRows) {
    if (row.data_quality_flag === "blank_template" || row.value_status !== "reported") continue;
    if (!factorsByDocument.has(row.document_id)) {
      factorsByDocument.set(row.document_id, new Map());
    }
    factorsByDocument.get(row.document_id).set(row.field_id, row.value_text);
  }

  const profiles = selected
    .map((candidate) =>
      profileFor(candidate, {
        browser: candidate.browser,
        source: candidate.source,
        identity: candidate.identity,
        factorsByDocument,
        facts,
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const c7Complete = profiles.filter((profile) => profile.cds?.c7Status === "complete").length;
  const c7Partial = profiles.filter((profile) => profile.cds?.c7Status === "partial").length;
  const c7Unavailable = profiles.length - c7Complete - c7Partial;
  const older = profiles.filter(
    (profile) => profile.cds && yearStart(profile.cds.year) < 2024
  ).length;
  const cdsLinked = profiles.filter((profile) => profile.cds).length;
  const federalOnly = profiles.filter((profile) => !profile.cds).length;
  const priorityProfiles = profiles.filter((profile) => profile.id.startsWith("catalog-")).length;

  const contents = `// Generated by scripts/build-college-catalog.mjs. Do not hand-edit.\n` +
    `// Sources: school-published Common Data Sets indexed by CollegeData.FYI or\n` +
    `// linked directly, plus source-labeled 2024 NCES/IPEDS baseline facts.\n` +
    `// Refreshed ${VERIFIED}; ${profiles.length} generated profiles.\n\n` +
    `import type { CollegeProfile } from "./collegeProfiles";\n\n` +
    `export const expandedCollegeProfiles: CollegeProfile[] = ${JSON.stringify(profiles, null, 2)};\n`;

  if (process.argv.includes("--write")) {
    await fs.writeFile(OUTPUT, contents, "utf8");
  }

  console.log(
    JSON.stringify(
      {
        core: coreColleges.length,
        generated: profiles.length,
        total: coreColleges.length + profiles.length,
        currentBrowserAdditions: selected.filter((candidate) => candidate.browser).length,
        archiveFillers: selected.filter((candidate) => !candidate.browser).length,
        priorityProfiles,
        cdsLinked,
        federalOnly,
        c7Complete,
        c7Partial,
        c7Unavailable,
        olderThan2024: older,
        wrote: process.argv.includes("--write") ? OUTPUT : false,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
