"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "@phosphor-icons/react/dist/ssr";
import type { TopicId } from "@/lib/topics";
import { getReadMap } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";

/** The light, serializable slice of a BlogPost the index needs (no body). */
export interface BlogListItem {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tag: string;
  topics: TopicId[];
  readMinutes: number;
  image: { src: string; alt: string };
}

/**
 * The /blog index list, personalized without a login: the featured post and
 * the ordering come from this device's reading history. Learn articles the
 * visitor has read (plus their quiz topics and past blog reads) build a
 * topic-affinity score; unread posts that match what they actually read
 * float up, posts they've already read sink to the bottom with a check.
 * First visit (no history) falls back to newest-first, so the server render
 * and a fresh device see the same page.
 */
export default function BlogList({
  posts,
  articleTopics,
  topicNames,
}: {
  /** Newest first — the default order. */
  posts: BlogListItem[];
  /** Learn-article slug -> its topic, for scoring read history. */
  articleTopics: Record<string, TopicId>;
  /** TopicId -> short human name, for the "because you read about…" line. */
  topicNames: Record<string, string>;
}) {
  const [readBlog, setReadBlog] = useState<Set<string>>(new Set());
  const [affinity, setAffinity] = useState<Map<TopicId, number>>(new Map());
  const [personal, setPersonal] = useState(false);
  const [shown, setShown] = useState(9);

  useEffect(() => {
    const read = getReadMap();
    const score = new Map<TopicId, number>();
    const blogRead = new Set<string>();
    const bump = (t: TopicId, by: number) =>
      score.set(t, (score.get(t) ?? 0) + by);

    for (const slug of Object.keys(read)) {
      if (slug.startsWith("blog/")) {
        const bare = slug.slice(5);
        blogRead.add(bare);
        for (const t of posts.find((p) => p.slug === bare)?.topics ?? [])
          bump(t, 1);
      } else if (articleTopics[slug]) {
        bump(articleTopics[slug], 1);
      }
    }
    // Quiz-selected topics count as interest too, a little louder.
    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    for (const id of quiz?.answers?.q3 ?? []) {
      if (id !== "not-sure" && id in topicNames) bump(id as TopicId, 2);
    }

    setReadBlog(blogRead);
    setAffinity(score);
    setPersonal(score.size > 0 || blogRead.size > 0);
  }, [posts, articleTopics, topicNames]);

  const { featured, rest, becauseOf } = useMemo(() => {
    const postScore = (p: BlogListItem) =>
      p.topics.reduce((sum, t) => sum + (affinity.get(t) ?? 0), 0);

    if (!personal) {
      // Server render + first visit: newest first, newest featured.
      return { featured: posts[0], rest: posts.slice(1), becauseOf: null };
    }

    const unread = posts.filter((p) => !readBlog.has(p.slug));
    const read = posts.filter((p) => readBlog.has(p.slug));
    // Stable within equal scores: `posts` arrives newest-first.
    const ranked = [...unread].sort((a, b) => postScore(b) - postScore(a));
    const featured = ranked[0] ?? posts[0];
    const rest = [...ranked.slice(1), ...read];

    // Name the strongest interests the featured pick actually matches.
    const matched = featured.topics
      .filter((t) => (affinity.get(t) ?? 0) > 0)
      .sort((a, b) => (affinity.get(b) ?? 0) - (affinity.get(a) ?? 0))
      .slice(0, 2)
      .map((t) => topicNames[t])
      .filter(Boolean);
    return {
      featured,
      rest,
      becauseOf: postScore(featured) > 0 && matched.length ? matched : null,
    };
  }, [posts, personal, readBlog, affinity, topicNames]);

  if (!featured) return null;

  return (
    <div>
      {/* Featured pick — horizontal poster (Base44 blog structure, our skin) */}
      <article className="card-ink-lg overflow-hidden rounded-2xl bg-cream lg:-rotate-[0.35deg]">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid lg:grid-cols-[1fr_1.15fr]"
        >
          <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-ink lg:aspect-auto lg:border-b-0 lg:border-r-2">
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
            />
          </div>
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[3px_3px_0_#11211c]">
                {personal ? "Picked for you" : "The latest"}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
                {featured.tag}
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4 sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-stone sm:text-lg sm:leading-8">
              {featured.dek}
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-stone">
              {formatDate(featured.date)}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {featured.readMinutes} min read
              </span>
            </p>
            {becauseOf && (
              <p className="mt-3 text-sm font-medium text-stone">
                Because you&apos;ve been reading about{" "}
                {becauseOf.join(" and ").toLowerCase()}.
              </p>
            )}
          </div>
        </Link>
      </article>

      {/* All posts — photo-card grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(0, shown).map((post) => {
          const wasRead = readBlog.has(post.slug);
          return (
            <article key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="card-ink group flex h-full flex-col overflow-hidden rounded-xl bg-cream transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04] ${
                      wasRead ? "opacity-60" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold uppercase tracking-[0.14em] text-terracotta">
                      {post.tag}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 font-medium text-stone">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMinutes} min
                    </span>
                  </p>
                  <h2
                    className={`mt-2 flex-1 font-display text-lg font-semibold leading-snug group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4 ${
                      wasRead ? "text-ink/60" : "text-ink"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <p className="mt-3 flex items-center justify-between gap-2 text-xs font-medium text-stone">
                    {formatDate(post.date)}
                    {wasRead && (
                      <span className="inline-flex items-center gap-1 font-semibold text-forest">
                        <Check className="h-3.5 w-3.5" weight="bold" />
                        You read this
                      </span>
                    )}
                  </p>
                  <p
                    aria-hidden
                    className="mt-2 text-xs font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    Read the post
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {rest.length > shown && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + 9)}
            className="btn-ink inline-flex items-center rounded-md bg-cream px-7 py-3 text-sm font-bold text-ink"
          >
            Load more posts
          </button>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
