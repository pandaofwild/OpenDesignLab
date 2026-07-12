import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { WebLayoutsPageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Layout Library",
  description: "OpenDesignLab에서 웹사이트 구조를 고르고 프리뷰와 프롬프트로 조합합니다.",
};

export default function WebLayoutsPage() {
  return <WebLayoutsPageContent locale={defaultLocale} />;
}
