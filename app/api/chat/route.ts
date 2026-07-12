// AI backend for the "Money Guide" chat: Claude-written answers GROUNDED in
// Empower's own articles (lightweight RAG). Turned ON July 2026 — shares
// ANTHROPIC_API_KEY with the comment-review route.
//
// How grounding works: fuzzy-rank the library for the question, then pull the
// ACTUAL BODY TEXT of the top article matches (not just titles) into the
// prompt, so answers teach from our content and can hand over the right
// article. Claude may only use what's in the context; anything uncertain gets
// a browse-the-topics nudge instead of a guess.
//
// Contract (matches ChatLauncher):
//   POST { query: string, history?: {role: "user"|"guide", text: string}[] }
//     -> { reply: string, sourceHrefs: string[] }
// No key -> 503 -> client falls back to the free retrieval guide.

import type { NextRequest } from "next/server";
import { getSearchItems } from "@/lib/search";
import { rankItems } from "@/lib/guide";
import { getArticleBySlug } from "@/lib/articles";
import { getBlogPost } from "@/lib/blog";

export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5";
const MAX_HISTORY = 6;
const EXCERPT_CHARS = 1800;

const SYSTEM = `You are the "Money Guide" for Empower (economicmobilityproject.org), a free financial-education site for first-generation, low-income, and immigrant youth. Your voice is a knowledgeable older sibling: warm, plain-language, direct, never condescending. Some readers are teenagers.

HOW TO ANSWER — follow all of these:
- Ground every answer in the ARTICLE EXCERPTS and LIBRARY POINTERS provided. Teach the key point in 2-5 short sentences using what the excerpts actually say, then point to the single best article by name, e.g.: The full guide is "How to Build Credit From Zero" below.
- Facts, dollar figures, limits, and rates may be stated ONLY if they appear in the excerpts. Never invent or estimate numbers, and never invent article titles or URLs.
- If the context doesn't clearly cover the question, say so honestly and suggest the closest starting point or the Resources page. A short honest answer beats a confident wrong one.
- Follow-up questions refer to the earlier conversation — use it.
- NEVER give individualized financial, legal, tax, or immigration advice ("should I personally do X"). Explain how things work generally, then suggest talking to a qualified professional or free help (VITA for taxes, legal aid, 211, the CFPB) for personal decisions.
- If someone describes a scam in progress or money just stolen, lead with: contact your bank or card company immediately — then point to the "What to Do If You've Been Scammed" guide.
- If someone sounds in crisis beyond money, gently mention that calling or texting 988 reaches free 24/7 support.
- Plain text only: no markdown headers, no bullet lists, no links written out (the app shows article cards for you). Keep it SHORT.`;

interface HistoryMsg {
  role: "user" | "guide";
  text: string;
}

/** Body text of an article/blog post, trimmed to a grounding excerpt. */
function excerptFor(href: string): string | null {
  const learn = href.match(/^\/learn\/[a-z-]+\/([a-z0-9-]+)$/);
  const blog = href.match(/^\/blog\/([a-z0-9-]+)$/);
  const post = learn ? getArticleBySlug(learn[1]) : blog ? getBlogPost(blog[1]) : null;
  if (!post) return null;
  const chunks: string[] = [];
  for (const block of post.body) {
    if (block.text) chunks.push(block.text);
    if (block.items) chunks.push(...block.items);
    if (chunks.join(" ").length > EXCERPT_CHARS) break;
  }
  const text = chunks.join(" ").replace(/\s+/g, " ").slice(0, EXCERPT_CHARS);
  return text || null;
}

export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ error: "AI not configured" }, { status: 503 });
  }

  let query = "";
  let history: HistoryMsg[] = [];
  try {
    const body = await req.json();
    query = String(body?.query ?? "").trim().slice(0, 500);
    if (Array.isArray(body?.history)) {
      history = (body.history as HistoryMsg[])
        .filter(
          (m) =>
            (m?.role === "user" || m?.role === "guide") &&
            typeof m?.text === "string"
        )
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, text: m.text.slice(0, 600) }));
    }
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (!query) {
    return Response.json({ error: "Empty query" }, { status: 400 });
  }

  // 1) Retrieve. Rank against the question plus a little recent context so
  //    follow-ups like "how do I open one?" still land on the right guides.
  const recentUser = history
    .filter((m) => m.role === "user")
    .map((m) => m.text)
    .slice(-2)
    .join(" ");
  const ranked = rankItems(`${query} ${recentUser}`.trim(), getSearchItems(), 8);

  // 2) Deep-ground the top readable matches with real body text.
  const excerpts: Array<{ title: string; href: string; text: string }> = [];
  const pointers: Array<{ title: string; kind: string; subtitle: string; href: string }> = [];
  for (const item of ranked) {
    const text = excerpts.length < 3 ? excerptFor(item.href) : null;
    if (text) excerpts.push({ title: item.title, href: item.href, text });
    else pointers.push({ title: item.title, kind: item.kind, subtitle: item.subtitle, href: item.href });
  }

  const contextText = [
    excerpts.length
      ? "ARTICLE EXCERPTS (teach from these):\n" +
        excerpts
          .map((e, i) => `[E${i + 1}] "${e.title}"\n${e.text}`)
          .join("\n\n")
      : "",
    pointers.length
      ? "LIBRARY POINTERS (may mention by title only):\n" +
        pointers
          .map((p) => `- "${p.title}" (${p.kind}) — ${p.subtitle}`)
          .join("\n")
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // 3) Ask Claude with the running conversation.
  const messages = [
    ...history.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    })),
    {
      role: "user" as const,
      content: `${query}\n\n---\nContext from Empower's library (use only this):\n${contextText || "(no close matches found)"}`,
    },
  ];

  let res: Response;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM,
        messages,
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return Response.json({ error: "Could not reach the AI service" }, { status: 502 });
  }
  if (!res.ok) {
    return Response.json({ error: "AI service error" }, { status: 502 });
  }

  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    stop_reason?: string;
  };
  if (data.stop_reason === "refusal") {
    return Response.json({
      reply:
        "That's not something I can help with here — but if it's about your money, try the topics below or the Resources page.",
      sourceHrefs: ranked.slice(0, 3).map((c) => c.href),
    });
  }
  const reply = (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();

  // 4) Sources: deep-grounded articles first, then the next best pointers.
  const sourceHrefs = [
    ...excerpts.map((e) => e.href),
    ...pointers.map((p) => p.href),
  ].slice(0, 4);

  return Response.json({
    reply:
      reply ||
      "I'm not sure about that one — try browsing the topics or the Resources page.",
    sourceHrefs,
  });
}
