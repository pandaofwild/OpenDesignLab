# Design Dictionary — Design Document

> **Status:** Approved design (2026-06-03). Next step: create an implementation plan with the `writing-plans` skill.
> **Supersedes direction of:** `docs/superpowers/plans/2026-06-02-design-style-library.md` (the design-style library is now one axis of a larger dictionary).

---

## 1. Vision & Concept Model

**One-line product definition:** Before starting a design, freely combine *Style × Layout* to preview real webpage-like results, later explore down to the component level, and copy code or prompts from any result — a **design dictionary**.

### The user's full desired direction (recorded verbatim in intent)

The owner wants to:

1. Build webs in many styles — pages that genuinely look *different* per style, not the same mock recolored.
2. Build layouts in many styles — explore the structural skeleton together with style.
3. Combine them — cross styles and layouts to view the resulting web instantly.
4. Eventually explore by component too — a design dictionary source viewable per component.
5. Copy from any result — source code or the generation prompt.

Gallery-first now; code/prompt copy later.

### Four browsing axes (concept model)

| Axis | Definition | Example |
| --- | --- | --- |
| **Style** | Visual language — a bundle of color/typography/shape/spacing/decoration tokens | cyberpunk, minimal, brutalism |
| **Layout** | Structural skeleton — the content-placement frame | hero, dashboard, card grid |
| **Web** | Style × Layout = one finished page | "cyberpunk × dashboard" |
| **Component** | Individual styled piece — *later* | button, card, nav |

### The core shift

From today's **"swap the palette only"** → a **full design-token system**: style controls color, typography, shape, spacing/density, decoration, and layout variation.

---

## 2. Token System Architecture

### Problem

Today only `DesignStyle.palette` (9 colors) actually drives the screen. `typography`, `layoutTraits`, etc. are *descriptive text* and are never applied to rendering.

### Solution

Introduce **`StyleTokens`** — the values a style actually uses to control the screen. Every token is emitted as a CSS variable; layout and component renderers read only those variables.

```ts
type StyleTokens = {
  color:      { base, surface, text, muted, primary,
                accent, accent2, accent3, border }      // inherits current palette
  typography: { displayFont, bodyFont, weightDisplay,
                weightBody, tracking, headingScale }     // font / weight / tracking
  shape:      { radius, borderWidth, borderStyle }       // roundness / borders
  space:      { density: 'airy' | 'normal' | 'tight',
                gap, padScale }                          // whitespace / density
  decoration: { shadow, glow, grain, gradient,
                effect: 'none' | 'glitch' | 'scanline' | … } // decorative effects
  layout:     { heroVariant, navStyle, alignment }       // layout variation hints
}
```

### Application flow

```
DesignStyle.tokens
  → StyleProvider emits CSS variables (--st-radius, --st-font-display, --st-shadow …)
  → LayoutRenderer / ComponentRenderer use only var(--st-*)
  → Switching style = swapping a variable bundle = whole screen updates live
```

### Scalability (the heart of approach C)

Adding one style = filling in a `tokens` object only. Renderers are untouched → scaling to 88 styles becomes "data entry."

### Defaults + overrides

Per-category default tokens (e.g. the "minimal" family is `airy` + thin fonts); each style overrides only what it needs → minimizes the labor of filling 88 styles.

### Migration

Existing `palette` → absorbed into `tokens.color`. Descriptive fields (`typography: string[]`, etc.) stay as human-readable dictionary text; application is handled by the new `tokens`.

---

## 3. Pages / UX Structure

### Route map (reuse existing assets; the combine view is the key new piece)

| Route | Role | Status |
| --- | --- | --- |
| `/styles` | Style gallery (88, filter/search) | inherit & rename from `/design-styles` |
| `/styles/[slug]` | Style detail — tokens, color, type + sample | inherit & strengthen |
| `/layouts` | Layout gallery (96) | inherit from `/web-layouts` |
| `/layouts/[slug]` | Layout detail — structure, responsive, a11y | inherit |
| **`/studio`** | **Combine view: Style × Layout → finished web preview** | **new (core)** |
| `/components` | Component dictionary | *later (Phase 6)* |

Old URLs keep working via redirects (`/web-layouts` → `/layouts`, `/design-styles` → `/styles`).

### `/studio` — combine view (the heart of the project)

```
┌─────────────┬──────────────────────────────┐
│ left: control│   right: live web preview     │
│             │                              │
│ Style  [▼]  │   selected Style × Layout     │
│ Layout [▼]  │   rendered with full tokens   │
│ viewport[▣▢]│   like a real webpage         │
│             │                              │
│ [copy code] │   (changing style = instant)  │
│ [prompt]    │                              │
└─────────────┴──────────────────────────────┘
```

- Pick style/layout from dropdowns (or small thumbnail grids) to cross instantly.
- Desktop/mobile viewport toggle.
- The chosen combo is shareable/bookmarkable via URL query (`?style=cyberpunk&layout=hero`).
- **Copy buttons** activate in Phase 5 (placeholder reserved first).

### Gallery cards

Each style/layout card shows a mini thumbnail with full tokens applied, so scanning the list alone makes the "genuinely different" quality visible.

### Copy feature (Phase 5)

From `/studio` and detail pages — ① code for the current combo (HTML or React+Tailwind) ② an AI generation prompt.

---

## 4. Phased Roadmap

Each phase gates on `npm run lint` + `npm run build` passing.

**Phase 1 — Token system foundation** (core of approach C, top priority)
- New `StyleTokens` type + `StyleProvider` emits all tokens as CSS variables.
- Per-category default tokens + per-style overrides.
- Migrate existing `palette` → `tokens.color`.
- Complete **8–12 representative styles** with full tokens for validation.

**Phase 2 — Tokenize the layout renderer**
- `LayoutPreviewRenderer` consumes not just color but typography/shape/spacing/decoration tokens.
- Convert layout gallery (`/layouts`) + detail to token-based.
- Validate: the same layout looks *genuinely different* across styles.

**Phase 3 — Studio combine view**
- New `/studio`: cross style × layout, URL-query sharing, viewport toggle.
- Refresh gallery card thumbnails to full-token rendering.
- Old-URL redirect compatibility.

**Phase 4 — Fill all 88 styles**
- With the token system validated, expand the rest as "token value entry."
- QA visual difference per style.

**Phase 5 — Copy feature**
- Copy code (HTML / React+Tailwind).
- Copy AI generation prompt.

**Phase 6 — Component dictionary** (long term)
- `/components`: explore style application per component (button, card, nav, …).

---

## Decisions Log

- Deliverable: gallery-first now; code/prompt copy later.
- Concept model confirmed: Style / Layout / Web (= Style × Layout) / Component.
- Style must control everything: color, typography, shape, spacing/density, decoration, and layout variation.
- Approach **C (token system first)** chosen over (A) broad-but-shallow and (B) deep-but-few.
- The full long-term vision must be captured in this document (done above).
