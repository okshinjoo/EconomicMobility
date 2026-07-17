// Self-serve account deletion (July 17, 2026, owner: "you should be able
// to delete your account without having to email"). JWT-verified like the
// comment route, then the service role removes everything: storage objects
// (avatars + post pictures — no cascade reaches those), the email-keyed
// reminder signup, explicit row deletes (belt), and finally the auth user
// itself — whose `on delete cascade` FKs wipe user_data/profiles/likes/
// comments as the suspenders. On-device localStorage is deliberately NOT
// touched: logged-out use keeps working, per the accounts-optional promise.
// Inert (503) without env, same as the comment route; the client shows the
// email fallback then.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: Request) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
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
  const uid = userData.user.id;
  const email = userData.user.email;

  // Storage first (no FK cascade covers buckets). Each member owns at most
  // a folder per bucket; list + remove, best-effort.
  for (const bucket of ["avatars", "community-images"]) {
    try {
      const { data: files } = await admin.storage.from(bucket).list(uid, { limit: 200 });
      if (files?.length) {
        await admin.storage.from(bucket).remove(files.map((f) => `${uid}/${f.name}`));
      }
    } catch {
      // bucket may not exist yet — nothing of theirs is in it, then
    }
  }

  // Explicit row deletes (the FK cascade on auth.users is the backstop).
  for (const [table, col, val] of [
    ["likes", "user_id", uid],
    ["comments", "user_id", uid],
    ["user_data", "user_id", uid],
    ["profiles", "id", uid],
  ] as const) {
    try {
      await admin.from(table).delete().eq(col, val);
    } catch {
      /* table may predate this feature's schema — cascade covers it */
    }
  }
  if (email) {
    try {
      await admin.from("reminder_subscribers").delete().eq("email", email);
    } catch {
      /* reminders may not be provisioned */
    }
  }

  const { error: delError } = await admin.auth.admin.deleteUser(uid);
  if (delError) {
    return NextResponse.json(
      { error: "deletion failed — email privacy@economicmobilityproject.org and we'll finish it by hand" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ error: "POST only" }, { status: 405 });
}
