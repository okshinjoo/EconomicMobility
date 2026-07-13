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
  /** Day of month for calendar events. Fuzzy deadlines ("early spring")
   *  anchor on the 1st with the fuzziness kept in the title/why. */
  day: number;
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
    day: 1,
    when: "October 1",
    month: 10,
    title: "FAFSA opens for the next school year",
    why: "Aid that runs out goes to early filers, so file in the fall, not the spring.",
    href: "/learn/college/fafsa-step-by-step",
    appliesTo: ["student"],
  },
  {
    id: "scholarship-season",
    day: 1,
    when: "October through March",
    month: 10,
    title: "Major scholarship deadlines",
    why: "Most big national awards close between fall and early spring for the following year.",
    href: "/students/scholarships",
    appliesTo: ["student"],
  },
  {
    id: "state-aid-spring",
    day: 1,
    when: "Early spring (varies by state)",
    month: 3,
    title: "State aid deadlines",
    why: "Many states hand out grants first-come, first-served, with deadlines as early as February.",
    href: "/resources",
    appliesTo: ["student"],
  },
  {
    id: "tax-day",
    day: 15,
    when: "April 15",
    month: 4,
    title: "Federal tax deadline",
    why: "If you worked at all last year, filing is often how you get withheld money back.",
    href: "/learn/taxes/filing-taxes-first-time",
    appliesTo: ["anyone"],
  },
  {
    id: "fafsa-final",
    day: 30,
    when: "June 30",
    month: 6,
    title: "FAFSA final federal deadline",
    why: "The absolute last day for the current award year, but most school and state money is gone by then.",
    href: "/learn/college/fafsa-mistakes",
    appliesTo: ["student"],
  },
  {
    id: "loan-rate-reset",
    day: 1,
    when: "July 1",
    month: 7,
    title: "Federal student loan rates reset",
    why: "New rates take effect for the coming school year; know the number before signing anything.",
    href: "/learn/college/student-loans-before-you-sign",
    appliesTo: ["student"],
  },
  {
    id: "w2-tax-season",
    day: 31,
    when: "January 31",
    month: 1,
    title: "W-2s arrive — tax season opens",
    why: "Employers must send your W-2 by this date; filing early means any refund (especially the EITC) lands months sooner.",
    href: "/learn/taxes/filing-taxes-first-time",
    appliesTo: ["anyone"],
  },
  {
    id: "decision-day",
    day: 1,
    when: "May 1",
    month: 5,
    title: "College Decision Day — deposits due",
    why: "Enrollment deposits lock in your choice; compare every award letter before any money moves.",
    href: "/learn/college/reading-aid-award-letter",
    appliesTo: ["student"],
  },
  {
    id: "css-profile-opens",
    day: 1,
    when: "October 1",
    month: 10,
    title: "CSS Profile opens",
    why: "About 200 mostly private colleges require it for their own aid; free for families making up to $100,000.",
    href: "/learn/college/css-profile-explained",
    appliesTo: ["student"],
  },
  {
    id: "early-decision",
    day: 1,
    when: "November 1 (typically)",
    month: 11,
    title: "Early decision & early action deadlines",
    why: "Early decision is binding before you can compare aid offers — know what you're signing up for.",
    href: "/learn/college/css-profile-explained",
    appliesTo: ["student"],
  },
  {
    id: "health-open-enrollment",
    day: 1,
    when: "November 1",
    month: 11,
    title: "Health insurance open enrollment begins",
    why: "The yearly window to pick or switch marketplace coverage — and the deadline that matters most after turning 26.",
    href: "/learn/insurance/health-insurance-explained",
    appliesTo: ["anyone"],
  },
];

export function getDeadline(id: string): Deadline | undefined {
  return deadlines.find((d) => d.id === id);
}
