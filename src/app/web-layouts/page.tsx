import type { Metadata } from "next";
import Link from "next/link";
import { webLayouts, previewTypes, webLayoutCategories } from "@/data/webLayouts";
import { Badge } from "@/components/ui/badge";
import { WebLayoutExplorer } from "@/components/web-layout/WebLayoutExplorer";

export const metadata: Metadata = {
  title: "Web Layout Library",
  description: "웹사이트 설계에 활용할 수 있는 레이아웃 구조 사전",
};

export default function WebLayoutsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-normal text-zinc-950 md:text-6xl">
              Web Layout Library
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              웹사이트 설계에 활용할 수 있는 레이아웃 구조 사전
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              목록에서 레이아웃을 찾고, 상세 페이지에서 구조 설명과 반응형 동작,
              라이브 와이어프레임 프리뷰, Tailwind 구현 힌트를 함께 확인하세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge>{webLayouts.length} layouts</Badge>
              <Badge>{webLayoutCategories.length} categories</Badge>
              <Badge>{previewTypes.length} preview templates</Badge>
            </div>
            <div className="mt-8">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-950 bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href="/web-layouts/compare"
              >
                비교 페이지 열기
              </Link>
            </div>
          </div>
          <div className="grid gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 h-36 rounded-md bg-zinc-950" />
              <div className="h-36 rounded-md bg-emerald-300" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="h-24 rounded-md bg-white" />
              <div className="h-24 rounded-md bg-amber-200" />
              <div className="col-span-2 h-24 rounded-md bg-white" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-md bg-white" />
              <div className="h-20 rounded-md bg-rose-200" />
              <div className="h-20 rounded-md bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <WebLayoutExplorer />
      </section>
    </main>
  );
}
