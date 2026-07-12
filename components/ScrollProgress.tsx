"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Site-wide amber scroll-progress bar (Base44-audit keeper, July 2026):
 *  a thin line at the very top of the viewport that fills as you scroll the
 *  page. Pages that mount ReadingProgress (#article-content — articles and
 *  blog posts) are skipped so their content-scoped bar stays the only one.
 *  Mounted as a direct child of <body>, so position/z-index are INLINE (the
 *  unlayered `body > *` grain rule would pin utility classes). */
export default function ScrollProgress() {
  const pathname = usePathname();
  const [pct, setPct] = useState(0);
  const [enabled, setEnabled] = useState(false);

  // Re-decide per route, after the new page's DOM has rendered.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setEnabled(!document.getElementById("article-content"));
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none h-1"
      style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 55 }}
    >
      <div
        className="h-full bg-amber transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
