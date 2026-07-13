// Student-frame mirror of the glossary (July 2026 full-containment pass):
// popover "Open in glossary" links and article-page glossary notes land
// here instead of exiting the microsite. Canonical points at /glossary;
// the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GlossaryPageView from "@/components/GlossaryPageView";

export const metadata: Metadata = {
  title: "Glossary | Empower — Economic Mobility Project",
  description:
    "Plain-English definitions of common money terms: credit, taxes, investing, financial aid, and more. No jargon.",
  alternates: { canonical: "/glossary" },
};

export default function StudentGlossaryPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <GlossaryPageView frame="student" />
      <Footer frame="student" />
    </div>
  );
}
