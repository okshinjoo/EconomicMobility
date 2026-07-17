import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import CalcSwitcher from "@/components/CalcSwitcher";
import BudgetCalculator from "@/components/BudgetCalculator";

export const metadata: Metadata = {
  title: "Budget Planner | Empower — Economic Mobility Project",
  description:
    "A free budget calculator: turn your salary or hourly wage into estimated take-home pay after taxes, add other income, and plan your monthly expenses.",
};

export default function BudgetToolPage() {
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
            <span className="text-ink">Budget Planner</span>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Budget Planner
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            See your real numbers.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone">
            Start with what you earn, see what you actually take home after
            taxes, then map it against what you spend. Everything updates as you
            type; nothing is saved or sent anywhere.
          </p>
          <div className="mt-6">
            <CalcSwitcher base="/tools/budget" current="budget" />
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <BudgetCalculator />
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
