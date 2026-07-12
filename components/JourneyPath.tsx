"use client";

// The Khan-Academy-style milestone path for one journey: numbered stages on
// a vertical spine, each item checkable. Progress is DERIVED from the same
// trackers the rest of the site writes (read map, visited tools, course /
// challenge badges, topic-quiz scores) — nothing new is stored, so the path
// lights up from work done anywhere on the site, before or after it existed.
//
// Memory contract: items never hide when done — they check off and the
// "you are here" marker advances. The server render shows the neutral
// zero-progress state (no hydration mismatch).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Flag,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import { getReadMap } from "@/lib/readTracking";
import { getBadges } from "@/components/CourseQuiz";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";

const CHALLENGE_BADGES_KEY = "empower:challenge-badges:v1";
const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

export type PathItemKind = "article" | "tool" | "course" | "challenge" | "quiz";

export interface PathItem {
  kind: PathItemKind;
  href: string;
  title: string;
  /** e.g. "6 min read", "Calculator", "Course · 6 guides + final". */
  meta: string;
  /** What done-detection looks up: slug / href / courseId / challengeId / topicId. */
  key: string;
}

export interface PathStage {
  id: string;
  milestone: string;
  why: string;
  items: PathItem[];
}

const KIND_ICON: Record<PathItemKind, typeof BookOpen> = {
  article: BookOpen,
  tool: Calculator,
  course: GraduationCap,
  challenge: Flag,
  quiz: ListChecks,
};

function useDoneChecker(): (item: PathItem) => boolean {
  const [state, setState] = useState<{
    read: Record<string, number>;
    tools: Record<string, number>;
    courseBadges: Record<string, unknown>;
    challengeBadges: Record<string, unknown>;
    quizScores: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    setState({
      read: getReadMap(),
      tools: loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {},
      courseBadges: getBadges(),
      challengeBadges:
        loadJSON<Record<string, unknown>>(CHALLENGE_BADGES_KEY) ?? {},
      quizScores: loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {},
    });
  }, []);

  return useMemo(() => {
    if (!state) return () => false;
    return (item: PathItem) => {
      switch (item.kind) {
        case "article":
          return Boolean(state.read[item.key]);
        case "tool":
          return Boolean(state.tools[item.key]);
        case "course":
          return Boolean(state.courseBadges[item.key]);
        case "challenge":
          return Boolean(state.challengeBadges[item.key]);
        case "quiz":
          return Boolean(state.quizScores[`topic-quiz:${item.key}`]);
      }
    };
  }, [state]);
}

export default function JourneyPath({
  stages,
  color,
}: {
  stages: PathStage[];
  color: string;
}) {
  const isDone = useDoneChecker();

  const allItems = stages.flatMap((s) => s.items);
  const doneCount = allItems.filter(isDone).length;
  const nextItem = allItems.find((i) => !isDone(i)) ?? null;
  // "You are here" = first stage with anything left to do.
  const hereIndex = stages.findIndex((s) => s.items.some((i) => !isDone(i)));
  const finished = hereIndex === -1;

  return (
    <div>
      {/* Progress + next action */}
      <div className="card-ink rounded-2xl bg-cream p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Your progress
            </p>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-ink/15 bg-paper">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${allItems.length ? (doneCount / allItems.length) * 100 : 0}%`,
                  background: color,
                }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-ink/70">
              {doneCount} of {allItems.length} steps done
            </p>
          </div>
          {nextItem ? (
            <Link
              href={nextItem.href}
              className="btn-ink inline-flex shrink-0 items-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold text-ink"
              style={{ background: "#e7a33c" }}
            >
              {doneCount === 0 ? "Start here" : "Pick up where you left off"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <p
              className="inline-flex -rotate-1 items-center gap-1.5 rounded-md border-2 border-ink px-3 py-1.5 text-sm font-bold text-cream shadow-[2px_2px_0_#11211c]"
              style={{ background: color }}
            >
              Path complete
            </p>
          )}
        </div>
        {nextItem && (
          <p className="mt-3 text-sm text-stone">
            Next up:{" "}
            <Link
              href={nextItem.href}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              {nextItem.title}
            </Link>
          </p>
        )}
      </div>

      {/* The spine */}
      <ol className="relative mt-10 space-y-8">
        <span
          aria-hidden
          className="absolute bottom-6 left-[1.4rem] top-2 w-0.5 bg-ink/15 sm:left-[1.65rem]"
        />
        {stages.map((stage, si) => {
          const stageDone = stage.items.every(isDone);
          const isHere = si === hereIndex;
          return (
            <li key={stage.id} className="relative flex gap-4 sm:gap-6">
              {/* Milestone number / check */}
              <span
                className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-lg font-bold sm:h-[3.3rem] sm:w-[3.3rem] sm:text-xl ${
                  stageDone ? "text-cream" : "bg-cream text-ink"
                }`}
                style={stageDone ? { background: color } : undefined}
              >
                {stageDone ? (
                  <Check className="h-5 w-5" strokeWidth={3} />
                ) : (
                  si + 1
                )}
              </span>

              <div className="min-w-0 flex-1 pb-2">
                {isHere && !finished && (
                  <p
                    className="mb-2 inline-block -rotate-1 rounded-md border-2 border-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cream shadow-[2px_2px_0_#11211c]"
                    style={{ background: color }}
                  >
                    You are here
                  </p>
                )}
                <h2 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  {stage.milestone}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-stone">
                  {stage.why}
                </p>

                <ul className="mt-4 space-y-2">
                  {stage.items.map((item) => {
                    const done = isDone(item);
                    const Icon = KIND_ICON[item.kind];
                    return (
                      <li key={`${item.kind}-${item.key}`}>
                        <Link
                          href={item.href}
                          className={`group flex items-center gap-3 rounded-xl border p-3 transition-colors sm:p-3.5 ${
                            done
                              ? "border-sand bg-paper"
                              : "border-sand bg-cream hover:border-ink/25"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                              done
                                ? "border-transparent text-cream"
                                : "border-ink/15 bg-paper"
                            }`}
                            style={
                              done
                                ? { background: color }
                                : { color }
                            }
                          >
                            {done ? (
                              <Check className="h-4 w-4" strokeWidth={3} />
                            ) : (
                              <Icon className="h-4 w-4" strokeWidth={2} />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate text-[0.95rem] font-semibold leading-snug group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 ${
                                done ? "text-ink/55" : "text-ink"
                              }`}
                              style={{ textDecorationColor: color }}
                            >
                              {item.title}
                            </span>
                            <span className="block text-xs font-medium text-stone">
                              {item.meta}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
