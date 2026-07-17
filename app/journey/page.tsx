import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import JourneyIndexView from "@/components/JourneyIndexView";

export const metadata: Metadata = {
  title: "Your Path | Empower — Economic Mobility Project",
  description:
    "Pick a money goal and follow a guided path: ordered milestones, the right guides at the right time, and a clear next step. No account needed.",
};

export default function JourneyIndexPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <JourneyIndexView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
