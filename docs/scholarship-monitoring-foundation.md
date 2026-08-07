# Scholarship monitoring foundation

Status: Phase 1 implemented and applied to the production Supabase project on
August 7, 2026; public Finder unchanged. The live seed contains 1,220 curated
inventory rows, 1,220 active official sources, and 1,220 current-state rows.

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

## Next phase

Convert the preserved 37-source prototype into a worker that writes
observations and proposals to this schema. Run it in observation-only mode;
then build the moderator review actions before any monitored status is shown
publicly.
