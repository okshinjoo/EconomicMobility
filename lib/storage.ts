// Lightweight, SSR-safe localStorage helpers for "pick up where you left off".
//
// This is the persistence layer that real accounts will later sync FROM:
// when Supabase auth lands, a logged-in user's saved quiz result and budget
// migrate out of localStorage into their account (see docs/auth-plan.md).
// Keep the snapshot shapes stable, and bump the `:vN` suffix on breaking
// changes so old data is ignored rather than misread.

export const STORAGE_KEYS = {
  quizResult: "empower:quiz-result:v1",
  budget: "empower:budget:v1",
  debt: "empower:debt:v1",
  savings: "empower:savings:v1",
  college: "empower:college:v1",
  paycheck: "empower:paycheck:v1",
  autoLoan: "empower:auto-loan:v1",
  mortgage: "empower:mortgage:v1",
  studentLoan: "empower:student-loan:v1",
  compound: "empower:compound:v1",
  retirement: "empower:retirement:v1",
  investment: "empower:investment:v1",
  rothIra: "empower:roth-ira:v1",
  rent: "empower:rent:v1",
  emergencyFund: "empower:emergency-fund:v1",
  dti: "empower:dti:v1",
  creditCard: "empower:credit-card:v1",
  resourcesState: "empower:resources-state:v1",
  readArticles: "empower:read-articles:v1",
  realityCheck: "empower:reality-check:v1",
  netWorth: "empower:net-worth:v1",
} as const;

export function loadJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full, disabled, or private-mode — fail silently.
  }
}

export function removeStored(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
