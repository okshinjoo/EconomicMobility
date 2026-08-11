"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Circle,
  Plus,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import {
  createCareerPlan,
  createCareerPlanStep,
  readCareerPlans,
  saveCareerPlan,
  touchCareerPlan,
  type CareerPlan,
} from "@/lib/careerPlan";
import { readSavedCareerIds } from "@/lib/savedCareers";
import { trackCareerEvent } from "@/lib/careerAnalytics";

export interface CareerPlanProfile {
  id: string;
  title: string;
  education: string;
  trainingNote: string;
  earnWhileTraining: boolean;
  hasLicense: boolean;
}

function defaultSteps(career: CareerPlanProfile): string[] {
  const routeStep = career.hasLicense
    ? `Check the license or certification requirements for ${career.title} in your state.`
    : career.earnWhileTraining
      ? `Compare at least two paid training or apprenticeship routes into ${career.title}.`
      : `Compare at least two ${career.education.toLowerCase()} routes, including total time and likely out-of-pocket cost.`;
  return [
    `Read the full ${career.title} profile and name one part of the day-to-day work you want to test.`,
    routeStep,
    "Compare the local median pay with your saved Reality Check lifestyle target.",
    `Talk with one ${career.title.toLowerCase()}, student, instructor, or apprenticeship coordinator about what the work is really like.`,
    "Take one concrete next step: request information, apply, enroll, shadow, or try a related project.",
  ];
}

function newPlan(career: CareerPlanProfile): CareerPlan {
  return createCareerPlan(career.id, defaultSteps(career));
}

export default function CareerPlanBuilder({
  profiles,
  initialCareerId,
}: {
  profiles: CareerPlanProfile[];
  initialCareerId?: string;
}) {
  const [selectedId, setSelectedId] = useState("");
  const [plan, setPlan] = useState<CareerPlan | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const known = new Set(profiles.map((profile) => profile.id));
      const saved = readSavedCareerIds().filter((id) => known.has(id));
      const first =
        (initialCareerId && known.has(initialCareerId) ? initialCareerId : "") ||
        saved[0] ||
        profiles[0]?.id ||
        "";
      const profile = profiles.find((item) => item.id === first);
      const stored = readCareerPlans()[first];
      setSavedIds(saved);
      setSelectedId(first);
      setPlan(stored ?? (profile ? newPlan(profile) : null));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialCareerId, profiles]);

  const selectedCareer = profiles.find((profile) => profile.id === selectedId);
  const sortedProfiles = useMemo(() => {
    const saved = new Set(savedIds);
    return [...profiles].sort((a, b) => {
      const savedDifference = Number(saved.has(b.id)) - Number(saved.has(a.id));
      return savedDifference || a.title.localeCompare(b.title);
    });
  }, [profiles, savedIds]);
  const complete = plan?.steps.filter((step) => step.done).length ?? 0;
  const total = plan?.steps.length ?? 0;

  function chooseCareer(id: string) {
    const profile = profiles.find((item) => item.id === id);
    if (!profile) return;
    setSelectedId(id);
    setPlan(readCareerPlans()[id] ?? newPlan(profile));
    trackCareerEvent("Career plan changed", {
      action: "career_selected",
      completed_count: 0,
      step_count: readCareerPlans()[id]?.steps.length ?? 5,
    });
  }

  function updatePlan(change: (current: CareerPlan) => CareerPlan) {
    if (!plan) return;
    const next = touchCareerPlan(change(plan));
    setPlan(next);
    saveCareerPlan(next);
  }

  function updateStep(id: string, patch: Partial<CareerPlan["steps"][number]>) {
    updatePlan((current) => ({
      ...current,
      steps: current.steps.map((step) => step.id === id ? { ...step, ...patch } : step),
    }));
    if (typeof patch.done === "boolean") {
      const completedCount = plan?.steps.filter((step) =>
        step.id === id ? patch.done : step.done
      ).length ?? 0;
      trackCareerEvent("Career plan changed", {
        action: patch.done ? "step_completed" : "step_reopened",
        completed_count: completedCount,
        step_count: plan?.steps.length ?? 0,
      });
    }
  }

  if (!ready || !plan || !selectedCareer) {
    return <p className="py-12 text-sm font-semibold text-stone">Loading your career plan…</p>;
  }

  return (
    <div>
      <div className="grid gap-5 border-b-2 border-ink pb-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">Your working hypothesis</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">
            I am exploring {selectedCareer.title}.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone">
            This is an experiment, not a contract. The plan is useful if it helps you gather better evidence and make one real move.
          </p>
        </div>
        <label>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-stone">Career</span>
          <select
            value={selectedId}
            onChange={(event) => chooseCareer(event.target.value)}
            className="mt-2 w-full rounded-lg border-2 border-ink/20 bg-cream px-3 py-2.5 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
          >
            {sortedProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {savedIds.includes(profile.id) ? "★ " : ""}{profile.title}
              </option>
            ))}
          </select>
          {savedIds.length > 0 && <span className="mt-1 block text-[11px] font-medium text-stone">★ Saved careers appear first.</span>}
        </label>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-ink">Why is this worth exploring?</span>
              <textarea
                value={plan.why}
                onChange={(event) => updatePlan((current) => ({ ...current, why: event.target.value }))}
                rows={4}
                placeholder="The work, people helped, pay, schedule, skills…"
                className="mt-2 w-full resize-y rounded-lg border-2 border-ink/20 bg-cream px-3 py-3 text-sm leading-6 text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-ink">What would make this path a yes—or a no?</span>
              <textarea
                value={plan.decisionTest}
                onChange={(event) => updatePlan((current) => ({ ...current, decisionTest: event.target.value }))}
                rows={4}
                placeholder="Example: I need a paid route and a schedule I can live with."
                className="mt-2 w-full resize-y rounded-lg border-2 border-ink/20 bg-cream px-3 py-3 text-sm leading-6 text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-8 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
            <h3 className="font-display text-xl font-bold text-ink">Next steps</h3>
            <p className="text-sm font-bold tabular-nums text-forest">{complete} of {total} done</p>
          </div>
          <div className="divide-y-2 divide-ink/10">
            {plan.steps.map((step) => (
              <div key={step.id} className="grid gap-3 py-4 sm:grid-cols-[auto_minmax(0,1fr)_9rem_auto] sm:items-start">
                <button
                  type="button"
                  onClick={() => updateStep(step.id, { done: !step.done })}
                  aria-label={`${step.done ? "Mark incomplete" : "Mark complete"}: ${step.text}`}
                  className="text-forest hover:text-ink sm:mt-2"
                >
                  {step.done ? <CheckCircle className="h-6 w-6" weight="fill" /> : <Circle className="h-6 w-6" weight="bold" />}
                </button>
                <textarea
                  value={step.text}
                  onChange={(event) => updateStep(step.id, { text: event.target.value })}
                  aria-label="Plan step"
                  rows={2}
                  className={`min-w-0 resize-y border-0 bg-transparent text-sm font-medium leading-6 text-ink focus:outline-none focus:ring-2 focus:ring-amber ${step.done ? "line-through opacity-55" : ""}`}
                />
                <label className="flex items-center gap-2">
                  <span className="sr-only">Due date for {step.text}</span>
                  <input
                    type="date"
                    value={step.dueDate}
                    onChange={(event) => updateStep(step.id, { dueDate: event.target.value })}
                    className="w-full rounded-md border-2 border-ink/15 bg-cream px-2 py-1.5 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    updatePlan((current) => ({ ...current, steps: current.steps.filter((item) => item.id !== step.id) }));
                    trackCareerEvent("Career plan changed", {
                      action: "step_removed",
                      completed_count: complete - (step.done ? 1 : 0),
                      step_count: Math.max(0, total - 1),
                    });
                  }}
                  aria-label={`Remove step: ${step.text}`}
                  className="text-stone hover:text-terracotta sm:mt-2"
                >
                  <Trash className="h-4 w-4" weight="bold" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              updatePlan((current) => ({
                ...current,
                steps: [...current.steps, createCareerPlanStep(current.careerId)],
              }));
              trackCareerEvent("Career plan changed", {
                action: "step_added",
                completed_count: complete,
                step_count: total + 1,
              });
            }}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <Plus className="h-4 w-4" weight="bold" /> Add a step
          </button>

          <label className="mt-8 block border-t-2 border-ink pt-6">
            <span className="text-sm font-bold text-ink">Notes and names to follow up with</span>
            <textarea
              value={plan.notes}
              onChange={(event) => updatePlan((current) => ({ ...current, notes: event.target.value }))}
              rows={5}
              placeholder="Programs, people, questions, links, application details…"
              className="mt-2 w-full resize-y rounded-lg border-2 border-ink/20 bg-cream px-3 py-3 text-sm leading-6 text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
            />
          </label>
        </div>

        <aside className="border-l-4 border-amber pl-5 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone">Use the evidence</p>
          <div className="mt-4 space-y-4 text-sm">
            <Link href={`/students/career-explorer/${selectedCareer.id}`} className="group block font-bold text-forest hover:text-ink">
              Career facts and local pathways <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" weight="bold" />
            </Link>
            <Link href="/students/career-explorer/compare" className="group block font-bold text-forest hover:text-ink">
              Compare your shortlist <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" weight="bold" />
            </Link>
            <Link href="/students/tools/reality-check" className="group block font-bold text-forest hover:text-ink">
              Check your lifestyle target <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" weight="bold" />
            </Link>
            <Link href="/students/opportunities" className="group block font-bold text-forest hover:text-ink">
              Find experience <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" weight="bold" />
            </Link>
          </div>
          <p className="mt-6 text-xs leading-5 text-stone">Saved automatically on this device. If you sign in, the existing account-sync system can mirror the same versioned plan snapshot.</p>
        </aside>
      </div>
    </div>
  );
}
