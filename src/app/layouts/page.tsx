import type { Metadata } from "next";
import Link from "next/link";
import { webLayouts, previewTypes, webLayoutCategories } from "@/data/webLayouts";
import { AppliedStyleStrip } from "@/components/style-preset/AppliedStyleStrip";
import { WebLayoutExplorer } from "@/components/web-layout/WebLayoutExplorer";

export const metadata: Metadata = {
  title: "Layout Library",
  description: "OpenDesignLab에서 웹사이트 구조를 고르고 프리뷰와 프롬프트로 조합합니다.",
};

export default function WebLayoutsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-[#1E1E1E]">
      <section className="relative flex min-h-dvh items-end overflow-hidden px-5 pb-16 pt-28 lg:px-8">
        <div className="raw-atmosphere raw-atmosphere-red left-[-12vw] top-[8vh]" />
        <div className="raw-atmosphere raw-atmosphere-orange right-[-10vw] top-[24vh]" />
        <div className="raw-atmosphere raw-atmosphere-pink bottom-[-18vw] left-[32vw]" />

        <div className="relative z-10 mx-auto w-full max-w-[1720px]">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-end">
            <div className="min-w-0 lg:col-span-2">
              <p className="raw-label mb-6 text-[#DB4A2B]">
                96 layouts / 16 preview types
              </p>
              <h1 className="raw-display max-w-full text-[4.35rem] uppercase min-[420px]:text-[5.3rem] sm:text-[8rem] md:text-[12rem] xl:text-[14rem] 2xl:text-[15.5rem]">
                Open
                <br />
                <span className="ml-3 block sm:ml-8 md:ml-24 xl:ml-40">Design</span>
                <span className="block sm:ml-16 md:ml-48 xl:ml-72">Lab</span>
              </h1>
            </div>
            <div className="min-w-0 max-w-[20.5rem] pb-2 sm:max-w-md lg:col-start-2">
              <p className="text-lg leading-7 text-[#1E1E1E] sm:text-xl sm:leading-8">
                디자인 속성을 조합해 실제 화면처럼 비교하고, 바로 쓸 수 있는
                프롬프트와 구현 조건으로 바꾸는 디자인 랩입니다.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  className="raw-button inline-flex h-12 items-center border border-[#1E1E1E] bg-[#1E1E1E] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition-colors"
                  href="#layout-library"
                >
                  Explore layouts
                </Link>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#DB4A2B] transition hover:text-[#1E1E1E]"
                  href="/layouts/compare"
                >
                  Compare now
                  <ArrowUpRightIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 grid w-full min-w-0 gap-3 border-y border-[#1E1E1E]/25 py-4 sm:grid-cols-3">
            <Metric label="Layouts" value={webLayouts.length} />
            <Metric label="Categories" value={webLayoutCategories.length} />
            <Metric label="Templates" value={previewTypes.length} />
          </div>
        </div>
      </section>

      <section className="relative px-5 py-32 lg:px-8" id="preview-types">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(248,163,72,0.22),transparent_42%)]" />
        <div className="relative mx-auto max-w-[1720px]">
          <p className="raw-label text-[#DB4A2B]">Category divider</p>
          <h2 className="raw-display mt-5 max-w-6xl text-[4.1rem] uppercase opacity-90 sm:text-[5.5rem] md:text-[8rem] xl:text-[11rem]">
            Pick the
            <br />
            structure first
          </h2>
        </div>
      </section>

      <section
        className="bg-[#D9D6D0] px-5 py-24 lg:px-8"
        id="layout-skill"
      >
        <div className="mx-auto grid max-w-[1720px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[4rem] font-bold uppercase leading-[0.9] tracking-[-0.05em] sm:text-[5rem] md:text-[7rem] xl:text-[8.5rem]">
              For vibe
              <br />
              coding loops
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#1E1E1E]/75">
              목적을 한 줄로 말하고, 후보 레이아웃을 좁힌 뒤, 프리뷰를 보며
              코딩 에이전트에게 줄 구조 조건을 빠르게 정리합니다.
            </p>
          </div>
          <div className="space-y-0 lg:col-span-4">
            {[
              ["01", "Search by purpose"],
              ["02", "Open full-stage preview"],
              ["03", "Copy structure constraints"],
              ["04", "Ask the layout skill"],
            ].map(([index, label]) => (
              <Link
                className="flex items-center justify-between border-t border-[#1E1E1E]/20 py-5 text-sm font-bold uppercase tracking-[0.12em] transition hover:text-[#DB4A2B]"
                href={index === "04" ? "#layout-library" : "/layouts/compare"}
                key={index}
              >
                <span className="text-[#1E1E1E]/45">{index}</span>
                <span>{label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1E1E1E]/30">
                  <ArrowUpRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1720px] px-5 py-20 lg:px-8" id="layout-library">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="raw-label text-[#DB4A2B]">Product grid</p>
            <h2 className="font-display mt-3 max-w-4xl text-6xl font-bold uppercase leading-[0.8] tracking-[-0.05em] md:text-8xl">
              Layout library
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-[#1E1E1E]/68">
            필터를 좁히고 카드에서 구조를 고른 뒤, 상세 화면의 플로팅 설명으로
            구현 조건을 확인하세요.
          </p>
        </div>
        <div className="mb-10">
          <AppliedStyleStrip />
        </div>
        <WebLayoutExplorer />
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <p className="raw-label text-[#1E1E1E]/52">{label}</p>
      <p className="shrink-0 font-display text-5xl font-bold leading-none tracking-[-0.05em]">
        {value}
      </p>
    </div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
