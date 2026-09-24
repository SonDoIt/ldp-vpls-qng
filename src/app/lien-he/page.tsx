import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { FaqSection, FramedPanel } from "@/components/sections";
import { Accent, ImageFade, PreTitle } from "@/components/ui";
import { office, offices } from "@/content/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${office.name}: điện thoại ${office.phone}, email ${office.email}.`,
};

function ContactItem({ icon, label, children, note }: { icon: ReactNode; label: string; children: ReactNode; note?: string }) {
  return (
    <li className="flex gap-3 border-b border-line py-5 last:border-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-xxs bg-sand text-accent">{icon}</span>
      <div>
        <p className="text-sm">{label}</p>
        <div className="mt-0.5 text-lg text-heading">{children}</div>
        {note && <p className="mt-1 text-sm">{note}</p>}
      </div>
    </li>
  );
}

function directionsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-[var(--section-space)] md:pt-36">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-sand),transparent_80%)] bg-clip-text font-serif text-[7rem] leading-none whitespace-nowrap text-transparent select-none md:top-16 md:text-[13rem] lg:text-[16rem]"
        >
          Liên hệ
        </p>
        <div className="relative container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="flex flex-col justify-between gap-10">
            <h1 data-reveal className="text-[2.75rem] leading-[1.1] md:text-[4rem]">
              Hãy bắt đầu
              <br />
              <Accent>cuộc trò chuyện</Accent>
            </h1>
            <div data-reveal>
              <PreTitle>Liên hệ trực tiếp</PreTitle>
              <ul className="mt-2">
                <ContactItem icon={<Phone className="size-4" />} label="Gọi cho chúng tôi" note={office.hours}>
                  <a href={office.phoneHref} className="hover:text-accent">
                    {office.phone}
                  </a>
                </ContactItem>
                <ContactItem icon={<Mail className="size-4" />} label="Gửi email" note="Phản hồi trong 1 ngày làm việc">
                  <a href={`mailto:${office.email}`} className="break-all hover:text-accent">
                    {office.email}
                  </a>
                </ContactItem>
                <ContactItem icon={<MapPin className="size-4" />} label="Địa chỉ">
                  {office.address}
                </ContactItem>
                <ContactItem icon={<Clock className="size-4" />} label="Giờ làm việc">
                  {office.timing}
                </ContactItem>
              </ul>
            </div>
          </div>
          <Reveal>
            <FramedPanel label="Cam kết phản hồi trong 1 ngày làm việc" title="Đặt lịch tư vấn">
              <ContactForm />
            </FramedPanel>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-site">
          <div className="flex flex-col items-center text-center">
            <PreTitle data-reveal>Hệ thống văn phòng</PreTitle>
            <h2 data-reveal className="mt-3 text-[2.5rem] md:text-[3.375rem]">
              Tìm chúng tôi <Accent>gần bạn</Accent>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((o, i) => (
              <Reveal
                key={o.city}
               
                className={`relative isolate flex min-h-[20rem] flex-col items-center justify-end overflow-hidden rounded-t-lg px-5 pt-40 pb-1 text-center md:min-h-[26rem] ${
                  i === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Image src={o.image} alt="" fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 50vw, 100vw" className="-z-10 object-cover" />
                <ImageFade to="cream" />
                <div className="relative z-[2] flex flex-col items-center">
                  <p className="text-sm text-heading">{o.label}</p>
                  <h3 className="mt-1 text-[1.75rem] md:text-[2rem]">{o.city}</h3>
                  <p className="mt-2 max-w-xs text-sm">{o.address}</p>
                  <a
                    href={directionsHref(o.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 rounded-xxs border border-line bg-white px-4 py-1.5 text-sm text-heading transition-colors hover:bg-accent"
                  >
                    Chỉ đường
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection layout="center" />
    </>
  );
}
