"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";

export interface TopicPath {
  id: string;
  short: string;
  href: string;
  color: string;
  /** Slugs + titles in roadmap (reading) order. */
  articles: { slug: string; title: string }[];
}

interface Recommendation {
  kicker: string;
  title: string;
  href: string;
  topicShort: string;
  color: string;
  readCount: number;
  topicTotal: number;
}

/**
 * Personalized "pick up where you left off" strip under the homepage hero.
 * Renders nothing until mounted (and nothing at all for first-time visitors).
 * Picks the next unread article in the topic the reader was last in; falls
 * back to their quiz topics; stays hidden with no history at all.
 */
export default function WelcomeBack({ paths }: { paths: TopicPath[] }) {
  const [rec, setRec] = useState<Recommendation | null>(null);

  useEffect(() => {
    const read = getReadMap();

    const nextIn = (topic: TopicPath): Recommendation | null => {
      const next = topic.articles.find((a) => !read[a.slug]);
      if (!next) return null;
      return {
        kicker: "Pick up where you left off",
        title: next.title,
        href: `${topic.href}/${next.slug}`,
        topicShort: topic.short,
        color: topic.color,
        readCount: topic.articles.filter((a) => read[a.slug]).length,
        topicTotal: topic.articles.length,
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

  if (!rec) return null;

  return (
    <section className="border-t border-sand bg-paper-deep">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
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
          </p>
        </div>
        <p className="text-sm font-medium text-stone">
          {rec.readCount} of {rec.topicTotal} {rec.topicShort.toLowerCase()}{" "}
          guides read
        </p>
      </div>
    </section>
  );
}
