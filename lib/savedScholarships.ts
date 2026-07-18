// Saved & applied scholarships (July 2026, owner ask: "let people mark off
// what scholarships they applied for, and save any they want to apply for").
// Local-first like goalCheckins/aboutYou — one whole-snapshot empower:* key
// the account mirror union-syncs (no Supabase column, never public), keyed by
// the finder's stable scholarship id. Functional updates only (the tracker
// lesson: rapid clicks must not clobber). Two flags per id: `saved` (on the
// short list to apply to) and `applied` (marked off). Marking applied implies
// saved; an entry with neither flag is pruned so "nothing tracked" is empty.

import { loadJSON, saveJSON } from "./storage";

const KEY = "empower:saved-scholarships:v1";

export interface ScholarshipMark {
  saved?: boolean;
  applied?: boolean;
}
export type SavedScholarshipMap = Record<string, ScholarshipMark>;

export function readSavedScholarships(): SavedScholarshipMap {
  return loadJSON<SavedScholarshipMap>(KEY) ?? {};
}

/** Prune empty marks, persist, return the next map. */
function commit(next: SavedScholarshipMap): SavedScholarshipMap {
  for (const id of Object.keys(next)) {
    const m = next[id];
    if (!m.saved && !m.applied) delete next[id];
  }
  saveJSON(KEY, next);
  return next;
}

/** Toggle the save (short-list) flag. */
export function toggleSavedScholarship(id: string): SavedScholarshipMap {
  const cur = readSavedScholarships();
  const m = cur[id] ?? {};
  return commit({ ...cur, [id]: { ...m, saved: !m.saved } });
}

/** Set applied on/off. Applying implies the award was on the short list. */
export function setScholarshipApplied(
  id: string,
  applied: boolean
): SavedScholarshipMap {
  const cur = readSavedScholarships();
  const m = cur[id] ?? {};
  const next: ScholarshipMark = applied
    ? { saved: true, applied: true }
    : { ...m, applied: false };
  return commit({ ...cur, [id]: next });
}

/** To-apply = saved but not yet applied; applied = marked off. */
export function summarizeSavedScholarships(map: SavedScholarshipMap): {
  toApply: number;
  applied: number;
} {
  let toApply = 0;
  let applied = 0;
  for (const m of Object.values(map)) {
    if (m.applied) applied++;
    else if (m.saved) toApply++;
  }
  return { toApply, applied };
}
