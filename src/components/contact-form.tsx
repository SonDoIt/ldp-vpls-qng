"use client";

import { useState, type FormEvent, type ReactNode } from "react";

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

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="animate-fade-in rounded-xs bg-cream px-6 py-10 text-center">
      <p className="font-serif text-2xl text-heading">Cảm ơn bạn!</p>
      <p className="mt-2">Yêu cầu đã được ghi nhận. Văn phòng sẽ liên hệ lại với bạn trong giờ làm việc.</p>
      <button type="button" onClick={onReset} className="mt-5 text-heading underline underline-offset-4 hover:text-accent-ink">
        Gửi yêu cầu khác
      </button>
    </div>
  );
}

/**
 * Consultation request form with the brief's fields: name, phone, message and attached files.
 * Submission is client-only for now: it validates, then shows a confirmation. Wire `onSubmit`
 * to a Server Action or API route (with file upload) to actually deliver requests.
 * `compact` is the label-less sidebar variant on service pages.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
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
        <textarea
          name="message"
          required
          rows={3}
          placeholder="Nội dung cần tư vấn"
          aria-label="Nội dung cần tư vấn"
          className={`${fieldClass} resize-y`}
        />
        <button type="submit" className="mt-1 rounded-xs bg-accent px-6 py-3.5 text-heading uppercase transition-colors duration-300 hover:bg-line">
          Gửi yêu cầu tư vấn
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
        <Field label="Số điện thoại" required>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="Số điện thoại liên hệ" className={fieldClass} />
        </Field>
      </div>
      <Field label="Nội dung cần tư vấn" required>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Mô tả ngắn gọn vụ việc hoặc yêu cầu của bạn..."
          className={`${fieldClass} min-h-28 resize-y`}
        />
      </Field>
      <Field label="Đính kèm hồ sơ">
        <input
          name="files"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className={`${fieldClass} file:mr-4 file:rounded-xxs file:border-0 file:bg-sand file:px-3 file:py-1.5 file:text-sm file:text-heading`}
        />
      </Field>
      <button
        type="submit"
        className="mt-1 rounded-xs bg-accent px-6 py-4 text-heading uppercase transition-colors duration-300 hover:bg-line md:rounded-md md:text-lg"
      >
        Gửi yêu cầu tư vấn
      </button>
    </form>
  );
}
