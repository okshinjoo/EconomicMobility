#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { careers, CAREER_SOURCE_URLS } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";
import { CAREER_ENRICHMENT, ONET_DATA_VINTAGE } from "../lib/careerEnrichment.ts";

const EXPECTED_CAREERS = 474;
const NO_PUBLISHED_WAGE = new Set(["commercial-fisher"]);
const EXPECTED_ONET_PROFILES = 464;
const problems = [];

function require(condition, message) {
  if (!condition) problems.push(message);
}

require(careers.length === EXPECTED_CAREERS, `Expected ${EXPECTED_CAREERS} careers; found ${careers.length}.`);
require(Object.keys(CAREER_DETAILS).length === careers.length, "Career and profile counts differ.");
require(new Set(careers.map((career) => career.id)).size === careers.length, "Career ids are not unique.");

const careerIds = new Set(careers.map((career) => career.id));
const socs = [];

for (const career of careers) {
  const detail = CAREER_DETAILS[career.id];
  require(Boolean(detail), `${career.id}: missing profile.`);
  if (!detail) continue;

  socs.push(detail.soc);
  require(/^\d{2}-\d{4}$/.test(detail.soc), `${career.id}: invalid SOC ${detail.soc}.`);
  require(detail.numJobs != null, `${career.id}: missing national employment.`);
  require(detail.annualOpenings != null, `${career.id}: missing annual openings.`);

  const hasAnnualPay = career.medianPay != null;
  const hasHourlyPay = career.medianHourlyPay != null;
  const hasAnnualRange = detail.payLow != null && detail.payHigh != null;
  const hasHourlyRange = detail.hourlyPayLow != null && detail.hourlyPayHigh != null;

  if (NO_PUBLISHED_WAGE.has(career.id)) {
    require(!hasAnnualPay && !hasHourlyPay, `${career.id}: should remain explicitly wage-unavailable.`);
  } else {
    require(hasAnnualPay || hasHourlyPay, `${career.id}: missing median wage.`);
    require(hasAnnualRange || hasHourlyRange, `${career.id}: missing wage range.`);
  }

  if (hasAnnualPay) require(career.medianPay > 0, `${career.id}: invalid annual median.`);
  if (hasHourlyPay) require(career.medianHourlyPay > 0, `${career.id}: invalid hourly median.`);
  if (hasHourlyPay && detail.hourlyMedian != null) {
    require(
      career.medianHourlyPay === detail.hourlyMedian,
      `${career.id}: card and profile hourly medians differ.`
    );
  }

  for (const relatedId of detail.related) {
    require(relatedId !== career.id, `${career.id}: links to itself as related.`);
    require(careerIds.has(relatedId), `${career.id}: unknown related career ${relatedId}.`);
  }
}

require(new Set(socs).size === socs.length, "SOC codes are not unique.");
for (const [name, url] of Object.entries(CAREER_SOURCE_URLS)) {
  require(url.startsWith("https://www.bls.gov/") || url.startsWith("https://data.bls.gov/"), `${name}: source is not an official BLS URL.`);
}

require(
  Object.keys(CAREER_ENRICHMENT).length === EXPECTED_ONET_PROFILES,
  `Expected ${EXPECTED_ONET_PROFILES} specific O*NET profiles; found ${Object.keys(CAREER_ENRICHMENT).length}.`
);
require(ONET_DATA_VINTAGE === "O*NET 30.3", `Unexpected O*NET vintage ${ONET_DATA_VINTAGE}.`);
for (const [id, profile] of Object.entries(CAREER_ENRICHMENT)) {
  require(careerIds.has(id), `${id}: O*NET profile has no catalog career.`);
  require(/^\d{2}-\d{4}\.\d{2}$/.test(profile.onetSoc), `${id}: invalid O*NET-SOC ${profile.onetSoc}.`);
  require(profile.coreTasks.length > 0, `${id}: O*NET profile has no task statements.`);
  require(profile.interests.length > 0, `${id}: O*NET profile has no interest data.`);
  require(profile.workStyles.length > 0, `${id}: O*NET profile has no work-style data.`);
  require(profile.onetUrl.startsWith("https://www.onetonline.org/"), `${id}: invalid O*NET source URL.`);
}

const stateData = JSON.parse(
  readFileSync(new URL("../public/data/career-state-wages-2025.json", import.meta.url), "utf8")
);
require(stateData.states?.length === 51, `Expected 50 states plus DC; found ${stateData.states?.length ?? 0}.`);
require(stateData.sourceUrl?.startsWith("https://www.bls.gov/"), "State wage source is not an official BLS URL.");
const stateRecords = Object.values(stateData.wages ?? {}).reduce(
  (sum, state) => sum + Object.keys(state).length,
  0
);
require(stateRecords >= 21000, `State wage coverage fell unexpectedly to ${stateRecords} records.`);
require(stateData.wages?.CA?.electrician?.annual === 76160, "California electrician wage does not match May 2025 OEWS.");

if (problems.length) {
  console.error(`Career catalog check failed with ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

const annual = careers.filter((career) => career.medianPay != null).length;
const hourlyOnly = careers.filter(
  (career) => career.medianPay == null && career.medianHourlyPay != null
).length;
console.log(
  `Career catalog OK: ${careers.length} careers, ${annual} annual medians, ${hourlyOnly} hourly-only medians, ${socs.length} unique SOC profiles, ${Object.keys(CAREER_ENRICHMENT).length} O*NET profiles, ${stateRecords.toLocaleString()} state wage records.`
);
