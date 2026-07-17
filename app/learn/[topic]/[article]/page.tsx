import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
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
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}) {
  const { topic, article } = await params;
  if (!isTopicId(topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <ArticlePageView topic={topic} articleSlug={article} frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
