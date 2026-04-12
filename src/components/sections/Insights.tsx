/**
 * FILE: src/components/sections/Insights.tsx
 *
 * PURPOSE:
 * - Presents editorial content themes that reinforce the site's point of view
 */
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { posts } from "@/data/posts";
import { Link } from "@/i18n/navigation";

export function Insights() {
  const t = useTranslations("Insights");

  return (
    <section id='insights'>
      <Container className='py-16 md:py-24'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className='mt-10 grid gap-4 md:mt-12 md:grid-cols-3'>
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group block rounded-[var(--radius-lg)] border border-border-token bg-surface/80 p-6 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface/90 hover:shadow-[var(--shadow-soft)] hover:-translate-y-[2px]'
            >
              <div className='flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted'>
                <span className='text-accent-eyebrow-token'>
                  Journal
                </span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className='mt-6 text-2xl font-bold leading-tight tracking-[-0.035em] text-foreground group-hover:text-accent-token'>
                {post.title}
              </h3>
              <p className='mt-4 text-sm leading-7 text-foreground/72 group-hover:text-foreground'>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
