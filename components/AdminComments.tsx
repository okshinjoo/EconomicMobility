"use client";

// The moderation queue for live comments (owner-facing, deliberately plain).
// Access = a row in public.moderators for your user id; everyone else sees a
// friendly nothing-to-see-here. Approve publishes for everyone instantly;
// Reject hides it forever (the author isn't notified — kindness by silence).

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check, Loader2, X } from "lucide-react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import { communityPosts } from "@/lib/communityFeed";

interface QueueRow {
  id: string;
  post_id: string;
  parent_id: string | null;
  author_name: string;
  author_tag: string | null;
  author_flairs: unknown;
  body: string;
  created_at: string;
}

const postTitle = (id: string) =>
  communityPosts.find((p) => p.id === id)?.title ?? id;

export default function AdminComments() {
  const [supabase] = useState<SupabaseClient | null>(() =>
    accountsEnabled ? getSupabase() : null
  );
  const [session, setSession] = useState<Session | null>(null);
  const [isMod, setIsMod] = useState<boolean | null>(null);
  const [rows, setRows] = useState<QueueRow[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState(0);

  const loadQueue = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("comments")
      .select(
        "id, post_id, parent_id, author_name, author_tag, author_flairs, body, created_at"
      )
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    setRows((data as QueueRow[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      setIsMod(false);
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (!data.session) {
        setIsMod(false);
        return;
      }
      const { data: mod } = await supabase
        .from("moderators")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      setIsMod(Boolean(mod));
    });
  }, [supabase]);

  useEffect(() => {
    if (isMod) loadQueue();
  }, [isMod, loadQueue]);

  async function decide(id: string, status: "approved" | "rejected") {
    if (!supabase) return;
    setBusy(id);
    const { error } = await supabase
      .from("comments")
      .update({ status })
      .eq("id", id);
    setBusy(null);
    if (!error) {
      setRows((prev) => prev?.filter((r) => r.id !== id) ?? prev);
      setDone((n) => n + 1);
    }
  }

  if (isMod === null)
    return (
      <p className="flex items-center gap-2 text-sm text-stone">
        <Loader2 className="h-4 w-4 animate-spin" /> Checking access…
      </p>
    );

  if (!isMod)
    return (
      <div className="rounded-2xl border border-sand bg-cream p-6">
        <p className="font-display text-lg font-semibold text-ink">
          Moderators only
        </p>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          {session
            ? "This account isn't on the moderator list."
            : "Sign in with a moderator account to review comments."}{" "}
          <Link
            href="/account"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
          >
            Go to your account
          </Link>
        </p>
      </div>
    );

  return (
    <div>
      <p className="text-sm text-stone">
        {rows === null
          ? "Loading the queue…"
          : rows.length === 0
            ? done > 0
              ? "Queue clear — nice work."
              : "Nothing waiting. New comments land here the moment members post them."
            : `${rows.length} waiting for review. Approve publishes instantly; reject hides it forever.`}
      </p>

      <div className="mt-5 space-y-4">
        {(rows ?? []).map((r) => {
          const flairs = Array.isArray(r.author_flairs)
            ? (r.author_flairs as string[])
            : [];
          return (
            <div
              key={r.id}
              className="rounded-2xl border border-sand bg-cream p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                On:{" "}
                <Link
                  href={`/community/post/${r.post_id}`}
                  className="normal-case text-forest underline decoration-amber decoration-2 underline-offset-4"
                >
                  {postTitle(r.post_id)}
                </Link>
                {r.parent_id && " · reply to a comment"}
              </p>
              <p className="mt-2 text-sm font-bold text-ink">
                {r.author_name}
                {r.author_tag && (
                  <span className="ml-2 font-medium text-stone">
                    {r.author_tag}
                  </span>
                )}
                {flairs.length > 0 && (
                  <span className="ml-2 font-medium text-stone">
                    · {flairs.join(" · ")}
                  </span>
                )}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-[0.95rem] leading-6 text-ink">
                {r.body}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => decide(r.id, "approved")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-700 disabled:opacity-50"
                >
                  {busy === r.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Approve
                </button>
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => decide(r.id, "rejected")}
                  className="inline-flex items-center gap-1.5 rounded-md border border-sand bg-paper px-4 py-2 text-sm font-semibold text-stone transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
