export type NavItem = {
  href: string;
  labelKey: string;
};

export const mainNavLinks: NavItem[] = [
  { href: '/#approach', labelKey: 'links.approach' },
  { href: '/#roadmap', labelKey: 'links.roadmap' },
  { href: '/#insights', labelKey: 'links.insights' },
  { href: '/blog', labelKey: 'links.journal' },
];
