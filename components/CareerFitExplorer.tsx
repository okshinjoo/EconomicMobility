"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowCounterClockwise, Check } from "@phosphor-icons/react/dist/ssr";
import CareerSaveButton from "@/components/CareerSaveButton";
import { trackCareerEvent } from "@/lib/careerAnalytics";
import {
  CAREER_FIT_EVENT,
  CAREER_FIT_QUESTIONS,
  summarizeCareerFit,
  type CareerFitAnswer,
  type CareerFitSnapshot,
} from "@/lib/careerFit";
import { STORAGE_KEYS, loadJSON, removeStored, saveJSON } from "@/lib/storage";

export interface CareerFitProfile {
  id: string;
  title: string;
  field: string;
  pay: string;
  training: string;
  annualOpenings: number;
  interests: string[];
  workStyles: string[];
}

const ANSWERS: { value: CareerFitAnswer; label: string }[] = [
  { value: 1, label: "Not for me" },
  { value: 2, label: "Not sure" },
  { value: 3, label: "Sounds good" },
];

function chooseStartingSet(
  profiles: CareerFitProfile[],
  topInterests: string[],
  topStyles: string[]
) {
  const scored = profiles
    .map((profile) => {
      const interestScore = topInterests.reduce((score, interest, index) =>
        score + (profile.interests.includes(interest) ? 8 - index * 2 : 0), 0);
      const styleScore = topStyles.reduce((score, style, index) =>
        score + (profile.workStyles.includes(style) ? 4 - Math.min(index, 2) : 0), 0);
      return { profile, score: interestScore + styleScore };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.profile.annualOpenings - a.profile.annualOpenings);

  const fieldCounts = new Map<string, number>();
  const selected: CareerFitProfile[] = [];
  for (const item of scored) {
    const count = fieldCounts.get(item.profile.field) ?? 0;
    if (count >= 2) continue;
    selected.push(item.profile);
    fieldCounts.set(item.profile.field, count + 1);
    if (selected.length === 8) break;
  }
  if (selected.length < 8) {
    for (const item of scored) {
      if (selected.some((profile) => profile.id === item.profile.id)) continue;
      selected.push(item.profile);
      if (selected.length === 8) break;
    }
  }
  return selected;
}

export default function CareerFitExplorer({ profiles }: { profiles: CareerFitProfile[] }) {
  const [answers, setAnswers] = useState<Record<string, CareerFitAnswer>>({});
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = loadJSON<CareerFitSnapshot>(STORAGE_KEYS.careerFit);
      if (!saved?.answers) return;
      setAnswers(saved.answers);
      setComplete(Object.keys(saved.answers).length === CAREER_FIT_QUESTIONS.length);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const answered = Object.keys(answers).length;
  const summary = useMemo(() => summarizeCareerFit(answers), [answers]);
  const suggestions = useMemo(
    () => chooseStartingSet(profiles, summary.topInterests, summary.topStyles),
    [profiles, summary.topInterests, summary.topStyles]
  );

  function finish() {
    if (answered !== CAREER_FIT_QUESTIONS.length) return;
    const snapshot: CareerFitSnapshot = {
      answers,
      completedAt: Date.now(),
      topInterests: summary.topInterests,
      topStyles: summary.topStyles,
      suggestedIds: suggestions.map((profile) => profile.id),
    };
    saveJSON(STORAGE_KEYS.careerFit, snapshot);
    window.dispatchEvent(new CustomEvent(CAREER_FIT_EVENT, { detail: snapshot }));
    trackCareerEvent("Career fit completed", {
      result_count: suggestions.length,
      has_pattern: summary.topInterests.length > 0,
    });
    setComplete(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setAnswers({});
    setComplete(false);
    removeStored(STORAGE_KEYS.careerFit);
  }

  if (complete) {
    const hasPattern = summary.topInterests.length > 0;
    return (
      <div>
        <section aria-labelledby="career-fit-results-title" className="border-b-2 border-ink pb-8">
          <p className="text-sm font-bold text-forest">Your work-preference starting point</p>
          <h2 id="career-fit-results-title" className="mt-2 max-w-3xl font-display text-3xl font-bold text-ink sm:text-4xl">
            {hasPattern
              ? `Explore work built around ${summary.topInterests.slice(0, 2).join(" and ").toLowerCase()} interests.`
              : "No strong work-preference pattern showed up yet."}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone">
            {hasPattern
              ? "These are starting points, not a score or verdict. Each career below shares several of the interests and working styles you liked; pay, training access, and day-to-day reality still matter."
              : "That can happen when every activity feels uncertain or unappealing. Try the full catalog by training, pay, or field, or retake this after you have sampled a few kinds of work."}
          </p>
          {hasPattern && (
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Your strongest preferences">
              {[...summary.topInterests, ...summary.topStyles].map((label) => (
                <span key={label} className="rounded-md border border-ink/15 bg-cream px-2.5 py-1 text-xs font-bold text-ink/75">
                  {label}
                </span>
              ))}
            </div>
          )}
        </section>

        {hasPattern ? <section className="py-8" aria-labelledby="career-fit-set-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="career-fit-set-title" className="font-display text-2xl font-bold text-ink">A varied starting set</h2>
              <p className="mt-1 text-sm leading-6 text-stone">The set deliberately spans fields and is not ordered from best to worst.</p>
            </div>
            <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
              <ArrowCounterClockwise className="h-4 w-4" weight="bold" />
              Retake the sampler
            </button>
          </div>

          <div className="mt-6 divide-y-2 divide-ink/10 border-y-2 border-ink bg-cream">
            {suggestions.map((profile) => {
              const shared = [
                ...profile.interests.filter((item) => (summary.topInterests as string[]).includes(item)),
                ...profile.workStyles.filter((item) => summary.topStyles.includes(item)),
              ].slice(0, 3);
              return (
                <article key={profile.id} className="grid gap-4 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-terracotta">{profile.field}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{profile.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone">
                      Shared preferences: <span className="font-semibold text-ink/80">{shared.join(" · ")}</span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone">{profile.training} · {profile.pay}</p>
                  </div>
                  <div className="flex items-end gap-4 sm:flex-col sm:items-end sm:justify-between">
                    <CareerSaveButton careerId={profile.id} compact />
                    <Link href={`/students/career-explorer/${profile.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                      Full profile <ArrowRight className="h-4 w-4" weight="bold" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section> : (
          <div className="flex flex-wrap gap-5 py-8">
            <Link href="/students/career-explorer" className="inline-flex items-center gap-1 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
              Browse the full catalog <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
            <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
              <ArrowCounterClockwise className="h-4 w-4" weight="bold" /> Retake the sampler
            </button>
          </div>
        )}

        <p className="border-t border-sand pt-5 text-xs leading-5 text-stone">
          Matches use career interest types and work styles from the O*NET 30.3 database. This short sampler is an Empower exploration aid, not the validated O*NET Interest Profiler. For a fuller 30-question assessment, use the official{" "}
          <a href="https://onetinterestprofiler.org/" target="_blank" rel="noreferrer" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">O*NET Interest Profiler</a>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-forest">About two minutes</p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-stone">Choose how each kind of work sounds. Answer based on the task itself, not whether you think you would already be good at it.</p>
        </div>
        <p className="text-sm font-bold tabular-nums text-ink" aria-live="polite">{answered} of {CAREER_FIT_QUESTIONS.length} answered</p>
      </div>

      <fieldset className="divide-y-2 divide-ink/10">
        <legend className="sr-only">Work preference questions</legend>
        {CAREER_FIT_QUESTIONS.map((question, index) => (
          <div key={question.id} className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <p className="pr-4 text-base font-semibold leading-6 text-ink">
              <span className="mr-2 text-sm font-bold tabular-nums text-stone">{index + 1}.</span>
              {question.prompt}
            </p>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={question.prompt}>
              {ANSWERS.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))}
                    className={`min-h-11 rounded-md border-2 px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${selected ? "border-ink bg-amber text-ink" : "border-ink/15 bg-cream text-stone hover:border-ink/45 hover:text-ink"}`}
                  >
                    {selected && <Check className="mr-1 inline h-3.5 w-3.5" weight="bold" aria-hidden="true" />}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <div className="border-t-2 border-ink pt-6">
        <button type="button" disabled={answered !== CAREER_FIT_QUESTIONS.length} onClick={finish} className="btn-ink rounded-md bg-amber px-6 py-3 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none">
          Show careers to explore
        </button>
        {answered !== CAREER_FIT_QUESTIONS.length && <p className="mt-2 text-xs text-stone">Answer every row so the starting set is not built from a partial pattern.</p>}
      </div>
    </div>
  );
}
