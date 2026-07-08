"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Send, Loader2, Clock3 } from "lucide-react";
import type { CommunityPost } from "@/lib/communityFeed";
import { loadJSON, saveJSON } from "@/lib/storage";

// Same moderated-inbox channel as the Ask box (components/AskQuestion.tsx):
// paste the Web3Forms access key for help@economicmobilityproject.org here to
// go live. Until then the forms run in preview mode: visitors still see
// their own pending posts/comments (saved locally), nothing is sent anywhere.
const WEB3FORMS_ACCESS_KEY = "";

const PENDING_COMMENTS_KEY = "empower:community-comments:v1";
const PENDING_POSTS_KEY = "empower:community-posts:v1";
const LIKES_KEY = "empower:community-likes:v1";

interface PendingComment {
  author: string;
  text: string;
  at: number;
}
type PendingCommentMap = Record<string, PendingComment[]>;

interface PendingPost {
  author: string;
  text: string;
  at: number;
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

function Avatar({ name, team }: { name: string; team?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-bold ${
        team ? "bg-forest text-cream" : "bg-amber/25 text-amber-deep"
      }`}
    >
      {name.trim().charAt(0).toUpperCase() || "A"}
    </span>
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

/** The "share something" composer at the top of the feed. */
function Composer() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    const ok = await submitToInbox({
      subject: "New community post for review",
      author: name.trim() || "Anonymous",
      post: text.trim(),
    });
    if (!ok) {
      setStatus("error");
      return;
    }
    const pending = loadJSON<PendingPost[]>(PENDING_POSTS_KEY) ?? [];
    pending.unshift({ author: name.trim() || "Anonymous", text: text.trim(), at: Date.now() });
    saveJSON(PENDING_POSTS_KEY, pending);
    setText("");
    setName("");
    setStatus("idle");
    setSent(true);
    // Let the feed pick up the new pending post.
    window.dispatchEvent(new Event("empower:community-updated"));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-ink rounded-2xl bg-cream p-5 sm:p-6"
    >
      <label htmlFor="composer" className="font-display text-lg font-semibold text-ink">
        Share a win, a question, or what you&apos;re figuring out
      </label>
      <textarea
        id="composer"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="No account needed. Posts are reviewed before they appear for everyone."
        className="mt-3 w-full rounded-lg border border-sand bg-paper px-4 py-3 text-[0.95rem] leading-6 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional; first name is plenty)"
          className="w-full max-w-[16rem] rounded-lg border border-sand bg-paper px-4 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending" || !text.trim()}
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
      {sent && (
        <p className="mt-3 text-sm font-medium text-forest">
          Sent. It&apos;s in the feed below for you now, and appears for everyone
          once it&apos;s reviewed.
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

function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    const ok = await submitToInbox({
      subject: `New community comment for review (post: ${postId})`,
      post_id: postId,
      author: name.trim() || "Anonymous",
      comment: text.trim(),
    });
    if (!ok) {
      setStatus("error");
      return;
    }
    const map = loadJSON<PendingCommentMap>(PENDING_COMMENTS_KEY) ?? {};
    map[postId] = [
      ...(map[postId] ?? []),
      { author: name.trim() || "Anonymous", text: text.trim(), at: Date.now() },
    ];
    saveJSON(PENDING_COMMENTS_KEY, map);
    setText("");
    setStatus("idle");
    window.dispatchEvent(new Event("empower:community-updated"));
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <Avatar name={name || "A"} />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Add a comment…"
          className="w-full rounded-lg border border-sand bg-paper px-4 py-2.5 text-[0.95rem] leading-6 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
        />
      </div>
      {text.trim() && (
        <div className="ml-[3.25rem] flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full max-w-[13rem] rounded-lg border border-sand bg-paper px-3 py-1.5 text-sm text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none"
          />
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
            Reviewed before it appears for everyone.
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

function PostCard({
  post,
  liked,
  onToggleLike,
  pendingComments,
}: {
  post: CommunityPost;
  liked: boolean;
  onToggleLike: () => void;
  pendingComments: PendingComment[];
}) {
  const commentTotal = post.comments.length + pendingComments.length;
  const [open, setOpen] = useState(post.comments.length > 0);

  return (
    <article
      id={`post-${post.id}`}
      className="card-ink scroll-mt-24 rounded-2xl bg-cream p-5 sm:p-7"
    >
      <div className="flex items-center gap-3">
        <Avatar name={post.author} team={post.team} />
        <div>
          <p className="flex flex-wrap items-center gap-2 font-semibold leading-tight text-ink">
            {post.author}
            {post.team && (
              <span className="-rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
                Team
              </span>
            )}
          </p>
          <p className="text-xs font-medium text-stone">{formatDate(post.date)}</p>
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
      {post.link && (
        <p className="mt-4">
          <Link
            href={post.link.href}
            className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
          >
            {post.link.label}
          </Link>
        </p>
      )}

      {/* Actions */}
      <div className="mt-5 flex items-center gap-5 border-t border-sand pt-4">
        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={liked}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            liked ? "text-terracotta" : "text-stone hover:text-ink"
          }`}
        >
          <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
          {liked ? "Liked" : "Like"}
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone transition-colors hover:text-ink"
        >
          <MessageCircle className="h-4 w-4" />
          {commentTotal === 0
            ? "Comment"
            : `${commentTotal} comment${commentTotal === 1 ? "" : "s"}`}
        </button>
      </div>

      {/* Comments: always visible while empty or when you have one pending */}
      {(open || commentTotal === 0 || pendingComments.length > 0) && (
        <div className="mt-2">
          {post.comments.map((c) => (
            <div key={c.id} className="mt-4 flex items-start gap-3">
              <Avatar name={c.author} team={c.author === "Empower Team"} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {c.author}
                  <span className="ml-2 font-normal text-stone">
                    {formatDate(c.date)}
                  </span>
                </p>
                <p className="mt-1 text-[0.95rem] leading-6 text-stone">{c.text}</p>
              </div>
            </div>
          ))}
          {pendingComments.map((c) => (
            <div key={c.at} className="mt-4 flex items-start gap-3">
              <Avatar name={c.author} />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                  {c.author}
                  <PendingChip />
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

export default function CommunityFeed({ posts }: { posts: CommunityPost[] }) {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [pendingComments, setPendingComments] = useState<PendingCommentMap>({});
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);

  useEffect(() => {
    const refresh = () => {
      setLikes(loadJSON<Record<string, boolean>>(LIKES_KEY) ?? {});
      setPendingComments(loadJSON<PendingCommentMap>(PENDING_COMMENTS_KEY) ?? {});
      setPendingPosts(loadJSON<PendingPost[]>(PENDING_POSTS_KEY) ?? []);
    };
    refresh();
    window.addEventListener("empower:community-updated", refresh);
    return () => window.removeEventListener("empower:community-updated", refresh);
  }, []);

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveJSON(LIKES_KEY, next);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <Composer />

      {/* The visitor's own posts awaiting review */}
      {pendingPosts.map((p) => (
        <article
          key={p.at}
          className="rounded-2xl border-2 border-dashed border-amber/60 bg-cream p-5 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <Avatar name={p.author} />
            <div>
              <p className="flex flex-wrap items-center gap-2 font-semibold leading-tight text-ink">
                {p.author}
                <PendingChip />
              </p>
              <p className="text-xs font-medium text-stone">{timeAgo(p.at)}</p>
            </div>
          </div>
          <p className="mt-4 text-[0.98rem] leading-7 text-stone">{p.text}</p>
        </article>
      ))}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          liked={Boolean(likes[post.id])}
          onToggleLike={() => toggleLike(post.id)}
          pendingComments={pendingComments[post.id] ?? []}
        />
      ))}
    </div>
  );
}
