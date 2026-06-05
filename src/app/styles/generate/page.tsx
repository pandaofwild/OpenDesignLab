import type { Metadata } from "next";
import Link from "next/link";
import { DesignStyleImageGenerator } from "@/components/design-style/DesignStyleImageGenerator";

export const metadata: Metadata = {
  description: "디자인 형식별 참조 이미지를 OpenAI Image API로 생성하는 로컬 관리자 화면",
  title: "Design Style Image Generator",
};

export default function DesignStyleGeneratePage() {
  return (
    <main className="min-h-screen bg-background pt-28 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <Link className="raw-label text-[#DB4A2B] underline-offset-4 hover:underline" href="/styles">
          디자인 형식 목록
        </Link>
        <header className="mt-8 max-w-5xl">
          <p className="raw-label text-[#DB4A2B]">Local admin</p>
          <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.8] tracking-[-0.05em] md:text-8xl">
            Generate
            <br />
            Style Images
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#1E1E1E]/68 sm:text-lg sm:leading-8">
            `OPENAI_API_KEY`가 설정된 로컬 환경에서 스타일별 참조 이미지를 생성하고
            `public/generated/design-styles`에 저장합니다.
          </p>
        </header>
        <section className="mt-10">
          <DesignStyleImageGenerator />
        </section>
      </div>
    </main>
  );
}
