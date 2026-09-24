"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/content/site";
import { ChevronDown } from "./icons";

const fieldClass =
  "w-full rounded-xs border border-line bg-cream px-4 py-3 text-base text-heading placeholder:text-body/80 transition-colors duration-200 outline-none focus:border-accent focus-visible:outline-none";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2.5 text-heading md:text-lg">
      <span>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}

function ServiceSelect({ label }: { label?: string }) {
  return (
    <span className="relative block">
      <select name="service" required defaultValue="" aria-label={label} className={`${fieldClass} appearance-none pr-10`}>
        <option value="" disabled>
          Chọn dịch vụ
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
        <option value="khac">Khác</option>
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-heading" />
    </span>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="animate-fade-in rounded-xs bg-cream px-6 py-10 text-center">
      <p className="font-serif text-2xl text-heading">Cảm ơn bạn!</p>
      <p className="mt-2">Yêu cầu đã được ghi nhận. Chúng tôi sẽ liên hệ lại trong vòng 1 ngày làm việc.</p>
      <button type="button" onClick={onReset} className="mt-5 text-heading underline underline-offset-4 hover:text-accent">
        Gửi yêu cầu khác
      </button>
    </div>
  );
}

/**
 * Consultation request form. Submission is client-only for now: it validates, then shows a
 * confirmation. Wire `onSubmit` to a Server Action or API route to actually deliver requests.
 * `compact` is the label-less sidebar variant on service pages.
 */
export function ContactForm({ compact = false, submitLabel }: { compact?: boolean; submitLabel?: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return <Success onReset={() => setSent(false)} />;

  if (compact) {
    return (
      <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
        <input name="name" required autoComplete="name" placeholder="Họ và tên" aria-label="Họ và tên" className={fieldClass} />
        <input name="phone" type="tel" required autoComplete="tel" placeholder="Số điện thoại" aria-label="Số điện thoại" className={fieldClass} />
        <ServiceSelect label="Dịch vụ cần hỗ trợ" />
        <input name="date" type="date" aria-label="Ngày hẹn mong muốn" className={fieldClass} />
        <button type="submit" className="mt-1 rounded-xs bg-accent px-6 py-3.5 text-heading transition-colors duration-300 hover:bg-line">
          {submitLabel ?? "Đặt lịch hẹn"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" required>
          <input name="name" required autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required autoComplete="email" placeholder="email@tenmien.vn" className={fieldClass} />
        </Field>
      </div>
      <Field label="Số điện thoại">
        <input name="phone" type="tel" autoComplete="tel" placeholder="Số điện thoại liên hệ" className={fieldClass} />
      </Field>
      <Field label="Dịch vụ cần hỗ trợ" required>
        <ServiceSelect />
      </Field>
      <Field label="Nội dung">
        <textarea name="message" rows={4} placeholder="Mô tả ngắn gọn vụ việc của bạn..." className={`${fieldClass} min-h-28 resize-y`} />
      </Field>
      <button
        type="submit"
        className="mt-1 rounded-xs bg-accent px-6 py-4 text-heading transition-colors duration-300 hover:bg-line md:rounded-md md:text-lg"
      >
        {submitLabel ?? "Gửi yêu cầu"}
      </button>
    </form>
  );
}
