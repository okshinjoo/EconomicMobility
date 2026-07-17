import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import BlogList, { type BlogListItem } from "@/components/BlogList";
import { sortedBlogPosts } from "@/lib/blog";
import { allArticles } from "@/lib/articles";
import { topics, type TopicId } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Blog | Empower — Economic Mobility Project",
  description:
    "Fun, honest reads on day-to-day money life: spotting fake gurus, app tricks, and the stuff between the guides.",
};

export default function BlogPage() {
  const posts: BlogListItem[] = sortedBlogPosts().map(
    ({ slug, title, dek, date, tag, topics, readMinutes, image }) => ({
      slug,
      title,
      dek,
      date,
      tag,
      topics,
      readMinutes,
      image,
    })
  );

  // Light lookup maps so BlogList can score this device's reading history
  // without the client bundle importing lib/articles.
  const articleTopics: Record<string, TopicId> = {};
  for (const a of allArticles) articleTopics[a.slug] = a.topicId;
  const topicNames: Record<string, string> = {};
  for (const t of topics) topicNames[t.id] = t.short;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <span className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            New reads, no lectures
          </span>
          <h1 className="mt-7 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[1.02] tracking-tight text-ink sm:text-7xl">
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
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <BlogList
            posts={posts}
            articleTopics={articleTopics}
            topicNames={topicNames}
          />

          <p className="mt-10 text-base text-stone">
            Got a topic you want covered, or a question of your own?{" "}
            <Link
              href="/ask#ask"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Ask it anonymously
            </Link>{" "}
            and the best ones become posts and answers.
          </p>
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
