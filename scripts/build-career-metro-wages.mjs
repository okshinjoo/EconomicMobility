#!/usr/bin/env node

// Build browser-loadable metro wage tables from the official BLS OEWS data
// service. The area index is fixed to the May 2025 release so the labels and
// estimates always describe the same vintage. Suppressed estimates are
// omitted rather than inferred.

import fs from "node:fs/promises";
import path from "node:path";
import { careers } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";

const RELEASE_CODE = "2025A01";
const AREA_INDEX = "https://www.bls.gov/oes/2025/may/oessrcma.htm";
const ENDPOINT = "https://data.bls.gov/OESServices/combo/table";
const OUTPUT_DIR = path.resolve("public/data/career-metro-wages");
const AREA_INDEX_FILE = new URL("./data/bls-metro-area-index-2025.json", import.meta.url);
const CHUNK_SIZE = 5;

const STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI",
  "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
  "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY",
]);

const careerIdByOccupation = new Map(
  careers.map((career) => [CAREER_DETAILS[career.id].soc.replace("-", ""), career.id])
);
const occupationCodes = [...careerIdByOccupation.keys()];

async function fetchMetroAreas() {
  // BLS blocks non-browser downloads of the HTML index. This checked-in
  // snapshot was captured from that first-party page and keeps the build
  // reproducible; each wage value still comes live from the BLS data service.
  const index = JSON.parse(await fs.readFile(AREA_INDEX_FILE, "utf8"));
  const areasByCode = new Map();
  for (const entry of index) {
    const code = entry.code;
    if (!code.startsWith("00") || code === "0000000") continue;
    const name = entry.name;
    const suffix = name.split(", ").at(-1) ?? "";
    const states = [...new Set((suffix.match(/[A-Z]{2}/g) ?? []).filter((state) => STATES.has(state)))];
    if (!states.length) continue;
    areasByCode.set(code, {
      code,
      name,
      states,
      sourceUrl: entry.sourceUrl,
    });
  }

  return [...areasByCode.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function numericValue(raw) {
  const value = Number(String(raw ?? "").trim().replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

async function fetchChunk(areas, attempt = 1) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      areaCodes: areas.map((area) => area.code),
      industryCodes: ["000000"],
      occupationCodes,
      occupationExclude: false,
      datatypeCodes: ["13", "08"],
      releaseDates: [RELEASE_CODE],
      tableSuffix: "pub",
      userId: "",
      pwd: "",
    }),
  });
  if (!response.ok) {
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1250));
      return fetchChunk(areas, attempt + 1);
    }
    throw new Error(`BLS request failed (${response.status} ${response.statusText}).`);
  }
  return response.json();
}

const areas = await fetchMetroAreas();
if (areas.length < 380) {
  throw new Error(`Expected at least 380 metro areas; found ${areas.length}.`);
}

const wages = Object.fromEntries(areas.map((area) => [area.code, {}]));
const areaByCode = new Map(areas.map((area) => [area.code, area]));

for (let start = 0; start < areas.length; start += CHUNK_SIZE) {
  const chunk = areas.slice(start, start + CHUNK_SIZE);
  console.log(`Fetching metros ${start + 1}-${Math.min(start + CHUNK_SIZE, areas.length)} of ${areas.length}…`);
  const rows = await fetchChunk(chunk);
  for (const row of rows) {
    if (!areaByCode.has(row.areaCode)) continue;
    const careerId = careerIdByOccupation.get(row.occupationCode);
    const value = numericValue(row.value);
    if (!careerId || value == null) continue;
    const record = wages[row.areaCode][careerId] ?? {};
    if (row.datatypeCode === "13") record.annual = value;
    if (row.datatypeCode === "08") record.hourly = value;
    wages[row.areaCode][careerId] = record;
  }
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
let totalRecords = 0;
const stateCounts = {};

for (const state of STATES) {
  const stateAreas = areas.filter((area) => area.states.includes(state));
  const stateWages = Object.fromEntries(
    stateAreas.map((area) => {
      totalRecords += Object.keys(wages[area.code]).length;
      return [area.code, wages[area.code]];
    })
  );
  stateCounts[state] = stateAreas.length;
  await fs.writeFile(
    path.join(OUTPUT_DIR, `${state}.json`),
    JSON.stringify({
      vintage: "May 2025 BLS OEWS metropolitan area estimates",
      sourceUrl: AREA_INDEX,
      state,
      areas: stateAreas.map(({ code, name, sourceUrl }) => ({ code, name, sourceUrl })),
      wages: stateWages,
    })
  );
}

await fs.writeFile(
  path.join(OUTPUT_DIR, "manifest.json"),
  JSON.stringify({
    vintage: "May 2025 BLS OEWS metropolitan area estimates",
    sourceUrl: AREA_INDEX,
    catalogCareers: careers.length,
    uniqueAreas: areas.length,
    stateAreaCounts: stateCounts,
    stateAreaCareerRecords: totalRecords,
  })
);

console.log(`Wrote ${areas.length} unique metro areas across 50 states and D.C.`);
console.log(`Wrote ${totalRecords.toLocaleString()} state-area-career records to ${OUTPUT_DIR}.`);
