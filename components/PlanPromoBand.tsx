"use client";

// The /journey "build my plan" promo band — moved out of JourneyIndexView
// in session 6 so it can step aside once a plan exists: JourneyIndex then
// leads with the personal "Made for you" card instead (personalization
// replacing generic prominence). Server render = the band (same for every
// first visit, no hydration mismatch); it removes itself post-mount only
// when a saved plan is found.

import { useEffect, useState } from "react";
import Link from "next/link";
import { frameHref, type Frame } from "@/lib/frame";
import { loadPlan } from "@/lib/plan";

export default function PlanPromoBand({ frame }: { frame: Frame }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (loadPlan()) setHidden(true);
  }, []);
  if (hidden) return null;
  return (
    <Link
      href={frameHref("/plan", frame)}
      className="card-ink mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7"
    >
      <div className="max-w-xl">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
          New · My Plan
        </span>
        <p className="mt-1.5 font-display text-xl font-bold text-ink sm:text-2xl">
          Answer five questions, get one plan that&apos;s yours.
        </p>
        <p className="mt-1 text-sm leading-6 text-ink/75">
          The paths below, personalized: your goal, your situation, your
          deadlines — in the order that fits you, checking itself off as
          you go.
        </p>
      </div>
      <span className="btn-ink inline-flex shrink-0 items-center rounded-md bg-forest px-6 py-3 text-sm font-bold text-cream">
        Build my plan
      </span>
    </Link>
  );
}
