---
name: design-style-recommender
description: Use when recommending OpenDesignLab design styles by brand tone, audience, industry, visual intensity, typography needs, palette direction, or when adding/refining design style catalog entries in this project.
---

# Design Style Recommender

Use this skill inside OpenDesignLab when a user needs a visual style direction before applying it to a layout.

## Source of Truth

- Design style data lives in `src/data/designStyles.ts`.
- Prefer existing `designStyles` entries before inventing a new style.
- Match by `category`, `summary`, `description`, `tags`, `goodFor`, `useCases`, `palette`, and `sampleType`.
- When recommending a concrete item, include its route: `/styles/{slug}`.

## Recommendation Workflow

1. Extract brand tone, audience, industry, content density, desired emotion, typography needs, palette direction, and risk tolerance.
2. Search `src/data/designStyles.ts` for matching Korean/English terms in `nameKo`, `nameEn`, `category`, `tags`, `goodFor`, and `useCases`.
3. Pick one primary style and 2-3 alternatives.
4. Include one style to avoid when contrast, credibility, accessibility, or implementation risk is obvious.
5. Explain each choice in terms of visual impression, palette, typography, layout behavior, and where it fits best.

Ask a short clarification only when the brand or page goal is unclear. Otherwise infer conservatively and move.

## Quick Heuristics

- Quiet premium, portfolio, architecture, editorial brand: start with `minimalism`, `high-end-minimal`, `luxury`, or `old-money`.
- Bold campaign, fashion, event, art direction: start with `brutalism`, `maximalism`, `posterism`, or `streetwear`.
- Tech, AI, gaming, developer tools: start with `cyberpunk`, `high-tech`, `ai-aesthetic`, or `dark-mode-design`.
- Wellness, craft, local, sustainability: start with `organic-design`, `botanical`, `wabi-sabi`, or `kinfolk`.
- Youthful, casual, app, community, goods: start with `kawaii`, `dopamine-design`, `toy-design`, or `playful-design`.
- Content, report, magazine, archive: start with `editorial-design`, `magazine-style`, `grid-system`, or `typography-focused`.
- Product UI, SaaS, startup landing: start with `saas-style`, `flat-design`, `material-design`, or `glassmorphism`.

## Output Shape

Use this format unless the user asks otherwise:

```markdown
추천: [style.nameKo] (`/styles/{slug}`)

왜 맞는지:
- ...

대안:
- [name] - ...
- [name] - ...

피하면 좋은 스타일:
- [name or category] - ...

프롬프트에 넣을 디자인 조건:
- ...
```

## When Editing the Catalog

- Add new entries in `styleSeedTuples`.
- Add a new category only when existing categories cannot explain the visual family.
- Add a palette override in `palettes` when the generated palette bank is not distinctive enough.
- Add a new `sampleType` only when no existing renderer communicates the style as a webpage.
- After code or data edits, run `npm run lint` and `npm run build`.
