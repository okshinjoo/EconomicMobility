"use client";

// The profile's skill-tree SECTION (July 16, 2026 — owner: "show the skill
// tree on the profile?", then "maybe make the skill tree a separate
// section"). Leads the account Progress tab full-width: a radial glyph of
// the tree (First-steps spoke + one spoke per topic, filling with branch
// color as guides are read or covered by mastery) beside the live skill
// points total and its breakdown — one home for tree + points, replacing
// the two earlier grid cards. Data rides the TopicPath prop the dashboard
// already receives, so the article registry never enters the client
// bundle; lighting comes from the same trackers, post-mount (server
// renders the zero state).

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
  skillPointsTotal,
  type SkillPointCounts,
} from "@/lib/skillPoints";
import type { TopicPath } from "@/components/WelcomeBack";

const INK = "#11211c";
const AMBER = "#e7a33c";
const FOREST = "#0c4a39";
const MUTED = "#5f6f66";

interface MiniLit {
  read: Record<string, number>;
  mastered: Set<string>;
  counts: SkillPointCounts;
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

export default function SkillTreeSection({ paths }: { paths: TopicPath[] }) {
  const [lit, setLit] = useState<MiniLit | null>(null);
  useEffect(() => {
    const counts = readSkillCounts();
    setLit({
      read: getReadMap(),
      mastered: new Set(Object.keys(getMasteryMap())),
      counts,
      points: skillPointsTotal(counts),
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
      done: lit?.counts.starters ?? 0,
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

  const breakdown = [
    [lit?.counts.guides ?? 0, "guides read"],
    [lit?.counts.tools ?? 0, "tools tried"],
    [lit?.counts.starters ?? 0, "quick wins"],
    [lit?.counts.quizzes ?? 0, "quizzes passed"],
    [lit?.counts.mastered ?? 0, "sections mastered"],
    [lit?.counts.courses ?? 0, "course badges"],
  ] as const;

  return (
    <section className="rounded-2xl border-2 border-ink/10 bg-cream p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-ink">
          Your skill tree
        </h2>
        <Link
          href="/skills"
          className="text-xs font-semibold text-forest hover:underline"
        >
          Open the full tree →
        </Link>
      </div>

      <div className="mt-2 flex flex-col items-center gap-x-10 gap-y-4 md:flex-row">
        <svg
          viewBox="0 0 260 260"
          className="h-60 w-60 shrink-0 sm:h-64 sm:w-64"
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
                  fill={
                    pct >= 1 ? s.color : pct > 0 ? `${s.color}40` : "#fdfbf2"
                  }
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

        <div
          className={`min-w-0 flex-1 ${lit ? "" : "animate-pulse opacity-60"}`}
        >
          <p className="font-display text-4xl font-bold tabular-nums text-forest">
            {(lit?.points ?? 0).toLocaleString()}
            <span className="ml-2 text-lg font-semibold text-stone">
              skill points
            </span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {breakdown.map(([count, label]) => (
              <div key={label}>
                <p className="font-display text-xl font-bold tabular-nums text-ink">
                  {count}
                </p>
                <p
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: MUTED }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-4 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: MUTED }}
          >
            Each spoke fills as you read or master that branch · counted
            live from what you&apos;ve done — never resets
          </p>
        </div>
      </div>
    </section>
  );
}
