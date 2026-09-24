import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { ConsultPopup } from "@/components/consult-popup";
import { FloatingContact } from "@/components/floating-contact";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { office } from "@/content/site";
import { JsonLd, absoluteUrl, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

// The site's face for body and headings alike. Variable, so every weight in use comes from one
// file per subset, and it covers Vietnamese diacritics natively.
const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// Second face, for the outlined word in headings only (`Accent`). SOFT is the rounded-terminal axis;
// opsz lets the browser pick the optical size from the font size.
const accent = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  weight: "variable",
  axes: ["SOFT", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${office.name} – Thừa hành viên (Thừa phát lại) Quảng Ngãi`,
    template: `%s | ${office.shortName}`,
  },
  description: office.description,
  applicationName: office.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: office.name,
    description: office.description,
    siteName: office.name,
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/images/hero-banner.webp", alt: office.name }],
  },
  formatDetection: { telephone: false },
};

// Light mode only: browser chrome and form controls never switch to a dark scheme.
export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
};

// Runs before first paint: arms the scroll reveal (hidden start state) unless motion is reduced, and
// un-arms it if the page script has not taken over within a few seconds, so content never stays hidden.
const revealScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-reveal");setTimeout(function(){if(!window.__revealReady)d.classList.remove("js-reveal")},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${sans.variable} ${accent.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="min-h-full font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingContact />
        <ConsultPopup />
        <ScrollEffects />
      </body>
    </html>
  );
}
