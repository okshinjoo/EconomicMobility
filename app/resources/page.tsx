import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import ResourcesPageView from "@/components/ResourcesPageView";

export const metadata: Metadata = {
  title: "Resources | Empower — Economic Mobility Project",
  description: "Trusted, free outside resources: scholarships and financial aid, government benefits and programs, money help, and free tax filing.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <ResourcesPageView />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
