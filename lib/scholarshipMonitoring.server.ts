import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Service-role client for scheduled monitors and protected review routes. */
export function getScholarshipMonitorAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Scholarship monitoring requires Supabase URL and service-role credentials.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

