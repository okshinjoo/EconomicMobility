"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * SynapseX study (July 17, 2026): the hero SINKS AWAY as you scroll into
 * the page — content eases down, settles back (tiny scale-down), and fades,
 * so leaving the hero reads as a dive into the content instead of a hard
 * scroll-off. The motion is LERP-smoothed (factor 0.12, SynapseX's own
 * constant) so it lags the scroll with a weighted, liquid feel rather than
 * tracking it 1:1 — that lag IS the adoption; don't "fix" it to instant.
 *
 * Replaces the hero's inner content container (className passes through).
 * Progress is measured on the parent section (ScrollDrift's rule: the
 * transform must never feed back into its own measurement). Server render
 * and reduced-motion/no-JS visitors get the exact static hero.
 */
export default function HeroRecede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
      return;
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    el.style.willChange = "transform, opacity";
    let raf = 0;
    let current = 0;
    let target = 0;
    const tick = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      // 0 → hero at rest; 1 → hero fully scrolled past the viewport top.
      target = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.001) current = target;
      // Softened July 17 (owner: "a little less obvious") from 40/0.04/0.9.
      el.style.transform =
        `translate3d(0, ${(current * 26).toFixed(1)}px, 0) ` +
        `scale(${(1 - current * 0.025).toFixed(4)})`;
      el.style.opacity = (1 - current * 0.6).toFixed(3);
      // Keep converging after the last scroll event so the lag settles.
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
