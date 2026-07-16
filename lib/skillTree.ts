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
import { courses } from "./courses";
import { journeys } from "./journeys";
import { toolCategories } from "./toolsRegistry";

export interface SkillTierNode {
  label: string; // "Start here" / "Go deeper" / "Advanced"
  articles: { slug: string; title: string }[];
}

export interface SkillLeafTool {
  label: string;
  href: string;
}

export interface SkillLeafCourse {
  id: string;
  title: string;
  color: string;
}

export interface SkillLeafJourney {
  id: string;
  title: string;
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
}

/** Cross-cutting quick wins — the "First steps" branch. `kind` tells the
 *  client which existing tracker proves it done. */
export interface StarterAction {
  id: string;
  label: string;
  /** Compact label for the map bubbles. */
  short: string;
  href: string;
  kind:
    | "quiz"
    | "budget"
    | "reality"
    | "plan"
    | "profile"
    | "resources"
    | "community";
}

export const STARTER_ACTIONS: StarterAction[] = [
  {
    id: "quiz",
    label: "Take the 2-minute quiz",
    short: "2-minute quiz",
    href: "/quiz",
    kind: "quiz",
  },
  {
    id: "budget",
    label: "Fill out the Budget Planner",
    short: "Budget Planner",
    href: "/tools/budget",
    kind: "budget",
  },
  {
    id: "reality",
    label: "Do the Reality Check",
    short: "Reality Check",
    href: "/tools/budget/reality-check",
    kind: "reality",
  },
  {
    id: "plan",
    label: "Build My Plan",
    short: "Build My Plan",
    href: "/plan",
    kind: "plan",
  },
  {
    id: "profile",
    label: "Fill out your profile",
    short: "Your profile",
    href: "/account",
    kind: "profile",
  },
  {
    id: "resources",
    label: "Browse the resource library",
    short: "Resource library",
    href: "/resources",
    kind: "resources",
  },
  {
    id: "community",
    label: "Say something in the community",
    short: "Say hello",
    href: "/community",
    kind: "community",
  },
];

/** Calculator categories shelved onto topic branches. */
const CATEGORY_TOPIC: Record<string, TopicId> = {
  budgeting: "budgeting",
  debt: "credit",
  saving: "investing",
  college: "college",
};

/** One journey is mis-shelved at the source (debt carries topic
 *  "government-aid"); the tree files it where debt lives on this site. */
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
    list.push({ id: c.id, title: c.title, color: c.color });
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
        }))
    );
  }

  const journeysByTopic = new Map<TopicId, SkillLeafJourney[]>();
  for (const j of journeys) {
    const t = JOURNEY_TOPIC_FIX[j.id] ?? j.topic;
    const list = journeysByTopic.get(t) ?? [];
    list.push({ id: j.id, title: j.title });
    journeysByTopic.set(t, list);
  }

  const branches: SkillBranch[] = topics.map((t) => {
    const tiers = getTopicRoadmap(t.id).map((g) => ({
      label: g.label,
      articles: g.articles.map((a) => ({ slug: a.slug, title: a.title })),
    }));
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
