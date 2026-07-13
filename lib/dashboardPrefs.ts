// Dashboard personalization (July 2026, owner ask: "your profile dashboard
// should have things you can look at and personalize"). Local-first on
// purpose: one empower:* whole-snapshot key, so it syncs to the account
// through the existing mirror with NO new Supabase column. Everything here
// is presentation preference — hiding a card never deletes any data.

import { loadJSON, saveJSON } from "./storage";

export const DASHBOARD_PREFS_KEY = "empower:dashboard-prefs:v1";

/** Accent applied to the identity avatar (and the picker swatches).
 *  Brand-adjacent hues only — all dark enough for ink/cream contrast. */
export const ACCENT_OPTIONS: { id: string; color: string; label: string }[] = [
  { id: "amber", color: "#e7a33c", label: "Amber (the default)" },
  { id: "forest", color: "#15624b", label: "Forest" },
  { id: "terracotta", color: "#d26a4c", label: "Terracotta" },
  { id: "slate", color: "#4b5f8a", label: "Slate blue" },
  { id: "teal", color: "#2f6d80", label: "Teal" },
  { id: "plum", color: "#7d5a8a", label: "Plum" },
];

/** The overview cards a member can show/hide. Ids are stable — they live
 *  in saved prefs; rename labels freely, never ids. */
export const DASHBOARD_CARDS: { id: string; label: string }[] = [
  { id: "stats", label: "Reading & progress stats" },
  { id: "heatmap", label: "Activity heatmap" },
  { id: "pipeline", label: "Scholarship pipeline & tracker" },
  { id: "tools", label: "Pinned tools" },
  { id: "student", label: "Student shortcuts" },
  { id: "recent", label: "Recent reading" },
  { id: "badges", label: "Badge case" },
  { id: "topics", label: "Reading by topic" },
];

export const MAX_PINNED_TOOLS = 4;

export interface DashboardPrefs {
  /** Hex from ACCENT_OPTIONS, or null for the amber default. */
  accent: string | null;
  /** Card ids from DASHBOARD_CARDS the member switched off. */
  hiddenCards: string[];
  /** Tool slugs pinned to the quick-launch card (max MAX_PINNED_TOOLS). */
  pinnedTools: string[];
}

export const DEFAULT_PREFS: DashboardPrefs = {
  accent: null,
  hiddenCards: [],
  pinnedTools: ["budget", "paycheck"],
};

export function readDashboardPrefs(): DashboardPrefs {
  const p = loadJSON<Partial<DashboardPrefs>>(DASHBOARD_PREFS_KEY);
  if (!p) return DEFAULT_PREFS;
  return {
    accent: typeof p.accent === "string" ? p.accent : null,
    hiddenCards: Array.isArray(p.hiddenCards) ? p.hiddenCards : [],
    pinnedTools: Array.isArray(p.pinnedTools)
      ? p.pinnedTools.slice(0, MAX_PINNED_TOOLS)
      : DEFAULT_PREFS.pinnedTools,
  };
}

export function writeDashboardPrefs(p: DashboardPrefs): void {
  saveJSON(DASHBOARD_PREFS_KEY, p);
}
