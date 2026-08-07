-- Atomic moderator actions for the scholarship monitoring review queue.
-- The public Finder remains repository-backed; this function only changes
-- private monitoring state, proposal status, field locks, and history.

create or replace function public.review_scholarship_monitor_proposal(
  p_proposal_id uuid,
  p_action text,
  p_actor_user_id uuid,
  p_edited_value text default null,
  p_note text default '',
  p_lock_field boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  proposal public.scholarship_monitor_proposals%rowtype;
  previous_value jsonb;
  chosen_value jsonb;
  proposal_status text;
  history_action text;
  decision text;
begin
  if p_action not in ('accept', 'edit', 'verify', 'keep', 'reject') then
    raise exception 'Unsupported review action';
  end if;

  if not exists (
    select 1 from public.moderators where user_id = p_actor_user_id
  ) then
    raise exception 'Moderator access required';
  end if;

  select * into proposal
  from public.scholarship_monitor_proposals
  where id = p_proposal_id
  for update;

  if not found then raise exception 'Proposal not found'; end if;
  if proposal.status <> 'pending' then raise exception 'Proposal already reviewed'; end if;

  if proposal.field_name = 'applicationStatus' then
    select to_jsonb(application_status) into previous_value
    from public.scholarship_monitor_state where scholarship_id = proposal.scholarship_id;
  elsif proposal.field_name = 'opensOn' then
    select to_jsonb(opens_on) into previous_value
    from public.scholarship_monitor_state where scholarship_id = proposal.scholarship_id;
  elsif proposal.field_name = 'closesOn' then
    select to_jsonb(closes_on) into previous_value
    from public.scholarship_monitor_state where scholarship_id = proposal.scholarship_id;
  elsif proposal.field_name = 'nextOpensOn' then
    select to_jsonb(next_opens_on) into previous_value
    from public.scholarship_monitor_state where scholarship_id = proposal.scholarship_id;
  elsif proposal.field_name = 'sourceReview' then
    previous_value := proposal.current_value;
  elsif proposal.field_name = 'geo' then
    select case
      when geo_scope is null then null
      when geo_scope = 'national' then jsonb_build_object('scope', 'national')
      else jsonb_build_object('scope', 'states', 'states', to_jsonb(geo_states))
    end into previous_value
    from public.scholarship_monitor_inventory
    where scholarship_id = proposal.scholarship_id;
  else
    raise exception 'Field requires a separate curated-catalog workflow';
  end if;

  if p_action = 'edit' then
    if proposal.field_name = 'geo' then
      begin
        chosen_value := p_edited_value::jsonb;
      exception when others then
        raise exception 'Edited geography must be valid JSON';
      end;
    else
      chosen_value := to_jsonb(p_edited_value);
    end if;
  elsif p_action in ('accept', 'verify') then
    chosen_value := proposal.proposed_value;
  else
    chosen_value := previous_value;
  end if;

  if p_action in ('accept', 'edit', 'verify') and proposal.field_name = 'geo' then
    if chosen_value is null or jsonb_typeof(chosen_value) <> 'object' then
      raise exception 'Reviewed geography must be an object';
    end if;
    if chosen_value->>'scope' not in ('national', 'states') then
      raise exception 'Invalid geography scope';
    end if;
    if chosen_value->>'scope' = 'national' and chosen_value ? 'states' then
      raise exception 'National geography cannot list states';
    end if;
    if chosen_value->>'scope' = 'states' and (
      not (chosen_value ? 'states') or
      jsonb_typeof(chosen_value->'states') <> 'array' or
      jsonb_array_length(chosen_value->'states') = 0 or
      exists (
        select 1 from jsonb_array_elements_text(chosen_value->'states') as state_codes(code)
        where code !~ '^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC|PR|GU|AS|VI|MP)$'
      )
    ) then
      raise exception 'State-bound geography requires valid state codes';
    end if;

    update public.scholarship_monitor_inventory
    set geo_scope = chosen_value->>'scope',
        geo_states = case
          when chosen_value->>'scope' = 'states'
            then array(
              select distinct state_code
              from jsonb_array_elements_text(chosen_value->'states') as state_codes(state_code)
              order by state_code
            )
          else '{}'::text[]
        end,
        geo_verification_status = 'human-verified',
        geo_evidence = proposal.evidence_text,
        geo_source_url = proposal.source_url
    where scholarship_id = proposal.scholarship_id;
  elsif p_action in ('accept', 'edit', 'verify') and proposal.field_name <> 'sourceReview' then
    if chosen_value is null or jsonb_typeof(chosen_value) <> 'string' then
      raise exception 'Reviewed value must be text';
    end if;

    if proposal.field_name = 'applicationStatus' then
      if chosen_value #>> '{}' not in ('open', 'upcoming', 'closed', 'between-cycles', 'rolling', 'unknown') then
        raise exception 'Invalid application status';
      end if;
      update public.scholarship_monitor_state
      set application_status = chosen_value #>> '{}',
          verification_status = 'human-verified',
          last_verified_at = now(),
          last_changed_at = now()
      where scholarship_id = proposal.scholarship_id;
    elsif proposal.field_name = 'opensOn' then
      update public.scholarship_monitor_state
      set opens_on = (chosen_value #>> '{}')::date,
          verification_status = 'human-verified',
          last_verified_at = now(),
          last_changed_at = now()
      where scholarship_id = proposal.scholarship_id;
    elsif proposal.field_name = 'closesOn' then
      update public.scholarship_monitor_state
      set closes_on = (chosen_value #>> '{}')::date,
          verification_status = 'human-verified',
          last_verified_at = now(),
          last_changed_at = now()
      where scholarship_id = proposal.scholarship_id;
    elsif proposal.field_name = 'nextOpensOn' then
      update public.scholarship_monitor_state
      set next_opens_on = (chosen_value #>> '{}')::date,
          verification_status = 'human-verified',
          last_verified_at = now(),
          last_changed_at = now()
      where scholarship_id = proposal.scholarship_id;
    end if;
  elsif p_action = 'verify' and proposal.field_name = 'sourceReview' then
    update public.scholarship_monitor_state
    set verification_status = 'human-verified', last_verified_at = now()
    where scholarship_id = proposal.scholarship_id;
  end if;

  proposal_status := case
    when p_action = 'edit' then 'edited'
    when p_action in ('accept', 'verify') then 'accepted'
    else 'rejected'
  end;
  history_action := case when p_action = 'edit' then 'edited' when p_action in ('accept', 'verify') then 'accepted' else 'rejected' end;
  decision := case when p_action = 'keep' then 'keep-existing' else p_action end;

  update public.scholarship_monitor_proposals
  set status = proposal_status,
      reviewed_at = now(),
      reviewed_by = p_actor_user_id,
      reviewer_note = nullif(left(trim(p_note), 1000), ''),
      applied_at = case when p_action in ('accept', 'edit', 'verify') then now() else null end,
      verification_status = case when p_action in ('accept', 'edit', 'verify') then 'human-verified' else verification_status end
  where id = proposal.id;

  insert into public.scholarship_monitor_history (
    scholarship_id, proposal_id, field_name, previous_value, new_value,
    action, actor_kind, actor_user_id, source_url, evidence_text, metadata
  ) values (
    proposal.scholarship_id, proposal.id, proposal.field_name, previous_value,
    chosen_value, history_action, 'reviewer', p_actor_user_id,
    proposal.source_url, proposal.evidence_text,
    jsonb_build_object('decision', decision, 'note', left(trim(p_note), 1000), 'fieldLocked', p_lock_field)
  );

  if p_lock_field then
    insert into public.scholarship_monitor_field_locks (
      scholarship_id, field_name, locked_value, reason, locked_by
    ) values (
      proposal.scholarship_id, proposal.field_name, chosen_value,
      coalesce(nullif(left(trim(p_note), 1000), ''), 'Locked during proposal review'),
      p_actor_user_id
    )
    on conflict (scholarship_id, field_name) do update
    set locked_value = excluded.locked_value,
        reason = excluded.reason,
        locked_by = excluded.locked_by,
        locked_at = now();

    insert into public.scholarship_monitor_history (
      scholarship_id, proposal_id, field_name, previous_value, new_value,
      action, actor_kind, actor_user_id, source_url, evidence_text, metadata
    ) values (
      proposal.scholarship_id, proposal.id, proposal.field_name, previous_value,
      chosen_value, 'locked', 'reviewer', p_actor_user_id,
      proposal.source_url, proposal.evidence_text,
      jsonb_build_object('reason', coalesce(nullif(left(trim(p_note), 1000), ''), 'Locked during proposal review'))
    );
  end if;

  return jsonb_build_object(
    'proposalId', proposal.id,
    'scholarshipId', proposal.scholarship_id,
    'fieldName', proposal.field_name,
    'status', proposal_status,
    'decision', decision,
    'fieldLocked', p_lock_field
  );
end;
$$;

revoke all on function public.review_scholarship_monitor_proposal(uuid, text, uuid, text, text, boolean) from public;
revoke all on function public.review_scholarship_monitor_proposal(uuid, text, uuid, text, text, boolean) from anon;
revoke all on function public.review_scholarship_monitor_proposal(uuid, text, uuid, text, text, boolean) from authenticated;
grant execute on function public.review_scholarship_monitor_proposal(uuid, text, uuid, text, text, boolean) to service_role;
