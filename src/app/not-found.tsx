import { Accent, ButtonLink, PreTitle } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-40 pb-[var(--section-space)] md:pt-48">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-sand),transparent_85%)] bg-clip-text font-serif text-[10rem] leading-none text-transparent select-none md:text-[18rem]"
      >
        404
      </p>
      <div className="relative container-site flex flex-col items-center text-center">
        <PreTitle data-reveal>Lỗi 404</PreTitle>
        <h1 data-reveal className="mt-3 text-[2.5rem] leading-[1.15] md:text-[4rem]">
          Không tìm thấy <Accent>trang</Accent>
        </h1>
        <p data-reveal className="mt-4 max-w-md md:text-lg">Trang bạn tìm có thể đã được di chuyển hoặc không còn tồn tại.</p>
        <ButtonLink data-reveal href="/" className="mt-8">
          Về trang chủ
        </ButtonLink>
      </div>
    </section>
  );
}
