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
  Pencil,
  LayoutDashboard,
  TrendingUp,
  Target,
  ShieldCheck,
  BookOpen,
  Mail,
} from "lucide-react";
import TopicMark from "@/components/TopicMark";
import { useRouter } from "next/navigation";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { accountsEnabled, getSupabase } from "@/lib/supabase";
import { ensureSynced, stopMirror } from "@/lib/accountSync";
import {
  type Profile,
  type ProfileRole,
  type StudentStage,
  ROLE_LABELS,
  STUDENT_STAGE_OPTIONS,
  stageLabel,
  GOAL_OPTIONS,
  FLAIR_OPTIONS,
  MAX_FLAIRS,
  flairLabel,
  flairColor,
  writeLocalProfile,
  readLocalProfile,
  clearLocalProfile,
} from "@/lib/profile";
import { uploadAvatar, removeAvatar } from "@/lib/avatarImage";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";
import {
  useMemberData,
  FlatStatCards,
  FlatOverview,
  DashboardExtras,
  CustomizeCard,
  DASH,
} from "@/components/AccountDashboard";
import SkillTreeSection from "@/components/SkillTreeMini";
import {
  readDashboardPrefs,
  writeDashboardPrefs,
  DEFAULT_PREFS,
  type DashboardPrefs,
} from "@/lib/dashboardPrefs";
import {
  readAboutYou,
  writeAboutYou,
  EMPTY_ABOUT_YOU,
  INCOME_CHOICES,
  FAMILY_CHOICES,
  CONFIDENCE_CHOICES,
  type AboutYou,
} from "@/lib/aboutYou";
import { moments } from "@/lib/moments";

/** The signed-in sections, navigated by the left rail. */
type PanelTab = "overview" | "progress" | "about" | "goals" | "security";

const PANEL_LABELS: Record<PanelTab, string> = {
  overview: "Overview",
  progress: "Progress",
  // Owner rename July 13, 2026: the editor tab is "Profile", the goals
  // tab wears "About you" (ids stay stable — they're plumbing).
  about: "Profile",
  goals: "About you",
  security: "Security",
};
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

type Mode = "signin" | "signup" | "forgot";

const inputCls =
  "w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink placeholder:text-stone/60 focus:border-amber focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

/** The close control — router.back() to exactly where you were, falling
 *  back to home when there's no history (fresh tab / email landing). */
function CloseX({ className = "" }: { className?: string }) {
  const router = useRouter();
  const close = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };
  return (
    <button
      type="button"
      onClick={close}
      aria-label="Close and go back"
      title="Close (Esc)"
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-sand bg-cream text-stone transition-colors hover:bg-paper hover:text-ink ${className}`}
    >
      <X className="h-4.5 w-4.5 h-[18px] w-[18px]" strokeWidth={2.25} />
    </button>
  );
}

export default function AccountPanel({
  paths = [],
  badgeSources = [],
  overlay = false,
}: {
  paths?: TopicPath[];
  badgeSources?: BadgeSource[];
  /** True inside the intercepted /account modal: no full-page section
   *  wrappers — the overlay shell provides scrim + scroll. */
  overlay?: boolean;
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
      <section className={overlay ? "" : "bg-paper-deep"}>
      <div className="card-ink mx-auto max-w-3xl rounded-2xl bg-cream p-8 text-center sm:p-10" style={overlay ? undefined : { marginTop: "3rem", marginBottom: "3rem" }}>
        <UserRound className="mx-auto h-10 w-10 text-stone" strokeWidth={1.5} />
        <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
          Your Account
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-stone">
          An account is a free, optional way to save your progress, quiz
          results, saved tools, and badges and sync them across your phone,
          laptop, and library computer. It never unlocks paywalled content,
          because there isn&apos;t any.
        </p>
        <p className="mx-auto mt-4 max-w-md rounded-xl border-2 border-forest/20 bg-forest/[0.06] px-4 py-3 text-sm font-semibold leading-6 text-forest">
          Almost every guide and tool on Empower works with no account at all —
          your progress already saves on this device automatically.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-stone">
          Free accounts are rolling out now. Check back soon to sign up, sign
          in, or reset a password — in the meantime, nothing here is behind a
          sign-up wall.
        </p>
      </div>
      </section>
    );
  }

  if (!booted) {
    return (
      <section className={overlay ? "" : "bg-paper-deep"}>
        <div className={overlay ? "flex items-center justify-center rounded-3xl bg-paper-deep py-32 text-stone" : "flex items-center justify-center py-32 text-stone"}>
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </section>
    );
  }

  if (session) {
    return (
      <ProfileEditor
          supabase={supabase}
          session={session}
          syncedKeys={syncedKeys}
          paths={paths}
          badgeSources={badgeSources}
          fromAuthRedirect={fromAuthRedirect}
        />
    );
  }

  // Signed out: split-screen — a brand "identity" panel beside the form.
  return (
    <section className={overlay ? "" : "bg-paper-deep"}>
    <div className={
      overlay
        ? "relative mx-auto grid max-w-5xl items-stretch gap-6 rounded-3xl bg-paper-deep p-5 pt-14 shadow-2xl lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:p-8 lg:pt-14"
        : "mx-auto grid max-w-5xl items-stretch gap-6 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:py-16"
    }>
    {overlay && <CloseX className="absolute right-4 top-4 z-10" />}
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
            An account is never required here. It just makes the site
            remember you.
          </p>
          <ul className="mt-7 space-y-3.5">
            {[
              "Your reading, quiz results, calculators, and badges follow you to any device",
              "Pick up exactly where you left off",
              "A member tag you control when you post in the community",
              "Free forever, no spam, and your data is never sold",
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
    </section>
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
          ? "Google sign-in isn't switched on yet. Use email and password for now."
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
        "Almost there: check your inbox. We sent a link to verify your email; your account activates when you click it."
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
          ? "That email hasn't been verified yet. Find our message in your inbox and click the link first."
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
          "Free, like everything here. Your reading, quiz results, badges, and calculators sync across devices, and nothing on this site ever requires an account."}
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
                  {resent ? "sent again ✓ · " : ""}resend available in{" "}
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
                  Create a free account
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
  overlay = false,
}: {
  supabase: SupabaseClient;
  session: Session;
  syncedKeys: number | null;
  paths: TopicPath[];
  badgeSources: BadgeSource[];
  fromAuthRedirect: boolean;
  overlay?: boolean;
}) {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<ProfileRole>("");
  const [studentStage, setStudentStage] = useState<StudentStage>("");
  const [showTag, setShowTag] = useState(false);
  // Dashboard personalization: local-first, auto-synced (lib/dashboardPrefs).
  const [dashPrefs, setDashPrefs] = useState<DashboardPrefs>(DEFAULT_PREFS);
  const [dashPrefsReady, setDashPrefsReady] = useState(false);
  // "About you" recommendation signals (lib/aboutYou): local-first, synced,
  // saved instantly on change — no save button, never public.
  const [aboutYou, setAboutYou] = useState<AboutYou>(EMPTY_ABOUT_YOU);
  const [goals, setGoals] = useState<string[]>([]);
  const [flairs, setFlairs] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [publicProfile, setPublicProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarNote, setAvatarNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [tab, setTab] = useState<PanelTab>("overview");
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
  // First-sign-in congrats: shown exactly once per account, ever. Fires for
  // a genuinely new account (created within the last day — covers email AND
  // Google signups, whichever door they came through) or a fresh-verification
  // redirect. The empower:welcomed map is union-synced with the account, so a
  // second device won't repeat it. MUST live above the loading early-return
  // (hooks can't render conditionally).
  const [showWelcome, setShowWelcome] = useState(() => {
    const welcomed =
      loadJSON<Record<string, number>>(STORAGE_KEYS.welcomed) ?? {};
    if (welcomed[session.user.id]) return false;
    const createdAt = session.user.created_at
      ? Date.parse(session.user.created_at)
      : 0;
    const confirmedAt = session.user.email_confirmed_at
      ? Date.parse(session.user.email_confirmed_at)
      : 0;
    return (
      (createdAt > 0 && Date.now() - createdAt < 24 * 60 * 60_000) ||
      (fromAuthRedirect &&
        confirmedAt > 0 &&
        Date.now() - confirmedAt < 5 * 60_000)
    );
  });

  const userId = session.user.id;
  // Record the welcome the moment it renders, so it can never show twice
  // (dismissed or not, navigating away counts as seen).
  useEffect(() => {
    if (!showWelcome) return;
    const welcomed =
      loadJSON<Record<string, number>>(STORAGE_KEYS.welcomed) ?? {};
    if (!welcomed[userId]) {
      welcomed[userId] = Date.now();
      saveJSON(STORAGE_KEYS.welcomed, welcomed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWelcome, userId]);
  // Member progress for the stats row + Overview tab; re-reads once the
  // login sync merge lands (syncedKeys flips from null).
  const member = useMemberData(paths, badgeSources, syncedKeys);
  const memberSince = session.user.created_at
    ? new Date(session.user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    setDashPrefs(readDashboardPrefs());
    setAboutYou(readAboutYou());
    setDashPrefsReady(true);
  }, [syncedKeys]);
  // Functional updates on purpose: rapid clicks across fields must not
  // clobber each other (the tracker's survive-rapid-clicks lesson).
  const updateAboutYou = (fn: (prev: AboutYou) => AboutYou) => {
    setAboutYou((prev) => {
      const next = fn(prev);
      writeAboutYou(next);
      return next;
    });
  };
  const updateDashPrefs = (next: DashboardPrefs) => {
    setDashPrefs(next);
    writeDashboardPrefs(next);
  };

  useEffect(() => {
    let cancelled = false;
    const apply = (data: Record<string, unknown> | null) => {
      if (cancelled) return;
      if (data) {
        const p: Profile = {
          displayName: (data.display_name as string) ?? "",
          role: ((data.role as ProfileRole) ?? "") as ProfileRole,
          studentStage: ((data.student_stage as StudentStage) ??
            "") as StudentStage,
          showTag: Boolean(data.show_tag),
          goals: Array.isArray(data.goals) ? (data.goals as string[]) : [],
          flairs: Array.isArray(data.flairs) ? (data.flairs as string[]) : [],
          bio: (data.bio as string) ?? "",
          publicProfile: Boolean(data.public_profile),
          avatarUrl: (data.avatar_url as string) ?? "",
        };
        setDisplayName(p.displayName);
        setRole(p.role);
        setStudentStage(p.studentStage ?? "");
        setShowTag(p.showTag);
        setGoals(p.goals);
        setFlairs(p.flairs);
        setBio(p.bio);
        setPublicProfile(p.publicProfile);
        setAvatarUrl(p.avatarUrl ?? "");
        writeLocalProfile(p);
      }
      setLoading(false);
    };
    supabase
      .from("profiles")
      .select(
        "display_name, role, student_stage, show_tag, goals, flairs, bio, public_profile, avatar_url"
      )
      .eq("id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error) return apply(data);
        // student_stage not migrated yet — retry without it so the rest of
        // the editor keeps working.
        supabase
          .from("profiles")
          .select(
            "display_name, role, show_tag, goals, flairs, bio, public_profile"
          )
          .eq("id", userId)
          .maybeSingle()
          .then(({ data: d2, error: e2 }) => {
            if (!e2) return apply(d2);
            // older columns not migrated either — the legacy minimum.
            supabase
              .from("profiles")
              .select("display_name, role, show_tag")
              .eq("id", userId)
              .maybeSingle()
              .then(({ data: d3 }) => apply(d3));
          });
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
      // Stage only means something for students — clear it with the role
      // so a switch to "working" doesn't leave a stale answer behind.
      studentStage: role === "student" ? studentStage : "",
      showTag,
      goals,
      flairs,
      bio: bio.trim(),
      publicProfile,
      avatarUrl,
    };
    const row = {
      id: userId,
      display_name: profile.displayName,
      role: profile.role,
      student_stage: profile.studentStage ?? "",
      show_tag: profile.showTag,
      goals: profile.goals,
      flairs: profile.flairs,
      bio: profile.bio,
      public_profile: profile.publicProfile,
      avatar_url: profile.avatarUrl ?? "",
    };
    let { error } = await supabase.from("profiles").upsert(row);
    if (error && /student_stage|avatar_url/.test(error.message)) {
      // Column(s) not migrated yet — save everything else; both still
      // work locally via the profile mirror.
      const { student_stage: _s, avatar_url: _a, ...legacyRow } = row;
      ({ error } = await supabase.from("profiles").upsert(legacyRow));
    }
    setSaving(false);
    if (!error) {
      writeLocalProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setSaveError(
        /goals|flairs|bio|public_profile/.test(error.message)
          ? "The newest profile columns haven't been added to the database yet (see docs/supabase-schema.sql)."
          : "Couldn't save just now. Try again in a moment."
      );
    }
  }, [supabase, userId, displayName, role, studentStage, showTag, goals, flairs, bio, publicProfile, avatarUrl]);

  const onAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setAvatarBusy(true);
    setAvatarNote(null);
    const url = await uploadAvatar(userId, file);
    if (!url) {
      setAvatarNote(
        "Couldn't upload that photo. If this keeps happening, the avatars bucket may not be set up yet (docs/supabase-schema.sql)."
      );
      setAvatarBusy(false);
      return;
    }
    setAvatarUrl(url);
    // Persist immediately — nobody expects a photo to need a Save click.
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, avatar_url: url });
    setAvatarBusy(false);
    if (error) {
      setAvatarNote(
        /avatar_url/.test(error.message)
          ? "Uploaded, but the avatar_url column isn't in the database yet (docs/supabase-schema.sql)."
          : "Uploaded, but saving to your profile hiccuped — hit Save changes to finish."
      );
    } else {
      const local = readLocalProfile();
      if (local) writeLocalProfile({ ...local, avatarUrl: url });
    }
  };

  const onAvatarRemove = async () => {
    setAvatarBusy(true);
    setAvatarNote(null);
    await removeAvatar(userId);
    setAvatarUrl("");
    await supabase.from("profiles").upsert({ id: userId, avatar_url: "" });
    const local = readLocalProfile();
    if (local) writeLocalProfile({ ...local, avatarUrl: "" });
    setAvatarBusy(false);
  };

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
        : "Confirmation sent. Check the NEW address (and possibly your current one) and click the link to finish the switch."
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

  // Switch section; below lg the rail sits far above the panel, so bring
  // the panel into view.
  function selectTab(t: PanelTab) {
    setTab(t);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document
        .getElementById("account-settings")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-stone">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const initial = (displayName.trim() || session.user.email || "?")
    .charAt(0)
    .toUpperCase();
  const keepHref = member.next?.href ?? "/learn";
  const navItems = [
    ["overview", LayoutDashboard],
    ["progress", TrendingUp],
    ["about", UserRound],
    ["goals", Target],
    ["security", ShieldCheck],
  ] as const;

  return (
    <section className={overlay ? "" : "bg-paper"}>
      <div
        className={
          overlay ? "" : "mx-auto max-w-[88rem] px-3 py-6 sm:px-6 lg:py-10"
        }
      >
        <div
          className={`overflow-hidden rounded-3xl ${
            overlay ? "bg-paper-deep shadow-2xl" : "bg-paper-deep shadow-sm"
          }`}
        >
          {/* in-frame top bar */}
          <div
            className="flex items-center justify-between border-b px-5 py-4 sm:px-7"
            style={{ borderColor: DASH.divider }}
          >
            <p className="font-display text-xl font-semibold text-ink">
              Your account
            </p>
            {overlay ? (
              <CloseX />
            ) : (
              <span className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-sm font-bold text-ink">
                  {initial}
                </span>
                <CloseX />
              </span>
            )}
          </div>

          <div className="flex">
            {/* flat sidebar */}
            <aside
              className="hidden w-56 flex-shrink-0 border-r px-4 pb-8 pt-6 lg:block"
              style={{ borderColor: DASH.divider }}
            >
              <Link
                href={keepHref}
                className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-forest py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-700"
              >
                <BookOpen className="h-4 w-4" strokeWidth={2} />
                Keep learning
              </Link>
              {navItems.map(([id, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectTab(id)}
                  aria-pressed={tab === id}
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    tab === id ? "text-ink" : "hover:text-ink"
                  }`}
                  style={
                    tab === id
                      ? {
                          background: "rgba(231,163,60,0.18)",
                          boxShadow: "inset 3px 0 0 #e7a33c",
                        }
                      : { color: DASH.muted }
                  }
                >
                  <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
                  {PANEL_LABELS[id]}
                </button>
              ))}
            </aside>

            {/* content */}
            <div className="min-w-0 flex-1 p-4 sm:p-6">
              {showWelcome && (
                <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border-2 border-ink/10 bg-cream p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-forest"
                      strokeWidth={1.75}
                    />
                    <div>
                      <p className="font-display text-lg font-bold text-ink">
                        You&apos;re in. Welcome to Empower.
                      </p>
                      <p className="mt-0.5 text-sm leading-6 text-stone">
                        Your account is live, and everything you&apos;ve done
                        on this device is saved to it. Take a minute to set up
                        your profile: your name, what you&apos;re up to, and
                        the goals you&apos;re working toward.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          selectTab("about");
                          setShowWelcome(false);
                        }}
                        className="mt-3 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
                      >
                        Set up your profile
                      </button>
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

              {/* mobile section chips */}
              <div className="mb-4 flex gap-1.5 overflow-x-auto lg:hidden">
                {navItems.map(([id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectTab(id)}
                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold ${
                      tab === id
                        ? "bg-forest text-cream"
                        : "border border-sand bg-cream text-stone"
                    }`}
                  >
                    {PANEL_LABELS[id]}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
                <FlatIdentityCard
                  name={displayName}
                  email={session.user.email ?? ""}
                  role={role}
                  studentStage={studentStage}
                  accent={dashPrefs.accent ?? undefined}
                  avatarUrl={avatarUrl}
                  flairIds={flairs.slice(0, MAX_FLAIRS)}
                  goalsCount={goals.length}
                  memberSince={memberSince}
                  quizTopicCount={member.quizTopics.length}
                  badgesEarned={member.earned.length}
                  badgeTotal={badgeSources.length}
                  streakDays={member.streakDays}
                  onEdit={() => selectTab("about")}
                  onSignOut={signOut}
                />

                <div className="min-w-0 space-y-5">
                  {tab === "progress" && member.mounted && (
                    <>
                      {/* The skill tree leads as its own full-width section
                          (owner, July 16: "make the skill tree a separate
                          section") — tree glyph + points + breakdown. */}
                      {dashPrefsReady &&
                        !dashPrefs.hiddenCards.includes("skill-tree") && (
                          <SkillTreeSection paths={paths} />
                        )}
                      {!dashPrefs.hiddenCards.includes("stats") && (
                        <FlatStatCards
                          data={member}
                          paths={paths}
                          badgeTotal={badgeSources.length}
                        />
                      )}
                      {dashPrefsReady && (
                        <DashboardExtras
                          group="progress"
                          prefs={dashPrefs}
                          onChange={updateDashPrefs}
                        />
                      )}
                    </>
                  )}
                  {/* Overview-only: these are the overview's cards — on any
                      other tab they'd read as page debris (owner bug report,
                      July 13: "dashboard seems broken"). */}
                  {tab === "overview" &&
                    !showWelcome &&
                    dashPrefsReady &&
                    member.mounted && (
                      <DashboardExtras
                        group="overview"
                        prefs={dashPrefs}
                        onChange={updateDashPrefs}
                      />
                    )}

                  <div
                    id="account-settings"
                    className="scroll-mt-24 rounded-2xl border-2 border-ink/10 bg-cream"
                  >
                    {/* tabs inside the panel, Kinetik-style */}
                    <div
                      className="flex items-center gap-0.5 overflow-x-auto border-b px-3 pt-1.5"
                      style={{ borderColor: DASH.divider }}
                    >
                      {navItems.map(([id]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => selectTab(id)}
                          aria-pressed={tab === id}
                          className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold ${
                            tab === id ? "text-forest" : "hover:text-ink"
                          }`}
                          style={tab === id ? undefined : { color: DASH.muted }}
                        >
                          {PANEL_LABELS[id]}
                          {tab === id && (
                            <span className="absolute inset-x-3 bottom-0 h-[2.5px] rounded-full bg-forest" />
                          )}
                        </button>
                      ))}
                      <Link
                        href={keepHref}
                        className="ml-auto mr-2 hidden whitespace-nowrap rounded-lg bg-forest px-4 py-2 text-xs font-bold text-cream transition-colors hover:bg-forest-700 sm:block"
                      >
                        + Keep learning
                      </Link>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
          {tab === "overview" && !showWelcome && !role && goals.length === 0 && (
            <div
              className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink/10 bg-cream px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <Target
                  className="h-5 w-5 flex-shrink-0 text-forest"
                  strokeWidth={1.75}
                />
                <p className="text-sm leading-6" style={{ color: DASH.muted }}>
                  <span className="font-semibold text-ink">
                    Finish setting up your profile.
                  </span>{" "}
                  Add what you&apos;re up to and pick a goal or two.
                </p>
              </div>
              <button
                type="button"
                onClick={() => selectTab("about")}
                className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
              >
                Finish profile
              </button>
            </div>
          )}
          {tab === "overview" && (
            <FlatOverview
              hidden={dashPrefs.hiddenCards}
              include={["student", "recent"]}
              data={member}
              paths={paths}
              badgeTotal={badgeSources.length}
            />
          )}
          {tab === "progress" && (
            <FlatOverview
              hidden={dashPrefs.hiddenCards}
              include={["badges", "topics"]}
              data={member}
              paths={paths}
              badgeTotal={badgeSources.length}
            />
          )}
          {tab === "about" && (
            <div className="space-y-5">
              <p className="text-base leading-7 text-stone">
                Totally optional. It helps us point you at the right guides,
                and if you want, it shows next to your name when you post in
                the community.
              </p>
              <div>
                <span className={labelCls}>Profile picture</span>
                <div className="mt-1 flex items-center gap-4">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- member upload, arbitrary storage URL
                    <img
                      src={avatarUrl}
                      alt="Your profile picture"
                      className="h-16 w-16 rounded-full border-2 border-ink/10 object-cover"
                    />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/25 font-display text-2xl font-bold text-amber-deep">
                      {(displayName.trim() || "?").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer rounded-md border-2 border-ink/15 bg-cream px-3 py-1.5 text-[13px] font-bold text-ink transition-colors hover:border-ink/40">
                        {avatarBusy
                          ? "Working…"
                          : avatarUrl
                            ? "Change photo"
                            : "Upload a photo"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onAvatarFile}
                          disabled={avatarBusy}
                          className="sr-only"
                        />
                      </label>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={onAvatarRemove}
                          disabled={avatarBusy}
                          className="text-[13px] font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs leading-5 text-stone">
                      Cropped square and saved right away. Shows on your
                      dashboard — and on your public member page only if you
                      turn that on below.
                    </p>
                  </div>
                </div>
                {avatarNote && (
                  <p className="mt-2 text-xs font-semibold text-terracotta">
                    {avatarNote}
                  </p>
                )}
              </div>

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

              <div>
                <label htmlFor="profile-bio" className={labelCls}>
                  Bio{" "}
                  <span className="font-normal text-stone">
                    (shows on your public profile, if you turn that on below)
                  </span>
                </label>
                <textarea
                  id="profile-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A line or two: what you're working toward, what you're good at, what brought you here."
                  maxLength={280}
                  rows={3}
                  className={inputCls}
                />
                <p className="mt-1 text-right text-xs text-stone">
                  {bio.length}/280
                </p>
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
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                        role === value
                          ? "border-forest bg-forest/[0.06] text-ink"
                          : "border-sand bg-cream text-stone hover:border-forest/40"
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
                {role === "student" && (
                  <div className="mt-3 rounded-lg border border-sand bg-cream p-4">
                    <p className="text-sm font-semibold text-ink">
                      Which kind of student?{" "}
                      <span className="font-normal text-stone">
                        (we use this to recommend the right scholarships,
                        guides, and deadlines)
                      </span>
                    </p>
                    <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                      {STUDENT_STAGE_OPTIONS.map((s) => (
                        <label
                          key={s.id}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            studentStage === s.id
                              ? "border-forest bg-forest/[0.06] text-ink"
                              : "border-sand bg-paper text-stone hover:border-forest/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="profile-student-stage"
                            checked={studentStage === s.id}
                            onChange={() => setStudentStage(s.id)}
                            className="h-4 w-4 accent-forest"
                          />
                          {s.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className={labelCls}>
                  Flairs{" "}
                  <span className="font-normal text-stone">
                    (pick as many as you like; the first {MAX_FLAIRS} you
                    picked are the ones everyone sees)
                  </span>
                </legend>
                {(
                  [
                    ["useful", "Where you're coming from"],
                    ["fun", "Just for fun"],
                  ] as const
                ).map(([kind, groupLabel]) => (
                  <div key={kind} className="mt-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-stone">
                      {groupLabel}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {FLAIR_OPTIONS.filter((f) => f.kind === kind).map(
                        (f) => {
                          const idx = flairs.indexOf(f.id);
                          const on = idx !== -1;
                          const showing = on && idx < MAX_FLAIRS;
                          return (
                            <button
                              key={f.id}
                              type="button"
                              aria-pressed={on}
                              title={
                                showing
                                  ? "Showing on your profile"
                                  : on
                                    ? "Picked, but only your first two show"
                                    : undefined
                              }
                              onClick={() =>
                                setFlairs((prev) =>
                                  on
                                    ? prev.filter((id) => id !== f.id)
                                    : [...prev, f.id]
                                )
                              }
                              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                                !on
                                  ? "border-sand bg-cream text-stone hover:text-ink"
                                  : ""
                              }`}
                              style={
                                showing
                                  ? {
                                      background: f.color,
                                      borderColor: f.color,
                                      color: "#fbf8f1",
                                    }
                                  : on
                                    ? {
                                        background: "#fff",
                                        borderColor: f.color,
                                        color: f.color,
                                      }
                                    : undefined
                              }
                            >
                              {f.label}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
                <p className="mt-2 text-xs text-stone">
                  {flairs.length === 0
                    ? "Nothing picked yet."
                    : flairs.length <= MAX_FLAIRS
                      ? `Showing: ${flairs.map(flairLabel).filter(Boolean).join(" · ")}`
                      : `${flairs.length} picked, showing ${flairs
                          .slice(0, MAX_FLAIRS)
                          .map(flairLabel)
                          .filter(Boolean)
                          .join(" · ")} (solid). Unpick one to promote another.`}
                </p>
              </fieldset>

              <label className="flex items-start gap-2.5 rounded-lg border border-sand bg-cream p-4 text-sm leading-6 text-ink">
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

              <label className="flex items-start gap-2.5 rounded-lg border border-sand bg-cream p-4 text-sm leading-6 text-ink">
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-forest"
                />
                <span>
                  <span className="font-semibold">
                    Make my profile page public.
                  </span>{" "}
                  <span className="text-stone">
                    Your member page shows your bio, life stage, flairs, and
                    member-since date to anyone who clicks your name. Off (the
                    default), visitors see only your name and anything
                    you&apos;ve posted publicly.
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
                What are you working toward? Pick as many as you like. We use
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
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        on
                          ? "border-forest bg-forest text-cream"
                          : "border-sand bg-cream text-stone hover:border-forest/40 hover:text-ink"
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

              {/* Recommendation signals (owner ask July 13: "more options...
                  as much info to recommend the best things"). Instant-save,
                  local-first, never public — the copy says so plainly. */}
              <div className="space-y-6 border-t pt-6" style={{ borderColor: DASH.divider }}>
                <p className="text-sm leading-6 text-stone">
                  The more of this you answer, the sharper the
                  recommendations get: your plan, your dashboard, and the
                  guides we surface first. Answers save instantly, sync with
                  your account, and never show on any public page.
                </p>

                <fieldset>
                  <legend className={labelCls}>What&apos;s money like month to month?</legend>
                  <div className="flex flex-wrap gap-2">
                    {INCOME_CHOICES.map((c) => {
                      const on = aboutYou.income === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            updateAboutYou((prev) => ({
                              ...prev,
                              income: prev.income === c.id ? "" : c.id,
                            }))
                          }
                          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            on
                              ? "border-forest bg-forest text-cream"
                              : "border-sand bg-cream text-stone hover:border-forest/40 hover:text-ink"
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={labelCls}>Anyone counting on you, or helping you?</legend>
                  <div className="flex flex-wrap gap-2">
                    {FAMILY_CHOICES.map((c) => {
                      const on = aboutYou.family === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            updateAboutYou((prev) => ({
                              ...prev,
                              family: prev.family === c.id ? "" : c.id,
                            }))
                          }
                          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            on
                              ? "border-forest bg-forest text-cream"
                              : "border-sand bg-cream text-stone hover:border-forest/40 hover:text-ink"
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={labelCls}>
                    Anything happening soon?{" "}
                    <span className="font-normal text-stone">(pick any)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {moments.map((m) => {
                      const on = aboutYou.moments.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          aria-pressed={on}
                          title={m.tagline}
                          onClick={() =>
                            updateAboutYou((prev) => ({
                              ...prev,
                              moments: prev.moments.includes(m.id)
                                ? prev.moments.filter((id) => id !== m.id)
                                : [...prev.moments, m.id],
                            }))
                          }
                          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            on
                              ? "border-forest bg-forest text-cream"
                              : "border-sand bg-cream text-stone hover:border-forest/40 hover:text-ink"
                          }`}
                        >
                          {m.title}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={labelCls}>How confident do you feel with money stuff?</legend>
                  <div className="flex flex-wrap gap-2">
                    {CONFIDENCE_CHOICES.map((c) => {
                      const on = aboutYou.confidence === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            updateAboutYou((prev) => ({
                              ...prev,
                              confidence: prev.confidence === c.id ? "" : c.id,
                            }))
                          }
                          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            on
                              ? "border-forest bg-forest text-cream"
                              : "border-sand bg-cream text-stone hover:border-forest/40 hover:text-ink"
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <p className="text-xs text-stone">
                  These answers pre-fill your plan builder and shape the
                  &ldquo;up next&rdquo; picks. Change or clear them any time.
                </p>

                {dashPrefsReady && (
                  <CustomizeCard prefs={dashPrefs} onChange={updateDashPrefs} />
                )}
              </div>
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
                  . To change it, enter the new address; we&apos;ll email a
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
                    className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {emailBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                    Change email
                  </button>
                </div>
                {emailNotice && (
                  <div className="pt-3">
                    <div className="flex items-start gap-2.5 rounded-xl border-2 border-forest/30 bg-forest/[0.06] px-4 py-3.5">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest"
                        strokeWidth={1.75}
                      />
                      <p className="text-sm leading-6 text-ink">{emailNotice}</p>
                    </div>
                  </div>
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
                <button
                  type="submit"
                  disabled={pwBusy}
                  className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pwBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                  Update password
                </button>
                {pwNotice && (
                  <div className="pt-3">
                    <div className="flex items-start gap-2.5 rounded-xl border-2 border-forest/30 bg-forest/[0.06] px-4 py-3.5">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest"
                        strokeWidth={1.75}
                      />
                      <p className="text-sm leading-6 text-ink">
                        <span className="font-bold">{pwNotice}</span> Use the
                        new one next time you sign in.
                      </p>
                    </div>
                  </div>
                )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The identity card (the reference's patient-card position), flat style. */
function FlatIdentityCard({
  name,
  email,
  role,
  studentStage = "",
  accent,
  avatarUrl = "",
  flairIds,
  goalsCount,
  memberSince,
  quizTopicCount,
  badgesEarned,
  badgeTotal,
  streakDays,
  onEdit,
  onSignOut,
}: {
  name: string;
  email: string;
  role: ProfileRole;
  studentStage?: StudentStage;
  /** Member-picked avatar color (lib/dashboardPrefs); amber default. */
  accent?: string;
  /** Uploaded photo URL; empty = the initial-letter circle. */
  avatarUrl?: string;
  flairIds: string[];
  goalsCount: number;
  memberSince: string;
  quizTopicCount: number;
  badgesEarned: number;
  badgeTotal: number;
  streakDays: number;
  onEdit: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-forest text-cream shadow-md lg:sticky lg:top-24">
      <TopicMark
        id="budgeting"
        color="#fbf8f1"
        className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 opacity-[0.07]"
      />
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 inline-flex items-center gap-1 text-xs font-semibold text-cream/70 transition-colors hover:text-amber"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
      <div className="flex flex-col items-center px-6 pb-1 pt-7 text-center">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- member upload, arbitrary storage URL
          <img
            src={avatarUrl}
            alt=""
            className="h-20 w-20 rounded-full border-2 border-cream/30 object-cover"
          />
        ) : (
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold ${
              accent ? "text-cream" : "bg-amber text-ink"
            }`}
            style={accent ? { background: accent } : undefined}
          >
            {(name.trim() || email).charAt(0).toUpperCase()}
          </span>
        )}
        <p className="mt-3 font-display text-2xl font-semibold">
          {name.trim() || "Add your name"}
        </p>
        <p className="mt-0.5 text-xs text-cream/60">
          Member since {memberSince || "today"}
        </p>
        {role && (
          <span className="mt-2.5 rounded-md bg-white/15 px-2.5 py-1 text-xs font-bold">
            {role === "student" && studentStage
              ? `${stageLabel(studentStage)} student`
              : ROLE_LABELS[role]}
          </span>
        )}
        {flairIds.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {flairIds.map((id) => (
              <span
                key={id}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-cream"
                style={{ background: flairColor(id) }}
              >
                {flairLabel(id)}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mx-6 mt-4 space-y-2.5 border-t border-white/15 py-5 text-sm">
        <p className="flex min-w-0 items-center gap-2.5 text-cream/85">
          <Mail className="h-4 w-4 flex-shrink-0 text-amber" strokeWidth={1.75} />
          <span className="truncate">{email}</span>
        </p>
        <p className="flex items-center gap-2.5 text-cream/85">
          <Target className="h-4 w-4 flex-shrink-0 text-amber" strokeWidth={1.75} />
          {goalsCount} {goalsCount === 1 ? "goal" : "goals"} picked
        </p>
      </div>
      <div className="mx-6 space-y-2 border-t border-white/15 py-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-cream/55">Quiz profile</span>
          <span className="font-semibold">
            {quizTopicCount > 0
              ? `${quizTopicCount} ${quizTopicCount === 1 ? "topic" : "topics"}`
              : "Not yet"}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-cream/55">Badges</span>
          <span className="font-semibold">
            {badgesEarned} of {badgeTotal}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-cream/55">Streak this week</span>
          <span className="font-semibold">
            {streakDays} {streakDays === 1 ? "day" : "days"}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="mx-6 mb-6 w-[calc(100%-3rem)] rounded-lg bg-white/10 py-2.5 text-sm font-semibold transition-colors hover:bg-white/20"
      >
        Sign out
      </button>
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
        className="inline-flex items-center gap-2 rounded-lg bg-forest px-6 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
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
