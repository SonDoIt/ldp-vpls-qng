import Image from "next/image";
import type { ReactNode } from "react";
import { faqs, head, office, stats, steps } from "@/content/site";
import { ContactForm } from "./contact-form";
import { ChevronDown, Sparkle } from "./icons";
import { Reveal } from "./reveal";
import { Accent, ButtonLink, PreTitle } from "./ui";

/** "21 / 14 / 4" with numerals fading from orange to nothing. */
export function Stats({ size = "lg", className = "" }: { size?: "lg" | "md"; className?: string }) {
  return (
    <dl className={`mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} data-reveal className="flex flex-col-reverse items-center text-center">
          <dt className="mt-2 text-base md:text-lg">{s.label}</dt>
          <dd
            className={`text-fade-accent tracking-tight whitespace-nowrap ${
              size === "lg" ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"
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
            <span className="text-fade-accent text-6xl leading-none tracking-tight md:text-7xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-sans text-xl font-semibold md:text-2xl">{step.title}</h3>
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
    <div className={`rounded-sm bg-sand p-2.5 ${className}`}>
      {label && (
        <p className="flex items-center justify-center gap-2 pt-2 pb-3.5 text-sm text-heading">
          <span className="relative grid size-3 place-items-center">
            <span className="absolute inset-0 rounded-full bg-accent/25" />
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          {label}
        </p>
      )}
      <div className="rounded-xs bg-white p-4 md:rounded-sm md:p-10">
        {title && <h2 className="mb-8 text-center text-2xl md:mb-10 md:text-3xl">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/** Photo, contact details and consultation form share one card on home and services. */
export function ConsultationSection() {
  return (
    <section className="bg-cream section-y">
      <div className="container-site">
        <Reveal className="grid overflow-hidden rounded-sm border border-line bg-white lg:grid-cols-[1.3fr_1fr]">
          <div className="flex min-w-0 flex-col">
            {/* Crops the source's outer margins (4% left/right, 3% top, 9% bottom): the box takes the kept
                area's aspect ratio and the image is offset inside it, so the crop holds at every width. */}
            <div className="relative aspect-[1472/1056] overflow-hidden">
              <Image
                src="/images/van-phong-quang-ngai-original.webp"
                alt={`${head.name}, ${head.role}, tại ${office.name}`}
                width={2560}
                height={1920}
                sizes="(min-width: 64rem) 62vw, 110vw"
                className="absolute top-[-3.41%] left-[-4.35%] h-auto w-[108.7%] max-w-none"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center px-5 py-6 md:px-8">
              <p className="text-sm text-heading">{head.name} · {head.role}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
                <div>
                  <p className="text-sm">Điện thoại / Zalo</p>
                  <a href={office.phoneHref} className="text-xl text-heading hover:text-accent-ink md:text-2xl transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="min-w-0">
                  <p className="text-sm">Gửi email</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-lg [overflow-wrap:anywhere] text-heading hover:text-accent-ink md:text-xl transition-colors"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 border-t border-line p-5 md:p-8 lg:border-t-0 lg:border-l lg:p-10">
            <p className="flex items-center gap-2 text-sm text-heading">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
              Tiếp nhận yêu cầu {office.workdays}
            </p>
            <h2 className="mt-3 mb-8 text-2xl md:text-3xl">Gửi yêu cầu tư vấn</h2>
            <ContactForm />
          </div>
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
          className="group rounded-xs border border-line bg-cream transition-[background-color,border-color,box-shadow] open:border-accent/40 open:bg-white open:shadow-sm"
        >
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 text-heading transition-colors hover:text-accent-ink md:text-lg">
            {f.q}
            <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
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
          <h2 data-reveal className="text-center text-4xl md:text-5xl">
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
          <h2 data-reveal className="text-4xl md:text-6xl">
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
        <div className="relative isolate mx-auto flex min-h-[40rem] max-w-[1660px] flex-col justify-end overflow-hidden rounded-t-sm md:min-h-[56rem]">
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
            <h2 data-reveal className="text-4xl md:text-6xl">
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
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">{title}</h1>
        {children && <div data-reveal className="mt-4 max-w-xl text-base text-white md:text-lg">{children}</div>}
      </div>
    </section>
  );
}
