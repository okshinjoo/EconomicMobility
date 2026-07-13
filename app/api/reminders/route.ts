// Reminder signups (July 2026): anonymous visitors subscribe an email to
// deadline reminders and/or occasional tips. The subscribers table is
// service-role only (RLS with no policies), so all writes come through
// here. Inert (503) until SUPABASE_SERVICE_ROLE_KEY exists — and the
// signup band on /students only renders when the env is present, so an
// unconfigured site never shows a dead form.

import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  let email = "";
  let wantsDeadlines = true;
  let wantsTips = false;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase().slice(0, 200);
    wantsDeadlines = Boolean(body?.deadlines);
    wantsTips = Boolean(body?.tips);
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (!wantsDeadlines && !wantsTips) {
    return Response.json({ error: "Pick at least one kind of email." }, { status: 400 });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // Upsert on email: re-subscribing updates preferences, keeps the token.
  const { data: existing } = await admin
    .from("reminder_subscribers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const { error } = existing
    ? await admin
        .from("reminder_subscribers")
        .update({ wants_deadlines: wantsDeadlines, wants_tips: wantsTips })
        .eq("email", email)
    : await admin.from("reminder_subscribers").insert({
        email,
        wants_deadlines: wantsDeadlines,
        wants_tips: wantsTips,
        token: randomUUID(),
      });

  if (error) {
    return Response.json(
      { error: "Couldn't save that just now — try again in a minute." },
      { status: 500 }
    );
  }
  return Response.json({ ok: true });
}
