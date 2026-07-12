"use client";

// The /journey overview grid, personalized without a login: paths matching
// the goals picked in your profile float to the top (with a "Your goal"
// chip), then paths matching your quiz topics, then the rest. Progress on
// each card is derived from the same trackers JourneyPath uses. Server
// render = the neutral registry order, so first visits and fresh devices
// see the same page (no hydration mismatch).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getReadMap } from "@/lib/readTracking";
import { getBadges } from "@/components/CourseQuiz";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { readLocalProfile } from "@/lib/profile";

const CHALLENGE_BADGES_KEY = "empower:challenge-badges:v1";
const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

/** One progress-checkable step (mirrors JourneyPath's done-detection). */
export interface IndexStep {
  kind: "article" | "tool" | "course" | "challenge" | "quiz";
  key: string;
}

export interface JourneyCardData {
  id: string;
  title: string;
  promise: string;
  color: string;
  stageCount: number;
  guideCount: number;
  steps: IndexStep[];
  /** Stage milestones in order, for the "you are here" line. */
  milestones: string[];
  /** How many steps sit in each stage, aligned with milestones. */
  stageSizes: number[];
  /** Learn topics that map to this journey (for quiz-topic boosting). */
  quizTopics: string[];
}

export default function JourneyIndex({ items }: { items: JourneyCardData[] }) {
  const [ready, setReady] = useState(false);
  const [goalIds, setGoalIds] = useState<Set<string>>(new Set());
  const [quizTopics, setQuizTopics] = useState<Set<string>>(new Set());
  const [doneKeys, setDoneKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const profile = readLocalProfile();
    setGoalIds(new Set(profile?.goals ?? []));
    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    setQuizTopics(new Set(quiz?.answers?.q3 ?? []));

    const read = getReadMap();
    const tools = loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
    const courseBadges = getBadges();
    const challengeBadges =
      loadJSON<Record<string, unknown>>(CHALLENGE_BADGES_KEY) ?? {};
    const quizScores = loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {};
    const done = new Set<string>();
    for (const item of items) {
      for (const s of item.steps) {
        const hit =
          s.kind === "article"
            ? read[s.key]
            : s.kind === "tool"
              ? tools[s.key]
              : s.kind === "course"
                ? courseBadges[s.key]
                : s.kind === "challenge"
                  ? challengeBadges[s.key]
                  : quizScores[`topic-quiz:${s.key}`];
        if (hit) done.add(`${item.id}:${s.kind}:${s.key}`);
      }
    }
    setDoneKeys(done);
    setReady(true);
  }, [items]);

  const ordered = useMemo(() => {
    if (!ready) return items;
    const doneCount = (j: JourneyCardData) =>
      j.steps.filter((s) => doneKeys.has(`${j.id}:${s.kind}:${s.key}`)).length;
    const score = (j: JourneyCardData) => {
      let s = 0;
      if (goalIds.has(j.id)) s += 100;
      if (j.quizTopics.some((t) => quizTopics.has(t))) s += 10;
      const d = doneCount(j);
      if (d > 0 && d < j.steps.length) s += 5; // in progress beats untouched
      return s;
    };
    return [...items].sort((a, b) => score(b) - score(a));
  }, [items, ready, goalIds, quizTopics, doneKeys]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((j, i) => {
        const done = j.steps.filter((s) =>
          doneKeys.has(`${j.id}:${s.kind}:${s.key}`)
        ).length;
        const total = j.steps.length;
        const finished = ready && total > 0 && done === total;
        // "You are here" = first stage with an unfinished step.
        let hereMilestone: string | null = null;
        if (ready && done > 0 && !finished) {
          let offset = 0;
          for (let si = 0; si < j.stageSizes.length; si++) {
            const stageSteps = j.steps.slice(offset, offset + j.stageSizes[si]);
            if (
              stageSteps.some(
                (s) => !doneKeys.has(`${j.id}:${s.kind}:${s.key}`)
              )
            ) {
              hereMilestone = j.milestones[si];
              break;
            }
            offset += j.stageSizes[si];
          }
        }
        const isGoal = ready && goalIds.has(j.id);
        const tilt =
          i === 1 ? "lg:rotate-[0.4deg]" : i === 5 ? "lg:-rotate-[0.4deg]" : "";
        return (
          <Link
            key={j.id}
            href={`/journey/${j.id}`}
            className={`card-ink group flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
            style={{ background: `color-mix(in srgb, ${j.color} 10%, #fbf8f1)` }}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                className="font-display text-2xl font-semibold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                style={{ textDecorationColor: j.color }}
              >
                {j.title}
              </h2>
              {isGoal && (
                <span className="-rotate-2 whitespace-nowrap rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[11px] font-bold text-ink shadow-[2px_2px_0_#11211c]">
                  Your goal
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-6 text-stone">
              {j.promise}
            </p>
            <p className="mt-3 text-xs font-semibold text-ink/60">
              {j.stageCount} milestones · {j.guideCount} guides
            </p>

            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full border border-ink/15 bg-cream">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{
                    width: `${total ? (done / total) * 100 : 0}%`,
                    background: j.color,
                  }}
                />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink/70">
                {finished ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    Path complete
                  </>
                ) : hereMilestone ? (
                  <>You&apos;re at: {hereMilestone}</>
                ) : (
                  <>
                    Start the path
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
