// The roadmap-article registry. Roadmaps are pure routing articles (they
// sequence other guides via inline links instead of teaching). Listing a slug
// here gives it: a spot in the /learn amber strip, a "Roadmap" badge on topic
// roadmap cards, and the "start with the roadmap" banner on its topic page.
// All consumers resolve slugs defensively, so a not-yet-written slug is fine.

export const ROADMAP_SLUGS: string[] = [
  "money-order-of-operations",
  "new-to-america-money",
  "turning-18-money",
  "first-year-of-credit",
  "debt-payoff-roadmap",
  "college-money-roadmap",
  "markets-tour",
  "retirement-path",
  "tax-season-roadmap",
  "first-home-runway",
  "insurance-checkup",
  "security-tune-up",
  "your-first-benefits-enrollment",
];

export const ROADMAP_SET = new Set(ROADMAP_SLUGS);
