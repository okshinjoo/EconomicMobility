import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import QuestionBoxes from "@/components/QuestionBoxes";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import DataBackup from "@/components/DataBackup";
import TopicMark from "@/components/TopicMark";
import Reveal from "@/components/Reveal";
import ScrollDrift from "@/components/ScrollDrift";
import HeadlineRise from "@/components/HeadlineRise";

export const metadata: Metadata = {
  title: "Start Here | Empower — Economic Mobility Project",
  description:
    "New to Empower? Here's how to use the site: take the quiz, browse the guides, try the calculators, and look up any word.",
};

const steps = [
  {
    n: "01",
    title: "Take the 2-minute quiz",
    text: "Answer a few questions and get a personalized starting point. No sign-up, no email.",
    href: "/quiz",
    cta: "Start the quiz",
    accent: "#e7a33c", // amber
  },
  {
    n: "02",
    title: "Get your plan",
    text: "Answer five questions and get a personal plan: the right guides, calculators, and deadlines in the order that fits you, checking itself off as you go. Prefer to browse by goal? The guided paths cover the same ground.",
    href: "/plan",
    cta: "Build my plan",
    accent: "#0f5c46", // forest
  },
  {
    n: "03",
    title: "Run your numbers",
    text: "Free calculators for budgeting, debt, saving, and college. They update as you type.",
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
    a: "Yes, completely and always. There's no paywall and nothing to buy. Free financial education is the whole point.",
  },
  {
    q: "Do I need to make an account?",
    a: "No. Everything works without signing up, and nothing you enter into a quiz or calculator is sent to us. It stays on your device.",
  },
  {
    q: "Who is this for?",
    a: "Anyone taking control of their money. It's built especially for first-generation, low-income, and immigrant students who were never handed the financial playbook.",
  },
  {
    q: "I don't know where to start.",
    a: "That's what the quiz is for. It takes two minutes and points you to the topics that matter most for where you are right now.",
  },
];

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      <main>
        {/* Hero — C: editorial maximal on a forest field */}
        <section className="relative overflow-hidden bg-forest text-cream">
          <ScrollDrift range={65} driftX={30} rotate={-5}>
            <TopicMark
              id="money-safety"
              color="#fbf8f1"
              className="pointer-events-none absolute -bottom-24 -right-20 h-[26rem] w-[26rem] opacity-[0.16]"
            />
          </ScrollDrift>
          <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Start here
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
              New here? <span className="italic text-amber"><HeadlineRise chars>Welcome.</HeadlineRise></span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              There&apos;s no wrong way to use Empower. If you&apos;re not sure
              where to begin, though, here&apos;s the quick tour.
            </p>
          </div>
        </section>

        {/* The path — editorial numbered walkthrough with giant numerals */}
        {/* Base44 question-box template's first real home (owner pick from
            the July 2026 mockups), the skip-ahead list for people who
            arrive with a question already burning. */}
        <section className="bg-paper">
          <div className="mx-auto max-w-3xl px-6 pt-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Already have a question?
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Skip ahead. Start with what&apos;s bugging you.
            </h2>
            <div className="mt-6">
              <QuestionBoxes
                items={[
                  { q: "Why is my first paycheck smaller than I expected?", href: "/learn/budgeting/your-first-paycheck" },
                  { q: "How do I build credit when I have none at all?", href: "/learn/credit/build-credit-from-zero" },
                  { q: "What is the FAFSA, and how do I actually fill it out?", href: "/learn/college/fafsa-step-by-step" },
                  { q: "It's my first time filing taxes. Where do I start?", href: "/learn/taxes/filing-taxes-first-time" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:py-16">
            <span className="-rotate-2 inline-block rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_#11211c]">
              Four steps, in any order
            </span>

            <div className="mt-10">
              {steps.map((step, i) => (
                <Reveal key={step.href} delay={i * 60}>
                  <Link
                    href={step.href}
                    className={`group grid gap-2 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 ${
                      i > 0 ? "border-t-2 border-ink/10" : "pt-2"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="select-none font-display text-7xl font-bold leading-none text-sand transition-colors duration-200 group-hover:text-amber sm:text-8xl"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                        {step.title}
                      </h2>
                      <p className="mt-2 max-w-xl text-base leading-7 text-stone">
                        {step.text}
                      </p>
                      <span
                        className="mt-4 inline-block text-sm font-semibold underline decoration-2 underline-offset-4"
                        style={{
                          color: step.accent,
                          textDecorationColor: `${step.accent}55`,
                        }}
                      >
                        {step.cta}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — A: amber field with B-voice ink cards */}
        <section className="bg-amber text-ink">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Quick questions
            </h2>
            <dl className="mt-9 space-y-5">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 60}>
                  <div
                    className={`card-ink rounded-2xl bg-cream p-6 sm:p-7 ${
                      i === 1
                        ? "lg:rotate-[0.5deg]"
                        : i === 2
                          ? "lg:-rotate-[0.5deg]"
                          : ""
                    }`}
                  >
                    <dt className="font-display text-lg font-semibold text-ink">
                      {faq.q}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-stone">
                      {faq.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <div className="mt-12">
              <Link
                href="/quiz"
                className="btn-ink inline-flex items-center gap-2 rounded-md bg-forest px-7 py-3.5 text-base font-bold text-cream"
              >
                Take the 2-minute quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Progress backup — the no-account answer to "what if I switch devices?" */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <DataBackup />
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
