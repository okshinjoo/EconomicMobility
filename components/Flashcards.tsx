"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import type { Flashcard } from "@/lib/courses";

/**
 * Flip-through deck of the glossary definitions met in a course's articles.
 * Click (or press space/enter on) the card to flip; arrows to move through.
 */
export default function Flashcards({
  cards,
  accent,
}: {
  cards: Flashcard[];
  accent: string;
}) {
  const [order, setOrder] = useState<number[]>(() =>
    cards.map((_, i) => i)
  );
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return null;
  const card = cards[order[index]];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + order.length) % order.length);
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

  return (
    <div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Show term" : "Show definition"}
        className="block w-full rounded-2xl border-2 bg-cream p-8 text-left shadow-sm transition-shadow hover:shadow-md sm:p-10"
        style={{ borderColor: flipped ? accent : "var(--color-sand)" }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: accent }}
        >
          {flipped ? "Definition" : "Term"}
        </span>
        {flipped ? (
          <p className="mt-3 min-h-[5.5rem] text-lg leading-8 text-ink">
            {card.definition}
          </p>
        ) : (
          <p className="mt-3 flex min-h-[5.5rem] items-center font-display text-3xl font-semibold text-ink sm:text-4xl">
            {card.term}
          </p>
        )}
        <span className="mt-4 block text-sm font-medium text-stone">
          {flipped ? "Click to see the term" : "Click to reveal the definition"}
        </span>
      </button>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-cream text-ink transition-colors hover:border-ink/30"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tabular-nums text-stone">
            {index + 1} of {order.length}
          </span>
          <button
            type="button"
            onClick={shuffle}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next card"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-cream text-ink transition-colors hover:border-ink/30"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
