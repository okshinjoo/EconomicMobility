import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";

const { parseScholarshipIntakeRequest, scholarshipCandidateFingerprint, scholarshipCandidateId } = await import(
  "../lib/scholarshipIntake.ts"
);

const parsed = parseScholarshipIntakeRequest({
  name: "  Future   Makers Scholarship ",
  sponsor: " Example Foundation ",
  officialUrl: "https://example.org/scholarship#apply",
});
assert.deepEqual(parsed, {
  name: "Future Makers Scholarship",
  sponsor: "Example Foundation",
  officialUrl: "https://example.org/scholarship",
});
assert.match(scholarshipCandidateId(parsed), /^candidate-future-makers-scholarship-[0-9a-f]{8}$/);
assert.equal(scholarshipCandidateFingerprint(parsed).length, 64);
assert.equal(scholarshipCandidateId(parsed), scholarshipCandidateId(parsed));
assert.equal(parseScholarshipIntakeRequest({ name: "Award", officialUrl: "not a url" }), null);
assert.equal(parseScholarshipIntakeRequest({ name: "Award", officialUrl: "javascript:alert(1)" }), null);
assert.equal(parseScholarshipIntakeRequest({ name: "A", officialUrl: "https://example.org" }), null);

console.log("Scholarship private intake: all assertions passed.");
