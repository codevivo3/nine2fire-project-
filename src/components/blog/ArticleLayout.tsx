/**
 * FILE: src/components/blog/ArticleLayout.tsx
 *
 * COMPONENT: ArticleLayout
 *
 * PURPOSE:
 * - Defines the stable reading layout for long-form articles
 * - Keeps typography concerns separate from route logic
 * - Remains independent from the temporary local data source so article rendering can survive a CMS migration unchanged
 *
 * NOTES:
 * - Prioritizes readability over visual flourish
 * - Stays generic so CMS-driven rich content can fit later
 */
import type { ReactNode } from "react";
import Image from "next/image";

import { formatPostDate } from "@/lib/blog/formatPostDate";
import { Link } from "@/i18n/navigation";

type ArticleLayoutProps = {
  title: string;
  date: string;
  locale?: string;
  readingTime?: string;
  imageSrc?: string;
  imageAlt?: string;
  excerpt?: string;
  tags?: string[];
  children: ReactNode;
};

export function ArticleLayout({
  title,
  date,
  locale = "en",
  readingTime,
  imageSrc,
  imageAlt,
  excerpt,
  tags,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-[720px] space-y-6 px-4 pt-24 pb-12">
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-snug">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground/80 tracking-tight mt-1">
          {formatPostDate(date, locale)}
          {readingTime ? ` • ${readingTime}` : ""}
        </p>
        {excerpt && (
          <p className="text-base text-foreground/70 leading-relaxed max-w-[640px]">
            {excerpt}
          </p>
        )}
      </header>
      {imageSrc && (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-sm)] border border-border-token">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="text-xs px-2 py-1 rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-4 leading-7 text-[15px] text-foreground/90 mt-4 [&>p:first-child]:text-[17px] [&>p:first-child]:leading-8 [&>p:first-child]:font-medium">
        {children}
      </div>
    </article>
  );
}
