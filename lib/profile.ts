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
}

export const ROLE_LABELS: Record<Exclude<ProfileRole, "">, string> = {
  student: "Student",
  working: "Working professional",
  retired: "Retired",
};

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
