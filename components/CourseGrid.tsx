"use client";

// The /courses hub grid, redesigned for pick-ability (owner feedback July
// 2026: the old cards were walls of same-looking text). Each card is now a
// color-banded poster: solid course-color header with the title + medal,
// then just the goal line, a compact meta row, and progress. The longer
// description lives on the course page, where you read it AFTER choosing.

import { useEffect, useState } from "react";
import Link from "next/link";
import { frameHref, type Frame } from "@/lib/frame";
import { getReadMap } from "@/lib/readTracking";
import { getBadges, BadgeMedal, type BadgeMap } from "@/components/CourseQuiz";
import CourseDoodle from "@/components/CourseDoodle";

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

export default function CourseGrid({ items, frame = "main" }: { items: CourseCardData[]; frame?: Frame }) {
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
            href={frameHref(`/courses/${course.id}`, frame)}
            className={`card-ink group flex flex-col overflow-hidden rounded-2xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
          >
            {/* Poster band: the course's own color does the differentiating,
                with a ghost topic mark drifting off the corner */}
            <div
              className="relative flex items-start justify-between gap-3 overflow-hidden p-5 pb-4"
              style={{ background: course.color }}
            >
              <CourseDoodle
                id={course.id}
                className="pointer-events-none absolute -bottom-4 right-16 h-24 w-24 -rotate-6 text-cream opacity-30 transition-transform duration-300 group-hover:rotate-0"
              />
              <h2 className="relative font-display text-2xl font-semibold leading-tight text-cream">
                {course.title}
              </h2>
              <BadgeMedal
                color="#fbf8f1"
                className={`h-11 w-11 shrink-0 transition-opacity ${
                  badge ? "" : "opacity-30 group-hover:opacity-50"
                }`}
              />
            </div>

            <div className="flex flex-1 flex-col border-t-2 border-ink p-5">
              <p
                className="font-display text-[1.05rem] italic leading-snug"
                style={{ color: course.color }}
              >
                {course.goal}
              </p>
              <p className="mt-3 text-xs font-semibold text-ink/60">
                {total} guides · {course.cardCount} flashcards · final + badge
              </p>

              <div className="mt-auto pt-4">
                {badge ? (
                  <p
                    className="inline-flex -rotate-1 items-center gap-1.5 rounded-md border-2 border-ink px-2.5 py-1 text-xs font-bold text-cream shadow-[2px_2px_0_#11211c]"
                    style={{ background: course.color }}
                  >
                    Mastered · badge earned
                  </p>
                ) : (
                  <>
                    <div className="h-2 w-full overflow-hidden rounded-full border border-ink/15 bg-paper">
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
                          : "About an evening of reading"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
