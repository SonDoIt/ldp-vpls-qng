import { Eyebrow } from "@/components/eyebrow";
import { Logo } from "@/components/logo";
import { Flourish, Spotlights, Swash } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";

/** Theme reference: every token and primitive on one page. Replace with real sections. */
// Literal class names so Tailwind emits every colour token (it drops variables nothing uses).
const swatchRows = [
  ["bg-navy-950", "bg-navy-900", "bg-navy-800", "bg-navy-700", "bg-navy-600", "bg-navy-300", "bg-navy-100"],
  ["bg-gold-700", "bg-gold-500", "bg-gold-400", "bg-gold-300", "bg-gold-200"],
  ["bg-ink", "bg-slate", "bg-line", "bg-mist", "bg-paper", "bg-danger", "bg-success"],
] as const;

export default function Home() {
  return (
    <>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <a
          href="#main"
          className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:border-gold-500 hover:text-gold-300"
        >
          Theme
        </a>
      </header>

      <main id="main" className="pb-16">
        <section className="relative isolate mx-auto max-w-7xl px-5 py-16 text-white sm:px-8 lg:py-24">
          <Flourish className="pointer-events-none absolute -z-10 right-0 top-6 w-[36rem] max-w-full text-gold-500/20" />
          <p className="animate-rise text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            Core theme
          </p>
          <h1 className="mt-4 max-w-[18ch] animate-rise text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.025em] text-balance sm:text-5xl lg:text-[3.5rem]">
            Nền navy, giấy ngà và điểm nhấn vàng
          </h1>
          <div className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row">
            <a
              href="#tokens"
              className="inline-flex h-13 items-center justify-center rounded-full bg-gold-500 px-7 font-semibold text-navy-900 transition-colors duration-150 hover:bg-gold-300 active:bg-gold-400"
            >
              Nút chính
            </a>
            <a
              href="#primitives"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/30 px-7 font-semibold text-white transition-colors duration-150 hover:border-gold-500 hover:text-gold-300"
            >
              Nút phụ
            </a>
          </div>
        </section>

        {/* Paper sheet laid over the navy backdrop. */}
        <div className="mx-2 rounded-[1.75rem] bg-paper shadow-paper sm:mx-3 lg:mx-6 lg:rounded-[2.5rem]">
          <section id="tokens" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <Eyebrow index="01">Màu sắc</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-navy-900 sm:text-4xl">
              Bảng{" "}
              <span className="relative inline-block">
                màu
                <Swash className="absolute -bottom-2 left-0 h-3 w-full text-gold-500" />
              </span>
            </h2>
            <div className="mt-12 grid gap-10">
              {swatchRows.map((row) => (
                <Reveal key={row[0]}>
                  <ul className="grid grid-cols-3 gap-3 sm:grid-cols-7">
                    {row.map((swatch) => (
                      <li key={swatch}>
                        <span className={`block h-16 rounded-lg border border-line ${swatch}`} />
                        <span className="mt-2 block text-xs font-medium text-slate">
                          {swatch.slice(3)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="primitives" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
            <Eyebrow index="02">Thành phần</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-navy-900 sm:text-4xl">
              Thẻ, panel tối và chữ
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-2xl border border-line bg-white p-8 shadow-card">
                <p className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-700">
                  <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-gold-500" />
                  Thẻ sáng
                </p>
                <p className="mt-4 text-[17px] leading-[1.75] text-slate">
                  Chữ nội dung dùng màu slate trên nền trắng; tiêu đề dùng navy-900. Nhấn Tab để
                  thấy viền focus vàng.
                </p>
              </Reveal>
              <Reveal
                delay={80}
                className="relative isolate overflow-hidden rounded-2xl bg-navy-900 p-8 text-navy-100"
              >
                <Spotlights />
                <Eyebrow index="03" tone="dark">
                  Panel tối
                </Eyebrow>
                <p className="mt-4 text-[17px] leading-[1.75]">
                  Dùng <code className="text-gold-300">Spotlights</code> cho panel navy; phần tử cha
                  cần <code className="text-gold-300">relative isolate overflow-hidden</code>.
                </p>
              </Reveal>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
