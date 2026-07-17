import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import ContactForm from "@/components/ContactForm";
import HeroRecede from "@/components/HeroRecede";

export const metadata: Metadata = {
  title: "Contact | Empower — Economic Mobility Project",
  description:
    "Questions, ideas, or want to get involved? Reach out to the Economic Mobility Project.",
};

const involvement = [
  {
    title: "Share your story",
    text: "Your experience can help shape what we build and who we reach.",
  },
  {
    title: "Partner or volunteer",
    text: "If you're an educator, mentor, or organization, let's build the support network together.",
  },
  {
    title: "Tell us what's missing",
    text: "If we're missing a topic, a tool, or a word that needs defining, we want to hear about it.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      <main>
        {/* Hero — A: amber field, left-aligned with a sticker chip */}
        <section className="bg-amber text-ink">
          <HeroRecede className="mx-auto max-w-5xl px-6 pb-12 pt-12 lg:pb-14">
            <span className="-rotate-2 inline-block rounded-lg border-2 border-ink bg-cream px-4 py-1.5 text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_#11211c]">
              Get in touch
            </span>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.07] sm:leading-[1.05] tracking-tight sm:text-6xl">
              We&apos;d love to hear from you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
              Send a question, an idea, a story, or an offer to help. This
              project runs on hearing from the people it&apos;s for.
            </p>
          </HeroRecede>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
            {/* Form — B: ink & shadow card */}
            <div className="card-ink-lg rounded-2xl bg-cream p-7 sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Send a message
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink">
                Drop us a line
              </h2>
              <div className="mt-6">
                <ContactForm />

                {/* Direct lines for specific kinds of mail (July 2026) */}
                <div className="mt-8 rounded-xl border border-sand bg-cream p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
                    Writing about something specific?
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-stone">
                    <li>
                      <span className="font-semibold text-ink">Press &amp; media:</span>{" "}
                      <a href="mailto:press@economicmobilityproject.org" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">press@economicmobilityproject.org</a>
                    </li>
                    <li>
                      <span className="font-semibold text-ink">Schools, nonprofits &amp; partnerships:</span>{" "}
                      <a href="mailto:partnerships@economicmobilityproject.org" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">partnerships@economicmobilityproject.org</a>
                    </li>
                    <li>
                      <span className="font-semibold text-ink">Privacy &amp; data requests:</span>{" "}
                      <a href="mailto:privacy@economicmobilityproject.org" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">privacy@economicmobilityproject.org</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                Ways to get involved
              </h2>
              <div className="mt-6 space-y-5">
                {involvement.map((item, i) => (
                  <div
                    key={item.title}
                    className={`card-ink rounded-2xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1 ${
                      i === 1 ? "lg:rotate-[0.5deg]" : ""
                    }`}
                  >
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base leading-7 text-stone">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
