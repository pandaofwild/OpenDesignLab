# Style Moodboard Imagegen Guidelines

This document defines how OpenDesignLab should prompt and review generated style moodboards. Use it before creating or replacing any asset in `public/generated/moodboards/`.

## Goal

Moodboards should look like realistic design research boards that a working designer could plausibly make for a web project.

They should not look like generic AI UI cards, decorative collages, fake dashboards, or abstract posters. The image should help a viewer understand the style before reading the style label.

## Core Direction

Use this framing for every style:

```text
Create a realistic editorial moodboard for a professional web design style reference library.

The board should look like a real designer's research board photographed from above on a studio table. Include a believable mix of printed website screenshots, cropped layout references, material swatches, color chips, paper samples, photography fragments, and small physical objects that match the style. The composition should feel curated, not generated.

Use natural imperfections: slight paper thickness, soft shadows, subtle dust, uneven crop edges, pin marks, tape corners, and real surface texture. Keep everything plausible and useful for a design team.

No readable text, no brand names, no logos, no watermarks, no fake UI gibberish, no impossible floating cards, no overly perfect synthetic mockups, no decorative filler.
Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.
```

## Moodboard Anatomy

Each prompt should ask for a believable mix of real design research materials:

- Printed website or landing page references, but without readable text.
- Cropped layout studies that show hierarchy, spacing, cards, navigation, or content rhythm.
- Material swatches that fit the style, such as paper, textile, stone, metal, wood, acetate, glass, or plastic.
- Color chips that match the style palette.
- Photography fragments that support the domain mood, such as architecture, interiors, product details, editorial crops, or cultural references.
- Small physical objects only when they explain the style, not as decoration.
- Real flat-lay evidence: tape, pins, paper curl, shadow, grain, crop edges, and varied paper thickness.

## Prompt Rules

Write prompts as production specs, not poetic descriptions.

- Name the style and the design context.
- State that the board is for web design research.
- Describe why the style is distinct from neighboring styles.
- Include 6 to 10 concrete visual ingredients.
- Include physical materials and real-world imperfections.
- Keep the palette explicit.
- Ban readable text, brand names, logos, watermarks, fake labels, and generic UI filler.
- Avoid using only UI cards. UI cards should be one ingredient, not the whole image.
- Avoid impossible floating elements. Everything should feel photographed on a real surface.

## Reusable Prompt Template

```text
Create a realistic editorial moodboard for <STYLE NAME> in web design.

The board should look like a real designer's research board photographed from above on <SURFACE OR SETTING>. Include <PRINTED WEB REFERENCES>, <LAYOUT REFERENCES>, <MATERIAL SWATCHES>, <COLOR CHIPS>, <PHOTOGRAPHY FRAGMENTS>, and <PHYSICAL OBJECTS> that match the style.

The visual language should communicate <STYLE TRAITS>. It should feel useful for designing <PROJECT TYPE>, not like <NEIGHBORING STYLE OR FAILURE MODE>.

Use real-world imperfections: slight paper curl, soft natural shadows, subtle grain, tape corners, pin marks, uneven crop edges, and varied paper thickness.

Palette: <PALETTE>.
No readable text, no logos, no brand names, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look.
Landscape 16:10, realistic top-down editorial photography.
```

## Minimalism Example

```text
Create a realistic editorial moodboard for Minimalism in web design.

The board should look like a real designer's research board photographed from above on a warm white studio table. Include sparse printed website layout references with large blank space, thin-rule editorial grids, off-white paper samples, matte packaging blanks, neutral color chips, a small stone object, a folded cotton fabric swatch, and one or two cropped architectural or product photography fragments.

The visual language should communicate reduction, calm hierarchy, precise spacing, and quiet material restraint. The board must feel useful for designing a premium minimalist website, not like a generic blank UI kit.

Use real-world imperfections: slight paper curl, soft natural shadows, subtle grain, tape corners, and varied paper thickness.

Palette: warm white, ivory, stone, greige, graphite, muted olive.
No readable text, no logos, no brand names, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look.
Landscape 16:10, realistic top-down editorial photography.
```

## Modernism Example

```text
Create a realistic editorial moodboard for Modernism in web design.

Photograph a curated designer research board from above. Include printed references of rational grid-based website layouts, modernist architecture crops, industrial product photography fragments, modular paper blocks, primary-color swatches, black rule-line studies, metal and glass material samples, and clean composition studies.

The mood should feel functional, optimistic, geometric, and system-driven. It should read as modernist design research for a web project, not as abstract poster art.

Palette: ivory, black, neutral grey, primary red, cobalt blue, warm yellow.
No readable text, no logos, no brand names, no fake labels, no decorative collage chaos, no retro poster typography.
Landscape 16:10, realistic studio flat lay with soft shadows and tactile paper details.
```

## Style Differentiation Notes

When writing the final prompt for a style, pull its differentiation traits from these sources instead of this document:

- `docs/style-category-distinction-table.md` — category-level comparison rows (core identity, moodboard signals, easy overlap, must-differ-by).
- `docs/style-sample-web-review-log.md` — per-style markers and the queue table.
- `src/data/designStyles.ts` — `representativeTraits`, `avoidTraits`, palette tokens.

The prompt must state how the style differs from its closest neighbors in the same category, using the "easy overlap" and "must differ by" columns of the distinction table.

## Acceptance Checklist

Before saving a generated image into the project, check:

- It looks photographed, not rendered as a synthetic UI collage.
- It could plausibly sit on a designer's desk or studio table.
- It contains mixed research artifacts, not only interface cards.
- It is visually distinct from neighboring styles in the same category.
- It has no readable text, logo, watermark, fake brand, or fake label.
- It has no impossible floating objects or decoration-only filler.
- The palette and materials match the style record in `src/data/designStyles.ts`.
- The composition still works when cropped into the style detail page image block.

## Project Workflow

1. Draft the prompt first and compare it against this document.
2. Generate with whatever image generation tool is available in the current agent environment.
3. Inspect the output visually.
4. If it feels too synthetic, revise the prompt toward real research materials and physical flat-lay details.
5. Bring the selected generated image into the workspace (the source location depends on the tool used).
6. Convert or save the final project asset under `public/generated/moodboards/<slug>.webp`.
7. Add or update the corresponding `StyleMoodboard` entry in `src/data/designStyles.ts`.
8. Run `npm run check:data`, `npm run lint`, and `npm run build`.
9. Verify at least one desktop and one mobile style detail page after the server is restarted.

## Data Entry Shape

Use this shape in `src/data/designStyles.ts`:

```ts
slug: {
  alt: "<Plain image description>",
  caption: "<How the moodboard should guide design decisions>",
  directionKeywords: ["<keyword>", "<keyword>", "<keyword>", "<keyword>", "<keyword>"],
  generatedWith: "imagegen",
  imageSrc: "/generated/moodboards/<slug>.webp",
  prompt: "<Final prompt used for generation>",
}
```

Keep `alt` descriptive, `caption` decision-oriented, and `prompt` close to the actual generation prompt.
