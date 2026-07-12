// The account profile: who this person is, and whether they want that shown
// when they post. Mirrored into localStorage so client components (community
// forms, future personalization) can read it synchronously without a network
// round trip. The server copy in Supabase `profiles` is the source of truth.

import { loadJSON, saveJSON, removeStored } from "./storage";

export const PROFILE_KEY = "empower:profile:v1";

export type ProfileRole = "" | "student" | "working" | "retired";

export interface Profile {
  displayName: string;
  role: ProfileRole;
  /** Show "Name · Student" style tag on community posts/questions. */
  showTag: boolean;
  /** Goal ids from GOAL_OPTIONS — what the member is working toward. */
  goals: string[];
  /** Flair ids from FLAIR_OPTIONS, in pick order. Any number may be
   *  picked; only the first MAX_FLAIRS display anywhere. */
  flairs: string[];
}

export const ROLE_LABELS: Record<Exclude<ProfileRole, "">, string> = {
  student: "Student",
  working: "Working professional",
  retired: "Retired",
};

/** Profile flairs: little badges members pick to show with their name.
 *  Some useful, some personality. Members may PICK any number, but only the
 *  first MAX_FLAIRS in their pick-order are ever displayed. */
export const MAX_FLAIRS = 2;

export interface FlairOption {
  id: string;
  label: string;
  kind: "useful" | "fun";
}

export const FLAIR_OPTIONS: FlairOption[] = [
  // useful — where you're coming from
  { id: "first-gen", label: "First-gen", kind: "useful" },
  { id: "intl-student", label: "International student", kind: "useful" },
  { id: "parent", label: "Parent", kind: "useful" },
  { id: "two-jobs", label: "Working two jobs", kind: "useful" },
  { id: "debt-free-journey", label: "Debt-free journey", kind: "useful" },
  { id: "rebuilding-credit", label: "Rebuilding credit", kind: "useful" },
  { id: "future-homeowner", label: "Future homeowner", kind: "useful" },
  { id: "new-investor", label: "New investor", kind: "useful" },
  // fun — personality
  { id: "spreadsheet-lover", label: "Spreadsheet lover", kind: "fun" },
  { id: "coupon-wizard", label: "Coupon wizard", kind: "fun" },
  { id: "thrift-legend", label: "Thrift store legend", kind: "fun" },
  { id: "family-cfo", label: "Family CFO", kind: "fun" },
  { id: "meal-prep-champ", label: "Meal prep champion", kind: "fun" },
  { id: "ask-me-fafsa", label: "Ask me about FAFSA", kind: "fun" },
  { id: "recovering-impulse", label: "Recovering impulse buyer", kind: "fun" },
  { id: "pro-latte", label: "Pro-latte budgeter", kind: "fun" },
];

export function flairLabel(id: string): string {
  return FLAIR_OPTIONS.find((f) => f.id === id)?.label ?? "";
}

/** Flair labels to show beside the member's name on community submissions —
 *  same privacy switch as the tag itself. */
export function communityFlairs(): string[] {
  const p = readLocalProfile();
  if (!p?.showTag) return [];
  return (p.flairs ?? [])
    .map(flairLabel)
    .filter(Boolean)
    .slice(0, MAX_FLAIRS);
}

/** The pickable goals on the profile page (ids stored in profiles.goals). */
export const GOAL_OPTIONS: { id: string; label: string }[] = [
  { id: "credit", label: "Build my credit" },
  { id: "debt", label: "Pay off debt" },
  { id: "budget", label: "Get better at budgeting" },
  { id: "emergency", label: "Build an emergency fund" },
  { id: "invest", label: "Start investing" },
  { id: "college", label: "Pay for college" },
  { id: "home", label: "Buy a home someday" },
  { id: "retirement", label: "Plan for retirement" },
  { id: "safety", label: "Protect my money from scams" },
];

export function roleLabel(role: ProfileRole): string {
  return role ? ROLE_LABELS[role] : "";
}

/** The local mirror of the signed-in user's profile (null when signed out). */
export function readLocalProfile(): Profile | null {
  return loadJSON<Profile>(PROFILE_KEY);
}

export function writeLocalProfile(p: Profile): void {
  saveJSON(PROFILE_KEY, p);
}

export function clearLocalProfile(): void {
  removeStored(PROFILE_KEY);
}

/** "Jordan · Student" — what rides along on community submissions when the
 *  member opted in. Empty string when signed out or opted out. */
export function communityTag(): string {
  const p = readLocalProfile();
  if (!p || !p.showTag) return "";
  const name = p.displayName.trim();
  const role = roleLabel(p.role);
  if (name && role) return `${name} · ${role}`;
  return name || role;
}
