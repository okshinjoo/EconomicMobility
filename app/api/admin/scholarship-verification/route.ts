import { NextResponse } from "next/server";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import {
  parseScholarshipVerificationRequest,
  scholarshipVerificationDispatchBody,
  SCHOLARSHIP_VERIFICATION_WORKFLOW,
  SCHOLARSHIP_VERIFICATION_WORKFLOW_URL,
} from "@/lib/scholarshipVerification";

export const runtime = "nodejs";

const GITHUB_REPOSITORY = "okshinjoo/EconomicMobility";

function bearerToken(request: Request) {
  return (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
}

export async function POST(request: Request) {
  const token = bearerToken(request);
  if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const verification = parseScholarshipVerificationRequest(body);
  if (!verification) return NextResponse.json({ error: "Choose a valid withheld scholarship." }, { status: 400 });

  let admin;
  try {
    admin = getScholarshipMonitorAdminClient();
  } catch {
    return NextResponse.json({ error: "Scholarship verification is not configured." }, { status: 503 });
  }

  const { data: userData, error: authError } = await admin.auth.getUser(token);
  if (authError || !userData.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { data: moderator, error: moderatorError } = await admin
    .from("moderators")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (moderatorError) return NextResponse.json({ error: "Could not verify access." }, { status: 500 });
  if (!moderator) return NextResponse.json({ error: "Moderator access required." }, { status: 403 });

  const { data: candidate, error: candidateError } = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id,publication_status,monitor_enabled")
    .eq("scholarship_id", verification.scholarshipId)
    .eq("publication_status", "withheld")
    .eq("monitor_enabled", true)
    .maybeSingle();
  if (candidateError) return NextResponse.json({ error: "The scholarship could not be checked." }, { status: 500 });
  if (!candidate) return NextResponse.json({ error: "Active withheld scholarship not found." }, { status: 404 });

  const dispatchToken = process.env.SCHOLARSHIP_MONITOR_GITHUB_TOKEN?.trim();
  if (!dispatchToken) {
    return NextResponse.json({
      error: "Run-now verification is not configured yet. Add the private workflow credential in production.",
    }, { status: 503 });
  }

  let dispatchResponse: Response;
  try {
    dispatchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/${SCHOLARSHIP_VERIFICATION_WORKFLOW}/dispatches`,
      {
        method: "POST",
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${dispatchToken}`,
          "content-type": "application/json",
          "user-agent": "Empower-Scholarship-Moderator",
          "x-github-api-version": "2026-03-10",
        },
        body: JSON.stringify(scholarshipVerificationDispatchBody(verification.scholarshipId)),
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch {
    return NextResponse.json({ error: "The verification workflow could not be reached. Try again shortly." }, { status: 502 });
  }

  if (!dispatchResponse.ok) {
    return NextResponse.json({ error: "The verification workflow did not start. Check the production credential and try again." }, { status: 502 });
  }

  return NextResponse.json({
    started: true,
    scholarshipId: verification.scholarshipId,
    workflowUrl: SCHOLARSHIP_VERIFICATION_WORKFLOW_URL,
  }, { status: 202 });
}
