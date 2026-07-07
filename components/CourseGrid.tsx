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
            className={`card-ink group flex flex-col rounded-2xl bg-paper p-6 transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
            style={{ background: `${course.color}0d` }}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: course.color }}
              >
                {total} guides · {course.cardCount} flashcards ·{" "}
                {course.quizCount}-question final
              </span>
              {badge && <BadgeMedal color={course.color} className="h-10 w-10 shrink-0" />}
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4" style={{ textDecorationColor: course.color }}>
              {course.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink/80">{course.goal}</p>
            <p className="mt-2 flex-1 text-sm leading-6 text-stone">
              {course.description}
            </p>

            {/* Progress */}
            <div className="mt-5">
              {badge ? (
                <p className="text-sm font-semibold" style={{ color: course.color }}>
                  Mastered — badge earned
                </p>
              ) : (
                <>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-sand">
                    <div
                      className="h-full rounded-full transition-[width]"
                      style={{
                        width: `${(done / total) * 100}%`,
                        background: course.color,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-stone">
                    {started
                      ? `${done} of ${total} read — keep going`
                      : done === total && total > 0
                        ? "All read — take the final"
                        : "Not started"}
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
