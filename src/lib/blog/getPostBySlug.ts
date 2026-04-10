/**
 * FILE: src/lib/blog/getPostBySlug.ts
 *
 * FUNCTION: getPostBySlug
 *
 * PURPOSE:
 * - Retrieves a single post by slug
 * - Supports the dynamic article route without exposing the raw data source
 *
 * FUTURE:
 * - Replace this temporary local implementation with a CMS query
 * - Route components should remain unchanged when the storage backend moves to Sanity
 */
import { getPosts } from "@/lib/blog/getPosts";

export function getPostBySlug(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}
