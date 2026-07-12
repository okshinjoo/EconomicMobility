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
