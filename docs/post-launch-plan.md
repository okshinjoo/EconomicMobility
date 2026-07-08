# Post-Launch Plan

Written July 2026, just before first deploy. Order of operations for the three
features deliberately deferred past launch, plus the launch checklist itself.
The guiding rule from day one still applies: **accounts stay optional and never
gate content** — the brand promises no sign-up walls.

---

## 0. Launch checklist (do these at deploy)

- [ ] Host on **Vercel** (or any Node host). Not a static export — the chat
      API route (phase 1) needs a server.
- [ ] **Web3Forms key**: get a free access key at web3forms.com tied to
      `Help@economicmobilityproject.org` and paste it into the
      `WEB3FORMS_ACCESS_KEY` constant in `components/AskQuestion.tsx` and the
      matching constant in `components/CommunityFeed.tsx`. Until then both
      forms run in preview mode (confirm to the visitor, send nowhere).
- [ ] **Domain**: if the final domain differs from
      `economicmobilityproject.org`, update `BASE` in `app/sitemap.ts`.
- [ ] Post-deploy smoke test: homepage, one article (glossary popovers), the
      quiz end-to-end, one calculator, /resources state finder, 404 page,
      ⌘K search, mobile nav.

## 1. AI chatbot — days after launch (≈1 day of work)

**Why first:** ~90% built, zero dependencies, biggest UX lift.

Already in the repo:
- `app/api/chat/route.ts` — Node route: retrieves top guide matches via
  `rankItems`, asks Claude (Haiku) to answer **using only that context**,
  returns `{reply, sourceHrefs[]}`. Guardrails baked in: short answers, no
  individualized legal/tax/immigration advice, no invented numbers, routes to
  free help. Returns 503 until configured.
- `components/ChatLauncher.tsx` — the floating "Ask" panel, currently running
  the retrieval-only guide (`lib/guide.ts`). Falls back to that guide
  automatically if the API errors or caps out, so the feature can never break.
- Setup steps: `docs/ai-chat-setup.md` (get key → set `ANTHROPIC_API_KEY` →
  set `AI_ENDPOINT = "/api/chat"` in ChatLauncher).

To do at turn-on:
- [ ] Set a **hard spend cap** on the API key. Public chatbot, fixed ceiling.
- [ ] Add basic per-IP rate limiting on the route (Vercel middleware or
      Upstash) before announcing it anywhere.
- [ ] Watch the first week of real questions — they're free product research:
      recurring questions that retrieval misses become new guides or Q&As.

## 2. Accounts + profile insights — the following weeks

**Why second:** insights need a bit of usage history to be worth showing, and
live comments (phase 3) need auth to exist first.

The plan already written: `docs/auth-plan.md` (Supabase). The key design:
- Optional accounts. Every feature keeps working logged-out, on localStorage,
  exactly as today.
- **On first login, sync the local snapshots INTO the account** — read
  articles, quiz result, calculator inputs, course/challenge badges, article
  quiz scores, visited tools, blog reads. All of it already lives under
  versioned `empower:*` keys (see `lib/storage.ts`), and
  `components/DataBackup.tsx` proves the export path works. Nothing is lost,
  nobody starts over.
- Ship auth + sync first. Then the fast follow:
- **Profile insights page**, built entirely from synced data the site already
  collects: topics read vs. quiz goals, budget leftover (via
  `readBudgetSummary`), streaks of reading, badges earned, "your next goal"
  suggestions reusing the same recommendation logic as WelcomeBack/quiz
  results. No new tracking needed — it's a presentation layer over existing
  memory.

## 3. Live comments — last, when there's moderation capacity

**Why last:** it depends on accounts (identity + rate limiting), and it's the
only feature with real abuse risk. This site's audience is exactly who
financial scammers target; an instantly-public comment box on a trusted money
site will attract "DM me about an investment" within weeks.

Recommended shape (not fully-live):
- Comments require a logged-in account (phase 2).
- **New accounts stay review-first** (the current Web3Forms moderation flow,
  which keeps working today with zero backend). After ~3 approved comments,
  an account graduates to post-instantly.
- Keep the honesty rule from `lib/communityFeed.ts`: no invented members, no
  fake counts, likes stay personal-only until counts are real.
- Supabase tables + RLS per `docs/auth-plan.md`; add a report button and a
  single "hide" switch for moderators from day one.

**No urgency:** the moderated community works now. Ship this only when
someone can actually review the queue every day or two.

---

## Standing maintenance (calendar these)

- **Every July 1:** federal student loan rates reset (`6.52%` for 2026–27
  appears in articles, courses, glossary, and `lib/collegeCost.ts`).
- **Every fall (IRS announcements):** new-year figures — brackets and FICA
  wage base in `lib/taxData.ts`, 401(k)/IRA/HSA limits, standard deduction,
  EITC (articles, glossary, quizzes, `lib/rothIra.ts`).
- **Each award year:** Pell max (2026–27: $7,395).
- **State highlights** (`lib/stateResources.ts`): yearly re-verify; check
  Oregon Promise (funding pressure) and NY Essential Plan (eligibility
  tightened mid-2026) first.
- **Reality Check ballparks** (`lib/realityCheck.ts`): sanity-check the
  monthly costs once a year.
