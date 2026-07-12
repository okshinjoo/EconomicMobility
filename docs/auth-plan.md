# Accounts & Authentication

Status: **BUILT (July 2026), ships dark until env vars are set.** Password
auth with email verification + reset, profile (display name / role tag /
show-tag toggle), full progress sync, /privacy policy, keep-alive cron. The
feature is invisible sitewide until `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` exist (see `lib/supabase.ts`
`accountsEnabled`). Original deferred-plan rationale kept below for history.

## Go-live checklist (owner + assistant)

1. Owner creates a free Supabase project (supabase.com → New project).
2. Owner runs `docs/supabase-schema.sql` in the project's SQL Editor (paste →
   Run) — creates `profiles` + `user_data` with self-only RLS.
3. Supabase dashboard → Authentication → URL Configuration: set Site URL to
   `https://economicmobilityproject.org` and add
   `https://economicmobilityproject.org/account` and `/account/reset` to
   Redirect URLs.
4. Add `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
   (Project → Settings → Environment Variables) and to local `.env.local`.
   Redeploy. Every account surface turns on by itself.
5. BEFORE announcing: connect custom SMTP (Supabase → Auth → SMTP) via a free
   Resend/Brevo account on the project domain — the built-in sender is
   rate-limited to a handful of emails/hour and sends from supabase.io.
6. When signups are real: upgrade Supabase to Pro ($25/mo) for no-pausing +
   daily backups. Until then the `/api/keepalive` daily cron (vercel.json)
   prevents free-tier pausing.

## What was built (file map)

- `lib/supabase.ts` — client, inert until env vars exist.
- `docs/supabase-schema.sql` — tables + RLS (run once in Supabase).
- `app/account/page.tsx` + `components/AccountPanel.tsx` — sign-up (password,
  13+ checkbox, verification-link notice), sign-in, forgot-password, and the
  signed-in profile editor (display name, student/working/retired role,
  show-tag toggle). Profile mirrors to `empower:profile:v1` locally.
- `app/account/reset/page.tsx` + `components/ResetPasswordForm.tsx` — the
  reset-link landing page.
- `lib/accountSync.ts` + the `setStorageMirror` hook in `lib/storage.ts` —
  on-login merge (map keys union across devices; snapshots prefer local) and
  a debounced live mirror of every subsequent `saveJSON`.
- `components/AccountButton.tsx` in the Header (+ MobileNav "Your account"
  link, Footer links) — hidden until configured.
- `lib/profile.ts` — `communityTag()`; AskQuestion + CommunityFeed
  submissions carry `member_tag`, composer name fields prefill.
- `app/privacy/page.tsx` — plain-English policy (13+ for accounts, deletion
  via Help@ email).
- `app/api/keepalive/route.ts` + `vercel.json` cron.

---

# Original deferred plan (historical)

## Why deferred (revisit, don't forget)

1. **The headline payoff is empty today.** "Save the articles they read" only
   matters once Learn articles exist — right now every `/learn/[topic]` roadmap
   item is a "Coming soon" placeholder. Build accounts when there's reading
   history worth tracking.
2. **The audience includes minors.** The quiz has an "Under 18" option. Storing
   identifiable data about minors brings real obligations (COPPA for under-13,
   a privacy policy, data deletion, security). Not a blocker — a reason to do it
   deliberately, with the privacy stance decided first.
3. **Brand promise.** The site markets "no sign-up walls." Accounts must stay
   **optional and never gate content or tools.**

## Triggers to build it

- Real Learn article content exists (something to mark "read").
- A privacy policy + data-handling/minors stance is written.
- We want cross-device sync (localStorage is per-device).

## Chosen stack

**Supabase** — Postgres + Auth in one, generous free tier. Auth handles email +
Google OAuth and sessions; Postgres stores saved data with Row Level Security so
a user can only read/write their own rows.

This moves the app off pure static export: it gains a small server runtime
(fine on Vercel's free tier) and secrets. Keep all content/tools usable logged
out; auth only adds sync + history.

## What it unlocks

- Cross-device sync of the **quiz result** (already saved locally).
- Saved **budget scenarios** (multiple named budgets, not just one local draft).
- **Articles read** / progress through each topic's Learn roadmap.

## Data model sketch

- `profiles` — id (= auth user id), display_name, created_at.
- `quiz_results` — user_id, answers (jsonb), kc_answers (jsonb), saved_at.
- `budgets` — user_id, name, snapshot (jsonb matching `BudgetSnapshot`), updated_at.
- `article_progress` — user_id, topic_id, article_slug, read_at.

All tables: RLS `using (auth.uid() = user_id)`.

## Migration path (the important part)

The current localStorage layer (`lib/storage.ts`, keys `empower:quiz-result:v1`
and `empower:budget:v1`) is the on-ramp. On first successful login:

1. Read local snapshots via the existing `loadJSON` helpers.
2. Upsert them into the user's `quiz_results` / `budgets` rows.
3. Clear local copies (or keep as offline cache) and read from the account
   thereafter.

Keep the snapshot shapes stable so this sync is a straight copy. Bump the `:vN`
key suffix on any breaking shape change.

## Setup the user must do (when we build it)

- Create a free Supabase project; copy the Project URL + anon key.
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to env.
- (For Google sign-in) create a Google OAuth client and paste the credentials
  into Supabase Auth providers.
- Decide and publish the privacy policy / minors stance.

Everything else (UI, header account menu, sign-in/up pages, sync logic, schema
+ RLS migrations) is scaffolded by us.
