# Hologram Clinical Volume Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic prism-card hologram sample with a bright, clinically believable `LUMA VOLUME` anatomical light-field viewer whose controls, imagery, and depth cues make holography instantly recognizable.

**Architecture:** Keep `DesignStyleSampleRenderer.tsx` responsible for `SampleFrame`, style-token injection, and slug routing. Move the interactive clinical viewer into a focused client component that owns tissue mode and slice state, while scoped CSS supplies the four-plane light-field chamber, responsive layouts, and reduced-motion behavior. Curated content, guardrails, references, moodboard metadata, and review evidence are updated alongside two generated WebP assets.

**Tech Stack:** Next.js App Router, React 19 client state, TypeScript, Tailwind CSS, scoped global CSS, Node guardrail scripts, Codex ImageGen, Sharp, Playwright CLI.

---

## File map

- Create `src/components/design-style/HologramClinicalVolume.tsx`: interactive viewer content only; accepts `compact` and relies on inherited sample CSS variables.
- Modify `src/components/design-style/DesignStyleSampleRenderer.tsx`: import the client leaf, wrap it in `SampleFrame`, remove `HologramInterface`, and preserve slug routing.
- Modify `src/app/globals.css`: add only `.hologram-clinical-*` geometry, spectral depth, responsive, and reduced-motion rules.
- Modify `scripts/check-future-digital.mjs`: assert the approved concept markers and reject retired generic prism copy.
- Modify `scripts/check-style-distinction.mjs`: bind `hologram-style` to the new wrapper function.
- Modify `src/data/designStyles.ts`: update clinical content, research traits, token intent, and moodboard metadata.
- Modify `scripts/style-references.json`: align reference notes with medical volumetric visualization and light-field behavior.
- Modify `docs/style-category-distinction-table.md`: record the new identity and separation rules.
- Modify `docs/style-sample-web-review-log.md`: mark verified only after browser QA and record evidence.
- Create `public/generated/design-styles/hologram-style.webp`: clinical anatomical volume subject image.
- Replace `public/generated/moodboards/hologram-style-realistic-v2.webp`: clinical optics material moodboard.

### Task 1: Turn the approved concept into failing guardrails

**Files:**
- Modify: `scripts/check-future-digital.mjs`
- Modify: `scripts/check-style-distinction.mjs`

- [ ] **Step 1: Replace the hologram marker contract**

In `requiredSampleMarkers`, replace the old array with:

```js
"hologram-style": [
  "LUMA VOLUME",
  "clinical volume chamber",
  "tissue mode",
  "slice control",
  "orientation cube",
  "spatial measurement",
],
```

Add the retired copy to `retiredSampleMarkers`:

```js
"prism stack,",
"Volumetric layer",
```

In `scripts/check-style-distinction.mjs`, change the component mapping to:

```js
"hologram-style": "HologramClinicalVolumeSample",
```

- [ ] **Step 2: Run the two checks and confirm RED**

Run:

```powershell
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
```

Expected: both commands fail because the new markers and `HologramClinicalVolumeSample` do not exist yet. The failure must name `hologram-style`; an unrelated syntax or data failure does not satisfy RED.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add scripts/check-future-digital.mjs scripts/check-style-distinction.mjs
git commit -m "test: define clinical hologram sample contract"
```

Expected: one commit containing only the two guardrail files.

### Task 2: Build the interactive client leaf

**Files:**
- Create: `src/components/design-style/HologramClinicalVolume.tsx`

- [ ] **Step 1: Define the public contract and clinical state model**

Create a client component with this state shape and data contract:

```tsx
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type TissueMode = "tissue" | "vessel" | "bone";

type HologramClinicalVolumeProps = {
  compact?: boolean;
};

const MODES: Record<TissueMode, {
  label: string;
  series: string;
  focus: string;
  measure: string;
}> = {
  tissue: { label: "Tissue", series: "AX T2 · 1.2 mm", focus: "Soft tissue", measure: "42.8 mm" },
  vessel: { label: "Vessel", series: "CE-MRA · 0.8 mm", focus: "Vascular tree", measure: "18.4 mm" },
  bone: { label: "Bone", series: "CT B70 · 0.6 mm", focus: "Cortical bone", measure: "31.6 mm" },
};

export function HologramClinicalVolume({ compact = false }: HologramClinicalVolumeProps) {
  const [mode, setMode] = useState<TissueMode>("tissue");
  const [slice, setSlice] = useState(48);
  const sliceId = useId();
  const active = MODES[mode];
  // Return the structure specified in the next steps.
}
```

- [ ] **Step 2: Build the clinical header and metadata rail**

The root must include `hologram-clinical` and `data-mode={mode}`. Add a header with visible text `LUMA VOLUME`, `Clinical Anatomy Viewer`, `Study LV-0427`, and `ANON · 34F`, plus a status dot labeled `Reconstruction live`. Use real text nodes, not pseudo-element content, so guardrails and assistive technology can read them.

- [ ] **Step 3: Build the four-plane chamber**

Inside an element whose accessible label is `clinical volume chamber`, render these four ordered children:

```tsx
<div className="hologram-clinical-grid-plane" aria-hidden="true" />
<div className="hologram-clinical-coronal-plane" aria-hidden="true" style={{ "--slice": `${slice}%` } as React.CSSProperties} />
<div className="hologram-clinical-volume-plane" aria-label={`${active.focus} volumetric reconstruction`}>
  <img src="/generated/design-styles/hologram-style.webp" alt="Translucent clinical anatomical volume reconstructed from scan slices" />
</div>
<div className="hologram-clinical-measure-plane" aria-label="spatial measurement">
  <span>{active.measure}</span><span>R-L</span><span>Depth {slice}%</span>
</div>
```

Add a quiet scan sweep and crosshair as separate `aria-hidden` spans. The image remains the dominant central subject; do not place an opaque scrim over it.

- [ ] **Step 4: Build real mode and slice controls**

Render a `tissue mode` group with three buttons mapped from `MODES`. Each button uses `type="button"`, `aria-pressed={mode === key}`, and `onClick={() => setMode(key)}`. Render a labeled native range input with `id={sliceId}`, `min={12}`, `max={88}`, `value={slice}`, `aria-label="slice control"`, and `onChange={(event) => setSlice(Number(event.target.value))}`. Show the current numeric percentage next to it.

- [ ] **Step 5: Add orientation cube and scan series strip**

Create a semantic `orientation cube` region with visible `A`, `P`, `R`, and `L` faces. Add a scan strip with five thumbnail buttons labeled `S-044` through `S-048`; mark `S-046` selected using `aria-current="true"`. Display `active.series` and `active.focus` in the adjacent metadata, so changing tissue mode visibly changes the interface.

- [ ] **Step 6: Make compact mode information-dense, not truncated**

When `compact` is true, keep the chamber, `LUMA VOLUME`, selected mode, slice value, and orientation cube. Hide the anonymized demographics and scan strip with conditional rendering, reduce labels to short forms, and apply `!min-h-0` only at the renderer wrapper. Do not create a second component tree.

- [ ] **Step 7: Run TypeScript validation**

```powershell
npx.cmd tsc --noEmit
```

Expected: PASS with no TypeScript errors. If the inline CSS variable rejects `React.CSSProperties`, import `type CSSProperties` and cast to that exact type.

- [ ] **Step 8: Commit the client leaf**

```powershell
git add src/components/design-style/HologramClinicalVolume.tsx
git commit -m "feat: add interactive clinical volume viewer"
```

### Task 3: Wire the new sample through the existing token frame

**Files:**
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [ ] **Step 1: Import the leaf and remove the retired implementation**

Add:

```tsx
import { HologramClinicalVolume } from "./HologramClinicalVolume";
```

Delete `const IRIDESCENT` if no other component uses it, and delete the full `HologramInterface` function. Confirm with:

```powershell
rg -n "IRIDESCENT|function HologramInterface|prism stack|Volumetric layer" src/components/design-style/DesignStyleSampleRenderer.tsx
```

Expected: no output.

- [ ] **Step 2: Add the server-side frame wrapper**

Insert beside the other future/digital wrappers:

```tsx
function HologramClinicalVolumeSample({ className, compact = false, style }: Props) {
  return (
    <SampleFrame
      className={cn("overflow-hidden bg-[var(--sample-base)]", compact ? "!min-h-0 !p-2" : "", className)}
      compact={compact}
      style={style}
    >
      <HologramClinicalVolume compact={compact} />
    </SampleFrame>
  );
}
```

- [ ] **Step 3: Update only the hologram slug route**

```tsx
if (style.slug === "hologram-style") {
  return <HologramClinicalVolumeSample {...props} />;
}
```

- [ ] **Step 4: Verify routing and marker GREEN**

```powershell
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npx.cmd tsc --noEmit
```

Expected: all three commands pass; the future-digital check reports 8 styles and the distinction check reports 87 styles.

- [ ] **Step 5: Commit the renderer integration**

```powershell
git add src/components/design-style/DesignStyleSampleRenderer.tsx
git commit -m "feat: route hologram style to clinical viewer"
```

### Task 4: Create the clinical light-field visual system

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add a scoped bright-clinical layout**

Add selectors rooted at `.hologram-clinical`. Use a pearl-white chamber with a cool grey grid, restrained cyan and violet spectral edges, and pale amber only for a measurement focus. The full layout is `grid-template-columns: minmax(132px,.58fr) minmax(240px,1.45fr) minmax(150px,.66fr)`; the chamber is central and at least 330px tall in full mode.

- [ ] **Step 2: Give each depth plane a distinct optical job**

Implement these behaviors:

```css
.hologram-clinical-grid-plane { transform: translateZ(-32px) scale(.94); }
.hologram-clinical-coronal-plane { transform: translateZ(-12px); clip-path: inset(0 calc(100% - var(--slice)) 0 0); }
.hologram-clinical-volume-plane { transform: translateZ(18px); mix-blend-mode: multiply; }
.hologram-clinical-measure-plane { transform: translateZ(42px); pointer-events: none; }
```

Use hairline borders, soft optical bloom, and `perspective` on the chamber. Do not use frosted glass cards or heavy backdrop blur.

- [ ] **Step 3: Style authentic controls and states**

Mode buttons must have a visible selected line and spectral swatch through `[aria-pressed="true"]`. The native range track and thumb must remain keyboard-operable and show focus-visible. The scan series buttons need a selected state, and the orientation cube needs three visible faces with correct spatial transforms.

- [ ] **Step 4: Add restrained reconstruction motion**

Define one vertical sweep animation and a slow spectral-edge shift. Limit continuous animation to the chamber; mode changes use a 180–260ms opacity/transform transition. Add:

```css
@media (prefers-reduced-motion: reduce) {
  .hologram-clinical-sweep,
  .hologram-clinical-volume-plane img {
    animation: none !important;
    transition: none !important;
  }
}
```

- [ ] **Step 5: Add mobile and compact layouts**

At `max-width: 720px`, stack metadata above a minimum-280px chamber and controls below it. Under `.hologram-clinical--compact`, use two columns (`1fr 92px`), keep the chamber at least 170px high, and collapse the control rail to icon/short-label density. No element may use a fixed width wider than its container.

- [ ] **Step 6: Run static verification and commit**

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
git diff --check
```

Expected: all commands exit 0 with no whitespace errors.

```powershell
git add src/app/globals.css
git commit -m "style: add clinical light-field depth system"
```

### Task 5: Align the curated style definition and references

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/style-references.json`
- Modify: `docs/style-category-distinction-table.md`

- [ ] **Step 1: Add a clinical `styleContentOverrides` entry**

Add `"hologram-style"` with Korean copy describing a volumetric diagnostic chamber rather than generic transparent cards. Its features must name four depth planes, tissue modes, slice control, orientation cube, spatial measurements, and spectral edge light. Its use cases must include medical imaging, scientific volumetric data, spatial simulation, and 3D inspection. Its `imagePrompt` must request a bright pearl-white clinical lab, one central translucent anatomical reconstruction, cyan/violet/pale-amber spectral edges, no readable text, no gore, no dark cyberpunk, no floating glass dashboard, and landscape 16:10.

- [ ] **Step 2: Rewrite the research traits and token intent**

Use:

```ts
representativeTraits: [
  "Clinical volume chamber",
  "Four-plane light field",
  "Tissue-mode segmentation",
  "Slice and depth controls",
  "Spatial measurement labels",
],
avoidTraits: [
  "Generic frosted glass cards",
  "Dark cyberpunk command center",
  "Chrome hardware spectacle",
  "Decorative rainbow gradients without depth logic",
],
tokenIntent:
  "Use pearl clinical surfaces, restrained cyan/violet spectral edges, pale amber measurement focus, hairline optics, four explicit depth planes, and real scan controls so holography reads as volumetric light rather than flat glass blur.",
```

- [ ] **Step 3: Update the reference notes without inventing new sources**

Keep Apple Vision Pro, Magic Leap, and Looking Glass Factory, but revise their notes toward spatial legibility, mixed-reality depth anchoring, and light-field volumetric display behavior. Update the gallery notes to require anatomical/scientific volume, slice controls, and spectral depth, while rejecting glassmorphism and chromecore.

- [ ] **Step 4: Update the distinction table row**

Replace the row with:

```markdown
| hologram-style | Clinical volumetric light field | anatomical volume, optical slices, spectral edge light | four depth planes, tissue modes, slice control, spatial measurement | glassmorphism, HUD, high-tech, chromecore | reconstructed volume with depth-aware controls, not flat translucent cards | LUMA VOLUME |
```

- [ ] **Step 5: Run data and reference checks**

```powershell
npm.cmd run check:data
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npm.cmd run check:style-refs
```

Expected: PASS; counts remain 87 total styles and 8 future/digital styles.

- [ ] **Step 6: Commit the curated definition**

```powershell
git add src/data/designStyles.ts scripts/style-references.json docs/style-category-distinction-table.md
git commit -m "docs: define clinical hologram design language"
```

### Task 6: Generate and inspect the two image assets

**Files:**
- Modify: `src/data/designStyles.ts`
- Create: `public/generated/design-styles/hologram-style.webp`
- Replace: `public/generated/moodboards/hologram-style-realistic-v2.webp`

- [ ] **Step 1: Read the required generation guidance before any image call**

Read all of `C:\Users\sw08\.codex\skills\.system\imagegen\SKILL.md` and `docs/style-moodboard-imagegen-guidelines.md`. Follow their prompt reporting, visual review, save path, and metadata workflow exactly.

- [ ] **Step 2: Generate the subject image**

Use Codex ImageGen with this direction:

```text
Bright clinical research laboratory, one central translucent non-gory human torso anatomical volume reconstructed from medical scan slices, pearlescent white room, delicate cyan and violet spectral edges with one pale amber measurement highlight, visible coronal slice separation and genuine volumetric depth, precision optical imaging, high-end medical visualization, quiet clean atmosphere, no readable text, no logos, no dark cyberpunk, no HUD overlay, no floating glass dashboard, no chrome hardware, no rainbow fog, landscape 16:10.
```

Save the generated source and convert with the installed `sharp` package to `public/generated/design-styles/hologram-style.webp` at high WebP quality. Do not stretch or crop out the anatomical subject.

- [ ] **Step 3: Generate the clinical optics moodboard**

Use a top-down realistic editorial flat lay containing printed anatomical volume crops without labels, translucent scan-film slices, cyan/violet diffraction film, clear acrylic optics, pale amber measurement acetate, fine grid vellum, optical prism fragments, pearl clinical paper, tape corners, dust, refraction, and real shadows. Exclude readable text, fake UI, people, faces, gore, cyberpunk darkness, chrome dominance, and generic rainbow spectacle. Save as `public/generated/moodboards/hologram-style-realistic-v2.webp`.

- [ ] **Step 4: Inspect both final WebPs at original detail**

Use the local image viewer on both files. Pass criteria:

- subject image: one central anatomical volume, obvious slice depth, bright clinical setting, no gore or pseudo-text;
- moodboard: clearly a physical editorial board, medical optics materials, no dark-metaverse look, no logo/watermark;
- both: cyan/violet restrained, pale amber secondary, no chrome-dominant or frosted-card composition.

If either fails one criterion, regenerate only that image and re-inspect it.

- [ ] **Step 5: Synchronize the moodboard metadata**

Update `alt`, `caption`, `directionKeywords`, and `prompt` in the existing `hologram-style` moodboard entry so they truthfully describe the accepted clinical optics image. Keep `imageSrc` unchanged.

- [ ] **Step 6: Commit the accepted assets and metadata**

```powershell
git add public/generated/design-styles/hologram-style.webp public/generated/moodboards/hologram-style-realistic-v2.webp src/data/designStyles.ts
git commit -m "assets: add clinical hologram imagery"
```

### Task 7: Browser QA in full, mobile, and compact contexts

**Files:**
- Modify: `docs/style-sample-web-review-log.md`

- [ ] **Step 1: Start the required webpack dev server**

```powershell
npm.cmd run dev -- --hostname 127.0.0.1
```

Expected: Next.js reports a local URL and serves the app without a Turbopack error. Run it as a background process if the shell needs to continue, and verify the selected port from its log.

- [ ] **Step 2: Verify the full detail sample at 1280×900**

Open the hologram style detail route found by searching the app route files for the style detail page, then verify:

- `LUMA VOLUME` and the full chamber are visible above the fold;
- the anatomical image is revealed rather than smothered;
- clicking Vessel and Bone updates `aria-pressed`, series, focus, and measurement;
- moving the slice range updates the percentage and coronal clip;
- keyboard Tab reaches every mode and range control with visible focus;
- `document.documentElement.scrollWidth - document.documentElement.clientWidth` equals `0`;
- browser console contains no errors.

Save one evidence screenshot under `.playwright-cli/` without staging it.

- [ ] **Step 3: Verify mobile at 375×812**

At a 375×812 viewport, confirm the header, chamber, active mode, slice control, and orientation cube remain legible; no control is clipped; horizontal overflow equals `0`; and the chamber remains the dominant block. Save one unstaged evidence screenshot.

- [ ] **Step 4: Verify the compact listing sample**

Open the style listing route, locate the compact `hologram-style` card, and confirm it shows `LUMA VOLUME`, anatomical depth, selected mode, slice value, and orientation cube without colliding with the card boundary. Horizontal overflow must equal `0` at both desktop and 375px widths.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`, reload the detail page, and confirm computed animation names for the sweep and volume image are `none`. Interaction state changes must still work.

- [ ] **Step 6: Mark the review log verified with evidence**

Change row 33 from `queued` to `verified` and summarize: `LUMA VOLUME clinical anatomy viewer`, four-plane chamber, tissue modes, slice control, orientation cube, scan strip, bright pearl/cyan/violet optics, and verified full/mobile/compact overflow. Add a dated detail note with the viewport sizes, interaction checks, reduced-motion result, and console result.

- [ ] **Step 7: Commit the verified review record**

```powershell
git add docs/style-sample-web-review-log.md
git commit -m "docs: verify clinical hologram sample"
```

### Task 8: Final re-derivation, build, and delivery

**Files:**
- Verify all files from Tasks 1–7

- [ ] **Step 1: Re-run every automated guardrail independently**

```powershell
npm.cmd run check:data
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npm.cmd run check:style-refs
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
git diff --check
```

Expected: every command exits 0; build completes all static pages; data remains 87 styles, future/digital remains 8, distinction remains 87, and references remain 87.

- [ ] **Step 2: Attack the result against its nearest neighbors**

Compare the rendered sample with `glassmorphism`, `hud`, `high-tech`, and `chromecore`. Reject completion if it reads as frosted cards, a first-person reticle overlay, an ops dashboard, or metallic hardware. Pass only if the anatomical volume and four depth planes remain the first visual read.

- [ ] **Step 3: Confirm scope and clean staging**

```powershell
git status --short
git log --oneline -8
```

Expected: only the pre-existing unrelated untracked files remain. Do not stage `.claude/`, `.codex-run/`, `.next-dev-logs/`, log files, Playwright evidence, `src/data/designStyles.ts.codex-test`, or existing JPEG/PNG screenshots.

- [ ] **Step 4: Push the completed branch**

```powershell
git push origin codex/mid-century-listening-room
```

Expected: push succeeds and the remote branch advances through all hologram implementation commits.

- [ ] **Step 5: Report the outcome, evidence, and residual risk**

Lead with the shipped result. Report the two asset paths, interactive controls verified, full/mobile/compact overflow result, reduced-motion result, automated check counts, build result, commit range, and push status. State any unverified item explicitly; do not call the style complete if browser QA or the image review was skipped.
