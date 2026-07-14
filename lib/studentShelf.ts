// The student shelf, as data (July 2026): which articles count as
// "student" content — every college-topic guide plus the cross-topic
// life-essentials picks shown on /students. Server-only (pulls the
// article registry); pages compute flags here and pass booleans down
// to client components. The owner rule this serves: anywhere a student
// article surfaces on the homepage, point the reader at For Students.

import { getArticleBySlug, getTopicArticles } from "@/lib/articles";

/** Cross-topic "student life" guides on the /students shelf. */
export const STUDENT_LIFE_SLUGS = [
  "how-to-fill-out-w4",
  "how-to-read-a-pay-stub",
  "opening-first-bank-account",
  "choosing-first-credit-card",
  "building-a-savings-habit",
  "need-cash-fast",
  "turning-18-money",
  "your-first-benefits-enrollment",
] as const;

/** Main-site homes of the eight student tools (the /students/tools/*
 *  mirrors' canonicals — keep in sync with the /students/tools hub +
 *  TOOL_FRAME_MAP in lib/frame.ts). */
export const STUDENT_TOOL_PATHS = [
  "/tools/college",
  "/tools/college/compare-offers",
  "/tools/college/student-loan",
  "/tools/budget",
  "/tools/budget/paycheck",
  "/tools/budget/rent",
  "/tools/budget/emergency-fund",
  "/tools/budget/reality-check",
] as const;

let studentSet: Set<string> | null = null;

/** True when a guide lives on the student shelf (college topic or life picks). */
export function isStudentArticle(slug: string): boolean {
  if (!studentSet) {
    studentSet = new Set<string>([
      ...getTopicArticles("college").map((a) => a.slug),
      ...STUDENT_LIFE_SLUGS,
    ]);
  }
  return studentSet.has(slug);
}

/**
 * Every main-site pathname that counts as student-relevant — the college
 * guides, the student-life guides (wherever their topic lives), and the
 * student tools. Computed server-side (root layout) and handed to the
 * return chip, so the client never imports the article registry.
 * The /learn/college HUB was dropped July 14 (nav-audit §4c): the invite
 * chip stays on college/student-life PAGES but not on hubs.
 */
export function getStudentPagePaths(): string[] {
  const life = STUDENT_LIFE_SLUGS.map((slug) => {
    const a = getArticleBySlug(slug);
    return a ? `/learn/${a.topicId}/${a.slug}` : null;
  }).filter((p): p is string => Boolean(p));
  return [
    ...getTopicArticles("college").map((a) => `/learn/college/${a.slug}`),
    ...life,
    ...STUDENT_TOOL_PATHS,
  ];
}
