// Student-frame mirror (July 2026 comprehensiveness pass). Canonical
// points at /plan; the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PlanPageView from "@/components/PlanPageView";

export const metadata: Metadata = {
  title: "My Plan | Empower Students",
  description: "Answer five questions and get a personal money plan built from real guides, tools, and deadlines — with steps that check themselves off as you go.",
  alternates: { canonical: "/plan" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PlanPageView frame="student" />
      <Footer frame="student" />
    </div>
  );
}
