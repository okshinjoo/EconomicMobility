"use client";

// The header's right-side CTA slot, auth-aware (owner call, July 2026):
// - accounts not configured (or pre-mount SSR): the classic "Take the Quiz"
//   amber button, so nothing changes when the feature is dark.
// - signed OUT: a prominent amber "Sign in" button in the same style —
//   replaces the quiz button (the quiz is promoted plenty elsewhere).
//   On mobile (below lg) it's a compact person icon instead.
// - signed IN: the member's initial in an amber ring, opening a small menu
//   (name/email, Your account, Sign out) on click.
//
// Because this mounts in the Header on EVERY page, it's also the global
// trigger for the login progress sync — previously that only ran when the
// /account page mounted, so a session that never visited /account never
// mirrored its saves. ensureSynced() de-dupes with the account panel.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserRound, LayoutDashboard, LogOut } from "lucide-react";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import { ensureSynced, stopMirror } from "@/lib/accountSync";
import { readLocalProfile, clearLocalProfile } from "@/lib/profile";

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
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountsEnabled) return;
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? "");
      setState(data.session ? "in" : "out");
      if (data.session) void ensureSynced(supabase, data.session.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setEmail(session?.user.email ?? "");
      setState(session ? "in" : "out");
      if (event === "SIGNED_IN" && session) {
        void ensureSynced(supabase, session.user.id);
      }
      if (event === "SIGNED_OUT") {
        stopMirror();
        clearLocalProfile();
        setOpen(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Close the menu on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!accountsEnabled || state === "boot") return <QuizCta />;

  if (state === "in") {
    const initial = email.charAt(0).toUpperCase();
    const name = readLocalProfile()?.displayName?.trim() ?? "";
    return (
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Account menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber bg-forest-700 font-display text-sm font-bold text-amber transition-colors hover:bg-amber hover:text-ink"
        >
          {initial || <UserRound className="h-4 w-4" />}
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 pt-3">
            <div className="w-60 rounded-2xl border border-ink-600 bg-ink p-2 shadow-2xl">
              <div className="px-3 pb-2 pt-1.5">
                {name && (
                  <p className="truncate text-sm font-semibold text-cream">
                    {name}
                  </p>
                )}
                <p className="truncate text-xs text-cream/55">{email}</p>
              </div>
              <div className="border-t border-ink-600 pt-1">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
                >
                  <LayoutDashboard className="h-4 w-4 text-amber" strokeWidth={1.75} />
                  Your account
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await getSupabase()?.auth.signOut();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
                >
                  <LogOut className="h-4 w-4 text-amber" strokeWidth={1.75} />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
