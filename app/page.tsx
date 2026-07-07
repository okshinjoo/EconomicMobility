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
import WelcomeBack, {
  type TopicPath,
  type BadgeSource,
} from "@/components/WelcomeBack";
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

// Per-category color block + a small hand-coded "data doodle" for the tools
// band — flat pastel product tiles (Wealthsimple-style) in brand-adjacent
// hues, each with a finance-shaped graphic (allocation bars, payoff line,
// growth curve, cost bars) instead of generic icon tiles.
const toolStyles: Record<string, { bg: string; accent: string }> = {
  budgeting: { bg: "#f3dcab", accent: "#c9842a" }, // pale amber / gold
  debt: { bg: "#f0d0c0", accent: "#b7593f" }, // pale clay / terracotta
  saving: { bg: "#d0e5d8", accent: "#157a5a" }, // pale mint / green
  college: { bg: "#d7e2e9", accent: "#3f6478" }, // pale sky / slate
};

function ToolDoodle({
  id,
  color,
  wide,
}: {
  id: string;
  color: string;
  wide?: boolean;
}) {
  const ink = "#11211c";
  const common = {
    viewBox: wide ? "0 0 640 72" : "0 0 320 72",
    "aria-hidden": true,
    className: wide ? "h-20 w-full" : "h-16 w-full",
    preserveAspectRatio: "xMinYMid meet",
  } as const;

  switch (id) {
    case "budgeting": {
      // A budget at a glance: spending donut + allocation bars.
      const C = 2 * Math.PI * 26;
      const barWidths = wide ? [420, 260, 150] : [190, 120, 70];
      return (
        <svg {...common}>
          <circle cx="36" cy="36" r="26" fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="13" />
          <circle
            cx="36" cy="36" r="26" fill="none" stroke={color} strokeWidth="13"
            strokeDasharray={`${C * 0.52} ${C}`} transform="rotate(-90 36 36)"
          />
          <circle
            cx="36" cy="36" r="26" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="13"
            strokeDasharray={`${C * 0.22} ${C}`} strokeDashoffset={-C * 0.52} transform="rotate(-90 36 36)"
          />
          <rect x="92" y="10" width={barWidths[0]} height="11" rx="5.5" fill={color} />
          <rect x="92" y="31" width={barWidths[1]} height="11" rx="5.5" fill={color} opacity="0.45" />
          <rect x="92" y="52" width={barWidths[2]} height="11" rx="5.5" fill={ink} opacity="0.14" />
        </svg>
      );
    }
    case "debt": {
      // Monthly balances shrinking to zero, payoff line overlaid.
      const heights = (wide
        ? [46, 40, 34, 29, 24, 19, 15, 12, 9, 7, 5, 4, 3, 3]
        : [46, 40, 34, 29, 24, 19, 15]
      );
      const line = wide ? "M10,12 C170,20 380,44 625,60" : "M10,14 C90,22 200,44 305,58";
      const dot = wide ? { x: 625, y: 60 } : { x: 305, y: 58 };
      return (
        <svg {...common}>
          {heights.map((h, i) => (
            <rect
              key={i} x={8 + i * 44} y={64 - h} width="26" height={h} rx="4"
              fill={color} opacity="0.28"
            />
          ))}
          <path d={`M2,64 h${wide ? 632 : 312}`} stroke={ink} strokeOpacity="0.2" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
          <path d={line} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <circle cx={dot.x} cy={dot.y} r="5.5" fill={color} />
        </svg>
      );
    }
    case "saving": {
      // Contributions stacking up, compound growth curving above them.
      const heights = (wide
        ? [4, 6, 8, 10, 13, 16, 20, 24, 28, 33, 38, 44, 50, 56]
        : [5, 8, 12, 17, 23, 30, 38]
      );
      const curve = wide ? "M8,62 C220,58 430,34 628,6" : "M8,60 C110,56 220,38 306,12";
      const area = wide ? "M8,62 C220,58 430,34 628,6 V72 H8 Z" : "M8,60 C110,56 220,38 306,12 V72 H8 Z";
      const dot = wide ? { x: 628, y: 6 } : { x: 306, y: 12 };
      return (
        <svg {...common}>
          <path d={area} fill={color} opacity="0.12" />
          {heights.map((h, i) => (
            <rect
              key={i} x={8 + i * 44} y={64 - h} width="26" height={h} rx="4"
              fill={color} opacity="0.32"
            />
          ))}
          <path d={curve} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <circle cx={dot.x} cy={dot.y} r="5.5" fill={color} />
        </svg>
      );
    }
    default: {
      // College costs stacking year over year, aid line to compare against.
      const totals = wide
        ? [20, 26, 32, 38, 44, 49, 54, 58, 61, 63]
        : [24, 34, 44, 53, 60];
      return (
        <svg {...common}>
          {totals.map((h, i) => {
            const x = 8 + i * 58;
            const mid = h * 0.55;
            return (
              <g key={i}>
                <rect x={x} y={66 - h} width="34" height={h} rx="4" fill={color} opacity="0.22" />
                <rect x={x} y={66 - h * 0.8} width="34" height={h * 0.25} fill={color} opacity="0.45" />
                <rect x={x} y={66 - mid} width="34" height={mid} rx="4" fill={color} opacity="0.85" />
              </g>
            );
          })}
          <path d={`M2,${wide ? 22 : 24} h${wide ? 632 : 312}`} stroke={ink} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        </svg>
      );
    }
  }
}

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
            <div className="absolute -right-4 bottom-8 max-w-[15rem] rounded-2xl bg-forest p-6 text-cream shadow-xl sm:-right-8">
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
                disadvantage for students like me — first-generation,
                low-income, and immigrant youth. So much of what builds wealth
                is passed down quietly at kitchen tables some of us never had
                access to.
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

            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-200 hover:border-ink/20 hover:shadow-lg"
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
            <h2 className="mt-4 font-display text-4xl font-medium tracking-normal sm:text-[2.75rem]">
              Run your own numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-cream/70">
              Understanding money is step one. These free calculators work
              right in the page — no downloads, no sign-up — and save your
              inputs on your own device.
            </p>
          </div>

          {/* Bento grid: the two big categories go wide, the others narrow. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-6">
            {toolCategories.map((cat) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              const wide = cat.id === "budgeting" || cat.id === "saving";
              return (
                <div
                  key={cat.id}
                  className={`flex flex-col rounded-2xl text-ink shadow-sm transition-shadow hover:shadow-xl ${
                    wide ? "p-6 lg:col-span-4 lg:p-8" : "p-6 lg:col-span-2"
                  }`}
                  style={{ backgroundColor: style.bg }}
                >
                  <ToolDoodle id={cat.id} color={style.accent} wide={wide} />
                  <h3
                    className={`mt-5 font-display font-semibold ${
                      wide ? "text-xl lg:text-2xl" : "text-lg"
                    }`}
                  >
                    <Link
                      href={cat.base}
                      className="hover:underline hover:decoration-2 hover:underline-offset-4"
                      style={{ textDecorationColor: style.accent }}
                    >
                      {cat.label}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    {cat.blurb}
                  </p>
                  <ul
                    className={`mt-4 border-t pt-4 ${
                      wide
                        ? "grid gap-x-8 gap-y-2 sm:grid-cols-2"
                        : "space-y-2"
                    }`}
                    style={{ borderColor: `${style.accent}55` }}
                  >
                    {cat.items
                      .filter((item) => item.status === "live")
                      .map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={
                              item.main ? cat.base : `${cat.base}/${item.slug}`
                            }
                            className="text-sm font-medium text-ink/85 underline decoration-2 underline-offset-4 transition-colors hover:text-ink"
                            style={{ textDecorationColor: `${style.accent}88` }}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-md bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
            >
              See all tools
            </Link>
            <Link
              href="/tools/templates"
              className="text-base font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-amber"
            >
              Download the spreadsheet templates
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
              href="/blog"
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
                  <div className="flex flex-col rounded-2xl border border-sand bg-cream p-8 sm:p-10">
                    {featuredTopic && (
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{ color: featuredTopic.color }}
                      >
                        {featuredTopic.short}
                      </span>
                    )}
                    <div className="mt-4 flex gap-4">
                      <span className="font-display text-3xl font-bold italic leading-none text-terracotta">
                        Q.
                      </span>
                      <h3 className="font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.75rem]">
                        {featured.question}
                      </h3>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <span className="font-display text-3xl font-bold italic leading-none text-forest">
                        A.
                      </span>
                      <div className="space-y-4 text-base leading-7 text-stone">
                        {featured.answer.map((para) => (
                          <p key={para.slice(0, 24)}>{para}</p>
                        ))}
                        <p>
                          <Link
                            href={`/blog#ask-${featured.id}`}
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
                          href={`/blog#ask-${qa.id}`}
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
                        href="/blog#ask"
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
                  className="mt-7 inline-flex items-center rounded-md bg-cream px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-amber"
                >
                  Learn about our mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
