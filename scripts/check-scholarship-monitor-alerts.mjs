import { appendFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { classifyScholarshipMonitorAlerts } from "./scholarship-monitor-alerts-core.mjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error("Scholarship alerts require Supabase URL and service-role credentials.");

const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const [inventoryResult, stateResult] = await Promise.all([
  admin.from("scholarship_monitor_inventory").select("scholarship_id,name,official_url,publication_status,geo_scope,geo_verification_status,geo_evidence,geo_source_url,created_at"),
  admin.from("scholarship_monitor_state").select("scholarship_id,source_status,consecutive_failures,last_checked_at"),
]);
if (inventoryResult.error) throw inventoryResult.error;
if (stateResult.error) throw stateResult.error;

const alerts = classifyScholarshipMonitorAlerts({
  inventory: inventoryResult.data ?? [],
  states: stateResult.data ?? [],
});

function annotation(kind, title, record, detail) {
  const message = `${record.name} (${record.scholarship_id}): ${detail}`.replace(/[\r\n]+/g, " ");
  console.log(`::${kind} title=${title}::${message}`);
}

for (const record of alerts.withheld) {
  annotation(record.ageDays >= 14 ? "error" : "warning", "Withheld scholarship", record, `${record.ageDays} day(s) awaiting verified geography and curation.`);
}
for (const record of alerts.failedSources) {
  annotation("error", "Repeated official-source failure", record, `${record.sourceStatus} for ${record.consecutiveFailures} consecutive checks.`);
}
for (const record of alerts.staleGeography) {
  annotation("error", "Stale scholarship geography", record, "geography evidence requires renewed human verification.");
}
for (const record of alerts.invalidPublished) {
  annotation("error", "Invalid published geography", record, "published row is missing complete human-verified official-source geography.");
}

const summary = [
  "## Scholarship monitoring alerts",
  "",
  `- Withheld: ${alerts.withheld.length} (${alerts.overdueWithheld.length} at least 14 days old)`,
  `- Repeated source failures: ${alerts.failedSources.length}`,
  `- Stale geography: ${alerts.staleGeography.length}`,
  `- Invalid published geography: ${alerts.invalidPublished.length}`,
  "",
  alerts.shouldFail
    ? "Action is required in the private scholarship review workflow."
    : "No overdue or publication-blocking monitoring issues found.",
  "",
].join("\n");
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary, "utf8");
if (alerts.shouldFail) process.exitCode = 1;
