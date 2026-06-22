"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/articles/headings";

export default function ArticleToc({
  headings,
  accent,
}: {
  headings: Heading[];
  accent?: string;
}) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-28">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
        In this article
      </p>
      <ul className="mt-4 space-y-1 border-l border-sand">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                style={
                  isActive && accent
                    ? { color: accent, borderColor: accent }
                    : undefined
                }
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-forest font-semibold text-forest"
                    : "border-transparent text-stone hover:text-ink"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
