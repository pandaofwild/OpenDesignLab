---
name: layout-recommender
description: Use when recommending openlayout web layouts by purpose, audience, content density, conversion goal, navigation depth, device priority, or when adding/refining layout catalog entries in this project.
---

# Layout Recommender

Use this skill inside the openlayout project to recommend layouts that match a page purpose.

## Source of truth

- Layout data lives in `src/data/webLayouts.ts`.
- Prefer existing `webLayouts` entries before inventing a new layout.
- Match by `category`, `bestFor`, `notGoodFor`, `tags`, `previewType`, and `complexity`.
- When recommending a concrete item, include its route: `/web-layouts/{slug}`.

## Recommendation Workflow

1. Extract the page goal, audience, content density, navigation depth, conversion importance, visual/media importance, and mobile priority from the request.
2. Search `src/data/webLayouts.ts` for matching Korean/English terms in `nameKo`, `nameEn`, `summary`, `bestFor`, `tags`, and `category`.
3. Pick one primary layout and 2-3 alternatives.
4. Include one layout to avoid when a tradeoff is obvious.
5. Explain each choice in terms of user behavior, content structure, responsive behavior, and implementation risk.

Ask a short clarification only when the page goal is unclear. Otherwise infer conservatively and move.

## Quick Heuristics

- Landing, campaign, lead capture, launch: start with `랜딩페이지 레이아웃`, `hero`, `split-screen`, or `comparison`.
- SaaS, workflow, admin, product value: start with `SaaS / 서비스 웹 레이아웃`, `dashboard`, `two-column`, or `three-column`.
- Blog, docs, knowledge base, article: start with `콘텐츠 중심 레이아웃`, `single-column`, `docs`, or `two-column`.
- Catalog, portfolio index, gallery, resource hub: start with `그리드 기반 레이아웃`, `card-grid`, or `bento-grid`.
- Commerce, product detail, marketplace, pricing comparison: start with `커머스 레이아웃`, `ecommerce-product`, `card-grid`, or `comparison`.
- Mobile-first app, feed, location search: start with `모바일 웹 / 앱형 레이아웃`, `feed`, or `map-list`.
- Strong brand impression, immersive showcase, motion-heavy work: start with `비주얼 중심 레이아웃` or `실험적 / 트렌디한 레이아웃`; call out accessibility and navigation risk.

## Output Shape

Use this format unless the user asks otherwise:

```markdown
추천: [layout.nameKo] (`/web-layouts/{slug}`)

왜 맞는지:
- ...

대안:
- [name] - ...
- [name] - ...

피하면 좋은 구조:
- [name or previewType] - ...

프롬프트에 넣을 설계 조건:
- ...
```

## When Editing the Catalog

- Add new layout seeds in `layoutSeeds`.
- Add a new category only when existing categories cannot describe the purpose.
- Add a new `previewType` only when no existing renderer communicates the structure.
- After code or data edits, run `npm run lint` and `npm run build`.
