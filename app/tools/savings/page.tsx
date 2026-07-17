import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import CalcSwitcher from "@/components/CalcSwitcher";
import SavingsCalculator from "@/components/SavingsCalculator";

export const metadata: Metadata = {
  title: "Savings Goal Calculator | Empower — Economic Mobility Project",
  description:
    "Set a savings goal and see exactly what it takes: how much to set aside each month, or how long it'll take at the amount you can save.",
};

export default function SavingsToolPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href="/tools" className="transition-colors hover:text-ink">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">Savings Goal Calculator</span>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Savings Goal Calculator
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Make your goal a plan.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            Whether you have a deadline or a monthly amount in mind, see exactly
            what it takes to get there, with interest working for you. Nothing
            is saved or sent anywhere.
          </p>
          <div className="mt-6">
            <CalcSwitcher base="/tools/savings" current="goal" />
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SavingsCalculator />
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
