import type { Metadata } from "next";
import Link from "next/link";
import { WebLayoutCompare } from "@/components/web-layout/WebLayoutCompare";

export const metadata: Metadata = {
  title: "레이아웃 비교",
  description: "최대 3개의 웹 레이아웃을 추천 용도, 복잡도, 장단점 기준으로 비교합니다.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link
          className="text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          href="/web-layouts"
        >
          목록으로 돌아가기
        </Link>
        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-normal text-zinc-950">
            레이아웃 비교
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            선택한 레이아웃을 추천 용도, 복잡도, 장점과 단점, 모바일 대응,
            콘텐츠 밀도, 구현 난이도 기준으로 나란히 비교합니다.
          </p>
        </header>
        <div className="mt-8">
          <WebLayoutCompare />
        </div>
      </div>
    </main>
  );
}
