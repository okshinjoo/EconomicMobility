"use client";

import { type CSSProperties, useState } from "react";
import Link from "next/link";
import ToolDoodle from "./ToolDoodle";

/**
 * Tools-hub category tile that flips (same 3D mechanics as the course
 * flashcards): front is the category face, back lists that category's
 * calculators as real links, so the flip is navigation, not decoration.
 * Mouse hover flips; touch and keyboard toggle via the front button
 * (pointerType gating, because a tap fires mouseenter AND click, which
 * would flip-then-unflip). Reduced motion degrades to an instant swap
 * via the global block.
 */
export default function CategoryFlipCard({
  catId,
  label,
  blurb,
  count,
  bg,
  accent,
  items,
}: {
  catId: string;
  label: string;
  blurb: string;
  count: number;
  bg: string;
  accent: string;
  /** Live calculators, final hrefs resolved by the caller. */
  items: { title: string; href: string }[];
}) {
  const [flipped, setFlipped] = useState(false);

  // Back rows ease up into place once the card is about halfway around.
  const backRow = (delay: number): CSSProperties => ({
    opacity: flipped ? 1 : 0,
    transform: flipped ? "translateY(0)" : "translateY(8px)",
    transition:
      "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: flipped ? `${delay}ms` : "0ms",
  });

  return (
    <div
      className="h-full [perspective:2000px]"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setFlipped(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setFlipped(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setFlipped(false);
      }}
    >
      <div
        className="relative h-full min-h-[17.5rem] [transform-style:preserve-3d]"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 500ms cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        {/* Front — in normal flow so it sizes the card; the back is
            absolute and must fit inside this height. */}
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-expanded={flipped}
          className="card-ink flex h-full w-full flex-col rounded-2xl p-6 text-left text-ink [backface-visibility:hidden]"
          style={{ backgroundColor: bg }}
        >
          <span className="flex w-full items-start justify-between gap-2">
            <ToolDoodle id={catId} color={accent} />
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums"
              style={{ color: accent, background: "rgba(255,255,255,0.6)" }}
            >
              {count} calculators
            </span>
          </span>
          <span className="mt-5 block font-display text-lg font-bold leading-tight">
            {label}
          </span>
          <span className="mt-1.5 flex-1 text-[13px] leading-5 text-ink/70">
            {blurb}
          </span>
          <span className="mt-3 text-xs font-medium text-ink/50">
            Peek inside
          </span>
        </button>

        {/* Back — the calculators themselves */}
        <div
          aria-hidden={!flipped}
          className="card-ink absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: bg }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ ...backRow(150), color: accent }}
          >
            {label}
          </span>
          <ul className="mt-2 flex-1 space-y-0.5">
            {items.map((item, i) => (
              <li key={item.href} style={backRow(190 + i * 40)}>
                <Link
                  href={item.href}
                  prefetch={false}
                  tabIndex={flipped ? 0 : -1}
                  className="inline-block text-[13px] font-semibold leading-[1.5] text-ink underline-offset-4 hover:underline hover:decoration-2"
                  style={{ textDecorationColor: accent }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`#${catId}`}
            tabIndex={flipped ? 0 : -1}
            style={backRow(190 + items.length * 40)}
            className="mt-2 text-xs font-bold underline decoration-2 underline-offset-4"
          >
            <span style={{ color: accent }}>Full details below</span>
          </a>
        </div>
      </div>
    </div>
  );
}
