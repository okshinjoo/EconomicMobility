// "About you" recommendation signals (July 2026, owner ask: "give more
// options... the goal is to get as much info to recommend the best
// things"). LOCAL-FIRST on purpose: one empower:* whole-snapshot key,
// auto-synced through the account mirror, no Supabase column and never
// exposed on public profiles — these answers exist only to point the
// site's own recommendations, matching the no-forms-about-you stance
// (the copy on the tab says exactly that).
//
// Every field maps to a REAL recommendation dimension we already serve:
// income/family mirror the plan builder's intake enums (and prefill it),
// moments map 1:1 to lib/moments bundles, confidence mirrors the quiz's
// beginner/advanced tiers.

import { loadJSON, saveJSON } from "./storage";
import type { IntakeAnswers } from "./plan";

export const ABOUT_YOU_KEY = "empower:about-you:v1";

export interface AboutYou {
  /** Money rhythm — same enum as the plan intake. Empty = unanswered. */
  income: IntakeAnswers["income"] | "";
  /** Family situation — same enum as the plan intake. */
  family: IntakeAnswers["family"] | "";
  /** lib/moments ids — "what's happening soon" multi-select. */
  moments: string[];
  /** Self-declared comfort level (the quiz measures it; this is the
   *  standing answer for people who skip the quiz). */
  confidence: "" | "new" | "some" | "confident";
}

export const EMPTY_ABOUT_YOU: AboutYou = {
  income: "",
  family: "",
  moments: [],
  confidence: "",
};

export const INCOME_CHOICES: { id: AboutYou["income"] & string; label: string }[] = [
  { id: "steady", label: "Steady paycheck" },
  { id: "irregular", label: "Money comes in unevenly" },
  { id: "none", label: "No income yet" },
  { id: "supported", label: "Family covers most things" },
];

export const FAMILY_CHOICES: { id: AboutYou["family"] & string; label: string }[] = [
  { id: "on-my-own", label: "I'm on my own financially" },
  { id: "family-helps", label: "Family helps me out" },
  { id: "i-help-family", label: "I help support my family" },
];

export const CONFIDENCE_CHOICES: { id: Exclude<AboutYou["confidence"], "">; label: string }[] = [
  { id: "new", label: "New to all of this" },
  { id: "some", label: "I know some things" },
  { id: "confident", label: "Pretty confident" },
];

export function readAboutYou(): AboutYou {
  const a = loadJSON<Partial<AboutYou>>(ABOUT_YOU_KEY);
  if (!a) return EMPTY_ABOUT_YOU;
  return {
    income: (a.income as AboutYou["income"]) ?? "",
    family: (a.family as AboutYou["family"]) ?? "",
    moments: Array.isArray(a.moments) ? a.moments : [],
    confidence: (a.confidence as AboutYou["confidence"]) ?? "",
  };
}

export function writeAboutYou(a: AboutYou): void {
  saveJSON(ABOUT_YOU_KEY, a);
}
