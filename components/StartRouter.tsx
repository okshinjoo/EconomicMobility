"use client";

// The "Where are you right now?" homepage intent-router (first-time-journey
// redesign prototype, July 2026). Three human doors instead of choice overload:
// New to money / In school / Have a goal. Server-renders the generic three
// (no hydration mismatch), then — post-mount — adapts the third door to the
// person's top saved goal via the normalized personalization context, so a
// returning visitor gets "pick up your <goal> path" instead of a cold quiz
// prompt. Memory contract: the band never disappears; it only sharpens.

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  readContext,
  rankedPriorities,
  journeySlugForGoal,
  GOAL_LABEL,
} from "@/lib/personalization";

interface Door {
  label: string;
  desc: string;
  href: string;
}

// Server + first-paint default (identical on server and client → no mismatch).
const BASE_DOORS: Door[] = [
  {
    label: "New to money",
    desc: "A quick tour and the first guides worth reading — start from zero, no jargon.",
    href: "/start-here",
  },
  {
    label: "In school",
    desc: "Scholarships, financial-aid deadlines, and money tools built for students.",
    href: "/students",
  },
  {
    label: "Have a money goal",
    desc: "Take the 2-minute quiz and get a path built around your situation.",
    href: "/quiz",
  },
];

export default function StartRouter() {
  const [doors, setDoors] = useState<Door[]>(BASE_DOORS);

  useEffect(() => {
    const top = rankedPriorities(readContext())[0];
    if (!top) return; // nothing saved yet — keep the generic quiz door
    const next = [...BASE_DOORS];
    next[2] = {
      label: `Working on ${GOAL_LABEL[top.goal]}`,
      desc: "Pick up your path right where you left off.",
      href: `/journey/${journeySlugForGoal(top.goal)}`,
    };
    setDoors(next);
  }, []);

  return (
    <section className="border-b-2 border-ink bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          Start where you are
        </span>
        <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
          Where are you right now?
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
          Pick the one that fits today. You can always explore the rest —
          nothing here is locked, and no account is required.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {doors.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                {d.label}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                {d.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
