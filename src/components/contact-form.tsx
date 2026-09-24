"use client";

import { useEffect, useId, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { submitContact, type ContactResult } from "@/lib/contact-action";
import {
  ACCEPT,
  MAX_FILES,
  MAX_FILES_BYTES,
  MAX_MESSAGE,
  MAX_NAME,
  SEND_FAILED,
  filesError,
  textError,
  type FieldErrors as Errors,
  type FieldName,
} from "@/lib/contact-rules";
import { office } from "@/content/site";
import { Burst } from "./icons";
import { Turnstile, turnstileSiteKey, type TurnstileHandle } from "./turnstile";
import { buttonClass } from "./ui";

/**
 * Field states: hover darkens the border, keyboard focus takes the global ring, aria-invalid turns
 * the border and message danger-red, disabled fades. The error is tied to the field with
 * aria-describedby, so it is read on focus, and never relies on colour alone (it is a sentence).
 */
const fieldClass =
  "w-full min-h-12 rounded-xs border border-line bg-cream px-4 py-3 text-base text-heading placeholder:text-body/80 transition-colors hover:border-body/40 focus-visible:border-accent-ink aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-50";

/** The message the quick variant sends in place of a typed one, so the office knows to call back. */
const QUICK_MESSAGE = "Khách đăng ký nhận tư vấn qua cửa sổ đăng ký nhanh. Vui lòng gọi lại để tư vấn.";

/** Reads one field back from the form and says, in plain words, what is wrong with it. */
function validate(name: FieldName, form: HTMLFormElement): string | undefined {
  const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
  if (!el) return undefined;
  if (name === "files") return filesError(Array.from((el as HTMLInputElement).files ?? []));
  return textError(name, el.value);
}

/**
 * Bot trap: off-screen and hidden from assistive tech, so only scripts that fill every input
 * touch it. The Server Action silently drops submissions where it has a value.
 */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-danger">
      {message}
    </p>
  );
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
 * invalid one takes focus, and each message clears as soon as that field is fixed. Valid requests go
 * to the `submitContact` Server Action, which re-checks everything and mails the office; its field
 * errors land in the same slots. Spam filtering: honeypot, fill time, Turnstile, per-IP limit.
 * `compact` is the label-less sidebar variant on service pages; `quick` asks only for name and phone
 * (the timed sign-up dialog) and sends a fixed call-back note as the message. `onSent` fires after a
 * successful send.
 */
export function ContactForm({
  variant = "full",
  onSent,
}: {
  variant?: "full" | "compact" | "quick";
  onSent?: () => void;
}) {
  const compact = variant !== "full";
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const turnstile = useRef<TurnstileHandle>(null);
  const startedAt = useRef(0);

  // Measured from when the (re)opened form appears, for the server's "too fast to be human" check.
  useEffect(() => {
    if (!sent) startedAt.current = Date.now();
  }, [sent]);

  const ids: Record<FieldName, string> = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    message: `${uid}-message`,
    files: `${uid}-files`,
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const fields: FieldName[] =
      variant === "quick" ? ["name", "phone"] : compact ? ["name", "phone", "message"] : ["name", "phone", "message", "files"];
    const focusFirst = (found: Errors) => {
      const first = fields.find((f) => found[f]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return !!first;
    };
    const next: Errors = {};
    for (const f of fields) {
      const msg = validate(f, form);
      if (msg) next[f] = msg;
    }
    setErrors(next);
    setFormError(undefined);
    if (focusFirst(next)) return;

    const data = new FormData(form);
    data.set("startedAt", String(startedAt.current));

    startTransition(async () => {
      if (turnstileSiteKey) {
        // A fresh challenge takes a second or two, longer if Cloudflare asks for a click.
        const token = await turnstile.current?.token();
        if (!token) {
          setFormError(`Chưa xác minh được chống thư rác. Vui lòng tải lại trang hoặc gọi ${office.phone}.`);
          return;
        }
        data.set("cf-turnstile-response", token);
      }
      let result: ContactResult;
      try {
        result = await submitContact(data);
      } catch {
        // Network loss, an oversized body, or a stale action ID after a deploy.
        result = { ok: false, message: SEND_FAILED };
      }
      // Turnstile tokens are single-use, so every attempt needs a fresh one.
      turnstile.current?.reset();
      if (result.ok) {
        setSent(true);
        onSent?.();
        return;
      }
      setErrors(result.errors ?? {});
      setFormError(result.message);
      focusFirst(result.errors ?? {});
    });
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
          setFormError(undefined);
          setSent(false);
        }}
      />
    );

  // Shared tail of both variants: bot traps, the Turnstile slot, server-level errors and the button.
  const submit = (
    <>
      <Honeypot />
      <Turnstile ref={turnstile} />
      <FormError message={formError} />
      <button type="submit" disabled={pending} className={`${buttonClass()} mt-1 w-full disabled:cursor-wait disabled:opacity-70`}>
        <Burst className="size-3.5 shrink-0" />
        {pending ? "Đang gửi…" : variant === "quick" ? "Đăng ký tư vấn" : "Gửi yêu cầu tư vấn"}
      </button>
    </>
  );

  if (compact) {
    return (
      <form noValidate onSubmit={onSubmit} onChange={onChange} className="relative flex flex-col gap-2.5">
        <input
          {...a11y("name")}
          required
          maxLength={MAX_NAME}
          autoComplete="name"
          placeholder="Họ và tên"
          aria-label="Họ và tên"
          className={fieldClass}
        />
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
        {variant === "quick" ? (
          <input type="hidden" name="message" value={QUICK_MESSAGE} />
        ) : (
          <>
            <textarea
              {...a11y("message")}
              required
              maxLength={MAX_MESSAGE}
              rows={3}
              placeholder="Nội dung cần tư vấn"
              aria-label="Nội dung cần tư vấn"
              className={`${fieldClass} resize-y`}
            />
            <FieldError id={ids.message} error={errors.message} />
          </>
        )}
        {submit}
      </form>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} className="relative flex flex-col gap-5">
      {/* Sighted hint only: screen readers already announce each field as required. */}
      <p aria-hidden="true" className="text-sm">
        Mục có dấu * là bắt buộc.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.name} label="Họ và tên" required error={errors.name}>
          <input {...a11y("name")} required maxLength={MAX_NAME} autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
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
          maxLength={MAX_MESSAGE}
          rows={4}
          placeholder="Mô tả ngắn gọn vụ việc hoặc yêu cầu của bạn"
          className={`${fieldClass} min-h-28 resize-y`}
        />
      </Field>
      <Field
        id={ids.files}
        label="Đính kèm hồ sơ"
        hint={`Không bắt buộc. Tối đa ${MAX_FILES} tệp, tổng ${MAX_FILES_BYTES / 1024 / 1024} MB: PDF, Word, JPG hoặc PNG.`}
        error={errors.files}
      >
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
