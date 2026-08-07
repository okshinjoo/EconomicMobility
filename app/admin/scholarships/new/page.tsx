import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScholarshipCandidateForm from "@/components/ScholarshipCandidateForm";

export const metadata: Metadata = {
  title: "Add Scholarship | Empower",
  robots: { index: false, follow: false },
};

export default function NewScholarshipCandidatePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main id="main-content">
        <section className="border-b border-sand bg-paper-deep">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <p className="text-sm font-semibold text-terracotta">Private moderation</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">Add a scholarship for verification</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-stone">Stage one official scholarship source without publishing it to the Finder. Monitoring and human review supply the evidence required for later curation.</p>
          </div>
        </section>
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <ScholarshipCandidateForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
