import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeChecklist from "@/components/ChallengeChecklist";
import { challenges, getChallenge } from "@/lib/challenges";

export function generateStaticParams() {
  return challenges.map((c) => ({ challenge: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ challenge: string }>;
}): Promise<Metadata> {
  const { challenge } = await params;
  const found = getChallenge(challenge);
  if (!found) return { title: "Not Found | Empower" };
  return {
    title: `${found.title} | Empower Challenges`,
    description: found.tagline,
  };
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challenge: string }>;
}) {
  const { challenge } = await params;
  const found = getChallenge(challenge);
  if (!found) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
          <nav className="text-sm text-stone">
            <Link href="/challenges" className="hover:text-ink hover:underline">
              Challenges
            </Link>{" "}
            <span aria-hidden>›</span>{" "}
            <span className="font-medium text-ink">{found.title}</span>
          </nav>
          <span
            className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: found.color }}
          >
            {found.pace}
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {found.title}
          </h1>
          <p className="mt-2 max-w-2xl text-lg font-semibold text-ink/80">
            {found.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone">
            {found.description}
          </p>
          <Link
            href={`/community#post-${found.communityPostId}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <MessageCircle className="h-4 w-4" />
            Join the conversation in the challenge thread
          </Link>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:py-14">
          <ChallengeChecklist challenge={found} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
