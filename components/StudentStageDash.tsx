"use client";

// The /students homepage "made for you" band (July 2026, owner ask: a more
// personalized dashboard). Server-renders the three-door PICKER (real
// content for a first visit — no hydration mismatch), then swaps to the
// stage's six recommendation doors after mount when a stage is known from
// anywhere: the profile (account page), a previous picker answer, or the
// tracker's chosen track. Memory contract: the band never disappears —
// answered, it becomes the recommendations with a visible switch control.

import { useEffect, useState } from "react";
import Link from "next/link";
import { STUDENT_STAGE_OPTIONS } from "@/lib/profile";
import {
  readStudentStage,
  writeStudentStage,
  type KnownStage,
} from "@/lib/studentStage";
import { STAGE_PLANS } from "@/lib/studentRecs";

export default function StudentStageDash() {
  const [stage, setStage] = useState<KnownStage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStage(readStudentStage());
    setMounted(true);
  }, []);

  function pick(next: KnownStage) {
    writeStudentStage(next);
    setStage(next);
  }

  const plan = mounted && stage ? STAGE_PLANS[stage] : null;

  return (
    <section className="border-b-2 border-ink bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {plan ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                  Made for you
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {plan.headline}?{" "}
                  <span className="text-forest">Start with these six.</span>
                </h2>
                <p className="mt-1.5 max-w-2xl text-base leading-7 text-stone">
                  {plan.blurb}
                </p>
              </div>
              <p className="text-sm font-medium text-stone">
                Not you?{" "}
                {STUDENT_STAGE_OPTIONS.filter((s) => s.id !== stage).map(
                  (s, i) => (
                    <span key={s.id}>
                      {i > 0 && " · "}
                      <button
                        type="button"
                        onClick={() => pick(s.id)}
                        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                      >
                        {s.label}
                      </button>
                    </span>
                  )
                )}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plan.recs.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                    {r.label}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-stone">{r.desc}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Made for you
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                Which student are you?
              </h2>
              <p className="mt-1.5 max-w-xl text-base leading-7 text-stone">
                One answer, and this page starts recommending the right
                scholarships, guides, and deadlines. Saved on this device —
                no account needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {STUDENT_STAGE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pick(s.id)}
                  className="btn-ink rounded-md bg-cream px-5 py-3 text-sm font-bold text-ink"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
