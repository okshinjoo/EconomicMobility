// Student-frame mirror (July 2026 comprehensiveness pass). Canonical
// points at /life; the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LifePageView from "@/components/LifePageView";

export const metadata: Metadata = {
  title: "Life Moments | Empower Students",
  description: "Start from what's happening in your life: first job, moving out, college, graduating, tight month, first card. Each moment bundles the right guides, tool, and course.",
  alternates: { canonical: "/life" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <LifePageView frame="student" />
      <Footer frame="student" />
    </div>
  );
}
