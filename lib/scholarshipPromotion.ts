import type { ScholarshipGeo, StudentStage } from "./scholarships";
import {
  SCHOLARSHIP_TAXONOMY,
  type CriterionStrength,
  type EligibilityTag,
} from "./scholarshipTaxonomy";

const STAGES = new Set<StudentStage>(["high-school", "college", "transfer"]);
const CATALOG_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ELIGIBILITY_TAGS = new Set(SCHOLARSHIP_TAXONOMY.map((node) => node.id));
const ELIGIBILITY_STRENGTHS = new Set<CriterionStrength>(["required", "preferred", "relevant"]);

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
  eligibility: EligibilityTag[];
  eligibilityReviewed: boolean;
  curationVerified: boolean;
  openToUndocumented: boolean;
}

export interface ScholarshipPromotionReadiness {
  geographyVerified: boolean;
  officialSourceHealthy: boolean;
  evidenceQueueClear: boolean;
  statusVerified: boolean;
  deadlineVerified: boolean;
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
  const eligibility = Array.isArray(body.eligibility)
    ? body.eligibility.flatMap((value) => {
      if (!value || typeof value !== "object") return [];
      const candidate = value as Record<string, unknown>;
      const tag = cleanText(candidate.tag, 100);
      const strength = cleanText(candidate.strength, 20) as CriterionStrength;
      if (!ELIGIBILITY_TAGS.has(tag) || !ELIGIBILITY_STRENGTHS.has(strength)) return [];
      return [{ tag, strength }];
    })
    : [];
  const uniqueEligibility = [...new Map(eligibility.map((value) => [value.tag, value])).values()];

  if (!candidateId.startsWith("candidate-") || !CATALOG_ID.test(catalogId)) return null;
  if (amount.length < 2 || deadline.length < 2 || who.length < 20 || stages.length === 0) return null;
  if (deadlineMonth !== null && (!Number.isInteger(deadlineMonth) || deadlineMonth < 1 || deadlineMonth > 12)) return null;
  if (body.eligibilityReviewed !== true || body.curationVerified !== true) return null;

  return {
    candidateId,
    catalogId,
    amount,
    deadline,
    deadlineMonth,
    who,
    stages,
    tags,
    eligibility: uniqueEligibility,
    eligibilityReviewed: true,
    curationVerified: true,
    openToUndocumented: body.openToUndocumented === true,
  };
}

export function canPrepareScholarshipPromotion(readiness: ScholarshipPromotionReadiness) {
  return readiness.geographyVerified &&
    readiness.officialSourceHealthy &&
    readiness.evidenceQueueClear &&
    readiness.statusVerified &&
    readiness.deadlineVerified;
}

export function buildScholarshipPromotionPacket({
  request,
  candidate,
  geo,
  evidence,
  geographySourceUrl,
  preparedAt,
}: {
  request: ScholarshipPromotionRequest;
  candidate: { name: string; sponsor: string | null; officialUrl: string };
  geo: ScholarshipGeo;
  evidence: string;
  geographySourceUrl: string;
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
    eligibilityOverlay: { [request.catalogId]: request.eligibility },
    provenanceRecords: [
      {
        id: request.catalogId,
        kind: "geo",
        classifiedAt: preparedAt.slice(0, 10),
        sourceUrl: geographySourceUrl,
        method: "manual",
        confidence: "verified",
        evidence,
      },
      {
        id: request.catalogId,
        kind: "eligibility",
        classifiedAt: preparedAt.slice(0, 10),
        sourceUrl: candidate.officialUrl,
        method: "manual",
        confidence: "verified",
        evidence: request.who,
      },
    ],
    sourceCandidateId: request.candidateId,
    preparedAt,
    sponsor: candidate.sponsor,
  };
}
