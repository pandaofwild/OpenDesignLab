import { getLayoutsBySlugs } from "@/data/webLayouts";
import { WebLayoutCard } from "@/components/web-layout/WebLayoutCard";

type RelatedLayoutsProps = {
  slugs: string[];
};

export function RelatedLayouts({ slugs }: RelatedLayoutsProps) {
  const layouts = getLayoutsBySlugs(slugs);

  if (layouts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-layouts-title" className="space-y-4">
      <div>
        <h2
          className="font-display text-6xl font-bold uppercase leading-[0.82] tracking-[-0.05em] text-[#1E1E1E]"
          id="related-layouts-title"
        >
          비슷한 레이아웃 추천
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#1E1E1E]/65">
          같은 previewType, 카테고리, 구현 난이도를 기준으로 가까운 구조를 추천합니다.
        </p>
      </div>
      <div className="grid gap-x-4 gap-y-16 md:grid-cols-3">
        {layouts.map((layout) => (
          <WebLayoutCard compact key={layout.slug} layout={layout} />
        ))}
      </div>
    </section>
  );
}
