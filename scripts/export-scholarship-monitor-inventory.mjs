import "./register-scholarship-typescript.mjs";

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const { scholarships, VERIFIED_AS_OF } = await import("../lib/scholarships.ts");

const outputUrl = new URL("../data/scholarship-monitor-inventory.json", import.meta.url);
const write = process.argv.includes("--write");
const classificationDocument = JSON.parse(
  await readFile(new URL("../data/scholarship-classifications.json", import.meta.url), "utf8"),
);
const candidateDocument = JSON.parse(
  await readFile(new URL("../data/scholarship-monitor-candidates.json", import.meta.url), "utf8"),
);
const verifiedGeoById = new Map(
  classificationDocument.records
    .filter((record) => record.kind === "geo" && record.confidence === "verified")
    .map((record) => [record.id, record]),
);

const publishedRecords = scholarships
  .map((scholarship) => {
    const provenance = verifiedGeoById.get(scholarship.id);
    if (!scholarship.geo || !provenance) {
      throw new Error(`${scholarship.id}: publication requires verified geography and provenance.`);
    }
    const url = new URL(scholarship.officialUrl);
    const stable = {
      scholarshipId: scholarship.id,
      name: scholarship.name,
      officialUrl: url.href,
      sourceDomain: url.hostname.toLowerCase().replace(/^www\./, ""),
      publicationStatus: "published",
      catalogVerifiedLabel: VERIFIED_AS_OF,
      geo: scholarship.geo,
      geoVerificationStatus: "human-verified",
      geoEvidence: provenance.evidence,
      geoSourceUrl: provenance.sourceUrl,
    };
    return {
      ...stable,
      catalogFingerprint: createHash("sha256").update(JSON.stringify(stable)).digest("hex"),
    };
  })
  .sort((a, b) => a.scholarshipId.localeCompare(b.scholarshipId));

const candidateRecords = (candidateDocument.records ?? []).map((candidate) => {
  const url = new URL(candidate.officialUrl);
  if (!candidate.scholarshipId?.trim() || !candidate.name?.trim()) {
    throw new Error("Every withheld monitor candidate needs scholarshipId, name, and officialUrl.");
  }
  const stable = {
    scholarshipId: candidate.scholarshipId,
    name: candidate.name,
    officialUrl: url.href,
    sourceDomain: url.hostname.toLowerCase().replace(/^www\./, ""),
    publicationStatus: "withheld",
    catalogVerifiedLabel: "",
    geo: null,
    geoVerificationStatus: "unverified",
    geoEvidence: "",
    geoSourceUrl: url.href,
  };
  return {
    ...stable,
    catalogFingerprint: createHash("sha256").update(JSON.stringify(stable)).digest("hex"),
  };
});

const records = [...publishedRecords, ...candidateRecords]
  .sort((a, b) => a.scholarshipId.localeCompare(b.scholarshipId));

const ids = new Set(records.map((record) => record.scholarshipId));
if (ids.size !== records.length) throw new Error("Curated scholarship IDs are not unique.");
if (publishedRecords.length !== 1222) {
  throw new Error(`Expected 1,222 current published scholarships; found ${publishedRecords.length}.`);
}

const catalogFingerprint = createHash("sha256")
  .update(JSON.stringify(records))
  .digest("hex");
const document = {
  schemaVersion: 1,
  catalogVerifiedLabel: VERIFIED_AS_OF,
  publishedCount: publishedRecords.length,
  withheldCount: candidateRecords.length,
  catalogFingerprint,
  records,
};
const output = `${JSON.stringify(document, null, 2)}\n`;

if (write) {
  await writeFile(outputUrl, output, "utf8");
    console.log(`Wrote ${publishedRecords.length} published and ${candidateRecords.length} withheld records to ${outputUrl.pathname}.`);
} else {
  const current = await readFile(outputUrl, "utf8").catch(() => "");
  if (current !== output) {
    console.error("Scholarship monitor inventory is stale. Run npm run build:scholarship-monitor-inventory.");
    process.exitCode = 1;
  } else {
    console.log(`Scholarship monitor inventory: ${publishedRecords.length} published · ${candidateRecords.length} withheld · current.`);
  }
}
