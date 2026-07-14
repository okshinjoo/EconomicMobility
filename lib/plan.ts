// "My Plan" — the personalized plan object (plan-builder-spec.md, July
// 2026). One plan per device/account, stored as a whole snapshot at
// PLAN_KEY (account sync already handles non-map keys: snapshots prefer
// local, no accountSync changes needed). Items only ever reference REAL
// site content — the API route validates every href before a plan is
// saved, and the client falls back to a deterministic journey-based plan
// when the AI is unavailable, so this feature degrades, never breaks.

import { loadJSON, saveJSON, removeStored } from "./storage";

export const PLAN_KEY = "empower:my-plan:v1";

export interface IntakeAnswers {
  /** GOAL_OPTIONS id — picks the journey skeleton. */
  goal: string;
  /** Free text: the specific version of the goal, e.g. "transfer with
   *  under $20k of debt". Optional. */
  detail: string;
  /** Where they are: gates college items and tone. */
  stage:
    | "high-school"
    | "community-college"
    | "four-year"
    | "transferring"
    | "working"
    | "between";
  /** Money rhythm: decides whether budgeting-first or income-first leads. */
  income: "steady" | "irregular" | "none" | "supported";
  /** Family situation: gates benefits/emergency-fund guidance. */
  family: "on-my-own" | "family-helps" | "i-help-family";
  /** Optional target: "1200 by August", "under $20k of debt". */
  target: string;
}

export type PlanItemKind =
  | "guide"
  | "tool"
  | "course"
  | "challenge"
  | "deadline"
  | "habit";

export interface PlanItem {
  id: string;
  kind: PlanItemKind;
  /** Imperative: "File the FAFSA". */
  title: string;
  /** ONE sentence tied to their intake. */
  why: string;
  href: string;
  /** Display date, only ever copied from lib/deadlines. */
  due?: string;
  /** For derived auto-checks: article slug / tool href / course id /
   *  challenge id / topic id. Absent = manually checkable. */
  doneKey?: string;
  /** Manual check state for habit/deadline items. */
  checked?: boolean;
}

/** A journey-style stage grouping plan items (session 6). Optional and
 *  BACKWARD COMPATIBLE: plans saved before stages existed simply render
 *  as the flat checklist. itemIds reference PlanItem.id. */
export interface PlanStage {
  title: string;
  why: string;
  itemIds: string[];
}

export interface MyPlan {
  createdAt: string;
  intake: IntakeAnswers;
  headline: string;
  items: PlanItem[];
  /** Journey-style stages for the roadmap-trail view. Absent on old plans. */
  stages?: PlanStage[];
  /** True when the AI wrote it; false = deterministic journey fallback. */
  aiComposed: boolean;
}

export function loadPlan(): MyPlan | null {
  const p = loadJSON<MyPlan>(PLAN_KEY);
  return p && Array.isArray(p.items) && p.items.length > 0 ? p : null;
}

export function savePlan(plan: MyPlan): void {
  saveJSON(PLAN_KEY, plan);
  // Keep the shelf copy in step: manual checks and revisions on the active
  // plan must not leave a stale snapshot behind on the profile.
  syncShelfCopy(plan);
}

// ---------------------------------------------------------------------------
// The plan SHELF (July 14, 2026 owner ask: "make multiple plans and import
// up to three to save on your profile"). The ACTIVE plan stays at PLAN_KEY —
// every existing consumer (dashboard PlanCard, JourneyIndex made-for-you,
// student mirror) keeps reading it unchanged. The shelf is a second
// whole-snapshot key holding up to MAX_SAVED_PLANS saved plans; like every
// empower:* key it rides the account mirror, so saved plans follow the
// member across devices. Plans are identified by their createdAt stamp
// (every build mints a fresh one).

export const PLAN_SHELF_KEY = "empower:my-plans:v1";
export const MAX_SAVED_PLANS = 3;

export interface SavedPlan {
  /** The plan's createdAt — stable identity across saves. */
  id: string;
  savedAt: string;
  plan: MyPlan;
}

export function loadShelf(): SavedPlan[] {
  const s = loadJSON<SavedPlan[]>(PLAN_SHELF_KEY);
  return Array.isArray(s)
    ? s.filter((e) => e && e.plan && Array.isArray(e.plan.items))
    : [];
}

/** Save (or re-save) a plan to the shelf. Returns "full" when the plan is
 *  new and all slots are taken — the caller shows the remove-one nudge. */
export function saveToShelf(plan: MyPlan): "saved" | "full" {
  const shelf = loadShelf();
  const at = new Date().toISOString();
  const existing = shelf.findIndex((e) => e.id === plan.createdAt);
  if (existing >= 0) {
    shelf[existing] = { id: plan.createdAt, savedAt: at, plan };
  } else {
    if (shelf.length >= MAX_SAVED_PLANS) return "full";
    shelf.unshift({ id: plan.createdAt, savedAt: at, plan });
  }
  saveJSON(PLAN_SHELF_KEY, shelf);
  return "saved";
}

export function removeFromShelf(id: string): SavedPlan[] {
  const shelf = loadShelf().filter((e) => e.id !== id);
  saveJSON(PLAN_SHELF_KEY, shelf);
  return shelf;
}

/** Update the shelf copy of a plan that's already saved; no-op otherwise. */
function syncShelfCopy(plan: MyPlan): void {
  const shelf = loadShelf();
  const i = shelf.findIndex((e) => e.id === plan.createdAt);
  if (i < 0) return;
  shelf[i] = { ...shelf[i], plan };
  saveJSON(PLAN_SHELF_KEY, shelf);
}

export function clearPlan(): void {
  removeStored(PLAN_KEY);
}

/** Flip the manual check on a habit/deadline item. */
export function toggleItem(plan: MyPlan, itemId: string): MyPlan {
  const next: MyPlan = {
    ...plan,
    items: plan.items.map((i) =>
      i.id === itemId ? { ...i, checked: !i.checked } : i
    ),
  };
  savePlan(next);
  return next;
}
