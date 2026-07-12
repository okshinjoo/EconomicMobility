"use client";

// Follow a community member. Personal-only for now (same model as likes and
// pinned channels): your follow list lives on your device / account and
// nobody else sees it — it powers the feed's "Following" filter. Public
// follower counts wait for the live comments system.

import { useEffect, useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { loadJSON, saveJSON } from "@/lib/storage";

export const FOLLOWS_KEY = "empower:community-follows:v1";

export function getFollows(): string[] {
  return loadJSON<string[]>(FOLLOWS_KEY) ?? [];
}

export default function FollowButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [following, setFollowing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFollowing(getFollows().includes(slug));
    setMounted(true);
  }, [slug]);

  const toggle = () => {
    const next = following
      ? getFollows().filter((s) => s !== slug)
      : [...getFollows(), slug];
    saveJSON(FOLLOWS_KEY, next);
    setFollowing(!following);
    window.dispatchEvent(new Event("empower:community-updated"));
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={following}
        className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-colors ${
          following
            ? "bg-forest text-cream hover:bg-forest-700"
            : "btn-ink border-2 border-ink bg-amber text-ink"
        }`}
      >
        {following ? (
          <UserCheck className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {following ? "Following" : `Follow ${name.split(" ")[0]}`}
      </button>
      <span className="text-xs text-stone">
        Only you can see who you follow.
      </span>
    </div>
  );
}
