"use client";

// The live half of a member page (July 2026): if this member opted in to a
// public profile on their account page, show their bio + life stage +
// flairs + member-since. Renders nothing extra for members who kept it
// private (RLS never even sends us their row). In `standalone` mode (a
// member with no published curated content yet) it IS the identity card.

import { useEffect, useState } from "react";
import {
  fetchPublicProfileBySlug,
  type PublicProfile,
} from "@/lib/liveProfiles";
import {
  FLAIR_OPTIONS,
  MAX_FLAIRS,
  ROLE_LABELS,
  type ProfileRole,
} from "@/lib/profile";

function sinceLabel(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function ShellCard({ name, note }: { name: string; note: string }) {
  return (
    <div className="card-ink mt-6 rounded-2xl bg-cream p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/25 font-display text-2xl font-bold text-amber-deep">
          {name.trim().charAt(0).toUpperCase() || "?"}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {name}
          </h1>
          <p className="mt-1.5 max-w-md text-sm leading-6 text-stone">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PublicProfileCard({
  slug,
  standalone = false,
  guessName = "Member",
}: {
  slug: string;
  /** True on pages with no curated content — this card carries the page. */
  standalone?: boolean;
  /** De-slugged fallback name while loading / when private. */
  guessName?: string;
}) {
  const [state, setState] = useState<"loading" | "none" | PublicProfile>(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    fetchPublicProfileBySlug(slug).then((p) => {
      if (!cancelled) setState(p ?? "none");
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state === "loading") {
    return standalone ? <ShellCard name={guessName} note="Loading…" /> : null;
  }
  if (state === "none") {
    return standalone ? (
      <ShellCard
        name={guessName}
        note="This member keeps their profile private. You'll see their name next to anything they post in the community."
      />
    ) : null;
  }

  const p = state;
  const flairs = p.flairs
    .slice(0, MAX_FLAIRS)
    .map((id) => FLAIR_OPTIONS.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const role =
    p.role && p.role in ROLE_LABELS
      ? ROLE_LABELS[p.role as Exclude<ProfileRole, "">]
      : "";
  const since = sinceLabel(p.since);
  const metaBits = [role, since ? `Member since ${since}` : ""].filter(
    Boolean
  );

  if (!standalone) {
    // Under the curated identity card: just the parts curation can't know.
    if (!p.bio && !role) return null;
    return (
      <div className="card-ink mt-4 rounded-2xl bg-cream p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
          About {p.displayName}
        </p>
        {p.bio && (
          <p className="mt-2 text-[0.95rem] leading-7 text-ink">{p.bio}</p>
        )}
        {metaBits.length > 0 && (
          <p className="mt-2 text-sm text-stone">{metaBits.join(" · ")}</p>
        )}
      </div>
    );
  }

  return (
    <div className="card-ink mt-6 rounded-2xl bg-cream p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber/25 font-display text-2xl font-bold text-amber-deep">
          {p.displayName.trim().charAt(0).toUpperCase() || "?"}
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {p.displayName}
          </h1>
          {flairs.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {flairs.map((f) => (
                <span
                  key={f.id}
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                  style={{ color: f.color, background: `${f.color}1f` }}
                >
                  {f.label}
                </span>
              ))}
            </div>
          )}
          {p.bio && (
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-ink">
              {p.bio}
            </p>
          )}
          {metaBits.length > 0 && (
            <p className="mt-2 text-sm text-stone">{metaBits.join(" · ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
