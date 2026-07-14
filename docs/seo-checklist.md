# Getting Empower found — the visibility checklist

The site is live, the sitemap is valid (500+ URLs at
`/sitemap.xml`), and `robots.ts` lets crawlers in. What's left is (1) telling
search engines to come look, and (2) earning enough trust to rank. The code
in this repo handles the on-page half; the items marked **[you]** are account
setups and outreach only the owner can do — and they're the highest-leverage
work of all.

## Step zero — is it an indexing problem or a ranking problem?

Search Google for exactly: `site:economicmobilityproject.org`

- **Pages show up** → you're indexed; "nobody finds us" is a *ranking* issue
  (new domain, low authority). Fix = backlinks + time (see Distribution).
- **Nothing shows** → you're *not indexed yet*. Fix = submit via Search
  Console and request indexing (below).

## Tell search engines to crawl — do today **[you]**

1. **Google Search Console** (search.google.com/search-console) — free.
   - Add the property (Domain type is best; needs one DNS TXT record).
   - Submit `https://economicmobilityproject.org/sitemap.xml`.
   - Use **URL Inspection → Request indexing** on the homepage and your top
     ~10 pages (the topic hubs, /students, /students/scholarships, the
     highest-value guides). Rate-limited to a handful a day.
   - Check **Pages** (coverage) after a few days: how many of the 500+ URLs
     are indexed, and why any are excluded.
2. **Bing Webmaster Tools** (bing.com/webmasters) — free, 10 minutes. You can
   import straight from Search Console. Submit the sitemap. Bing's index also
   feeds DuckDuckGo and some AI search, and its URL-submission quota is more
   generous than Google's.

What these do: they *accelerate crawling/indexing* (the "Google hasn't
looked yet" delay). They do **not** improve ranking — no button does.

## On-page SEO — shipped in code (July 2026)

- **Structured data (JSON-LD)** via `components/JsonLd` + `lib/structuredData`:
  Organization + WebSite (homepage), Article + BreadcrumbList (every guide),
  Course (course pages), BlogPosting with real dates (blog), FAQPage (/ask).
  Test with Google's Rich Results Test after deploy.
- **Social share image**: `app/opengraph-image.tsx` (branded 1200×630) — every
  shared link now shows a preview card. Verify with the Facebook Sharing
  Debugger / X Card Validator / LinkedIn Post Inspector after deploy.
- **Metadata**: `metadataBase` + Open Graph + per-page titles/descriptions
  already in place; inner pages self-brand their titles.
- **Sitemap** (`app/sitemap.ts`) regenerates from the content libs — new
  articles/courses/scholarship-finder land in it automatically. `BASE` is the
  one hardcoded value; change it if the domain ever changes.

### Still to build (code)
- **Scholarship landing pages** — individual awards aren't indexable pages
  today; scholarship queries are huge long-tail volume. Turn the finder's
  filters (by audience / state / undocumented-friendly) into real indexable
  pages. Biggest content-SEO opportunity; do it once the DB stops churning.
- **Search-intent title tuning** — the guides already answer real questions;
  make sure titles phrase them the way people type them.
- **A `/search` results page** would let us add a WebSite SearchAction
  (sitelinks search box) — skipped for now since search is a ⌘K dialog only.

## Distribution — the real lever **[you]**

New domains rank slowly no matter how clean the SEO. For THIS audience the
fastest visibility is referrals + `.edu`/`.org` backlinks from the people who
already serve these students:

- Send the drafted partnership emails in `docs/outreach-emails.md` to: high
  school counselors, TRIO / Upward Bound / GEAR UP programs, community-college
  financial-aid offices, public libraries, and immigrant-serving nonprofits.
  Each partnership gives you *both* the right visitors and an authority
  backlink.
- Ask partners to link to a specific useful page (a guide, the scholarship
  finder), not just the homepage — deep links help those pages rank.
- Community presence where the audience already is (relevant subreddits,
  counselor Facebook groups, TikTok) — share a genuinely useful guide, not a
  homepage plug.

Rule of thumb: **Search Console gets you onto the map and shows your position;
backlinks and content are what move you up it.**
