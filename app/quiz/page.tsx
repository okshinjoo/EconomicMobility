import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizFlow, { type RoadmapsByTopic } from "@/components/QuizFlow";
import { getRoadmapRefs } from "@/lib/articles";

export default function QuizPage() {
  // Light per-topic roadmap lookup for the results page (server-derived so
  // the client bundle never imports lib/articles).
  const roadmapsByTopic: RoadmapsByTopic = {};
  for (const r of getRoadmapRefs()) {
    roadmapsByTopic[r.topicId] ??= { title: r.title, href: r.href };
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <QuizFlow roadmapsByTopic={roadmapsByTopic} />
      <Footer />
    </div>
  );
}
