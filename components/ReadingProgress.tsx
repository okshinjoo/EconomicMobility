"use client";

import { useEffect, useState } from "react";

/** Thin top bar that fills as the reader scrolls through #article-content. */
export default function ReadingProgress({ color }: { color?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById("article-content");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-1">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%`, background: color ?? "var(--color-amber)" }}
      />
    </div>
  );
}
