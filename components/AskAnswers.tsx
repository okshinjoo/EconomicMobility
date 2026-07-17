"use client";

// The /ask answer column: search + sort over the curated Q&As (July 2026
// owner ask). Search is fuzzy per the house rule (lib/fuzzy, never raw
// includes); sorting covers newest/oldest/A-Z. Default state (newest, no
// query) matches the server render exactly, so no hydration mismatch.

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass as Search, X } from "@phosphor-icons/react/dist/ssr";
import type { CommunityQA } from "@/lib/communityQuestions";
import { getTopic } from "@/lib/topics";
import { fuzzyScore } from "@/lib/fuzzy";

type SortId = "new" | "old" | "az";

const SORTS: { id: SortId; label: string }[] = [
  { id: "new", label: "Newest" },
  { id: "old", label: "Oldest" },
  { id: "az", label: "A–Z" },
];

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AskAnswers({ items }: { items: CommunityQA[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("new");

  const shown = useMemo(() => {
    let list = [...items];
    const q = query.trim();
    if (q) {
      list = list.filter((qa) => {
        const topicTitle = qa.topic ? getTopic(qa.topic).title : "";
        const haystack = `${qa.question} ${qa.answer.join(" ")} ${topicTitle}`;
        return fuzzyScore(q, haystack) > 0;
      });
    }
    if (sort === "new") list.sort((a, b) => (a.date < b.date ? 1 : -1));
    else if (sort === "old") list.sort((a, b) => (a.date > b.date ? 1 : -1));
    else list.sort((a, b) => a.question.localeCompare(b.question));
    return list;
  }, [items, query, sort]);

  return (
    <div className="mt-8">
      {/* search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the answers…"
            aria-label="Search answered questions"
            className="w-full rounded-lg border border-sand bg-cream py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-stone focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-stone transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5">
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSort(s.id)}
              aria-pressed={sort === s.id}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                sort === s.id
                  ? "bg-forest text-cream"
                  : "border border-sand bg-cream text-stone hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {query.trim() && (
        <p className="mt-3 text-sm text-stone">
          {shown.length === 0
            ? "No answers match that yet — ask it above and it may become the next one."
            : `${shown.length} of ${items.length} answers match.`}
        </p>
      )}

      <div className="mt-6 space-y-6">
        {shown.map((qa, qi) => {
          const topic = qa.topic ? getTopic(qa.topic) : null;
          return (
            <article
              key={qa.id}
              id={`ask-${qa.id}`}
              className={`card-ink scroll-mt-24 rounded-2xl bg-cream p-6 sm:p-8 ${
                qi % 3 === 1
                  ? "lg:rotate-[0.35deg]"
                  : qi % 3 === 2
                    ? "lg:-rotate-[0.35deg]"
                    : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                {topic ? (
                  <Link
                    href={topic.href}
                    className="inline-block -rotate-1 rounded-md border-2 border-ink px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cream shadow-[2px_2px_0_#11211c] transition-transform hover:-translate-y-0.5"
                    style={{ background: topic.color }}
                  >
                    {topic.title}
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-xs font-semibold text-stone">
                  Answered {formatDate(qa.date)}
                </span>
              </div>
              <div className="mt-4 flex gap-4">
                <span
                  aria-hidden="true"
                  className="select-none font-display text-3xl font-bold italic leading-none text-terracotta"
                >
                  Q.
                </span>
                <h3 className="font-display text-2xl font-semibold leading-snug text-ink">
                  {qa.question}
                </h3>
              </div>
              <div className="mt-5 flex gap-4">
                <span
                  aria-hidden="true"
                  className="select-none font-display text-3xl font-bold italic leading-none text-forest"
                >
                  A.
                </span>
                <div className="space-y-3 text-base leading-7 text-ink/85">
                  {qa.answer.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {qa.link && (
                    <p>
                      <Link
                        href={qa.link.href}
                        className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                      >
                        {qa.link.label}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
