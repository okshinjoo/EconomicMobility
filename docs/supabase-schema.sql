-- Empower accounts schema. Run this ONCE in the Supabase dashboard:
-- SQL Editor -> New query -> paste this whole file -> Run.
--
-- Two tables, both locked down with Row Level Security so a signed-in user
-- can only ever touch their own rows. The anon key in the site's code grants
-- nothing beyond these policies.

-- Who the member is (drives the profile page + community tags).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  role text not null default '' check (role in ('', 'student', 'working', 'retired')),
  show_tag boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "create own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Synced progress: one row per empower:* localStorage key, value as JSON.
-- (Read articles, quiz result, calculator snapshots, badges, and so on.)
create table if not exists public.user_data (
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.user_data enable row level security;

create policy "read own data" on public.user_data
  for select using (auth.uid() = user_id);
create policy "insert own data" on public.user_data
  for insert with check (auth.uid() = user_id);
create policy "update own data" on public.user_data
  for update using (auth.uid() = user_id);
create policy "delete own data" on public.user_data
  for delete using (auth.uid() = user_id);

-- Keep updated_at honest on upserts.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists user_data_touch on public.user_data;
create trigger user_data_touch before update on public.user_data
  for each row execute function public.touch_updated_at();

-- Added July 2026 (profile Goals tab): what the member is working toward.
alter table public.profiles
  add column if not exists goals jsonb not null default '[]'::jsonb;

-- Added July 2026 (profile flairs): up to two badges shown with the tag.
alter table public.profiles
  add column if not exists flairs jsonb not null default '[]'::jsonb;

-- ============================================================
-- Added July 2026: LIVE COMMENTS (approve-first, members-only)
-- Run this whole block once in the Supabase SQL Editor.
-- Then make yourself a moderator (see the insert at the bottom).
-- ============================================================

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  -- The community post this belongs to (ids from lib/communityFeed.ts).
  post_id text not null,
  -- Set when this is a reply to another comment (one level deep in the UI).
  parent_id uuid references public.comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Author display snapshot, captured at submit time from the profile.
  author_name text not null default 'Member',
  author_tag text,
  author_flairs jsonb not null default '[]'::jsonb,
  body text not null check (char_length(body) between 1 and 4000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists comments_post_idx
  on public.comments (post_id, status, created_at);
create index if not exists comments_queue_idx
  on public.comments (status, created_at);

-- Who can moderate. A row here = full approve/reject/delete powers.
create table if not exists public.moderators (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.comments enable row level security;
alter table public.moderators enable row level security;

-- Everyone (signed in or not) reads APPROVED comments; authors also see
-- their own pending/rejected ones (that's the cross-device "pending" chip).
drop policy if exists "comments: read approved or own" on public.comments;
create policy "comments: read approved or own" on public.comments
  for select using (status = 'approved' or auth.uid() = user_id);

-- Moderators read everything (the review queue).
drop policy if exists "comments: mods read all" on public.comments;
create policy "comments: mods read all" on public.comments
  for select using (
    exists (select 1 from public.moderators m where m.user_id = auth.uid())
  );

-- Signed-in members insert their own comments, always as 'pending'.
drop policy if exists "comments: insert own pending" on public.comments;
create policy "comments: insert own pending" on public.comments
  for insert with check (auth.uid() = user_id and status = 'pending');

-- Authors may delete their own comment while it's still pending.
drop policy if exists "comments: delete own pending" on public.comments;
create policy "comments: delete own pending" on public.comments
  for delete using (auth.uid() = user_id and status = 'pending');

-- Moderators approve/reject/delete anything.
drop policy if exists "comments: mods update" on public.comments;
create policy "comments: mods update" on public.comments
  for update using (
    exists (select 1 from public.moderators m where m.user_id = auth.uid())
  );
drop policy if exists "comments: mods delete" on public.comments;
create policy "comments: mods delete" on public.comments
  for delete using (
    exists (select 1 from public.moderators m where m.user_id = auth.uid())
  );

-- You can check your own moderator status (the admin page uses this);
-- nobody can list who the moderators are.
drop policy if exists "moderators: read own row" on public.moderators;
create policy "moderators: read own row" on public.moderators
  for select using (auth.uid() = user_id);

-- FINAL STEP, run separately: make yourself a moderator. Find your user id
-- in Authentication -> Users (it's the UUID on your own account), then:
-- insert into public.moderators (user_id) values ('YOUR-USER-UUID-HERE');


-- July 2026 (owner request): members may delete their OWN comments at any
-- time, published or pending (replies under a deleted comment cascade away).
-- Run these two statements in the SQL Editor:
drop policy if exists "comments: delete own pending" on public.comments;
create policy "comments: delete own" on public.comments
  for delete using (auth.uid() = user_id);


-- July 2026 (owner request): REAL like tallies. One row per member per
-- target (a post id, or "c:<comment id>"). Counts are public; only the
-- signed-in member can add/remove their own row. Run in the SQL Editor:
create table if not exists public.likes (
  target text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (target, user_id)
);
create index if not exists likes_target_idx on public.likes (target);
alter table public.likes enable row level security;

drop policy if exists "likes: read all" on public.likes;
create policy "likes: read all" on public.likes
  for select using (true);

drop policy if exists "likes: insert own" on public.likes;
create policy "likes: insert own" on public.likes
  for insert with check (auth.uid() = user_id);

drop policy if exists "likes: delete own" on public.likes;
create policy "likes: delete own" on public.likes
  for delete using (auth.uid() = user_id);

-- ------------------------------------------------------------------
-- MEMBER PROFILES FEATURE (July 2026): bio + opt-in public profile.
-- Run this whole block once in the SQL Editor.
-- Default is PRIVATE: nothing new is shown for anyone until they flip
-- "Make my profile public" on their account page.
alter table public.profiles add column if not exists bio text not null default '';
alter table public.profiles add column if not exists public_profile boolean not null default false;

-- Keep bios short (the UI caps at 280 too).
do $$ begin
  alter table public.profiles add constraint profiles_bio_len check (char_length(bio) <= 280);
exception when duplicate_object then null; end $$;

-- Anyone may read a profile its owner chose to publish (RLS policies OR
-- together with "read own profile", so members still see their own either way).
create policy "read public profiles" on public.profiles
  for select using (public_profile = true);

-- ------------------------------------------------------------------
-- EMAIL DEADLINE REMINDERS (July 2026). Run this whole block once.
-- Both tables are SERVICE-ROLE ONLY: RLS is on with no policies, so the
-- anon key can't read or write them at all. Subscribing and unsubscribing
-- go through our API routes, which use the service key.
create table if not exists public.reminder_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  wants_deadlines boolean not null default true,
  wants_tips boolean not null default false,
  token text not null unique,
  created_at timestamptz not null default now()
);
alter table public.reminder_subscribers enable row level security;

-- One row per deadline per year, so a reminder can never send twice.
create table if not exists public.reminder_sends (
  deadline_id text not null,
  year int not null,
  sent_at timestamptz not null default now(),
  primary key (deadline_id, year)
);
alter table public.reminder_sends enable row level security;
