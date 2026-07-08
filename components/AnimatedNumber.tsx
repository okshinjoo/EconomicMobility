"use client";

// NerdWallet-style result feedback: when a calculator answer changes, the
// headline number rolls to its new value (~350ms) instead of snapping.
// First paint renders instantly (no mount animation, no hydration drama);
// prefers-reduced-motion always snaps.

import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  /** value -> display string, e.g. the shared usd() or (n) => `${n.toFixed(1)}%` */
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const t0 = performance.now();
    const dur = 350;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (value - from) * eased;
      setDisplay(p < 1 ? v : value);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span className="tabular-nums">{format(display)}</span>;
}
