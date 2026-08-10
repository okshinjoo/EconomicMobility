import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const {
  buildScholarshipPromotionPacket,
  canPrepareScholarshipPromotion,
  parseScholarshipPromotionRequest,
} = await import("../lib/scholarshipPromotion.ts");

const request = parseScholarshipPromotionRequest({
  candidateId: "candidate-future-makers-12345678",
  catalogId: "future-makers",
  amount: " $5,000 ",
  deadline: " Typically March ",
  deadlineMonth: 3,
  who: " High school seniors with financial need and community leadership. ",
  stages: ["high-school", "high-school", "invalid"],
  tags: [" First-Gen ", "Leadership", "first-gen"],
  eligibility: [
    { tag: "basis.need", strength: "required" },
    { tag: "basis.community-service", strength: "relevant" },
    { tag: "basis.need", strength: "preferred" },
    { tag: "not.real", strength: "required" },
  ],
  eligibilityReviewed: true,
  curationVerified: true,
  openToUndocumented: true,
});
assert.ok(request);
assert.deepEqual(request.stages, ["high-school"]);
assert.deepEqual(request.tags, ["first-gen", "leadership"]);
assert.deepEqual(request.eligibility, [
  { tag: "basis.need", strength: "preferred" },
  { tag: "basis.community-service", strength: "relevant" },
]);
assert.equal(request.amount, "$5,000");
assert.equal(parseScholarshipPromotionRequest({ ...request, catalogId: "Bad ID" }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, deadlineMonth: 13 }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, stages: [] }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, eligibilityReviewed: false }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, curationVerified: false }), null);

assert.equal(canPrepareScholarshipPromotion({
  geographyVerified: true,
  officialSourceHealthy: true,
  evidenceQueueClear: true,
  statusVerified: true,
  deadlineVerified: true,
}), true);
assert.equal(canPrepareScholarshipPromotion({
  geographyVerified: true,
  officialSourceHealthy: false,
  evidenceQueueClear: true,
  statusVerified: true,
  deadlineVerified: true,
}), false);
assert.equal(canPrepareScholarshipPromotion({
  geographyVerified: true,
  officialSourceHealthy: true,
  evidenceQueueClear: true,
  statusVerified: true,
  deadlineVerified: false,
}), false);

const packet = buildScholarshipPromotionPacket({
  request,
  candidate: {
    name: "Future Makers Scholarship",
    sponsor: "Example Foundation",
    officialUrl: "https://example.org/future-makers",
  },
  geo: { scope: "national" },
  evidence: "Open to students throughout the United States.",
  geographySourceUrl: "https://example.org/future-makers/eligibility",
  preparedAt: "2026-08-07T12:00:00.000Z",
});
assert.equal(packet.catalogRecord.id, "future-makers");
assert.equal(packet.catalogRecord.officialUrl, "https://example.org/future-makers");
assert.deepEqual(packet.geographyOverlay, { "future-makers": { scope: "national" } });
assert.deepEqual(packet.eligibilityOverlay, {
  "future-makers": [
    { tag: "basis.need", strength: "preferred" },
    { tag: "basis.community-service", strength: "relevant" },
  ],
});
assert.equal(packet.provenanceRecords[0].classifiedAt, "2026-08-07");
assert.equal(packet.provenanceRecords[0].method, "manual");
assert.equal(packet.provenanceRecords[0].sourceUrl, "https://example.org/future-makers/eligibility");
assert.equal(packet.provenanceRecords[1].kind, "eligibility");
assert.equal(packet.provenanceRecords[1].sourceUrl, "https://example.org/future-makers");

const encodedPacket = Buffer.from(JSON.stringify(packet), "utf8").toString("base64url");
const publisherOutput = execFileSync(
  process.execPath,
  [fileURLToPath(new URL("./publish-scholarship-promotion.mjs", import.meta.url)), `--packet-base64=${encodedPacket}`],
  { encoding: "utf8" },
);
assert.match(publisherOutput, /future-makers: packet is valid and ready/);

const route = await readFile(new URL("../app/api/admin/scholarship-promotions/route.ts", import.meta.url), "utf8");
assert.match(route, /Moderator access required/);
assert.match(route, /publication_status", "withheld"/);
assert.match(route, /geo_verification_status === "human-verified"/);
assert.match(route, /observation\.source_status === "healthy"/);
assert.match(route, /status", "pending"/);
assert.match(route, /verification_status === "human-verified"/);
assert.match(route, /state\?\.application_status === "rolling" \|\| Boolean\(state\?\.closes_on\)/);
assert.match(route, /geographySourceUrl: row\.geo_source_url \?\? row\.official_url/);
assert.match(route, /scholarship-promotion-publish\.yml/);
assert.match(route, /packet_base64: packetBase64/);

const workflow = await readFile(new URL("../.github/workflows/scholarship-promotion-publish.yml", import.meta.url), "utf8");
assert.match(workflow, /npm run check:scholarship-tags/);
assert.match(workflow, /npm run build/);
assert.match(workflow, /wait-for-scholarship-publication\.mjs/);
assert.match(workflow, /finalize-scholarship-promotion\.mjs --write/);
assert.ok(workflow.indexOf("wait-for-scholarship-publication.mjs") < workflow.indexOf("finalize-scholarship-promotion.mjs --write"));

const finalizeSql = await readFile(new URL("../docs/scholarship-promotion-finalize.sql", import.meta.url), "utf8");
assert.match(finalizeSql, /security definer/i);
assert.match(finalizeSql, /Evidence proposals remain unresolved/);
assert.match(finalizeSql, /latest official source is not verified healthy/i);
assert.match(finalizeSql, /exact official deadline is required/i);
assert.match(finalizeSql, /publication_status = 'duplicate', monitor_enabled = false/);
assert.match(finalizeSql, /grant execute on function public\.finalize_scholarship_promotion.*service_role/i);

console.log("Scholarship promotion gate: all assertions passed.");
