import Link from "next/link";
import { CaretRight as ChevronRight } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcSwitcher from "@/components/CalcSwitcher";
import ToolDoodle, { toolStyles } from "@/components/ToolDoodle";

// /tools/<base-slug> → toolStyles/ToolDoodle category key
const doodleIdByBase: Record<string, string> = {
  budget: "budgeting",
  debt: "debt",
  savings: "saving",
  college: "college",
};

export default function CalcPageShell({
  base,
  current,
  categoryLabel,
  eyebrow,
  title,
  dek,
  children,
}: {
  base: string;
  current: string;
  categoryLabel: string;
  eyebrow: string;
  title: string;
  dek: string;
  children: React.ReactNode;
}) {
  const doodleId = doodleIdByBase[base.split("/")[2] ?? ""] ?? "budgeting";
  const doodleAccent = (toolStyles[doodleId] ?? toolStyles.budgeting).accent;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <section className="relative overflow-hidden bg-paper">
        {/* Ghost category doodle bleeding off the header's right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 hidden w-[42rem] opacity-[0.07] md:block"
        >
          <ToolDoodle id={doodleId} color={doodleAccent} wide />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-12">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href="/tools" className="transition-colors hover:text-ink">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={base} className="transition-colors hover:text-ink">
              {categoryLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">{eyebrow}</span>
          </nav>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            {eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">{dek}</p>
          <div className="mt-6">
            <CalcSwitcher base={base} current={current} />
          </div>
        </div>
      </section>
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-6xl px-6">{children}</div>
      </section>
      <Footer />
    </div>
  );
}
