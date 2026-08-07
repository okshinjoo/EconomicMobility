import assert from "node:assert/strict";
import {
  buildFieldProposals,
  evaluateOfficialSource,
  operationalStatePatch,
  recurringDates,
} from "./scholarship-monitor-core.mjs";

const source = {
  id: "example",
  sourceUrl: "https://example.org/scholarship",
  requiredPatterns: ["Example Scholarship", "Who can apply"],
  statusRules: [{ status: "open", pattern: "applications are now open" }],
  dateRules: { closesOn: ["Deadline: ([A-Z][a-z]+ \\d{1,2}, \\d{4})"] },
};
const open = evaluateOfficialSource({
  configuration: source,
  html: "<main><h1>Example Scholarship</h1><p>Who can apply</p><p>Applications are now open. Deadline: November 12, 2026</p></main>",
  finalUrl: source.sourceUrl,
  today: "2026-08-07",
});
assert.equal(open.applicationStatus, "open");
assert.equal(open.closesOn, "2026-11-12");
assert.equal(open.extractionConfidence, "high");
assert.equal(open.verificationStatus, "machine-verified");
assert.match(open.evidenceText, /Applications are now open/i);

const drifted = evaluateOfficialSource({
  configuration: source,
  html: "<main><h1>Different Program</h1><p>Applications are now open.</p></main>",
  finalUrl: source.sourceUrl,
  today: "2026-08-07",
});
assert.equal(drifted.applicationStatus, "unknown");
assert.equal(drifted.sourceStatus, "structure-changed");
assert.equal(drifted.verificationStatus, "review-required");

assert.deepEqual(
  recurringDates({ opensMonthDay: "12-01", closesMonthDay: "03-01" }, "2027-01-15"),
  { opensOn: "2026-12-01", closesOn: "2027-03-01" },
);
assert.deepEqual(
  recurringDates({ opensMonthDay: "12-01", closesMonthDay: "03-01" }, "2027-03-02"),
  { opensOn: "2027-12-01", closesOn: "2028-03-01" },
);

const proposals = buildFieldProposals({
  scholarshipId: "example",
  current: { applicationStatus: "unknown", closesOn: null },
  evaluation: open,
  sourceUrl: source.sourceUrl,
});
assert.deepEqual(proposals.map((proposal) => proposal.fieldName), ["applicationStatus", "closesOn"]);

const locked = buildFieldProposals({
  scholarshipId: "example",
  current: { applicationStatus: "unknown" },
  evaluation: open,
  sourceUrl: source.sourceUrl,
  lockedFields: new Set(["applicationStatus"]),
});
assert.equal(locked.find((proposal) => proposal.fieldName === "applicationStatus")?.fieldLocked, true);

const failurePatch = operationalStatePatch({
  result: { success: false, sourceStatus: "server-error" },
  previousFailures: 2,
  checkedAt: "2026-08-07T12:00:00.000Z",
});
assert.deepEqual(failurePatch, {
  last_checked_at: "2026-08-07T12:00:00.000Z",
  source_status: "server-error",
  consecutive_failures: 3,
});
assert.equal("application_status" in failurePatch, false);
assert.equal("closes_on" in failurePatch, false);

console.log("Scholarship observation worker: all assertions passed.");

