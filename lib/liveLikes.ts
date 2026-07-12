// Real like tallies (July 2026): now that members exist, likes can be
// counted honestly. One row per (target, member) in the Supabase `likes`
// table — target is a post id ("say-hello") or a comment key ("c:<id>").
// Tallies are PUBLIC and count member likes only; signed-out visitors keep
// the old personal-only local heart (their taps aren't counted — no
// anonymous ballot stuffing). Everything no-ops when accounts are disabled.

import type { Session } from "@supabase/supabase-js";
import { getSupabase, accountsEnabled } from "./supabase";

export interface LikeData {
  counts: Record<string, number>;
  /** Targets the signed-in visitor has liked (empty when signed out). */
  mine: Record<string, boolean>;
}

const EMPTY: LikeData = { counts: {}, mine: {} };

export async function fetchLikes(targets: string[]): Promise<LikeData> {
  if (!accountsEnabled || targets.length === 0) return EMPTY;
  const supabase = getSupabase();
  if (!supabase) return EMPTY;
  const { data: sessionData } = await supabase.auth.getSession();
  const myId = sessionData.session?.user.id ?? null;
  const { data, error } = await supabase
    .from("likes")
    .select("target, user_id")
    .in("target", targets);
  if (error || !data) return EMPTY;
  const counts: Record<string, number> = {};
  const mine: Record<string, boolean> = {};
  for (const row of data as Array<{ target: string; user_id: string }>) {
    counts[row.target] = (counts[row.target] ?? 0) + 1;
    if (myId && row.user_id === myId) mine[row.target] = true;
  }
  return { counts, mine };
}

/** Fire-and-forget like/unlike; duplicate likes are rejected by the primary
 *  key and safely ignored. */
export async function setLike(
  session: Session,
  target: string,
  liked: boolean
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  if (liked) {
    await supabase
      .from("likes")
      .insert({ target, user_id: session.user.id })
      .then(
        () => undefined,
        () => undefined
      );
  } else {
    await supabase
      .from("likes")
      .delete()
      .eq("target", target)
      .eq("user_id", session.user.id);
  }
}
