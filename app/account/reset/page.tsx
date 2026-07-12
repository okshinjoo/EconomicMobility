import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Empower — Economic Mobility Project",
  robots: { index: false },
};

export default function ResetPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-md px-6 py-16 lg:py-24">
          <h1 className="font-display text-3xl font-bold text-ink">
            Set a new password
          </h1>
          <div className="card-ink mt-6 rounded-2xl bg-cream p-6 sm:p-8">
            <ResetPasswordForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
