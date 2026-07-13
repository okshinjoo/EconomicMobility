// The student tracker (July 2026, owner ask): courses, units, grades, and
// a freeform to-do list — the money-native "class tracker." July 13 owner
// pass: THREE TRACKS in one tracker, picked by the student and stored in
// the snapshot:
//   hs  — high school: the course flag means "earns college credit" (AP/
//         IB/dual enrollment); banked credit units x cost-per-unit = the
//         tuition those classes may save, priced at community-college rates
//   cc  — community college (the original): units toward the 60-unit
//         transfer threshold, transferable-vs-at-risk, dollars protected
//   uni — university: units toward an editable degree target (default
//         120), with terms-to-go estimated at a full-time pace
// Everything derived client-side from what the student enters. One
// whole-snapshot key, so account sync carries it like the plan. No dates,
// no schedule fields (calendars do that job); transferability is the
// student's own checkbox, confirmed against ASSIST — we never guess.

import { loadJSON, saveJSON } from "./storage";

export const TRACKER_KEY = "empower:student-tracker:v1";

/** 60 semester units = the standard California transfer threshold. */
export const TRANSFER_UNITS = 60;

/** Full-time pace used for the university terms-to-go estimate. */
export const UNITS_PER_TERM = 15;

export type TrackerMode = "hs" | "cc" | "uni";

export type CourseStatus = "planned" | "taking" | "done";

export const GRADES = [
  "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", "P",
] as const;
export type Grade = (typeof GRADES)[number] | "";

/** Standard 4.0 scale; P (pass) carries units but no GPA weight. */
const GRADE_POINTS: Record<Exclude<Grade, "" | "P">, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, F: 0,
};

export interface Course {
  id: string;
  name: string;
  /** Kept as the raw input string; parse with unitsOf(). */
  units: string;
  /** Free text: "Fall 2026". */
  term: string;
  status: CourseStatus;
  /** cc: the student's own check against ASSIST (or their transfer
   *  center). hs: this class earns college credit (AP/IB/dual
   *  enrollment). uni: unused. */
  transferable: boolean;
  grade: Grade;
}

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export interface TrackerData {
  /** Which track the student is on; existing snapshots default to cc. */
  mode: TrackerMode;
  /** Editable; defaults to California's $46/unit (also the honest rate
   *  for pricing what a high schooler's credits could save). */
  costPerUnit: string;
  /** uni: editable degree target; defaults to the common 120. */
  targetUnits: string;
  courses: Course[];
  todos: Todo[];
}

export const EMPTY_TRACKER: TrackerData = {
  mode: "cc",
  costPerUnit: "46",
  targetUnits: "120",
  courses: [],
  todos: [],
};

export function loadTracker(): TrackerData {
  const t = loadJSON<TrackerData>(TRACKER_KEY);
  if (!t || !Array.isArray(t.courses) || !Array.isArray(t.todos)) {
    return EMPTY_TRACKER;
  }
  return { ...EMPTY_TRACKER, ...t };
}

export function saveTracker(t: TrackerData): void {
  saveJSON(TRACKER_KEY, t);
}

export function unitsOf(c: Course): number {
  const n = parseFloat(c.units);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export interface TrackerSummary {
  unitsDone: number;
  unitsTaking: number;
  /** Flagged (transferable / college-credit) units, done + taking. */
  unitsTransferable: number;
  /** Flagged units already finished — what's actually banked. */
  unitsFlaggedDone: number;
  unitsAtRisk: number;
  /** cc: flagged units x cost. hs: same math — tuition those classes
   *  may save at community-college rates. */
  dollarsProtected: number;
  /** uni: parsed degree target (falls back to 120). */
  targetUnits: number;
  /** uni: units still needed after done ones. */
  unitsToGo: number;
  /** uni: unitsToGo at the full-time pace, rounded up. */
  termsToGo: number;
  /** Null until at least one letter-graded done course exists. */
  gpa: number | null;
  gradedUnits: number;
}

export function summarize(t: TrackerData): TrackerSummary {
  let unitsDone = 0;
  let unitsTaking = 0;
  let unitsTransferable = 0;
  let unitsFlaggedDone = 0;
  let unitsAtRisk = 0;
  let qualityPoints = 0;
  let gradedUnits = 0;

  for (const c of t.courses) {
    const u = unitsOf(c);
    if (c.status === "done") unitsDone += u;
    if (c.status === "taking") unitsTaking += u;
    if (c.status !== "planned") {
      if (c.transferable) unitsTransferable += u;
      else unitsAtRisk += u;
    }
    if (c.status === "done" && c.transferable) unitsFlaggedDone += u;
    if (c.status === "done" && c.grade && c.grade !== "P") {
      qualityPoints += GRADE_POINTS[c.grade as Exclude<Grade, "" | "P">] * u;
      gradedUnits += u;
    }
  }

  const cost = parseFloat(t.costPerUnit);
  const target = parseFloat(t.targetUnits);
  const targetUnits =
    Number.isFinite(target) && target > 0 ? target : 120;
  const unitsToGo = Math.max(0, targetUnits - unitsDone);

  return {
    unitsDone,
    unitsTaking,
    unitsTransferable,
    unitsFlaggedDone,
    unitsAtRisk,
    dollarsProtected:
      Number.isFinite(cost) && cost > 0 ? unitsTransferable * cost : 0,
    targetUnits,
    unitsToGo,
    termsToGo: Math.ceil(unitsToGo / UNITS_PER_TERM),
    gpa: gradedUnits > 0 ? qualityPoints / gradedUnits : null,
    gradedUnits,
  };
}
