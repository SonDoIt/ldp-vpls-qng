"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, pagesNav } from "@/content/site";
import { ChevronDown, Close, Menu } from "./icons";
import { Logo } from "./logo";
import { ButtonLink } from "./ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Floating white bar fixed over every page. Desktop: centred links with a "Trang" dropdown.
 * Below lg the links collapse into a panel under the bar, as in the reference's mobile nav.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Escape closes whichever panel is open; a click outside closes the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setPagesOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setPagesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const close = () => {
    setMenuOpen(false);
    setPagesOpen(false);
  };
  const pagesActive = pagesNav.some((item) => isActive(pathname, item.href));
  const linkClass = (active: boolean) =>
    `transition-colors duration-300 hover:text-accent ${active ? "text-accent" : "text-body"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[0.9375rem] lg:pt-5">
      <div className="container-site">
        <div className="relative flex items-center justify-between gap-4 rounded-md border border-line bg-white py-2 pr-2 pl-4 md:py-2.5 md:pl-5">
          <Logo />

          <nav aria-label="Chính" className="hidden items-center gap-10 lg:flex">
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
                        isActive(pathname, item.href) ? "text-accent" : "text-body hover:text-heading"
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
            {/* Wrapped: ButtonLink's own inline-flex would beat a `hidden` passed in className. */}
            <span className="hidden sm:contents">
              <ButtonLink href="/lien-he" size="sm">
                Liên hệ tư vấn
              </ButtonLink>
            </span>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-xs bg-heading text-white lg:hidden"
            >
              {menuOpen ? <Close className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Menu di động"
            className="mt-2 max-h-[calc(100dvh-6rem)] animate-fade-in overflow-y-auto rounded-md border border-line bg-white p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {[...mainNav.slice(0, 2), ...pagesNav, ...mainNav.slice(2)].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`block py-2.5 text-lg ${isActive(pathname, item.href) ? "text-accent" : "text-body"}`}
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
        )}
      </div>
    </header>
  );
}
