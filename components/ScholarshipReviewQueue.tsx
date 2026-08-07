"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowSquareOut,
  Check,
  CircleNotch as Loader2,
  Lock,
  MagnifyingGlass,
  Warning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import type { ScholarshipReviewAction } from "@/lib/scholarshipReview";
import { STATE_NAMES } from "@/lib/scholarshipMatch";

interface ProposalRow {
  id: string;
  scholarship_id: string;
  field_name: string;
  current_value: unknown;
  proposed_value: unknown;
  source_url: string;
  evidence_text: string;
  extraction_confidence: "high" | "medium" | "low";
  risk: "low" | "medium" | "high";
  verification_status: string;
  detected_at: string;
}

interface InventoryRow {
  scholarship_id: string;
  name: string;
  official_url: string;
}

interface FieldLockRow {
  scholarship_id: string;
  field_name: string;
}

type QueueFilter = "all" | "status" | "dates" | "geography" | "source";

const FIELD_LABELS: Record<string, string> = {
  applicationStatus: "Application status",
  opensOn: "Opening date",
  closesOn: "Deadline",
  nextOpensOn: "Next opening date",
  geo: "Geography",
  sourceReview: "Source review",
};

const STATUS_OPTIONS = ["open", "upcoming", "closed", "between-cycles", "rolling", "unknown"];
const GEOGRAPHY_OPTIONS = Object.entries(STATE_NAMES).sort((a, b) => a[1].localeCompare(b[1]));

interface GeographyValue {
  scope: "national" | "states";
  states?: string[];
}

function geographyValue(value: unknown): GeographyValue | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { scope?: unknown; states?: unknown };
  if (candidate.scope === "national") return { scope: "national" };
  if (candidate.scope === "states" && Array.isArray(candidate.states)) {
    const states = candidate.states.filter(
      (state): state is string => typeof state === "string" && STATE_NAMES[state] !== undefined,
    );
    return states.length ? { scope: "states", states: [...new Set(states)].sort() } : null;
  }
  return null;
}

function geographyEditorValue(value: string): GeographyValue | null {
  try {
    const candidate = JSON.parse(value) as { scope?: unknown; states?: unknown };
    if (candidate.scope === "national") return { scope: "national" };
    if (candidate.scope === "states" && Array.isArray(candidate.states)) {
      return {
        scope: "states",
        states: candidate.states.filter(
          (state): state is string => typeof state === "string" && STATE_NAMES[state] !== undefined,
        ),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function fieldLabel(field: string) {
  return FIELD_LABELS[field] ?? field;
}

function plainValue(value: unknown) {
  if (value == null || value === "") return "Not set";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

function displayValue(value: unknown, field: string) {
  if (field === "geo") {
    const geo = geographyValue(value);
    if (!geo) return "Not set";
    if (geo.scope === "national") return "National";
    return (geo.states ?? []).map((state) => STATE_NAMES[state] ?? state).join(", ");
  }
  const raw = plainValue(value);
  if (raw === "Not set") return raw;
  if (["opensOn", "closesOn", "nextOpensOn"].includes(field) && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return new Date(`${raw}T12:00:00Z`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
  return raw.replaceAll("-", " ");
}

function filterMatches(row: ProposalRow, filter: QueueFilter) {
  if (filter === "status") return row.field_name === "applicationStatus";
  if (filter === "dates") return ["opensOn", "closesOn", "nextOpensOn"].includes(row.field_name);
  if (filter === "geography") return row.field_name === "geo";
  if (filter === "source") return row.field_name === "sourceReview";
  return true;
}

export default function ScholarshipReviewQueue() {
  const [supabase] = useState<SupabaseClient | null>(() => (accountsEnabled ? getSupabase() : null));
  const [session, setSession] = useState<Session | null>(null);
  const [isModerator, setIsModerator] = useState<boolean | null>(() => (accountsEnabled ? null : false));
  const [proposals, setProposals] = useState<ProposalRow[] | null>(null);
  const [inventory, setInventory] = useState<Map<string, InventoryRow>>(new Map());
  const [locks, setLocks] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<QueueFilter>("all");
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [lockField, setLockField] = useState(false);
  const [busy, setBusy] = useState<ScholarshipReviewAction | null>(null);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const loadQueue = useCallback(async () => {
    if (!supabase) return;
    const proposalQuery = supabase
      .from("scholarship_monitor_proposals")
      .select("id,scholarship_id,field_name,current_value,proposed_value,source_url,evidence_text,extraction_confidence,risk,verification_status,detected_at")
      .eq("status", "pending")
      .order("detected_at", { ascending: true });
    const inventoryQuery = supabase
      .from("scholarship_monitor_inventory")
      .select("scholarship_id,name,official_url");
    const lockQuery = supabase
      .from("scholarship_monitor_field_locks")
      .select("scholarship_id,field_name");
    const [proposalResult, inventoryResult, lockResult] = await Promise.all([
      proposalQuery,
      inventoryQuery,
      lockQuery,
    ]);

    if (proposalResult.error || inventoryResult.error || lockResult.error) {
      setMessage({ kind: "error", text: "The review queue could not be loaded." });
      setProposals([]);
      return;
    }
    const rows = (proposalResult.data ?? []) as ProposalRow[];
    setProposals(rows);
    setInventory(
      new Map(
        ((inventoryResult.data ?? []) as InventoryRow[]).map((row) => [row.scholarship_id, row]),
      ),
    );
    setLocks(
      new Set(
        ((lockResult.data ?? []) as FieldLockRow[]).map((row) => `${row.scholarship_id}|${row.field_name}`),
      ),
    );
    const first = rows[0] ?? null;
    setSelectedId(first?.id ?? null);
    setEditedValue(first ? plainValue(first.proposed_value) : "");
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
      if (moderator) await loadQueue();
    }
    void initialize();
    return () => {
      active = false;
    };
  }, [loadQueue, supabase]);

  const counts = useMemo(() => {
    const rows = proposals ?? [];
    return {
      all: rows.length,
      status: rows.filter((row) => filterMatches(row, "status")).length,
      dates: rows.filter((row) => filterMatches(row, "dates")).length,
      geography: rows.filter((row) => filterMatches(row, "geography")).length,
      source: rows.filter((row) => filterMatches(row, "source")).length,
    };
  }, [proposals]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (proposals ?? []).filter((row) => {
      if (!filterMatches(row, filter)) return false;
      if (!query) return true;
      const scholarship = inventory.get(row.scholarship_id);
      return `${scholarship?.name ?? ""} ${row.scholarship_id} ${fieldLabel(row.field_name)}`
        .toLowerCase()
        .includes(query);
    });
  }, [filter, inventory, proposals, search]);

  const selected = visible.find((row) => row.id === selectedId) ?? null;
  const selectedScholarship = selected ? inventory.get(selected.scholarship_id) : null;
  const selectedLocked = selected ? locks.has(`${selected.scholarship_id}|${selected.field_name}`) : false;
  const editedGeography = selected?.field_name === "geo" ? geographyEditorValue(editedValue) : null;
  const editedValueReady = selected?.field_name === "geo"
    ? editedGeography?.scope === "national" || Boolean(editedGeography?.states?.length)
    : Boolean(editedValue);

  function setGeographyScope(scope: GeographyValue["scope"]) {
    setEditedValue(JSON.stringify(scope === "national" ? { scope } : { scope, states: editedGeography?.states ?? [] }));
  }

  function toggleGeographyState(code: string) {
    const selectedStates = new Set(editedGeography?.states ?? []);
    if (selectedStates.has(code)) selectedStates.delete(code);
    else selectedStates.add(code);
    setEditedValue(JSON.stringify({ scope: "states", states: [...selectedStates].sort() }));
  }

  function selectProposal(row: ProposalRow | null) {
    setSelectedId(row?.id ?? null);
    setNote("");
    setLockField(false);
    setMessage(null);
    setEditedValue(row ? plainValue(row.proposed_value) : "");
  }

  function changeFilter(next: QueueFilter) {
    setFilter(next);
    const first = (proposals ?? []).find((row) => filterMatches(row, next)) ?? null;
    selectProposal(first);
  }

  function changeSearch(next: string) {
    setSearch(next);
    const query = next.trim().toLowerCase();
    const first = (proposals ?? []).find((row) => {
      if (!filterMatches(row, filter)) return false;
      if (!query) return true;
      const scholarship = inventory.get(row.scholarship_id);
      return `${scholarship?.name ?? ""} ${row.scholarship_id} ${fieldLabel(row.field_name)}`
        .toLowerCase()
        .includes(query);
    }) ?? null;
    selectProposal(first);
  }

  async function review(action: ScholarshipReviewAction) {
    if (!selected || !session) return;
    setBusy(action);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/scholarship-review", {
        method: "POST",
        headers: {
          authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          proposalId: selected.id,
          action,
          editedValue: action === "edit" ? editedValue : null,
          note,
          lockField,
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The review could not be saved.");

      const remaining = (proposals ?? []).filter((row) => row.id !== selected.id);
      setProposals(remaining);
      if (lockField) {
        setLocks((current) => new Set(current).add(`${selected.scholarship_id}|${selected.field_name}`));
      }
      const next = remaining.find((row) => filterMatches(row, filter)) ?? remaining[0] ?? null;
      setSelectedId(next?.id ?? null);
      setEditedValue(next ? plainValue(next.proposed_value) : "");
      setNote("");
      setLockField(false);
      setMessage({ kind: "success", text: "Decision saved with an audit-history entry." });
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "The review could not be saved." });
    } finally {
      setBusy(null);
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
          {session ? "This account is not on the moderator list." : "Sign in with a moderator account to review scholarship evidence."}{" "}
          <Link href="/account" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">Go to your account</Link>
        </p>
      </div>
    );
  }

  if (proposals === null) {
    return <p className="flex items-center gap-2 text-base text-stone"><Loader2 className="h-5 w-5 animate-spin" /> Loading the review queue…</p>;
  }

  return (
    <div>
      <div className="border-y border-sand py-5">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-5">
          <div><dt className="text-sm text-stone">Pending fields</dt><dd className="mt-1 font-display text-3xl font-bold text-ink">{counts.all}</dd></div>
          <div><dt className="text-sm text-stone">Status</dt><dd className="mt-1 font-display text-3xl font-bold text-ink">{counts.status}</dd></div>
          <div><dt className="text-sm text-stone">Dates</dt><dd className="mt-1 font-display text-3xl font-bold text-ink">{counts.dates}</dd></div>
          <div><dt className="text-sm text-stone">Geography</dt><dd className="mt-1 font-display text-3xl font-bold text-ink">{counts.geography}</dd></div>
          <div><dt className="text-sm text-stone">Source checks</dt><dd className="mt-1 font-display text-3xl font-bold text-ink">{counts.source}</dd></div>
        </dl>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-b border-sand pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-5 overflow-x-auto" aria-label="Filter proposals">
          {(["all", "status", "dates", "geography", "source"] as QueueFilter[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeFilter(value)}
              className={`shrink-0 border-b-2 pb-2 text-sm font-semibold transition-colors ${filter === value ? "border-forest text-forest" : "border-transparent text-stone hover:text-ink"}`}
            >
              {value === "all" ? "All" : value === "source" ? "Source checks" : value[0].toUpperCase() + value.slice(1)} ({counts[value]})
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search scholarships</span>
          <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
          <input
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Search scholarship or field"
            className="w-full rounded-md border border-sand bg-cream py-2.5 pl-9 pr-3 text-base text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none"
          />
        </label>
      </div>

      {message ? (
        <p className={`mt-4 flex items-center gap-2 text-sm font-semibold ${message.kind === "error" ? "text-terracotta" : "text-forest"}`}>
          {message.kind === "error" ? <Warning className="h-4 w-4" /> : <Check className="h-4 w-4" />}{message.text}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl font-semibold text-ink">No proposals in this view</p>
          <p className="mt-2 text-base text-stone">Change the filter or search, or enjoy the cleared queue.</p>
        </div>
      ) : (
        <div className="mt-6 grid min-h-[38rem] border border-sand bg-cream lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.4fr)]">
          <div className="border-b border-sand lg:border-b-0 lg:border-r">
            <p className="border-b border-sand px-4 py-3 text-sm font-semibold text-stone">{visible.length} matching proposals</p>
            <ol className="max-h-[42rem] overflow-y-auto">
              {visible.map((row) => {
                const scholarship = inventory.get(row.scholarship_id);
                const active = row.id === selected?.id;
                return (
                  <li key={row.id} className="border-b border-sand last:border-b-0">
                    <button
                      type="button"
                      onClick={() => selectProposal(row)}
                      className={`w-full px-4 py-4 text-left transition-colors ${active ? "bg-paper-deep" : "hover:bg-paper"}`}
                    >
                      <span className="block text-sm font-bold leading-5 text-ink">{scholarship?.name ?? row.scholarship_id}</span>
                      <span className="mt-1 flex items-center justify-between gap-3 text-sm text-stone">
                        <span>{fieldLabel(row.field_name)}</span>
                        <span className="font-semibold text-forest">{displayValue(row.proposed_value, row.field_name)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {selected ? (
            <section className="p-5 sm:p-7" aria-labelledby="proposal-heading">
              <div className="flex flex-col gap-3 border-b border-sand pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-terracotta">{fieldLabel(selected.field_name)}</p>
                  <h2 id="proposal-heading" className="mt-1 font-display text-2xl font-bold leading-tight text-ink">{selectedScholarship?.name ?? selected.scholarship_id}</h2>
                  <p className="mt-2 text-sm text-stone">Detected {new Date(selected.detected_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} · {selected.extraction_confidence} confidence · {selected.risk} risk</p>
                </div>
                <a href={selected.source_url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                  Open official source <ArrowSquareOut className="h-4 w-4" />
                </a>
              </div>

              <dl className="grid gap-px bg-sand sm:grid-cols-2">
                <div className="bg-cream px-4 py-5"><dt className="text-sm font-semibold text-stone">Current</dt><dd className="mt-2 font-display text-xl font-bold text-ink">{displayValue(selected.current_value, selected.field_name)}</dd></div>
                <div className="bg-cream px-4 py-5"><dt className="text-sm font-semibold text-stone">Proposed</dt><dd className="mt-2 font-display text-xl font-bold text-forest">{displayValue(selected.proposed_value, selected.field_name)}</dd></div>
              </dl>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-ink">Evidence from the official page</h3>
                <blockquote className="mt-2 max-h-48 overflow-y-auto border-l-4 border-amber bg-paper px-4 py-3 text-base leading-7 text-ink">{selected.evidence_text}</blockquote>
              </div>

              {selected.field_name !== "sourceReview" ? (
                <div className="mt-6">
                  <label htmlFor="review-edited-value" className="text-sm font-bold text-ink">Edit before applying</label>
                  {selected.field_name === "geo" ? (
                    <fieldset className="mt-2 border border-sand bg-paper p-4">
                      <legend className="px-1 text-sm font-bold text-ink">Verified scope</legend>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {(["national", "states"] as const).map((scope) => (
                          <label key={scope} className="flex items-center gap-2 text-base text-ink">
                            <input
                              type="radio"
                              name="geography-scope"
                              checked={editedGeography?.scope === scope}
                              onChange={() => setGeographyScope(scope)}
                            />
                            {scope === "national" ? "National" : "Specific states or territories"}
                          </label>
                        ))}
                      </div>
                      {editedGeography?.scope === "states" ? (
                        <div className="mt-4 max-h-64 overflow-y-auto border-t border-sand pt-3">
                          <p className="mb-3 text-sm text-stone">Select every location named as a hard residency or attendance requirement.</p>
                          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                            {GEOGRAPHY_OPTIONS.map(([code, name]) => (
                              <label key={code} className="flex items-center gap-2 text-sm text-ink">
                                <input
                                  type="checkbox"
                                  checked={editedGeography.states?.includes(code) ?? false}
                                  onChange={() => toggleGeographyState(code)}
                                />
                                {name}
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </fieldset>
                  ) : selected.field_name === "applicationStatus" ? (
                    <select id="review-edited-value" value={editedValue} onChange={(event) => setEditedValue(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base text-ink focus:border-amber focus:outline-none">
                      {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option.replaceAll("-", " ")}</option>)}
                    </select>
                  ) : (
                    <input id="review-edited-value" type="date" value={editedValue === "Not set" ? "" : editedValue} onChange={(event) => setEditedValue(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base text-ink focus:border-amber focus:outline-none" />
                  )}
                </div>
              ) : null}

              <div className="mt-5">
                <label htmlFor="review-note" className="text-sm font-bold text-ink">Reviewer note <span className="font-normal text-stone">(optional)</span></label>
                <textarea id="review-note" value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Why you made this decision" className="mt-2 w-full resize-y rounded-md border border-sand bg-paper px-3 py-2.5 text-base leading-6 text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none" />
              </div>

              {!selectedLocked ? (
                <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6 text-stone">
                  <input type="checkbox" checked={lockField} onChange={(event) => setLockField(event.target.checked)} className="mt-1 h-4 w-4" />
                  <span><span className="font-bold text-ink">Lock this field after the decision.</span> Future monitoring can still observe the source but cannot propose another change until the lock is removed.</span>
                </label>
              ) : (
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-stone"><Lock className="h-4 w-4" /> This field is already locked.</p>
              )}

              <div className="mt-6 flex flex-wrap gap-2 border-t border-sand pt-5">
                {selected.field_name === "sourceReview" ? (
                  <button type="button" disabled={Boolean(busy)} onClick={() => review("verify")} className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50">{busy === "verify" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Source checked</button>
                ) : (
                  <>
                    <button type="button" disabled={Boolean(busy)} onClick={() => review("accept")} className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50">{busy === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Accept proposed</button>
                    <button type="button" disabled={Boolean(busy) || !editedValueReady} onClick={() => review("edit")} className="rounded-md border border-ink bg-cream px-4 py-2.5 text-sm font-bold text-ink hover:bg-paper disabled:opacity-50">{busy === "edit" ? "Saving…" : "Edit and apply"}</button>
                  </>
                )}
                <button type="button" disabled={Boolean(busy)} onClick={() => review("keep")} className="rounded-md border border-sand bg-paper px-4 py-2.5 text-sm font-bold text-stone hover:border-ink hover:text-ink disabled:opacity-50">Keep current</button>
                <button type="button" disabled={Boolean(busy)} onClick={() => review("reject")} className="inline-flex items-center gap-1.5 rounded-md border border-terracotta bg-cream px-4 py-2.5 text-sm font-bold text-terracotta hover:bg-paper disabled:opacity-50"><X className="h-4 w-4" /> Reject evidence</button>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone">Every action records the reviewer, source evidence, previous value, chosen value, note, and lock state. Public scholarship records are not changed here.</p>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
