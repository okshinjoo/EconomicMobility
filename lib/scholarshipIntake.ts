import { createHash } from "node:crypto";

export interface ScholarshipIntakeRequest {
  name: string;
  sponsor: string | null;
  officialUrl: string;
}

function cleanText(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maximum) : "";
}

export function parseScholarshipIntakeRequest(value: unknown): ScholarshipIntakeRequest | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const name = cleanText(body.name, 180);
  const sponsor = cleanText(body.sponsor, 180);
  const officialUrl = cleanText(body.officialUrl, 1000);
  if (name.length < 3 || !officialUrl) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(officialUrl);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol) || !parsedUrl.hostname.includes('.')) return null;
  parsedUrl.hash = "";

  return {
    name,
    sponsor: sponsor || null,
    officialUrl: parsedUrl.toString(),
  };
}

export function scholarshipCandidateId({ name, officialUrl }: Pick<ScholarshipIntakeRequest, "name" | "officialUrl">) {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56) || "scholarship";
  const sourceKey = createHash("sha256").update(officialUrl).digest("hex").slice(0, 8);
  return `candidate-${slug}-${sourceKey}`;
}

export function scholarshipCandidateFingerprint(request: ScholarshipIntakeRequest) {
  return createHash("sha256")
    .update(JSON.stringify({ name: request.name, sponsor: request.sponsor, officialUrl: request.officialUrl }))
    .digest("hex");
}
