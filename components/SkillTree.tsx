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
import { ArrowRight, BookOpen, Check, Path as Route, Star, Wrench, X, Lightning as Zap } from "@phosphor-icons/react/dist/ssr";
import TopicMark from "@/components/TopicMark";
import SkillTreeMap from "@/components/SkillTreeMap";
import ProgressRings from "@/components/ProgressRings";
import { getReadMap } from "@/lib/readTracking";
import { loadJSON, STORAGE_KEYS } from "@/lib/storage";
import { readStarterSet, skillPointsTotal, SKILL_POINTS } from "@/lib/skillPoints";
import {
  getMasteryMap,
  markMastered,
  tierKey,
  MIN_MASTERY_POOL,
  MIN_TOPIC_POOL,
  UNIT_SIZE,
  type ActivityInfo,
  type MasteryQuestion,
} from "@/lib/skillMastery";
import MasteryQuiz from "@/components/MasteryQuiz";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { readContext, topicMatchesGoals } from "@/lib/personalization";
import { useFrame } from "@/components/useFrame";
import { frameHref } from "@/lib/frame";

// Mounted by BOTH /skills and /students/skills (July 17 mirror): every
// component in this file frames its links so guides open the mirrors.
function useFh() {
  const frame = useFrame();
  return (h: string) => frameHref(h, frame);
}
import type { SkillTreeData, SkillBranch } from "@/lib/skillTree";

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

function sideChip(done: boolean) {
  return `inline-flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-[12px] font-bold transition-colors ${
    done
      ? "border-forest/40 bg-forest/[0.08] text-forest"
      : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
  }`;
}

/** The what-and-why stop before any activity (owner, July 16: "telling
 *  them what they are doing and why they are doing it"). */
function ActivityPanel({ a, onClose }: { a: ActivityInfo; onClose: () => void }) {
  const fh = useFh();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const kindLabel = {
    starter: "Quick win",
    tool: "Tool",
    journey: "Life plan",
    course: "Course",
  }[a.kind];
  const cta = {
    starter: "Let's do it",
    tool: "Open the calculator",
    journey: "See the path",
    course: "Start the course",
  }[a.kind];
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${a.title}: what this is`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#11211c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              {kindLabel}
            </span>
            <h2 className="mt-1 font-display text-xl font-bold leading-snug text-ink">
              {a.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-stone hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>
        {a.done && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-forest">
            <Check className="h-4 w-4" weight="bold" />
            Already done — revisit any time.
          </p>
        )}
        <p className="mt-3 text-sm leading-6 text-stone">{a.blurb}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={fh(a.href)}
            className="btn-ink rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
          >
            {cta}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

/** The "what you'll learn" stop between a map bubble and the articles
 *  (owner, July 16: clicking a bubble "should jump to a second page saying
 *  what you'll learn and then link multiple articles"). */
function UnitPanel({
  b,
  ti,
  part,
  lit,
  onClose,
  onTestOut,
}: {
  b: SkillBranch;
  ti: number;
  part: number;
  lit: Lit;
  onClose: () => void;
  onTestOut: () => void;
}) {
  const fh = useFh();
  const tier = b.tiers[ti];
  const arts = tier.articles.slice(
    part * UNIT_SIZE,
    part * UNIT_SIZE + UNIT_SIZE
  );
  const parts = Math.ceil(tier.articles.length / UNIT_SIZE);
  const mastered = lit.mastered.has(tierKey(b.id, ti));
  const firstUnread = arts.find((a) => !lit.read[a.slug]);
  const canTest =
    !mastered && tier.mastery.length >= MIN_MASTERY_POOL && firstUnread;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${b.short} · ${tier.label}: what you'll learn`}
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#11211c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              What you&apos;ll learn
            </span>
            <h2 className="mt-1 font-display text-xl font-bold leading-snug text-ink">
              {b.short} · {tier.label}
              {parts > 1 ? ` — part ${part + 1} of ${parts}` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-stone hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>

        <p className="mt-2 text-sm leading-6 text-stone">
          {arts.length} short guide{arts.length === 1 ? "" : "s"}. Read them
          in any order — each one lights up on your tree the moment you
          finish it.
        </p>

        <ul className="mt-4 space-y-2">
          {arts.map((a) => {
            const read = Boolean(lit.read[a.slug]);
            const covered = read || mastered;
            return (
              <li key={a.slug}>
                <Link
                  href={fh(`${b.href}/${a.slug}`)}
                  className="group flex items-start gap-2.5 rounded-lg border-2 border-ink/10 bg-paper px-3.5 py-2.5 transition-colors hover:border-ink/40"
                >
                  {covered ? (
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        read ? "text-forest" : "text-amber"
                      }`} weight="bold"
                    />
                  ) : (
                    <BookOpen
                      className="mt-0.5 h-4 w-4 shrink-0 text-stone/60" weight="bold"
                    />
                  )}
                  <span
                    className={`text-sm font-semibold leading-6 decoration-amber decoration-2 underline-offset-4 group-hover:underline ${
                      read ? "text-stone" : "text-ink"
                    }`}
                  >
                    {a.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {firstUnread ? (
            <Link
              href={fh(`${b.href}/${firstUnread.slug}`)}
              className="btn-ink rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
            >
              Start: {firstUnread.title}
            </Link>
          ) : (
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-forest">
              <Check className="h-4 w-4" weight="bold" />
              Every guide here is read.
            </p>
          )}
        </div>
        {canTest && (
          <button
            type="button"
            onClick={onTestOut}
            className="mt-3 block text-[13px] font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Already know this? Test out of {tier.label}
          </button>
        )}
      </div>
    </div>
  );
}

function viewChip(active: boolean) {
  return `rounded-md border-2 px-3.5 py-1.5 text-[13px] font-bold transition-colors ${
    active
      ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
      : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
  }`;
}

export interface Lit {
  read: Record<string, number>;
  quizzes: Set<string>; // topic ids whose checkpoint quiz has a saved score
  badges: Set<string>; // earned course ids
  tools: Set<string>; // visited tool pathnames
  starters: Set<string>; // done First-steps action ids (see lib/skillTree)
  mastered: Set<string>; // tier keys passed via test-out (lib/skillMastery)
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

function Branch({
  b,
  lit,
  onTestOut,
}: {
  b: SkillBranch;
  lit: Lit;
  onTestOut: (b: SkillBranch, ti: number | null) => void;
}) {
  const fh = useFh();
  const readCount = b.tiers.reduce(
    (n, t) => n + t.articles.filter((a) => lit.read[a.slug]).length,
    0
  );
  const pct = b.guideTotal ? readCount / b.guideTotal : 0;
  const quizDone = lit.quizzes.has(b.id);
  const isGoal = lit.goalTopics.has(b.id);
  const masteredCount = b.tiers.filter((_, ti) =>
    lit.mastered.has(tierKey(b.id, ti))
  ).length;
  const started =
    readCount > 0 ||
    quizDone ||
    masteredCount > 0 ||
    b.courses.some((c) => lit.badges.has(c.id)) ||
    b.tools.some((t) => lit.tools.has(t.href));

  // "Where you can be heading next": first unread guide in roadmap order —
  // skipping tiers already mastered via test-out.
  const nextUp = (() => {
    for (const [ti, tier] of b.tiers.entries()) {
      if (lit.mastered.has(tierKey(b.id, ti))) continue;
      for (const a of tier.articles) if (!lit.read[a.slug]) return a;
    }
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
        <Link href={fh(b.href)} aria-label={`${b.title} guides`}>
          <ProgressRing pct={lit.mounted ? pct : 0} color={b.color}>
            <TopicMark id={b.id} color={b.color} className="h-8 w-8" />
          </ProgressRing>
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold leading-snug text-ink">
              <Link
                href={fh(b.href)}
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
        {b.tiers.map((tier, ti) => {
          const done = tier.articles.filter((a) => lit.read[a.slug]).length;
          const full = done === tier.articles.length && tier.articles.length > 0;
          const mastered = lit.mastered.has(tierKey(b.id, ti));
          const canTest =
            lit.mounted &&
            !full &&
            !mastered &&
            tier.mastery.length >= MIN_MASTERY_POOL;
          return (
            <div key={tier.label} className="relative py-1.5">
              <span
                className={`absolute -left-[27px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 ${
                  full || mastered ? "" : "bg-cream"
                }`}
                style={{
                  borderColor: b.color,
                  backgroundColor: full || mastered ? b.color : undefined,
                }}
              />
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`text-sm font-semibold ${
                    full || mastered ? "text-ink" : "text-stone"
                  }`}
                >
                  {tier.label}
                  {full && (
                    <Check className="ml-1 inline h-3.5 w-3.5 text-forest" weight="bold" />
                  )}
                  {!full && mastered && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 text-[11px] font-bold text-forest">
                      <Star
                        className="h-3 w-3 text-amber" weight="bold"
                        fill="currentColor"
                      />
                      mastered
                    </span>
                  )}
                </span>
                <span className="flex items-baseline gap-2">
                  {canTest && (
                    <button
                      type="button"
                      onClick={() => onTestOut(b, ti)}
                      className="text-[11px] font-bold text-forest underline decoration-amber decoration-2 underline-offset-2 hover:text-ink"
                    >
                      test out
                    </button>
                  )}
                  <span className="text-[12px] font-bold tabular-nums text-stone">
                    {lit.mounted ? done : 0}/{tier.articles.length}
                  </span>
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
              href={fh(`${b.href}/quiz`)}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                quizDone ? "text-ink" : "text-stone"
              } hover:text-forest hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-4`}
            >
              <Star
                className={`h-3.5 w-3.5 ${quizDone ? "text-amber" : "text-stone/50"}`} weight="bold"
                fill={quizDone ? "currentColor" : "none"}
              />
              Checkpoint quiz{quizDone ? " — passed" : ""}
            </Link>
          </div>
        )}
      </div>

      {/* Side nodes: every life plan, tool, and course on this branch */}
      {(b.journeys.length > 0 || b.tools.length > 0 || b.courses.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {b.journeys.map((j) => (
            <Link key={j.id} href={fh(`/journey/${j.id}`)} className={sideChip(false)}>
              <Route className="h-3 w-3" weight="bold" />
              {j.title}
            </Link>
          ))}
          {b.tools.map((t) => {
            const done = lit.tools.has(t.href);
            return (
              <Link key={t.href} href={fh(t.href)} className={sideChip(done)}>
                <Wrench className="h-3 w-3" weight="bold" />
                {t.label}
                {done && <Check className="h-3 w-3" weight="bold" />}
              </Link>
            );
          })}
          {b.courses.map((c) => {
            const done = lit.badges.has(c.id);
            return (
              <Link key={c.id} href={fh(`/courses/${c.id}`)} className={sideChip(done)}>
                <BadgeMedal
                  color={done ? c.color : "#9aa39b"}
                  variant="course"
                  className="h-3.5 w-3.5"
                />
                {c.title}
                {done && <Check className="h-3 w-3" weight="bold" />}
              </Link>
            );
          })}
        </div>
      )}

      {/* The frontier: where to head next */}
      <div className="mt-4 border-t border-sand pt-3">
        {nextUp && lit.mounted ? (
          <Link
            href={fh(`${b.href}/${nextUp.slug}`)}
            className="group inline-flex items-start gap-1.5 text-sm font-semibold text-forest"
          >
            <span>
              Next up:{" "}
              <span className="underline decoration-amber decoration-2 underline-offset-4 group-hover:text-ink">
                {nextUp.title}
              </span>
            </span>
            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0" weight="bold" />
          </Link>
        ) : lit.mounted ? (
          <p className="inline-flex items-center gap-1.5 text-sm font-bold text-forest">
            <Check className="h-4 w-4" weight="bold" />
            Every guide here is read. Branch complete.
          </p>
        ) : (
          <p className="text-sm font-semibold text-stone">
            Start anywhere — the tree lights up as you read.
          </p>
        )}
        {lit.mounted &&
          masteredCount < b.tiers.length &&
          nextUp !== null &&
          b.topicMastery.length >= MIN_TOPIC_POOL && (
            <button
              type="button"
              onClick={() => onTestOut(b, null)}
              className="mt-1.5 block text-[12px] font-semibold text-stone underline decoration-amber decoration-2 underline-offset-2 hover:text-ink"
            >
              Already know {b.short}? Test out of the whole topic
            </button>
          )}
      </div>
    </div>
  );
}

export default function SkillTree({ data }: { data: SkillTreeData }) {
  const fh = useFh();
  const [view, setView] = useState<"map" | "list">("map");
  const [lit, setLit] = useState<Lit>({
    read: {},
    quizzes: new Set(),
    badges: new Set(),
    tools: new Set(),
    starters: new Set(),
    mastered: new Set(),
    goalTopics: new Set(),
    mounted: false,
  });
  /** Open test-out: ti === null means the whole topic. */
  const [testOut, setTestOut] = useState<{
    b: SkillBranch;
    ti: number | null;
  } | null>(null);
  /** Open what-you'll-learn unit panel (a bubble's bundle of guides). */
  const [unit, setUnit] = useState<{
    b: SkillBranch;
    ti: number;
    part: number;
  } | null>(null);
  /** Open activity what-and-why panel (tools/plans/courses/quick wins). */
  const [activity, setActivity] = useState<ActivityInfo | null>(null);

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
    const visited =
      loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
    const tools = new Set(Object.keys(visited));

    // First-steps actions, proven done by the trackers that already exist
    // (shared reader — the same set feeds the skill-points score).
    const starters = readStarterSet();
    const mastered = new Set(Object.keys(getMasteryMap()));

    const ctx = readContext();
    const goalTopics = new Set(
      data.branches.filter((b) => topicMatchesGoals(b.id, ctx)).map((b) => b.id)
    );
    setLit({
      read,
      quizzes,
      badges,
      tools,
      starters,
      mastered,
      goalTopics,
      mounted: true,
    });
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
    ? data.branches.reduce(
        (n, b) => n + b.courses.filter((c) => lit.badges.has(c.id)).length,
        0
      )
    : 0;
  const toolsUsed = lit.mounted
    ? [...lit.tools].filter(
        (p) => p.startsWith("/tools/") || p.startsWith("/students/tools/")
      ).length
    : 0;

  // Skill points — derived from the counts above, never stored.
  const points = skillPointsTotal({
    guides: guidesRead,
    quizzes: quizzesDone,
    courses: coursesDone,
    tools: toolsUsed,
    starters: lit.mounted ? lit.starters.size : 0,
    mastered: lit.mounted ? lit.mastered.size : 0,
  });

  // Test-out plumbing: which questions, what passing means, what a pass marks.
  const testQuestions: MasteryQuestion[] =
    testOut === null
      ? []
      : testOut.ti === null
        ? testOut.b.topicMastery
        : testOut.b.tiers[testOut.ti].mastery;
  const testNeed = Math.ceil(testQuestions.length * 0.8);
  const testNextUnread = (() => {
    if (testOut === null) return undefined;
    const tiers =
      testOut.ti === null ? testOut.b.tiers : [testOut.b.tiers[testOut.ti]];
    for (const tier of tiers)
      for (const a of tier.articles)
        if (!lit.read[a.slug]) return `${testOut.b.href}/${a.slug}`;
    return undefined;
  })();
  const handlePass = (score: number) => {
    if (testOut === null) return;
    const keys =
      testOut.ti === null
        ? testOut.b.tiers.map((_, i) => tierKey(testOut.b.id, i))
        : [tierKey(testOut.b.id, testOut.ti)];
    markMastered(keys, score, testQuestions.length);
    setLit((prev) => ({
      ...prev,
      mastered: new Set(Object.keys(getMasteryMap())),
    }));
  };

  return (
    <div>
      {/* Skill points — recomputed live from the trackers, follows the
          profile because the trackers sync. Never stored, can't drift. */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border-2 border-ink bg-forest px-5 py-4 text-cream shadow-[4px_4px_0_#11211c]">
        <div>
          <div className="font-display text-3xl font-bold tabular-nums text-amber">
            {points.toLocaleString()}
            <span className="ml-2 text-lg font-semibold text-cream">
              skill points
            </span>
          </div>
          <p className="mt-0.5 text-[13px] font-semibold text-cream/70">
            guides {SKILL_POINTS.guide} · tools {SKILL_POINTS.tool} · quick
            wins {SKILL_POINTS.starter} · quizzes {SKILL_POINTS.quiz} ·
            mastery tests {SKILL_POINTS.mastery} · courses{" "}
            {SKILL_POINTS.course} — counted from what you&apos;ve actually
            done
          </p>
        </div>
        <Link
          href="/account"
          className="text-sm font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
        >
          They live on your profile
        </Link>
      </div>

      {/* Canopy: overall progress as nested rings (owner ask July 17 —
          the Apple Activity card, in house colors). Server paints every
          ring empty; the trackers hydrate above and the rings draw in. */}
      {(() => {
        const canopy = [
          { label: "guides read", done: guidesRead, total: data.guidesTotal, color: "#15624b" },
          { label: "checkpoint quizzes", done: quizzesDone, total: data.quizzesTotal, color: "#c9842a" },
          { label: "flagship courses", done: coursesDone, total: data.coursesTotal, color: "#d26a4c" },
          { label: "tools tried", done: toolsUsed, total: data.toolsTotal, color: "#2f6d80" },
        ];
        return (
          <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-ink/10 bg-cream p-6 sm:flex-row sm:gap-10 sm:p-7">
            <ProgressRings items={canopy} />
            <div className="grid w-full flex-1 grid-cols-2 gap-x-6 gap-y-4">
              {canopy.map((c) => (
                <div key={c.label}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone">
                    {c.label}
                  </div>
                  <div
                    className="font-display text-3xl font-bold tabular-nums"
                    style={{ color: c.color }}
                  >
                    {c.done}
                    <span className="text-lg font-semibold text-stone">
                      /{c.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* View toggle — the radial map IS the tree; the list keeps the detail */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setView("map")}
            aria-pressed={view === "map"}
            className={viewChip(view === "map")}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={viewChip(view === "list")}
          >
            Branch list
          </button>
        </div>
        {view === "map" && (
          <div className="flex flex-col items-end gap-1 text-[11px] font-semibold text-stone">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-ink bg-forest" />
                done
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-forest bg-forest/25" />
                in progress
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-forest/40 bg-cream" />
                not yet
              </span>
              <span>· drag to explore — every circle is a link</span>
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3" weight="bold" /> guide
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="h-3 w-3" weight="bold" /> quick win
              </span>
              <span className="inline-flex items-center gap-1">
                <Wrench className="h-3 w-3" weight="bold" /> tool
              </span>
              <span className="inline-flex items-center gap-1">
                <BadgeMedal color="#5f6b64" variant="course" className="h-3 w-3" />{" "}
                course
              </span>
              <span className="inline-flex items-center gap-1">
                <Route className="h-3 w-3" weight="bold" /> life plan
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" weight="bold" /> quiz
              </span>
            </p>
          </div>
        )}
      </div>

      {activity !== null && (
        <ActivityPanel a={activity} onClose={() => setActivity(null)} />
      )}

      {unit !== null && (
        <UnitPanel
          b={unit.b}
          ti={unit.ti}
          part={unit.part}
          lit={lit}
          onClose={() => setUnit(null)}
          onTestOut={() => {
            setTestOut({ b: unit.b, ti: unit.ti });
            setUnit(null);
          }}
        />
      )}

      {testOut !== null && testQuestions.length > 0 && (
        <MasteryQuiz
          title={
            testOut.ti === null
              ? `All of ${testOut.b.short}`
              : `${testOut.b.short} · ${testOut.b.tiers[testOut.ti].label}`
          }
          questions={testQuestions}
          need={testNeed}
          continueHref={testNextUnread ? fh(testNextUnread) : undefined}
          continueLabel="Keep reading instead"
          alt={
            testOut.ti !== null &&
            testOut.b.topicMastery.length >= MIN_TOPIC_POOL
              ? {
                  label: `Or test out of all of ${testOut.b.short} at once`,
                  onClick: () => setTestOut({ b: testOut.b, ti: null }),
                }
              : undefined
          }
          onPass={handlePass}
          onClose={() => setTestOut(null)}
        />
      )}

      {view === "map" ? (
        <div className="mt-4">
          <SkillTreeMap
            data={data}
            lit={lit}
            points={points}
            onTestOut={(b, ti) => setTestOut({ b, ti })}
            onUnitOpen={(b, ti, part) => setUnit({ b, ti, part })}
            onActivityOpen={(a) => setActivity(a)}
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="card-ink flex flex-col rounded-2xl bg-cream p-5">
            <h3 className="font-display text-lg font-bold leading-snug text-ink">
              First steps
            </h3>
            <p className="mt-0.5 text-[13px] font-semibold tabular-nums text-stone">
              {lit.mounted ? lit.starters.size : 0} of {data.starters.length}{" "}
              quick wins done
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.starters.map((s) => {
                const done = lit.starters.has(s.id);
                return (
                  <Link key={s.id} href={fh(s.href)} className={sideChip(done)}>
                    {s.label}
                    {done && <Check className="h-3 w-3" weight="bold" />}
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 border-t border-sand pt-3 text-sm font-semibold text-stone">
              The quick wins that make the site yours — each one takes a few
              minutes.
            </p>
          </div>
          {ordered.map((b) => (
            <Branch
              key={b.id}
              b={b}
              lit={lit}
              onTestOut={(bb, ti) => setTestOut({ b: bb, ti })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
