import MomentReads from "@/components/MomentReads";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TopicMark from "@/components/TopicMark";
import ScrollDrift from "@/components/ScrollDrift";
import { moments } from "@/lib/moments";
import { frameHref, type Frame } from "@/lib/frame";
import HeadlineRise from "@/components/HeadlineRise";


/**
 * The Life Moments page below the header, shared by /life and its
 * /students mirror (July 2026 comprehensiveness pass).
 */
export default function LifePageView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  return (
    <>

      {/* Hero — C voice */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={65} driftX={-25} rotate={5}>
          <TopicMark
            id="budgeting"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[26rem] w-[26rem] opacity-[0.16]"
          />
        </ScrollDrift>
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Life moments
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Start from{" "}
            <span className="italic text-amber"><HeadlineRise chars>what&apos;s happening.</HeadlineRise></span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/75">
            Nobody wakes up wanting to study personal finance. Something
            happens first: a job offer, a lease, an aid letter, a bad month.
            Pick your moment and get the three guides, the tool, and the path
            that fit it.
          </p>
        </div>
      </section>

      {/* Moments grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {moments.map((m, i) => (
              <Reveal key={m.id} delay={(i % 2) * 80}>
                <div
                  className={`card-ink flex h-full flex-col rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1 ${
                    i % 3 === 1 ? "lg:rotate-[0.4deg]" : i % 3 === 2 ? "lg:-rotate-[0.4deg]" : ""
                  }`}
                  style={{ background: `${m.color}0d` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-semibold leading-snug text-ink">
                        {m.title}
                      </h2>
                      <p className="mt-1 text-sm font-semibold" style={{ color: m.color }}>
                        {m.tagline}
                      </p>
                    </div>
                    <TopicMark id={m.markTopic} className="h-10 w-10 shrink-0" />
                  </div>

                  <MomentReads reads={m.reads} color={m.color} />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.tool && (
                      <Link
                        href={href(m.tool.href)}
                        className="rounded-md border-2 border-ink bg-cream px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-paper-deep"
                      >
                        Tool: {m.tool.label}
                      </Link>
                    )}
                    {m.course && (
                      <Link
                        href={href(m.course.href)}
                        className="rounded-md px-4 py-2 text-xs font-bold text-cream transition-opacity hover:opacity-90"
                        style={{ background: m.color }}
                      >
                        Course: {m.course.label}
                      </Link>
                    )}
                    {m.challenge && (
                      <Link
                        href={href(m.challenge.href)}
                        className="rounded-md border-2 px-4 py-2 text-xs font-bold transition-colors"
                        style={{ borderColor: m.color, color: m.color }}
                      >
                        Challenge: {m.challenge.label}
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-base text-stone">
            None of these fit? The{" "}
            <Link href={href("/quiz")} className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
              2-minute quiz
            </Link>{" "}
            builds a path from your answers instead.
          </p>
        </div>
      </section>

    </>
  );
}
