"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper: children fade in and rise slightly when they first
 * enter the viewport. `delay` (ms) staggers siblings. Uses a CSS transition,
 * so the global prefers-reduced-motion rule in globals.css neutralizes it
 * automatically. Server-renders visible-when-JS-is-off (content is never
 * hidden from crawlers or no-JS readers — the hidden state is applied on
 * mount, before paint, only when JS runs).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If it's already on screen at mount, skip the animation entirely.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        armed
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(20px)",
              // easeOutQuint (Base44-audit curve): fast launch, long soft
              // landing. Offset bumped 14 → 20px so the curve has room.
              transition: `opacity 550ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 550ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
