// Student-frame mirror of the topic mini quizzes (July 2026 full-
// containment pass). Canonical points at the main quiz page; the students
// layout provides StudentHeader.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
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
    alternates: { canonical: `/learn/${topic}/quiz` },
  };
}

export default async function StudentTopicQuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!topics.some((t) => t.id === topic)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <TopicQuizPageView topic={topic as TopicId} frame="student" />
      <Footer frame="student" />
    </div>
  );
}
