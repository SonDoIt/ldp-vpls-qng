import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MemberCard, ServiceCard } from "@/components/cards";
import { ChevronRight, Phone, Sparkle } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { PillarsScroller } from "@/components/pillars-scroller";
import { Reveal } from "@/components/reveal";
import { ConsultationSection, FaqSection, ProcessSteps, Stats } from "@/components/sections";
import { Accent, ButtonLink, ImageFade, PhotoPanel, PreTitle } from "@/components/ui";
import { about, faqs, focusAreas, head, office, officeFacts, services, teamGroups } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/seo";
import logoSeal from "../../public/logo.png";

export const metadata: Metadata = {
  title: { absolute: `${office.name} – Thừa hành viên (Thừa phát lại) Quảng Ngãi` },
  description: office.description,
  alternates: { canonical: "/" },
};

/**
 * Navy and gold from the office's banner, without the banner: the seal, one headline and the four
 * functions as a row of links along the bottom edge. Fills the first screen.
 */
function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-heading">
      {/* Soft gold light behind the seal, the only ornament. */}
      <div
        aria-hidden="true"
        className="absolute top-[-25%] left-1/2 -z-10 size-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(184_146_74/0.2),transparent)]"
      />
      <div className="container-site flex flex-1 flex-col items-center justify-center pt-32 pb-14 text-center md:pt-36 md:pb-16">
        <Image
          src={logoSeal}
          alt=""
          width={160}
          height={160}
          priority
          className="size-28 animate-fade-in rounded-full ring-1 ring-accent/40 md:size-36 lg:size-40"
        />
        <h1 className="mt-8 max-w-4xl animate-fade-in text-[2.625rem] leading-[1.06] text-white [animation-delay:60ms] md:mt-10 md:text-[4.5rem] lg:text-[5.25rem]">
          Thừa hành viên <span className="whitespace-nowrap text-accent-ink">tận tâm</span> tại Quảng Ngãi
        </h1>
        <p className="mt-6 animate-fade-in text-base text-balance text-white/70 [animation-delay:120ms] md:text-lg">
          {office.slogan} · {office.credential.top}
        </p>
        <div className="mt-10 flex animate-fade-in flex-col items-center gap-5 [animation-delay:180ms] sm:flex-row sm:gap-8">
          <ButtonLink href="/lien-he">Gửi yêu cầu tư vấn</ButtonLink>
          <a
            href={office.phoneHref}
            className="flex items-center gap-2.5 text-lg font-semibold text-white transition-colors duration-200 hover:text-accent"
          >
            <Phone className="size-5" />
            {office.phone}
          </a>
        </div>
      </div>

      <nav aria-label="Chức năng" className="animate-fade-in border-t border-white/10 [animation-delay:260ms]">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s.slug}
              className="border-white/10 max-lg:odd:border-r max-lg:[&:nth-child(-n+2)]:border-b lg:not-last:border-r"
            >
              <Link
                href={`/dich-vu/${s.slug}`}
                className="group flex items-center justify-between gap-3 px-4 py-5 text-white/75 transition-colors duration-200 hover:text-white md:px-6 md:py-7"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-sm text-accent-ink tabular-nums">0{i + 1}</span>
                  <span className="text-[0.9375rem] font-semibold md:text-lg">{s.label}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="pt-5 md:pt-8">
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
            className="pointer-events-none absolute top-[12%] left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-sand),transparent_85%)] bg-clip-text font-display text-[6rem] leading-none whitespace-nowrap text-transparent select-none sm:text-[10rem] md:text-[14rem] lg:text-[17rem]"
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
              <p className="max-w-64 text-heading sm:text-left md:text-lg">Phục vụ cá nhân, tổ chức trên địa bàn toàn quốc</p>
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
