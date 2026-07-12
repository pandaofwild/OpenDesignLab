import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { DesignStylesPageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Design Style Lab",
  description: "OpenDesignLab에서 레이아웃 예시에 적용할 디자인 형식과 색상표를 고릅니다.",
};

export default function DesignStylesPage() {
  return <DesignStylesPageContent locale={defaultLocale} />;
}
