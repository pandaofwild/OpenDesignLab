"use client";

import { useMemo, useState } from "react";
import type { WebLayout } from "@/data/webLayouts";
import { Button } from "@/components/ui/button";

type LayoutCodeExampleProps = {
  layout: WebLayout;
};

function templateFor(layout: WebLayout) {
  const title = layout.nameKo;

  if (layout.previewType === "dashboard") {
    return `<section className="grid min-h-screen grid-cols-[240px_1fr] bg-zinc-50">
  <aside className="bg-zinc-950 p-6 text-white">Navigation</aside>
  <main className="space-y-6 p-8">
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">${title}</h1>
      <button className="rounded-md bg-zinc-950 px-4 py-2 text-white">New report</button>
    </header>
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <article className="rounded-lg border bg-white p-4" key={metric.label}>
          <p className="text-sm text-zinc-500">{metric.label}</p>
          <strong className="mt-2 block text-3xl">{metric.value}</strong>
        </article>
      ))}
    </div>
  </main>
</section>`;
  }

  if (layout.previewType === "comparison") {
    return `<section className="mx-auto max-w-6xl px-6 py-12">
  <h1 className="text-3xl font-bold">${title}</h1>
  <div className="mt-8 overflow-x-auto">
    <table className="w-full border-collapse rounded-lg border text-left">
      <caption className="sr-only">레이아웃 비교표</caption>
      <thead>
        <tr>{columns.map((column) => <th scope="col" className="border p-4" key={column}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className="border p-4 font-semibold">{row.label}</th>
            {row.values.map((value) => <td className="border p-4" key={value}>{value}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>`;
  }

  if (layout.previewType === "docs" || layout.previewType === "three-column") {
    return `<section className="grid grid-cols-[220px_minmax(0,1fr)_220px] gap-8 px-8 py-10">
  <nav aria-label="문서 목차" className="sticky top-6 self-start">...</nav>
  <main className="min-w-0">
    <h1 className="text-3xl font-bold">${title}</h1>
    <p className="mt-4 text-zinc-600">${layout.summary}</p>
  </main>
  <aside className="sticky top-6 self-start" aria-label="현재 페이지 섹션">...</aside>
</section>`;
  }

  if (layout.previewType === "card-grid" || layout.previewType === "bento-grid") {
    return `<section className="mx-auto max-w-7xl px-6 py-12">
  <header className="max-w-2xl">
    <h1 className="text-3xl font-bold">${title}</h1>
    <p className="mt-3 text-zinc-600">${layout.summary}</p>
  </header>
  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <article className="rounded-lg border bg-white p-5" key={item.id}>
        <div className="aspect-video rounded-md bg-zinc-100" />
        <h2 className="mt-4 font-semibold">{item.title}</h2>
        <p className="mt-2 text-sm text-zinc-600">{item.summary}</p>
      </article>
    ))}
  </div>
</section>`;
  }

  if (layout.previewType === "split-screen" || layout.previewType === "ecommerce-product") {
    return `<section className="grid min-h-[720px] lg:grid-cols-2">
  <div className="flex flex-col justify-center px-6 py-12 lg:px-14">
    <h1 className="text-4xl font-bold">${title}</h1>
    <p className="mt-4 max-w-lg text-zinc-600">${layout.summary}</p>
    <button className="mt-8 w-fit rounded-md bg-zinc-950 px-5 py-3 text-white">Primary action</button>
  </div>
  <div className="grid place-items-center bg-zinc-100 p-6">
    <div className="aspect-[4/3] w-full rounded-xl bg-white shadow-sm" />
  </div>
</section>`;
  }

  return `<main className="mx-auto max-w-3xl px-6 py-12">
  <header className="space-y-4">
    <h1 className="text-4xl font-bold tracking-tight">${title}</h1>
    <p className="text-lg leading-8 text-zinc-600">${layout.summary}</p>
  </header>
  <section className="mt-10 space-y-6">
    {sections.map((section) => (
      <article className="rounded-lg border bg-white p-6" key={section.title}>
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <p className="mt-3 text-zinc-600">{section.body}</p>
      </article>
    ))}
  </section>
</main>`;
}

export function LayoutCodeExample({ layout }: LayoutCodeExampleProps) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => templateFor(layout), [layout]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-white shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-normal">
            Tailwind 기반 예시 코드
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            구조를 시작하기 위한 복사 가능한 React/Tailwind 조각입니다.
          </p>
        </div>
        <Button
          className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          onClick={copyCode}
          variant="secondary"
        >
          {copied ? "복사됨" : "코드 복사"}
        </Button>
      </div>
      <pre className="max-h-[520px] overflow-auto rounded-md border border-zinc-800 bg-black p-4 text-sm leading-6 text-emerald-100">
        <code>{code}</code>
      </pre>
    </section>
  );
}
