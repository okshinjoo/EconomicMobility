// Student-frame mirror of every guide (July 2026 full-containment pass):
// the same ArticlePageView with frame="student", so in-body links, the
// glossary popovers, breadcrumbs, and follow-up cards all stay inside the
// microsite. Canonical points at the main article — mirrors never compete
// in search. The students layout provides StudentHeader.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ArticlePageView from "@/components/ArticlePageView";
import { topics, type TopicId } from "@/lib/topics";
import { allArticles, getArticle } from "@/lib/articles";

function isTopicId(value: string): value is TopicId {
  return topics.some((t) => t.id === value);
}

export function generateStaticParams() {
  return allArticles.map((a) => ({ topic: a.topicId, article: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}): Promise<Metadata> {
  const { topic, article } = await params;
  if (!isTopicId(topic)) return { title: "Not Found | Empower" };
  const found = getArticle(topic, article);
  if (!found) return { title: "Not Found | Empower" };
  return {
    title: `${found.title} | Empower — Economic Mobility Project`,
    description: found.dek,
    alternates: { canonical: `/learn/${topic}/${article}` },
  };
}

export default async function StudentArticlePage({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}) {
  const { topic, article } = await params;
  if (!isTopicId(topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ArticlePageView topic={topic} articleSlug={article} frame="student" />
      <Footer />
    </div>
  );
}
