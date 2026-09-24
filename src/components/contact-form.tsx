"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Burst } from "./icons";
import { buttonClass } from "./ui";

type FieldName = "name" | "phone" | "message" | "files";
type Errors = Partial<Record<FieldName, string>>;

const ACCEPT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

/**
 * Field states: hover darkens the border, keyboard focus takes the global ring, aria-invalid turns
 * the border and message danger-red, disabled fades. The error is tied to the field with
 * aria-describedby, so it is read on focus, and never relies on colour alone (it is a sentence).
 */
const fieldClass =
  "w-full min-h-12 rounded-xs border border-line bg-cream px-4 py-3 text-base text-heading placeholder:text-body/80 transition-colors hover:border-body/40 focus-visible:border-accent-ink aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-50";

/** Reads one field back from the form and says, in plain words, what is wrong with it. */
function validate(name: FieldName, form: HTMLFormElement): string | undefined {
  const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
  if (!el) return undefined;
  const value = el.value.trim();
  switch (name) {
    case "name":
      return value ? undefined : "Nhập họ và tên để Văn phòng biết cách xưng hô.";
    case "phone": {
      if (!value) return "Nhập số điện thoại để Văn phòng gọi lại.";
      const digits = value.replace(/[\s.()-]/g, "");
      return /^(0|\+84)\d{9}$/.test(digits) ? undefined : "Số điện thoại gồm 10 chữ số, ví dụ 0984 816 599.";
    }
    case "message":
      return value ? undefined : "Mô tả ngắn gọn vụ việc để Thừa hành viên chuẩn bị trước.";
    case "files": {
      const files = Array.from((el as HTMLInputElement).files ?? []);
      const wrong = files.find((f) => !ACCEPT.some((ext) => f.name.toLowerCase().endsWith(ext)));
      return wrong ? `Tệp “${wrong.name}” không được hỗ trợ. Chỉ nhận PDF, Word, JPG hoặc PNG.` : undefined;
    }
  }
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-heading md:text-lg">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm">
          {hint}
        </p>
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="text-sm text-danger">
      {error}
    </p>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="animate-fade-in rounded-xs bg-cream px-6 py-10 text-center">
      <p className="font-display text-2xl text-heading">Đã gửi yêu cầu</p>
      <p className="mt-2">Văn phòng sẽ liên hệ lại với bạn trong giờ làm việc.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 min-h-11 rounded-xs px-2 text-heading underline underline-offset-4 transition-colors hover:text-accent-ink active:translate-y-px"
      >
        Gửi yêu cầu khác
      </button>
    </div>
  );
}

/**
 * Consultation request form with the brief's fields: name, phone, message and attached files.
 * Validation is ours rather than the browser's bubbles: on submit every field is checked, the first
 * invalid one takes focus, and each message clears as soon as that field is fixed.
 * Submission is client-only for now: wire `onSubmit` to a Server Action or API route (with file
 * upload) to actually deliver requests. `compact` is the label-less sidebar variant on service pages.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const ids: Record<FieldName, string> = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    message: `${uid}-message`,
    files: `${uid}-files`,
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields: FieldName[] = compact ? ["name", "phone", "message"] : ["name", "phone", "message", "files"];
    const next: Errors = {};
    for (const f of fields) {
      const msg = validate(f, form);
      if (msg) next[f] = msg;
    }
    setErrors(next);
    const first = fields.find((f) => next[f]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setSent(true);
  };

  // Once a field has an error, re-check it as the visitor edits so the message goes away on its own.
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as FieldName;
    if (!errors[name]) return;
    // Read the form now: React clears currentTarget once the handler returns, before the updater runs.
    const message = validate(name, e.currentTarget);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const a11y = (name: FieldName, hint?: boolean) => ({
    id: ids[name],
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${ids[name]}-error` : hint ? `${ids[name]}-hint` : undefined,
  });

  if (sent)
    return (
      <Success
        onReset={() => {
          setErrors({});
          setSent(false);
        }}
      />
    );

  const submit = (
    <button type="submit" className={`${buttonClass()} mt-1 w-full`}>
      <Burst className="size-3.5 shrink-0" />
      Gửi yêu cầu tư vấn
    </button>
  );

  if (compact) {
    return (
      <form noValidate onSubmit={onSubmit} onChange={onChange} className="flex flex-col gap-2.5">
        <input {...a11y("name")} required autoComplete="name" placeholder="Họ và tên" aria-label="Họ và tên" className={fieldClass} />
        <FieldError id={ids.name} error={errors.name} />
        <input
          {...a11y("phone")}
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="Số điện thoại"
          aria-label="Số điện thoại"
          className={fieldClass}
        />
        <FieldError id={ids.phone} error={errors.phone} />
        <textarea
          {...a11y("message")}
          required
          rows={3}
          placeholder="Nội dung cần tư vấn"
          aria-label="Nội dung cần tư vấn"
          className={`${fieldClass} resize-y`}
        />
        <FieldError id={ids.message} error={errors.message} />
        {submit}
      </form>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} className="flex flex-col gap-5">
      {/* Sighted hint only: screen readers already announce each field as required. */}
      <p aria-hidden="true" className="text-sm">
        Mục có dấu * là bắt buộc.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.name} label="Họ và tên" required error={errors.name}>
          <input {...a11y("name")} required autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
        </Field>
        <Field id={ids.phone} label="Số điện thoại" required error={errors.phone}>
          <input
            {...a11y("phone")}
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="0984 816 599"
            className={fieldClass}
          />
        </Field>
      </div>
      <Field id={ids.message} label="Nội dung cần tư vấn" required error={errors.message}>
        <textarea
          {...a11y("message")}
          required
          rows={4}
          placeholder="Mô tả ngắn gọn vụ việc hoặc yêu cầu của bạn"
          className={`${fieldClass} min-h-28 resize-y`}
        />
      </Field>
      <Field id={ids.files} label="Đính kèm hồ sơ" hint="Không bắt buộc. PDF, Word, JPG hoặc PNG." error={errors.files}>
        <input
          {...a11y("files", true)}
          type="file"
          multiple
          accept={ACCEPT.join(",")}
          className={`${fieldClass} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-xs file:border-0 file:bg-sand file:px-3 file:py-1.5 file:text-sm file:text-heading hover:file:bg-line`}
        />
      </Field>
      {submit}
    </form>
  );
}
