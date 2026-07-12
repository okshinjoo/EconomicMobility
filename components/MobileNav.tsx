"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { nav } from "@/lib/nav";

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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream transition-colors hover:bg-ink-700"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted &&
        createPortal(
          <div
            style={{ position: "fixed", zIndex: 60 }}
            className={`inset-0 flex flex-col bg-ink text-cream transition-opacity duration-200 lg:hidden ${
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
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-2">
              {nav.map((entry) => {
                if (!entry.items) {
                  return (
                    <Link
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
                      <Link
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
                          <Link
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
              <Link
                href="/quiz"
                onClick={close}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-6 py-4 text-base font-semibold text-ink transition-colors hover:bg-cream"
              >
                Take the Quiz
              </Link>
              <Link
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
