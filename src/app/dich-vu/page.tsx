import type { Metadata } from "next";
import Image from "next/image";
import { ServiceCard } from "@/components/cards";
import { Sparkle, StarFilled } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ConsultationSection, FaqSection, ProcessSteps } from "@/components/sections";
import { Accent, ImageFade } from "@/components/ui";
import { checklist, rating, reviews, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "Tổ chức thi hành án, xác minh điều kiện thi hành án, tống đạt, lập vi bằng, kê biên tài sản và tư vấn pháp lý.",
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
                <div data-reveal className="flex flex-wrap items-center gap-3">
                  <div className="flex -space-x-2">
                    {reviews.map((r) => (
                      <Image
                        key={r.name}
                        src={r.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="size-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 text-sm text-heading">
                    <StarFilled className="size-4 text-accent" />
                    Đánh giá {rating.score}/5 từ {rating.count}
                  </p>
                </div>
                <h1 data-reveal className="mt-5 text-[2.5rem] leading-[1.15] md:text-[3.25rem]">
                  <Accent>Dịch vụ</Accent> xây dựng trên kinh nghiệm và <Accent>niềm tin</Accent>
                </h1>
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
        <div className="container-site grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-site">
          <ProcessSteps />
        </div>
      </section>
      <ConsultationSection />
      <FaqSection />
    </>
  );
}
