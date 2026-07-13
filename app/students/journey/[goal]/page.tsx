// Student-frame mirror of every guided path (July 2026 full-containment
// pass): stage items (guides, tools, courses, quizzes) stay inside the
// microsite; challenges deliberately exit. Canonical points at the main
// journey page; the students layout provides StudentHeader.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JourneyPageView from "@/components/JourneyPageView";
import { journeys, getJourney } from "@/lib/journeys";

export function generateStaticParams() {
  return journeys.map((j) => ({ goal: j.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ goal: string }>;
}): Promise<Metadata> {
  const { goal } = await params;
  const j = getJourney(goal);
  if (!j) return { title: "Not Found | Empower" };
  return {
    title: `${j.title} — a guided path | Empower`,
    description: j.promise,
    alternates: { canonical: `/journey/${goal}` },
  };
}

export default async function StudentJourneyPage({
  params,
}: {
  params: Promise<{ goal: string }>;
}) {
  const { goal } = await params;
  if (!getJourney(goal)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JourneyPageView goal={goal} frame="student" />
      <Footer />
    </div>
  );
}
