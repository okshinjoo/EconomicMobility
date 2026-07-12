import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// The AI-reviewed comment pipeline (owner-picked July 2026): a signed-in
// member's comment is screened by Claude before insert. Clean -> published
// instantly (status 'approved'); anything uncertain -> 'pending' for the
// human queue at /admin/comments. FAIL CLOSED: any API error, missing env,
// or unparseable verdict means pending, never auto-publish.
//
// Inert without env vars: ANTHROPIC_API_KEY + SUPABASE_SERVICE_ROLE_KEY
// (server-only, set in Vercel). Returns 503 then, and the client falls back
// to the direct pending insert (lib/liveComments.ts), i.e. today's behavior.

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";

// Written for a financial-education community serving first-gen, low-income,
// and immigrant YOUTH: the dangerous content is polite-sounding scams and
// personal-info leaks, not just profanity.
const MODERATION_SYSTEM = `You are the safety reviewer for the comment section of a free financial-education community whose members include teenagers and financially vulnerable people.

Reply with exactly one word:
SAFE — the comment is fine to publish.
REVIEW — a human moderator should look first.

Reply REVIEW if the comment contains ANY of:
- Scams or solicitation: offers to manage money, "DM me", guaranteed returns, doubling money, crypto/forex signals, recruiting for schemes, requests to move to another app
- Personal contact info or identifying details (their own or anyone's): phone numbers, addresses, emails, social handles, account numbers
- Links or references to unknown websites, apps, or services
- Harassment, insults, hate, or shaming anyone's financial situation
- Sexual content, violence, or self-harm references
- Profanity beyond mild exclamations
- Specific directive financial advice presented as instruction ("put all your savings into X", "skip your rent payment and buy Y")
- Impersonating staff or moderators
- Spam, gibberish, or advertising

Sharing personal experiences, honest struggles, questions, encouragement, and general educational information is SAFE. Mild slang and imperfect grammar are SAFE. When uncertain in any way, reply REVIEW.`;

async function moderate(text: string): Promise<"SAFE" | "REVIEW"> {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 8,
        system: MODERATION_SYSTEM,
        messages: [
          {
            role: "user",
            content: `<comment>\n${text}\n</comment>\n\nOne word: SAFE or REVIEW.`,
          },
        ],
      }),
      // A slow verdict shouldn't hang the member's submit.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "REVIEW";
    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
      stop_reason?: string;
    };
    if (data.stop_reason === "refusal") return "REVIEW";
    const block = data.content?.find((b) => b.type === "text");
    const verdict = block?.text?.trim().toUpperCase() ?? "";
    return verdict.startsWith("SAFE") ? "SAFE" : "REVIEW";
  } catch {
    return "REVIEW";
  }
}

const clip = (v: unknown, max: number): string =>
  typeof v === "string" ? v.slice(0, max) : "";

export async function POST(req: Request) {
  if (!SUPABASE_URL || !SERVICE_KEY || !ANTHROPIC_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const token = (req.headers.get("authorization") ?? "").replace(
    /^Bearer\s+/i,
    ""
  );
  if (!token) {
    return NextResponse.json({ error: "sign in required" }, { status: 401 });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: authError } = await admin.auth.getUser(token);
  if (authError || !userData.user) {
    return NextResponse.json({ error: "sign in required" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const text = clip(body.text, 4000).trim();
  const postId = clip(body.postId, 100);
  const parentId = clip(body.parentId, 100) || null;
  if (!text || !postId) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const verdict = await moderate(text);
  const status = verdict === "SAFE" ? "approved" : "pending";

  const { error: insertError } = await admin.from("comments").insert({
    post_id: postId,
    parent_id: parentId,
    user_id: userData.user.id,
    author_name: clip(body.authorName, 60) || "Member",
    author_tag: clip(body.authorTag, 40) || null,
    author_flairs: Array.isArray(body.authorFlairs)
      ? (body.authorFlairs as unknown[])
          .slice(0, 2)
          .map((f) => clip(f, 40))
          .filter(Boolean)
      : [],
    body: text,
    status,
  });
  if (insertError) {
    return NextResponse.json({ error: "could not save" }, { status: 500 });
  }

  return NextResponse.json({ status });
}
