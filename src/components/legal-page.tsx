import { DarkPageHero } from "./sections";

export type LegalSection = { title: string; paragraphs: string[] };

/** Brown title band plus a narrow column of numbered sections (privacy policy, terms). */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <DarkPageHero pretitle={`Cập nhật lần cuối: ${updated}`} title={title} />
      <section className="section-y">
        <div className="container-narrow md:text-lg">
          <p data-reveal>{intro}</p>
          {sections.map((s, i) => (
            <div key={s.title} data-reveal className="mt-10">
              <h2 className="text-2xl md:text-3xl">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
