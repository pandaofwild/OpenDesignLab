import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { ComparePageContent } from "./page-content";

export const metadata: Metadata = {
  title: "레이아웃 비교",
  description: "최대 3개의 웹 레이아웃을 큰 프리뷰와 좌우 화살표로 비교합니다.",
};

export default function ComparePage() {
  return <ComparePageContent locale={defaultLocale} />;
}
