"use client";

// The "the site learns you" reflection (July 14 owner ask). Reads the
// unified You model and shows the person, on their dashboard, exactly what
// the site has learned about them and what it's steering them toward — so
// saving a factoid visibly changes something. Empty state nudges them to
// tell us more (closing the loop right where it pays off). Mounted-gated:
// renders nothing until the client reads local prefs.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import {
  readYou,
  readContext,
  madeForYouCopy,
  nextProfilePrompt,
  type You,
  type MadeForYouCopy,
  type ProfilePrompt,
} from "@/lib/personalization";
import { readLocalProfile, writeLocalProfile } from "@/lib/profile";
import { readAboutYou, writeAboutYou } from "@/lib/aboutYou";
import { removeStored, STORAGE_KEYS } from "@/lib/storage";
import { getSupabase } from "@/lib/supabase";
import { Skeleton } from "@/components/Skeleton";

const STAGE_CHIP: Record<string, string> = {
  hs: "High-school student",
  cc: "Community-college student",
  uni: "University student",
};
const ROLE_CHIP: Record<string, string> = {
  student: "Student",
  working: "Working",
  retired: "Retired",
};
const INCOME_CHIP: Record<string, string> = {
  steady: "Steady income",
  irregular: "Uneven income",
  none: "No income yet",
  supported: "Family-supported",
};
const FAMILY_CHIP: Record<string, string> = {
  "on-my-own": "On your own",
  "family-helps": "Family helps",
  "i-help-family": "Supporting family",
};

/** Best-effort DB write so a correction survives re-login; the local
 *  mirror is what every client surface reads. Silently no-ops signed out
 *  or with accounts disabled. */
async function syncProfilePatch(patch: Record<string, unknown>) {
  const supabase = getSupabase();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  const uid = data.session?.user.id;
  if (uid) await supabase.from("profiles").upsert({ id: uid, ...patch });
}

export default function YouCard() {
  const [you, setYou] = useState<You | null>(null);
  // The single best next move for this person, from the normalized context —
  // contradiction-guarded (a high-schooler never gets community-college copy).
  const [lead, setLead] = useState<MadeForYouCopy | null>(null);
  // The one most-useful thing still worth asking (null once enough is known).
  const [prompt, setPrompt] = useState<ProfilePrompt | null>(null);
  const refresh = () => {
    setYou(readYou());
    const ctx = readContext();
    setLead(madeForYouCopy(ctx));
    setPrompt(nextProfilePrompt(ctx));
  };
  useEffect(refresh, []);
  if (!you)
    return (
      <div
        aria-hidden="true"
        className="rounded-2xl border-2 border-forest/20 bg-forest/[0.05] p-5"
      >
        <Skeleton className="h-4 w-36" />
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    );

  // "That's not quite right" (owner ask, July 16): every learned fact can
  // be cleared right here — the correction writes to the fact's real home
  // (profile mirror + DB / About-you snapshot / local stage key) and the
  // card re-reads, so stale facts never have to be lived with.
  const clearStage = () => {
    const p = readLocalProfile();
    if (p) writeLocalProfile({ ...p, studentStage: "" });
    removeStored(STORAGE_KEYS.studentStage);
    void syncProfilePatch({ student_stage: "" });
    refresh();
  };
  const clearRole = () => {
    const p = readLocalProfile();
    if (p) writeLocalProfile({ ...p, role: "", studentStage: "" });
    removeStored(STORAGE_KEYS.studentStage);
    void syncProfilePatch({ role: "", student_stage: "" });
    refresh();
  };
  const clearGoal = (id: string) => {
    const p = readLocalProfile();
    if (p) {
      const goals = p.goals.filter((g) => g !== id);
      writeLocalProfile({ ...p, goals });
      void syncProfilePatch({ goals });
    }
    refresh();
  };
  const clearIncome = () => {
    writeAboutYou({ ...readAboutYou(), income: "" });
    refresh();
  };
  const clearFamily = () => {
    writeAboutYou({ ...readAboutYou(), family: "" });
    refresh();
  };
  const clearMoment = (id: string) => {
    const a = readAboutYou();
    writeAboutYou({ ...a, moments: (a.moments ?? []).filter((m) => m !== id) });
    refresh();
  };

  // Nothing saved yet — nudge them to tell us, so the tailoring can kick in.
  if (you.savedCount === 0) {
    return (
      <div className="rounded-2xl border-2 border-forest/20 bg-forest/[0.05] p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Sparkles className="h-4 w-4 text-forest" strokeWidth={2} />
          Let the site learn you
        </p>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          Tell us a few things on the{" "}
          <span className="font-semibold text-forest">About you</span> tab —
          your goals, where money comes from, what you&apos;re going through —
          and we&apos;ll tailor your plan, your recommendations, and the Money
          Guide to your situation.
        </p>
      </div>
    );
  }

  const chips: { label: string; clear: () => void }[] = [];
  if (you.stage)
    chips.push({ label: STAGE_CHIP[you.stage], clear: clearStage });
  else if (you.role)
    chips.push({ label: ROLE_CHIP[you.role], clear: clearRole });
  for (const g of you.goals.slice(0, 3))
    chips.push({
      label: g.statusLabel ? `${g.label} · ${g.statusLabel}` : g.label,
      clear: () => clearGoal(g.id),
    });
  if (you.income)
    chips.push({ label: INCOME_CHIP[you.income], clear: clearIncome });
  if (you.family)
    chips.push({ label: FAMILY_CHIP[you.family], clear: clearFamily });
  if (you.moment) {
    const id = you.moment.id;
    chips.push({ label: you.moment.title, clear: () => clearMoment(id) });
  }

  // What we steer them to: a guided path per active goal (journeys are keyed
  // to the same goal ids).
  const paths = you.goals.slice(0, 3).map((g) => ({
    label: `Your ${g.label.toLowerCase()} path`,
    href: `/journey/${g.id}`,
  }));

  return (
    <div className="rounded-2xl border-2 border-forest/20 bg-forest/[0.05] p-5">
      <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
        <Sparkles className="h-4 w-4 text-forest" strokeWidth={2} />
        Tailored to you
      </p>
      {lead?.personalized && (
        <div className="mt-2 rounded-xl border-2 border-ink bg-cream p-4">
          <p className="font-display text-base font-bold leading-snug text-ink">
            {lead.headline}
          </p>
          <p className="mt-1 text-sm leading-6 text-stone">{lead.sub}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href={lead.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Start here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
            {lead.reason && (
              <span className="text-xs text-stone">{lead.reason}</span>
            )}
          </div>
        </div>
      )}
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-forest/70">
        What we&apos;ve learned about you
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 rounded-full bg-forest/10 py-1 pl-2.5 pr-1 text-xs font-semibold text-forest"
          >
            {c.label}
            <button
              type="button"
              onClick={c.clear}
              title="Not quite right? Remove this"
              aria-label={`Not quite right — remove "${c.label}"`}
              className="rounded-full p-0.5 text-forest/50 transition-colors hover:bg-forest/15 hover:text-forest"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
            </button>
          </span>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] leading-4 text-stone">
        Not quite right? Click the × on anything and we&apos;ll forget it —
        or retune everything on the{" "}
        <Link
          href="/account"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2 hover:text-ink"
        >
          About you tab
        </Link>
        .
      </p>
      {paths.length > 0 && (
        <>
          <p className="mt-4 text-sm leading-6 text-stone">
            So the plan, your recommendations, and the Money Guide all lean
            toward what you&apos;re working on. Jump into a path:
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {paths.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink bg-cream px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-forest hover:text-forest"
              >
                {p.label}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </>
      )}
      {prompt && (
        <div className="mt-4 border-t-2 border-forest/15 pt-3">
          <p className="text-sm font-semibold text-ink">{prompt.question}</p>
          <p className="mt-0.5 text-xs leading-5 text-stone">
            {prompt.benefit}{" "}
            <Link
              href={prompt.href}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Answer on About you
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
