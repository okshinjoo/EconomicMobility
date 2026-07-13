import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScholarshipFinder from "@/components/ScholarshipFinder";
import { scholarships } from "@/lib/scholarships";

export const metadata: Metadata = {
  title: "Scholarship Finder | Empower — Economic Mobility Project",
  description:
    "A curated, verified list of real national scholarships for first-gen, low-income, immigrant, and transfer students — filterable by where you are in school, ordered by application season.",
};

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — compact, light */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-12">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Scholarships
          </nav>
          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
            The scholarship{" "}
            <span className="relative whitespace-nowrap text-forest">
              starting lineup.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            {scholarships.length} real, established awards — each one verified
            by us, linked straight to its official site, and ordered by where
            it falls in the school year. No fees, no data harvesting, no
            sweepstakes dressed up as scholarships.
          </p>
          <p className="mt-4 text-sm font-semibold text-forest">
            First time scholarship hunting?{" "}
            <Link
              href="/learn/college/finding-scholarships"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Read how to actually win these
            </Link>{" "}
            first.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <ScholarshipFinder />
        </div>
      </section>

      <Footer />
    </div>
  );
}
