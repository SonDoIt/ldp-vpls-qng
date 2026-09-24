import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { office } from "@/content/site";

export const metadata: Metadata = { title: "Điều khoản sử dụng", alternates: { canonical: "/dieu-khoan" } };

// MẪU: have the office's legal team review this text before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Điều khoản sử dụng"
      updated="09/2026"
      intro={`Khi truy cập và sử dụng website của ${office.name}, bạn đồng ý với các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử dụng.`}
      sections={[
        {
          title: "Nội dung website",
          paragraphs: [
            "Thông tin trên website mang tính chất giới thiệu và tham khảo, không thay thế cho ý kiến tư vấn pháp lý cụ thể đối với từng hồ sơ.",
          ],
        },
        {
          title: "Yêu cầu dịch vụ",
          paragraphs: [
            "Việc gửi biểu mẫu trên website chưa làm phát sinh quan hệ hợp đồng. Quan hệ dịch vụ chỉ được xác lập khi hai bên ký kết văn bản thỏa thuận theo quy định.",
          ],
        },
        {
          title: "Trách nhiệm của người sử dụng",
          paragraphs: [
            "Bạn cam kết cung cấp thông tin trung thực, chính xác và không sử dụng website vào mục đích trái pháp luật.",
          ],
        },
        {
          title: "Quyền sở hữu trí tuệ",
          paragraphs: [
            "Nội dung, hình ảnh và nhận diện trên website thuộc quyền sở hữu của Văn phòng hoặc được sử dụng hợp pháp. Không sao chép khi chưa được phép.",
          ],
        },
        {
          title: "Thay đổi điều khoản",
          paragraphs: [
            "Văn phòng có thể cập nhật điều khoản này khi cần thiết. Phiên bản mới có hiệu lực kể từ khi được đăng tải trên website.",
          ],
        },
      ]}
    />
  );
}
