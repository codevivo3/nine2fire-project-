/**
 * FILE: src/lib/blog/getPosts.ts
 *
 * FUNCTION: getPosts
 *
 * PURPOSE:
 * - Serves as the central access point for retrieving all posts
 * - Decouples the UI layer from the current storage implementation
 *
 * FUTURE:
 * - Replace this temporary local data source with a CMS query
 * - UI consumers should keep using this function so the data source can change independently
 */
import { posts } from "@/data/posts";

export function getPosts() {
  return [...posts].sort((left, right) => {
    return (
      new Date(right.date).getTime() - new Date(left.date).getTime()
    );
  });
}
