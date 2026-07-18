# HUD Cinematic GCS Reinforcement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the in-progress `hud` sample into a cinematic, operational drone GCS HUD and replace its missing moodboard with a verified new HUD-specific asset.

**Architecture:** Keep the shared renderer branch thin and concentrate interactive flight instrumentation in the existing `FlightOsdConsole` client leaf. Drive waypoint-dependent marker, guidance, and telemetry output from one typed data record; keep motion in HUD-scoped CSS with reduced-motion fallbacks. Generate and inspect scene and moodboard raster assets separately from the DOM-built interface.

**Tech Stack:** Next.js 16.2.7, React 19, TypeScript, Tailwind CSS v4, project Node guardrail scripts, Playwright, local OpenAI-compatible image generation.

---

## File Map

- Modify `src/components/design-style/FlightOsdConsole.tsx`: flight symbology, typed waypoint telemetry, data tapes, corner state, compact behavior, and accessible interaction.
- Modify `src/app/globals.css`: HUD scan, caution, and selection motion plus reduced-motion rules.
- Modify `scripts/check-future-digital.mjs`: behavioral and structural HUD marker assertions.
- Modify `scripts/check-style-distinction.mjs`: HUD-specific structure markers that reject generic dashboards.
- Modify `scripts/gen-style-image.mjs`: keep or refine the HUD FPV scene prompt if the rendered crop needs correction.
- Modify `src/data/designStyles.ts`: final moodboard prompt and metadata only if generation review requires prompt correction.
- Create `public/generated/moodboards/hud-realistic-v2.webp`: approved HUD research-board flat lay.
- Replace or retain after visual review `public/generated/design-styles/hud.webp`: approved FPV scene.
- Modify `docs/style-sample-web-review-log.md`: record tested viewports, interaction results, image review, and final status.

### Task 1: Freeze the Current HUD Scope and Add Failing Guardrails

**Files:**
- Modify: `scripts/check-future-digital.mjs`
- Modify: `scripts/check-style-distinction.mjs`

- [ ] **Step 1: Record the current HUD-only diff and confirm the missing asset**

Run:

```powershell
git diff -- src/components/design-style/FlightOsdConsole.tsx src/components/design-style/DesignStyleSampleRenderer.tsx src/data/designStyles.ts src/app/globals.css scripts/check-future-digital.mjs scripts/check-style-distinction.mjs docs/style-sample-web-review-log.md
Test-Path public/generated/moodboards/hud-realistic-v2.webp
```

Expected: the existing Techwear-to-HUD work is visible and `Test-Path` prints `False`. Do not discard or overwrite unrelated dirty changes.

- [ ] **Step 2: Extend the future-digital HUD markers**

Change the HUD marker list so it requires the existing identity plus the reinforced operational vocabulary:

```js
hud: ["FLIGHT OSD", "pitch ladder", "battery cell", "flight path vector", "telemetry rail"],
```

- [ ] **Step 3: Extend the distinction markers**

Require these HUD sample strings in the HUD distinction entry:

```js
hud: ["KESTREL GCS", "FLIGHT OSD", "pitch ladder", "waypoint", "guidance line", "data tape"],
```

- [ ] **Step 4: Run the checks and verify RED**

Run:

```powershell
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
```

Expected: both fail specifically because the new operational markers are absent from `FlightOsdConsole.tsx`, while unrelated style checks do not fail.

### Task 2: Build Coherent Flight Symbology and Waypoint State

**Files:**
- Modify: `src/components/design-style/FlightOsdConsole.tsx`

- [ ] **Step 1: Expand the waypoint data contract**

Replace the current partial detail model with one source of truth:

```ts
type Waypoint = {
  readonly id: WaypointId;
  readonly label: string;
  readonly distance: string;
  readonly eta: string;
  readonly targetAltitude: string;
  readonly action: string;
  readonly position: { readonly left: string; readonly top: string };
};
```

Populate `WP 3` and `HOME` with distinct distance, ETA, altitude, and action values so every displayed dependent field visibly changes on selection.

- [ ] **Step 2: Add central flight components**

Create focused local components with these exact public signatures:

```tsx
function RollArc({ compact }: { readonly compact: boolean }): React.ReactNode
function FlightPathVector({ compact }: { readonly compact: boolean }): React.ReactNode
function GuidanceLine({ waypoint, compact }: { readonly waypoint: Waypoint; readonly compact: boolean }): React.ReactNode
```

`RollArc` returns an absolutely positioned semicircular row of five calibrated tick spans plus a fixed top pointer. `FlightPathVector` returns one ring, two horizontal wing bars, and one vertical stem. `GuidanceLine` returns a thin absolutely positioned line whose origin is derived from the selected waypoint position and whose end aims toward the shared center. Use DOM borders and transforms, not canvas or generated imagery. Include the literal comments or accessible labels `flight path vector` and `guidance line` for guardrails.

- [ ] **Step 3: Upgrade `PitchLadder`**

Keep positive rungs solid and negative rungs dashed, preserve a brighter zero horizon, and align `RollArc`, `PitchLadder`, and `FlightPathVector` around the same center container. In compact mode render three rungs; in full mode render five.

- [ ] **Step 4: Connect waypoint selection to every dependent output**

Render `GuidanceLine` for the selected waypoint and replace the two-line readout with a bottom `telemetry rail` containing:

```tsx
{waypoint.label}
{waypoint.distance}
{waypoint.eta}
{waypoint.targetAltitude}
{waypoint.action}
```

Retain `aria-pressed`, keyboard focus, and real `<button type="button">` waypoint controls.

- [ ] **Step 5: Run guardrails and TypeScript**

Run:

```powershell
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npx.cmd tsc --noEmit
```

Expected: both HUD checks pass and TypeScript exits `0`.

### Task 3: Increase Instrument Density Without Creating Cards

**Files:**
- Modify: `src/components/design-style/FlightOsdConsole.tsx`

- [ ] **Step 1: Replace decorative data ticks with calibrated data tapes**

Give `DataTape` a numeric center, step, and unit:

```ts
type DataTapeProps = {
  readonly side: "left" | "right";
  readonly label: string;
  readonly value: number;
  readonly step: number;
  readonly unit: string;
  readonly compact: boolean;
};
```

Render five neighboring numeric marks in full mode and three in compact mode, with a fixed triangular or chevron current-value pointer. Include the accessible label `data tape`.

- [ ] **Step 2: Rebalance corner clusters**

Keep four distinct edge responsibilities: mission and elapsed time at top-left; GPS, satellites, and link at top-right; battery voltage and four cells at bottom-left; wind and flight mode adjacent to the telemetry rail. Values use tabular numbers and brighter color than labels.

- [ ] **Step 3: Enforce compact hierarchy**

For `compact`, preserve the central symbology, current speed and altitude, selected marker, ARMED state, and amber battery warning. Hide neighboring tape numbers and low-priority mission copy before shrinking the remaining type below readable size.

- [ ] **Step 4: Verify source structure**

Run:

```powershell
rg -n "flight path vector|guidance line|telemetry rail|data tape|aria-pressed|battery cells" src/components/design-style/FlightOsdConsole.tsx
npx.cmd tsc --noEmit
```

Expected: all six structural concepts are found and TypeScript exits `0`.

### Task 4: Add Restrained HUD Motion and Reduced-Motion Safety

**Files:**
- Modify: `src/components/design-style/FlightOsdConsole.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add motion hooks in the HUD leaf**

Use only these scoped classes:

```tsx
hud-blink
hud-caution
hud-scanline
hud-guidance
```

Apply `hud-caution` only to the low battery cell or warning label, `hud-scanline` to one pointer-events-none viewport layer, and `hud-guidance` to the selected guidance line.

- [ ] **Step 2: Define restrained animations**

Add HUD-scoped keyframes: a 2.2-second ARMED breath, a 3.2-second amber caution pulse, an 8-second low-opacity scan traversal, and a 180ms guidance opacity/scale settle. Do not animate the pitch ladder, data tapes, or entire viewport.

- [ ] **Step 3: Disable nonessential motion**

Inside the existing `prefers-reduced-motion: reduce` block set all four HUD animation classes to `animation: none`; selected states remain visually legible without motion.

- [ ] **Step 4: Run lint and motion checks**

Run:

```powershell
rg -n "hud-(blink|caution|scanline|guidance)|prefers-reduced-motion" src/app/globals.css src/components/design-style/FlightOsdConsole.tsx
npm.cmd run lint
```

Expected: every motion hook and reduced-motion rule is found; lint exits `0`.

### Task 5: Generate and Inspect the Missing HUD Moodboard

**Files:**
- Modify if prompt correction is needed: `src/data/designStyles.ts`
- Create: `public/generated/moodboards/hud-realistic-v2.webp`
- Inspect: `public/generated/design-styles/hud.webp`

- [ ] **Step 1: Use the approved prompt from the HUD data record**

Generate a 16:10 realistic top-down research board with the exact approved ingredients: matte black instrument bench, ice-blue printed acetate, reticle and horizon-ladder studies, smoked optical glass, brushed aluminum, blue and amber translucent chips, grid film, and a night aerial or cockpit crop. Ban readable text, logos, fake UI, floating holograms, neon city imagery, and card collages.

- [ ] **Step 2: Save the selected asset at the declared path**

Save or convert the chosen output as:

```text
public/generated/moodboards/hud-realistic-v2.webp
```

Do not rename `techwear-realistic-v2.webp` or use it as the HUD image.

- [ ] **Step 3: Inspect both HUD raster assets directly**

Open `public/generated/moodboards/hud-realistic-v2.webp` and `public/generated/design-styles/hud.webp` at original detail. Reject the moodboard if it is synthetic, text-bearing, or only UI cards; reject the scene if it contains baked-in UI or cannot support readable overlays.

- [ ] **Step 4: Verify image dimensions and data wiring**

Run:

```powershell
node -e "const sharp=require('sharp'); Promise.all(['public/generated/moodboards/hud-realistic-v2.webp','public/generated/design-styles/hud.webp'].map(async p=>[p,await sharp(p).metadata()])).then(console.log)"
npm.cmd run check:data
npm.cmd run check:style-refs
```

Expected: both images decode as WebP with nonzero dimensions; data and style-reference checks exit `0`.

### Task 6: Browser QA, Documentation, and Release

**Files:**
- Modify: `docs/style-sample-web-review-log.md`
- Verify: all HUD-related files from Tasks 1-5

- [ ] **Step 1: Start the Windows-safe development server**

Run `npm.cmd run dev` through a hidden background process with stdout and stderr redirected to `.next-dev-logs/`. Read the log to discover the actual port; do not assume port 3000.

- [ ] **Step 2: Verify full, narrow, and compact rendering with Playwright**

Open `/ko/styles/hud` at desktop 1280px and mobile 375px, plus the filtered styles listing containing the compact sample. For each context assert:

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth === 0
```

Capture screenshots and visually inspect scene exposure, central alignment, tape legibility, telemetry rail, amber warning restraint, and absence of clipping.

- [ ] **Step 3: Verify waypoint behavior and accessibility**

Click and keyboard-activate both waypoint buttons. Confirm `aria-pressed` changes and distance, ETA, target altitude, action status, guidance line, and marker emphasis all update together. Emulate reduced motion and confirm the HUD remains understandable with animations disabled. Confirm the browser console has no errors.

- [ ] **Step 4: Run the complete command gate**

Run:

```powershell
npm.cmd run check:data
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npm.cmd run check:style-refs
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
```

Expected: every command exits `0`. If the shared dirty work makes `build` fail outside HUD scope, record the exact failure and prove the HUD route through the dev render instead of calling the build successful.

- [ ] **Step 5: Record verified evidence**

Change the HUD queue row to `verified` and append the tested viewport widths, overflow values, waypoint state result, reduced-motion result, screenshot filenames, generated-image review, commands, and any remaining risk to `docs/style-sample-web-review-log.md`.

- [ ] **Step 6: Stage only HUD-related work and inspect the index**

Run:

```powershell
git add -- src/components/design-style/FlightOsdConsole.tsx src/components/design-style/DesignStyleSampleRenderer.tsx src/data/designStyles.ts src/app/globals.css scripts/check-future-digital.mjs scripts/check-style-distinction.mjs scripts/gen-style-image.mjs scripts/style-references.json docs/style-category-distinction-table.md docs/style-sample-web-review-log.md public/generated/design-styles/hud.webp public/generated/moodboards/hud-realistic-v2.webp
git diff --cached --check
git diff --cached --stat
```

Expected: only HUD replacement and reinforcement files are staged; temporary logs, screenshots, `.next` output, `src/data/designStyles.ts.codex-test`, and unrelated changes are absent.

- [ ] **Step 7: Commit and push**

Run:

```powershell
git commit -m "Reinforce HUD flight control sample"
git push origin HEAD
```

Expected: commit succeeds and the current branch pushes to `origin` without including unrelated files.
