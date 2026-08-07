import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";

const { canAutoApply } = await import("../lib/scholarshipMonitoring.ts");

const base = {
  extractionConfidence: "high",
  verificationStatus: "machine-verified",
  risk: "low",
  sourceStatus: "healthy",
  fieldLocked: false,
};

assert.equal(
  canAutoApply({ ...base, fieldName: "applicationStatus", proposedValue: "open" }),
  true,
);
assert.equal(
  canAutoApply({ ...base, fieldName: "applicationStatus", proposedValue: "unknown" }),
  false,
);
assert.equal(canAutoApply({ ...base, fieldName: "closesOn", proposedValue: "2026-11-12" }), true);
assert.equal(canAutoApply({ ...base, fieldName: "closesOn", proposedValue: "November" }), false);
assert.equal(canAutoApply({ ...base, fieldName: "amount", proposedValue: "$10,000" }), false);
assert.equal(canAutoApply({ ...base, fieldName: "geo", proposedValue: { scope: "national" } }), false);
assert.equal(
  canAutoApply({ ...base, fieldName: "eligibility", proposedValue: [], fieldLocked: true }),
  false,
);
assert.equal(
  canAutoApply({ ...base, fieldName: "applicationStatus", proposedValue: "open", risk: "medium" }),
  false,
);
assert.equal(
  canAutoApply({
    ...base,
    fieldName: "applicationStatus",
    proposedValue: "open",
    sourceStatus: "structure-changed",
  }),
  false,
);
assert.equal(
  canAutoApply({ ...base, fieldName: "sourceStatus", proposedValue: "not-found" }),
  true,
);

console.log("Scholarship monitoring fail-closed policy: all assertions passed.");
