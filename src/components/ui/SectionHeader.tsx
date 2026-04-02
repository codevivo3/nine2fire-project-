/**
 * FILE: src/components/ui/SectionHeader.tsx
 *
 * Purpose:
 * - Standardizes the eyebrow, heading, and description pattern used by content sections
 */
type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-token">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-foreground/72 md:text-base">
        {description}
      </p>
    </div>
  );
}
