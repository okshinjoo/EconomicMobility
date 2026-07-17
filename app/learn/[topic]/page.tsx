import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import TopicPageView from "@/components/TopicPageView";
import { topics, getTopic, type TopicId } from "@/lib/topics";
import { learnContent } from "@/lib/learnContent";

function isTopicId(value: string): value is TopicId {
  return topics.some((t) => t.id === value);
}

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopicId(topic)) return { title: "Not Found | Empower" };
  const content = learnContent[topic];
  return {
    title: `${getTopic(topic).title} | Empower — Economic Mobility Project`,
    description: content.subhead,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!isTopicId(topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <TopicPageView topic={topic} frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
