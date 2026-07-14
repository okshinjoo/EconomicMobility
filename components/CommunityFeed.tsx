"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PostBaseContext = createContext("/community/post");
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import {
  accountsEnabled,
  addLiveComment,
  deleteLiveComment,
  fetchLiveComments,
  type LiveComment,
} from "@/lib/liveComments";
import { fetchLikes, setLike } from "@/lib/liveLikes";
import { uploadCommunityImage } from "@/lib/communityImages";
import {
  Heart,
  MessageCircle,
  Send,
  Loader2,
  Clock3,
  GraduationCap,
  Compass,
  BookOpen,
  Inbox,
  Pin,
  Award,
  Flame,
  Clock,
  BarChart3,
  UserCheck,
  List,
  LayoutGrid,
  Plus,
  X,
  Search,
  ArrowBigUp,
  Share2,
  Bookmark,
  Check as CheckIcon,
  Trash2,
  ChevronDown,
  ImagePlus,
} from "lucide-react";
import {
  CHANNELS,
  getChannel,
  channelMatches,
  memberSlug,
  credRingColor,
  type ChannelId,
  type CommunityPost,
  type CommunityComment,
} from "@/lib/communityFeed";
import { getFollows } from "@/components/FollowButton";
import { fuzzyScore } from "@/lib/fuzzy";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import { loadJSON, saveJSON } from "@/lib/storage";
import { communityTag, communityFlairs, flairColorByLabel, readLocalProfile } from "@/lib/profile";

// Same moderated-inbox channel as the Ask box (components/AskQuestion.tsx):
// paste the Web3Forms access key for Help@economicmobilityproject.org here to
// go live. Until then the forms run in preview mode: visitors still see
// their own pending posts/comments (saved locally), nothing is sent anywhere.
const WEB3FORMS_ACCESS_KEY = "7fabe5df-806c-4348-b1a9-5a3bd206b692";

const PENDING_COMMENTS_KEY = "empower:community-comments:v1";
const PINNED_CHANNELS_KEY = "empower:community-pinned-channels:v1";
const VIEW_KEY = "empower:community-view:v1";
const SAVED_KEY = "empower:community-saved:v1";
const PENDING_POSTS_KEY = "empower:community-posts:v1";
const LIKES_KEY = "empower:community-likes:v1";
/** This device's last feed visit — powers the honest "new since you were
 *  here" dot (derived from real post dates vs. a local timestamp only). */
const LAST_VISIT_KEY = "empower:community-last-visit:v1";
// Read once per page load (module-scoped): StrictMode's double effect and
// in-session back-and-forth navigation must not clobber the real previous
// visit with "just now", or the dots vanish immediately.
let sessionLastVisit: number | null | undefined;
function readLastVisitOnce(): number | null {
  if (sessionLastVisit === undefined) {
    sessionLastVisit = loadJSON<number>(LAST_VISIT_KEY);
    saveJSON(LAST_VISIT_KEY, Date.now());
  }
  return sessionLastVisit;
}

interface PendingComment {
  author: string;
  text: string;
  at: number;
  /** Present on DB-backed pending comments (deletable, cross-device). */
  liveId?: string;
}
type PendingCommentMap = Record<string, PendingComment[]>;

interface PendingPost {
  author: string;
  text: string;
  at: number;
  channel?: ChannelId;
  /** Flair labels captured at submit time. */
  flairs?: string[];
  /** Post title (July 2026 composer rework; older pendings may lack it). */
  title?: string;
  /** Public URL of an attached picture (Supabase Storage). */
  image?: string;
}

type SendStatus = "idle" | "sending" | "error";

async function submitToInbox(payload: Record<string, string>): Promise<boolean> {
  if (!WEB3FORMS_ACCESS_KEY) return true; // preview mode
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: "Empower Community",
        // Signed-in members who opted in share their profile tag
        // ("Jordan · Student") + flairs for display when published.
        member_tag: communityTag() || "None (anonymous visitor)",
        member_flairs: communityFlairs().join(" | ") || "None",
        ...payload,
      }),
    });
    const data = await res.json().catch(() => ({ success: res.ok }));
    return res.ok && data.success !== false;
  } catch {
    return false;
  }
}

function timeAgo(at: number): string {
  const days = Math.floor((Date.now() - at) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

/** "2d ago" relative timestamps (the Reddit/HN row pattern) derived from the
 *  post's real date. Absolute date lives in the title attr for hover. */
function relativeDate(iso: string): string {
  const days = Math.floor(
    (Date.now() - Date.parse(`${iso}T12:00:00`)) / 86_400_000
  );
  if (days <= 0) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function absoluteDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Server renders the absolute date (deterministic, no hydration mismatch);
 *  the mounted client swaps in the relative form, absolute kept on hover. */
function PostDate({ iso }: { iso: string }) {
  const [rel, setRel] = useState<string | null>(null);
  useEffect(() => setRel(relativeDate(iso)), [iso]);
  return (
    <time dateTime={iso} title={absoluteDate(iso)}>
      {rel ?? formatDate(iso)}
    </time>
  );
}

/** Outlined "You" chip beside your own name — the GitHub-Author pattern,
 *  so your comments are findable at a glance. Pairs with the amber outline
 *  on the comment block itself. */
function YouChip() {
  return (
    <span className="inline-flex items-center rounded-full border-[1.5px] border-amber-deep/60 px-2 py-px text-[11px] font-bold leading-4 text-amber-deep">
      You
    </span>
  );
}

function Avatar({
  name,
  team,
  cred,
  mine,
  small,
}: {
  name: string;
  team?: boolean;
  cred?: number;
  /** The signed-in visitor's own avatar reads "me", not an initial. */
  mine?: boolean;
  /** Compact feed rows use a smaller disc. */
  small?: boolean;
}) {
  const ring = credRingColor(cred ?? 0);
  return (
    <span
      title={ring ? `Community Cred: ${cred}` : undefined}
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold ${
        small ? "h-8 w-8" : "h-10 w-10"
      } ${
        mine ? "text-sm italic" : small ? "text-sm" : "text-base"
      } ${team ? "bg-forest text-cream" : "bg-amber/25 text-amber-deep"}`}
      style={ring ? { boxShadow: `0 0 0 2px ${ring}` } : undefined}
    >
      {mine ? "me" : name.trim().charAt(0).toUpperCase() || "A"}
    </span>
  );
}

/** A post's display chips: the TOP-LEVEL channel, plus (when the post
 *  lives in a sub-channel) a clickable Reddit-style tag that filters the
 *  feed to that sub. */
function usePostChips(post: CommunityPost) {
  const own = getChannel(post.channel);
  const hub = own.parent ? getChannel(own.parent) : own;
  const tag = own.parent ? own : null;
  return { hub, tag };
}

function commentTotalFor(
  post: CommunityPost,
  pendingMap: PendingCommentMap
): number {
  const approvedReplies = post.comments.reduce(
    (sum, c) => sum + (c.replies?.length ?? 0),
    0
  );
  const pendingForPost = Object.entries(pendingMap)
    .filter(([k]) => k === post.id || k.startsWith(`${post.id}::`))
    .reduce((sum, [, v]) => sum + v.length, 0);
  return post.comments.length + approvedReplies + pendingForPost;
}

/** Author names link to member pages; published authors wear a small
 *  Community Cred chip (score computed server-side from curated content). */
function AuthorName({
  name,
  meta,
}: {
  name: string;
  meta?: { cred: number; earned: string[] };
}) {
  return (
    <>
      <Link
        href={`/community/member/${memberSlug(name)}`}
        className="hover:underline"
      >
        {name}
      </Link>
      {meta?.earned.map((e) => (
        <span
          key={e}
          title="Earned automatically from published activity"
          className="text-[11px] font-semibold italic text-ink/55"
        >
          {e}
        </span>
      ))}
    </>
  );
}

function FlairChips({ labels }: { labels?: string[] }) {
  if (!labels || labels.length === 0) return null;
  return (
    <>
      {labels.map((f) => (
        <span
          key={f}
          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{
            color: flairColorByLabel(f),
            background: `${flairColorByLabel(f)}1f`,
          }}
        >
          {f}
        </span>
      ))}
    </>
  );
}

/** Member-backed like tallies for a set of targets (post ids + "c:<id>"
 *  comment keys). Signed-in: hearts live in the DB and count publicly, with
 *  optimistic toggling. Signed out (or accounts off): toggle() declines and
 *  the caller falls back to the personal-only local map. */
function useLiveLikes(targets: string[]) {
  const [likeSession, setLikeSession] = useState<Session | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<Record<string, boolean>>({});
  const targetsKey = targets.join("|");

  useEffect(() => {
    if (!accountsEnabled) return;
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setLikeSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setLikeSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const load = () => {
      fetchLikes(targetsKey ? targetsKey.split("|") : []).then((d) => {
        setCounts(d.counts);
        setMine(d.mine);
      });
    };
    load();
    window.addEventListener("empower:community-updated", load);
    return () => window.removeEventListener("empower:community-updated", load);
  }, [targetsKey]);

  /** Returns false when signed out so the caller can fall back locally. */
  const toggle = (target: string): boolean => {
    if (!likeSession) return false;
    const liked = !mine[target];
    setMine((prev) => ({ ...prev, [target]: liked }));
    setCounts((prev) => ({
      ...prev,
      [target]: Math.max(0, (prev[target] ?? 0) + (liked ? 1 : -1)),
    }));
    void setLike(likeSession, target, liked);
    return true;
  };

  return { likeSession, counts, mine, toggle };
}

function DeleteOwnButton({ liveId }: { liveId: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        if (!window.confirm("Delete this comment? This can't be undone."))
          return;
        setBusy(true);
        const err = await deleteLiveComment(liveId);
        setBusy(false);
        if (!err)
          window.dispatchEvent(new Event("empower:community-updated"));
      }}
      className="inline-flex items-center gap-1 text-xs font-semibold text-stone transition-colors hover:text-terracotta disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

function PendingChip() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-deep">
      <Clock3 className="h-3 w-3" />
      Only you can see this until it&apos;s reviewed
    </span>
  );
}

/** The "share something" composer at the top of the feed. July 2026 owner
 *  rework: posting is a MEMBER thing (the post carries your account's
 *  display name — no free-text name field), posts have a required title,
 *  an optional picture, and the channel picker is two-step Reddit-style:
 *  pick the hub, then optionally one of its tags (sub-channels). Reading
 *  and the visitor's public profile page stay exactly as optional as
 *  before. */
function Composer({ activeChannel }: { activeChannel: "all" | ChannelId }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [hub, setHub] = useState<ChannelId>("questions");
  const [tagId, setTagId] = useState<ChannelId | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [imageError, setImageError] = useState(false);
  const [sent, setSent] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!accountsEnabled);

  // Follow the filter: browsing a hub preselects it; browsing a tag
  // preselects the hub AND the tag.
  useEffect(() => {
    if (activeChannel === "all") return;
    const c = getChannel(activeChannel);
    if (c.parent) {
      setHub(c.parent);
      setTagId(c.id);
    } else {
      setHub(c.id);
      setTagId("");
    }
  }, [activeChannel]);

  useEffect(() => {
    const p = readLocalProfile();
    if (p?.displayName) setName(p.displayName);
    if (!accountsEnabled) return;
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const hubChannel = getChannel(hub);
  const tags = CHANNELS.filter((c) => c.parent === hub);
  const channel: ChannelId = tagId || hub;
  const author = name.trim() || "Member";

  function pickImage(file: File | null) {
    setImageError(false);
    setImageFile(file);
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setStatus("sending");
    setImageError(false);

    // Picture first: a failed upload should hold the post rather than
    // silently dropping the image.
    let imageUrl: string | null = null;
    if (imageFile && session) {
      imageUrl = await uploadCommunityImage(session, imageFile);
      if (!imageUrl) {
        setStatus("idle");
        setImageError(true);
        return;
      }
    }

    const ok = await submitToInbox({
      subject: `New community post for review (${hubChannel.name}${
        tagId ? ` / ${getChannel(tagId).name}` : ""
      })`,
      channel: getChannel(channel).name,
      author,
      title: title.trim(),
      post: text.trim() || "(no body — title only)",
      image_url: imageUrl ?? "None",
    });
    if (!ok) {
      setStatus("error");
      return;
    }
    const pending = loadJSON<PendingPost[]>(PENDING_POSTS_KEY) ?? [];
    pending.unshift({
      author,
      title: title.trim(),
      text: text.trim(),
      at: Date.now(),
      channel,
      flairs: communityFlairs(),
      image: imageUrl ?? undefined,
    });
    saveJSON(PENDING_POSTS_KEY, pending);
    setTitle("");
    setText("");
    pickImage(null);
    setStatus("idle");
    setSent(true);
    // Let the feed pick up the new pending post.
    window.dispatchEvent(new Event("empower:community-updated"));
  }

  // Accounts live but visitor signed out: posts carry your account name now.
  if (accountsEnabled && authReady && !session) {
    return (
      <div className="card-ink rounded-2xl bg-cream p-5 sm:p-6">
        <p className="font-display text-lg font-semibold text-ink">
          Share a win, a question, or what you&apos;re figuring out
        </p>
        <p className="mt-2 text-sm leading-6 text-stone">
          <span className="font-semibold text-ink">
            Posting is for members
          </span>{" "}
          — posts carry your account&apos;s display name (a first name is
          plenty). Your profile page stays private unless you choose to share
          it, and reading stays open to everyone, forever.
        </p>
        <Link
          href="/account"
          className="mt-3 inline-block rounded-md bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
        >
          Sign in or create an account
        </Link>
      </div>
    );
  }
  if (accountsEnabled && !authReady) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="card-ink rounded-2xl bg-cream p-5 sm:p-6"
    >
      <label htmlFor="composer-title" className="font-display text-lg font-semibold text-ink">
        Share a win, a question, or what you&apos;re figuring out
      </label>
      <input
        id="composer-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={140}
        placeholder="Title — say it in one line"
        className="mt-3 w-full rounded-lg border border-sand bg-paper px-4 py-2.5 text-[0.98rem] font-semibold text-ink placeholder:font-normal placeholder:text-stone/60 focus:border-amber focus:outline-none"
      />
      <textarea
        id="composer"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder={
          channel === "say-hello"
            ? "Introduce yourself: first name, where you're at in life, what you're working toward…"
            : "Add the details (optional). Posts are reviewed before they appear for everyone."
        }
        className="mt-2 w-full rounded-lg border border-sand bg-paper px-4 py-3 text-[0.95rem] leading-6 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label
          htmlFor="composer-channel"
          className="text-xs font-semibold uppercase tracking-wide text-stone"
        >
          Post in
        </label>
        <select
          id="composer-channel"
          value={hub}
          onChange={(e) => {
            setHub(e.target.value as ChannelId);
            setTagId("");
          }}
          className="rounded-lg border border-sand bg-paper px-3 py-1.5 text-sm font-semibold text-ink focus:border-amber focus:outline-none"
        >
          {CHANNELS.filter((c) => !c.parent).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="ml-auto">
          {session ? (
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-sand bg-paper px-3 py-1.5 text-sm font-semibold text-stone transition-colors hover:text-ink">
              <ImagePlus className="h-4 w-4" />
              {imageFile ? "Change picture" : "Add a picture"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => pickImage(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <span className="text-xs text-stone">
              Sign in to attach pictures
            </span>
          )}
        </span>
      </div>
      {tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-stone">
            Tag (optional)
          </span>
          {tags.map((t) => {
            const on = tagId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTagId(on ? "" : t.id)}
                aria-pressed={on}
                className="rounded-md border px-2.5 py-1 text-xs font-bold transition-colors"
                style={
                  on
                    ? { background: t.color, borderColor: t.color, color: "#fbf8f1" }
                    : { borderColor: t.color, color: t.color }
                }
              >
                {t.name}
              </button>
            );
          })}
        </div>
      )}
      {imagePreview && (
        <div className="relative mt-3 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
          <img
            src={imagePreview}
            alt="Your attached picture"
            className="max-h-40 rounded-lg border border-sand"
          />
          <button
            type="button"
            onClick={() => pickImage(null)}
            aria-label="Remove picture"
            className="absolute -right-2 -top-2 rounded-full border border-sand bg-cream p-1 text-stone shadow-sm transition-colors hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-ink/70">
          Posting as {author}
        </span>
        <button
          type="submit"
          disabled={status === "sending" || !title.trim()}
          className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Post for review
        </button>
      </div>
      <p className="mt-2 text-xs leading-5 text-stone">
        Reviewed by a real person before it appears. We never sell your data.
        {" "}
        <Link
          href="/privacy"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
        >
          Privacy policy
        </Link>
        .
      </p>
      {sent && (
        <p className="mt-3 text-sm font-medium text-forest">
          Sent. It&apos;s in the feed below for you now, and appears for everyone
          once it&apos;s reviewed.
        </p>
      )}
      {imageError && (
        <p className="mt-3 text-sm font-medium text-terracotta">
          The picture didn&apos;t upload, so the post wasn&apos;t sent. Try
          again, or remove the picture and post without it.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm font-medium text-terracotta">
          Something went wrong sending that. Please try again.
        </p>
      )}
    </form>
  );
}

function CommentForm({
  postId,
  replyTo,
  onSent,
}: {
  postId: string;
  /** Set when this form replies to a specific comment. */
  replyTo?: { id: string; author: string };
  onSent?: () => void;
}) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  // Live-comment auth state: ready + no session = show the sign-in nudge.
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!accountsEnabled);

  useEffect(() => {
    const p = readLocalProfile();
    if (p?.displayName) setName(p.displayName);
    if (!accountsEnabled) return;
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // Pending replies live under a composite key so they render beneath the
  // right comment: "<postId>::<commentId>".
  const storageKey = replyTo ? `${postId}::${replyTo.id}` : postId;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    // Members: through the live pipeline (AI check -> instant publish, or
    // pending for human review; falls back to plain pending when AI is off).
    if (accountsEnabled && session) {
      const result = await addLiveComment({
        session,
        postId,
        parentId: replyTo?.id,
        text,
      });
      if (result.error) {
        setStatus("error");
        return;
      }
      setText("");
      setStatus("idle");
      window.dispatchEvent(new Event("empower:community-updated"));
      onSent?.();
      return;
    }
    const ok = await submitToInbox(
      replyTo
        ? {
            subject: `New community reply for review (post: ${postId})`,
            post_id: postId,
            reply_to_comment: replyTo.id,
            reply_to_author: replyTo.author,
            author: name.trim() || "Anonymous",
            comment: text.trim(),
          }
        : {
            subject: `New community comment for review (post: ${postId})`,
            post_id: postId,
            author: name.trim() || "Anonymous",
            comment: text.trim(),
          }
    );
    if (!ok) {
      setStatus("error");
      return;
    }
    const map = loadJSON<PendingCommentMap>(PENDING_COMMENTS_KEY) ?? {};
    map[storageKey] = [
      ...(map[storageKey] ?? []),
      { author: name.trim() || "Anonymous", text: text.trim(), at: Date.now() },
    ];
    saveJSON(PENDING_COMMENTS_KEY, map);
    setText("");
    setStatus("idle");
    window.dispatchEvent(new Event("empower:community-updated"));
    onSent?.();
  }

  // Accounts live but visitor signed out: comments are a member thing now.
  if (accountsEnabled && authReady && !session) {
    return (
      <div className="mt-4 rounded-xl border border-sand bg-paper p-4">
        <p className="text-sm leading-6 text-stone">
          <span className="font-semibold text-ink">
            Comments are for members.
          </span>{" "}
          A free account takes a minute, and your comments follow you across
          devices. Reading stays open to everyone, forever.
        </p>
        <Link
          href="/account"
          className="mt-3 inline-block rounded-md bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
        >
          Sign in or create an account
        </Link>
      </div>
    );
  }
  if (accountsEnabled && !authReady) return null;

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <Avatar name={name || "A"} mine />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder={replyTo ? `Reply to ${replyTo.author}…` : "Add a comment…"}
          className="w-full rounded-lg border border-sand bg-paper px-4 py-2.5 text-[0.95rem] leading-6 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
        />
      </div>
      {text.trim() && (
        <div className="ml-[3.25rem] flex flex-wrap items-center gap-3">
          {session ? (
            <span className="text-xs font-semibold text-ink/70">
              Posting as {name || "Member"}
            </span>
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full max-w-[13rem] rounded-lg border border-sand bg-paper px-3 py-1.5 text-sm text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
            />
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-1.5 rounded-md bg-forest px-4 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-700 disabled:opacity-50"
          >
            {status === "sending" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Comment
          </button>
          <span className="text-xs text-stone">
            {session
              ? "Checked automatically; most comments publish right away."
              : "Reviewed before it appears for everyone."}
          </span>
          {status === "error" && (
            <span className="text-xs font-medium text-terracotta">
              Failed to send. Please try again.
            </span>
          )}
        </div>
      )}
    </form>
  );
}

/** One approved comment: like (personal), reply (review-first), and its
 *  approved + pending replies indented beneath. Replies are one level deep —
 *  replying to a reply isn't offered (the eventual live system can nest). */
function CommentItem({
  postId,
  comment,
  likes,
  onToggleLike,
  pendingReplies,
  authorMeta,
  likeCounts,
}: {
  postId: string;
  comment: CommunityComment;
  likes: Record<string, boolean>;
  onToggleLike: (key: string) => void;
  pendingReplies: PendingComment[];
  authorMeta: Record<string, { cred: number; earned: string[] }>;
  likeCounts?: Record<string, number>;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const likeKey = `c:${comment.id}`;
  const liked = Boolean(likes[likeKey]);

  return (
    <div className="mt-4">
      <div
        className={`flex items-start gap-3 ${
          comment.mine
            ? "-mx-2 rounded-xl border-[1.5px] border-amber/60 bg-amber/[0.06] p-2 sm:p-3"
            : ""
        }`}
      >
        <Avatar
          name={comment.author}
          team={comment.author === "Empower Team"}
          cred={authorMeta[comment.author]?.cred}
          mine={comment.mine}
        />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-ink">
            {comment.mine ? (
              <YouChip />
            ) : (
              <AuthorName
                name={comment.author}
                meta={authorMeta[comment.author]}
              />
            )}
            <FlairChips labels={comment.authorFlairs} />
            <span className="font-normal text-stone">
              <PostDate iso={comment.date} />
            </span>
          </p>
          <p className="mt-1 text-[0.95rem] leading-6 text-stone">
            {comment.text}
          </p>
          <div className="mt-1.5 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onToggleLike(likeKey)}
              aria-pressed={liked}
              className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                liked ? "text-terracotta" : "text-stone hover:text-ink"
              }`}
            >
              <Heart
                className="h-3.5 w-3.5"
                fill={liked ? "currentColor" : "none"}
              />
              {liked ? "Liked" : "Like"}
              {(likeCounts?.[likeKey] ?? 0) > 0 && (
                <span className="tabular-nums">{likeCounts![likeKey]}</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setReplyOpen((o) => !o)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone transition-colors hover:text-ink"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Reply
            </button>
            {comment.mine && comment.liveId && (
              <DeleteOwnButton liveId={comment.liveId} />
            )}
          </div>

          {/* approved replies */}
          {(comment.replies ?? []).map((r) => (
            <div
              key={r.id}
              className={`mt-3 flex items-start gap-2.5 border-l-2 pl-3 ${
                r.mine
                  ? "rounded-r-xl border-amber bg-amber/[0.06] py-2 pr-2"
                  : "border-sand"
              }`}
            >
              <Avatar
                name={r.author}
                team={r.author === "Empower Team"}
                cred={authorMeta[r.author]?.cred}
                mine={r.mine}
              />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-ink">
                  {r.mine ? (
                    <YouChip />
                  ) : (
                    <AuthorName name={r.author} meta={authorMeta[r.author]} />
                  )}
                  <FlairChips labels={r.authorFlairs} />
                  <span className="font-normal text-stone">
                    <PostDate iso={r.date} />
                  </span>
                </p>
                <p className="mt-1 text-[0.95rem] leading-6 text-stone">
                  {r.text}
                </p>
                {r.mine && r.liveId && (
                  <div className="mt-1">
                    <DeleteOwnButton liveId={r.liveId} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* the visitor's own pending replies */}
          {pendingReplies.map((r) => (
            <div key={r.at} className="mt-3 flex items-start gap-2.5 border-l-2 border-amber/50 pl-3">
              <Avatar name={r.author} mine />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                  <YouChip />
                  <PendingChip />
                  {r.liveId && <DeleteOwnButton liveId={r.liveId} />}
                </p>
                <p className="mt-1 text-[0.95rem] leading-6 text-stone">
                  {r.text}
                </p>
              </div>
            </div>
          ))}

          {replyOpen && (
            <div className="mt-2 border-l-2 border-sand pl-3">
              <CommentForm
                postId={postId}
                replyTo={{ id: comment.id, author: comment.author }}
                onSent={() => setReplyOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Medium treatment for PINNED posts in compact view (owner call): bigger
 *  than a row — title + a two-line teaser + meta — smaller than the full
 *  card. Click anywhere to expand. */
function MiniCard({
  post,
  commentTotal,
}: {
  post: CommunityPost;
  commentTotal: number;
}) {
  const postBase = useContext(PostBaseContext);
  return (
    <Link
      id={`post-${post.id}`}
      href={`${postBase}/${post.id}`}
      className="group block w-full scroll-mt-24 rounded-2xl border-2 border-ink bg-cream p-5 text-left shadow-[4px_4px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cream">
          Pinned
        </span>
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
          style={{
            color: getChannel(post.channel).color,
            background: `${getChannel(post.channel).color}1a`,
          }}
        >
          {getChannel(post.channel).name}
        </span>
      </div>
      <p className="mt-2 font-display text-lg font-semibold text-ink group-hover:underline">
        {post.title}
      </p>
      <p
        className="mt-1 text-sm leading-6 text-stone"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.body[0]}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-stone">
        <span className="font-semibold">{post.author}</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3 w-3" />
          {commentTotal === 0
            ? "Be the first to say hi"
            : `${commentTotal} intro${commentTotal === 1 ? "" : "s"} and counting`}
        </span>
        <span className="ml-auto font-semibold text-forest">
          Read &amp; introduce yourself →
        </span>
      </p>
    </Link>
  );
}

/** Compact (Reddit-style) row: avatar + chips + title, then one meta line —
 *  author, relative time, comment count. Click opens the post page. Carries
 *  the post-<id> anchor so deep links work. */
function CompactRow({
  post,
  commentTotal,
  likeCount = 0,
  onTag,
  cred,
  isNew = false,
}: {
  post: CommunityPost;
  commentTotal: number;
  likeCount?: number;
  onTag: (id: ChannelId) => void;
  /** Author's Community Cred (drives the avatar ring). */
  cred?: number;
  /** Posted since this device's last visit (local timestamp, honest). */
  isNew?: boolean;
}) {
  const { hub, tag } = usePostChips(post);
  const postBase = useContext(PostBaseContext);
  return (
    <Link
      id={`post-${post.id}`}
      href={`${postBase}/${post.id}`}
      className="group flex w-full items-start gap-3 scroll-mt-24 rounded-xl border border-sand bg-cream px-4 py-3 text-left transition-[border-color,box-shadow] hover:border-ink/40 hover:shadow-[2px_2px_0_rgba(17,33,28,0.12)]"
    >
      <span className="hidden pt-0.5 sm:block">
        <Avatar name={post.author} team={post.team} cred={cred} small />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {isNew && (
            <span
              title="New since your last visit"
              aria-label="New since your last visit"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-deep"
            />
          )}
          {post.pinned && (
            <span className="rounded-md bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cream">
              Pinned
            </span>
          )}
          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
            style={{ color: hub.color, background: `${hub.color}1a` }}
          >
            {hub.name}
          </span>
          {tag && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTag(tag.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onTag(tag.id);
                }
              }}
              title={`Show only ${tag.name} posts`}
              className="rounded-md border px-1.5 py-0.5 text-[10px] font-bold transition-opacity hover:opacity-70"
              style={{ borderColor: tag.color, color: tag.color }}
            >
              {tag.name}
            </span>
          )}
          <span className="min-w-0 font-display text-base font-semibold leading-snug text-ink group-hover:underline">
            {post.title}
          </span>
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-stone">
          <span className="font-semibold text-ink/70">{post.author}</span>
          <span>·</span>
          <PostDate iso={post.date} />
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {commentTotal === 0
              ? "No comments yet"
              : `${commentTotal} comment${commentTotal === 1 ? "" : "s"}`}
          </span>
          {likeCount > 0 && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {likeCount}
              </span>
            </>
          )}
        </span>
      </span>
    </Link>
  );
}

function PostCard({
  post,
  likes,
  onToggleLike,
  pendingMap,
  authorMeta,
  likeCounts,
  onTag,
  full = false,
  saved = false,
  onToggleSave,
}: {
  post: CommunityPost;
  likes: Record<string, boolean>;
  onToggleLike: (key: string) => void;
  pendingMap: PendingCommentMap;
  authorMeta: Record<string, { cred: number; earned: string[] }>;
  likeCounts?: Record<string, number>;
  onTag?: (id: ChannelId) => void;
  /** true on the post's own page: comments + forms render. In the feed
   *  (false) the card is Reddit-style — content + action bar only. */
  full?: boolean;
  saved?: boolean;
  onToggleSave?: () => void;
}) {
  const frame = useFrame();
  const { hub, tag } = usePostChips(post);
  const pendingComments = pendingMap[post.id] ?? [];
  const commentTotal = commentTotalFor(post, pendingMap);
  const [open, setOpen] = useState(full && post.comments.length > 0);
  const [copied, setCopied] = useState(false);
  const liked = Boolean(likes[post.id]);
  const postBase = useContext(PostBaseContext);

  const share = async () => {
    const url = `${window.location.origin}${postBase}/${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article
      id={`post-${post.id}`}
      className="card-ink scroll-mt-24 rounded-2xl bg-cream p-5 sm:p-7"
    >
      <div className="flex items-center gap-3">
        <Avatar
          name={post.author}
          team={post.team}
          cred={authorMeta[post.author]?.cred}
        />
        <div>
          <p className="flex flex-wrap items-center gap-2 font-semibold leading-tight text-ink">
            <AuthorName name={post.author} meta={authorMeta[post.author]} />
            <FlairChips labels={post.authorFlairs} />
            {post.team && (
              <span className="-rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
                Team
              </span>
            )}
          </p>
          <p className="text-xs font-medium text-stone">
            <PostDate iso={post.date} />
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
          {post.pinned && (
            <span className="rounded-md bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
              Pinned
            </span>
          )}
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-bold"
            style={{ color: hub.color, background: `${hub.color}1a` }}
          >
            {hub.name}
          </span>
          {tag && onTag && (
            <button
              type="button"
              onClick={() => onTag(tag.id)}
              title={`Show only ${tag.name} posts`}
              className="rounded-md border px-2 py-0.5 text-[11px] font-bold transition-opacity hover:opacity-70"
              style={{ borderColor: tag.color, color: tag.color }}
            >
              {tag.name}
            </button>
          )}
        </div>
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {post.title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.98rem] leading-7 text-stone">
        {post.body.map((para) => (
          <p key={para.slice(0, 32)}>{para}</p>
        ))}
      </div>
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element -- curated member upload, arbitrary storage URL
        <img
          src={post.image.src}
          alt={post.image.alt ?? ""}
          loading="lazy"
          className="mt-4 max-h-96 w-auto max-w-full rounded-xl border-2 border-ink/10"
        />
      )}
      {post.link && (
        <p className="mt-4">
          <Link
            href={frameHref(post.link.href, frame)}
            className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
          >
            {post.link.label}
          </Link>
        </p>
      )}

      {/* Reddit-style action bar */}
      <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-sand pt-3">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          aria-pressed={liked}
          title="Like (only you see this)"
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
            liked
              ? "bg-terracotta/15 text-terracotta"
              : "text-stone hover:bg-paper hover:text-ink"
          }`}
        >
          <ArrowBigUp
            className="h-[18px] w-[18px]"
            fill={liked ? "currentColor" : "none"}
          />
          {liked ? "Liked" : "Like"}
          {(likeCounts?.[post.id] ?? 0) > 0 && (
            <span className="tabular-nums">{likeCounts![post.id]}</span>
          )}
        </button>
        {full ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-stone transition-colors hover:bg-paper hover:text-ink"
          >
            <MessageCircle className="h-4 w-4" />
            {commentTotal === 0
              ? "Comment"
              : `${commentTotal} Comment${commentTotal === 1 ? "" : "s"}`}
          </button>
        ) : (
          <Link
            href={`${postBase}/${post.id}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-stone transition-colors hover:bg-paper hover:text-ink"
          >
            <MessageCircle className="h-4 w-4" />
            {commentTotal === 0
              ? "Comment"
              : `${commentTotal} Comment${commentTotal === 1 ? "" : "s"}`}
          </Link>
        )}
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-stone transition-colors hover:bg-paper hover:text-ink"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-forest" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {copied ? "Copied" : "Share"}
        </button>
        {onToggleSave && (
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={saved}
            title={saved ? "Unsave" : "Save (only you see this)"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
              saved
                ? "bg-amber/20 text-amber-deep"
                : "text-stone hover:bg-paper hover:text-ink"
            }`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={saved ? "currentColor" : "none"}
            />
            {saved ? "Saved" : "Save"}
          </button>
        )}
      </div>

      {/* Comments render only on the post's own page (Reddit model) */}
      {full && (open || commentTotal === 0 || pendingComments.length > 0) && (
        <div className="mt-2">
          {post.comments.map((c) => (
            <CommentItem
              key={c.id}
              postId={post.id}
              comment={c}
              likes={likes}
              onToggleLike={onToggleLike}
              pendingReplies={pendingMap[`${post.id}::${c.id}`] ?? []}
              authorMeta={authorMeta}
              likeCounts={likeCounts}
            />
          ))}
          {pendingComments.map((c) => (
            <div key={c.at} className="mt-4 flex items-start gap-3">
              <Avatar name={c.author} mine />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                  <YouChip />
                  <PendingChip />
                  {c.liveId && <DeleteOwnButton liveId={c.liveId} />}
                </p>
                <p className="mt-1 text-[0.95rem] leading-6 text-stone">{c.text}</p>
              </div>
            </div>
          ))}
          <CommentForm postId={post.id} />
        </div>
      )}
    </article>
  );
}

/** The full post view for /community/post/[id]: same components, wired to
 *  this device's likes/saves/pending state, comments + forms included. */
export function SinglePost({
  post,
  authorMeta,
}: {
  post: CommunityPost;
  authorMeta: Record<string, { cred: number; earned: string[] }>;
}) {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [pendingComments, setPendingComments] = useState<PendingCommentMap>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [live, setLive] = useState<LiveComment[]>([]);

  useEffect(() => {
    const refresh = () => {
      setLikes(loadJSON<Record<string, boolean>>(LIKES_KEY) ?? {});
      setPendingComments(loadJSON<PendingCommentMap>(PENDING_COMMENTS_KEY) ?? {});
      setSavedPosts(loadJSON<Record<string, boolean>>(SAVED_KEY) ?? {});
      // The live pipeline: approved comments for everyone, own pending too.
      fetchLiveComments(post.id).then(setLive);
    };
    refresh();
    window.addEventListener("empower:community-updated", refresh);
    return () => window.removeEventListener("empower:community-updated", refresh);
  }, [post.id]);

  // Fold live comments into the same shapes the renderer already speaks:
  // approved ones join post.comments (replies nested one level), own
  // pending ones join the pending map (same "only you can see this" chip).
  const mergedPost = useMemo(() => {
    const approved = live.filter((c) => c.status === "approved");
    if (approved.length === 0) return post;
    const toComment = (c: LiveComment): CommunityComment => ({
      id: c.id,
      author: c.author,
      date: c.date,
      text: c.text,
      authorFlairs: c.authorFlairs.length ? c.authorFlairs : undefined,
      mine: c.mine || undefined,
      liveId: c.mine ? c.id : undefined,
    });
    const all: CommunityComment[] = (post.comments ?? []).map((c) => ({
      ...c,
      replies: c.replies ? [...c.replies] : undefined,
    }));
    const byId = new Map(all.map((c) => [c.id, c]));
    for (const c of approved.filter((x) => !x.parentId)) {
      const cc = toComment(c);
      all.push(cc);
      byId.set(cc.id, cc);
    }
    for (const r of approved.filter((x) => x.parentId)) {
      const parent = byId.get(r.parentId!);
      const rc = toComment(r);
      if (parent) parent.replies = [...(parent.replies ?? []), rc];
      else all.push(rc);
    }
    return { ...post, comments: all };
  }, [post, live]);

  const mergedPending = useMemo(() => {
    const mine = live.filter((c) => c.mine && c.status === "pending");
    if (mine.length === 0) return pendingComments;
    const next: PendingCommentMap = { ...pendingComments };
    for (const c of mine) {
      const key = c.parentId ? `${post.id}::${c.parentId}` : post.id;
      next[key] = [
        ...(next[key] ?? []),
        { author: c.author, text: c.text, at: c.at, liveId: c.id },
      ];
    }
    return next;
  }, [pendingComments, live, post.id]);

  const toggleLike = (key: string) => {
    setLikes((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveJSON(LIKES_KEY, next);
      return next;
    });
  };
  const toggleSaved = () => {
    setSavedPosts((prev) => {
      const next = { ...prev, [post.id]: !prev[post.id] };
      if (!next[post.id]) delete next[post.id];
      saveJSON(SAVED_KEY, next);
      return next;
    });
  };

  const likeTargets = useMemo(() => {
    const t = [post.id];
    for (const c of mergedPost.comments ?? []) {
      t.push(`c:${c.id}`);
      for (const r of c.replies ?? []) t.push(`c:${r.id}`);
    }
    return t;
  }, [mergedPost, post.id]);
  const liveLikes = useLiveLikes(likeTargets);

  return (
    <PostCard
      post={mergedPost}
      likes={liveLikes.likeSession ? liveLikes.mine : likes}
      onToggleLike={(key) => {
        if (!liveLikes.toggle(key)) toggleLike(key);
      }}
      pendingMap={mergedPending}
      authorMeta={authorMeta}
      likeCounts={liveLikes.counts}
      full
      saved={Boolean(savedPosts[post.id])}
      onToggleSave={toggleSaved}
    />
  );
}

export default function CommunityFeed({
  posts,
  authorMeta = {},
  initialChannel = "all",
  postBase = "/community/post",
  studentMode = false,
}: {
  posts: CommunityPost[];
  authorMeta?: Record<string, { cred: number; earned: string[] }>;
  initialChannel?: "all" | ChannelId;
  postBase?: string;
  /** The /students frame's rail: STUDENT_RAIL order, Students' subs
   *  clickable, every other channel behind a "more channels" toggle. */
  studentMode?: boolean;
}) {
  const frame = useFrame();
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [pendingComments, setPendingComments] = useState<PendingCommentMap>({});
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
  const [active, setActive] = useState<"all" | ChannelId>(initialChannel);
  const [pinnedChannels, setPinnedChannels] = useState<ChannelId[]>([]);
  // Reddit-style sorting. No public vote counts exist here (honesty rule),
  // so ranking runs on the real signals: approved comments + age.
  const [sort, setSort] = useState<"best" | "hot" | "new" | "top">("best");
  const [followingOnly, setFollowingOnly] = useState(false);
  const [follows, setFollows] = useState<string[]>([]);
  // Reddit-style compact view is the default; card view is the classic
  // full-post feed. Choice persists per device.
  const [view, setView] = useState<"compact" | "card">("compact");
  const [channelQuery, setChannelQuery] = useState("");
  // Student rail only: whether the non-student channels are expanded.
  const [showAllChannels, setShowAllChannels] = useState(false);
  const [postQuery, setPostQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [savedOnly, setSavedOnly] = useState(false);
  // Posts dated after this device's previous visit wear a small dot.
  const [newSince, setNewSince] = useState<number | null>(null);
  // The sort bar sticks just under the sticky header (height measured,
  // since the main and student headers differ).
  const [stickyTop, setStickyTop] = useState(64);

  useEffect(() => {
    const v = loadJSON<string>(VIEW_KEY);
    if (v === "card" || v === "compact") setView(v);
    setSavedPosts(loadJSON<Record<string, boolean>>(SAVED_KEY) ?? {});
    setNewSince(readLastVisitOnce());
    const h = document.querySelector("header")?.getBoundingClientRect().height;
    if (h) setStickyTop(Math.round(h));
    // Legacy deep links (/community#post-<id>) now live on post pages.
    const hash = window.location.hash;
    if (hash.startsWith("#post-")) {
      window.location.replace(
        `${postBase}/${hash.slice("#post-".length)}`
      );
    }
  }, []);

  const setViewPersist = (v: "compact" | "card") => {
    setView(v);
    saveJSON(VIEW_KEY, v);
  };

  const toggleSaved = (id: string) => {
    setSavedPosts((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next[id]) delete next[id];
      saveJSON(SAVED_KEY, next);
      return next;
    });
  };

  const openComposer = () => {
    setShowComposer(true);
    setTimeout(() => {
      document
        .getElementById("community-composer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };
  const [topRange, setTopRange] = useState<
    "day" | "week" | "month" | "year" | "all"
  >("week");

  useEffect(() => {
    setPinnedChannels(loadJSON<ChannelId[]>(PINNED_CHANNELS_KEY) ?? []);
  }, []);

  const feedLikeTargets = useMemo(() => posts.map((p) => p.id), [posts]);
  const feedLikes = useLiveLikes(feedLikeTargets);

  const togglePinChannel = (id: ChannelId) => {
    setPinnedChannels((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveJSON(PINNED_CHANNELS_KEY, next);
      return next;
    });
  };

  useEffect(() => {
    const refresh = () => {
      setLikes(loadJSON<Record<string, boolean>>(LIKES_KEY) ?? {});
      setPendingComments(loadJSON<PendingCommentMap>(PENDING_COMMENTS_KEY) ?? {});
      setPendingPosts(loadJSON<PendingPost[]>(PENDING_POSTS_KEY) ?? []);
      setFollows(getFollows());
    };
    refresh();
    window.addEventListener("empower:community-updated", refresh);
    return () => window.removeEventListener("empower:community-updated", refresh);
  }, []);

  // Works for post ids and comment keys ("c:<commentId>") alike.
  const toggleLike = (key: string) => {
    setLikes((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveJSON(LIKES_KEY, next);
      return next;
    });
  };

  const followSet = new Set(follows);
  const pq = postQuery.trim().toLowerCase();
  const matchesQuery = (p: CommunityPost): boolean => {
    if (!pq) return true;
    // Typo-tolerant: the gist is enough ("buget", "scma", "FASFA"...).
    if (fuzzyScore(pq, `${p.title} ${p.author}`) > 0) return true;
    if (p.body.some((para) => fuzzyScore(pq, para) > 0)) return true;
    for (const c of p.comments) {
      if (fuzzyScore(pq, `${c.author} ${c.text}`) > 0) return true;
      for (const r of c.replies ?? []) {
        if (fuzzyScore(pq, `${r.author} ${r.text}`) > 0) return true;
      }
    }
    return false;
  };
  const inChannel = posts.filter(
    (p) =>
      (active === "all" || channelMatches(p.channel, active)) &&
      (!followingOnly || followSet.has(memberSlug(p.author))) &&
      (!savedOnly || Boolean(savedPosts[p.id])) &&
      matchesQuery(p)
  );
  const postTime = (p: CommunityPost) => Date.parse(`${p.date}T12:00:00`);
  const engagement = (p: CommunityPost) => p.comments.length;
  const hotScore = (p: CommunityPost) => {
    const ageHours = Math.max(0, (Date.now() - postTime(p)) / 3_600_000);
    return (engagement(p) + 1) / Math.pow(ageHours + 2, 1.2);
  };
  const TOP_RANGES: Record<typeof topRange, number> = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
    all: Infinity,
  };
  let visiblePosts: CommunityPost[];
  if (sort === "new") {
    visiblePosts = [...inChannel].sort((a, b) => postTime(b) - postTime(a));
  } else if (sort === "hot") {
    visiblePosts = [...inChannel].sort((a, b) => hotScore(b) - hotScore(a));
  } else if (sort === "top") {
    const cutoff = Date.now() - TOP_RANGES[topRange] * 86_400_000;
    visiblePosts = inChannel
      .filter((p) => topRange === "all" || postTime(p) >= cutoff)
      .sort(
        (a, b) => engagement(b) - engagement(a) || postTime(b) - postTime(a)
      );
  } else {
    // "best" = the curated file order, pinned posts first.
    visiblePosts = [...inChannel].sort(
      (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
    );
  }
  const visiblePending = pendingPosts.filter(
    (p) =>
      active === "all" || !p.channel || channelMatches(p.channel, active)
  );
  const countFor = (id: ChannelId) =>
    posts.filter((p) => channelMatches(p.channel, id)).length;
  const pinnedSet = new Set(pinnedChannels);
  // Student mode (owner rework, July 13, 2026): ONLY Students and its
  // sub-categories get full rows, front of the rail. Every other channel —
  // say-hello and questions included — is heavily minimized: a closed
  // "everything else" toggle that expands into COMPACT rows.
  const studentFeatured = studentMode
    ? [
        getChannel("students"),
        ...CHANNELS.filter((c) => c.parent === "students"),
      ].filter((c) => !pinnedSet.has(c.id))
    : [];
  const studentRest = CHANNELS.filter(
    (c) =>
      !c.parent && !pinnedSet.has(c.id) && c.id !== "students"
  );
  const orderedForChips = studentMode
    ? [...pinnedChannels.map(getChannel), ...studentFeatured, ...studentRest]
    : [
        ...pinnedChannels.map(getChannel),
        ...CHANNELS.filter((c) => !pinnedSet.has(c.id) && !c.parent),
      ];

  const ChannelRow = ({
    c,
    indent = false,
    compact = false,
  }: {
    c: (typeof CHANNELS)[number];
    indent?: boolean;
    /** The student rail's minimized "everything else" rows. */
    compact?: boolean;
  }) => (
    <div
      className={`group/row flex items-center rounded-lg transition-colors ${
        active === c.id ||
        (active !== "all" && getChannel(active).parent === c.id)
          ? "bg-amber/25"
          : "hover:bg-paper"
      } ${indent ? "ml-6" : ""}`}
    >
      <button
        type="button"
        onClick={() => setActive(c.id)}
        aria-pressed={active === c.id}
        title={c.tagline}
        className={`flex min-w-0 flex-1 items-center ${
          compact
            ? "gap-2 px-3 py-1 text-xs font-medium"
            : "gap-2.5 px-3 py-2 text-sm font-semibold"
        } ${active === c.id ? "text-ink" : "text-stone hover:text-ink"}`}
      >
        <c.icon
          className={`flex-shrink-0 ${compact ? "h-3 w-3" : "h-4 w-4"}`}
          strokeWidth={1.75}
          style={{ color: compact ? "#8a8577" : c.color }}
        />
        <span className="min-w-0 flex-1 truncate text-left">{c.name}</span>
        <span className="text-xs font-bold text-stone/70">
          {countFor(c.id)}
        </span>
      </button>
      <button
        type="button"
        onClick={() => togglePinChannel(c.id)}
        aria-label={
          pinnedSet.has(c.id) ? `Unpin ${c.name}` : `Pin ${c.name}`
        }
        title={pinnedSet.has(c.id) ? "Unpin" : "Pin to top"}
        className={`mr-1.5 rounded p-1 transition-opacity ${
          pinnedSet.has(c.id)
            ? "text-amber-deep"
            : "text-stone/50 opacity-0 hover:text-ink group-hover/row:opacity-100 focus:opacity-100"
        }`}
      >
        <Pin
          className="h-3.5 w-3.5"
          fill={pinnedSet.has(c.id) ? "currentColor" : "none"}
        />
      </button>
    </div>
  );

  const railGroups = (
    <>
      <button
        type="button"
        onClick={openComposer}
        className="btn-ink mb-2 flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink bg-amber px-4 py-2.5 text-sm font-bold text-ink"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        New post
      </button>
      {/* find a channel */}
      <div className="relative mb-3 px-0.5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone/60" />
        <input
          value={channelQuery}
          onChange={(e) => setChannelQuery(e.target.value)}
          placeholder="Find a channel…"
          aria-label="Find a channel"
          className="w-full rounded-lg border border-sand bg-paper py-2 pl-8 pr-7 text-sm text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
        />
        {channelQuery && (
          <button
            type="button"
            onClick={() => setChannelQuery("")}
            aria-label="Clear channel search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-stone hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* pinned channels */}
      {!channelQuery && pinnedChannels.length > 0 && (
        <>
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Pinned
          </p>
          <div className="mb-4 mt-1.5 space-y-0.5">
            {pinnedChannels.map((id) => (
              <ChannelRow key={`pin-${id}`} c={getChannel(id)} />
            ))}
          </div>
        </>
      )}

      {/* channels */}
      <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
        Channels
      </p>
      <div className="mt-1.5 space-y-0.5">
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            active === "all"
              ? "bg-amber/25 text-ink"
              : "text-stone hover:bg-paper hover:text-ink"
          }`}
        >
          <Inbox className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="flex-1 text-left">All posts</span>
          <span className="text-xs font-bold text-stone/70">{posts.length}</span>
        </button>
        {(() => {
          const q = channelQuery.trim().toLowerCase();
          if (q) {
            const list = CHANNELS.filter(
              (c) =>
                c.name.toLowerCase().includes(q) ||
                c.tagline.toLowerCase().includes(q) ||
                fuzzyScore(q, `${c.name} ${c.tagline}`) > 0
            );
            if (list.length === 0) {
              return (
                <p className="px-3 py-2 text-xs text-stone">
                  No channel matches &ldquo;{channelQuery.trim()}&rdquo;.
                </p>
              );
            }
            return list.map((c) => <ChannelRow key={c.id} c={c} />);
          }
          if (studentMode) {
            return (
              <>
                {studentFeatured.map((c) => (
                  <ChannelRow
                    key={c.id}
                    c={c}
                    indent={Boolean(c.parent)}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setShowAllChannels((v) => !v)}
                  aria-expanded={showAllChannels}
                  className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-stone/70 transition-colors hover:bg-paper hover:text-ink"
                >
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      showAllChannels ? "rotate-180" : ""
                    }`}
                  />
                  {showAllChannels
                    ? "Hide the rest"
                    : `Everything else (${studentRest.length} channels)`}
                </button>
                {showAllChannels &&
                  studentRest.map((c) => (
                    <ChannelRow key={c.id} c={c} compact />
                  ))}
              </>
            );
          }
          return CHANNELS.filter(
            (c) => !pinnedSet.has(c.id) && !c.parent
          ).map((c) => <ChannelRow key={c.id} c={c} />);
        })()}
      </div>

      {/* channel ideas: tiny, deliberate — the rail stays a rail */}
      <p className="mt-2 px-3 text-[11px] leading-4 text-stone/80">
        Missing a room?{" "}
        <a
          href="mailto:Help@economicmobilityproject.org?subject=New%20channel%20idea"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2 hover:text-ink"
        >
          Email us your channel idea
        </a>
        .
      </p>

      {/* explore */}
      <p className="mt-6 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
        Explore
      </p>
      <div className="mt-1.5 space-y-0.5">
        {(
          [
            ["/ask", "Ask a question", MessageCircle],
            ["/courses", "Courses", GraduationCap],
            ["/challenges", "Challenges", Compass],
            ["/learn", "The library", BookOpen],
            ["/glossary", "Glossary", BookOpen],
          ] as const
        ).map(([href, label, Icon]) => (
          <Link
            key={href}
            href={frameHref(href, frame)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-stone transition-colors hover:bg-paper hover:text-ink"
          >
            <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
            {label}
          </Link>
        ))}
      </div>

      {/* house rules */}
      <div className="mt-6 rounded-xl border border-sand bg-paper p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
          House rules
        </p>
        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-stone">
          <li>Be kind. No shaming anyone&apos;s situation.</li>
          <li>No selling or &ldquo;DM me&rdquo; offers.</li>
          <li>No personal details, yours or anyone&apos;s.</li>
          <li>Experiences welcome; individualized advice isn&apos;t.</li>
        </ul>
      </div>
    </>
  );

  return (
    <PostBaseContext.Provider value={postBase}>
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-8">
      {/* left rail, CGF-style (desktop) */}
      <aside className="card-ink hidden rounded-2xl bg-cream px-2 py-4 lg:sticky lg:top-24 lg:block">
        {railGroups}
      </aside>

      <div className={view === "compact" ? "min-w-0 space-y-2.5" : "min-w-0 space-y-5"}>
      {/* channel bar (mobile fallback) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 lg:hidden">
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
            active === "all"
              ? "bg-ink text-cream"
              : "border border-sand bg-cream text-stone hover:text-ink"
          }`}
        >
          All posts
        </button>
        {orderedForChips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            aria-pressed={active === c.id}
            title={c.tagline}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              active === c.id
                ? "bg-ink text-cream"
                : "border border-sand bg-cream text-stone hover:text-ink"
            }`}
          >
            {c.name}
            <span
              className={`ml-1.5 text-xs font-bold ${
                active === c.id ? "text-cream/60" : "text-stone/60"
              }`}
            >
              {countFor(c.id)}
            </span>
          </button>
        ))}
        {/* end-of-row idea chip (the rail carries this on lg+) */}
        <a
          href="mailto:Help@economicmobilityproject.org?subject=New%20channel%20idea"
          className="whitespace-nowrap rounded-lg border border-dashed border-sand bg-cream px-3.5 py-2 text-sm font-semibold text-stone hover:text-ink"
        >
          + Suggest a channel
        </a>
      </div>

      {/* the active channel's header card (Discourse category-header
          pattern) — or, for a sub picked via a post tag, a removable
          filter pill */}
      {active !== "all" &&
        (getChannel(active).parent ? (
          <div className="flex items-center gap-2 px-1">
            <span className="text-sm font-medium text-stone">Tag:</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold"
              style={{
                borderColor: getChannel(active).color,
                color: getChannel(active).color,
              }}
            >
              {getChannel(active).name}
              <button
                type="button"
                onClick={() => setActive(getChannel(active).parent!)}
                aria-label="Clear tag filter"
                className="rounded-full hover:opacity-70"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          </div>
        ) : (
          (() => {
            const c = getChannel(active);
            const n = countFor(c.id);
            return (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-sand bg-cream px-4 py-3.5 sm:px-5">
                <c.icon
                  className="h-6 w-6 shrink-0"
                  strokeWidth={1.75}
                  style={{ color: c.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold leading-tight text-ink">
                    {c.name}
                  </p>
                  <p className="text-sm leading-5 text-stone">
                    {c.tagline} · {n} {n === 1 ? "post" : "posts"}
                  </p>
                </div>
                {!showComposer && (
                  <button
                    type="button"
                    onClick={openComposer}
                    className="btn-ink hidden items-center gap-1.5 rounded-md bg-amber px-3.5 py-2 text-sm font-bold text-ink sm:inline-flex"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    New post
                  </button>
                )}
              </div>
            );
          })()
        ))}

      {showComposer && (
        <div id="community-composer" className="relative scroll-mt-24">
          <button
            type="button"
            onClick={() => setShowComposer(false)}
            aria-label="Close composer"
            className="absolute right-4 top-4 z-10 rounded p-1 text-stone transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
          <Composer activeChannel={active} />
        </div>
      )}

      {/* search posts */}
      <div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone/60" />
          <input
            value={postQuery}
            onChange={(e) => setPostQuery(e.target.value)}
            placeholder="Search posts, authors, and comments…"
            aria-label="Search posts"
            className="w-full rounded-xl border border-sand bg-cream py-2.5 pl-10 pr-9 text-[0.95rem] text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
          />
          {postQuery && (
            <button
              type="button"
              onClick={() => setPostQuery("")}
              aria-label="Clear post search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-stone hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {pq && (
          <p className="mt-1.5 px-1 text-xs font-medium text-stone">
            {visiblePosts.length}{" "}
            {visiblePosts.length === 1 ? "result" : "results"}{" "}
            for &ldquo;{postQuery.trim()}&rdquo;
            {active !== "all" && <> in {getChannel(active).name}</>}
          </p>
        )}
      </div>

      {/* sort bar — sticks under the header while the feed scrolls
          (md+ only: below that the wrapped bar would pin too tall) */}
      <div
        className="z-30 -mx-1 rounded-b-xl bg-paper px-1 py-1.5 md:sticky"
        style={{ top: stickyTop }}
      >
      <div className="flex flex-wrap items-center gap-1.5">
        {!showComposer && (
          <button
            type="button"
            onClick={openComposer}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber px-3 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-amber-deep hover:text-cream"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            New post
          </button>
        )}
        {(
          [
            ["best", "Best", Award, "The curated order"],
            ["hot", "Hot", Flame, "Active lately"],
            ["new", "New", Clock, "Newest first"],
            ["top", "Top", BarChart3, "Most discussed"],
          ] as const
        ).map(([id, label, Icon, tip]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSort(id)}
            aria-pressed={sort === id}
            title={tip}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              sort === id
                ? "bg-ink text-cream"
                : "border border-sand bg-cream text-stone hover:text-ink"
            }`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <div className="flex overflow-hidden rounded-lg border border-sand">
            {(
              [
                ["compact", List, "Compact view: titles only"],
                ["card", LayoutGrid, "Card view: full posts"],
              ] as const
            ).map(([v, Icon, tip]) => (
              <button
                key={v}
                type="button"
                onClick={() => setViewPersist(v)}
                aria-pressed={view === v}
                title={tip}
                className={`px-2.5 py-1.5 transition-colors ${
                  view === v
                    ? "bg-ink text-cream"
                    : "bg-cream text-stone hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </button>
            ))}
          </div>
        <button
          type="button"
          onClick={() => setFollowingOnly((f) => !f)}
          aria-pressed={followingOnly}
          title="Only posts from members you follow"
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            followingOnly
              ? "bg-forest text-cream"
              : "border border-sand bg-cream text-stone hover:text-ink"
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" strokeWidth={2} />
          Following
        </button>
        <button
          type="button"
          onClick={() => setSavedOnly((f) => !f)}
          aria-pressed={savedOnly}
          title="Only posts you saved"
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            savedOnly
              ? "bg-forest text-cream"
              : "border border-sand bg-cream text-stone hover:text-ink"
          }`}
        >
          <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
          Saved
        </button>
        </div>
        {sort === "top" && (
          <select
            value={topRange}
            onChange={(e) => setTopRange(e.target.value as typeof topRange)}
            aria-label="Top range"
            className="rounded-lg border border-sand bg-cream px-2.5 py-1.5 text-sm font-semibold text-ink focus:border-amber focus:outline-none"
          >
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
            <option value="all">All time</option>
          </select>
        )}
      </div>
      </div>

      {/* The visitor's own posts awaiting review */}
      {visiblePending.map((p) => (
        <article
          key={p.at}
          className="rounded-2xl border-2 border-dashed border-amber/60 bg-cream p-5 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <Avatar name={p.author} />
            <div>
              <p className="flex flex-wrap items-center gap-2 font-semibold leading-tight text-ink">
                {p.author}
                <FlairChips labels={p.flairs} />
                <PendingChip />
              </p>
              <p className="text-xs font-medium text-stone">{timeAgo(p.at)}</p>
            </div>
          </div>
          {p.title && (
            <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
              {p.title}
            </h2>
          )}
          {p.text && (
            <p className={`${p.title ? "mt-2" : "mt-4"} text-[0.98rem] leading-7 text-stone`}>
              {p.text}
            </p>
          )}
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element -- member upload, arbitrary storage URL
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="mt-3 max-h-80 w-auto max-w-full rounded-xl border border-sand"
            />
          )}
        </article>
      ))}

      {visiblePosts.length === 0 && pq && (
        <p className="rounded-2xl border border-sand bg-cream p-6 text-sm text-stone">
          No posts match &ldquo;{postQuery.trim()}&rdquo;
          {active !== "all" && <> in {getChannel(active).name}</>}. Try fewer
          words, another channel, or{" "}
          <button
            type="button"
            onClick={() => setPostQuery("")}
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2"
          >
            clear the search
          </button>
          .
        </p>
      )}
      {visiblePosts.length === 0 &&
        !pq &&
        !followingOnly &&
        sort !== "top" &&
        active !== "all" && (
          <p className="rounded-2xl border border-sand bg-cream p-6 text-sm text-stone">
            Nothing in {getChannel(active).name} yet. Hit{" "}
            <button
              type="button"
              onClick={openComposer}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2"
            >
              New post
            </button>{" "}
            and be the first.
          </p>
        )}
      {visiblePosts.length === 0 && savedOnly && !pq && (
        <p className="rounded-2xl border border-sand bg-cream p-6 text-sm text-stone">
          Nothing saved yet. Hit Save on any post and it lands here.
        </p>
      )}
      {visiblePosts.length === 0 && followingOnly && !savedOnly && (
        <p className="rounded-2xl border border-sand bg-cream p-6 text-sm text-stone">
          No posts from members you follow yet. Open someone&apos;s profile
          (click their name on any post) and hit Follow.
        </p>
      )}
      {visiblePosts.length === 0 && !followingOnly && sort === "top" && (
        <p className="rounded-2xl border border-sand bg-cream p-6 text-sm text-stone">
          Nothing posted in this window yet. Try a longer range.
        </p>
      )}
      {/* keyed on the active filter/sort/view so switching replays the
          dash-stagger entrance (globals.css, dashboard motion system) */}
      <div
        key={`${active}|${sort}|${topRange}|${view}|${followingOnly}|${savedOnly}`}
        className={`dash-stagger ${
          view === "compact" ? "space-y-2.5" : "space-y-5"
        }`}
      >
      {visiblePosts.map((post) =>
        view === "card" ? (
          <PostCard
            key={post.id}
            post={post}
            likes={feedLikes.likeSession ? feedLikes.mine : likes}
            onToggleLike={(key) => {
              if (!feedLikes.toggle(key)) toggleLike(key);
            }}
            pendingMap={pendingComments}
            authorMeta={authorMeta}
            likeCounts={feedLikes.counts}
            onTag={setActive}
            saved={Boolean(savedPosts[post.id])}
            onToggleSave={() => toggleSaved(post.id)}
          />
        ) : post.pinned ? (
          <MiniCard
            key={post.id}
            post={post}
            commentTotal={commentTotalFor(post, pendingComments)}
          />
        ) : (
          <CompactRow
            key={post.id}
            post={post}
            commentTotal={commentTotalFor(post, pendingComments)}
            likeCount={feedLikes.counts[post.id] ?? 0}
            onTag={setActive}
            cred={authorMeta[post.author]?.cred}
            isNew={newSince !== null && postTime(post) > newSince}
          />
        )
      )}
      </div>
      </div>
    </div>
    </PostBaseContext.Provider>
  );
}
