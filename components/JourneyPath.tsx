"use client";

// The guided-path page body, in the Base44 roadmap layout the owner picked
// (direct copy, July 2026): a sticky left card with a winding trail SVG —
// START to FINISH, milestone nodes, a glowing green progress stroke, a
// pulsing "you are here" ring — beside the milestone cards with their guide
// checklists. Progress stays DERIVED from the same trackers the rest of the
// site writes (read map, visited tools, course/challenge badges, topic-quiz
// scores) — nothing new is stored, and the done marks are read-only honest
// state, not clickable checkboxes.
//
// Memory contract: items never hide when done — they check off and the
// "you are here" marker advances. The server render shows the neutral
// zero-progress state (no hydration mismatch); the trail draws itself in
// when the real progress loads client-side.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Check, Flag, GraduationCap, ListChecks } from "@phosphor-icons/react/dist/ssr";
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

type StageStatus = "completed" | "current" | "upcoming";

/* --- The winding trail (Base44 geometry, our palette) ------------------- */

// Path length measured once in-browser; the draw-in animation needs it.
const TRAIL =
  "M 150 34 C 150 74, 292 92, 222 144 C 152 202, 128 242, 78 302 C 38 362, 182 412, 232 464 C 282 522, 118 582, 150 682";
const TRAIL_LEN = 870;
// Milestone nodes along the trail (4 stages — every journey has 4).
const NODES = [
  { x: 222, y: 144 },
  { x: 78, y: 302 },
  { x: 232, y: 464 },
  { x: 150, y: 682 },
];
// Small waypoint dots that light up as steps complete.
const DOTS = [
  { x: 162, y: 58 },
  { x: 228, y: 92 },
  { x: 260, y: 122 },
  { x: 196, y: 184 },
  { x: 122, y: 234 },
  { x: 90, y: 274 },
  { x: 52, y: 340 },
  { x: 170, y: 394 },
  { x: 222, y: 438 },
  { x: 270, y: 504 },
  { x: 152, y: 566 },
  { x: 146, y: 642 },
];

function RoadmapTrail({
  fraction,
  statuses,
}: {
  fraction: number;
  statuses: StageStatus[];
}) {
  // The stroke animates from whatever was last painted to `drawn`. Arming it
  // two frames after `fraction` changes guarantees the browser paints the
  // starting state first — so the trail visibly fills in on every visit,
  // instead of sometimes snapping when hydration outruns the first paint.
  const [drawn, setDrawn] = useState(0);
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDrawn(fraction));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [fraction]);
  const litDots = Math.round(drawn * DOTS.length);
  return (
    <div className="relative w-full" aria-hidden>
      <svg
        viewBox="0 0 300 745"
        className="h-auto w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="trailGreen" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#1f9069" />
            <stop offset="50%" stopColor="#15624b" />
            <stop offset="100%" stopColor="#0c4a39" />
          </linearGradient>
          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="startGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(31,144,105,0.3)" />
            <stop offset="100%" stopColor="rgba(31,144,105,0)" />
          </radialGradient>
        </defs>

        <text
          x="150"
          y="18"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#44514a"
          letterSpacing="3"
        >
          START
        </text>
        <circle cx="150" cy="34" r="20" fill="url(#startGlow)" />

        {/* Waypoint dots */}
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={i < litDots ? 3 : 2.5}
            fill={i < litDots ? "#1f9069" : "#e4d8c1"}
            style={{ transition: `fill 0.4s ease ${0.3 + i * 0.04}s` }}
          />
        ))}

        {/* Dashed track, then the glowing progress stroke over it */}
        <path
          d={TRAIL}
          stroke="#e4d8c1"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 12"
          opacity="0.8"
        />
        <path
          d={TRAIL}
          stroke="url(#trailGreen)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#trailGlow)"
          style={{
            strokeDasharray: TRAIL_LEN,
            strokeDashoffset: TRAIL_LEN * (1 - drawn),
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Start marker */}
        <circle cx="150" cy="34" r="7" fill="#0c4a39" />
        <circle cx="150" cy="34" r="3.5" fill="#fbf8f1" />

        {/* Milestone nodes */}
        {NODES.map((n, i) => {
          const status = statuses[i] ?? "upcoming";
          const done = status === "completed";
          const here = status === "current";
          return (
            <g key={i}>
              {here && (
                <circle
                  className="roadmap-pulse"
                  cx={n.x}
                  cy={n.y}
                  r="16"
                  fill="none"
                  stroke="#e7a33c"
                  strokeWidth="2"
                />
              )}
              {done && (
                <circle cx={n.x} cy={n.y} r="20" fill="rgba(12,74,57,0.1)" />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r="16"
                fill={done ? "#0c4a39" : "#fbf8f1"}
                stroke={done ? "#0c4a39" : here ? "#e7a33c" : "#e4d8c1"}
                strokeWidth="2.5"
                style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
              />
              {done ? (
                <path
                  d={`M ${n.x - 5} ${n.y + 1} L ${n.x - 1} ${n.y + 5} L ${n.x + 5} ${n.y - 4}`}
                  stroke="#fbf8f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ) : (
                <text
                  x={n.x}
                  y={n.y + 4.5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={here ? "#e7a33c" : "#44514a"}
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}

        <text
          x="150"
          y="732"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#44514a"
          letterSpacing="3"
        >
          FINISH
        </text>
      </svg>
    </div>
  );
}

/* --- The page body ------------------------------------------------------ */

export default function JourneyPath({
  stages,
}: {
  stages: PathStage[];
  /** Kept for the page's call signature; the roadmap look is single-palette. */
  color?: string;
}) {
  const isDone = useDoneChecker();

  const allItems = stages.flatMap((s) => s.items);
  const doneCount = allItems.filter(isDone).length;
  const fraction = allItems.length ? doneCount / allItems.length : 0;
  const nextItem = allItems.find((i) => !isDone(i)) ?? null;
  // "You are here" = first stage with anything left to do.
  const hereIndex = stages.findIndex((s) => s.items.some((i) => !isDone(i)));
  const finished = hereIndex === -1;
  const statuses: StageStatus[] = stages.map((s, i) =>
    s.items.every(isDone)
      ? "completed"
      : i === hereIndex
        ? "current"
        : "upcoming"
  );

  // "7/16" rolls up from 0 while the trail draws itself in.
  const [shownCount, setShownCount] = useState(0);
  useEffect(() => {
    if (shownCount === doneCount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShownCount(doneCount);
      return;
    }
    const from = shownCount;
    const t0 = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShownCount(Math.round(from + (doneCount - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneCount]);

  return (
    <div className="grid items-start gap-8 md:grid-cols-2">
      {/* Sticky trail card */}
      <div className="md:sticky md:top-24">
        <div
          className="relative overflow-hidden rounded-3xl border-2 border-ink/10 p-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,144,105,0.14), #fbf8f1 45%)",
          }}
        >
          <div className="mb-2 text-center">
            <p className="font-display text-4xl font-bold text-forest">
              {shownCount}
              <span className="text-xl text-stone">/{allItems.length}</span>
            </p>
            <p className="text-xs uppercase tracking-wider text-stone">
              steps completed
            </p>
          </div>

          <RoadmapTrail fraction={fraction} statuses={statuses} />

          {nextItem ? (
            <div className="mt-4 rounded-xl border border-amber/20 bg-amber/10 p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-stone">
                Next up
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium leading-tight text-ink">
                  {nextItem.title}
                </p>
                <Link
                  href={nextItem.href}
                  className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-deep transition-colors hover:text-ink"
                >
                  {doneCount === 0 ? "Start" : "Continue"}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-forest/20 bg-forest/10 p-4 text-center">
              <p className="font-display text-lg font-bold text-forest">
                Path complete!
              </p>
              <p className="text-xs text-stone">
                You&apos;ve finished every step.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Milestone cards */}
      <div className="space-y-4">
        {stages.map((stage, si) => {
          const status = statuses[si];
          const stageDone = status === "completed";
          const isHere = status === "current" && !finished;
          return (
            <div
              key={stage.id}
              className={`rounded-2xl border-2 bg-cream p-5 transition ${
                isHere
                  ? "border-amber shadow-lg"
                  : stageDone
                    ? "border-forest/30"
                    : "border-ink/10"
              }`}
            >
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold ${
                    stageDone
                      ? "bg-forest text-cream"
                      : isHere
                        ? "bg-amber/15 text-amber-deep"
                        : "bg-paper text-stone"
                  }`}
                >
                  {stageDone ? <Check className="h-5 w-5" /> : si + 1}
                </div>
                <div className="min-w-0 flex-1">
                  {isHere && (
                    <span className="mb-1 inline-block rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                      You are here
                    </span>
                  )}
                  <h2 className="font-display text-lg font-bold leading-tight text-ink">
                    {stage.milestone}
                  </h2>
                  <p className="mt-0.5 text-sm text-stone">{stage.why}</p>
                </div>
              </div>

              <div className="space-y-2">
                {stage.items.map((item) => {
                  const done = isDone(item);
                  const Icon = KIND_ICON[item.kind];
                  return (
                    <div
                      key={`${item.kind}-${item.key}`}
                      className={`group flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                        done
                          ? "border-forest/15 bg-forest/5"
                          : "border-sand bg-paper hover:border-ink/20"
                      }`}
                    >
                      {/* Derived done state — a marker, not a button */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                          done
                            ? "border-forest bg-forest text-cream"
                            : "border-sand bg-cream text-stone"
                        }`}
                      >
                        {done ? (
                          <Check className="h-3.5 w-3.5" weight="bold" />
                        ) : (
                          <Icon
                            className="h-3 w-3 transition-transform duration-200 motion-safe:group-hover:rotate-3 motion-safe:group-hover:scale-110"
                          />
                        )}
                      </span>
                      <Link href={item.href} className="min-w-0 flex-1">
                        <span
                          className={`text-sm font-medium transition-colors hover:text-amber-deep ${
                            done ? "text-stone line-through" : "text-ink"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                      <span className="shrink-0 text-xs text-stone">
                        {item.meta}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
