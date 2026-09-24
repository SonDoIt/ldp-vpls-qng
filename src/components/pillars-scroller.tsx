"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { pillars } from "@/content/site";
import { Accent, ImageFade, PreTitle } from "./ui";

function Pillar({ item }: { item: (typeof pillars)[number] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image src={item.icon} alt="" width={34} height={34} className="size-[34px]" />
      <h3 className="mt-3 font-sans text-xl font-medium md:text-[1.375rem]">{item.title}</h3>
      <p className="mt-2 max-w-md text-base md:text-lg">{item.text}</p>
    </div>
  );
}

/**
 * Home "Về Văn phòng" block. From lg the section is three screens tall and its content sticks
 * while scrolling steps through the pillars (mission, vision, commitment), like the reference.
 * Below lg, or with reduced motion, all three pillars are simply stacked.
 */
export function PillarsScroller() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      setActive(Math.floor(progress * pillars.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={outerRef} className="lg:h-[260vh] motion-reduce:lg:h-auto">
      <div className="container-site grid items-center gap-12 section-y lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:py-24 motion-reduce:lg:static">
        <div data-reveal className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-t-lg md:min-h-[32rem] lg:max-w-[482px] lg:rounded-t-xl">
          <Image
            src="/images/about-home.jpg"
            alt=""
            fill
            sizes="(min-width: 64rem) 482px, 100vw"
            className="-z-10 object-cover"
          />
          <ImageFade to="white" className="h-[90%] md:h-[70%]" />
          <div className="relative z-[2] px-4 pb-2 text-center">
            <p className="font-serif text-[1.875rem] leading-tight text-heading md:text-[2.25rem]">
              Xây dựng trên <Accent>niềm tin</Accent> và <Accent>sự rõ ràng</Accent>
            </p>
            <p className="mt-2 text-base md:text-lg">Luôn hướng đến mục tiêu của bạn ở từng bước</p>
          </div>
        </div>

        <div data-reveal className="relative flex flex-col items-center text-center">
          <PreTitle>Về Văn phòng</PreTitle>
          <h2 className="mt-3 text-[2.5rem] leading-[1.15] md:text-[3.375rem]">
            Nơi chiến lược gặp gỡ <Accent>sự tận tâm</Accent> bền bỉ.
          </h2>

          {/* Stacked list: phones, tablets and reduced motion. */}
          <div className="mt-12 flex flex-col gap-10 lg:hidden motion-reduce:lg:flex">
            {pillars.map((p) => (
              <Pillar key={p.title} item={p} />
            ))}
          </div>

          {/* Scroll-stepped pillar: desktop only. */}
          <div className="mt-16 hidden min-h-48 w-full place-items-start lg:grid motion-reduce:lg:hidden" aria-live="polite">
            <div key={active} className="col-start-1 row-start-1 w-full animate-fade-in">
              <Pillar item={pillars[active]} />
            </div>
          </div>
          <div aria-hidden="true" className="absolute top-1/2 right-0 hidden flex-col items-end gap-2 lg:flex motion-reduce:lg:hidden">
            {pillars.map((p, i) => (
              <span
                key={p.title}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-6 bg-accent" : "w-4 bg-accent/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
