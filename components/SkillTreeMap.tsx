"use client";

// SkillTreeMap — the radial mind-map view of the skill tree (July 16, 2026,
// owner ask: make the tree LOOK like a Creately-style radial skill map).
// Pure geometry (deterministic, no Date/random — the server renders the
// zero-progress map, no hydration mismatch); lighting comes from the same
// Lit trackers SkillTree derives. Every node is a real link; undone nodes
// render pale, never locked (memory contract). Mouse drags to pan (native
// scroll covers touch); the Branch-list toggle in SkillTree keeps the
// accessible card view with the full detail.

import { useEffect, useRef, type ReactElement } from "react";
import Link from "next/link";
import { Star, Wrench } from "lucide-react";
import TopicMark from "@/components/TopicMark";
import { BadgeMedal } from "@/components/CourseQuiz";
import type { SkillTreeData } from "@/lib/skillTree";
import type { Lit } from "@/components/SkillTree";

// Canvas geometry — an ellipse (y squashed) so the map reads wide like a
// whiteboard, not a tall circle.
const W = 1820;
const H = 1300;
const CX = W / 2;
const CY = H / 2;
const SQUASH = 0.66;
const R_HEAD = 185; // radius of the topic head nodes
const STEP = 132; // spacing between chain nodes along an arm
const LEAF_STEP = 124; // tool/course leaves sit past the chain's end
const LEAF_SPREAD = 0.115; // radians between the two leaves

const CREAM = "#fdfbf2";
const INK = "#11211c";
const MUTED = "#77807a";
const AMBER = "#e7a33c";

type NodeState = "done" | "part" | "none";

/** Solid = done, tinted = in progress, pale = not yet. */
function fill(state: NodeState, color: string) {
  if (state === "done")
    return { backgroundColor: color, borderColor: INK, color: CREAM };
  if (state === "part")
    return { backgroundColor: `${color}2b`, borderColor: color, color: INK };
  return { backgroundColor: CREAM, borderColor: `${color}59`, color: MUTED };
}

function pt(r: number, a: number) {
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) * SQUASH };
}

interface MapLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  lit: boolean;
}

export default function SkillTreeMap({
  data,
  lit,
}: {
  data: SkillTreeData;
  lit: Lit;
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

  const n = data.branches.length;
  const lines: MapLine[] = [];
  const nodes: ReactElement[] = [];
  const center = { x: CX, y: CY };

  let guidesRead = 0;

  data.branches.forEach((b, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
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

    // Head node — the topic.
    const head = pt(R_HEAD, a);
    lines.push({
      x1: center.x,
      y1: center.y,
      x2: head.x,
      y2: head.y,
      color: b.color,
      lit: headState !== "none",
    });
    nodes.push(
      <Link
        key={`${b.id}-head`}
        href={b.href}
        title={`${b.title}${isGoal ? " · your goal" : ""} — ${
          lit.mounted ? readCount : 0
        } of ${b.guideTotal} guides read`}
        className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-2 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
        style={{
          left: head.x,
          top: head.y,
          width: 104,
          height: 104,
          transform: "translate(-50%, -50%)",
          ...fill(headState, b.color),
          boxShadow: isGoal ? `0 0 0 3px ${AMBER}` : undefined,
        }}
      >
        <TopicMark
          id={b.id}
          color={headState === "done" ? CREAM : b.color}
          className="h-6 w-6 shrink-0"
        />
        <span className="text-[10px] font-bold leading-[1.15]">{b.short}</span>
        <span className="text-[9.5px] font-bold tabular-nums opacity-80">
          {lit.mounted ? readCount : 0}/{b.guideTotal}
        </span>
      </Link>
    );

    // Chain: tier nodes, then the checkpoint-quiz diamond.
    let prev = head;
    let k = 0;
    b.tiers.forEach((tier, ti) => {
      k += 1;
      const p = pt(R_HEAD + k * STEP, a);
      const done = tier.articles.filter((x) => lit.read[x.slug]).length;
      const state: NodeState =
        tier.articles.length > 0 && done === tier.articles.length
          ? "done"
          : done > 0
            ? "part"
            : "none";
      lines.push({
        x1: prev.x,
        y1: prev.y,
        x2: p.x,
        y2: p.y,
        color: b.color,
        lit: state !== "none",
      });
      const next =
        tier.articles.find((x) => !lit.read[x.slug]) ?? tier.articles[0];
      nodes.push(
        <Link
          key={`${b.id}-t${ti}`}
          href={next ? `${b.href}/${next.slug}` : b.href}
          title={`${b.short} · ${tier.label}: ${
            lit.mounted ? done : 0
          } of ${tier.articles.length} read${
            next ? ` — next: ${next.title}` : ""
          }`}
          className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-1.5 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
          style={{
            left: p.x,
            top: p.y,
            width: 82,
            height: 82,
            transform: "translate(-50%, -50%)",
            ...fill(state, b.color),
          }}
        >
          <span className="text-[10px] font-bold leading-[1.1]">
            {tier.label}
          </span>
          <span className="text-[9.5px] font-bold tabular-nums opacity-80">
            {lit.mounted ? done : 0}/{tier.articles.length}
          </span>
        </Link>
      );
      prev = p;
    });

    if (b.hasQuiz) {
      k += 1;
      const p = pt(R_HEAD + k * STEP, a);
      const done = lit.quizzes.has(b.id);
      lines.push({
        x1: prev.x,
        y1: prev.y,
        x2: p.x,
        y2: p.y,
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
            width: 54,
            height: 54,
            transform: "translate(-50%, -50%) rotate(45deg)",
            ...fill(done ? "done" : "none", b.color),
          }}
        >
          <Star
            className="h-5 w-5 -rotate-45"
            strokeWidth={2.5}
            fill={done ? AMBER : "none"}
            style={done ? { color: AMBER } : undefined}
          />
        </Link>
      );
      prev = p;
    }

    // Leaves: the topic's tool and flagship course fan out at the tip.
    const leafR = R_HEAD + k * STEP + LEAF_STEP;
    const both = Boolean(b.tool && b.course);
    if (b.tool) {
      const p = pt(leafR, a + (both ? -LEAF_SPREAD : 0));
      const done = lit.tools.has(b.tool.href);
      lines.push({
        x1: prev.x,
        y1: prev.y,
        x2: p.x,
        y2: p.y,
        color: b.color,
        lit: done,
      });
      nodes.push(
        <Link
          key={`${b.id}-tool`}
          href={b.tool.href}
          title={`Tool: ${b.tool.label}${done ? " — tried" : ""}`}
          className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-1.5 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
          style={{
            left: p.x,
            top: p.y,
            width: 80,
            height: 80,
            transform: "translate(-50%, -50%)",
            ...fill(done ? "done" : "none", b.color),
          }}
        >
          <Wrench className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
          <span className="line-clamp-2 text-[9px] font-bold leading-[1.15]">
            {b.tool.label}
          </span>
        </Link>
      );
    }
    if (b.course) {
      const p = pt(leafR, a + (both ? LEAF_SPREAD : 0));
      const done = lit.badges.has(b.course.id);
      lines.push({
        x1: prev.x,
        y1: prev.y,
        x2: p.x,
        y2: p.y,
        color: b.color,
        lit: done,
      });
      nodes.push(
        <Link
          key={`${b.id}-course`}
          href={`/courses/${b.course.id}`}
          title={`Course: ${b.course.title}${done ? " — badge earned" : ""}`}
          className="absolute z-10 flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 px-1.5 text-center transition-colors duration-500 hover:z-20 hover:scale-105"
          style={{
            left: p.x,
            top: p.y,
            width: 80,
            height: 80,
            transform: "translate(-50%, -50%)",
            ...fill(done ? "done" : "none", b.course.color),
          }}
        >
          <BadgeMedal
            color={done ? CREAM : "#9aa39b"}
            variant="course"
            className="h-4 w-4 shrink-0"
          />
          <span className="line-clamp-2 text-[9px] font-bold leading-[1.15]">
            {b.course.title}
          </span>
        </Link>
      );
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
          {lines.map((l, idx) => (
            <line
              key={idx}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={l.lit ? l.color : "#11211c26"}
              strokeWidth={l.lit ? 3 : 2}
              strokeLinecap="round"
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
        </div>

        {nodes}
      </div>
    </div>
  );
}
