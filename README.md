# OpenDesignLab

**English** | [한국어](./README.ko.md)

OpenDesignLab is an open design specification lab for AI-assisted frontend work.

It combines layout structures, visual styles, color palettes, and component patterns into real webpage-style previews, prompts, and implementation-ready snippets. The long-term goal is to turn those choices into a reusable `design.md` file that coding agents can follow consistently across a project.

| Item | Value |
| --- | --- |
| Repository | https://github.com/pandaofwild/OpenDesignLab |
| Current catalog | 96 layouts, 88 design styles, 10 style categories |
| Outputs | Previews, prompts, HTML/CSS snippets, style tokens |
| Roadmap | Project-specific `design.md` generation |
| Last reviewed | 2026-06-05 |

![OpenDesignLab style cards](docs/assets/opendesignlab-style-cards.jpg)

## Why This Exists

AI coding works better when the design direction is explicit. A prompt like "make it modern and clean" leaves too much room for inconsistent layout, weak hierarchy, random palettes, and inaccessible components.

OpenDesignLab turns design intent into inspectable choices:

- Pick a page structure before writing code.
- Choose a visual language before styling components.
- Tune palette and token behavior before generating UI.
- Export prompts and code snippets that describe the decision clearly.
- Move toward a project-level `design.md` that can guide Codex and other coding agents.

## Who It Helps

- Designers comparing website structures before committing to a direction
- Frontend developers looking for reliable starting points for pages and components
- AI coding users who need clearer layout, style, accessibility, and component rules
- Teams that want a shared vocabulary for design decisions before implementation

## What You Can Combine

| Area | What it provides |
| --- | --- |
| Layouts | 96 structures for landing pages, dashboards, docs, commerce, galleries, mobile flows, and experimental pages |
| Design styles | 88 visual directions with palettes, typography notes, sample previews, use cases, and cautions |
| Components | Tokenized previews for buttons, cards, navigation, inputs, and badges |
| Palettes | Prompt-driven palette generation that can be applied to layout previews |
| Studio | A Style x Layout workspace for previewing combinations and copying prompts or HTML/CSS |

## Screenshots

### Layout Explorer

![OpenDesignLab layout explorer](docs/assets/opendesignlab-layouts.jpg)

## Key Features

- **Layout explorer**: Filter layouts by search term, category, purpose, and complexity.
- **Full-stage preview**: View layouts large, like a real webpage background, on detail and compare pages.
- **Design Style Lab**: Explore 88 styles by category, tag, and search term, then inspect palettes and webpage-style samples.
- **Style application**: Apply a selected design style to `/layouts` and `/layouts/compare`, with localStorage persistence.
- **Studio copy**: Copy a prompt or self-contained HTML/CSS for the selected Style x Layout combination from `/studio`.
- **Component dictionary**: Preview how style tokens affect buttons, cards, navigation, input fields, and badges.
- **Prompt palette**: Generate a custom color palette from a prompt and apply it to the current layout preview.
- **Image generation admin**: Generate per-style reference images locally with the OpenAI Image API.
- **Project skills**: Internal recommendation skills help coding agents select layouts and styles by purpose, tone, and constraints.

## AI Coding Workflow

1. Choose a layout for the page purpose, such as `hero`, `card-grid`, `dashboard`, `docs`, or `comparison`.
2. Choose a design style, such as `brutalism`, `cyberpunk`, `luxury`, `organic-design`, or `saas-style`.
3. Preview how the structure and style behave together.
4. Copy the prompt or HTML/CSS snippet into a coding workflow.
5. Use the selected rules as the basis for a future `design.md` file.

## Roadmap

- Generate a project-level `design.md` from selected layout, style, palette, and component rules.
- Add stronger component specifications so buttons, forms, cards, navigation, and page sections can share one design contract.
- Improve accessibility and responsive checks for each layout and style combination.
- Add more export formats for AI coding agents, design handoff, and frontend scaffolding.

## Quick Start

Requirements:

- Node.js 22 or later
- npm

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open in your browser:

```text
http://localhost:3000/layouts
```

The root path (`/`) redirects to `/layouts`.

## Main Routes

| Route | Contents |
| --- | --- |
| `/layouts` | Layout search, filters, and card list |
| `/layouts/[slug]` | Structure description, pros/cons, responsive behavior, accessibility notes, live preview, and code example |
| `/layouts/compare` | Compare up to 3 layouts with large structure previews |
| `/studio` | Combine a design style and layout, preview the result, and copy code or prompts |
| `/styles` | Design style search, category/tag filters, color palettes, and webpage-style samples |
| `/styles/[slug]` | Design style detail, color palette, typography/layout traits, and related styles |
| `/styles/generate` | Local reference image generation admin powered by the OpenAI Image API |
| `/components` | Compare how design style tokens affect buttons, cards, navigation, inputs, and badges |

## Image Generation Environment Variables

`/styles/generate` and `/api/design-style-images` are local admin features.

```bash
OPENAI_API_KEY=sk-...
OPENAI_IMAGE_MODEL=gpt-image-1.5
```

- `OPENAI_API_KEY` is required.
- `OPENAI_IMAGE_MODEL` is optional and defaults to `gpt-image-1.5`.
- Generated results are saved to `public/generated/design-styles/{slug}.webp`.
- On read-only deployment platforms like Vercel, switch to external storage such as Blob/S3.

## Open Source Usage

This project is distributed under the MIT License. See `LICENSE` for full terms.

- How to contribute: `CONTRIBUTING.md`
- Security reports: `SECURITY.md`
- Local environment variable example: `.env.example`
- CI: `.github/workflows/ci.yml`

## Quality Checks

Run these before deploying or uploading changes.

```bash
npm run lint
npm run build
```

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

The layout catalog is static-data driven. No separate database or external API is required.

## Project Structure

```text
src/app/layouts/page.tsx                  # Explorer page
src/app/layouts/[slug]/page.tsx           # Layout detail page
src/app/layouts/compare/page.tsx          # Compare page shell
src/app/studio/page.tsx                   # Style x Layout studio
src/app/components/page.tsx               # Component dictionary
src/app/styles/page.tsx                   # Design style library page
src/app/styles/[slug]/page.tsx            # Design style detail page
src/app/styles/generate/page.tsx          # Local image generation admin
src/app/api/design-style-images/route.ts  # OpenAI Image API route
src/data/webLayouts.ts                    # Layout catalog and generated metadata
src/data/designStyles.ts                  # 88 design styles and generated metadata
src/data/componentSpecs.ts                # Tokenized component dictionary specs
src/components/web-layout/                # Explorer, cards, previews, compare UI
src/components/design-style/              # Style cards, filters, samples, generator UI
src/components/component-dictionary/      # Component token previews and picker UI
src/components/style-preset/              # Global selected style provider
src/components/ui/                        # Small shared UI primitives
skills/layout-recommender/SKILL.md        # Purpose-based layout recommendation skill
skills/design-style-recommender/SKILL.md  # Brand-tone-based style recommendation skill
```

Key components:

| File | Role |
| --- | --- |
| `WebLayoutExplorer.tsx` | Search and filter state for the layout list |
| `WebLayoutFilters.tsx` | Filter UI for search term, category, purpose, and complexity |
| `WebLayoutCard.tsx` | Layout card and thumbnail |
| `LayoutStagePreview.tsx` | Full-background preview, floating summary, and click-to-open description panel |
| `LayoutPreview.tsx` | Browser-style preview utility with viewport switching |
| `LayoutPreviewRenderer.tsx` | Large live preview templates per `previewType` |
| `WireframeThumbnail.tsx` | Structure thumbnails used on cards and the compare screen |
| `LayoutCodeExample.tsx` | Copyable Tailwind implementation example |
| `WebLayoutCompare.tsx` | Compare page selection, SVG arrow navigation, and large preview display |
| `DesignStyleLibrary.tsx` | Search, filter, and applied state for the design style list |
| `DesignStyleCard.tsx` | Design style card, color palette, webpage-style sample, and apply button |
| `DesignStyleSampleRenderer.tsx` | 10 webpage-style samples by `sampleType` |
| `StylePresetProvider.tsx` | Persists the selected design style and custom palette in localStorage |
| `DesignStyleImageGenerator.tsx` | Style reference image generation admin UI |

## Project Skills

`skills/layout-recommender/SKILL.md` is an internal skill a coding agent reads to recommend a layout that fits the intended use.

`skills/design-style-recommender/SKILL.md` is an internal skill read to recommend a design style matching brand tone, industry, emotion, typography, and color direction.

Example recommendation request:

```text
This is a B2B SaaS onboarding page. Trust and feature explanation matter, and it has to work on mobile too. Which layout is best?
```

The skill is designed to first check the category, `bestFor`, `notGoodFor`, `tags`, and `previewType` in `src/data/webLayouts.ts`, then briefly suggest a top candidate, alternatives, and structures to avoid.

Example design style recommendation request:

```text
It is a premium beauty brand landing page, but it should not be too flashy. It needs to look high-end. Which design style is best?
```

The design style skill suggests a top style, alternatives, and styles to avoid based on `category`, `tags`, `goodFor`, `useCases`, `palette`, and `sampleType` in `src/data/designStyles.ts`.

## Adding a Layout

Layout data is managed in `src/data/webLayouts.ts`.

1. Add a new entry to `layoutSeeds`.
2. Provide `nameKo`, `nameEn`, `category`, `summary`, `previewType`, and `complexity`.
3. Add `bestFor`, `notGoodFor`, and `tags` only when you need to override the defaults.
4. Let the data builder generate `slug`, the long description, pros/cons, responsive notes, accessibility notes, implementation tips, and related layouts.

When adding a new category, also add a description and defaults to `categoryGuides`.

## Adding a Design Style

Design style data is managed in `src/data/designStyles.ts`.

1. Add a new entry to `styleSeedTuples`.
2. Provide `slug`, `nameKo`, `nameEn`, `category`, `tone`, `tags`, and `sampleType`.
3. If needed, add a 9-color palette for that slug to `palettes`.
4. If a new category is needed, add visual traits, color notes, typography, and layout tendencies to `categoryProfiles`.
5. Extend `DesignStyleSampleType` and `DesignStyleSampleRenderer.tsx` only when the existing 10 sample renderers cannot express it.

## Adding a Preview Type

Add a new `previewType` when existing templates do not reveal the structure clearly enough.

1. Extend the `PreviewType` union in `src/data/webLayouts.ts`.
2. Add a structure description, responsive behavior, and implementation tips to `previewGuides`.
3. Add a live preview renderer to `src/components/web-layout/LayoutPreviewRenderer.tsx`.
4. Add a thumbnail diagram to `src/components/web-layout/WireframeThumbnail.tsx`.
5. If the implementation differs from existing examples, add a Tailwind example to `src/components/web-layout/LayoutCodeExample.tsx`.

## Writing and Design Notes

- Write layout names and summaries practically. A reader should understand when to use a structure without opening the detail page.
- Prefer concrete structure labels like `Header`, `Main`, `Sidebar`, `CTA`, `TOC`, and `Product`.
- Detail pages explain limits and trade-offs, not just benefits.
- Long descriptions on the compare page are collapsed by default so the structure diagram can be scanned first.
