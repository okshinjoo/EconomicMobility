"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up from 0 when it scrolls into view — the stats-band
 * sibling of the Ticker. Server renders the final value (so no-JS and
 * crawlers see the real number), the animation starts on first viewport
 * entry, and prefers-reduced-motion skips straight to the value.
 */
export default function CountUp({
  value,
  duration = 1100,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {display}
    </span>
  );
}
