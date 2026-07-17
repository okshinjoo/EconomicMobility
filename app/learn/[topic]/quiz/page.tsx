import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import TopicQuizPageView from "@/components/TopicQuizPageView";
import { TOPIC_QUIZ_IDS } from "@/lib/topicQuizzes";
import { topics, type TopicId } from "@/lib/topics";

export function generateStaticParams() {
  return TOPIC_QUIZ_IDS().map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = topics.find((x) => x.id === topic);
  if (!t) return { title: "Not Found | Empower" };
  return {
    title: `${t.short} Mini Quiz | Empower — Economic Mobility Project`,
    description: `Five quick questions to test what you know about ${t.short.toLowerCase()}. Instant feedback, links back to the guide for anything you miss.`,
  };
}

export default async function TopicQuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!topics.some((t) => t.id === topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <TopicQuizPageView topic={topic as TopicId} frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
