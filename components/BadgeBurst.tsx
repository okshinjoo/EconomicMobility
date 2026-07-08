"use client";

// One-shot badge celebration (the Duolingo lesson: make the achievement
// land). When `fire` flips true — the moment a badge is FIRST earned, not on
// later visits — the wrapped medal springs in and a small burst of paper
// confetti in brand colors flies once and fades. The global reduced-motion
// rule neutralizes both animations.

import { useEffect, useState } from "react";

const COLORS = ["#0c4a39", "#e7a33c", "#d26a4c", "#15624b", "#c9842a"];

export default function BadgeBurst({
  fire,
  children,
}: {
  fire: boolean;
  children: React.ReactNode;
}) {
  type Piece = {
    id: number; dx: number; dy: number; rot: number;
    color: string; w: number; h: number; delay: number;
  };
  const [pieces, setPieces] = useState<Piece[]>([]);
  const live = pieces.length > 0;

  // Pieces are generated in the effect, client-side, only when the burst
  // fires (post-interaction) - randomness never touches render or SSR.
  useEffect(() => {
    if (!fire) return;
    setPieces(
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 46 + Math.random() * 52;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 24,
          rot: (Math.random() - 0.5) * 540,
          color: COLORS[i % COLORS.length],
          w: 4 + Math.random() * 4,
          h: 7 + Math.random() * 5,
          delay: Math.random() * 90,
        };
      })
    );
    const t = setTimeout(() => setPieces([]), 1400);
    return () => clearTimeout(t);
  }, [fire]);

  return (
    <span className="relative inline-flex">
      <span
        className="inline-flex"
        style={fire ? { animation: "badge-pop 700ms cubic-bezier(0.34, 1.4, 0.5, 1) both" } : undefined}
      >
        {children}
      </span>
      {live && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          {pieces.map((p) => (
            <span
              key={p.id}
              className="absolute left-1/2 top-1/2 block rounded-[2px]"
              style={{
                width: p.w,
                height: p.h,
                background: p.color,
                ["--dx" as string]: `${p.dx}px`,
                ["--dy" as string]: `${p.dy}px`,
                ["--rot" as string]: `${p.rot}deg`,
                animation: `badge-burst 1100ms cubic-bezier(0.2, 0.7, 0.4, 1) ${p.delay}ms both`,
              }}
            />
          ))}
        </span>
      )}
    </span>
  );
}
