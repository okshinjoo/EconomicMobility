"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Ghost-layer scroll drift (Base44-audit shortlist #5 — ours, not theirs):
 * wraps a hero's ghost TopicMark / watermark layer and drifts it a few
 * pixels (default ±16) as the hero travels through the viewport. Transform
 * only, passive scroll listener + one rAF per frame, and it bails entirely
 * under prefers-reduced-motion, so no-JS/reduced-motion visitors get the
 * exact static layer we ship today.
 *
 * Use INSIDE the hero `<section>` (which is `relative overflow-hidden`),
 * wrapping only the decorative layer — never content. Progress is measured
 * on the parent section, not the drifting div, so the transform never
 * feeds back into its own measurement.
 */
export default function ScrollDrift({
  children,
  range = 16,
}: {
  children: ReactNode;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
      return;
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 → hero below the fold, 1 → hero scrolled past. Heroes sit at the
      // top of the page, so on load this lands mid-range — a whisper.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.transform = `translateY(${((p - 0.5) * 2 * range).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [range]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {children}
    </div>
  );
}
