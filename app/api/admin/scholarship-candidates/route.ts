import { NextResponse } from "next/server";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import {
  parseScholarshipIntakeRequest,
  scholarshipCandidateFingerprint,
  scholarshipCandidateId,
} from "@/lib/scholarshipIntake";

export const runtime = "nodejs";

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
  const candidate = parseScholarshipIntakeRequest(body);
  if (!candidate) {
    return NextResponse.json({ error: "Enter a scholarship name and a valid official program URL." }, { status: 400 });
  }

  let admin;
  try {
    admin = getScholarshipMonitorAdminClient();
  } catch {
    return NextResponse.json({ error: "Scholarship intake is not configured." }, { status: 503 });
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

  const scholarshipId = scholarshipCandidateId(candidate);
  const sourceDomain = new URL(candidate.officialUrl).hostname.toLowerCase().replace(/^www\./, "");
  const { data: existingSource, error: existingSourceError } = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id")
    .eq("official_url", candidate.officialUrl)
    .limit(1)
    .maybeSingle();
  if (existingSourceError) return NextResponse.json({ error: "The official source could not be checked." }, { status: 500 });
  if (existingSource) {
    return NextResponse.json({ error: "This official scholarship source is already in the monitoring inventory." }, { status: 409 });
  }
  const inventoryRow = {
    scholarship_id: scholarshipId,
    name: candidate.name,
    sponsor: candidate.sponsor,
    official_url: candidate.officialUrl,
    source_domain: sourceDomain,
    publication_status: "withheld",
    monitor_enabled: true,
    monitor_cadence: "weekly",
    catalog_fingerprint: scholarshipCandidateFingerprint(candidate),
    catalog_verified_label: "",
    geo_scope: null,
    geo_states: [],
    geo_verification_status: "unverified",
    geo_evidence: null,
    geo_source_url: candidate.officialUrl,
  };

  const { error: inventoryError } = await admin.from("scholarship_monitor_inventory").insert(inventoryRow);
  if (inventoryError) {
    const duplicate = inventoryError.code === "23505";
    return NextResponse.json(
      { error: duplicate ? "This official scholarship source is already staged." : "The scholarship could not be staged." },
      { status: duplicate ? 409 : 500 },
    );
  }

  const [domainResult, sourceResult, historyResult] = await Promise.all([
    admin.from("scholarship_monitor_domains").upsert({ domain: sourceDomain }, { onConflict: "domain", ignoreDuplicates: true }),
    admin.from("scholarship_monitor_sources").insert({
      scholarship_id: scholarshipId,
      source_kind: "official",
      url: candidate.officialUrl,
      source_domain: sourceDomain,
      extraction_strategy: "html",
    }),
    admin.from("scholarship_monitor_history").insert({
      scholarship_id: scholarshipId,
      field_name: "inventory",
      previous_value: null,
      new_value: inventoryRow,
      action: "inventory-sync",
      actor_kind: "reviewer",
      actor_user_id: userData.user.id,
      source_url: candidate.officialUrl,
      evidence_text: "Official source submitted through the private scholarship intake.",
      metadata: { intake: true, publicationStatus: "withheld" },
    }),
  ]);
  if (domainResult.error || sourceResult.error || historyResult.error) {
    return NextResponse.json({
      error: "The scholarship was withheld, but one monitoring setup step needs attention.",
      scholarshipId,
      partial: true,
    }, { status: 500 });
  }

  return NextResponse.json({
    scholarshipId,
    publicationStatus: "withheld",
    geographyStatus: "unverified",
  }, { status: 201 });
}
