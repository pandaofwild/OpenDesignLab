import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { Badge } from "@/components/ui/badge";
import { LayoutCodeExample } from "@/components/web-layout/LayoutCodeExample";
import { LayoutStagePreview } from "@/components/web-layout/LayoutStagePreview";
import { RelatedLayouts } from "@/components/web-layout/RelatedLayouts";
import { webLayouts, getLayoutBySlug, type WebLayout } from "@/data/webLayouts";
import { exportLayoutPrompt } from "@/lib/exportPrompt";
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

  return (
    <main className="min-h-screen bg-background pt-24 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-10 lg:px-8">
        <Link
          className="raw-label text-[#DB4A2B] underline-offset-4 hover:underline"
          href="/layouts"
        >
          목록으로 돌아가기
        </Link>

        <section
          aria-label={`${layout.nameKo} 실제 웹 프리뷰`}
          className="relative mt-8 h-[calc(100vh-230px)] min-h-[560px] max-h-[760px] overflow-hidden bg-[#D9D6D0] ring-1 ring-[#1E1E1E]/20"
          data-testid="layout-stage"
        >
          <LayoutStagePreview layout={layout} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="bg-[#D9D6D0] p-6">
            <div className="flex flex-wrap gap-2">
              <Badge>{layout.category}</Badge>
              <Badge className={complexityTone(layout.complexity)}>
                {formatComplexity(layout.complexity)}
              </Badge>
              <Badge>{layout.previewType}</Badge>
            </div>
            <h1 className="font-display mt-6 text-5xl font-bold uppercase leading-[0.82] tracking-[-0.05em] text-[#1E1E1E]">
              {layout.nameKo}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#1E1E1E]/60">
              {layout.nameEn}
            </p>
            <p className="mt-6 text-base leading-7 text-[#1E1E1E]/80">
              {layout.summary}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#1E1E1E]/62">
              {layout.description}
            </p>
            <div className="mt-5">
              <CopyTextButton
                copiedLabel="프롬프트 복사됨"
                idleLabel="레이아웃 프롬프트 복사"
                text={exportLayoutPrompt(layout)}
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoList title="어울리는 페이지 유형" items={layout.bestFor} />
              <InfoList title="피해야 할 상황" items={layout.notGoodFor} />
            </div>
          </div>

          <DetailCard title="구조 설명" items={layout.structure} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <DetailCard title="반응형 동작 설명" items={layout.responsiveBehavior} />
          <DetailCard title="장점" items={layout.pros} />
          <DetailCard title="단점" items={layout.cons} />
          <DetailCard title="UX 관점에서 주의할 점" items={uxNotes(layout)} />
          <DetailCard title="접근성 체크포인트" items={layout.accessibilityNotes} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <DetailCard title="와이어프레임 해설" items={wireframeNotes(layout)} />
            <DetailCard title="구현 팁" items={layout.implementationTips} />
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
    <div className="border-t border-[#1E1E1E]/25 pt-4">
      <h2 className="raw-label text-[#1E1E1E]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-[#1E1E1E]/66" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-[#F0EEE8] p-6 ring-1 ring-[#1E1E1E]/12">
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[#1E1E1E]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-[#1E1E1E]/68" key={item}>
            <span className="mt-2 h-2 w-2 shrink-0 bg-[#DB4A2B]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function uxNotes(layout: WebLayout) {
  return [
    "핵심 콘텐츠와 보조 콘텐츠의 역할을 먼저 정하고 화면 밀도를 맞춥니다.",
    `${layout.nameKo}에서는 사용자가 다음 행동을 예측할 수 있도록 CTA와 탐색 요소를 반복되는 위치에 둡니다.`,
    "모바일 전환 후에도 읽기 순서, 조작 순서, 시각적 우선순위가 뒤바뀌지 않도록 확인합니다.",
  ];
}

function wireframeNotes(layout: WebLayout) {
  return [
    `이 프리뷰는 ${layout.previewType} 대표 템플릿을 사용하며, 같은 템플릿을 공유하는 레이아웃도 콘텐츠와 라벨이 달라집니다.`,
    "Show labels를 켜면 Header, Hero, Sidebar, Main, CTA 같은 영역 경계가 드러납니다.",
    "Show grid를 켜면 컬럼과 간격을 점검할 수 있고, Dense content는 실제 콘텐츠가 많아졌을 때의 내구성을 확인합니다.",
  ];
}
