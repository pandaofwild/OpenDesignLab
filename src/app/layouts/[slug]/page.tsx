import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { webLayouts, getLayoutBySlug } from "@/data/webLayouts";
import { defaultLocale } from "@/lib/i18n";
import { LayoutDetailPageContent } from "./page-content";

type LayoutDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return webLayouts.map((layout) => ({ slug: layout.slug }));
}

export async function generateMetadata({
  params,
}: LayoutDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout) {
    return {
      title: "레이아웃을 찾을 수 없음",
    };
  }

  return {
    title: `${layout.nameKo} (${layout.nameEn})`,
    description: layout.summary,
  };
}

export default async function LayoutDetailPage({ params }: LayoutDetailPageProps) {
  const { slug } = await params;
  const layout = getLayoutBySlug(slug);

  if (!layout) {
    notFound();
  }

  return <LayoutDetailPageContent layout={layout} locale={defaultLocale} />;
}
