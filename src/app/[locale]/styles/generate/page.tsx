export { metadata } from "../../../styles/generate/page";

import { notFound } from "next/navigation";
import { DesignStyleGeneratePageContent } from "../../../styles/generate/page-content";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedDesignStyleGeneratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <DesignStyleGeneratePageContent locale={locale} />;
}
