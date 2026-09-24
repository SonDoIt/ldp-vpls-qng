import Image from "next/image";
import type { ReactNode } from "react";
import { faqs, office, stats, steps } from "@/content/site";
import { ContactForm } from "./contact-form";
import { ChevronDown, Sparkle } from "./icons";
import { Reveal } from "./reveal";
import { Accent, ButtonLink, ImageFade, PreTitle } from "./ui";

/** "21 / 14 / 4" with numerals fading from orange to nothing. */
export function Stats({ size = "lg", className = "" }: { size?: "lg" | "md"; className?: string }) {
  return (
    <dl className={`mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} data-reveal className="flex flex-col-reverse items-center text-center">
          <dt className="mt-2 text-base md:text-lg">{s.label}</dt>
          <dd
            className={`text-fade-accent leading-[1.1] tracking-tight whitespace-nowrap ${
              size === "lg" ? "text-[4rem] md:text-[5rem] lg:text-[6.25rem]" : "text-[3.125rem] md:text-[4.375rem]"
            }`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The six numbered working steps on a cream band. */
export function ProcessSteps() {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} className="flex flex-col items-center text-center">
            <span className="text-fade-accent text-[4.5rem] leading-none tracking-tight md:text-[6.25rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-sans text-xl font-medium md:text-[1.375rem]">{step.title}</h3>
            <p className="mt-1.5 max-w-[26ch] text-base md:text-lg">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Sand frame with a small status line on top and a white panel inside: the form/card chrome. */
export function FramedPanel({
  label,
  title,
  children,
  className = "",
}: {
  label?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-sand p-2.5 md:rounded-xl ${className}`}>
      {label && (
        <p className="flex items-center justify-center gap-2 pt-2 pb-3.5 text-sm text-heading">
          <span className="relative grid size-3 place-items-center">
            <span className="absolute inset-0 rounded-full bg-accent/25" />
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          {label}
        </p>
      )}
      <div className="rounded-xs bg-white p-4 md:rounded-lg md:p-10">
        {title && <h2 className="mb-8 text-center text-2xl md:mb-10 md:text-[1.875rem]">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/** Photo with phone/email under it, beside the consultation form (home, services). */
export function ConsultationSection() {
  return (
    <section className="bg-cream section-y">
      <div className="container-site grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-lg md:min-h-[36rem] md:rounded-t-xl">
          <Image
            src="/images/contact.jpg"
            alt=""
            fill
            sizes="(min-width: 64rem) 45vw, 100vw"
            className="-z-10 object-cover"
          />
          <ImageFade to="cream" />
          <div className="relative z-[2] grid grid-cols-1 gap-4 px-4 pb-8 text-center sm:grid-cols-2">
            <div>
              <p className="text-sm text-heading">Điện thoại / Zalo</p>
              <a href={office.phoneHref} className="text-xl text-heading hover:text-accent-ink md:text-[1.375rem]">
                {office.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-heading">Gửi email</p>
              <a href={`mailto:${office.email}`} className="text-xl break-all text-heading hover:text-accent-ink md:text-[1.375rem]">
                {office.email}
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <FramedPanel label={`Tiếp nhận yêu cầu ${office.workdays}`} title="Gửi yêu cầu tư vấn" className="h-full">
            <ContactForm />
          </FramedPanel>
        </Reveal>
      </div>
    </section>
  );
}

function FaqList({ className = "" }: { className?: string }) {
  return (
    <div data-reveal className={`flex flex-col gap-5 ${className}`}>
      {faqs.map((f, i) => (
        <details
          key={f.q}
          name="faq"
          open={i === 0}
          className="group rounded-xs border border-line bg-cream transition-colors duration-300 open:bg-cream"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-heading md:text-lg">
            {f.q}
            <ChevronDown className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="details-body px-5 pb-5 text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Questions accordion. "split": title left, list right (home, services). "center": stacked. */
export function FaqSection({ layout = "split" }: { layout?: "split" | "center" }) {
  if (layout === "center") {
    return (
      <section className="section-y">
        <div className="container-narrow">
          <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
            Câu hỏi <Accent>thường gặp</Accent>
          </h2>
          <FaqList className="mt-10 md:mt-12" />
        </div>
      </section>
    );
  }
  return (
    <section className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-between gap-10">
          <h2 data-reveal className="text-[2.5rem] leading-[1.1] md:text-[4.375rem]">
            Câu hỏi
            <br />
            <Accent>thường gặp</Accent>
          </h2>
          <div data-reveal>
            <p className="text-xl text-heading">Vẫn còn thắc mắc? Hãy trao đổi với chúng tôi</p>
            <p className="mt-1 text-base">Thừa hành viên sẽ giải đáp và hướng dẫn thủ tục cụ thể cho trường hợp của bạn.</p>
            <ButtonLink href="/lien-he" className="mt-6">
              Gửi yêu cầu tư vấn
            </ButtonLink>
          </div>
        </div>
        <FaqList />
      </div>
    </section>
  );
}

/** Wide handshake photo fading to white with a closing call to action. */
export function CtaBanner() {
  return (
    <section className="section-y">
      <div className="px-[var(--gutter)]">
        <div className="relative isolate mx-auto flex min-h-[40rem] max-w-[1660px] flex-col justify-end overflow-hidden rounded-t-lg md:min-h-[56rem] md:rounded-t-xl">
          <Image
            src="/images/cta-handshake.webp"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-[1] h-[80%] bg-[linear-gradient(180deg,transparent_20%,#fff_45%)] md:h-[75%] md:bg-[linear-gradient(180deg,transparent_15%,#fff_50%)]"
          />
          <div className="relative z-[2] mx-auto flex max-w-3xl flex-col items-center px-4 pb-6 text-center">
            <h2 data-reveal className="text-[2.5rem] leading-[1.15] md:text-[4rem]">
              Bắt đầu hành trình
              <br />
              đến <Accent>công bằng</Accent> cùng chúng tôi.
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-base md:text-lg">
              Hãy chia sẻ tình huống của bạn. Thừa hành viên sẽ trao đổi và tư vấn phương án phù hợp theo
              quy định pháp luật, bảo mật thông tin của bạn.
            </p>
            <ButtonLink data-reveal href="/lien-he" className="mt-8">
              Gửi yêu cầu tư vấn
            </ButtonLink>
            <ul data-reveal className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:text-base">
              <li className="flex items-center gap-1.5">
                <Sparkle className="size-3 text-heading" />
                Bảo mật thông tin đương sự
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkle className="size-3 text-heading" />
                Chi phí thống nhất trước khi thực hiện
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Brown title band used by listing and legal pages (the header floats over it). */
export function DarkPageHero({
  pretitle,
  title,
  children,
  className = "",
}: {
  pretitle?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`on-dark bg-heading pt-36 pb-16 text-center md:pt-40 md:pb-20 ${className}`}>
      <div className="container-site flex flex-col items-center">
        {pretitle && (
          <PreTitle data-reveal tone="accent">
            {pretitle}
          </PreTitle>
        )}
        <h1 className="mt-3 max-w-3xl text-[2.75rem] leading-[1.1] text-white md:text-[4.25rem]">{title}</h1>
        {children && <div data-reveal className="mt-4 max-w-xl text-base text-white md:text-lg">{children}</div>}
      </div>
    </section>
  );
}
