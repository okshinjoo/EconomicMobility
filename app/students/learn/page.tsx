// Student-frame mirror of the learn hub (July 2026 full-containment pass).
// Canonical points at /learn; the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LearnHubView from "@/components/LearnHubView";

export const metadata: Metadata = {
  title: "Learn | Empower — Economic Mobility Project",
  description:
    "Free, plain-English guides on credit, budgeting, taxes, college, investing, home ownership, scams, and insurance. No jargon, no paywall.",
  alternates: { canonical: "/learn" },
};

export default function StudentLearnHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <LearnHubView frame="student" />
      <Footer />
    </div>
  );
}
