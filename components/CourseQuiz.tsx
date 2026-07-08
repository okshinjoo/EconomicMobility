"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, Lock, Award } from "lucide-react";
import type { CourseQuizQuestion } from "@/lib/courses";
import { PASS_PERCENT } from "@/lib/courses";
import { getReadMap } from "@/lib/readTracking";
import { loadJSON, saveJSON } from "@/lib/storage";
import BadgeBurst from "@/components/BadgeBurst";

const BADGES_KEY = "empower:course-badges:v1";

export interface CourseBadge {
  earnedAt: number;
  score: number;
  total: number;
}
export type BadgeMap = Record<string, CourseBadge>;

export function getBadges(): BadgeMap {
  return loadJSON<BadgeMap>(BADGES_KEY) ?? {};
}

/** The just-for-fun rosette. Also used on the courses hub. */
export function BadgeMedal({
  color,
  className = "h-16 w-16",
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      {/* ribbon tails */}
      <path d="M22 38 16 60l8-6 6 8 4-22Z" fill={color} opacity="0.55" />
      <path d="M42 38l6 22-8-6-6 8-4-22Z" fill={color} opacity="0.55" />
      {/* scalloped rosette */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={32 + Math.cos(a) * 15}
            cy={26 + Math.sin(a) * 15}
            r="6"
            fill={color}
          />
        );
      })}
      <circle cx="32" cy="26" r="15.5" fill={color} />
      <circle cx="32" cy="26" r="11" fill="#fbf8f1" />
      <path
        d="m26.5 26.5 3.5 3.5 7.5-8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ArticleRef {
  slug: string;
  title: string;
  href: string;
}

export default function CourseQuiz({
  courseId,
  courseTitle,
  questions,
  accent,
  articles,
}: {
  courseId: string;
  courseTitle: string;
  questions: CourseQuizQuestion[];
  accent: string;
  /** The course's articles (for the gate and wrong-answer review links). */
  articles: ArticleRef[];
}) {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [forced, setForced] = useState(false);
  const [unread, setUnread] = useState<ArticleRef[]>([]);
  const [picked, setPicked] = useState<(number | undefined)[]>(() =>
    new Array(questions.length).fill(undefined)
  );
  const [graded, setGraded] = useState(false);
  const [badge, setBadge] = useState<CourseBadge | null>(null);

  useEffect(() => {
    const read = getReadMap();
    const remaining = articles.filter((a) => !read[a.slug]);
    setUnread(remaining);
    setUnlocked(remaining.length === 0);
    setBadge(getBadges()[courseId] ?? null);
    setMounted(true);
  }, [articles, courseId]);

  const answered = picked.filter((p) => p !== undefined).length;
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const passed = score / questions.length >= PASS_PERCENT / 100;

  const [celebrate, setCelebrate] = useState(false);

  const grade = () => {
    setGraded(true);
    if (passed) {
      const map = getBadges();
      if (!map[courseId]) {
        setCelebrate(true);
        const earned: CourseBadge = {
          earnedAt: Date.now(),
          score,
          total: questions.length,
        };
        map[courseId] = earned;
        saveJSON(BADGES_KEY, map);
        setBadge(earned);
      }
    }
  };

  const retake = () => {
    setPicked(new Array(questions.length).fill(undefined));
    setGraded(false);
  };

  const byArticle = new Map(articles.map((a) => [a.slug, a]));

  if (!mounted) return null;

  // ── Locked state ──────────────────────────────────────────────────────────
  if (!unlocked && !forced) {
    return (
      <div className="rounded-2xl border border-sand bg-cream p-6 sm:p-8">
        <p className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <Lock className="h-5 w-5 text-stone" />
          The final quiz unlocks when you&apos;ve read the module
        </p>
        <p className="mt-2 text-sm leading-6 text-stone">
          {unread.length} guide{unread.length === 1 ? "" : "s"} to go:
        </p>
        <ul className="mt-3 space-y-2">
          {unread.map((a) => (
            <li key={a.slug}>
              <Link
                href={a.href}
                className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setForced(true)}
          className="mt-5 text-xs font-medium text-stone underline underline-offset-4 hover:text-ink"
        >
          Already know this material? Take the quiz anyway
        </button>
      </div>
    );
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl border border-sand bg-cream p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          Final quiz
        </h3>
        {badge && !graded && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
            <Award className="h-4 w-4" />
            Badge earned {badge.score}/{badge.total}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm leading-6 text-stone">
        {questions.length} questions across the whole module. Answer them all,
        then grade yourself. Getting one wrong just points you back to the
        right guide.
      </p>

      <ol className="mt-6 space-y-8">
        {questions.map((q, qi) => {
          const chosen = picked[qi];
          const source = byArticle.get(q.sourceSlug);
          return (
            <li key={qi}>
              <p className="font-semibold leading-snug text-ink">
                <span className="mr-2 font-display tabular-nums" style={{ color: accent }}>
                  {qi + 1}.
                </span>
                {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === q.answer;
                  let cls = isChosen
                    ? "border-ink/50 bg-paper-deep"
                    : "border-sand bg-paper hover:border-ink/30";
                  if (graded) {
                    if (isCorrect) cls = "border-forest bg-forest/[0.08]";
                    else if (isChosen) cls = "border-terracotta bg-terracotta/[0.08]";
                    else cls = "border-sand bg-paper opacity-60";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={graded}
                      onClick={() =>
                        setPicked((prev) => {
                          const next = [...prev];
                          next[qi] = oi;
                          return next;
                        })
                      }
                      className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[0.95rem] leading-6 text-ink transition-colors disabled:cursor-default ${cls}`}
                    >
                      {graded && isCorrect && (
                        <Check className="mt-1 h-4 w-4 shrink-0 text-forest" strokeWidth={3} />
                      )}
                      {graded && isChosen && !isCorrect && (
                        <X className="mt-1 h-4 w-4 shrink-0 text-terracotta" strokeWidth={3} />
                      )}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {graded && (
                <div className="mt-3 rounded-lg bg-paper-deep px-4 py-3 text-sm leading-6 text-stone">
                  {chosen === q.answer ? "Right. " : "Not quite. "}
                  {q.explain}
                  {chosen !== q.answer && source && (
                    <>
                      {" "}
                      <Link
                        href={source.href}
                        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                      >
                        Review: {source.title}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!graded ? (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-sand pt-5">
          <span className="text-sm font-medium text-stone">
            {answered} of {questions.length} answered
          </span>
          <button
            type="button"
            onClick={grade}
            disabled={answered < questions.length}
            className="rounded-md bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-deep hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            Grade my answers
          </button>
        </div>
      ) : (
        <div className="mt-8 border-t border-sand pt-6">
          {passed ? (
            <div className="flex flex-wrap items-center gap-5">
              <BadgeBurst fire={celebrate}>
                <BadgeMedal color={accent} />
              </BadgeBurst>
              <div>
                <p className="font-display text-xl font-semibold text-ink">
                  {score}/{questions.length} — you&apos;ve mastered {courseTitle}.
                </p>
                <p className="mt-1 text-sm leading-6 text-stone">
                  Badge earned. It lives on the Courses page (and only on this
                  device — it&apos;s just for fun).
                </p>
              </div>
            </div>
          ) : (
            <p className="font-semibold text-ink">
              {score}/{questions.length}.
              <span className="ml-2 font-normal text-stone">
                No sweat — the review links above point exactly where to look.
                Pass is {PASS_PERCENT}%.
              </span>
            </p>
          )}
          <button
            type="button"
            onClick={retake}
            className="mt-4 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            {passed ? "Take it again for fun" : "Try again"}
          </button>
        </div>
      )}
    </div>
  );
}
