import type { MetadataRoute } from "next";
import { articles, services, team } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/gioi-thieu", "/dich-vu", "/doi-ngu", "/kien-thuc", "/lien-he", "/chinh-sach-bao-mat", "/dieu-khoan"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), priority: path === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/dich-vu/${s.slug}`), priority: 0.9 })),
    ...team.map((m) => ({ url: absoluteUrl(`/doi-ngu/${m.slug}`), priority: 0.6 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/kien-thuc/${a.slug}`), lastModified: a.updated, priority: 0.8 })),
  ];
}
