"use client";

import Image from "next/image";
import { type Ref, useCallback, useEffect, useRef, useState } from "react";
import { pillars } from "@/content/site";
import { Accent, ImageFade, PreTitle } from "./ui";

const EASE_OUT = "ease-[cubic-bezier(0.23,1,0.32,1)]";

function Pillar({ item }: { item: (typeof pillars)[number] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image src={item.icon} alt="" width={34} height={34} className="size-[34px]" />
      <h3 className="mt-3 font-sans text-xl font-semibold md:text-2xl">{item.title}</h3>
      <p className="mt-2 max-w-md text-base md:text-lg">{item.text}</p>
    </div>
  );
}

/**
 * The pillars as a table of contents between the photo and the copy. The gold rail fills with
 * scroll progress (written straight to `railRef`, so scrolling does not re-render), the current
 * pillar lights up, and each entry jumps to its step. With reduced motion nothing steps, so every
 * entry stays lit and inert.
 */
function PillarIndex({
  active,
  stepped,
  goTo,
  railRef,
}: {
  active: number;
  stepped: boolean;
  goTo: (i: number) => void;
  railRef: Ref<HTMLSpanElement>;
}) {
  return (
    <nav aria-label="Trụ cột của Văn phòng" className="relative mx-auto max-w-[17rem] pl-8">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-line" />
      <span
        ref={railRef}
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 w-px origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
      <p className="text-sm">Ba trụ cột</p>
      <ol className="mt-6 flex flex-col gap-9">
        {pillars.map((p, i) => {
          const on = !stepped || i === active;
          return (
            <li key={p.title} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-4 -left-8 size-[9px] -translate-x-1/2 rounded-full border-2 border-white bg-accent transition-transform ${EASE_OUT} ${
                  on ? "scale-100" : "scale-0"
                }`}
              />
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={!stepped}
                aria-current={stepped && i === active ? "step" : undefined}
                className={`block w-full text-left transition-opacity ease-out ${
                  on ? "opacity-100" : "opacity-35 hover:opacity-60"
                }`}
              >
                <span className="block text-5xl leading-none font-semibold tracking-tight text-accent-ink tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1.5 block text-lg font-semibold text-heading">{p.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Home "Về Văn phòng" block. From lg the section is three screens tall and its content sticks
 * while scrolling steps through the pillars (mission, vision, commitment), like the reference.
 * From xl, where the photo no longer fills its half, a clickable pillar index sits between photo
 * and copy. Below lg, or with reduced motion, all three pillars are simply stacked.
 */
export function PillarsScroller() {
  const outerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [stepped, setStepped] = useState(true);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const reduced = reduce.matches;
      setStepped(!reduced);
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(0.999, Math.max(0, -rect.top / travel)) : 0;
      if (railRef.current) railRef.current.style.transform = `scaleY(${reduced ? 1 : progress})`;
      if (travel <= 0) return;
      setActive(Math.floor(progress * pillars.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  /** Scroll to the middle of pillar i's slice of the sticky travel. */
  const goTo = useCallback((i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / pillars.length, behavior: "smooth" });
  }, []);

  return (
    <div ref={outerRef} className="lg:h-[260vh] motion-reduce:lg:h-auto">
      <div className="container-site grid items-center gap-12 section-y lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:py-24 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.65fr)_minmax(0,1.3fr)] xl:gap-12 motion-reduce:lg:static">
        <div data-reveal className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-t-sm md:min-h-[32rem] lg:max-w-[482px]">
          <Image
            src="/images/about-home.jpg"
            alt=""
            fill
            sizes="(min-width: 64rem) 482px, 100vw"
            className="-z-10 object-cover"
          />
          <ImageFade to="white" className="h-[90%] md:h-[70%]" />
          <div className="relative z-[2] px-4 pb-2 text-center">
            <p className="font-display text-3xl text-heading md:text-4xl">
              Xây dựng trên <Accent>niềm tin</Accent> và <Accent>sự rõ ràng</Accent>
            </p>
            <p className="mt-2 text-base md:text-lg">Luôn hướng đến mục tiêu của bạn ở từng bước</p>
          </div>
        </div>

        <div data-reveal className="hidden xl:block">
          <PillarIndex active={active} stepped={stepped} goTo={goTo} railRef={railRef} />
        </div>

        <div data-reveal className="relative flex flex-col items-center text-center">
          <PreTitle>Về Văn phòng</PreTitle>
          <h2 className="mt-3 text-4xl md:text-5xl">
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
          {/* Step dashes for lg only; from xl the pillar index takes over. */}
          <div aria-hidden="true" className="absolute top-1/2 right-0 hidden flex-col items-end gap-2 lg:flex xl:hidden motion-reduce:lg:hidden">
            {pillars.map((p, i) => (
              <span
                key={p.title}
                className={`h-0.5 rounded-full transition-all ${
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
