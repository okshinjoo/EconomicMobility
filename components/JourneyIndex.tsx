"use client";

// The /journey overview grid, personalized without a login: paths matching
// the goals picked in your profile float to the top (with a "Your goal"
// chip), then paths matching your quiz topics, then the rest. Progress on
// each card is derived from the same trackers JourneyPath uses. Server
// render = the neutral registry order, so first visits and fresh devices
// see the same page (no hydration mismatch).

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { frameHref, type Frame } from "@/lib/frame";
import { ArrowRight, Check } from "lucide-react";
import TopicMark from "@/components/TopicMark";
import type { TopicId } from "@/lib/topics";
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
  /** The journey's home topic — drives the card's hand-drawn mark. */
  topicId: TopicId;
}

/** A pocket version of the detail page's winding roadmap: a little S-curve
 *  trail whose stroke draws to the visitor's progress, with one dot per
 *  milestone that fills as its stage completes. Dot positions are measured
 *  off the real path so they sit exactly on the curve. */
const MINI_TRAIL = "M6 30 C 40 6, 64 38, 100 20 C 136 4, 162 36, 194 12";

function TrailMini({
  color,
  fraction,
  stageDone,
  boundaries,
}: {
  color: string;
  fraction: number;
  stageDone: boolean[];
  /** Cumulative step-fraction where each milestone sits (last = 1). */
  boundaries: number[];
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<Array<{ x: number; y: number }>>([]);

  const key = boundaries.join(",");
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    setPts(
      boundaries.map((b) => {
        const pt = p.getPointAtLength(L * Math.min(1, Math.max(0, b)));
        return { x: pt.x, y: pt.y };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const currentIdx = stageDone.findIndex((d) => !d);

  return (
    <svg viewBox="0 0 200 40" className="h-10 w-full" fill="none" aria-hidden>
      <path
        d={MINI_TRAIL}
        stroke="#d9cbb0"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1.5 6"
      />
      <path
        ref={pathRef}
        d={MINI_TRAIL}
        pathLength={100}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: 100 * (1 - fraction),
          transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {pts.map((pt, i) => {
        const done = stageDone[i];
        const here = i === currentIdx && fraction > 0;
        return (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="4.5"
            fill={done ? color : "#fbf8f1"}
            stroke={done ? color : here ? "#e7a33c" : "#c9bda2"}
            strokeWidth="2"
            style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
          />
        );
      })}
    </svg>
  );
}

export default function JourneyIndex({ items, frame = "main" }: { items: JourneyCardData[]; frame?: Frame }) {
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
        // Per-stage done flags + cumulative boundaries for the mini trail.
        const stageDone: boolean[] = [];
        const boundaries: number[] = [];
        {
          let offset = 0;
          for (const size of j.stageSizes) {
            const stageSteps = j.steps.slice(offset, offset + size);
            stageDone.push(
              ready &&
                stageSteps.length > 0 &&
                stageSteps.every((s) =>
                  doneKeys.has(`${j.id}:${s.kind}:${s.key}`)
                )
            );
            offset += size;
            boundaries.push(total ? offset / total : 1);
          }
        }
        const tilt =
          i === 1 ? "lg:rotate-[0.4deg]" : i === 5 ? "lg:-rotate-[0.4deg]" : "";
        return (
          <Link
            key={j.id}
            href={frameHref(`/journey/${j.id}`, frame)}
            className={`card-ink group flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
            style={{ background: `color-mix(in srgb, ${j.color} 10%, #fbf8f1)` }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex min-w-0 items-start gap-2.5">
                <TopicMark
                  id={j.topicId}
                  className="mt-0.5 h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-110"
                />
                <h2
                  className="font-display text-2xl font-semibold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                  style={{ textDecorationColor: j.color }}
                >
                  {j.title}
                </h2>
              </span>
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

            <div className="mt-2">
              <TrailMini
                color={j.color}
                fraction={ready && total ? done / total : 0}
                stageDone={stageDone}
                boundaries={boundaries}
              />
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
