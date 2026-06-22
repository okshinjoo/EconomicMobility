# Accounts & Authentication — Deferred Plan

Status: **planned, not yet built.** The user wants real accounts; we deliberately
sequenced a localStorage "pick up where you left off" layer first (shipped) and
deferred full auth until the triggers below are met. This doc is the commitment
and the build spec so the eventual implementation is a clean add, not a redesign.

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
