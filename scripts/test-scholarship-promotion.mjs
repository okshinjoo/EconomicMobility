import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

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
  openToUndocumented: true,
});
assert.ok(request);
assert.deepEqual(request.stages, ["high-school"]);
assert.deepEqual(request.tags, ["first-gen", "leadership"]);
assert.equal(request.amount, "$5,000");
assert.equal(parseScholarshipPromotionRequest({ ...request, catalogId: "Bad ID" }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, deadlineMonth: 13 }), null);
assert.equal(parseScholarshipPromotionRequest({ ...request, stages: [] }), null);

assert.equal(canPrepareScholarshipPromotion({
  geographyVerified: true,
  officialSourceHealthy: true,
  evidenceQueueClear: true,
}), true);
assert.equal(canPrepareScholarshipPromotion({
  geographyVerified: true,
  officialSourceHealthy: false,
  evidenceQueueClear: true,
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
  preparedAt: "2026-08-07T12:00:00.000Z",
});
assert.equal(packet.catalogRecord.id, "future-makers");
assert.equal(packet.catalogRecord.officialUrl, "https://example.org/future-makers");
assert.deepEqual(packet.geographyOverlay, { "future-makers": { scope: "national" } });
assert.equal(packet.provenanceRecord.classifiedAt, "2026-08-07");
assert.equal(packet.provenanceRecord.method, "manual");

const route = await readFile(new URL("../app/api/admin/scholarship-promotions/route.ts", import.meta.url), "utf8");
assert.match(route, /Moderator access required/);
assert.match(route, /publication_status", "withheld"/);
assert.match(route, /geo_verification_status === "human-verified"/);
assert.match(route, /observation\.source_status === "healthy"/);
assert.match(route, /status", "pending"/);
assert.doesNotMatch(route, /publication_status:\s*"published"/);

console.log("Scholarship promotion gate: all assertions passed.");
