import Image from "next/image";
import type { StyleMoodboard, StyleReferenceSource } from "@/data/designStyles";
import { BackToStylesLink } from "@/components/design-style/BackToStylesLink";
import { getDesignStyleBySlug } from "@/data/designStyles";
import { getStyleReferenceEntry } from "@/data/styleReferences";
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleDetailSection } from "@/components/design-style/DesignStyleDetailSection";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { RelatedDesignStyles } from "@/components/design-style/RelatedDesignStyles";
import { type Locale } from "@/lib/i18n";
import { designStyleForLocale } from "@/lib/localizedContent";

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
    moodboard: "Moodboard",
    moodboardKeywords: "Direction keywords",
    moodboardPrompt: "Imagegen prompt",
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
    moodboard: "무드보드",
    moodboardKeywords: "디렉션 키워드",
    moodboardPrompt: "Imagegen 프롬프트",
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
  const referenceEntry = getStyleReferenceEntry(style.slug);
  const referenceSites = referenceEntry?.sites ?? style.research?.referenceSites ?? [];
  const referenceGalleries = referenceEntry?.galleries ?? style.research?.referenceGalleries ?? [];
  const hasReferences = referenceSites.length > 0 || referenceGalleries.length > 0;
  const hasLongDisplayName = localizedStyle.nameKo.length >= 15;

  return (
    <main className="min-h-screen bg-background pt-28 text-[var(--specimen-ink)]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <BackToStylesLink className="raw-label inline-flex items-center gap-2 text-[var(--specimen-signal)] underline-offset-4 hover:underline">
          <span className="specimen-bullet" aria-hidden="true" />
          {t.back}
        </BackToStylesLink>

        <header className="specimen-sheet mt-8 grid gap-8 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:p-7">
          <div className="min-w-0">
            <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
              <span className="specimen-bullet" aria-hidden="true" />
              {localizedStyle.category}
            </p>
            <h1
              className={[
                "raw-display mt-4 max-w-full leading-[0.88] text-[var(--specimen-ink)] [overflow-wrap:break-word] [word-break:normal] sm:leading-[0.82]",
                hasLongDisplayName
                  ? "text-[clamp(1.95rem,8vw,4.45rem)] sm:text-[clamp(2.75rem,4.2vw,4.45rem)]"
                  : "text-[clamp(2.25rem,10vw,5.25rem)] sm:text-[clamp(3.25rem,5vw,5.25rem)]",
              ].join(" ")}
            >
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

        {style.moodboard ? (
          <div className="mt-4">
            <MoodboardBlock
              keywordsLabel={t.moodboardKeywords}
              moodboard={style.moodboard}
              promptLabel={t.moodboardPrompt}
              title={t.moodboard}
            />
          </div>
        ) : null}

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

        {hasReferences ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <ReferenceBlock items={referenceSites} title={t.referenceSites} />
            <ReferenceBlock items={referenceGalleries} title={t.referenceGalleries} />
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

function MoodboardBlock({
  keywordsLabel,
  moodboard,
  promptLabel,
  title,
}: {
  keywordsLabel: string;
  moodboard: StyleMoodboard;
  promptLabel: string;
  title: string;
}) {
  return (
    <DesignStyleDetailSection title={title}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <figure className="min-w-0">
          <div className="relative overflow-hidden border border-[var(--specimen-ink)] bg-[var(--specimen-ink)]">
            <Image
              alt={moodboard.alt}
              className="aspect-[16/10] h-auto w-full object-cover"
              height={1000}
              priority={false}
              src={moodboard.imageSrc}
              width={1600}
            />
          </div>
          <figcaption className="mt-3 max-w-3xl text-sm leading-6 text-[rgb(24_22_15_/_0.66)]">
            {moodboard.caption}
          </figcaption>
        </figure>

        <div className="grid content-start gap-4">
          <div>
            <p className="raw-label text-[var(--specimen-signal)]">{keywordsLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {moodboard.directionKeywords.map((keyword) => (
                <span
                  className="border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--specimen-ink-55)]"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="raw-label text-[var(--specimen-signal)]">{promptLabel}</p>
            <pre className="mt-3 whitespace-pre-wrap border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] p-3 font-mono text-[11px] leading-5 text-[rgb(24_22_15_/_0.7)]">
              {moodboard.prompt}
            </pre>
          </div>
        </div>
      </div>
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
