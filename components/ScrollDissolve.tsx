"use client";

// Scroll-scrubbed hero EXIT (July 16, 2026 — OYLA study): as the wrapping
// hero section scrolls away, the words inside drift upward and blur out,
// scrubbed directly to scroll position (not time) — the exit counterpart
// to HeadlineRise's entrance. Sibling of the Reveal/ScrollDrift primitives:
// armed on mount only when JS runs, reduced-motion gated, transform/
// opacity/filter only, passive scroll + one rAF. Splits its own DIRECT
// text into word spans post-mount and treats element children (e.g. a
// HeadlineRise accent span) as single units, so the two never fight.
// SIGNATURE-RARITY RULE: one page at a time — currently /skills only.

import { useEffect, useRef } from "react";

export default function ScrollDissolve({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = root.closest("section") ?? root.parentElement;
    if (!section) return;

    // Split direct text nodes into word units; keep element children whole.
    const units: HTMLElement[] = [];
    Array.from(root.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        for (const token of text.split(/(\s+)/)) {
          if (!token) continue;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = token;
            units.push(span);
            frag.appendChild(span);
          }
        }
        node.parentNode?.replaceChild(frag, node);
      } else if (node instanceof HTMLElement) {
        node.style.display = "inline-block";
        units.push(node);
      }
    });
    if (units.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const exitRange = Math.max(rect.height * 0.9, 1);
      const p = Math.min(Math.max(-rect.top / exitRange, 0), 1);
      units.forEach((u, i) => {
        const start = (i / Math.max(units.length - 1, 1)) * 0.5;
        const lp = Math.min(Math.max((p - start) / 0.5, 0), 1);
        const eased = lp * lp * lp;
        u.style.opacity = String(1 - eased);
        u.style.transform = `translate3d(0, ${-20 * eased}px, 0)`;
        u.style.filter = eased > 0.001 ? `blur(${6 * eased}px)` : "";
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <span ref={ref}>{children}</span>;
}
