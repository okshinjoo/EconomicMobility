// The student money calendar (July 2026): the recurring dates that actually
// move money for students, each pointing at our own guide. Dates follow the
// same honesty rule as article figures — name the real date with its year
// tag and update yearly (FAFSA cycle + loan-rate reset roll every July 1;
// re-check this file then).

export interface StudentDate {
  /** Matching lib/deadlines id, for the add-to-calendar button. */
  deadlineId: string;
  /** Short when-label, e.g. "October 1". */
  when: string;
  title: string;
  detail: string;
  href: string;
  linkLabel: string;
}

export const studentCalendar: StudentDate[] = [
  {
    when: "October 1",
    deadlineId: "fafsa-opens",
    title: "FAFSA opens for next year",
    detail:
      "The 2027–28 form opens October 1, 2026. Aid that runs out goes to early filers, so file in the fall, not the spring.",
    href: "/learn/college/fafsa-step-by-step",
    linkLabel: "FAFSA, Step by Step",
  },
  {
    when: "October – March",
    deadlineId: "scholarship-season",
    title: "Big scholarship season",
    detail:
      "Most major scholarship deadlines land between fall and early spring for the following school year. Treat it like a part-time job for a few weekends.",
    href: "/learn/college/finding-scholarships",
    linkLabel: "Finding Scholarships You'll Actually Win",
  },
  {
    when: "Early spring",
    deadlineId: "state-aid-spring",
    title: "State aid deadlines (varies)",
    detail:
      "Many states award their grants first-come, first-served with deadlines as early as February or March. Your state's date is the one that matters.",
    href: "/resources",
    linkLabel: "Find your state's programs",
  },
  {
    when: "April 15",
    deadlineId: "tax-day",
    title: "Federal tax deadline",
    detail:
      "Worked at all during 2026? Filing in spring 2027 is often how students get withheld money BACK — for many, it's a refund, not a bill.",
    href: "/learn/taxes/filing-taxes-first-time",
    linkLabel: "Filing Taxes for the First Time",
  },
  {
    when: "June 30",
    deadlineId: "fafsa-final",
    title: "FAFSA final federal deadline",
    detail:
      "The absolute last day to file the 2026–27 FAFSA is June 30, 2027 — but by then most school and state money is gone. This date is the backstop, not the plan.",
    href: "/learn/college/fafsa-mistakes",
    linkLabel: "The FAFSA Mistakes That Cost Aid",
  },
  {
    when: "July 1",
    deadlineId: "loan-rate-reset",
    title: "Federal student loan rates reset",
    detail:
      "New federal loan rates take effect each July 1 for the coming school year (2026–27 undergrad Direct Loans: 6.52%). Know the number before you sign anything.",
    href: "/learn/college/student-loans-before-you-sign",
    linkLabel: "Student Loans, Before You Sign",
  },
];
