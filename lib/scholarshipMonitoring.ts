export const APPLICATION_STATUSES = [
  "open",
  "upcoming",
  "closed",
  "between-cycles",
  "rolling",
  "unknown",
] as const;

export const PROGRAM_STATUSES = [
  "active",
  "likely-recurring",
  "possibly-discontinued",
  "confirmed-discontinued",
] as const;

export const SOURCE_STATUSES = [
  "healthy",
  "redirected",
  "rate-limited",
  "blocked",
  "not-found",
  "server-error",
  "structure-changed",
  "unknown",
] as const;

export const EXTRACTION_CONFIDENCES = ["high", "medium", "low", "unknown"] as const;
export const VERIFICATION_STATUSES = [
  "unverified",
  "machine-verified",
  "review-required",
  "human-verified",
  "stale",
] as const;
export const CHANGE_RISKS = ["low", "medium", "high"] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ProgramStatus = (typeof PROGRAM_STATUSES)[number];
export type SourceStatus = (typeof SOURCE_STATUSES)[number];
export type ExtractionConfidence = (typeof EXTRACTION_CONFIDENCES)[number];
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];
export type ChangeRisk = (typeof CHANGE_RISKS)[number];

export interface ScholarshipMonitorInventoryRecord {
  scholarshipId: string;
  name: string;
  officialUrl: string;
  sourceDomain: string;
  publicationStatus: "published" | "withheld" | "removed" | "duplicate" | "discontinued";
  catalogFingerprint: string;
  catalogVerifiedLabel: string;
  geo: { scope: "national" | "states"; states?: string[] } | null;
  geoVerificationStatus: "unverified" | "review-required" | "human-verified" | "stale";
  geoEvidence: string;
  geoSourceUrl: string;
}

export interface AutoApplyCandidate {
  fieldName: string;
  proposedValue: unknown;
  extractionConfidence: ExtractionConfidence;
  verificationStatus: VerificationStatus;
  risk: ChangeRisk;
  sourceStatus: SourceStatus;
  fieldLocked: boolean;
}

/** Operational metadata can move without changing a student-facing claim. */
export const OPERATIONAL_AUTO_FIELDS = new Set([
  "lastCheckedAt",
  "sourceStatus",
  "contentHash",
  "normalizedContentHash",
  "extractionConfidence",
  "consecutiveFailures",
]);

/** Public fields allowed to move only after a high-confidence extraction. */
export const VERIFIED_PUBLIC_AUTO_FIELDS = new Set([
  "applicationStatus",
  "opensOn",
  "closesOn",
  "nextOpensOn",
]);

export const ALWAYS_REVIEW_FIELDS = new Set([
  "name",
  "sponsor",
  "amount",
  "officialUrl",
  "applicationUrl",
  "programStatus",
  "publicationStatus",
  "eligibility",
  "geo",
  "stages",
  "openToUndocumented",
]);

function isIsoDate(value: unknown): boolean {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Central fail-closed policy shared by future workers and review routes. */
export function canAutoApply(candidate: AutoApplyCandidate): boolean {
  if (candidate.fieldLocked || ALWAYS_REVIEW_FIELDS.has(candidate.fieldName)) return false;
  if (candidate.risk !== "low" || candidate.extractionConfidence !== "high") return false;

  if (OPERATIONAL_AUTO_FIELDS.has(candidate.fieldName)) return true;
  if (!VERIFIED_PUBLIC_AUTO_FIELDS.has(candidate.fieldName)) return false;
  if (!(["healthy", "redirected"] as SourceStatus[]).includes(candidate.sourceStatus)) return false;
  if (candidate.verificationStatus !== "machine-verified") return false;

  if (candidate.fieldName === "applicationStatus") {
    return (["open", "upcoming", "closed", "rolling"] as ApplicationStatus[]).includes(
      candidate.proposedValue as ApplicationStatus,
    );
  }
  return isIsoDate(candidate.proposedValue);
}
