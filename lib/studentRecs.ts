// Stage-keyed recommendations (July 2026, owner ask: "recommend the right
// materials to students"). Hand-curated, not generated: each stage gets the
// six doors that matter MOST at that point, every href a real page. All
// links are student-frame (this only renders on /students surfaces and the
// account dashboard, where sending a student into the microsite is the
// point). Client-safe: plain data, no article registry.

import type { KnownStage } from "./studentStage";
import { getReadMap } from "./readTracking";
import { STORAGE_KEYS, loadJSON } from "./storage";
import { TOOL_FRAME_MAP } from "./frame";

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
  /** The stage's POOL of doors. Surfaces show `REC_SLOTS` at a time via
   *  rotatedRecs(); pools at or under the slot count always show whole. */
  recs: StageRec[];
}

/** How many doors a surface shows at once (the band's "these six"). */
export const REC_SLOTS = 6;

/** The stage's doors for today: pools bigger than `count` rotate daily so
 *  every door gets shelf time (hs and cc carry 8 as of July 2026). Date-based,
 *  so CLIENT-ONLY after mount — both consumers (StudentStageDash, the
 *  account overview) already render nothing until mounted, which is what
 *  keeps this hydration-safe. Don't call it during server render.
 *
 *  DONE-AWARE (July 2026, owner item 5 "don't recommend topics they've
 *  already seen"): pass the client-computed `done` set (doneRecHrefs()) and
 *  undone doors get the slots first; done ones only backfill when fewer
 *  than `count` undone remain — the lane never hides or shrinks. */
export function rotatedRecs(
  stage: KnownStage,
  count = REC_SLOTS,
  done?: ReadonlySet<string>
): StageRec[] {
  const pool = STAGE_PLANS[stage].recs;
  const rotate = (list: StageRec[], n: number): StageRec[] => {
    if (list.length <= n) return list;
    const day = Math.floor(Date.now() / 86_400_000);
    const start = day % list.length;
    return Array.from({ length: n }, (_, i) => list[(start + i) % list.length]);
  };
  if (!done || done.size === 0) return rotate(pool, count);
  const undone = pool.filter((r) => !done.has(r.href));
  if (undone.length >= count) return rotate(undone, count);
  const finished = pool.filter((r) => done.has(r.href));
  return [...undone, ...rotate(finished, count - undone.length)];
}

// Mirror-href -> canonical tool path, for done-detection against the
// visited-tools map (which records main-site pathnames).
const MIRROR_TO_MAIN: Record<string, string> = Object.fromEntries(
  Object.entries(TOOL_FRAME_MAP).map(([main, mirror]) => [mirror, main])
);

// Same key CourseQuiz.getBadges() reads (kept local so this lib never
// imports a component — the PlanApp CHALLENGE_BADGES_KEY precedent).
const COURSE_BADGES_KEY = "empower:course-badges:v1";

/** Which stage-plan doors this device has already finished, by href —
 *  CLIENT-ONLY (localStorage), call post-mount and hand to rotatedRecs().
 *  Guide mirrors check the read map, course mirrors check earned badges,
 *  tool mirrors check visited tools via their canonical path. Everything
 *  else (finders, deadlines, tracker, journeys, external links) has no
 *  "done" state and deliberately never counts. */
export function doneRecHrefs(): Set<string> {
  const read = getReadMap();
  const tools = loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
  const badges = loadJSON<Record<string, unknown>>(COURSE_BADGES_KEY) ?? {};
  const done = new Set<string>();
  for (const plan of Object.values(STAGE_PLANS)) {
    for (const r of plan.recs) {
      const path = r.href.split(/[?#]/)[0];
      const guide = path.match(/^\/students\/learn\/[a-z0-9-]+\/([a-z0-9-]+)$/);
      if (guide) {
        if (read[guide[1]]) done.add(r.href);
        continue;
      }
      const course = path.match(/^\/students\/courses\/([a-z0-9-]+)$/);
      if (course) {
        if (badges[course[1]]) done.add(r.href);
        continue;
      }
      const main = MIRROR_TO_MAIN[path];
      if (main && (tools[main] || tools[path])) done.add(r.href);
    }
  }
  return done;
}

export const STAGE_PLANS: Record<KnownStage, StagePlan> = {
  hs: {
    headline: "In high school",
    blurb:
      "Your edge is time: money you line up now is money you never borrow.",
    recs: [
      {
        label: "Scholarships you can win now",
        desc: "Awards open to high schoolers, some from 9th grade up.",
        href: "/students/scholarships?stage=high-school",
      },
      {
        label: "FAFSA, step by step",
        desc: "Know the form before senior-year you needs it.",
        href: "/students/learn/college/fafsa-step-by-step",
      },
      {
        label: "What colleges actually look for",
        desc: "Formulas, holistic reads, and the free cheat sheet schools publish.",
        href: "/students/learn/college/how-colleges-read-applications",
      },
      {
        label: "Programs that pay high schoolers",
        desc: "Paid internships and free summer programs, verified.",
        href: "/students/opportunities?stage=high-school",
      },
      {
        label: "The deadlines that sneak up",
        desc: "CSS Profile, early decision, FAFSA, with reminders.",
        href: "/students/deadlines",
      },
      {
        label: "Early decision, explained",
        desc: "What binding really means for aid before you apply.",
        href: "/students/learn/college/early-decision-explained",
      },
      {
        label: "Religious colleges, decoded",
        desc: "Heritage name or signed covenant, and what each means for aid.",
        href: "/students/learn/college/religious-colleges-and-money",
      },
      {
        label: "Bank your AP and IB credits",
        desc: "Track credits you're earning and what they could save.",
        href: "/students/tracker",
      },
      {
        label: "Reality Check: the life you want",
        desc: "Pick the apartment, car, and life; see the salary it takes.",
        href: "/students/tools/reality-check",
      },
    ],
  },
  cc: {
    headline: "In community college",
    blurb:
      "Your edge is the transfer play: same degree, a fraction of the debt, if every credit moves with you.",
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
        desc: "Track which units transfer and which are at risk.",
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
      {
        label: "Transfer Ready, the course",
        desc: "Our transfer module, still in progress: the reading path is live now.",
        href: "/students/courses/transfer-ready",
      },
      {
        // The old homepage ASSIST card, re-homed as a cc-stage door
        // (nav-audit §4b: personalization replaces the band everyone saw).
        label: "ASSIST.org, the transfer map",
        desc: "California's official course-by-course check, before you enroll.",
        href: "https://assist.org",
      },
      {
        label: "Reality Check: the life you want",
        desc: "Pick the apartment, car, and life; see the salary it takes.",
        href: "/students/tools/reality-check",
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
        desc: "Yes, they exist after freshman year. Verified list.",
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
      {
        label: "Reality Check: the life you want",
        desc: "Pick the apartment, car, and life; see the salary it takes.",
        href: "/students/tools/reality-check",
      },
    ],
  },
};
