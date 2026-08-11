#!/usr/bin/env node

// Build compact, comparison-ready work-context estimates from the official
// O*NET Work Context workbook. These categories summarize published survey
// ratings; remote compatibility is explicitly a heuristic, not a telework rate.
// Usage:
//   node --experimental-strip-types scripts/build-career-work-context.mjs /path/to/db_30_3_excel

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ExcelJS from "exceljs";
import { CAREER_ENRICHMENT } from "../lib/careerEnrichment.ts";

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("Pass the extracted O*NET Excel directory (for example, db_30_3_excel).");
  process.exit(1);
}

const input = path.join(sourceDir, "Work Context.xlsx");
const output = path.resolve("lib/careerWorkContext.ts");
const careerByOnetSoc = new Map(
  Object.entries(CAREER_ENRICHMENT).map(([careerId, profile]) => [profile.onetSoc, careerId])
);

const metricNames = new Set([
  "E-Mail",
  "Face-to-Face Discussions with Individuals and Within Teams",
  "Contact With Others",
  "Indoors, Environmentally Controlled",
  "Indoors, Not Environmentally Controlled",
  "Outdoors, Exposed to All Weather Conditions",
  "Spend Time Sitting",
  "Spend Time Standing",
  "Spend Time Climbing Ladders, Scaffolds, or Poles",
  "Spend Time Walking or Running",
  "Spend Time Kneeling, Crouching, Stooping, or Crawling",
  "Spend Time Keeping or Regaining Balance",
  "Spend Time Using Your Hands to Handle, Control, or Feel Objects, Tools, or Controls",
  "Spend Time Bending or Twisting Your Body",
  "Time Pressure",
]);

const scheduleName = "Work Schedules";
const hoursName = "Duration of Typical Work Week";
const raw = new Map();

function recordFor(careerId) {
  if (!raw.has(careerId)) raw.set(careerId, { metrics: {}, schedule: {}, hours: {} });
  return raw.get(careerId);
}

const workbook = new ExcelJS.stream.xlsx.WorkbookReader(input);
for await (const worksheet of workbook) {
  for await (const row of worksheet) {
    if (row.number === 1) continue;
    const values = row.values;
    const careerId = careerByOnetSoc.get(String(values[1] ?? ""));
    if (!careerId) continue;
    const element = String(values[4] ?? "");
    const scale = String(values[5] ?? "");
    const value = Number(values[8]);
    if (!Number.isFinite(value)) continue;

    const record = recordFor(careerId);
    if (scale === "CX" && metricNames.has(element) && String(values[13] ?? "N") !== "Y") {
      record.metrics[element] = value;
    }
    if (scale === "CTP" && element === scheduleName) {
      record.schedule[Number(values[7])] = value;
    }
    if (scale === "CTP" && element === hoursName) {
      record.hours[Number(values[7])] = value;
    }
  }
}

const get = (metrics, name, fallback = 3) => Number(metrics[name] ?? fallback);
const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const largestCategory = (categories) => {
  const entries = Object.entries(categories);
  if (!entries.length) return null;
  return Number(entries.sort((a, b) => b[1] - a[1])[0][0]);
};

const result = {};
for (const [careerId, record] of raw) {
  const metrics = record.metrics;
  const physicalScore = average([
    get(metrics, "Spend Time Standing"),
    get(metrics, "Spend Time Walking or Running"),
    get(metrics, "Spend Time Climbing Ladders, Scaffolds, or Poles"),
    get(metrics, "Spend Time Kneeling, Crouching, Stooping, or Crawling"),
    get(metrics, "Spend Time Keeping or Regaining Balance"),
    get(metrics, "Spend Time Bending or Twisting Your Body"),
  ]);
  const physicalDemand = physicalScore >= 3.1 ? "Higher" : physicalScore >= 1.9 ? "Moderate" : "Lower";

  const remoteScore = clamp(
    50 +
      (get(metrics, "Indoors, Environmentally Controlled") - 3) * 11 +
      (get(metrics, "Spend Time Sitting") - 3) * 12 +
      (get(metrics, "E-Mail") - 3) * 5 -
      (get(metrics, "Outdoors, Exposed to All Weather Conditions") - 3) * 10 -
      (get(metrics, "Indoors, Not Environmentally Controlled") - 3) * 5 -
      (get(metrics, "Spend Time Walking or Running") - 3) * 8 -
      (get(metrics, "Spend Time Using Your Hands to Handle, Control, or Feel Objects, Tools, or Controls") - 3) * 8 -
      (get(metrics, "Face-to-Face Discussions with Individuals and Within Teams") - 3) * 17 -
      (get(metrics, "Contact With Others") - 3) * 14,
    0,
    100
  );
  const remoteCompatibility = remoteScore >= 65 ? "Higher" : remoteScore >= 40 ? "Mixed" : "Lower";

  const scheduleCategory = largestCategory(record.schedule);
  const hoursCategory = largestCategory(record.hours);
  const scheduleType = scheduleCategory === 1 ? "Regular" : scheduleCategory === 2 ? "Irregular" : scheduleCategory === 3 ? "Seasonal" : null;
  const weeklyHours = hoursCategory === 1 ? "Usually under 40 hours" : hoursCategory === 2 ? "Usually 40 hours" : hoursCategory === 3 ? "Often over 40 hours" : null;

  result[careerId] = {
    physicalDemand,
    physicalScore: Number(physicalScore.toFixed(2)),
    remoteCompatibility,
    remoteScore: Math.round(remoteScore),
    scheduleType,
    weeklyHours,
    timePressure: Number(get(metrics, "Time Pressure").toFixed(2)),
  };
}

const source = `// GENERATED FILE — do not hand edit.\n// Built from O*NET 30.3 Work Context data. Remote compatibility is an\n// Empower heuristic based on work setting, posture, tools, and in-person contact;\n// it is not an employer policy or observed telework percentage.\n\nexport type CareerDemandLevel = "Lower" | "Moderate" | "Higher";\nexport type CareerRemoteCompatibility = "Lower" | "Mixed" | "Higher";\n\nexport interface CareerWorkContext {\n  physicalDemand: CareerDemandLevel;\n  physicalScore: number;\n  remoteCompatibility: CareerRemoteCompatibility;\n  remoteScore: number;\n  scheduleType: "Regular" | "Irregular" | "Seasonal" | null;\n  weeklyHours: string | null;\n  timePressure: number;\n}\n\nexport const CAREER_WORK_CONTEXT: Record<string, CareerWorkContext> = ${JSON.stringify(result, null, 2)};\n\nexport function getCareerWorkContext(id: string): CareerWorkContext | undefined {\n  return CAREER_WORK_CONTEXT[id];\n}\n`;

await fs.writeFile(output, source);
console.log(`Wrote ${Object.keys(result).length} O*NET work-context profiles to ${output}.`);
