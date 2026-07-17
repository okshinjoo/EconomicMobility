import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import LearnHubView from "@/components/LearnHubView";

export const metadata: Metadata = {
  title: "Learn | Empower — Economic Mobility Project",
  description:
    "Free, plain-English guides on credit, budgeting, taxes, college, investing, home ownership, scams, and insurance. No jargon, no paywall.",
};

export default function LearnHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <LearnHubView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
