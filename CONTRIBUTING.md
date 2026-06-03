# Contributing to openlayout

Thanks for taking the time to improve openlayout.

## Development setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000/web-layouts`.

## Before sending changes

Run both checks:

```bash
npm run lint
npm run build
```

## Adding a web layout

Layout data lives in `src/data/webLayouts.ts`.

1. Add a seed to `layoutSeeds`.
2. Reuse an existing `category` and `previewType` when possible.
3. Add a category or preview type only when the current set cannot describe the structure.
4. Update `LayoutPreviewRenderer.tsx` only when a new preview type needs a renderer.

## Adding a design style

Design style data lives in `src/data/designStyles.ts`.

1. Add an entry to `styleSeedTuples`.
2. Add a palette when the generated fallback palette is not specific enough.
3. Reuse an existing `sampleType` when possible.
4. Update `DesignStyleSampleRenderer.tsx` only when a new sample type is needed.

## Pull request expectations

- Keep changes focused.
- Include screenshots or short notes for visual changes.
- Avoid adding external services unless the feature cannot work without them.
- Do not commit generated images unless they are intentionally part of the project.
