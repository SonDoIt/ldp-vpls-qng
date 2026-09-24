import type { Metadata } from "next";
import { MemberCard } from "@/components/cards";
import { StarFilled } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CtaBanner, DarkPageHero, Stats } from "@/components/sections";
import { Accent, ButtonLink, PreTitle } from "@/components/ui";
import { head, teamGroups } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Đội ngũ",
  description: `Thừa hành viên ${head.name}, Trưởng Văn phòng, cùng các chuyên gia thi hành án dân sự, thư ký nghiệp vụ và nhân viên của Văn phòng Thi hành án dân sự Quảng Ngãi.`,
  alternates: { canonical: "/doi-ngu" },
};

export default function TeamPage() {
  return (
    <>
      <DarkPageHero
        pretitle="Gặp gỡ đội ngũ"
        title={
          <>
            Những người đứng sau <Accent>quyền lợi</Accent> của bạn
          </>
        }
        className="pb-28 md:pb-32"
      >
        Thừa hành viên giàu kinh nghiệm cùng đội ngũ đã qua đào tạo nghiệp vụ, làm việc tận tâm và đúng quy định pháp luật.
      </DarkPageHero>
      <div className="container-site -mt-16 md:-mt-20">
        <div className="mx-auto max-w-[1100px] rounded-t-sm bg-white px-4 pt-8 md:pt-10">
          <Stats size="md" />
        </div>
      </div>

      <section className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-sm">
            <MemberCard member={head} priority />
          </Reveal>
          <Reveal>
            <PreTitle>{head.title}</PreTitle>
            <h2 className="mt-3 text-4xl md:text-5xl">{head.name}</h2>
            <p className="mt-1 text-heading md:text-lg">{head.role}</p>
            <p className="mt-5 md:text-lg">{head.intro}</p>
            <ButtonLink href={`/doi-ngu/${head.slug}`} className="mt-8">
              Xem hồ sơ
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-site">
          <h2 data-reveal className="text-center text-4xl md:text-5xl">
            Đội ngũ <Accent>chuyên môn</Accent>
          </h2>
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            {teamGroups.map((g) => (
              <Reveal key={g.title} className="rounded-sm bg-white p-6 md:p-8">
                <span className="grid size-8 place-items-center rounded-xs border border-line bg-cream">
                  <StarFilled className="size-4 text-accent-ink" />
                </span>
                <h3 className="mt-4 font-sans text-xl font-semibold">{g.title}</h3>
                <p className="mt-2 text-base">{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
      <JsonLd data={breadcrumbSchema([{ name: "Đội ngũ", path: "/doi-ngu" }])} />
    </>
  );
}
