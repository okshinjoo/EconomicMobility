// The PURE personalization decision rules (July 14 personalization audit).
//
// This module is deliberately dependency-free: no localStorage, no imports, no
// I/O. It takes a normalized `PersonalContext` (built by readContext() in
// personalization.ts from the person's saved factoids) and answers every
// recommendation question — what contradicts a known fact, how to rank the
// person's priorities, how to score a piece of content, which "Made for you"
// headline is safe to show, and where the Scholarship Finder should start.
//
// Keeping the rules pure means they can be unit-tested against constructed
// profiles with plain `node --experimental-strip-types` (see
// scripts/test-personalization.ts) — which is how we prove, deterministically,
// that a high-schooler never receives community-college copy.

// ---- Normalized value schema (internal values, never UI labels) ------------

export type LifeStage =
  | "student"
  | "working_professional"
  | "retired"
  | "unknown";

export type EducationStage =
  | "high_school"
  | "community_college"
  | "four_year_college"
  | "graduate_school"
  | "trade_or_vocational"
  | "not_currently_a_student"
  | "other"
  | "unknown";

export type IncomePattern =
  | "steady_paycheck"
  | "uneven_income"
  | "no_income"
  | "family_covers_most"
  | "unknown";

export type SupportRelationship =
  | "financially_independent"
  | "receives_family_support"
  | "supports_family"
  | "unknown";

export type UpcomingEvent =
  | "first_job"
  | "moving_out"
  | "heading_to_college"
  | "graduating"
  | "first_credit_card"
  | "money_tight"
  | "ready_to_invest"
  | "possible_scam";

export type Confidence = "beginner" | "intermediate" | "confident" | "unknown";

export type Goal =
  | "build_credit"
  | "pay_off_debt"
  | "improve_budgeting"
  | "build_emergency_fund"
  | "start_investing"
  | "pay_for_college"
  | "transfer_without_losing_money"
  | "buy_home"
  | "plan_for_retirement"
  | "protect_from_scams"
  | "save_for_goals";

export type GoalCheckinStatus = "not-started" | "started" | "halfway" | "done";

/** Events that describe an immediate safety/stability need. When present they
 *  outrank ordinary long-term goals in every ranked surface. */
export const URGENT_EVENTS: UpcomingEvent[] = ["possible_scam", "money_tight"];

/** Human-readable labels for normalized goals (for "why" reasons + chips). */
export const GOAL_LABEL: Record<Goal, string> = {
  build_credit: "build credit",
  pay_off_debt: "pay off debt",
  improve_budgeting: "budgeting",
  build_emergency_fund: "an emergency fund",
  start_investing: "investing",
  pay_for_college: "paying for college",
  transfer_without_losing_money: "transferring without losing credits",
  buy_home: "buying a home",
  plan_for_retirement: "retirement",
  protect_from_scams: "protecting your money",
  save_for_goals: "saving toward a goal",
};

export interface PersonalContext {
  lifeStage: LifeStage;
  educationStage: EducationStage;
  goals: Goal[];
  /** Goals whose self-reported check-in status the person set. */
  goalStatus: Partial<Record<Goal, GoalCheckinStatus>>;
  incomePattern: IncomePattern;
  supportRelationship: SupportRelationship;
  events: UpcomingEvent[];
  confidence: Confidence;
  /** True while any URGENT_EVENT is active — stability/safety leads. */
  hasUrgent: boolean;
  /** How much useful signal is known (0–1), weighted by usefulness. */
  profileCompleteness: number;
  /** Enough is known to personalize confidently (not just "something saved"). */
  personalizationConfidence: "none" | "low" | "medium" | "high";
}

// ---- Contradiction guard ---------------------------------------------------
// The negative half of personalization: what must NOT be shown. Copy or a
// primary recommendation that asserts one of these claims is disqualified when
// the context contradicts it (the guard returns true → drop it to general
// browsing, don't feature it). Unknowns never contradict — we don't guess.

export type Claim =
  | "is_in_community_college"
  | "is_in_high_school"
  | "is_transfer_student"
  | "has_earned_income"
  | "is_financially_independent"
  | "no_dependents"
  | "advanced_reader";

export function contradicts(claim: Claim, ctx: PersonalContext): boolean {
  switch (claim) {
    case "is_in_community_college":
      // The reported bug: never tell a high-schooler they're in CC. Any known
      // education stage that isn't CC contradicts it.
      return (
        ctx.educationStage !== "unknown" &&
        ctx.educationStage !== "community_college"
      );
    case "is_in_high_school":
      return (
        ctx.educationStage !== "unknown" && ctx.educationStage !== "high_school"
      );
    case "is_transfer_student":
      // "You're a transfer student" is only safe for a CC student. A transfer
      // GOAL is a plan, not a current status (a high-schooler may want to
      // transfer later), so goal alone does not make the claim true.
      return (
        ctx.educationStage !== "unknown" &&
        ctx.educationStage !== "community_college"
      );
    case "has_earned_income":
      return (
        ctx.incomePattern === "no_income" ||
        ctx.incomePattern === "family_covers_most"
      );
    case "is_financially_independent":
      return (
        ctx.supportRelationship === "receives_family_support" ||
        ctx.incomePattern === "family_covers_most"
      );
    case "no_dependents":
      return ctx.supportRelationship === "supports_family";
    case "advanced_reader":
      return ctx.confidence === "beginner";
    default:
      return false;
  }
}

// ---- Precedence-aware priority ranking -------------------------------------
// Documented hierarchy (highest first):
//   1. immediate safety / stability (possible_scam, money_tight)
//   2. upcoming time-sensitive events
//   3. directly selected goals
//   4. explicit life-stage / education facts
//   5. confidence-appropriate difficulty (presentation lever, not a topic)
// Urgent events promote their RELATED goal so stability leads without erasing
// the person's other goals — those fall to a lower band.

const EVENT_PRIORITY_GOAL: Partial<Record<UpcomingEvent, Goal>> = {
  possible_scam: "protect_from_scams",
  money_tight: "improve_budgeting",
  heading_to_college: "pay_for_college",
  graduating: "pay_off_debt",
  first_credit_card: "build_credit",
  ready_to_invest: "start_investing",
  moving_out: "improve_budgeting",
  first_job: "improve_budgeting",
};

const EVENT_REASON: Record<UpcomingEvent, string> = {
  possible_scam: "Immediate steps if you think you were scammed",
  money_tight: "Prioritized because you said money is tight",
  heading_to_college: "Recommended because you're heading to college",
  graduating: "Recommended because you're graduating",
  first_credit_card: "Because you want your first credit card",
  ready_to_invest: "Because you're ready to start investing",
  moving_out: "Recommended because you're moving out",
  first_job: "Recommended because you just started a job",
};

export interface PriorityBand {
  /** "now" = urgent/time-sensitive, "next" = selected goals. */
  tier: "now" | "next";
  goal: Goal;
  reason: string;
}

/** The person's goals, reorganized into now / next by precedence. Urgent
 *  events float their related goal into "now" even if not selected. */
export function rankedPriorities(ctx: PersonalContext): PriorityBand[] {
  const bands: PriorityBand[] = [];
  const seen = new Set<Goal>();

  const orderedEvents = [
    ...ctx.events.filter((e) => URGENT_EVENTS.includes(e)),
    ...ctx.events.filter((e) => !URGENT_EVENTS.includes(e)),
  ];
  for (const e of orderedEvents) {
    const g = EVENT_PRIORITY_GOAL[e];
    if (!g || seen.has(g)) continue;
    seen.add(g);
    bands.push({ tier: "now", goal: g, reason: EVENT_REASON[e] });
  }

  for (const g of ctx.goals) {
    if (seen.has(g)) continue;
    seen.add(g);
    bands.push({
      tier: "next",
      goal: g,
      reason: `Based on your goal to ${GOAL_LABEL[g]}`,
    });
  }

  return bands;
}

// ---- Content scoring framework ---------------------------------------------
// Structured metadata a content item MAY carry, and a documented additive
// scorer. Deliberately simple and centralized: explicit goal/event matches
// dominate, contradictions disqualify from featuring, urgency reshuffles.

export interface ContentMeta {
  goals?: Goal[];
  lifeStages?: LifeStage[];
  educationStages?: EducationStage[];
  incomePatterns?: IncomePattern[];
  events?: UpcomingEvent[];
  /** Difficulty of the item; compared against the reader's confidence. */
  difficulty?: Confidence;
  /** Marks time-sensitive/safety content (paired with an event). */
  urgent?: boolean;
  /** Claim the item's PRIMARY copy asserts — disqualifies on contradiction. */
  asserts?: Claim;
  /** Useful to almost everyone (small always-on floor). */
  broadlyUseful?: boolean;
}

export interface ScoreResult {
  score: number;
  reasons: string[];
  /** True when a contradiction disqualifies it from the featured slot. */
  disqualified: boolean;
}

export function scoreContent(
  meta: ContentMeta,
  ctx: PersonalContext
): ScoreResult {
  const reasons: string[] = [];
  let score = 0;

  const disqualified = meta.asserts ? contradicts(meta.asserts, ctx) : false;

  const goalHit = meta.goals?.find((g) => ctx.goals.includes(g));
  if (goalHit) {
    score += 40;
    reasons.push(`Based on your goal to ${GOAL_LABEL[goalHit]}`);
  }

  const eventHit = meta.events?.find((e) => ctx.events.includes(e));
  if (eventHit) {
    score += URGENT_EVENTS.includes(eventHit) ? 60 : 35;
    reasons.push(EVENT_REASON[eventHit]);
  }

  if (
    meta.educationStages &&
    ctx.educationStage !== "unknown" &&
    meta.educationStages.includes(ctx.educationStage)
  )
    score += 20;

  if (
    meta.lifeStages &&
    ctx.lifeStage !== "unknown" &&
    meta.lifeStages.includes(ctx.lifeStage)
  )
    score += 12;

  if (
    meta.incomePatterns &&
    ctx.incomePattern !== "unknown" &&
    meta.incomePatterns.includes(ctx.incomePattern)
  ) {
    score += 14;
    reasons.push("Useful for how your income comes in");
  }

  if (meta.difficulty && ctx.confidence !== "unknown") {
    if (meta.difficulty === ctx.confidence) score += 6;
    else if (ctx.confidence === "beginner" && meta.difficulty === "confident")
      score -= 8;
  }

  if (meta.broadlyUseful) score += 4;

  // When money is tight, actively push down accumulation/big-purchase topics.
  if (
    ctx.hasUrgent &&
    !meta.urgent &&
    meta.goals?.some((g) => g === "buy_home" || g === "start_investing")
  )
    score -= 20;

  return { score, reasons, disqualified };
}

// ---- Homepage "Made for you" copy selector ---------------------------------
// Picks the ONE most meaningful, non-contradictory headline. Never asserts a
// status the profile contradicts (the transfer-play line requires an actual
// community-college stage — a transfer GOAL is not enough on its own). Falls
// back to neutral "A good place to start" when too little is known.

export interface MadeForYouCopy {
  /** true when it's genuinely tailored; false = neutral fallback. */
  personalized: boolean;
  kicker: string; // "Made for you" | "A good place to start"
  headline: string;
  sub: string;
  /** Where the primary CTA should point (an existing route). */
  href: string;
  /** Short "why you're seeing this". Empty for the neutral fallback. */
  reason: string;
}

export const NEUTRAL_COPY: MadeForYouCopy = {
  personalized: false,
  kicker: "A good place to start",
  headline: "New here? Start with the basics.",
  sub: "Take the 2-minute quiz and we'll point you to the right first guides — no account needed.",
  href: "/quiz",
  reason: "",
};

// Normalized goal → the /journey/[goal] slug (journeys are keyed to the legacy
// goal ids, so this maps back).
const GOAL_TO_JOURNEY: Record<Goal, string> = {
  build_credit: "credit",
  pay_off_debt: "debt",
  improve_budgeting: "budget",
  build_emergency_fund: "emergency",
  start_investing: "invest",
  pay_for_college: "college",
  transfer_without_losing_money: "transfer",
  buy_home: "home",
  plan_for_retirement: "retirement",
  protect_from_scams: "safety",
  save_for_goals: "budget",
};

/** The /journey/[slug] a normalized goal maps to (journeys are keyed to the
 *  legacy goal ids). Lets goal-driven surfaces link the right path. */
export function journeySlugForGoal(g: Goal): string {
  return GOAL_TO_JOURNEY[g];
}

// Which goals each of the 9 Learn topics serves. This is the leverage point
// that lets ANY article inherit goal relevance from its topic — so goals can
// rank guides without hand-tagging 200+ articles. Keyed by TopicId string to
// keep this module dependency-free (topics.ts isn't imported here). Topics
// with no clean goal (taxes, insurance) map to [] and simply never boost.
export const TOPIC_GOALS: Record<string, Goal[]> = {
  credit: ["build_credit", "pay_off_debt"],
  budgeting: ["improve_budgeting", "build_emergency_fund", "save_for_goals"],
  college: ["pay_for_college", "transfer_without_losing_money"],
  investing: ["start_investing", "plan_for_retirement"],
  "home-ownership": ["buy_home"],
  "money-safety": ["protect_from_scams"],
  "government-aid": ["pay_for_college"],
  taxes: [],
  insurance: [],
};

/** Goals a Learn topic serves (empty when none). */
export function goalsForTopic(topicId: string): Goal[] {
  return TOPIC_GOALS[topicId] ?? [];
}

/** True when a topic serves at least one goal the person selected — the hook
 *  goal-aware surfaces use to surface a topic's guides first. */
export function topicMatchesGoals(
  topicId: string,
  ctx: PersonalContext
): boolean {
  return goalsForTopic(topicId).some((g) => ctx.goals.includes(g));
}

export function madeForYouCopy(ctx: PersonalContext): MadeForYouCopy {
  const has = (e: UpcomingEvent) => ctx.events.includes(e);
  const wants = (g: Goal) => ctx.goals.includes(g);

  // 1. Possible scam — urgent, safety-first, above everything.
  if (has("possible_scam"))
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Think something's wrong? Take these steps now.",
      sub: "Secure your accounts, contact your bank, and report it — the immediate moves come first.",
      href: "/learn/money-safety/if-youve-been-scammed",
      reason: "Immediate steps if you think you were scammed",
    };

  // 2. Money is tight — stability before anything long-term.
  if (has("money_tight"))
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Start with what needs attention now.",
      sub: "Essential expenses, bills, and options that can create a little breathing room.",
      href: "/journey/budget",
      reason: "Prioritized because you said money is tight",
    };

  // 3. Heading to college / high-school college planning — aid & cost first.
  //    Guarded: this is the RIGHT home for a high-schooler, no CC claim.
  if (
    has("heading_to_college") ||
    (ctx.educationStage === "high_school" && wants("pay_for_college"))
  )
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Planning for college? Start with the money side.",
      sub: "Scholarships, financial aid, and the real cost of each option — before you owe anyone anything.",
      href: "/journey/college",
      reason: has("heading_to_college")
        ? "Recommended because you're heading to college"
        : "Based on your goal to pay for college",
    };

  // 4. Transfer play — ONLY for an actual community-college student (the
  //    contradiction guard). A transfer goal from a high-schooler routed to
  //    college planning above, never here.
  if (
    ctx.educationStage === "community_college" &&
    (wants("transfer_without_losing_money") || wants("pay_for_college"))
  )
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Planning to transfer? Protect every credit.",
      sub: "Compare total costs, keep your aid, and find scholarships built for transfer students.",
      href: "/journey/transfer",
      reason: "Because you're at community college and want to transfer",
    };

  // 5. Graduating — early-career transition.
  if (has("graduating"))
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Graduating? Here's the money side of the leap.",
      sub: "Your first real paycheck, benefits, taxes, and a plan for any student loans.",
      href: "/life",
      reason: "Recommended because you're graduating",
    };

  // 6. Uneven income + budgeting — flex-budget angle.
  if (ctx.incomePattern === "uneven_income" && wants("improve_budgeting"))
    return {
      personalized: true,
      kicker: "Made for you",
      headline: "Your income changes month to month.",
      sub: "Build a budget that flexes with it instead of fighting it — baseline months, buffers, sinking funds.",
      href: "/journey/budget",
      reason: "Useful when income comes in unevenly",
    };

  // 7. Any top-priority goal → a goal-based line (respects urgency ordering).
  const top = rankedPriorities(ctx)[0];
  if (top)
    return {
      personalized: true,
      kicker: "Made for you",
      headline: `Working on ${GOAL_LABEL[top.goal]}? Here's your path.`,
      sub: "A short, ordered set of guides and tools for exactly this — nothing you've already finished.",
      href: `/journey/${GOAL_TO_JOURNEY[top.goal] ?? ""}`,
      reason: top.reason,
    };

  return NEUTRAL_COPY;
}

// ---- Incomplete profile: one useful question at a time ---------------------
// The audit's rule for missing info: don't guess, don't interrogate — ask the
// SINGLE most useful question, explain the benefit, and stay fully usable
// without it. Returns null once enough is known to personalize well.

export interface ProfilePrompt {
  question: string;
  /** What answering unlocks — the benefit, stated plainly. */
  benefit: string;
  /** Where to answer (the account "About you" tab). */
  href: string;
}

export function nextProfilePrompt(ctx: PersonalContext): ProfilePrompt | null {
  const href = "/account";

  // Most valuable first: a goal drives the most surfaces.
  if (ctx.goals.length === 0)
    return {
      question: "What's one thing you're working toward?",
      benefit: "Pick a goal and your dashboard, plan, and guides all sharpen to it.",
      href,
    };

  // A student with no education stage → scholarships/deadlines stay generic.
  if (ctx.lifeStage === "student" && ctx.educationStage === "unknown")
    return {
      question: "Where are you in school?",
      benefit: "Tell us and scholarships, deadlines, and student guides fit your stage.",
      href,
    };

  // Income shapes budgeting + which actions are safe to suggest.
  if (ctx.incomePattern === "unknown")
    return {
      question: "How does money come in month to month?",
      benefit: "It changes which budgeting approach and next steps we suggest.",
      href,
    };

  // Confidence tunes depth/tone.
  if (ctx.confidence === "unknown")
    return {
      question: "How comfortable are you with money stuff?",
      benefit: "It sets how much we explain — no jargon dumps, no over-explaining.",
      href,
    };

  return null; // enough known — stop prompting
}

// ---- Scholarship Finder default --------------------------------------------
// The finder's own stage vocabulary is "high-school" | "college" | "transfer"
// (different slugs from the profile's hs/cc/uni — exactly the kind of split the
// audit flagged). Resolve a sensible, EDITABLE default from the normalized
// context, plus a plain-English reason for the "Started with X" note.

export type ScholarshipStage = "high-school" | "college" | "transfer";

export interface ScholarshipDefault {
  stage: ScholarshipStage | null;
  reason: string;
}

export function scholarshipDefault(ctx: PersonalContext): ScholarshipDefault {
  if (ctx.educationStage === "high_school")
    return { stage: "high-school", reason: "you're in high school" };

  if (ctx.educationStage === "community_college") {
    if (
      ctx.goals.includes("transfer_without_losing_money") ||
      ctx.events.includes("heading_to_college")
    )
      return { stage: "transfer", reason: "you're planning to transfer" };
    return { stage: "college", reason: "you're in community college" };
  }

  if (
    ctx.educationStage === "four_year_college" ||
    ctx.educationStage === "graduate_school"
  )
    return { stage: "college", reason: "you're in college" };

  if (ctx.events.includes("heading_to_college"))
    return { stage: "high-school", reason: "you're heading to college" };

  if (
    ctx.lifeStage === "working_professional" &&
    (ctx.goals.includes("pay_for_college") ||
      ctx.goals.includes("transfer_without_losing_money"))
  )
    return { stage: "college", reason: "you're working toward college" };

  return { stage: null, reason: "" };
}
