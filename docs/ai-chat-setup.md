# Turning on the AI "Money Guide" chat

The chat (`components/ChatLauncher.tsx`) ships as a **free retrieval guide** — it
matches questions to the site's articles/tools and replies with links. No AI, no
backend, no cost.

This doc is the upgrade path to **real Claude-written answers**, grounded in your
own articles. Nothing here is active until you do all three steps, so the site
keeps working exactly as-is until you're ready.

## What's already in place

- `app/api/chat/route.ts` — a serverless function that retrieves your most
  relevant articles and asks Claude to answer **using only those** (with
  guardrails: short, plain-language, no individualized legal/tax/immigration
  advice, no invented numbers, routes to professionals for high-stakes stuff).
  It is **inert** until an API key exists — with no key it returns `503`, and the
  chat falls back to the free guide.
- The client seam: `AI_ENDPOINT` in `components/ChatLauncher.tsx`.

## The 3 steps to turn it on

1. **Get an Anthropic API key** at <https://console.anthropic.com> → API Keys.
   Set a monthly spending limit there too (Billing → Limits) so cost can't run away.

2. **Add the key as an environment variable** named `ANTHROPIC_API_KEY` wherever
   you deploy:
   - **Local dev:** create `.env.local` with `ANTHROPIC_API_KEY=sk-ant-...`
     (it's git-ignored; never commit the key).
   - **Vercel/Netlify/etc.:** add it under the project's Environment Variables.

3. **Point the chat at the function** — in `components/ChatLauncher.tsx`, change:
   ```ts
   const AI_ENDPOINT = "";          // before
   const AI_ENDPOINT = "/api/chat"; // after
   ```

That's it. The chat now answers with Claude; if the API ever errors or hits your
spending cap, it automatically falls back to the free retrieval guide.

## Notes

- **Hosting:** this needs a host that runs server functions (Vercel, Netlify,
  Cloudflare, a Node server) — NOT a pure static export. Standard `next build` +
  Vercel deploy handles it automatically.
- **Cost:** the function uses **Claude Haiku** (cheapest/fastest) by default —
  roughly a fraction of a cent per question. For higher-quality answers, change
  `MODEL` in `route.ts` to `claude-sonnet-4-6` (higher cost).
- **No new dependency:** the function calls the Anthropic API with plain `fetch`,
  so there's nothing to `npm install`.
- **Tuning the guardrails:** edit the `SYSTEM` prompt in `route.ts`. It already
  forbids invented facts and individualized advice and points people to free help
  (VITA, legal aid, 211, CFPB) — keep that posture given the audience.
- **Quality lever:** answers are only as good as what they're grounded in. The
  function retrieves the top 6 matches via `rankItems`; if answers feel thin for a
  topic, that usually means an article is missing or its title/dek doesn't match
  how people phrase the question.


## STATUS UPDATE — July 2026: AI chat is LIVE

All three steps are done: ANTHROPIC_API_KEY exists in Vercel (added for
comment review — one key powers both features), AI_ENDPOINT is set to
/api/chat, and the route now grounds answers in real article body text
with conversation history for follow-ups. Locally (no key in .env.local)
the chat automatically uses the free retrieval guide instead.
