import type { Metadata } from "next";
import ParallaxPhoto from "@/components/ParallaxPhoto";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/ArticleBody";
import ReadingProgress from "@/components/ReadingProgress";
import MarkAsRead from "@/components/MarkAsRead";
import { blogPosts, getBlogPost, sortedBlogPosts } from "@/lib/blog";
import NextPost from "@/components/NextPost";

const BLOG_ACCENT = "#d26a4c"; // terracotta — the blog's editorial identity

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found | Empower" };
  return {
    title: `${post.title} | Empower Blog`,
    description: post.dek,
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ReadingProgress />
      {/* Namespaced so blog reads share the read map without colliding
          with Learn article slugs (consumers look up bare slugs only). */}
      <MarkAsRead slug={`blog/${post.slug}`} />
      <Header />

      <article className="bg-paper">
        <div
          id="article-content"
          className="mx-auto max-w-3xl px-6 py-12"
          style={{ ["--article-accent" as string]: BLOG_ACCENT }}
        >
          <nav>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
          </nav>

          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em]">
            <span style={{ color: BLOG_ACCENT }}>{post.tag}</span>
            <span className="font-medium normal-case tracking-normal text-stone">
              {formatDate(post.date)}
            </span>
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="article-lead mt-4 text-xl leading-8 text-stone">
            {post.dek}
          </p>
          <p className="mt-5 flex items-center gap-4 border-b border-sand pb-6 text-sm font-medium text-stone">
            <span>By the Empower Team</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readMinutes} min read
            </span>
          </p>

          <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl border border-sand">
            <ParallaxPhoto
              src={post.image.src}
              alt={post.image.alt}
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
            />
          </div>

          <div className="pt-2">
            <ArticleBody blocks={post.body} accent={BLOG_ACCENT} />
          </div>

          <div className="mt-12 rounded-2xl border border-sand bg-cream p-6 sm:p-7">
            <p className="font-display text-lg font-semibold text-ink">
              Want more like this?
            </p>
            <p className="mt-1.5 text-sm leading-6 text-stone">
              The blog is the fun stuff; the substance lives in the{" "}
              <Link
                href="/learn"
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                library
              </Link>
              . And if there&apos;s a money thing you want us to write about,{" "}
              <Link
                href="/ask#ask"
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                ask for it anonymously
              </Link>
              .
            </p>
            <NextPost
              current={post.slug}
              posts={sortedBlogPosts().map(
                ({ slug, title, dek, readMinutes, image }) => ({
                  slug,
                  title,
                  dek,
                  readMinutes,
                  image,
                })
              )}
            />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
