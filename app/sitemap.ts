import type { MetadataRoute } from "next";
import { allArticles } from "@/lib/articles";
import { topics } from "@/lib/topics";
import { toolCategories, hrefFor } from "@/lib/toolsRegistry";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import { blogPosts } from "@/lib/blog";
import { journeys } from "@/lib/journeys";
import { TOPIC_QUIZ_IDS } from "@/lib/topicQuizzes";
import { communityPosts } from "@/lib/communityFeed";

const BASE = "https://economicmobilityproject.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/learn", "/tools", "/courses", "/challenges", "/community", "/blog", "/journey",
    "/ask", "/quiz", "/glossary", "/resources", "/start-here", "/about",
    "/who-we-are", "/contact", "/life",
    "/students",
    "/plan",
    "/students/scholarships",
    "/students/opportunities",
    "/students/compare-colleges",
    "/students/deadlines",
    "/students/tracker", "/tools/letters", "/tools/templates", "/account",
    "/privacy",
  ].map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const }));

  const topicRoutes = topics.map((t) => ({
    url: `${BASE}${t.href}`,
    changeFrequency: "weekly" as const,
  }));

  const articleRoutes = allArticles.map((a) => ({
    url: `${BASE}/learn/${a.topicId}/${a.slug}`,
    changeFrequency: "monthly" as const,
  }));

  const toolRoutes = toolCategories.flatMap((cat) =>
    cat.items
      .filter((i) => i.status === "live")
      .map((i) => ({
        url: `${BASE}${hrefFor(cat, i)}`,
        changeFrequency: "monthly" as const,
      }))
  );

  const courseRoutes = courses.map((c) => ({
    url: `${BASE}/courses/${c.id}`,
    changeFrequency: "monthly" as const,
  }));

  const challengeRoutes = challenges.map((c) => ({
    url: `${BASE}/challenges/${c.id}`,
    changeFrequency: "monthly" as const,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
  }));

  const journeyRoutes = journeys.map((j) => ({
    url: `${BASE}/journey/${j.id}`,
    changeFrequency: "monthly" as const,
  }));

  // Topic mini-quizzes (only the topics that have one) and community post
  // pages — real indexable content the route list was missing (July 2026
  // SEO pass). Both regenerate from their libs, so new ones auto-appear.
  const topicQuizRoutes = TOPIC_QUIZ_IDS().map((id) => ({
    url: `${BASE}/learn/${id}/quiz`,
    changeFrequency: "monthly" as const,
  }));

  const communityPostRoutes = communityPosts.map((p) => ({
    url: `${BASE}/community/post/${p.id}`,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...articleRoutes,
    ...toolRoutes,
    ...courseRoutes,
    ...challengeRoutes,
    ...blogRoutes,
    ...journeyRoutes,
    ...topicQuizRoutes,
    ...communityPostRoutes,
  ];
}
