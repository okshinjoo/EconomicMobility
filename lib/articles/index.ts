import type { TopicId } from "@/lib/topics";
import { ROADMAP_SLUGS } from "../roadmaps";
import type { Article, ArticleLevel } from "./types";
import { budgetingArticles } from "./budgeting";
import { creditArticles } from "./credit";
import { taxesArticles } from "./taxes";
import { collegeArticles } from "./college";
import { investingArticles } from "./investing";
import { homeOwnershipArticles } from "./homeOwnership";
import { governmentAidArticles } from "./governmentAid";
import { budgetingExtraArticles } from "./budgetingExtra";
import { creditExtraArticles } from "./creditExtra";
import { taxesExtraArticles } from "./taxesExtra";
import { collegeExtraArticles } from "./collegeExtra";
import { investingExtraArticles } from "./investingExtra";
import { homeOwnershipExtraArticles } from "./homeOwnershipExtra";
import { governmentAidExtraArticles } from "./governmentAidExtra";
import { moneySafetyArticles } from "./moneySafety";
import { investingSavingsArticles } from "./investingSavings";
import { investingRetirementArticles } from "./investingRetirement";
import { investingAccountsArticles } from "./investingAccounts";
import { investingMarketsArticles } from "./investingMarkets";
import { budgetingMoneyArticles } from "./budgetingMoney";
import { budgetingMindsetArticles } from "./budgetingMindset";
import { budgetingEarningArticles } from "./budgetingEarning";
import { insuranceArticles } from "./insurance";

// One array per topic file. Grouped by `topicId` at runtime, so the order /
// split across files doesn't matter — "extra" batches just merge in.
const topicArticleSets: Article[][] = [
  budgetingArticles,
  creditArticles,
  taxesArticles,
  collegeArticles,
  investingArticles,
  homeOwnershipArticles,
  governmentAidArticles,
  budgetingExtraArticles,
  creditExtraArticles,
  taxesExtraArticles,
  collegeExtraArticles,
  investingExtraArticles,
  homeOwnershipExtraArticles,
  governmentAidExtraArticles,
  moneySafetyArticles,
  investingSavingsArticles,
  investingRetirementArticles,
  investingAccountsArticles,
  investingMarketsArticles,
  budgetingMoneyArticles,
  budgetingMindsetArticles,
  budgetingEarningArticles,
  insuranceArticles,
];

export const allArticles: Article[] = topicArticleSets.flat();

const byTopic: Partial<Record<TopicId, Article[]>> = {};
for (const article of allArticles) {
  (byTopic[article.topicId] ??= []).push(article);
}

export function getTopicArticles(topicId: TopicId): Article[] {
  return byTopic[topicId] ?? [];
}

export function getArticle(
  topicId: TopicId,
  slug: string
): Article | undefined {
  return getTopicArticles(topicId).find((a) => a.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

const LEVEL_ORDER: Record<ArticleLevel, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};
const LEVEL_LABEL: Record<ArticleLevel, string> = {
  Beginner: "Start here",
  Intermediate: "Go deeper",
  Advanced: "Advanced",
};

export interface ArticleGroup {
  level: ArticleLevel;
  label: string;
  articles: Article[];
}

/** Articles grouped into the Start here / Go deeper / Advanced roadmap. */
export function getTopicRoadmap(topicId: TopicId): ArticleGroup[] {
  const groups = new Map<ArticleLevel, Article[]>();
  for (const article of getTopicArticles(topicId)) {
    const list = groups.get(article.level) ?? [];
    list.push(article);
    groups.set(article.level, list);
  }
  return [...groups.keys()]
    .sort((a, b) => LEVEL_ORDER[a] - LEVEL_ORDER[b])
    .map((level) => ({
      level,
      label: LEVEL_LABEL[level],
      // Sort by explicit `order` (lower first); unordered articles keep their
      // original relative position after ordered ones (stable sort).
      articles: groups
        .get(level)!
        .slice()
        .sort((a, b) => (a.order ?? 1000) - (b.order ?? 1000)),
    }));
}

/** Resolved roadmap articles (registry slugs that exist), first per topic
 *  wins for topic-level lookups. Server-side use only - importing this from
 *  a client component drags every article into the bundle. */
export interface RoadmapRef {
  slug: string;
  title: string;
  topicId: TopicId;
  href: string;
}

export function getRoadmapRefs(): RoadmapRef[] {
  return ROADMAP_SLUGS.flatMap((slug) => {
    const a = getArticleBySlug(slug);
    return a
      ? [{ slug, title: a.title, topicId: a.topicId, href: `/learn/${a.topicId}/${slug}` }]
      : [];
  });
}
