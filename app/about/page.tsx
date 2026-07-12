import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Mission | Empower — Economic Mobility Project",
  description:
    "Why the Economic Mobility Project exists: breaking the cycle of economic disadvantage for first-generation, low-income, and immigrant students through accessible financial education, community, and research.",
};

// Personalize these two lines, then add your headshot at /public/images/founder.jpg
// and swap the story image below for it. Leave name empty to show just the title.
const FOUNDER_NAME = "";
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
        <TopicMark
          id="investing"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-24 -top-20 h-[28rem] w-[28rem] opacity-[0.07]"
        />
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

      {/* The story — B: ink-framed photo + tilted quote card */}
      <section id="story" className="scroll-mt-24 bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-2xl border-2 border-ink shadow-[7px_7px_0_#11211c] lg:-rotate-1">
              <Image
                src="/images/founder.jpg"
                alt="The founder of the Economic Mobility Project"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Mobile: the quote sits BELOW the photo (overlaying it covered
                the founder's face on small screens). From lg it returns to
                the tilted overlay card. */}
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
              Why I built this
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
              I&apos;m building the thing I wish I&apos;d had.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-stone">
              <p>
                I&apos;m a first-generation, low-income, immigrant student.
                Growing up, money was something we worried about constantly but
                rarely understood. Nobody had failed us. The information was
                never ours to begin with. It lived behind paywalls, in jargon,
                in households that had done all of this before.
              </p>
              <p>
                Every time I figured something out (how credit works, what
                FAFSA is asking for, why a budget isn&apos;t a punishment) I
                thought the same thing: someone could have told me this years
                ago. So I decided to become that &ldquo;someone&rdquo; for the
                next student in my shoes.
              </p>
              <p>
                That&apos;s what the Economic Mobility Project is: a way to
                break the cycle of economic disadvantage for students like me,
                and for anyone else the system was never built to inform.
              </p>
            </div>
            <div className="mt-8 border-l-2 border-amber pl-4">
              {FOUNDER_NAME && (
                <p className="font-display text-lg font-semibold text-ink">
                  {FOUNDER_NAME}
                </p>
              )}
              <p className="text-sm font-medium text-stone">{FOUNDER_TITLE}</p>
            </div>
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
              src="/images/community.jpg"
              alt="A community of students together"
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
