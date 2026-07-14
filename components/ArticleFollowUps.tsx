"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopicMark from "@/components/TopicMark";
import type { TopicId } from "@/lib/topics";
import { ArrowLeft, ArrowRight, Check, Map, Sparkles, Wrench } from "lucide-react";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { getReadMap } from "@/lib/readTracking";
import { frameHref, type Frame } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import TopicQuizCard from "@/components/TopicQuizCard";

/**
 * End-of-article prompts that know when to shut up (owner directive, July
 * 2026): each one renders server-side, then removes itself after mount if
 * the visitor has already done the thing. Taken the site quiz -> no quiz
 * band. Read the roadmap -> no roadmap card. Read a related guide -> it
 * drops out of "Keep reading". People can always find these on their own.
 *
 * ONE AT A TIME (July 14, nav-audit §4c): the three prompt cards (topic
 * quiz / tool / roadmap) no longer stack — FirstUndonePrompt shows only the
 * first UNDONE one in that priority order, extending the memory contract
 * from "done things stop prompting" to "one prompt at a time". The
 * read-filtered RelatedArticles list below is content, not a prompt, and
 * keeps its sink-never-hide behavior.
 */

export function QuizPromo() {
  const frame = useFrame();
  const [taken, setTaken] = useState(false);
  useEffect(() => {
    if (loadJSON<object>(STORAGE_KEYS.quizResult)) setTaken(true);
  }, []);
  if (taken) return null;

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-cream sm:flex-row sm:items-center">
        <div className="max-w-md">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            <Sparkles className="h-4 w-4" />
            Put it to the test
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold">
            See where you stand
          </h2>
          <p className="mt-2 text-base leading-7 text-cream/70">
            The 2-minute quiz checks what you know and points you to what to
            read next.
          </p>
        </div>
        <Link
          href={frameHref("/quiz", frame)}
          className="btn-ink inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink"
        >
          Take the quiz
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function ToolCard({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent: string;
}) {
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const map = loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools);
    if (map?.[href]) setVisited(true);
  }, [href]);
  if (visited) return null;

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-sand bg-cream p-6 transition-colors hover:border-ink/20"
    >
      <span
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-cream"
        style={{ color: accent }}
      >
        <Wrench className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">
          Try it yourself
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
          {label}
        </h3>
      </div>
      <ArrowRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function RoadmapPathCard({
  href,
  title,
  slug,
  accent,
}: {
  href: string;
  title: string;
  /** Bare roadmap article slug, for the read map. */
  slug: string;
  accent: string;
}) {
  const [read, setRead] = useState(false);
  useEffect(() => {
    if (getReadMap()[slug]) setRead(true);
  }, [slug]);
  if (read) return null;

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border-2 border-ink bg-cream p-6 shadow-[4px_4px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5"
    >
      <span
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-cream"
        style={{ color: accent }}
      >
        <Map className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">
          One stop on a longer path
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
          {title}
        </h3>
      </div>
      <ArrowRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

/**
 * Shows the FIRST undone prompt card — topic quiz, then tool, then roadmap
 * — instead of stacking all three (nav-audit §4c). Server render shows the
 * first card that exists (deterministic, no hydration mismatch); after
 * mount the pick recomputes against the same trackers the cards themselves
 * read, so the chosen card never self-hides into a blank slot. All done →
 * nothing renders (each prompt stays reachable on its own page).
 */
export function FirstUndonePrompt({
  topicQuiz,
  tool,
  roadmap,
}: {
  topicQuiz?: {
    topicId: string;
    topicShort: string;
    accent: string;
    frame: Frame;
  };
  tool?: { href: string; label: string; accent: string };
  roadmap?: { href: string; title: string; slug: string; accent: string };
}) {
  type Pick = "topicQuiz" | "tool" | "roadmap" | "none";
  const [pick, setPick] = useState<Pick | null>(null);

  useEffect(() => {
    const scores =
      loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {};
    const visited =
      loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
    const readMap = getReadMap();
    if (topicQuiz && !scores[`topic-quiz:${topicQuiz.topicId}`])
      setPick("topicQuiz");
    else if (tool && !visited[tool.href]) setPick("tool");
    else if (roadmap && !readMap[roadmap.slug]) setPick("roadmap");
    else setPick("none");
  }, [topicQuiz, tool, roadmap]);

  // Pre-mount: the first prompt that exists, matching a fresh visitor.
  const shown: Pick =
    pick ??
    (topicQuiz ? "topicQuiz" : tool ? "tool" : roadmap ? "roadmap" : "none");

  if (shown === "topicQuiz" && topicQuiz)
    return (
      <TopicQuizCard
        topicId={topicQuiz.topicId}
        topicShort={topicQuiz.topicShort}
        accent={topicQuiz.accent}
        frame={topicQuiz.frame}
      />
    );
  if (shown === "tool" && tool)
    return <ToolCard href={tool.href} label={tool.label} accent={tool.accent} />;
  if (shown === "roadmap" && roadmap)
    return (
      <RoadmapPathCard
        href={roadmap.href}
        title={roadmap.title}
        slug={roadmap.slug}
        accent={roadmap.accent}
      />
    );
  return null;
}

export interface RelatedItem {
  slug: string;
  href: string;
  kicker: string;
  color: string;
  title: string;
  /** For the elongated top pick: dek + topic mark + topic photo. */
  dek?: string;
  topicId?: TopicId;
  image?: string;
}

export function RelatedArticles({
  items,
  backHref,
  backLabel,
}: {
  items: RelatedItem[];
  backHref: string;
  backLabel: string;
}) {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());
  useEffect(() => {
    setReadSlugs(new Set(Object.keys(getReadMap())));
  }, []);

  // Owner rule: read articles stay listed, sunk to the bottom with a Read
  // chip. Only when EVERYTHING here is read does the section bow out (a
  // list that recommends nothing new isn't a recommendation).
  const unread = items.filter((i) => !readSlugs.has(i.slug));
  if (unread.length === 0) return null;
  const ordered = [...unread, ...items.filter((i) => readSlugs.has(i.slug))];

  return (
    <section className="bg-paper-deep">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <h2 className="font-display text-2xl font-bold text-ink">
          Keep reading
        </h2>

        {/* Top pick: the elongated library-row look (photo, tint, mark) */}
        <Link
          href={ordered[0].href}
          className="card-ink group relative mt-6 flex items-stretch gap-4 overflow-hidden rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            background: `color-mix(in srgb, ${ordered[0].color} 12%, #fbf8f1)`,
          }}
        >
          {ordered[0].image && (
            <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-lg bg-sand sm:block">
              <Image
                src={ordered[0].image}
                alt=""
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
              style={{ color: ordered[0].color }}
            >
              {ordered[0].topicId && (
                <TopicMark
                  id={ordered[0].topicId}
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                />
              )}
              Read this next
            </p>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
              style={{ textDecorationColor: ordered[0].color }}
            >
              {ordered[0].title}
            </h3>
            {ordered[0].dek && (
              <p className="mt-1 text-sm leading-6 text-stone">
                {ordered[0].dek}
              </p>
            )}
          </div>
        </Link>

        <div className="mt-3 space-y-3">
          {ordered.slice(1).map((rel) => {
            const wasRead = readSlugs.has(rel.slug);
            return (
            <Link
              key={rel.slug}
              href={rel.href}
              className={`group flex items-center justify-between gap-4 rounded-2xl border border-sand p-5 transition-colors hover:border-ink/20 ${
                wasRead ? "bg-paper" : "bg-cream"
              }`}
            >
              <div>
                <p
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: rel.color }}
                >
                  {rel.kicker}
                  {wasRead && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal text-cream"
                      style={{ background: rel.color }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      Read
                    </span>
                  )}
                </p>
                <h3
                  className={`mt-1 font-display text-lg font-semibold ${
                    wasRead ? "text-ink/60" : "text-ink"
                  }`}
                >
                  {rel.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-stone transition-transform group-hover:translate-x-1" />
            </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
