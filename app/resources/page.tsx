import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StateResources from "@/components/StateResources";

export const metadata: Metadata = {
  title: "Resources | Empower — Economic Mobility Project",
  description:
    "Trusted, free outside resources — scholarships and financial aid, government benefits and programs, money help, and free tax filing.",
};

const groups = [
  {
    id: "college-scholarships",
    title: "College & scholarships",
    links: [
      {
        name: "Federal Student Aid (FAFSA)",
        url: "https://studentaid.gov",
        desc: "Apply for federal grants, loans, and work-study. Always free to file.",
      },
      {
        name: "CareerOneStop Scholarship Finder",
        url: "https://www.careeronestop.org/toolkit/training/find-scholarships.aspx",
        desc: "A free U.S. Department of Labor database of thousands of scholarships.",
      },
      {
        name: "BigFuture Scholarships",
        url: "https://bigfuture.collegeboard.org/pay-for-college/scholarships",
        desc: "Scholarship search and step-by-step actions you can get rewarded for.",
      },
    ],
  },
  {
    id: "government-benefits",
    title: "Government benefits & programs",
    links: [
      {
        name: "Benefits.gov",
        url: "https://www.benefits.gov",
        desc: "Answer a few questions to find federal benefits you may qualify for.",
      },
      {
        name: "211 (United Way)",
        url: "https://www.211.org",
        desc: "Call or search for local help with food, housing, utilities, and more.",
      },
      {
        name: "SNAP food assistance",
        url: "https://www.fns.usda.gov/snap/recipient/eligibility",
        desc: "Check eligibility and apply for help paying for groceries.",
      },
      {
        name: "HealthCare.gov",
        url: "https://www.healthcare.gov",
        desc: "Find health coverage, including free or low-cost Medicaid.",
      },
    ],
  },
  {
    id: "money-help",
    title: "Money help & credit",
    links: [
      {
        name: "Consumer Financial Protection Bureau",
        url: "https://www.consumerfinance.gov",
        desc: "Plain-English guides on credit, loans, and your rights — and a place to file complaints.",
      },
      {
        name: "AnnualCreditReport.com",
        url: "https://www.annualcreditreport.com",
        desc: "The official site for your free credit reports. Don't pay anyone else for these.",
      },
      {
        name: "NFCC credit counseling",
        url: "https://www.nfcc.org",
        desc: "Connect with nonprofit, free or low-cost help for managing debt.",
      },
    ],
  },
  {
    id: "free-tax-filing",
    title: "Free tax filing",
    links: [
      {
        name: "IRS Free File",
        url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
        desc: "File your federal taxes online for free if you qualify.",
      },
      {
        name: "Free tax prep (VITA)",
        url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
        desc: "Free, in-person help preparing your return from IRS-certified volunteers.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        <section className="bg-paper">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Resources</span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Help that&apos;s already out there.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
              A hand-picked list of trusted, free programs and tools — for
              college aid, government benefits, money help, and taxes. The hard
              part is knowing they exist.
            </p>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 pb-4">
            <StateResources />
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 pb-2">
            <h2 className="font-display text-2xl font-bold text-ink">
              Trusted national resources
            </h2>
            <p className="mt-1 text-sm leading-6 text-stone">
              Free, reputable programs and tools that work anywhere in the U.S.
            </p>
          </div>
          <div className="mx-auto max-w-5xl space-y-12 px-6 pb-16 pt-6">
            {groups.map((group) => (
              <div key={group.title} id={group.id} className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-ink">
                  {group.title}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {group.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {link.name}
                        </h3>
                        <ArrowUpRight
                          className="h-4 w-4 flex-shrink-0 text-stone transition-colors group-hover:text-forest"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="mt-2 text-sm leading-6 text-stone">
                        {link.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-paper-deep">
          <div className="mx-auto max-w-3xl px-6 py-12 text-center">
            <p className="text-sm leading-7 text-stone">
              These are independent organizations we don&apos;t run or control —
              we list them because they&apos;re free, reputable, and genuinely
              useful. Always double-check eligibility on the official site, and
              be wary of anyone charging you for help that&apos;s free.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
