import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <JourneyIndexView frame="main" />
      <Footer />
    </div>
  );
}
