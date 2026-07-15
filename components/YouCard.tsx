"use client";

// The "the site learns you" reflection (July 14 owner ask). Reads the
// unified You model and shows the person, on their dashboard, exactly what
// the site has learned about them and what it's steering them toward — so
// saving a factoid visibly changes something. Empty state nudges them to
// tell us more (closing the loop right where it pays off). Mounted-gated:
// renders nothing until the client reads local prefs.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import {
  readYou,
  readContext,
  madeForYouCopy,
  nextProfilePrompt,
  type You,
  type MadeForYouCopy,
  type ProfilePrompt,
} from "@/lib/personalization";

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

export default function YouCard() {
  const [you, setYou] = useState<You | null>(null);
  // The single best next move for this person, from the normalized context —
  // contradiction-guarded (a high-schooler never gets community-college copy).
  const [lead, setLead] = useState<MadeForYouCopy | null>(null);
  // The one most-useful thing still worth asking (null once enough is known).
  const [prompt, setPrompt] = useState<ProfilePrompt | null>(null);
  useEffect(() => {
    setYou(readYou());
    const ctx = readContext();
    setLead(madeForYouCopy(ctx));
    setPrompt(nextProfilePrompt(ctx));
  }, []);
  if (!you) return null;

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

  const chips: string[] = [];
  if (you.stage) chips.push(STAGE_CHIP[you.stage]);
  else if (you.role) chips.push(ROLE_CHIP[you.role]);
  for (const g of you.goals.slice(0, 3))
    chips.push(g.statusLabel ? `${g.label} · ${g.statusLabel}` : g.label);
  if (you.income) chips.push(INCOME_CHIP[you.income]);
  if (you.family) chips.push(FAMILY_CHIP[you.family]);
  if (you.moment) chips.push(you.moment.title);

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
            key={c}
            className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest"
          >
            {c}
          </span>
        ))}
      </div>
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
