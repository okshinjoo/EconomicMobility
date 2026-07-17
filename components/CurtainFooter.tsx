"use client";

// The footer curtain (July 16, 2026 — OYLA study: "how do we incorporate
// some of that"). The footer sits FIXED underneath the page and is
// REVEALED as the last section scrolls up off it — a pure stacking
// illusion, no motion code on the footer itself. This wrapper measures
// the footer and keeps a transparent spacer of the same height in the
// page flow; the page's content column must carry its own background and
// a higher z-index (the consumer does this). Until the client measures
// (SSR / JS off), the footer renders in normal flow, so it can never be
// unreachable.

import { useEffect, useRef, useState } from "react";

export default function CurtainFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {height !== null && <div aria-hidden="true" style={{ height }} />}
      <div
        ref={inner}
        className={height !== null ? "fixed bottom-0 left-0 z-0 w-full" : ""}
      >
        {children}
      </div>
    </>
  );
}
