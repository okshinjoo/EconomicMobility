// Progress sync: everything the site remembers on this device (empower:*
// localStorage keys) mirrors into the signed-in user's `user_data` rows.
//
// Strategy, kept deliberately simple and lossless:
// - On login, MERGE both sides. Map-shaped keys (read articles, badges,
//   visited tools, quiz scores) union their entries so cross-device history
//   accumulates instead of one device clobbering the other. For everything
//   else (calculator snapshots), whichever side has data wins; if both do,
//   the local copy (the device in front of the user) is kept and pushed up.
// - After login, every saveJSON() write is mirrored up (debounced) via the
//   storage hook, so the account stays current without any component changes.
// - Sign-out leaves localStorage untouched — the device keeps working
//   exactly like a logged-out visitor, per the no-walls promise.

import type { SupabaseClient } from "@supabase/supabase-js";
import { setStorageMirror } from "./storage";
import { PROFILE_KEY } from "./profile";

const PREFIX = "empower:";

// Keys whose values are Record<string, ...> maps that should UNION across
// devices rather than replace. Everything else is a whole-snapshot value.
const MAP_KEYS = new Set([
  "empower:read-articles:v1",
  "empower:visited-tools:v1",
  "empower:article-quizzes:v1",
  "empower:skill-mastery:v1",
  "empower:course-badges:v1",
  "empower:challenge-badges:v1",
  "empower:challenge-progress:v1",
  "empower:community-likes:v1",
  "empower:flashcards:v1",
  "empower:welcomed:v1",
]);

// Never synced: the profile mirror is managed by the account panel itself.
const SKIP = new Set([PROFILE_KEY]);

function localKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(PREFIX) && !SKIP.has(k)) keys.push(k);
  }
  return keys;
}

function readRaw(key: string): unknown | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** One-time merge when a user signs in. Returns how many keys synced. */
export async function syncOnLogin(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { data: rows } = await supabase
    .from("user_data")
    .select("key, data")
    .eq("user_id", userId);
  const server = new Map<string, unknown>(
    (rows ?? []).map((r: { key: string; data: unknown }) => [r.key, r.data])
  );

  const merged = new Map<string, unknown>();
  const keys = new Set([...localKeys(), ...server.keys()]);
  for (const key of keys) {
    if (SKIP.has(key)) continue;
    const local = readRaw(key);
    const remote = server.get(key) ?? null;
    let value: unknown;
    if (local != null && remote != null) {
      value =
        MAP_KEYS.has(key) && isRecord(local) && isRecord(remote)
          ? { ...remote, ...local }
          : local;
    } else {
      value = local ?? remote;
    }
    if (value == null) continue;
    merged.set(key, value);
  }

  // Write merged state to BOTH sides.
  for (const [key, value] of merged) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full/disabled — server copy still lands
    }
  }
  if (merged.size > 0) {
    await supabase.from("user_data").upsert(
      [...merged].map(([key, data]) => ({ user_id: userId, key, data })),
      { onConflict: "user_id,key" }
    );
  }

  startMirror(supabase, userId);
  return merged.size;
}

// ---- Live mirror: pushes ongoing saves up, debounced per key. ----

let pending = new Map<string, unknown>();
let timer: ReturnType<typeof setTimeout> | null = null;

export function startMirror(supabase: SupabaseClient, userId: string): void {
  setStorageMirror((key, value) => {
    if (!key.startsWith(PREFIX) || SKIP.has(key)) return;
    pending.set(key, value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const batch = pending;
      pending = new Map();
      timer = null;
      void supabase
        .from("user_data")
        .upsert(
          [...batch].map(([k, data]) => ({ user_id: userId, key: k, data })),
          { onConflict: "user_id,key" }
        );
    }, 1200);
  });
}

export function stopMirror(): void {
  setStorageMirror(null);
  pending = new Map();
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  syncedUser = null;
  syncPromise = null;
}

// ---- Once-per-load guard ----------------------------------------------
// Both the header AccountButton (mounted on every page) and the /account
// panel trigger sync on login; this makes them share one merge instead of
// racing duplicate upserts.

let syncedUser: string | null = null;
let syncPromise: Promise<number> | null = null;

export function ensureSynced(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  if (syncedUser === userId && syncPromise) return syncPromise;
  syncedUser = userId;
  syncPromise = syncOnLogin(supabase, userId);
  return syncPromise;
}
