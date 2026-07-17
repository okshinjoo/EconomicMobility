"use client";

// Mini skill tree for the profile (July 16, 2026, owner ask: "show the
// skill tree on the profile?"). A compact radial glyph of the same tree
// /skills draws — the First-steps spoke plus one spoke per topic, each
// filling with the branch's color as its guides are read or mastered.
// Data comes from the TopicPath prop the dashboard already receives, so
// the article registry never enters the client bundle; lighting comes
// from the same trackers, post-mount (server renders the zero state).

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap } from "@/lib/readTracking";
import {
  getMasteryMap,
  tierKey,
  STARTER_ACTIONS,
} from "@/lib/skillMastery";
import {
  readSkillCounts,
  readStarterSet,
  skillPointsTotal,
} from "@/lib/skillPoints";
import type { TopicPath } from "@/components/WelcomeBack";

const INK = "#11211c";
const AMBER = "#e7a33c";
const FOREST = "#0c4a39";

interface MiniLit {
  read: Record<string, number>;
  mastered: Set<string>;
  startersDone: number;
  points: number;
}

/** Covered = read, or inside a tier passed by mastery test-out. Tier index
 *  mirrors the roadmap: the order of distinct levels in the path. */
function coveredCount(p: TopicPath, lit: MiniLit): number {
  const levelOrder: string[] = [];
  for (const a of p.articles) {
    const lv = a.level ?? "Beginner";
    if (!levelOrder.includes(lv)) levelOrder.push(lv);
  }
  let n = 0;
  for (const a of p.articles) {
    const ti = levelOrder.indexOf(a.level ?? "Beginner");
    if (lit.read[a.slug] || lit.mastered.has(tierKey(p.id, ti))) n += 1;
  }
  return n;
}

export default function SkillTreeMini({ paths }: { paths: TopicPath[] }) {
  const [lit, setLit] = useState<MiniLit | null>(null);
  useEffect(() => {
    setLit({
      read: getReadMap(),
      mastered: new Set(Object.keys(getMasteryMap())),
      startersDone: readStarterSet().size,
      points: skillPointsTotal(readSkillCounts()),
    });
  }, []);

  const C = 130; // viewBox center
  const R0 = 34; // spokes start past the hub
  const R1 = 116; // spoke tips
  const n = paths.length + 1; // + the First-steps spoke

  const spokes = [
    {
      key: "starters",
      color: FOREST,
      label: "First steps",
      done: lit?.startersDone ?? 0,
      total: STARTER_ACTIONS.length,
    },
    ...paths.map((p) => ({
      key: p.id,
      color: p.color,
      label: p.short,
      done: lit ? coveredCount(p, lit) : 0,
      total: p.articles.length,
    })),
  ];

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          Your skill tree
        </h3>
        <Link
          href="/skills"
          className="text-xs font-semibold text-forest hover:underline"
        >
          Open the full tree →
        </Link>
      </div>
      <svg
        viewBox="0 0 260 260"
        className="mx-auto mt-2 h-52 w-52"
        role="img"
        aria-label={`Skill tree overview: ${spokes
          .map((s) => `${s.label} ${s.done} of ${s.total}`)
          .join(", ")}`}
      >
        {spokes.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const pct = s.total > 0 ? s.done / s.total : 0;
          const rTip = R0 + (R1 - R0) * pct;
          return (
            <g key={s.key}>
              <title>
                {s.label} — {s.done} of {s.total}
              </title>
              <line
                x1={C + R0 * cos}
                y1={C + R0 * sin}
                x2={C + R1 * cos}
                y2={C + R1 * sin}
                stroke="#11211c22"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="1 5"
              />
              {pct > 0 && (
                <line
                  x1={C + R0 * cos}
                  y1={C + R0 * sin}
                  x2={C + rTip * cos}
                  y2={C + rTip * sin}
                  stroke={s.color}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}
              <circle
                cx={C + R1 * cos}
                cy={C + R1 * sin}
                r={5.5}
                fill={pct >= 1 ? s.color : pct > 0 ? `${s.color}40` : "#fdfbf2"}
                stroke={pct > 0 ? s.color : `${s.color}66`}
                strokeWidth={2}
              />
            </g>
          );
        })}
        <circle cx={C} cy={C} r={26} fill={INK} />
        <text
          x={C}
          y={C - 1}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={AMBER}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {(lit?.points ?? 0).toLocaleString()}
        </text>
        <text
          x={C}
          y={C + 12}
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fill="#fdfbf2"
        >
          points
        </text>
      </svg>
      <p className="mt-1 text-center text-[12px] font-semibold text-stone">
        Each spoke fills as you read or master that branch — hover for
        counts.
      </p>
    </div>
  );
}
