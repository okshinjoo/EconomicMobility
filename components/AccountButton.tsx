"use client";

// The header's right-side CTA slot, auth-aware (owner call, July 2026):
// - accounts not configured (or pre-mount SSR): the classic "Take the Quiz"
//   amber button, so nothing changes when the feature is dark.
// - signed OUT: a prominent amber "Sign in" button in the same style —
//   replaces the quiz button (the quiz is promoted plenty elsewhere).
//   On mobile (below lg) it's a compact person icon instead.
// - signed IN: the member's initial in an amber ring, linking to /account.

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { accountsEnabled, getSupabase } from "@/lib/supabase";

const CTA_CLASSES =
  "hidden whitespace-nowrap rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-cream lg:inline-block";

function QuizCta() {
  return (
    <Link href="/quiz" className={CTA_CLASSES}>
      Take the Quiz
    </Link>
  );
}

export default function AccountButton() {
  const [state, setState] = useState<"boot" | "out" | "in">("boot");
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

  // Feature dark, or first paint before the session check: quiz button,
  // exactly as the header always had.
  if (!accountsEnabled || state === "boot") return <QuizCta />;

  if (state === "in") {
    return (
      <Link
        href="/account"
        aria-label="Your account"
        title="Your account"
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber bg-forest-700 font-display text-sm font-bold text-amber transition-colors hover:bg-amber hover:text-ink"
      >
        {initial || <UserRound className="h-4 w-4" />}
      </Link>
    );
  }

  return (
    <>
      <Link href="/account" className={CTA_CLASSES}>
        Sign in
      </Link>
      {/* Mobile: the big CTA is desktop-only, so keep a compact entry point. */}
      <Link
        href="/account"
        aria-label="Sign in"
        title="Sign in or create an account"
        className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-amber lg:hidden"
      >
        <UserRound className="h-5 w-5" strokeWidth={1.75} />
      </Link>
    </>
  );
}
