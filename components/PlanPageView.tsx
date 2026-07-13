import Link from "next/link";
import PlanApp from "@/components/PlanApp";
import { frameHref, type Frame } from "@/lib/frame";


/**
 * The My Plan page below the header, shared by /plan and its /students
 * mirror (July 2026 comprehensiveness pass).
 */
export default function PlanPageView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  return (
    <>

      {/* Hero — compact forest field */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        <div className="relative mx-auto max-w-4xl px-6 py-12 lg:py-14">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            My plan
          </span>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Five questions.{" "}
            <span className="italic text-amber">One plan that's yours.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-cream/75">
            Tell us where you are and what you&apos;re after, and we&apos;ll
            line up the right guides, calculators, and deadlines in the order
            that makes sense for you. It saves on this device and checks
            itself off as you go.
          </p>
          <p className="mt-3 text-sm text-cream/60">
            Prefer to browse?{" "}
            <Link
              href={href("/journey")}
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              The guided paths
            </Link>{" "}
            are the same library, goal by goal.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-10 lg:py-12">
          <PlanApp />
        </div>
      </section>

    </>
  );
}
