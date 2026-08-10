export const SCHOLARSHIP_AUDIT_WORKFLOWS = [
  {
    id: "status",
    name: "Status and deadlines",
    file: "scholarship-monitor.yml",
    url: "https://github.com/okshinjoo/EconomicMobility/actions/workflows/scholarship-monitor.yml",
  },
  {
    id: "candidate",
    name: "Exact evidence",
    file: "scholarship-candidate-monitor.yml",
    url: "https://github.com/okshinjoo/EconomicMobility/actions/workflows/scholarship-candidate-monitor.yml",
  },
  {
    id: "source-health",
    name: "Official-source health",
    file: "scholarship-source-health.yml",
    url: "https://github.com/okshinjoo/EconomicMobility/actions/workflows/scholarship-source-health.yml",
  },
] as const;

export type ScholarshipAuditMode = (typeof SCHOLARSHIP_AUDIT_WORKFLOWS)[number]["id"];

export interface ScholarshipHealthInventoryRow {
  scholarship_id: string;
  name: string;
  publication_status: string;
  monitor_enabled: boolean;
  geo_verification_status: string;
}

export interface ScholarshipHealthStateRow {
  scholarship_id: string;
  application_status: string;
  source_status: string;
  verification_status: string;
  closes_on: string | null;
  last_checked_at: string | null;
  last_verified_at: string | null;
  consecutive_failures: number;
}

export interface ScholarshipHealthRunRow {
  id: string;
  status: string;
  checked_count: number;
  success_count: number;
  failure_count: number;
  proposal_count: number;
  started_at: string;
  finished_at: string | null;
  summary: {
    monitorMode?: string;
    shardIndex?: number;
    shardCount?: number;
  } | null;
}

export interface ScholarshipHealthDeadline {
  scholarshipId: string;
  name: string;
  closesOn: string;
  daysAway: number;
}

export interface ScholarshipHealthAuditLane {
  mode: ScholarshipAuditMode;
  name: string;
  completedAt: string | null;
  checked: number;
  succeeded: number;
  failed: number;
  proposals: number;
  complete: boolean;
}

export interface ScholarshipHealthSummary {
  totalPublished: number;
  monitored: number;
  healthy: number;
  redirected: number;
  temporarilyUnreachable: number;
  repeatedlyFailing: number;
  awaitingFirstCheck: number;
  pendingDecisions: number;
  staleVerifications: Array<{ scholarshipId: string; name: string }>;
  deadlines: {
    within30: ScholarshipHealthDeadline[];
    days31To60: ScholarshipHealthDeadline[];
    days61To90: ScholarshipHealthDeadline[];
  };
  lastCheckedAt: string | null;
  lastSuccessfulFullAuditAt: string | null;
  auditLanes: ScholarshipHealthAuditLane[];
}

const COMPLETE_RUN_STATUSES = new Set(["completed", "completed-with-errors"]);

function isoDayNumber(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

function summarizeAuditLane(
  mode: ScholarshipAuditMode,
  name: string,
  runs: ScholarshipHealthRunRow[],
): ScholarshipHealthAuditLane {
  const matching = runs
    .filter((run) => run.summary?.monitorMode === mode && run.finished_at && COMPLETE_RUN_STATUSES.has(run.status))
    .sort((a, b) => (b.finished_at ?? "").localeCompare(a.finished_at ?? ""));
  const latest = matching[0];
  if (!latest?.finished_at) {
    return { mode, name, completedAt: null, checked: 0, succeeded: 0, failed: 0, proposals: 0, complete: false };
  }

  const expectedShards = Math.max(1, latest.summary?.shardCount ?? 1);
  const latestStartTime = Date.parse(latest.started_at);
  const runByShard = new Map<number, ScholarshipHealthRunRow>();
  for (const run of matching) {
    const startedTime = Date.parse(run.started_at);
    if (
      run.summary?.shardCount !== latest.summary?.shardCount ||
      Math.abs(latestStartTime - startedTime) > 45 * 60 * 1000
    ) continue;
    const shardIndex = run.summary?.shardIndex ?? 0;
    if (!runByShard.has(shardIndex)) runByShard.set(shardIndex, run);
  }
  const batch = [...runByShard.values()];
  const shardIndexes = new Set(batch.map((run) => run.summary?.shardIndex ?? 0));

  return {
    mode,
    name,
    completedAt: latest.finished_at,
    checked: batch.reduce((total, run) => total + run.checked_count, 0),
    succeeded: batch.reduce((total, run) => total + run.success_count, 0),
    failed: batch.reduce((total, run) => total + run.failure_count, 0),
    proposals: batch.reduce((total, run) => total + run.proposal_count, 0),
    complete: shardIndexes.size >= expectedShards,
  };
}

export function buildScholarshipHealthSummary({
  inventory,
  states,
  runs,
  pendingDecisions,
  today,
}: {
  inventory: ScholarshipHealthInventoryRow[];
  states: ScholarshipHealthStateRow[];
  runs: ScholarshipHealthRunRow[];
  pendingDecisions: number;
  today: string;
}): ScholarshipHealthSummary {
  const published = inventory.filter((row) => row.publication_status === "published");
  const stateByScholarship = new Map(states.map((row) => [row.scholarship_id, row]));
  const publishedWithState = published.map((row) => ({ inventory: row, state: stateByScholarship.get(row.scholarship_id) }));

  let healthy = 0;
  let redirected = 0;
  let temporarilyUnreachable = 0;
  let repeatedlyFailing = 0;
  let awaitingFirstCheck = 0;
  let lastCheckedAt: string | null = null;
  const staleVerifications: ScholarshipHealthSummary["staleVerifications"] = [];
  const deadlines: ScholarshipHealthSummary["deadlines"] = { within30: [], days31To60: [], days61To90: [] };
  const todayNumber = isoDayNumber(today);

  for (const { inventory: scholarship, state } of publishedWithState) {
    if (!state?.last_checked_at) awaitingFirstCheck += 1;
    else if (!lastCheckedAt || state.last_checked_at > lastCheckedAt) lastCheckedAt = state.last_checked_at;

    if (state?.source_status === "healthy") healthy += 1;
    else if (state?.source_status === "redirected") redirected += 1;
    else if (state && state.consecutive_failures >= 3) repeatedlyFailing += 1;
    else if (state) temporarilyUnreachable += 1;

    if (state?.verification_status === "stale" || scholarship.geo_verification_status === "stale") {
      staleVerifications.push({ scholarshipId: scholarship.scholarship_id, name: scholarship.name });
    }

    if (
      state?.closes_on &&
      state.last_verified_at &&
      ["machine-verified", "human-verified"].includes(state.verification_status)
    ) {
      const daysAway = isoDayNumber(state.closes_on) - todayNumber;
      if (daysAway < 0 || daysAway > 90) continue;
      const deadline = {
        scholarshipId: scholarship.scholarship_id,
        name: scholarship.name,
        closesOn: state.closes_on,
        daysAway,
      };
      if (daysAway <= 30) deadlines.within30.push(deadline);
      else if (daysAway <= 60) deadlines.days31To60.push(deadline);
      else deadlines.days61To90.push(deadline);
    }
  }

  for (const bucket of Object.values(deadlines)) {
    bucket.sort((a, b) => a.closesOn.localeCompare(b.closesOn) || a.name.localeCompare(b.name));
  }
  staleVerifications.sort((a, b) => a.name.localeCompare(b.name));

  const auditLanes = SCHOLARSHIP_AUDIT_WORKFLOWS.map((workflow) =>
    summarizeAuditLane(workflow.id, workflow.name, runs),
  );
  const completeAuditDates = auditLanes.map((lane) => lane.complete ? lane.completedAt : null);
  const lastSuccessfulFullAuditAt = completeAuditDates.every(Boolean)
    ? completeAuditDates.sort()[0] ?? null
    : null;

  return {
    totalPublished: published.length,
    monitored: published.filter((row) => row.monitor_enabled).length,
    healthy,
    redirected,
    temporarilyUnreachable,
    repeatedlyFailing,
    awaitingFirstCheck,
    pendingDecisions,
    staleVerifications,
    deadlines,
    lastCheckedAt,
    lastSuccessfulFullAuditAt,
    auditLanes,
  };
}

export function scholarshipAuditDispatchBody() {
  return { ref: "main" };
}
