#!/usr/bin/env node

// Build a compact, browser-loadable state wage table from the official BLS
// OEWS data service. The service returns suppressed values as blanks/markers;
// those are omitted rather than guessed.

import fs from "node:fs/promises";
import path from "node:path";
import { careers } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";

const RELEASE_CODE = "2025A01";
const OUTPUT = path.resolve("public/data/career-state-wages-2025.json");
const ENDPOINT = "https://data.bls.gov/OESServices/combo/table";
const CHUNK_SIZE = 7;

const STATES = [
  ["AL", "Alabama", "0100000"], ["AK", "Alaska", "0200000"],
  ["AZ", "Arizona", "0400000"], ["AR", "Arkansas", "0500000"],
  ["CA", "California", "0600000"], ["CO", "Colorado", "0800000"],
  ["CT", "Connecticut", "0900000"], ["DE", "Delaware", "1000000"],
  ["DC", "District of Columbia", "1100000"], ["FL", "Florida", "1200000"],
  ["GA", "Georgia", "1300000"], ["HI", "Hawaii", "1500000"],
  ["ID", "Idaho", "1600000"], ["IL", "Illinois", "1700000"],
  ["IN", "Indiana", "1800000"], ["IA", "Iowa", "1900000"],
  ["KS", "Kansas", "2000000"], ["KY", "Kentucky", "2100000"],
  ["LA", "Louisiana", "2200000"], ["ME", "Maine", "2300000"],
  ["MD", "Maryland", "2400000"], ["MA", "Massachusetts", "2500000"],
  ["MI", "Michigan", "2600000"], ["MN", "Minnesota", "2700000"],
  ["MS", "Mississippi", "2800000"], ["MO", "Missouri", "2900000"],
  ["MT", "Montana", "3000000"], ["NE", "Nebraska", "3100000"],
  ["NV", "Nevada", "3200000"], ["NH", "New Hampshire", "3300000"],
  ["NJ", "New Jersey", "3400000"], ["NM", "New Mexico", "3500000"],
  ["NY", "New York", "3600000"], ["NC", "North Carolina", "3700000"],
  ["ND", "North Dakota", "3800000"], ["OH", "Ohio", "3900000"],
  ["OK", "Oklahoma", "4000000"], ["OR", "Oregon", "4100000"],
  ["PA", "Pennsylvania", "4200000"], ["RI", "Rhode Island", "4400000"],
  ["SC", "South Carolina", "4500000"], ["SD", "South Dakota", "4600000"],
  ["TN", "Tennessee", "4700000"], ["TX", "Texas", "4800000"],
  ["UT", "Utah", "4900000"], ["VT", "Vermont", "5000000"],
  ["VA", "Virginia", "5100000"], ["WA", "Washington", "5300000"],
  ["WV", "West Virginia", "5400000"], ["WI", "Wisconsin", "5500000"],
  ["WY", "Wyoming", "5600000"],
];

const careerIdByOccupation = new Map(
  careers.map((career) => [CAREER_DETAILS[career.id].soc.replace("-", ""), career.id])
);
const occupationCodes = [...careerIdByOccupation.keys()];

function numericValue(raw) {
  const value = Number(String(raw ?? "").trim().replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

async function fetchChunk(states, attempt = 1) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      areaCodes: states.map((state) => state[2]),
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
    if (attempt < 3) return fetchChunk(states, attempt + 1);
    throw new Error(`BLS request failed (${response.status} ${response.statusText}).`);
  }
  return response.json();
}

const wages = Object.fromEntries(STATES.map(([abbr]) => [abbr, {}]));
const abbrByArea = new Map(STATES.map(([abbr, , area]) => [area, abbr]));

for (let start = 0; start < STATES.length; start += CHUNK_SIZE) {
  const chunk = STATES.slice(start, start + CHUNK_SIZE);
  console.log(`Fetching ${chunk.map(([abbr]) => abbr).join(", ")}…`);
  const rows = await fetchChunk(chunk);
  for (const row of rows) {
    const state = abbrByArea.get(row.areaCode);
    const careerId = careerIdByOccupation.get(row.occupationCode);
    const value = numericValue(row.value);
    if (!state || !careerId || value == null) continue;
    const record = wages[state][careerId] ?? {};
    if (row.datatypeCode === "13") record.annual = value;
    if (row.datatypeCode === "08") record.hourly = value;
    wages[state][careerId] = record;
  }
}

const payload = {
  vintage: "May 2025 BLS OEWS state estimates",
  sourceUrl: "https://www.bls.gov/oes/current/oessrcma.htm",
  states: STATES.map(([code, name]) => ({ code, name })),
  wages,
};
await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
await fs.writeFile(OUTPUT, JSON.stringify(payload));

const counts = Object.fromEntries(
  STATES.map(([abbr]) => [abbr, Object.keys(wages[abbr]).length])
);
const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
const lowest = Object.entries(counts).sort((a, b) => a[1] - b[1])[0];
console.log(`Wrote ${total.toLocaleString()} state-career wage records to ${OUTPUT}.`);
console.log(`Lowest state coverage: ${lowest[0]} (${lowest[1]} of ${careers.length}).`);
