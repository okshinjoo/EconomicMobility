"use client";

// The signed-in half of /account: a member dashboard, not a settings form.
// Everything renders from the same localStorage the whole site writes (and
// the account syncs), so it needs no extra network calls: stats up top, the
// badge case, per-topic reading progress, the quiz profile, and a "keep
// going" pointer that reuses the WelcomeBack recommendation logic.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { getChallengeBadges } from "@/components/ChallengeChecklist";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

interface EarnedBadge extends BadgeSource {
  earnedAt: number;
}

interface NextStep {
  title: string;
  href: string;
  topicShort: string;
  color: string;
}

interface TopicProgressRow {
  id: string;
  short: string;
  href: string;
  color: string;
  read: number;
  total: number;
}

export default function AccountDashboard({
  email,
  displayName,
  paths,
  badgeSources,
  onSignOut,
}: {
  email: string;
  displayName: string;
  paths: TopicPath[];
  badgeSources: BadgeSource[];
  onSignOut: () => void;
}) {
  const [stats, setStats] = useState({ guides: 0, quizzes: 0, tools: 0 });
  const [earned, setEarned] = useState<EarnedBadge[]>([]);
  const [progress, setProgress] = useState<TopicProgressRow[]>([]);
  const [next, setNext] = useState<NextStep | null>(null);
  const [quizTopics, setQuizTopics] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const read = getReadMap();
    const readSlugs = Object.keys(read);

    // Stats. Blog reads are namespaced blog/<slug>; guides are everything else.
    const quizzes = Object.keys(
      loadJSON<Record<string, unknown>>("empower:article-quizzes:v1") ?? {}
    ).length;
    const tools = Object.keys(
      loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {}
    ).length;
    setStats({
      guides: readSlugs.filter((s) => !s.startsWith("blog/")).length,
      quizzes,
      tools,
    });

    // Badge case, newest first (same sources the homepage strip uses).
    const courseBadges = getBadges();
    const challengeBadges = getChallengeBadges();
    setEarned(
      badgeSources
        .map((src) => {
          const b =
            src.kind === "course"
              ? courseBadges[src.id]
              : challengeBadges[src.id];
          return b ? { ...src, earnedAt: b.earnedAt } : null;
        })
        .filter((b): b is EarnedBadge => Boolean(b))
        .sort((a, b) => b.earnedAt - a.earnedAt)
    );

    // Per-topic progress, started topics first, most-complete on top.
    const rows = paths
      .map((t) => ({
        id: t.id,
        short: t.short,
        href: t.href,
        color: t.color,
        read: t.articles.filter((a) => read[a.slug]).length,
        total: t.articles.length,
      }))
      .filter((r) => r.read > 0)
      .sort((a, b) => b.read / b.total - a.read / a.total);
    setProgress(rows);

    // Quiz profile chips.
    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    const topics = (quiz?.answers?.q3 ?? []).filter((id) => id !== "not-sure");
    setQuizTopics(topics);

    // "Keep going": next unread in the last-read topic, then quiz topics,
    // then any started topic (mirrors the WelcomeBack strip).
    const nextIn = (topic: TopicPath): NextStep | null => {
      const unread = topic.articles.find((a) => !read[a.slug]);
      return unread
        ? {
            title: unread.title,
            href: `${topic.href}/${unread.slug}`,
            topicShort: topic.short,
            color: topic.color,
          }
        : null;
    };
    let step: NextStep | null = null;
    const last = lastReadSlug(read);
    if (last) {
      const t = paths.find((p) => p.articles.some((a) => a.slug === last));
      if (t) step = nextIn(t);
    }
    if (!step) {
      for (const id of topics) {
        const t = paths.find((p) => p.id === id);
        if (t) {
          step = nextIn(t);
          if (step) break;
        }
      }
    }
    if (!step) {
      for (const r of rows) {
        const t = paths.find((p) => p.id === r.id);
        if (t) {
          step = nextIn(t);
          if (step) break;
        }
      }
    }
    setNext(step);
    setMounted(true);
  }, [paths, badgeSources]);

  const firstName = displayName.trim().split(/\s+/)[0] || "";
  const hasHistory = stats.guides > 0 || earned.length > 0 || stats.tools > 0;

  return (
    <div className="space-y-5">
      {/* greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">
            {firstName ? `Welcome back, ${firstName}.` : "Welcome back."}
          </h2>
          <p className="mt-1 text-sm text-stone">
            Signed in as {email} · progress syncs to your account
            automatically
          </p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-1.5 rounded-md border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      {/* stats */}
      {mounted && (
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              [stats.guides, stats.guides === 1 ? "guide read" : "guides read"],
              [
                earned.length,
                earned.length === 1 ? "badge earned" : "badges earned",
              ],
              [stats.tools, stats.tools === 1 ? "tool tried" : "tools tried"],
            ] as const
          ).map(([n, label], i) => (
            <div
              key={label}
              className={`card-ink rounded-2xl bg-cream px-4 py-5 text-center ${
                i === 1 ? "lg:rotate-[0.5deg]" : ""
              }`}
            >
              <p className="font-display text-3xl font-bold text-ink">{n}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
                {label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* keep going */}
      {mounted &&
        (next ? (
          <Link
            href={next.href}
            className="card-ink group flex items-center justify-between gap-4 rounded-2xl bg-cream p-6"
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: next.color }}
              >
                Keep going · {next.topicShort}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
                {next.title}
              </h3>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-stone transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link
            href={hasHistory ? "/learn" : "/quiz"}
            className="card-ink group flex items-center justify-between gap-4 rounded-2xl bg-cream p-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                Where to start
              </p>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
                {hasHistory
                  ? "Pick your next topic"
                  : "Take the 2-minute quiz for a path built around you"}
              </h3>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-stone transition-transform group-hover:translate-x-1" />
          </Link>
        ))}

      {/* badge case */}
      {mounted && (
        <div className="rounded-2xl border border-sand bg-cream p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-lg font-bold text-ink">
              Your badge case
            </h3>
            <span className="text-xs font-semibold text-stone">
              {earned.length} of {badgeSources.length}
            </span>
          </div>
          {earned.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
              {earned.map((b) => (
                <div key={`${b.kind}-${b.id}`} className="w-24 text-center">
                  <BadgeMedal color={b.color} className="mx-auto h-14 w-14" />
                  <p className="mt-1.5 text-xs font-semibold leading-tight text-ink">
                    {b.title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm leading-6 text-stone">
              Empty so far — finish a{" "}
              <Link href="/courses" className="font-semibold text-forest">
                course
              </Link>{" "}
              or a{" "}
              <Link href="/challenges" className="font-semibold text-forest">
                challenge
              </Link>{" "}
              and the first rosette lands here.
            </p>
          )}
          {earned.length > 0 && earned.length < badgeSources.length && (
            <p className="mt-4 text-xs text-stone">
              {badgeSources.length - earned.length} more waiting in{" "}
              <Link href="/courses" className="font-semibold text-forest">
                Courses
              </Link>{" "}
              and{" "}
              <Link href="/challenges" className="font-semibold text-forest">
                Challenges
              </Link>
              .
            </p>
          )}
        </div>
      )}

      {/* reading progress */}
      {mounted && progress.length > 0 && (
        <div className="rounded-2xl border border-sand bg-cream p-6">
          <h3 className="font-display text-lg font-bold text-ink">
            Your reading, by topic
          </h3>
          <div className="mt-4 space-y-4">
            {progress.map((t) => (
              <Link key={t.id} href={t.href} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-ink group-hover:underline">
                    {t.short}
                  </span>
                  <span className="text-xs font-medium text-stone">
                    {t.read} of {t.total}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.max(4, Math.round((t.read / t.total) * 100))}%`,
                      background: t.color,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-stone">
            {progress.length < paths.length && (
              <>
                {paths.length - progress.length} topics untouched —{" "}
                <Link href="/learn" className="font-semibold text-forest">
                  explore the library
                </Link>
                .
              </>
            )}
          </p>
        </div>
      )}

      {/* quiz profile */}
      {mounted && (
        <div className="rounded-2xl border border-sand bg-cream p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-ink">
              Your quiz profile
            </h3>
            <Link
              href="/quiz"
              className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              {quizTopics.length > 0 ? "Retake the quiz" : "Take the quiz"}
            </Link>
          </div>
          {quizTopics.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {quizTopics.map((id) => {
                const t = paths.find((p) => p.id === id);
                if (!t) return null;
                return (
                  <span
                    key={id}
                    className="rounded-lg border-2 px-3 py-1 text-xs font-bold"
                    style={{ borderColor: t.color, color: t.color }}
                  >
                    {t.short}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="mt-2 text-sm leading-6 text-stone">
              Two minutes, five questions, and the site starts recommending
              around what you actually want to learn.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
