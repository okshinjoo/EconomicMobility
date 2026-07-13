// The reminder sender (July 2026), hit daily by the Vercel cron. Each
// deadline in lib/deadlines sends ONCE per year, when the calendar passes
// the 15th of the month before it (about two to six weeks of lead time
// depending on the deadline). reminder_sends records the send, so reruns
// and redeploys can never double-mail anyone. Content comes only from the
// deadlines registry — same source the site displays.
//
// Inert without RESEND_API_KEY + SUPABASE_SERVICE_ROLE_KEY. If CRON_SECRET
// is set, requests must carry it (Vercel crons send it automatically).

import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { deadlines, type Deadline } from "@/lib/deadlines";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const RESEND_KEY = process.env.RESEND_API_KEY ?? "";
const FROM =
  process.env.REMINDERS_FROM ??
  "Empower <reminders@economicmobilityproject.org>";
const SITE = "https://economicmobilityproject.org";

/** A deadline is "due to send" once today reaches the 15th of the prior
 *  month (Oct 1 deadline -> from Sept 15). Year = the deadline's year. */
function dueNow(d: Deadline, now: Date): { due: boolean; year: number } {
  const triggerMonth = d.month === 1 ? 12 : d.month - 1; // 1-12
  const deadlineYear =
    d.month === 1 && now.getMonth() + 1 === 12
      ? now.getFullYear() + 1
      : now.getFullYear();
  const trigger = new Date(
    d.month === 1 ? now.getFullYear() : deadlineYear,
    triggerMonth - 1,
    15
  );
  const deadlineDate = new Date(deadlineYear, d.month - 1, 28);
  return {
    due: now >= trigger && now <= deadlineDate,
    year: deadlineYear,
  };
}

function emailHtml(d: Deadline, token: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f7f2e8;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#11211c">
  <div style="max-width:520px;margin:0 auto;background:#fbf8f1;border:2px solid #11211c;border-radius:14px;padding:28px">
    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c4573b">Deadline heads-up</p>
    <h1 style="margin:10px 0 4px;font-size:22px">${d.title}</h1>
    <p style="margin:0;font-size:15px;font-weight:700;color:#0c4a39">${d.when}</p>
    <p style="margin:14px 0;font-size:15px;line-height:1.6;color:#44514a">${d.why}</p>
    <a href="${SITE}${d.href}" style="display:inline-block;background:#e7a33c;color:#11211c;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border:2px solid #11211c;border-radius:8px">Read the guide</a>
    <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:#44514a">You asked for deadline reminders from Empower (economicmobilityproject.org). Everything on the site is free, and we never sell your data.
    <a href="${SITE}/api/reminders/unsubscribe?t=${token}" style="color:#0c4a39">Unsubscribe</a> anytime — one click, no questions.</p>
  </div></body></html>`;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!SUPABASE_URL || !SERVICE_KEY || !RESEND_KEY) {
    return Response.json({ ok: true, note: "reminders not configured" });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
  const now = new Date();
  const report: Record<string, unknown> = {};

  for (const d of deadlines) {
    const { due, year } = dueNow(d, now);
    if (!due) continue;

    const { data: already } = await admin
      .from("reminder_sends")
      .select("deadline_id")
      .eq("deadline_id", d.id)
      .eq("year", year)
      .maybeSingle();
    if (already) continue;

    const { data: subs, error } = await admin
      .from("reminder_subscribers")
      .select("email, token")
      .eq("wants_deadlines", true);
    if (error || !subs || subs.length === 0) {
      report[d.id] = error ? "subscriber query failed" : "no subscribers";
      continue;
    }

    // Resend batch endpoint takes up to 100 emails per call.
    let sent = 0;
    for (let i = 0; i < subs.length; i += 100) {
      const chunk = subs.slice(i, i + 100).map((s) => ({
        from: FROM,
        to: [s.email],
        subject: `Heads-up: ${d.title} (${d.when})`,
        html: emailHtml(d, s.token),
      }));
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(chunk),
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) sent += chunk.length;
    }

    if (sent > 0) {
      await admin.from("reminder_sends").insert({ deadline_id: d.id, year });
    }
    report[d.id] = `sent to ${sent} of ${subs.length}`;
  }

  return Response.json({ ok: true, checked: deadlines.length, report });
}
