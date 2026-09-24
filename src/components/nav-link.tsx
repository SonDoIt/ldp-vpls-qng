"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Link that turns the accent colour on its own page (footer menus). */
export function NavLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`transition-colors hover:text-accent-ink ${active ? "text-accent-ink" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
