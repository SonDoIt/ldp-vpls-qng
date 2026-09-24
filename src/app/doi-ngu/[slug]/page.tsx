import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Social, StarFilled } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/ui";
import { office, team, teamGroups } from "@/content/site";
import { JsonLd, breadcrumbSchema, personSchema } from "@/lib/seo";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/doi-ngu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  return member
    ? {
        title: `${member.title} ${member.name}`,
        description: member.intro,
        alternates: { canonical: `/doi-ngu/${member.slug}` },
      }
    : {};
}

export default async function MemberPage({ params }: PageProps<"/doi-ngu/[slug]">) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();
  const profile = [
    { label: "Chức vụ", value: member.role },
    { label: "Chức danh", value: member.title },
    { label: "Học vấn", value: member.education.degree },
    { label: "Trường đào tạo", value: member.education.school },
  ];

  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-site grid items-start gap-5 lg:grid-cols-[1fr_2.05fr]">
          <div className="relative mx-auto aspect-[310/366] w-full max-w-md overflow-hidden rounded-lg lg:sticky lg:top-28">
            <Image
              src={member.image}
              alt={`${member.title} ${member.name}`}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 64rem) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="rounded-lg bg-sand p-2 md:rounded-xl md:p-2.5">
            <article className="rounded-md bg-white p-5 md:rounded-lg md:p-10">
              <span className="inline-block rounded-full bg-line px-3 py-1 text-sm text-heading">
                {member.title} · {member.role}
              </span>
              <h1 className="mt-3 text-[2.5rem] leading-tight md:text-[3.25rem]">{member.name}</h1>
              <p className="mt-3 md:text-lg">{member.intro}</p>
              <ul className="mt-4 flex gap-3">
                {office.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`${s.label}: ${s.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-xxs bg-heading text-white transition-colors hover:bg-accent"
                    >
                      <Social name={s.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 text-[1.75rem] md:text-[2.125rem]">Thông tin</h2>
              <dl className="mt-3">
                {profile.map((p) => (
                  <div key={p.label} className="grid gap-1 border-b border-line py-3 last:border-0 sm:grid-cols-[10rem_1fr] sm:gap-4 md:text-lg">
                    <dt className="text-base">{p.label}</dt>
                    <dd className="text-heading">{p.value}</dd>
                  </div>
                ))}
              </dl>
              <h2 className="mt-10 text-[1.75rem] md:text-[2.125rem]">Kinh nghiệm hành nghề</h2>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 md:text-lg">
                {member.experience.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <h2 className="mt-10 text-[1.75rem] md:text-[2.125rem]">Lĩnh vực phụ trách</h2>
              <p className="mt-3 md:text-lg">{member.lead}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.skills.map((s) => (
                  <li key={s} className="rounded-xs border border-line bg-cream px-3 py-1.5 text-sm text-heading">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <h2 data-reveal className="text-center text-[2.5rem] md:text-[3.375rem]">
            Đội ngũ <Accent>chuyên môn</Accent>
          </h2>
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            {teamGroups.map((g) => (
              <Reveal key={g.title} className="rounded-md bg-cream p-6 md:p-8">
                <span className="grid size-8 place-items-center rounded-xxs border border-line bg-white">
                  <StarFilled className="size-4 text-accent-ink" />
                </span>
                <h3 className="mt-4 font-sans text-xl font-medium">{g.title}</h3>
                <p className="mt-2 text-base">{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          personSchema(member),
          breadcrumbSchema([
            { name: "Đội ngũ", path: "/doi-ngu" },
            { name: member.name, path: `/doi-ngu/${member.slug}` },
          ]),
        ]}
      />
    </>
  );
}
