// Reminder signups (July 2026): anonymous visitors subscribe an email to
// deadline reminders and/or occasional tips. The subscribers table is
// service-role only (RLS with no policies), so all writes come through
// here. Inert (503) until SUPABASE_SERVICE_ROLE_KEY exists — and the
// signup band on /students only renders when the env is present, so an
// unconfigured site never shows a dead form.

import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { deadlines } from "@/lib/deadlines";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  const validIds = new Set(deadlines.map((d) => d.id));
  let email = "";
  let deadlineIds: string[] = [];
  let wantsTips = false;
  let wantsCollegeAdvice = false;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase().slice(0, 200);
    deadlineIds = Array.isArray(body?.deadlineIds)
      ? (body.deadlineIds as unknown[])
          .filter((x): x is string => typeof x === "string" && validIds.has(x))
          .slice(0, deadlines.length)
      : [];
    wantsTips = Boolean(body?.tips);
    wantsCollegeAdvice = Boolean(body?.collegeAdvice);
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (deadlineIds.length === 0 && !wantsTips && !wantsCollegeAdvice) {
    return Response.json({ error: "Pick at least one thing to hear about." }, { status: 400 });
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

  const writeRow = async (includeAdvice: boolean) => {
    const advice = includeAdvice ? { wants_college_advice: wantsCollegeAdvice } : {};
    return existing
      ? admin
          .from("reminder_subscribers")
          .update({ deadline_ids: deadlineIds, wants_tips: wantsTips, ...advice })
          .eq("email", email)
      : admin.from("reminder_subscribers").insert({
          email,
          deadline_ids: deadlineIds,
          wants_tips: wantsTips,
          ...advice,
          token: randomUUID(),
        });
  };

  // Until the wants_college_advice migration runs, fall back to the
  // legacy row shape so signups never fail on a missing column.
  let { error } = await writeRow(true);
  if (error && /wants_college_advice/.test(error.message)) {
    ({ error } = await writeRow(false));
  }

  if (error) {
    return Response.json(
      { error: "Couldn't save that just now. Try again in a minute." },
      { status: 500 }
    );
  }
  return Response.json({ ok: true });
}
