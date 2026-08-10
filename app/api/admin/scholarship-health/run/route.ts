import { NextResponse } from "next/server";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import { SCHOLARSHIP_AUDIT_WORKFLOWS, scholarshipAuditDispatchBody } from "@/lib/scholarshipHealth";

export const runtime = "nodejs";

const GITHUB_REPOSITORY = "okshinjoo/EconomicMobility";

function bearerToken(request: Request) {
  return (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
}

export async function POST(request: Request) {
  const token = bearerToken(request);
  if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  let admin;
  try {
    admin = getScholarshipMonitorAdminClient();
  } catch {
    return NextResponse.json({ error: "Scholarship monitoring is not configured." }, { status: 503 });
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

  const dispatchToken = process.env.SCHOLARSHIP_MONITOR_GITHUB_TOKEN?.trim();
  if (!dispatchToken) {
    return NextResponse.json({
      error: "Run full audit is not configured yet. Add the private workflow credential in production.",
    }, { status: 503 });
  }

  const results = await Promise.all(SCHOLARSHIP_AUDIT_WORKFLOWS.map(async (workflow) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/${workflow.file}/dispatches`,
        {
          method: "POST",
          headers: {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${dispatchToken}`,
            "content-type": "application/json",
            "user-agent": "Empower-Scholarship-Moderator",
            "x-github-api-version": "2026-03-10",
          },
          body: JSON.stringify(scholarshipAuditDispatchBody()),
          signal: AbortSignal.timeout(10_000),
        },
      );
      return { id: workflow.id, name: workflow.name, url: workflow.url, started: response.ok };
    } catch {
      return { id: workflow.id, name: workflow.name, url: workflow.url, started: false };
    }
  }));

  const started = results.filter((result) => result.started);
  if (started.length === 0) {
    return NextResponse.json({ error: "The audit workflows could not be reached. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({
    started: started.length,
    total: results.length,
    workflows: results,
  }, { status: started.length === results.length ? 202 : 207 });
}
