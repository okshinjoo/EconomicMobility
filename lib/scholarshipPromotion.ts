import type { ScholarshipGeo, StudentStage } from "./scholarships";

const STAGES = new Set<StudentStage>(["high-school", "college", "transfer"]);
const CATALOG_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function cleanText(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maximum) : "";
}

export interface ScholarshipPromotionRequest {
  candidateId: string;
  catalogId: string;
  amount: string;
  deadline: string;
  deadlineMonth: number | null;
  who: string;
  stages: StudentStage[];
  tags: string[];
  openToUndocumented: boolean;
}

export interface ScholarshipPromotionReadiness {
  geographyVerified: boolean;
  officialSourceHealthy: boolean;
  evidenceQueueClear: boolean;
}

export function parseScholarshipPromotionRequest(value: unknown): ScholarshipPromotionRequest | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const candidateId = cleanText(body.candidateId, 180);
  const catalogId = cleanText(body.catalogId, 80).toLowerCase();
  const amount = cleanText(body.amount, 180);
  const deadline = cleanText(body.deadline, 220);
  const who = cleanText(body.who, 600);
  const deadlineMonth = body.deadlineMonth === null || body.deadlineMonth === ""
    ? null
    : Number(body.deadlineMonth);
  const stages = Array.isArray(body.stages)
    ? [...new Set(body.stages.filter((stage): stage is StudentStage => typeof stage === "string" && STAGES.has(stage as StudentStage)))]
    : [];
  const tags = Array.isArray(body.tags)
    ? [...new Set(body.tags.map((tag) => cleanText(tag, 60).toLowerCase()).filter(Boolean))].slice(0, 24)
    : [];

  if (!candidateId.startsWith("candidate-") || !CATALOG_ID.test(catalogId)) return null;
  if (amount.length < 2 || deadline.length < 2 || who.length < 20 || stages.length === 0) return null;
  if (deadlineMonth !== null && (!Number.isInteger(deadlineMonth) || deadlineMonth < 1 || deadlineMonth > 12)) return null;

  return {
    candidateId,
    catalogId,
    amount,
    deadline,
    deadlineMonth,
    who,
    stages,
    tags,
    openToUndocumented: body.openToUndocumented === true,
  };
}

export function canPrepareScholarshipPromotion(readiness: ScholarshipPromotionReadiness) {
  return readiness.geographyVerified && readiness.officialSourceHealthy && readiness.evidenceQueueClear;
}

export function buildScholarshipPromotionPacket({
  request,
  candidate,
  geo,
  evidence,
  preparedAt,
}: {
  request: ScholarshipPromotionRequest;
  candidate: { name: string; sponsor: string | null; officialUrl: string };
  geo: ScholarshipGeo;
  evidence: string;
  preparedAt: string;
}) {
  return {
    catalogRecord: {
      id: request.catalogId,
      name: candidate.name,
      amount: request.amount,
      deadline: request.deadline,
      deadlineMonth: request.deadlineMonth,
      who: request.who,
      stages: request.stages,
      ...(request.openToUndocumented ? { openToUndocumented: true } : {}),
      ...(request.tags.length ? { tags: request.tags } : {}),
      officialUrl: candidate.officialUrl,
    },
    geographyOverlay: { [request.catalogId]: geo },
    provenanceRecord: {
      id: request.catalogId,
      kind: "geo",
      classifiedAt: preparedAt.slice(0, 10),
      sourceUrl: candidate.officialUrl,
      method: "moderator-promotion",
      confidence: "verified",
      evidence,
    },
    sourceCandidateId: request.candidateId,
    preparedAt,
    sponsor: candidate.sponsor,
  };
}
