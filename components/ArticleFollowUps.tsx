"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Map, Sparkles, Wrench } from "lucide-react";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { getReadMap } from "@/lib/readTracking";

/**
 * End-of-article prompts that know when to shut up (owner directive, July
 * 2026): each one renders server-side, then removes itself after mount if
 * the visitor has already done the thing. Taken the site quiz -> no quiz
 * band. Read the roadmap -> no roadmap card. Read a related guide -> it
 * drops out of "Keep reading". People can always find these on their own.
 */

export function QuizPromo() {
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
          href="/quiz"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
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
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${accent}1A`, color: accent }}
      >
        <Wrench className="h-6 w-6" strokeWidth={1.5} />
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
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${accent}1A`, color: accent }}
      >
        <Map className="h-6 w-6" strokeWidth={1.5} />
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

export interface RelatedItem {
  slug: string;
  href: string;
  kicker: string;
  color: string;
  title: string;
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

  const unread = items.filter((i) => !readSlugs.has(i.slug));
  if (unread.length === 0) return null;

  return (
    <section className="bg-paper-deep">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <h2 className="font-display text-2xl font-bold text-ink">
          Keep reading
        </h2>
        <div className="mt-6 space-y-3">
          {unread.map((rel) => (
            <Link
              key={rel.slug}
              href={rel.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-sand bg-cream p-5 transition-colors hover:border-ink/20"
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: rel.color }}
                >
                  {rel.kicker}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {rel.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-stone transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
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
