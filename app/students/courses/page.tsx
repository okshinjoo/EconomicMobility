// Student-frame mirror of the courses hub (July 2026 full-containment
// pass). Canonical points at /courses; the students layout provides
// StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CoursesHubView from "@/components/CoursesHubView";

export const metadata: Metadata = {
  title: "Courses | Empower — Economic Mobility Project",
  description:
    "Focused learning modules: a curated reading path, flashcards for every definition you meet, and a final quiz with a badge at the end.",
  alternates: { canonical: "/courses" },
};

export default function StudentCoursesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <CoursesHubView frame="student" />
      <Footer />
    </div>
  );
}
