import { NextResponse } from "next/server";
import { scholarships } from "@/lib/scholarships";
import { getScholarshipMonitorAdminClient } from "@/lib/scholarshipMonitoring.server";
import type { ApplicationStatus } from "@/lib/scholarshipMonitoring";
import type { PublicScholarshipStatus } from "@/lib/scholarshipStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const curatedIds = new Set(scholarships.map((scholarship) => scholarship.id));

export async function GET() {
  try {
    const admin = getScholarshipMonitorAdminClient();
    const { data, error } = await admin
      .from("scholarship_monitor_state")
      .select("scholarship_id,application_status,opens_on,closes_on,next_opens_on,last_verified_at")
      .eq("verification_status", "human-verified")
      .not("last_verified_at", "is", null);
    if (error) throw error;

    const statuses: PublicScholarshipStatus[] = (data ?? [])
      .filter((row) => curatedIds.has(row.scholarship_id) && row.application_status !== "unknown")
      .map((row) => ({
        id: row.scholarship_id,
        applicationStatus: row.application_status as ApplicationStatus,
        opensOn: row.opens_on,
        closesOn: row.closes_on,
        nextOpensOn: row.next_opens_on,
        verifiedAt: row.last_verified_at,
      }));

    return NextResponse.json(
      { statuses },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    // Fail closed: monitoring outages never publish unreviewed state.
    return NextResponse.json(
      { statuses: [] },
      { headers: { "cache-control": "no-store" } },
    );
  }
}
