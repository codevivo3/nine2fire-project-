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
    >
      <div className="mt-6 md:mt-10" />
      <div className="mt-8 pt-8 border-t border-border/40 space-y-5 max-w-3xl">
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "text-xl text-foreground/95 max-w-xl leading-relaxed tracking-tight"
                : "max-w-2xl text-[15px] leading-6 text-foreground/85 tracking-tight"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </ArticleLayout>
  );
}
