import { office } from "@/content/site";
import { ScrollTopButton } from "./scroll-top-button";

// Hover lifts 2px, press sinks back and shrinks, keyboard focus takes the global ring. 56px+ targets.
const shapeClass =
  "grid size-14 place-items-center rounded-full shadow-float ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 md:size-16";
const buttonClass = `${shapeClass} text-white transition-transform`;

/** Back-to-top, Zalo and call buttons pinned to the bottom-right corner of every page. */
export function FloatingContact() {
  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col gap-3 md:right-6 md:gap-4">
      <ScrollTopButton className={shapeClass} />
      <a
        href={office.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Nhắn Zalo ${office.phone}`}
        className={`${buttonClass} bg-zalo`}
      >
        <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8 md:size-9">
          <path d="M16 6c6.63 0 12 4.03 12 9s-5.37 9-12 9c-1.3 0-2.55-.15-3.72-.44L7 26l1.6-4.14C5.8 20.2 4 17.77 4 15c0-4.97 5.37-9 12-9Z" className="fill-white" />
          <text x="16" y="17.6" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="Arial, sans-serif" className="fill-zalo">
            Zalo
          </text>
        </svg>
      </a>
      <a href={office.phoneHref} aria-label={`Gọi ${office.phone}`} className={`${buttonClass} bg-call`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-7 md:size-8">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>
    </div>
  );
}
