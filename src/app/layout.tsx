/**
 * FILE: src/app/layout.tsx
 *
 * Purpose:
 * - Defines the application shell shared by every route
 * - Registers global fonts, metadata, and document-level styling hooks
 *
 * Notes:
 * - Root metadata stays generic so locale segments can extend it safely
 * - `lang` is resolved from next-intl at render time to keep SSR output aligned
 */
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/**
 * Global metadata configuration
 *
 * Includes:
 * - SEO base metadata
 * - OpenGraph / Twitter
 * - Favicon system (multi-source)
 *
 * IMPORTANT:
 * All favicon assets must share the same visual identity
 * to avoid inconsistent browser rendering.
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
  // Fall back to the default document language if locale resolution happens
  // outside a localized segment, such as the redirecting root entrypoint.
  const locale = await getLocale().catch(() => "en");

  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
