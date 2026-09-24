import type { ReactNode } from "react";

/**
 * Numbered kicker above every section title ("01 — Tình huống thường gặp"). It is the one shared
 * piece of section chrome; each title below it has its own treatment.
 */
export function Eyebrow({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-gold-700" : "text-gold-400"
      } ${className}`}
    >
      <span className="tabular-nums">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}
