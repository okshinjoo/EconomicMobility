"use client";

// The skill tree (July 16, 2026). Nine branches — one per topic — each a
// vertical trunk: topic node with a live progress ring → roadmap tier nodes
// → the topic quiz as the branch's "boss" checkpoint → tool + course side
// nodes. Everything lights up from EXISTING trackers post-mount (read map,
// quiz scores, course badges, visited tools) — pure derivation, nothing new
// stored. Goal-aware: branches serving the person's saved goals lead
// (personalization engine). Memory contract: every branch always renders;
// undone nodes dim, never hide, never lock. Server renders the zero-progress
// tree, so no hydration mismatch.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Star, Wrench } from "lucide-react";
import TopicMark from "@/components/TopicMark";
import { getReadMap } from "@/lib/readTracking";
import { loadJSON, STORAGE_KEYS } from "@/lib/storage";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { readContext, topicMatchesGoals } from "@/lib/personalization";
import type { SkillTreeData, SkillBranch } from "@/lib/skillTree";

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

interface Lit {
  read: Record<string, number>;
  quizzes: Set<string>; // topic ids whose checkpoint quiz has a saved score
  badges: Set<string>; // earned course ids
  tools: Set<string>; // visited tool pathnames
  goalTopics: Set<string>;
  mounted: boolean;
}

function ProgressRing({
  pct,
  color,
  children,
}: {
  pct: number;
  color: string;
  children: React.ReactNode;
}) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex h-[76px] w-[76px] items-center justify-center">
      <svg viewBox="0 0 76 76" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="38" cy="38" r={r} fill="none" stroke="#e7e0d0" strokeWidth="5" />
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      {children}
    </span>
  );
}

function Branch({ b, lit }: { b: SkillBranch; lit: Lit }) {
  const readCount = b.tiers.reduce(
    (n, t) => n + t.articles.filter((a) => lit.read[a.slug]).length,
    0
  );
  const pct = b.guideTotal ? readCount / b.guideTotal : 0;
  const quizDone = lit.quizzes.has(b.id);
  const courseDone = b.course ? lit.badges.has(b.course.id) : false;
  const toolDone = b.tool ? lit.tools.has(b.tool.href) : false;
  const isGoal = lit.goalTopics.has(b.id);
  const started = readCount > 0 || quizDone || courseDone || toolDone;

  // "Where you can be heading next": first unread guide in roadmap order.
  const nextUp = (() => {
    for (const tier of b.tiers)
      for (const a of tier.articles) if (!lit.read[a.slug]) return a;
    return null;
  })();

  return (
    <div
      className={`card-ink flex flex-col rounded-2xl bg-cream p-5 transition-opacity ${
        lit.mounted && !started ? "opacity-80" : ""
      }`}
    >
      {/* Topic node */}
      <div className="flex items-center gap-4">
        <Link href={b.href} aria-label={`${b.title} guides`}>
          <ProgressRing pct={lit.mounted ? pct : 0} color={b.color}>
            <TopicMark id={b.id} color={b.color} className="h-8 w-8" />
          </ProgressRing>
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold leading-snug text-ink">
              <Link
                href={b.href}
                className="hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-4"
              >
                {b.short}
              </Link>
            </h3>
            {isGoal && (
              <span className="rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest">
                Your goal
              </span>
            )}
          </div>
          <p className="text-[13px] font-semibold tabular-nums text-stone">
            {lit.mounted ? readCount : 0} of {b.guideTotal} guides read
          </p>
        </div>
      </div>

      {/* Trunk: tier nodes */}
      <div className="mt-4 ml-[37px] border-l-2 pl-5" style={{ borderColor: `${b.color}44` }}>
        {b.tiers.map((tier) => {
          const done = tier.articles.filter((a) => lit.read[a.slug]).length;
          const full = done === tier.articles.length && tier.articles.length > 0;
          return (
            <div key={tier.label} className="relative py-1.5">
              <span
                className={`absolute -left-[27px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 ${
                  full ? "" : "bg-cream"
                }`}
                style={{
                  borderColor: b.color,
                  backgroundColor: full ? b.color : undefined,
                }}
              />
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`text-sm font-semibold ${full ? "text-ink" : "text-stone"}`}
                >
                  {tier.label}
                  {full && (
                    <Check className="ml-1 inline h-3.5 w-3.5 text-forest" strokeWidth={3} />
                  )}
                </span>
                <span className="text-[12px] font-bold tabular-nums text-stone">
                  {lit.mounted ? done : 0}/{tier.articles.length}
                </span>
              </div>
            </div>
          );
        })}

        {/* Boss node: the topic checkpoint quiz */}
        {b.hasQuiz && (
          <div className="relative py-1.5">
            <span
              className={`absolute -left-[28px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-2 ${
                quizDone ? "" : "bg-cream"
              }`}
              style={{
                borderColor: b.color,
                backgroundColor: quizDone ? b.color : undefined,
              }}
            />
            <Link
              href={`${b.href}/quiz`}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                quizDone ? "text-ink" : "text-stone"
              } hover:text-forest hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-4`}
            >
              <Star
                className={`h-3.5 w-3.5 ${quizDone ? "text-amber" : "text-stone/50"}`}
                strokeWidth={2.5}
                fill={quizDone ? "currentColor" : "none"}
              />
              Checkpoint quiz{quizDone ? " — passed" : ""}
            </Link>
          </div>
        )}
      </div>

      {/* Side nodes: tool + course */}
      {(b.tool || b.course) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {b.tool && (
            <Link
              href={b.tool.href}
              className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-[12px] font-bold transition-colors ${
                toolDone
                  ? "border-forest/40 bg-forest/[0.08] text-forest"
                  : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
              }`}
            >
              <Wrench className="h-3 w-3" strokeWidth={2.5} />
              {b.tool.label}
              {toolDone && <Check className="h-3 w-3" strokeWidth={3} />}
            </Link>
          )}
          {b.course && (
            <Link
              href={`/courses/${b.course.id}`}
              className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-[12px] font-bold transition-colors ${
                courseDone
                  ? "border-forest/40 bg-forest/[0.08] text-forest"
                  : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
              }`}
            >
              <BadgeMedal
                color={courseDone ? b.course.color : "#9aa39b"}
                variant="course"
                className="h-3.5 w-3.5"
              />
              {b.course.title}
              {courseDone && <Check className="h-3 w-3" strokeWidth={3} />}
            </Link>
          )}
        </div>
      )}

      {/* The frontier: where to head next */}
      <div className="mt-4 border-t border-sand pt-3">
        {nextUp && lit.mounted ? (
          <Link
            href={`${b.href}/${nextUp.slug}`}
            className="group inline-flex items-start gap-1.5 text-sm font-semibold text-forest"
          >
            <span>
              Next up:{" "}
              <span className="underline decoration-amber decoration-2 underline-offset-4 group-hover:text-ink">
                {nextUp.title}
              </span>
            </span>
            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
          </Link>
        ) : lit.mounted ? (
          <p className="inline-flex items-center gap-1.5 text-sm font-bold text-forest">
            <Check className="h-4 w-4" strokeWidth={3} />
            Every guide here is read. Branch complete.
          </p>
        ) : (
          <p className="text-sm font-semibold text-stone">
            Start anywhere — the tree lights up as you read.
          </p>
        )}
      </div>
    </div>
  );
}

export default function SkillTree({ data }: { data: SkillTreeData }) {
  const [lit, setLit] = useState<Lit>({
    read: {},
    quizzes: new Set(),
    badges: new Set(),
    tools: new Set(),
    goalTopics: new Set(),
    mounted: false,
  });

  useEffect(() => {
    const read = getReadMap();
    const scores =
      loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {};
    const quizzes = new Set(
      Object.keys(scores)
        .filter((k) => k.startsWith("topic-quiz:"))
        .map((k) => k.slice("topic-quiz:".length))
    );
    const badges = new Set(Object.keys(getBadges()));
    const tools = new Set(
      Object.keys(loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {})
    );
    const ctx = readContext();
    const goalTopics = new Set(
      data.branches.filter((b) => topicMatchesGoals(b.id, ctx)).map((b) => b.id)
    );
    setLit({ read, quizzes, badges, tools, goalTopics, mounted: true });
  }, [data.branches]);

  // Goal branches lead; everything else keeps the canonical topic order.
  const ordered = useMemo(() => {
    if (!lit.mounted || lit.goalTopics.size === 0) return data.branches;
    return [
      ...data.branches.filter((b) => lit.goalTopics.has(b.id)),
      ...data.branches.filter((b) => !lit.goalTopics.has(b.id)),
    ];
  }, [data.branches, lit]);

  // Header stats — all derived.
  const guidesRead = lit.mounted
    ? data.branches.reduce(
        (n, b) =>
          n +
          b.tiers.reduce(
            (m, t) => m + t.articles.filter((a) => lit.read[a.slug]).length,
            0
          ),
        0
      )
    : 0;
  const quizzesDone = lit.mounted
    ? data.branches.filter((b) => b.hasQuiz && lit.quizzes.has(b.id)).length
    : 0;
  const coursesDone = lit.mounted
    ? data.branches.filter((b) => b.course && lit.badges.has(b.course.id)).length
    : 0;
  const toolsUsed = lit.mounted ? lit.tools.size : 0;

  return (
    <div>
      {/* Canopy: overall progress */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(
          [
            [guidesRead, data.guidesTotal, "guides read"],
            [quizzesDone, data.quizzesTotal, "checkpoint quizzes"],
            [coursesDone, data.coursesTotal, "flagship courses"],
            [toolsUsed, data.toolsTotal, "tools tried"],
          ] as const
        ).map(([done, total, label]) => (
          <div key={label} className="rounded-2xl border-2 border-ink/10 bg-cream p-4">
            <div className="font-display text-3xl font-bold tabular-nums text-forest">
              {done}
              <span className="text-lg font-semibold text-stone">/{total}</span>
            </div>
            <div className="mt-0.5 text-[13px] font-semibold text-stone">{label}</div>
          </div>
        ))}
      </div>

      {/* The nine branches */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ordered.map((b) => (
          <Branch key={b.id} b={b} lit={lit} />
        ))}
      </div>
    </div>
  );
}
