"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { glossary } from "@/lib/glossary";

/**
 * Investopedia-style "term of the day": deterministic by calendar date, so
 * every visitor sees the same term on the same day and it rotates at
 * midnight. Client-only (renders nothing until mounted) because the pick
 * depends on the visitor's local date.
 */
export default function TermOfTheDay() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);
    setIndex(daysSinceEpoch % glossary.length);
  }, []);

  if (index === null) return null;
  const term = glossary[index];

  return (
    <div className="card-ink rounded-2xl bg-cream p-6 lg:-rotate-[0.4deg]">
      <p className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
          Term of the day
        </span>
        <span className="text-xs font-medium text-stone">
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}
        </span>
      </p>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">
        {term.term}
      </p>
      <p className="mt-2 text-sm leading-6 text-stone">{term.definition}</p>
      <Link
        href={`/glossary#${term.slug}`}
        className="mt-3 inline-block text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
      >
        See it in the glossary
      </Link>
    </div>
  );
}
