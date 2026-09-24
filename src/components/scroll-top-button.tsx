"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "./icons";

/**
 * Back-to-top control that sits above the contact buttons. It only appears once the reader
 * is a screen or so down the page, and stays out of the tab order while hidden.
 */
export function ScrollTopButton({ className = "" }: { className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Lên đầu trang"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`${className} border border-line bg-white text-heading transition-[opacity,translate,scale,visibility] duration-200 hover:text-accent-ink ${
        visible ? "visible opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="size-6 md:size-7" />
    </button>
  );
}
