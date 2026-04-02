/**
 * FILE: src/components/layout/BrandLogo.tsx
 *
 * Purpose:
 * - Renders the primary brand mark as a locale-aware home link
 *
 * Notes:
 * - Both logo variants stay mounted so theme switching can be handled entirely in CSS
 */
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className ?? ""}`.trim()}
      aria-label="Nine2Fire"
    >
      <Image
        className="logo-light h-auto w-48"
        src="/logo/nine2fire-logo-text-dark-mode.svg"
        alt="Nine2Fire"
        width={158}
        height={28}
        priority
      />
      <Image
        className="logo-dark h-auto w-48"
        src="/logo/nine2fire-logo-text-light-mode.svg"
        alt="Nine2Fire"
        width={158}
        height={28}
        priority
      />
    </Link>
  );
}
