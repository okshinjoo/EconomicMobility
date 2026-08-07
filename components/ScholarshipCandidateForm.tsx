"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CircleNotch as Loader2, Warning } from "@phosphor-icons/react/dist/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";

interface CreatedCandidate {
  scholarshipId: string;
  publicationStatus: string;
  geographyStatus: string;
}

export default function ScholarshipCandidateForm() {
  const [supabase] = useState<SupabaseClient | null>(() => (accountsEnabled ? getSupabase() : null));
  const [session, setSession] = useState<Session | null>(null);
  const [isModerator, setIsModerator] = useState<boolean | null>(() => (accountsEnabled ? null : false));
  const [name, setName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<CreatedCandidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    async function initialize() {
      const { data } = await client.auth.getSession();
      if (!active) return;
      setSession(data.session);
      if (!data.session) return setIsModerator(false);
      const { data: moderator } = await client
        .from("moderators")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (active) setIsModerator(Boolean(moderator));
    }
    void initialize();
    return () => { active = false; };
  }, [supabase]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setError(null);
    setCreated(null);
    try {
      const response = await fetch("/api/admin/scholarship-candidates", {
        method: "POST",
        headers: {
          authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, sponsor, officialUrl }),
      });
      const result = (await response.json()) as CreatedCandidate & { error?: string };
      if (!response.ok) throw new Error(result.error || "The scholarship could not be staged.");
      setCreated(result);
      setName("");
      setSponsor("");
      setOfficialUrl("");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "The scholarship could not be staged.");
    } finally {
      setBusy(false);
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
          {session ? "This account is not on the moderator list." : "Sign in with a moderator account to stage a scholarship."}{" "}
          <Link href="/account" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">Go to your account</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/scholarships" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
        <ArrowLeft className="h-4 w-4" /> Back to evidence review
      </Link>

      <div className="mt-6 border border-sand bg-cream p-5 sm:p-7">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="candidate-name" className="text-sm font-bold text-ink">Scholarship name</label>
            <input id="candidate-name" required minLength={3} maxLength={180} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base text-ink focus:border-amber focus:outline-none" />
          </div>
          <div>
            <label htmlFor="candidate-sponsor" className="text-sm font-bold text-ink">Sponsor <span className="font-normal text-stone">(optional)</span></label>
            <input id="candidate-sponsor" maxLength={180} value={sponsor} onChange={(event) => setSponsor(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base text-ink focus:border-amber focus:outline-none" />
          </div>
          <div>
            <label htmlFor="candidate-url" className="text-sm font-bold text-ink">Official scholarship page</label>
            <input id="candidate-url" required type="url" inputMode="url" placeholder="https://sponsor.org/scholarship" value={officialUrl} onChange={(event) => setOfficialUrl(event.target.value)} className="mt-2 w-full rounded-md border border-sand bg-paper px-3 py-2.5 text-base text-ink placeholder:text-stone/70 focus:border-amber focus:outline-none" />
            <p className="mt-2 text-sm leading-6 text-stone">Use the sponsor’s own program or application page. Do not enter a scholarship directory or search resource.</p>
          </div>
          <button type="submit" disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700 disabled:opacity-50">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Stage for verification
          </button>
        </form>
      </div>

      <div className="mt-6 border-l-4 border-amber bg-paper-deep px-5 py-4">
        <p className="font-bold text-ink">What happens next</p>
        <p className="mt-1 text-sm leading-6 text-stone">The record stays private and withheld. The monitor checks the official page and creates evidence proposals for geography, status, and exact dates. It cannot become publishable until geography is human-verified from that source.</p>
      </div>

      {created ? (
        <div className="mt-6 border border-forest bg-paper p-5" role="status">
          <p className="flex items-center gap-2 font-bold text-forest"><Check className="h-5 w-5" /> Scholarship staged</p>
          <p className="mt-2 break-all text-sm text-stone">Record: {created.scholarshipId}</p>
          <p className="mt-1 text-sm text-stone">Publication: withheld · Geography: unverified</p>
        </div>
      ) : null}
      {error ? <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-terracotta" role="alert"><Warning className="h-4 w-4" /> {error}</p> : null}
    </div>
  );
}
