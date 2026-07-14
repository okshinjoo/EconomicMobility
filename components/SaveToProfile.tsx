"use client";

// Save-status affordance (July 14, owner ask: "an option to save those
// results to your profile"). The saving itself has always been automatic —
// quiz results and the plan are empower:* snapshots the account mirror
// syncs — but nothing SAID so. This line makes the state visible: signed
// in, it confirms the sync; signed out, it offers the account door (the
// /account overlay opens over the current page, and login's ensureSynced
// merge carries the local snapshot into the profile). Accounts stay
// optional: the signed-out state leads with "saved on this device."

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { accountsEnabled, getSupabase } from "@/lib/supabase";

export default function SaveToProfile({
  thing,
  className = "",
}: {
  /** What got saved, in plain words: "quiz results", "plan". */
  thing: string;
  className?: string;
}) {
  const [state, setState] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    if (!accountsEnabled) return; // renders nothing — no account system yet
    const supabase = getSupabase();
    if (!supabase) return;
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setState(data.session ? "in" : "out");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!accountsEnabled || state === "loading") return null;

  if (state === "in") {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium text-forest ${className}`}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2} />
        Saved to your profile — this follows you to any device you sign in on.
      </p>
    );
  }

  return (
    <p className={`text-sm leading-6 text-stone ${className}`}>
      Saved on this device.{" "}
      <Link
        href="/account"
        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
      >
        Create a free account
      </Link>{" "}
      to keep your {thing} everywhere you sign in.
    </p>
  );
}
