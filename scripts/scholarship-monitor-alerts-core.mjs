const FAILED_SOURCE_STATUSES = new Set(["blocked", "not-found", "server-error", "structure-changed"]);

function ageInDays(value, now) {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? Math.floor((now.getTime() - timestamp) / 86_400_000) : 0;
}

export function classifyScholarshipMonitorAlerts({ inventory, modeStates, now = new Date(), withheldAgeDays = 14, failureThreshold = 3 }) {
  const stateById = new Map();
  for (const state of modeStates) {
    if (!["source-health", "status"].includes(state.monitor_mode)) continue;
    const current = stateById.get(state.scholarship_id);
    if (!current || state.monitor_mode === "source-health") stateById.set(state.scholarship_id, state);
  }
  const withheld = inventory
    .filter((record) => record.publication_status === "withheld")
    .map((record) => ({ ...record, ageDays: ageInDays(record.created_at, now) }));
  const overdueWithheld = withheld.filter((record) => record.ageDays >= withheldAgeDays);
  const failedSources = inventory.flatMap((record) => {
    const state = stateById.get(record.scholarship_id);
    return state && FAILED_SOURCE_STATUSES.has(state.source_status) && state.consecutive_failures >= failureThreshold
      ? [{ ...record, sourceStatus: state.source_status, consecutiveFailures: state.consecutive_failures }]
      : [];
  });
  const staleGeography = inventory.filter((record) => record.geo_verification_status === "stale");
  const invalidPublished = inventory.filter((record) => record.publication_status === "published" && (
    !record.geo_scope ||
    record.geo_verification_status !== "human-verified" ||
    !String(record.geo_evidence ?? "").trim() ||
    !record.geo_source_url
  ));

  return {
    withheld,
    overdueWithheld,
    failedSources,
    staleGeography,
    invalidPublished,
    shouldFail: overdueWithheld.length > 0 || failedSources.length > 0 || staleGeography.length > 0 || invalidPublished.length > 0,
  };
}
