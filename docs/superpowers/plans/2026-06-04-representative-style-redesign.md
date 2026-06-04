# Representative Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-author all 88 design styles so each style reads as a representative design direction, not a category-default palette swap.

**Architecture:** Treat `scripts/style-references.json` as the research source of truth, but do not assume the current entries are enough. Every style requires fresh discovery: real sites or archives plus Pinterest, Awwwards, and Dribbble references that match the specific visual language. Those references then drive explicit per-style data in `src/data/designStyles.ts`: a style brief, a unique palette, non-color token overrides, a suitable sample variant, and prompt copy that describes the actual visual language. Validation should fail when styles fall back to generated/default-looking data or when any required discovery source is missing.

**Tech Stack:** Modified Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, static TypeScript data, Node 22, Playwright for reference capture and visual QA. Before editing framework routes or config, read the relevant guide in `node_modules/next/dist/docs/`.

---

## Current Findings

- `README.md` is now the English default and links to `README.ko.md`; the branch has been pushed to the draft PR.
- The strongest existing memo for this work is `scripts/style-references.json`, but it is only a starting point.
- `scripts/style-references.json` currently covers only 12 of 88 styles:
  - `minimalism`
  - `brutalism`
  - `cyberpunk`
  - `luxury`
  - `organic-design`
  - `kawaii`
  - `streetwear`
  - `editorial-design`
  - `glassmorphism`
  - `y2k`
  - `maximalism`
  - `swiss-design`
- `scripts/capture-references.mjs` captures those references to `public/references/[slug]/`, which is intentionally gitignored for copyright and local-only review.
- Each style still needs additional platform research from Pinterest, Awwwards, and Dribbble. If a platform does not have a perfect direct category page for a style, store the best matching search/results URL and explain the limitation in `note`.
- `src/data/designStyles.ts` has 88 styles, but many fields are generated from category profiles.
- `styleTokenOverrides` currently covers 24 styles; 64 styles still inherit category defaults for most non-color behavior.
- Palettes are explicit for a small subset and hash-assigned from `paletteBank` for the rest.
- The sample system has only 10 broad `DesignStyleSampleType` renderers, so many styles share the same structural expression.

## Source Files

### Research And Reference Files

- Modify: `scripts/style-references.json`
  - Add reference entries for all 88 style slugs.
  - Keep entries split into `sites` and `galleries`.
  - Prefer real brand/product/editorial sites in `sites`; keep curation platforms in `galleries`.
  - For every style, include Pinterest, Awwwards, and Dribbble entries in `galleries`.
  - Use exact style pages when available; otherwise use platform search/result URLs with precise notes.
- Modify: `scripts/capture-references.mjs`
  - Keep screenshots local-only under `public/references/`.
  - Add a coverage summary that reports missing slugs before capture starts.
- Create: `scripts/check-style-references.mjs`
  - Validate all 88 style slugs have references.
  - Validate each referenced style has at least 2 `sites` and at least 3 `galleries` entries.
  - Validate each style has Pinterest, Awwwards, and Dribbble coverage in `galleries`.
  - Validate each reference item has `url`, `title`, and `note`.

### Style Data Files

- Modify: `src/data/designStyles.ts`
  - Replace generated copy for each style with explicit per-style copy.
  - Add explicit palettes for all 88 styles.
  - Add explicit token overrides for all 88 styles.
  - Add source-reference slugs or titles to each style record if needed for traceability.
- Modify: `scripts/check-data.mjs`
  - Raise tuned token coverage from 24 to 88.
  - Add checks that no style has generated fallback summary/description patterns.
  - Add checks that each style has a unique enough palette and token signature.

### Rendering Files

- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`
  - Expand from 10 broad sample renderers to style-family variants where visual language actually differs.
  - Keep each renderer responsive at 390px.
- Modify: `src/components/style-preset/styleTokenVars.ts`
  - Add new token variables only if the re-authoring proves the current token model cannot express a style.
- Modify: `src/app/globals.css`
  - Add effect utilities only after a concrete style needs them.

### Documentation

- Modify: `README.md`
  - Mention that style data is reference-backed.
- Modify: `README.ko.md`
  - Mirror the same note in Korean.
- Create: `docs/style-research/README.md`
  - Explain how to add or update style references and how to run local capture.

---

## Style Inventory

Each style below must end with explicit references, explicit copy, explicit palette, explicit tokens, and a visual QA screenshot.

### 모던 / 미니멀

- [x] `minimalism`
- [x] `modernism`
- [x] `swiss-design`
- [x] `international-style`
- [x] `scandinavian`
- [x] `japandi`
- [x] `warm-minimal`
- [x] `soft-minimal`
- [x] `high-end-minimal`

### 강렬 / 실험

- [x] `brutalism`
- [x] `new-brutalism`
- [x] `anti-design`
- [x] `maximalism`
- [x] `glitch-art`
- [x] `deconstructivism`
- [x] `avant-garde`
- [x] `postmodernism`

### 레트로 / 빈티지

- [x] `retro`
- [x] `vintage`
- [x] `seventies-retro`
- [x] `eighties-retro`
- [x] `nineties-graphic`
- [x] `y2k`
- [x] `retro-futurism`
- [ ] `mid-century-modern`
- [ ] `bauhaus`

### 미래 / 디지털

- [ ] `futurism`
- [ ] `cyberpunk`
- [ ] `neon-noir`
- [ ] `techwear`
- [ ] `high-tech`
- [ ] `ai-aesthetic`
- [ ] `hologram-style`
- [ ] `chromecore`
- [ ] `metaverse-style`

### 럭셔리 / 클래식

- [ ] `classic`
- [ ] `neoclassic`
- [ ] `luxury`
- [ ] `old-money`
- [ ] `art-deco`
- [ ] `art-nouveau`
- [ ] `baroque`
- [ ] `rococo`
- [ ] `gothic`

### 자연 / 수공예

- [ ] `organic-design`
- [ ] `natural`
- [ ] `botanical`
- [ ] `eco-design`
- [ ] `rustic`
- [ ] `kinfolk`
- [ ] `handmade`
- [ ] `craft`
- [ ] `wabi-sabi`

### 귀여움 / 캐주얼

- [ ] `kitsch`
- [ ] `kawaii`
- [ ] `dopamine-design`
- [ ] `pop-art`
- [ ] `comic-book-style`
- [ ] `toy-design`
- [ ] `playful-design`
- [ ] `pastel-style`
- [ ] `bubble-design`

### 스트리트 / 서브컬처

- [ ] `streetwear`
- [ ] `graffiti`
- [ ] `hiphop-style`
- [ ] `skate-culture`
- [ ] `punk`
- [ ] `grunge`
- [ ] `indie-sleaze`
- [ ] `rave-style`
- [ ] `lo-fi`

### 편집 / 타이포그래피

- [ ] `typography-focused`
- [ ] `editorial-design`
- [ ] `magazine-style`
- [ ] `posterism`
- [ ] `grid-system`
- [ ] `collage`
- [ ] `photomontage`
- [ ] `experimental-type`
- [ ] `newspaper-style`

### UI / 웹

- [ ] `flat-design`
- [ ] `material-design`
- [ ] `neumorphism`
- [ ] `glassmorphism`
- [ ] `claymorphism`
- [ ] `dark-mode-design`
- [ ] `saas-style`
- [ ] `startup-landing-page`

---

## Data Contract

Add this explicit data shape inside `src/data/designStyles.ts` or split it into a focused helper file if the file becomes too large:

```ts
type StyleReferenceSource = {
  title: string;
  url: string;
  note: string;
};

type StyleResearchBrief = {
  referenceSites: StyleReferenceSource[];
  referenceGalleries: StyleReferenceSource[];
  representativeTraits: string[];
  avoidTraits: string[];
  tokenIntent: string;
};
```

Every style must satisfy:

- `referenceSites.length >= 2`
- `referenceGalleries.length >= 3`
- `referenceGalleries` includes at least one Pinterest URL
- `referenceGalleries` includes at least one Awwwards URL
- `referenceGalleries` includes at least one Dribbble URL
- `representativeTraits.length >= 4`
- `avoidTraits.length >= 2`
- `tokenIntent.length >= 40`
- Explicit palette assigned by slug, not by hash fallback
- Explicit `styleTokenOverrides[slug]`
- Summary must not be generated from `${nameKo}은 ${tone}입니다.`

---

## Task 1: Add Reference Coverage Validation

**Files:**
- Create: `scripts/check-style-references.mjs`
- Modify: `package.json`
- Modify: `scripts/capture-references.mjs`

- [x] **Step 1: Create reference check script**

Create `scripts/check-style-references.mjs`:

```js
import references from "./style-references.json" with { type: "json" };
import { designStyles } from "../src/data/designStyles.ts";

const errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

const referenceSlugs = new Set(Object.keys(references).filter((key) => !key.startsWith("_")));
const styleSlugs = new Set(designStyles.map((style) => style.slug));

for (const slug of referenceSlugs) {
  assert(styleSlugs.has(slug), `reference slug does not exist in designStyles: ${slug}`);
}

for (const style of designStyles) {
  const entry = references[style.slug];
  assert(entry, `missing references for ${style.slug}`);
  if (!entry) continue;

  const sites = entry.sites ?? [];
  const galleries = entry.galleries ?? [];

  assert(Array.isArray(entry.sites), `references.${style.slug}.sites must be an array`);
  assert(Array.isArray(entry.galleries), `references.${style.slug}.galleries must be an array`);
  assert(sites.length >= 2, `${style.slug} needs at least 2 real site references`);
  assert(galleries.length >= 3, `${style.slug} needs Pinterest, Awwwards, and Dribbble references`);

  const galleryUrls = galleries.map((item) => item.url);
  assert(galleryUrls.some((url) => url.includes("pinterest.")), `${style.slug} missing Pinterest reference`);
  assert(galleryUrls.some((url) => url.includes("awwwards.")), `${style.slug} missing Awwwards reference`);
  assert(galleryUrls.some((url) => url.includes("dribbble.")), `${style.slug} missing Dribbble reference`);

  for (const [groupName, items] of [["sites", sites], ["galleries", galleries]]) {
    for (const item of items) {
      assert(typeof item.url === "string" && item.url.startsWith("https://"), `${style.slug}.${groupName} has bad url`);
      assert(typeof item.title === "string" && item.title.length > 0, `${style.slug}.${groupName} missing title`);
      assert(typeof item.note === "string" && item.note.length >= 12, `${style.slug}.${groupName} missing useful note for ${item.url}`);
    }
  }
}

if (errors.length) {
  console.error("STYLE REFERENCE CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`style reference check passed: ${designStyles.length} styles covered`);
```

- [x] **Step 2: Add npm script**

In `package.json`, add:

```json
"check:style-refs": "node --experimental-strip-types --no-warnings=ExperimentalWarning scripts/check-style-references.mjs"
```

- [x] **Step 3: Add capture preflight summary**

In `scripts/capture-references.mjs`, import `designStyles`:

```js
import { designStyles } from "../src/data/designStyles.ts";
```

Add this before launching Chromium:

```js
const knownReferenceSlugs = new Set(Object.keys(references).filter((key) => !key.startsWith("_")));
const missingReferenceSlugs = designStyles.map((style) => style.slug).filter((slug) => !knownReferenceSlugs.has(slug));

if (missingReferenceSlugs.length > 0) {
  console.log(`\n⚠️  Missing reference entries: ${missingReferenceSlugs.length}`);
  console.log(`   ${missingReferenceSlugs.join(", ")}\n`);
}
```

- [x] **Step 4: Verify failure before adding all references**

Run:

```powershell
npm run check:style-refs
```

Expected now:

```text
STYLE REFERENCE CHECK FAILED:
missing references for international-style
```

- [x] **Step 5: Commit**

```powershell
git add package.json scripts/check-style-references.mjs scripts/capture-references.mjs
git commit -m "Add style reference coverage validation"
```

---

## Task 2: Discover Pinterest, Awwwards, And Dribbble References For Every Style

**Files:**
- Modify: `scripts/style-references.json`

- [ ] **Step 1: Use a fixed search pattern per style**

For each style slug, search and review all of these source patterns:

```text
Pinterest: {style.nameEn} website design inspiration pinterest
Awwwards: {style.nameEn} website design awwwards
Dribbble: {style.nameEn} website design dribbble
Real sites: {style.nameEn} brand website examples
Archive or guide: {style.nameEn} web design style guide
```

Examples:

```text
Pinterest: swiss design website design inspiration pinterest
Awwwards: swiss design website design awwwards
Dribbble: swiss design website design dribbble
Real sites: swiss design brand website examples
Archive or guide: swiss design web design style guide
```

- [ ] **Step 2: Add missing reference entries by category**

Add entries for every slug listed in the Style Inventory. Use this as a concrete entry shape, then replace the style and references with researched matches for each slug:

```json
"minimalism": {
  "sites": [
    { "url": "https://linear.app", "title": "Linear", "note": "Restrained typography, quiet surfaces, compact spacing, and product-focused hierarchy inform the minimalism tokens." },
    { "url": "https://www.apple.com", "title": "Apple", "note": "Large negative space, disciplined image scale, precise type rhythm, and low-noise navigation inform the layout and copy density." }
  ],
  "galleries": [
    { "url": "https://www.pinterest.com/search/pins/?q=minimalist%20website%20design", "title": "Pinterest - Minimalist Website Design", "note": "Moodboard reference for restrained layouts, neutral palettes, whitespace, and understated composition patterns." },
    { "url": "https://www.awwwards.com/websites/minimalism/", "title": "Awwwards - Minimalism Websites", "note": "High-quality web execution reference for minimal interactions, typography, layout proportion, and detail restraint." },
    { "url": "https://dribbble.com/search/minimalist-website", "title": "Dribbble - Minimalist Website", "note": "UI reference for minimal cards, controls, type scale, and component-level visual vocabulary." }
  ]
}
```

Rules:

- Use real sites for `sites` when possible.
- Use museum/archive pages for historical styles when active brand sites are misleading.
- Use Pinterest, Awwwards, and Dribbble for every style, even when the best link is a search/result page rather than a curated category page.
- Avoid adding references whose visual language is merely adjacent.
- Keep notes specific: mention typography, spacing, shape, color, texture, grid, motion, or density.

- [ ] **Step 3: Verify reference coverage**

Run:

```powershell
npm run check:style-refs
```

Expected:

```text
style reference check passed: 88 styles covered
```

- [ ] **Step 4: Capture selected references locally**

Run a sites-only capture first:

```powershell
npm run capture:refs -- --sites-only
```

Expected:

```text
Done
Captured: 176
Failed: 0
```

If some live sites block capture, keep the URL in `style-references.json`, add a precise note, and capture the remaining references. Do not commit `public/references/`.

- [ ] **Step 5: Commit**

```powershell
git add scripts/style-references.json
git commit -m "Expand platform reference coverage for all design styles"
```

---

## Task 3: Add Explicit Style Briefs And Remove Generated Copy

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/check-data.mjs`

- [ ] **Step 1: Add explicit style brief data**

Introduce a slug-keyed `styleBriefs` record near `styleSeedTuples`:

```ts
type StyleBrief = {
  summary: string;
  description: string;
  visualFeatures: string[];
  colorPalette: string[];
  typography: string[];
  layoutTraits: string[];
  useCases: string[];
  goodFor: string[];
  cautions: string[];
  representativeTraits: string[];
  avoidTraits: string[];
  tokenIntent: string;
};

const styleBriefs: Record<string, StyleBrief> = {
  minimalism: {
    summary: "Minimalism uses restraint, whitespace, and precise hierarchy so content feels calm and intentional.",
    description: "Minimalism should feel quieter than a generic modern UI, with large negative space, restrained contrast, and very few decorative moves. It relies on proportion, alignment, and type scale instead of ornaments. The representative version should look closer to Linear, Stripe, or Muji than a blank wireframe. It must preserve one memorable visual signal so the result does not become anonymous.",
    visualFeatures: [
      "Large uninterrupted whitespace around core content.",
      "Thin rules or subtle surface shifts instead of heavy cards.",
      "One restrained accent used for navigation state or CTA only.",
      "Precise grid alignment with few competing focal points."
    ],
    colorPalette: [
      "Warm off-white or cool white base.",
      "Near-black text with a muted gray secondary scale.",
      "One low-saturation accent.",
      "Very light borders for surface separation."
    ],
    typography: [
      "Clean sans-serif display with moderate weight.",
      "Small uppercase metadata labels.",
      "Comfortable body line height with restrained tracking."
    ],
    layoutTraits: [
      "Single-column or quiet two-column structure.",
      "Large section spacing.",
      "Low card density.",
      "CTA placement that does not compete with content."
    ],
    useCases: ["Product overview", "Studio portfolio", "Documentation landing", "Premium service introduction"],
    goodFor: ["SaaS", "Design studios", "Architecture", "Editorial portfolios"],
    cautions: [
      "Do not remove so much detail that the page becomes generic.",
      "Do not rely on color alone for hierarchy.",
      "Avoid crowded card grids."
    ],
    representativeTraits: ["Whitespace", "Precision", "Restraint", "Single accent"],
    avoidTraits: ["Generic empty boxes", "Decorative gradients"],
    tokenIntent: "Use airy spacing, thin borders, no shadow, restrained weights, and near-neutral palette so the style is driven by proportion rather than decoration."
  }
};
```

Use `minimalism` as the pattern for all 88 entries. Do not leave temporary or generic entries.

- [ ] **Step 2: Replace generated fields in `buildStyle()`**

Replace generated copy in `buildStyle()`:

```ts
const brief = styleBriefs[seed.slug];
```

Then set:

```ts
summary: brief.summary,
description: brief.description,
visualFeatures: brief.visualFeatures,
colorPalette: brief.colorPalette,
typography: brief.typography,
layoutTraits: brief.layoutTraits,
useCases: brief.useCases,
goodFor: brief.goodFor,
cautions: brief.cautions,
```

Keep generated `related` only until a later task replaces it with explicit related styles.

- [ ] **Step 3: Add data checks for explicit copy**

In `scripts/check-data.mjs`, add:

```js
for (const s of designStyles) {
  assert(!s.summary.includes(`${s.nameKo}은 `), `style ${s.slug} still has generated summary`);
  assert(!s.description.includes("범주 안에서"), `style ${s.slug} still has generated description`);
  assert(s.visualFeatures.every((item) => item.length >= 12), `style ${s.slug} has weak visualFeatures`);
  assert(s.layoutTraits.every((item) => item.length >= 8), `style ${s.slug} has weak layoutTraits`);
}
```

- [ ] **Step 4: Verify**

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

- [ ] **Step 5: Commit**

```powershell
git add src/data/designStyles.ts scripts/check-data.mjs
git commit -m "Replace generated style copy with explicit briefs"
```

---

## Task 4: Make Palettes Explicit For All 88 Styles

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/check-data.mjs`

- [ ] **Step 1: Replace hash palette fallback**

In `styleSeeds`, replace:

```ts
palette: palettes[slug] ?? paletteBank[Math.abs(hashSlug(slug)) % paletteBank.length],
```

with:

```ts
palette: palettes[slug],
```

- [ ] **Step 2: Add a missing-palette guard**

Before `styleSeeds`, add:

```ts
for (const [slug] of styleSeedTuples) {
  if (!palettes[slug]) {
    throw new Error(`Missing palette for design style: ${slug}`);
  }
}
```

- [ ] **Step 3: Add explicit palettes for all missing slugs**

For every style slug, add a researched 9-color palette. This is a concrete shape example:

```ts
"minimalism": {
  base: "#F7F6F2",
  surface: "#FFFFFF",
  text: "#171717",
  mutedText: "#6F6B63",
  primary: "#111111",
  accent: "#B9ADA0",
  accent2: "#D9D2C7",
  accent3: "#8B908A",
  border: "#E5E0D8",
},
```

Palette rules:

- `base`, `surface`, `text`, and `border` must preserve readable contrast.
- `accent`, `accent2`, and `accent3` must reflect the representative references.
- Neighboring styles in the same category must not share identical palettes.
- Historic styles should use era-specific color relationships rather than trendy defaults.

- [ ] **Step 4: Strengthen data check**

In `scripts/check-data.mjs`, add:

```js
const paletteSignatures = new Map();
for (const s of designStyles) {
  const signature = [
    s.palette.base,
    s.palette.surface,
    s.palette.text,
    s.palette.primary,
    s.palette.accent,
    s.palette.accent2,
    s.palette.accent3,
    s.palette.border,
  ].join("|");
  const existing = paletteSignatures.get(signature) ?? [];
  existing.push(s.slug);
  paletteSignatures.set(signature, existing);
}

for (const [signature, slugs] of paletteSignatures) {
  assert(slugs.length === 1, `duplicate palette signature: ${slugs.join(", ")}`);
}
```

- [ ] **Step 5: Verify**

Run:

```powershell
npm run check:data
npm run lint
npm run build
```

- [ ] **Step 6: Commit**

```powershell
git add src/data/designStyles.ts scripts/check-data.mjs
git commit -m "Make all design style palettes explicit"
```

---

## Task 5: Make Token Overrides Explicit For All 88 Styles

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/check-data.mjs`

- [ ] **Step 1: Raise tuned style target**

In `scripts/check-data.mjs`, replace:

```js
assert(tunedStyleTokenSlugs.length >= 24, `expected at least 24 tuned style token overrides, got ${tunedStyleTokenSlugs.length}`);
```

with:

```js
assert(tunedStyleTokenSlugs.length === designStyles.length, `expected all ${designStyles.length} styles to have tuned token overrides, got ${tunedStyleTokenSlugs.length}`);
```

- [ ] **Step 2: Add override completeness checks**

In `scripts/check-data.mjs`, add:

```js
for (const s of designStyles) {
  assert(tunedStyleTokenSlugs.includes(s.slug), `style ${s.slug} missing explicit token override`);
  assert(typeof s.tokens.decoration.effect === "string", `style ${s.slug} missing decoration effect`);
  assert(["left", "center", "split"].includes(s.tokens.layout.heroVariant), `style ${s.slug} bad heroVariant`);
  assert(["minimal", "boxed", "underline"].includes(s.tokens.layout.navStyle), `style ${s.slug} bad navStyle`);
}
```

- [ ] **Step 3: Add non-color overrides for all styles**

For every slug in `styleSeedTuples`, add `styleTokenOverrides[slug]` that changes at least two of:

- `typography`
- `shape`
- `space`
- `decoration`
- `layout`

Token rules:

- `minimalism`, `swiss-design`, `grid-system`, and `flat-design` must not share the same token signature.
- `luxury`, `old-money`, `classic`, `neoclassic`, `baroque`, `rococo`, and `art-deco` must use distinct type/shape/spacing behaviors.
- `cyberpunk`, `neon-noir`, `rave-style`, `ai-aesthetic`, and `hologram-style` must differ beyond neon color.
- `kawaii`, `pastel-style`, `bubble-design`, `toy-design`, and `claymorphism` must differ in radius, shadow, density, and surface behavior.
- `streetwear`, `graffiti`, `punk`, `grunge`, and `indie-sleaze` must differ in texture/effect and density.

- [ ] **Step 4: Add token signature duplicate guard**

In `scripts/check-data.mjs`, add:

```js
const tokenSignatures = new Map();
for (const s of designStyles) {
  const signature = [
    s.tokens.typography.displayFont,
    s.tokens.typography.weightDisplay,
    s.tokens.typography.tracking,
    s.tokens.typography.headingScale,
    s.tokens.shape.radius,
    s.tokens.shape.radiusPill,
    s.tokens.shape.borderWidth,
    s.tokens.shape.borderStyle,
    s.tokens.space.density,
    s.tokens.space.gap,
    s.tokens.space.padScale,
    s.tokens.decoration.effect,
    s.tokens.layout.heroVariant,
    s.tokens.layout.navStyle,
    s.tokens.layout.alignment,
  ].join("|");
  const existing = tokenSignatures.get(signature) ?? [];
  existing.push(s.slug);
  tokenSignatures.set(signature, existing);
}

for (const [signature, slugs] of tokenSignatures) {
  assert(slugs.length <= 2, `token signature reused too often: ${slugs.join(", ")}`);
}
```

- [ ] **Step 5: Verify**

Run:

```powershell
npm run check:data
npm run lint
npm run build
```

- [ ] **Step 6: Commit**

```powershell
git add src/data/designStyles.ts scripts/check-data.mjs
git commit -m "Tune tokens for every design style"
```

---

## Task 6: Expand Sample Rendering Beyond 10 Generic Types

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [ ] **Step 1: Add sample variants**

Extend `DesignStyleSampleType` with concrete variants:

```ts
export type DesignStyleSampleType =
  | "minimal-editorial"
  | "modernist-grid"
  | "swiss-poster-grid"
  | "japandi-product"
  | "brutalist-poster"
  | "anti-design-chaos"
  | "maximalist-pattern"
  | "glitch-interface"
  | "retro-commerce"
  | "y2k-browser"
  | "bauhaus-composition"
  | "cyber-dashboard"
  | "neon-noir-terminal"
  | "hologram-interface"
  | "luxury-product"
  | "art-deco-lobby"
  | "baroque-editorial"
  | "organic-brand"
  | "botanical-journal"
  | "craft-market"
  | "kawaii-app"
  | "comic-panel"
  | "toy-shelf"
  | "street-campaign"
  | "graffiti-wall"
  | "punk-zine"
  | "magazine-layout"
  | "newspaper-front"
  | "collage-board"
  | "saas-landing"
  | "material-dashboard"
  | "glass-panel-ui"
  | "neumorphic-controls"
  | "clay-ui";
```

- [ ] **Step 2: Implement variant renderers**

In `DesignStyleSampleRenderer.tsx`, add one function per new variant. Each function must:

- Use `SampleFrame`.
- Use `styleTokenVars(style)` through existing `sampleVariables`.
- Render a concrete webpage-like surface, not only abstract boxes.
- Keep text inside bounds at 390px.
- Avoid nested cards inside cards.

- [ ] **Step 3: Re-map every style to a specific sample variant**

Update every `styleSeedTuples` entry with the most accurate variant. Examples:

```ts
["swiss-design", "스위스 디자인", "Swiss Design", "모던 / 미니멀", "스위스 포스터 전통의 엄격한 그리드와 산세리프 질서를 웹 화면에 적용하는 스타일", ["swiss", "grid", "typography"], "swiss-poster-grid"],
["y2k", "Y2K", "Y2K", "레트로 / 빈티지", "2000년대 초 웹의 크롬, 글로스, 버블, 글리터 감각을 현대적으로 재구성하는 스타일", ["y2k", "chrome", "gloss"], "y2k-browser"],
["punk", "펑크", "Punk", "스트리트 / 서브컬처", "찢긴 지면, 거친 복사 질감, 저항적 메시지를 앞세우는 zine 기반 웹 스타일", ["punk", "rebellious", "raw"], "punk-zine"],
```

- [ ] **Step 4: Verify visual coverage**

Run:

```powershell
npm run lint
npm run build
```

Then use Playwright to capture `/styles` and one style detail page per sample type.

Expected:

- No sample type is blank.
- No page has horizontal overflow at 390px.
- Neighboring styles in the same category are visually distinguishable.

- [ ] **Step 5: Commit**

```powershell
git add src/data/designStyles.ts src/components/design-style/DesignStyleSampleRenderer.tsx
git commit -m "Expand representative design style sample variants"
```

---

## Task 7: Final Style QA Report

**Files:**
- Create: `docs/style-research/README.md`
- Create: `docs/style-research/2026-06-04-style-redesign-qa.md`
- Modify: `README.md`
- Modify: `README.ko.md`

- [ ] **Step 1: Create research README**

Create `docs/style-research/README.md`:

```md
# Style Research Workflow

Style references are stored in `scripts/style-references.json`.

Reference screenshots are local-only and saved under `public/references/`, which is gitignored because the screenshots can include copyrighted third-party pages.

## Commands

```bash
npm run check:style-refs
npm run capture:refs -- --sites-only
npm run check:data
npm run lint
npm run build
```

## Quality Rules

- Each style must have at least 2 real site or archive references.
- Each style must include Pinterest, Awwwards, and Dribbble references.
- Each style must have explicit copy, palette, and token overrides.
- Each style must be visually distinguishable from neighboring styles in the same category.
- Captured screenshots are for local research only and must not be committed.
```

- [ ] **Step 2: Create QA report**

Create `docs/style-research/2026-06-04-style-redesign-qa.md` with:

```md
# Style Redesign QA

## Verification Commands

- [ ] `npm run check:style-refs`
- [ ] `npm run check:data`
- [ ] `npm run lint`
- [ ] `npm run build`

## Visual QA

- [ ] `/styles` desktop
- [ ] `/styles` mobile 390px
- [ ] One detail page per category
- [ ] One detail page per sample variant
- [ ] `/studio?style=cyberpunk&layout=dashboard-layout`
- [ ] `/studio?style=luxury&layout=product-demo-layout`
- [ ] `/components`

## Findings

Record screenshots and notes here after QA. Keep third-party reference screenshots out of git.
```

- [ ] **Step 3: Update README files**

In `README.md`, add under "Adding a Design Style":

```md
Before adding or changing a design style, update `scripts/style-references.json` and run `npm run check:style-refs`. Reference screenshots are captured locally with `npm run capture:refs -- --sites-only` and are not committed.
```

In `README.ko.md`, add:

```md
디자인 형식을 추가하거나 수정하기 전에 `scripts/style-references.json`을 먼저 업데이트하고 `npm run check:style-refs`를 실행합니다. 참고 스크린샷은 `npm run capture:refs -- --sites-only`로 로컬에만 저장하며 커밋하지 않습니다.
```

- [ ] **Step 4: Verify final gates**

Run:

```powershell
npm run check:style-refs
npm run check:data
npm run lint
npm run build
```

Expected:

```text
style reference check passed: 88 styles covered
data check passed: 88 styles, 10 categories
```

- [ ] **Step 5: Commit**

```powershell
git add docs/style-research README.md README.ko.md
git commit -m "Document representative style research workflow"
```

---

## Progress Log

- [x] 2026-06-04: User identified that current styles do not yet feel representative enough and asked to find the earlier reference notes.
- [x] 2026-06-04: Found `scripts/style-references.json` as the existing reference memo. It covers 12 styles and is consumed by `scripts/capture-references.mjs`.
- [x] 2026-06-04: Confirmed current implementation has 88 styles, 24 tuned token overrides, 12 reference-backed styles, 64 mostly untuned styles, and 76 styles without reference entries.
- [x] 2026-06-04: User clarified that reference work must include additional matching sources for each style, specifically Pinterest, Awwwards, and Dribbble, not only existing real-site references.
- [x] 2026-06-04: Completed the first per-style pass for `minimalism`: refreshed Linear, Apple, Stripe, Pinterest, Awwwards, and Dribbble references; added targeted reference validation; rewrote copy, palette, tokens, research brief, and a dedicated sample renderer; verified desktop and mobile renders with Playwright.
- [x] 2026-06-04: Completed the second per-style pass for `modernism`: added Bauhaus-Archiv, MoMA, Vitra, AIM, Pinterest, Awwwards, and Dribbble references; separated it from quiet minimalism with functional grid, primary color blocks, black structure, explicit copy, palette, tokens, research brief, and a dedicated web-like sample renderer; verified desktop and mobile renders with Playwright.
- [x] 2026-06-04: Completed the next modern/minimal pass through `warm-minimal`: added Swiss, International, Scandinavian, Japandi, and Warm Minimal references; rewrote copy, palettes, tokens, research briefs, and dedicated web-like sample renderers; fixed mobile card overflow; verified `/styles` plus all five detail pages at desktop and 390px mobile.
- [x] 2026-06-04: Completed the next representative pass through `retro-futurism`: added references, copy, palettes, token overrides, and dedicated web-like samples for `soft-minimal`, `high-end-minimal`, `brutalism`, `new-brutalism`, `anti-design`, `maximalism`, `glitch-art`, `deconstructivism`, `avant-garde`, `postmodernism`, `retro`, `vintage`, `seventies-retro`, `eighties-retro`, `nineties-graphic`, `y2k`, and `retro-futurism`. Verified targeted references for 24 styles, data, lint, build, and browser QA across `/styles` plus the 17 detail pages at desktop and 390px mobile. Reference capture completed for target real-site sources after replacing inaccessible URLs with captureable equivalents.
