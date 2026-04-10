/**
 * FILE: src/lib/blog/types.ts
 *
 * TYPE: Post
 *
 * PURPOSE:
 * - Defines the canonical structure for blog content
 * - Defines a temporary local content shape designed to map cleanly to a future CMS schema such as Sanity
 *
 * NOTES:
 * - This local data layer is intentionally replaceable
 * - UI components must stay independent from the storage source so a CMS swap does not require route refactors
 * - Keeps content fields minimal while remaining extensible
 * - Avoids presentation-specific data so UI layers stay decoupled
 */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  tags: string[];
};
