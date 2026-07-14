"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Word-mask headline rise (Base44-audit A3 / shortlist #8): each word sits
 * in an `overflow-hidden` slot and rises out of it on mount — 500ms,
 * 60ms/word stagger, easeOutQuint. HEROES ONLY, one headline per page; on
 * every H2 it turns to wallpaper.
 *
 * Place INSIDE the existing hero <h1>/<h2>. String children split into
 * per-word masks; element children (e.g. the italic-amber phrase span)
 * rise as one masked unit. Reveal-style arming: the server renders plain
 * visible text, the offset state only applies on mount when JS runs, and
 * never under prefers-reduced-motion. The animated copy is aria-hidden
 * with an sr-only full-text twin, so screen readers hear one sentence,
 * not a word salad.
 */

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node))
    return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

export default function HeadlineRise({ children }: { children: ReactNode }) {
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
      return;
    setArmed(true);
    // Two frames so the hidden state paints before the transition starts.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  // Flatten children into mask units: words from strings, elements whole.
  const units: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      for (const word of child.split(/\s+/)) {
        if (word) units.push(word);
      }
    } else if (child !== null && child !== undefined && child !== false) {
      units.push(child);
    }
  });

  return (
    <>
      <span className="sr-only">{textOf(children)}</span>
      <span aria-hidden>
        {units.map((unit, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block"
              style={
                armed
                  ? {
                      transform: shown ? "none" : "translateY(100%)",
                      opacity: shown ? 1 : 0,
                      transition: `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`,
                    }
                  : undefined
              }
            >
              {isValidElement(unit) ? (unit as ReactElement) : unit}
              </span>
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
