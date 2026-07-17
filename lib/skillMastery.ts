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

// ---- Client-safe skill-tree core -----------------------------------------
// These live HERE (not lib/skillTree.ts) because client components need
// them: lib/skillTree imports the whole article registry, and a VALUE
// import from it in a "use client" file drags every article into the
// bundle (the documented getRoadmapRefs gotcha).

/** Normalized quiz question for mastery test-outs. */
export interface MasteryQuestion {
  q: string;
  options: string[];
  answer: number;
  explain?: string;
}

/** Smallest pool a tier test-out may run on (never invent questions). */
export const MIN_MASTERY_POOL = 3;
/** Smallest pool a whole-topic test-out may run on. */
export const MIN_TOPIC_POOL = 5;

/** Guides per map bubble — a bubble is a BUNDLE of up to this many guides
 *  (owner, July 16: "less bubbles"; clicking opens the what-you'll-learn
 *  panel instead of jumping into an article). */
export const UNIT_SIZE = 5;

/** Cross-cutting quick wins — the "First steps" branch. `kind` tells the
 *  client which existing tracker proves it done. */
export interface StarterAction {
  id: string;
  label: string;
  /** Compact label for the map bubbles. */
  short: string;
  href: string;
  kind:
    | "quiz"
    | "budget"
    | "reality"
    | "plan"
    | "profile"
    | "resources"
    | "community";
}

export const STARTER_ACTIONS: StarterAction[] = [
  {
    id: "quiz",
    label: "Take the 2-minute quiz",
    short: "2-minute quiz",
    href: "/quiz",
    kind: "quiz",
  },
  {
    id: "budget",
    label: "Fill out the Budget Planner",
    short: "Budget Planner",
    href: "/tools/budget",
    kind: "budget",
  },
  {
    id: "reality",
    label: "Do the Reality Check",
    short: "Reality Check",
    href: "/tools/budget/reality-check",
    kind: "reality",
  },
  {
    id: "plan",
    label: "Build My Plan",
    short: "Build My Plan",
    href: "/plan",
    kind: "plan",
  },
  {
    id: "profile",
    label: "Fill out your profile",
    short: "Your profile",
    href: "/account",
    kind: "profile",
  },
  {
    id: "resources",
    label: "Browse the resource library",
    short: "Resource library",
    href: "/resources",
    kind: "resources",
  },
  {
    id: "community",
    label: "Say something in the community",
    short: "Say hello",
    href: "/community",
    kind: "community",
  },
];
// --------------------------------------------------------------------------

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
