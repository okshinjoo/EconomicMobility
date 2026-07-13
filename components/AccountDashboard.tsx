"use client";

// Member-data pieces for the signed-in /account page. The owner picked the
// "full clone" of their Kinetik reference (July 2026): flat white cards on
// a framed app surface, sans-serif dashboard type, tabs inside the panel,
// and a recent-reading table with status chips. This file provides the data
// hook + the flat stat cards + the Overview tab content; AccountPanel
// composes the frame. All numbers come from the same localStorage the whole
// site writes (and the account syncs) — no extra network calls.

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { stageLabel } from "@/lib/profile";
import { readStudentStage } from "@/lib/studentStage";
import { STAGE_PLANS, rotatedRecs } from "@/lib/studentRecs";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { getChallengeBadges } from "@/components/ChallengeChecklist";
import { Donut } from "@/components/Charts";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

// The dashboard zone's flat palette (deliberately calmer than bold-mix).
export const DASH = {
  divider: "#e4d8c1",
  muted: "#5f6f66",
  surface: "#efe6d4",
  sand: "#e8dfcf",
};

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

interface RecentRead {
  title: string;
  href: string;
  dateLabel: string;
  topicShort: string;
}

export interface MemberData {
  mounted: boolean;
  stats: { guides: number; quizzes: number; tools: number };
  earned: EarnedBadge[];
  progress: TopicProgressRow[];
  next: NextStep | null;
  quizTopics: string[];
  hasHistory: boolean;
  recent: RecentRead[];
  /** Distinct days with at least one read in the last 7. */
  streakDays: number;
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
    recent: [],
    streakDays: 0,
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

    // Recent reading, newest first, resolved against the topic paths.
    const bySlug = new Map<
      string,
      { title: string; href: string; short: string }
    >();
    for (const t of paths) {
      for (const a of t.articles) {
        bySlug.set(a.slug, {
          title: a.title,
          href: `${t.href}/${a.slug}`,
          short: t.short,
        });
      }
    }
    const recent: RecentRead[] = Object.entries(read)
      .filter(([slug, ts]) => bySlug.has(slug) && typeof ts === "number")
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5)
      .map(([slug, ts]) => {
        const info = bySlug.get(slug)!;
        return {
          title: info.title,
          href: info.href,
          topicShort: info.short,
          dateLabel: new Date(ts as number).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
        };
      });

    // Streak: distinct calendar days with a read in the last 7 days.
    const dayKeys = new Set<string>();
    const weekAgo = Date.now() - 7 * 86_400_000;
    for (const ts of Object.values(read)) {
      if (typeof ts === "number" && ts >= weekAgo) {
        dayKeys.add(new Date(ts).toDateString());
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
      recent,
      streakDays: dayKeys.size,
    });
  }, [paths, badgeSources, refresh]);

  return data;
}

/* ------------------------------ flat pieces ----------------------------- */

function FlatLegend({
  items,
}: {
  items: { color: string; label: string; value: string }[];
}) {
  return (
    <ul className="min-w-0 flex-1 space-y-1.5">
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
          <span className="whitespace-nowrap font-semibold text-ink">{it.value}</span>
        </li>
      ))}
    </ul>
  );
}

/** The two white stat cards (the reference's Car Rides Stats / Total Trip
 *  Spend positions): reading donut + activity bubbles. */
export function FlatStatCards({
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
          { value: unread, color: DASH.sand, label: "Unread" },
        ]
      : [{ value: 1, color: DASH.sand, label: "Nothing read yet" }];
  const readingLegend = [
    ...progress
      .slice(0, 3)
      .map((t) => ({ color: t.color, label: t.short, value: String(t.read) })),
    { color: DASH.sand, label: "Unread", value: String(unread) },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold text-ink">Reading Stats</h3>
          <span
            className="whitespace-nowrap text-xs font-medium"
            style={{ color: DASH.muted }}
          >
            All time
          </span>
        </div>
        <div className="mt-3 flex items-center gap-5">
          <Donut
            segments={readingSegments}
            size={108}
            thickness={15}
            centerTop={String(stats.guides)}
            centerSub={stats.guides === 1 ? "guide read" : "guides read"}
            className="h-[108px] w-[108px] flex-shrink-0"
            light
          />
          <FlatLegend items={readingLegend} />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold text-ink">Total Progress</h3>
          <span
            className="whitespace-nowrap text-xs font-medium"
            style={{ color: DASH.muted }}
          >
            All time
          </span>
        </div>
        <div className="mt-3 flex items-center gap-5">
          <div className="relative h-[108px] w-[108px] flex-shrink-0">
            <span className="absolute left-0 top-0 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-amber text-2xl font-bold text-ink">
              {earned.length}
            </span>
            <span className="absolute bottom-0 right-0 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-forest text-base font-bold text-cream">
              {stats.tools}
            </span>
          </div>
          <FlatLegend
            items={[
              {
                color: "#e7a33c",
                label: "Badges earned",
                value: `${earned.length} of ${badgeTotal}`,
              },
              {
                color: "#0c4a39",
                label: "Tools tried",
                value: String(stats.tools),
              },
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

function StatusChip({
  label,
  tone,
  bg,
}: {
  label: string;
  tone: string;
  bg: string;
}) {
  return (
    <span
      className="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-bold"
      style={{ color: tone, background: bg }}
    >
      {label}
    </span>
  );
}

/** The Overview tab: recent-reading table (with an Up-next row), then badge
 *  case and per-topic progress as hairline-divided sections. */
export function FlatOverview({
  data,
  paths,
  badgeTotal,
}: {
  data: MemberData;
  paths: TopicPath[];
  badgeTotal: number;
}) {
  if (!data.mounted) return null;
  const { next, recent, earned, progress } = data;

  // Student-stage shortcuts (July 2026): when this member said which
  // student they are — on the profile or the /students picker — lead the
  // overview with the four doors that matter most at that stage. Only
  // renders post-mount (data.mounted), so localStorage reads are safe.
  const stage = readStudentStage();
  const stagePlan = stage ? STAGE_PLANS[stage] : null;

  return (
    <div>
      {stagePlan && stage && (
        <div className="mb-5 border-b pb-5" style={{ borderColor: DASH.divider }}>
          <div className="flex items-center justify-between gap-3">
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: DASH.muted }}
            >
              For {stageLabel(stage).toLowerCase()} students
            </p>
            <Link
              href="/students"
              className="text-xs font-semibold text-forest hover:underline"
            >
              Everything for students →
            </Link>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {/* Same daily rotation as the /students band (mounted-only). */}
            {rotatedRecs(stage, 4).map((r) => (
              <Link
                key={r.href}
                href={r.href}
                title={r.desc}
                className="rounded-lg border border-sand bg-cream px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* recent reading */}
      <div className="flex items-center justify-between gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: DASH.muted }}
        >
          Recent reading
        </p>
        <Link
          href="/learn"
          className="text-xs font-semibold text-forest hover:underline"
        >
          View the library →
        </Link>
      </div>
      <div className="mt-1">
        {next && (
          <Link
            href={next.href}
            className="group flex items-center gap-4 border-b py-3"
            style={{ borderColor: DASH.divider }}
          >
            <span className="w-12 flex-shrink-0 text-sm font-bold text-ink">
              Next
            </span>
            <StatusChip label="Up next" tone="#c9842a" bg="#e7a33c2a" />
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink group-hover:underline">
              {next.title}
            </span>
            <span
              className="hidden text-xs font-medium sm:block"
              style={{ color: DASH.muted }}
            >
              {next.topicShort}
            </span>
          </Link>
        )}
        {recent.map((r, i) => (
          <Link
            key={r.href}
            href={r.href}
            className={`group flex items-center gap-4 py-3 ${
              i < recent.length - 1 ? "border-b" : ""
            }`}
            style={{ borderColor: DASH.divider }}
          >
            <span className="w-12 flex-shrink-0 text-sm font-bold text-ink">
              {r.dateLabel}
            </span>
            <StatusChip label="Read" tone="#0c4a39" bg="#0c4a3914" />
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink group-hover:underline">
              {r.title}
            </span>
            <span
              className="hidden text-xs font-medium sm:block"
              style={{ color: DASH.muted }}
            >
              {r.topicShort}
            </span>
          </Link>
        ))}
        {!next && recent.length === 0 && (
          <p className="py-4 text-sm text-stone">
            Nothing read yet — the{" "}
            <Link href="/quiz" className="font-semibold text-forest">
              2-minute quiz
            </Link>{" "}
            builds a path around you, or browse the{" "}
            <Link href="/learn" className="font-semibold text-forest">
              library
            </Link>
            .
          </p>
        )}
      </div>

      {/* badge case */}
      <div
        className="mt-5 border-t pt-5"
        style={{ borderColor: DASH.divider }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: DASH.muted }}
          >
            Badge case
          </p>
          <span
            className="text-xs font-semibold"
            style={{ color: DASH.muted }}
          >
            {earned.length} of {badgeTotal}
          </span>
        </div>
        {earned.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-4">
            {earned.map((b) => (
              <div key={`${b.kind}-${b.id}`} className="w-24 text-center">
                <BadgeMedal color={b.color} className="mx-auto h-12 w-12" />
                <p className="mt-1 text-xs font-semibold leading-tight text-ink">
                  {b.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-stone">
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
      </div>

      {/* reading by topic */}
      {progress.length > 0 && (
        <div
          className="mt-5 border-t pt-5"
          style={{ borderColor: DASH.divider }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: DASH.muted }}
          >
            Reading by topic
          </p>
          <div className="mt-3 space-y-3.5">
            {progress.map((t) => (
              <Link key={t.id} href={t.href} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-ink group-hover:underline">
                    {t.short}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: DASH.muted }}
                  >
                    {t.read} of {t.total}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full"
                  style={{ background: "#f2ecdf" }}
                >
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
            <p className="mt-3 text-xs" style={{ color: DASH.muted }}>
              {paths.length - progress.length} topics untouched —{" "}
              <Link href="/learn" className="font-semibold text-forest">
                explore the library
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
