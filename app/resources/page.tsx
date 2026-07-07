import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckBroker from "@/components/CheckBroker";
import TopicMark from "@/components/TopicMark";
import StateResources from "@/components/StateResources";

export const metadata: Metadata = {
  title: "Resources | Empower — Economic Mobility Project",
  description:
    "Trusted, free outside resources: scholarships and financial aid, government benefits and programs, money help, and free tax filing.",
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
        desc: "Plain-English guides on credit, loans, and your rights, plus a place to file complaints.",
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
      {
        name: "FINRA BrokerCheck",
        url: "https://brokercheck.finra.org",
        desc: "Look up any broker or investment adviser free before you hand over money.",
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
        {/* Hero — C: editorial maximal on a forest field */}
        <section className="relative overflow-hidden bg-forest text-cream">
          <TopicMark
            id="government-aid"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-20 -top-16 h-[24rem] w-[24rem] opacity-[0.07]"
          />
          <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-14 lg:pt-20">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Resources
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
              Help that&apos;s{" "}
              <span className="italic text-amber">already out there.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              A hand-picked list of trusted, free programs and tools for
              college aid, government benefits, money help, and taxes. Usually
              the hard part is knowing they exist.
            </p>
          </div>
        </section>

        {/* State finder — the hero object, pulled up over the field */}
        <section className="bg-paper">
          <div className="relative mx-auto -mt-14 max-w-5xl px-6">
            <StateResources />
          </div>
        </section>

        {/* National resources — editorial numbered link lists */}
        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Trusted national resources
            </h2>
            <p className="mt-2 text-base leading-7 text-stone">
              Free, reputable programs and tools that work anywhere in the U.S.
            </p>

            <div className="mt-10 space-y-12">
              {groups.map((group, gi) => (
                <div
                  key={group.title}
                  id={group.id}
                  className="grid scroll-mt-24 gap-x-12 gap-y-4 border-t-2 border-ink/10 pt-8 lg:grid-cols-[240px_1fr]"
                >
                  <div>
                    <span
                      aria-hidden="true"
                      className="block select-none font-display text-7xl font-bold leading-none text-sand"
                    >
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="divide-y divide-sand">
                    {group.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block py-5 first:pt-0"
                        >
                          <span className="font-display text-lg font-semibold text-ink underline decoration-amber decoration-2 underline-offset-4 transition-colors group-hover:text-forest">
                            {link.name}
                          </span>
                          <p className="mt-1.5 text-sm leading-6 text-stone">
                            {link.desc}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closer — A: amber field */}
        <section className="bg-amber text-ink">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <p className="max-w-3xl text-base leading-7 text-ink/80">
              We don&apos;t run or control these organizations. They&apos;re
              listed here because they&apos;re free, reputable, and useful.
              Double-check eligibility on the official site, and be wary of
              anyone charging you for help that&apos;s free.
            </p>
          </div>
        </section>
      </main>

      {/* Check-a-broker: the investor.gov habit, one click */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <CheckBroker />
        </div>
      </section>

      <Footer />
    </div>
  );
}
