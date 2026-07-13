// Live scholarship search backed by CareerOneStop (U.S. Department of
// Labor) — the "full national database" tier under our curated list.
// Inert (503) until CAREERONESTOP_USER_ID + CAREERONESTOP_TOKEN exist in
// Vercel (server-only). The client section only renders when the page sees
// the env, so an unconfigured site simply shows the curated tier alone.
//
// Their API family is consistently /v1/<service>/{userId}/{keyword}/... with
// a Bearer token. The scholarship service's exact path segment is confirmed
// in the welcome email after registration; if it differs from the default
// below, set CAREERONESTOP_SCHOLARSHIP_PATH (use {userId}, {keyword},
// {limit} placeholders) — no code change needed.

import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const DEFAULT_PATH = "/v1/scholarshipfinder/{userId}/{keyword}/0/{limit}";
const API_BASE = "https://api.careeronestop.org";
const LIMIT = 25;

export interface DbScholarship {
  name: string;
  org: string;
  amount: string;
  deadline: string;
  level: string;
  summary: string;
  url: string;
}

/** Pull the first non-empty string out of the candidate keys. */
function pick(row: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

export async function GET(req: NextRequest) {
  const userId = process.env.CAREERONESTOP_USER_ID;
  const token = process.env.CAREERONESTOP_TOKEN;
  if (!userId || !token) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 80);
  if (!q) {
    return Response.json({ error: "Empty query" }, { status: 400 });
  }

  const path = (process.env.CAREERONESTOP_SCHOLARSHIP_PATH ?? DEFAULT_PATH)
    .replace("{userId}", encodeURIComponent(userId))
    .replace("{keyword}", encodeURIComponent(q))
    .replace("{limit}", String(LIMIT));

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      // Same keyword twice in a day = same answer; be a polite API citizen.
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return Response.json(
      { error: "Could not reach the scholarship database" },
      { status: 502 }
    );
  }
  if (!res.ok) {
    return Response.json(
      { error: `Database error (${res.status})` },
      { status: 502 }
    );
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return Response.json({ error: "Bad response" }, { status: 502 });
  }

  // Their services wrap lists differently; accept the plausible shapes.
  const container = data as Record<string, unknown>;
  const rawList =
    (Array.isArray(container.ScholarshipList) && container.ScholarshipList) ||
    (Array.isArray(container.Scholarships) && container.Scholarships) ||
    (Array.isArray(container.SchoolPrograms) && container.SchoolPrograms) ||
    (Array.isArray(data) && (data as unknown[])) ||
    [];

  const items: DbScholarship[] = (rawList as Array<Record<string, unknown>>)
    .map((row) => ({
      name: pick(row, ["ScholarshipName", "Title", "Name"]),
      org: pick(row, ["Organization", "OrganizationName", "Sponsor"]),
      amount: pick(row, ["Awards", "AwardAmount", "Amount", "AwardType"]),
      deadline: pick(row, ["DeadlineDate", "Deadline", "ApplicationDeadline"]),
      level: pick(row, ["StudyLevelOfEducation", "LevelOfStudy", "Level"]),
      summary: pick(row, ["Purpose", "Description", "Summary"]).slice(0, 260),
      url: pick(row, ["ScholarshipURL", "Website", "URL", "Url"]),
    }))
    .filter((s) => s.name);

  return Response.json({
    items,
    attribution:
      "Data from CareerOneStop, sponsored by the U.S. Department of Labor.",
  });
}
