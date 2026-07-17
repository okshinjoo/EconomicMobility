import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import PlanPageView from "@/components/PlanPageView";

export const metadata: Metadata = {
  title: "My Plan | Empower — Economic Mobility Project",
  description: "Answer five questions and get a personal money plan built from real guides, tools, and deadlines, with steps that check themselves off as you go.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <PlanPageView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
