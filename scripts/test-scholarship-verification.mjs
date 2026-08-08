import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const {
  parseScholarshipVerificationRequest,
  scholarshipVerificationDispatchBody,
  SCHOLARSHIP_VERIFICATION_WORKFLOW,
} = await import("../lib/scholarshipVerification.ts");

const scholarshipId = "candidate-future-makers-12345678";
assert.deepEqual(parseScholarshipVerificationRequest({ scholarshipId: ` ${scholarshipId} ` }), { scholarshipId });
assert.equal(parseScholarshipVerificationRequest({ scholarshipId: "future-makers" }), null);
assert.equal(parseScholarshipVerificationRequest({ scholarshipId: "candidate-future-makers-nothex" }), null);
assert.equal(parseScholarshipVerificationRequest(null), null);
assert.deepEqual(scholarshipVerificationDispatchBody(scholarshipId), {
  ref: "main",
  inputs: { scholarship_id: scholarshipId },
});
assert.equal(SCHOLARSHIP_VERIFICATION_WORKFLOW, "scholarship-candidate-single.yml");

const route = await readFile(new URL("../app/api/admin/scholarship-verification/route.ts", import.meta.url), "utf8");
assert.match(route, /Moderator access required/);
assert.match(route, /publication_status", "withheld"/);
assert.match(route, /monitor_enabled", true/);
assert.match(route, /SCHOLARSHIP_MONITOR_GITHUB_TOKEN/);
assert.match(route, /AbortSignal\.timeout\(10_000\)/);
assert.match(route, /"x-github-api-version": "2026-03-10"/);

const workflow = await readFile(new URL("../.github/workflows/scholarship-candidate-single.yml", import.meta.url), "utf8");
assert.match(workflow, /workflow_dispatch:/);
assert.match(workflow, /--withheld-only/);
assert.match(workflow, /--trigger=manual/);
assert.match(workflow, /--id="\$SCHOLARSHIP_ID"/);
assert.doesNotMatch(workflow, /--id=\$\{\{ inputs\.scholarship_id \}\}/);

const worker = await readFile(new URL("./run-scholarship-monitor.mjs", import.meta.url), "utf8");
assert.match(worker, /configuration\.publicationStatus === "withheld"/);
assert.match(worker, /trigger_kind: triggerKind/);

console.log("Scholarship single-record verification: all assertions passed.");
