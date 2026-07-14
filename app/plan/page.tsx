import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanPageView from "@/components/PlanPageView";

export const metadata: Metadata = {
  title: "My Plan | Empower — Economic Mobility Project",
  description: "Answer five questions and get a personal money plan built from real guides, tools, and deadlines, with steps that check themselves off as you go.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <PlanPageView frame="main" />
      <Footer />
    </div>
  );
}
