export const SCHOLARSHIP_REVIEW_ACTIONS = [
  "accept",
  "edit",
  "verify",
  "keep",
  "reject",
] as const;

export type ScholarshipReviewAction = (typeof SCHOLARSHIP_REVIEW_ACTIONS)[number];

export interface ScholarshipReviewRequest {
  proposalId: string;
  action: ScholarshipReviewAction;
  editedValue: string | null;
  note: string;
  lockField: boolean;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parseScholarshipReviewRequest(value: unknown): ScholarshipReviewRequest | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const proposalId = typeof body.proposalId === "string" ? body.proposalId.trim() : "";
  const action = typeof body.action === "string" ? body.action : "";
  const editedValue = typeof body.editedValue === "string" ? body.editedValue.trim().slice(0, 500) : null;
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 1000) : "";

  if (!UUID.test(proposalId)) return null;
  if (!SCHOLARSHIP_REVIEW_ACTIONS.includes(action as ScholarshipReviewAction)) return null;
  if (action === "edit" && !editedValue) return null;

  return {
    proposalId,
    action: action as ScholarshipReviewAction,
    editedValue,
    note,
    lockField: body.lockField === true,
  };
}
