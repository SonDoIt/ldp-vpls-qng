import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cards";
import { Stars } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Accent, ImageFade } from "@/components/ui";
import { cases } from "@/content/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vu-viec/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  return item ? { title: item.title, description: item.intro } : {};
}

export default async function CasePage({ params }: PageProps<"/vu-viec/[slug]">) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) notFound();
  const others = cases.filter((c) => c.slug !== slug).slice(0, 2);
  const meta = [
    { label: "Lĩnh vực", value: item.area },
    { label: "Khách hàng", value: item.client },
    { label: "Kết quả", value: item.outcome },
  ];

  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-site">
          <div className="rounded-lg bg-sand p-2 md:rounded-xl md:p-2.5">
            <div data-reveal className="rounded-md bg-white px-5 py-6 text-center md:rounded-lg md:px-10 md:py-8">
              <h1 className="text-[2.25rem] leading-tight md:text-[3.5rem]">{item.title}</h1>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-sm">{m.label}:</dt>
                    <dd className="text-heading">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div data-reveal className="relative mt-2 aspect-[4/3] overflow-hidden rounded-md sm:aspect-[16/7.5] md:mt-2.5 md:rounded-lg">
              <Image
                src="/images/cases/case-detail.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1420px) 1340px, 100vw"
                className="object-cover"
              />
              <ImageFade to="sand" className="h-[35%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-narrow md:text-lg">
          <p data-reveal>{item.intro}</p>
          {item.sections.map((s) => (
            <div key={s.title} data-reveal className="mt-10">
              <h2 className="text-[1.75rem] md:text-[2.125rem]">{s.title}</h2>
              <ul className="mt-3 list-disc pl-5">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              {s.after && <p className="mt-6">{s.after}</p>}
            </div>
          ))}
          <figure data-reveal className="mt-12 rounded-md bg-sand p-2 md:p-2.5">
            <div className="rounded-xs bg-white p-5 md:rounded-md md:p-6">
              <Stars className="text-accent" />
              <blockquote className="mt-4 text-heading">{item.review.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image src={item.review.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                <span className="leading-tight">
                  <span className="block font-serif text-xl text-heading">{item.review.name}</span>
                  <span className="text-sm">{item.review.role}</span>
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section className="section-b">
        <div className="container-site">
          <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
            Vụ việc <Accent>khác</Accent>
          </h2>
          <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-2">
            {others.map((c) => (
              <Reveal key={c.slug}>
                <CaseCard item={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
