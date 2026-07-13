// Student-frame mirror of every topic hub (July 2026 full-containment
// pass): TopicPageView with frame="student". Canonical points at the main
// hub; the students layout provides StudentHeader.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
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
    alternates: { canonical: `/learn/${topic}` },
  };
}

export default async function StudentTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!isTopicId(topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <TopicPageView topic={topic} frame="student" />
      <Footer />
    </div>
  );
}
