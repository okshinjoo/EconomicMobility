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
    <ul>
      {items.map((item, i) => (
        <li key={item.slug} className={i > 0 ? "-mt-3" : ""}>
          <Reveal delay={i * 80}>
            <Link
              href={item.href}
              className={`group block rounded-lg border-2 border-[#1A1A1A] bg-[#F5F2EB] p-5 text-[#1A1A1A] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl md:p-7 ${
                i % 2 === 1 ? "md:ml-10" : ""
              } ${i % 2 === 0 ? "md:-rotate-[0.5deg]" : "md:rotate-[0.5deg]"}`}
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E69A37]/10 font-display text-3xl font-bold leading-none text-[#E69A37] transition-colors group-hover:bg-[#E69A37] group-hover:text-[#1A1A1A]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-medium leading-snug md:text-xl">
                    {item.q}
                  </span>
                  <span className="mt-1.5 block text-sm text-[#616161] transition-colors group-hover:text-[#E69A37]">
                    Read the guide &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
