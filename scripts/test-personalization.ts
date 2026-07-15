// Deterministic tests for the pure personalization rules (July 14 audit).
// Run: node --experimental-strip-types scripts/test-personalization.ts
//
// Imports ONLY lib/personalizationRules.ts (dependency-free), so plain node
// runs it — no browser, no build step. Each case constructs a normalized
// PersonalContext and asserts the recommendation outcomes the audit requires,
// above all that a high-schooler never receives community-college copy.

import {
  contradicts,
  rankedPriorities,
  scoreContent,
  madeForYouCopy,
  scholarshipDefault,
  journeySlugForGoal,
  nextProfilePrompt,
  goalsForTopic,
  topicMatchesGoals,
  NEUTRAL_COPY,
  type PersonalContext,
  type ContentMeta,
} from "../lib/personalizationRules.ts";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    passed++;
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${name}`);
  }
}

// Build a context with sensible "unknown/empty" defaults.
function ctx(partial: Partial<PersonalContext>): PersonalContext {
  const base: PersonalContext = {
    lifeStage: "unknown",
    educationStage: "unknown",
    goals: [],
    goalStatus: {},
    incomePattern: "unknown",
    supportRelationship: "unknown",
    events: [],
    confidence: "unknown",
    hasUrgent: false,
    profileCompleteness: 0,
    personalizationConfidence: "none",
  };
  const merged = { ...base, ...partial };
  merged.hasUrgent = merged.events.some(
    (e) => e === "possible_scam" || e === "money_tight"
  );
  return merged;
}
const lower = (c: ReturnType<typeof madeForYouCopy>) =>
  `${c.headline} ${c.sub}`.toLowerCase();

// ---- A. High-school college-planning profile -------------------------------
{
  const c = ctx({
    lifeStage: "student",
    educationStage: "high_school",
    goals: ["pay_for_college", "build_credit"],
    incomePattern: "no_income",
    supportRelationship: "receives_family_support",
    events: ["heading_to_college", "first_credit_card"],
    confidence: "beginner",
  });
  const copy = madeForYouCopy(c);
  console.log("A. High-school college-planning:", copy.headline);
  check("A no community-college copy", !lower(copy).includes("community college"));
  check("A not the transfer-play line", copy.href !== "/journey/transfer");
  check("A routes to college planning", copy.href === "/journey/college");
  check("A contradicts is_in_community_college", contradicts("is_in_community_college", c));
  check("A contradicts is_transfer_student (goal ≠ status)", contradicts("is_transfer_student", c));
  check("A scholarship default = high-school", scholarshipDefault(c).stage === "high-school");
  check("A no-income contradicts has_earned_income", contradicts("has_earned_income", c));
}

// ---- B. Community-college transfer, money tight ----------------------------
{
  const c = ctx({
    lifeStage: "student",
    educationStage: "community_college",
    goals: ["transfer_without_losing_money", "pay_for_college"],
    incomePattern: "uneven_income",
    supportRelationship: "supports_family",
    events: ["money_tight"],
    confidence: "intermediate",
  });
  const copy = madeForYouCopy(c);
  console.log("B. CC transfer + money tight:", copy.headline);
  check("B stability leads over transfer", copy.reason.includes("money is tight"));
  check("B scholarship default = transfer", scholarshipDefault(c).stage === "transfer");
  check("B CC claim is NOT a contradiction", !contradicts("is_in_community_college", c));
  const bands = rankedPriorities(c);
  check("B top priority is now-tier budgeting", bands[0]?.tier === "now" && bands[0]?.goal === "improve_budgeting");
  check("B transfer goal still present", bands.some((b) => b.goal === "transfer_without_losing_money"));
}

// ---- C. Working professional, investing ------------------------------------
{
  const c = ctx({
    lifeStage: "working_professional",
    educationStage: "not_currently_a_student",
    incomePattern: "steady_paycheck",
    supportRelationship: "financially_independent",
    goals: ["build_emergency_fund", "start_investing", "plan_for_retirement"],
    confidence: "confident",
  });
  const copy = madeForYouCopy(c);
  console.log("C. Worker investing:", copy.headline);
  check("C personalized (no urgent, goal-led)", copy.personalized);
  const investItem: ContentMeta = { goals: ["start_investing"], difficulty: "confident" };
  const studentItem: ContentMeta = { lifeStages: ["student"], broadlyUseful: true };
  check("C investing outranks student-only", scoreContent(investItem, c).score > scoreContent(studentItem, c).score);
  check("C has earned income (no contradiction)", !contradicts("has_earned_income", c));
  check("C scholarship default = null", scholarshipDefault(c).stage === null);
}

// ---- D. Working professional under financial pressure ----------------------
{
  const c = ctx({
    lifeStage: "working_professional",
    incomePattern: "uneven_income",
    supportRelationship: "supports_family",
    goals: ["pay_off_debt", "improve_budgeting"],
    events: ["money_tight"],
    confidence: "beginner",
  });
  const copy = madeForYouCopy(c);
  console.log("D. Worker pressure:", copy.headline);
  check("D stability first", copy.reason.includes("money is tight"));
  const debtItem: ContentMeta = { goals: ["pay_off_debt"] };
  const investItem: ContentMeta = { goals: ["start_investing"] };
  check("D debt outranks investing under pressure", scoreContent(debtItem, c).score > scoreContent(investItem, c).score);
  check("D investing is penalized (money tight)", scoreContent(investItem, c).score < 0);
  check("D supports family → no_dependents contradicts", contradicts("no_dependents", c));
  check("D beginner → advanced_reader contradicts", contradicts("advanced_reader", c));
}

// ---- E. Retired scam concern -----------------------------------------------
{
  const c = ctx({
    lifeStage: "retired",
    supportRelationship: "supports_family",
    goals: ["protect_from_scams", "improve_budgeting"],
    events: ["possible_scam"],
    confidence: "confident",
  });
  const copy = madeForYouCopy(c);
  console.log("E. Retired scam:", copy.headline);
  check("E scam response leads", copy.href === "/learn/money-safety/if-youve-been-scammed");
  check("E scam reason shown", copy.reason.toLowerCase().includes("scam"));
  const bands = rankedPriorities(c);
  check("E top priority is scam protection (now)", bands[0]?.goal === "protect_from_scams" && bands[0]?.tier === "now");
  check("E not a student → scholarship default null", scholarshipDefault(c).stage === null);
}

// ---- F. Many goals, no events ----------------------------------------------
{
  const goals = [
    "build_credit",
    "pay_off_debt",
    "improve_budgeting",
    "start_investing",
    "buy_home",
    "plan_for_retirement",
  ] as const;
  const c = ctx({ lifeStage: "working_professional", goals: [...goals] });
  const bands = rankedPriorities(c);
  console.log("F. Many goals → bands:", bands.length);
  check("F every goal ranked once", bands.length === goals.length);
  check("F no duplicate goals", new Set(bands.map((b) => b.goal)).size === bands.length);
  check("F all in next-tier (no urgent)", bands.every((b) => b.tier === "next"));
  check("F personalized", madeForYouCopy(c).personalized);
}

// ---- G. Incomplete profile -------------------------------------------------
{
  const c = ctx({ lifeStage: "student" }); // life stage only, nothing else
  const copy = madeForYouCopy(c);
  console.log("G. Incomplete:", copy.headline);
  check("G falls back to neutral", copy === NEUTRAL_COPY || (!copy.personalized && copy.kicker === "A good place to start"));
  check("G neutral is not misleading 'Made for you'", copy.kicker !== "Made for you");
}

// ---- H. Transfer GOAL from a high-schooler is not a status -----------------
{
  const c = ctx({
    lifeStage: "student",
    educationStage: "high_school",
    goals: ["transfer_without_losing_money"],
  });
  const copy = madeForYouCopy(c);
  console.log("H. HS + transfer goal:", copy.headline);
  check("H no community-college claim", !lower(copy).includes("community college"));
  check("H not the CC transfer-play headline", !lower(copy).includes("protect every credit"));
  check("H is_transfer_student still contradicts", contradicts("is_transfer_student", c));
}

// ---- I. journeySlugForGoal + urgency→journey ordering ----------------------
{
  check("I credit goal → credit journey", journeySlugForGoal("build_credit") === "credit");
  check("I transfer goal → transfer journey", journeySlugForGoal("transfer_without_losing_money") === "transfer");
  check("I budgeting goal → budget journey", journeySlugForGoal("improve_budgeting") === "budget");
  check("I scam goal → safety journey", journeySlugForGoal("protect_from_scams") === "safety");

  // Money-tight context: the now-tier goal must map to the budget journey, so
  // JourneyIndex floats it to the top.
  const tight = ctx({ goals: ["start_investing"], events: ["money_tight"] });
  const nowSlugs = rankedPriorities(tight)
    .filter((b) => b.tier === "now")
    .map((b) => journeySlugForGoal(b.goal));
  check("I money-tight floats budget journey", nowSlugs.includes("budget"));

  // Scam context floats the safety journey.
  const scam = ctx({ goals: ["plan_for_retirement"], events: ["possible_scam"] });
  const scamNow = rankedPriorities(scam)
    .filter((b) => b.tier === "now")
    .map((b) => journeySlugForGoal(b.goal));
  check("I scam floats safety journey", scamNow.includes("safety"));
}

// ---- J. Incomplete-profile: one useful question at a time ------------------
{
  const empty = ctx({ lifeStage: "student" });
  check("J no goals → asks about a goal", nextProfilePrompt(empty)?.question.toLowerCase().includes("working toward") === true);

  const studentNoStage = ctx({ lifeStage: "student", goals: ["pay_for_college"] });
  check("J student, no stage → asks where in school", nextProfilePrompt(studentNoStage)?.question.toLowerCase().includes("school") === true);

  const noIncome = ctx({ lifeStage: "working_professional", goals: ["pay_off_debt"], educationStage: "not_currently_a_student" });
  check("J no income → asks how money comes in", nextProfilePrompt(noIncome)?.question.toLowerCase().includes("month") === true);

  const enough = ctx({
    lifeStage: "working_professional",
    educationStage: "not_currently_a_student",
    goals: ["pay_off_debt"],
    incomePattern: "steady_paycheck",
    confidence: "intermediate",
  });
  check("J enough known → no prompt", nextProfilePrompt(enough) === null);
}

// ---- K. Topic → goal inheritance ------------------------------------------
{
  check("K credit topic serves build_credit", goalsForTopic("credit").includes("build_credit"));
  check("K investing topic serves start_investing", goalsForTopic("investing").includes("start_investing"));
  check("K college topic serves pay_for_college", goalsForTopic("college").includes("pay_for_college"));
  check("K money-safety serves protect_from_scams", goalsForTopic("money-safety").includes("protect_from_scams"));
  check("K taxes serves no goal (no overreach)", goalsForTopic("taxes").length === 0);
  check("K unknown topic → empty", goalsForTopic("nonsense").length === 0);

  const investor = ctx({ goals: ["start_investing"] });
  check("K investing topic matches an investor", topicMatchesGoals("investing", investor));
  check("K credit topic does NOT match an investor", !topicMatchesGoals("credit", investor));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exitCode = 1;
