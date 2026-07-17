// Client-side loader for the search index (July 17, 2026 perf round 2).
// Fetches /api/search-index once per pageview at most, shared by the
// SearchDialog and the ChatLauncher (module-level cache + in-flight
// dedupe). The type import is erased at compile time, so the article
// registry stays out of the client bundle (the BUNDLE RULE).

import type { SearchItem } from "@/lib/search";

let cached: SearchItem[] | null = null;
let inflight: Promise<SearchItem[]> | null = null;

export function loadSearchIndex(): Promise<SearchItem[]> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch("/api/search-index")
      .then((r) => (r.ok ? (r.json() as Promise<SearchItem[]>) : []))
      .then((items) => {
        cached = items;
        return items;
      })
      .catch(() => {
        // Failed fetch: don't cache the failure — the next open retries.
        inflight = null;
        return [];
      });
  }
  return inflight;
}
