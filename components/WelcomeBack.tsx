"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { pickNextUnread, type ReadingLevel } from "@/lib/readingLevel";
import { ROADMAP_SET } from "@/lib/roadmaps";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { getChallengeBadges } from "@/components/ChallengeChecklist";

export interface TopicPath {
  id: string;
  short: string;
  href: string;
  color: string;
  /** Slugs + titles in roadmap (reading) order. `level` powers the soft
   *  reading-level re-sort (lib/readingLevel) — optional so older callers
   *  keep working, but the server builders all thread it through. */
  articles: { slug: string; title: string; level?: ReadingLevel }[];
}

/** Course + challenge metadata so earned badges can render with names/colors. */
export interface BadgeSource {
  id: string;
  title: string;
  color: string;
  kind: "course" | "challenge";
}

interface EarnedBadge extends BadgeSource {
  earnedAt: number;
}

interface Recommendation {
  kicker: string;
  title: string;
  href: string;
  topicShort: string;
  color: string;
  readCount: number;
  topicTotal: number;
  roadmapHref?: string;
  /** College-topic recs also point at the For Students hub. */
  studentHub?: boolean;
}

/**
 * Personalized "pick up where you left off" strip under the homepage hero.
 * Renders nothing until mounted (and nothing at all for first-time visitors).
 * Picks the next unread article in the topic the reader was last in; falls
 * back to their quiz topics; stays hidden with no history at all.
 */
export default function WelcomeBack({
  paths,
  badgeSources = [],
}: {
  paths: TopicPath[];
  badgeSources?: BadgeSource[];
}) {
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [earned, setEarned] = useState<EarnedBadge[]>([]);

  useEffect(() => {
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
  }, [badgeSources]);

  useEffect(() => {
    const read = getReadMap();

    const nextIn = (topic: TopicPath): Recommendation | null => {
      // Level-aware soft re-sort: a reader with demonstrated Intermediate/
      // Advanced momentum in this topic gets the first unread deeper guide
      // instead of a primer (falls back to Beginner when nothing deeper is
      // left). First-unread-in-path-order otherwise, exactly as before.
      const next = pickNextUnread(topic.id, topic.articles, read);
      if (!next) return null;
      const roadmap = topic.articles.find(
        (a) => ROADMAP_SET.has(a.slug) && a.slug !== next.slug && !read[a.slug]
      );
      return {
        kicker: "Pick up where you left off",
        title: next.title,
        href: `${topic.href}/${next.slug}`,
        topicShort: topic.short,
        color: topic.color,
        readCount: topic.articles.filter((a) => read[a.slug]).length,
        topicTotal: topic.articles.length,
        roadmapHref: roadmap ? `${topic.href}/${roadmap.slug}` : undefined,
        studentHub: topic.id === "college",
      };
    };

    // 1. The topic they most recently read in, if it has unread guides left.
    const last = lastReadSlug(read);
    if (last) {
      const lastTopic = paths.find((t) =>
        t.articles.some((a) => a.slug === last)
      );
      if (lastTopic) {
        const r = nextIn(lastTopic);
        if (r) {
          setRec(r);
          return;
        }
      }
      // Topic finished — fall through to quiz topics / any started topic.
    }

    // 2. Quiz-selected topics they haven't finished.
    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    const quizTopics = (quiz?.answers?.q3 ?? []).filter(
      (id) => id !== "not-sure"
    );
    for (const id of quizTopics) {
      const topic = paths.find((t) => t.id === id);
      if (!topic) continue;
      const r = nextIn(topic);
      if (r) {
        setRec(
          last
            ? r
            : { ...r, kicker: "Based on your quiz" }
        );
        return;
      }
    }

    // 3. Any other topic they've started but not finished.
    for (const topic of paths) {
      const started = topic.articles.some((a) => read[a.slug]);
      if (!started) continue;
      const r = nextIn(topic);
      if (r) {
        setRec(r);
        return;
      }
    }
    // First-time visitor (or finished everything): stay hidden.
  }, [paths]);

  if (!rec && earned.length === 0) return null;

  return (
    <section className="border-t border-sand bg-paper-deep">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
        {rec ? (
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: rec.color }}
            >
              {rec.kicker}
            </span>
            <p className="text-base text-ink">
              Next in {rec.topicShort}:{" "}
              <Link
                href={rec.href}
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
              >
                {rec.title}
              </Link>
              {rec.roadmapHref && (
                <span className="text-stone">
                  {" "}&middot; or follow{" "}
                  <Link
                    href={rec.roadmapHref}
                    className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    the {rec.topicShort.toLowerCase()} roadmap
                  </Link>
                </span>
              )}
              {rec.studentHub && (
                <span className="text-stone">
                  {" "}&middot; this one lives in{" "}
                  <Link
                    href="/students"
                    className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    For Students
                  </Link>{" "}
                  too
                </span>
              )}
            </p>
          </div>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
            Welcome back
          </span>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Badge case: earned course + challenge badges, newest first */}
          {earned.length > 0 && (
            <Link
              href={earned[0].kind === "course" ? "/courses" : "/challenges"}
              className="group flex items-center gap-2"
              aria-label={`Your badges: ${earned.map((b) => b.title).join(", ")}`}
            >
              <span className="flex -space-x-1.5">
                {earned.slice(0, 5).map((b) => (
                  <span key={`${b.kind}-${b.id}`} title={b.title}>
                    <BadgeMedal color={b.color} variant={b.kind === "course" ? "course" : "challenge"} className="h-8 w-8 drop-shadow-sm" />
                  </span>
                ))}
              </span>
              <span className="text-sm font-semibold text-stone transition-colors group-hover:text-ink">
                {earned.length} badge{earned.length === 1 ? "" : "s"}
              </span>
            </Link>
          )}
          {rec && (
            <p className="text-sm font-medium text-stone">
              {rec.readCount} of {rec.topicTotal} {rec.topicShort.toLowerCase()}{" "}
              guides read
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
