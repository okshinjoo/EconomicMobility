-- Isolate consecutive failure streaks by monitoring mode and backfill them
-- from recorded observations. Safe to run again.

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
  last_error_kind text,
  last_error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (scholarship_id, monitor_mode)
);

alter table public.scholarship_monitor_mode_state
  add column if not exists last_error_kind text,
  add column if not exists last_error_message text;

drop trigger if exists scholarship_monitor_mode_state_touch on public.scholarship_monitor_mode_state;
create trigger scholarship_monitor_mode_state_touch before update on public.scholarship_monitor_mode_state
  for each row execute function public.touch_scholarship_monitor_updated_at();

alter table public.scholarship_monitor_mode_state enable row level security;
drop policy if exists "scholarship_monitor_mode_state: moderators read" on public.scholarship_monitor_mode_state;
create policy "scholarship_monitor_mode_state: moderators read"
  on public.scholarship_monitor_mode_state for select
  using (exists (select 1 from public.moderators m where m.user_id = auth.uid()));

with observations as (
  select
    id,
    scholarship_id,
    metadata->>'monitorMode' as monitor_mode,
    source_status,
    success,
    fetched_at
  from public.scholarship_monitor_observations
  where metadata->>'monitorMode' in ('status', 'candidate', 'source-health')
),
latest as (
  select distinct on (scholarship_id, monitor_mode)
    id,
    scholarship_id,
    monitor_mode,
    source_status,
    success,
    fetched_at
  from observations
  order by scholarship_id, monitor_mode, fetched_at desc, id desc
),
successes as (
  select scholarship_id, monitor_mode, max(fetched_at) as last_success_at
  from observations
  where success
  group by scholarship_id, monitor_mode
),
backfill as (
  select
    latest.scholarship_id,
    latest.monitor_mode,
    latest.source_status,
    count(observations.id) filter (
      where not observations.success
        and observations.fetched_at > coalesce(successes.last_success_at, '-infinity'::timestamptz)
    )::integer as consecutive_failures,
    latest.fetched_at as last_checked_at,
    successes.last_success_at,
    latest.id as last_observation_id
  from latest
  left join successes using (scholarship_id, monitor_mode)
  left join observations using (scholarship_id, monitor_mode)
  group by
    latest.scholarship_id,
    latest.monitor_mode,
    latest.source_status,
    latest.fetched_at,
    latest.id,
    successes.last_success_at
)
insert into public.scholarship_monitor_mode_state (
  scholarship_id,
  monitor_mode,
  source_status,
  consecutive_failures,
  last_checked_at,
  last_success_at,
  last_observation_id
)
select
  scholarship_id,
  monitor_mode,
  source_status,
  consecutive_failures,
  last_checked_at,
  last_success_at,
  last_observation_id
from backfill
on conflict (scholarship_id, monitor_mode) do update set
  source_status = excluded.source_status,
  consecutive_failures = excluded.consecutive_failures,
  last_checked_at = excluded.last_checked_at,
  last_success_at = excluded.last_success_at,
  last_observation_id = excluded.last_observation_id;

select monitor_mode, source_status, consecutive_failures, count(*) as scholarships
from public.scholarship_monitor_mode_state
group by monitor_mode, source_status, consecutive_failures
order by monitor_mode, source_status, consecutive_failures;
