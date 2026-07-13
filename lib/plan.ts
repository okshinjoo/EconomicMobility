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

export interface MyPlan {
  createdAt: string;
  intake: IntakeAnswers;
  headline: string;
  items: PlanItem[];
  /** True when the AI wrote it; false = deterministic journey fallback. */
  aiComposed: boolean;
}

export function loadPlan(): MyPlan | null {
  const p = loadJSON<MyPlan>(PLAN_KEY);
  return p && Array.isArray(p.items) && p.items.length > 0 ? p : null;
}

export function savePlan(plan: MyPlan): void {
  saveJSON(PLAN_KEY, plan);
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
