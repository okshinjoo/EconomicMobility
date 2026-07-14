// Goal check-ins (July 14, 2026 owner ask: "a way to report how well
// you're doing on your goals"). Self-reported, per picked goal (the
// profile's goals list), stored LOCAL-FIRST like aboutYou — one
// whole-snapshot empower:* key the account mirror syncs, no Supabase
// column, never public. Functional updates only (the tracker lesson:
// rapid clicks must not clobber).

import { loadJSON, saveJSON } from "./storage";

const KEY = "empower:goal-checkins:v1";

export type GoalCheckinStatus = "not-started" | "started" | "halfway" | "done";

export const CHECKIN_OPTIONS: { id: GoalCheckinStatus; label: string }[] = [
  { id: "not-started", label: "Not started" },
  { id: "started", label: "Started" },
  { id: "halfway", label: "Getting there" },
  { id: "done", label: "Done" },
];

export interface GoalCheckin {
  status: GoalCheckinStatus;
  /** ISO date of the last self-report. */
  at: string;
}

export type GoalCheckinMap = Record<string, GoalCheckin>;

export function readGoalCheckins(): GoalCheckinMap {
  return loadJSON<GoalCheckinMap>(KEY) ?? {};
}

export function setGoalCheckin(
  goalId: string,
  status: GoalCheckinStatus
): GoalCheckinMap {
  const next = {
    ...readGoalCheckins(),
    [goalId]: { status, at: new Date().toISOString() },
  };
  saveJSON(KEY, next);
  return next;
}
