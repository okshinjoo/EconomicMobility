"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeMedal } from "@/components/CourseQuiz";
import {
  getChallengeProgress,
  getChallengeBadges,
  type ChallengeProgressMap,
  type ChallengeBadgeMap,
} from "@/components/ChallengeChecklist";

export interface ChallengeCardData {
  id: string;
  title: string;
  tagline: string;
  pace: string;
  color: string;
  stepCount: number;
}

export default function ChallengeGrid({ items }: { items: ChallengeCardData[] }) {
  const [progress, setProgress] = useState<ChallengeProgressMap>({});
  const [badges, setBadges] = useState<ChallengeBadgeMap>({});

  useEffect(() => {
    setProgress(getChallengeProgress());
    setBadges(getChallengeBadges());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((ch, i) => {
        const p = progress[ch.id];
        const done = p ? Object.keys(p.done).length : 0;
        const badge = badges[ch.id];
        // A minority of cards tilt ever so slightly (B voice).
        const tilt =
          i === 1 ? "lg:-rotate-[0.5deg]" : i === 3 ? "lg:rotate-[0.5deg]" : "";
        return (
          <Link
            key={ch.id}
            href={`/challenges/${ch.id}`}
            className={`card-ink group flex flex-col rounded-2xl bg-paper p-6 transition-transform duration-200 hover:-translate-y-1 ${tilt}`}
            style={{ background: `${ch.color}0d` }}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: ch.color }}
              >
                {ch.pace} · {ch.stepCount} steps
              </span>
              {badge && <BadgeMedal color={ch.color} className="h-10 w-10 shrink-0" />}
            </div>
            <h2
              className="mt-3 font-display text-2xl font-semibold text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
              style={{ textDecorationColor: ch.color }}
            >
              {ch.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-stone">{ch.tagline}</p>
            <div className="mt-5">
              {badge ? (
                <p className="text-sm font-semibold" style={{ color: ch.color }}>
                  Completed — badge earned
                </p>
              ) : p ? (
                <>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-sand">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(done / ch.stepCount) * 100}%`,
                        background: ch.color,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-stone">
                    {done} of {ch.stepCount} steps — keep going
                  </p>
                </>
              ) : (
                <p className="text-xs font-medium text-stone">
                  Not joined yet
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
