#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { careers, CAREER_SOURCE_URLS } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";
import { CAREER_ENRICHMENT, ONET_DATA_VINTAGE } from "../lib/careerEnrichment.ts";
import { CAREER_WORK_CONTEXT } from "../lib/careerWorkContext.ts";
import {
  CAREER_INDUSTRIES,
  CAREER_INDUSTRY_SOURCE_URL,
  CAREER_INDUSTRY_VINTAGE,
} from "../lib/careerIndustries.ts";
import { CAREER_FIT_QUESTIONS, CAREER_INTERESTS } from "../lib/careerFit.ts";
import { CAREER_COST_SOURCE } from "../lib/careerDecisionFacts.ts";

const EXPECTED_CAREERS = 474;
const NO_PUBLISHED_WAGE = new Set(["commercial-fisher"]);
const EXPECTED_ONET_PROFILES = 464;
const EXPECTED_WORK_CONTEXT_PROFILES = 450;
const EXPECTED_INDUSTRY_PROFILES = 473;
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
let transferableSkillProfiles = 0;
let knowledgeProfiles = 0;
for (const [id, profile] of Object.entries(CAREER_ENRICHMENT)) {
  require(careerIds.has(id), `${id}: O*NET profile has no catalog career.`);
  require(/^\d{2}-\d{4}\.\d{2}$/.test(profile.onetSoc), `${id}: invalid O*NET-SOC ${profile.onetSoc}.`);
  require(profile.coreTasks.length > 0, `${id}: O*NET profile has no task statements.`);
  require(profile.interests.length > 0, `${id}: O*NET profile has no interest data.`);
  require(profile.workStyles.length > 0, `${id}: O*NET profile has no work-style data.`);
  if (profile.transferableSkills.length > 0) transferableSkillProfiles++;
  if (profile.knowledge.length > 0) knowledgeProfiles++;
  require(profile.transferableSkills.length <= 5, `${id}: too many O*NET transferable skills.`);
  require(profile.knowledge.length <= 5, `${id}: too many O*NET knowledge areas.`);
  require(profile.onetUrl.startsWith("https://www.onetonline.org/"), `${id}: invalid O*NET source URL.`);
}
require(transferableSkillProfiles >= 450, `Only ${transferableSkillProfiles} O*NET profiles have transferable skills.`);
require(knowledgeProfiles >= 450, `Only ${knowledgeProfiles} O*NET profiles have knowledge areas.`);

require(
  Object.keys(CAREER_WORK_CONTEXT).length === EXPECTED_WORK_CONTEXT_PROFILES,
  `Expected ${EXPECTED_WORK_CONTEXT_PROFILES} O*NET work-context profiles; found ${Object.keys(CAREER_WORK_CONTEXT).length}.`
);
for (const [id, context] of Object.entries(CAREER_WORK_CONTEXT)) {
  require(careerIds.has(id), `${id}: work-context profile has no catalog career.`);
  require(["Lower", "Moderate", "Higher"].includes(context.physicalDemand), `${id}: invalid physical-demand band.`);
  require(["Lower", "Mixed", "Higher"].includes(context.remoteCompatibility), `${id}: invalid remote-compatibility band.`);
  require(context.physicalScore >= 1 && context.physicalScore <= 5, `${id}: physical score is out of range.`);
  require(context.remoteScore >= 0 && context.remoteScore <= 100, `${id}: remote score is out of range.`);
  for (const metric of [
    context.peopleContact,
    context.decisionFreedom,
    context.consequenceOfError,
    context.conflictExposure,
    context.difficultPeople,
    context.sitting,
    context.standing,
    context.outdoors,
  ]) {
    require(metric == null || (metric >= 1 && metric <= 5), `${id}: work-reality score is out of range.`);
  }
}
require(CAREER_WORK_CONTEXT.carpenter?.physicalDemand === "Higher", "Carpenter physical-demand benchmark changed.");
require(CAREER_WORK_CONTEXT.rn?.remoteCompatibility === "Lower", "Registered nurse remote benchmark changed.");
require(CAREER_WORK_CONTEXT["software-developer"]?.remoteCompatibility === "Higher", "Software developer remote benchmark changed.");

require(
  Object.keys(CAREER_INDUSTRIES).length === EXPECTED_INDUSTRY_PROFILES,
  `Expected ${EXPECTED_INDUSTRY_PROFILES} BLS industry profiles; found ${Object.keys(CAREER_INDUSTRIES).length}.`
);
require(CAREER_INDUSTRY_VINTAGE === "May 2025", `Unexpected industry vintage ${CAREER_INDUSTRY_VINTAGE}.`);
require(/^https:\/\/(www\.)?bls\.gov\//.test(CAREER_INDUSTRY_SOURCE_URL), "Industry source is not an official BLS URL.");
for (const [id, industries] of Object.entries(CAREER_INDUSTRIES)) {
  require(careerIds.has(id), `${id}: industry profile has no catalog career.`);
  require(industries.length > 0 && industries.length <= 3, `${id}: invalid number of industry sectors.`);
  for (let index = 0; index < industries.length; index++) {
    const industry = industries[index];
    require(industry.employment > 0, `${id}/${industry.name}: invalid industry employment.`);
    require(industry.share == null || (industry.share >= 0 && industry.share <= 100), `${id}/${industry.name}: invalid occupation share.`);
    if (index > 0) {
      require(
        industries[index - 1].employment >= industry.employment,
        `${id}: industry sectors are not sorted by employment.`
      );
    }
  }
}
require(CAREER_INDUSTRIES.electrician?.[0]?.name === "Construction", "Electrician top industry changed.");
require(CAREER_INDUSTRIES.electrician?.[0]?.employment === 599700, "Electrician construction employment does not match May 2025 OEWS.");

require(CAREER_FIT_QUESTIONS.length === 12, `Expected 12 fit prompts; found ${CAREER_FIT_QUESTIONS.length}.`);
require(new Set(CAREER_FIT_QUESTIONS.map((question) => question.id)).size === 12, "Career-fit prompt ids are not unique.");
for (const interest of CAREER_INTERESTS) {
  require(
    CAREER_FIT_QUESTIONS.filter((question) => question.interest === interest).length === 2,
    `${interest}: career-fit sampler should contain exactly two prompts.`
  );
}
require(CAREER_COST_SOURCE.url.startsWith("https://nces.ed.gov/"), "Career cost source is not an official NCES URL.");

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

const metroManifest = JSON.parse(
  readFileSync(new URL("../public/data/career-metro-wages/manifest.json", import.meta.url), "utf8")
);
require(metroManifest.catalogCareers === careers.length, "Metro wage manifest career count is stale.");
require(metroManifest.uniqueAreas === 387, `Expected 387 metro areas; found ${metroManifest.uniqueAreas}.`);
require(metroManifest.sourceUrl === "https://www.bls.gov/oes/2025/may/oessrcma.htm", "Metro wage source is not the official May 2025 BLS table.");

let metroRecords = 0;
const uniqueMetroAreas = new Set();
for (const stateCode of stateData.states.map((state) => state.code)) {
  const metroState = JSON.parse(
    readFileSync(
      new URL(`../public/data/career-metro-wages/${stateCode}.json`, import.meta.url),
      "utf8"
    )
  );
  require(metroState.state === stateCode, `${stateCode}: metro wage file is mislabeled.`);
  require(metroState.areas.length > 0, `${stateCode}: metro wage file has no areas.`);
  for (const area of metroState.areas) {
    uniqueMetroAreas.add(area.code);
    require(/^00\d{5}$/.test(area.code), `${stateCode}: invalid metro code ${area.code}.`);
    require(area.sourceUrl.endsWith(`/area/${area.code}/2025`), `${stateCode}: invalid source for metro ${area.code}.`);
    const areaWages = metroState.wages[area.code] ?? {};
    metroRecords += Object.keys(areaWages).length;
    for (const careerId of Object.keys(areaWages)) {
      require(careerIds.has(careerId), `${stateCode}/${area.code}: unknown wage career ${careerId}.`);
    }
  }
}
require(uniqueMetroAreas.size === metroManifest.uniqueAreas, "Metro wage files do not match the manifest's unique-area count.");
require(metroRecords === metroManifest.stateAreaCareerRecords, "Metro wage record total does not match the manifest.");
const californiaMetro = JSON.parse(
  readFileSync(new URL("../public/data/career-metro-wages/CA.json", import.meta.url), "utf8")
);
require(
  californiaMetro.wages?.["0031080"]?.electrician?.annual === 73810,
  "Los Angeles electrician wage does not match May 2025 OEWS."
);

const pathwayManifest = JSON.parse(
  readFileSync(new URL("../public/data/career-pathways/manifest.json", import.meta.url), "utf8")
);
const pathwayRoutes = JSON.parse(
  readFileSync(
    new URL("../public/data/career-pathways/apprenticeship-routes.json", import.meta.url),
    "utf8"
  )
);
const stateCodes = stateData.states.map((state) => state.code).sort();
const pathwayTotals = { licenses: 0, programs: 0, sponsors: 0 };

require(pathwayManifest.catalogCareers === careers.length, "Pathway manifest career count is stale.");
require(pathwayManifest.totals?.licenses >= 20000, "License-path coverage fell unexpectedly.");
require(pathwayManifest.totals?.programs >= 140000, "Public-program coverage fell unexpectedly.");
require(pathwayManifest.totals?.sponsors >= 30000, "Registered-sponsor coverage fell unexpectedly.");
require(
  Object.keys(pathwayRoutes.careers ?? {}).length >= 250,
  "Approved apprenticeship-route coverage fell unexpectedly."
);

for (const source of Object.values(pathwayManifest.sources ?? {})) {
  require(
    /^https:\/\/(www\.)?(careeronestop\.org|nces\.ed\.gov|www\.onetcenter\.org|www\.apprenticeship\.gov)\//.test(source.url),
    `Pathway source is not an approved first-party URL: ${source.url}`
  );
}

for (const stateCode of stateCodes) {
  const pathwayState = JSON.parse(
    readFileSync(
      new URL(`../public/data/career-pathways/${stateCode}.json`, import.meta.url),
      "utf8"
    )
  );
  require(pathwayState.state === stateCode, `${stateCode}: pathway file is mislabeled.`);
  for (const [careerId, entry] of Object.entries(pathwayState.careers ?? {})) {
    require(careerIds.has(careerId), `${stateCode}: unknown pathway career ${careerId}.`);
    pathwayTotals.licenses += entry.licenses.length;
    pathwayTotals.programs += entry.programs.length;
    pathwayTotals.sponsors += entry.sponsors.length;
    for (const id of entry.licenses) {
      require(Boolean(pathwayState.licenses[id]), `${stateCode}/${careerId}: missing license ${id}.`);
    }
    for (const program of entry.programs) {
      require(
        Boolean(pathwayState.institutions[program.unitId]),
        `${stateCode}/${careerId}: missing institution ${program.unitId}.`
      );
      require(program.programs.length > 0, `${stateCode}/${careerId}: empty program match.`);
    }
    for (const id of entry.sponsors) {
      require(Boolean(pathwayState.sponsors[id]), `${stateCode}/${careerId}: missing sponsor ${id}.`);
    }
  }
}

for (const key of Object.keys(pathwayTotals)) {
  require(
    pathwayTotals[key] === pathwayManifest.totals[key],
    `Pathway ${key} total differs: manifest ${pathwayManifest.totals[key]}, files ${pathwayTotals[key]}.`
  );
}

const californiaPathways = JSON.parse(
  readFileSync(new URL("../public/data/career-pathways/CA.json", import.meta.url), "utf8")
);
require(
  californiaPathways.careers?.electrician?.licenses.length > 0 &&
    californiaPathways.careers?.electrician?.programs.length > 0 &&
    californiaPathways.careers?.electrician?.sponsors.length > 0,
  "California electrician pathway lost a licensing, training, or sponsor layer."
);

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
  `Career catalog OK: ${careers.length} careers, ${annual} annual medians, ${hourlyOnly} hourly-only medians, ${socs.length} unique SOC profiles, ${Object.keys(CAREER_ENRICHMENT).length} O*NET fit profiles, ${Object.keys(CAREER_WORK_CONTEXT).length} O*NET work-context profiles, ${Object.keys(CAREER_INDUSTRIES).length} BLS industry profiles, ${stateRecords.toLocaleString()} state wage records, ${uniqueMetroAreas.size} metro areas with ${metroRecords.toLocaleString()} state-area-career wage records, ${pathwayTotals.licenses.toLocaleString()} license matches, ${pathwayTotals.programs.toLocaleString()} public-program matches, and ${pathwayTotals.sponsors.toLocaleString()} registered-sponsor matches.`
);
