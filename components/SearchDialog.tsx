"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { bestTokenScore, tokensOf } from "@/lib/fuzzy";
import {
  Search,
  CornerDownLeft,
  X,
  BookOpen,
  Calculator,
  FileText,
  Library,
  Compass,
} from "lucide-react";
import type { SearchItem, SearchKind } from "@/lib/search";
import { frameHref, type Frame } from "@/lib/frame";
import { loadSearchIndex } from "@/lib/searchIndexClient";

const KIND_COLOR: Record<SearchKind, string> = {
  Topic: "#0c4a39",
  Calculator: "#c9842a",
  Article: "#157a5a",
  Term: "#b7593f",
  Page: "#44514a",
};

const KIND_ICON: Record<SearchKind, typeof Search> = {
  Topic: BookOpen,
  Calculator: Calculator,
  Article: FileText,
  Term: Library,
  Page: Compass,
};

// Section headers + the order sections appear. Articles surface under "Guides".
const KIND_LABEL: Record<SearchKind, string> = {
  Topic: "Topics",
  Calculator: "Calculators",
  Article: "Guides",
  Term: "Glossary",
  Page: "Pages",
};

function scoreItem(item: SearchItem, q: string, tokens: string[]): number {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.subtitle.toLowerCase()} ${(item.keywords ?? "").toLowerCase()} ${item.group.toLowerCase()}`;
  // Typo-tolerant: every query token must land somewhere (exact, prefix,
  // substring, or small edit distance) — "buget calulator" still finds the
  // Budget Planner.
  const hayWords = tokensOf(hay);
  const titleWords = tokensOf(title);
  let s = 0;
  for (const t of tokens) {
    const b = bestTokenScore(t, hayWords);
    if (b === 0) return -1;
    s += b * 30;
    s += bestTokenScore(t, titleWords) * 25; // title hits matter most
  }
  if (title === q) s += 200;
  else if (title.startsWith(q)) s += 120;
  else if (title.includes(q)) s += 60;
  // Prefer destinations over individual articles when titles tie.
  if (item.kind === "Topic" || item.kind === "Calculator" || item.kind === "Page") s += 8;
  return s;
}

interface Section {
  label: string;
  items: { item: SearchItem; idx: number }[];
}

export default function SearchDialog({
  frame = "main",
  compact = false,
}: {
  /** Student frame maps every result href through frameHref post-fetch. */
  frame?: Frame;
  /** Icon-only trigger until 2xl (StudentHeader's crowded row); the main
   *  header keeps the labeled pill. */
  compact?: boolean;
}) {
  // Perf round 2 (July 17, 2026): the index is no longer a prop serialized
  // into every page — it's fetched once from /api/search-index on first
  // open and cached module-wide (shared with the ChatLauncher).
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  // Where the dropdown starts — measured from the sticky header's bottom.
  const [panelTop, setPanelTop] = useState(68);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // First open: pull the index (CDN-cached JSON, ~one round trip), mapping
  // hrefs into the student frame when needed.
  useEffect(() => {
    if (!open || items !== null) return;
    let alive = true;
    loadSearchIndex().then((list) => {
      if (!alive) return;
      setItems(
        frame === "main"
          ? list
          : list.map((i) => ({ ...i, href: frameHref(i.href, frame) }))
      );
    });
    return () => {
      alive = false;
    };
  }, [open, items, frame]);

  // ⌘K / Ctrl+K toggles the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // While open: anchor below the header, focus the input, close on Escape or an
  // outside click. NO scroll-lock — the page stays scrollable behind the panel.
  useEffect(() => {
    if (!open) return;
    const header = document.querySelector("header");
    if (header) setPanelTop(header.getBoundingClientRect().height);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    const focus = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      clearTimeout(focus);
    };
  }, [open]);

  // Flat, relevance-ordered results (drives keyboard nav) + grouped sections.
  const { flat, sections } = useMemo(() => {
    if (items === null) return { flat: [], sections: [] };
    const q = query.trim().toLowerCase();

    if (!q) {
      // Key pages first so they can't get crowded out by the nine topics.
      const keyPages = items.filter(
        (i) =>
          i.kind === "Page" &&
          ["Take the Quiz", "Glossary", "Free Templates"].includes(i.title)
      );
      const jump = [
        ...keyPages,
        ...items.filter((i) => i.kind === "Topic"),
      ].slice(0, 9);
      return {
        flat: jump,
        sections: [
          { label: "Jump to", items: jump.map((item, idx) => ({ item, idx })) },
        ] as Section[],
      };
    }

    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = items
      .map((item) => ({ item, s: scoreItem(item, q, tokens) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s || a.item.title.length - b.item.title.length)
      .slice(0, 20)
      .map((r) => r.item);

    const buckets = new Map<SearchKind, SearchItem[]>();
    for (const item of scored) {
      const list = buckets.get(item.kind) ?? [];
      list.push(item);
      buckets.set(item.kind, list);
    }
    const flatOrdered: SearchItem[] = [];
    const secs: Section[] = [];
    for (const [kind, list] of buckets) {
      const start = flatOrdered.length;
      flatOrdered.push(...list);
      secs.push({
        label: KIND_LABEL[kind],
        items: list.map((item, i) => ({ item, idx: start + i })),
      });
    }
    return { flat: flatOrdered, sections: secs };
  }, [query, items]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function close() {
    setOpen(false);
    setQuery("");
  }
  function go(href: string) {
    close();
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (item) go(item.href);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Search the site"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm font-medium text-cream/90 transition-colors hover:bg-white/10"
      >
        <Search className="h-4 w-4" strokeWidth={2} />
        {!compact && (
          <>
            <span className="hidden sm:inline">Search</span>
            <kbd className="ml-1 hidden rounded border border-white/20 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-cream/70 lg:inline">
              ⌘K
            </kbd>
          </>
        )}
      </button>

      {mounted &&
        open &&
        createPortal(
          <>
            {/* Dim scrim below the header. Wheel events bubble through it, so the
                page still scrolls behind — no scroll-lock. Direct child of
                <body>: position/z-index set inline (see CLAUDE.md). */}
            <div
              style={{ position: "fixed", top: panelTop, left: 0, right: 0, bottom: 0, zIndex: 69 }}
              className="bg-ink/40"
              onMouseDown={close}
              aria-hidden="true"
            />

            {/* Full-width dropdown anchored under the header. */}
            <div
              ref={panelRef}
              style={{ position: "fixed", top: panelTop, left: 0, right: 0, zIndex: 70 }}
              className="border-b border-sand bg-cream shadow-2xl"
              role="dialog"
              aria-modal="false"
              aria-label="Site search"
            >
              {/* Search field */}
              <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3.5 sm:px-6">
                <Search className="h-5 w-5 flex-shrink-0 text-stone" strokeWidth={2} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search articles, calculators, topics…"
                  className="w-full bg-transparent text-base text-ink placeholder:text-stone/60 focus:outline-none"
                  aria-label="Search query"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="flex-shrink-0 rounded-md p-1 text-stone transition-colors hover:bg-paper-deep hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close search"
                    className="hidden flex-shrink-0 rounded border border-sand bg-paper px-1.5 py-0.5 text-[10px] font-semibold text-stone transition-colors hover:text-ink sm:inline"
                  >
                    esc
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="border-t border-sand">
                <div
                  ref={listRef}
                  className="mx-auto max-h-[min(50vh,30rem)] max-w-3xl overflow-y-auto px-2 py-2 sm:px-4"
                >
                  {flat.length === 0 ? (
                    <div className="px-3 py-12 text-center">
                      <p className="text-sm font-semibold text-ink">
                        No results for &ldquo;{query.trim()}&rdquo;
                      </p>
                      <p className="mt-1 text-sm text-stone">
                        Try a different word, or browse the{" "}
                        <button
                          type="button"
                          onClick={() => go("/learn")}
                          className="font-semibold text-forest underline-offset-2 hover:underline"
                        >
                          full library
                        </button>
                        .
                      </p>
                    </div>
                  ) : (
                    sections.map((section) => (
                      <div key={section.label} className="mb-1 last:mb-0">
                        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-stone">
                          {section.label}
                        </p>
                        <ul>
                          {section.items.map(({ item, idx }) => {
                            const Icon = KIND_ICON[item.kind];
                            const isActive = active === idx;
                            return (
                              <li key={`${item.href}-${idx}`}>
                                <button
                                  type="button"
                                  data-idx={idx}
                                  onMouseMove={() => setActive(idx)}
                                  onClick={() => go(item.href)}
                                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                                    isActive ? "bg-forest/10" : ""
                                  }`}
                                >
                                  <span
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                      background: `${KIND_COLOR[item.kind]}1a`,
                                      color: KIND_COLOR[item.kind],
                                    }}
                                  >
                                    <Icon className="h-4 w-4" strokeWidth={2} />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold text-ink">
                                      {item.title}
                                    </span>
                                    <span className="block truncate text-xs text-stone">
                                      {item.subtitle}
                                    </span>
                                  </span>
                                  {isActive && (
                                    <CornerDownLeft className="h-4 w-4 flex-shrink-0 text-stone" />
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer: keyboard hints */}
              <div className="border-t border-sand bg-paper-deep">
                <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] text-stone sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                      <span className="hidden sm:inline">to navigate</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Kbd>↵</Kbd>
                      <span className="hidden sm:inline">to select</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Kbd>esc</Kbd>
                      <span className="hidden sm:inline">to close</span>
                    </span>
                  </div>
                  <span className="font-semibold text-forest">Empower</span>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.25rem] items-center justify-center rounded border border-sand bg-cream px-1 py-0.5 font-sans text-[10px] font-semibold text-stone">
      {children}
    </kbd>
  );
}
