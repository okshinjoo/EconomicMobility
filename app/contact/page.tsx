import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

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
    text: "Educators, mentors, and organizations — let's build the support network together.",
  },
  {
    title: "Tell us what's missing",
    text: "A topic, a tool, a word that needs defining? We want to hear it.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        <section className="bg-paper">
          <div className="mx-auto max-w-4xl px-6 pb-12 pt-10 text-center lg:pb-14 lg:pt-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Get in touch</span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              We&apos;d love to hear from you.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
              A question, an idea, a story, a way to help — this is a community,
              and your voice is part of it.
            </p>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-3xl border border-sand bg-cream p-7 shadow-[0_1px_0_rgba(21,48,42,0.04),0_18px_40px_-28px_rgba(21,48,42,0.35)] sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Send a message
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink">
                Drop us a line
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                Ways to get involved
              </h2>
              <div className="mt-6 space-y-4">
                {involvement.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-md"
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

      <Footer />
    </div>
  );
}
