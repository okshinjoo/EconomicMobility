import promotionDocument from "../data/scholarship-promotions.json" with { type: "json" };
import type { Scholarship, ScholarshipGeo } from "./scholarships";
import type { EligibilityTag } from "./scholarshipTaxonomy";

export interface StoredScholarshipPromotion {
  catalogRecord: Scholarship;
  geographyOverlay: Record<string, ScholarshipGeo>;
  eligibilityOverlay: Record<string, EligibilityTag[]>;
  provenanceRecords: Array<{
    id: string;
    kind: "geo" | "eligibility";
    classifiedAt: string;
    sourceUrl: string;
    method: "manual";
    confidence: "verified";
    evidence: string;
  }>;
  sourceCandidateId: string;
  preparedAt: string;
  sponsor: string | null;
}

export const scholarshipAutomatedPromotionRecords =
  promotionDocument.records as StoredScholarshipPromotion[];

export const scholarshipAutomatedPromotedCatalog =
  scholarshipAutomatedPromotionRecords.map((record) => record.catalogRecord);

export const scholarshipAutomatedPromotedGeo = Object.fromEntries(
  scholarshipAutomatedPromotionRecords.map((record) => [
    record.catalogRecord.id,
    record.geographyOverlay[record.catalogRecord.id],
  ]),
) as Record<string, ScholarshipGeo>;

export const scholarshipAutomatedPromotedEligibility = Object.fromEntries(
  scholarshipAutomatedPromotionRecords.map((record) => [
    record.catalogRecord.id,
    record.eligibilityOverlay[record.catalogRecord.id],
  ]),
) as Record<string, EligibilityTag[]>;

export const scholarshipAutomatedPromotedIds =
  scholarshipAutomatedPromotionRecords.map((record) => record.catalogRecord.id);
