/**
 * FILE: src/components/ui/NavLink.tsx
 *
 * PURPOSE:
 * - Wraps localized links with the shared navigation text treatment
 *
 * NOTES:
 * - `link-highlight` centralizes the underline animation so header and footer links stay aligned
 */
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        `
        link-highlight
        relative
        inline-block
        text-sm
        font-semibold
        text-[color:var(--color-fg)]
        transition-colors duration-200
        `,
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  );
}
