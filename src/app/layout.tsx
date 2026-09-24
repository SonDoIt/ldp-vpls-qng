import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { office } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${office.name} – ${office.slogan}`,
  description: office.fullName,
  openGraph: {
    title: office.name,
    description: office.slogan,
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#142948",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <body className="min-h-full font-sans">
        <div aria-hidden="true" className="page-backdrop" />
        {children}
        <div aria-hidden="true" className="page-grain" />
      </body>
    </html>
  );
}
