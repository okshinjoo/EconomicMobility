import type { ApplicationStatus } from "./scholarshipMonitoring";

export interface PublicScholarshipStatus {
  id: string;
  applicationStatus: ApplicationStatus;
  opensOn: string | null;
  closesOn: string | null;
  nextOpensOn: string | null;
  verifiedAt: string;
}

export function isVerifiedClosed(status: PublicScholarshipStatus | undefined) {
  return status?.applicationStatus === "closed" || status?.applicationStatus === "between-cycles";
}

function dateLabel(iso: string | null) {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function verifiedStatusLabel(status: PublicScholarshipStatus) {
  const opens = dateLabel(status.opensOn);
  const closes = dateLabel(status.closesOn);
  const nextOpens = dateLabel(status.nextOpensOn);
  if (status.applicationStatus === "open") return closes ? `Open now · closes ${closes}` : "Open now";
  if (status.applicationStatus === "rolling") return "Open · rolling deadline";
  if (status.applicationStatus === "upcoming") return opens ? `Opens ${opens}` : "Opening soon";
  if (status.applicationStatus === "between-cycles") return nextOpens ? `Between cycles · next opens ${nextOpens}` : "Between application cycles";
  if (status.applicationStatus === "closed") return nextOpens ? `Closed · next opens ${nextOpens}` : "Closed for this cycle";
  return "Status needs review";
}
