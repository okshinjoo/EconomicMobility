// Student-frame mirror of the journey index (July 2026 full-containment
// pass). Canonical points at /journey; the students layout provides
// StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import JourneyIndexView from "@/components/JourneyIndexView";

export const metadata: Metadata = {
  title: "Your Path | Empower — Economic Mobility Project",
  description:
    "Pick a money goal and follow a guided path: ordered milestones, the right guides at the right time, and a clear next step. No account needed.",
  alternates: { canonical: "/journey" },
};

export default function StudentJourneyIndexPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JourneyIndexView frame="student" />
      <Footer frame="student" />
    </div>
  );
}
