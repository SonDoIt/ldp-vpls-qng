import { footerNav, office } from "@/content/site";
import { Social } from "./icons";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { Accent, ButtonLink, CredentialBadge } from "./ui";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-heading pt-[var(--section-space)] pb-10 text-line">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal>
            <Logo tone="light" />
            <p className="mt-5 max-w-[16ch] font-display text-4xl text-white md:text-5xl">
              Tận tâm trong từng <Accent>giải pháp</Accent>.
            </p>
          </div>
          <ButtonLink data-reveal href="/lien-he" className="self-start lg:mr-[7.5%] lg:mb-3 lg:self-auto">
            Gửi yêu cầu tư vấn
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-[1.6fr_1fr_1.1fr]">
          <div data-reveal>
            <h2 className="font-display text-3xl text-white">Liên kết</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-8 sm:max-w-sm">
              {[footerNav.pages, footerNav.more].map((group, i) => (
                <ul key={i} className="flex flex-col gap-3">
                  {group.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href}>{item.label}</NavLink>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div data-reveal>
            <h2 className="font-display text-3xl text-white">Giờ làm việc</h2>
            <ul className="mt-6 flex flex-col gap-3">
              <li>{office.workdays}</li>
              {office.sessions.map((s) => (
                <li key={s.label}>
                  {s.label}: <span className="text-white">{s.time}</span>
                </li>
              ))}
              <li className="mt-2">Thứ 7, Chủ nhật: nghỉ (làm việc nếu có yêu cầu)</li>
            </ul>
          </div>
          <div data-reveal>
            <h2 className="font-display text-3xl text-white">Liên hệ</h2>
            <ul className="mt-6 flex flex-col gap-3">
              <li>
                <a href={office.phoneHref} className="transition-colors hover:text-accent-ink">
                  {office.phone}
                </a>{" "}
                (Zalo)
              </li>
              <li>
                <a href={`mailto:${office.email}`} className="transition-colors hover:text-accent-ink">
                  {office.email}
                </a>
              </li>
              <li className="max-w-xs">
                <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-ink">
                  {office.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-white">
              © {new Date().getFullYear()} {office.fullName}.
            </p>
            <p className="mt-1 text-sm">Mã số doanh nghiệp: {office.taxId}</p>
            <ul className="mt-4 flex gap-2.5">
              {office.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={`${s.label}: ${s.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-xs bg-white/5 text-white transition-colors hover:bg-accent hover:text-heading active:translate-y-px"
                  >
                    <Social name={s.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <CredentialBadge tone="light" className="self-start rounded-xs bg-white/5 px-4 py-3 md:self-auto" />
        </div>
      </div>
    </footer>
  );
}
