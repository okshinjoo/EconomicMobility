"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowSquareOut,
  Check,
  CircleNotch as Loader2,
  Clipboard,
  Warning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import { STATE_NAMES } from "@/lib/scholarshipMatch";
import type { StudentStage } from "@/lib/scholarships";

interface PromotionCandidate {
  scholarshipId: string;
  name: string;
  sponsor: string | null;
  officialUrl: string;
  createdAt: string;
  geo: { scope: "national" | "states"; states?: string[] } | null;
  geoEvidence: string | null;
  geographyStatus: string;
  latestObservation: {
    source_status: string;
    fetched_at: string;
    final_url: string | null;
    http_status: number | null;
  } | null;
  pendingProposalCount: number;
  readiness: {
    geographyVerified: boolean;
    officialSourceHealthy: boolean;
    evidenceQueueClear: boolean;
  };
  ready: boolean;
}

const STAGE_OPTIONS: Array<{ value: StudentStage; label: string }> = [
  { value: "high-school", label: "High school" },
  { value: "college", label: "College" },
  { value: "transfer", label: "Transfer" },
];

function publicId(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function geoLabel(candidate: PromotionCandidate) {
  if (!candidate.geo) return "Not verified";
  if (candidate.geo.scope === "national") return "National";
  return (candidate.geo.states ?? []).map((code) => STATE_NAMES[code] ?? code).join(", ");
}

function Gate({ passed, children }: { passed: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-6 text-ink">
      {passed ? <Check className="mt-1 h-4 w-4 shrink-0 text-forest" /> : <X className="mt-1 h-4 w-4 shrink-0 text-terracotta" />}
      <span>{children}</span>
    </li>
  );
}

export default function ScholarshipPromotionQueue() {
  const [supabase] = useState<SupabaseClient | null>(() => (accountsEnabled ? getSupabase() : null));
  const [session, setSession] = useState<Session | null>(null);
  const [isModerator, setIsModerator] = useState<boolean | null>(() => (accountsEnabled ? null : false));
  const [candidates, setCandidates] = useState<PromotionCandidate[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [catalogId, setCatalogId] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlineMonth, setDeadlineMonth] = useState("");
  const [who, setWho] = useState("");
  const [stages, setStages] = useState<StudentStage[]>([]);
  const [tags, setTags] = useState("");
  const [openToUndocumented, setOpenToUndocumented] = useState(false);
  const [busy, setBusy] = useState(false);
  const [packet, setPacket] = useState("");
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const loadCandidates = useCallback(async (activeSession: Session) => {
    const response = await fetch("/api/admin/scholarship-promotions", {
      headers: { authorization: `Bearer ${activeSession.access_token}` },
    });
    const result = (await response.json()) as { candidates?: PromotionCandidate[]; error?: string };
    if (!response.ok) throw new Error(result.error || "The promotion queue could not be loaded.");
    const nextCandidates = result.candidates ?? [];
    setCandidates(nextCandidates);
    setSelectedId((current) => current && nextCandidates.some((candidate) => candidate.scholarshipId === current)
      ? current
      : nextCandidates[0]?.scholarshipId ?? null);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    async function initialize() {
      const { data } = await client.auth.getSession();
      if (!active) return;
      setSession(data.session);
      if (!data.session) return setIsModerator(false);
      const { data: moderator } = await client.from("moderators").select("user_id").eq("user_id", data.session.user.id).maybeSingle();
      if (!active) return;
      setIsModerator(Boolean(moderator));
      if (!moderator) return;
      try {
        await loadCandidates(data.session);
      } catch (loadError) {
        setCandidates([]);
        setMessage({ kind: "error", text: loadError instanceof Error ? loadError.message : "The promotion queue could not be loaded." });
      }
    }
    void initialize();
    return () => { active = false; };
  }, [loadCandidates, supabase]);

  const selected = candidates?.find((candidate) => candidate.scholarshipId === selectedId) ?? null;

  function selectCandidate(candidate: PromotionCandidate) {
    setSelectedId(candidate.scholarshipId);
    setCatalogId(publicId(candidate.name));
    setAmount("");
    setDeadline("");
    setDeadlineMonth("");
    setWho("");
    setStages([]);
    setTags("");
    setOpenToUndocumented(false);
    setPacket("");
    setMessage(null);
  }

  function toggleStage(stage: StudentStage) {
    setStages((current) => current.includes(stage) ? current.filter((value) => value !== stage) : [...current, stage]);
  }

  async function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !session) return;
    setBusy(true);
    setMessage(null);
    setPacket("");
    try {
      const response = await fetch("/api/admin/scholarship-promotions", {
        method: "POST",
        headers: {
          authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          candidateId: selected.scholarshipId,
          catalogId,
          amount,
          deadline,
          deadlineMonth: deadlineMonth ? Number(deadlineMonth) : null,
          who,
          stages,
          tags: tags.split(","),
          openToUndocumented,
        }),
      });
      const result = (await response.json()) as { packet?: unknown; error?: string };
      if (!response.ok || !result.packet) throw new Error(result.error || "The curation packet could not be prepared.");
      setPacket(JSON.stringify(result.packet, null, 2));
      setMessage({ kind: "success", text: "Curation packet prepared. The Finder is still unchanged until repository review and tests pass." });
    } catch (preparationError) {
      setMessage({ kind: "error", text: preparationError instanceof Error ? preparationError.message : "The curation packet could not be prepared." });
    } finally {
      setBusy(false);
    }
  }

  async function copyPacket() {
    if (!packet) return;
    await navigator.clipboard.writeText(packet);
    setMessage({ kind: "success", text: "Curation packet copied." });
  }

  if (isModerator === null) return <p className="flex items-center gap-2 text-base text-stone"><Loader2 className="h-5 w-5 animate-spin" /> Checking moderator access…</p>;
  if (!isModerator) {
    return (
      <div className="rounded-xl border border-sand bg-cream p-6">
        <p className="font-display text-xl font-semibold text-ink">Moderator access required</p>
        <p className="mt-2 text-base leading-7 text-stone">{session ? "This account is not on the moderator list." : "Sign in with a moderator account to prepare scholarships for curation."} <Link href="/account" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">Go to your account</Link></p>
      </div>
    );
  }
  if (candidates === null) return <p className="flex items-center gap-2 text-base text-stone"><Loader2 className="h-5 w-5 animate-spin" /> Loading withheld scholarships…</p>;
  if (!candidates.length) {
    return (
      <div className="border-y border-sand py-12">
        <p className="font-display text-2xl font-semibold text-ink">No withheld scholarships</p>
        <p className="mt-2 max-w-2xl text-base leading-7 text-stone">The private intake is clear. New scholarships will appear here after they are staged, monitored, and reviewed.</p>
        <Link href="/admin/scholarships/new" className="mt-5 inline-flex rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700">Add a scholarship</Link>
      </div>
    );
  }

  return (
    <div className="grid border border-sand bg-cream lg:grid-cols-[minmax(17rem,0.75fr)_minmax(0,1.5fr)]">
      <div className="border-b border-sand lg:border-b-0 lg:border-r">
        <p className="border-b border-sand px-4 py-3 text-sm font-semibold text-stone">{candidates.length} withheld scholarship{candidates.length === 1 ? "" : "s"}</p>
        <ol>
          {candidates.map((candidate) => (
            <li key={candidate.scholarshipId} className="border-b border-sand last:border-b-0">
              <button type="button" onClick={() => selectCandidate(candidate)} className={`w-full px-4 py-4 text-left ${candidate.scholarshipId === selectedId ? "bg-paper-deep" : "hover:bg-paper"}`}>
                <span className="block text-sm font-bold leading-5 text-ink">{candidate.name}</span>
                <span className={`mt-1 block text-sm font-semibold ${candidate.ready ? "text-forest" : "text-terracotta"}`}>{candidate.ready ? "Ready for curation" : "Verification incomplete"}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {selected ? (
        <section className="p-5 sm:p-7" aria-labelledby="promotion-heading">
          <div className="border-b border-sand pb-5">
            <p className="text-sm font-semibold text-terracotta">Publication gate</p>
            <h2 id="promotion-heading" className="mt-1 font-display text-2xl font-bold text-ink">{selected.name}</h2>
            <a href={selected.officialUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">Open official source <ArrowSquareOut className="h-4 w-4" /></a>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            <Gate passed={selected.readiness.geographyVerified}>Verified geography: {geoLabel(selected)}</Gate>
            <Gate passed={selected.readiness.officialSourceHealthy}>Latest official-source check is healthy</Gate>
            <Gate passed={selected.readiness.evidenceQueueClear}>{selected.pendingProposalCount ? `${selected.pendingProposalCount} proposal(s) still pending` : "Evidence queue is clear"}</Gate>
          </ul>

          {selected.geoEvidence ? <blockquote className="mt-5 border-l-4 border-amber bg-paper px-4 py-3 text-sm leading-6 text-ink">{selected.geoEvidence}</blockquote> : null}

          <form onSubmit={prepare} className="mt-7 border-t border-sand pt-6">
            <fieldset disabled={!selected.ready || busy} className="space-y-5 disabled:opacity-55">
              <legend className="font-display text-xl font-bold text-ink">Curated Finder record</legend>
              <p className="text-sm leading-6 text-stone">Complete only claims confirmed on the official source. Preparing a packet does not publish it.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold text-ink">Public ID<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={catalogId} onChange={(event) => setCatalogId(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink focus:border-amber focus:outline-none" /></label>
                <label className="text-sm font-bold text-ink">Published amount<input required value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="$5,000" className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none" /></label>
                <label className="text-sm font-bold text-ink sm:col-span-2">Deadline label<input required value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="Typically March; confirm the current date on the official page" className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none" /></label>
                <label className="text-sm font-bold text-ink">Deadline month<select value={deadlineMonth} onChange={(event) => setDeadlineMonth(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink focus:border-amber focus:outline-none"><option value="">Rolling or varies</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{new Date(2026, index).toLocaleString("en-US", { month: "long" })}</option>)}</select></label>
                <label className="text-sm font-bold text-ink">Search tags<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="first-gen, nursing, texas" className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none" /></label>
              </div>
              <label className="block text-sm font-bold text-ink">Who it is for<textarea required minLength={20} rows={4} value={who} onChange={(event) => setWho(event.target.value)} className="mt-2 w-full resize-y rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal leading-6 text-ink focus:border-amber focus:outline-none" /></label>
              <fieldset>
                <legend className="text-sm font-bold text-ink">Student stages</legend>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{STAGE_OPTIONS.map((stage) => <label key={stage.value} className="flex items-center gap-2 text-base text-ink"><input type="checkbox" checked={stages.includes(stage.value)} onChange={() => toggleStage(stage.value)} />{stage.label}</label>)}</div>
              </fieldset>
              <label className="flex items-start gap-3 text-sm leading-6 text-ink"><input type="checkbox" checked={openToUndocumented} onChange={(event) => setOpenToUndocumented(event.target.checked)} className="mt-1" /><span>Official source explicitly confirms undocumented/DACA/TPS applicants can qualify.</span></label>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Prepare curation packet</button>
            </fieldset>
          </form>

          {message ? <p className={`mt-5 flex items-start gap-2 text-sm font-semibold ${message.kind === "error" ? "text-terracotta" : "text-forest"}`}>{message.kind === "error" ? <Warning className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0" />}{message.text}</p> : null}
          {packet ? (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-4"><p className="text-sm font-bold text-ink">Validated curation packet</p><button type="button" onClick={() => void copyPacket()} className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4"><Clipboard className="h-4 w-4" /> Copy</button></div>
              <pre className="mt-2 max-h-80 overflow-auto border border-sand bg-paper p-4 text-xs leading-5 text-ink">{packet}</pre>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
