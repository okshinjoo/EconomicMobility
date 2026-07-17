// Skill tree structure (July 16, 2026, owner ask: "a way to see how much
// progress you made and where you can be heading next"; expanded same day:
// "should feel comprehensive, and should cover everything" — every course,
// guided journey, and live calculator now hangs on its topic's branch, and
// a cross-cutting FIRST STEPS branch carries the quick wins: fill out the
// Budget Planner, do the Reality Check, take the quiz, build My Plan,
// round out your profile, browse resources, say something in community).
//
// The tree is PURE DERIVATION — the same rule as journeys. This builder runs
// server-side and assembles the map of everything learnable/doable; the
// client component lights nodes up from the existing trackers (read map,
// quiz scores, course badges, visited pages, calculator snapshots, profile,
// plan, pending community posts). Nothing new is stored, so the tree stays
// in sync with work done anywhere on the site — and syncs with accounts for
// free. Nothing ever locks: undone nodes dim, never gate (house rule: no
// sign-up walls, no artificial gates).

import { topics, type TopicId } from "./topics";
import { getTopicRoadmap, getArticleBySlug } from "./articles";
import { getTopicQuiz } from "./topicQuizzes";
import { knowledgeCheckBank } from "./quizData";
import {
  MIN_MASTERY_POOL,
  STARTER_ACTIONS,
  type MasteryQuestion,
  type StarterAction,
} from "./skillMastery";

// Client-safe pieces live in lib/skillMastery (bundle-size gotcha) and are
// re-exported here so server callers keep one import site.
export {
  MIN_MASTERY_POOL,
  MIN_TOPIC_POOL,
  STARTER_ACTIONS,
  type MasteryQuestion,
  type StarterAction,
} from "./skillMastery";
import { courses } from "./courses";
import { journeys } from "./journeys";
import { toolCategories } from "./toolsRegistry";

export interface SkillTierNode {
  label: string; // "Start here" / "Go deeper" / "Advanced"
  articles: { slug: string; title: string }[];
  /** Test-out question pool — EXISTING questions only (knowledge-check
   *  bank + this tier's article quizzes + the topic checkpoint on the
   *  last tier). Below MIN_MASTERY_POOL, no test-out is offered. */
  mastery: MasteryQuestion[];
}

export interface SkillLeafTool {
  label: string;
  href: string;
  /** The registry's one-line description — the activity panel's what+why. */
  blurb: string;
}

export interface SkillLeafCourse {
  id: string;
  title: string;
  color: string;
  /** The course's goal line — the activity panel's what+why. */
  blurb: string;
}

export interface SkillLeafJourney {
  id: string;
  title: string;
  /** The journey's promise line — the activity panel's what+why. */
  blurb: string;
}

export interface SkillBranch {
  id: TopicId;
  title: string;
  short: string;
  color: string;
  href: string; // topic hub
  tiers: SkillTierNode[];
  guideTotal: number;
  hasQuiz: boolean;
  /** Every live calculator in the topic's tool category. */
  tools: SkillLeafTool[];
  /** Every course whose reading list lives mostly in this topic. */
  courses: SkillLeafCourse[];
  /** Every guided journey shelved under this topic. */
  journeys: SkillLeafJourney[];
  /** Whole-topic test-out pool (union of the tier pools, deduped). */
  topicMastery: MasteryQuestion[];
}

/** Calculator categories shelved onto topic branches. */
const CATEGORY_TOPIC: Record<string, TopicId> = {
  budgeting: "budgeting",
  debt: "credit",
  saving: "investing",
  college: "college",
};

/** The debt journey's home topic is "government-aid" (the Government Aid &
 *  Debt Relief hub, where most of its guides live) — that's deliberate, not a
 *  bug. The tree alone re-files it under credit so the credit branch carries
 *  the payoff path; don't "fix" journeys.ts to match. */
const JOURNEY_TOPIC_FIX: Record<string, TopicId> = {
  debt: "credit",
};

export interface SkillTreeData {
  branches: SkillBranch[];
  starters: StarterAction[];
  guidesTotal: number;
  quizzesTotal: number;
  coursesTotal: number;
  toolsTotal: number;
}

/** Each course's home branch: the topic most of its reading list lives in. */
function courseTopic(articleSlugs: string[]): TopicId | null {
  const counts = new Map<TopicId, number>();
  for (const slug of articleSlugs) {
    const t = getArticleBySlug(slug)?.topicId;
    if (t) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  let best: TopicId | null = null;
  let bestN = 0;
  for (const [t, c] of counts) {
    if (c > bestN) {
      best = t;
      bestN = c;
    }
  }
  return best;
}

export function buildSkillTree(): SkillTreeData {
  const coursesByTopic = new Map<TopicId, SkillLeafCourse[]>();
  for (const c of courses) {
    const t = courseTopic(c.articleSlugs);
    if (!t) continue;
    const list = coursesByTopic.get(t) ?? [];
    list.push({ id: c.id, title: c.title, color: c.color, blurb: c.goal });
    coursesByTopic.set(t, list);
  }

  const toolsByTopic = new Map<TopicId, SkillLeafTool[]>();
  for (const cat of toolCategories) {
    const t = CATEGORY_TOPIC[cat.id];
    if (!t) continue;
    toolsByTopic.set(
      t,
      cat.items
        .filter((i) => i.status === "live")
        .map((i) => ({
          label: i.title,
          href: i.main ? cat.base : `${cat.base}/${i.slug}`,
          blurb: i.short,
        }))
    );
  }

  const journeysByTopic = new Map<TopicId, SkillLeafJourney[]>();
  for (const j of journeys) {
    const t = JOURNEY_TOPIC_FIX[j.id] ?? j.topic;
    const list = journeysByTopic.get(t) ?? [];
    list.push({ id: j.id, title: j.title, blurb: j.promise });
    journeysByTopic.set(t, list);
  }

  const branches: SkillBranch[] = topics.map((t) => {
    const bank = knowledgeCheckBank[t.id];
    const roadmap = getTopicRoadmap(t.id);
    const seen = new Set<string>();
    const dedupe = (qs: MasteryQuestion[]) =>
      qs.filter((q) => {
        if (seen.has(q.q)) return false;
        seen.add(q.q);
        return true;
      });
    const tiers = roadmap.map((g, ti) => {
      const pool: MasteryQuestion[] = [];
      if (ti === 0)
        pool.push(
          ...bank.beginner.map((q) => ({
            q: q.question,
            options: q.options,
            answer: q.correctIndex,
          }))
        );
      for (const a of g.articles)
        pool.push(
          ...(a.quiz ?? []).map((q) => ({
            q: q.question,
            options: q.options,
            answer: q.answer,
            explain: q.explain,
          }))
        );
      if (ti === roadmap.length - 1) {
        pool.push(
          ...bank.advanced.map((q) => ({
            q: q.question,
            options: q.options,
            answer: q.correctIndex,
          }))
        );
        pool.push(
          ...(getTopicQuiz(t.id) ?? []).map((q) => ({
            q: q.question,
            options: q.options,
            answer: q.answer,
            explain: q.explain,
          }))
        );
      }
      return {
        label: g.label,
        articles: g.articles.map((a) => ({ slug: a.slug, title: a.title })),
        mastery: dedupe(pool).slice(0, 8),
      };
    });
    const topicMastery = tiers.flatMap((x) => x.mastery).slice(0, 10);
    return {
      id: t.id,
      title: t.title,
      short: t.short,
      color: t.color,
      href: t.href,
      tiers,
      guideTotal: tiers.reduce((n, g) => n + g.articles.length, 0),
      hasQuiz: Boolean(getTopicQuiz(t.id)),
      tools: toolsByTopic.get(t.id) ?? [],
      courses: coursesByTopic.get(t.id) ?? [],
      journeys: journeysByTopic.get(t.id) ?? [],
      topicMastery,
    };
  });

  return {
    branches,
    starters: STARTER_ACTIONS,
    guidesTotal: branches.reduce((n, b) => n + b.guideTotal, 0),
    quizzesTotal: branches.filter((b) => b.hasQuiz).length,
    coursesTotal: branches.reduce((n, b) => n + b.courses.length, 0),
    toolsTotal: toolCategories
      .flatMap((c) => c.items)
      .filter((i) => i.status === "live").length,
  };
}
