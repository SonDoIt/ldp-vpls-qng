"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Gap between items that enter together, and the most any one item waits (ms), as in the reference. */
const STAGGER = 200;
const MAX_DELAY = 1000;

/**
 * Site-wide scroll motion, mirroring the reference's Lenis + GSAP setup:
 * - Lenis smooth scrolling (lerp 0.1) on wheel input; touch keeps native scrolling.
 * - Every `[data-reveal]` element fades and rises 50px: on load if it is already on screen,
 *   otherwise once its top passes 80% of the viewport. Items starting together (a hero, a heading
 *   with its text and button) play one after another, 200ms apart.
 * The hidden start state only applies once the inline script in the layout has put `js-reveal` on
 * <html>, so without JS, or with reduced motion, everything is simply visible.
 */
export function ScrollEffects() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true, anchors: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // The router has already scrolled the new page into place; drop any glide left from the old one.
    // (stop/start resets Lenis to the current native position.)
    lenisRef.current?.stop();
    lenisRef.current?.start();

    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='in'], [data-reveal='done'])"));
    const finish = (e: TransitionEvent) => {
      const el = e.currentTarget as HTMLElement;
      if (e.target !== el) return;
      el.dataset.reveal = "done";
      el.style.removeProperty("--reveal-delay");
      el.removeEventListener("transitionend", finish);
    };

    const play = (els: HTMLElement[]) => {
      els.forEach((el, i) => {
        el.style.setProperty("--reveal-delay", `${Math.min(i * STAGGER, MAX_DELAY)}ms`);
        el.addEventListener("transitionend", finish);
        el.dataset.reveal = "in";
      });
    };
    const onEnter: IntersectionObserverCallback = (entries, observer) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      entering.forEach((el) => observer.unobserve(el));
      play(entering);
    };
    // Whatever is on screen when the page loads plays right away, like the reference's load
    // interaction. The rest waits for "top 80%": its top edge above the bottom fifth of the viewport.
    // Items so close to the end of the page that they can never get that high play as soon as they
    // appear instead.
    const main = new IntersectionObserver(onEnter, { rootMargin: "0px 0px -20% 0px" });
    const tail = new IntersectionObserver(onEnter);
    const lastLine = document.documentElement.scrollHeight - window.innerHeight * 0.2;
    const onScreen: HTMLElement[] = [];
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) onScreen.push(el);
      else (rect.top + window.scrollY > lastLine ? tail : main).observe(el);
    });
    play(onScreen);
    window.__revealReady = true;

    return () => {
      main.disconnect();
      tail.disconnect();
    };
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}
