/** Decorative strokes drawn with `currentColor`; always aria-hidden. */

/** Pen flourish: one looped stroke drawn out into a long signature sweep. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 140" fill="none" className={className}>
      <path
        d="M16 112C110 112 196 34 160 20c-34-13-58 42-10 66 56 28 180 6 300-18 70-14 128-22 166-18"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn double underline, stretched to the width of the phrase it sits under. */
export function Swash({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" fill="none" className={className}>
      <path
        d="M3 12c58-7 150-11 228-9 28 1 50 3 66 6M46 20c58-5 128-6 186-2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Lighting for navy panels: a warm gold glow in one corner and a cool blue one diagonally
 * opposite. Parent must be `relative isolate overflow-hidden`.
 */
export function Spotlights() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-gold-500/12 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-32 -z-10 size-[38rem] rounded-full bg-navy-600/45 blur-[120px]"
      />
    </>
  );
}
