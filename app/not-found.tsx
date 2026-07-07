import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="government-aid"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-16 -bottom-20 h-[24rem] w-[24rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <p className="font-display text-8xl font-bold text-amber sm:text-9xl">
            404
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
            This page doesn&apos;t exist.{" "}
            <span className="italic text-amber">Your money questions do.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/75">
            The link may be old, or a guide may have moved during a cleanup.
            Everything real is one click away.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink transition-colors hover:bg-cream"
            >
              Browse the library
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border-2 border-cream/40 px-7 py-3.5 text-base font-bold text-cream transition-colors hover:border-amber hover:text-amber"
            >
              Go home
            </Link>
          </div>
          <p className="mt-8 text-sm text-cream/60">
            Tip: press <kbd className="rounded border border-cream/30 px-1.5 py-0.5 text-xs">⌘K</kbd>{" "}
            and search for what you were after.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
