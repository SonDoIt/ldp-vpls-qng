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
 * A thin strip flush with the top edge of every page, fixed but only 60px tall so it covers as
 * little of the text as possible. White at the very top; once the page moves it turns frosted cream
 * with a hairline underneath. Desktop: links with a "Trang" dropdown, phone and CTA on the right.
 * Below lg the links collapse into a panel under the strip.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Escape closes whichever panel is open; a click outside closes the dropdown; scrolling past the
  // top edge frosts the strip.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setPagesOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setPagesOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => {
    setMenuOpen(false);
    setPagesOpen(false);
  };
  const pagesActive = pagesNav.some((item) => isActive(pathname, item.href));
  const linkClass = (active: boolean) =>
    `text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300 hover:text-accent-ink ${active ? "text-accent-ink" : "text-body"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-200 ${
        scrolled || menuOpen ? "border-line bg-cream/85" : "border-transparent bg-white"
      }`}
    >
      <div className="container-site flex h-[3.75rem] items-center justify-between gap-4">
        <Logo className="[&_img]:size-8 [&>span]:text-[0.875rem]" />

        <nav aria-label="Chính" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {mainNav.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(isActive(pathname, item.href))}>
              {item.label}
            </Link>
          ))}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={pagesOpen}
              aria-controls="pages-menu"
              onClick={() => setPagesOpen((v) => !v)}
              className={`flex items-center gap-1 ${linkClass(pagesActive)}`}
            >
              Trang
              <ChevronDown className={`size-4 transition-transform duration-300 ${pagesOpen ? "rotate-180" : ""}`} />
            </button>
            {pagesOpen && (
              <div
                id="pages-menu"
                className="absolute top-full left-1/2 mt-5 w-60 -translate-x-1/2 animate-fade-in rounded-md border border-line bg-white p-2 shadow-[0_20px_40px_-20px_rgb(10_20_40/0.25)]"
              >
                {pagesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`block rounded-xs px-3 py-2.5 transition-colors duration-200 hover:bg-cream ${
                      isActive(pathname, item.href) ? "text-accent-ink" : "text-body hover:text-heading"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {mainNav.slice(2).map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(isActive(pathname, item.href))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={office.phoneHref}
            className="hidden items-center gap-2 text-[0.9375rem] font-semibold whitespace-nowrap text-heading md:flex"
          >
            <Phone className="size-4 text-accent-ink" />
            {office.phone}
          </a>
          <Link
            href="/lien-he"
            className="hidden rounded-xs bg-accent px-4 py-2 text-[0.9375rem] font-semibold whitespace-nowrap text-heading transition-colors duration-300 hover:bg-line sm:block"
          >
            Liên hệ tư vấn
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-xs bg-heading text-white lg:hidden"
          >
            {menuOpen ? <Close className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container-site pb-3 lg:hidden">
          <nav
            id="mobile-menu"
            aria-label="Menu di động"
            className="max-h-[calc(100dvh-5rem)] animate-fade-in overflow-y-auto rounded-md border border-line bg-white p-4"
          >
            <ul className="flex flex-col">
              {[...mainNav.slice(0, 2), ...pagesNav, ...mainNav.slice(2)].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`block py-2.5 text-lg ${isActive(pathname, item.href) ? "text-accent-ink" : "text-body"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/lien-he" onClick={close} className="mt-3 w-full sm:hidden">
              Liên hệ tư vấn
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
