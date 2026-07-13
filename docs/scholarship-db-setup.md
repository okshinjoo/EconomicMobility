# Scholarship database go-live (CareerOneStop) — STATUS July 13, 2026

**Approved.** Credentials received (stored in the owner's passwords doc).
Agreement expires **7/13/2029** (renewal required; put it in the calendar).
Terms to honor when any of their services ship: public, free, no login
required, and their logo displayed on pages using their Web API tools.

**Blocker found by direct testing:** the token authenticates fine (verified
against their techtool service), but the CURRENT Web API catalog (all 41
services enumerated from api.careeronestop.org/api-explorer) contains NO
scholarship service — every plausible /v1/scholarship* path 404s. Their
Scholarship Finder exists only as a website tool today.

**Next step (in flight):** owner replied to Kelly Tenner (Outreach Manager,
their approval email thread) asking whether scholarship data is available
via API or bulk download. Outcomes:
- They provide an endpoint/bulk file -> set CAREERONESTOP_USER_ID,
  CAREERONESTOP_TOKEN (+ CAREERONESTOP_SCHOLARSHIP_PATH if a nonstandard
  path) in Vercel (Production+Preview, Sensitive), adjust the route's field
  mapping to the real response shape, add their logo to the DB section,
  redeploy.
- No API access -> add CareerOneStop's scholarship search as a launcher
  card next to BigFuture and retire the /api/scholarships route.

**Do NOT set the Vercel env vars until an endpoint is confirmed** — the
page section gates on their presence and would render a search box that
can only error.

The keys DO work for their other services (training, certifications,
salaries, occupations — jobs data goes through NLx separately per their
email). Potential future use: real salary data in Reality Check.
