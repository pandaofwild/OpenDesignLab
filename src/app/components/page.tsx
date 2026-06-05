import type { Metadata } from "next";
import { ComponentDictionaryView } from "@/components/component-dictionary/ComponentDictionaryView";

export const metadata: Metadata = {
  title: "Components",
  description: "Preview UI components with design style tokens.",
};

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-background pt-28 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <p className="raw-label text-[#DB4A2B]">Component Dictionary</p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-[-0.05em] md:text-7xl">
          Components
        </h1>
        <div className="mt-10">
          <ComponentDictionaryView />
        </div>
      </div>
    </main>
  );
}
