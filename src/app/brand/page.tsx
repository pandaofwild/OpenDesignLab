import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { BrandPageContent } from "./page-content";

export const metadata: Metadata = {
  title: "Brand Sheet",
  description: "OpenDesignLab SPECIMEN brand direction.",
};

export default function BrandPage() {
  return <BrandPageContent locale={defaultLocale} />;
}
