import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { topics, getTopic } from "@/lib/topics";
import {
  allArticles,
  getTopicArticles,
  getTopicRoadmap,
} from "@/lib/articles";
import { toolCategories } from "@/lib/toolsRegistry";
import { glossary } from "@/lib/glossary";
import CountUp from "@/components/CountUp";
import { communityQuestions } from "@/lib/communityQuestions";
import QuestionStrip, { type StripQuestion } from "@/components/QuestionStrip";
import TopicMark from "@/components/TopicMark";
import WelcomeBack, {
  type TopicPath,
  type BadgeSource,
} from "@/components/WelcomeBack";
import CompoundChart from "@/components/CompoundChart";
import {
  TrendingUp,
  CreditCard,
  PiggyBank,
  GraduationCap,
  Percent,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import { isStudentArticle } from "@/lib/studentShelf";
import { scholarships } from "@/lib/scholarships";
import { opportunities } from "@/lib/opportunities";
import { deadlines } from "@/lib/deadlines";

// Real questions, real guides — the honest front door to the library.
// The first four render for everyone; once a reader finishes one of these
// articles, QuestionStrip rotates it out and pulls in the next question.
// "More calculators" rail beside the compound chart (Base44 direct copy,
// owner call July 2026) — hints are theirs, hrefs point at our real tools.
const mathCalcs = [
  { name: "Compound Interest", hint: "See money grow", href: "/tools/savings/compound", icon: TrendingUp },
  { name: "Debt Payoff", hint: "Snowball or avalanche", href: "/tools/debt", icon: CreditCard },
  { name: "Savings Goal", hint: "How long to get there", href: "/tools/savings", icon: PiggyBank },
  { name: "Student Loan", hint: "Real cost of borrowing", href: "/tools/college/student-loan", icon: GraduationCap },
  { name: "Tax Estimator", hint: "What you actually keep", href: "/tools/budget/paycheck", icon: Percent },
];

const startingQuestions: StripQuestion[] = [
  {
    q: "Why is my first paycheck smaller than I expected?",
    href: "/learn/budgeting/your-first-paycheck",
    slug: "your-first-paycheck",
  },
  {
    q: "How do I build credit when I have none at all?",
    href: "/learn/credit/build-credit-from-zero",
    slug: "build-credit-from-zero",
  },
  {
    q: "What is the FAFSA, and how do I actually fill it out?",
    href: "/learn/college/fafsa-step-by-step",
    slug: "fafsa-step-by-step",
  },
  {
    q: "It's my first time filing taxes. Where do I start?",
    href: "/learn/taxes/filing-taxes-first-time",
    slug: "filing-taxes-first-time",
  },
  {
    q: "A debt collector keeps calling. What are my rights?",
    href: "/learn/government-aid/debt-collector-rights",
    slug: "debt-collector-rights",
  },
  {
    q: "Where does my money keep disappearing to?",
    href: "/learn/budgeting/tracking-your-spending",
    slug: "tracking-your-spending",
  },
  {
    q: "What should I know before renting my first apartment?",
    href: "/learn/home-ownership/renting-your-first-apartment",
    slug: "renting-your-first-apartment",
  },
  {
    q: "Is a 401(k) actually worth it?",
    href: "/learn/investing/what-is-a-401k",
    slug: "what-is-a-401k",
  },
  {
    q: "How do I tell if a text or offer is a scam?",
    href: "/learn/money-safety/how-to-spot-a-scam",
    slug: "how-to-spot-a-scam",
  },
  {
    q: "What do all the health-insurance words actually mean?",
    href: "/learn/insurance/health-insurance-explained",
    slug: "health-insurance-explained",
  },
  {
    q: "Can I get SNAP if I'm working?",
    href: "/learn/government-aid/snap-explained",
    slug: "snap-explained",
  },
  {
    q: "How do I actually pay off a credit card?",
    href: "/learn/credit/paying-off-credit-cards",
    slug: "paying-off-credit-cards",
  },
];

const missionPillars = [
  {
    title: "Accessible education",
    description: "Plain-English money guides, free and open to everyone.",
  },
  {
    title: "Community support",
    description: "Networks that help knowledge actually stick and grow.",
  },
  {
    title: "Honest research",
    description: "Exposing the structural barriers to real economic mobility.",
  },
];

export default function Home() {
  const guideTotal = allArticles.length;
  const calculatorTotal = toolCategories
    .flatMap((cat) => cat.items)
    .filter((item) => item.status === "live").length;

  // Course + challenge badge metadata for the badge case in the strip.
  const badgeSources: BadgeSource[] = [
    ...courses.map((c) => ({
      id: c.id,
      title: c.title,
      color: c.color,
      kind: "course" as const,
    })),
    ...challenges.map((c) => ({
      id: c.id,
      title: c.title,
      color: c.color,
      kind: "challenge" as const,
    })),
  ];

  // Compact per-topic reading paths for the client-side "welcome back" strip.
  const topicPaths: TopicPath[] = topics.map((t) => ({
    id: t.id,
    short: t.short,
    href: t.href,
    color: t.color,
    articles: getTopicRoadmap(t.id)
      .flatMap((group) => group.articles)
      .map((a) => ({ slug: a.slug, title: a.title })),
  }));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          {/* Left: copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              The Economic Mobility Project
            </span>

            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.07] sm:leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Your money.
              <br />
              Your future.
              <br />
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
              Free, jargon-free money help built to break the cycle of
              economic disadvantage: hundreds of plain-English guides,
              hand-verified scholarships and paid opportunities, and
              calculators for your real numbers. No account, ever.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-md bg-amber px-7 py-4 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-amber-deep hover:text-cream"
              >
                Find your starting point
              </Link>
              <Link
                href="/students"
                className="inline-flex items-center justify-center rounded-md border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream"
              >
                In school? Start here
              </Link>
            </div>

            <p className="mt-10 text-sm font-medium text-stone">
              {guideTotal} guides · {scholarships.length} verified
              scholarships · {opportunities.length} paid opportunities ·{" "}
              {calculatorTotal} calculators
            </p>
          </div>

          {/* Right: layered photography */}
          <div className="relative">
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
          </div>
        </div>
      </section>

      {/* My Plan beta strip — front-and-center by owner call (July 14:
          "I want it on the front"); the honest still-learning caveat rides
          in the same breath. ONE door site-wide for the beta pitch. */}
      <section className="border-y-2 border-ink bg-forest text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5">
          <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-base leading-7">
            <span className="inline-block -rotate-1 rounded-md border-2 border-ink bg-amber px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
              New · In beta
            </span>
            <span className="font-display text-lg font-semibold">
              Tell the guide your goal, and{" "}
              <span className="italic text-amber">it builds your plan.</span>
            </span>
            <span className="text-sm text-cream/65">
              Still learning: flag any step that doesn&apos;t fit and it
              reworks it.
            </span>
          </p>
          <Link
            href="/plan"
            className="btn-ink inline-flex shrink-0 items-center rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink"
          >
            Try the plan builder
          </Link>
        </div>
      </section>

      {/* Personalized "pick up where you left off" (renders only with history) */}
      <WelcomeBack paths={topicPaths} badgeSources={badgeSources} />

      {/* Value-prop marquee (Base44 swap, July 2026) — counts are live. */}
      <Ticker
        tone="amber"
        items={[
          { label: "No sign-up required", href: "/start-here" },
          { label: `${guideTotal} plain-English guides`, href: "/learn" },
          { label: `${scholarships.length} verified scholarships`, href: "/students/scholarships" },
          { label: `${opportunities.length} paid opportunities`, href: "/students/opportunities" },
          { label: `${calculatorTotal} free calculators`, href: "/tools" },
          { label: "Free forever", href: "/about" },
          { label: "No paywall", href: "/start-here" },
        ]}
      />

      {/* Come with a real question — read articles rotate out of the list */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-semibold leading-snug text-cream sm:text-3xl">
                Most people don&apos;t come here to &ldquo;study
                finance.&rdquo;
              </h2>
              <p className="mt-3 text-base leading-7 text-cream/70">
                They come with a question that&apos;s been bugging them. Start
                with yours.
              </p>
            </div>
            <QuestionStrip
              pool={startingQuestions.map((q) => ({
                ...q,
                student: isStudentArticle(q.slug),
              }))}
            />
          </div>
        </div>
      </section>


      {/* The library, in numbers — every figure derived live from the data
          (honesty rule), counting up on first scroll into view. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {(
              [
                [guideTotal, "Plain-English guides, all free"],
                [scholarships.length, "Scholarships, each one hand-verified"],
                [opportunities.length, "Paid internships and programs, vetted"],
                [calculatorTotal, "Calculators that run in your browser"],
                [glossary.length, "Jargon terms, translated"],
                [courses.length, "Focused courses with badges at the end"],
              ] as const
            ).map(([value, label], i) => (
              <Reveal key={label} delay={i * 90}>
                <div className={i % 2 === 1 ? "lg:mt-6" : ""}>
                  <CountUp
                    value={value}
                    className="font-display text-6xl font-bold tracking-tight text-forest sm:text-7xl"
                  />
                  <div className="mt-2 h-1 w-10 rounded-full bg-amber" />
                  <p className="mt-3 max-w-[16rem] text-sm font-medium leading-6 text-stone">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* For Students — the microsite is the biggest thing built this year;
          advertise it like it (owner directive, July 2026). A-voice amber
          field, three ink-poster doors with live counts. */}
      <section className="border-y-2 border-ink bg-amber">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block -rotate-1 rounded-md border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
                For Students
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Paying for school?{" "}
                <span className="italic">We built your own corner.</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink/75">
                A whole site inside the site: scholarships we verified by
                hand, programs that pay you, every deadline that moves money,
                and a tracker that keeps score, from high school through
                university.
              </p>
            </div>
            <Link
              href="/students"
              className="btn-ink inline-flex items-center rounded-md bg-forest px-7 py-3.5 text-base font-bold text-cream"
            >
              Enter For Students
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {(
              [
                {
                  href: "/students/scholarships",
                  n: scholarships.length,
                  title: "The Scholarship Finder",
                  desc: "Real awards, hand-checked against official pages. Filter by your stage; no forms about you.",
                  tilt: "",
                },
                {
                  href: "/students/opportunities",
                  n: opportunities.length,
                  title: "Get paid to get ahead",
                  desc: "Verified internships, fellowships, and research programs. Free to apply, many with stipends.",
                  tilt: "lg:rotate-[0.5deg]",
                },
                {
                  href: "/students/deadlines",
                  n: deadlines.length,
                  title: "The money calendar",
                  desc: "FAFSA to decision day, with calendar downloads and email reminders if you want them.",
                  tilt: "lg:-rotate-[0.4deg]",
                },
              ] as const
            ).map((door) => (
              <Link
                key={door.href}
                href={door.href}
                className={`card-ink group flex h-full flex-col rounded-2xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-1 ${door.tilt}`}
              >
                <p className="font-display text-5xl font-bold leading-none text-forest">
                  {door.n}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                  {door.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                  {door.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters — mission */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* photo + pull quote */}
          <Reveal className="relative order-last lg:order-first">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-sand shadow-xl">
              <Image
                src="/images/portrait-2.jpg"
                alt="A young woman looking into the camera"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Mobile: quote below the photo (the overlay covered the
                student's face on small screens); overlay card from lg up. */}
            <div className="mt-5 max-w-md rounded-2xl bg-forest p-6 text-cream shadow-xl lg:absolute lg:-right-8 lg:bottom-8 lg:mt-0 lg:max-w-[15rem]">
              <p className="text-base font-medium italic leading-snug">
                &ldquo;Empower stands for the Economic Mobility Project, and
                for empowering people to take control of their financial
                freedom.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* copy — headline and prose surface in sequence on scroll */}
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                Why this matters
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                Financial knowledge shouldn&apos;t depend on the family
                you&apos;re born into.
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4 text-lg leading-8 text-stone">
              <Reveal delay={120}>
                <p>
                  This project exists to break the cycle of economic
                  disadvantage for first-generation, low-income, and immigrant
                  youth. It was started by a first-generation student and kid
                  of immigrants, because so much of what builds wealth gets
                  passed down quietly at kitchen tables some families never
                  had a seat at.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  We&apos;re changing that three ways: education anyone can
                  reach, community that makes it stick, and research that
                  names the real barriers. This website is where the first of
                  those begins.
                </p>
              </Reveal>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {missionPillars.map((pillar, pi) => (
                <Reveal
                  key={pillar.title}
                  delay={260 + pi * 80}
                  className="h-full"
                >
                <div
                  className="h-full rounded-2xl border border-sand bg-cream p-5"
                >
                  <h3 className="text-sm font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    {pillar.description}
                  </p>
                </div>
                </Reveal>
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

          {/* Quiz promo: full-width banner right over the topic cards */}
          <div className="relative mt-12 flex flex-col gap-6 overflow-hidden rounded-2xl bg-forest p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
            <div className="absolute inset-0 opacity-40">
              <Image
                src="/images/studying.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/50" />
            </div>
            <div className="relative max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                Not sure where to start?
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                Take the 2-minute quiz
              </h3>
              <p className="mt-2 text-sm leading-6 text-cream/75">
                Answer a few questions and we&apos;ll point you to the topics
                that matter most for you right now.
              </p>
            </div>
            <Link
              href="/quiz"
              className="relative inline-flex w-fit shrink-0 items-center rounded-md bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
            >
              Get started
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, ti) => (
              <Reveal key={topic.href} delay={(ti % 3) * 70}>
              <Link
                href={topic.href}
                className={`card-ink group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${
                  ti === 1 ? "lg:rotate-[0.5deg]" : ti === 6 ? "lg:-rotate-[0.5deg]" : ""
                }`}
              >
                {/* Topic photo + illustration badge */}
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
                    <TopicMark id={topic.id} className="h-8 w-8" />
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
                  <div className="mt-4 flex items-baseline justify-between">
                    <span
                      className="text-sm font-semibold underline-offset-4 group-hover:underline"
                      style={{ color: topic.color }}
                    >
                      Start learning
                    </span>
                    <span className="text-sm font-medium text-stone/80">
                      {getTopicArticles(topic.id).length} guides
                    </span>
                  </div>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>

          {/* Roadmaps pointer (owner-approved homepage addition, July 2026) */}
          <p className="mt-8 text-base text-stone">
            Rather follow a route than browse? Every topic has a{" "}
            <Link
              href="/learn#roadmaps"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
            >
              roadmap that puts its guides in order
            </Link>
            , from your first bank account to your first home.
          </p>
          {/* Student-hub pointer (owner directive, July 2026: student content
              on the homepage always points at the microsite) */}
          <p className="mt-2 text-base text-stone">
            In school? The college guides above have a hub of their own:{" "}
            <Link
              href="/students"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
            >
              For Students
            </Link>
            , with the money calendar, scholarships, and your tracker in one
            place.
          </p>
        </div>
      </section>

      {/* The math, visualized — Base44 direct copy (owner call, July 2026):
          the compound-growth band replaces the old tools bento. The wavy
          cream divider up top is theirs too (white melts into the green). */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <svg
          aria-hidden
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 h-8 w-full text-paper"
        >
          <path
            d="M0,30 C240,60 480,0 720,20 C960,40 1200,55 1440,25 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 pb-20 pt-24 md:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-28">
          <div className="md:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-display text-xs font-bold tracking-wider text-amber">
                  04
                </span>
                <span className="h-px max-w-[40px] flex-1 bg-amber/40" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-cream/60">
                  The math, visualized
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
                Small, steady, unstoppable.
              </h2>
              <p className="mt-4 text-lg leading-8 text-cream/75">
                $200 a month, invested in a broad index fund, over 30 years.
                The line doesn&apos;t bend because you&apos;re clever. It
                bends because compounding is patient.
              </p>
              <p className="mt-4 text-sm text-cream/50">
                This is what the calculators show you. Not a prediction. Just
                arithmetic, applied.
              </p>
            </Reveal>
          </div>
          <div className="rounded-lg border border-cream/10 bg-cream/5 p-6 md:col-span-5">
            <CompoundChart className="h-64" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-amber">
              More calculators
            </p>
            {mathCalcs.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="group flex items-center gap-3 rounded-lg border border-cream/10 bg-cream/5 p-3 transition-all hover:border-amber hover:bg-cream/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
                  <calc.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-tight text-cream">
                    {calc.name}
                  </span>
                  <span className="block text-xs leading-tight text-cream/50">
                    {calc.hint}
                  </span>
                </span>
              </Link>
            ))}
            <Link
              href="/tools"
              className="mt-2 text-sm font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              See all {calculatorTotal} calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Asked and answered */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                Ask Empower
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Questions people were embarrassed to ask
              </h2>
            </div>
            <Link
              href="/ask"
              className="text-base font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
            >
              See all the answers
            </Link>
          </div>

          {/* Advice-column layout: one featured letter, two compact ones, and
              a "your turn" card. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            {(() => {
              const [featured, ...rest] = communityQuestions.slice(0, 3);
              const featuredTopic = featured.topic
                ? getTopic(featured.topic)
                : null;
              return (
                <>
                  {/* Featured letter */}
                  <div className="flex flex-col rounded-2xl border border-sand bg-cream p-6 sm:p-10">
                    {featuredTopic && (
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{ color: featuredTopic.color }}
                      >
                        {featuredTopic.short}
                      </span>
                    )}
                    <div className="mt-4 flex gap-3 sm:gap-4">
                      <span className="font-display text-2xl font-bold italic leading-none text-terracotta sm:text-3xl">
                        Q.
                      </span>
                      <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-[1.75rem]">
                        {featured.question}
                      </h3>
                    </div>
                    <div className="mt-6 flex gap-3 sm:gap-4">
                      <span className="font-display text-2xl font-bold italic leading-none text-forest sm:text-3xl">
                        A.
                      </span>
                      <div className="space-y-4 text-base leading-7 text-stone">
                        {featured.answer.map((para) => (
                          <p key={para.slice(0, 24)}>{para}</p>
                        ))}
                        <p>
                          <Link
                            href={`/ask#ask-${featured.id}`}
                            className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                          >
                            Keep reading on the Ask page
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Compact letters + your turn */}
                  <div className="flex flex-col gap-5">
                    {rest.map((qa) => {
                      const topic = qa.topic ? getTopic(qa.topic) : null;
                      return (
                        <Link
                          key={qa.id}
                          href={`/ask#ask-${qa.id}`}
                          className="group flex flex-col rounded-2xl border border-sand bg-cream p-6 transition-all duration-200 hover:border-ink/20 hover:shadow-lg"
                        >
                          {topic && (
                            <span
                              className="text-xs font-semibold uppercase tracking-[0.18em]"
                              style={{ color: topic.color }}
                            >
                              {topic.short}
                            </span>
                          )}
                          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                            {qa.question}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-stone line-clamp-2">
                            {qa.answer[0]}
                          </p>
                          <span className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors group-hover:text-ink">
                            Read the full answer
                          </span>
                        </Link>
                      );
                    })}

                    <div className="flex flex-1 flex-col justify-between gap-4 rounded-2xl bg-forest p-6 text-cream">
                      <div>
                        <h3 className="font-display text-xl font-semibold">
                          Your turn.
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-cream/75">
                          Ask anything anonymously: no name, no email. Good
                          questions become answers on the site.
                        </p>
                      </div>
                      <Link
                        href="/ask#ask"
                        className="inline-flex w-fit items-center rounded-md bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
                      >
                        Ask a question
                      </Link>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Community band — owner-tuned: original photo layout, amber
          "Community", and the two live destination buttons */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          {/* The photo is a fill background and the copy is in normal flow,
              so on mobile the card grows with its content ("Join a
              challenge" was clipped by the old fixed 420px height). Desktop
              keeps the same centered ~460px band via min-h. */}
          <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-[2.5rem] sm:min-h-[460px]">
            <Image
              src="/images/community.jpg"
              alt="A community of students together"
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/30" />
            <div className="relative">
              <div className="max-w-xl px-6 py-12 sm:px-14 sm:py-14">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                  More than a website
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                  Education is step one.{" "}
                  <span className="italic text-amber">Community</span> is what
                  makes it last.
                </h2>
                <p className="mt-4 text-lg leading-8 text-cream/80">
                  We&apos;re building support networks and research alongside
                  these guides, so progress isn&apos;t something you have to
                  figure out alone.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/community"
                    className="inline-flex items-center rounded-md bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
                  >
                    Visit the community
                  </Link>
                  <Link
                    href="/challenges"
                    className="inline-flex items-center rounded-md border-2 border-cream/40 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:border-amber hover:text-amber"
                  >
                    Join a challenge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
