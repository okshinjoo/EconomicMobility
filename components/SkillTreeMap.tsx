"use client";

// SkillTreeMap — the radial mind-map view of the skill tree (July 16, 2026,
// owner ask: a Creately-style radial skill map; v2: per-guide branching
// pathways; v3: fluid curves + icon-only topic heads; v4 same day: "the
// bubbles shouldn't be placed next to each other" — a tier's guides now
// hang on 1-5 wandering TWIG CHAINS that sprout from the tier pill at
// different angles, each dot deeper than the last, and the limb continues
// from the middle twig's tip). Connectors are curved SVG paths — solid in
// the branch color where travelled, DOTTED grey where not yet. Topic heads
// are small TopicMark circles; the full category + count lives in the
// hover tooltip. Pure
// geometry (no Date/random — the server renders the zero-progress map, no
// hydration mismatch); lighting comes from the same Lit trackers SkillTree
// derives. Every node is a real link; undone nodes render pale, never
// locked (memory contract). Mouse drags to pan (native scroll covers
// touch); the Branch-list toggle in SkillTree keeps the accessible cards.
// v5: COMPREHENSIVE (owner: "should cover everything") — every course,
// life plan (journey), and live calculator hangs on its branch as leaf
// rings, and a tenth FIRST-STEPS branch carries the cross-cutting quick
// wins (budget calc, Reality Check, quiz, plan, profile, resources,
// community), lit from lit.starters.

import { useEffect, useRef, type ReactElement } from "react";
import Link from "next/link";
import { BookOpen, Route, Sparkles, Star, Wrench, Zap } from "lucide-react";
import TopicMark from "@/components/TopicMark";
import { BadgeMedal } from "@/components/CourseQuiz";
import type { SkillBranch, SkillTreeData } from "@/lib/skillTree";
import { MIN_MASTERY_POOL, tierKey } from "@/lib/skillMastery";
import type { Lit } from "@/components/SkillTree";

// Canvas geometry. Each branch owns a ±SECTOR angular lane; guide dots are
// laid out in rows whose per-row capacity grows with radius, so wide tiers
// wrap into extra rows instead of colliding with the neighboring branch.
// WOBBLE bends each branch's spine off the straight ray for the fluid look
// — SECTOR + WOBBLE must stay under half the 40° branch pitch.
const W = 3400;
const H = 3400;
const CX = W / 2;
const CY = H / 2;
const R_HEAD = 230; // radius of the topic head nodes
const WOBBLE = 0.035; // max spine bend (radians) per depth step
const DOT = 26; // guide-dot diameter
const DOT_STEP = 50; // radial spacing between dots along a twig chain
const DRIFT = 0.02; // per-dot angular wander along a chain
const TIER_LEAD = 62; // spine run from the previous band to a tier pill
const CHAIN_LEAD = 46; // tier pill to the first dot of its chains
const QUIZ_LEAD = 70; // limb end to the checkpoint diamond
const LEAF_LEAD = 92; // twig end to a tier's item ring
const LEAF_RING_STEP = 92; // radial spacing between item rings
const LEAF_GAP = 0.15; // angular spacing between items in a ring
const STARTER_STEP = 92; // radial spacing along the First-steps twigs
const STARTER_GAP = 0.3; // angular gap between the two starter twigs
const FOREST = "#0c4a39";

// Angular gap between sibling twig chains, by chain count — tuned so the
// widest fan plus wobble/drift stays inside the branch's 40° lane.
const CHAIN_GAP: Record<number, number> = {
  1: 0,
  2: 0.16,
  3: 0.15,
  4: 0.13,
  5: 0.115,
};

/** Split a tier's guides into 1-5 twig chains of near-equal length. */
function splitChains(len: number): number[] {
  if (len === 0) return [];
  const n = Math.min(5, Math.max(1, Math.ceil(len / 5)));
  const base = Math.floor(len / n);
  const rem = len % n;
  return Array.from({ length: n }, (_, c) => base + (c < rem ? 1 : 0));
}

const CREAM = "#fdfbf2";
const INK = "#11211c";
const MUTED = "#77807a";
const AMBER = "#e7a33c";

type NodeState = "done" | "part" | "none";

/** A non-article node woven into the limb: tool, course, or life plan. */
interface BranchItem {
  key: string;
  href: string;
  title: string;
  done: boolean;
  icon: "tool" | "course" | "journey";
  label: string;
  color: string;
}

/** Solid = done, tinted = in progress, pale = not yet. */
function fill(state: NodeState, color: string) {
  if (state === "done")
    return { backgroundColor: color, borderColor: INK, color: CREAM };
  if (state === "part")
    return { backgroundColor: `${color}2b`, borderColor: color, color: INK };
  return { backgroundColor: CREAM, borderColor: `${color}59`, color: MUTED };
}

function pt(r: number, a: number) {
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

/** Deterministic per-branch, per-depth spine bend — the fluid meander. */
function wob(branch: number, depth: number) {
  return Math.sin(branch * 2.1 + depth * 1.9) * WOBBLE;
}

interface XY {
  x: number;
  y: number;
}

/** A gently bowed quadratic curve between two points. */
function curve(p1: XY, p2: XY, bow: number) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy) || 1;
  const b = Math.min(30, len * 0.22) * bow;
  const mx = (p1.x + p2.x) / 2 - (dy / len) * b;
  const my = (p1.y + p2.y) / 2 + (dx / len) * b;
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

interface MapPath {
  d: string;
  color: string;
  lit: boolean;
}

export default function SkillTreeMap({
  data,
  lit,
  points,
  onTestOut,
}: {
  data: SkillTreeData;
  lit: Lit;
  /** Derived skill-points total (computed by SkillTree, shown in the hub). */
  points: number;
  /** Open a mastery test-out (ti null = the whole topic). */
  onTestOut: (b: SkillBranch, ti: number | null) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    sl: number;
    st: number;
    moved: boolean;
  } | null>(null);

  // Open centered on the hub.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = (W - el.clientWidth) / 2;
    el.scrollTop = (H - el.clientHeight) / 2;
  }, []);

  const n = data.branches.length + 1; // +1: the First-steps branch leads
  const paths: MapPath[] = [];
  const nodes: ReactElement[] = [];
  const center = { x: CX, y: CY };

  let guidesRead = 0;

  // Branch 0 — First steps: the cross-cutting quick wins (fill out the
  // Budget Planner, do the Reality Check, take the quiz, build My Plan,
  // round out your profile, browse resources, say something in community).
  {
    const a = -Math.PI / 2;
    const doneCount = data.starters.filter((s) =>
      lit.starters.has(s.id)
    ).length;
    const headState: NodeState =
      doneCount === data.starters.length
        ? "done"
        : doneCount > 0
          ? "part"
          : "none";
    const head = pt(R_HEAD, a + wob(9, 0));
    const startPct = lit.mounted ? doneCount / data.starters.length : 0;
    const startPctLabel = Math.round(startPct * 100);
    paths.push({
      d: curve(center, head, 1),
      color: FOREST,
      lit: headState !== "none",
    });
    nodes.push(
      <Link
        key="starters-head"
        href="/start-here"
        title={`First steps — quick wins that make the site yours · ${startPctLabel}% done (${
          lit.mounted ? doneCount : 0
        } of ${data.starters.length})`}
        aria-label={`First steps: ${startPctLabel}% done`}
        className="group absolute z-10 flex items-center justify-center rounded-full border-2 transition-transform duration-300 hover:z-20 hover:scale-110"
        style={{
          left: head.x,
          top: head.y,
          width: 58,
          height: 58,
          transform: "translate(-50%, -50%)",
          backgroundColor: FOREST,
          borderColor: INK,
          color: CREAM,
        }}
      >
        <Sparkles
          className="h-6 w-6 shrink-0 transition-opacity duration-200 group-hover:opacity-0"
          strokeWidth={2.25}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundColor: CREAM }}
        >
          <span
            className="absolute inset-x-0 bottom-0"
            style={{ height: `${startPctLabel}%`, backgroundColor: FOREST }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-[13px] font-bold tabular-nums"
            style={{ color: INK, textShadow: "0 0 6px #fdfbf2" }}
          >
            {startPctLabel}%
          </span>
        </span>
      </Link>
    );
    const sizes = [
      Math.ceil(data.starters.length / 2),
      Math.floor(data.starters.length / 2),
    ];
    let taken = 0;
    sizes.forEach((sz, c) => {
      const baseA = a + (c - 0.5) * STARTER_GAP;
      let prevDot = head;
      for (let j = 0; j < sz; j++) {
        const r = R_HEAD + 90 + j * STARTER_STEP;
        const da = baseA + Math.sin(9 * 3.7 + c * 2.9 + j * 1.3) * 0.015;
        const p = pt(r, da);
        const s = data.starters[taken + j];
        const done = lit.starters.has(s.id);
        paths.push({
          d: curve(prevDot, p, (c + j) % 2 ? 0.7 : -0.7),
          color: FOREST,
          lit: done,
        });
        nodes.push(
          <Link
            key={`starter-${s.id}`}
            href={s.href}
            title={`${s.label}${lit.mounted && done ? " — done" : ""}`}
            className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-1.5 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
            style={{
              left: p.x,
              top: p.y,
              width: 74,
              height: 74,
              transform: "translate(-50%, -50%)",
              ...fill(done ? "done" : "none", FOREST),
            }}
          >
            <Zap
              className="h-3.5 w-3.5 shrink-0"
              strokeWidth={2.5}
              fill={done ? AMBER : "none"}
              style={done ? { color: AMBER } : undefined}
            />
            <span className="line-clamp-2 text-[9px] font-bold leading-[1.2]">
              {s.short}
            </span>
          </Link>
        );
        prevDot = p;
      }
      taken += sz;
    });
  }

  data.branches.forEach((b, i) => {
    const a = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const readCount = b.tiers.reduce(
      (m, t) => m + t.articles.filter((x) => lit.read[x.slug]).length,
      0
    );
    guidesRead += readCount;
    const headState: NodeState =
      b.guideTotal > 0 && readCount === b.guideTotal
        ? "done"
        : readCount > 0
          ? "part"
          : "none";
    const isGoal = lit.goalTopics.has(b.id);
    let depth = 0; // wobble/bow counter down the branch

    // Head completion: everything on the branch with a done-state —
    // guides (read or covered by mastery), the checkpoint quiz, tools,
    // and courses. Powers the hover gauge.
    const coveredGuides = b.tiers.reduce((m, t, ti) => {
      const tierMastered = lit.mastered.has(tierKey(b.id, ti));
      return (
        m + t.articles.filter((x) => lit.read[x.slug] || tierMastered).length
      );
    }, 0);
    const headDoneItems =
      coveredGuides +
      (b.hasQuiz && lit.quizzes.has(b.id) ? 1 : 0) +
      b.tools.filter((t) => lit.tools.has(t.href)).length +
      b.courses.filter((c) => lit.badges.has(c.id)).length;
    const headTotalItems =
      b.guideTotal + (b.hasQuiz ? 1 : 0) + b.tools.length + b.courses.length;
    const headPct =
      headTotalItems > 0 && lit.mounted ? headDoneItems / headTotalItems : 0;
    const headPctLabel = Math.round(headPct * 100);

    // Head node — the topic, icon-only and ALWAYS solid in its color
    // (owner, July 16: "the main topic circles should be fully filled
    // in"); hovering flips it to a gauge that fills bottom-up with the
    // topic's completion.
    const head = pt(R_HEAD, a + wob(i, depth));
    paths.push({
      d: curve(center, head, i % 2 ? 1 : -1),
      color: b.color,
      lit: headState !== "none",
    });
    nodes.push(
      <Link
        key={`${b.id}-head`}
        href={b.href}
        title={`${b.title}${
          isGoal ? " · your goal" : ""
        } — ${headPctLabel}% complete (${
          lit.mounted ? readCount : 0
        } of ${b.guideTotal} guides read)`}
        aria-label={`${b.title}: ${headPctLabel}% complete`}
        className="group absolute z-10 flex items-center justify-center rounded-full border-2 transition-transform duration-300 hover:z-20 hover:scale-110"
        style={{
          left: head.x,
          top: head.y,
          width: 58,
          height: 58,
          transform: "translate(-50%, -50%)",
          backgroundColor: b.color,
          borderColor: INK,
          boxShadow: isGoal ? `0 0 0 3px ${AMBER}` : undefined,
        }}
      >
        <TopicMark
          id={b.id}
          color={CREAM}
          className="h-7 w-7 shrink-0 transition-opacity duration-200 group-hover:opacity-0"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundColor: CREAM }}
        >
          <span
            className="absolute inset-x-0 bottom-0"
            style={{
              height: `${headPctLabel}%`,
              backgroundColor: b.color,
            }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-[13px] font-bold tabular-nums"
            style={{ color: INK, textShadow: "0 0 6px #fdfbf2" }}
          >
            {headPctLabel}%
          </span>
        </span>
      </Link>
    );

    // Non-article tasks are woven INTO the limb, not parked at the tip
    // (owner: "intertwined with the other topics, shouldn't just be the
    // articles"): life plans follow the Start-here guides, calculators
    // follow the middle tier, courses follow the last tier — and the quiz
    // diamond stays the capstone.
    const tierItems: BranchItem[][] = b.tiers.map(() => []);
    if (b.tiers.length > 0) {
      const mid = Math.min(1, b.tiers.length - 1);
      const last = b.tiers.length - 1;
      b.journeys.forEach((j) =>
        tierItems[0].push({
          key: `${b.id}-j-${j.id}`,
          href: `/journey/${j.id}`,
          title: `Life plan: ${j.title}`,
          done: false,
          icon: "journey",
          label: j.title,
          color: b.color,
        })
      );
      b.tools.forEach((t) =>
        tierItems[mid].push({
          key: `${b.id}-tool-${t.href}`,
          href: t.href,
          title: `Tool: ${t.label}`,
          done: lit.tools.has(t.href),
          icon: "tool",
          label: t.label,
          color: b.color,
        })
      );
      b.courses.forEach((c) =>
        tierItems[last].push({
          key: `${b.id}-c-${c.id}`,
          href: `/courses/${c.id}`,
          title: `Course: ${c.title}`,
          done: lit.badges.has(c.id),
          icon: "course",
          label: c.title,
          color: c.color,
        })
      );
    }

    // Tier bands: a labeled pill on the spine, then the tier's guides as
    // dots in rows — several guides share the same depth and branch off.
    let rCur = R_HEAD;
    let prev = head;
    b.tiers.forEach((tier, ti) => {
      const done = tier.articles.filter((x) => lit.read[x.slug]).length;
      const full =
        tier.articles.length > 0 && done === tier.articles.length;
      const mastered = lit.mastered.has(tierKey(b.id, ti));
      const state: NodeState =
        full || mastered ? "done" : done > 0 ? "part" : "none";
      depth += 1;
      const chipR = rCur + TIER_LEAD;
      const chipA = a + wob(i, depth);
      const chip = pt(chipR, chipA);
      paths.push({
        d: curve(prev, chip, depth % 2 ? 1 : -1),
        color: b.color,
        lit: state !== "none",
      });
      const next =
        tier.articles.find((x) => !lit.read[x.slug]) ?? tier.articles[0];
      const canTest =
        lit.mounted &&
        !full &&
        !mastered &&
        tier.mastery.length >= MIN_MASTERY_POOL;
      const pillLabel = (
        <>
          {tier.label} ·{" "}
          {mastered && !full
            ? "mastered ★"
            : `${lit.mounted ? done : 0}/${tier.articles.length}`}
        </>
      );
      const pillClass =
        "absolute z-10 whitespace-nowrap rounded-md border-2 px-2 py-0.5 text-[10px] font-bold transition-colors duration-500 hover:z-20 hover:scale-105";
      const pillStyle = {
        left: chip.x,
        top: chip.y,
        transform: "translate(-50%, -50%)",
        ...fill(state, b.color),
      };
      nodes.push(
        canTest ? (
          // Not finished and testable: the pill opens the test-out dialog
          // (which itself links onward to the next unread guide).
          <button
            key={`${b.id}-chip-${ti}`}
            type="button"
            onClick={() => onTestOut(b, ti)}
            title={`${b.short} · ${tier.label}: ${done} of ${tier.articles.length} read — continue, or test out if you already know it`}
            className={pillClass}
            style={pillStyle}
          >
            {pillLabel}
          </button>
        ) : (
          <Link
            key={`${b.id}-chip-${ti}`}
            href={next ? `${b.href}/${next.slug}` : b.href}
            title={`${b.short} · ${tier.label}: ${
              lit.mounted ? done : 0
            } of ${tier.articles.length} read${
              mastered && !full ? " · mastered by test-out" : ""
            }${next ? ` — next: ${next.title}` : ""}`}
            className={pillClass}
            style={pillStyle}
          >
            {pillLabel}
          </Link>
        )
      );

      // Twig chains: the tier's guides wander outward on 1-5 curving
      // offshoots — no two bubbles side by side, each one deeper than the
      // last. The limb continues from the middle twig's tip.
      const sizes = splitChains(tier.articles.length);
      const chainStart = chipR + CHAIN_LEAD;
      const gap = CHAIN_GAP[sizes.length] ?? 0.13;
      const midIdx = Math.floor((sizes.length - 1) / 2);
      let continueFrom = chip;
      let taken = 0;
      sizes.forEach((sz, c) => {
        const baseA = chipA + (c - (sizes.length - 1) / 2) * gap;
        let prevDot = chip;
        for (let j = 0; j < sz; j++) {
          const r = chainStart + j * DOT_STEP;
          const da =
            baseA + Math.sin(i * 3.7 + c * 2.9 + j * 1.3) * DRIFT;
          const p = pt(r, da);
          const art = tier.articles[taken + j];
          const read = Boolean(lit.read[art.slug]);
          paths.push({
            d: curve(prevDot, p, (c + j) % 2 ? 0.7 : -0.7),
            color: b.color,
            lit: read || mastered,
          });
          nodes.push(
            <Link
              key={`${b.id}-g-${art.slug}`}
              href={`${b.href}/${art.slug}`}
              title={`${art.title}${
                lit.mounted && read
                  ? " — read"
                  : lit.mounted && mastered
                    ? " — covered by your mastery test"
                    : ""
              }`}
              aria-label={`${art.title}${
                lit.mounted && read ? " (read)" : ""
              }`}
              className="absolute z-10 flex items-center justify-center rounded-full border-2 transition-colors duration-500 hover:z-20 hover:scale-125"
              style={{
                left: p.x,
                top: p.y,
                width: DOT,
                height: DOT,
                transform: "translate(-50%, -50%)",
                backgroundColor: read
                  ? b.color
                  : mastered
                    ? `${b.color}2b`
                    : CREAM,
                borderColor: read ? INK : `${b.color}${mastered ? "" : "66"}`,
                color: read ? CREAM : `${b.color}99`,
              }}
            >
              <BookOpen className="h-3 w-3 shrink-0" strokeWidth={2.5} />
            </Link>
          );
          prevDot = p;
          if (c === midIdx && j === sz - 1) continueFrom = p;
        }
        taken += sz;
      });
      rCur = sizes.length
        ? chainStart + (Math.max(...sizes) - 1) * DOT_STEP
        : chipR;
      prev = continueFrom;

      // This tier's tools/courses/life plans, in rings of up to three,
      // before the next tier pill — the limb passes straight through them.
      const items = [...tierItems[ti]];
      let anchor = prev;
      for (let ring = 0; items.length > 0; ring++) {
        const row = items.splice(0, 3);
        const r = rCur + LEAF_LEAD + ring * LEAF_RING_STEP;
        const positions = row.map((_, j) =>
          pt(r, chipA + (j - (row.length - 1) / 2) * LEAF_GAP)
        );
        row.forEach((item, j) => {
          const p = positions[j];
          paths.push({
            d: curve(anchor, p, j % 2 ? 0.8 : -0.8),
            color: b.color,
            lit: item.done,
          });
          nodes.push(
            <Link
              key={item.key}
              href={item.href}
              title={`${item.title}${
                lit.mounted && item.done ? " — done" : ""
              }`}
              className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-1.5 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
              style={{
                left: p.x,
                top: p.y,
                width: 72,
                height: 72,
                transform: "translate(-50%, -50%)",
                ...fill(item.done ? "done" : "none", item.color),
              }}
            >
              {item.icon === "tool" ? (
                <Wrench className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              ) : item.icon === "journey" ? (
                <Route className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              ) : (
                <BadgeMedal
                  color={item.done ? CREAM : "#9aa39b"}
                  variant="course"
                  className="h-3.5 w-3.5 shrink-0"
                />
              )}
              <span className="line-clamp-2 text-[8.5px] font-bold leading-[1.15]">
                {item.label}
              </span>
            </Link>
          );
        });
        anchor = positions[Math.floor((positions.length - 1) / 2)];
        rCur = r;
      }
      prev = anchor;
    });

    // The checkpoint-quiz diamond caps the chain.
    if (b.hasQuiz) {
      depth += 1;
      const p = pt(rCur + QUIZ_LEAD, a + wob(i, depth));
      const done = lit.quizzes.has(b.id);
      paths.push({
        d: curve(prev, p, depth % 2 ? 1 : -1),
        color: b.color,
        lit: done,
      });
      nodes.push(
        <Link
          key={`${b.id}-quiz`}
          href={`${b.href}/quiz`}
          title={`${b.short} checkpoint quiz${done ? " — passed" : ""}`}
          className="absolute z-10 flex items-center justify-center rounded-xl border-2 transition-colors duration-500 hover:z-20 hover:scale-110"
          style={{
            left: p.x,
            top: p.y,
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%) rotate(45deg)",
            ...fill(done ? "done" : "none", b.color),
          }}
        >
          <Star
            className="h-4.5 w-4.5 -rotate-45"
            strokeWidth={2.5}
            fill={done ? AMBER : "none"}
            style={done ? { color: AMBER } : undefined}
          />
        </Link>
      );
      prev = p;
      rCur += QUIZ_LEAD;
    }

  });

  // Drag-to-pan (mouse only — touch gets native scroll). A real drag
  // suppresses the click so links don't fire mid-pan.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      sl: el.scrollLeft,
      st: el.scrollTop,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    el.scrollLeft = d.sl - dx;
    el.scrollTop = d.st - dy;
  };
  const endDrag = () => {
    // Cleared after the click event has had its chance to be suppressed.
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={scroller}
      className="relative h-[520px] cursor-grab overflow-auto overscroll-contain rounded-2xl border-2 border-ink/10 bg-cream active:cursor-grabbing sm:h-[600px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <div
        className="relative"
        style={{
          width: W,
          height: H,
          backgroundImage: "radial-gradient(#11211c14 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        onClickCapture={onClickCapture}
      >
        <svg
          className="absolute inset-0"
          width={W}
          height={H}
          aria-hidden="true"
        >
          {paths.map((l, idx) => (
            <path
              key={idx}
              d={l.d}
              fill="none"
              stroke={l.lit ? l.color : "#11211c33"}
              strokeWidth={l.lit ? 3 : 2}
              strokeLinecap="round"
              strokeDasharray={l.lit ? undefined : "1 8"}
              style={{ transition: "stroke 500ms" }}
            />
          ))}
        </svg>

        {/* The hub */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center rounded-full border-2 text-center"
          style={{
            left: CX,
            top: CY,
            width: 136,
            height: 136,
            transform: "translate(-50%, -50%)",
            backgroundColor: INK,
            borderColor: INK,
            color: CREAM,
          }}
        >
          <span className="font-display text-[15px] font-bold leading-tight">
            Your money
            <br />
            skills
          </span>
          <span
            className="mt-1 text-[11px] font-bold tabular-nums"
            style={{ color: AMBER }}
          >
            {lit.mounted ? guidesRead : 0}/{data.guidesTotal} guides
          </span>
          <span className="text-[10px] font-bold tabular-nums text-cream/70">
            {lit.mounted ? points.toLocaleString() : 0} skill points
          </span>
        </div>

        {nodes}
      </div>
    </div>
  );
}
