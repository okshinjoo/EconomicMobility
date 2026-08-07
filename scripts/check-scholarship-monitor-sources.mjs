import { readFile } from "node:fs/promises";
import { scholarshipMonitorCoverage } from "./scholarship-monitor-config.mjs";

const coverage = scholarshipMonitorCoverage();
const configurations = coverage.all;
const inventoryDocument = JSON.parse(
  await readFile(new URL("../data/scholarship-monitor-inventory.json", import.meta.url), "utf8"),
);
const inventoryIds = new Set(inventoryDocument.records.map((record) => record.scholarshipId));
const seenIds = new Set();

function validatePatterns(configuration, label, patterns = []) {
  if (!Array.isArray(patterns)) throw new Error(`${configuration.id}: ${label} must be an array.`);
  for (const pattern of patterns) {
    if (typeof pattern !== "string" || !pattern.trim()) {
      throw new Error(`${configuration.id}: ${label} contains an empty pattern.`);
    }
    new RegExp(pattern, "i");
  }
}

function validateWindowEvidence(configuration, label, window, fields) {
  if ("validationPattern" in window) {
    throw new Error(`${configuration.id}: ${label}.validationPattern is obsolete; use field-specific evidencePatterns.`);
  }
  const patterns = window.evidencePatterns;
  if (!patterns || typeof patterns !== "object" || Array.isArray(patterns)) {
    throw new Error(`${configuration.id}: ${label}.evidencePatterns is required.`);
  }
  for (const field of fields) {
    validatePatterns(configuration, `${label}.evidencePatterns.${field}`, [patterns[field]]);
  }
  for (const field of Object.keys(patterns)) {
    if (!fields.includes(field)) throw new Error(`${configuration.id}: unsupported ${label} evidence field ${field}.`);
  }
}

for (const configuration of configurations) {
  if (!configuration.id || seenIds.has(configuration.id)) {
    throw new Error(`Duplicate or missing scholarship ID: ${configuration.id ?? "(missing)"}`);
  }
  seenIds.add(configuration.id);
  if (!inventoryIds.has(configuration.id)) throw new Error(`Unknown curated scholarship ID: ${configuration.id}`);

  const sourceUrl = new URL(configuration.sourceUrl);
  if (sourceUrl.protocol !== "https:") throw new Error(`${configuration.id}: official source must use HTTPS.`);
  if (configuration.monitorMode === "source-health") {
    if (configuration.sourceUrl !== inventoryDocument.records.find((record) => record.scholarshipId === configuration.id)?.officialUrl) {
      throw new Error(`${configuration.id}: source-health monitoring must use the curated official URL.`);
    }
    continue;
  }

  validatePatterns(configuration, "requiredPatterns", configuration.requiredPatterns);
  if (!configuration.requiredPatterns?.length) throw new Error(`${configuration.id}: requiredPatterns cannot be empty.`);

  if (!Array.isArray(configuration.statusRules)) throw new Error(`${configuration.id}: statusRules must be an array.`);
  for (const rule of configuration.statusRules) {
    if (!["open", "upcoming", "closed", "between-cycles", "rolling", "unknown"].includes(rule.status)) {
      throw new Error(`${configuration.id}: unsupported status rule ${rule.status}.`);
    }
    validatePatterns(configuration, "statusRules.pattern", [rule.pattern]);
  }
  for (const [field, patterns] of Object.entries(configuration.dateRules ?? {})) {
    if (!["opensOn", "closesOn", "nextOpensOn"].includes(field)) {
      throw new Error(`${configuration.id}: unsupported date field ${field}.`);
    }
    validatePatterns(configuration, `dateRules.${field}`, patterns);
  }
  if (configuration.recurringWindow) {
    for (const field of ["opensMonthDay", "closesMonthDay"]) {
      if (!/^\d{2}-\d{2}$/.test(configuration.recurringWindow[field] ?? "")) {
        throw new Error(`${configuration.id}: invalid recurring ${field}.`);
      }
    }
    validateWindowEvidence(configuration, "recurringWindow", configuration.recurringWindow, ["opensOn", "closesOn"]);
  }
  if (configuration.fixedWindow) {
    const fixedFields = ["opensOn", "closesOn", "nextOpensOn"].filter(
      (field) => configuration.fixedWindow[field] != null,
    );
    if (!fixedFields.length) throw new Error(`${configuration.id}: fixedWindow must define at least one date.`);
    for (const field of fixedFields) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(configuration.fixedWindow[field])) {
        throw new Error(`${configuration.id}: invalid fixed ${field}.`);
      }
    }
    validateWindowEvidence(configuration, "fixedWindow", configuration.fixedWindow, fixedFields);
  }
}

const hostCount = new Set(configurations.map((configuration) => new URL(configuration.sourceUrl).hostname)).size;
if (configurations.length !== coverage.published) {
  throw new Error(`Expected ${coverage.published} total monitored scholarships; found ${configurations.length}.`);
}
console.log(
  `Scholarship monitor sources: ${configurations.length} covered · ${coverage.status.length} status/date · ${coverage.sourceHealth.length} source-health · ${hostCount} official hosts.`,
);
