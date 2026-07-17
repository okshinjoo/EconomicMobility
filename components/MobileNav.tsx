"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { nav } from "@/lib/nav";

/* SynapseX study (July 17, 2026): the menu glyph is three real bars that
   squash into an × — top bar drops + rotates, middle collapses, bottom
   rises + counter-rotates. Both the trigger and the drawer's close button
   render the same glyph driven by the same `open`, so the morph plays as
   the drawer fades in. Global reduced-motion CSS neutralizes it. */
function MorphBars({ toX }: { toX: boolean }) {
  const bar =
    "absolute left-0 h-[2px] w-full rounded-full bg-current transition-transform duration-300";
  return (
    <span aria-hidden className="relative block h-[14px] w-[18px]">
      <span
        className={`${bar} top-0 ${toX ? "translate-y-[6px] rotate-45" : ""}`}
      />
      <span
        className={`${bar} top-[6px] transition-[transform,opacity] ${
          toX ? "scale-x-0 opacity-0" : ""
        }`}
      />
      <span
        className={`${bar} top-[12px] ${
          toX ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // The drawer is portalled to <body> so it escapes the header's
  // backdrop-filter containing block and reliably covers the viewport.
  useEffect(() => setMounted(true), []);

  // Lock body scroll and wire up Escape-to-close while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const toggle = (label: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream transition-colors hover:bg-ink-700"
      >
        <MorphBars toX={open} />
      </button>

      {mounted &&
        createPortal(
          <div
            style={{ position: "fixed", zIndex: 60 }}
            className={`inset-0 flex flex-col bg-ink text-cream transition-opacity duration-200 xl:hidden ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!open}
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-ink-600/60 px-6 py-4">
              <span className="font-display text-xl font-semibold tracking-tight">
                <span className="text-amber">EMP</span>ower
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream transition-colors hover:bg-ink-700"
              >
                <MorphBars toX={open} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-2">
              {nav.map((entry) => {
                if (!entry.items) {
                  return (
                    <Link prefetch={false}
                      key={entry.href}
                      href={entry.href}
                      onClick={close}
                      className="block border-b border-ink-600/40 py-4 font-display text-2xl font-semibold text-cream/90 transition-colors hover:text-amber"
                    >
                      {entry.label}
                    </Link>
                  );
                }
                const isExp = expanded.has(entry.label);
                return (
                  <div
                    key={entry.href}
                    className="border-b border-ink-600/40"
                  >
                    <div className="flex items-center justify-between">
                      <Link prefetch={false}
                        href={entry.href}
                        onClick={close}
                        className="flex-1 py-4 font-display text-2xl font-semibold text-cream/90 transition-colors hover:text-amber"
                      >
                        {entry.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggle(entry.label)}
                        aria-expanded={isExp}
                        aria-label={`${isExp ? "Collapse" : "Expand"} ${entry.label}`}
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-cream/60 transition-colors hover:text-amber"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isExp ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {isExp && (
                      <div className="pb-3 pl-1">
                        {entry.items.map((sub) => (
                          <Link prefetch={false}
                            key={sub.href}
                            href={sub.href}
                            onClick={close}
                            className="flex items-center gap-2.5 py-2.5 text-base text-cream/70 transition-colors hover:text-amber"
                          >
                            {sub.icon && (
                              <span style={{ color: sub.color }}>
                                <sub.icon className="h-4 w-4" strokeWidth={1.75} />
                              </span>
                            )}
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex-shrink-0 space-y-3 border-t border-ink-600/60 px-6 py-4">
              <Link prefetch={false}
                href="/quiz"
                onClick={close}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-6 py-4 text-base font-semibold text-ink transition-colors hover:bg-cream"
              >
                Take the Quiz
              </Link>
              <Link prefetch={false}
                href="/account"
                onClick={close}
                className="block text-center text-sm font-semibold text-cream/70 transition-colors hover:text-amber"
              >
                Your account
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
