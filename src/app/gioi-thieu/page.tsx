import type { Metadata } from "next";
import Image from "next/image";
import { Plus, Social, StarFilled } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CtaBanner, Stats } from "@/components/sections";
import { Accent, ImageFade, PreTitle } from "@/components/ui";
import { about, head, office, officeFacts, story, teamGroups, values } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `${about.intro} Trưởng Văn phòng: Thừa hành viên ${office.head}.`,
  alternates: { canonical: "/gioi-thieu" },
};

function Hero() {
  return (
    <section className="pt-24 md:pt-28">
      <div className="container-site">
        <div className="relative isolate mx-auto flex min-h-[22rem] max-w-[1100px] flex-col justify-end overflow-hidden rounded-t-sm px-4 text-center md:min-h-[32rem]">
          <Image
            src="/images/about-banner.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1140px) 1100px, 100vw"
            className="-z-10 object-cover object-top"
          />
          <ImageFade to="white" />
          <h1 className="relative z-[2] text-4xl md:text-6xl">
            Về <Accent>Văn phòng</Accent>
          </h1>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <PreTitle>Chúng tôi là ai</PreTitle>
            <div className="mt-4 flex flex-col gap-5 text-base md:text-lg">
              <p>{about.intro}</p>
              <p>{about.model}</p>
              <p>
                Với tinh thần tận tâm và trách nhiệm, Văn phòng đồng hành cùng khách hàng trong việc tạo lập, bảo vệ
                chứng cứ, thực hiện các thủ tục pháp lý và hạn chế những rủi ro có thể phát sinh trong các quan hệ
                dân sự, kinh doanh và đời sống.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <blockquote className="rounded-sm bg-sand p-5 md:p-6">
              <p className="font-display text-xl leading-snug text-heading md:text-2xl">
                {office.slogan}.
              </p>
            </blockquote>
            <h2 className="mt-8 font-sans text-lg font-semibold md:text-xl">Thông tin Văn phòng</h2>
            <dl className="mt-2">
              {officeFacts.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-line py-3 last:border-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm">{f.label}</dt>
                  <dd className="text-heading">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Stats className="mt-20 md:mt-28" />
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="px-[var(--gutter)]">
      <div className="mx-auto max-w-[1660px] rounded-sm bg-cream section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_0.9fr_1fr] lg:gap-12">
          <Reveal>
            <PreTitle>Trưởng Văn phòng</PreTitle>
            <h2 className="mt-3 text-4xl md:text-5xl">{head.name}</h2>
            <p className="mt-4 md:text-lg">{head.intro}</p>
            <p className="mt-6 text-sm text-heading">Chức danh</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[head.title, head.role].map((m) => (
                <li key={m} className="rounded-xs border border-line bg-white px-3 py-1.5 text-sm text-heading">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[5/5.2] overflow-hidden rounded-t-sm">
              <Image src={head.image} alt={`${head.title} ${head.name}`} fill sizes="(min-width: 64rem) 25vw, 90vw" className="object-cover" />
              <ImageFade to="cream" className="h-[40%]" />
              <ul className="absolute inset-x-0 bottom-3 z-[2] flex justify-center gap-2">
                {office.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`${s.label}: ${s.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-11 place-items-center rounded-xs bg-white text-heading transition-colors hover:bg-accent active:translate-y-px"
                    >
                      <Social name={s.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <h3 className="text-3xl">Học vấn & kinh nghiệm</h3>
            <ol className="mt-5">
              {[`${head.education.degree} – ${head.education.school}`, ...head.experience].map((q, i) => (
                <li key={q} className="flex items-start gap-3 border-b border-line py-4 md:text-lg">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-sm text-heading">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <PreTitle data-reveal>Gặp gỡ đội ngũ</PreTitle>
          <h2 data-reveal className="mt-3 text-4xl md:text-5xl">
            Đội ngũ <Accent>chuyên môn</Accent>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {teamGroups.map((g) => (
            <Reveal key={g.title} className="rounded-sm bg-cream p-6 md:p-8">
              <span className="grid size-8 place-items-center rounded-xs border border-line bg-white">
                <StarFilled className="size-4 text-accent-ink" />
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold">{g.title}</h3>
              <p className="mt-2 text-base">{g.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section-b">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-sm px-6 pb-4 text-center md:min-h-[32rem]">
          <Image src="/images/van-phong-quang-ngai.webp" alt="" fill sizes="(min-width: 64rem) 45vw, 100vw" className="-z-10 object-cover" />
          <ImageFade to="white" />
          <p className="relative z-[2] mx-auto max-w-md font-display text-2xl text-heading md:text-3xl">
            &ldquo;<Accent>Tận tâm</Accent> trong từng giải pháp.&rdquo;
          </p>
        </Reveal>
        <Reveal>
          <PreTitle>Về chúng tôi</PreTitle>
          <h2 className="mt-3 text-4xl md:text-5xl">
            Giới thiệu, sứ mệnh <Accent>&amp; tầm nhìn</Accent>
          </h2>
          <div className="mt-8 flex flex-col gap-2">
            {story.map((s, i) => (
              <details key={s.title} name="story" open={i === 0} className="group rounded-xs transition-colors hover:bg-cream open:bg-sand">
                <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-4 py-3 text-heading md:text-lg">
                  <span className="flex items-center gap-2">
                    <StarFilled className="size-4 text-accent-ink opacity-0 transition-opacity group-open:opacity-100" />
                    {s.title}
                  </span>
                  <span className="grid size-6 place-items-center rounded-full transition-colors group-open:bg-white">
                    <Plus className="size-3.5 transition-transform group-open:rotate-45" />
                  </span>
                </summary>
                <p className="details-body px-4 pb-4 pl-10 text-base">{s.text}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="overflow-hidden bg-cream section-y">
      <div className="container-site">
        <h2 data-reveal className="text-center text-4xl md:text-5xl">
          Giá trị chúng tôi <Accent>theo đuổi</Accent>
        </h2>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {[values.slice(0, 2), values.slice(2)].map((col, c) => (
            <div key={c} className={`flex flex-col gap-8 lg:gap-14 ${c === 1 ? "lg:order-3 lg:items-end lg:text-right" : ""}`}>
              {col.map((v) => (
                <Reveal key={v.title} className={`max-w-xs ${c === 1 ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                  <span className="grid size-8 place-items-center rounded-xs border border-line bg-white">
                    <StarFilled className="size-4 text-accent-ink" />
                  </span>
                  <h3 className="mt-4 font-sans text-lg font-semibold md:text-xl">{v.title}</h3>
                  <p className="mt-1.5 text-base">{v.text}</p>
                </Reveal>
              ))}
            </div>
          ))}
          <div className="relative mx-auto hidden aspect-[4/5] w-72 overflow-hidden rounded-t-full lg:order-2 lg:block xl:w-80">
            <Image src="/images/about-values.webp" alt="" fill sizes="320px" className="object-cover" />
            <ImageFade to="cream" className="h-[40%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Founder />
      <TeamSection />
      <Story />
      <Values />
      <CtaBanner />
      <JsonLd data={breadcrumbSchema([{ name: "Giới thiệu", path: "/gioi-thieu" }])} />
    </>
  );
}
