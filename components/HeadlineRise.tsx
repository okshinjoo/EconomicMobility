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

export default function HeadlineRise({
  children,
  blur = false,
}: {
  children: ReactNode;
  /** Cinematic variant (July 2026, borrowed-restraint from the Cortex
   *  concept): words lift with a blur-and-brightness fade instead of the
   *  overflow-mask rise. Default off — existing heroes render identically. */
  blur?: boolean;
}) {
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
            {blur ? (
              /* Cinematic variant: no overflow mask (it would clip the blur)
                 — each word lifts in with a blur-and-brightness fade. */
              <span
                className="inline-block"
                style={
                  armed
                    ? {
                        transform: shown ? "none" : "translateY(20px)",
                        opacity: shown ? 1 : 0,
                        filter: shown
                          ? "blur(0px) brightness(100%)"
                          : "blur(10px) brightness(30%)",
                        // Hidden paints with NO transition (else the delayed
                        // hide races the reveal and words 2+ never move —
                        // the "only the first word animates" bug). The
                        // transition attaches only on the reveal commit.
                        transition: shown
                          ? `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, filter 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`
                          : "none",
                      }
                    : undefined
                }
              >
                {isValidElement(unit) ? (unit as ReactElement) : unit}
              </span>
            ) : (
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block"
                  style={
                    armed
                      ? {
                          transform: shown ? "none" : "translateY(100%)",
                          opacity: shown ? 1 : 0,
                          // Same race fix as the blur variant: hidden paints
                          // transition-free, the eased rise attaches on reveal.
                          transition: shown
                            ? `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`
                            : "none",
                        }
                      : undefined
                  }
                >
                  {isValidElement(unit) ? (unit as ReactElement) : unit}
                </span>
              </span>
            )}
          </span>
        ))}
      </span>
    </>
  );
}
