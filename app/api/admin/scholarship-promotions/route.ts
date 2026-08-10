import { NextResponse } from "next/server";
import { scholarships } from "@/lib/scholarships";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import {
  buildScholarshipPromotionPacket,
  canPrepareScholarshipPromotion,
  parseScholarshipPromotionRequest,
  type ScholarshipPromotionReadiness,
} from "@/lib/scholarshipPromotion";

export const runtime = "nodejs";

const GITHUB_REPOSITORY = "okshinjoo/EconomicMobility";
const PUBLICATION_WORKFLOW = "scholarship-promotion-publish.yml";
const PUBLICATION_WORKFLOW_URL =
  `https://github.com/${GITHUB_REPOSITORY}/actions/workflows/${PUBLICATION_WORKFLOW}`;

function bearerToken(request: Request) {
  return (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
}

async function moderatorContext(request: Request) {
  const token = bearerToken(request);
  if (!token) return { error: NextResponse.json({ error: "Sign in required." }, { status: 401 }) };
  let admin;
  try {
    admin = getScholarshipMonitorAdminClient();
  } catch {
    return { error: NextResponse.json({ error: "Promotion service is not configured." }, { status: 503 }) };
  }
  const { data: userData, error: authError } = await admin.auth.getUser(token);
  if (authError || !userData.user) return { error: NextResponse.json({ error: "Sign in required." }, { status: 401 }) };
  const { data: moderator, error: moderatorError } = await admin
    .from("moderators")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (moderatorError) return { error: NextResponse.json({ error: "Could not verify access." }, { status: 500 }) };
  if (!moderator) return { error: NextResponse.json({ error: "Moderator access required." }, { status: 403 }) };
  return { admin, user: userData.user };
}

interface InventoryRow {
  scholarship_id: string;
  name: string;
  sponsor: string | null;
  official_url: string;
  publication_status: string;
  geo_scope: "national" | "states" | null;
  geo_states: string[];
  geo_verification_status: string;
  geo_evidence: string | null;
  geo_source_url: string | null;
  created_at: string;
}

interface ObservationRow {
  scholarship_id: string;
  requested_url: string;
  source_status: string;
  success: boolean;
  fetched_at: string;
  final_url: string | null;
  http_status: number | null;
}

interface StateRow {
  scholarship_id: string;
  application_status: string;
  source_status: string;
  verification_status: string;
  opens_on: string | null;
  closes_on: string | null;
  next_opens_on: string | null;
  last_verified_at: string | null;
}

function readinessFor(
  row: InventoryRow,
  observation: ObservationRow | null,
  state: StateRow | null,
  pendingCount: number,
): ScholarshipPromotionReadiness {
  const statusVerified = state?.verification_status === "human-verified" &&
    state.source_status === "healthy" &&
    state.application_status !== "unknown" &&
    Boolean(state.last_verified_at);
  return {
    geographyVerified: row.geo_verification_status === "human-verified" &&
      Boolean(row.geo_scope) && Boolean(row.geo_evidence?.trim()) && Boolean(row.geo_source_url),
    officialSourceHealthy: observation?.success === true && observation.source_status === "healthy",
    evidenceQueueClear: pendingCount === 0,
    statusVerified,
    deadlineVerified: statusVerified && (
      state?.application_status === "rolling" || Boolean(state?.closes_on)
    ),
  };
}

export async function GET(request: Request) {
  const context = await moderatorContext(request);
  if ("error" in context) return context.error;
  const { admin } = context;
  const { data: inventory, error: inventoryError } = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id,name,sponsor,official_url,publication_status,geo_scope,geo_states,geo_verification_status,geo_evidence,geo_source_url,created_at")
    .eq("publication_status", "withheld")
    .order("created_at", { ascending: true });
  if (inventoryError) return NextResponse.json({ error: "Candidate records could not be loaded." }, { status: 500 });

  const rows = (inventory ?? []) as InventoryRow[];
  const ids = rows.map((row) => row.scholarship_id);
  if (!ids.length) return NextResponse.json({ candidates: [] });
  const [observationsResult, proposalsResult, statesResult] = await Promise.all([
    admin
      .from("scholarship_monitor_observations")
      .select("scholarship_id,requested_url,source_status,success,fetched_at,final_url,http_status")
      .in("scholarship_id", ids)
      .order("fetched_at", { ascending: false }),
    admin
      .from("scholarship_monitor_proposals")
      .select("scholarship_id")
      .in("scholarship_id", ids)
      .eq("status", "pending"),
    admin
      .from("scholarship_monitor_state")
      .select("scholarship_id,application_status,source_status,verification_status,opens_on,closes_on,next_opens_on,last_verified_at")
      .in("scholarship_id", ids),
  ]);
  if (observationsResult.error || proposalsResult.error || statesResult.error) {
    return NextResponse.json({ error: "Candidate readiness could not be checked." }, { status: 500 });
  }
  const latest = new Map<string, ObservationRow>();
  const officialUrls = new Map(rows.map((row) => [row.scholarship_id, row.official_url]));
  for (const observation of (observationsResult.data ?? []) as ObservationRow[]) {
    if (
      !latest.has(observation.scholarship_id) &&
      observation.requested_url === officialUrls.get(observation.scholarship_id)
    ) latest.set(observation.scholarship_id, observation);
  }
  const pendingCounts = new Map<string, number>();
  for (const proposal of proposalsResult.data ?? []) {
    pendingCounts.set(proposal.scholarship_id, (pendingCounts.get(proposal.scholarship_id) ?? 0) + 1);
  }
  const states = new Map(
    ((statesResult.data ?? []) as StateRow[]).map((state) => [state.scholarship_id, state]),
  );

  return NextResponse.json({
    candidates: rows.map((row) => {
      const observation = latest.get(row.scholarship_id) ?? null;
      const state = states.get(row.scholarship_id) ?? null;
      const pendingProposalCount = pendingCounts.get(row.scholarship_id) ?? 0;
      const readiness = readinessFor(row, observation, state, pendingProposalCount);
      return {
        scholarshipId: row.scholarship_id,
        name: row.name,
        sponsor: row.sponsor,
        officialUrl: row.official_url,
        createdAt: row.created_at,
        geo: row.geo_scope === "national"
          ? { scope: "national" }
          : row.geo_scope === "states"
            ? { scope: "states", states: row.geo_states }
            : null,
        geoEvidence: row.geo_evidence,
        geographyStatus: row.geo_verification_status,
        latestObservation: observation,
        latestState: state,
        pendingProposalCount,
        readiness,
        ready: canPrepareScholarshipPromotion(readiness),
      };
    }),
  });
}

export async function POST(request: Request) {
  const context = await moderatorContext(request);
  if ("error" in context) return context.error;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const body = parseScholarshipPromotionRequest(rawBody);
  if (!body) return NextResponse.json({ error: "Complete every required curation field." }, { status: 400 });
  if (scholarships.some((scholarship) => scholarship.id === body.catalogId)) {
    return NextResponse.json({ error: "That public catalog ID is already in use." }, { status: 409 });
  }

  const action = (rawBody as Record<string, unknown>).action === "publish" ? "publish" : "prepare";
  if (action === "publish" && (rawBody as Record<string, unknown>).confirmPublish !== true) {
    return NextResponse.json({ error: "Confirm that this record should be published to the live Finder." }, { status: 400 });
  }

  const { admin } = context;
  const inventoryResult = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id,name,sponsor,official_url,publication_status,geo_scope,geo_states,geo_verification_status,geo_evidence,geo_source_url,created_at")
    .eq("scholarship_id", body.candidateId)
    .eq("publication_status", "withheld")
    .maybeSingle();
  if (inventoryResult.error) {
    return NextResponse.json({ error: "Candidate readiness could not be checked." }, { status: 500 });
  }
  const row = inventoryResult.data as InventoryRow | null;
  if (!row) return NextResponse.json({ error: "Withheld candidate not found." }, { status: 404 });
  if (scholarships.some((scholarship) => scholarship.officialUrl === row.official_url)) {
    return NextResponse.json({ error: "This official source is already published in the Finder." }, { status: 409 });
  }
  const [observationResult, proposalResult, stateResult] = await Promise.all([
    admin
      .from("scholarship_monitor_observations")
      .select("scholarship_id,requested_url,source_status,success,fetched_at,final_url,http_status")
      .eq("scholarship_id", body.candidateId)
      .eq("requested_url", row.official_url)
      .order("fetched_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    admin
      .from("scholarship_monitor_proposals")
      .select("id", { count: "exact", head: true })
      .eq("scholarship_id", body.candidateId)
      .eq("status", "pending"),
    admin
      .from("scholarship_monitor_state")
      .select("scholarship_id,application_status,source_status,verification_status,opens_on,closes_on,next_opens_on,last_verified_at")
      .eq("scholarship_id", body.candidateId)
      .maybeSingle(),
  ]);
  if (observationResult.error || proposalResult.error || stateResult.error) {
    return NextResponse.json({ error: "Candidate readiness could not be checked." }, { status: 500 });
  }
  const observation = observationResult.data as ObservationRow | null;
  const state = stateResult.data as StateRow | null;
  const readiness = readinessFor(row, observation, state, proposalResult.count ?? 0);
  if (!canPrepareScholarshipPromotion(readiness)) {
    return NextResponse.json({ error: "This candidate has not cleared every promotion gate.", readiness }, { status: 409 });
  }
  const geo = row.geo_scope === "national"
    ? { scope: "national" as const }
    : { scope: "states" as const, states: row.geo_states };
  const packet = buildScholarshipPromotionPacket({
    request: body,
    candidate: { name: row.name, sponsor: row.sponsor, officialUrl: row.official_url },
    geo,
    evidence: row.geo_evidence ?? "",
    geographySourceUrl: row.geo_source_url ?? row.official_url,
    preparedAt: new Date().toISOString(),
  });

  if (action === "prepare") return NextResponse.json({ packet });

  const dispatchToken = process.env.SCHOLARSHIP_MONITOR_GITHUB_TOKEN?.trim();
  if (!dispatchToken) {
    return NextResponse.json({ error: "Publication is not configured in production." }, { status: 503 });
  }
  const packetBase64 = Buffer.from(JSON.stringify(packet), "utf8").toString("base64url");
  let dispatchResponse: Response;
  try {
    dispatchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/${PUBLICATION_WORKFLOW}/dispatches`,
      {
        method: "POST",
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${dispatchToken}`,
          "content-type": "application/json",
          "user-agent": "Empower-Scholarship-Moderator",
          "x-github-api-version": "2026-03-10",
        },
        body: JSON.stringify({ ref: "main", inputs: { packet_base64: packetBase64 } }),
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch {
    return NextResponse.json({ error: "The publication workflow could not be reached. Try again shortly." }, { status: 502 });
  }
  if (!dispatchResponse.ok) {
    return NextResponse.json({ error: "The publication workflow did not start. Check the production credential and workflow." }, { status: 502 });
  }
  return NextResponse.json({
    started: true,
    scholarshipId: body.catalogId,
    workflowUrl: PUBLICATION_WORKFLOW_URL,
  }, { status: 202 });
}
