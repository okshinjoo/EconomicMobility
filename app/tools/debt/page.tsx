import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcSwitcher from "@/components/CalcSwitcher";
import DebtCalculator from "@/components/DebtCalculator";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator | Empower — Economic Mobility Project",
  description:
    "See how long it'll take to pay off your debt, how much interest you'll pay, and how much faster a little extra each month gets you there.",
};

export default function DebtToolPage() {
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
            <span className="text-ink">Debt Payoff Calculator</span>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Debt Payoff Calculator
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Find your way out.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            List what you owe, add whatever extra you can spare each month, and
            see your debt-free date — plus how much interest you&apos;ll save.
            Nothing is saved or sent anywhere.
          </p>
          <div className="mt-6">
            <CalcSwitcher base="/tools/debt" current="payoff" />
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <DebtCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
