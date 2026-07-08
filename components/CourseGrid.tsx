"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap } from "@/lib/readTracking";
import { getBadges, BadgeMedal, type BadgeMap } from "@/components/CourseQuiz";

export interface CourseCardData {
  id: string;
  title: string;
  goal: string;
  description: string;
  color: string;
  articleSlugs: string[];
  cardCount: number;
  quizCount: number;
}

export default function CourseGrid({ items }: { items: CourseCardData[] }) {
  const [read, setRead] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<BadgeMap>({});

  useEffect(() => {
    setRead(getReadMap());
    setBadges(getBadges());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((course, i) => {
        const done = course.articleSlugs.filter((s) => read[s]).length;
        const total = course.articleSlugs.length;
        const badge = badges[course.id];
        const started = done > 0 && !badge;
        // A minority of cards tilt ever so slightly (B voice).
        const tilt =
          i === 1 ? "lg:rotate-[0.5deg]" : i === 4 ? "lg:-rotate-[0.5deg]" : "";
        return (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className={`card-ink group relative flex flex-col rounded-2xl bg-paper p-6 transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
            style={{ background: `color-mix(in srgb, ${course.color} 11%, #fbf8f1)` }}
          >
            {/* The badge this module ends in: ghosted until it's earned. */}
            <BadgeMedal
              color={course.color}
              className={`absolute right-5 top-5 h-12 w-12 transition-opacity ${
                badge ? "" : "opacity-20 group-hover:opacity-40"
              }`}
            />

            <div className="flex flex-wrap gap-1.5 pr-14">
              <span
                className="-rotate-1 rounded-md border-2 border-ink px-2 py-0.5 text-[11px] font-bold text-cream shadow-[2px_2px_0_#11211c]"
                style={{ background: course.color }}
              >
                {total} guides
              </span>
              <span className="rounded-md border-2 border-ink bg-cream px-2 py-0.5 text-[11px] font-bold text-ink">
                {course.cardCount} flashcards
              </span>
              <span className="rounded-md border-2 border-ink bg-cream px-2 py-0.5 text-[11px] font-bold text-ink">
                final + badge
              </span>
            </div>

            <h2
              className="mt-4 font-display text-2xl font-semibold text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
              style={{ textDecorationColor: course.color }}
            >
              {course.title}
            </h2>
            <p
              className="mt-1 font-display text-base italic leading-snug"
              style={{ color: course.color }}
            >
              {course.goal}
            </p>
            <p className="mt-2.5 flex-1 text-sm leading-6 text-stone">
              {course.description}
            </p>

            {/* Progress */}
            <div className="mt-5">
              {badge ? (
                <p
                  className="inline-flex -rotate-1 items-center gap-1.5 self-start rounded-md border-2 border-ink px-2.5 py-1 text-xs font-bold text-cream shadow-[2px_2px_0_#11211c]"
                  style={{ background: course.color }}
                >
                  Mastered · badge earned
                </p>
              ) : (
                <>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-ink/15 bg-cream">
                    <div
                      className="h-full rounded-full transition-[width]"
                      style={{
                        width: `${(done / total) * 100}%`,
                        background: course.color,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-ink/70">
                    {started
                      ? `${done} of ${total} read — keep going`
                      : done === total && total > 0
                        ? "All read — take the final"
                        : "Fresh start, about an evening of reading"}
                  </p>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
