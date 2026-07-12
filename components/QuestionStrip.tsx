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
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => (
        <li key={item.slug}>
          <Reveal delay={i * 90}>
            <Link
              href={item.href}
              className="group flex items-baseline gap-5 py-5"
            >
              <span
                aria-hidden
                className="w-9 shrink-0 font-display text-2xl font-bold text-cream/25 transition-colors group-hover:text-amber/70 sm:text-3xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-lg font-medium leading-snug text-cream transition-colors group-hover:text-amber sm:text-xl">
                {item.q}
              </span>
              <span className="hidden shrink-0 text-sm font-semibold text-amber underline decoration-amber/40 underline-offset-4 sm:block">
                Read the guide
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
