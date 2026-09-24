import type { Metadata } from "next";
import Image from "next/image";
import { MemberCard } from "@/components/cards";
import { Plus, Social, Sparkle, StarFilled } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { CtaBanner, Stats } from "@/components/sections";
import { Accent, ImageFade, PreTitle } from "@/components/ui";
import { awards, checklist, founder, office, story, team, values } from "@/content/site";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `Về ${office.name}: sứ mệnh, đội ngũ và những giá trị chúng tôi theo đuổi.`,
};

function Hero() {
  return (
    <section className="pt-24 md:pt-28">
      <div className="container-site">
        <div className="relative isolate mx-auto flex min-h-[22rem] max-w-[1100px] flex-col justify-end overflow-hidden rounded-t-lg px-4 text-center md:min-h-[32rem] md:rounded-t-xl">
          <Image
            src="/images/about-hero.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1140px) 1100px, 100vw"
            className="-z-10 object-cover object-top"
          />
          <ImageFade to="white" />
          <h1 data-reveal className="relative z-[2] text-[2.75rem] leading-[1.1] md:text-[4.5rem]">
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
              <p>
                {office.name} được thành lập từ một niềm tin giản dị: người dân và doanh nghiệp đều xứng đáng được
                hỗ trợ thi hành án tận tâm, nhanh chóng và minh bạch. Chúng tôi xây dựng Văn phòng trên nền tảng
                đúng pháp luật, sự rõ ràng và trách nhiệm với từng hồ sơ.
              </p>
              <p>
                Hôm nay, Văn phòng đồng hành cùng khách hàng ở nhiều lĩnh vực: từ những vụ việc gia đình cần sự tinh
                tế đến các hồ sơ tín dụng, thương mại có giá trị lớn. Mỗi hồ sơ đều nhận được cùng một mức độ chuẩn
                bị và tận tâm.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <blockquote className="rounded-md bg-sand p-5 md:p-6">
              <p className="border-l-2 border-accent pl-4 font-serif text-xl leading-snug text-heading md:text-2xl">
                Văn phòng tốt nhất không phải là nơi lớn nhất, mà là nơi tận tâm nhất với người đang cần được giúp đỡ.
              </p>
            </blockquote>
            <ul className="mt-6 flex flex-col gap-2.5">
              {checklist.map((c) => (
                <li key={c} className="flex items-center gap-2.5 md:text-lg">
                  <Sparkle className="size-3 shrink-0 text-heading" />
                  {c}
                </li>
              ))}
            </ul>
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
      <div className="mx-auto max-w-[1660px] rounded-lg bg-cream section-y md:rounded-xl">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_0.9fr_1fr] lg:gap-12">
          <Reveal>
            <PreTitle>Người sáng lập</PreTitle>
            <h2 className="mt-3 text-[2.5rem] leading-tight md:text-[3.375rem]">{founder.name}</h2>
            <p className="mt-4 md:text-lg">{founder.bio}</p>
            <p className="mt-6 text-sm text-heading">Chức danh & hội nghề nghiệp</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {founder.memberships.map((m) => (
                <li key={m} className="rounded-xs border border-line bg-white px-3 py-1.5 text-sm text-heading">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[5/5.2] overflow-hidden rounded-t-md">
              <Image src={founder.image} alt={founder.name} fill sizes="(min-width: 64rem) 25vw, 90vw" className="object-cover" />
              <ImageFade to="cream" className="h-[40%]" />
              <ul className="absolute inset-x-0 bottom-3 z-[2] flex justify-center gap-2">
                {office.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-8 place-items-center rounded-xxs bg-white text-heading transition-colors hover:bg-accent"
                    >
                      <Social name={s.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <h3 className="text-[1.875rem]">Trình độ chuyên môn</h3>
            <ol className="mt-5">
              {founder.qualifications.map((q, i) => (
                <li key={q} className="flex items-start gap-3 border-b border-line py-4 md:text-lg">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs text-heading">
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
          <h2 data-reveal className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
            Đội ngũ chấp hành viên
            <br />
            <Accent>giàu kinh nghiệm</Accent>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {team.slice(0, 4).map((m) => (
            <Reveal key={m.slug}>
              <MemberCard member={m} />
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
        <Reveal className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-lg px-6 pb-4 text-center md:min-h-[32rem] md:rounded-t-xl">
          <Image src="/images/about-story.webp" alt="" fill sizes="(min-width: 64rem) 45vw, 100vw" className="-z-10 object-cover" />
          <ImageFade to="white" />
          <p className="relative z-[2] mx-auto max-w-md font-serif text-2xl leading-snug text-heading md:text-[1.875rem]">
            &ldquo;Nơi <Accent>tận tâm nhất</Accent> mới là nơi đáng tin cậy nhất.&rdquo;
          </p>
        </Reveal>
        <Reveal>
          <PreTitle>Điều làm nên khác biệt</PreTitle>
          <h2 className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
            Câu chuyện <Accent>phía sau</Accent> Văn phòng
          </h2>
          <div className="mt-8 flex flex-col gap-2">
            {story.map((s, i) => (
              <details key={s.title} name="story" open={i === 0} className="group rounded-xs transition-colors open:bg-sand">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-heading md:text-lg">
                  <span className="flex items-center gap-2">
                    <StarFilled className="size-4 text-accent opacity-0 transition-opacity group-open:opacity-100" />
                    {s.title}
                  </span>
                  <span className="grid size-6 place-items-center rounded-full transition-colors group-open:bg-white">
                    <Plus className="size-3.5 transition-transform duration-300 group-open:rotate-45" />
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
        <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
          Giá trị chúng tôi <Accent>theo đuổi</Accent>
        </h2>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {[values.slice(0, 2), values.slice(2)].map((col, c) => (
            <div key={c} className={`flex flex-col gap-8 lg:gap-14 ${c === 1 ? "lg:order-3 lg:items-end lg:text-right" : ""}`}>
              {col.map((v) => (
                <Reveal key={v.title} className={`max-w-xs ${c === 1 ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                  <span className="grid size-8 place-items-center rounded-xxs border border-line bg-white">
                    <StarFilled className="size-4 text-accent" />
                  </span>
                  <h3 className="mt-4 font-sans text-lg font-medium md:text-xl">{v.title}</h3>
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
        <Marquee duration={40} gap="2rem" className="mask-fade-x mt-16 md:mt-24">
          {awards.map((a) => (
            <div
              key={a.title}
              className="grid size-44 shrink-0 place-items-center rounded-full border-[8px] border-sand bg-white p-5 text-center md:size-52"
            >
              <div className="flex flex-col items-center gap-2">
                <StarFilled className="size-5 text-accent" />
                <p className="text-heading md:text-lg">{a.title}</p>
                <p className="text-xs md:text-sm">{a.note}</p>
              </div>
            </div>
          ))}
        </Marquee>
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
    </>
  );
}
