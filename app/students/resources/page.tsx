// Student-frame mirror (July 2026 comprehensiveness pass). Canonical
// points at /resources; the students layout provides StudentHeader.

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ResourcesPageView from "@/components/ResourcesPageView";

export const metadata: Metadata = {
  title: "Resources | Empower Students",
  description: "Trusted, free outside resources: scholarships and financial aid, government benefits and programs, money help, and free tax filing.",
  alternates: { canonical: "/resources" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ResourcesPageView />
      <Footer frame="student" />
    </div>
  );
}
