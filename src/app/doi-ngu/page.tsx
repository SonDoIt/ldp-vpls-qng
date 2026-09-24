import type { Metadata } from "next";
import { MemberCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CtaBanner, DarkPageHero, Stats } from "@/components/sections";
import { Accent } from "@/components/ui";
import { team } from "@/content/site";

export const metadata: Metadata = {
  title: "Đội ngũ",
  description: "Đội ngũ chấp hành viên, thư ký nghiệp vụ và chuyên viên pháp lý của Văn phòng.",
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
        Đội ngũ nhiều năm kinh nghiệm thực tiễn cùng tinh thần làm việc tận tâm đến cùng.
      </DarkPageHero>
      <div className="container-site -mt-16 md:-mt-20">
        <div className="mx-auto max-w-[1100px] rounded-t-lg bg-white px-4 pt-8 md:rounded-t-xl md:pt-10">
          <Stats size="md" />
        </div>
      </div>

      <section className="section-y">
        <div className="container-site grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.slug}>
              <MemberCard member={m} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
