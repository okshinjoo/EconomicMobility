// Student-frame mirror of the site quiz (July 2026 comprehensiveness
// pass): same QuizFlow; QuizResults detects the frame from the pathname,
// so every results link — roadmaps, journeys, resource cards, course recs,
// My Plan — stays inside the microsite. Canonical points at /quiz; the
// students layout provides StudentHeader. Scores share the same storage
// either way.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import QuizFlow, { type RoadmapsByTopic } from "@/components/QuizFlow";
import { getRoadmapRefs } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The 2-Minute Quiz | Empower Students",
  description:
    "Answer a few questions and we'll point you to the money topics that matter most for you right now.",
  alternates: { canonical: "/quiz" },
};

export default function StudentQuizPage() {
  // Light per-topic roadmap lookup for the results page (server-derived so
  // the client bundle never imports lib/articles). Hrefs stay canonical;
  // QuizResults frames them at render.
  const roadmapsByTopic: RoadmapsByTopic = {};
  for (const r of getRoadmapRefs()) {
    roadmapsByTopic[r.topicId] ??= { title: r.title, href: r.href };
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <QuizFlow roadmapsByTopic={roadmapsByTopic} />
      <Footer frame="student" />
    </div>
  );
}
