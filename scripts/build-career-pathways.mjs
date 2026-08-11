#!/usr/bin/env node

/**
 * Build state-level career pathways from public federal data.
 *
 * Sources:
 * - CareerOneStop / Analyst Resource Center occupational-license export
 * - NCES IPEDS institutional characteristics and completions
 * - O*NET CIP and RAPIDS crosswalks
 * - Apprenticeship.gov Partner Finder registered-sponsor index
 *
 * Raw downloads are temporary. The checked-in output is split by state so a
 * visitor downloads only the pathways for the state they chose.
 */

import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "csv-parse";
import ExcelJS from "exceljs";
import MDBReader from "mdb-reader";
import { careers } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";
import { CAREER_ENRICHMENT } from "../lib/careerEnrichment.ts";

const LICENSE_URL =
  "https://data.widcenter.org/wfinfodb/License/WID28LicenseSTallExport202410.zip";
const HD_URL = "https://nces.ed.gov/ipeds/datacenter/data/HD2024.zip";
const COMPLETIONS_URL = "https://nces.ed.gov/ipeds/datacenter/data/C2024_A.zip";
const CIP_CROSSWALK_URL =
  "https://www.onetcenter.org/crosswalks/cip/Education_CIP_to_ONET_SOC.xlsx";
const RAPIDS_CROSSWALK_URL =
  "https://www.onetcenter.org/crosswalks/rapids/Apprenticeship_RAPIDS_to_ONET-SOC.xlsx";
const APPRENTICESHIP_CONFIG_URL =
  "https://www.apprenticeship.gov/react/static/js/config.js";

const OUTPUT_DIR = new URL("../public/data/career-pathways/", import.meta.url);

const STATES = {
  AL: ["Alabama", "01"], AK: ["Alaska", "02"], AZ: ["Arizona", "04"],
  AR: ["Arkansas", "05"], CA: ["California", "06"], CO: ["Colorado", "08"],
  CT: ["Connecticut", "09"], DE: ["Delaware", "10"], DC: ["District of Columbia", "11"],
  FL: ["Florida", "12"], GA: ["Georgia", "13"], HI: ["Hawaii", "15"],
  ID: ["Idaho", "16"], IL: ["Illinois", "17"], IN: ["Indiana", "18"],
  IA: ["Iowa", "19"], KS: ["Kansas", "20"], KY: ["Kentucky", "21"],
  LA: ["Louisiana", "22"], ME: ["Maine", "23"], MD: ["Maryland", "24"],
  MA: ["Massachusetts", "25"], MI: ["Michigan", "26"], MN: ["Minnesota", "27"],
  MS: ["Mississippi", "28"], MO: ["Missouri", "29"], MT: ["Montana", "30"],
  NE: ["Nebraska", "31"], NV: ["Nevada", "32"], NH: ["New Hampshire", "33"],
  NJ: ["New Jersey", "34"], NM: ["New Mexico", "35"], NY: ["New York", "36"],
  NC: ["North Carolina", "37"], ND: ["North Dakota", "38"], OH: ["Ohio", "39"],
  OK: ["Oklahoma", "40"], OR: ["Oregon", "41"], PA: ["Pennsylvania", "42"],
  RI: ["Rhode Island", "44"], SC: ["South Carolina", "45"], SD: ["South Dakota", "46"],
  TN: ["Tennessee", "47"], TX: ["Texas", "48"], UT: ["Utah", "49"],
  VT: ["Vermont", "50"], VA: ["Virginia", "51"], WA: ["Washington", "53"],
  WV: ["West Virginia", "54"], WI: ["Wisconsin", "55"], WY: ["Wyoming", "56"],
};

const STATE_BY_FIPS = Object.fromEntries(
  Object.entries(STATES).map(([code, [, fips]]) => [fips, code])
);

const AWARD_LABELS = {
  "2": "Certificate, 900–1,799 clock hours / 30–59 credits",
  "3": "Associate degree",
  "4": "Certificate, 1,800+ clock hours / 60+ credits",
  "5": "Bachelor’s degree",
  "6": "Post-bachelor’s certificate",
  "7": "Master’s degree",
  "8": "Post-master’s certificate",
  "17": "Research doctorate",
  "18": "Professional doctorate",
  "19": "Other doctorate",
  "20": "Certificate under 300 clock hours / 9 credits",
  "21": "Certificate, 300–899 clock hours / 9–29 credits",
};

const clean = (value) =>
  value == null ? "" : String(value).replace(/\s+/g, " ").trim();

const normalizeSoc = (value) => clean(value).replace(/[^0-9]/g, "").padEnd(8, "0").slice(0, 8);
const normalizeCip = (value) => clean(value).padStart(7, "0");

function asNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeUrl(value) {
  const url = clean(value);
  if (!url || url === "-2") return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function dateFromCompact(value) {
  const text = clean(value);
  return /^\d{8}$/.test(text)
    ? `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`
    : text;
}

function truncate(value, length = 1400) {
  const text = clean(value);
  return text.length <= length ? text : `${text.slice(0, length - 1).trim()}…`;
}

async function download(url, destination) {
  console.log(`Downloading ${url}`);
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, bytes);
  return bytes.length;
}

async function unzip(zipPath, destination) {
  await mkdir(destination, { recursive: true });
  execFileSync("unzip", ["-o", zipPath, "-d", destination], { stdio: "ignore" });
}

async function loadWorkbook(path) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);
  return workbook.worksheets[0];
}

async function* csvRows(path) {
  const parser = createReadStream(path).pipe(
    parse({ columns: true, bom: true, relax_quotes: true, relax_column_count: true })
  );
  for await (const row of parser) yield row;
}

function buildCareerMaps() {
  const careerById = new Map(careers.map((career) => [career.id, career]));
  const idsBySoc = new Map();
  for (const career of careers) {
    const soc = normalizeSoc(
      CAREER_ENRICHMENT[career.id]?.onetSoc ?? `${CAREER_DETAILS[career.id]?.soc}.00`
    );
    if (!soc) continue;
    if (!idsBySoc.has(soc)) idsBySoc.set(soc, []);
    idsBySoc.get(soc).push(career.id);
  }
  return { careerById, idsBySoc };
}

function getCareerEntry(stateData, careerId) {
  if (!stateData.careers[careerId]) {
    stateData.careers[careerId] = { licenses: [], programs: [], sponsors: [] };
  }
  return stateData.careers[careerId];
}

function makeStateData() {
  return Object.fromEntries(
    Object.entries(STATES).map(([code, [name]]) => [
      code,
      { state: code, stateName: name, careers: {} },
    ])
  );
}

function lookupTable(database, tableName, key, value) {
  return Object.fromEntries(
    database
      .getTable(tableName)
      .getData()
      .map((row) => [clean(row[key]), clean(row[value])])
  );
}

async function addLicenses(mdbPath, stateData, idsBySoc) {
  const database = new MDBReader(await readFile(mdbPath));
  const occRows = database.getTable("licxocc").getData();
  const careerIdsByLicense = new Map();

  for (const row of occRows) {
    const careerIds = idsBySoc.get(normalizeSoc(row.occcode));
    if (!careerIds) continue;
    const key = `${clean(row.stfips)}|${clean(row.licenseid)}`;
    const ids = careerIdsByLicense.get(key) ?? new Set();
    for (const id of careerIds) ids.add(id);
    careerIdsByLicense.set(key, ids);
  }

  const agencyByKey = new Map();
  const agencyFallback = new Map();
  for (const row of database.getTable("licauth").getData()) {
    const agency = {
      name: [row.department, row.division, row.board].map(clean).filter(Boolean).join(" · "),
      phone: clean(row.telephone),
      email: clean(row.email),
      url: normalizeUrl(row.url),
    };
    agencyByKey.set(
      [row.stfips, row.areatype, row.area, row.licauthid].map(clean).join("|"),
      agency
    );
    agencyFallback.set([row.stfips, row.licauthid].map(clean).join("|"), agency);
  }

  const lookups = {
    Type: lookupTable(database, "licensetypes", "licensetype", "licensetypedesc"),
    Exam: lookupTable(database, "licenseexams", "licenseexam", "examdesc"),
    Education: lookupTable(database, "licenseeducation", "licenseeducation", "educationdesc"),
    Experience: lookupTable(database, "licenseexperience", "licenseexperience", "experiencedesc"),
    "Continuing education": lookupTable(database, "liccontinuingedu", "licensecontinuingedu", "continuingedudesc"),
    Certification: lookupTable(database, "licensecertification", "licensecertification", "licensecertdesc"),
    "Background check": lookupTable(database, "licensecriminal", "licensecriminal", "licensecriminaldesc"),
    "Physical requirement": lookupTable(database, "licensephysicalreqs", "licensephysical", "physicaldesc"),
  };

  const fieldForLabel = {
    Type: "licensetype",
    Exam: "exam",
    Education: "education",
    Experience: "experience",
    "Continuing education": "continuingedu",
    Certification: "certification",
    "Background check": "criminal",
    "Physical requirement": "physical",
  };

  let added = 0;
  for (const row of database.getTable("license").getData()) {
    if (clean(row.inactive) !== "0") continue;
    const isFederal = clean(row.stfips) === "00" && clean(row.areatype) === "00";
    const isState = clean(row.areatype) === "01" && STATE_BY_FIPS[clean(row.stfips)];
    if (!isFederal && !isState) continue;

    const careerIds = careerIdsByLicense.get(`${clean(row.stfips)}|${clean(row.licenseid)}`);
    if (!careerIds?.size) continue;
    const agencyKey = [row.stfips, row.areatype, row.area, row.licauthid].map(clean).join("|");
    const agency =
      agencyByKey.get(agencyKey) ??
      agencyFallback.get([row.stfips, row.licauthid].map(clean).join("|")) ??
      { name: "", phone: "", email: "", url: "" };

    const requirements = Object.entries(lookups)
      .map(([label, lookup]) => ({ label, value: lookup[clean(row[fieldForLabel[label]])] ?? "" }))
      .filter(({ value }) => value && value !== "Undetermined");

    const record = {
      id: `${clean(row.stfips)}-${clean(row.licenseid)}`,
      title: clean(row.lictitle),
      description: truncate(row.licdesc),
      jurisdiction: isFederal ? "Federal" : "State",
      requirements,
      agency: agency.name,
      phone: agency.phone,
      email: agency.email,
      url: normalizeUrl(row.licenseurl) || agency.url,
      updated: dateFromCompact(row.licenseupdated),
    };

    const targetStates = isFederal ? Object.keys(STATES) : [STATE_BY_FIPS[clean(row.stfips)]];
    for (const state of targetStates) {
      for (const careerId of careerIds) {
        const licenses = getCareerEntry(stateData[state], careerId).licenses;
        if (!licenses.some((item) => item.id === record.id)) {
          licenses.push(record);
          added += 1;
        }
      }
    }
  }
  return added;
}

async function readCipCrosswalk(path, idsBySoc) {
  const sheet = await loadWorkbook(path);
  const cipMeta = new Map();
  const careerIdsByCip = new Map();
  for (let rowNumber = 5; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber).values;
    const cip = normalizeCip(row[1]);
    const title = clean(row[2]);
    const careerIds = idsBySoc.get(normalizeSoc(row[3]));
    if (!cip || !careerIds) continue;
    cipMeta.set(cip, { cip, title });
    const ids = careerIdsByCip.get(cip) ?? new Set();
    for (const id of careerIds) ids.add(id);
    careerIdsByCip.set(cip, ids);
  }
  return { cipMeta, careerIdsByCip };
}

async function addPrograms(hdPath, completionsPath, crosswalkPath, stateData, idsBySoc) {
  const institutions = new Map();
  for await (const row of csvRows(hdPath)) {
    const state = clean(row.STABBR).toUpperCase();
    if (!STATES[state] || clean(row.CONTROL) !== "1" || clean(row.CYACTIVE) !== "1") continue;
    institutions.set(clean(row.UNITID), {
      unitId: clean(row.UNITID),
      name: clean(row.INSTNM),
      city: clean(row.CITY),
      state,
      zip: clean(row.ZIP).slice(0, 5),
      website: normalizeUrl(row.WEBADDR),
      level:
        clean(row.ICLEVEL) === "2"
          ? "Two-year college"
          : clean(row.ICLEVEL) === "3"
            ? "Public technical school"
            : "Four-year college",
      latitude: asNumber(row.LATITUDE),
      longitude: asNumber(row.LONGITUD),
    });
  }

  const { cipMeta, careerIdsByCip } = await readCipCrosswalk(crosswalkPath, idsBySoc);
  const groups = new Map();
  for await (const row of csvRows(completionsPath)) {
    if (clean(row.MAJORNUM) !== "1") continue;
    const institution = institutions.get(clean(row.UNITID));
    const cip = normalizeCip(row.CIPCODE);
    const careerIds = careerIdsByCip.get(cip);
    const completions = asNumber(row.CTOTALT);
    const award = AWARD_LABELS[clean(row.AWLEVEL)];
    if (!institution || !careerIds || !award || !completions || completions <= 0) continue;

    for (const careerId of careerIds) {
      const groupKey = `${institution.state}|${careerId}|${institution.unitId}`;
      let group = groups.get(groupKey);
      if (!group) {
        group = { ...institution, programs: new Map(), totalCompletions: 0 };
        groups.set(groupKey, group);
      }
      let program = group.programs.get(cip);
      if (!program) {
        program = { cip, title: cipMeta.get(cip)?.title ?? cip, awards: new Set(), completions: 0 };
        group.programs.set(cip, program);
      }
      program.awards.add(award);
      program.completions += completions;
      group.totalCompletions += completions;
    }
  }

  for (const [key, group] of groups) {
    const [state, careerId] = key.split("|");
    getCareerEntry(stateData[state], careerId).programs.push({
      unitId: group.unitId,
      school: group.name,
      city: group.city,
      zip: group.zip,
      website: group.website,
      level: group.level,
      latitude: group.latitude,
      longitude: group.longitude,
      totalCompletions: group.totalCompletions,
      programs: [...group.programs.values()]
        .map((program) => ({
          cip: program.cip,
          title: program.title,
          awards: [...program.awards].sort(),
          completions: program.completions,
        }))
        .sort((a, b) => b.completions - a.completions || a.title.localeCompare(b.title)),
    });
  }
  return groups.size;
}

async function fetchSponsorPage(searchBase, apiKey, skip) {
  const response = await fetch(
    `${searchBase}/partner-finder-prod/docs/search?api-version=2020-06-30`,
    {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        search: "*",
        filter: "source eq 'sponsor'",
        top: 1000,
        skip,
        count: true,
        select:
          "id,name,lastUpdated,occupationCodes,occupationNames,additionalProperties,rapidsSpecifics,Address",
      }),
    }
  );
  if (!response.ok) throw new Error(`Apprenticeship sponsor query returned ${response.status}`);
  return response.json();
}

async function fetchSponsors() {
  const configResponse = await fetch(APPRENTICESHIP_CONFIG_URL);
  if (!configResponse.ok) throw new Error("Apprenticeship.gov config could not be loaded");
  const config = await configResponse.text();
  const apiKey = /VITE_AZURE_SEARCH_API_KEY:\s*"([^"]+)"/.exec(config)?.[1];
  const searchBase = /VITE_AZURE_SEARCH:\s*"([^"]+)"/.exec(config)?.[1];
  if (!apiKey || !searchBase) throw new Error("Apprenticeship.gov search configuration changed");

  const first = await fetchSponsorPage(searchBase, apiKey, 0);
  const total = first["@odata.count"] ?? first.value.length;
  const rows = [...first.value];
  const skips = [];
  for (let skip = 1000; skip < total; skip += 1000) skips.push(skip);
  for (let index = 0; index < skips.length; index += 4) {
    const pages = await Promise.all(
      skips.slice(index, index + 4).map((skip) => fetchSponsorPage(searchBase, apiKey, skip))
    );
    for (const page of pages) rows.push(...page.value);
    console.log(`Downloaded ${Math.min(rows.length, total).toLocaleString()} of ${total.toLocaleString()} sponsor records`);
  }
  return rows;
}

function parseAdditionalProperties(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

function addSponsors(sponsors, stateData, idsBySoc) {
  let added = 0;
  for (const row of sponsors) {
    const state = clean(row.Address?.state).toUpperCase();
    if (!STATES[state]) continue;
    const careerIds = new Set();
    for (const soc of row.occupationCodes ?? []) {
      for (const id of idsBySoc.get(normalizeSoc(soc)) ?? []) careerIds.add(id);
    }
    if (!careerIds.size || !clean(row.name)) continue;

    const details = parseAdditionalProperties(row.additionalProperties);
    const coordinates = row.Address?.coordinates?.coordinates ?? [];
    const sponsor = {
      id: clean(row.id),
      name: clean(row.name),
      city: clean(row.Address?.city),
      state,
      zip: clean(row.Address?.zip).slice(0, 5),
      latitude: asNumber(coordinates[1]),
      longitude: asNumber(coordinates[0]),
      occupations: (row.occupationNames ?? []).map(clean).filter(Boolean),
      sponsorType: (row.rapidsSpecifics?.sponsorRTI?.sponsorType ?? []).map(clean).filter(Boolean),
      employerStructure: clean(row.rapidsSpecifics?.sponsorRTI?.programEmployerType),
      instructionMethod: clean(row.rapidsSpecifics?.sponsorRTI?.instructionMethod),
      nationalProgram: Boolean(row.rapidsSpecifics?.sponsorRTI?.isNationalProgram),
      email: clean(details.email),
      phone: clean(details.phone),
      website: normalizeUrl(details.url),
      updated: clean(row.lastUpdated).slice(0, 10),
      profileUrl: `https://www.apprenticeship.gov/partner-finder/profile?id=${encodeURIComponent(clean(row.id))}`,
    };

    for (const careerId of careerIds) {
      getCareerEntry(stateData[state], careerId).sponsors.push(sponsor);
      added += 1;
    }
  }
  return added;
}

async function buildRapidsRoutes(path, idsBySoc) {
  const sheet = await loadWorkbook(path);
  const routes = {};
  const seen = new Map();
  for (let rowNumber = 5; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber).values;
    const code = clean(row[1]);
    const title = clean(row[2]);
    const careerIds = idsBySoc.get(normalizeSoc(row[3]));
    if (!code || !title || !careerIds) continue;
    for (const careerId of careerIds) {
      if (!routes[careerId]) routes[careerId] = [];
      if (!seen.has(careerId)) seen.set(careerId, new Set());
      const key = `${code}|${title}`;
      if (seen.get(careerId).has(key)) continue;
      seen.get(careerId).add(key);
      routes[careerId].push({ code, title });
    }
  }
  for (const items of Object.values(routes)) items.sort((a, b) => a.title.localeCompare(b.title));
  return routes;
}

function sortStateData(stateData) {
  for (const state of Object.values(stateData)) {
    const sortedCareers = {};
    for (const careerId of Object.keys(state.careers).sort()) {
      const entry = state.careers[careerId];
      entry.licenses.sort(
        (a, b) => a.jurisdiction.localeCompare(b.jurisdiction) || a.title.localeCompare(b.title)
      );
      entry.programs.sort(
        (a, b) => b.totalCompletions - a.totalCompletions || a.school.localeCompare(b.school)
      );
      entry.sponsors.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
      sortedCareers[careerId] = entry;
    }
    state.careers = sortedCareers;
  }
}

function serializeStateData(state) {
  const licenses = {};
  const institutions = {};
  const sponsors = {};
  const careerEntries = {};

  for (const [careerId, entry] of Object.entries(state.careers)) {
    for (const license of entry.licenses) licenses[license.id] = license;
    for (const sponsor of entry.sponsors) sponsors[sponsor.id] = sponsor;
    for (const program of entry.programs) {
      institutions[program.unitId] = {
        unitId: program.unitId,
        school: program.school,
        city: program.city,
        zip: program.zip,
        website: program.website,
        level: program.level,
        latitude: program.latitude,
        longitude: program.longitude,
      };
    }
    careerEntries[careerId] = {
      licenses: entry.licenses.map((license) => license.id),
      programs: entry.programs.map((program) => ({
        unitId: program.unitId,
        totalCompletions: program.totalCompletions,
        programs: program.programs,
      })),
      sponsors: entry.sponsors.map((sponsor) => sponsor.id),
    };
  }

  return {
    state: state.state,
    stateName: state.stateName,
    licenses,
    institutions,
    sponsors,
    careers: careerEntries,
  };
}

async function main() {
  const started = Date.now();
  const work = await mkdtemp(join(tmpdir(), "empower-career-pathways-"));
  try {
    const licenseZip = join(work, "licenses.zip");
    const hdZip = join(work, "HD2024.zip");
    const completionsZip = join(work, "C2024_A.zip");
    const cipPath = join(work, "cip.xlsx");
    const rapidsPath = join(work, "rapids.xlsx");

    await Promise.all([
      download(LICENSE_URL, licenseZip),
      download(HD_URL, hdZip),
      download(COMPLETIONS_URL, completionsZip),
      download(CIP_CROSSWALK_URL, cipPath),
      download(RAPIDS_CROSSWALK_URL, rapidsPath),
    ]);
    await unzip(licenseZip, join(work, "licenses"));
    await unzip(hdZip, join(work, "hd"));
    await unzip(completionsZip, join(work, "completions"));

    const licenseMdb = join(work, "licenses", "WID28LicenseSTallExport202410.mdb");
    const hdCsv = join(work, "hd", "HD2024.csv");
    const completionsCsv = join(work, "completions", "C2024_a.csv");
    for (const path of [licenseMdb, hdCsv, completionsCsv]) await stat(path);

    const { idsBySoc } = buildCareerMaps();
    const stateData = makeStateData();
    const routes = await buildRapidsRoutes(rapidsPath, idsBySoc);
    const licenseRecords = await addLicenses(licenseMdb, stateData, idsBySoc);
    const programRecords = await addPrograms(hdCsv, completionsCsv, cipPath, stateData, idsBySoc);
    const sponsorRows = await fetchSponsors();
    const sponsorRecords = addSponsors(sponsorRows, stateData, idsBySoc);
    sortStateData(stateData);

    await mkdir(OUTPUT_DIR, { recursive: true });
    const generatedAt = new Date().toISOString();
    for (const [code, data] of Object.entries(stateData)) {
      await writeFile(
        new URL(`${code}.json`, OUTPUT_DIR),
        JSON.stringify({ generatedAt, ...serializeStateData(data) })
      );
    }
    await writeFile(
      new URL("apprenticeship-routes.json", OUTPUT_DIR),
      JSON.stringify({
        generatedAt,
        vintage: "O*NET RAPIDS crosswalk, March 2026",
        sourceUrl: "https://www.onetcenter.org/crosswalks.html",
        careers: routes,
      })
    );

    const countsByState = Object.fromEntries(
      Object.entries(stateData).map(([code, data]) => [
        code,
        Object.values(data.careers).reduce(
          (totals, entry) => ({
            licenses: totals.licenses + entry.licenses.length,
            programs: totals.programs + entry.programs.length,
            sponsors: totals.sponsors + entry.sponsors.length,
          }),
          { licenses: 0, programs: 0, sponsors: 0 }
        ),
      ])
    );

    await writeFile(
      new URL("manifest.json", OUTPUT_DIR),
      JSON.stringify(
        {
          generatedAt,
          catalogCareers: careers.length,
          sources: {
            licenses: {
              label: "CareerOneStop occupational-license database",
              vintage: "October 2024 nationwide export",
              url: "https://www.careeronestop.org/Developers/Data/occupational-licenses.aspx",
            },
            programs: {
              label: "NCES IPEDS institutions and completions",
              vintage: "2023–24 completions, released September 2025",
              url: "https://nces.ed.gov/ipeds/use-the-data",
            },
            educationCrosswalk: {
              label: "O*NET 2020 CIP to O*NET-SOC crosswalk",
              vintage: "July 2024",
              url: "https://www.onetcenter.org/crosswalks.html",
            },
            apprenticeships: {
              label: "Apprenticeship.gov registered-sponsor Partner Finder",
              vintage: `Live index snapshot ${generatedAt.slice(0, 10)}`,
              url: "https://www.apprenticeship.gov/partner-finder/listings",
            },
            apprenticeshipCrosswalk: {
              label: "O*NET RAPIDS to O*NET-SOC crosswalk",
              vintage: "March 2026",
              url: "https://www.onetcenter.org/crosswalks.html",
            },
          },
          totals: {
            licenses: licenseRecords,
            programs: programRecords,
            sponsorSourceRows: sponsorRows.length,
            sponsors: sponsorRecords,
            careersWithApprovedApprenticeships: Object.keys(routes).length,
          },
          countsByState,
        },
        null,
        2
      )
    );

    console.log(
      `Built ${licenseRecords.toLocaleString()} license matches, ${programRecords.toLocaleString()} public-college matches, and ${sponsorRecords.toLocaleString()} registered-sponsor matches in ${Math.round((Date.now() - started) / 1000)}s.`
    );
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}

await main();
