import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountPanel from "@/components/AccountPanel";

export const metadata: Metadata = {
  title: "Your Account | Empower — Economic Mobility Project",
  description:
    "Create a free account to sync your reading, quiz results, calculators, and badges across devices. Optional, always — nothing on Empower requires signing up.",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Your account
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] tracking-tight sm:text-6xl sm:leading-[0.98]">
            Your progress,{" "}
            <span className="italic text-amber">wherever you are.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            An account is never required here — it just makes the site
            remember you across devices: what you&apos;ve read, your quiz
            results, your calculators, and the badges you&apos;ve earned.
          </p>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
          <AccountPanel />
        </div>
      </section>

      <Footer />
    </div>
  );
}
