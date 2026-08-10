import "./register-scholarship-typescript.mjs";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const {
  buildScholarshipHealthSummary,
  scholarshipAuditDispatchBody,
  SCHOLARSHIP_AUDIT_WORKFLOWS,
} = await import("../lib/scholarshipHealth.ts");

const inventory = [
  { scholarship_id: "healthy", name: "Healthy Award", publication_status: "published", monitor_enabled: true, geo_verification_status: "human-verified" },
  { scholarship_id: "redirected", name: "Redirected Award", publication_status: "published", monitor_enabled: true, geo_verification_status: "human-verified" },
  { scholarship_id: "temporary", name: "Temporary Award", publication_status: "published", monitor_enabled: true, geo_verification_status: "stale" },
  { scholarship_id: "repeated", name: "Repeated Award", publication_status: "published", monitor_enabled: true, geo_verification_status: "human-verified" },
  { scholarship_id: "waiting", name: "Waiting Award", publication_status: "published", monitor_enabled: false, geo_verification_status: "human-verified" },
  { scholarship_id: "staged", name: "Staged Award", publication_status: "withheld", monitor_enabled: true, geo_verification_status: "unverified" },
].map((row) => ({ ...row, official_url: `https://example.org/${row.scholarship_id}` }));

const states = [
  { scholarship_id: "healthy", application_status: "open", source_status: "healthy", verification_status: "machine-verified", closes_on: "2026-08-20", last_checked_at: "2026-08-10T15:00:00Z", last_verified_at: "2026-08-10T15:00:00Z", consecutive_failures: 0 },
  { scholarship_id: "redirected", application_status: "open", source_status: "redirected", verification_status: "human-verified", closes_on: "2026-09-19", last_checked_at: "2026-08-10T14:00:00Z", last_verified_at: "2026-08-10T14:00:00Z", consecutive_failures: 0 },
  { scholarship_id: "temporary", application_status: "unknown", source_status: "blocked", verification_status: "stale", closes_on: "2026-10-19", last_checked_at: "2026-08-10T13:00:00Z", last_verified_at: null, consecutive_failures: 2 },
  { scholarship_id: "repeated", application_status: "unknown", source_status: "server-error", verification_status: "review-required", closes_on: null, last_checked_at: "2026-08-10T12:00:00Z", last_verified_at: null, consecutive_failures: 3 },
];

const modeStates = [
  { scholarship_id: "healthy", monitor_mode: "source-health", source_status: "healthy", consecutive_failures: 0, last_checked_at: "2026-08-10T15:00:00Z" },
  { scholarship_id: "redirected", monitor_mode: "source-health", source_status: "redirected", consecutive_failures: 2, last_checked_at: "2026-08-10T14:00:00Z" },
  { scholarship_id: "temporary", monitor_mode: "source-health", source_status: "blocked", consecutive_failures: 2, last_checked_at: "2026-08-10T13:00:00Z" },
  { scholarship_id: "repeated", monitor_mode: "source-health", source_status: "server-error", consecutive_failures: 3, last_checked_at: "2026-08-10T12:00:00Z" },
  { scholarship_id: "repeated", monitor_mode: "candidate", source_status: "healthy", consecutive_failures: 0, last_checked_at: "2026-08-10T16:00:00Z" },
];

const runs = [
  { id: "status", status: "completed", checked_count: 75, success_count: 75, failure_count: 0, proposal_count: 0, started_at: "2026-08-10T10:00:00Z", finished_at: "2026-08-10T10:30:00Z", summary: { monitorMode: "status", shardIndex: 0, shardCount: 1 } },
  { id: "candidate-previous", status: "completed", checked_count: 99, success_count: 99, failure_count: 0, proposal_count: 0, started_at: "2026-08-10T09:30:00Z", finished_at: "2026-08-10T10:10:00Z", summary: { monitorMode: "candidate", shardIndex: 0, shardCount: 2 } },
  { id: "candidate-0", status: "completed", checked_count: 2, success_count: 2, failure_count: 0, proposal_count: 0, started_at: "2026-08-10T11:00:00Z", finished_at: "2026-08-10T11:30:00Z", summary: { monitorMode: "candidate", shardIndex: 0, shardCount: 2 } },
  { id: "candidate-1", status: "completed-with-errors", checked_count: 2, success_count: 1, failure_count: 1, proposal_count: 1, started_at: "2026-08-10T11:00:00Z", finished_at: "2026-08-10T11:31:00Z", summary: { monitorMode: "candidate", shardIndex: 1, shardCount: 2 } },
  { id: "source-0", status: "completed", checked_count: 2, success_count: 2, failure_count: 0, proposal_count: 0, started_at: "2026-08-10T12:00:00Z", finished_at: "2026-08-10T12:30:00Z", summary: { monitorMode: "source-health", shardIndex: 0, shardCount: 2 } },
  { id: "source-1", status: "completed", checked_count: 2, success_count: 2, failure_count: 0, proposal_count: 0, started_at: "2026-08-10T12:00:00Z", finished_at: "2026-08-10T12:31:00Z", summary: { monitorMode: "source-health", shardIndex: 1, shardCount: 2 } },
];

const summary = buildScholarshipHealthSummary({ inventory, states, modeStates, runs, pendingDecisions: 3, today: "2026-08-10" });
assert.equal(summary.totalPublished, 5);
assert.equal(summary.monitored, 4);
assert.equal(summary.healthy, 1);
assert.equal(summary.redirected, 1);
assert.equal(summary.temporarilyUnreachable, 1);
assert.equal(summary.repeatedlyFailing, 1);
assert.equal(summary.awaitingFirstCheck, 1);
assert.equal(summary.healthGroups.repeated[0].scholarshipId, "repeated");
assert.equal(summary.healthGroups.repeated[0].monitorMode, "source-health");
assert.equal(summary.pendingDecisions, 3);
assert.deepEqual(summary.staleVerifications, [{ scholarshipId: "temporary", name: "Temporary Award" }]);
assert.equal(summary.deadlines.within30[0].scholarshipId, "healthy");
assert.equal(summary.deadlines.days31To60[0].scholarshipId, "redirected");
assert.equal(summary.deadlines.days61To90.length, 0, "stale deadlines must not be presented as verified");
assert.equal(summary.lastCheckedAt, "2026-08-10T15:00:00Z");
assert.equal(summary.lastSuccessfulFullAuditAt, "2026-08-10T10:30:00Z");
assert.equal(summary.auditLanes.find((lane) => lane.mode === "candidate").checked, 4);
assert.equal(summary.auditLanes.find((lane) => lane.mode === "candidate").complete, true);

assert.equal(SCHOLARSHIP_AUDIT_WORKFLOWS.length, 3);
assert.deepEqual(scholarshipAuditDispatchBody(), { ref: "main" });

const route = await readFile(new URL("../app/api/admin/scholarship-health/run/route.ts", import.meta.url), "utf8");
assert.match(route, /Moderator access required/);
assert.match(route, /SCHOLARSHIP_MONITOR_GITHUB_TOKEN/);
assert.match(route, /Promise\.all\(SCHOLARSHIP_AUDIT_WORKFLOWS/);
assert.match(route, /AbortSignal\.timeout\(10_000\)/);

const dashboard = await readFile(new URL("../components/ScholarshipHealthDashboard.tsx", import.meta.url), "utf8");
assert.match(dashboard, /Run full audit/);
assert.match(dashboard, /Open evidence review queue/);
assert.match(dashboard, /Only exact dates supported by official-source evidence/);

console.log("Scholarship health dashboard: all assertions passed.");
