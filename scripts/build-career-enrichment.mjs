#!/usr/bin/env node

// Build the Career Explorer's O*NET layer from the official database release.
// Usage:
//   node --experimental-strip-types scripts/build-career-enrichment.mjs /path/to/db_30_3_excel

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ExcelJS from "exceljs";
import { careers } from "../lib/careers.ts";
import { CAREER_DETAILS } from "../lib/careerDetails.ts";

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("Pass the extracted O*NET Excel directory (for example, db_30_3_excel).");
  process.exit(1);
}

const outputPath = path.resolve("lib/careerEnrichment.ts");
const searchOutputPath = path.resolve("lib/careerSearchTerms.ts");
const RELEASE = "O*NET 30.3";
const MAX = {
  alternateTitles: 6,
  coreTasks: 5,
  interests: 3,
  workStyles: 4,
  software: 6,
};

const MANUAL_ONET_CODES = {
  // These BLS titles are broader or phrased differently, but the underlying
  // detailed occupation is an exact fit.
  "home-health-aide": "31-1121.00",
  "clinical-lab-tech": "29-2012.00",
};

function cellText(value) {
  if (value == null) return "";
  if (typeof value === "object" && "text" in value) return String(value.text).trim();
  if (typeof value === "object" && "result" in value) return String(value.result ?? "").trim();
  return String(value).trim();
}

async function rowsFrom(fileName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.join(sourceDir, fileName));
  const sheet = workbook.worksheets[0];
  const headers = [];
  sheet.getRow(1).eachCell({ includeEmpty: true }, (cell, col) => {
    headers[col] = cellText(cell.value);
  });
  const rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const record = {};
    for (let col = 1; col < headers.length; col++) {
      if (headers[col]) record[headers[col]] = cellText(row.getCell(col).value);
    }
    rows.push(record);
  });
  return rows;
}

function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/\band\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleScore(a, b) {
  const left = new Set(normalizeTitle(a).split(/\s+/).filter(Boolean));
  const right = new Set(normalizeTitle(b).split(/\s+/).filter(Boolean));
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const token of left) if (right.has(token)) intersection++;
  return intersection / new Set([...left, ...right]).size;
}

function groupByCode(rows) {
  const result = new Map();
  for (const row of rows) {
    const code = row["O*NET-SOC Code"];
    if (!code) continue;
    if (!result.has(code)) result.set(code, []);
    result.get(code).push(row);
  }
  return result;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function quote(value) {
  return JSON.stringify(value);
}

console.log(`Reading ${RELEASE} from ${sourceDir}…`);
const occupationRows = await rowsFrom("Occupation Data.xlsx");
const occupations = new Map(occupationRows.map((row) => [row["O*NET-SOC Code"], row]));

function matchCode(career) {
  const manual = MANUAL_ONET_CODES[career.id];
  if (manual && occupations.has(manual)) return manual;
  const soc = CAREER_DETAILS[career.id]?.soc;
  if (!soc) return null;
  const exact = `${soc}.00`;
  if (occupations.has(exact)) return exact;
  const candidates = [...occupations.keys()].filter((code) => code.startsWith(`${soc}.`));
  if (!candidates.length) return null;
  candidates.sort(
    (a, b) =>
      titleScore(career.title, occupations.get(b)?.Title ?? "") -
      titleScore(career.title, occupations.get(a)?.Title ?? "")
  );
  const best = candidates[0];
  return titleScore(career.title, occupations.get(best)?.Title ?? "") >= 0.34 ? best : null;
}

const careerCodes = new Map(careers.map((career) => [career.id, matchCode(career)]));
const targetCodes = new Set([...careerCodes.values()].filter(Boolean));

console.log(`Matched ${targetCodes.size} O*NET occupations. Reading profile tables…`);
const [titleRows, taskRows, interestRows, styleRows, softwareRows, zoneRows] = await Promise.all([
  rowsFrom("Sample of Reported Titles.xlsx"),
  rowsFrom("Task Statements.xlsx"),
  rowsFrom("Career Interest Types.xlsx"),
  rowsFrom("Work Styles.xlsx"),
  rowsFrom("Software Skills.xlsx"),
  rowsFrom("Job Zones.xlsx"),
]);

const titlesByCode = groupByCode(titleRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));
const tasksByCode = groupByCode(taskRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));
const interestsByCode = groupByCode(interestRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));
const stylesByCode = groupByCode(styleRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));
const softwareByCode = groupByCode(softwareRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));
const zonesByCode = groupByCode(zoneRows.filter((row) => targetCodes.has(row["O*NET-SOC Code"])));

const generated = {};
const incomplete = [];
for (const career of careers) {
  const code = careerCodes.get(career.id);
  if (!code) continue;
  const occupation = occupations.get(code);
  const alternateTitles = unique(
    (titlesByCode.get(code) ?? [])
      .sort((a, b) => (b["Shown in My Next Move"] === "Y" ? 1 : 0) - (a["Shown in My Next Move"] === "Y" ? 1 : 0))
      .map((row) => row["Reported Job Title"])
      .filter((title) => normalizeTitle(title) !== normalizeTitle(career.title))
  ).slice(0, MAX.alternateTitles);
  const allTasks = tasksByCode.get(code) ?? [];
  const designatedCoreTasks = allTasks.filter((row) => row["Task Type"] === "Core");
  const coreTasks = unique(
    (designatedCoreTasks.length ? designatedCoreTasks : allTasks).map((row) => row.Task)
  ).slice(0, MAX.coreTasks);
  const interests = (interestsByCode.get(code) ?? [])
    .filter((row) => row["Scale ID"] === "OI")
    .sort((a, b) => Number(b["Data Value"]) - Number(a["Data Value"]))
    .slice(0, MAX.interests)
    .map((row) => row["Element Name"]);
  const workStyles = (stylesByCode.get(code) ?? [])
    .filter((row) => row["Scale ID"] === "WI")
    .sort((a, b) => Number(b["Data Value"]) - Number(a["Data Value"]))
    .slice(0, MAX.workStyles)
    .map((row) => row["Element Name"]);
  const software = unique(
    (softwareByCode.get(code) ?? [])
      .sort((a, b) => {
        const rank = (row) => (row["In Demand"] === "Y" ? 2 : row["Hot Technology"] === "Y" ? 1 : 0);
        return rank(b) - rank(a);
      })
      .map((row) => row["Example"] || row["Commodity Title"] || row["Workplace Example"])
  ).slice(0, MAX.software);
  const zone = Number((zonesByCode.get(code) ?? [])[0]?.["Job Zone"] ?? 0) || null;

  // Some residual O*NET records have a title and description but no rated
  // tasks or fit data. They are not useful enrichment, so leave them off.
  if (!coreTasks.length || !interests.length || !workStyles.length) {
    incomplete.push(career.id);
    continue;
  }

  generated[career.id] = {
    onetSoc: code,
    onetTitle: occupation.Title,
    description: occupation.Description,
    alternateTitles,
    coreTasks,
    interests,
    workStyles,
    software,
    jobZone: zone,
    onetUrl: `https://www.onetonline.org/link/summary/${code}`,
  };
}

const header = `// GENERATED FILE — do not hand edit.\n// Built from ${RELEASE}, downloaded from https://www.onetcenter.org/database.html\n\n`;
const typeBlock = `export interface CareerEnrichment {\n  onetSoc: string;\n  onetTitle: string;\n  description: string;\n  alternateTitles: string[];\n  coreTasks: string[];\n  interests: string[];\n  workStyles: string[];\n  software: string[];\n  jobZone: number | null;\n  onetUrl: string;\n}\n\nexport const ONET_DATA_VINTAGE = ${quote(RELEASE)};\n\n`;
const dataBlock = `export const CAREER_ENRICHMENT: Record<string, CareerEnrichment> = ${JSON.stringify(generated, null, 2)};\n\n`;
const helperBlock = `export function getCareerEnrichment(id: string): CareerEnrichment | undefined {\n  return CAREER_ENRICHMENT[id];\n}\n`;
await fs.writeFile(outputPath, header + typeBlock + dataBlock + helperBlock);

const searchTerms = Object.fromEntries(
  Object.entries(generated).map(([id, profile]) => [
    id,
    [
      profile.onetTitle,
      profile.description,
      ...profile.alternateTitles,
      ...profile.interests,
      ...profile.workStyles,
      ...profile.software,
    ].join(" "),
  ])
);
await fs.writeFile(
  searchOutputPath,
  `${header}export const CAREER_SEARCH_TERMS: Record<string, string> = ${JSON.stringify(searchTerms, null, 2)};\n`
);

const unmatched = careers.filter((career) => !careerCodes.get(career.id));
console.log(`Wrote ${Object.keys(generated).length} profiles to ${outputPath}.`);
console.log(`Wrote the lightweight search index to ${searchOutputPath}.`);
if (unmatched.length) {
  console.log(`No specific O*NET match for ${unmatched.length}: ${unmatched.map((career) => career.id).join(", ")}`);
}
if (incomplete.length) {
  console.log(`Matched but omitted because the profile lacks rated task/fit data: ${incomplete.join(", ")}`);
}
