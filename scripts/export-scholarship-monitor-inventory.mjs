import "./register-scholarship-typescript.mjs";

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const { scholarships, VERIFIED_AS_OF } = await import("../lib/scholarships.ts");

const outputUrl = new URL("../data/scholarship-monitor-inventory.json", import.meta.url);
const write = process.argv.includes("--write");

const records = scholarships
  .map((scholarship) => {
    const url = new URL(scholarship.officialUrl);
    const stable = {
      scholarshipId: scholarship.id,
      name: scholarship.name,
      officialUrl: url.href,
      sourceDomain: url.hostname.toLowerCase().replace(/^www\./, ""),
      publicationStatus: "published",
      catalogVerifiedLabel: VERIFIED_AS_OF,
    };
    return {
      ...stable,
      catalogFingerprint: createHash("sha256").update(JSON.stringify(stable)).digest("hex"),
    };
  })
  .sort((a, b) => a.scholarshipId.localeCompare(b.scholarshipId));

const ids = new Set(records.map((record) => record.scholarshipId));
if (ids.size !== records.length) throw new Error("Curated scholarship IDs are not unique.");
if (records.length !== 1220) {
  throw new Error(`Expected 1,220 current published scholarships; found ${records.length}.`);
}

const catalogFingerprint = createHash("sha256")
  .update(JSON.stringify(records))
  .digest("hex");
const document = {
  schemaVersion: 1,
  catalogVerifiedLabel: VERIFIED_AS_OF,
  publishedCount: records.length,
  catalogFingerprint,
  records,
};
const output = `${JSON.stringify(document, null, 2)}\n`;

if (write) {
  await writeFile(outputUrl, output, "utf8");
  console.log(`Wrote ${records.length} curated records to ${outputUrl.pathname}.`);
} else {
  const current = await readFile(outputUrl, "utf8").catch(() => "");
  if (current !== output) {
    console.error("Scholarship monitor inventory is stale. Run npm run build:scholarship-monitor-inventory.");
    process.exitCode = 1;
  } else {
    console.log(`Scholarship monitor inventory: ${records.length} records · current.`);
  }
}

