# Metaverse Style Retirement

## Goal

Remove `metaverse-style` completely from the active design-style library while preserving references in historical planning documents as an accurate record of past work.

## Decision

This is a hard retirement, not a visual redesign, hidden listing item, redirect, or replacement style. The active catalog shrinks from 88 styles to 87. New builds stop generating `/ko/styles/metaverse-style`, `/en/styles/metaverse-style`, and the locale-less `/styles/metaverse-style` route.

The retirement removes all active data, rendering code, validation expectations, reference records, queue entries, and dedicated raster assets. Historical specifications and completed plans keep their original mentions because changing them would falsify the project history.

## Active Data Removal

Remove every `metaverse-style` entry that contributes to the current `designStyles` collection:

- palette record;
- seed tuple and category membership;
- future/digital research brief;
- token override, if one exists;
- moodboard metadata and prompt;
- active style-reference JSON record.

After removal, generated style indices, related-style resolution, static params, listing counts, and detail routes derive naturally from the remaining 87 records. Do not add a tombstone object, alias, redirect, or hidden flag.

## Renderer Removal

Delete the `MetaverseWorld` sample component and its `style.slug === "metaverse-style"` routing branch from `DesignStyleSampleRenderer.tsx`. Remove constants or helper data used only by that component. Shared helpers still used by another style remain intact.

The renderer must have no fallback branch that silently reproduces the retired style. Requests for the removed slug follow the application's existing unknown-style behavior.

## Guardrail and Documentation Removal

Remove `metaverse-style` from:

- the future/digital slug list and marker map;
- the style-distinction sample list, function map, and marker map;
- the active category-distinction table;
- the active web-review queue and any “next style” pointer that names it;
- current reference JSON and current research data.

Where an active neighboring-style note uses `metaverse-style` only as a comparison target, rewrite that phrase to compare against the nearest remaining style, such as `hologram-style`, `gaming`, or `high-tech`, according to the sentence's actual distinction. Do not leave dangling prose that names a nonexistent active slug.

## Asset Removal

Delete dedicated Metaverse raster assets under these active generated-asset locations when present:

- `public/generated/moodboards/metaverse-style-realistic-v2.webp`;
- `public/generated/design-styles/metaverse-style.webp`;
- any other generated file whose basename is uniquely `metaverse-style`.

The deletion is Git-recoverable. Do not remove shared imagery or assets whose ownership is ambiguous.

## Historical Records

Preserve references in dated or completed planning documents, including:

- `docs/superpowers/plans/2026-06-02-design-style-library.md`;
- `docs/superpowers/plans/2026-06-04-representative-style-redesign.md`.

These documents describe the repository at the time they were written. They are not active catalog inputs and must not be rewritten merely to make a repository-wide text search return zero hits.

Temporary and untracked files such as `src/data/designStyles.ts.codex-test` are outside the retirement and remain untouched.

## Verification

- A scoped search of active source, scripts, current catalog docs, and generated assets finds no `metaverse-style` or `MetaverseWorld` reference.
- A separate search confirms remaining mentions occur only in preserved historical documents or unrelated untracked files.
- `npm run check:data` reports 87 styles and 10 categories.
- `npm run check:future-digital` reports 8 refreshed future/digital styles.
- `npm run check:style-distinction` reports 87 slug-specific samples.
- `npm run check:style-refs` reports 87 covered styles.
- `npx tsc --noEmit`, `npm run lint`, and `npm run build` exit successfully.
- The build output does not list generated Metaverse detail paths.
- Existing styles adjacent to the removed slot still render and their related-style links do not point to `metaverse-style`.

## Release Boundary

Commit only active Metaverse retirement files and this approved planning chain. Preserve unrelated untracked logs, screenshots, experimental files, and other style work. Push the resulting commit to the current tracked branch; do not merge or create a replacement style as part of this change.
