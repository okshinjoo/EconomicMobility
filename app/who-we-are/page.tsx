import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import TopicMark from "@/components/TopicMark";
import ScrollDrift from "@/components/ScrollDrift";

export const metadata: Metadata = {
  title: "Who We Are | Empower — Economic Mobility Project",
  description:
    "The story behind the Economic Mobility Project: a first-generation, immigrant-family founder building the plain-English financial education she wishes she'd had.",
};

const FOUNDER_NAME = "Shinjoo";
const FOUNDER_TITLE = "Founder, Economic Mobility Project";

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift>
          <TopicMark
            id="credit"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-24 -top-20 h-[28rem] w-[28rem] opacity-[0.07]"
          />
        </ScrollDrift>
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Who We Are
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            The person behind the{" "}
            <span className="italic text-amber">project.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/75">
            The Economic Mobility Project started with one person who went
            looking for honest money answers, couldn&apos;t find them, and
            decided to build them for the next student in her shoes.
          </p>
        </div>
      </section>

      {/* The story — B: ink-framed photo + tilted quote card */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
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
              Why I built this
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
              I&apos;m building the thing I wish I&apos;d had.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-stone">
              <p>
                My parents are immigrants, and I&apos;m the first in my family
                to go to college. Growing up, money was something we worried
                about but rarely understood. Nobody had failed us. The
                information was never ours to begin with. It lived behind
                paywalls, in jargon, in households that had done all of this
                before.
              </p>
              <p>
                For me, the way in was investing. I got curious, started
                digging, and kept running into small changes I could make that
                would completely alter my trajectory. Honestly, learning about
                finance is the best thing I&apos;ve ever done for myself. Not
                just because it taught me how to invest, but because it gave
                me a clear path and real motivation to keep going. Once the
                fog lifted, the steps were a lot clearer.
              </p>
              <p>
                Getting there was the frustrating part. Before I understood
                anything, I had to dig through confusing articles and bounce
                between sites that seemed more interested in selling me a
                credit card or an insurance plan than in explaining anything.
                Every time something finally clicked, I had the same thought:
                someone could have told me this years ago.
              </p>
              <p>
                So I decided to become that &ldquo;someone&rdquo; for the next
                student in my shoes. Education this useful shouldn&apos;t be
                this hard to reach. That&apos;s what the Economic Mobility
                Project is here to fix.
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

      {/* Back to the mission */}
      <section className="bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-12 gap-y-6 px-6 py-14">
          <p className="max-w-2xl text-lg leading-8 text-stone">
            Want the bigger picture, the mission, the values, and where this is
            all headed?
          </p>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md border-2 border-ink bg-cream px-7 py-3.5 text-base font-bold text-ink shadow-[3px_3px_0_#11211c] transition-colors hover:bg-paper-deep"
          >
            Read our mission
          </Link>
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
