import assert from "node:assert/strict";
import { classifyScholarshipMonitorAlerts } from "./scholarship-monitor-alerts-core.mjs";

const inventory = [
  { scholarship_id: "new", name: "New", publication_status: "withheld", created_at: "2026-08-01", geo_verification_status: "unverified" },
  { scholarship_id: "old", name: "Old", publication_status: "withheld", created_at: "2026-07-01", geo_verification_status: "unverified" },
  { scholarship_id: "failed", name: "Failed", publication_status: "published", created_at: "2026-01-01", geo_scope: "national", geo_verification_status: "human-verified", geo_evidence: "Open nationwide.", geo_source_url: "https://example.org/failed" },
  { scholarship_id: "stale", name: "Stale", publication_status: "withheld", created_at: "2026-08-05", geo_scope: "states", geo_verification_status: "stale", geo_evidence: "Residents of Maine.", geo_source_url: "https://example.org/stale" },
  { scholarship_id: "invalid", name: "Invalid", publication_status: "published", created_at: "2026-01-01", geo_scope: null, geo_verification_status: "unverified" },
];
const modeStates = [
  { scholarship_id: "failed", monitor_mode: "source-health", source_status: "not-found", consecutive_failures: 3 },
  { scholarship_id: "new", monitor_mode: "source-health", source_status: "blocked", consecutive_failures: 2 },
  { scholarship_id: "new", monitor_mode: "candidate", source_status: "blocked", consecutive_failures: 9 },
  { scholarship_id: "old", monitor_mode: "source-health", source_status: "blocked", consecutive_failures: 9 },
];
const alerts = classifyScholarshipMonitorAlerts({ inventory, modeStates, now: new Date("2026-08-07T12:00:00Z") });
assert.equal(alerts.withheld.length, 3);
assert.deepEqual(alerts.overdueWithheld.map((record) => record.scholarship_id), ["old"]);
assert.deepEqual(alerts.failedSources.map((record) => record.scholarship_id), ["failed"]);
assert.deepEqual(alerts.staleGeography.map((record) => record.scholarship_id), ["stale"]);
assert.deepEqual(alerts.invalidPublished.map((record) => record.scholarship_id), ["invalid"]);
assert.equal(alerts.shouldFail, true);

console.log("Scholarship monitoring alerts: all assertions passed.");
