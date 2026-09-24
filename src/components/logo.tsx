import Image from "next/image";
import { office } from "@/content/site";
import logoSeal from "../../public/logo.png";

/**
 * The office's round seal. Always sits beside text that names the office, so it is decorative.
 * `size` is the rendered width in CSS pixels; it picks the 1x/2x source, the class sets the box.
 */
export function LogoMark({ size, className = "" }: { size: number; className?: string }) {
  return (
    <Image
      src={logoSeal}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${className}`}
    />
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const nameColor = tone === "light" ? "text-white" : "text-navy-900";
  const sloganColor = tone === "light" ? "text-gold-300" : "text-gold-700";
  return (
    <span className="flex items-center gap-3">
      <LogoMark size={44} className="size-11" />
      <span className="flex flex-col leading-tight">
        <span className={`text-[13px] font-semibold tracking-[0.01em] sm:text-sm ${nameColor}`}>
          Văn phòng Thi hành án dân sự
          <br />
          Quảng Ngãi
        </span>
        <span className={`mt-0.5 text-xs ${sloganColor}`}>{office.slogan}</span>
      </span>
    </span>
  );
}
