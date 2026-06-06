import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { LayoutCodeExample } from "@/components/web-layout/LayoutCodeExample";
import { LayoutStagePreview } from "@/components/web-layout/LayoutStagePreview";
import { RelatedLayouts } from "@/components/web-layout/RelatedLayouts";
import { webLayouts, getLayoutBySlug, type WebLayout } from "@/data/webLayouts";
import { exportLayoutPrompt } from "@/lib/exportPrompt";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { layoutForLocale } from "@/lib/localizedContent";
import { complexityTone, formatComplexity } from "@/lib/utils";

type LayoutDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return webLayouts.map((layout) => ({ slug: layout.slug }));
}

export async function generateMetadata({
  params,
}: LayoutDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout) {
    return {
      title: "레이아웃을 찾을 수 없음",
    };
  }

  return {
    title: `${layout.nameKo} (${layout.nameEn})`,
    description: layout.summary,
  };
}

export default async function LayoutDetailPage({ params }: LayoutDetailPageProps) {
  const { slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout) {
    notFound();
  }

  return <LayoutDetailPageContent layout={layout} locale={defaultLocale} />;
}

const detailText = {
  en: {
    back: "Back to layouts",
    promptCopied: "Prompt copied",
    copyPrompt: "Copy layout prompt",
    bestFor: "Best for",
    avoid: "Avoid when",
    structure: "Structure",
    responsive: "Responsive behavior",
    pros: "Pros",
    cons: "Cons",
    ux: "UX notes",
    accessibility: "Accessibility checkpoints",
    wireframe: "Wireframe notes",
    tips: "Implementation tips",
  },
  ko: {
    back: "목록으로 돌아가기",
    promptCopied: "프롬프트 복사됨",
    copyPrompt: "레이아웃 프롬프트 복사",
    bestFor: "어울리는 페이지 유형",
    avoid: "피해야 할 상황",
    structure: "구조 설명",
    responsive: "반응형 동작 설명",
    pros: "장점",
    cons: "단점",
    ux: "UX 관점에서 주의할 점",
    accessibility: "접근성 체크포인트",
    wireframe: "와이어프레임 해설",
    tips: "구현 팁",
  },
} satisfies Record<Locale, Record<string, string>>;

export function LayoutDetailPageContent({
  layout,
  locale,
}: {
  layout: WebLayout;
  locale: Locale;
}) {
  const localizedLayout = layoutForLocale(layout, locale);
  const t = detailText[locale];

  return (
    <main className="min-h-screen bg-background pt-24 text-[var(--specimen-ink)]">
      <div className="mx-auto max-w-[1720px] px-5 py-10 lg:px-8">
        <LocalizedLink
          className="raw-label inline-flex items-center gap-2 text-[var(--specimen-signal)] underline-offset-4 hover:underline"
          href="/layouts"
        >
          <span className="specimen-bullet" aria-hidden="true" />
          {t.back}
        </LocalizedLink>

        <section
          aria-label={
            locale === "ko"
              ? `${localizedLayout.nameKo} 실제 웹 프리뷰`
              : `${localizedLayout.nameKo} live web preview`
          }
          className="specimen-sheet relative mt-8 h-[calc(100vh-230px)] min-h-[560px] max-h-[760px] overflow-hidden"
          data-testid="layout-stage"
        >
          <LayoutStagePreview layout={layout} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="specimen-surface p-6">
            <div className="flex flex-wrap gap-2">
              <Badge>{localizedLayout.category}</Badge>
              <Badge className={complexityTone(layout.complexity)}>
                {formatComplexity(layout.complexity, locale)}
              </Badge>
              <Badge>{layout.previewType}</Badge>
            </div>
            <h1 className="raw-display mt-6 text-5xl leading-[0.82] text-[var(--specimen-ink)]">
              {localizedLayout.nameKo}
            </h1>
            {localizedLayout.nameEn !== localizedLayout.nameKo ? (
              <p className="mt-3 text-lg font-medium text-[var(--specimen-ink-55)]">
                {localizedLayout.nameEn}
              </p>
            ) : null}
            <p className="mt-6 text-base leading-7 text-[rgb(24_22_15_/_0.8)]">
              {localizedLayout.summary}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--specimen-ink-55)]">
              {localizedLayout.description}
            </p>
            <div className="mt-5">
              <CopyTextButton
                copiedLabel={t.promptCopied}
                idleLabel={t.copyPrompt}
                text={exportLayoutPrompt(localizedLayout)}
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoList title={t.bestFor} items={localizedLayout.bestFor} />
              <InfoList title={t.avoid} items={localizedLayout.notGoodFor} />
            </div>
          </div>

          <DetailCard title={t.structure} items={localizedLayout.structure} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <DetailCard title={t.responsive} items={localizedLayout.responsiveBehavior} />
          <DetailCard title={t.pros} items={localizedLayout.pros} />
          <DetailCard title={t.cons} items={localizedLayout.cons} />
          <DetailCard title={t.ux} items={uxNotes(localizedLayout, locale)} />
          <DetailCard title={t.accessibility} items={localizedLayout.accessibilityNotes} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <DetailCard title={t.wireframe} items={wireframeNotes(localizedLayout, locale)} />
            <DetailCard title={t.tips} items={localizedLayout.implementationTips} />
          </div>
          <LayoutCodeExample layout={layout} />
        </section>

        <div className="mt-10">
          <RelatedLayouts slugs={layout.related} />
        </div>
      </div>
    </main>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-[var(--specimen-line)] pt-4">
      <h2 className="raw-label text-[var(--specimen-ink)]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-[var(--specimen-ink-55)]" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="specimen-surface p-6">
      <h2 className="raw-label flex items-center gap-2 text-[var(--specimen-ink)]">
        <span className="specimen-bullet" aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 border-t border-[var(--specimen-line-soft)] pt-3 text-sm leading-6 text-[var(--specimen-ink-55)]" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--specimen-signal)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function uxNotes(layout: WebLayout, locale: Locale) {
  if (locale === "en") {
    return [
      "Decide the role of primary and supporting content before tuning screen density.",
      `In ${layout.nameKo}, repeat calls to action and navigation in predictable positions.`,
      "Confirm that reading order, interaction order, and visual priority stay intact on mobile.",
    ];
  }

  return [
    "핵심 콘텐츠와 보조 콘텐츠의 역할을 먼저 정하고 화면 밀도를 맞춥니다.",
    `${layout.nameKo}에서는 사용자가 다음 행동을 예측할 수 있도록 CTA와 탐색 요소를 반복되는 위치에 둡니다.`,
    "모바일 전환 후에도 읽기 순서, 조작 순서, 시각적 우선순위가 뒤바뀌지 않도록 확인합니다.",
  ];
}

function wireframeNotes(layout: WebLayout, locale: Locale) {
  if (locale === "en") {
    return [
      `This preview uses the ${layout.previewType} template, while each layout changes content and labels.`,
      "Turn on Show labels to reveal regions such as Header, Hero, Sidebar, Main, and CTA.",
      "Turn on Show grid to inspect columns and spacing, then use Dense content to test real content pressure.",
    ];
  }

  return [
    `이 프리뷰는 ${layout.previewType} 대표 템플릿을 사용하며, 같은 템플릿을 공유하는 레이아웃도 콘텐츠와 라벨이 달라집니다.`,
    "Show labels를 켜면 Header, Hero, Sidebar, Main, CTA 같은 영역 경계가 드러납니다.",
    "Show grid를 켜면 컬럼과 간격을 점검할 수 있고, Dense content는 실제 콘텐츠가 많아졌을 때의 내구성을 확인합니다.",
  ];
}
