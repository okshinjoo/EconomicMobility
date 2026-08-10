-- Empower Scholarship Finder monitoring foundation (Phase 1, August 2026).
--
-- Apply once in the existing Supabase project's SQL editor. The statements
-- are safe to run again. This schema is operational only: it does not replace
-- lib/scholarships.ts as the curated public catalog and grants no anonymous
-- access. Service-role workers write observations; existing moderators may
-- inspect rows. Review actions will go through a server route in Phase 2.

create extension if not exists pgcrypto;

create or replace function public.touch_scholarship_monitor_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create table if not exists public.scholarship_monitor_runs (
  id uuid primary key default gen_random_uuid(),
  trigger_kind text not null default 'scheduled'
    check (trigger_kind in ('scheduled', 'manual', 'retry', 'inventory-sync')),
  worker_version text not null default '',
  status text not null default 'running'
    check (status in ('running', 'completed', 'completed-with-errors', 'failed')),
  due_count integer not null default 0 check (due_count >= 0),
  checked_count integer not null default 0 check (checked_count >= 0),
  success_count integer not null default 0 check (success_count >= 0),
  failure_count integer not null default 0 check (failure_count >= 0),
  proposal_count integer not null default 0 check (proposal_count >= 0),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  summary jsonb not null default '{}'::jsonb
);

create table if not exists public.scholarship_monitor_inventory (
  scholarship_id text primary key,
  name text not null,
  sponsor text,
  official_url text not null check (official_url ~ '^https?://'),
  application_url text check (application_url is null or application_url ~ '^https?://'),
  source_domain text not null,
  publication_status text not null default 'published'
    check (publication_status in ('published', 'withheld', 'removed', 'duplicate', 'discontinued')),
  monitor_enabled boolean not null default true,
  monitor_cadence text not null default 'weekly'
    check (monitor_cadence in ('daily', 'three-days', 'weekly', 'monthly', 'manual')),
  next_check_at timestamptz,
  catalog_fingerprint text not null,
  catalog_verified_label text not null default '',
  geo_scope text check (geo_scope is null or geo_scope in ('national', 'states')),
  geo_states text[] not null default '{}',
  geo_verification_status text not null default 'unverified'
    check (geo_verification_status in ('unverified', 'review-required', 'human-verified', 'stale')),
  geo_evidence text,
  geo_source_url text check (geo_source_url is null or geo_source_url ~ '^https?://'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (geo_scope is null and cardinality(geo_states) = 0) or
    (geo_scope = 'national' and cardinality(geo_states) = 0) or
    (geo_scope = 'states' and cardinality(geo_states) > 0)
  )
);

-- Upgrade existing Phase 1 installations in place.
alter table public.scholarship_monitor_inventory add column if not exists geo_scope text;
alter table public.scholarship_monitor_inventory add column if not exists geo_states text[] not null default '{}';
alter table public.scholarship_monitor_inventory add column if not exists geo_verification_status text not null default 'unverified';
alter table public.scholarship_monitor_inventory add column if not exists geo_evidence text;
alter table public.scholarship_monitor_inventory add column if not exists geo_source_url text;

create or replace function public.enforce_scholarship_monitor_publication_geography()
returns trigger language plpgsql as $$
begin
  if new.geo_verification_status not in ('unverified', 'review-required', 'human-verified', 'stale') then
    raise exception 'Invalid scholarship geography verification status';
  end if;
  if new.geo_scope is not null and new.geo_scope not in ('national', 'states') then
    raise exception 'Invalid scholarship geography scope';
  end if;
  if new.geo_scope = 'national' and cardinality(coalesce(new.geo_states, '{}')) <> 0 then
    raise exception 'National scholarship geography cannot list states';
  end if;
  if new.geo_scope = 'states' and cardinality(coalesce(new.geo_states, '{}')) = 0 then
    raise exception 'State-bound scholarship geography must list at least one state';
  end if;
  if new.publication_status = 'published' and (
    new.geo_scope is null or
    new.geo_verification_status <> 'human-verified' or
    nullif(trim(coalesce(new.geo_evidence, '')), '') is null or
    new.geo_source_url is null
  ) then
    raise exception 'Published scholarships require verified geography with official-source evidence';
  end if;
  return new;
end $$;

drop trigger if exists scholarship_monitor_publication_geography on public.scholarship_monitor_inventory;
create trigger scholarship_monitor_publication_geography
  before insert or update on public.scholarship_monitor_inventory
  for each row execute function public.enforce_scholarship_monitor_publication_geography();

create table if not exists public.scholarship_monitor_domains (
  domain text primary key,
  minimum_interval_seconds integer not null default 2
    check (minimum_interval_seconds >= 1),
  maximum_concurrency integer not null default 1
    check (maximum_concurrency between 1 and 4),
  cooldown_until timestamptz,
  last_fetched_at timestamptz,
  consecutive_failures integer not null default 0
    check (consecutive_failures >= 0),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scholarship_monitor_sources (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  source_kind text not null default 'official'
    check (source_kind in ('official', 'application', 'api', 'feed', 'rules')),
  url text not null check (url ~ '^https?://'),
  source_domain text not null,
  priority integer not null default 100 check (priority >= 0),
  active boolean not null default true,
  extraction_strategy text not null default 'content-change'
    check (extraction_strategy in ('api', 'feed', 'json-ld', 'html', 'content-change', 'browser')),
  extractor_config jsonb not null default '{}'::jsonb,
  expected_signatures jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (scholarship_id, source_kind, url)
);

create table if not exists public.scholarship_monitor_observations (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.scholarship_monitor_runs(id) on delete set null,
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  source_id uuid references public.scholarship_monitor_sources(id) on delete set null,
  requested_url text not null check (requested_url ~ '^https?://'),
  final_url text check (final_url is null or final_url ~ '^https?://'),
  fetched_at timestamptz not null default now(),
  fetch_method text not null default 'http'
    check (fetch_method in ('api', 'feed', 'http', 'browser')),
  http_status integer check (http_status is null or http_status between 100 and 599),
  source_status text not null default 'unknown'
    check (source_status in ('healthy', 'redirected', 'rate-limited', 'blocked', 'not-found', 'server-error', 'structure-changed', 'unknown')),
  success boolean not null default false,
  etag text,
  last_modified text,
  content_hash text,
  normalized_content_hash text,
  extractor_name text not null default '',
  extractor_version text not null default '',
  evidence_snippet text,
  error_kind text,
  error_message text,
  retry_after timestamptz,
  raw_retained_until timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.scholarship_monitor_state (
  scholarship_id text primary key references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  application_status text not null default 'unknown'
    check (application_status in ('open', 'upcoming', 'closed', 'between-cycles', 'rolling', 'unknown')),
  program_status text not null default 'active'
    check (program_status in ('active', 'likely-recurring', 'possibly-discontinued', 'confirmed-discontinued')),
  source_status text not null default 'unknown'
    check (source_status in ('healthy', 'redirected', 'rate-limited', 'blocked', 'not-found', 'server-error', 'structure-changed', 'unknown')),
  extraction_confidence text not null default 'unknown'
    check (extraction_confidence in ('high', 'medium', 'low', 'unknown')),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'machine-verified', 'review-required', 'human-verified', 'stale')),
  opens_on date,
  closes_on date,
  next_opens_on date,
  cycle_label text,
  last_checked_at timestamptz,
  last_verified_at timestamptz,
  last_changed_at timestamptz,
  consecutive_failures integer not null default 0 check (consecutive_failures >= 0),
  last_good_observation_id uuid references public.scholarship_monitor_observations(id)
    on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (opens_on is null or closes_on is null or opens_on <= closes_on)
);

-- Failure streaks are isolated by monitor mode so one full audit cannot turn
-- three different checks into three "consecutive" failures.
create table if not exists public.scholarship_monitor_mode_state (
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  monitor_mode text not null
    check (monitor_mode in ('status', 'candidate', 'source-health')),
  source_status text not null default 'unknown'
    check (source_status in ('healthy', 'redirected', 'rate-limited', 'blocked', 'not-found', 'server-error', 'structure-changed', 'unknown')),
  consecutive_failures integer not null default 0 check (consecutive_failures >= 0),
  last_checked_at timestamptz,
  last_success_at timestamptz,
  last_observation_id uuid references public.scholarship_monitor_observations(id)
    on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (scholarship_id, monitor_mode)
);

create table if not exists public.scholarship_monitor_cycles (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  cycle_label text not null,
  opens_on date,
  closes_on date,
  application_status text not null default 'unknown'
    check (application_status in ('open', 'upcoming', 'closed', 'between-cycles', 'rolling', 'unknown')),
  recurrence_status text not null default 'unknown'
    check (recurrence_status in ('current-cycle', 'expected-to-reopen', 'likely-recurring', 'unknown')),
  source_observation_id uuid references public.scholarship_monitor_observations(id)
    on delete set null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'machine-verified', 'review-required', 'human-verified', 'stale')),
  verified_at timestamptz,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  check (opens_on is null or closes_on is null or opens_on <= closes_on),
  unique (scholarship_id, cycle_label)
);

create table if not exists public.scholarship_monitor_proposals (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  observation_id uuid references public.scholarship_monitor_observations(id)
    on delete set null,
  field_name text not null,
  current_value jsonb,
  proposed_value jsonb,
  source_url text not null check (source_url ~ '^https?://'),
  evidence_text text not null,
  evidence_locator text,
  extraction_confidence text not null
    check (extraction_confidence in ('high', 'medium', 'low')),
  risk text not null check (risk in ('low', 'medium', 'high')),
  verification_status text not null default 'review-required'
    check (verification_status in ('machine-verified', 'review-required', 'human-verified')),
  auto_apply_eligible boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected', 'edited', 'superseded', 'auto-applied')),
  detected_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewer_note text,
  applied_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scholarship_monitor_field_locks (
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  field_name text not null,
  locked_value jsonb,
  reason text not null,
  locked_by uuid references auth.users(id) on delete set null,
  locked_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (scholarship_id, field_name)
);

create table if not exists public.scholarship_monitor_history (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text not null references public.scholarship_monitor_inventory(scholarship_id)
    on delete restrict,
  proposal_id uuid references public.scholarship_monitor_proposals(id) on delete set null,
  field_name text not null,
  previous_value jsonb,
  new_value jsonb,
  action text not null
    check (action in ('auto-applied', 'accepted', 'rejected', 'edited', 'manual-override', 'locked', 'unlocked', 'inventory-sync')),
  actor_kind text not null check (actor_kind in ('system', 'reviewer')),
  actor_user_id uuid references auth.users(id) on delete set null,
  source_url text,
  evidence_text text,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists scholarship_monitor_inventory_due_idx
  on public.scholarship_monitor_inventory (monitor_enabled, next_check_at)
  where monitor_enabled = true;
create index if not exists scholarship_monitor_sources_domain_idx
  on public.scholarship_monitor_sources (source_domain, active, priority);
create index if not exists scholarship_monitor_observations_scholarship_idx
  on public.scholarship_monitor_observations (scholarship_id, fetched_at desc);
create index if not exists scholarship_monitor_observations_run_idx
  on public.scholarship_monitor_observations (run_id);
create index if not exists scholarship_monitor_proposals_queue_idx
  on public.scholarship_monitor_proposals (status, risk desc, detected_at)
  where status = 'pending';
create index if not exists scholarship_monitor_history_scholarship_idx
  on public.scholarship_monitor_history (scholarship_id, occurred_at desc);

drop trigger if exists scholarship_monitor_inventory_touch on public.scholarship_monitor_inventory;
create trigger scholarship_monitor_inventory_touch before update on public.scholarship_monitor_inventory
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_domains_touch on public.scholarship_monitor_domains;
create trigger scholarship_monitor_domains_touch before update on public.scholarship_monitor_domains
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_sources_touch on public.scholarship_monitor_sources;
create trigger scholarship_monitor_sources_touch before update on public.scholarship_monitor_sources
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_state_touch on public.scholarship_monitor_state;
create trigger scholarship_monitor_state_touch before update on public.scholarship_monitor_state
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_mode_state_touch on public.scholarship_monitor_mode_state;
create trigger scholarship_monitor_mode_state_touch before update on public.scholarship_monitor_mode_state
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_proposals_touch on public.scholarship_monitor_proposals;
create trigger scholarship_monitor_proposals_touch before update on public.scholarship_monitor_proposals
  for each row execute function public.touch_scholarship_monitor_updated_at();
drop trigger if exists scholarship_monitor_locks_touch on public.scholarship_monitor_field_locks;
create trigger scholarship_monitor_locks_touch before update on public.scholarship_monitor_field_locks
  for each row execute function public.touch_scholarship_monitor_updated_at();

alter table public.scholarship_monitor_runs enable row level security;
alter table public.scholarship_monitor_inventory enable row level security;
alter table public.scholarship_monitor_domains enable row level security;
alter table public.scholarship_monitor_sources enable row level security;
alter table public.scholarship_monitor_observations enable row level security;
alter table public.scholarship_monitor_state enable row level security;
alter table public.scholarship_monitor_mode_state enable row level security;
alter table public.scholarship_monitor_cycles enable row level security;
alter table public.scholarship_monitor_proposals enable row level security;
alter table public.scholarship_monitor_field_locks enable row level security;
alter table public.scholarship_monitor_history enable row level security;

-- Existing moderators may inspect the dark monitoring foundation. There are
-- intentionally no anonymous policies and no direct browser-write policies.
-- Service-role workers bypass RLS; Phase 2 review actions use a protected
-- server endpoint that verifies the moderator before writing.
do $$
declare
  table_name text;
  policy_name text;
begin
  foreach table_name in array array[
    'scholarship_monitor_runs',
    'scholarship_monitor_inventory',
    'scholarship_monitor_domains',
    'scholarship_monitor_sources',
    'scholarship_monitor_observations',
    'scholarship_monitor_state',
    'scholarship_monitor_mode_state',
    'scholarship_monitor_cycles',
    'scholarship_monitor_proposals',
    'scholarship_monitor_field_locks',
    'scholarship_monitor_history'
  ]
  loop
    policy_name := table_name || ': moderators read';
    execute format('drop policy if exists %I on public.%I', policy_name, table_name);
    execute format(
      'create policy %I on public.%I for select using (exists (select 1 from public.moderators m where m.user_id = auth.uid()))',
      policy_name,
      table_name
    );
  end loop;
end $$;
