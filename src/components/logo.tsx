import Image from "next/image";
import Link from "next/link";
import logoSeal from "../../public/logo.png";

/**
 * Seal plus the office name in the display serif, in the slot where the reference shows its
 * burst + wordmark. `tone="light"` is for the brown footer.
 */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image src={logoSeal} alt="" width={40} height={40} className="size-9 shrink-0 rounded-full md:size-10" />
      <span
        className={`font-serif text-[15px] leading-[1.15] md:text-base ${
          tone === "dark" ? "text-heading" : "text-white"
        }`}
      >
        Văn phòng Thi hành án dân sự
        <span className="block text-accent-ink">Quảng Ngãi</span>
      </span>
    </Link>
  );
}
