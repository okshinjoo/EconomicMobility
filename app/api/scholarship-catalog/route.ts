import { NextResponse } from "next/server";
import { scholarships } from "@/lib/scholarships";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim() ?? "";
  const scholarship = id ? scholarships.find((candidate) => candidate.id === id) ?? null : null;
  return NextResponse.json(
    {
      count: scholarships.length,
      scholarship: scholarship ? {
        id: scholarship.id,
        name: scholarship.name,
        officialUrl: scholarship.officialUrl,
        geo: scholarship.geo ?? null,
        eligibility: scholarship.eligibility ?? null,
      } : null,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
