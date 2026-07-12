import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { getLayoutBySlug, webLayouts } from "@/data/webLayouts";
import { LayoutDetailPageContent } from "../../../layouts/[slug]/page-content";
import { isLocale } from "@/lib/i18n";
import { layoutForLocale } from "@/lib/localizedContent";

type LocalizedLayoutDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedLayoutDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout || !isLocale(locale)) {
    return {
      title: "Layout not found",
    };
  }

  const localizedLayout = layoutForLocale(layout, locale);

  return {
    title: `${localizedLayout.nameKo} (${localizedLayout.nameEn})`,
    description: localizedLayout.summary,
  };
}

export default async function LocalizedLayoutDetailPage({
  params,
}: LocalizedLayoutDetailPageProps) {
  const { locale, slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout || !isLocale(locale)) {
    notFound();
  }

  return <LayoutDetailPageContent layout={layout} locale={locale} />;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    webLayouts.map((layout) => ({
      locale,
      slug: layout.slug,
    })),
  );
}
