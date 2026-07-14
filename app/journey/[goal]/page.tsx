import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JourneyPageView from "@/components/JourneyPageView";
import { journeys, getJourney } from "@/lib/journeys";

export function generateStaticParams() {
  return journeys.map((j) => ({ goal: j.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ goal: string }>;
}): Promise<Metadata> {
  const { goal } = await params;
  const j = getJourney(goal);
  if (!j) return { title: "Not Found | Empower" };
  return {
    title: `${j.title}: a guided path | Empower`,
    description: j.promise,
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ goal: string }>;
}) {
  const { goal } = await params;
  if (!getJourney(goal)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <JourneyPageView goal={goal} frame="main" />
      <Footer />
    </div>
  );
}
