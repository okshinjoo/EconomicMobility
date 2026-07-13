// Which student is this? (July 2026, owner ask: "recommend the right
// materials to students.") One client-safe answer assembled from three
// signals, most-explicit first:
//   1. the signed-in profile's studentStage (set on the account page),
//   2. the local stage key (set by the /students homepage picker),
//   3. the student tracker's chosen track (only when a real snapshot
//      exists — the tracker DEFAULTS to cc, which is not an answer).
// Accounts stay optional: 2 and 3 make personalization work signed-out.

import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";
import { readLocalProfile, type StudentStage } from "./profile";
import { TRACKER_KEY, type TrackerData } from "./studentTracker";

export type KnownStage = Exclude<StudentStage, "">;

const STAGES: KnownStage[] = ["hs", "cc", "uni"];

function valid(v: unknown): v is KnownStage {
  return typeof v === "string" && (STAGES as string[]).includes(v);
}

/** The best current answer, or null when nothing has been said anywhere. */
export function readStudentStage(): KnownStage | null {
  const profile = readLocalProfile();
  if (profile && valid(profile.studentStage)) return profile.studentStage;
  const local = loadJSON<KnownStage>(STORAGE_KEYS.studentStage);
  if (valid(local)) return local;
  const tracker = loadJSON<TrackerData>(TRACKER_KEY);
  if (tracker && valid(tracker.mode)) return tracker.mode;
  return null;
}

/** Remember a picker answer locally (signed-in profiles save their own). */
export function writeStudentStage(stage: KnownStage): void {
  saveJSON(STORAGE_KEYS.studentStage, stage);
}
