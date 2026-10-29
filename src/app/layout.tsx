import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { uvBootScript } from "@/lib/uv-store";
import { jp, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Shiosai" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "Shiosai",
    "Manazuru",
    "seafood restaurant",
    "tide menu",
    "Kanagawa",
    "omakase",
    "fishing boat",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EEE3" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0820" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${jp.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="uv-boot" strategy="beforeInteractive">
          {uvBootScript}
        </Script>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
