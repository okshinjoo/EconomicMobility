// AI backend for the "Money Guide" chat — the upgrade path from the free
// retrieval guide (lib/guide.ts) to real Claude-written answers, GROUNDED in
// Empower's own articles (lightweight RAG).
//
// It is INERT until you set the ANTHROPIC_API_KEY env var: with no key it
// returns 503, and the client (components/ChatLauncher.tsx) silently falls back
// to the free retrieval guide. To turn it on, see docs/ai-chat-setup.md.
//
// Contract (matches ChatLauncher's AI_ENDPOINT):
//   POST { query: string }  ->  { reply: string, sourceHrefs: string[] }

import type { NextRequest } from "next/server";
import { getSearchItems } from "@/lib/search";
import { rankItems } from "@/lib/guide";

export const runtime = "nodejs";

// Cheapest/fastest current model — great for grounded Q&A. Bump to
// "claude-sonnet-4-6" for higher-quality answers at higher cost.
const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM = `You are the "Money Guide" for Empower, a free financial-education site for first-generation, low-income, and immigrant youth.

RULES — follow all of them:
- Answer ONLY using the provided context snippets from Empower's own articles. If the context doesn't clearly cover the question, say you're not certain and suggest they browse the topics or check the Resources page — do not guess.
- Keep it warm, plain-language, and SHORT: 2–4 short sentences. No jargon, no lectures.
- NEVER give individualized legal, tax, or immigration advice. For anything specific or high-stakes (a lawsuit, an immigration case, a big tax bill, a scam in progress), tell them to talk to a qualified professional or free help (VITA for taxes, legal aid, 211, the CFPB).
- Do NOT invent facts, numbers, dollar amounts, contribution limits, rates, or URLs. Never promise a financial outcome.
- You may mention the titles of the most relevant articles, but only ones that appear in the context.`;

export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // Not configured yet — client falls back to the free retrieval guide.
    return Response.json({ error: "AI not configured" }, { status: 503 });
  }

  let query = "";
  try {
    const body = await req.json();
    query = String(body?.query ?? "").trim().slice(0, 500);
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (!query) {
    return Response.json({ error: "Empty query" }, { status: 400 });
  }

  // 1) Retrieve the most relevant articles/tools to ground the answer.
  const context = rankItems(query, getSearchItems(), 6);
  const contextText = context
    .map((c, i) => `[${i + 1}] ${c.title} (${c.kind}) — ${c.subtitle}  <${c.href}>`)
    .join("\n");

  // 2) Ask Claude, grounded in that context. Plain fetch — no SDK dependency.
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
        max_tokens: 400,
        temperature: 0.2,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: `Question: ${query}\n\nContext from Empower's library (use only this):\n${contextText || "(no close matches found)"}`,
          },
        ],
      }),
    });
  } catch {
    return Response.json({ error: "Could not reach the AI service" }, { status: 502 });
  }

  if (!res.ok) {
    return Response.json({ error: "AI service error" }, { status: 502 });
  }

  const data = await res.json();
  const reply: string = (data?.content ?? [])
    .filter((b: { type?: string }) => b.type === "text")
    .map((b: { text?: string }) => b.text ?? "")
    .join("")
    .trim();

  // 3) Return the answer plus the hrefs we grounded on — the client renders
  //    these as the same tappable source cards the retrieval guide uses.
  return Response.json({
    reply: reply || "I'm not sure about that one — try browsing the topics or the Resources page.",
    sourceHrefs: context.map((c) => c.href),
  });
}
