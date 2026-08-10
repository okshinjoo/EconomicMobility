import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CareerCompare from "@/components/CareerCompare";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Compare Careers | Empower Career Explorer",
  description: "Compare career pay, openings, training, outlook, and O*NET job-fit facts side by side.",
};

export default function CompareCareersPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <Link
            href="/students/career-explorer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 hover:text-amber"
          >
            <ArrowLeft className="h-4 w-4" weight="bold" />
            Career Explorer
          </Link>
          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.25em] text-amber">Side by side</span>
          <h1 className="mt-3 max-w-3xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Compare the work—not just the paycheck.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Put up to four paths next to each other. See national and state pay, yearly openings, training time, and the interests and work styles each job rewards.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <CareerCompare />
      </main>
      <Footer frame="student" />
    </div>
  );
}
