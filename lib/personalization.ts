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
import {
  URGENT_EVENTS,
  type PersonalContext,
  type LifeStage,
  type EducationStage,
  type IncomePattern,
  type SupportRelationship,
  type UpcomingEvent,
  type Confidence,
  type Goal,
} from "./personalizationRules";

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

// ===========================================================================
// NORMALIZED PERSONALIZATION CONTEXT (July 14 personalization audit).
//
// `readContext()` is the ONE reader that turns the person's scattered saved
// factoids into the normalized `PersonalContext`. The pure decision RULES it
// feeds — the contradiction guard, priority ranking, content scorer, "Made for
// you" copy selector, and Scholarship Finder default — live in
// ./personalizationRules (dependency-free + unit-tested). We re-export them
// here so every consumer imports from one place: "@/lib/personalization".
// ===========================================================================

export * from "./personalizationRules";

// ---- Legacy → normalized maps (the ONE place raw stored values are read) ----

const LIFE_STAGE_MAP: Record<string, LifeStage> = {
  student: "student",
  working: "working_professional",
  retired: "retired",
};
const EDU_STAGE_MAP: Record<string, EducationStage> = {
  hs: "high_school",
  cc: "community_college",
  uni: "four_year_college",
};
const INCOME_MAP: Record<string, IncomePattern> = {
  steady: "steady_paycheck",
  irregular: "uneven_income",
  none: "no_income",
  supported: "family_covers_most",
};
const SUPPORT_MAP: Record<string, SupportRelationship> = {
  "on-my-own": "financially_independent",
  "family-helps": "receives_family_support",
  "i-help-family": "supports_family",
};
const CONFIDENCE_MAP: Record<string, Confidence> = {
  new: "beginner",
  some: "intermediate",
  confident: "confident",
};
const GOAL_MAP: Record<string, Goal> = {
  credit: "build_credit",
  debt: "pay_off_debt",
  budget: "improve_budgeting",
  emergency: "build_emergency_fund",
  invest: "start_investing",
  college: "pay_for_college",
  transfer: "transfer_without_losing_money",
  home: "buy_home",
  retirement: "plan_for_retirement",
  safety: "protect_from_scams",
};
// lib/moments ids → normalized upcoming events.
const EVENT_MAP: Record<string, UpcomingEvent> = {
  "first-job": "first_job",
  "moving-out": "moving_out",
  "college-bound": "heading_to_college",
  graduating: "graduating",
  "first-card": "first_credit_card",
  "money-tight": "money_tight",
  "start-investing": "ready_to_invest",
  "been-scammed": "possible_scam",
};

// Usefulness weights: knowing a goal or urgent event personalizes far more
// than knowing confidence alone. Completeness is scored by value delivered.
const PROFILE_WEIGHTS = {
  goals: 0.3,
  events: 0.2,
  educationStage: 0.15,
  incomePattern: 0.12,
  lifeStage: 0.1,
  supportRelationship: 0.08,
  confidence: 0.05,
};

/** THE normalized reader. Client-only (localStorage). Every recommendation
 *  surface should build off this instead of re-reading raw keys. */
export function readContext(): PersonalContext {
  const p = readLocalProfile();
  const about = readAboutYou();
  const checkins = readGoalCheckins();
  const rawStage = readStudentStage(); // disciplined: no tracker-default leak

  const lifeStage: LifeStage = (p?.role && LIFE_STAGE_MAP[p.role]) || "unknown";

  // Education stage is an EXPLICIT fact only. It comes from the stage answer
  // (profile sub-picker / homepage picker / a USED tracker — readStudentStage
  // handles that discipline). A non-student life stage with no stage answer
  // reads as "not currently a student"; a student with no answer stays unknown
  // (so we never invent "community college").
  let educationStage: EducationStage = "unknown";
  if (rawStage) educationStage = EDU_STAGE_MAP[rawStage] ?? "unknown";
  else if (lifeStage === "working_professional" || lifeStage === "retired")
    educationStage = "not_currently_a_student";

  const goals: Goal[] = [];
  const goalStatus: PersonalContext["goalStatus"] = {};
  for (const id of p?.goals ?? []) {
    const g = GOAL_MAP[id];
    if (!g || goals.includes(g)) continue;
    goals.push(g);
    const c = checkins[id];
    if (c) goalStatus[g] = c.status;
  }

  const incomePattern: IncomePattern =
    (about.income && INCOME_MAP[about.income]) || "unknown";
  const supportRelationship: SupportRelationship =
    (about.family && SUPPORT_MAP[about.family]) || "unknown";
  const confidence: Confidence =
    (about.confidence && CONFIDENCE_MAP[about.confidence]) || "unknown";

  const events: UpcomingEvent[] = [];
  for (const id of about.moments ?? []) {
    const e = EVENT_MAP[id];
    if (e && !events.includes(e)) events.push(e);
  }

  const hasUrgent = events.some((e) => URGENT_EVENTS.includes(e));

  // Weighted completeness.
  let completeness = 0;
  if (goals.length) completeness += PROFILE_WEIGHTS.goals;
  if (events.length) completeness += PROFILE_WEIGHTS.events;
  if (educationStage !== "unknown") completeness += PROFILE_WEIGHTS.educationStage;
  if (incomePattern !== "unknown") completeness += PROFILE_WEIGHTS.incomePattern;
  if (lifeStage !== "unknown") completeness += PROFILE_WEIGHTS.lifeStage;
  if (supportRelationship !== "unknown")
    completeness += PROFILE_WEIGHTS.supportRelationship;
  if (confidence !== "unknown") completeness += PROFILE_WEIGHTS.confidence;
  const profileCompleteness = Math.round(completeness * 100) / 100;

  // Confidence tiers: a goal or urgent event alone personalizes meaningfully;
  // life stage alone is "low"; nothing is "none".
  let personalizationConfidence: PersonalContext["personalizationConfidence"] =
    "none";
  if (goals.length || events.length) personalizationConfidence = "medium";
  if (
    (goals.length && events.length) ||
    (goals.length && educationStage !== "unknown") ||
    profileCompleteness >= 0.5
  )
    personalizationConfidence = "high";
  else if (
    personalizationConfidence === "none" &&
    (lifeStage !== "unknown" || educationStage !== "unknown")
  )
    personalizationConfidence = "low";

  return {
    lifeStage,
    educationStage,
    goals,
    goalStatus,
    incomePattern,
    supportRelationship,
    events,
    confidence,
    hasUrgent,
    profileCompleteness,
    personalizationConfidence,
  };
}
