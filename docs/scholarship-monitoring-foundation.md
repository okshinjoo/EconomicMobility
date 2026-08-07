# Scholarship monitoring foundation

Status: Phases 1–3 implemented and applied to the production Supabase
project on August 7, 2026. Geography extraction and publication guards were
added the same day. The live seed contains the complete curated Finder
inventory plus any private, withheld intake records. Counts are reported by
every seed and alert run rather than being hard-coded here.

This system applies only to the individual awards in Empower's curated
Scholarship Finder. It never imports, monitors, or publishes records from the
separate **More places to search** launcher section.

## What Phase 1 provides

- An idempotent Supabase schema in `docs/scholarship-monitor-schema.sql`.
- A deterministic inventory generated from the actual curated `scholarships`
  export.
- One official source per inventory record, ready for richer source adapters.
- Tables for runs, domains, sources, observations, current state, recurring
  cycles, field-level proposals, manual locks, and immutable history.
- No anonymous database policies and no direct browser-write policies.
- A central fail-closed auto-apply policy. Amount, eligibility, geography,
  stage, URLs, program status, and publication decisions always require review.
- A staged-candidate intake in `data/scholarship-monitor-candidates.json`.
  Candidate records are monitored while withheld and never enter the Finder
  merely because the monitor found them.

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

The seed is additive and idempotent. Published rows carry their verified
national/state classification, official source, and evidence. It does not delete database rows missing
from the current catalog; those require review so a sync can never silently
remove or discontinue a scholarship.

## Repository checks

- `npm run build:scholarship-monitor-inventory` regenerates the inventory.
- `npm run check:scholarship-monitor-inventory` fails if the catalog and
  generated inventory differ.
- `npm run test:scholarship-monitor-foundation` verifies that risky or
  ambiguous proposals fail closed.
- `npm run build` begins with the full classification integrity gate. A newly
  curated record with missing or unverified geography cannot deploy.

## Phase 2 official-source monitoring

Monitoring covers every curated scholarship and every private withheld intake
record across their official hosts.
The two monitoring tiers stay deliberately separate:

- 75 scholarship-specific adapters in `scripts/scholarship-status-sources.json`
  can propose status and exact date changes when the official page supplies
  matching evidence.
- The remaining 1,145 official URLs receive weekly source-health checks. They
  record availability, redirects, login walls, content fingerprints, and
  failures, but never infer application status or dates.
- Those same 1,145 records also receive a separate weekly exact-evidence scan.
  It can propose a full date only when the current official page ties that date
  to explicit deadline or opening language and the page matches the scholarship
  identity. Generic matches are always review-required, never auto-applied.
  Language such as “typically,” “usually,” “expected,” “around,” or “to be
  announced” is rejected rather than converted into a date.
- Every fetched official page also receives conservative geography extraction.
  It proposes only an explicit nationwide statement or a hard applicant
  residency rule with named states. School locations, event locations,
  citizenship, preferences, work-service commitments, sponsor names, county
  names, navigation text, unlisted regions, cross-domain redirects, and
  conflicting language never become geography proposals. Shared award pages
  are scoped to the heading for the named scholarship before evidence can be
  used. Every geography proposal is high-risk and requires moderator approval;
  none can auto-apply.

The scheduled workers:

- fetch only curated official program pages, never external directories;
- uses conditional request headers when the source supplies them;
- limits concurrency to four and spaces requests to the same domain;
- retry transient failures; status/candidate adapters and source-health checks
  that hit a JavaScript challenge or thin shell can retry in a browser;
- writes append-only observations and deduplicated field-level proposals;
- update only operational health fields in `scholarship_monitor_state`; and
- never change application status, dates, eligibility, or the public Finder.

The daily status workflow runs the 75 evidence-specific adapters. The weekly
source-health workflow splits the other 1,145 records into eight deterministic
host-based shards, so requests to one host remain serialized. A source-health
failure must persist for three runs before an actionable not-found, server,
redirect, login-wall, or thin-document review can enter the moderation queue.
The weekly exact-evidence candidate workflow also runs in eight shards and
creates only private, medium-risk review proposals; it never creates source
failure proposals and never changes the public Finder.
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

Geography review has a dedicated National / Specific states control. An
accepted decision stores the verified scope, state codes, official source, and
evidence on the private inventory row. A database trigger rejects any attempt
to mark a row `published` unless those fields are human-verified and complete.
The repository build gate independently enforces the same rule for the actual
Finder, so database and deployment paths both fail closed.

`/admin/scholarships/new` is the private intake for future scholarships. It
accepts only a name, optional sponsor, and the sponsor's official program URL.
Every submitted record is created as `withheld` with unverified geography and
is added to the weekly candidate and source-health monitors. The monitor may
create evidence proposals, but it cannot publish the record. Human-verified
official-source geography is a hard prerequisite for later curation.

`/admin/scholarships/promotions` is the controlled handoff from monitoring to
repository curation. A candidate cannot prepare a catalog packet unless its
geography is human-verified with official-source evidence, its latest source
observation is healthy, and it has no pending evidence proposals. The protected
server route rechecks all three gates, rejects duplicate catalog IDs and source
URLs, and returns a catalog record, geography overlay, and provenance record.
It never writes to the public catalog or changes `publication_status`; the
packet still requires repository review, classification checks, and deployment
tests before the Finder can change.

The daily `scholarship-monitor-alerts.yml` audit reports every withheld record,
fails after a record has waited 14 days, and fails immediately for three
consecutive actionable source failures, stale geography, or any published row
that lacks complete verified geography. GitHub workflow annotations and the
run summary identify the affected scholarship IDs.

`/api/scholarship-status` is the narrow publication bridge. It returns only
human-verified application state for IDs that still exist in the curated
repository catalog. The Finder consumes this after its first render and uses
it in preference to the older month-based season estimate. Machine proposals,
source evidence, reviewer identities, notes, locks, and unverified state never
leave the private monitoring system. If the service is unavailable, the route
returns no monitored statuses rather than exposing uncertain data.
