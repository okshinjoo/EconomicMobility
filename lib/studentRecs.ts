// Stage-keyed recommendations (July 2026, owner ask: "recommend the right
// materials to students"). Hand-curated, not generated: each stage gets the
// six doors that matter MOST at that point, every href a real page. All
// links are student-frame (this only renders on /students surfaces and the
// account dashboard, where sending a student into the microsite is the
// point). Client-safe: plain data, no article registry.

import type { KnownStage } from "./studentStage";

export interface StageRec {
  label: string;
  desc: string;
  href: string;
}

export interface StagePlan {
  /** "You're in high school" — the band's headline confirmation. */
  headline: string;
  /** One sentence on what this stage's money game actually is. */
  blurb: string;
  recs: StageRec[];
}

export const STAGE_PLANS: Record<KnownStage, StagePlan> = {
  hs: {
    headline: "In high school",
    blurb:
      "Your edge is time: money you line up now is money you never borrow.",
    recs: [
      {
        label: "Scholarships you can win now",
        desc: "Awards open to high schoolers — some from 9th grade up.",
        href: "/students/scholarships?stage=high-school",
      },
      {
        label: "FAFSA, step by step",
        desc: "Know the form before senior-year you needs it.",
        href: "/students/learn/college/fafsa-step-by-step",
      },
      {
        label: "Early decision, explained",
        desc: "What binding really means for aid before you apply.",
        href: "/students/learn/college/early-decision-explained",
      },
      {
        label: "Programs that pay high schoolers",
        desc: "Paid internships and free summer programs, verified.",
        href: "/students/opportunities?stage=high-school",
      },
      {
        label: "The deadlines that sneak up",
        desc: "CSS Profile, early decision, FAFSA — with reminders.",
        href: "/students/deadlines",
      },
      {
        label: "Bank your AP and IB credits",
        desc: "Track credits you're earning and what they could save.",
        href: "/students/tracker",
      },
    ],
  },
  cc: {
    headline: "In community college",
    blurb:
      "Your edge is the transfer play: same degree, a fraction of the debt — if every credit moves with you.",
    recs: [
      {
        label: "Transfer without losing money",
        desc: "The step-by-step path from CC to a four-year degree.",
        href: "/students/journey/transfer",
      },
      {
        label: "The transfer money guide",
        desc: "ASSIST, articulation agreements, and credits that count.",
        href: "/students/learn/college/community-college-transfer-money",
      },
      {
        label: "Protect your credits",
        desc: "Track which units transfer — and which are at risk.",
        href: "/students/tracker",
      },
      {
        label: "Scholarships for transfer students",
        desc: "Awards that follow you to a four-year school.",
        href: "/students/scholarships?stage=transfer",
      },
      {
        label: "Opportunities open to CC students",
        desc: "Paid research and programs that take transfers seriously.",
        href: "/students/opportunities?stage=transfer",
      },
      {
        label: "Aid Season Playbook",
        desc: "A short course on getting every aid dollar you qualify for.",
        href: "/students/courses/aid-season-playbook",
      },
    ],
  },
  uni: {
    headline: "At a university",
    blurb:
      "Your edge is defense: keep the aid you have, borrow the minimum, and get paid while you study.",
    recs: [
      {
        label: "Keep your aid (SAP rules)",
        desc: "The GPA-and-progress fine print that can end your aid.",
        href: "/students/learn/college/keep-your-aid-sap",
      },
      {
        label: "FAFSA verification, handled",
        desc: "Picked for verification? What it is and what to send.",
        href: "/students/learn/college/fafsa-verification",
      },
      {
        label: "Scholarships for current students",
        desc: "Yes, they exist after freshman year — verified list.",
        href: "/students/scholarships?stage=college",
      },
      {
        label: "Paid internships and research",
        desc: "Stipended programs that build your resume and your bank.",
        href: "/students/opportunities?stage=college",
      },
      {
        label: "Emergency aid on campus",
        desc: "The money your school keeps for when things break.",
        href: "/students/learn/college/emergency-aid-on-campus",
      },
      {
        label: "Borrow Smart",
        desc: "A short course on loans: what to take, what to skip.",
        href: "/students/courses/borrow-smart",
      },
    ],
  },
};
