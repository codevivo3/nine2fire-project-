/**
 * FILE: src/app/layout.tsx
 *
 * PURPOSE:
 * - Defines the application shell shared by every route
 * - Registers global fonts, metadata, and document-level styling hooks
 *
 * NOTES:
 * - Root metadata stays generic so locale segments can extend it safely
 * - `lang` is resolved from next-intl at render time to keep SSR output aligned
 */
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { getLocale } from "next-intl/server";
import { Manrope } from "next/font/google";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/**
 * Global metadata configuration shared by all routes.
 *
 * Includes base SEO fields, social metadata, and favicon declarations.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://nine2fire.com"),
  title: {
    default: "Nine2Fire — The Financial Architect",
    template: "%s | Nine2Fire",
  },
  description:
    "Build a system that runs without you. Structured thinking for financial independence.",
  keywords: [
    "financial independence",
    "FIRE",
    "wealth systems",
    "investing",
    "personal finance",
  ],
  openGraph: {
    title: "Nine2Fire — The Financial Architect",
    description: "Build a system that runs without you.",
    url: "https://nine2fire.com",
    siteName: "Nine2Fire",
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nine2Fire",
    description: "Structured thinking for financial independence.",
  },
  /**
   * Favicon & app icons configuration
   *
   * Notes:
   * - Provide multiple sizes so browsers can choose correctly
   * - Keep design consistent across all assets
   * - `.ico` acts as fallback
   */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Falls back when locale resolution happens outside a localized segment.
  const locale = await getLocale().catch(() => "en");
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const themeScript = `
    (function () {
      var storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
      var storedTheme = null;

      try {
        var value = window.localStorage.getItem(storageKey);
        if (value === "light" || value === "dark" || value === "system") {
          storedTheme = value;
        }
      } catch {}

      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      var theme;
      if (!storedTheme || storedTheme === "system") {
        theme = systemTheme;
      } else {
        theme = storedTheme;
      }

      var root = document.documentElement;

      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.setAttribute("data-theme", theme);
      // React to system theme changes only if user preference is "system" or not set
      try {
        var media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", function () {
          var stored = null;
          try {
            var value = window.localStorage.getItem(storageKey);
            if (value === "light" || value === "dark" || value === "system") {
              stored = value;
            }
          } catch {}

          if (!stored || stored === "system") {
            var newTheme = media.matches ? "dark" : "light";
            root.classList.remove("light", "dark");
            root.classList.add(newTheme);
            root.setAttribute("data-theme", newTheme);
          }
        });
      } catch {}
    })();
  `;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {plausibleDomain ? (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>
      <body className="min-h-full text-foreground font-sans before:content-[''] before:fixed before:inset-[-32px] before:-z-10 before:bg-[var(--background-pattern)] before:bg-cover before:bg-center before:bg-no-repeat">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
