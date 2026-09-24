import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { Clock, Mail, MapPin, Phone, Social } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { FaqSection, FramedPanel } from "@/components/sections";
import { Accent, PreTitle, buttonClass } from "@/components/ui";
import { office } from "@/content/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${office.name}: ${office.address}. Điện thoại/Zalo ${office.phone}, email ${office.email}. Làm việc ${office.hours}.`,
  alternates: { canonical: "/lien-he" },
};

function ContactItem({ icon, label, children, note }: { icon: ReactNode; label: string; children: ReactNode; note?: string }) {
  return (
    <li className="flex gap-3 border-b border-line py-5 last:border-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-xs bg-sand text-accent-ink">{icon}</span>
      <div>
        <p className="text-sm">{label}</p>
        <div className="mt-0.5 text-lg text-heading">{children}</div>
        {note && <p className="mt-1 text-sm">{note}</p>}
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-[var(--section-space)] md:pt-36">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-sand),transparent_80%)] bg-clip-text font-display text-watermark whitespace-nowrap text-transparent select-none md:top-16"
        >
          Liên hệ
        </p>
        <div className="relative container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="flex flex-col justify-between gap-10">
            <h1 className="text-4xl md:text-6xl">
              Liên hệ Văn phòng
              <br />
              <Accent>Thi hành án dân sự Quảng Ngãi</Accent>
            </h1>
            <div data-reveal>
              <PreTitle>Liên hệ trực tiếp</PreTitle>
              <ul className="mt-2">
                <ContactItem icon={<Phone className="size-4" />} label="Điện thoại / Zalo">
                  <a href={office.phoneHref} className="hover:text-accent-ink transition-colors">
                    {office.phone}
                  </a>
                  <a href={office.zaloHref} target="_blank" rel="noopener noreferrer" className="ml-3 text-sm underline underline-offset-4 hover:text-accent-ink transition-colors">
                    Nhắn Zalo
                  </a>
                </ContactItem>
                <ContactItem icon={<Mail className="size-4" />} label="Email">
                  <a href={`mailto:${office.email}`} className="break-all hover:text-accent-ink transition-colors">
                    {office.email}
                  </a>
                </ContactItem>
                <ContactItem icon={<MapPin className="size-4" />} label="Trụ sở">
                  <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">
                    {office.address}
                  </a>
                </ContactItem>
                <ContactItem icon={<Clock className="size-4" />} label={`Giờ làm việc (${office.workdays})`}>
                  {office.sessions.map((s) => (
                    <span key={s.label} className="block">
                      {s.label}: {s.time}
                    </span>
                  ))}
                </ContactItem>
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {office.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass({ size: "sm", variant: "outline" })}
                    >
                      <Social name={s.icon} className="size-4" />
                      {s.label}: {s.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Reveal>
            <FramedPanel label={`Tiếp nhận yêu cầu ${office.workdays}`} title="Gửi yêu cầu tư vấn">
              <ContactForm />
            </FramedPanel>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-site">
          <div className="flex flex-col items-center text-center">
            <PreTitle data-reveal>Trụ sở Văn phòng</PreTitle>
            <h2 data-reveal className="mt-3 text-4xl md:text-5xl">
              Đường đến <Accent>Văn phòng</Accent>
            </h2>
            <p data-reveal className="mt-3 md:text-lg">{office.address}</p>
          </div>
          <div data-reveal className="mt-10 overflow-hidden rounded-sm border border-line bg-white md:mt-12">
            <iframe
              src={office.mapsEmbedUrl}
              title={`Bản đồ ${office.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full md:aspect-[16/7]"
            />
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href={office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ size: "sm", variant: "outline" })}
            >
              Chỉ đường trên Google Maps
            </a>
          </div>
        </div>
      </section>

      <FaqSection layout="center" />
      <JsonLd data={breadcrumbSchema([{ name: "Liên hệ", path: "/lien-he" }])} />
    </>
  );
}
