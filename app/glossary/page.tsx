import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import GlossaryPageView from "@/components/GlossaryPageView";

export const metadata: Metadata = {
  title: "Glossary | Empower — Economic Mobility Project",
  description:
    "Plain-English definitions of common money terms: credit, taxes, investing, financial aid, and more. No jargon.",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <GlossaryPageView frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
