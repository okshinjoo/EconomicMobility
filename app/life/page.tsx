import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import LifePageView from "@/components/LifePageView";

export const metadata: Metadata = {
  title: "Life Moments | Empower — Economic Mobility Project",
  description: "Start from what's happening in your life: first job, moving out, college, graduating, tight month, first card. Each moment bundles the right guides, tool, and course.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <LifePageView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
