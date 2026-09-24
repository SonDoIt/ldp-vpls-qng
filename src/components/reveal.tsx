import type { ReactNode } from "react";

/**
 * Marks a block to fade and rise in as it scrolls into view (see scroll-effects.tsx). Blocks that
 * enter together are staggered automatically, in document order. Plain elements can opt in with a
 * bare `data-reveal` attribute; `as` keeps lists valid (`<Reveal as="li">`).
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
