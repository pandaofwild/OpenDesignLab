import type { Metadata } from "next";
import Link from "next/link";
import { WebLayoutCompare } from "@/components/web-layout/WebLayoutCompare";

export const metadata: Metadata = {
  title: "레이아웃 비교",
  description: "최대 3개의 웹 레이아웃을 큰 프리뷰와 좌우 화살표로 비교합니다.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-24 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-6 lg:px-8">
        <Link
          className="raw-label text-[#DB4A2B] underline-offset-4 hover:underline"
          href="/web-layouts"
        >
          목록으로 돌아가기
        </Link>
        <header className="mt-5 max-w-3xl">
          <h1 className="font-display text-6xl font-bold uppercase leading-[0.8] tracking-[-0.05em] text-[#1E1E1E] md:text-8xl">
            Compare
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#1E1E1E]/65">
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
