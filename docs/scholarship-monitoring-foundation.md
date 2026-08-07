# Scholarship monitoring foundation

Status: Phases 1 and 2 implemented and applied to the production Supabase
project on August 7, 2026; public Finder unchanged. The live seed contains
1,220 curated inventory rows, 1,220 active official sources, and 1,220
current-state rows.

This system applies only to the individual awards in Empower's curated
Scholarship Finder. It never imports, monitors, or publishes records from the
separate **More places to search** launcher section.

## What Phase 1 provides

- An idempotent Supabase schema in `docs/scholarship-monitor-schema.sql`.
- A deterministic inventory generated from the actual curated `scholarships`
  export, currently 1,220 published records.
- One official source per inventory record, ready for richer source adapters.
- Tables for runs, domains, sources, observations, current state, recurring
  cycles, field-level proposals, manual locks, and immutable history.
- No anonymous database policies and no direct browser-write policies.
- A central fail-closed auto-apply policy. Amount, eligibility, geography,
  stage, URLs, program status, and publication decisions always require review.

The repository catalog remains authoritative in this phase. The database is an
operational mirror and review foundation; the public Finder does not read it.

## Prepare the database

1. Apply `docs/scholarship-monitor-schema.sql` in the existing Supabase SQL
   editor. The schema reuses the existing `moderators` table for read access.
2. Confirm `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are
   available only to the trusted worker environment.
3. Preview the seed:

   `npm run seed:scholarship-monitor`

4. Apply the seed:

   `npm run seed:scholarship-monitor -- --write`

The seed is additive and idempotent. It does not delete database rows missing
from the current catalog; those require review so a sync can never silently
remove or discontinue a scholarship.

## Repository checks

- `npm run build:scholarship-monitor-inventory` regenerates the inventory.
- `npm run check:scholarship-monitor-inventory` fails if the catalog and
  generated inventory differ.
- `npm run test:scholarship-monitor-foundation` verifies that risky or
  ambiguous proposals fail closed.

## Phase 2 official-source monitoring

Monitoring now covers all 1,220 curated scholarships across 792 official hosts.
The two monitoring tiers stay deliberately separate:

- 75 scholarship-specific adapters in `scripts/scholarship-status-sources.json`
  can propose status and exact date changes when the official page supplies
  matching evidence.
- The remaining 1,145 official URLs receive weekly source-health checks. They
  record availability, redirects, login walls, content fingerprints, and
  failures, but never infer application status or dates.

The scheduled workers:

- fetch only curated official program pages, never external directories;
- uses conditional request headers when the source supplies them;
- limits concurrency to four and spaces requests to the same domain;
- retry transient failures; only the 41 source-specific adapters use a browser fallback;
- writes append-only observations and deduplicated field-level proposals;
- update only operational health fields in `scholarship_monitor_state`; and
- never change application status, dates, eligibility, or the public Finder.

The daily status workflow runs the 75 evidence-specific adapters. The weekly
source-health workflow splits the other 1,145 records into eight deterministic
host-based shards, so requests to one host remain serialized. A source-health
failure must persist for three runs before an actionable not-found, server,
redirect, login-wall, or thin-document review can enter the moderation queue.
Bot blocks, rate limits, and generic timeouts remain operational telemetry and
do not flood reviewers.

Run the deterministic worker tests with
`npm run test:scholarship-monitor-worker`. Preview status extraction without
database writes with `npm run monitor:scholarships -- --mode=status --limit=3`.
Preview one full-catalog shard with
`npm run monitor:scholarships -- --summary-only --mode=source-health --shard-index=0 --shard-count=8`.
The GitHub
Actions workflow requires repository secrets named `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` before its first manual or scheduled run.

The first production observation run completed on August 7, 2026. The
full-catalog source-health expansion was added the same day after an eight-shard
dry run covered all 1,179 remaining records. The encrypted workflow credentials
are configured.

## Phase 3 moderator review

Apply `docs/scholarship-monitor-review.sql` to install the atomic review
function. Only the service role can execute it; anonymous and ordinary
authenticated roles cannot. The protected server route independently verifies
the signed-in user and their `moderators` row before calling the function.

Moderators can bookmark `/admin/scholarships` to compare current and proposed
values with exact official-source evidence. Accept, edit, verify, keep-current,
reject, and optional field-lock decisions update the private monitor state and
append immutable history in one database transaction. These actions do not
edit `lib/scholarships.ts` or the public Finder.

`/api/scholarship-status` is the narrow publication bridge. It returns only
human-verified application state for IDs that still exist in the curated
repository catalog. The Finder consumes this after its first render and uses
it in preference to the older month-based season estimate. Machine proposals,
source evidence, reviewer identities, notes, locks, and unverified state never
leave the private monitoring system. If the service is unavailable, the route
returns no monitored statuses rather than exposing uncertain data.
