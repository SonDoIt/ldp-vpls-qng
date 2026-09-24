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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
