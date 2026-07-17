// Skill points (July 16, 2026, owner ask: "progressing in the skill tree
// should give you points that stay on your profile"). Honest by
// construction, the Community-Cred pattern: the score is DERIVED from the
// same trackers the skill tree lights up from — read map, topic-quiz
// scores, course badges, visited tools, and the First-steps trackers.
// NOTHING NEW IS STORED: the number recomputes from what you've actually
// done, works signed out, and follows an account automatically because the
// underlying trackers already sync. Points are personal — they render on
// /skills and the signed-in dashboard, never on public member pages.
//
// Client-only readers (localStorage) — call post-mount, like the trackers.

import { loadJSON, STORAGE_KEYS } from "./storage";
import { getReadMap } from "./readTracking";
import { PLAN_KEY } from "./plan";
import { readLocalProfile } from "./profile";
import { getMasteryMap } from "./skillMastery";

/** Point value per kind of finished work. */
export const SKILL_POINTS = {
  guide: 10, // article read
  tool: 15, // calculator tried
  starter: 20, // First-steps quick win
  quiz: 25, // topic checkpoint quiz passed
  mastery: 30, // branch section mastered via test-out
  course: 50, // course badge earned
} as const;

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";
const COURSE_BADGES_KEY = "empower:course-badges:v1";

export interface SkillPointCounts {
  guides: number;
  quizzes: number;
  courses: number;
  tools: number;
  starters: number;
  /** Branch sections mastered via test-out quizzes. */
  mastered: number;
}

export function skillPointsTotal(c: SkillPointCounts): number {
  return (
    c.guides * SKILL_POINTS.guide +
    c.quizzes * SKILL_POINTS.quiz +
    c.courses * SKILL_POINTS.course +
    c.tools * SKILL_POINTS.tool +
    c.starters * SKILL_POINTS.starter +
    c.mastered * SKILL_POINTS.mastery
  );
}

function isToolPath(p: string): boolean {
  return p.startsWith("/tools/") || p.startsWith("/students/tools/");
}

/** First-steps actions proven done by trackers that already exist —
 *  shared by the skill tree and the points readers. */
export function readStarterSet(): Set<string> {
  const starters = new Set<string>();
  if (loadJSON(STORAGE_KEYS.quizResult) !== null) starters.add("quiz");
  if (loadJSON(STORAGE_KEYS.budget) !== null) starters.add("budget");
  if (loadJSON(STORAGE_KEYS.realityCheck) !== null) starters.add("reality");
  if (loadJSON(PLAN_KEY) !== null) starters.add("plan");
  const profile = readLocalProfile();
  if (profile && (profile.goals.length > 0 || profile.displayName))
    starters.add("profile");
  const visited =
    loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
  if (visited["/resources"] || visited["/students/resources"])
    starters.add("resources");
  const pendingPosts =
    loadJSON<Record<string, unknown>>("empower:community-posts:v1") ?? {};
  const pendingComments =
    loadJSON<Record<string, unknown>>("empower:community-comments:v1") ?? {};
  if (Object.keys(pendingPosts).length + Object.keys(pendingComments).length > 0)
    starters.add("community");
  return starters;
}

/** Count every point-earning thing this device's trackers can prove. */
export function readSkillCounts(): SkillPointCounts {
  const read = getReadMap();
  const guides = Object.keys(read).filter((k) => !k.startsWith("blog/")).length;
  const scores = loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {};
  const quizzes = Object.keys(scores).filter((k) =>
    k.startsWith("topic-quiz:")
  ).length;
  const courses = Object.keys(
    loadJSON<Record<string, unknown>>(COURSE_BADGES_KEY) ?? {}
  ).length;
  const visited =
    loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
  const tools = Object.keys(visited).filter(isToolPath).length;
  return {
    guides,
    quizzes,
    courses,
    tools,
    starters: readStarterSet().size,
    mastered: Object.keys(getMasteryMap()).length,
  };
}
