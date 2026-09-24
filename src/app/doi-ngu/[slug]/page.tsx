import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MemberCard } from "@/components/cards";
import { Social } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/ui";
import { office, team } from "@/content/site";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/doi-ngu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  return member ? { title: member.name, description: member.intro } : {};
}

export default async function MemberPage({ params }: PageProps<"/doi-ngu/[slug]">) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();
  const others = team.filter((m) => m.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-site grid items-start gap-5 lg:grid-cols-[1fr_2.05fr]">
          <div data-reveal className="relative mx-auto aspect-[310/366] w-full max-w-md overflow-hidden rounded-lg lg:sticky lg:top-28">
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              sizes="(min-width: 64rem) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <div data-reveal className="rounded-lg bg-sand p-2 md:rounded-xl md:p-2.5">
            <article className="rounded-md bg-white p-5 md:rounded-lg md:p-10">
              <span className="inline-block rounded-full bg-line px-3 py-1 text-sm text-heading">{member.role}</span>
              <h1 className="mt-3 text-[2.5rem] leading-tight md:text-[3.25rem]">{member.name}</h1>
              <p className="mt-3 md:text-lg">{member.intro}</p>
              <ul className="mt-4 flex gap-3">
                {office.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-9 place-items-center rounded-xxs bg-heading text-white transition-colors hover:bg-accent"
                    >
                      <Social name={s.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 text-[1.75rem] md:text-[2.125rem]">{member.leadTitle}</h2>
              <p className="mt-3 md:text-lg">{member.lead}</p>
              <h2 className="mt-10 text-[1.75rem] md:text-[2.125rem]">Kinh nghiệm</h2>
              <p className="mt-3 md:text-lg">{member.experience}</p>
              <blockquote className="mt-5 italic md:text-lg">&ldquo;{member.quote}&rdquo;</blockquote>
              <ul className="mt-5 flex list-disc flex-col gap-1.5 pl-5 md:text-lg">
                {member.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
            Thành viên <Accent>khác</Accent>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-4">
            {others.map((m) => (
              <Reveal key={m.slug}>
                <MemberCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
