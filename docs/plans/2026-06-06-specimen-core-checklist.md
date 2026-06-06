# OpenDesignLab Specimen Core Checklist

Date: 2026-06-06

## Design Context

Source: `오픈소스/screens-a.jsx`, `오픈소스/ds.css`

OpenDesignLab should read as an instrument-grade design catalog. The app chrome stays monochrome ink-on-paper so layout, style, palette, and component specimens can carry the color. UI motifs should stay precise: hairline rules, crop marks, indexed rows, mono labels, active ink blocks, and one vermilion signal accent.

## Implementation Checklist

- [x] Remove the visible `Catalog` label from the shared top chrome.
- [x] Change the OpenDesignLab wordmark click target to the Brand sheet page.
- [x] Add a Brand sheet page that recreates `Brand sheet · the direction` from the SPECIMEN reference.
- [x] Add localized Brand sheet routes for `/en/brand` and `/ko/brand`.
- [x] Apply the Layout Explorer page structure to Styles:
  - [x] left filter rail
  - [x] category rows with counts
  - [x] secondary style attributes as clickable filters
  - [x] right result header with count
  - [x] sort controls
  - [x] grid and list views
  - [x] Studio and detail links
- [x] Tune shared CSS animation:
  - [x] use one measured page entrance
  - [x] tighten item stagger timing
  - [x] keep hover and active motion subtle
  - [x] respect `prefers-reduced-motion`
- [x] Verify:
  - [x] `npm run lint`
  - [x] `npm run build`
  - [x] browser check for wordmark, Brand sheet, Styles filters, grid/list, mobile overflow

## Motion Notes

Use transform and opacity only for motion. Keep feedback in the 120ms to 220ms range and page entrance under 420ms. Avoid decorative motion that competes with the catalog content.
