// The unified "You" model (July 14 owner ask: "the website should really
// learn you — when you save a factoid about yourself, factor it in"). One
// reader that gathers every factoid the person has SAVED about themselves —
// role, where they are in school, their goals and how far along each is, how
// money comes in, who they support, how confident they feel, what life
// moment they're in — into one object plus a plain-English summary reused
// across surfaces (the Money Guide chat, the "made for you" reflection).
//
// Local-first: every source is a synced empower:* key. SSR-safe: the
// underlying loadJSON returns null on the server, so this reads as empty
// during render and fills in on mount — call it client-side only.

import { readLocalProfile, GOAL_OPTIONS } from "./profile";
import { readAboutYou } from "./aboutYou";
import { readGoalCheckins } from "./goalCheckins";
import { readStudentStage } from "./studentStage";
import { moments as MOMENTS } from "./moments";

const STAGE_LABEL: Record<string, string> = {
  hs: "in high school",
  cc: "at community college",
  uni: "at a four-year university",
};
const ROLE_LABEL: Record<string, string> = {
  student: "a student",
  working: "working",
  retired: "retired",
};
const INCOME_LABEL: Record<string, string> = {
  steady: "a steady paycheck",
  irregular: "money that comes in unevenly",
  none: "no income yet",
  supported: "mostly supported by family",
};
const FAMILY_LABEL: Record<string, string> = {
  "on-my-own": "on their own financially",
  "family-helps": "getting some help from family",
  "i-help-family": "helping support their family",
};
const CONFIDENCE_LABEL: Record<string, string> = {
  new: "new to a lot of this",
  some: "comfortable with the basics",
  confident: "fairly confident with money",
};
const CHECKIN_LABEL: Record<string, string> = {
  "not-started": "not started",
  started: "started",
  halfway: "partway there",
  done: "basically done",
};

export interface YouGoal {
  id: string;
  label: string;
  status?: string;
  statusLabel?: string;
}

export interface You {
  name?: string;
  role?: string;
  stage?: string;
  goals: YouGoal[];
  income?: string;
  family?: string;
  confidence?: string;
  moment?: { id: string; title: string } | null;
  /** Distinct factoids saved — drives whether "we know you" surfaces show. */
  savedCount: number;
}

export function readYou(): You {
  const p = readLocalProfile();
  const about = readAboutYou();
  const checkins = readGoalCheckins();
  const stage = readStudentStage() ?? undefined;

  const goals: YouGoal[] = (p?.goals ?? []).map((id) => {
    const g = GOAL_OPTIONS.find((o) => o.id === id);
    const c = checkins[id];
    return {
      id,
      label: g?.label ?? id,
      status: c?.status,
      statusLabel: c ? CHECKIN_LABEL[c.status] : undefined,
    };
  });

  const momentId = about.moments?.[0];
  const m = momentId ? MOMENTS.find((x) => x.id === momentId) : undefined;

  const you: You = {
    name: p?.displayName || undefined,
    role: p?.role || undefined,
    stage,
    goals,
    income: about.income || undefined,
    family: about.family || undefined,
    confidence: about.confidence || undefined,
    moment: m ? { id: m.id, title: m.title } : null,
    savedCount: 0,
  };
  you.savedCount = [
    you.role,
    you.stage,
    you.income,
    you.family,
    you.confidence,
    you.moment,
    goals.length ? "g" : "",
  ].filter(Boolean).length;
  return you;
}

/** True once the person has told us anything worth tailoring on. */
export function youKnown(): boolean {
  return readYou().savedCount > 0;
}

/** One plain-English sentence describing the person, from their saved
 *  factoids — fed to the Money Guide so it knows who it's talking to, and
 *  reusable in "made for you" copy. Empty when nothing's saved. */
export function youSummary(you: You = readYou()): string {
  if (you.savedCount === 0) return "";
  const parts: string[] = [];
  if (you.stage) parts.push(`is ${STAGE_LABEL[you.stage]}`);
  else if (you.role) parts.push(`is ${ROLE_LABEL[you.role]}`);
  if (you.goals.length) {
    const gp = you.goals
      .slice(0, 3)
      .map((g) =>
        g.statusLabel
          ? `${g.label.toLowerCase()} (${g.statusLabel})`
          : g.label.toLowerCase()
      )
      .join(", ");
    parts.push(`is working toward ${gp}`);
  }
  if (you.income) parts.push(`has ${INCOME_LABEL[you.income]}`);
  if (you.family) parts.push(`is ${FAMILY_LABEL[you.family]}`);
  if (you.confidence) parts.push(`is ${CONFIDENCE_LABEL[you.confidence]}`);
  if (you.moment) parts.push(`is going through "${you.moment.title}"`);
  return `This person ${parts.join("; ")}.`;
}
