import { head, office, services, siteUrl, type Article, type Member, type Service } from "@/content/site";

/** Absolute URL for a site path, for canonical links and structured data. */
export function absoluteUrl(path = "/") {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

const orgId = absoluteUrl("/#organization");
const headId = absoluteUrl(`/doi-ngu/${head.slug}#person`);

type Schema = Record<string, unknown>;

/** Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The office as a LegalService (a LocalBusiness), referenced by @id from every other node. */
export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": orgId,
    name: office.name,
    legalName: office.fullName,
    alternateName: [office.shortName, "Thừa phát lại Quảng Ngãi", "Thừa hành viên Quảng Ngãi"],
    description: office.description,
    slogan: office.slogan,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    telephone: office.phoneIntl,
    email: office.email,
    taxID: office.taxId,
    foundingDate: office.foundingDate,
    address: { "@type": "PostalAddress", ...office.postalAddress },
    hasMap: office.mapsUrl,
    areaServed: { "@type": "AdministrativeArea", name: office.areaServed },
    openingHoursSpecification: office.sessions.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: s.opens,
      closes: s.closes,
    })),
    founder: { "@id": headId },
    employee: { "@id": headId },
    sameAs: office.socials.filter((s) => s.icon !== "zalo").map((s) => s.href),
    knowsAbout: ["Thừa hành viên", "Thừa phát lại", "Vi bằng", "Tống đạt", "Thi hành án dân sự"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ Thừa hành viên",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": absoluteUrl(`/dich-vu/${s.slug}#service`) },
      })),
    },
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: office.name,
    url: absoluteUrl("/"),
    inLanguage: "vi-VN",
    publisher: { "@id": orgId },
  };
}

export function personSchema(member: Member): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/doi-ngu/${member.slug}#person`),
    name: member.name,
    jobTitle: `${member.title}, ${member.role}`,
    description: member.intro,
    url: absoluteUrl(`/doi-ngu/${member.slug}`),
    worksFor: { "@id": orgId },
    alumniOf: { "@type": "CollegeOrUniversity", name: member.education.school },
    knowsAbout: member.skills,
  };
}

export function serviceSchema(service: Service): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/dich-vu/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.definition,
    url: absoluteUrl(`/dich-vu/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: { "@type": "AdministrativeArea", name: office.areaServed },
  };
}

export function articleSchema(article: Article): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.image),
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: "vi-VN",
    mainEntityOfPage: absoluteUrl(`/kien-thuc/${article.slug}`),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Trang chủ", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
