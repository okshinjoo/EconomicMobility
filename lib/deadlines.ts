// The deadlines registry (July 2026): the ONLY source of dates for plan
// items (plan-builder-spec.md rule — the AI may never invent a date).
// Same honesty convention as article figures and the student calendar:
// real recurring dates, year-tagged in copy where they roll, re-checked
// every July when the FAFSA/loan cycle resets. Keep ids stable; plans
// reference them.

export interface Deadline {
  id: string;
  /** Display label, e.g. "October 1". */
  when: string;
  /** 1-12, for ordering and "is this soon" logic. */
  month: number;
  title: string;
  /** One plain sentence of why it matters. */
  why: string;
  /** Our guide that walks it. */
  href: string;
  /** Which intake situations this deadline applies to. */
  appliesTo: Array<"student" | "working" | "anyone">;
}

export const deadlines: Deadline[] = [
  {
    id: "fafsa-opens",
    when: "October 1",
    month: 10,
    title: "FAFSA opens for the next school year",
    why: "Aid that runs out goes to early filers, so file in the fall, not the spring.",
    href: "/learn/college/fafsa-step-by-step",
    appliesTo: ["student"],
  },
  {
    id: "scholarship-season",
    when: "October through March",
    month: 10,
    title: "Major scholarship deadlines",
    why: "Most big national awards close between fall and early spring for the following year.",
    href: "/students/scholarships",
    appliesTo: ["student"],
  },
  {
    id: "state-aid-spring",
    when: "Early spring (varies by state)",
    month: 3,
    title: "State aid deadlines",
    why: "Many states hand out grants first-come, first-served, with deadlines as early as February.",
    href: "/resources",
    appliesTo: ["student"],
  },
  {
    id: "tax-day",
    when: "April 15",
    month: 4,
    title: "Federal tax deadline",
    why: "If you worked at all last year, filing is often how you get withheld money back.",
    href: "/learn/taxes/filing-taxes-first-time",
    appliesTo: ["anyone"],
  },
  {
    id: "fafsa-final",
    when: "June 30",
    month: 6,
    title: "FAFSA final federal deadline",
    why: "The absolute last day for the current award year, but most school and state money is gone by then.",
    href: "/learn/college/fafsa-mistakes",
    appliesTo: ["student"],
  },
  {
    id: "loan-rate-reset",
    when: "July 1",
    month: 7,
    title: "Federal student loan rates reset",
    why: "New rates take effect for the coming school year; know the number before signing anything.",
    href: "/learn/college/student-loans-before-you-sign",
    appliesTo: ["student"],
  },
];

export function getDeadline(id: string): Deadline | undefined {
  return deadlines.find((d) => d.id === id);
}
