import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ServiceCard } from "@/components/cards";
import { ContactForm } from "@/components/contact-form";
import { Clock, Phone } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/ui";
import { articles, office, services } from "@/content/site";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/dich-vu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service
    ? {
        title: `${service.title} tại Quảng Ngãi`,
        description: service.definition,
        alternates: { canonical: `/dich-vu/${service.slug}` },
      }
    : {};
}

function SideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md bg-sand p-2 md:rounded-lg">
      <h2 className="px-3 pt-2 pb-3 text-xl md:text-[1.375rem]">{title}</h2>
      <div className="rounded-xs bg-white p-4 md:rounded-md md:p-5">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-heading">{label}</p>
      <div className="mt-2.5 flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xxs bg-sand text-accent-ink">{icon}</span>
        {children}
      </div>
    </div>
  );
}

export default async function ServicePage({ params }: PageProps<"/dich-vu/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== slug);
  const related = articles.filter((a) => a.service === slug);

  return (
    <>
      <section className="pt-32 md:pt-36">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[2.5rem] leading-[1.15] md:text-[3.75rem]">{service.title}</h1>
            <p data-reveal className="mt-3 md:text-lg">{service.summary}</p>
          </div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/8] md:rounded-xl">
            <Image
              src="/images/services/service-detail.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1420px) 1360px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-10 section-b md:pt-12">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16 xl:grid-cols-[1fr_25rem]">
          <article className="flex flex-col gap-14 md:text-lg">
            <div data-reveal>
              <h2 className="text-[1.875rem] first-letter:uppercase md:text-[2.25rem]">{service.name} là gì?</h2>
              <p className="mt-4 rounded-xs border-l-2 border-accent bg-cream px-4 py-3 text-heading">{service.definition}</p>
              <div className="mt-4 flex flex-col gap-3">
                {service.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div data-reveal className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-[1.875rem] md:text-[2.25rem]">Khi nào cần {service.name}?</h2>
                <ul className="mt-4 flex list-disc flex-col gap-1.5 pl-5">
                  {service.useCases.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/2.6] overflow-hidden rounded-md">
                <Image src={service.image} alt="" fill sizes="(min-width: 64rem) 25vw, 90vw" className="object-cover" />
              </div>
            </div>
            <div data-reveal>
              <h2 className="text-[1.875rem] md:text-[2.25rem]">Quy trình thực hiện</h2>
              <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5">
                {service.process.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
            <aside data-reveal className="rounded-xs bg-sand p-5 md:p-6">
              <h2 className="font-sans text-lg font-semibold text-heading">Lưu ý</h2>
              <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-heading">
                {service.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </aside>
            {related.length > 0 && (
              <div data-reveal>
                <h2 className="text-[1.875rem] md:text-[2.25rem]">Bài viết liên quan</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/kien-thuc/${a.slug}`} className="text-heading underline underline-offset-4 hover:text-accent-ink">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <SideCard title="Liên hệ">
              <div className="flex flex-col gap-6">
                <InfoRow icon={<Phone className="size-4" />} label="Điện thoại / Zalo">
                  <a href={office.phoneHref} className="text-heading hover:text-accent-ink">
                    {office.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock className="size-4" />} label={`Giờ làm việc (${office.workdays})`}>
                  <span>{office.timing}</span>
                </InfoRow>
              </div>
            </SideCard>
            <SideCard title="Gửi yêu cầu tư vấn">
              <ContactForm compact />
            </SideCard>
          </aside>
        </div>
      </section>

      <section className="section-b">
        <div className="container-site">
          <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
            Dịch vụ <Accent>khác</Accent>
          </h2>
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Dịch vụ", path: "/dich-vu" },
            { name: service.title, path: `/dich-vu/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
