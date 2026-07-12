"use client";

// Header account affordance. Invisible until Supabase is configured (the
// whole accounts feature ships dark). Signed out: a quiet person icon that
// links to /account. Signed in: the member's initial in an amber ring.
// Renders nothing during SSR/mount so there's no hydration mismatch.

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { accountsEnabled, getSupabase } from "@/lib/supabase";

export default function AccountButton() {
  const [state, setState] = useState<"hidden" | "out" | "in">("hidden");
  const [initial, setInitial] = useState("");

  useEffect(() => {
    if (!accountsEnabled) return;
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user.email ?? "";
      setInitial(email.charAt(0).toUpperCase());
      setState(data.session ? "in" : "out");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const email = session?.user.email ?? "";
      setInitial(email.charAt(0).toUpperCase());
      setState(session ? "in" : "out");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state === "hidden") return null;

  return state === "in" ? (
    <Link
      href="/account"
      aria-label="Your account"
      title="Your account"
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber bg-forest-700 font-display text-sm font-bold text-amber transition-colors hover:bg-amber hover:text-ink"
    >
      {initial || <UserRound className="h-4 w-4" />}
    </Link>
  ) : (
    <Link
      href="/account"
      aria-label="Sign in"
      title="Sign in or create an account"
      className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-amber"
    >
      <UserRound className="h-5 w-5" strokeWidth={1.75} />
    </Link>
  );
}
