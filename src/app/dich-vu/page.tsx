import type { Metadata } from "next";
import Image from "next/image";
import { ServiceCard } from "@/components/cards";
import { Sparkle } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ConsultationSection, FaqSection, ProcessSteps } from "@/components/sections";
import { Accent, ImageFade, PreTitle } from "@/components/ui";
import { checklist, office, services } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dịch vụ Thừa hành viên",
  description: `${office.name} thực hiện 4 chức năng của Thừa hành viên: tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự tại Quảng Ngãi.`,
  alternates: { canonical: "/dich-vu" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-site">
          <div className="grid gap-2 rounded-lg bg-sand p-2 md:grid-cols-2 md:rounded-xl md:p-2.5">
            <div className="relative isolate min-h-[18rem] overflow-hidden rounded-md md:min-h-[24rem] md:rounded-lg">
              <Image
                src="/images/services/services-hero.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="-z-10 object-cover"
              />
              <ImageFade to="sand" />
            </div>
            <div className="flex flex-col justify-between gap-10 rounded-md bg-white p-5 md:rounded-lg md:p-8">
              <div>
                <PreTitle data-reveal>4 chức năng của Thừa hành viên</PreTitle>
                <h1 data-reveal className="mt-5 text-[2.5rem] leading-[1.15] md:text-[3.25rem]">
                  <Accent>Dịch vụ</Accent> Thừa hành viên tại Quảng Ngãi
                </h1>
                <p data-reveal className="mt-4 md:text-lg">
                  Văn phòng thực hiện tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi
                  hành án dân sự theo đúng quy định pháp luật.
                </p>
              </div>
              <ul data-reveal className="flex flex-col gap-2">
                {checklist.map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <Sparkle className="size-3 shrink-0 text-heading" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-site">
          <h2 data-reveal className="mb-12 text-center text-[2.5rem] leading-[1.15] md:mb-16 md:text-[3.375rem]">
            Quy trình <Accent>làm việc</Accent>
          </h2>
          <ProcessSteps />
        </div>
      </section>
      <ConsultationSection />
      <FaqSection />
      <JsonLd data={breadcrumbSchema([{ name: "Dịch vụ", path: "/dich-vu" }])} />
    </>
  );
}
