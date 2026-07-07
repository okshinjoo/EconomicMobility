// Client-side read tracking — which articles this device has read through.
// Backed by localStorage via lib/storage.ts (SSR-safe: everything returns
// empty on the server). This is the same "accounts sync FROM here later"
// pattern as the quiz result and calculators (see docs/auth-plan.md).

import { STORAGE_KEYS, loadJSON, saveJSON } from "./storage";

/** slug -> epoch ms of when it was read through. */
export type ReadMap = Record<string, number>;

export function getReadMap(): ReadMap {
  return loadJSON<ReadMap>(STORAGE_KEYS.readArticles) ?? {};
}

export function isArticleRead(slug: string): boolean {
  return Boolean(getReadMap()[slug]);
}

export function markArticleRead(slug: string): void {
  const map = getReadMap();
  if (map[slug]) return; // keep the first-read timestamp
  map[slug] = Date.now();
  saveJSON(STORAGE_KEYS.readArticles, map);
}

/** Most recently read slug, or null. */
export function lastReadSlug(map: ReadMap): string | null {
  let best: string | null = null;
  let bestAt = -1;
  for (const [slug, at] of Object.entries(map)) {
    if (at > bestAt) {
      best = slug;
      bestAt = at;
    }
  }
  return best;
}
