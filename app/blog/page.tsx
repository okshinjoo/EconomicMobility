import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sortedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Empower — Economic Mobility Project",
  description:
    "Fun, honest reads on day-to-day money life: spotting fake gurus, app tricks, and the stuff between the guides.",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = sortedBlogPosts();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <span className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            New reads, no lectures
          </span>
          <h1 className="mt-7 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-7xl">
            The stuff between the guides.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone">
            Day-to-day money life: the trends worth side-eyeing, the traps
            dressed up as apps, and the fun tidbits that don&apos;t fit a
            curriculum. For the structured stuff, the{" "}
            <Link
              href="/learn"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              library
            </Link>{" "}
            and{" "}
            <Link
              href="/courses"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              courses
            </Link>{" "}
            have you covered.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          {/* C: editorial object list — giant index numbers, ink rules */}
          <div className="divide-y-2 divide-ink border-y-2 border-ink">
            {posts.map((post, i) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-6 py-10 sm:gap-10"
                >
                  <span className="font-display text-6xl font-bold leading-none text-sand transition-colors group-hover:text-amber sm:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.16em]">
                      <span className="text-terracotta">{post.tag}</span>
                      <span className="font-medium normal-case tracking-normal text-stone">
                        {formatDate(post.date)}
                      </span>
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4 sm:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-base leading-7 text-stone">
                      {post.dek}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-stone">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMinutes} min read
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-10 text-base text-stone">
            Got a topic you want covered, or a question of your own?{" "}
            <Link
              href="/ask#ask"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Ask it anonymously
            </Link>{" "}
            — the best ones become posts and answers.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
