import type { Metadata } from "next";
import { ArticleCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CtaBanner, DarkPageHero } from "@/components/sections";
import { Accent } from "@/components/ui";
import { articles } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kiến thức pháp lý",
  description:
    "Giải đáp về vi bằng, Thừa hành viên (Thừa phát lại), tống đạt và thi hành án dân sự từ Văn phòng Thi hành án dân sự Quảng Ngãi.",
  alternates: { canonical: "/kien-thuc" },
};

export default function ArticlesPage() {
  return (
    <>
      <DarkPageHero
        pretitle="Kiến thức pháp lý"
        title={
          <>
            Hiểu đúng để <Accent>chủ động</Accent> bảo vệ quyền lợi
          </>
        }
      >
        Giải đáp ngắn gọn về vi bằng, Thừa hành viên và thi hành án dân sự, giúp bạn chuẩn bị tốt trước khi làm việc
        với Văn phòng.
      </DarkPageHero>
      <section className="section-y">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {articles.map((a) => (
            <Reveal key={a.slug}>
              <ArticleCard item={a} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
      <JsonLd data={breadcrumbSchema([{ name: "Kiến thức pháp lý", path: "/kien-thuc" }])} />
    </>
  );
}
