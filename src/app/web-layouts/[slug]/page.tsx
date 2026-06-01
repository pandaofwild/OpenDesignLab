import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { LayoutCodeExample } from "@/components/web-layout/LayoutCodeExample";
import { LayoutPreview } from "@/components/web-layout/LayoutPreview";
import { RelatedLayouts } from "@/components/web-layout/RelatedLayouts";
import { webLayouts, getLayoutBySlug, type WebLayout } from "@/data/webLayouts";
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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link
          className="text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          href="/web-layouts"
        >
          목록으로 돌아가기
        </Link>

        <section className="mt-8 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <Badge>{layout.category}</Badge>
              <Badge className={complexityTone(layout.complexity)}>
                {formatComplexity(layout.complexity)}
              </Badge>
              <Badge>{layout.previewType}</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-normal text-zinc-950">
              {layout.nameKo}
            </h1>
            <p className="mt-2 text-lg font-medium text-zinc-500">
              {layout.nameEn}
            </p>
            <p className="mt-5 text-base leading-7 text-zinc-700">
              {layout.summary}
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              {layout.description}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoList title="어울리는 페이지 유형" items={layout.bestFor} />
              <InfoList title="피해야 할 상황" items={layout.notGoodFor} />
            </div>
          </div>

          <LayoutPreview layout={layout} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <DetailCard title="구조 설명" items={layout.structure} />
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
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
      <h2 className="text-sm font-semibold text-zinc-950">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-zinc-600" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-normal text-zinc-950">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-zinc-600" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
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
