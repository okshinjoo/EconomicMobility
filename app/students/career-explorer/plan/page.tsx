import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CareerPlanBuilder, { type CareerPlanProfile } from "@/components/CareerPlanBuilder";
import Footer from "@/components/Footer";
import { careers, EDUCATION_LABELS } from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";

export const metadata: Metadata = {
  title: "My Career Plan | Empower Career Explorer",
  description: "Turn a career shortlist into an editable, saved plan for testing the work, comparing routes, and taking a concrete next step.",
};

export default async function CareerPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ career?: string }>;
}) {
  const { career } = await searchParams;
  const profiles: CareerPlanProfile[] = careers
    .map((item) => ({
      id: item.id,
      title: item.title,
      education: EDUCATION_LABELS[item.education],
      trainingNote: item.trainingNote,
      earnWhileTraining: item.earnWhileTraining,
      hasLicense: Boolean(getCareerDetail(item.id)?.license),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <Link href="/students/career-explorer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 hover:text-amber">
            <ArrowLeft className="h-4 w-4" weight="bold" /> Career Explorer
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber">From interest to evidence</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-5xl">Make your next career move concrete.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">Choose a career, decide what you still need to learn, and turn the research into dated next steps. Everything stays editable.</p>
        </div>
      </section>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-6 py-10">
        <CareerPlanBuilder profiles={profiles} initialCareerId={career} />
      </main>
      <Footer frame="student" />
    </div>
  );
}
