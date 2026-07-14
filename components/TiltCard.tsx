"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 3D perspective tilt on hover (Base44-audit B2 / shortlist #9): cursor
 * position maps to rotateX/rotateY of ±4° + scale(1.02), eased by a plain
 * CSS transition (no springs, no rAF loop — preview-pane safe). Flat on
 * mouse-leave.
 *
 * EXACTLY ONE card sitewide (the homepage math-band chart card) — that
 * restraint is what Base44 got right; a tilt everywhere is a portfolio
 * tell. Only activates on fine pointers that can hover, and never under
 * prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(
      window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
      ).matches
    );
  }, []);

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !active) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.02)`;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={
        active ? { transition: "transform 180ms ease-out" } : undefined
      }
      onMouseMove={active ? onMove : undefined}
      onMouseLeave={active ? reset : undefined}
    >
      {children}
    </div>
  );
}
