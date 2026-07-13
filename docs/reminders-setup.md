# Email deadline reminders — go-live steps

Built July 2026, ships inert. The signup band appears on /students and
reminders start flowing once THREE things exist. (Text/SMS deliberately
not built: carrier registration + TCPA consent + per-message costs are the
wrong burden for a solo operation with minors in the audience.)

## 1. Run the SQL block (2 minutes)

Supabase → SQL Editor → New query → paste the EMAIL DEADLINE REMINDERS
block from the end of docs/supabase-schema.sql → Run. ("Success. No rows
returned" = done.) Both tables are service-role only; the public site
can't read them.

## 2. Create a Resend API key (3 minutes)

1. Sign in at resend.com (the account that already sends the site's
   Supabase auth emails).
2. First check Domains: economicmobilityproject.org should show VERIFIED
   (it already sends auth mail). If it's there, skip to step 3.
3. API Keys → Create API key. Name: "empower-reminders". Permission:
   "Sending access" is enough. Copy the key immediately (shown once, same
   as Anthropic) into the passwords doc.

## 3. Vercel env vars + redeploy

Settings → Environment Variables (Production + Preview, Sensitive: yes):

- `RESEND_API_KEY` — from step 2
- `REMINDERS_FROM` — optional; defaults to
  "Empower <reminders@economicmobilityproject.org>". The address part must
  be on the verified domain. (reminders@ doesn't need to be a real inbox —
  replies aren't expected — but creating the alias means replies land
  somewhere humane.)
- `CRON_SECRET` — optional but recommended: any long random string.
  Vercel automatically sends it with cron requests; the send route then
  rejects strangers.

Redeploy. The signup band appears on /students on its own.

## How sending works (no action needed)

- The daily cron (vercel.json, 13:00 UTC) hits /api/reminders/send.
- Each deadline in lib/deadlines sends ONCE per year, starting the 15th of
  the month before it (FAFSA Oct 1 -> from Sept 15; tax day Apr 15 ->
  from Mar 15). reminder_sends records every send, so nothing ever mails
  twice.
- Every email: one deadline, its date, its why, a Read-the-guide button,
  and a one-click unsubscribe link. Content comes only from lib/deadlines.
- "Occasional money tips" is a stored preference only for now — no
  automated tips sender exists. When there's something worth saying, we
  write it deliberately (a future manual-send script or dashboard).

## Test after go-live

1. Subscribe your own email on /students.
2. Visit /api/reminders/send in the browser WITH the CRON_SECRET as a
   bearer header (or temporarily without CRON_SECRET set): the JSON report
   shows which deadlines were due/skipped. Mid-July: expect everything
   "not due" until Sept 15 — that's correct.
3. Row visible in Supabase → Table Editor → reminder_subscribers = the
   signup path works end to end.
