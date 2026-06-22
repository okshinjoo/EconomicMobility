import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Start Here | Empower — Economic Mobility Project",
  description:
    "New to Empower? Here's how to use the site — take the quiz, browse the guides, try the calculators, and look up any word.",
};

const steps = [
  {
    n: "01",
    title: "Take the 2-minute quiz",
    text: "Answer a few questions and get a personalized starting point — no sign-up, no email.",
    href: "/quiz",
    cta: "Start the quiz",
    accent: "#e7a33c", // amber
  },
  {
    n: "02",
    title: "Browse the guides",
    text: "Plain-English articles on credit, budgeting, taxes, college, investing, and more.",
    href: "/learn",
    cta: "Explore Learn",
    accent: "#0f5c46", // forest
  },
  {
    n: "03",
    title: "Run your numbers",
    text: "Free calculators for budgeting, debt, saving, and college — they update as you type.",
    href: "/tools",
    cta: "Open the tools",
    accent: "#1f8a5b", // emerald-leaning green
  },
  {
    n: "04",
    title: "Look up any word",
    text: "Hit a term you don't know? Every one is defined in plain language in the glossary.",
    href: "/glossary",
    cta: "Open the glossary",
    accent: "#c4623c", // terracotta
  },
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes — completely, and always. No paywalls, no sign-up walls, no upsells. Free financial education is the whole point.",
  },
  {
    q: "Do I need to make an account?",
    a: "No. Everything works without signing up, and nothing you enter into a quiz or calculator is sent to us — it stays on your device.",
  },
  {
    q: "Who is this for?",
    a: "Anyone taking control of their money — built especially for first-generation, low-income, and immigrant students who were never handed the financial playbook.",
  },
  {
    q: "I don't know where to start.",
    a: "That's exactly what the quiz is for. It takes two minutes and points you to the topics that matter most for where you are right now.",
  },
];

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        {/* Hero band */}
        <section className="bg-paper">
          <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-10 text-center lg:pb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Start here</span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              New here? Welcome.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
              There&apos;s no wrong way to use Empower — but if you&apos;re not
              sure where to begin, here&apos;s the quick tour.
            </p>
          </div>
        </section>

        {/* The path — four accent-colored, sequential step cards */}
        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-4">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-stone">
              Four steps, in any order
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {steps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderColor: `${step.accent}33` }}
                >
                  {/* top accent rule */}
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: step.accent }}
                    aria-hidden="true"
                  />
                  {/* oversized ghost step number */}
                  <span
                    className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-8xl font-bold leading-none opacity-[0.08]"
                    style={{ color: step.accent }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>

                  <div className="relative">
                    <span
                      className="font-display text-sm font-bold uppercase tracking-[0.18em]"
                      style={{ color: step.accent }}
                    >
                      Step {step.n}
                    </span>
                  </div>

                  <h2 className="relative mt-5 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h2>
                  <p className="relative mt-2 flex-1 text-base leading-7 text-stone">
                    {step.text}
                  </p>
                  <span
                    className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: step.accent }}
                  >
                    {step.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick questions — tidy accent-marked cards */}
        <section className="bg-paper-deep">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Quick questions
              </h2>
            </div>
            <dl className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="group rounded-2xl border border-sand bg-cream p-6 transition-colors hover:border-forest/30 sm:p-7"
                >
                  <dt className="flex items-start gap-3 font-display text-lg font-semibold text-ink">
                    <span
                      className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber transition-colors group-hover:bg-forest"
                      aria-hidden="true"
                    />
                    {faq.q}
                  </dt>
                  <dd className="mt-2 pl-5 text-base leading-7 text-stone">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 text-center">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-amber-deep"
              >
                Take the 2-minute quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
