import type { Metadata } from "next";
import { CaseCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CtaBanner, DarkPageHero } from "@/components/sections";
import { Accent } from "@/components/ui";
import { cases } from "@/content/site";

export const metadata: Metadata = {
  title: "Vụ việc tiêu biểu",
  description: "Một số hồ sơ thi hành án tiêu biểu Văn phòng đã thực hiện.",
};

export default function CasesPage() {
  return (
    <>
      <DarkPageHero
        pretitle="Vụ việc tiêu biểu"
        title={
          <>
            Kết quả <Accent>thực tế</Accent> cho từng hồ sơ
          </>
        }
      >
        Mỗi vụ việc là một hành trình khác nhau. Dưới đây là một số hồ sơ tiêu biểu chúng tôi đã đồng hành.
      </DarkPageHero>
      <section className="section-y">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {cases.map((c) => (
            <Reveal key={c.slug}>
              <CaseCard item={c} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
