import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import ScrollDrift from "@/components/ScrollDrift";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Mission | Empower — Economic Mobility Project",
  description:
    "Why the Economic Mobility Project exists: breaking the cycle of economic disadvantage for first-generation, low-income, and immigrant students through accessible financial education, community, and research.",
};

// Personalize these two lines, then add your headshot at /public/images/founder.jpg
// and swap the story image below for it. Leave name empty to show just the title.
const FOUNDER_NAME = "Shinjoo";
const FOUNDER_TITLE = "Founder, Economic Mobility Project";

const pillars = [
  {
    n: "01",
    title: "Accessible education",
    status: "Live now",
    statusTone: "live",
    description:
      "Free, plain-English guides on credit, budgeting, taxes, college, investing, and more, written for the people the system never bothered to explain it to. This website is where it starts.",
  },
  {
    n: "02",
    title: "Community support",
    status: "Building",
    statusTone: "soon",
    description:
      "Knowledge sticks when you're not figuring it out alone. We're building support networks that connect students to mentors, peers, and people a few steps ahead of them.",
  },
  {
    n: "03",
    title: "Honest research",
    status: "In progress",
    statusTone: "soon",
    description:
      "Personal-finance tips only go so far. We research and surface the structural barriers to economic mobility, so the conversation isn't only about individual choices.",
  },
];

const values = [
  {
    title: "Free, forever",
    description: "No paywalls, and nothing hidden behind a sign-up. That won't change.",
  },
  {
    title: "Plain language",
    description: "If a word needs a glossary, we write the glossary.",
  },
  {
    title: "Made for real life",
    description: "Built around real situations, not textbook ones.",
  },
  {
    title: "Honest about barriers",
    description:
      "We name the structural obstacles, not only the personal-finance fixes.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        {/* Living ghost marks — a few brand marks drifting at different speeds
            with a whisper of rotation (owner ask, borrowed-restraint from the
            cinematic concept). Faint depth, not decoration; reduced-motion
            visitors get the exact static layer. */}
        <ScrollDrift range={44} driftX={-20} rotate={4}>
          <TopicMark
            id="investing"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-24 -top-20 h-[28rem] w-[28rem] opacity-[0.13]"
          />
        </ScrollDrift>
        <ScrollDrift range={66} driftX={28} rotate={-5}>
          <TopicMark
            id="college"
            color="#fbf8f1"
            className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 opacity-[0.12]"
          />
        </ScrollDrift>
        <ScrollDrift range={78} driftX={-32} rotate={6}>
          <TopicMark
            id="money-safety"
            color="#e7a33c"
            className="pointer-events-none absolute left-[42%] top-[36%] h-44 w-44 opacity-[0.10]"
          />
        </ScrollDrift>
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Our Mission
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Financial freedom shouldn&apos;t be a{" "}
            <span className="italic text-amber">family secret.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/75">
            The Economic Mobility Project puts the knowledge that builds
            wealth, the kind usually passed down quietly at kitchen tables,
            within reach of everyone. Especially the students who were never
            handed the map.
          </p>
        </div>
      </section>

      {/* The mission — leads the page: the case for access, in the owner's
          own words. The founder story follows it. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Why this matters
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
              Financial literacy is a{" "}
              <span className="italic text-amber-deep">right,</span> not a
              luxury.
            </h2>
            <p className="mt-8 hidden border-l-2 border-amber pl-5 font-display text-2xl italic leading-snug text-ink lg:block">
              No pressure. No fluff. Just honest, practical help, for
              everyone.
            </p>
          </div>
          <div className="space-y-5 text-lg leading-8 text-stone">
            <p>
              This website was created with one goal in mind: to break down
              the barriers that keep people from understanding and managing
              their own money. Financial information is often hard to find,
              buried in jargon, or stuck behind an expensive price tag. That
              leaves too many people feeling overwhelmed and left out.
            </p>
            <p>
              And a lot of what you do find isn&apos;t really trying to teach
              you. Search a basic money question and you&apos;ll land on
              pages built to sell you a credit card, an insurance plan, or a
              course. When every answer comes with a pitch, it&apos;s hard to
              know what to trust.
            </p>
            <p>
              We believe financial literacy is a right, not a luxury. A
              budget that works. Credit you actually understand. A plan for
              debt, and a start on investing. None of this is advanced
              knowledge reserved for other people. These are basic life
              skills, and the earlier you pick them up, the more they change
              where you end up.
            </p>
            <p>
              That&apos;s why everything here is 100% free, with no account
              and no paywall. Whether you&apos;re learning how to budget,
              rebuilding credit, paying off debt, or planning for the future,
              you&apos;ll find clear, judgment-free guides, tools, and
              resources made for real people living real lives.
            </p>
            <p className="border-l-2 border-amber pl-5 font-display text-xl italic leading-snug text-ink lg:hidden">
              No pressure. No fluff. Just honest, practical help, for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Who we are — teaser to the dedicated /who-we-are page (the full
          founder story now lives there so the footer's "Who We Are" link has
          a real home instead of a same-page anchor). */}
      <section id="story" className="scroll-mt-24 bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-2xl border-2 border-ink shadow-[7px_7px_0_#11211c] lg:-rotate-1">
              <Image
                src="/images/founder.jpg"
                alt="Shinjoo, founder of the Economic Mobility Project"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 max-w-md rotate-1 rounded-2xl border-2 border-ink bg-forest p-6 text-cream shadow-[5px_5px_0_#e7a33c] lg:absolute lg:-right-8 lg:bottom-8 lg:mt-0 lg:max-w-[16rem] lg:rotate-2">
              <p className="font-display text-lg italic leading-snug">
                &ldquo;Empower stands for the Economic Mobility Project, and
                for what we want every reader to do: take control of their
                financial freedom.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <span className="-rotate-2 inline-block rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_#11211c]">
              Who we are
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
              I&apos;m building the thing I wish I&apos;d had.
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone">
              The child of immigrants and the first in my family to go to
              college, I built the Economic Mobility Project because the money
              knowledge that changes a life shouldn&apos;t live behind paywalls,
              jargon, or households that already know the game.
            </p>
            <div className="mt-6 border-l-2 border-amber pl-4">
              {FOUNDER_NAME && (
                <p className="font-display text-lg font-semibold text-ink">
                  {FOUNDER_NAME}
                </p>
              )}
              <p className="text-sm font-medium text-stone">{FOUNDER_TITLE}</p>
            </div>
            <Link
              href="/who-we-are"
              className="mt-7 inline-flex items-center rounded-md border-2 border-ink bg-cream px-6 py-3 text-base font-bold text-ink shadow-[3px_3px_0_#11211c] transition-colors hover:bg-paper"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars — A: amber color field, B cards with giant numerals */}
      <section className="bg-amber text-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              How we do it
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Three ways we break the cycle
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink/75">
              Education is where it starts, but lasting economic mobility takes
              more than a website. This is the full plan.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 70}>
                <div
                  className={`card-ink flex h-full flex-col rounded-2xl bg-cream p-7 ${
                    i === 1 ? "lg:rotate-[0.5deg]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-6xl font-bold leading-none text-sand"
                    >
                      {pillar.n}
                    </span>
                    <span
                      className={`mt-1 text-xs font-bold uppercase tracking-wide ${
                        pillar.statusTone === "live"
                          ? "text-forest"
                          : "text-amber-deep"
                      }`}
                    >
                      {pillar.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-stone">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values — forest field, plain rules instead of icon tiles */}
      <section className="bg-forest text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              What we believe
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              The rules we hold{" "}
              <span className="italic text-amber">ourselves</span> to
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-t-2 border-amber/60 pt-4">
                <h3 className="font-display text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-cream/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision — split panel: text + ink-framed tilted photo (no gradient wash) */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Where this is going
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              One student at a time, the map gets shared.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-stone">
              Every guide read and every question answered puts a small crack
              in the cycle. Enough cracks, and it breaks.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-ink shadow-[7px_7px_0_#11211c] lg:rotate-1">
            <Image
              src="/images/classroom.jpg"
              alt="Students together in a classroom"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA — A: terracotta field */}
      <section className="text-cream" style={{ backgroundColor: "#d26a4c" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-16 gap-y-8 px-6 py-16 lg:py-20">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Start <span className="italic">where you are.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-cream/85">
              Take the 2-minute quiz for a path built around your life, or send
              us a note. We read everything that comes in.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md bg-ink px-8 py-4 text-base font-bold text-cream transition-colors hover:bg-forest"
            >
              Find your starting point
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border-2 border-cream/50 px-8 py-4 text-base font-semibold text-cream transition-colors hover:border-cream hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
