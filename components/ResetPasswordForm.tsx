"use client";

// Landing form for the password-reset email link. Supabase's PKCE flow signs
// the visitor into a recovery session when they arrive; this form sets the
// new password and sends them to their account.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { accountsEnabled, getSupabase } from "@/lib/supabase";

export default function ResetPasswordForm() {
  const supabase = getSupabase();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    // The recovery link signs the user in; wait for the session to land.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!accountsEnabled || !supabase) {
    return (
      <p className="text-center text-base text-stone">
        Accounts aren&apos;t open yet.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password needs at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase!.auth.updateUser({ password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/account"), 1800);
  }

  if (done) {
    return (
      <div className="rounded-xl border-2 border-forest/30 bg-forest/[0.06] p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-forest" strokeWidth={1.75} />
        <p className="mt-2 font-display text-lg font-semibold text-ink">
          Password updated
        </p>
        <p className="mt-1 text-sm text-stone">Taking you to your account…</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-stone" />
        <p className="mt-3 text-sm leading-6 text-stone">
          Checking your reset link… If this never loads, the link may have
          expired — request a fresh one from the{" "}
          <a href="/account" className="font-semibold text-forest">
            sign-in page
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="new-password"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          New password{" "}
          <span className="font-normal text-stone">(at least 8 characters)</span>
        </label>
        <div className="relative">
          <input
            id="new-password"
            type={showPw ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full rounded-xl border border-sand bg-paper py-3 pl-4 pr-12 text-ink focus:border-amber focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-stone transition-colors hover:text-ink"
          >
            {showPw ? (
              <EyeOff className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Eye className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Type it again
        </label>
        <input
          id="confirm-password"
          type={showPw ? "text" : "password"}
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
        />
      </div>
      {error && <p className="text-sm font-medium text-terracotta">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Set new password
      </button>
    </form>
  );
}
