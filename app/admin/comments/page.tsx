import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminComments from "@/components/AdminComments";

export const metadata: Metadata = {
  title: "Comment Review | Empower",
  robots: { index: false, follow: false },
};

// The live-comments moderation queue. Not linked from any nav — bookmark it.
// Access control is enforced by Supabase RLS (moderators table), not by
// this page; non-moderators just see an empty, friendly wall.
export default function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
          <h1 className="font-display text-3xl font-bold text-ink">
            Comment review
          </h1>
          <div className="mt-6">
            <AdminComments />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
