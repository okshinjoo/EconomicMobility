// The Skill Tree (July 16, 2026, owner ask: "a way to see how much progress
// you made and where you can be heading next"). Nine topic branches, every
// node derived live from the existing trackers — nothing new stored, works
// signed-out, syncs with accounts automatically. See lib/skillTree.ts.
// Body extracted to components/SkillsPageView.tsx (July 17) so the
// /students/skills mirror shares it.

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import SkillsPageView from "@/components/SkillsPageView";

export const metadata: Metadata = {
  title: "Your Skill Tree | Empower — Economic Mobility Project",
  description:
    "Every money skill on one map: nine branches of guides, checkpoint quizzes, courses, and tools that light up as you learn — and always show your next step.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
        <SkillsPageView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
