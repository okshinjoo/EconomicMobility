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
import { communityQuestions } from "@/lib/communityQuestions";
import QuestionStrip, { type StripQuestion } from "@/components/QuestionStrip";
import TopicMark from "@/components/TopicMark";
import WelcomeBack, {
  type TopicPath,
  type BadgeSource,
} from "@/components/WelcomeBack";
import ToolDoodle, { toolStyles } from "@/components/ToolDoodle";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";

// Real questions, real guides — the honest front door to the library.
// The first four render for everyone; once a reader finishes one of these
// articles, QuestionStrip rotates it out and pulls in the next question.
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
              Free, jargon-free financial education built to break the cycle
              of economic disadvantage — for first-generation, low-income, and
              immigrant students, and anyone ready to take control.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-md bg-amber px-7 py-4 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-amber-deep hover:text-cream"
              >
                Find your starting point
              </Link>
              <Link
                href="#topics"
                className="inline-flex items-center justify-center rounded-md border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream"
              >
                Explore the topics
              </Link>
            </div>

            <p className="mt-10 text-sm font-medium text-stone">
              {guideTotal} plain-English guides · {calculatorTotal} free
              calculators · No account required
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

      {/* Personalized "pick up where you left off" (renders only with history) */}
      <WelcomeBack paths={topicPaths} badgeSources={badgeSources} />

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
            <QuestionStrip pool={startingQuestions} />
          </div>
        </div>
      </section>

      {/* Live-feeling strip of real questions from the library */}
      <Ticker
        items={startingQuestions.map((q) => ({ label: q.q, href: q.href }))}
      />

      {/* Why this matters — mission */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* photo + pull quote */}
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
            {/* Mobile: quote below the photo (the overlay covered the
                student's face on small screens); overlay card from lg up. */}
            <div className="mt-5 max-w-md rounded-2xl bg-forest p-6 text-cream shadow-xl lg:absolute lg:-right-8 lg:bottom-8 lg:mt-0 lg:max-w-[15rem]">
              <p className="text-base font-medium italic leading-snug">
                &ldquo;Empower stands for the Economic Mobility Project — and
                for empowering people to take control of their financial
                freedom.&rdquo;
              </p>
            </div>
          </div>

          {/* copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Why this matters
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
              Financial knowledge shouldn&apos;t depend on the family
              you&apos;re born into.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-stone">
              <p>
                This project exists to break the cycle of economic
                disadvantage for first-generation, low-income, and immigrant
                youth. I&apos;m a first-generation student and the kid of
                immigrants myself. So much of what builds wealth is passed
                down quietly at kitchen tables some of us never had access to.
              </p>
              <p>
                We&apos;re changing that three ways: education anyone can
                reach, community that makes it stick, and research that names
                the real barriers. This website is where the first of those
                begins.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {missionPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-sand bg-cream p-5"
                >
                  <h3 className="text-sm font-bold text-ink">
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
                  Answer a few questions and we&apos;ll point you to the
                  topics that matter most for you right now.
                </p>
              </div>
              <Link
                href="/quiz"
                className="relative mt-6 inline-flex w-fit items-center rounded-md bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
              >
                Get started
              </Link>
            </div>

            {topics.map((topic, ti) => (
              <Reveal key={topic.href} delay={(ti % 3) * 70}>
              <Link
                href={topic.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-200 hover:border-ink/20 hover:shadow-lg"
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
        </div>
      </section>

      {/* Tools — B: ink-and-shadow pastel cards */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-amber px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[3px_3px_0_#11211c]">
                Put it to work
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Run your own numbers
              </h2>
              <p className="mt-4 text-lg leading-8 text-stone">
                Every calculator works right in the page and saves your inputs
                on your own device. No downloads, no sign-up.
              </p>
            </div>
            <Link
              href="/tools"
              className="btn-ink inline-flex items-center rounded-xl bg-amber px-7 py-3.5 text-base font-bold text-ink"
            >
              See all {calculatorTotal} tools
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((cat, ci) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              return (
                <Reveal key={cat.id} delay={ci * 70}>
                  <div
                    className={`card-ink flex h-full flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 ${
                      ci % 2 === 1 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.4deg]"
                    }`}
                    style={{ backgroundColor: style.bg }}
                  >
                    <ToolDoodle id={cat.id} color={style.accent} />
                    <h3 className="mt-5 font-display text-xl font-bold text-ink">
                      <Link href={cat.base} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                        {cat.label}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink/70">
                      {cat.blurb}
                    </p>
                    <ul className="mt-4 space-y-2 border-t-2 pt-4" style={{ borderColor: `${style.accent}55` }}>
                      {cat.items
                        .filter((item) => item.status === "live")
                        .slice(0, 4)
                        .map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={item.main ? cat.base : `${cat.base}/${item.slug}`}
                              className="text-sm font-semibold text-ink/85 underline decoration-2 underline-offset-4 transition-colors hover:text-ink"
                              style={{ textDecorationColor: `${style.accent}88` }}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      {cat.items.filter((i) => i.status === "live").length > 4 && (
                        <li>
                          <Link
                            href={cat.base}
                            className="text-sm font-bold"
                            style={{ color: style.accent }}
                          >
                            +{cat.items.filter((i) => i.status === "live").length - 4} more
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 text-base text-stone">
            Prefer a spreadsheet?{" "}
            <Link
              href="/tools/templates"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Download the free templates
            </Link>
            .
          </p>
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
                          Ask anything anonymously — no name, no email. Good
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
                  these guides — so progress isn&apos;t something you have to
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
