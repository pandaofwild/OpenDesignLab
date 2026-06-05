import type { Metadata } from "next";
import Link from "next/link";
import { designStyleCategories, designStyles } from "@/data/designStyles";
import { DesignStyleLibrary } from "@/components/design-style/DesignStyleLibrary";

export const metadata: Metadata = {
  title: "Design Style Lab",
  description: "OpenDesignLab에서 레이아웃 예시에 적용할 디자인 형식과 색상표를 고릅니다.",
};

const categories = designStyleCategories;

export default function DesignStylesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-28 text-[#1E1E1E]">
      <section className="mx-auto max-w-[1720px] px-5 pb-14 pt-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="raw-label text-[#DB4A2B]">
              {designStyles.length} formats / {categories.length} categories
            </p>
            <h1 className="font-display mt-5 max-w-6xl text-[4.2rem] font-bold uppercase leading-[0.78] tracking-[-0.05em] sm:text-[6rem] md:text-[8rem] xl:text-[10rem]">
              Design
              <br />
              Styles
            </h1>
          </div>
          <div className="max-w-[21rem] sm:max-w-md">
            <p className="break-words text-base leading-7 text-[#1E1E1E]/72 [overflow-wrap:anywhere] sm:text-lg sm:leading-8">
              디자인 형식은 레이아웃 구조와 분리해 고릅니다. 여기서 시각 언어와
              색상표를 정하면 레이아웃 사전의 모든 예시 화면에 같은 톤이 적용됩니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center border border-[#1E1E1E] bg-[#1E1E1E] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition hover:bg-[#DB4A2B]"
                href="/layouts"
              >
                레이아웃으로 돌아가기
              </Link>
              <Link
                className="inline-flex h-11 items-center border border-[#1E1E1E]/25 px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#1E1E1E] transition hover:bg-[#F8A348]"
                href="/layouts/compare"
              >
                비교에서 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#1E1E1E]/18 bg-[#D9D6D0] px-5 py-8 lg:px-8">
        <div className="mx-auto grid max-w-[1720px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div className="border border-[#1E1E1E]/18 bg-[#E4E2DD] p-4" key={category}>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DB4A2B]">
                0{index + 1}
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em]">{category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1720px] px-5 py-12 lg:px-8">
        <DesignStyleLibrary />
      </section>
    </main>
  );
}
