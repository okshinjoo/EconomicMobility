// Supabase client for accounts (auth + synced progress). INERT until the two
// NEXT_PUBLIC_SUPABASE_* env vars are set — every account surface checks
// `accountsEnabled` and renders nothing (or a "coming soon" note) without
// them, so this feature can ship dark and turn on via Vercel env config.
// The anon key is safe to expose: it only grants what Row Level Security
// allows, and every table is locked to `auth.uid() = user_id`.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const accountsEnabled = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Browser Supabase client, or null when accounts aren't configured. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        // PKCE makes the email links (confirm + password reset) land back on
        // our pages with a one-time code the client exchanges itself.
        flowType: "pkce",
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
