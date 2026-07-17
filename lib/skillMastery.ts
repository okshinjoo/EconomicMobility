// Mastery test-outs (July 16, 2026, owner ask: "you should be able to skip
// a topic or a portion of the branch if you think you already know the
// material — there should be a quiz given if you choose to skip ahead, and
// you only get mastery if you complete the quiz").
//
// The ONE piece of skill-tree state that is stored: a map of mastered tier
// keys -> the passing score (everything else on the tree stays derived).
// Mastery never unlocks anything — nothing on this site locks — it marks
// the portion as known on the tree and earns skill points. Quiz questions
// come from EXISTING banks only (knowledge-check bank, article quizzes,
// topic checkpoint quizzes); a tier without enough real questions simply
// doesn't offer a test-out. Passing a whole-topic test writes every tier
// key, so consumers only ever check tier keys. Synced via MAP_KEYS union.

import { loadJSON, saveJSON } from "./storage";

export const MASTERY_KEY = "empower:skill-mastery:v1";

export interface MasteryRecord {
  score: number;
  total: number;
  at: number; // epoch ms of the pass
}

export function tierKey(topicId: string, ti: number): string {
  return `${topicId}:${ti}`;
}

export function getMasteryMap(): Record<string, MasteryRecord> {
  return loadJSON<Record<string, MasteryRecord>>(MASTERY_KEY) ?? {};
}

/** Record a passed test-out (event-time Date is fine — client click). An
 *  already-mastered key keeps its first record. */
export function markMastered(keys: string[], score: number, total: number) {
  const map = getMasteryMap();
  const at = Date.now();
  for (const k of keys) if (!map[k]) map[k] = { score, total, at };
  saveJSON(MASTERY_KEY, map);
}
