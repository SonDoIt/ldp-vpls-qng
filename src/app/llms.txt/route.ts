import { articles, faqs, head, office, services, steps } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** /llms.txt: a Markdown digest of the site for LLMs (llmstxt.org), built from the same content. */
export function GET() {
  const lines = [
    `# ${office.name}`,
    "",
    `> ${office.description}`,
    "",
    `- Tên đầy đủ: ${office.fullName}`,
    `- Mã số doanh nghiệp: ${office.taxId}`,
    `- Trưởng Văn phòng: Thừa hành viên ${head.name} (${head.experience.join("; ")})`,
    `- Hoạt động từ: ${office.foundingLabel}`,
    `- Địa chỉ: ${office.address}`,
    `- Điện thoại / Zalo: ${office.phone}`,
    `- Email: ${office.email}`,
    `- Giờ làm việc: ${office.hours}`,
    ...office.socials.filter((s) => s.icon !== "zalo").map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## Dịch vụ",
    "",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/dich-vu/${s.slug}`)}): ${s.definition}`),
    "",
    "## Quy trình làm việc",
    "",
    ...steps.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`),
    "",
    "## Kiến thức pháp lý",
    "",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/kien-thuc/${a.slug}`)}): ${a.answer}`),
    "",
    "## Câu hỏi thường gặp",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Trang khác",
    "",
    `- [Giới thiệu](${absoluteUrl("/gioi-thieu")})`,
    `- [Đội ngũ](${absoluteUrl("/doi-ngu")})`,
    `- [Liên hệ](${absoluteUrl("/lien-he")})`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
