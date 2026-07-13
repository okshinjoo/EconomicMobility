// Public member profiles (July 2026): members may OPT IN to a public
// profile (bio, life stage, flairs, member-since) on their account page.
// RLS only exposes rows with public_profile = true to other people, so
// this fetch can't see anything a member didn't choose to share.
// Everything no-ops when accounts are disabled.

import { getSupabase, accountsEnabled } from "./supabase";

export interface PublicProfile {
  displayName: string;
  bio: string;
  role: string;
  flairs: string[];
  /** ISO timestamp of account creation — the public "member since". */
  since: string;
}

/** Mirror of communityFeed's memberSlug — duplicated here so the client
 *  bundle doesn't drag the whole curated feed in. Keep the two in sync. */
export function profileSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function fetchPublicProfileBySlug(
  slug: string
): Promise<PublicProfile | null> {
  if (!accountsEnabled || !slug) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, bio, role, flairs, created_at")
    .eq("public_profile", true);
  if (error || !data) return null;
  const hit = (
    data as Array<{
      display_name: string;
      bio: string | null;
      role: string | null;
      flairs: unknown;
      created_at: string;
    }>
  ).find((r) => profileSlug(r.display_name ?? "") === slug);
  if (!hit || !hit.display_name) return null;
  return {
    displayName: hit.display_name,
    bio: hit.bio ?? "",
    role: hit.role ?? "",
    flairs: Array.isArray(hit.flairs) ? (hit.flairs as string[]) : [],
    since: hit.created_at,
  };
}
