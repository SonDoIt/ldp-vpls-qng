import Image from "next/image";
import Link from "next/link";
import type { Article, Member, Service } from "@/content/site";
import { ImageFade } from "./ui";

/*
 * Card states, shared by all three: hover recolours the title (and fills the article card), active
 * presses 1px, keyboard focus takes the global ring around the whole card. Photos stay still:
 * the state change is on the words a visitor is about to click.
 */

/** Tall photo card whose image dissolves into white behind a centred title. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/dich-vu/${service.slug}`}
      className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-t-sm px-5 pt-50 text-center active:translate-y-px md:px-8 lg:px-10 lg:pt-[21.875rem]"
    >
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 50vw, 100vw"
        className="-z-10 object-cover"
      />
      <ImageFade to="white" className="h-[90%] md:h-[70%]" />
      <div className="relative z-[2]">
        <h3 className="text-2xl transition-colors group-hover:text-accent-ink md:text-3xl">{service.title}</h3>
        <p className="mt-3 text-base md:text-lg">{service.summary}</p>
      </div>
    </Link>
  );
}

/** Portrait card for a team member: photo fading to white, name and role on the fade. */
export function MemberCard({ member, priority = false }: { member: Member; priority?: boolean }) {
  return (
    <Link href={`/doi-ngu/${member.slug}`} className="group relative flex h-full flex-col rounded-t-sm active:translate-y-px">
      <div className="relative aspect-[310/407] overflow-hidden rounded-t-sm bg-line">
        <Image
          src={member.image}
          alt={member.name}
          fill
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          sizes="(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 90vw"
          className="object-cover"
        />
        <ImageFade to="white" className="h-[45%]" />
        <div className="absolute inset-x-0 bottom-2 z-[2] px-3 text-center">
          <p className="text-lg font-semibold text-heading transition-colors group-hover:text-accent-ink md:text-xl">{member.name}</p>
          <p className="text-sm">{member.role}</p>
        </div>
      </div>
    </Link>
  );
}

/** Horizontal article card: photo left, category chip, title and summary right. */
export function ArticleCard({ item }: { item: Article }) {
  return (
    <Link
      href={`/kien-thuc/${item.slug}`}
      className="group flex h-full flex-col gap-4 rounded-sm bg-cream p-2.5 transition-colors hover:bg-sand active:translate-y-px sm:flex-row md:gap-6"
    >
      <div className="relative aspect-[318/269] shrink-0 overflow-hidden rounded-xs sm:w-[42%]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 64rem) 22vw, (min-width: 40rem) 40vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 px-2 pt-1 pb-3 sm:px-0 sm:pr-4">
        <div>
          <span className="inline-block rounded-xs bg-line px-2.5 py-1 text-sm text-heading">{item.category}</span>
          {/* Long titles stop at three lines; the full title is the next page's h1. */}
          <h3 className="mt-4 line-clamp-3 text-2xl md:text-3xl">{item.title}</h3>
          <p className="mt-3 line-clamp-3 text-base">{item.description}</p>
        </div>
        <p className="text-sm font-semibold text-heading underline-offset-4 group-hover:text-accent-ink group-hover:underline">
          Đọc bài viết
        </p>
      </div>
    </Link>
  );
}
