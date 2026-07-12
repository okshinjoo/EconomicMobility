"use client";

// The whole account experience on /account:
// - signed out: create-account (email + password, sends a verification link)
//   and sign-in forms, plus forgot-password.
// - signed in: the profile editor — display name, who-you-are role tag
//   (student / working professional / retired), and the "show my tag when I
//   post" toggle — plus sync status and sign out.
// Renders a friendly "not open yet" note until Supabase env vars exist, so
// the page can ship before the backend is connected.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  CheckCircle2,
  UserRound,
  Eye,
  EyeOff,
  X,
  Check,
} from "lucide-react";
import TopicMark from "@/components/TopicMark";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import { ensureSynced, stopMirror } from "@/lib/accountSync";
import {
  type Profile,
  type ProfileRole,
  ROLE_LABELS,
  GOAL_OPTIONS,
  writeLocalProfile,
  clearLocalProfile,
} from "@/lib/profile";
import AccountDashboard from "@/components/AccountDashboard";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

type Mode = "signin" | "signup" | "forgot";

const inputCls =
  "w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export default function AccountPanel({
  paths = [],
  badgeSources = [],
}: {
  paths?: TopicPath[];
  badgeSources?: BadgeSource[];
}) {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [booted, setBooted] = useState(false);
  const [syncedKeys, setSyncedKeys] = useState<number | null>(null);
  // True when this page load arrived from an auth email/OAuth redirect
  // (?code=...) — captured before Supabase strips it from the URL, so the
  // dashboard can greet a freshly verified member.
  const [fromAuthRedirect] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : new URLSearchParams(window.location.search).has("code")
  );

  useEffect(() => {
    if (!supabase) {
      setBooted(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setBooted(true);
      if (data.session) {
        void ensureSynced(supabase, data.session.user.id).then(setSyncedKeys);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "SIGNED_IN" && s) {
        void ensureSynced(supabase, s.user.id).then(setSyncedKeys);
      }
      if (event === "SIGNED_OUT") {
        stopMirror();
        clearLocalProfile();
        setSyncedKeys(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!accountsEnabled || !supabase) {
    return (
      <div className="card-ink mx-auto max-w-3xl rounded-2xl bg-cream p-8 text-center">
        <UserRound className="mx-auto h-10 w-10 text-stone" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">
          Accounts aren&apos;t open quite yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-base leading-7 text-stone">
          Very soon you&apos;ll be able to create a free account to sync your
          progress across devices. Until then, everything you do here is saved
          on this device automatically — no account needed.
        </p>
      </div>
    );
  }

  if (!booted) {
    return (
      <div className="flex items-center justify-center py-24 text-stone">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="mx-auto max-w-3xl">
        <ProfileEditor
          supabase={supabase}
          session={session}
          syncedKeys={syncedKeys}
          paths={paths}
          badgeSources={badgeSources}
          fromAuthRedirect={fromAuthRedirect}
        />
      </div>
    );
  }

  // Signed out: split-screen — a brand "identity" panel beside the form.
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
      <div className="relative overflow-hidden rounded-3xl bg-forest p-8 text-cream sm:p-10">
        <TopicMark
          id="investing"
          color="#fbf8f1"
          className="pointer-events-none absolute -bottom-14 -right-14 h-64 w-64 opacity-[0.07]"
        />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            Your account
          </span>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Your progress,{" "}
            <span className="italic text-amber">wherever you are.</span>
          </h1>
          <p className="mt-5 text-base leading-7 text-cream/75">
            An account is never required here — it just makes the site
            remember you.
          </p>
          <ul className="mt-7 space-y-3.5">
            {[
              "Your reading, quiz results, calculators, and badges follow you to any device",
              "Pick up exactly where you left off",
              "A member tag you control when you post in the community",
              "Free forever — no spam, and your data is never sold",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber"
                  strokeWidth={2.5}
                />
                <span className="text-[0.95rem] leading-6 text-cream/90">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AuthForms supabase={supabase} />
    </div>
  );
}

/* ------------------------------ signed out ------------------------------ */

function AuthForms({ supabase }: { supabase: SupabaseClient }) {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Resend-verification cooldown (seconds left; 0 = ready).
  const [resendWait, setResendWait] = useState(0);
  const [resent, setResent] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setNotice(null);
    setResent(false);
    // Land the cursor in the email field so switching feels seamless.
    requestAnimationFrame(() => {
      document.getElementById("acct-email")?.focus();
    });
  };

  useEffect(() => {
    if (resendWait <= 0) return;
    const t = setTimeout(() => setResendWait((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendWait]);

  async function resendVerification() {
    if (resendWait > 0 || !email.trim()) return;
    setResent(false);
    const { error: err } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
    });
    // The SMTP throttle answers with an error if it's too soon; either way,
    // start the cooldown so the button can't be hammered.
    setResendWait(60);
    if (!err) setResent(true);
  }

  // The reset-link notice returns to sign-in on its own after a beat, so
  // nobody is stranded on a confirmation with no way back.
  useEffect(() => {
    if (!notice || mode !== "forgot") return;
    const t = setTimeout(() => switchMode("signin"), 5000);
    return () => clearTimeout(t);
  }, [notice, mode]);

  async function googleSignIn() {
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/account` },
    });
    // On success the browser navigates to Google; we only land here on error.
    if (err) {
      setBusy(false);
      setError(
        /provider is not enabled/i.test(err.message)
          ? "Google sign-in isn't switched on yet — use email and password for now."
          : err.message
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      if (password.length < 8) {
        setError("Password needs at least 8 characters.");
        return;
      }
      if (!ageOk) {
        setError("You need to confirm you're 13 or older.");
        return;
      }
      setBusy(true);
      const { error: err } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/account` },
      });
      setBusy(false);
      if (err) {
        setError(err.message);
        return;
      }
      setNotice(
        "Almost there — check your inbox. We sent a link to verify your email; your account activates when you click it."
      );
      return;
    }

    if (mode === "forgot") {
      setBusy(true);
      const { error: err } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/account/reset` }
      );
      setBusy(false);
      if (err) {
        setError(err.message);
        return;
      }
      setNotice(
        "If that email has an account, a password-reset link is on its way."
      );
      return;
    }

    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (err) {
      setError(
        /confirm/i.test(err.message)
          ? "That email hasn't been verified yet — find our message in your inbox and click the link first."
          : "That email and password don't match. Try again, or reset your password below."
      );
    }
  }

  return (
    <div className="card-ink rounded-2xl bg-cream p-6 sm:p-8">
      {/* mode switch — segmented control in the ink style */}
      <div className="flex rounded-lg border-2 border-ink bg-paper p-1">
        {(
          [
            ["signup", "Create account"],
            ["signin", "Sign in"],
          ] as const
        ).map(([m, label]) => {
          const active = mode === m || (mode === "forgot" && m === "signin");
          return (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              aria-pressed={active}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold transition-colors ${
                active ? "bg-ink text-cream" : "text-stone hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <h2 className="mt-6 font-display text-2xl font-bold text-ink">
        {mode === "signup" && "Save your progress, everywhere"}
        {mode === "signin" && "Welcome back"}
        {mode === "forgot" && "Reset your password"}
      </h2>
      <p className="mt-2 text-base leading-7 text-stone">
        {mode === "signup" &&
          "Free, like everything here. Your reading, quiz results, badges, and calculators sync across devices — and nothing on this site ever requires an account."}
        {mode === "signin" &&
          "Sign in and this device's progress merges into your account."}
        {mode === "forgot" &&
          "Enter your email and we'll send a link to set a new password."}
      </p>

      {notice ? (
        <div className="mt-6 rounded-xl border-2 border-forest/30 bg-forest/[0.06] p-5 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-forest" strokeWidth={1.75} />
          <p className="mt-2 text-sm leading-6 text-ink">{notice}</p>
          {mode === "signup" && (
            <p className="mt-3 text-xs leading-5 text-stone">
              Nothing after a few minutes? Check spam, or{" "}
              {resendWait > 0 ? (
                <span className="font-semibold">
                  {resent ? "sent again ✓ — " : ""}resend available in{" "}
                  {resendWait}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={resendVerification}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2 hover:text-ink"
                >
                  resend the email
                </button>
              )}
              .
            </p>
          )}
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className="mt-4 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Back to sign in
          </button>
        </div>
      ) : (
        <>
        {mode !== "forgot" && (
          <div className="mt-6">
            <button
              type="button"
              onClick={googleSignIn}
              disabled={busy}
              className="btn-ink inline-flex w-full items-center justify-center gap-3 rounded-md border-2 border-ink bg-cream px-7 py-3.5 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <GoogleMark />
              Continue with Google
            </button>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-sand" />
              <span className="text-xs font-semibold uppercase tracking-wide text-stone">
                or with email
              </span>
              <span className="h-px flex-1 bg-sand" />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="acct-email" className={labelCls}>
              Email
            </label>
            <input
              id="acct-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputCls}
            />
          </div>
          {mode !== "forgot" && (
            <div>
              <label htmlFor="acct-password" className={labelCls}>
                Password
                {mode === "signup" && (
                  <span className="font-normal text-stone">
                    {" "}
                    (at least 8 characters)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  id="acct-password"
                  type={showPw ? "text" : "password"}
                  required
                  minLength={mode === "signup" ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  className={`${inputCls} pr-12`}
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
          )}
          {mode === "signup" && (
            <label className="flex items-start gap-2.5 text-sm leading-6 text-stone">
              <input
                type="checkbox"
                checked={ageOk}
                onChange={(e) => setAgeOk(e.target.checked)}
                className="mt-1 h-4 w-4 accent-forest"
              />
              <span>
                I&apos;m 13 or older, and I&apos;ve seen the{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-2"
                >
                  privacy policy
                </Link>
                .
              </span>
            </label>
          )}
          {error && (
            <p className="text-sm font-medium text-terracotta">{error}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="btn-ink inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signup" && "Create my account"}
            {mode === "signin" && "Sign in"}
            {mode === "forgot" && "Send reset link"}
          </button>
          {mode === "signin" && (
            <button
              type="button"
              onClick={() => switchMode("forgot")}
              className="block text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Forgot your password?
            </button>
          )}
          <p className="border-t border-sand pt-4 text-sm text-stone">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Create an account — it&apos;s free
                </button>
              </>
            )}
          </p>
        </form>
        </>
      )}
    </div>
  );
}

/** Google's multicolor "G", drawn inline so no external asset is needed. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}

/* ------------------------------ signed in ------------------------------- */

export function ProfileEditor({
  supabase,
  session,
  syncedKeys,
  paths,
  badgeSources,
  fromAuthRedirect,
}: {
  supabase: SupabaseClient;
  session: Session;
  syncedKeys: number | null;
  paths: TopicPath[];
  badgeSources: BadgeSource[];
  fromAuthRedirect: boolean;
}) {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<ProfileRole>("");
  const [showTag, setShowTag] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [tab, setTab] = useState<"about" | "goals" | "security">("about");
  // Security-tab state: change email + change password forms.
  const [newEmail, setNewEmail] = useState("");
  const [emailNotice, setEmailNotice] = useState<string | null>(null);
  const [emailBusy, setEmailBusy] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwNotice, setPwNotice] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwBusy, setPwBusy] = useState(false);
  // "You're in" banner: only when this load came from an auth redirect AND
  // the account was confirmed in the last few minutes (fresh verification or
  // a brand-new Google signup) — routine sign-ins never see it. MUST live
  // above the loading early-return (hooks can't render conditionally).
  const [showWelcome, setShowWelcome] = useState(() => {
    const confirmedAt = session.user.email_confirmed_at
      ? Date.parse(session.user.email_confirmed_at)
      : 0;
    return (
      fromAuthRedirect &&
      confirmedAt > 0 &&
      Date.now() - confirmedAt < 5 * 60_000
    );
  });

  const userId = session.user.id;

  useEffect(() => {
    let cancelled = false;
    const apply = (data: Record<string, unknown> | null) => {
      if (cancelled) return;
      if (data) {
        const p: Profile = {
          displayName: (data.display_name as string) ?? "",
          role: ((data.role as ProfileRole) ?? "") as ProfileRole,
          showTag: Boolean(data.show_tag),
          goals: Array.isArray(data.goals) ? (data.goals as string[]) : [],
        };
        setDisplayName(p.displayName);
        setRole(p.role);
        setShowTag(p.showTag);
        setGoals(p.goals);
        writeLocalProfile(p);
      }
      setLoading(false);
    };
    supabase
      .from("profiles")
      .select("display_name, role, show_tag, goals")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error) return apply(data);
        // goals column not migrated yet — fall back so the page still works.
        supabase
          .from("profiles")
          .select("display_name, role, show_tag")
          .eq("id", userId)
          .maybeSingle()
          .then(({ data: d2 }) => apply(d2));
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, userId]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    const profile: Profile = {
      displayName: displayName.trim(),
      role,
      showTag,
      goals,
    };
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      display_name: profile.displayName,
      role: profile.role,
      show_tag: profile.showTag,
      goals: profile.goals,
    });
    setSaving(false);
    if (!error) {
      writeLocalProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setSaveError(
        /goals/.test(error.message)
          ? "The goals column hasn't been added to the database yet."
          : "Couldn't save just now — try again in a moment."
      );
    }
  }, [supabase, userId, displayName, role, showTag, goals]);

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    const target = newEmail.trim();
    if (!target.includes("@")) return;
    setEmailBusy(true);
    setEmailNotice(null);
    const { error } = await supabase.auth.updateUser({ email: target });
    setEmailBusy(false);
    setEmailNotice(
      error
        ? `Couldn't start the change: ${error.message}`
        : "Confirmation sent — check the NEW address (and possibly your current one) and click the link to finish the switch."
    );
    if (!error) setNewEmail("");
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwNotice(null);
    if (newPw.length < 8) {
      setPwError("Password needs at least 8 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("Those passwords don't match.");
      return;
    }
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwBusy(false);
    if (error) {
      setPwError(
        /same password/i.test(error.message)
          ? "That's already your password."
          : error.message
      );
      return;
    }
    setNewPw("");
    setConfirmPw("");
    setPwNotice("Password updated.");
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-stone">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {showWelcome && (
        <div className="flex items-start justify-between gap-4 rounded-2xl border-2 border-forest bg-forest/[0.07] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-forest" strokeWidth={1.75} />
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                You&apos;re in — welcome to Empower.
              </p>
              <p className="mt-0.5 text-sm leading-6 text-stone">
                Your email is verified and everything you&apos;ve done on this
                device is now saved to your account. Fill in the profile below
                if you&apos;d like sharper recommendations.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowWelcome(false)}
            aria-label="Dismiss"
            className="rounded p-1 text-stone transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* the member dashboard: stats, badges, progress, next step.
          syncedKeys is only used to gate rendering until the login merge
          has run, so the numbers reflect merged cross-device history. */}
      <AccountDashboard
        key={syncedKeys === null ? "pre-sync" : "post-sync"}
        email={session.user.email ?? ""}
        displayName={displayName}
        paths={paths}
        badgeSources={badgeSources}
        onSignOut={signOut}
      />

      {/* settings — sectioned like a real profile page */}
      <div className="card-ink overflow-hidden rounded-2xl bg-cream">
        <div className="flex border-b-2 border-ink">
          {(
            [
              ["about", "About you"],
              ["goals", "Goals"],
              ["security", "Sign-in & security"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`flex-1 px-2 py-3.5 text-center text-sm font-bold transition-colors sm:px-4 ${
                tab === id
                  ? "bg-ink text-cream"
                  : "bg-cream text-stone hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {tab === "about" && (
            <div className="space-y-5">
              <p className="text-base leading-7 text-stone">
                Totally optional. It helps us point you at the right guides,
                and if you want, it shows next to your name when you post in
                the community.
              </p>
              <div>
                <label htmlFor="profile-name" className={labelCls}>
                  Display name
                </label>
                <input
                  id="profile-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="First name is plenty"
                  maxLength={40}
                  className={inputCls}
                />
              </div>

              <fieldset>
                <legend className={labelCls}>Where are you in life?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["student", ROLE_LABELS.student],
                      ["working", ROLE_LABELS.working],
                      ["retired", ROLE_LABELS.retired],
                      ["", "Prefer not to say"],
                    ] as const
                  ).map(([value, label]) => (
                    <label
                      key={label}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                        role === value
                          ? "border-ink bg-paper text-ink shadow-[3px_3px_0_#11211c]"
                          : "border-sand bg-paper text-stone hover:border-ink/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="profile-role"
                        checked={role === value}
                        onChange={() => setRole(value)}
                        className="h-4 w-4 accent-forest"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-2.5 rounded-xl border border-sand bg-paper p-4 text-sm leading-6 text-ink">
                <input
                  type="checkbox"
                  checked={showTag}
                  onChange={(e) => setShowTag(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-forest"
                />
                <span>
                  <span className="font-semibold">
                    Show my tag when I post.
                  </span>{" "}
                  <span className="text-stone">
                    Community posts and questions include{" "}
                    {displayName.trim() || role
                      ? `"${[displayName.trim(), role ? ROLE_LABELS[role as Exclude<ProfileRole, "">] : ""].filter(Boolean).join(" · ")}"`
                      : "your name and tag"}
                    . Leave it off to stay anonymous.
                  </span>
                </span>
              </label>
              <SaveRow
                saving={saving}
                saved={saved}
                error={saveError}
                onSave={save}
              />
            </div>
          )}

          {tab === "goals" && (
            <div className="space-y-5">
              <p className="text-base leading-7 text-stone">
                What are you working toward? Pick as many as you like — we use
                them to steer recommendations toward what actually matters to
                you.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {GOAL_OPTIONS.map((g) => {
                  const on = goals.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setGoals((prev) =>
                          on
                            ? prev.filter((id) => id !== g.id)
                            : [...prev, g.id]
                        )
                      }
                      className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                        on
                          ? "border-ink bg-amber text-ink shadow-[3px_3px_0_#11211c]"
                          : "border-sand bg-paper text-stone hover:border-ink/30 hover:text-ink"
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
              <SaveRow
                saving={saving}
                saved={saved}
                error={saveError}
                onSave={save}
                label="Save goals"
              />
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-8">
              <form onSubmit={changeEmail} className="space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">
                  Email
                </h3>
                <p className="text-sm leading-6 text-stone">
                  You sign in as{" "}
                  <span className="font-semibold text-ink">
                    {session.user.email}
                  </span>
                  . To change it, enter the new address — we&apos;ll email a
                  confirmation link before anything switches.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="new-address@example.com"
                    className={`${inputCls} sm:max-w-xs`}
                  />
                  <button
                    type="submit"
                    disabled={emailBusy || !newEmail.includes("@")}
                    className="btn-ink inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-amber px-5 py-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {emailBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                    Change email
                  </button>
                </div>
                {emailNotice && (
                  <p className="text-sm font-medium text-forest">
                    {emailNotice}
                  </p>
                )}
              </form>

              <form
                onSubmit={changePassword}
                className="space-y-3 border-t border-sand pt-6"
              >
                <h3 className="font-display text-lg font-bold text-ink">
                  Password
                </h3>
                <div>
                  <label htmlFor="sec-new-pw" className={labelCls}>
                    New password{" "}
                    <span className="font-normal text-stone">
                      (at least 8 characters)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="sec-new-pw"
                      type={showPw ? "text" : "password"}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      autoComplete="new-password"
                      className={`${inputCls} pr-12`}
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
                  <label htmlFor="sec-confirm-pw" className={labelCls}>
                    Type it again
                  </label>
                  <input
                    id="sec-confirm-pw"
                    type={showPw ? "text" : "password"}
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    autoComplete="new-password"
                    className={inputCls}
                  />
                </div>
                {pwError && (
                  <p className="text-sm font-medium text-terracotta">
                    {pwError}
                  </p>
                )}
                {pwNotice && (
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    <CheckCircle2 className="h-4 w-4" />
                    {pwNotice}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pwBusy}
                  className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-5 py-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pwBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                  Update password
                </button>
              </form>

              <div className="border-t border-sand pt-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  Delete your account
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone">
                  Email{" "}
                  <a
                    href="mailto:Help@economicmobilityproject.org"
                    className="font-semibold text-forest"
                  >
                    Help@economicmobilityproject.org
                  </a>{" "}
                  from your account email and we&apos;ll permanently remove
                  the account and everything attached to it. Details in the{" "}
                  <Link href="/privacy" className="font-semibold text-forest">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/** Save button + inline status, shared by the About/Goals tabs. */
function SaveRow({
  saving,
  saved,
  error,
  onSave,
  label = "Save profile",
}: {
  saving: boolean;
  saved: boolean;
  error: string | null;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {label}
      </button>
      {saved && (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
          <CheckCircle2 className="h-4 w-4" />
          Saved
        </span>
      )}
      {error && (
        <span className="text-sm font-medium text-terracotta">{error}</span>
      )}
    </div>
  );
}
