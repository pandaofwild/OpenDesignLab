# Design Dictionary Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn openlayout from a "palette-swap preview gallery" into a design dictionary where a full **style-token system** drives Style × Layout combinations into genuinely distinct previewable webs, with later component-level browsing and code/prompt copy.

**Architecture:** Styles gain a machine-applied `StyleTokens` object (color, typography, shape, spacing, decoration, layout hints). A provider emits every token as a `--st-*` CSS variable; layout and component renderers read only those variables. Per-category default tokens + per-style overrides keep filling 88 styles cheap. A new `/studio` route crosses styles and layouts.

**Tech Stack:** Next.js App Router (see `node_modules/next/dist/docs/` before writing framework code — this is a modified Next.js), React 19, TypeScript, Tailwind CSS v4, static TypeScript data. No test framework is installed; verification uses a Node data-integrity script (`scripts/check-data.mjs`) plus `npm run lint` and `npm run build`.

**Design doc:** `docs/plans/2026-06-03-design-dictionary-design.md`

---

## Conventions

- **Verification gate** for every task: the relevant `node scripts/check-data.mjs` assertions pass AND `npm run lint` AND `npm run build` exit 0.
- **Commit** after each task with a focused message ending in the Co-Authored-By trailer.
- Work happens on a feature branch (current: `codex/design-style-library`, or a fresh `design-dictionary` branch if preferred).
- CSS variable namespace: `--st-*` (new token system), separate from the legacy `--style-*` used today, so the two can coexist during migration.
- DRY / YAGNI: do not build copy or component features before Phase 5/6.

---

## Milestone Checklist

- [ ] **M1: Token foundation** — `StyleTokens` type, category defaults, overrides, builder merge, data-integrity script, 8–12 representative styles fully tuned.
- [ ] **M2: Token CSS pipeline** — provider emits `--st-*` variables; a `useStyleTokens` hook; globals.css token utilities.
- [ ] **M3: Layout renderer tokenized** — `LayoutPreviewRenderer` consumes type/shape/space/decoration tokens, not just color.
- [ ] **M4: Studio combine view** — `/studio` crossing style × layout, URL query, viewport toggle.
- [ ] **M5: Route restructure** — `/styles` + `/layouts` canonical, redirects from old URLs.
- [ ] **M6: Fill all 88 styles** — token values for every style; visual QA.
- [ ] **M7: Copy feature** — code + prompt copy from studio and detail pages.
- [ ] **M8: Component dictionary** — `/components` (long term).

---

## Phase 0: Verification Harness

### Task 0: Add a data-integrity check script

**Files:**
- Create: `scripts/check-data.mjs`
- Modify: `package.json` (add `"check:data"` script)

- [ ] **Step 1: Create the check script**

`scripts/check-data.mjs` imports the built data and asserts invariants. Because the data is TS, run it after `npm run build` against the compiled output, OR use a tiny inline TS loader. Simplest reliable approach: assert against the source via a regex-free dynamic import using `tsx` is NOT available (no new deps), so instead validate the JSON-able invariants by importing from a small generated manifest.

Minimal first version (count + uniqueness against source counts the plan will extend):

```js
// scripts/check-data.mjs
import { designStyles, designStyleCategories } from "../src/data/designStyles.ts";

const errors = [];
function assert(cond, msg) { if (!cond) errors.push(msg); }

assert(designStyles.length === 88, `expected 88 styles, got ${designStyles.length}`);
const slugs = new Set(designStyles.map((s) => s.slug));
assert(slugs.size === designStyles.length, "duplicate style slugs found");
assert(designStyleCategories.length === 10, `expected 10 categories, got ${designStyleCategories.length}`);

if (errors.length) { console.error("DATA CHECK FAILED:\n" + errors.join("\n")); process.exit(1); }
console.log(`data check passed: ${designStyles.length} styles, ${designStyleCategories.length} categories`);
```

> Note: Node cannot import `.ts` directly without a loader. Use `node --experimental-strip-types scripts/check-data.mjs` (Node 22+ supports type stripping). The repo pins Node 22 via `.nvmrc`/engines, so this works.

- [ ] **Step 2: Add npm script**

In `package.json` scripts: `"check:data": "node --experimental-strip-types scripts/check-data.mjs"`.

- [ ] **Step 3: Run it (expect pass on current data)**

Run: `npm run check:data`
Expected: `data check passed: 88 styles, 10 categories`

- [ ] **Step 4: Commit**

```bash
git add scripts/check-data.mjs package.json
git commit -m "Add data-integrity check script for style data"
```

---

## Phase 1: Token Foundation

### Task 1: Define the `StyleTokens` type

**Files:**
- Modify: `src/data/designStyles.ts` (top of file, near `DesignStylePalette`)

- [ ] **Step 1: Add the token types**

Add above `DesignStyle`:

```ts
export type StyleDensity = "airy" | "normal" | "tight";
export type StyleEffect = "none" | "glitch" | "scanline" | "grain" | "glow" | "gradient";

export type StyleTokens = {
  typography: {
    displayFont: string;   // CSS font-family stack
    bodyFont: string;
    weightDisplay: number; // 400..900
    weightBody: number;
    tracking: string;      // e.g. "-0.05em"
    headingScale: number;  // multiplier on base heading sizes, e.g. 1.0
  };
  shape: {
    radius: string;        // e.g. "0px" | "12px" | "9999px"
    borderWidth: string;   // e.g. "1px" | "3px"
    borderStyle: "solid" | "dashed" | "double";
  };
  space: {
    density: StyleDensity;
    gap: string;           // base gap, e.g. "0.75rem"
    padScale: number;      // multiplier on base padding
  };
  decoration: {
    shadow: string;        // CSS box-shadow or "none"
    effect: StyleEffect;
  };
  layout: {
    heroVariant: "left" | "center" | "split";
    navStyle: "minimal" | "boxed" | "underline";
    alignment: "left" | "center";
  };
};
```

- [ ] **Step 2: Add `tokens` to `DesignStyle`**

Add `tokens: StyleTokens;` to the `DesignStyle` type.

- [ ] **Step 3: Verify it fails the build (tokens not yet produced)**

Run: `npm run build`
Expected: TypeScript error — `buildStyle` return is missing `tokens`. This confirms the type is wired before we implement.

### Task 2: Add per-category default tokens

**Files:**
- Modify: `src/data/designStyles.ts`

- [ ] **Step 1: Add `categoryTokenDefaults`**

Add a `Record<string, StyleTokens>` keyed by the 10 category names, giving each family a sensible baseline. Example entries (fill all 10):

```ts
const categoryTokenDefaults: Record<string, StyleTokens> = {
  "모던 / 미니멀": {
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 600, weightBody: 400, tracking: "-0.02em", headingScale: 1.0 },
    shape: { radius: "2px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1rem", padScale: 1.2 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "강렬 / 실험": {
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "-0.05em", headingScale: 1.25 },
    shape: { radius: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.9 },
    decoration: { shadow: "6px 6px 0 var(--st-primary)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "미래 / 디지털": {
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"SFMono-Regular", monospace', weightDisplay: 700, weightBody: 400, tracking: "0em", headingScale: 1.1 },
    shape: { radius: "4px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.5)", effect: "glow" },
    layout: { heroVariant: "center", navStyle: "underline", alignment: "left" },
  },
  // ... fill remaining 7 categories:
  // "레트로 / 빈티지", "럭셔리 / 클래식", "자연 / 수공예",
  // "귀여움 / 캐주얼", "스트리트 / 서브컬처", "편집 / 타이포그래피", "UI / 웹"
};
```

- [ ] **Step 2: Commit (no behavior change yet)**

```bash
git add src/data/designStyles.ts
git commit -m "Add per-category default style tokens"
```

### Task 3: Add per-style token overrides + merge in builder

**Files:**
- Modify: `src/data/designStyles.ts`

- [ ] **Step 1: Add `styleTokenOverrides`**

A `Record<string, DeepPartial<StyleTokens>>` for styles that need to differ from their category baseline. Add a small deep-merge helper. Start with overrides only for the representative styles (Task 5); others inherit category defaults.

```ts
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const styleTokenOverrides: Record<string, DeepPartial<StyleTokens>> = {
  kawaii: { shape: { radius: "9999px", borderWidth: "2px" }, decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" } },
  glitch-art: { decoration: { effect: "glitch" }, shape: { radius: "0px" } },
  // ...
};

function mergeTokens(base: StyleTokens, over?: DeepPartial<StyleTokens>): StyleTokens {
  if (!over) return base;
  return {
    typography: { ...base.typography, ...over.typography },
    shape: { ...base.shape, ...over.shape },
    space: { ...base.space, ...over.space },
    decoration: { ...base.decoration, ...over.decoration },
    layout: { ...base.layout, ...over.layout },
  };
}
```

> Note: object keys with hyphens (e.g. `glitch-art`) must be quoted: `"glitch-art": {...}`.

- [ ] **Step 2: Produce `tokens` in `buildStyle`**

In `buildStyle`, before the `return`, compute:

```ts
const baseTokens = categoryTokenDefaults[seed.category];
const tokens = mergeTokens(baseTokens, styleTokenOverrides[seed.slug]);
```

Add `tokens,` to the returned object.

- [ ] **Step 3: Build passes now**

Run: `npm run build`
Expected: exit 0 (the missing-`tokens` error from Task 1 is resolved).

- [ ] **Step 4: Extend the data check for token completeness**

In `scripts/check-data.mjs` add:

```js
for (const s of designStyles) {
  assert(s.tokens, `style ${s.slug} missing tokens`);
  assert(["airy","normal","tight"].includes(s.tokens.space.density), `style ${s.slug} bad density`);
  assert(typeof s.tokens.typography.weightDisplay === "number", `style ${s.slug} bad weightDisplay`);
}
```

Run: `npm run check:data` → expect pass for all 88.

- [ ] **Step 5: Commit**

```bash
git add src/data/designStyles.ts scripts/check-data.mjs
git commit -m "Generate style tokens via category defaults + per-style overrides"
```

### Task 4: Migrate `palette` into `tokens.color` (compat-preserving)

**Files:**
- Modify: `src/data/designStyles.ts`

- [ ] **Step 1: Add `color` to `StyleTokens`**

Add a `color` group to `StyleTokens` mirroring `DesignStylePalette` keys (base, surface, text, muted, primary, accent, accent2, accent3, border).

- [ ] **Step 2: Derive `tokens.color` from `seed.palette` in `buildStyle`**

```ts
const color = {
  base: seed.palette.base, surface: seed.palette.surface, text: seed.palette.text,
  muted: seed.palette.mutedText, primary: seed.palette.primary, accent: seed.palette.accent,
  accent2: seed.palette.accent2, accent3: seed.palette.accent3, border: seed.palette.border,
};
const tokens = { color, ...mergeTokens(baseTokens, styleTokenOverrides[seed.slug]) };
```

Keep the legacy `palette` field on `DesignStyle` for now (no breaking change to existing components).

- [ ] **Step 3: check:data + build + commit**

```bash
npm run check:data && npm run build
git add src/data/designStyles.ts
git commit -m "Add tokens.color derived from palette (keep palette for compat)"
```

### Task 5: Fully tune 8–12 representative styles

**Files:**
- Modify: `src/data/designStyles.ts` (`styleTokenOverrides`)

Representative set (one per category + a few extremes): `minimalism`, `brutalism`, `cyberpunk`, `luxury`, `organic-design`, `kawaii`, `streetwear`, `editorial-design`, `glassmorphism`, `y2k`, `maximalism`, `swiss-design`.

- [ ] **Step 1: Write override tokens for each so they look visibly distinct**

For each, set typography/shape/space/decoration that match the style's character (e.g. luxury = serif display, airy, thin gold borders; brutalism = heavy weight, 0 radius, thick black borders, hard offset shadow; glassmorphism = blur shadow, 16px radius).

- [ ] **Step 2: check:data + build + commit**

```bash
npm run check:data && npm run build
git add src/data/designStyles.ts
git commit -m "Tune full tokens for 12 representative styles"
```

---

## Phase 2: Token CSS Pipeline

### Task 6: Add a token→CSS-variable emitter and hook

**Files:**
- Create: `src/components/style-preset/styleTokenVars.ts`
- Modify: `src/components/style-preset/StylePresetProvider.tsx`

- [ ] **Step 1: Create `styleTokenVars.ts`**

A pure function `styleTokenVars(style: DesignStyle): CSSProperties` returning all `--st-*` variables (color + color `-rgb` + `--st-radius`, `--st-border-width`, `--st-font-display`, `--st-font-body`, `--st-weight-display`, `--st-tracking`, `--st-gap`, `--st-pad-scale`, `--st-shadow`, `--st-heading-scale`, plus `--st-effect` as a data attribute value). Reuse the existing `hexToRgb` (export it from the provider or duplicate locally).

- [ ] **Step 2: Apply on `.style-preset-root`**

In `StylePresetProvider`, spread `styleTokenVars(activePreset)` into the root `style` alongside the legacy vars, and add `data-st-effect={activePreset.tokens.decoration.effect}`.

- [ ] **Step 3: Expose tokens via context**

Add `tokens: activePreset.tokens` to the context value and `useStyleTokens()` convenience hook.

- [ ] **Step 4: build + commit**

```bash
npm run build
git add src/components/style-preset/
git commit -m "Emit style tokens as --st-* CSS variables and expose via hook"
```

### Task 7: Add token-driven utilities + effect layers to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add base token utility classes**

Add classes that read `--st-*`: `.st-surface`, `.st-card` (radius+border+shadow), `.st-display` (font+weight+tracking+scale), `.st-body`, `.st-pad` (uses `--st-pad-scale`).

- [ ] **Step 2: Add effect layers keyed by `[data-st-effect]`**

`[data-st-effect="glow"] .st-card { box-shadow: var(--st-shadow); }`, `[data-st-effect="grain"]` overlay, `[data-st-effect="scanline"]` overlay, `[data-st-effect="glitch"]` animation. Respect `prefers-reduced-motion`.

- [ ] **Step 3: build + commit**

```bash
npm run build
git add src/app/globals.css
git commit -m "Add token-driven utility classes and effect layers"
```

---

## Phase 3: Tokenize the Layout Renderer

### Task 8: Convert `LayoutPreviewRenderer` to `--st-*` tokens

**Files:**
- Modify: `src/components/web-layout/LayoutPreviewRenderer.tsx`

- [ ] **Step 1: Replace `--style-*` color refs with `--st-*`** across the renderer (the renderer already uses CSS-variable color form from the prior change — repoint the namespace).
- [ ] **Step 2: Apply non-color tokens**: card containers use `rounded-[var(--st-radius)] border-[length:var(--st-border-width)] shadow-[var(--st-shadow)]`; headings use `.st-display`; padding scales with `--st-pad-scale`; gaps use `--st-gap`.
- [ ] **Step 3: Verify same layout differs across styles**: build, then visual-check `/web-layouts/[slug]` after selecting `brutalism` vs `luxury` vs `cyberpunk` — radius, weight, borders, shadow visibly change.
- [ ] **Step 4: build + lint + commit**

```bash
npm run lint && npm run build
git add src/components/web-layout/LayoutPreviewRenderer.tsx
git commit -m "Drive layout preview renderer from full style tokens"
```

### Task 9: Tokenize the design-style sample renderer

**Files:**
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [ ] Apply the same `--st-*` token treatment so style cards/samples reflect typography/shape/decoration, not only palette. build + commit.

---

## Phase 4: Studio Combine View

### Task 10: Create the studio page shell

**Files:**
- Create: `src/app/studio/page.tsx`
- Create: `src/components/studio/StudioView.tsx` (client)

- [ ] **Step 1**: `StudioView` holds `style` and `layout` selection state, initialized from URL query (`useSearchParams`) with sensible defaults.
- [ ] **Step 2**: Layout: left control column (style select, layout select, viewport toggle), right live preview rendering `<LayoutPreviewRenderer>` for the chosen layout inside a `.style-preset-root`-scoped wrapper carrying the chosen style's `styleTokenVars`.
- [ ] **Step 3**: Sync selection → URL (`router.replace` with new query) so combos are shareable.
- [ ] **Step 4**: Reserve disabled "코드 복사" / "프롬프트 복사" buttons (Phase 7).
- [ ] **Step 5**: lint + build, visual-check `/studio?style=cyberpunk&layout=dashboard`, commit.

### Task 11: Studio thumbnail pickers (optional polish)

- [ ] Replace dropdowns with small thumbnail grids for style/layout using existing card thumbnails. build + commit.

---

## Phase 5: Route Restructure

### Task 12: Add `/styles` and `/layouts` canonical routes with redirects

**Files:**
- Create: `src/app/styles/...`, `src/app/layouts/...` (or rename existing dirs)
- Modify: `next.config.ts` (redirects)
- Modify: nav/links across `src/`

- [ ] **Step 1**: Move/rename `design-styles` → `styles`, `web-layouts` → `layouts` (keep `[slug]`, `compare`, `generate`).
- [ ] **Step 2**: Add permanent redirects in `next.config.ts`: `/web-layouts/:path*` → `/layouts/:path*`, `/design-styles/:path*` → `/styles/:path*`.
- [ ] **Step 3**: Update all internal `href`s and the `skills/*` docs and README route tables.
- [ ] **Step 4**: lint + build, click-through check, commit.

---

## Phase 6: Fill All 88 Styles

### Task 13: Token values for every remaining style

**Files:**
- Modify: `src/data/designStyles.ts` (`styleTokenOverrides`)

- [ ] **Step 1**: For each of the ~76 not-yet-tuned styles, add overrides where the category default is not specific enough (many will be fine inheriting defaults).
- [ ] **Step 2**: Extend `scripts/check-data.mjs` to warn on styles that are visually identical to their category default if you want stricter coverage (optional).
- [ ] **Step 3**: Visual QA pass — scan `/styles` gallery; ensure no two categories look interchangeable. build + commit in batches by category.

---

## Phase 7: Copy Feature

### Task 14: Prompt copy

**Files:**
- Create: `src/lib/exportPrompt.ts`
- Modify: `src/components/studio/StudioView.tsx`, style/layout detail pages

- [ ] Build a function that composes a generation prompt from the selected style (`imagePrompt`, tokens) + layout (`previewType`, structure). Wire the "프롬프트 복사" button (clipboard). build + commit.

### Task 15: Code copy

**Files:**
- Create: `src/lib/exportCode.ts`

- [ ] Generate a self-contained HTML+Tailwind (or React+Tailwind) snippet for the current Style × Layout using the token CSS variables inlined. Wire "코드 복사". build + commit.

---

## Phase 8: Component Dictionary (long term)

### Task 16: `/components` route

- [ ] Define a `ComponentSpec` data model (button, card, nav, input, badge, …) rendered with `--st-*` tokens; gallery + detail; reuse studio's style picker. Detailed sub-plan to be written when Phases 1–7 land.

---

## Verification Checklist (whole feature)

- [ ] `npm run check:data` passes (88 styles, all have valid tokens).
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Same layout looks visibly different across brutalism / luxury / cyberpunk (radius, weight, border, shadow, density).
- [ ] `/studio?style=...&layout=...` renders the combo and is shareable via URL.
- [ ] Old URLs (`/web-layouts`, `/design-styles`) redirect.
- [ ] No horizontal overflow at 390px width.
- [ ] Selected style persists across reload (existing localStorage behavior intact).

---

## Progress Log

- [ ] 2026-06-03: Plan created from approved design doc.
