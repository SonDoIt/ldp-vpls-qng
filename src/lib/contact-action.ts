"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { office } from "@/content/site";
import { SEND_FAILED, filesError, textError, type FieldErrors } from "./contact-rules";
import { drainMailQueue, enqueueContactMail } from "./mail-queue";

export type ContactResult = { ok: true } | { ok: false; errors?: FieldErrors; message?: string };

/** Humans need a few seconds to fill three fields; scripts submit instantly. */
const MIN_FILL_MS = 3000;

/**
 * Per-IP limit kept in process memory. Correct for one long-running `next start` process (the VPS
 * setup); several processes or serverless instances would each count separately.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_PER_WINDOW;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) {
    for (const [key, times] of hits) if (now - times[times.length - 1] >= WINDOW_MS) hits.delete(key);
  }
  return limited;
}

/**
 * Behind nginx, `X-Real-IP` is set from the socket, so a visitor cannot forge it. Otherwise the
 * last `X-Forwarded-For` hop is the one added by our own proxy (or by Next.js from the socket);
 * earlier hops are client-supplied.
 */
function clientIp(h: Headers): string {
  return h.get("x-real-ip")?.trim() || h.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

async function passedTurnstile(token: string, ip: string): Promise<boolean> {
  // Cloudflare rejects anything longer; skip the round trip.
  if (!token || token.length > 2048) return false;
  const body = new URLSearchParams({ secret: requireEnv("TURNSTILE_SECRET_KEY"), response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(10_000),
  });
  const data: unknown = await res.json();
  return typeof data === "object" && data !== null && "success" in data && data.success === true;
}

/** Leading bytes of each accepted type, so a renamed executable cannot pass as a PDF. */
const SIGNATURES: Record<string, number[]> = {
  ".pdf": [0x25, 0x50, 0x44, 0x46],
  ".png": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ".jpg": [0xff, 0xd8, 0xff],
  ".jpeg": [0xff, 0xd8, 0xff],
  ".docx": [0x50, 0x4b, 0x03, 0x04],
  ".doc": [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
};

function matchesSignature(name: string, bytes: Uint8Array): boolean {
  const ext = name.toLowerCase().slice(name.lastIndexOf("."));
  const signature = SIGNATURES[ext];
  return !!signature && signature.every((byte, i) => bytes[i] === byte);
}

/**
 * Receives the consultation form, filters bots, and queues the request (with attachments) for the
 * office inbox. The visitor gets an answer as soon as the request is safely on disk; the Gmail send
 * (about 3 s) runs after the response, with retries, in `mail-queue.ts`. Bot traps answer with a
 * fake success so scripts do not learn which check fired.
 */
export async function submitContact(formData: FormData): Promise<ContactResult> {
  const now = Date.now();
  const startedAt = Number(formData.get("startedAt"));
  if (formData.get("website") || !startedAt || now - startedAt < MIN_FILL_MS) return { ok: true };

  const h = await headers();
  const ip = clientIp(h);
  if (rateLimited(ip, now))
    return {
      ok: false,
      message: `Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau ít phút hoặc gọi ${office.phone}.`,
    };

  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const name = text("name");
  const phone = text("phone");
  const message = text("message");
  // An empty file input still submits one nameless, zero-byte entry.
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  const errors: FieldErrors = {
    name: textError("name", name),
    phone: textError("phone", phone),
    message: textError("message", message),
    files: filesError(files),
  };
  if (Object.values(errors).some(Boolean)) return { ok: false, errors };

  try {
    if (!(await passedTurnstile(text("cf-turnstile-response"), ip)))
      return { ok: false, message: "Chưa xác minh được bạn là người gửi. Vui lòng thử gửi lại." };

    const attachments = await Promise.all(
      files.map(async (file) => ({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) })),
    );
    const broken = attachments.find((a) => !matchesSignature(a.filename, a.content));
    if (broken)
      return {
        ok: false,
        errors: { files: `Tệp “${broken.filename}” bị hỏng hoặc không đúng định dạng PDF, Word, JPG, PNG.` },
      };

    await enqueueContactMail({ name, phone, message, receivedAt: new Date(now), pageUrl: h.get("referer"), files: attachments });
    after(drainMailQueue);
    return { ok: true };
  } catch (error) {
    console.error("submitContact failed", error);
    return { ok: false, message: SEND_FAILED };
  }
}
