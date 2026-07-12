# Mid-Century Modern Listening Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development for clearly bounded mechanical tasks. The lead retains all visual decisions, image selection, browser QA, and final approval. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current furniture-showroom sample with a polished, interactive `MONO HOUSE` hi-fi listening club that reads immediately as Mid-Century Modern in full and compact renderings.

**Architecture:** Keep `MidCenturyModernStudio` as the renderer-level wrapper so the existing routing and function guardrail remain stable. Move the stateful receiver, session queue, and sample-specific markup into a focused client leaf named `MidCenturyListeningRoom`, which inherits the existing `SampleFrame` CSS variables. Update the style record, distinction copy, generated scene image, and marker checks as one coherent style change.

**Tech Stack:** Next.js 16.2 App Router, React 19, TypeScript, Tailwind CSS 4 utilities, existing design-style token variables, Node guardrail scripts, local OpenAI-compatible image generation, Playwright browser QA.

**Completion contract:** The new listening-room image exists at `public/generated/design-styles/mid-century-modern.webp`; the full and compact samples visibly contain `MONO HOUSE`, `SIDE A / SIDE B`, `Walnut source rail`, `Girard acoustic cloth`, and `Session queue`; the source, play, and acoustic-cloth controls change local state; `npm run check:style-distinction`, `npm run check:data`, `npm run check:style-refs`, `npm run lint`, and `npm run build` pass; fresh desktop, tablet, mobile, and compact-card browser captures show horizontal overflow `0`, no clipping, and no console errors; the review log is marked `verified`; scoped commits are pushed to `codex/mid-century-listening-room`.

**Escape budget:** Make at most three design-render iterations. If the same technical error occurs twice, stop retrying, research three to five fixes, choose the best-supported fix, and continue. Do not weaken the visual brief or guardrails to obtain a green check.

---

### Task 0: Confirm the isolated branch and shared-worktree boundary

**Files:**
- Modify: none

- [ ] **Step 1: Confirm the feature branch**

Run `git branch --show-current`.

Expected: `codex/mid-century-listening-room`. If the branch does not exist, create it from the current approved-spec commit before any implementation edit.

- [ ] **Step 2: Record unrelated dirty work**

Run `git status --short` and retain the list as the staging exclusion baseline. Do not stash, reset, or revert existing user changes.

### Task 1: Lock the new sample contract in the distinction guardrail

**Files:**
- Modify: `scripts/check-style-distinction.mjs`

- [ ] **Step 1: Update the Mid-Century Modern marker expectation**

Keep the function mapping `"mid-century-modern": "MidCenturyModernStudio"`. Replace its content markers with these exact strings:

```js
["MONO HOUSE", "SIDE A / SIDE B", "Walnut source rail", "Girard acoustic cloth", "Session queue"]
```

If the script has a separate structure-marker map, require `MidCenturyListeningRoom` there without changing unrelated styles.

- [ ] **Step 2: Run the guardrail and confirm RED for the intended reason**

Run: `npm run check:style-distinction`

Expected: failure naming one or more of the new Mid-Century Modern markers as missing. A syntax failure or unrelated style failure is not an acceptable RED.

- [ ] **Step 3: Do not commit yet**

Keep this failing expectation with the implementation task so no commit leaves the branch intentionally red.

### Task 2: Build the local-state listening-room client leaf

**Files:**
- Create: `src/components/design-style/MidCenturyListeningRoom.tsx`
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [ ] **Step 1: Read the TypeScript and Next.js constraints before editing**

Read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/public-folder.md` and the project TypeScript configuration. Confirm that only the new leaf needs `"use client"`.

- [ ] **Step 2: Create typed local sample data**

Define immutable source options with `FM 88.3`, `PHONO`, and `TAPE`; three immutable sessions with organic times, titles, hosts or formats, seat counts, and states; and four acoustic-cloth options using inherited sample color variables. Do not use `any`, type assertions other than `as const`, non-null assertions, placeholder copy, emoji icons, or external dependencies.

- [ ] **Step 3: Implement the client state boundary**

Use four local state values only:

```tsx
const [activeSource, setActiveSource] = useState<SourceId>("phono");
const [isPlaying, setIsPlaying] = useState(true);
const [activeCloth, setActiveCloth] = useState<ClothId>("teal");
const [isSeatReserved, setIsSeatReserved] = useState(false);
```

Source buttons must update the active label and tuning-needle position. The play button must update `aria-pressed`, the visible play or pause icon, and the `ON AIR` status. Cloth buttons must update `aria-pressed`, the selected outline, and the speaker-cloth surface. A visible `RESERVE A SEAT` button must toggle to `SEAT HELD` with `aria-pressed` state. Volume and progress values stay presentational.

- [ ] **Step 4: Implement the full `SIDE A / SIDE B` composition**

The leaf must render:

1. A restrained club header with `MONO HOUSE`, `LISTENING ROOM NO. 06`, live status, `MEMBERS / 24`, and the actionable `RESERVE A SEAT` control.
2. `SIDE A`, a dominant image panel using `/generated/design-styles/mid-century-modern.webp`, a small now-playing paper label, a `Noguchi glass table` material annotation, and no heavy scrim.
3. `SIDE B`, a brushed receiver panel with a real frequency scale, tuning needle, source selector, `Jun Fukamachi / Quark`, elapsed and total time, scrubber, transport controls, and volume readout.
4. A clearly labeled `Walnut source rail` with horizontal walnut-slat rhythm.
5. A clearly labeled `Girard acoustic cloth` selector with four real button states.
6. A clearly labeled `Session queue` with three believable rows and `ON AIR`, `NEXT`, or `SOLD OUT` states.

Use the existing sample CSS variables and relative sizing. Spend visual emphasis on the image and receiver scale. Keep borders thin, corners shallow, and shadows material-specific.

- [ ] **Step 5: Implement compact mode intentionally**

When `compact` is true, preserve a two-column internal split. Keep the club name, image crop, tuning scale, current track, source state, and at least two session states visible. Hide only lower-priority metadata. Do not stack into a generic vertical card.

- [ ] **Step 6: Implement 375px non-compact behavior**

At narrow detail width, use a deliberate stacked `SIDE A` then `SIDE B` composition within the sample. Keep the image at a meaningful aspect ratio, place the receiver scale above the queue, retain the seat action, and allow the page sample to grow vertically without fixed-height clipping. The internal sample must remain distinct from compact-card mode.

- [ ] **Step 7: Replace the existing renderer body with the wrapper**

Import the client leaf and reduce `MidCenturyModernStudio` to the existing `SampleFrame` plus `<MidCenturyListeningRoom compact={compact} />`. Preserve `className`, `style`, the `mid-century-modern` routing branch, and unrelated renderer edits.

- [ ] **Step 8: Run the first GREEN checks**

Run:

```bash
npm run check:style-distinction
npx tsc --noEmit
```

Expected: the new markers and `MidCenturyListeningRoom` structure are found; TypeScript exits without errors in the new component or wrapper.

### Task 3: Rewrite the Mid-Century Modern data contract

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/style-references.json`
- Modify: `docs/style-category-distinction-table.md`

- [ ] **Step 1: Update the style narrative without changing its historical foundation**

Rewrite only the `mid-century-modern` visual features, layout traits, applicable use cases, image prompt, reference notes, `representativeTraits`, and `tokenIntent` so the content vehicle is a hi-fi listening club. Keep the current material and historical references to Eames, Nelson, Noguchi, and Girard.

- [ ] **Step 2: Set the exact representative traits**

```ts
[
  "MONO HOUSE listening room",
  "SIDE A / SIDE B receiver",
  "Walnut source rail",
  "Girard acoustic cloth",
  "Session queue",
]
```

The `tokenIntent` must name all five and must distinguish them from 1970s groovy commerce, retro-futurist travel posters, Bauhaus school geometry, and quiet Japandi interiors.

- [ ] **Step 3: Update supporting reference and distinction copy**

Change the style-reference note and distinction-table row to describe a listening-room application with walnut audio furniture, a receiver scale, acoustic textile, and session programming. Do not change neighboring rows.

- [ ] **Step 4: Run data checks**

Run:

```bash
npm run check:data
npm run check:style-refs
npm run check:style-distinction
```

Expected: all three commands pass and the five exact representative traits are present.

### Task 4: Generate and approve the listening-room scene

**Files:**
- Modify: `scripts/gen-style-image.mjs`
- Replace: `public/generated/design-styles/mid-century-modern.webp`

- [ ] **Step 1: Add the production prompt**

Add a `"mid-century-modern"` prompt that requires a wide 1960s listening lounge with a walnut speaker console, period turntable or reel-to-reel unit, molded plywood lounge chair, low organic glass table, warm architectural lamp, woven acoustic textile, cream walls, olive and burnt-orange accents, realistic editorial photography, and open negative space for cropping. Explicitly ban readable text, logos, people, 1970s groovy styling, Bauhaus primary geometry, synthwave neon, and fake UI.

- [ ] **Step 2: Generate the asset through the prescribed endpoint**

Run in Git Bash:

```bash
OPENAI_BASE_URL=http://127.0.0.1:18632/v1 node scripts/gen-style-image.mjs mid-century-modern
```

Expected: a 1536 by 1024 WebP is written to `public/generated/design-styles/mid-century-modern.webp`.

- [ ] **Step 3: Inspect and accept or regenerate**

Open the WebP at original detail. Accept only if the audio equipment, chair, glass table, and material palette are clearly visible and the image contains no banned content. Regenerate with a materially revised prompt if the crop or style is weak.

### Task 5: Verify the real rendered artifact and polish it

**Files:**
- Modify as needed: `src/components/design-style/MidCenturyListeningRoom.tsx`
- Modify as needed: `src/components/design-style/DesignStyleSampleRenderer.tsx`
- Modify: `docs/style-sample-web-review-log.md`
- Create evidence under: `output/playwright/per-style-review/mid-century-modern/listening-room/`

- [ ] **Step 1: Start the required development server**

Run `npm run dev -- --webpack` using a free local port. Read the final ready URL from the server output.

- [ ] **Step 2: Drive the detail page at three widths**

Use a real Chromium browser at 1280px, 768px, and 375px on `/en/styles/mid-century-modern`. At each width, capture the sample, measure `document.documentElement.scrollWidth - document.documentElement.clientWidth`, and inspect the console.

Expected: overflow is `0`, no console errors appear, and text or controls do not clip.

- [ ] **Step 3: Exercise local interactions**

Click each source, toggle play twice, select each acoustic cloth, and toggle `RESERVE A SEAT` twice. Verify the visible label, needle, `aria-pressed`, play state, selected cloth, and `SEAT HELD` state update. Capture rest and changed states.

- [ ] **Step 4: Drive the real compact card**

Open `/en/styles?q=mid-century%20modern` at 1280px. Confirm the compact card includes the club identity, image, receiver signal, current track, and at least two session states without clipping or overflow.

- [ ] **Step 5: Perform lead visual polish**

Review every capture against the approved design spec. Fix composition, crop, hierarchy, material depth, typography, and compact legibility until the sample reads immediately as Mid-Century Modern and does not resemble a generic dashboard.

- [ ] **Step 6: Run the complete deterministic gate**

Run:

```bash
npm run check:data
npm run check:style-refs
npm run check:style-distinction
npm run lint
npm run build
```

Expected: every command exits `0`. If an unrelated pre-existing failure appears, prove it is unrelated before reporting it.

- [ ] **Step 7: Record verification**

Update the `mid-century-modern` row and append concise evidence in `docs/style-sample-web-review-log.md`, including viewports, interaction checks, overflow values, command results, and evidence paths.

### Task 6: Review, commit, and push the scoped result

**Files:**
- Review all paths changed by Tasks 1 through 5

- [ ] **Step 1: Run independent spec and code-quality review**

Give reviewers the design spec, implementation plan, scoped diff, verification output, and fresh screenshot paths. Fix blocking findings and repeat review against fresh captures.

- [ ] **Step 2: Run final runtime debugging audit**

Record three plausible runtime failure hypotheses and the evidence that confirms or rejects each. Recheck source selection, compact overflow, and generated-image loading through the real browser.

- [ ] **Step 3: Inspect and stage only this redesign**

Use `git diff` and hunk staging for already-dirty shared files. Do not stage unrelated README, global CSS, Glitch Art, generated screenshots, logs, or other user work.

- [ ] **Step 4: Commit in atomic groups**

Keep implementation and its guardrail together, then data and generated image, then verification documentation if the repository history supports three groups. Verify each staged diff before committing.

- [ ] **Step 5: Push the feature branch**

Run `git push -u origin codex/mid-century-listening-room` only after all checks and reviews pass.
