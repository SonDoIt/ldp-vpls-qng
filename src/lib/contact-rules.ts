import { office } from "@/content/site";

/**
 * Rules shared by the contact form (instant feedback) and the `submitContact` Server Action (the
 * real gate: anyone can POST to it without the browser checks).
 */
export const ACCEPT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
export const MAX_FILES = 5;
/**
 * Total attachment budget. The Server Action body limit in `next.config.ts` (and nginx
 * `client_max_body_size`) must stay above this plus the text fields and multipart overhead.
 */
export const MAX_FILES_BYTES = 4 * 1024 * 1024;
export const MAX_NAME = 100;
export const MAX_MESSAGE = 5000;

/** Shown when delivery fails for reasons the visitor cannot fix in the form. */
export const SEND_FAILED = `Chưa gửi được yêu cầu. Vui lòng tải lại trang và thử lại, hoặc gọi ${office.phone}.`;

export type FieldName = "name" | "phone" | "message" | "files";
export type FieldErrors = Partial<Record<FieldName, string>>;

/** Says, in plain words, what is wrong with one text field, or nothing when it is fine. */
export function textError(name: Exclude<FieldName, "files">, raw: string): string | undefined {
  const value = raw.trim();
  switch (name) {
    case "name":
      if (!value) return "Nhập họ và tên để Văn phòng biết cách xưng hô.";
      return value.length > MAX_NAME ? `Họ và tên tối đa ${MAX_NAME} ký tự.` : undefined;
    case "phone": {
      if (!value) return "Nhập số điện thoại để Văn phòng gọi lại.";
      const digits = value.replace(/[\s.()-]/g, "");
      return /^(0|\+84)\d{9}$/.test(digits) ? undefined : "Số điện thoại gồm 10 chữ số, ví dụ 0984 816 599.";
    }
    case "message":
      if (!value) return "Mô tả ngắn gọn vụ việc để Thừa hành viên chuẩn bị trước.";
      return value.length > MAX_MESSAGE
        ? `Nội dung tối đa ${MAX_MESSAGE.toLocaleString("vi-VN")} ký tự. Chi tiết thêm xin đính kèm tệp.`
        : undefined;
  }
}

/** Checks the attachment list by name and size; the server additionally checks each file's bytes. */
export function filesError(files: readonly { name: string; size: number }[]): string | undefined {
  if (files.length > MAX_FILES) return `Chỉ đính kèm tối đa ${MAX_FILES} tệp.`;
  const wrong = files.find((f) => !ACCEPT.some((ext) => f.name.toLowerCase().endsWith(ext)));
  if (wrong) return `Tệp “${wrong.name}” không được hỗ trợ. Chỉ nhận PDF, Word, JPG hoặc PNG.`;
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_FILES_BYTES)
    return `Tổng dung lượng tệp tối đa ${MAX_FILES_BYTES / 1024 / 1024} MB. Hồ sơ lớn hơn xin gửi qua email ${office.email} hoặc Zalo ${office.phone}.`;
  return undefined;
}
