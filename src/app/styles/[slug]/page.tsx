import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { designStyles, getDesignStyleBySlug } from "@/data/designStyles";
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleDetailSection } from "@/components/design-style/DesignStyleDetailSection";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { RelatedDesignStyles } from "@/components/design-style/RelatedDesignStyles";

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

  return (
    <main className="min-h-screen bg-background pt-28 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <Link className="raw-label text-[#DB4A2B] underline-offset-4 hover:underline" href="/styles">
          목록으로 돌아가기
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <p className="raw-label text-[#DB4A2B]">{style.category}</p>
            <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.8] tracking-[-0.05em] text-[#1E1E1E] md:text-8xl xl:text-9xl">
              {style.nameKo}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#1E1E1E]/58">{style.nameEn}</p>
            <p className="mt-6 max-w-[21rem] break-words text-base leading-7 text-[#1E1E1E]/72 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg sm:leading-8">
              {style.summary}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {style.tags.slice(0, 6).map((tag) => (
                <span
                  className="min-w-0 max-w-full break-all bg-[#F8A348]/24 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E1E1E]/70"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <DesignStyleSampleRenderer style={style} />
        </header>

        <section className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <DesignStyleDetailSection title="상세 설명">
            <p>{style.description}</p>
          </DesignStyleDetailSection>
          <DesignStyleDetailSection title="색상표">
            <ColorPaletteGrid palette={style.palette} />
          </DesignStyleDetailSection>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ListBlock items={style.visualFeatures} title="시각적 특징" />
          <ListBlock items={style.typography} title="타이포그래피" />
          <ListBlock items={style.layoutTraits} title="레이아웃 경향" />
          <ListBlock items={style.goodFor} title="어울리는 업종" />
          <ListBlock items={style.useCases} title="어울리는 페이지" />
          <ListBlock items={style.cautions} title="사용 시 주의점" />
        </section>

        <div className="mt-4">
          <DesignStyleDetailSection title="이미지 생성 프롬프트">
            <div className="mb-3 flex justify-end">
              <CopyTextButton
                copiedLabel="프롬프트 복사됨"
                idleLabel="프롬프트 복사"
                text={style.imagePrompt}
              />
            </div>
            <pre className="whitespace-pre-wrap bg-[#1E1E1E] p-4 font-mono text-xs leading-6 text-[#F8A348]">
              {style.imagePrompt}
            </pre>
          </DesignStyleDetailSection>
        </div>

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
          <li className="border-t border-[#1E1E1E]/14 pt-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </DesignStyleDetailSection>
  );
}
