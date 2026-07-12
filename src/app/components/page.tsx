import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { ComponentsPageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Components",
  description: "Preview UI components with design style tokens.",
};

export default function ComponentsPage() {
  return <ComponentsPageContent locale={defaultLocale} />;
}
