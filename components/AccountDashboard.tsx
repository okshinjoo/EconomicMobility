"use client";

// Member-data pieces for the signed-in /account page (Kinetik-style layout,
// owner reference July 2026): ProfileEditor composes an identity card on the
// left with StatsRow + a tabbed panel on the right; the Overview tab renders
// OverviewPanels. All numbers come from the same localStorage the whole site
// writes (and the account syncs), so no extra network calls.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { getChallengeBadges } from "@/components/ChallengeChecklist";
import { Donut } from "@/components/Charts";
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

export interface MemberData {
  mounted: boolean;
  stats: { guides: number; quizzes: number; tools: number };
  earned: EarnedBadge[];
  progress: TopicProgressRow[];
  next: NextStep | null;
  quizTopics: string[];
  hasHistory: boolean;
}

/** Reads all member progress out of localStorage after mount; re-reads
 *  whenever `refresh` changes (used to re-run after the login sync merge). */
export function useMemberData(
  paths: TopicPath[],
  badgeSources: BadgeSource[],
  refresh?: unknown
): MemberData {
  const [data, setData] = useState<MemberData>({
    mounted: false,
    stats: { guides: 0, quizzes: 0, tools: 0 },
    earned: [],
    progress: [],
    next: null,
    quizTopics: [],
    hasHistory: false,
  });

  useEffect(() => {
    const read = getReadMap();
    const readSlugs = Object.keys(read);

    const quizzes = Object.keys(
      loadJSON<Record<string, unknown>>("empower:article-quizzes:v1") ?? {}
    ).length;
    const tools = Object.keys(
      loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {}
    ).length;
    const stats = {
      guides: readSlugs.filter((s) => !s.startsWith("blog/")).length,
      quizzes,
      tools,
    };

    const courseBadges = getBadges();
    const challengeBadges = getChallengeBadges();
    const earned = badgeSources
      .map((src) => {
        const b =
          src.kind === "course"
            ? courseBadges[src.id]
            : challengeBadges[src.id];
        return b ? { ...src, earnedAt: b.earnedAt } : null;
      })
      .filter((b): b is EarnedBadge => Boolean(b))
      .sort((a, b) => b.earnedAt - a.earnedAt);

    const progress = paths
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

    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    const quizTopics = (quiz?.answers?.q3 ?? []).filter(
      (id) => id !== "not-sure"
    );

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
    let next: NextStep | null = null;
    const last = lastReadSlug(read);
    if (last) {
      const t = paths.find((p) => p.articles.some((a) => a.slug === last));
      if (t) next = nextIn(t);
    }
    if (!next) {
      for (const id of quizTopics) {
        const t = paths.find((p) => p.id === id);
        if (t) {
          next = nextIn(t);
          if (next) break;
        }
      }
    }
    if (!next) {
      for (const r of progress) {
        const t = paths.find((p) => p.id === r.id);
        if (t) {
          next = nextIn(t);
          if (next) break;
        }
      }
    }

    setData({
      mounted: true,
      stats,
      earned,
      progress,
      next,
      quizTopics,
      hasHistory: stats.guides > 0 || earned.length > 0 || stats.tools > 0,
    });
  }, [paths, badgeSources, refresh]);

  return data;
}

/** Legend for light (cream) cards — Charts.tsx's Legend is styled for dark. */
function LightLegend({
  items,
}: {
  items: { color: string; label: string; value: string }[];
}) {
  return (
    <ul className="min-w-0 flex-1 space-y-2">
      {items.map((it) => (
        <li
          key={it.label}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="inline-flex min-w-0 items-center gap-2 text-stone">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ background: it.color }}
            />
            <span className="truncate">{it.label}</span>
          </span>
          <span className="font-semibold text-ink">{it.value}</span>
        </li>
      ))}
    </ul>
  );
}

const SAND = "#e8dfcf";

/** The two chart stat cards across the top of the signed-in page (the
 *  reference's "Car Rides Stats" / "Total Trip Spend" positions). */
export function DonutStatsCards({
  data,
  paths,
  badgeTotal,
}: {
  data: MemberData;
  paths: TopicPath[];
  badgeTotal: number;
}) {
  if (!data.mounted) return null;
  const { stats, earned, progress } = data;
  const libraryTotal = paths.reduce((s, t) => s + t.articles.length, 0);
  const unread = Math.max(0, libraryTotal - stats.guides);

  const readingSegments =
    stats.guides > 0
      ? [
          ...progress.map((t) => ({
            value: t.read,
            color: t.color,
            label: t.short,
          })),
          { value: unread, color: SAND, label: "Still unread" },
        ]
      : [{ value: 1, color: SAND, label: "Nothing read yet" }];
  const readingLegend = [
    ...progress
      .slice(0, 3)
      .map((t) => ({ color: t.color, label: t.short, value: String(t.read) })),
    { color: SAND, label: "Still unread", value: String(unread) },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {/* reading */}
      <div className="rounded-2xl border border-sand bg-cream p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-ink">
            Your reading
          </h3>
          <span className="whitespace-nowrap text-xs font-semibold text-stone">All time</span>
        </div>
        <div className="mt-4 flex items-center gap-5">
          <Donut
            segments={readingSegments}
            size={116}
            thickness={16}
            centerTop={String(stats.guides)}
            centerSub={stats.guides === 1 ? "guide" : "guides"}
            className="h-[116px] w-[116px] flex-shrink-0"
            light
          />
          <LightLegend items={readingLegend} />
        </div>
      </div>

      {/* activity */}
      <div className="rounded-2xl border border-sand bg-cream p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-ink">
            Your activity
          </h3>
          <span className="whitespace-nowrap text-xs font-semibold text-stone">All time</span>
        </div>
        <div className="mt-4 flex items-center gap-5">
          {/* bubbles, like the reference's spend card */}
          <div className="relative h-[116px] w-[116px] flex-shrink-0">
            <span className="absolute left-0 top-0 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-amber font-display text-2xl font-bold text-ink">
              {earned.length}
            </span>
            <span className="absolute bottom-0 right-0 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-forest font-display text-lg font-bold text-cream">
              {stats.tools}
            </span>
          </div>
          <LightLegend
            items={[
              {
                color: "#e7a33c",
                label: "Badges",
                value: `${earned.length} of ${badgeTotal}`,
              },
              { color: "#0c4a39", label: "Tools tried", value: String(stats.tools) },
              {
                color: "#d26a4c",
                label: "Mini-quizzes",
                value: String(stats.quizzes),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/** The Overview tab: next step, badge case, reading progress, quiz profile. */
export function OverviewPanels({
  data,
  paths,
  badgeTotal,
}: {
  data: MemberData;
  paths: TopicPath[];
  badgeTotal: number;
}) {
  if (!data.mounted) return null;
  const { next, earned, progress, quizTopics, hasHistory } = data;

  return (
    <div className="space-y-5">
      {/* keep going */}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-amber p-5 transition-transform duration-150 hover:-translate-y-0.5"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
              Keep going · {next.topicShort}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
              {next.title}
            </h3>
          </div>
          <ArrowRight className="h-5 w-5 flex-shrink-0 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          href={hasHistory ? "/learn" : "/quiz"}
          className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-amber p-5 transition-transform duration-150 hover:-translate-y-0.5"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
              Where to start
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
              {hasHistory
                ? "Pick your next topic"
                : "Take the 2-minute quiz for a path built around you"}
            </h3>
          </div>
          <ArrowRight className="h-5 w-5 flex-shrink-0 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      {/* badge case */}
      <div className="rounded-2xl border border-sand bg-paper p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-ink">
            Your badge case
          </h3>
          <span className="text-xs font-semibold text-stone">
            {earned.length} of {badgeTotal}
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
        {earned.length > 0 && earned.length < badgeTotal && (
          <p className="mt-4 text-xs text-stone">
            {badgeTotal - earned.length} more waiting in{" "}
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

      {/* reading progress */}
      {progress.length > 0 && (
        <div className="rounded-2xl border border-sand bg-paper p-5">
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
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream">
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
          {progress.length < paths.length && (
            <p className="mt-4 text-xs text-stone">
              {paths.length - progress.length} topics untouched —{" "}
              <Link href="/learn" className="font-semibold text-forest">
                explore the library
              </Link>
              .
            </p>
          )}
        </div>
      )}

      {/* quiz profile */}
      <div className="rounded-2xl border border-sand bg-paper p-5">
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
    </div>
  );
}
