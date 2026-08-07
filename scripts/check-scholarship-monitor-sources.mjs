import { readFile } from "node:fs/promises";

const configurations = JSON.parse(
  await readFile(new URL("./scholarship-status-sources.json", import.meta.url), "utf8"),
);
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

for (const configuration of configurations) {
  if (!configuration.id || seenIds.has(configuration.id)) {
    throw new Error(`Duplicate or missing scholarship ID: ${configuration.id ?? "(missing)"}`);
  }
  seenIds.add(configuration.id);
  if (!inventoryIds.has(configuration.id)) throw new Error(`Unknown curated scholarship ID: ${configuration.id}`);

  const sourceUrl = new URL(configuration.sourceUrl);
  if (sourceUrl.protocol !== "https:") throw new Error(`${configuration.id}: official source must use HTTPS.`);
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
    validatePatterns(configuration, "recurringWindow.validationPattern", [configuration.recurringWindow.validationPattern]);
  }
  if (configuration.fixedWindow) {
    for (const field of ["opensOn", "closesOn"]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(configuration.fixedWindow[field] ?? "")) {
        throw new Error(`${configuration.id}: invalid fixed ${field}.`);
      }
    }
    validatePatterns(configuration, "fixedWindow.validationPattern", [configuration.fixedWindow.validationPattern]);
  }
}

const hostCount = new Set(configurations.map((configuration) => new URL(configuration.sourceUrl).hostname)).size;
console.log(`Scholarship monitor sources: ${configurations.length} valid configurations across ${hostCount} official hosts.`);
