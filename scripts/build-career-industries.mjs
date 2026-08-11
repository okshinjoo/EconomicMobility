#!/usr/bin/env node

// Build the Career Explorer's compact industry-employment layer from an
// official BLS OEWS national industry export. The input is a normalized JSON
// snapshot with records shaped as { soc, sector, employment }.
// Usage:
//   npm run build:career-industries -- /path/to/career-industry-YYYY.json

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Pass a normalized BLS national industry JSON snapshot.");
  process.exit(1);
}

const outputPath = path.resolve("lib/careerIndustries.ts");
const input = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));

if (!/^https:\/\/(www\.)?bls\.gov\//.test(input.sourceUrl ?? "")) {
  throw new Error("The snapshot sourceUrl must point to an official BLS page.");
}
if (!Array.isArray(input.records) || !input.records.length) {
  throw new Error("The snapshot has no industry-employment records.");
}

const careerBySoc = new Map(
  Object.entries(CAREER_DETAILS).map(([careerId, detail]) => [detail.soc, careerId])
);
const byCareer = new Map();

for (const record of input.records) {
  const careerId = careerBySoc.get(String(record.soc ?? ""));
  const sector = String(record.sector ?? "").trim();
  const employment = Number(record.employment);
  if (!careerId || !sector || !Number.isFinite(employment) || employment <= 0) continue;

  if (!byCareer.has(careerId)) byCareer.set(careerId, new Map());
  const sectors = byCareer.get(careerId);
  sectors.set(sector, Math.max(employment, sectors.get(sector) ?? 0));
}

const generated = {};
for (const [careerId, sectors] of byCareer) {
  const nationalEmployment = CAREER_DETAILS[careerId]?.numJobs;
  generated[careerId] = [...sectors.entries()]
    .map(([name, employment]) => ({
      name,
      employment,
      share:
        nationalEmployment && nationalEmployment > 0
          ? Math.min(100, Math.round((employment / nationalEmployment) * 100))
          : null,
    }))
    .sort((a, b) => b.employment - a.employment)
    .slice(0, 3);
}

const source = `// GENERATED FILE — do not hand edit.\n// Built from the ${input.vintage} BLS OEWS national industry-specific estimates.\n\nexport interface CareerIndustry {\n  name: string;\n  employment: number;\n  share: number | null;\n}\n\nexport const CAREER_INDUSTRY_VINTAGE = ${JSON.stringify(input.vintage)};\nexport const CAREER_INDUSTRY_SOURCE_URL = ${JSON.stringify(input.sourceUrl)};\n\nexport const CAREER_INDUSTRIES: Record<string, CareerIndustry[]> = ${JSON.stringify(generated, null, 2)};\n\nexport function getCareerIndustries(id: string): CareerIndustry[] {\n  return CAREER_INDUSTRIES[id] ?? [];\n}\n`;

await fs.writeFile(outputPath, source);
console.log(
  `Wrote ${Object.keys(generated).length} career industry profiles from ${input.records.length.toLocaleString()} published BLS sector records to ${outputPath}.`
);
