import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { StyleReferenceSource } from "@/data/designStyles";
import { designStyles, getDesignStyleBySlug } from "@/data/designStyles";
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleDetailSection } from "@/components/design-style/DesignStyleDetailSection";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { RelatedDesignStyles } from "@/components/design-style/RelatedDesignStyles";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { designStyleForLocale } from "@/lib/localizedContent";

export function generateStaticParams() {
  return designStyles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style) {
    return {
      title: "디자인 형식 없음",
    };
  }

  return {
    description: style.summary,
    title: `${style.nameKo} | Design Style Lab`,
  };
}

export default async function DesignStyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  return <DesignStyleDetailPageContent locale={defaultLocale} style={style} />;
}

const detailText = {
  en: {
    back: "Back to styles",
    details: "Details",
    palette: "Palette",
    visual: "Visual features",
    type: "Typography",
    layout: "Layout traits",
    industries: "Best industries",
    pages: "Best pages",
    cautions: "Cautions",
    imagePrompt: "Image prompt",
    referenceGalleries: "Reference galleries",
    references: "References",
    referenceSites: "Reference sites",
    promptCopied: "Prompt copied",
    copyPrompt: "Copy prompt",
  },
  ko: {
    back: "목록으로 돌아가기",
    details: "상세 설명",
    palette: "색상표",
    visual: "시각적 특징",
    type: "타이포그래피",
    layout: "레이아웃 경향",
    industries: "어울리는 업종",
    pages: "어울리는 페이지",
    cautions: "사용 시 주의점",
    imagePrompt: "이미지 생성 프롬프트",
    referenceGalleries: "레퍼런스 갤러리",
    references: "참고 레퍼런스",
    referenceSites: "실제 사이트",
    promptCopied: "프롬프트 복사됨",
    copyPrompt: "프롬프트 복사",
  },
} satisfies Record<Locale, Record<string, string>>;

export function DesignStyleDetailPageContent({
  locale,
  style,
}: {
  locale: Locale;
  style: NonNullable<ReturnType<typeof getDesignStyleBySlug>>;
}) {
  const localizedStyle = designStyleForLocale(style, locale);
  const t = detailText[locale];

  return (
    <main className="min-h-screen bg-background pt-28 text-[var(--specimen-ink)]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <LocalizedLink className="raw-label inline-flex items-center gap-2 text-[var(--specimen-signal)] underline-offset-4 hover:underline" href="/styles">
          <span className="specimen-bullet" aria-hidden="true" />
          {t.back}
        </LocalizedLink>

        <header className="specimen-sheet mt-8 grid gap-8 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:p-7">
          <div className="min-w-0">
            <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
              <span className="specimen-bullet" aria-hidden="true" />
              {localizedStyle.category}
            </p>
            <h1 className="raw-display mt-4 max-w-full break-words text-[clamp(3.25rem,5vw,5.25rem)] leading-[0.82] text-[var(--specimen-ink)] [overflow-wrap:anywhere]">
              {localizedStyle.nameKo}
            </h1>
            {localizedStyle.nameEn !== localizedStyle.nameKo ? (
              <p className="mt-3 text-lg font-medium text-[var(--specimen-ink-55)]">{localizedStyle.nameEn}</p>
            ) : null}
            <p className="mt-6 max-w-[21rem] break-words text-base leading-7 text-[rgb(24_22_15_/_0.72)] [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg sm:leading-8">
              {localizedStyle.summary}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {style.tags.slice(0, 6).map((tag) => (
                <span
                  className="min-w-0 max-w-full break-all border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.7)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-ink-55)]"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <DesignStyleSampleRenderer className="min-w-0" style={localizedStyle} />
        </header>

        <section className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <DesignStyleDetailSection title={t.details}>
            <p>{localizedStyle.description}</p>
          </DesignStyleDetailSection>
          <DesignStyleDetailSection title={t.palette}>
            <ColorPaletteGrid palette={style.palette} />
          </DesignStyleDetailSection>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ListBlock items={localizedStyle.visualFeatures} title={t.visual} />
          <ListBlock items={localizedStyle.typography} title={t.type} />
          <ListBlock items={localizedStyle.layoutTraits} title={t.layout} />
          <ListBlock items={localizedStyle.goodFor} title={t.industries} />
          <ListBlock items={localizedStyle.useCases} title={t.pages} />
          <ListBlock items={localizedStyle.cautions} title={t.cautions} />
        </section>

        <div className="mt-4">
          <DesignStyleDetailSection title={t.imagePrompt}>
            <div className="mb-3 flex justify-end">
              <CopyTextButton
                copiedLabel={t.promptCopied}
                idleLabel={t.copyPrompt}
                text={style.imagePrompt}
              />
            </div>
            <pre className="whitespace-pre-wrap border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] p-4 font-mono text-xs leading-6 text-[rgb(242_239_232_/_0.82)]">
              {style.imagePrompt}
            </pre>
          </DesignStyleDetailSection>
        </div>

        {style.research ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <ReferenceBlock items={style.research.referenceSites} title={t.referenceSites} />
            <ReferenceBlock items={style.research.referenceGalleries} title={t.referenceGalleries} />
          </section>
        ) : null}

        <div className="mt-16">
          <RelatedDesignStyles slugs={style.related} />
        </div>
      </div>
    </main>
  );
}

function ListBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <DesignStyleDetailSection title={title}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li className="border-t border-[var(--specimen-line-soft)] pt-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </DesignStyleDetailSection>
  );
}

function ReferenceBlock({
  items,
  title,
}: {
  items: StyleReferenceSource[];
  title: string;
}) {
  return (
    <DesignStyleDetailSection title={title}>
      <ul className="space-y-3">
        {items.map((item) => (
          <li className="border-t border-[var(--specimen-line-soft)] pt-3" key={item.url}>
            <a className="font-semibold underline-offset-4 hover:underline" href={item.url} rel="noreferrer" target="_blank">
              {item.title}
            </a>
            <p className="mt-1 text-sm leading-6 text-[rgb(24_22_15_/_0.62)]">{item.note}</p>
          </li>
        ))}
      </ul>
    </DesignStyleDetailSection>
  );
}
