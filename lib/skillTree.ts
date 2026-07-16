// Skill tree structure (July 16, 2026, owner ask: "a way to see how much
// progress you made and where you can be heading next").
//
// The tree is PURE DERIVATION — the same rule as journeys. This builder runs
// server-side and assembles the map of everything learnable (topic roadmap
// tiers, the topic quiz "boss" node, the topic's tool, its flagship course);
// the client component lights nodes up from the existing trackers (read map,
// quiz scores, course badges, visited tools). Nothing new is stored, so the
// tree stays in sync with work done anywhere on the site — and syncs with
// accounts for free. Nothing ever locks: undone nodes dim, never gate
// (house rule: no sign-up walls, no artificial gates).

import { topics, type TopicId } from "./topics";
import { getTopicRoadmap } from "./articles";
import { learnContent } from "./learnContent";
import { getTopicQuiz } from "./topicQuizzes";
import { courses } from "./courses";
import { toolCategories } from "./toolsRegistry";

export interface SkillTierNode {
  label: string; // "Start here" / "Go deeper" / "Advanced"
  articles: { slug: string; title: string }[];
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
  tool: { label: string; href: string } | null;
  course: { id: string; title: string; color: string } | null;
}

/** Each topic's flagship course (one per branch; absence is fine). */
const TOPIC_COURSE: Partial<Record<TopicId, string>> = {
  credit: "credit-from-zero",
  budgeting: "first-paycheck",
  taxes: "taxes-handled",
  college: "paying-for-college",
  investing: "start-investing",
  "money-safety": "scam-proof",
  "home-ownership": "first-apartment",
};

export interface SkillTreeData {
  branches: SkillBranch[];
  guidesTotal: number;
  quizzesTotal: number;
  coursesTotal: number;
  toolsTotal: number;
}

export function buildSkillTree(): SkillTreeData {
  const branches: SkillBranch[] = topics.map((t) => {
    const tiers = getTopicRoadmap(t.id).map((g) => ({
      label: g.label,
      articles: g.articles.map((a) => ({ slug: a.slug, title: a.title })),
    }));
    const courseId = TOPIC_COURSE[t.id];
    const course = courseId
      ? (courses.find((c) => c.id === courseId) ?? null)
      : null;
    return {
      id: t.id,
      title: t.title,
      short: t.short,
      color: t.color,
      href: t.href,
      tiers,
      guideTotal: tiers.reduce((n, g) => n + g.articles.length, 0),
      hasQuiz: Boolean(getTopicQuiz(t.id)),
      tool: learnContent[t.id]?.tool ?? null,
      course: course
        ? { id: course.id, title: course.title, color: course.color }
        : null,
    };
  });

  return {
    branches,
    guidesTotal: branches.reduce((n, b) => n + b.guideTotal, 0),
    quizzesTotal: branches.filter((b) => b.hasQuiz).length,
    coursesTotal: branches.filter((b) => b.course).length,
    toolsTotal: toolCategories
      .flatMap((c) => c.items)
      .filter((i) => i.status === "live").length,
  };
}
