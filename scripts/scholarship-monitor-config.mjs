import { readFile } from "node:fs/promises";

const explicitConfigurations = JSON.parse(
  await readFile(new URL("./scholarship-status-sources.json", import.meta.url), "utf8"),
);
const inventoryDocument = JSON.parse(
  await readFile(new URL("../data/scholarship-monitor-inventory.json", import.meta.url), "utf8"),
);

const explicitIds = new Set(explicitConfigurations.map((configuration) => configuration.id));

export function loadScholarshipMonitorConfigurations({ mode = "status" } = {}) {
  if (mode === "status") {
    return explicitConfigurations.map((configuration) => ({
      ...configuration,
      monitorMode: "status",
    }));
  }
  if (mode === "source-health") {
    return inventoryDocument.records
      .filter((record) => !explicitIds.has(record.scholarshipId))
      .map((record) => ({
        id: record.scholarshipId,
        name: record.name,
        sourceUrl: record.officialUrl,
        monitorMode: "source-health",
      }));
  }
  throw new Error(`Unsupported scholarship monitor mode: ${mode}`);
}

export function scholarshipMonitorCoverage() {
  const status = loadScholarshipMonitorConfigurations({ mode: "status" });
  const sourceHealth = loadScholarshipMonitorConfigurations({ mode: "source-health" });
  return {
    published: inventoryDocument.publishedCount,
    status,
    sourceHealth,
    all: [...status, ...sourceHealth],
  };
}
