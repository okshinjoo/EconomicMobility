import Link from "next/link";
import Footer from "@/components/Footer";

// The thin wrapper for calculators mounted inside the student microsite
// (July 2026, owner call: keep everything in-house). Same calculator
// components as /tools/*, student header via the /students layout, and
// each page's canonical points at the main-site original.
export default function StudentToolShell({
  title,
  dek,
  children,
}: {
  title: string;
  dek: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Tools / {title}
          </nav>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone">
            {dek}
          </p>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </section>
      <Footer frame="student" />
    </div>
  );
}
