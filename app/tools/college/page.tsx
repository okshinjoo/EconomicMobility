import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcSwitcher from "@/components/CalcSwitcher";
import CollegeCalculator from "@/components/CollegeCalculator";

export const metadata: Metadata = {
  title: "College Cost Estimator | Empower — Economic Mobility Project",
  description:
    "Estimate the real cost of college after aid — your yearly gap, the loans it might take to fill it, and roughly what you'd repay each month.",
};

export default function CollegeToolPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href="/tools" className="transition-colors hover:text-ink">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">College Cost Estimator</span>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            College Cost Estimator
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            See the real price.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            The sticker price is rarely what you pay. See your real gap after aid
            and savings, what it might take in loans, and what that means after
            graduation. Nothing is saved or sent anywhere.
          </p>
          <div className="mt-6">
            <CalcSwitcher base="/tools/college" current="cost" />
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <CollegeCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
