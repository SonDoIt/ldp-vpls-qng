"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews } from "@/content/site";
import { Stars } from "./icons";

/**
 * Swipeable review cards on native scroll-snap (two per view from md, one on phones). The dots
 * mirror the scroll position and jump to a snap point; there is one dot per reachable position.
 */
export function ReviewCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(reviews.length);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? track.clientWidth;
    const gap = () => parseFloat(getComputedStyle(track).columnGap) || 0;

    const measure = () => {
      const perView = Math.max(1, Math.round((track.clientWidth + gap()) / (step() + gap())));
      setPositions(Math.max(1, reviews.length - perView + 1));
    };
    const onScroll = () => setActive(Math.round(track.scrollLeft / (step() + gap())));

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="min-w-0">
      <ul
        ref={trackRef}
        aria-label="Đánh giá của khách hàng"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <li
            key={r.name}
            className="flex w-full shrink-0 snap-start flex-col justify-between gap-10 rounded-md border border-line bg-sand p-5 md:w-[calc(50%-0.625rem)] md:p-[1.875rem]"
          >
            <div>
              <Stars />
              <blockquote className="mt-6 text-base leading-[1.3] md:text-lg">{r.text}</blockquote>
            </div>
            <div className="flex items-center gap-3">
              <Image src={r.avatar} alt="" width={50} height={50} className="size-[50px] rounded-full object-cover" />
              <div>
                <p className="text-lg text-heading">{r.name}</p>
                <p className="text-sm">{r.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {positions > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Xem đánh giá ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className="grid size-6 place-items-center"
            >
              <span
                className={`size-2.5 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-heading" : "bg-heading/30 hover:bg-heading/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
