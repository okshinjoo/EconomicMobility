import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CareerFitExplorer, { type CareerFitProfile } from "@/components/CareerFitExplorer";
import Footer from "@/components/Footer";
import { careers, careerPayLabel, careerPayPeriod, FIELD_LABELS } from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";
import { getCareerEnrichment } from "@/lib/careerEnrichment";

export const metadata: Metadata = {
  title: "Career Fit Sampler | Empower Career Explorer",
  description: "A short, optional work-preference exercise using O*NET career interests and work styles to suggest useful careers to explore.",
};

export default function CareerFitPage() {
  const profiles: CareerFitProfile[] = careers.flatMap((career) => {
    const enrichment = getCareerEnrichment(career.id);
    if (!enrichment) return [];
    return [{
      id: career.id,
      title: career.title,
      field: FIELD_LABELS[career.field],
      pay: `${careerPayLabel(career)} ${careerPayPeriod(career)}`,
      training: career.trainingNote,
      annualOpenings: getCareerDetail(career.id)?.annualOpenings ?? 0,
      interests: enrichment.interests,
      workStyles: enrichment.workStyles,
    }];
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-forest text-cream">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
          <Link href="/students/career-explorer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 hover:text-amber">
            <ArrowLeft className="h-4 w-4" weight="bold" /> Career Explorer
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber">Optional work-preference sampler</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-5xl">Which kinds of work sound worth trying?</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">React to twelve everyday work activities. We will surface a varied set of careers with similar O*NET interest and work-style profiles, without declaring a winner.</p>
        </div>
      </section>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-6 py-10">
        <CareerFitExplorer profiles={profiles} />
      </main>
      <Footer frame="student" />
    </div>
  );
}
