import type { CSSProperties, ReactNode } from "react";

/**
 * Endless horizontal ticker. The track holds two copies of `children` and slides by exactly one
 * copy, so the loop is seamless; the copy is inert and hidden from assistive tech. Reduced-motion users
 * get a static row (the global rule stops the animation after one frame).
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  gap = "1.25rem",
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  gap?: string;
  className?: string;
}) {
  const style = { "--marquee-duration": `${duration}s` } as CSSProperties;
  const copy = { display: "flex", gap, paddingRight: gap } as CSSProperties;
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        style={style}
        className={`flex w-max shrink-0 hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <div style={copy}>{children}</div>
        <div style={copy} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
