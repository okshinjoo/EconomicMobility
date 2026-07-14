import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcSwitcher from "@/components/CalcSwitcher";
import PaycheckCalculator from "@/components/PaycheckCalculator";

export const metadata: Metadata = {
  title: "Paycheck Calculator | Empower — Economic Mobility Project",
  description:
    "Turn a salary or hourly wage into your real take-home pay after federal, FICA, and state taxes, by month, paycheck, and year.",
};

export default function PaycheckPage() {
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
            <Link href="/tools/budget" className="transition-colors hover:text-ink">
              Budgeting
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">Paycheck</span>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Paycheck Calculator
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            What you actually take home.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            Your salary isn&apos;t your paycheck. See what lands in your account
            after taxes: by month, by paycheck, and by year.
          </p>
          <div className="mt-6">
            <CalcSwitcher base="/tools/budget" current="paycheck" />
          </div>
        </div>
      </section>
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <PaycheckCalculator />
        </div>
      </section>
      <Footer />
    </div>
  );
}
