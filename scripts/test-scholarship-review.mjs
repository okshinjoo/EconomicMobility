import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { parseScholarshipReviewRequest, SCHOLARSHIP_REVIEW_ACTIONS } = await import(
  "../lib/scholarshipReview.ts"
);
const { isVerifiedClosed, verifiedStatusLabel } = await import("../lib/scholarshipStatus.ts");

const proposalId = "0f6f1492-d2c0-4a8c-96e1-4de58e5bfd80";

for (const action of SCHOLARSHIP_REVIEW_ACTIONS) {
  const parsed = parseScholarshipReviewRequest({
    proposalId,
    action,
    editedValue: action === "edit" ? "2026-11-15" : null,
    note: "  Checked against the official page.  ",
    lockField: true,
  });
  assert.equal(parsed?.action, action);
  assert.equal(parsed?.note, "Checked against the official page.");
  assert.equal(parsed?.lockField, true);
}

assert.equal(parseScholarshipReviewRequest(null), null);
assert.equal(parseScholarshipReviewRequest({ proposalId: "not-a-uuid", action: "accept" }), null);
assert.equal(parseScholarshipReviewRequest({ proposalId, action: "publish" }), null);
assert.equal(parseScholarshipReviewRequest({ proposalId, action: "edit", editedValue: "" }), null);
assert.equal(
  parseScholarshipReviewRequest({ proposalId, action: "accept", note: "x".repeat(1200) })?.note.length,
  1000,
);

const reviewSql = await readFile(
  new URL("../docs/scholarship-monitor-review.sql", import.meta.url),
  "utf8",
);
assert.match(reviewSql, /security definer/i);
assert.match(reviewSql, /for update/i);
assert.match(reviewSql, /proposal\.status <> 'pending'/i);
assert.match(reviewSql, /from public\.moderators where user_id = p_actor_user_id/i);
assert.match(reviewSql, /revoke all .* from authenticated/i);
assert.match(reviewSql, /grant execute .* to service_role/i);
assert.doesNotMatch(reviewSql, /update\s+public\.scholarship_monitor_inventory/i);

const statusBase = {
  id: "example",
  opensOn: null,
  closesOn: null,
  nextOpensOn: null,
  verifiedAt: "2026-08-07T12:00:00.000Z",
};
assert.equal(isVerifiedClosed({ ...statusBase, applicationStatus: "open" }), false);
assert.equal(isVerifiedClosed({ ...statusBase, applicationStatus: "closed" }), true);
assert.equal(
  verifiedStatusLabel({ ...statusBase, applicationStatus: "open", closesOn: "2026-11-15" }),
  "Open now · closes November 15, 2026",
);
assert.equal(
  verifiedStatusLabel({ ...statusBase, applicationStatus: "between-cycles", nextOpensOn: "2027-02-01" }),
  "Between cycles · next opens February 1, 2027",
);

const publicRoute = await readFile(
  new URL("../app/api/scholarship-status/route.ts", import.meta.url),
  "utf8",
);
assert.match(publicRoute, /verification_status", "human-verified"/);
assert.match(publicRoute, /curatedIds\.has\(row\.scholarship_id\)/);
assert.match(publicRoute, /\{ statuses: \[\] \}/);

console.log("Scholarship moderator review: all assertions passed.");
