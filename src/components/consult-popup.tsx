"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { Close } from "./icons";
import { PreTitle } from "./ui";

/** Reads a numeric env value; blank, missing or malformed falls back to the default. */
function envNumber(raw: string | undefined, fallback: number): number {
  const value = Number(raw?.trim() || NaN);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

const DAY_MS = 24 * 60 * 60 * 1000;
// Set in .env (NEXT_PUBLIC_ values are inlined at build time, so rebuild after changing them).
/** Seconds on the site, across client navigations, before the dialog offers itself. 0 turns it off. */
const DELAY_MS = envNumber(process.env.NEXT_PUBLIC_CONSULT_POPUP_DELAY_SECONDS, 40) * 1000;
/** After a close the offer rests this many days; after a sign-up it stays away much longer. */
const SNOOZE_MS = envNumber(process.env.NEXT_PUBLIC_CONSULT_POPUP_SNOOZE_DAYS, 3) * DAY_MS;
const DONE_MS = envNumber(process.env.NEXT_PUBLIC_CONSULT_POPUP_DONE_DAYS, 90) * DAY_MS;
const STORAGE_KEY = "consult-popup-until";
/** Pages that already carry the full form, where the dialog would only repeat it. */
const SKIP_PATHS = ["/lien-he"];

function readUntil(): number {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeUntil(ms: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + ms));
  } catch {
    // Private mode or blocked storage: the dialog may simply offer itself again next visit.
  }
}

/**
 * Timed call-back sign-up. It opens once per visit, DELAY_MS after the first page load, unless the
 * visitor closed it within SNOOZE_MS, signed up within DONE_MS, or is on a page with the full form.
 * A native modal <dialog> gives the focus trap, Escape and the inert page for free; clicking the
 * backdrop also closes it. The form mounts only while open, so Turnstile loads on demand.
 */
export function ConsultPopup() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const loadedAt = useRef(0);
  const shown = useRef(false);
  const sent = useRef(false);

  useEffect(() => {
    if (!loadedAt.current) loadedAt.current = Date.now();
    if (!DELAY_MS || shown.current || SKIP_PATHS.includes(pathname) || readUntil() > Date.now()) return;
    const timer = setTimeout(
      () => {
        shown.current = true;
        setOpen(true);
      },
      Math.max(0, DELAY_MS - (Date.now() - loadedAt.current)),
    );
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const el = dialog.current;
    if (!el || !open) return;
    el.showModal();
    // The page behind stays put while the dialog is up.
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  // Every way out (close button, Escape, backdrop) ends in the dialog's close event.
  const onClose = () => {
    writeUntil(sent.current ? DONE_MS : SNOOZE_MS);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="consult-popup-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md animate-pop-in overflow-visible rounded-sm bg-transparent p-0 backdrop:bg-heading/55 backdrop:backdrop-blur-sm"
    >
      {/* Opening focus lands on the panel, not the close button or a field (no surprise phone keyboard). */}
      <div
        autoFocus
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm bg-white p-6 shadow-overlay outline-none md:p-8"
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Đóng"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-body transition-colors hover:bg-cream hover:text-heading active:bg-sand"
        >
          <Close className="size-5" />
        </button>

        <PreTitle tone="accent" className="justify-center pr-8 pl-8">
          Đăng ký nhận tư vấn
        </PreTitle>
        <h2 id="consult-popup-title" className="mt-3 text-center text-2xl text-balance md:text-3xl">
          Để lại số điện thoại, Văn phòng gọi lại cho bạn
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-center text-base text-pretty">
          Thừa hành viên sẽ liên hệ trong giờ làm việc để tư vấn về tống đạt, lập vi bằng, xác minh và tổ chức thi
          hành án.
        </p>

        <div className="mt-6">
          <ContactForm
            variant="quick"
            onSent={() => {
              sent.current = true;
            }}
          />
        </div>

        <p className="mt-4 text-center text-sm">
          Bấm “Đăng ký tư vấn” là bạn đồng ý với{" "}
          <Link
            href="/chinh-sach-bao-mat"
            onClick={() => dialog.current?.close()}
            className="text-heading underline underline-offset-4 transition-colors hover:text-accent-ink"
          >
            Chính sách bảo mật
          </Link>{" "}
          của Văn phòng.
        </p>
      </div>
    </dialog>
  );
}
