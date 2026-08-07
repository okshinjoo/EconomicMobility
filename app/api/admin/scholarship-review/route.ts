import { NextResponse } from "next/server";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import { parseScholarshipReviewRequest } from "@/lib/scholarshipReview";

export const runtime = "nodejs";

function bearerToken(request: Request) {
  return (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
}

export async function POST(request: Request) {
  const token = bearerToken(request);
  if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const body = parseScholarshipReviewRequest(rawBody);
  if (!body) return NextResponse.json({ error: "Invalid review action." }, { status: 400 });

  let admin;
  try {
    admin = getScholarshipMonitorAdminClient();
  } catch {
    return NextResponse.json({ error: "Review service is not configured." }, { status: 503 });
  }

  const { data: userData, error: authError } = await admin.auth.getUser(token);
  if (authError || !userData.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { data: moderator, error: moderatorError } = await admin
    .from("moderators")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (moderatorError) return NextResponse.json({ error: "Could not verify access." }, { status: 500 });
  if (!moderator) return NextResponse.json({ error: "Moderator access required." }, { status: 403 });

  const { data, error } = await admin.rpc("review_scholarship_monitor_proposal", {
    p_action: body.action,
    p_actor_user_id: userData.user.id,
    p_edited_value: body.editedValue,
    p_lock_field: body.lockField,
    p_note: body.note,
    p_proposal_id: body.proposalId,
  });
  if (error) {
    const stale = /already reviewed|not found/i.test(error.message);
    return NextResponse.json(
      { error: stale ? "This proposal was already reviewed." : "The review could not be saved." },
      { status: stale ? 409 : 500 },
    );
  }

  return NextResponse.json({ result: data });
}
