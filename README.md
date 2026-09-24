This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Layout

The fixed site header is 72px on phones, 80px on tablets, and 88px on wide screens. Navigation switches to the menu below 1280px so the larger brand and contact action remain readable. In-page scroll offsets are set in `src/app/globals.css`.

The homepage service preview is an image-led gallery: all four services link to their detail pages, with the vi bằng image featured on wide screens. Its content and images come from `src/content/site.ts`; the gallery layout lives in `src/app/page.tsx`.

The homepage "Về Văn phòng" block (`src/components/pillars-scroller.tsx`) sticks while scrolling steps through the pillars from `src/content/site.ts`. From 1280px a clickable pillar index sits between the photo and the copy: its gold rail tracks scroll progress and each entry scrolls to its step.

The consultation block on the homepage and service listing (`ConsultationSection` in `src/components/sections.tsx`) uses one white card for the office photo, contact details and form. A thin divider separates the two columns from 1024px; smaller screens stack them within the same outer border. The standalone contact-page form keeps its existing frame.

The office, document handover and vi bằng photos use high-quality WebP (quality 95, original dimensions, no upscaling): `public/images/van-phong-quang-ngai.webp` (1448×1086), `public/images/services/giao-nhan-ho-so.webp` (1536×1024) and `public/images/services/vi-bang-quang-ngai.webp` (1448×1086). These replace the previous image URLs to avoid stale Next.js image-optimizer caches; shared service/article content uses the same assets.

## Contact form

`ContactForm` (`src/components/contact-form.tsx`) posts to the `submitContact` Server Action (`src/lib/contact-action.ts`). The browser and server check the same rules from `src/lib/contact-rules.ts`: required fields, a Vietnamese phone number, up to 5 PDF/Word/JPG/PNG files totalling 4 MB. The server also checks each file's leading bytes.

Accepted requests are queued rather than mailed while the visitor waits, because Gmail takes about 3 seconds per message. `src/lib/mail-queue.ts` stores each request and its attachments under `.data/mail-queue/` (git-ignored), and the visitor is told "Đã gửi" as soon as the request is on disk. The mail goes out after the response, via `after()`. The queue works like this:

- A failed send is retried after 1, 5 and 15 minutes, then 1, 3, 6 and 12 hours: 8 attempts over about a day.
- After the last attempt, the job moves to `failed/` and the server logs `Mail queue: gave up on …`. To resend it, move its folder back into `pending/` and restart the app.
- On startup, `src/instrumentation.ts` puts jobs interrupted mid-send back into `pending/` and sends everything due. Delivery is at-least-once, so a crash at the wrong moment can produce a duplicate mail.
- A job's folder, including the customer's files, is deleted once its mail is sent.
- A missing or malformed SMTP setting is caught before the request is queued, so the visitor sees an error instead of a false "Đã gửi".

The office copy of each request is built in `src/lib/contact-email.ts`. It is laid out like an intake slip for staff reading on a phone. At the top are the customer's name, the phone number in large type, and "Gọi lại" / "Nhắn Zalo" buttons. Below come the message, the attached files, and the time and page the request came from. The header seal is `public/email-logo.png` (128 px), embedded inline by `cid` so it shows without the site being online. Email clients ignore stylesheets, so every style is inline, and font stacks use single quotes because they sit inside `style="…"`.

Spam filtering happens in this order:

1. A hidden honeypot field and a 3-second minimum fill time. Bots that trip these get a fake success and no mail is sent.
2. A per-IP limit of 5 submissions per 10 minutes, kept in process memory.
3. Server-side validation.
4. Cloudflare Turnstile. The widget stays invisible unless Cloudflare asks for a click, and the server verifies every token.

Setup: copy `.env.example` to `.env.local` (development) or into the server environment (production), then fill in:

- **Turnstile:** create a widget for the site's domain in the Cloudflare dashboard. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is inlined at build time, so it must be set before `npm run build`.
- **Gmail:** turn on 2-Step Verification for `vpthadsquangngai@gmail.com`, create an App Password, and put it in `SMTP_PASS`. Gmail caps sending at about 500 messages a day, which is plenty for this form.
- **Sign-up popup (optional):** `NEXT_PUBLIC_CONSULT_POPUP_DELAY_SECONDS` (default 40; `0` turns the popup off) is how long a visitor browses before it opens. `NEXT_PUBLIC_CONSULT_POPUP_SNOOZE_DAYS` (default 3) is how long it stays away after being closed, and `NEXT_PUBLIC_CONSULT_POPUP_DONE_DAYS` (default 90) after a sign-up. Like the Turnstile key they are inlined at build time: rebuild after changing them.

## Deploying on a Linux VPS

Run a single `npm run build && npm run start` process, for example under systemd or PM2 in fork mode. Do not use PM2 cluster mode: the per-IP limit lives in one process's memory, and multiple processes would each keep their own count. Start the process from the project folder: the mail queue lives in `.data/mail-queue/` under the working directory, which must be writable and must persist across deploys. Keep that folder readable only by the app's user, because it holds customers' files until they are sent.

Put nginx in front of the app, and forward the real client IP and allow uploads a little above the 5 MB Server Action body limit set in `next.config.ts`:

```nginx
location / {
    client_max_body_size 6m;
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Without `X-Real-IP`, every visitor looks like `127.0.0.1` and they all share one rate-limit bucket. Some VPS providers block outbound SMTP ports (465/587) on new servers. If mail fails with a connection timeout in the server log, ask the provider to open port 465.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

