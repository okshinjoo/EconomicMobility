"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChatCircle as MessageCircle, X, PaperPlaneTilt as Send, Sparkle as Sparkles, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { SearchItem } from "@/lib/search";
import { loadSearchIndex } from "@/lib/searchIndexClient";
import { guideAnswer, type GuideAnswer } from "@/lib/guide";
import { youSummary } from "@/lib/personalization";

// ─────────────────────────────────────────────────────────────────────────────
// AI is ON (July 2026): /api/chat holds the Anthropic key server-side and
// answers from the site's own articles, with conversation history for
// follow-ups. If the route is unconfigured (503) or errors, this silently
// falls back to the free retrieval guide (lib/guide.ts) — never breaks.
const AI_ENDPOINT = "/api/chat";
// ─────────────────────────────────────────────────────────────────────────────

type Msg = { role: "user" | "guide"; text: string; items?: SearchItem[] };

async function fetchAnswer(
  query: string,
  history: Msg[],
  index: SearchItem[]
): Promise<GuideAnswer> {
  if (AI_ENDPOINT) {
    try {
      const res = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          // Recent turns (minus the canned greeting) so follow-ups work.
          history: history
            .slice(1)
            .slice(-6)
            .map((m) => ({ role: m.role, text: m.text })),
          // What the person has saved about themselves, so the guide tailors
          // its answer (empty string when nothing's saved).
          you: youSummary(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const items = ((data.sourceHrefs ?? []) as string[])
          .map((h) => index.find((i) => i.href === h))
          .filter(Boolean) as SearchItem[];
        return { reply: String(data.reply ?? ""), items };
      }
    } catch {
      /* fall through to the retrieval guide */
    }
  }
  return guideAnswer(query, index);
}

const SUGGESTIONS = [
  "How do I start a budget?",
  "Build credit with no SSN",
  "What's a Roth IRA?",
  "Help with rent or food",
];

const GREETING: Msg = {
  role: "guide",
  text: "Hi, I'm your money guide. Ask me anything about money. I'll explain it in plain English and hand you the exact guide or calculator for it.",
};

export default function ChatLauncher() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [thinking, setThinking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Perf round 2 (July 17, 2026): the index is no longer a prop on every
  // page — warm the shared cache when the panel opens so the first answer
  // doesn't wait on it.
  useEffect(() => {
    if (open) void loadSearchIndex();
  }, [open]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open, thinking]);

  // Close on Escape / outside click (non-modal; the page stays usable).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || fabRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || thinking) return;
    setInput("");
    const priorMsgs = msgs;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setThinking(true);
    const index = await loadSearchIndex();
    const answer = await fetchAnswer(q, priorMsgs, index);
    setThinking(false);
    setMsgs((m) => [...m, { role: "guide", text: answer.reply, items: answer.items }]);
  }

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 55, pointerEvents: "none" }}>
      {/* Launcher button */}
      {!open && (
        <button
          ref={fabRef}
          onClick={() => setOpen(true)}
          aria-label="Open the money guide chat"
          className="pointer-events-auto absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-forest py-3.5 pl-4 pr-5 text-cream shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-forest-700"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-semibold">Ask</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="pointer-events-auto absolute bottom-5 right-5 flex h-[min(82vh,700px)] w-[min(92vw,448px)] flex-col overflow-hidden rounded-2xl border border-sand bg-paper shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 bg-forest px-4 py-3 text-cream">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">Money Guide</p>
                <p className="text-[11px] text-cream/70">Answers from our own guides</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i}>
                {m.role === "user" ? (
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-forest px-4 py-2.5 text-[0.95rem] leading-7 text-cream">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-cream px-4 py-2.5 text-[0.95rem] leading-7 text-ink">
                      {m.text}
                    </p>
                    {m.items && m.items.length > 0 && (
                      <div className="space-y-1.5">
                        {m.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-2 rounded-xl border border-sand bg-cream px-3 py-2 transition-colors hover:border-forest/40"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.95rem] font-semibold text-ink">
                                {item.title}
                              </span>
                              <span className="block truncate text-xs text-stone">
                                {item.kind} · {item.subtitle}
                              </span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-stone transition-colors group-hover:text-forest" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {thinking && (
              <p className="rounded-2xl rounded-bl-sm bg-cream px-3.5 py-2 text-sm text-stone">
                Looking…
              </p>
            )}

            {/* First-run suggestions */}
            {msgs.length === 1 && !thinking && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-sand bg-cream px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-forest/40 hover:bg-paper-deep"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-sand bg-cream px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a money question…"
              aria-label="Ask the money guide"
              className="w-full bg-transparent px-1 text-[0.95rem] text-ink placeholder:text-stone/60 focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send"
              className="flex-shrink-0 rounded-full bg-forest p-2 text-cream transition-colors hover:bg-forest-700 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="bg-cream px-4 pb-2.5 text-center text-[10px] leading-tight text-stone">
            AI answers from our guides; it can make mistakes. General education,
            not personal financial or legal advice.
          </p>
        </div>
      )}
    </div>,
    document.body
  );
}
