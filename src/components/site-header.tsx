"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, office, pagesNav } from "@/content/site";
import { ChevronDown, Close, Menu, Phone } from "./icons";
import { Logo } from "./logo";
import { ButtonLink } from "./ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed navigation with a full-size brand and contact action on desktop.
 * Below xl the links collapse into a panel so the larger elements do not crowd each other.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pagesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // A click outside closes the dropdown; scrolling past the top edge frosts the strip.
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setPagesOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape closes whichever panel is open and hands focus back to the button that opened it.
  useEffect(() => {
    if (!menuOpen && !pagesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      (pagesOpen ? pagesButtonRef : menuButtonRef).current?.focus();
      setPagesOpen(false);
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, pagesOpen]);

  const close = () => {
    setMenuOpen(false);
    setPagesOpen(false);
  };
  const pagesActive = pagesNav.some((item) => isActive(pathname, item.href));
  // The current page is marked twice, by colour and by an underline, so it does not rely on colour alone.
  const linkClass = (active: boolean) =>
    `inline-flex min-h-11 items-center text-base font-semibold whitespace-nowrap decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent-ink active:translate-y-px ${
      active ? "text-accent-ink underline" : "text-body"
    }`;
  // Panel rows: hover fills, the current page gets the accent rule on its left edge (border.strong).
  const rowClass = (active: boolean) =>
    `flex min-h-11 items-center rounded-xs border-l-2 px-3 transition-colors hover:bg-cream active:bg-sand ${
      active ? "border-accent text-heading" : "border-transparent text-body hover:text-heading"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] ${
        scrolled || menuOpen ? "border-line bg-cream/85" : "border-transparent bg-white"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 md:h-20 xl:h-[5.5rem]">
        <Logo className="gap-3 [&_img]:size-11 md:[&_img]:size-12 xl:[&_img]:size-14 [&>span]:text-base xl:[&>span]:text-lg" />

        <nav aria-label="Chính" className="hidden items-center gap-6 xl:flex 2xl:gap-9">
          {mainNav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={linkClass(isActive(pathname, item.href))}
            >
              {item.label}
            </Link>
          ))}
          <div
            ref={dropdownRef}
            className="relative"
            // Tabbing out of the open panel closes it, so it never hangs over the page unattended.
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPagesOpen(false);
            }}
          >
            <button
              ref={pagesButtonRef}
              type="button"
              aria-expanded={pagesOpen}
              aria-controls="pages-menu"
              onClick={() => setPagesOpen((v) => !v)}
              className={`gap-1 ${linkClass(pagesActive)}`}
            >
              Văn phòng
              <ChevronDown className={`size-4 transition-transform ${pagesOpen ? "rotate-180" : ""}`} />
            </button>
            {pagesOpen && (
              <div
                id="pages-menu"
                className="absolute top-full left-1/2 mt-3 flex w-60 -translate-x-1/2 animate-pop-in flex-col gap-0.5 rounded-sm border border-line bg-white p-2 shadow-overlay"
              >
                {pagesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={rowClass(isActive(pathname, item.href))}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {mainNav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={linkClass(isActive(pathname, item.href))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={office.phoneHref}
            aria-label={`Gọi ${office.phone}`}
            className="hidden min-h-11 items-center gap-2 text-base font-semibold whitespace-nowrap text-heading transition-colors hover:text-accent-ink md:flex"
          >
            <Phone className="size-[1.125rem] text-accent-ink" />
            {office.phone}
          </a>
          <ButtonLink href="/lien-he" size="sm" className="max-sm:hidden">
            Liên hệ tư vấn
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-xs bg-heading text-white transition-colors hover:bg-heading-soft active:translate-y-px xl:hidden"
          >
            {menuOpen ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container-site pb-3 xl:hidden">
          <nav
            id="mobile-menu"
            aria-label="Menu di động"
            className="max-h-[calc(100dvh-4.5rem)] animate-pop-in overflow-y-auto rounded-sm border border-line bg-white p-2 md:max-h-[calc(100dvh-5rem)]"
          >
            <ul className="flex flex-col gap-0.5">
              {[...mainNav.slice(0, 2), ...pagesNav, ...mainNav.slice(2)].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`${rowClass(isActive(pathname, item.href))} text-lg`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/lien-he" onClick={close} className="mt-2 w-full sm:hidden">
              Liên hệ tư vấn
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
