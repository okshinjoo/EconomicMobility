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

export interface AddCommentResult {
  error: string | null;
  /** True when the AI safety check published it instantly for everyone. */
  published: boolean;
}

/** Insert a member comment (or one-level reply). Tries the AI-review route
 *  first (/api/comment: clean comments publish instantly, uncertain ones go
 *  to the human queue). If the route isn't configured (503) or unreachable,
 *  falls back to a direct pending insert — the pre-AI behavior. */
export async function addLiveComment(opts: {
  session: Session;
  postId: string;
  parentId?: string;
  text: string;
}): Promise<AddCommentResult> {
  const body = opts.text.trim();
  if (!body) return { error: "Write something first.", published: false };
  if (body.length > 4000)
    return {
      error: "That's a bit long: 4,000 characters max.",
      published: false,
    };
  const profile = readLocalProfile();
  const authorName = profile?.displayName?.trim() || "Member";
  const authorTag = communityTag() || null;
  const authorFlairs = communityFlairs();

  // 1) The AI-review pipeline.
  try {
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${opts.session.access_token}`,
      },
      body: JSON.stringify({
        postId: opts.postId,
        parentId: opts.parentId,
        text: body,
        authorName,
        authorTag,
        authorFlairs,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { status?: string };
      return { error: null, published: data.status === "approved" };
    }
    if (res.status !== 503) {
      return { error: "Couldn't send that. Please try again.", published: false };
    }
    // 503 = route not configured -> fall through to the direct insert.
  } catch {
    // Network hiccup on the route -> try the direct insert.
  }

  // 2) Fallback: direct pending insert (review-first, no AI).
  const supabase = getSupabase();
  if (!supabase)
    return { error: "Accounts aren't available right now.", published: false };
  const { error } = await supabase.from("comments").insert({
    post_id: opts.postId,
    parent_id: opts.parentId ?? null,
    user_id: opts.session.user.id,
    author_name: authorName,
    author_tag: authorTag,
    author_flairs: authorFlairs,
    body,
    status: "pending",
  });
  if (error)
    return { error: "Couldn't send that. Please try again.", published: false };
  return { error: null, published: false };
}

/** Delete one of YOUR OWN comments (RLS enforces ownership server-side;
 *  replies under it cascade away with it). Returns an error message or null. */
export async function deleteLiveComment(id: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return "Not available right now.";
  const { error } = await supabase.from("comments").delete().eq("id", id);
  return error ? "Couldn't delete that. Please try again." : null;
}

/** Small session hook shared by the comment form and the admin queue. */
export { accountsEnabled };
