// The student shelf, as data (July 2026): which articles count as
// "student" content — every college-topic guide plus the cross-topic
// life-essentials picks shown on /students. Server-only (pulls the
// article registry); pages compute flags here and pass booleans down
// to client components. The owner rule this serves: anywhere a student
// article surfaces on the homepage, point the reader at For Students.

import { getTopicArticles } from "@/lib/articles";

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
