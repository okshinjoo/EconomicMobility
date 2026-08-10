import "./register-scholarship-typescript.mjs";

import { readFile, writeFile } from "node:fs/promises";

const { scholarships } = await import("../lib/scholarships.ts");
const { SCHOLARSHIP_TAXONOMY } = await import("../lib/scholarshipTaxonomy.ts");

const dataUrl = new URL("../data/scholarship-promotions.json", import.meta.url);
const write = process.argv.includes("--write");
const encoded = process.argv.find((argument) => argument.startsWith("--packet-base64="))?.slice(16)
  || process.env.SCHOLARSHIP_PROMOTION_PACKET_BASE64;

if (!encoded) throw new Error("A base64url scholarship promotion packet is required.");

let packet;
try {
  packet = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
} catch {
  throw new Error("The scholarship promotion packet is not valid base64url JSON.");
}

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const urlPattern = /^https:\/\//;
const stages = new Set(["high-school", "college", "transfer"]);
const strengths = new Set(["required", "preferred", "relevant"]);
const taxonomy = new Set(SCHOLARSHIP_TAXONOMY.map((node) => node.id));
const record = packet?.catalogRecord;

if (!record || !idPattern.test(record.id ?? "")) throw new Error("The public scholarship ID is invalid.");
if (!packet.sourceCandidateId?.startsWith("candidate-")) throw new Error("The source candidate ID is invalid.");
if (typeof record.name !== "string" || record.name.trim().length < 3) throw new Error("The scholarship name is incomplete.");
if (typeof record.amount !== "string" || record.amount.trim().length < 2) throw new Error("The scholarship amount is incomplete.");
if (typeof record.deadline !== "string" || record.deadline.trim().length < 2) throw new Error("The deadline label is incomplete.");
if (record.deadlineMonth !== null && (!Number.isInteger(record.deadlineMonth) || record.deadlineMonth < 1 || record.deadlineMonth > 12)) throw new Error("The deadline month is invalid.");
if (typeof record.who !== "string" || record.who.trim().length < 20) throw new Error("The applicant description is incomplete.");
if (!Array.isArray(record.stages) || !record.stages.length || record.stages.some((stage) => !stages.has(stage))) throw new Error("The student stages are invalid.");
if (!urlPattern.test(record.officialUrl ?? "")) throw new Error("The official source must use HTTPS.");

const geo = packet.geographyOverlay?.[record.id];
if (!geo || !["national", "states"].includes(geo.scope)) throw new Error("Verified geography is required.");
if (geo.scope === "states" && (!Array.isArray(geo.states) || !geo.states.length)) throw new Error("State-bound geography needs at least one state.");

const eligibility = packet.eligibilityOverlay?.[record.id];
if (!Array.isArray(eligibility)) throw new Error("A verified eligibility classification is required, including an empty GENERAL classification when appropriate.");
for (const assignment of eligibility) {
  if (!taxonomy.has(assignment?.tag) || !strengths.has(assignment?.strength)) {
    throw new Error(`Invalid eligibility classification: ${JSON.stringify(assignment)}`);
  }
}

if (!Array.isArray(packet.provenanceRecords)) throw new Error("Classification provenance is required.");
for (const kind of ["geo", "eligibility"]) {
  const provenance = packet.provenanceRecords.find((entry) => entry?.id === record.id && entry.kind === kind);
  if (!provenance || provenance.confidence !== "verified" || provenance.method !== "manual" || !urlPattern.test(provenance.sourceUrl ?? "") || typeof provenance.evidence !== "string" || provenance.evidence.trim().length < 10) {
    throw new Error(`Verified ${kind} provenance is incomplete.`);
  }
}

const document = JSON.parse(await readFile(dataUrl, "utf8"));
if (document.schemaVersion !== 1 || !Array.isArray(document.records)) throw new Error("The scholarship promotion registry is invalid.");
const existing = document.records.find((entry) => entry.catalogRecord?.id === record.id || entry.sourceCandidateId === packet.sourceCandidateId);
if (existing) {
  if (JSON.stringify(existing) !== JSON.stringify(packet)) throw new Error("This public ID or candidate is already registered with different data.");
  console.log(`${record.id}: promotion registry already contains this exact packet.`);
  process.exit(0);
}

if (scholarships.some((scholarship) => scholarship.id === record.id)) throw new Error("The public scholarship ID is already in use.");
if (scholarships.some((scholarship) => new URL(scholarship.officialUrl).href === new URL(record.officialUrl).href)) throw new Error("The official scholarship source is already published.");

document.records.push(packet);
document.records.sort((a, b) => a.catalogRecord.id.localeCompare(b.catalogRecord.id));
if (write) {
  await writeFile(dataUrl, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  console.log(`${record.id}: added to the automated promotion registry.`);
} else {
  console.log(`${record.id}: packet is valid and ready for the promotion registry.`);
}
