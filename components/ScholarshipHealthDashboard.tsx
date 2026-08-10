"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowClockwise,
  ArrowRight,
  ArrowSquareOut,
  Check,
  CircleNotch as Loader2,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import {
  buildScholarshipHealthSummary,
  type ScholarshipHealthDeadline,
  type ScholarshipHealthInventoryRow,
  type ScholarshipHealthFilter,
  type ScholarshipHealthModeStateRow,
  type ScholarshipHealthRunRow,
  type ScholarshipHealthStateRow,
  type ScholarshipHealthSummary,
} from "@/lib/scholarshipHealth";

interface AuditDispatchResult {
  error?: string;
  started?: number;
  total?: number;
  workflows?: Array<{ id: string; name: string; url: string; started: boolean }>;
}

const HEALTH_FILTERS: Array<{
  id: ScholarshipHealthFilter;
  label: string;
  description: string;
}> = [
  { id: "healthy", label: "Healthy", description: "Official page fetched normally." },
  { id: "redirected", label: "Redirected", description: "Reached a working page at a different URL." },
  { id: "access-limited", label: "Automation limited", description: "Official site blocks or repeatedly times out for automated checks; human verification remains in force." },
  { id: "temporary", label: "Retrying", description: "One or two inconclusive checks; the monitor will retry before classifying it." },
  { id: "repeated", label: "Source needs review", description: "A conclusive source problem repeated three times and needs manual review." },
  { id: "awaiting", label: "Awaiting first check", description: "Published record has no completed health observation yet." },
];

interface QueryPage<T> {
  data: T[] | null;
  error: { message: string } | null;
}

async function loadEveryRow<T>(queryPage: (from: number, to: number) => Promise<QueryPage<T>>) {
  const pageSize = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await queryPage(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if (!data || data.length < pageSize) return rows;
  }
}

function todayISO() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  return ["year", "month", "day"]
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join("-");
}

function dateTimeLabel(value: string | null) {
  if (!value) return "Not completed yet";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function dateLabel(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function deadlineDistance(daysAway: number) {
  if (daysAway === 0) return "Today";
  if (daysAway === 1) return "Tomorrow";
  return `${daysAway} days`;
}

function sourceHealthReason(record: ScholarshipHealthSummary["healthGroups"][ScholarshipHealthFilter][number]) {
  const detail = `${record.errorKind ?? ""} ${record.errorMessage ?? ""}`.toLowerCase();
  if (record.sourceStatus === "blocked") return "Official site denied automated access";
  if (record.sourceStatus === "rate-limited") return "Official site rate-limited the monitor";
  if (detail.includes("timeout") || detail.includes("timed out")) return "Automated request timed out";
  if (detail.includes("protocol")) return "Automated connection protocol failed";
  if (detail.includes("reset")) return "Official site reset the automated connection";
  if (record.sourceStatus === "not-found") return "Official source returned not found";
  if (record.sourceStatus === "server-error") return "Official source returned a server error";
  if (record.sourceStatus === "structure-changed") return "Official page no longer exposes the expected content";
  return record.sourceStatus.replaceAll("-", " ");
}

function DeadlineBucket({ label, rows }: { label: string; rows: ScholarshipHealthDeadline[] }) {
  return (
    <section className="border-t border-sand pt-4 first:border-t-0 first:pt-0" aria-label={label}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-bold text-ink">{label}</h3>
        <span className="text-sm font-semibold tabular-nums text-stone">{rows.length}</span>
      </div>
      {rows.length ? (
        <ol className="mt-3 space-y-2.5">
          {rows.slice(0, 6).map((row) => (
            <li key={row.scholarshipId} className="flex items-start justify-between gap-4 text-sm">
              <span className="font-medium leading-5 text-ink">{row.name}</span>
              <span className="shrink-0 text-right text-stone">
                {dateLabel(row.closesOn)}
                <span className="block text-xs">{deadlineDistance(row.daysAway)}</span>
              </span>
            </li>
          ))}
          {rows.length > 6 ? <li className="text-sm font-semibold text-stone">+ {rows.length - 6} more</li> : null}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-stone">No evidence-verified deadlines in this window.</p>
      )}
    </section>
  );
}

export default function ScholarshipHealthDashboard() {
  const [supabase] = useState<SupabaseClient | null>(() => (accountsEnabled ? getSupabase() : null));
  const [session, setSession] = useState<Session | null>(null);
  const [isModerator, setIsModerator] = useState<boolean | null>(() => (accountsEnabled ? null : false));
  const [summary, setSummary] = useState<ScholarshipHealthSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [activeHealthFilter, setActiveHealthFilter] = useState<ScholarshipHealthFilter>("repeated");
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string; workflows?: AuditDispatchResult["workflows"] } | null>(null);

  const loadDashboard = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setMessage(null);
    try {
      const [inventory, states, modeStates, runs, proposalResult] = await Promise.all([
        loadEveryRow<ScholarshipHealthInventoryRow>(async (from, to) => {
          const result = await supabase
            .from("scholarship_monitor_inventory")
            .select("scholarship_id,name,official_url,publication_status,monitor_enabled,geo_verification_status")
            .order("scholarship_id")
            .range(from, to);
          return result as QueryPage<ScholarshipHealthInventoryRow>;
        }),
        loadEveryRow<ScholarshipHealthStateRow>(async (from, to) => {
          const result = await supabase
            .from("scholarship_monitor_state")
            .select("scholarship_id,application_status,source_status,verification_status,closes_on,last_checked_at,last_verified_at,consecutive_failures")
            .order("scholarship_id")
            .range(from, to);
          return result as QueryPage<ScholarshipHealthStateRow>;
        }),
        loadEveryRow<ScholarshipHealthModeStateRow>(async (from, to) => {
          const result = await supabase
            .from("scholarship_monitor_mode_state")
            .select("scholarship_id,monitor_mode,source_status,consecutive_failures,last_checked_at,last_error_kind,last_error_message")
            .order("scholarship_id")
            .range(from, to);
          return result as QueryPage<ScholarshipHealthModeStateRow>;
        }),
        loadEveryRow<ScholarshipHealthRunRow>(async (from, to) => {
          if (from >= 300) return { data: [], error: null };
          const result = await supabase
            .from("scholarship_monitor_runs")
            .select("id,status,checked_count,success_count,failure_count,proposal_count,started_at,finished_at,summary")
            .order("started_at", { ascending: false })
            .range(from, Math.min(to, 299));
          return result as QueryPage<ScholarshipHealthRunRow>;
        }),
        supabase
          .from("scholarship_monitor_proposals")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);
      if (proposalResult.error) throw proposalResult.error;
      const nextSummary = buildScholarshipHealthSummary({
        inventory,
        states,
        modeStates,
        runs,
        pendingDecisions: proposalResult.count ?? 0,
        today: todayISO(),
      });
      setSummary(nextSummary);
      setActiveHealthFilter(nextSummary.repeatedlyFailing ? "repeated" : nextSummary.automationLimited ? "access-limited" : "temporary");
      setRefreshedAt(new Date().toISOString());
    } catch (error) {
      setSummary(null);
      setMessage({
        kind: "error",
        text: error instanceof Error ? `The dashboard could not be loaded: ${error.message}` : "The dashboard could not be loaded.",
      });
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    async function initialize() {
      const { data } = await client.auth.getSession();
      if (!active) return;
      setSession(data.session);
      if (!data.session) {
        setIsModerator(false);
        return;
      }
      const { data: moderator } = await client
        .from("moderators")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (!active) return;
      setIsModerator(Boolean(moderator));
      if (moderator) await loadDashboard();
    }
    void initialize();
    return () => {
      active = false;
    };
  }, [loadDashboard, supabase]);

  async function runFullAudit() {
    if (!session) return;
    setRunning(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/scholarship-health/run", {
        method: "POST",
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      const result = (await response.json()) as AuditDispatchResult;
      if (!response.ok) throw new Error(result.error || "The full audit could not be started.");
      setMessage({
        kind: result.started === result.total ? "success" : "error",
        text: result.started === result.total
          ? "Full audit started. All three checks are running; refresh this dashboard after they finish."
          : `${result.started ?? 0} of ${result.total ?? 3} checks started. Open the run details below before trying again.`,
        workflows: result.workflows,
      });
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "The full audit could not be started." });
    } finally {
      setRunning(false);
    }
  }

  if (isModerator === null) {
    return <p className="flex items-center gap-2 text-base text-stone"><Loader2 className="h-5 w-5 animate-spin" /> Checking moderator access…</p>;
  }

  if (!isModerator) {
    return (
      <div className="rounded-xl border border-sand bg-cream p-6">
        <p className="font-display text-xl font-semibold text-ink">Moderator access required</p>
        <p className="mt-2 text-base leading-7 text-stone">
          {session ? "This account is not on the moderator list." : "Sign in with a moderator account to view scholarship health."}{" "}
          <Link href="/account" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">Go to your account</Link>
        </p>
      </div>
    );
  }

  if (!summary && loading) {
    return <p className="flex items-center gap-2 text-base text-stone"><Loader2 className="h-5 w-5 animate-spin" /> Loading production monitoring data…</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-sand pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone">
            {refreshedAt ? `Dashboard refreshed ${dateTimeLabel(refreshedAt)}` : "Production monitoring data"}
          </p>
          <p className="mt-1 text-sm leading-6 text-stone">Three repeated, conclusive source failures enter review. Sites that block automation stay in a separate human-verified list.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadDashboard()}
            disabled={loading || running}
            className="inline-flex items-center gap-1.5 rounded-md border border-sand bg-cream px-4 py-2.5 text-sm font-bold text-ink hover:border-ink disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowClockwise className="h-4 w-4" />}
            Refresh dashboard
          </button>
          <button
            type="button"
            onClick={() => void runFullAudit()}
            disabled={running || loading}
            className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50"
          >
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowClockwise className="h-4 w-4" />}
            {running ? "Starting full audit…" : "Run full audit"}
          </button>
        </div>
      </div>

      {message ? (
        <div className={`mt-5 border-l-4 px-4 py-3 ${message.kind === "success" ? "border-forest bg-forest/5" : "border-terracotta bg-terracotta/5"}`} role={message.kind === "error" ? "alert" : "status"}>
          <p className={`flex items-start gap-2 text-sm font-semibold ${message.kind === "success" ? "text-forest" : "text-terracotta"}`}>
            {message.kind === "success" ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <Warning className="mt-0.5 h-4 w-4 shrink-0" />}
            {message.text}
          </p>
          {message.workflows ? (
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 pl-6 text-sm">
              {message.workflows.map((workflow) => (
                <a key={workflow.id} href={workflow.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                  {workflow.name}: {workflow.started ? "started" : "needs attention"} <ArrowSquareOut className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {summary ? (
        <>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-b border-sand py-7 md:grid-cols-4">
            <div><dt className="text-sm text-stone">Published awards</dt><dd className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">{summary.totalPublished.toLocaleString()}</dd></div>
            <div><dt className="text-sm text-stone">Actively monitored</dt><dd className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">{summary.monitored.toLocaleString()}</dd></div>
            <div><dt className="text-sm text-stone">Pending evidence decisions</dt><dd className={`mt-1 font-display text-3xl font-bold tabular-nums ${summary.pendingDecisions ? "text-terracotta" : "text-forest"}`}>{summary.pendingDecisions.toLocaleString()}</dd></div>
            <div><dt className="text-sm text-stone">Last successful full audit</dt><dd className="mt-2 text-sm font-bold leading-5 text-ink">{dateTimeLabel(summary.lastSuccessfulFullAuditAt)}</dd></div>
          </dl>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
            <section className="rounded-xl border border-sand bg-cream p-5 sm:p-6" aria-labelledby="source-health-heading">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-sand pb-4">
                <div>
                  <h2 id="source-health-heading" className="font-display text-2xl font-bold text-ink">Official-source health</h2>
                  <p className="mt-1 text-sm text-stone">Latest result for every published scholarship.</p>
                </div>
                <p className="text-sm font-semibold text-stone">Last check {dateTimeLabel(summary.lastCheckedAt)}</p>
              </div>
              <div className="mt-2 divide-y divide-sand">
                {HEALTH_FILTERS.map((filter) => {
                  const count = summary.healthGroups[filter.id].length;
                  const active = filter.id === activeHealthFilter;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveHealthFilter(filter.id)}
                      aria-expanded={active}
                      className={`grid w-full grid-cols-[1fr_auto] gap-4 border-l-4 py-4 pl-3 text-left transition-colors ${active ? "border-amber bg-paper" : "border-transparent hover:bg-paper/70"}`}
                    >
                      <span><span className="block font-bold text-ink">{filter.label}</span><span className="mt-1 block text-sm text-stone">{filter.description}</span></span>
                      <span className={`font-display text-2xl font-bold tabular-nums ${filter.id === "repeated" && count ? "text-terracotta" : filter.id === "healthy" ? "text-forest" : "text-ink"}`}>{count.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 border-t border-sand pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-bold text-ink">{HEALTH_FILTERS.find((filter) => filter.id === activeHealthFilter)?.label}</h3>
                  <span className="text-sm font-semibold text-stone">{summary.healthGroups[activeHealthFilter].length.toLocaleString()} awards</span>
                </div>
                {summary.healthGroups[activeHealthFilter].length ? (
                  <ol className="mt-3 max-h-80 divide-y divide-sand overflow-y-auto border-y border-sand">
                    {summary.healthGroups[activeHealthFilter].map((record) => (
                      <li key={record.scholarshipId} className="flex items-start justify-between gap-4 py-3 text-sm">
                        <div>
                          <p className="font-bold leading-5 text-ink">{record.name}</p>
                          <p className="mt-1 text-xs text-stone">
                            {sourceHealthReason(record)}
                            {record.consecutiveFailures ? ` · ${record.consecutiveFailures} same-type failures` : ""}
                            {record.lastCheckedAt ? ` · ${dateTimeLabel(record.lastCheckedAt)}` : ""}
                          </p>
                        </div>
                        <a href={record.officialUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                          Official source <ArrowSquareOut className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ol>
                ) : <p className="mt-3 text-sm font-semibold text-forest">No scholarships in this group.</p>}
              </div>
              <Link href="/admin/scholarships" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Open evidence review queue <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            <section className="rounded-xl border border-sand bg-cream p-5 sm:p-6" aria-labelledby="deadlines-heading">
              <div className="border-b border-sand pb-4">
                <h2 id="deadlines-heading" className="font-display text-2xl font-bold text-ink">Verified deadlines ahead</h2>
                <p className="mt-1 text-sm leading-6 text-stone">Only exact dates supported by official-source evidence appear here.</p>
              </div>
              <div className="mt-5 space-y-5">
                <DeadlineBucket label="Within 30 days" rows={summary.deadlines.within30} />
                <DeadlineBucket label="31–60 days" rows={summary.deadlines.days31To60} />
                <DeadlineBucket label="61–90 days" rows={summary.deadlines.days61To90} />
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-xl border border-sand bg-cream p-5 sm:p-6" aria-labelledby="coverage-heading">
            <div className="flex flex-col gap-2 border-b border-sand pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="coverage-heading" className="font-display text-2xl font-bold text-ink">Latest audit coverage</h2>
                <p className="mt-1 text-sm text-stone">A full audit is complete only when all shards finish for all three checks.</p>
              </div>
              <a href="https://github.com/okshinjoo/EconomicMobility/actions" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                View run details <ArrowSquareOut className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead><tr className="border-b border-sand text-stone"><th className="py-3 pr-4 font-semibold">Check</th><th className="px-4 py-3 font-semibold">Completed</th><th className="px-4 py-3 text-right font-semibold">Checked</th><th className="px-4 py-3 text-right font-semibold">Succeeded</th><th className="px-4 py-3 text-right font-semibold">Failed</th><th className="pl-4 py-3 text-right font-semibold">Coverage</th></tr></thead>
                <tbody>
                  {summary.auditLanes.map((lane) => (
                    <tr key={lane.mode} className="border-b border-sand last:border-b-0">
                      <th scope="row" className="py-4 pr-4 font-bold text-ink">{lane.name}</th>
                      <td className="px-4 py-4 text-stone">{dateTimeLabel(lane.completedAt)}</td>
                      <td className="px-4 py-4 text-right tabular-nums text-ink">{lane.checked.toLocaleString()}</td>
                      <td className="px-4 py-4 text-right tabular-nums text-ink">{lane.succeeded.toLocaleString()}</td>
                      <td className={`px-4 py-4 text-right font-semibold tabular-nums ${lane.failed ? "text-terracotta" : "text-forest"}`}>{lane.failed.toLocaleString()}</td>
                      <td className={`pl-4 py-4 text-right font-bold ${lane.complete ? "text-forest" : "text-terracotta"}`}>{lane.complete ? "Complete" : "Partial"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 border-t border-sand pt-6" aria-labelledby="stale-heading">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 id="stale-heading" className="font-display text-xl font-bold text-ink">Stale human verifications</h2>
                <p className="mt-1 text-sm text-stone">Status or geography records explicitly marked stale.</p>
              </div>
              <span className={`font-display text-2xl font-bold tabular-nums ${summary.staleVerifications.length ? "text-terracotta" : "text-forest"}`}>{summary.staleVerifications.length.toLocaleString()}</span>
            </div>
            {summary.staleVerifications.length ? (
              <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-ink sm:grid-cols-2">
                {summary.staleVerifications.slice(0, 12).map((row) => <li key={row.scholarshipId}>{row.name}</li>)}
              </ul>
            ) : <p className="mt-3 text-sm font-semibold text-forest">No records are marked stale.</p>}
          </section>
        </>
      ) : null}
    </div>
  );
}
