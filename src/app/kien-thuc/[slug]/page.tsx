import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { Accent, ButtonLink, ImageFade, buttonClass } from "@/components/ui";
import { articles, office, services } from "@/content/site";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kien-thuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = articles.find((a) => a.slug === slug);
  return item
    ? {
        title: item.title,
        description: item.description,
        alternates: { canonical: `/kien-thuc/${item.slug}` },
        openGraph: {
          type: "article",
          title: item.title,
          description: item.description,
          publishedTime: item.published,
          modifiedTime: item.updated,
          images: [item.image],
        },
      }
    : {};
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function ArticlePage({ params }: PageProps<"/kien-thuc/[slug]">) {
  const { slug } = await params;
  const item = articles.find((a) => a.slug === slug);
  if (!item) notFound();
  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);
  const service = services.find((s) => s.slug === item.service);

  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-site">
          <div className="rounded-sm bg-sand p-2 md:p-2.5">
            <div className="rounded-sm bg-white px-5 py-6 text-center md:px-10 md:py-8">
              <span className="inline-block rounded-xs bg-line px-2.5 py-1 text-sm text-heading">{item.category}</span>
              <h1 className="mx-auto mt-4 max-w-4xl text-4xl md:text-5xl">{item.title}</h1>
              <p className="mt-4 text-sm">
                {office.name} · Cập nhật <time dateTime={item.updated}>{formatDate(item.updated)}</time>
              </p>
            </div>
            <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/6] md:mt-2.5">
              <Image
                src={item.image}
                alt=""
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1420px) 1340px, 100vw"
                className="object-cover"
              />
              <ImageFade to="sand" className="h-[35%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <article className="container-narrow md:text-lg">
          <div data-reveal className="rounded-sm border border-accent/30 bg-cream p-5 md:p-6">
            <p className="text-sm font-semibold text-heading">Trả lời ngắn</p>
            <p className="mt-2 text-heading">{item.answer}</p>
          </div>
          {item.sections.map((s) => (
            <div key={s.heading} data-reveal className="mt-10">
              <h2 className="text-3xl">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-3">
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div data-reveal className="mt-12 rounded-sm bg-sand p-5 md:p-6">
            <p className="text-heading">
              Bài viết mang tính tham khảo. Để được tư vấn cho trường hợp cụ thể, vui lòng liên hệ {office.name} qua
              số {office.phone} (điện thoại, Zalo) hoặc email {office.email}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/lien-he" size="sm">
                Gửi yêu cầu tư vấn
              </ButtonLink>
              {service && (
                <Link
                  href={`/dich-vu/${service.slug}`}
                  className={buttonClass({ size: "sm", variant: "outline" })}
                >
                  Dịch vụ {service.title.toLowerCase()}
                </Link>
              )}
            </div>
          </div>
        </article>
      </section>

      {others.length > 0 && (
        <section className="section-b">
          <div className="container-site">
            <h2 data-reveal className="text-center text-4xl md:text-5xl">
              Bài viết <Accent>khác</Accent>
            </h2>
            <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-2">
              {others.map((a) => (
                <Reveal key={a.slug}>
                  <ArticleCard item={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      <JsonLd
        data={[
          articleSchema(item),
          breadcrumbSchema([
            { name: "Kiến thức pháp lý", path: "/kien-thuc" },
            { name: item.title, path: `/kien-thuc/${item.slug}` },
          ]),
        ]}
      />
    </>
  );
}
