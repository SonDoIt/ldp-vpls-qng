import type { Metadata } from "next";
import Image from "next/image";
import { MemberCard, ServiceCard } from "@/components/cards";
import { Sparkle, StarFilled } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { PillarsScroller } from "@/components/pillars-scroller";
import { Reveal } from "@/components/reveal";
import { ReviewCarousel } from "@/components/review-carousel";
import { ConsultationSection, FaqSection, ProcessSteps, Stats } from "@/components/sections";
import { Accent, AwardBadge, ButtonLink, ImageFade, PhotoPanel, PreTitle } from "@/components/ui";
import { focusAreas, highlights, office, partnerLogos, rating, services, team } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: office.name },
  description:
    "Văn phòng Thi hành án dân sự Quảng Ngãi: tổ chức thi hành án, xác minh điều kiện thi hành án, tống đạt, lập vi bằng và tư vấn pháp lý tận tâm, minh bạch.",
};

function Hero() {
  return (
    <section className="bg-cream pt-28 md:pt-36">
      <div className="container-site">
        <div className="mx-auto max-w-[1100px] rounded-t-xl bg-[linear-gradient(180deg,var(--color-sand),var(--color-cream))] p-2 md:rounded-t-3xl md:p-2.5">
          <Marquee duration={30} className="mask-fade-x mx-auto max-w-md py-3 text-sm text-heading md:py-3.5">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-5 whitespace-nowrap">
                {h}
                <Sparkle className="size-3" />
              </span>
            ))}
          </Marquee>
          <PhotoPanel
            src="/images/hero.webp"
            priority
            sizes="(min-width: 1140px) 1080px, 100vw"
            fadeTo="cream"
            aspect="aspect-[4/4.2]"
            fadeClassName="h-[55%] md:h-[75%]"
            imageClassName="object-top"
            className="rounded-t-lg bg-cream text-center md:min-h-[44rem] md:rounded-t-3xl"
            contentClassName="px-4 pb-8 md:pb-10"
          >
            <div className="flex flex-col items-center">
              <h1 data-reveal className="max-w-3xl text-[2.625rem] leading-[1.1] md:text-[4.5rem] lg:text-[5rem]">
                Thi hành án <Accent>tận tâm</Accent>, <Accent>vững vàng</Accent> quyền lợi
              </h1>
              <div data-reveal className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <ButtonLink href="/lien-he">Tư vấn miễn phí</ButtonLink>
                <AwardBadge />
              </div>
            </div>
          </PhotoPanel>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="bg-[linear-gradient(180deg,var(--color-cream)_50%,#fff_50%)]">
      <div className="container-site">
        <div className="grid gap-5 rounded-t-lg bg-white p-2.5 md:grid-cols-2 md:rounded-t-xl md:p-5 lg:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FocusChip({ label, icon }: { label: string; icon: number }) {
  return (
    <span className="flex items-center gap-2.5 rounded-xs border border-line bg-cream px-4 py-2.5 whitespace-nowrap text-heading md:text-lg">
      <Image src={`/images/icons/area-${icon}.svg`} alt="" width={24} height={24} className="size-6" />
      {label}
    </span>
  );
}

function FocusAreas() {
  const half = Math.ceil(focusAreas.length / 2);
  return (
    <section className="section-y overflow-hidden">
      <div className="relative flex flex-col items-center">
        <div className="flex w-full flex-col gap-5 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2">
          <Marquee duration={45} className="mask-fade-x container-site">
            {focusAreas.slice(0, half).map((a) => (
              <FocusChip key={a.label} {...a} />
            ))}
          </Marquee>
          <Marquee reverse duration={45} className="mask-fade-x container-site">
            {focusAreas.slice(half).map((a) => (
              <FocusChip key={a.label} {...a} />
            ))}
          </Marquee>
        </div>
        <div className="relative z-10 order-first mb-10 grid size-[18rem] place-items-center rounded-full border-[10px] border-cream bg-sand md:order-none md:mb-0 md:size-[18.75rem] md:shadow-[0_0_0_60px_rgb(255_255_255/0.85)]">
          <div data-reveal className="flex flex-col items-center gap-5 px-6 text-center">
            <h2 className="text-[2rem] leading-tight md:text-[2.25rem]">
              Lĩnh vực <Accent>thế mạnh</Accent>
            </h2>
            <ButtonLink href="/lien-he" size="sm">
              Trao đổi hồ sơ
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Justice() {
  return (
    <section className="section-b">
      <div className="container-site flex flex-col items-center text-center">
        <PreTitle data-reveal>Cách chúng tôi làm việc</PreTitle>
        <div className="relative mt-6 flex w-full justify-center">
          <p
            aria-hidden="true"
            data-reveal
            className="pointer-events-none absolute top-[12%] left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-sand),transparent_85%)] bg-clip-text font-serif text-[6rem] leading-none whitespace-nowrap text-transparent select-none sm:text-[10rem] md:text-[14rem] lg:text-[17rem]"
          >
            Công lý
          </p>
          <div data-reveal className="relative aspect-[180/190] w-36 overflow-hidden rounded-t-md md:w-[11.25rem]">
            <Image src="/images/justice-portrait.webp" alt="" fill sizes="180px" className="object-cover" />
            <ImageFade to="white" className="h-[45%]" />
          </div>
        </div>
        <div className="relative mt-6 flex flex-col items-center">
          <h2 data-reveal className="max-w-3xl text-[2.5rem] leading-[1.15] md:text-[4rem]">
            Bạn xứng đáng được <Accent>bảo vệ</Accent> đến cùng.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-base md:text-lg">
            Dù là cá nhân hay doanh nghiệp, mỗi đương sự đều nhận được cùng một sự tận tâm, trao đổi rõ ràng
            và phương án hướng đến kết quả.
          </p>
        </div>
        <Stats className="mt-16 w-full md:mt-24" />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-b">
      <div className="container-site">
        <div className="rounded-lg bg-sand p-2 md:rounded-xl md:p-2.5">
          <div className="grid gap-10 rounded-md bg-white p-5 md:rounded-lg md:p-10 lg:grid-cols-[1fr_1.35fr]">
            <div className="flex flex-col justify-between gap-8">
              <div data-reveal>
                <PreTitle>Khách hàng nói về chúng tôi</PreTitle>
                <h2 className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
                  Hiệu quả được <Accent>ghi nhận</Accent>
                </h2>
              </div>
              <div data-reveal>
                <p className="flex items-center gap-2 font-serif text-[1.75rem] text-heading">
                  <StarFilled className="size-7 text-accent" />
                  {rating.score}
                  <span className="text-xl">/5</span>
                </p>
                <p className="mt-1 md:text-lg">Dựa trên {rating.count} của khách hàng</p>
              </div>
            </div>
            <div data-reveal className="min-w-0">
              <ReviewCarousel />
            </div>
          </div>
          <Marquee duration={35} gap="3rem" className="mask-fade-x mx-auto max-w-4xl py-6 md:py-7">
            {partnerLogos.map((src) => (
              <Image key={src} src={src} alt="" width={120} height={32} className="h-7 w-auto opacity-80 md:h-8" />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function Benefit() {
  return (
    <section className="section-b">
      <div className="px-[var(--gutter)]">
        <PhotoPanel
          src="/images/cta-handshake.webp"
          sizes="100vw"
          aspect="aspect-[4/3.6]"
          fadeClassName="h-[55%] md:h-[75%]"
          imageClassName="object-top"
          className="mx-auto max-w-[1660px] rounded-t-lg text-center md:min-h-[52rem] md:rounded-t-xl"
          contentClassName="px-4 pb-4"
        >
          <div className="flex flex-col items-center">
            <h2 data-reveal className="max-w-2xl text-[2.5rem] leading-[1.15] md:text-[4rem]">
              Đòi lại quyền lợi. Vững <Accent>niềm tin</Accent>
            </h2>
            <div data-reveal className="mt-8 flex flex-col items-center gap-4 rounded-md border border-line bg-cream p-4 sm:flex-row sm:gap-5 sm:py-3 sm:pr-3 sm:pl-4 md:mt-10">
              <Image
                src="/images/avatars/avatar-8.webp"
                alt=""
                width={50}
                height={50}
                className="hidden size-[50px] rounded-xs object-cover sm:block"
              />
              <p className="max-w-64 text-heading sm:text-left md:text-lg">Hỗ trợ trọn vẹn trên toàn địa bàn tỉnh Quảng Ngãi</p>
              <ButtonLink href="/lien-he" size="sm">
                Làm việc cùng chúng tôi
              </ButtonLink>
            </div>
          </div>
        </PhotoPanel>
      </div>
    </section>
  );
}

function TeamPreview() {
  return (
    <section className="section-b">
      <div className="container-site grid items-end gap-12 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-12 self-stretch lg:justify-between lg:py-2">
          <div>
            <PreTitle data-reveal>Gặp gỡ đội ngũ</PreTitle>
            <h2 data-reveal className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
              Đội ngũ chấp hành viên
              <br />
              <Accent>giàu kinh nghiệm</Accent>
            </h2>
            <ButtonLink data-reveal href="/doi-ngu" className="mt-8">
              Xem toàn bộ đội ngũ
            </ButtonLink>
          </div>
          <Marquee duration={30} gap="3rem" className="mask-fade-x">
            {team.map((m) => (
              <span key={m.slug} className="flex items-center gap-3 whitespace-nowrap">
                <Image src={m.image} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                <span className="leading-tight">
                  <span className="block text-heading">{m.name}</span>
                  <span className="text-xs">{m.role}</span>
                </span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {team.slice(0, 2).map((m) => (
            <Reveal key={m.slug}>
              <MemberCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <FocusAreas />
      <Justice />
      <Testimonials />
      <PillarsScroller />
      <Benefit />
      <TeamPreview />
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
