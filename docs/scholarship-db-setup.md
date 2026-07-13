# Scholarship database go-live (CareerOneStop)

The Scholarship Finder's "Search the full national database" section is
BUILT and inert. It appears on /students/scholarships automatically once
two environment variables exist in Vercel. Three steps:

## 1. Register (free, one time)

1. Go to careeronestop.org → scroll to the footer → **Web API** (or visit
   `/Developers/WebAPI/registration.aspx`).
2. Fill in the request form: your name, `Help@economicmobilityproject.org`,
   organization "Empower — Economic Mobility Project", and for intended use
   say something honest and simple: "Free financial-education site for
   first-generation and low-income students; we want to offer scholarship
   search on our students page."
3. Submit. Approval usually arrives by EMAIL within a couple of business
   days, containing your **User ID** and **API Token**. Save both in the
   password doc with the other keys.
4. The welcome email lists which API services your account can call. Find
   the scholarship service and note its exact path shape. If it is NOT
   `/v1/scholarshipfinder/{userId}/{keyword}/...`, that's fine — step 2
   has an override for it.

## 2. Add the keys to Vercel

Vercel → the site project → Settings → Environment Variables. Add, exactly
like the Anthropic key (Production + Preview, Sensitive: yes, NOT
NEXT_PUBLIC, skip Development):

- `CAREERONESTOP_USER_ID` — the User ID from the email
- `CAREERONESTOP_TOKEN` — the API Token from the email
- `CAREERONESTOP_SCHOLARSHIP_PATH` — ONLY if the welcome email shows a
  different path for scholarships. Use `{userId}`, `{keyword}`, `{limit}`
  placeholders, e.g. `/v1/scholarshipfinder/{userId}/{keyword}/0/{limit}`.

## 3. Redeploy and test

1. Deployments → ⋯ on the latest → Redeploy (env changes need a fresh
   deploy — same as always).
2. Open /students/scholarships on the live site. The "Search the full
   national database" section should now exist below the curated list.
3. Search something broad ("nursing"). Results = done. An error message =
   check the two env names for typos first, then whether the welcome email
   named a different path (set the override, redeploy).

Until step 2 happens, the site is unchanged: the curated list stands alone
and nothing broken is visible anywhere.
