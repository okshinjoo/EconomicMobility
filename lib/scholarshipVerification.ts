const CANDIDATE_ID = /^candidate-[a-z0-9]+(?:-[a-z0-9]+)*-[a-f0-9]{8}$/;

export const SCHOLARSHIP_VERIFICATION_WORKFLOW = "scholarship-candidate-single.yml";
export const SCHOLARSHIP_VERIFICATION_WORKFLOW_URL =
  "https://github.com/okshinjoo/EconomicMobility/actions/workflows/scholarship-candidate-single.yml";

export interface ScholarshipVerificationRequest {
  scholarshipId: string;
}

export function parseScholarshipVerificationRequest(value: unknown): ScholarshipVerificationRequest | null {
  if (!value || typeof value !== "object") return null;
  const scholarshipId = typeof (value as Record<string, unknown>).scholarshipId === "string"
    ? ((value as Record<string, unknown>).scholarshipId as string).trim()
    : "";
  if (!CANDIDATE_ID.test(scholarshipId)) return null;
  return { scholarshipId };
}

export function scholarshipVerificationDispatchBody(scholarshipId: string) {
  return {
    ref: "main",
    inputs: { scholarship_id: scholarshipId },
  };
}
