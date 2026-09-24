"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

declare global {
  interface Window {
    turnstile?: {
      render(
        container: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          language?: string;
          appearance?: "always" | "execute" | "interaction-only";
          size?: "normal" | "flexible" | "compact";
        },
      ): string;
      reset(widgetId: string): void;
      remove(widgetId: string): void;
      getResponse(widgetId: string): string | undefined;
    };
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptLoad: Promise<void> | undefined;

/** Injects Cloudflare's script once per page; later callers share the same load. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptLoad) {
    const { promise, resolve, reject } = Promise.withResolvers<void>();
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Let the next mount retry instead of caching the failure.
      scriptLoad = undefined;
      script.remove();
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.append(script);
    scriptLoad = promise;
  }
  return scriptLoad;
}

export type TurnstileHandle = {
  /** Resolves with the current token, waiting for a running or interactive challenge to finish. */
  token(timeoutMs?: number): Promise<string | undefined>;
  reset(): void;
};

/**
 * Cloudflare Turnstile, rendered explicitly by this component's own effect so every mount gets a
 * widget and every unmount removes it (client navigation, the form's success/reset swap, and
 * React's dev double-mount alike). It stays invisible unless Cloudflare needs the visitor to click,
 * and puts its token in a hidden `cf-turnstile-response` input inside the enclosing form.
 * Tokens are single-use: call `reset()` on the handle after every submission attempt; a fresh
 * token takes a moment, which `token()` waits out.
 */
export function Turnstile({ ref }: { ref: Ref<TurnstileHandle> }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    async token(timeoutMs = 30_000) {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const value = widgetId.current ? window.turnstile?.getResponse(widgetId.current) : undefined;
        if (value) return value;
        const { promise, resolve } = Promise.withResolvers<void>();
        setTimeout(resolve, 200);
        await promise;
      }
      return undefined;
    },
    reset() {
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!turnstileSiteKey) return;
    const sitekey = turnstileSiteKey;
    let active = true;
    loadTurnstile().then(
      () => {
        if (!active || !container.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container.current, {
          sitekey,
          action: "contact",
          language: "vi",
          appearance: "interaction-only",
          size: "flexible",
        });
      },
      (error: unknown) => console.error(error),
    );
    return () => {
      active = false;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  if (!turnstileSiteKey) return null;
  return <div ref={container} />;
}
