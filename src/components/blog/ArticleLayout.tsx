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
import { formatPostDate } from "@/lib/blog/formatPostDate";

type ArticleLayoutProps = {
  title: string;
  date: string;
  locale?: string;
  readingTime?: string;
  children: ReactNode;
};

export function ArticleLayout({
  title,
  date,
  locale = "en",
  readingTime,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-[720px] space-y-8 px-4 pt-24 pb-12">
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-tight">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground/80 tracking-tight">
          {formatPostDate(date, locale)}
          {readingTime ? ` • ${readingTime}` : ""}
        </p>
      </header>
      <div className="border-t border-border/40" />

      <div className="space-y-5 leading-relaxed text-[15px] text-foreground/90">
        {children}
      </div>
    </article>
  );
}
