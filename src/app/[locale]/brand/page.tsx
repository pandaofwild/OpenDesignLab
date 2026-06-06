export { metadata } from "../../brand/page";

import { notFound } from "next/navigation";
import { BrandPageContent } from "../../brand/page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedBrandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BrandPageContent locale={locale} />;
}
