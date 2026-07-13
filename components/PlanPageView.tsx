import Link from "next/link";
import { Compass } from "lucide-react";
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
        <Compass
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 opacity-[0.08]"
          strokeWidth={1}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-14 lg:py-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            My plan
          </span>
          <span className="ml-3 inline-block -rotate-1 rounded-md border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            Checks itself off as you go
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            A short conversation.{" "}
            <span className="italic text-amber">One plan that&apos;s yours.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Talk it out with the guide — or take the quick form — and
            we&apos;ll line up the right guides, calculators, and deadlines
            in the order that makes sense for you. It plays back what it
            heard before building, and you can flag anything that
            doesn&apos;t fit after.
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
