"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getReadMap } from "@/lib/readTracking";

export interface StripQuestion {
  q: string;
  href: string;
  slug: string;
}

/**
 * The homepage "come with a real question" list. Server-renders the first
 * four questions from the pool; once mounted, questions whose articles this
 * device has already read through rotate out and fresh ones take their place.
 */
export default function QuestionStrip({ pool }: { pool: StripQuestion[] }) {
  const [items, setItems] = useState(pool.slice(0, 4));
  const [allRead, setAllRead] = useState(false);

  useEffect(() => {
    const read = getReadMap();
    const unread = pool.filter((item) => !read[item.slug]);
    if (unread.length === 0) {
      setAllRead(true);
    } else {
      setItems(unread.slice(0, 4));
    }
  }, [pool]);

  if (allRead) {
    return (
      <div className="flex flex-col justify-center border-y border-white/10 py-10">
        <p className="font-display text-xl font-medium leading-snug text-cream sm:text-2xl">
          You&apos;ve read your way through every question here.
        </p>
        <p className="mt-3 text-base leading-7 text-cream/70">
          That deserves a bigger library:{" "}
          <Link
            href="/learn"
            className="font-semibold text-amber underline decoration-amber/40 underline-offset-4 hover:text-cream"
          >
            browse all nine topics
          </Link>{" "}
          or{" "}
          <Link
            href="/quiz"
            className="font-semibold text-amber underline decoration-amber/40 underline-offset-4 hover:text-cream"
          >
            retake the quiz
          </Link>{" "}
          to find your next path.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={item.slug}>
          <Reveal delay={i * 90}>
            <Link
              href={item.href}
              className="group flex items-baseline gap-4 rounded-xl bg-cream px-5 py-4 shadow-[4px_4px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:gap-5 sm:px-6"
            >
              <span
                aria-hidden
                className="shrink-0 font-display text-2xl font-bold text-transparent transition-colors duration-200 [-webkit-text-stroke:1.5px_#d26a4c] group-hover:text-terracotta sm:text-3xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                {item.q}
              </span>
              <span className="hidden shrink-0 text-sm font-semibold text-stone underline decoration-stone/25 decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-amber-deep group-hover:decoration-amber sm:block">
                Read the guide
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
