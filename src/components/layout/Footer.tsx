/**
 * FILE: src/components/layout/Footer.tsx
 *
 * Purpose:
 * - Renders the global footer with localized navigation and legal placeholders
 *
 * Notes:
 * - Shares the same anchor structure as the header to keep landing-page sections discoverable
 */
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  const navLinks = [
    { href: "/#approach", label: t("navigation.approach") },
    { href: "/#roadmap", label: t("navigation.roadmap") },
    { href: "/#insights", label: t("navigation.insights") },
  ];

  const legalLinks = [
    { href: "/", label: t("legal.privacy") },
    { href: "/", label: t("legal.terms") },
  ];

  return (
    <footer className="border-t border-border-token bg-primary-token text-[color:var(--color-fg)]">
      <Container className="section-grid py-12 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
        <div className="section-grid gap-4">
          <BrandLogo />
          <p className="max-w-sm text-sm leading-7 text-[color:var(--color-fg)]/72">
            {t("tagline")}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg)]/50">
            {t("copyright")}
          </p>
        </div>

        <div className="section-grid gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-token">
            {t("navTitle")}
          </p>
          <div className="section-grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[color:var(--color-fg)]/80 hover:text-accent-token"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="section-grid gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-token">
            {t("legalTitle")}
          </p>
          <div className="section-grid gap-3">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[color:var(--color-fg)]/80 hover:text-accent-token"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
