// Student-frame mirror of the Skill Tree (July 17, 2026 — students are
// exactly who the tree is for). Same shared view; every link inside the
// tree self-frames via useFrame(), so guides open the /students mirrors.
// Canonical points at /skills; the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SkillsPageView from "@/components/SkillsPageView";

export const metadata: Metadata = {
  title: "Your Skill Tree | Empower — Economic Mobility Project",
  description:
    "Every money skill on one map: nine branches of guides, checkpoint quizzes, courses, and tools that light up as you learn — and always show your next step.",
  alternates: { canonical: "/skills" },
};

export default function StudentSkillsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SkillsPageView frame="student" />
      <Footer frame="student" />
    </div>
  );
}
