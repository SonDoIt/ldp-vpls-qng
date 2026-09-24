import type { Metadata } from "next";
import Image from "next/image";
import { MemberCard, ServiceCard } from "@/components/cards";
import { Sparkle } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { PillarsScroller } from "@/components/pillars-scroller";
import { Reveal } from "@/components/reveal";
import { ConsultationSection, FaqSection, ProcessSteps, Stats } from "@/components/sections";
import { Accent, ButtonLink, CredentialBadge, ImageFade, PhotoPanel, PreTitle } from "@/components/ui";
import { about, faqs, focusAreas, head, highlights, office, officeFacts, services, teamGroups } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${office.name} – Thừa hành viên (Thừa phát lại) Quảng Ngãi` },
  description: office.description,
  alternates: { canonical: "/" },
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
            fadeClassName="h-[55%] md:h-[80%]"
            imageClassName="object-top"
            className="rounded-t-lg bg-cream text-center md:min-h-[50rem] md:rounded-t-3xl"
            contentClassName="px-4 pb-8 md:pb-10"
          >
            <div className="flex flex-col items-center">
              <h1 className="max-w-5xl text-[2.625rem] leading-[1.1] md:text-[4.25rem] lg:text-[4.75rem]">
                Thừa hành viên <span className="whitespace-nowrap text-accent-ink">tận tâm</span> tại Quảng Ngãi
              </h1>
              <p data-reveal className="mt-5 max-w-2xl text-base md:text-lg">
                {office.name}: tống đạt, lập vi bằng, xác minh điều kiện thi hành án dân sự và tổ chức thi hành
                án dân sự, khách quan và đúng quy định pháp luật.
              </p>
              <div data-reveal className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <ButtonLink href="/lien-he">Gửi yêu cầu tư vấn</ButtonLink>
                <CredentialBadge />
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
        <h2 className="sr-only">Dịch vụ của Văn phòng</h2>
        <div className="grid gap-5 rounded-t-lg bg-white p-2.5 md:grid-cols-2 md:rounded-t-xl md:p-5">
          {services.map((s) => (
            <Reveal key={s.slug}>
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
              Tình huống <Accent>thường gặp</Accent>
            </h2>
            <ButtonLink href="/lien-he" size="sm">
              Trao đổi vụ việc
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
            Dù là cá nhân hay tổ chức, mỗi yêu cầu đều được thực hiện khách quan, chính xác, kịp thời và đúng
            quy định pháp luật.
          </p>
        </div>
        <Stats className="mt-16 w-full md:mt-24" />
      </div>
    </section>
  );
}

/** Short introduction plus registration facts: the block AI engines quote when asked who the office is. */
function AboutFacts() {
  return (
    <section className="section-b">
      <div className="container-site">
        <div className="rounded-lg bg-sand p-2 md:rounded-xl md:p-2.5">
          <div className="grid gap-10 rounded-md bg-white p-5 md:rounded-lg md:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal className="flex flex-col justify-between gap-8">
              <div>
                <PreTitle>Về Văn phòng</PreTitle>
                <h2 className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
                  Văn phòng Thi hành án dân sự <Accent>Quảng Ngãi</Accent>
                </h2>
                <p className="mt-5 md:text-lg">{about.intro}</p>
                <p className="mt-3 md:text-lg">{about.model}</p>
              </div>
              <ButtonLink href="/gioi-thieu" className="self-start">
                Tìm hiểu về Văn phòng
              </ButtonLink>
            </div>
            <dl data-reveal className="self-center">
              {officeFacts.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-line py-3.5 last:border-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm">{f.label}</dt>
                  <dd className="text-heading">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
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
              Bảo vệ quyền lợi. Vững <Accent>niềm tin</Accent>
            </h2>
            <div data-reveal className="mt-8 flex flex-col items-center gap-4 rounded-md border border-line bg-cream p-4 sm:flex-row sm:gap-5 sm:py-3 sm:pr-3 sm:pl-5 md:mt-10">
              <p className="max-w-64 text-heading sm:text-left md:text-lg">Phục vụ cá nhân, tổ chức trên địa bàn tỉnh Quảng Ngãi</p>
              <ButtonLink href="/lien-he" size="sm">
                Liên hệ Văn phòng
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
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <PreTitle data-reveal>Gặp gỡ đội ngũ</PreTitle>
          <h2 data-reveal className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
            Thừa hành viên
            <br />
            <Accent>giàu kinh nghiệm</Accent>
          </h2>
          <p data-reveal className="mt-5 md:text-lg">{head.intro}</p>
          <ul data-reveal className="mt-8 flex flex-col">
            {teamGroups.map((g) => (
              <li key={g.title} className="border-b border-line py-4 last:border-0">
                <p className="flex items-center gap-2.5 text-heading md:text-lg">
                  <Sparkle className="size-3 shrink-0" />
                  {g.title}
                </p>
                <p className="mt-1 pl-[1.375rem] text-base">{g.text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink data-reveal href="/doi-ngu" className="mt-8">
            Xem đội ngũ
          </ButtonLink>
        </div>
        <Reveal className="mx-auto w-full max-w-sm">
          <MemberCard member={head} />
        </Reveal>
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
      <AboutFacts />
      <PillarsScroller />
      <Benefit />
      <TeamPreview />
      <section className="bg-cream section-y">
        <div className="container-site">
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <PreTitle data-reveal>6 bước rõ ràng</PreTitle>
            <h2 data-reveal className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
              Quy trình <Accent>làm việc</Accent>
            </h2>
          </div>
          <ProcessSteps />
        </div>
      </section>
      <ConsultationSection />
      <FaqSection />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
