import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { office } from "@/content/site";

export const metadata: Metadata = { title: "Chính sách bảo mật", alternates: { canonical: "/chinh-sach-bao-mat" } };

// MẪU: have the office's legal team review this text before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Chính sách bảo mật"
      updated="09/2026"
      intro={`${office.name} tôn trọng và cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn sử dụng website và dịch vụ của Văn phòng.`}
      sections={[
        {
          title: "Thông tin chúng tôi thu thập",
          paragraphs: [
            "Khi bạn gửi yêu cầu tư vấn hoặc liên hệ, chúng tôi thu thập họ tên, số điện thoại, nội dung cần tư vấn và hồ sơ bạn chủ động đính kèm.",
            "Website có thể ghi nhận thông tin kỹ thuật cơ bản như loại trình duyệt, thời gian truy cập nhằm cải thiện chất lượng dịch vụ.",
          ],
        },
        {
          title: "Mục đích sử dụng",
          paragraphs: [
            "Thông tin được dùng để liên hệ, tư vấn, tiếp nhận và giải quyết yêu cầu của bạn; không sử dụng cho mục đích khác khi chưa có sự đồng ý của bạn.",
          ],
        },
        {
          title: "Bảo mật và lưu trữ",
          paragraphs: [
            "Thông tin hồ sơ được lưu trữ và bảo mật theo quy định của pháp luật về thi hành án dân sự và bảo vệ dữ liệu cá nhân.",
            "Chỉ những cán bộ có thẩm quyền, trực tiếp xử lý hồ sơ mới được tiếp cận thông tin của bạn.",
          ],
        },
        {
          title: "Chia sẻ thông tin",
          paragraphs: [
            "Chúng tôi không bán hay trao đổi thông tin cá nhân. Thông tin chỉ được cung cấp cho cơ quan nhà nước có thẩm quyền khi pháp luật yêu cầu.",
            "Yêu cầu gửi qua biểu mẫu được chuyển tới hộp thư điện tử của Văn phòng (dịch vụ Gmail của Google). Để chặn thư rác, biểu mẫu dùng dịch vụ Cloudflare Turnstile, dịch vụ này ghi nhận thông tin kỹ thuật của trình duyệt như địa chỉ IP.",
          ],
        },
        {
          title: "Quyền của bạn",
          paragraphs: [
            `Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ qua email ${office.email} hoặc số điện thoại ${office.phone}.`,
          ],
        },
      ]}
    />
  );
}
