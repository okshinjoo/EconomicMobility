import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  TrendingDown,
  School,
  Target,
  ArrowRight,
  Sparkles,
  HandHeart,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { topics } from "@/lib/topics";

const stats = [
  { value: "100%", label: "Free, forever" },
  { value: "0", label: "Sign-ups or paywalls" },
  { value: "9", label: "Core money topics" },
  { value: "2 min", label: "To your starting point" },
];

const tools = [
  {
    icon: Calculator,
    title: "Budget Planner",
    description: "Build a budget based on your real income and expenses.",
  },
  {
    icon: TrendingDown,
    title: "Debt Payoff Calculator",
    description:
      "See how long it'll take to pay off what you owe — and how to speed it up.",
  },
  {
    icon: School,
    title: "College Cost Estimator",
    description:
      "Understand the real cost of college and how to close the gap.",
  },
  {
    icon: Target,
    title: "Savings Goal Calculator",
    description: "Set a goal and see exactly what it takes to get there.",
  },
];

const blogPosts = [
  {
    date: "Coming Soon",
    title: "5 Money Habits to Start Before You Turn 25",
    summary:
      "Small habits now can make a huge difference over time. Here's where to start.",
    href: "/blog",
  },
  {
    date: "Coming Soon",
    title: "What Nobody Tells You About Student Loans",
    summary: "The questions you should ask before you sign anything.",
    href: "/blog",
  },
  {
    date: "Coming Soon",
    title: "How to Read a Pay Stub (and Why It Matters)",
    summary: "Understand exactly where your money goes every paycheck.",
    href: "/blog",
  },
];

const missionPillars = [
  {
    icon: BookOpen,
    title: "Accessible education",
    description: "Plain-English money guides, free and open to everyone.",
  },
  {
    icon: HandHeart,
    title: "Community support",
    description: "Networks that help knowledge actually stick and grow.",
  },
  {
    icon: Sparkles,
    title: "Honest research",
    description:
      "Exposing the structural barriers to real economic mobility.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          {/* Left: copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">The Economic Mobility Project</span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Your money. Your future.{" "}
              <span className="relative whitespace-nowrap text-forest">
                No gatekeepers.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 18"
                  className="absolute -bottom-2 left-0 h-3 w-full text-amber"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-stone">
              Free, jargon-free financial education built to break the cycle of
              economic disadvantage — for first-generation, low-income, and
              immigrant students, and anyone ready to take control.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-4 text-base font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-amber-deep hover:text-cream"
              >
                Find your starting point
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#topics"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream"
              >
                Explore the topics
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["portrait-1", "portrait-3", "portrait-2", "portrait-4"].map(
                  (p) => (
                    <span
                      key={p}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-paper"
                    >
                      <Image
                        src={`/images/${p}.jpg`}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  )
                )}
              </div>
              <p className="text-sm font-medium text-stone">
                Free forever · No sign-up · No jargon
              </p>
            </div>
          </div>

          {/* Right: layered photography */}
          <div className="relative">
            {/* offset accent block behind */}
            <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-[2rem] bg-forest/10 sm:block" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand shadow-xl sm:aspect-[5/5]">
              <Image
                src="/images/students-collab.jpg"
                alt="Students learning and laughing together"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* floating stat card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-sand bg-cream p-5 shadow-xl sm:block animate-float-slow">
              <p className="font-display text-3xl font-bold text-forest">$0</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
                What it costs.
                <br />
                Always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact / trust band */}
      <section className="bg-forest text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 sm:py-14">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-bold text-amber sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-cream/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why this matters — mission */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* photo + quote */}
          <div className="relative order-last lg:order-first">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-sand shadow-xl">
              <Image
                src="/images/graduate.jpg"
                alt="A graduate celebrating"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 bottom-8 max-w-[15rem] rounded-2xl bg-forest p-6 text-cream shadow-xl sm:-right-8">
              <p className="font-display text-lg italic leading-snug">
                &ldquo;Empower stands for the Economic Mobility Project — and for
                empowering people to take control of their financial freedom.&rdquo;
              </p>
            </div>
          </div>

          {/* copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Why this matters
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
              Financial knowledge shouldn&apos;t depend on the family you&apos;re
              born into.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-stone">
              <p>
                This project exists to break the cycle of economic disadvantage
                for students like me — first-generation, low-income, and
                immigrant youth. So much of what builds wealth is passed down
                quietly at kitchen tables some of us never had access to.
              </p>
              <p>
                We&apos;re changing that three ways: by building financial
                education anyone can reach, by creating community-centered
                support networks, and by conducting research that exposes the
                structural barriers to economic mobility. This website is where
                the first of those begins.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {missionPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-sand bg-cream p-5"
                >
                  <pillar.icon
                    className="h-6 w-6 text-forest"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-3 text-sm font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Start learning
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              What do you want to learn?
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone">
              Dive into any topic below, or take the 2-minute quiz for a path
              built around exactly where you are right now.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Featured quiz promo card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-forest p-8 text-cream sm:col-span-2 lg:col-span-1 lg:row-span-1">
              <div className="absolute inset-0 opacity-40">
                <Image
                  src="/images/studying.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/90 to-forest/50" />
              </div>
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  Not sure where to start?
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  Take the 2-minute quiz
                </h3>
                <p className="mt-2 text-sm leading-6 text-cream/75">
                  Answer a few questions and we&apos;ll point you to the topics
                  that matter most for you right now.
                </p>
              </div>
              <Link
                href="/quiz"
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
              >
                {/* Topic photo + illustration icon badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={topic.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 flex h-14 w-14 items-center justify-center rounded-full border border-sand bg-cream shadow-md">
                    <Image
                      src={`/images/illustrations/${topic.id}.png`}
                      alt=""
                      unoptimized
                      width={48}
                      height={48}
                      className="h-10 w-10 object-contain"
                    />
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-stone">
                    {topic.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: topic.color }}
                  >
                    Start learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Put it to work
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Tools that turn knowledge into decisions
            </h2>
            <p className="mt-4 text-lg leading-8 text-cream/70">
              Understanding money is step one. These free calculators help you
              act on it.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="group rounded-2xl border border-white/10 bg-forest-700 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber/40"
              >
                <tool.icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
                <h3 className="mt-3 text-base font-semibold">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/65">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
            >
              See all tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community band */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <Image
              src="/images/community.jpg"
              alt="A community of students together"
              width={1600}
              height={900}
              className="h-[420px] w-full object-cover sm:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-8 sm:px-14">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  More than a website
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                  Education is step one. Community is what makes it last.
                </h2>
                <p className="mt-4 text-lg leading-8 text-cream/80">
                  We&apos;re building support networks and research alongside
                  these guides — so progress isn&apos;t something you have to
                  figure out alone.
                </p>
                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-amber"
                >
                  Learn about our mission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                From the blog
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Real answers to real questions
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-ink"
            >
              Visit the blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group flex flex-col rounded-2xl border border-sand bg-cream p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-deep">
                  {post.date}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-stone">
                  {post.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-ink">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One financial tip a week. Free, always.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-cream/70">
            No spam, no sales pitches — just one useful, actionable tip in your
            inbox every week.
          </p>

          <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-full border border-white/15 bg-forest-700 px-5 py-3.5 text-cream placeholder:text-cream/40 focus:border-amber focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-amber px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
            >
              I&apos;m in
            </button>
          </form>
          <p className="mt-4 text-xs text-cream/50">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
