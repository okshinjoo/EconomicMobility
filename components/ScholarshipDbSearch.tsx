"use client";

// The "full national database" tier of the scholarship finder: live search
// against the U.S. Department of Labor's CareerOneStop database via our
// /api/scholarships route. This component only mounts when the server saw
// the API credentials, so it never renders a dead search box.

import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { DbScholarship } from "@/app/api/scholarships/route";

type Status = "idle" | "loading" | "done" | "error";

export default function ScholarshipDbSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [items, setItems] = useState<DbScholarship[]>([]);
  const [attribution, setAttribution] = useState("");

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/scholarships?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as {
        items: DbScholarship[];
        attribution: string;
      };
      setItems(data.items);
      setAttribution(data.attribution);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form onSubmit={search} className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try a major, a state, a background: nursing, Texas, first generation…"
          className="min-w-0 flex-1 rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading" || !query.trim()}
          className="btn-ink inline-flex shrink-0 items-center gap-2 rounded-md bg-forest px-5 py-2.5 text-sm font-bold text-cream disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      {status === "loading" && (
        <p className="mt-4 text-sm font-medium text-stone">
          Searching the national database…
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm leading-6 text-stone">
          The database didn&apos;t answer just now — try again in a minute.
          The verified list above always works.
        </p>
      )}
      {status === "done" && items.length === 0 && (
        <p className="mt-4 text-sm leading-6 text-stone">
          No matches for that search. Try a broader word (a field of study, a
          state, or a background) — or work the verified list above.
        </p>
      )}

      {items.length > 0 && (
        <>
          <p className="mt-4 text-sm font-medium text-stone">
            {items.length} result{items.length === 1 ? "" : "s"} — always
            confirm details on the official page before you plan around one.
          </p>
          <div className="mt-3 space-y-3">
            {items.map((s, i) => {
              const inner = (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug text-ink">
                      {s.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-stone">
                      {[s.org, s.amount, s.deadline, s.level]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {s.summary && (
                      <p className="mt-1 text-xs leading-5 text-stone">
                        {s.summary}
                        {s.summary.length >= 260 ? "…" : ""}
                      </p>
                    )}
                  </div>
                  {s.url && (
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-stone" />
                  )}
                </>
              );
              return s.url ? (
                <a
                  key={`${s.name}-${i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-xl border border-sand bg-cream p-4 transition-colors hover:border-ink/30"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={`${s.name}-${i}`}
                  className="flex items-start gap-3 rounded-xl border border-sand bg-cream p-4"
                >
                  {inner}
                </div>
              );
            })}
          </div>
          {attribution && (
            <p className="mt-4 text-xs text-stone">{attribution}</p>
          )}
        </>
      )}
    </div>
  );
}
