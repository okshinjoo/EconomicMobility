import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScholarshipPromotionQueue from "@/components/ScholarshipPromotionQueue";

export const metadata: Metadata = {
  title: "Scholarship Promotion | Empower",
  robots: { index: false, follow: false },
};

export default function ScholarshipPromotionPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main id="main-content">
        <section className="border-b border-sand bg-paper-deep">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <p className="text-sm font-semibold text-terracotta">Private moderation</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">Prepare verified scholarships for curation</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-stone">A withheld scholarship can produce a catalog-ready packet only after its geography is human-verified, its latest official-source check is healthy, and every evidence proposal is resolved.</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              <Link href="/admin/scholarships" className="text-forest underline decoration-amber decoration-2 underline-offset-4">Evidence review</Link>
              <Link href="/admin/scholarships/new" className="text-forest underline decoration-amber decoration-2 underline-offset-4">Add a scholarship</Link>
            </div>
          </div>
        </section>
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <ScholarshipPromotionQueue />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
