import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScholarshipReviewQueue from "@/components/ScholarshipReviewQueue";

export const metadata: Metadata = {
  title: "Scholarship Review | Empower",
  robots: { index: false, follow: false },
};

export default function ScholarshipReviewPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main id="main-content">
        <section className="border-b border-sand bg-paper-deep">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <p className="text-sm font-semibold text-terracotta">Private moderation</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">Scholarship evidence review</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-stone">Compare monitored claims with the exact text from each official scholarship page. Decisions update the private monitoring record and audit history; the public Finder remains unchanged.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/admin/scholarships/new" className="inline-flex rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-cream hover:bg-forest-700">Add a scholarship</Link>
              <Link href="/admin/scholarships/promotions" className="inline-flex rounded-md border border-ink bg-cream px-4 py-2.5 text-sm font-bold text-ink hover:bg-paper">Promotion queue</Link>
            </div>
          </div>
        </section>
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <ScholarshipReviewQueue />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
