"use client";

import { type CSSProperties, useState } from "react";
import Link from "next/link";
import ToolDoodle from "./ToolDoodle";
import ToolMark from "./ToolMark";

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
  items: { title: string; href: string; slug: string; main?: boolean }[];
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
          {/* The doodle is a wide banner graphic — give it the full card
              width instead of squeezing it beside a pill. */}
          <ToolDoodle id={catId} color={accent} />
          <span className="mt-4 flex w-full items-end justify-between gap-3">
            <span className="font-display text-xl font-bold leading-tight">
              {label}
            </span>
            <span className="shrink-0 text-right">
              <span
                className="block font-display text-2xl font-bold leading-none tabular-nums"
                style={{ color: accent }}
              >
                {count}
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.14em] text-ink/50">
                calculators
              </span>
            </span>
          </span>
          <span
            className="mt-2 block h-1 w-8 rounded-full"
            style={{ background: accent }}
          />
          <span className="mt-2 flex-1 text-[13px] leading-5 text-ink/70">
            {blurb}
          </span>
          <span
            className="mt-3 text-xs font-bold text-ink/60 underline decoration-2 underline-offset-4"
            style={{ textDecorationColor: accent }}
          >
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
            className="flex items-baseline justify-between text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ ...backRow(150), color: accent }}
          >
            {label}
            <span className="tracking-normal text-ink/45">{items.length}</span>
          </span>
          <ul className="mt-2 flex-1 space-y-px">
            {items.map((item, i) => (
              <li key={item.href} style={backRow(190 + i * 40)}>
                <Link
                  href={item.href}
                  prefetch={false}
                  tabIndex={flipped ? 0 : -1}
                  className="group/row -mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-[3px] text-[13px] font-semibold leading-tight text-ink hover:bg-white/60"
                >
                  <ToolMark
                    slug={item.slug}
                    color={accent}
                    className="h-4 w-4 shrink-0"
                  />
                  <span
                    className="underline-offset-[3px] group-hover/row:underline group-hover/row:decoration-2"
                    style={{ textDecorationColor: accent }}
                  >
                    {item.title}
                  </span>
                  {item.main && (
                    <span
                      className="ml-auto rounded-full bg-white/60 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide"
                      style={{ color: accent }}
                    >
                      Main
                    </span>
                  )}
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
