import type { Metadata } from "next";
import Link from "next/link";
import { WebLayoutCompare } from "@/components/web-layout/WebLayoutCompare";

export const metadata: Metadata = {
  title: "레이아웃 비교",
  description: "최대 3개의 웹 레이아웃을 큰 프리뷰와 좌우 화살표로 비교합니다.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <Link
          className="text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          href="/web-layouts"
        >
          목록으로 돌아가기
        </Link>
        <header className="mt-5 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-normal text-zinc-950">
            레이아웃 비교
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            큰 프리뷰를 좌우로 넘기며 핵심 차이만 빠르게 확인합니다.
          </p>
        </header>
        <div className="mt-5">
          <WebLayoutCompare />
        </div>
      </div>
    </main>
  );
}
