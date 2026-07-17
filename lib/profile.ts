// The account profile: who this person is, and whether they want that shown
// when they post. Mirrored into localStorage so client components (community
// forms, future personalization) can read it synchronously without a network
// round trip. The server copy in Supabase `profiles` is the source of truth.

import { loadJSON, saveJSON, removeStored } from "./storage";

export const PROFILE_KEY = "empower:profile:v1";

export type ProfileRole = "" | "student" | "working" | "retired";

/** Which student (July 2026, owner ask: personalized recommendations).
 *  Same three tracks as the student tracker's TrackerMode — keep in sync. */
export type StudentStage = "" | "hs" | "cc" | "uni";

export const STUDENT_STAGE_OPTIONS: {
  id: Exclude<StudentStage, "">;
  label: string;
}[] = [
  { id: "hs", label: "High school" },
  { id: "cc", label: "Community college" },
  { id: "uni", label: "University" },
];

export function stageLabel(stage: StudentStage): string {
  return STUDENT_STAGE_OPTIONS.find((s) => s.id === stage)?.label ?? "";
}

export interface Profile {
  displayName: string;
  role: ProfileRole;
  /** Set when role is "student" — drives student-stage personalization.
   *  Optional: profiles saved before July 2026 don't carry it. */
  studentStage?: StudentStage;
  /** Show "Name · Student" style tag on community posts/questions. */
  showTag: boolean;
  /** Goal ids from GOAL_OPTIONS — what the member is working toward. */
  goals: string[];
  /** Flair ids from FLAIR_OPTIONS, in pick order. Any number may be
   *  picked; only the first MAX_FLAIRS display anywhere. */
  flairs: string[];
  /** Short "about me" for the public member page (280 chars max). */
  bio: string;
  /** Opt-in: show bio/role/flairs/member-since on the public member page.
   *  Default OFF — private-first, same stance as showTag. */
  publicProfile: boolean;
  /** Public URL of the member's uploaded photo (avatars bucket); empty or
   *  absent = the initial-letter avatar. Optional: older mirrors lack it. */
  avatarUrl?: string;
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
  /** Distinct per-flair hue — dark enough for text on light surfaces and
   *  for cream text when used as a solid chip. */
  color: string;
}

export const FLAIR_OPTIONS: FlairOption[] = [
  // useful — where you're coming from
  { id: "first-gen", label: "First-gen", kind: "useful" , color: "#b3762f" },
  { id: "intl-student", label: "International student", kind: "useful" , color: "#4b5f8a" },
  { id: "parent", label: "Parent", kind: "useful" , color: "#7a5230" },
  { id: "two-jobs", label: "Working two jobs", kind: "useful" , color: "#6b4f8a" },
  { id: "debt-free-journey", label: "Debt-free journey", kind: "useful" , color: "#15624b" },
  { id: "rebuilding-credit", label: "Rebuilding credit", kind: "useful" , color: "#a33d3d" },
  { id: "future-homeowner", label: "Future homeowner", kind: "useful" , color: "#c9842a" },
  { id: "new-investor", label: "New investor", kind: "useful" , color: "#0c4a39" },
  // fun — personality
  { id: "spreadsheet-lover", label: "Spreadsheet lover", kind: "fun" , color: "#2f6d80" },
  { id: "coupon-wizard", label: "Coupon wizard", kind: "fun" , color: "#8a6d1f" },
  { id: "thrift-legend", label: "Thrift store legend", kind: "fun" , color: "#7d5a8a" },
  { id: "family-cfo", label: "Family CFO", kind: "fun" , color: "#d26a4c" },
  { id: "meal-prep-champ", label: "Meal prep champion", kind: "fun" , color: "#5a7d3b" },
  { id: "ask-me-fafsa", label: "Ask me about FAFSA", kind: "fun" , color: "#3b6d99" },
  { id: "recovering-impulse", label: "Recovering impulse buyer", kind: "fun" , color: "#a34d6d" },
  { id: "pro-latte", label: "Pro-latte budgeter", kind: "fun" , color: "#6b4a2f" },
];

export function flairLabel(id: string): string {
  return FLAIR_OPTIONS.find((f) => f.id === id)?.label ?? "";
}

export function flairColor(id: string): string {
  return FLAIR_OPTIONS.find((f) => f.id === id)?.color ?? "#6b7a72";
}

/** Community surfaces store flair LABELS (from the review email), so they
 *  look colors up by label. */
export function flairColorByLabel(label: string): string {
  return FLAIR_OPTIONS.find((f) => f.label === label)?.color ?? "#6b7a72";
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
  { id: "transfer", label: "Transfer without losing money" },
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
