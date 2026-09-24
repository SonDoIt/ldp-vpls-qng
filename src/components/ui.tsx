import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { office } from "@/content/site";
import { Burst, Sparkle } from "./icons";

/** Orange emphasis inside a serif heading ("Chuyên nghiệp <Accent>tận tâm</Accent>"). */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent-ink">{children}</span>;
}

/** Small kicker above a heading, prefixed with the outlined sparkle. */
export function PreTitle({
  children,
  className = "",
  tone = "heading",
  ...props
}: ComponentProps<"p"> & {
  tone?: "heading" | "accent";
}) {
  return (
    <p
      {...props}
      className={`flex items-center gap-1.5 text-sm leading-tight ${
        tone === "accent" ? "text-accent-ink" : "text-heading"
      } ${className}`}
    >
      <Sparkle className="size-3 shrink-0" />
      {children}
    </p>
  );
}

type ButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  size?: "md" | "sm";
  variant?: "accent" | "cream";
  className?: string;
};

/** Orange rounded button with the burst glyph, the reference's only call-to-action style. */
export function ButtonLink({ children, size = "md", variant = "accent", className = "", ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xs text-heading transition-colors duration-300 md:rounded-md ${
        size === "md" ? "px-[1.125rem] py-3 md:px-6 md:py-4" : "px-5 py-3"
      } ${
        variant === "accent" ? "bg-accent hover:bg-line" : "bg-cream hover:bg-accent"
      } ${className}`}
    >
      <Burst className="size-3 shrink-0" />
      <span className="leading-tight">{children}</span>
    </Link>
  );
}

/** "14 năm hành nghề / Thừa hành viên" with a laurel, used in the hero and the footer. */
export function CredentialBadge({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={tone === "dark" ? "/images/icons/laurel.svg" : "/images/icons/laurel-light.svg"}
        alt=""
        width={37}
        height={30}
        className="h-[30px] w-auto"
      />
      <div className={`leading-tight ${tone === "dark" ? "text-heading" : "text-white"}`}>
        <p className={`text-sm ${tone === "dark" ? "text-body" : "text-white/80"}`}>{office.credential.top}</p>
        <p className={tone === "light" ? "font-semibold" : ""}>{office.credential.title}</p>
      </div>
    </div>
  );
}

/**
 * Photo that dissolves into the background with text on the fade. From md the photo fills the
 * panel and the content sits over its faded bottom (give `className` an md min-height). On phones
 * the photo is a fixed-ratio block and the content tucks just under it, so text never lands on
 * the unfaded part of the image.
 */
export function PhotoPanel({
  src,
  sizes,
  priority = false,
  fadeTo = "white",
  aspect = "aspect-[4/3.4]",
  fadeClassName = "h-[60%] md:h-[70%]",
  imageClassName = "",
  className = "",
  contentClassName = "",
  children,
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  fadeTo?: "white" | "cream" | "sand";
  /** Photo ratio on phones. */
  aspect?: string;
  fadeClassName?: string;
  imageClassName?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative flex flex-col overflow-hidden md:justify-end ${className}`}>
      <div className={`relative ${aspect} md:absolute md:inset-0 md:aspect-auto`}>
        <Image
          src={src}
          alt=""
          fill
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes} className={`object-cover ${imageClassName}`} />
        <ImageFade to={fadeTo} className={fadeClassName} />
      </div>
      <div className={`relative z-[2] -mt-14 md:mt-0 ${contentClassName}`}>{children}</div>
    </div>
  );
}

/** Bottom fade that dissolves a photo into the card colour below it. */
export function ImageFade({ to = "white", className = "h-[70%]" }: { to?: "white" | "cream" | "sand"; className?: string }) {
  const color = { white: "#fff", cream: "var(--color-cream)", sand: "var(--color-sand)" }[to];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] ${className}`}
      style={{ backgroundImage: `linear-gradient(180deg, transparent 28%, ${color} 70%)` }}
    />
  );
}
