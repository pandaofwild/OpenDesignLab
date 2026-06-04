# Design Dictionary Completion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the design dictionary by tightening the already-built token/studio foundation, completing remaining style-token coverage, and adding copy/component dictionary features.

**Architecture:** `DesignStyle.tokens` is the machine-applied source of truth. `StylePresetProvider` and `styleTokenVars()` emit `--st-*` CSS variables; renderers consume those variables. `/studio` combines a style and layout through URL query state, while `/styles`, `/layouts`, and future `/components` expose the dictionary axes.

**Tech Stack:** Modified Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, static TypeScript data, Node 22. Before editing framework routes or config, read the relevant guide in `node_modules/next/dist/docs/` because this project uses a modified Next.js.

**Design doc:** `docs/plans/2026-06-03-design-dictionary-design.md`

---

## Rebaseline Status

This plan was rebaselined on 2026-06-04 against the actual working tree on `codex/design-style-library`.

- [x] `npm run check:data` passes: 88 styles, 10 categories.
- [x] `npm run lint` passes.
- [x] `npm run build` passes and includes `/studio`, `/styles`, `/layouts`.
- [x] Working tree is clean.
- [x] Route restructure is already implemented: `/styles`, `/layouts`, redirects from `/design-styles` and `/web-layouts`.

## Milestone Checklist

- [x] **M1: Token foundation** — `StyleTokens`, category defaults, builder merge, `tokens.color`, data check, and 12 representative overrides exist.
- [x] **M2: Token CSS pipeline** — provider/hook/emitter/effects exist; spacing, padding, heading scale, gap, density, and border-style utilities are covered.
- [x] **M3: Layout renderer tokenized** — colors/type/shape/shadow plus spacing, padding, heading, density, and border-style tokens are consumed in previews.
- [x] **M4: Studio combine view** — `/studio` exists with style/layout selection, URL query sync, viewport toggle, and disabled copy buttons.
- [x] **M5: Route restructure** — `/styles` + `/layouts` canonical routes and redirects exist.
- [x] **M6: Fill all 88 styles** — all 88 styles have valid tokens and 24+ high-impact overrides are tracked with visual QA evidence.
- [x] **M7: Copy feature** — prompt and code copy from studio/detail pages.
- [x] **M8: Component dictionary** — `/components` route and tokenized component specs.

## Known Gaps To Fix First

- [x] `/studio` default layout slug is invalid: `DEFAULT_LAYOUT = "hero-layout"` but the real first hero slug is `hero-focused-layout`; dashboard query should use `dashboard-layout`, not `dashboard`.
- [x] `styleTokenVars()` does not emit `--st-border-style`, even though `StyleTokens.shape.borderStyle` exists.
- [x] `.st-pad` does not exist in `globals.css`.
- [x] `--st-gap`, `--st-pad-scale`, and `--st-heading-scale` are emitted but barely consumed.
- [x] `styleTokenOverrides` covers 12 representative styles only; the rest mostly inherit category defaults.
- [x] `docs/plans/2026-06-03-design-dictionary.md` used to show everything unchecked; this rebaseline is now the source of truth.

---

## File Structure For Remaining Work

### Existing Files To Modify

- `src/components/studio/StudioView.tsx`
  - Normalize invalid query slugs, fix defaults, and wire copy buttons.
- `src/components/style-preset/styleTokenVars.ts`
  - Emit any missing `--st-*` variables.
- `src/app/globals.css`
  - Add missing token utilities and make spacing/density utilities usable.
- `src/components/web-layout/LayoutPreviewRenderer.tsx`
  - Consume spacing/padding/heading/border-style tokens more consistently.
- `src/components/design-style/DesignStyleSampleRenderer.tsx`
  - Keep sample cards aligned with token behavior after utility changes.
- `src/data/designStyles.ts`
  - Add remaining per-style token overrides in category batches.
- `scripts/check-data.mjs`
  - Add stricter assertions for token completeness and export/copy assumptions.
- `README.md`
  - Update the route table and feature bullets in the documentation task after `/studio` copy and `/components` are implemented.

### New Files To Create

- `src/lib/exportPrompt.ts`
  - Compose a prompt from selected style + layout + tokens.
- `src/lib/exportCode.ts`
  - Generate a self-contained HTML snippet using inline `--st-*` variables.
- `src/data/componentSpecs.ts`
  - Define component dictionary data.
- `src/components/component-dictionary/ComponentDictionaryView.tsx`
  - Client picker for style + component.
- `src/components/component-dictionary/ComponentPreviewRenderer.tsx`
  - Tokenized previews for button/card/nav/input/badge.
- `src/app/components/page.tsx`
  - Component dictionary route.

---

## Task 1: Studio Query And Default Cleanup

**Files:**
- Modify: `src/components/studio/StudioView.tsx`
- Verify: `src/data/webLayouts.ts`

- [x] **Step 1: Replace invalid default slug**

Set the studio default layout to a real slug:

```ts
const DEFAULT_STYLE = "brutalism";
const DEFAULT_LAYOUT = "hero-focused-layout";
```

- [x] **Step 2: Normalize query-derived selections**

Replace the current selection block with a normalized slug flow:

```ts
const requestedStyleSlug = params.get("style") ?? DEFAULT_STYLE;
const requestedLayoutSlug = params.get("layout") ?? DEFAULT_LAYOUT;
const viewport = (params.get("vp") === "mobile" ? "mobile" : "desktop") as PreviewViewport;

const selectedStyle = useMemo(
  () => designStyles.find((s) => s.slug === requestedStyleSlug) ?? designStyles.find((s) => s.slug === DEFAULT_STYLE) ?? designStyles[0],
  [requestedStyleSlug],
);

const selectedLayout = useMemo(
  () => webLayouts.find((l) => l.slug === requestedLayoutSlug) ?? webLayouts.find((l) => l.slug === DEFAULT_LAYOUT) ?? webLayouts[0],
  [requestedLayoutSlug],
);

const selectedStyleSlug = selectedStyle.slug;
const selectedLayoutSlug = selectedLayout.slug;
```

- [x] **Step 3: Fix URL self-healing**

Add an effect after selections are computed:

```ts
useEffect(() => {
  const next = new URLSearchParams(params.toString());
  let changed = false;

  if (next.get("style") !== selectedStyleSlug) {
    next.set("style", selectedStyleSlug);
    changed = true;
  }

  if (next.get("layout") !== selectedLayoutSlug) {
    next.set("layout", selectedLayoutSlug);
    changed = true;
  }

  if (next.get("vp") !== viewport) {
    next.set("vp", viewport);
    changed = true;
  }

  if (changed) router.replace(`/studio?${next.toString()}`);
}, [params, router, selectedLayoutSlug, selectedStyleSlug, viewport]);
```

Also update the React import:

```ts
import { Suspense, useEffect, useMemo } from "react";
```

- [x] **Step 4: Verify**

Run:

```powershell
npm run lint
npm run build
```

Expected:

```text
Route (app)
├ ○ /studio
```

- [x] **Step 5: Commit**

```powershell
git add src/components/studio/StudioView.tsx
git commit -m "Fix studio query defaults and selection normalization"
```

---

## Task 2: Complete Token CSS Variable Coverage

**Files:**
- Modify: `src/components/style-preset/styleTokenVars.ts`
- Modify: `src/app/globals.css`
- Modify: `scripts/check-data.mjs`

- [x] **Step 1: Emit border style**

Add this variable in `styleTokenVars()` under shape tokens:

```ts
"--st-border-style": shape.borderStyle,
```

- [x] **Step 2: Add missing utility classes**

Add these utilities to `src/app/globals.css` near the existing style token utility section:

```css
.st-pad {
  padding: calc(1rem * var(--st-pad-scale, 1));
}

.st-gap {
  gap: var(--st-gap, 0.75rem);
}

.st-border {
  border-width: var(--st-border-width, 1px);
  border-style: var(--st-border-style, solid);
  border-color: rgb(var(--st-border-rgb, 30 30 30) / 0.22);
}

.st-display {
  font-size: calc(1em * var(--st-heading-scale, 1));
}
```

If `.st-display` already exists, merge the `font-size` line into the existing rule instead of creating a duplicate selector.

- [x] **Step 3: Keep density modifiers but bind them to real tokens**

Replace the current density block with:

```css
[data-st-density="tight"] .raw-preview-canvas,
[data-st-density="tight"] .raw-wireframe {
  --internal-gap-scale: 0.7;
}

[data-st-density="airy"] .raw-preview-canvas,
[data-st-density="airy"] .raw-wireframe {
  --internal-gap-scale: 1.3;
}

.raw-preview-canvas .st-density-gap,
.raw-wireframe .st-density-gap {
  gap: calc(var(--internal-gap-scale, 1) * 1rem);
}
```

- [x] **Step 4: Strengthen data check**

In `scripts/check-data.mjs`, add assertions inside the existing `for (const s of designStyles)` loop:

```js
assert(["solid","dashed","double"].includes(s.tokens.shape.borderStyle), `style ${s.slug} bad borderStyle`);
assert(typeof s.tokens.space.gap === "string" && s.tokens.space.gap.length > 0, `style ${s.slug} missing space.gap`);
assert(typeof s.tokens.space.padScale === "number", `style ${s.slug} bad padScale`);
assert(typeof s.tokens.typography.headingScale === "number", `style ${s.slug} bad headingScale`);
```

- [x] **Step 5: Verify**

Run:

```powershell
npm run check:data
npm run lint
npm run build
```

Expected:

```text
data check passed: 88 styles, 10 categories
```

- [x] **Step 6: Commit**

```powershell
git add src/components/style-preset/styleTokenVars.ts src/app/globals.css scripts/check-data.mjs
git commit -m "Complete style token variable and utility coverage"
```

---

## Task 3: Apply Spacing, Padding, Heading, And Border-Style Tokens In Renderers

**Files:**
- Modify: `src/components/web-layout/LayoutPreviewRenderer.tsx`
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [x] **Step 1: Add token helper classes to renderer primitives**

In `LayoutPreviewRenderer.tsx`, update shared primitives so repeated regions inherit spacing and border style:

```tsx
className={cn(
  "min-w-0 max-w-full st-border st-density-gap bg-[rgb(var(--st-surface-rgb)_/_0.72)]",
  className,
)}
```

Use this on the `Region`/`AnnotatedRegion` wrapper where the file currently repeats `border border-[rgb(var(--st-border-rgb)_/_0.18)]`.

- [x] **Step 2: Apply `st-pad` to repeated surface containers**

For repeated preview panels/cards, replace hardcoded `p-4` or `p-3` where safe with:

```tsx
className="st-pad ..."
```

Keep compact-only padding classes when needed for thumbnail fit, but make the large preview path read `--st-pad-scale`.

- [x] **Step 3: Apply `st-display` to headings**

For heading helper output, include:

```tsx
className={cn("st-display break-words uppercase leading-none", className)}
```

Remove duplicate inline `fontFamily`, `fontWeight`, and `letterSpacing` only where `.st-display` fully covers the same behavior.

- [x] **Step 4: Keep design-style samples compatible**

In `DesignStyleSampleRenderer.tsx`, preserve the existing `--sample-*` variables for older sample-specific colors, but add `st-display`, `st-border`, or `st-pad` to reusable sample cards where those classes do not break compact thumbnails.

- [x] **Step 5: Verify visual token difference**

Run:

```powershell
npm run lint
npm run build
```

Then visually check these URLs:

```text
http://localhost:3000/studio?style=brutalism&layout=dashboard-layout
http://localhost:3000/studio?style=luxury&layout=dashboard-layout
http://localhost:3000/studio?style=cyberpunk&layout=dashboard-layout
```

Expected differences:

- `brutalism`: hard borders, heavy title weight, tight density, hard shadow.
- `luxury`: serif display, airy spacing, thin borders, restrained/no shadow.
- `cyberpunk`: mono body, glow shadow, neon contrast.

- [x] **Step 6: Commit**

```powershell
git add src/components/web-layout/LayoutPreviewRenderer.tsx src/components/design-style/DesignStyleSampleRenderer.tsx
git commit -m "Apply spacing and typography tokens across previews"
```

---

## Task 4: Refine Remaining Style Tokens In Category Batches

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/check-data.mjs`

- [x] **Step 1: Add an override coverage list to data check**

Because `styleTokenOverrides` is local to `designStyles.ts`, add an exported coverage marker near the overrides:

```ts
export const tunedStyleTokenSlugs = Object.keys(styleTokenOverrides).sort();
```

Then import it in `scripts/check-data.mjs`:

```js
import { designStyles, designStyleCategories, tunedStyleTokenSlugs } from "../src/data/designStyles.ts";
```

Add:

```js
assert(tunedStyleTokenSlugs.length >= 24, `expected at least 24 tuned style token overrides, got ${tunedStyleTokenSlugs.length}`);
for (const slug of tunedStyleTokenSlugs) {
  assert(slugSet.has(slug), `tuned style slug "${slug}" does not exist`);
}
```

This creates a concrete first target without pretending all 88 are fully hand-tuned in one pass.

- [x] **Step 2: Tune 12 additional high-impact styles**

Add overrides for these slugs in `styleTokenOverrides`:

```text
modernism
warm-minimal
new-brutalism
glitch-art
retro-futurism
neon-noir
old-money
wabi-sabi
dopamine-design
graffiti
posterism
neumorphism
```

Each override must change at least two non-color groups among `typography`, `shape`, `space`, `decoration`, `layout`.

- [x] **Step 3: Verify the new coverage target**

Run:

```powershell
npm run check:data
npm run lint
npm run build
```

Expected:

```text
data check passed: 88 styles, 10 categories
```

- [x] **Step 4: Visual QA**

Open `/styles` and scan one category at a time. Record notes in the progress log for:

```text
모던 / 미니멀
강렬 / 실험
레트로 / 빈티지
미래 / 디지털
럭셔리 / 클래식
자연 / 수공예
귀여움 / 캐주얼
스트리트 / 서브컬처
편집 / 타이포그래피
UI / 웹
```

Expected:

- Category-level visual language is distinct.
- The 24 tuned styles have visible differences beyond color.
- No horizontal overflow at 390px.

- [x] **Step 5: Commit**

```powershell
git add src/data/designStyles.ts scripts/check-data.mjs
git commit -m "Tune additional style tokens and track override coverage"
```

---

## Task 5: Prompt Copy Feature

**Files:**
- Create: `src/lib/exportPrompt.ts`
- Modify: `src/components/studio/StudioView.tsx`

- [x] **Step 1: Create prompt exporter**

Create `src/lib/exportPrompt.ts`:

```ts
import type { DesignStyle } from "@/data/designStyles";
import type { WebLayout } from "@/data/webLayouts";

export function exportDesignPrompt(style: DesignStyle, layout: WebLayout) {
  const tokens = style.tokens;

  return [
    `Create a high-quality webpage design reference for ${style.nameEn} (${style.nameKo}) using a ${layout.nameEn}.`,
    `Visual style: ${style.summary}`,
    `Layout structure: ${layout.summary}`,
    `Preview type: ${layout.previewType}.`,
    `Color system: base ${tokens.color.base}, surface ${tokens.color.surface}, text ${tokens.color.text}, primary ${tokens.color.primary}, accent ${tokens.color.accent}.`,
    `Typography: display font ${tokens.typography.displayFont}, body font ${tokens.typography.bodyFont}, display weight ${tokens.typography.weightDisplay}, tracking ${tokens.typography.tracking}.`,
    `Shape and spacing: radius ${tokens.shape.radius}, border ${tokens.shape.borderWidth} ${tokens.shape.borderStyle}, density ${tokens.space.density}, gap ${tokens.space.gap}.`,
    `Decoration: shadow ${tokens.decoration.shadow}, effect ${tokens.decoration.effect}.`,
    `Use cases: ${style.useCases.join(", ")}.`,
    `Avoid: ${style.cautions.join(", ")}.`,
    "Return a polished webpage composition, no logo, no watermark, production-ready visual hierarchy.",
  ].join("\n");
}

export function exportLayoutPrompt(layout: WebLayout) {
  return [
    `Create a production-ready webpage using a ${layout.nameEn} (${layout.nameKo}).`,
    `Layout summary: ${layout.summary}`,
    `Preview type: ${layout.previewType}.`,
    `Structure: ${layout.structure.join(", ")}.`,
    `Responsive behavior: ${layout.responsiveBehavior.join(", ")}.`,
    `Best for: ${layout.bestFor.join(", ")}.`,
    `Avoid: ${layout.notGoodFor.join(", ")}.`,
    "Keep the hierarchy clear, responsive, accessible, and suitable for a design dictionary reference.",
  ].join("\n");
}
```

- [x] **Step 2: Add clipboard state in Studio**

In `StudioView.tsx`, import `useState` and the exporter:

```ts
import { Suspense, useEffect, useMemo, useState } from "react";
import { exportDesignPrompt } from "@/lib/exportPrompt";
```

Add state and handler inside `StudioViewInner()`:

```ts
const [copied, setCopied] = useState<"code" | "prompt" | null>(null);

async function copyPrompt() {
  await navigator.clipboard.writeText(exportDesignPrompt(selectedStyle, selectedLayout));
  setCopied("prompt");
  window.setTimeout(() => setCopied(null), 1400);
}
```

- [x] **Step 3: Enable the prompt button**

Replace the disabled prompt button with:

```tsx
<button
  className="h-10 w-full border border-[#1E1E1E]/25 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
  onClick={copyPrompt}
  type="button"
>
  {copied === "prompt" ? "프롬프트 복사됨" : "프롬프트 복사"}
</button>
```

- [x] **Step 4: Detail pages**

For this task, add prompt copy only to `/studio`. Detail pages are completed in Task 7 with a reusable copy button.

- [x] **Step 5: Verify**

Run:

```powershell
npm run lint
npm run build
```

Manual check:

```text
/studio?style=cyberpunk&layout=dashboard-layout
```

Click `프롬프트 복사`; expected button text changes to `프롬프트 복사됨`.

- [x] **Step 6: Commit**

```powershell
git add src/lib/exportPrompt.ts src/components/studio/StudioView.tsx
git commit -m "Add prompt copy export for studio combinations"
```

---

## Task 6: Code Copy Feature

**Files:**
- Create: `src/lib/exportCode.ts`
- Modify: `src/components/studio/StudioView.tsx`

- [x] **Step 1: Create code exporter**

Create `src/lib/exportCode.ts`:

```ts
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import type { DesignStyle } from "@/data/designStyles";
import type { WebLayout } from "@/data/webLayouts";

function cssVars(style: DesignStyle) {
  return Object.entries(styleTokenVars(style))
    .map(([key, value]) => `  ${key}: ${String(value)};`)
    .join("\n");
}

export function exportDesignCode(style: DesignStyle, layout: WebLayout) {
  return `<!-- ${style.nameKo} x ${layout.nameKo} -->
<section class="openlayout-export" style="
${cssVars(style)}
">
  <header class="openlayout-nav">
    <strong>${style.nameEn}</strong>
    <nav>${layout.nameEn}</nav>
  </header>
  <main class="openlayout-hero">
    <p class="openlayout-kicker">${layout.previewType}</p>
    <h1>${layout.nameKo}</h1>
    <p>${layout.summary}</p>
    <button>Primary action</button>
  </main>
</section>

<style>
.openlayout-export {
  min-height: 100vh;
  padding: calc(2rem * var(--st-pad-scale, 1));
  background: var(--st-base);
  color: var(--st-text);
  font-family: var(--st-font-body);
}
.openlayout-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--st-gap);
  border: var(--st-border-width) var(--st-border-style, solid) rgb(var(--st-border-rgb) / 0.22);
  border-radius: var(--st-radius);
  padding: 1rem;
}
.openlayout-hero {
  display: grid;
  gap: var(--st-gap);
  max-width: 760px;
  margin-top: 4rem;
}
.openlayout-kicker {
  color: var(--st-accent);
  font-weight: 800;
  text-transform: uppercase;
}
.openlayout-hero h1 {
  font-family: var(--st-font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: var(--st-tracking);
  font-weight: var(--st-weight-display);
}
.openlayout-hero button {
  width: max-content;
  border: var(--st-border-width) var(--st-border-style, solid) var(--st-primary);
  border-radius: var(--st-radius-pill, var(--st-radius));
  background: var(--st-primary);
  color: var(--st-surface);
  padding: 0.85rem 1.1rem;
  box-shadow: var(--st-shadow);
}
</style>`;
}
```

- [x] **Step 2: Wire code copy in Studio**

Import:

```ts
import { exportDesignCode } from "@/lib/exportCode";
```

Add handler:

```ts
async function copyCode() {
  await navigator.clipboard.writeText(exportDesignCode(selectedStyle, selectedLayout));
  setCopied("code");
  window.setTimeout(() => setCopied(null), 1400);
}
```

Replace the disabled code button:

```tsx
<button
  className="h-10 w-full border border-[#1E1E1E]/25 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
  onClick={copyCode}
  type="button"
>
  {copied === "code" ? "코드 복사됨" : "코드 복사"}
</button>
```

- [x] **Step 3: Verify**

Run:

```powershell
npm run lint
npm run build
```

Manual check:

```text
/studio?style=luxury&layout=product-demo-layout
```

Click `코드 복사`; expected button text changes to `코드 복사됨`.

- [x] **Step 4: Commit**

```powershell
git add src/lib/exportCode.ts src/components/studio/StudioView.tsx
git commit -m "Add code copy export for studio combinations"
```

---

## Task 7: Detail Page Copy Buttons And README Update

**Files:**
- Create: `src/components/export/CopyTextButton.tsx`
- Modify: `src/app/styles/[slug]/page.tsx`
- Modify: `src/app/layouts/[slug]/page.tsx`
- Modify: `README.md`

- [x] **Step 1: Create reusable copy button**

Create `src/components/export/CopyTextButton.tsx`:

```tsx
"use client";

import { useState } from "react";

type CopyTextButtonProps = {
  copiedLabel: string;
  idleLabel: string;
  text: string;
};

export function CopyTextButton({ copiedLabel, idleLabel, text }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="border border-[#1E1E1E]/25 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
      onClick={copy}
      type="button"
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
```

- [x] **Step 2: Add style prompt copy to style detail page**

In `src/app/styles/[slug]/page.tsx`, import:

```ts
import { CopyTextButton } from "@/components/export/CopyTextButton";
```

Inside the `이미지 생성 프롬프트` section, place the button above the `pre`:

```tsx
<div className="mb-3 flex justify-end">
  <CopyTextButton
    copiedLabel="프롬프트 복사됨"
    idleLabel="프롬프트 복사"
    text={style.imagePrompt}
  />
</div>
```

- [x] **Step 3: Add layout prompt copy to layout detail page**

In `src/app/layouts/[slug]/page.tsx`, import:

```ts
import { CopyTextButton } from "@/components/export/CopyTextButton";
import { exportLayoutPrompt } from "@/lib/exportPrompt";
```

In the sidebar info block after `layout.description`, add:

```tsx
<div className="mt-5">
  <CopyTextButton
    copiedLabel="프롬프트 복사됨"
    idleLabel="레이아웃 프롬프트 복사"
    text={exportLayoutPrompt(layout)}
  />
</div>
```

Keep the existing `LayoutCodeExample` component in place; it already provides code copy on layout detail pages.

- [x] **Step 4: Update README route table**

In `README.md`, update the route table so it includes:

```markdown
| `/studio` | 디자인 스타일과 레이아웃을 조합해 실제 웹 프리뷰를 보고 코드/프롬프트를 복사 |
| `/components` | 디자인 스타일 토큰을 버튼, 카드, 내비게이션, 입력 필드, 배지에 적용해 비교 |
```

Also update the feature list near the top to mention:

```markdown
- **Studio copy**: `/studio`에서 선택한 Style x Layout 조합의 프롬프트와 self-contained HTML/CSS 코드를 복사할 수 있습니다.
- **Component dictionary**: `/components`에서 같은 스타일 토큰이 주요 UI 컴포넌트에 어떻게 적용되는지 확인할 수 있습니다.
```

- [x] **Step 5: Verify**

Run:

```powershell
npm run lint
npm run build
```

Manual checks:

```text
/styles/cyberpunk
/layouts/dashboard-layout
```

Expected:

- Style detail page copies `style.imagePrompt`.
- Layout detail page copies `exportLayoutPrompt(layout)`.
- Existing layout code copy still works.

- [x] **Step 6: Commit**

```powershell
git add src/components/export/CopyTextButton.tsx src/app/styles/[slug]/page.tsx src/app/layouts/[slug]/page.tsx README.md
git commit -m "Add copy actions to detail pages"
```

---

## Task 8: Component Dictionary MVP

**Files:**
- Create: `src/data/componentSpecs.ts`
- Create: `src/components/component-dictionary/ComponentPreviewRenderer.tsx`
- Create: `src/components/component-dictionary/ComponentDictionaryView.tsx`
- Create: `src/app/components/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `README.md`

- [x] **Step 1: Create component specs**

Create `src/data/componentSpecs.ts`:

```ts
export type ComponentSpecType = "button" | "card" | "nav" | "input" | "badge";

export type ComponentSpec = {
  slug: string;
  nameKo: string;
  nameEn: string;
  type: ComponentSpecType;
  summary: string;
};

export const componentSpecs: ComponentSpec[] = [
  { slug: "button", nameKo: "버튼", nameEn: "Button", type: "button", summary: "주요 행동을 유도하는 클릭 요소입니다." },
  { slug: "card", nameKo: "카드", nameEn: "Card", type: "card", summary: "반복 콘텐츠를 묶어 비교 가능하게 보여줍니다." },
  { slug: "nav", nameKo: "내비게이션", nameEn: "Navigation", type: "nav", summary: "페이지 이동과 현재 구조를 보여줍니다." },
  { slug: "input", nameKo: "입력 필드", nameEn: "Input", type: "input", summary: "검색과 폼 입력을 받는 기본 컨트롤입니다." },
  { slug: "badge", nameKo: "배지", nameEn: "Badge", type: "badge", summary: "상태, 카테고리, 짧은 메타 정보를 표시합니다." },
];
```

- [x] **Step 2: Create tokenized renderer**

Create `src/components/component-dictionary/ComponentPreviewRenderer.tsx`:

```tsx
import type { ComponentSpec } from "@/data/componentSpecs";

export function ComponentPreviewRenderer({ component }: { component: ComponentSpec }) {
  if (component.type === "button") {
    return <button className="st-border bg-[var(--st-primary)] px-5 py-3 text-sm font-bold text-[var(--st-surface)]" style={{ borderRadius: "var(--st-radius-pill)", boxShadow: "var(--st-shadow)" }}>Primary action</button>;
  }

  if (component.type === "card") {
    return <article className="st-card st-pad max-w-sm"><p className="st-display text-3xl uppercase leading-none">Card title</p><p className="mt-3 text-sm text-[rgb(var(--st-text-rgb)_/_0.68)]">A reusable surface that follows the selected style tokens.</p></article>;
  }

  if (component.type === "nav") {
    return <nav className="st-border flex flex-wrap items-center gap-3 bg-[rgb(var(--st-surface-rgb)_/_0.78)] p-3" style={{ borderRadius: "var(--st-radius)" }}><strong className="st-display">Brand</strong><span>Work</span><span>System</span><span>Contact</span></nav>;
  }

  if (component.type === "input") {
    return <label className="grid max-w-sm gap-2 text-sm font-bold"><span>Search</span><input className="st-border bg-[var(--st-surface)] px-3 py-3 text-[var(--st-text)] outline-none" placeholder="Type a style..." style={{ borderRadius: "var(--st-radius)" }} /></label>;
  }

  return <span className="st-border inline-flex bg-[rgb(var(--st-accent-rgb)_/_0.18)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--st-accent)]" style={{ borderRadius: "var(--st-radius-pill)" }}>Status badge</span>;
}
```

- [x] **Step 3: Create client view**

Create `src/components/component-dictionary/ComponentDictionaryView.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { ComponentPreviewRenderer } from "@/components/component-dictionary/ComponentPreviewRenderer";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { componentSpecs } from "@/data/componentSpecs";
import { designStyles } from "@/data/designStyles";

export function ComponentDictionaryView() {
  const [styleSlug, setStyleSlug] = useState("brutalism");
  const [componentSlug, setComponentSlug] = useState("button");

  const style = useMemo(() => designStyles.find((item) => item.slug === styleSlug) ?? designStyles[0], [styleSlug]);
  const component = useMemo(() => componentSpecs.find((item) => item.slug === componentSlug) ?? componentSpecs[0], [componentSlug]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-5">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Style
          <select className="h-11 border border-[#1E1E1E]/25 bg-background px-3 text-sm normal-case tracking-normal" onChange={(event) => setStyleSlug(event.target.value)} value={styleSlug}>
            {designStyles.map((item) => <option key={item.slug} value={item.slug}>{item.nameKo}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Component
          <select className="h-11 border border-[#1E1E1E]/25 bg-background px-3 text-sm normal-case tracking-normal" onChange={(event) => setComponentSlug(event.target.value)} value={componentSlug}>
            {componentSpecs.map((item) => <option key={item.slug} value={item.slug}>{item.nameKo}</option>)}
          </select>
        </label>
      </aside>
      <section className="style-preset-root min-h-[420px] bg-[var(--st-base)] p-8 text-[var(--st-text)]" data-st-effect={style.tokens.decoration.effect} style={styleTokenVars(style)}>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--st-accent)]">{style.nameKo} x {component.nameKo}</p>
        <div className="mt-10">
          <ComponentPreviewRenderer component={component} />
        </div>
        <p className="mt-10 max-w-xl text-sm leading-6 text-[rgb(var(--st-text-rgb)_/_0.68)]">{component.summary}</p>
      </section>
    </div>
  );
}
```

- [x] **Step 4: Create route**

Create `src/app/components/page.tsx`:

```tsx
import type { Metadata } from "next";
import { ComponentDictionaryView } from "@/components/component-dictionary/ComponentDictionaryView";

export const metadata: Metadata = {
  title: "Components | openlayout",
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
```

- [x] **Step 5: Add nav link**

In `src/app/layout.tsx`, add `["Components", "/components"]` to the desktop and mobile nav lists near `Studio`.

- [x] **Step 6: Verify**

Run:

```powershell
npm run lint
npm run build
```

Expected build output includes:

```text
├ ○ /components
```

Manual visual check:

```text
/components
```

Expected:

- Changing style updates component color/type/shape/shadow.
- Button/card/nav/input/badge all render without overflow at 390px.

- [x] **Step 7: Commit**

```powershell
git add src/data/componentSpecs.ts src/components/component-dictionary src/app/components/page.tsx src/app/layout.tsx README.md
git commit -m "Add tokenized component dictionary MVP"
```

---

## Task 9: Final Verification And Plan Closeout

**Files:**
- Modify: `docs/plans/2026-06-03-design-dictionary.md`

- [x] **Step 1: Run full gate**

```powershell
npm run check:data
npm run lint
npm run build
```

Expected:

```text
data check passed: 88 styles, 10 categories
```

and build route output includes:

```text
├ ○ /components
├ ○ /studio
├ ○ /styles
├ ○ /layouts
```

- [x] **Step 2: Manual route checks**

Check:

```text
/studio?style=cyberpunk&layout=dashboard-layout
/studio?style=luxury&layout=product-demo-layout
/styles
/layouts
/components
/web-layouts
/design-styles
```

Expected:

- Studio renders selected combo and normalizes invalid slugs.
- Copy buttons work.
- Old URLs redirect to canonical routes.
- No horizontal overflow at 390px on `/studio` and `/components`.

- [x] **Step 3: Update progress log**

Add a dated progress log entry at the bottom of this file summarizing completed tasks and verification commands.

- [x] **Step 4: Commit**

```powershell
git add docs/plans/2026-06-03-design-dictionary.md
git commit -m "Close out design dictionary completion plan"
```

---

## Progress Log

- [x] 2026-06-03: Original plan created from approved design doc.
- [x] 2026-06-04: Rebaselined plan against actual code. Confirmed `npm run check:data`, `npm run lint`, and `npm run build` pass. Current implementation is effectively through M5, with M2/M3/M6 refinements and M7/M8 remaining.
- [x] 2026-06-04: Task 4 visual QA checked `/styles`: 88 cards rendered on desktop, 390px mobile had no horizontal overflow, screenshots saved under `.next/codex-screens/styles-token-qa`.
- [x] 2026-06-04: Tasks 5-8 completed: `/studio` prompt/code copy, detail-page copy buttons, README route updates, and `/components` tokenized component dictionary.
- [x] 2026-06-04: Task 9 final gate passed: `npm run check:data`, `npm run lint`, and `npm run build` all exited 0; build generated 195 static pages and included `/components`, `/studio`, `/styles`, and `/layouts`.
- [x] 2026-06-04: Task 9 route QA passed for `/studio?style=cyberpunk&layout=dashboard-layout`, `/studio?style=luxury&layout=product-demo-layout`, `/styles`, `/layouts`, `/components`, `/web-layouts`, and `/design-styles`. Studio copy buttons worked, invalid query slugs normalized to `/studio?style=brutalism&layout=hero-focused-layout&vp=desktop`, legacy redirects landed on `/layouts` and `/styles`, and 390px overflow checks passed for `/studio` and `/components`. Screenshots saved under `.next/codex-screens/final-route-qa`.
