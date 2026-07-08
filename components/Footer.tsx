import Link from "next/link";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/learn/credit", label: "Credit Scores" },
      { href: "/learn/budgeting", label: "Budgeting" },
      { href: "/learn/investing", label: "Investing" },
      { href: "/learn", label: "All Topics" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/tools", label: "Tools & Calculators" },
      { href: "/tools/templates", label: "Free Templates" },
      { href: "/resources", label: "Resources" },
      { href: "/ask", label: "Ask a Question" },
      { href: "/quiz", label: "Take the Quiz" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our Mission" },
      { href: "/about#story", label: "Who We Are" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber font-display text-base font-bold text-ink">
                E
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                <span className="text-amber">EMP</span>ower
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-cream/60">
              Plain-English financial education, free for everyone, built to
              break the cycle of economic disadvantage.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber/80">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Empower — Economic Mobility Project.
            All resources are free, always.
          </p>
          <p>Built by and for first-gen, low-income, and immigrant students.</p>
        </div>
      </div>
    </footer>
  );
}
