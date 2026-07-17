import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import LetterGenerator from "@/components/LetterGenerator";

export const metadata: Metadata = {
  title: "Letter Generator | Empower — Economic Mobility Project",
  description:
    "Generate a credit report dispute letter or a debt validation request in your browser. Free, private, and built on the CFPB's sample-letter structure.",
};

export default function LettersPage() {
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
            <span className="text-ink">Letter Generator</span>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-amber px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[3px_3px_0_#11211c]">
            Free · runs in your browser
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            The letters that fix things.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            A credit-report dispute and a debt-validation request are the two
            most useful letters in personal finance, and companies count on
            people not knowing how to write them. Fill in the blanks, copy or
            download, send by certified mail.
          </p>
        </div>
      </section>

      <section className="bg-paper pt-4">
        <LetterGenerator />
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
