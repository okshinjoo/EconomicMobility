-- Preserve the latest monitor failure reason so moderators can distinguish
-- an inaccessible official site from a conclusive source problem. Safe to rerun.

alter table public.scholarship_monitor_mode_state
  add column if not exists last_error_kind text,
  add column if not exists last_error_message text;

update public.scholarship_monitor_mode_state as mode_state
set
  last_error_kind = case when observation.success then null else observation.error_kind end,
  last_error_message = case when observation.success then null else observation.error_message end
from public.scholarship_monitor_observations as observation
where observation.id = mode_state.last_observation_id
  and (
    mode_state.last_error_kind is distinct from case when observation.success then null else observation.error_kind end
    or mode_state.last_error_message is distinct from case when observation.success then null else observation.error_message end
  );

select source_status, consecutive_failures, last_error_kind, count(*) as scholarships
from public.scholarship_monitor_mode_state
where monitor_mode = 'source-health'
group by source_status, consecutive_failures, last_error_kind
order by source_status, consecutive_failures, last_error_kind;
