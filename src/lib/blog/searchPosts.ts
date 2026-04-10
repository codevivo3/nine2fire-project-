/**
 * FILE: src/lib/blog/searchPosts.ts
 *
 * PURPOSE:
 * - Provides a temporary local search helper for blog content
 * - Keeps search logic independent from the UI so it can later back a dedicated search surface or CMS query
 *
 * NOTES:
 * - This local implementation is designed to be replaced by Sanity-backed search later
 * - UI must remain independent from the data source
 * - Prepared for future search UI integration
 */
import { getPosts } from "@/lib/blog/getPosts";

export function searchPosts(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getPosts();
  }

  return getPosts().filter((post) => {
    return [post.title, post.excerpt, post.tags.join(" ")].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    );
  });
}
