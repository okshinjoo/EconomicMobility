import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import CoursesHubView from "@/components/CoursesHubView";

export const metadata: Metadata = {
  title: "Courses | Empower — Economic Mobility Project",
  description:
    "Focused learning modules: a curated reading path, flashcards for every definition you meet, and a final quiz with a badge at the end.",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <CoursesHubView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
