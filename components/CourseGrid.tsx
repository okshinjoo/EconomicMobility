"use client";

// The /courses hub grid, redesigned for pick-ability (owner feedback July
// 2026: the old cards were walls of same-looking text). Each card is now a
// color-banded poster: solid course-color header with the title + medal,
// then just the goal line, a compact meta row, and progress. The longer
// description lives on the course page, where you read it AFTER choosing.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { frameHref, type Frame } from "@/lib/frame";
import { getReadMap } from "@/lib/readTracking";
import { getBadges, BadgeMedal, type BadgeMap } from "@/components/CourseQuiz";
import CourseDoodle from "@/components/CourseDoodle";
import { readContext, type Goal } from "@/lib/personalization";

// Which normalized goal each course serves — so the person's goals float the
// matching course up (and label why). Courses with no clean goal (e.g. taxes,
// which isn't a profile goal) simply never boost.
const COURSE_GOAL: Record<string, Goal> = {
  "first-paycheck": "improve_budgeting",
  "credit-from-zero": "build_credit",
  "paying-for-college": "pay_for_college",
  "first-apartment": "improve_budgeting",
  "start-investing": "start_investing",
  "scam-proof": "protect_from_scams",
  "invest-smarter": "start_investing",
  "debt-comeback": "pay_off_debt",
  "retirement-started": "plan_for_retirement",
  "aid-season-playbook": "pay_for_college",
  "borrow-smart": "pay_for_college",
  "transfer-ready": "transfer_without_losing_money",
};

export interface CourseCardData {
  id: string;
  title: string;
  goal: string;
  description: string;
  color: string;
  articleSlugs: string[];
  cardCount: number;
  quizCount: number;
  /** Still being built — reading path live, final + badge not yet. */
  draft?: boolean;
}

export default function CourseGrid({ items, frame = "main" }: { items: CourseCardData[]; frame?: Frame }) {
  const [read, setRead] = useState<Record<string, number>>({});
  const [badges, setBadges] = useState<BadgeMap>({});
  // The person's normalized goals (post-mount, client-only). Courses that
  // serve one float up, with a "For your goal" chip.
  const [goals, setGoals] = useState<Set<Goal>>(new Set());

  useEffect(() => {
    setRead(getReadMap());
    setBadges(getBadges());
    setGoals(new Set(readContext().goals));
  }, []);

  // Stable goal-aware ordering: courses serving a picked goal lead, everything
  // else keeps its curated order. Never hides a course (memory contract).
  const ordered = useMemo(() => {
    if (goals.size === 0) return items;
    const matches = (c: CourseCardData) => {
      const g = COURSE_GOAL[c.id];
      return g ? goals.has(g) : false;
    };
    return [...items].sort(
      (a, b) => Number(matches(b)) - Number(matches(a))
    );
  }, [items, goals]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((course, i) => {
        const goal = COURSE_GOAL[course.id];
        const forYou = goal ? goals.has(goal) : false;
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
              {course.draft ? (
                <span className="relative shrink-0 -rotate-2 rounded-md border-2 border-cream/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
                  In progress
                </span>
              ) : (
                <BadgeMedal
                  color="#fbf8f1"
                  variant="course"
                  center={badge ? course.color : "#fbf8f1"}
                  className={`h-11 w-11 shrink-0 transition-opacity ${
                    badge ? "" : "opacity-30 group-hover:opacity-50"
                  }`}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col border-t-2 border-ink p-5">
              {forYou && (
                <span className="mb-2 inline-flex w-fit items-center rounded-full bg-forest/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest">
                  For your goal
                </span>
              )}
              <p
                className="font-display text-[1.05rem] italic leading-snug"
                style={{ color: course.color }}
              >
                {course.goal}
              </p>
              <p className="mt-3 text-xs font-semibold text-ink/60">
                {total} guides · {course.cardCount} flashcards ·{" "}
                {course.draft ? "final still being written" : "final + badge"}
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
                        ? `${done} of ${total} read. Keep going`
                        : done === total && total > 0
                          ? course.draft
                            ? "All read. The final is coming"
                            : "All read. Take the final"
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
