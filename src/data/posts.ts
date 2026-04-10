/**
 * FILE: src/data/posts.ts
 *
 * DATA SOURCE: Local Posts
 *
 * PURPOSE:
 * - Provides a temporary in-memory source for blog content
 * - Mirrors the shape a CMS-backed fetcher will return later
 *
 * NOTES:
 * - This is a temporary local data layer designed to be replaced by Sanity or another CMS
 * - UI components should consume the shared blog API layer, not depend on this file directly
 * - Entries must match the `Post` type exactly
 * - Keep this module data-only with no retrieval logic
 */
import type { Post } from "@/lib/blog/types";

export const posts: Post[] = [
  {
    slug: "nine2fire-is-a-discipline-not-a-countdown",
    title: "Nine2Fire Is a Discipline, Not a Countdown",
    excerpt:
      "Financial freedom is usually framed as an exit. Nine2Fire works better as a practice: build systems, widen margin, and let time compound in your favor.",
    content: `
Most people treat financial independence like an escape plan.

That framing creates urgency without structure.

Nine2Fire is better understood as a discipline. The point is not to flee work. The point is to build a life that can absorb volatility without panic.

Money is only one mechanism. Systems, habits, and decision quality matter just as much.

If the structure is right, freedom arrives before the final number does.
    `.trim(),
    date: "2026-04-09",
    coverImage: "/blog/editorial-grid.svg",
    readingTime: "5 min",
    tags: ["philosophy", "systems"],
  },
  {
    slug: "the-quiet-math-behind-better-decisions",
    title: "The Quiet Math Behind Better Decisions",
    excerpt:
      "Most strategic mistakes are not dramatic. They come from underpricing fragility, overestimating optionality, and confusing motion with leverage.",
    content: `
The loudest choices are rarely the most important ones.

Better decisions often come from reducing downside before chasing upside. That is not pessimism. It is what makes conviction sustainable.

When you think in expected value, cash buffers, and recovery time, a calmer strategy starts to look more ambitious than a fragile one.
    `.trim(),
    date: "2026-04-06",
    coverImage: "/blog/signal-lines.svg",
    readingTime: "6 min",
    tags: ["strategy", "decision-making"],
  },
  {
    slug: "why-systems-beat-motivation-in-wealth-building",
    title: "Why Systems Beat Motivation in Wealth Building",
    excerpt:
      "Motivation is useful for starting. Systems are what keep contributions, reviews, and constraints running when attention shifts elsewhere.",
    content: `
Motivation is intermittent by design.

Systems are what remain once emotion leaves the room. Automated investing, spending caps, review cadences, and written rules remove the need for constant willpower.

The result is not rigidity. It is preserved energy for the decisions that actually deserve it.
    `.trim(),
    date: "2026-04-02",
    coverImage: "/blog/field-notes.svg",
    readingTime: "4 min",
    tags: ["systems", "behavior"],
  },
  {
    slug: "build-margin-before-you-chase-scale",
    title: "Build Margin Before You Chase Scale",
    excerpt:
      "Scale amplifies whatever is already true. If your baseline is stretched, growth compounds noise before it compounds returns.",
    content: `
People like the language of acceleration because it feels like progress.

But scale applied too early usually magnifies weak assumptions. Margin gives strategy room to survive corrections, missed estimates, and slower timelines.

The glamorous move is expansion. The durable move is slack.
    `.trim(),
    date: "2026-03-28",
    readingTime: "5 min",
    tags: ["strategy", "risk"],
  },
  {
    slug: "the-case-for-a-personal-operating-system",
    title: "The Case for a Personal Operating System",
    excerpt:
      "If your financial life depends on memory and mood, it is already more complex than it should be. A personal operating system reduces drag and preserves clarity.",
    content: `
Complexity rarely arrives all at once.

It accumulates through scattered accounts, unwritten rules, ad hoc reviews, and decisions made without a stable frame. A personal operating system turns that sprawl into a repeatable rhythm.

You need fewer heroic moments when the infrastructure is already there.
    `.trim(),
    date: "2026-03-20",
    coverImage: "/blog/calm-structure.svg",
    readingTime: "7 min",
    tags: ["systems", "strategy"],
  },
  {
    slug: "enough-is-a-strategy-not-a-compromise",
    title: "Enough Is a Strategy, Not a Compromise",
    excerpt:
      "Without a definition of enough, every gain becomes a moving target. Clear limits are not anti-ambition. They are what make ambition intelligible.",
    content: `
The market has an unlimited appetite for your attention.

If your goals are undefined, external benchmarks will always fill the gap. Defining enough creates contrast. It lets you distinguish expansion from drift.

A strategy without limits is usually just appetite with better branding.
    `.trim(),
    date: "2026-03-12",
    readingTime: "4 min",
    tags: ["philosophy", "strategy"],
  },
];
