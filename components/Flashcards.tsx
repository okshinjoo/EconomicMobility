"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ArrowCounterClockwise as RotateCcw, Shuffle } from "@phosphor-icons/react/dist/ssr";
import type { Flashcard } from "@/lib/courses";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

/** courseId -> slugs marked "got it". */
type KnownMap = Record<string, string[]>;

/**
 * Study deck: a real 3D flip, a visible stack behind the card, and
 * got-it / still-learning sorting that persists per course. Known cards
 * drop out of rotation until the deck is cleared or reset.
 */
export default function Flashcards({
  cards,
  accent,
  deckId,
  clearedNote = "Every definition in this module, down. The final quiz is right below.",
}: {
  cards: Flashcard[];
  accent: string;
  /** Persistence key (course id). Omit to disable progress saving. */
  deckId?: string;
  /** Deck-cleared line — the default speaks course language; other decks
   *  (interview practice) pass their own. */
  clearedNote?: string;
}) {
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!deckId) {
      setLoaded(true);
      return;
    }
    const map = loadJSON<KnownMap>(STORAGE_KEYS.flashcards) ?? {};
    setKnown(new Set(map[deckId] ?? []));
    setLoaded(true);
  }, [deckId]);

  useEffect(() => {
    if (!loaded || !deckId) return;
    const map = loadJSON<KnownMap>(STORAGE_KEYS.flashcards) ?? {};
    map[deckId] = [...known];
    saveJSON(STORAGE_KEYS.flashcards, map);
  }, [known, deckId, loaded]);

  const remaining = useMemo(
    () => order.filter((i) => !known.has(cards[i].slug)),
    [order, known, cards]
  );

  if (cards.length === 0) return null;

  const cleared = remaining.length === 0;
  const safeIndex = remaining.length ? index % remaining.length : 0;
  const card = cleared ? null : cards[remaining[safeIndex]];

  const go = (delta: number) => {
    if (!remaining.length) return;
    setFlipped(false);
    setIndex((i) => (i + delta + remaining.length) % remaining.length);
  };

  const shuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
    setIndex(0);
    setFlipped(false);
  };

  const gotIt = () => {
    if (!card) return;
    setFlipped(false);
    setKnown((prev) => new Set(prev).add(card.slug));
    // index stays; the remaining list shrinks beneath it
  };

  const reset = () => {
    setKnown(new Set());
    setIndex(0);
    setFlipped(false);
  };

  const knownCount = cards.filter((c) => known.has(c.slug)).length;

  // Back-face rows ease up into place once the flip lands (delays start
  // after the card is ~halfway around, so the motion reads on the visible
  // face, not the hidden one). Inline because the delay varies per row.
  const backRow = (delay: number): CSSProperties => ({
    opacity: flipped ? 1 : 0,
    transform: flipped ? "translateY(0)" : "translateY(10px)",
    transition:
      "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: flipped ? `${delay}ms` : "0ms",
  });

  return (
    <div>
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
              width: `${(knownCount / cards.length) * 100}%`,
              background: accent,
            }}
          />
        </div>
        <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: accent }}>
          {knownCount}/{cards.length} down
        </span>
      </div>

      {cleared ? (
        /* Deck cleared */
        <div className="card-ink-lg flex min-h-[16rem] flex-col items-center justify-center rounded-2xl bg-cream p-8 text-center">
          <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12">
            <path
              d="M24 4 L29 17 L42 17.5 L31.5 25.5 L35.5 38.5 L24 30.5 L12.5 38.5 L16.5 25.5 L6 17.5 L19 17 Z"
              fill={accent}
            />
          </svg>
          <p className="mt-4 font-display text-2xl font-semibold text-ink">
            Deck cleared.
          </p>
          <p className="mt-1 text-sm text-stone">{clearedNote}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
            Start the deck over
          </button>
        </div>
      ) : (
        <>
          {/* The stack + flipping card */}
          <div className="relative [perspective:2000px]">
            {/* Deck behind */}
            {remaining.length > 2 && (
              <div
                className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.4deg] rounded-2xl border-2 border-ink/25"
                style={{ background: `${accent}14` }}
                aria-hidden
              />
            )}
            {remaining.length > 1 && (
              <div
                className="absolute inset-0 translate-x-1 translate-y-1.5 -rotate-[0.8deg] rounded-2xl border-2 border-ink/40"
                style={{ background: `${accent}22` }}
                aria-hidden
              />
            )}

            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? "Show term" : "Show definition"}
              className="relative block min-h-[16rem] w-full text-left [transform-style:preserve-3d]"
              style={{
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                // Committed ease-in-out: the card gathers itself, turns
                // fast, and settles — reads as one deliberate motion.
                transition: "transform 500ms cubic-bezier(0.77, 0, 0.175, 1)",
              }}
            >
              {/* Front: the term */}
              <span className="card-ink absolute inset-0 flex flex-col rounded-2xl bg-cream p-7 [backface-visibility:hidden] sm:p-9">
                <span
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  Term · {safeIndex + 1} of {remaining.length} left
                </span>
                <span className="flex flex-1 items-center font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {card!.term}
                </span>
                <span className="text-sm font-medium text-stone">
                  Tap to flip
                </span>
              </span>

              {/* Back: the definition */}
              <span
                className="card-ink absolute inset-0 flex flex-col rounded-2xl p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9"
                style={{ background: `${accent}14` }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ ...backRow(180), color: accent }}
                >
                  {card!.term}
                </span>
                <span
                  className="flex flex-1 items-center text-lg leading-8 text-ink"
                  style={backRow(260)}
                >
                  {card!.definition}
                </span>
                <span className="text-sm font-medium text-stone" style={backRow(340)}>
                  Tap to flip back
                </span>
              </span>
            </button>
          </div>

          {/* Sort buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-md border-2 border-ink bg-cream px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-paper-deep"
            >
              Still learning
            </button>
            <button
              type="button"
              onClick={gotIt}
              className="btn-ink inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-cream"
              style={{ background: accent }}
            >
              <Check className="h-4 w-4" weight="bold" />
              Got it
            </button>
          </div>

          {/* Deck controls */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous card"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-sand bg-cream text-ink transition-colors hover:border-ink/40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={shuffle}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Shuffle
              </button>
              {knownCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone underline decoration-sand decoration-2 underline-offset-4 hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next card"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-sand bg-cream text-ink transition-colors hover:border-ink/40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
