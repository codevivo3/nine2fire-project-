/**
 * FILE: src/app/[locale]/blog/[slug]/page.tsx
 *
 * PAGE: Blog Article
 *
 * ROUTE:
 * - /[locale]/blog/[slug]
 *
 * PURPOSE:
 * - Renders a single article from the shared blog data layer
 * - Keeps the route compatible with a future CMS-backed implementation
 *
 * NOTES:
 * - The current data source is temporary local data
 * - Article rendering should remain stable when the source moves to Sanity
 */
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { getPostBySlug } from "@/lib/blog/getPostBySlug";
import { getPosts } from "@/lib/blog/getPosts";
import { routing, type AppLocale } from "@/i18n/routing";

type BlogPostPageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPosts().map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <ArticleLayout
      title={post.title}
      date={post.date}
      locale={locale}
      readingTime={post.readingTime}
      imageSrc={post.coverImage}
      excerpt={post.excerpt}
      tags={post.tags}
    >
      <div className="mt-6 space-y-4 max-w-[680px]">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[15px] leading-7 text-foreground/90"
          >
            {paragraph.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}
      </div>
    </ArticleLayout>
  );
}
