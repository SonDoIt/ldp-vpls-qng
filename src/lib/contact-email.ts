import "server-only";

import { office, services } from "@/content/site";

/**
 * The office's copy of a consultation request, laid out as an intake slip for staff reading on a
 * phone: who asked, one tap to call or Zalo them back, what they need, which files came with it.
 * Email clients ignore stylesheets and web fonts, so everything is inline styles on tables.
 */

/** Content-ID of the inline seal; the Server Action attaches `public/email-logo.png` under it. */
export const LOGO_CID = "office-seal";

export type ContactEmailInput = {
  name: string;
  phone: string;
  message: string;
  files: { filename: string; size: number }[];
  receivedAt: Date;
  /** Referer of the form submission, if the browser sent one. */
  pageUrl: string | null;
};

const c = {
  navy: "#0a1428",
  navySoft: "#1a3056",
  body: "#454e5e",
  muted: "#6b7280",
  line: "#e4e0d6",
  sand: "#efece4",
  cream: "#f7f5f0",
  gold: "#b8924a",
  goldInk: "#86662b",
  call: "#15803d",
  zalo: "#0068ff",
};
// Single quotes only: this string is interpolated inside double-quoted style attributes.
const font = "Manrope, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

/** 0905 123 456 / +84 905 123 456 → the 10-digit local form Zalo links expect. */
function localDigits(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+84") ? `0${digits.slice(3)}` : digits;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} MB`;
}

function formatReceived(date: Date): string {
  const tz = { timeZone: "Asia/Ho_Chi_Minh" } as const;
  const time = date.toLocaleTimeString("vi-VN", { ...tz, hour: "2-digit", minute: "2-digit" });
  const day = date.toLocaleDateString("vi-VN", { ...tz, weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  return `${time}, ${day}`;
}

/** Names the page the form was sent from the way staff know it, falling back to its path. */
function pageLabel(pageUrl: string | null): string | null {
  if (!pageUrl) return null;
  let path: string;
  try {
    path = new URL(pageUrl).pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
  if (path === "/") return "Trang chủ";
  if (path === "/lien-he") return "Trang Liên hệ";
  if (path === "/dich-vu") return "Trang Dịch vụ";
  const service = path.startsWith("/dich-vu/") && services.find((s) => path === `/dich-vu/${s.slug}`);
  return service ? `Trang dịch vụ ${service.title}` : path;
}

function button(href: string, label: string, color: string): string {
  return `<td style="border-radius:6px;background:${color}">
    <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font:600 15px/20px ${font};color:#ffffff;text-decoration:none;border-radius:6px">${label}</a>
  </td>`;
}

function sectionTitle(text: string): string {
  return `<p style="margin:0 0 10px;font:600 13px/18px ${font};color:${c.goldInk}">${text}</p>`;
}

export function contactEmail(input: ContactEmailInput): { subject: string; html: string; text: string } {
  const { name, phone, message, files, receivedAt, pageUrl } = input;
  // Collapse whitespace so a crafted name cannot break the subject line.
  const subject = `Yêu cầu tư vấn: ${name.replace(/\s+/g, " ")} – ${phone}`;
  const received = formatReceived(receivedAt);
  const page = pageLabel(pageUrl);
  const zalo = localDigits(phone);
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const excerpt = message.replace(/\s+/g, " ").slice(0, 110);

  const fileRows = files.length
    ? files
        .map(
          (f, i) => `<tr>
            <td style="padding:10px 0;${i ? `border-top:1px solid ${c.line};` : ""}font:500 15px/22px ${font};color:${c.navy};word-break:break-word">${escapeHtml(f.filename)}</td>
            <td style="padding:10px 0 10px 16px;${i ? `border-top:1px solid ${c.line};` : ""}font:14px/22px ${font};color:${c.muted};text-align:right;white-space:nowrap">${formatSize(f.size)}</td>
          </tr>`,
        )
        .join("")
    : `<tr><td style="font:15px/22px ${font};color:${c.muted}">Khách không gửi kèm tệp.</td></tr>`;

  const detailRow = (label: string, value: string) => `<tr>
    <td width="1%" style="padding:4px 20px 4px 0;font:14px/21px ${font};color:${c.muted};white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:4px 0;font:14px/21px ${font};color:${c.navy}">${value}</td>
  </tr>`;

  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${c.sand}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(`${phone} – ${excerpt}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.sand}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${c.line};border-radius:10px;overflow:hidden">

  <tr><td style="background:${c.navy};padding:20px 28px;border-bottom:3px solid ${c.gold}">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:14px;vertical-align:middle">
        <img src="cid:${LOGO_CID}" width="52" height="52" alt="" style="display:block;border-radius:50%;background:#ffffff">
      </td>
      <td style="vertical-align:middle">
        <p style="margin:0;font:600 17px/23px ${font};color:#ffffff">Yêu cầu tư vấn mới</p>
        <p style="margin:2px 0 0;font:14px/20px ${font};color:#c9cfdb">${escapeHtml(office.shortName)}</p>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:28px 28px 8px">
    <p style="margin:0;font:600 22px/30px ${font};color:${c.navy}">${escapeHtml(name)}</p>
    <p style="margin:4px 0 0"><a href="${escapeHtml(tel)}" style="font:600 30px/40px ${font};color:${c.navySoft};text-decoration:none;letter-spacing:0.01em">${escapeHtml(phone)}</a></p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px"><tr>
      ${button(tel, "Gọi lại", c.call)}
      <td style="width:10px"></td>
      ${button(`https://zalo.me/${zalo}`, "Nhắn Zalo", c.zalo)}
    </tr></table>
  </td></tr>

  <tr><td style="padding:24px 28px 0">
    ${sectionTitle("Nội dung cần tư vấn")}
    <div style="background:${c.cream};border-left:3px solid ${c.gold};border-radius:0 6px 6px 0;padding:16px 18px;font:16px/26px ${font};color:${c.body};white-space:pre-wrap;word-break:break-word">${escapeHtml(message)}</div>
  </td></tr>

  <tr><td style="padding:24px 28px 0">
    ${sectionTitle(files.length ? `Hồ sơ đính kèm (${files.length})` : "Hồ sơ đính kèm")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fileRows}</table>
  </td></tr>

  <tr><td style="padding:24px 28px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${c.line};padding-top:16px">
      ${detailRow("Nhận lúc", escapeHtml(received))}
      ${page && pageUrl ? detailRow("Gửi từ", `<a href="${escapeHtml(pageUrl)}" style="color:${c.goldInk}">${escapeHtml(page)}</a>`) : ""}
    </table>
  </td></tr>

</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
  <tr><td style="padding:16px 8px 0;font:13px/20px ${font};color:${c.muted}">
    Thư gửi tự động từ biểu mẫu trên website. Khách không để lại email, nên trả lời thư này sẽ không tới khách; hãy liên hệ qua số điện thoại ở trên.<br>
    Thư có thông tin cá nhân và hồ sơ của khách hàng, chỉ chuyển cho người trực tiếp xử lý.
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Yêu cầu tư vấn mới – ${office.shortName}`,
    "",
    `Khách hàng: ${name}`,
    `Điện thoại: ${phone}  (Zalo: https://zalo.me/${zalo})`,
    "",
    "Nội dung cần tư vấn:",
    message,
    "",
    files.length
      ? `Hồ sơ đính kèm (${files.length}):\n${files.map((f) => `- ${f.filename} (${formatSize(f.size)})`).join("\n")}`
      : "Khách không gửi kèm tệp.",
    "",
    `Nhận lúc: ${received}`,
    ...(page ? [`Gửi từ: ${page} (${pageUrl})`] : []),
    "",
    "Thư gửi tự động từ biểu mẫu trên website. Trả lời thư này sẽ không tới khách; hãy gọi điện hoặc nhắn Zalo.",
  ].join("\n");

  return { subject, html, text };
}
