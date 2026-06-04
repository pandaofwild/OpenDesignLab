"use client";

import { useMemo, useState } from "react";
import { ComponentPreviewRenderer } from "@/components/component-dictionary/ComponentPreviewRenderer";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { componentSpecs } from "@/data/componentSpecs";
import { designStyles } from "@/data/designStyles";

export function ComponentDictionaryView() {
  const [styleSlug, setStyleSlug] = useState("brutalism");
  const [componentSlug, setComponentSlug] = useState("button");

  const style = useMemo(
    () => designStyles.find((item) => item.slug === styleSlug) ?? designStyles[0],
    [styleSlug],
  );
  const component = useMemo(
    () => componentSpecs.find((item) => item.slug === componentSlug) ?? componentSpecs[0],
    [componentSlug],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-5">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Style
          <select
            className="h-11 border border-[#1E1E1E]/25 bg-background px-3 text-sm normal-case tracking-normal"
            onChange={(event) => setStyleSlug(event.target.value)}
            value={styleSlug}
          >
            {designStyles.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.nameKo}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Component
          <select
            className="h-11 border border-[#1E1E1E]/25 bg-background px-3 text-sm normal-case tracking-normal"
            onChange={(event) => setComponentSlug(event.target.value)}
            value={componentSlug}
          >
            {componentSpecs.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.nameKo}
              </option>
            ))}
          </select>
        </label>
      </aside>

      <section
        className="style-preset-root min-h-[420px] bg-[var(--st-base)] p-8 text-[var(--st-text)]"
        data-st-density={style.tokens.space.density}
        data-st-effect={style.tokens.decoration.effect}
        data-style-preset={style.slug}
        style={styleTokenVars(style)}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--st-accent)]">
          {style.nameKo} x {component.nameKo}
        </p>
        <div className="mt-10">
          <ComponentPreviewRenderer component={component} />
        </div>
        <p className="mt-10 max-w-xl text-sm leading-6 text-[rgb(var(--st-text-rgb)_/_0.68)]">
          {component.summary}
        </p>
      </section>
    </div>
  );
}
