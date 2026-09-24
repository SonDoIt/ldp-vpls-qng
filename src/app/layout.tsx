import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { office } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// The reference uses Libre Caslon Text, which has no Vietnamese glyphs; Newsreader is the
// closest transitional serif that does, so diacritics never fall back to another face.
const serif = Newsreader({
  variable: "--font-serif-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${office.name} – ${office.slogan}`,
    template: `%s | ${office.shortName}`,
  },
  description: office.fullName,
  openGraph: {
    title: office.name,
    description: office.slogan,
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

// Runs before first paint: arms the scroll reveal (hidden start state) unless motion is reduced, and
// un-arms it if the page script has not taken over within a few seconds, so content never stays hidden.
const revealScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-reveal");setTimeout(function(){if(!window.__revealReady)d.classList.remove("js-reveal")},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} ${serif.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="min-h-full font-sans">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollEffects />
      </body>
    </html>
  );
}
