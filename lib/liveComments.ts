// Live comments (July 2026): the community's first real backend feature.
// Model: MEMBERS-ONLY writing, APPROVE-FIRST publishing. A signed-in member's
// comment inserts straight into Supabase as 'pending' (they see it
// immediately, on every device); it appears for everyone once a moderator
// approves it in /admin/comments. Reading approved comments needs no account.
// Everything degrades gracefully: with accounts disabled (no env vars) the
// UI falls back to the legacy review-by-email form.

import type { Session } from "@supabase/supabase-js";
import { getSupabase, accountsEnabled } from "./supabase";
import { readLocalProfile, communityTag, communityFlairs } from "./profile";

export interface LiveComment {
  id: string;
  postId: string;
  parentId: string | null;
  author: string;
  authorFlairs: string[];
  text: string;
  /** ISO date (YYYY-MM-DD), matching curated CommunityComment dates. */
  date: string;
  /** Epoch ms of creation (pending-chip ordering). */
  at: number;
  status: "pending" | "approved" | "rejected";
  mine: boolean;
}

interface CommentRow {
  id: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  author_name: string;
  author_tag: string | null;
  author_flairs: unknown;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

function rowToComment(row: CommentRow, myId: string | null): LiveComment {
  return {
    id: row.id,
    postId: row.post_id,
    parentId: row.parent_id,
    author: row.author_name || "Member",
    authorFlairs: Array.isArray(row.author_flairs)
      ? (row.author_flairs as string[])
      : [],
    text: row.body,
    date: row.created_at.slice(0, 10),
    at: Date.parse(row.created_at),
    status: row.status,
    mine: myId !== null && row.user_id === myId,
  };
}

/** All live comments visible to THIS visitor for one post: approved ones,
 *  plus their own pending. RLS enforces exactly that server-side. */
export async function fetchLiveComments(
  postId: string
): Promise<LiveComment[]> {
  if (!accountsEnabled) return [];
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: sessionData } = await supabase.auth.getSession();
  const myId = sessionData.session?.user.id ?? null;
  const { data, error } = await supabase
    .from("comments")
    .select(
      "id, post_id, parent_id, user_id, author_name, author_tag, author_flairs, body, status, created_at"
    )
    .eq("post_id", postId)
    .neq("status", "rejected")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return (data as CommentRow[]).map((r) => rowToComment(r, myId));
}

/** Insert a member comment (or one-level reply) as pending. Returns an
 *  error message for the form, or null on success. */
export async function addLiveComment(opts: {
  session: Session;
  postId: string;
  parentId?: string;
  text: string;
}): Promise<string | null> {
  const body = opts.text.trim();
  if (!body) return "Write something first.";
  if (body.length > 4000) return "That's a bit long — 4,000 characters max.";
  const supabase = getSupabase();
  if (!supabase) return "Accounts aren't available right now.";
  const profile = readLocalProfile();
  const { error } = await supabase.from("comments").insert({
    post_id: opts.postId,
    parent_id: opts.parentId ?? null,
    user_id: opts.session.user.id,
    author_name: profile?.displayName?.trim() || "Member",
    author_tag: communityTag() || null,
    author_flairs: communityFlairs(),
    body,
    status: "pending",
  });
  if (error) return "Couldn't send that. Please try again.";
  return null;
}

/** Small session hook shared by the comment form and the admin queue. */
export { accountsEnabled };
