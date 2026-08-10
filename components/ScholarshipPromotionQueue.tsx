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
import {
  SCHOLARSHIP_TAXONOMY,
  type CriterionStrength,
  type EligibilityTag,
} from "@/lib/scholarshipTaxonomy";
import RunScholarshipVerificationButton from "@/components/RunScholarshipVerificationButton";

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
    statusVerified: boolean;
    deadlineVerified: boolean;
  };
  ready: boolean;
}

const STAGE_OPTIONS: Array<{ value: StudentStage; label: string }> = [
  { value: "high-school", label: "High school" },
  { value: "college", label: "College" },
  { value: "transfer", label: "Transfer" },
];

const ELIGIBILITY_OPTIONS = SCHOLARSHIP_TAXONOMY.filter((node) => node.parent);
const ELIGIBILITY_LABELS = new Map(SCHOLARSHIP_TAXONOMY.map((node) => [node.id, node.label]));
const STRENGTH_OPTIONS: Array<{ value: CriterionStrength; label: string }> = [
  { value: "required", label: "Required" },
  { value: "preferred", label: "Preferred" },
  { value: "relevant", label: "Relevant" },
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
  const [eligibility, setEligibility] = useState<EligibilityTag[]>([]);
  const [eligibilityTag, setEligibilityTag] = useState(ELIGIBILITY_OPTIONS[0]?.id ?? "");
  const [eligibilityStrength, setEligibilityStrength] = useState<CriterionStrength>("required");
  const [eligibilityReviewed, setEligibilityReviewed] = useState(false);
  const [curationVerified, setCurationVerified] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [busy, setBusy] = useState<"prepare" | "publish" | null>(null);
  const [packet, setPacket] = useState("");
  const [workflowUrl, setWorkflowUrl] = useState("");
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
    setEligibility([]);
    setEligibilityReviewed(false);
    setCurationVerified(false);
    setConfirmPublish(false);
    setOpenToUndocumented(false);
    setPacket("");
    setWorkflowUrl("");
    setMessage(null);
  }

  function toggleStage(stage: StudentStage) {
    setStages((current) => current.includes(stage) ? current.filter((value) => value !== stage) : [...current, stage]);
  }

  function addEligibility() {
    if (!eligibilityTag) return;
    setEligibility((current) => [
      ...current.filter((value) => value.tag !== eligibilityTag),
      { tag: eligibilityTag, strength: eligibilityStrength },
    ]);
  }

  function removeEligibility(tag: string) {
    setEligibility((current) => current.filter((value) => value.tag !== tag));
  }

  async function submitPromotion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !session) return;
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const action = submitter?.value === "publish" ? "publish" : "prepare";
    if (action === "publish" && !confirmPublish) {
      setMessage({ kind: "error", text: "Confirm that this record should be published to the live Finder." });
      return;
    }
    setBusy(action);
    setMessage(null);
    setPacket("");
    setWorkflowUrl("");
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
          eligibility,
          eligibilityReviewed,
          curationVerified,
          openToUndocumented,
          action,
          confirmPublish,
        }),
      });
      const result = (await response.json()) as { packet?: unknown; error?: string; started?: boolean; workflowUrl?: string };
      if (!response.ok) throw new Error(result.error || "The scholarship could not be processed.");
      if (action === "publish") {
        if (!result.started) throw new Error("The publication workflow did not start.");
        setWorkflowUrl(result.workflowUrl ?? "");
        setMessage({ kind: "success", text: "Publication started. The workflow will test and deploy the Finder before it retires this staging record." });
      } else {
        if (!result.packet) throw new Error("The curation packet could not be prepared.");
        setPacket(JSON.stringify(result.packet, null, 2));
        setMessage({ kind: "success", text: "Curation packet prepared. The Finder is unchanged until you publish it." });
      }
    } catch (preparationError) {
      setMessage({ kind: "error", text: preparationError instanceof Error ? preparationError.message : "The curation packet could not be prepared." });
    } finally {
      setBusy(null);
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

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            <Gate passed={selected.readiness.geographyVerified}>Verified geography: {geoLabel(selected)}</Gate>
            <Gate passed={selected.readiness.officialSourceHealthy}>Latest official-source check is healthy</Gate>
            <Gate passed={selected.readiness.evidenceQueueClear}>{selected.pendingProposalCount ? `${selected.pendingProposalCount} proposal(s) still pending` : "Evidence queue is clear"}</Gate>
            <Gate passed={selected.readiness.statusVerified}>Application status is human-verified</Gate>
            <Gate passed={selected.readiness.deadlineVerified}>An exact official deadline is verified</Gate>
          </ul>

          {session ? (
            <div className="mt-5 border-y border-sand py-5">
              <RunScholarshipVerificationButton key={selected.scholarshipId} accessToken={session.access_token} scholarshipId={selected.scholarshipId} />
            </div>
          ) : null}

          {selected.geoEvidence ? <blockquote className="mt-5 border-l-4 border-amber bg-paper px-4 py-3 text-sm leading-6 text-ink">{selected.geoEvidence}</blockquote> : null}

          <form onSubmit={submitPromotion} className="mt-7 border-t border-sand pt-6">
            <fieldset disabled={!selected.ready || busy !== null} className="space-y-5 disabled:opacity-55">
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
              <fieldset className="border-y border-sand py-5">
                <legend className="text-sm font-bold text-ink">Eligibility filters</legend>
                <p className="mt-1 text-sm leading-6 text-stone">Add only criteria explicitly supported by the official page. Leave the list empty for a genuinely general award.</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem_auto] sm:items-end">
                  <label className="text-sm font-bold text-ink">Criterion<select value={eligibilityTag} onChange={(event) => setEligibilityTag(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink focus:border-amber focus:outline-none">{ELIGIBILITY_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
                  <label className="text-sm font-bold text-ink">Strength<select value={eligibilityStrength} onChange={(event) => setEligibilityStrength(event.target.value as CriterionStrength)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base font-normal text-ink focus:border-amber focus:outline-none">{STRENGTH_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                  <button type="button" onClick={addEligibility} className="rounded-md border border-forest px-4 py-2.5 text-sm font-bold text-forest hover:bg-paper">Add filter</button>
                </div>
                {eligibility.length ? <ul className="mt-4 divide-y divide-sand border-y border-sand">{eligibility.map((item) => <li key={item.tag} className="flex items-center justify-between gap-4 py-2.5 text-sm"><span><strong>{ELIGIBILITY_LABELS.get(item.tag) ?? item.tag}</strong> · {item.strength}</span><button type="button" onClick={() => removeEligibility(item.tag)} className="font-bold text-terracotta underline decoration-amber decoration-2 underline-offset-4">Remove</button></li>)}</ul> : <p className="mt-3 text-sm text-stone">No specialized eligibility filters added.</p>}
              </fieldset>
              <label className="flex items-start gap-3 text-sm leading-6 text-ink"><input type="checkbox" checked={openToUndocumented} onChange={(event) => setOpenToUndocumented(event.target.checked)} className="mt-1" /><span>Official source explicitly confirms undocumented/DACA/TPS applicants can qualify.</span></label>
              <label className="flex items-start gap-3 text-sm leading-6 text-ink"><input required type="checkbox" checked={eligibilityReviewed} onChange={(event) => setEligibilityReviewed(event.target.checked)} className="mt-1" /><span>I verified the eligibility summary and filters against the official source.</span></label>
              <label className="flex items-start gap-3 text-sm leading-6 text-ink"><input required type="checkbox" checked={curationVerified} onChange={(event) => setCurationVerified(event.target.checked)} className="mt-1" /><span>I verified the amount, deadline label, student stages, and applicant description against the official source.</span></label>
              <div className="border-t border-sand pt-5">
                <label className="flex items-start gap-3 text-sm leading-6 text-ink"><input type="checkbox" checked={confirmPublish} onChange={(event) => setConfirmPublish(event.target.checked)} className="mt-1" /><span>Publish this verified record to the live Scholarship Finder after automated tests and deployment checks pass.</span></label>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="submit" name="action" value="publish" className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50">{busy === "publish" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Publish to Finder</button>
                  <button type="submit" name="action" value="prepare" className="inline-flex items-center gap-1.5 rounded-md border border-forest px-4 py-2.5 text-sm font-bold text-forest hover:bg-paper disabled:opacity-50">{busy === "prepare" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Preview packet</button>
                </div>
              </div>
            </fieldset>
          </form>

          {message ? <p className={`mt-5 flex items-start gap-2 text-sm font-semibold ${message.kind === "error" ? "text-terracotta" : "text-forest"}`}>{message.kind === "error" ? <Warning className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0" />}{message.text}</p> : null}
          {workflowUrl ? <a href={workflowUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">Open publication workflow <ArrowSquareOut className="h-4 w-4" /></a> : null}
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
