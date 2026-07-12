import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { DesignStyleGeneratePageContent } from "./page-content";

export const metadata: Metadata = {
  description: "디자인 형식별 참조 이미지를 OpenAI Image API로 생성하는 로컬 관리자 화면",
  title: "Design Style Image Generator",
};

export default function DesignStyleGeneratePage() {
  return <DesignStyleGeneratePageContent locale={defaultLocale} />;
}
