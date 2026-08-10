-- Atomic final step for the private Scholarship Finder publication workflow.
-- Apply once in Supabase. Only the service role may execute it.

create or replace function public.finalize_scholarship_promotion(
  p_candidate_id text,
  p_public_record jsonb,
  p_commit_sha text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  candidate_row public.scholarship_monitor_inventory%rowtype;
  state_row public.scholarship_monitor_state%rowtype;
  public_id text := p_public_record ->> 'scholarshipId';
  official_url text := p_public_record ->> 'officialUrl';
  geo_scope_value text := p_public_record #>> '{geo,scope}';
  geo_states_value text[];
  active_source_count integer;
begin
  if p_candidate_id !~ '^candidate-' or public_id !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then
    raise exception 'Invalid scholarship promotion identifiers';
  end if;
  if p_public_record ->> 'publicationStatus' <> 'published' then
    raise exception 'The destination record must be published';
  end if;

  select * into candidate_row
  from public.scholarship_monitor_inventory
  where scholarship_id = p_candidate_id
  for update;
  if candidate_row.scholarship_id is null then raise exception 'Candidate not found'; end if;

  if candidate_row.publication_status = 'duplicate' and exists (
    select 1 from public.scholarship_monitor_inventory
    where scholarship_id = public_id and publication_status = 'published'
  ) then
    return jsonb_build_object('publishedId', public_id, 'candidateId', p_candidate_id, 'idempotent', true);
  end if;
  if candidate_row.publication_status <> 'withheld' then raise exception 'Candidate is not withheld'; end if;
  if candidate_row.official_url <> official_url then raise exception 'Official source changed after publication review'; end if;
  if candidate_row.geo_verification_status <> 'human-verified'
    or candidate_row.geo_scope is null
    or nullif(trim(coalesce(candidate_row.geo_evidence, '')), '') is null
    or candidate_row.geo_source_url is null then
    raise exception 'Verified geography is required';
  end if;
  if geo_scope_value is distinct from candidate_row.geo_scope then raise exception 'Packet geography does not match the verified candidate'; end if;

  if exists (
    select 1 from public.scholarship_monitor_inventory
    where scholarship_id = public_id and official_url <> candidate_row.official_url
  ) then raise exception 'The public scholarship ID belongs to another source'; end if;
  if exists (
    select 1 from public.scholarship_monitor_inventory
    where official_url = candidate_row.official_url and scholarship_id not in (p_candidate_id, public_id)
  ) then raise exception 'The official source is already registered under another scholarship'; end if;
  if exists (
    select 1 from public.scholarship_monitor_proposals
    where scholarship_id = p_candidate_id and status = 'pending'
  ) then raise exception 'Evidence proposals remain unresolved'; end if;
  if not coalesce((
    select observation.success and observation.source_status = 'healthy'
    from public.scholarship_monitor_observations observation
    join public.scholarship_monitor_sources source on source.id = observation.source_id
    where observation.scholarship_id = p_candidate_id
      and source.source_kind = 'official'
      and source.url = candidate_row.official_url
    order by observation.fetched_at desc
    limit 1
  ), false) then raise exception 'The latest official source is not verified healthy'; end if;

  select * into state_row
  from public.scholarship_monitor_state
  where scholarship_id = p_candidate_id;
  if state_row.scholarship_id is null
    or state_row.verification_status <> 'human-verified'
    or state_row.source_status <> 'healthy'
    or state_row.application_status = 'unknown'
    or state_row.last_verified_at is null then
    raise exception 'Human-verified application status is required';
  end if;
  if state_row.application_status <> 'rolling' and state_row.closes_on is null then
    raise exception 'An exact official deadline is required';
  end if;

  geo_states_value := case when geo_scope_value = 'states' then
    array(select jsonb_array_elements_text(coalesce(p_public_record #> '{geo,states}', '[]'::jsonb)))
  else '{}'::text[] end;

  insert into public.scholarship_monitor_inventory (
    scholarship_id, name, sponsor, official_url, source_domain,
    publication_status, monitor_enabled, monitor_cadence, next_check_at,
    catalog_fingerprint, catalog_verified_label,
    geo_scope, geo_states, geo_verification_status, geo_evidence, geo_source_url
  ) values (
    public_id,
    p_public_record ->> 'name',
    candidate_row.sponsor,
    official_url,
    p_public_record ->> 'sourceDomain',
    'published', true, 'weekly', null,
    p_public_record ->> 'catalogFingerprint',
    p_public_record ->> 'catalogVerifiedLabel',
    geo_scope_value, geo_states_value, 'human-verified',
    p_public_record ->> 'geoEvidence',
    p_public_record ->> 'geoSourceUrl'
  )
  on conflict (scholarship_id) do update set
    name = excluded.name,
    sponsor = excluded.sponsor,
    official_url = excluded.official_url,
    source_domain = excluded.source_domain,
    publication_status = 'published',
    monitor_enabled = true,
    monitor_cadence = 'weekly',
    next_check_at = null,
    catalog_fingerprint = excluded.catalog_fingerprint,
    catalog_verified_label = excluded.catalog_verified_label,
    geo_scope = excluded.geo_scope,
    geo_states = excluded.geo_states,
    geo_verification_status = 'human-verified',
    geo_evidence = excluded.geo_evidence,
    geo_source_url = excluded.geo_source_url;

  insert into public.scholarship_monitor_sources (
    scholarship_id, source_kind, url, source_domain, priority, active,
    extraction_strategy, extractor_config, expected_signatures
  )
  select public_id, source_kind, url, source_domain, priority, true,
    extraction_strategy, extractor_config, expected_signatures
  from public.scholarship_monitor_sources
  where scholarship_id = p_candidate_id
  on conflict (scholarship_id, source_kind, url) do update set
    source_domain = excluded.source_domain,
    priority = excluded.priority,
    active = true,
    extraction_strategy = excluded.extraction_strategy,
    extractor_config = excluded.extractor_config,
    expected_signatures = excluded.expected_signatures;

  insert into public.scholarship_monitor_state (
    scholarship_id, application_status, program_status, source_status,
    extraction_confidence, verification_status, opens_on, closes_on,
    next_opens_on, cycle_label, last_checked_at, last_verified_at,
    last_changed_at, consecutive_failures, last_good_observation_id
  ) values (
    public_id, state_row.application_status, state_row.program_status, state_row.source_status,
    state_row.extraction_confidence, state_row.verification_status, state_row.opens_on, state_row.closes_on,
    state_row.next_opens_on, state_row.cycle_label, state_row.last_checked_at, state_row.last_verified_at,
    state_row.last_changed_at, state_row.consecutive_failures, null
  )
  on conflict (scholarship_id) do update set
    application_status = excluded.application_status,
    program_status = excluded.program_status,
    source_status = excluded.source_status,
    extraction_confidence = excluded.extraction_confidence,
    verification_status = excluded.verification_status,
    opens_on = excluded.opens_on,
    closes_on = excluded.closes_on,
    next_opens_on = excluded.next_opens_on,
    cycle_label = excluded.cycle_label,
    last_checked_at = excluded.last_checked_at,
    last_verified_at = excluded.last_verified_at,
    last_changed_at = excluded.last_changed_at,
    consecutive_failures = excluded.consecutive_failures,
    last_good_observation_id = null;

  insert into public.scholarship_monitor_history (
    scholarship_id, field_name, previous_value, new_value, action,
    actor_kind, source_url, evidence_text, metadata
  ) values (
    public_id, 'inventory', null,
    jsonb_build_object('publicationStatus', 'published', 'sourceCandidateId', p_candidate_id),
    'inventory-sync', 'system', official_url,
    'Published after repository tests and production deployment verification passed.',
    jsonb_build_object('publicationCleanup', true, 'sourceCandidateId', p_candidate_id, 'commit', p_commit_sha)
  );

  update public.scholarship_monitor_inventory set
    publication_status = 'duplicate', monitor_enabled = false,
    monitor_cadence = 'manual', next_check_at = null
  where scholarship_id = p_candidate_id;
  update public.scholarship_monitor_sources set active = false
  where scholarship_id = p_candidate_id;

  insert into public.scholarship_monitor_history (
    scholarship_id, field_name, previous_value, new_value, action,
    actor_kind, source_url, evidence_text, metadata
  ) values (
    p_candidate_id, 'publication_status', '"withheld"'::jsonb, '"duplicate"'::jsonb,
    'inventory-sync', 'system', official_url,
    'Temporary staging record retired after verified publication.',
    jsonb_build_object('publicationCleanup', true, 'publicScholarshipId', public_id, 'commit', p_commit_sha)
  );

  select count(*) into active_source_count
  from public.scholarship_monitor_sources
  where scholarship_id = public_id and active;
  return jsonb_build_object(
    'publishedId', public_id,
    'candidateId', p_candidate_id,
    'activeSources', active_source_count,
    'applicationStatus', state_row.application_status,
    'closesOn', state_row.closes_on,
    'idempotent', false
  );
end;
$$;

revoke all on function public.finalize_scholarship_promotion(text, jsonb, text) from public;
revoke all on function public.finalize_scholarship_promotion(text, jsonb, text) from anon;
revoke all on function public.finalize_scholarship_promotion(text, jsonb, text) from authenticated;
grant execute on function public.finalize_scholarship_promotion(text, jsonb, text) to service_role;
