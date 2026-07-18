# Metaverse Style Retirement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire `metaverse-style` from every active catalog, renderer, validation, documentation, reference, route, and asset surface while preserving dated historical plans.

**Architecture:** Remove the style at its source—the `designStyles` seed and related maps—so listings, related-style resolution, and static routes naturally shrink to 87 records. Remove the dedicated renderer and active guardrail expectations in the same change, then prove the old slug survives only in explicitly preserved historical files and unrelated untracked data.

**Tech Stack:** Next.js 16.2.7, React 19, TypeScript, project Node guardrail scripts, Git.

---

## File Map

- Modify `src/data/designStyles.ts`: remove palette, seed, research, token, and moodboard entries for `metaverse-style`; rewrite active neighboring comparisons if present.
- Modify `src/components/design-style/DesignStyleSampleRenderer.tsx`: remove `MetaverseWorld`, its exclusive constants, and its routing branch.
- Modify `scripts/check-future-digital.mjs`: remove the slug and its marker contract.
- Modify `scripts/check-style-distinction.mjs`: remove the slug from active sample coverage, function mapping, and marker mapping.
- Modify `scripts/style-references.json`: delete the current Metaverse reference record and rewrite active neighboring comparison notes.
- Modify `docs/style-category-distinction-table.md`: delete the active category row and update neighboring comparisons.
- Modify `docs/style-sample-web-review-log.md`: remove the queued row and update the next-style pointer without rewriting historical archived sections.
- Delete `public/generated/moodboards/metaverse-style-realistic-v2.webp`: remove the dedicated active asset.
- Preserve `docs/superpowers/plans/2026-06-02-design-style-library.md` and `docs/superpowers/plans/2026-06-04-representative-style-redesign.md` unchanged.

### Task 1: Add Retirement Assertions and Verify RED

**Files:**
- Modify: `scripts/check-future-digital.mjs`
- Modify: `scripts/check-style-distinction.mjs`

- [ ] **Step 1: Record active and historical occurrences separately**

Run:

```powershell
rg -n -i "metaverse-style|MetaverseWorld|메타버스 스타일" src scripts docs/style-category-distinction-table.md docs/style-sample-web-review-log.md public/generated
rg -n -i "metaverse-style|메타버스 스타일" docs/superpowers/plans/2026-06-02-design-style-library.md docs/superpowers/plans/2026-06-04-representative-style-redesign.md
```

Expected: active occurrences exist across data, renderer, checks, current docs, references, and the moodboard; historical occurrences exist in both preserved plans.

- [ ] **Step 2: Change the expected active counts first**

Remove `metaverse-style` from the `futureDigitalSlugs` array and its marker-map entry in `scripts/check-future-digital.mjs`. Remove it from the slug-specific sample coverage array, function mapping, and marker mapping in `scripts/check-style-distinction.mjs`.

- [ ] **Step 3: Run guardrails and verify RED**

Run:

```powershell
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
```

Expected: the checks fail because active `designStyles` or renderer structure still contains the retired style, proving the remaining implementation work is detectable.

### Task 2: Remove Active Data and Reference Records

**Files:**
- Modify: `src/data/designStyles.ts`
- Modify: `scripts/style-references.json`

- [ ] **Step 1: Remove all current data-map entries**

Delete only the complete property or tuple whose key or first value is `metaverse-style` from the palette map, seed tuple list, future/digital research map, style-token override map if present, and moodboard map. Preserve surrounding commas and neighboring entries exactly.

- [ ] **Step 2: Remove the active reference JSON object**

Delete the complete top-level `"metaverse-style"` object from `scripts/style-references.json`, leaving the adjacent JSON entries syntactically valid.

- [ ] **Step 3: Rewrite dangling active comparisons**

Search active data and reference notes for `metaverse-style`. Where a remaining style used it only as a comparison target, replace it with the nearest live neighbor that preserves the intended distinction:

```text
hologram-style comparison -> gaming or high-tech, depending on whether the sentence contrasts spatial play or control surfaces
```

Do not alter dated historical plans or `src/data/designStyles.ts.codex-test`.

- [ ] **Step 4: Verify data and references are GREEN**

Run:

```powershell
npm.cmd run check:data
npm.cmd run check:style-refs
```

Expected: `data check passed: 87 styles, 10 categories` and `style reference check passed: 87 styles covered`.

### Task 3: Remove the Dedicated Renderer

**Files:**
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [ ] **Step 1: Identify component boundaries and exclusive helpers**

Run:

```powershell
Select-String -Path src/components/design-style/DesignStyleSampleRenderer.tsx -Pattern '^function MetaverseWorld|^function ' -Context 0,2
rg -n "MetaverseWorld|SPATIAL LOBBY|avatar mesh|world shard" src/components/design-style/DesignStyleSampleRenderer.tsx
```

Expected: one dedicated component block and one slug routing branch are identified; any exclusive local arrays or constants appear only inside that block.

- [ ] **Step 2: Delete the dedicated component and route branch**

Remove the complete `MetaverseWorld` function from its declaration through its matching closing brace. Remove this complete branch:

```tsx
if (style.slug === "metaverse-style") {
  return <MetaverseWorld {...props} />;
}
```

Do not modify the immediately adjacent Hologram or Gaming renderers.

- [ ] **Step 3: Verify renderer retirement**

Run:

```powershell
rg -n "MetaverseWorld|SPATIAL LOBBY|avatar mesh|world shard|style.slug === \"metaverse-style\"" src/components/design-style/DesignStyleSampleRenderer.tsx
npx.cmd tsc --noEmit
```

Expected: the scoped search returns no matches and TypeScript exits `0`.

### Task 4: Remove Current Catalog Documentation and Asset

**Files:**
- Modify: `docs/style-category-distinction-table.md`
- Modify: `docs/style-sample-web-review-log.md`
- Delete: `public/generated/moodboards/metaverse-style-realistic-v2.webp`

- [ ] **Step 1: Delete the active distinction row**

Remove the complete `metaverse-style` table row. Rewrite any live neighboring row that names it as an overlap target so the remaining table does not point to a nonexistent slug.

- [ ] **Step 2: Delete the active review-queue row**

Remove the No. 35 `metaverse-style` row from the active queue. If a current “next style” line points to it, advance the pointer to the next live queued style. Keep completed historical review prose unchanged.

- [ ] **Step 3: Delete the dedicated moodboard safely**

Resolve and verify the exact asset path is inside `public/generated/moodboards`, then remove only:

```text
public/generated/moodboards/metaverse-style-realistic-v2.webp
```

The deletion remains recoverable through Git.

- [ ] **Step 4: Prove the active surface is clean and history remains**

Run:

```powershell
rg -n -i "metaverse-style|MetaverseWorld|메타버스 스타일" src scripts docs/style-category-distinction-table.md docs/style-sample-web-review-log.md public/generated
rg -n -i "metaverse-style|메타버스 스타일" docs/superpowers/plans/2026-06-02-design-style-library.md docs/superpowers/plans/2026-06-04-representative-style-redesign.md
```

Expected: the active search returns no matches; both historical files still return their original records.

### Task 5: Full Verification, Commit, and Push

**Files:**
- Verify all files changed in Tasks 1-4
- Add: `docs/superpowers/plans/2026-07-18-metaverse-style-retirement.md`

- [ ] **Step 1: Run the complete command gate**

Run:

```powershell
npm.cmd run check:data
npm.cmd run check:future-digital
npm.cmd run check:style-distinction
npm.cmd run check:style-refs
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
```

Expected: 87 styles, 10 categories; 8 future/digital styles; 87 slug-specific samples; 87 reference records; TypeScript, lint, and build all exit `0`.

- [ ] **Step 2: Verify the removed static route is absent**

Inspect the build output or generated route artifacts for `metaverse-style` and confirm no locale generates that detail path. Confirm a neighboring live future/digital style remains present.

- [ ] **Step 3: Stage only retirement files**

Run:

```powershell
git add -- docs/style-category-distinction-table.md docs/style-sample-web-review-log.md docs/superpowers/plans/2026-07-18-metaverse-style-retirement.md scripts/check-future-digital.mjs scripts/check-style-distinction.mjs scripts/style-references.json src/components/design-style/DesignStyleSampleRenderer.tsx src/data/designStyles.ts public/generated/moodboards/metaverse-style-realistic-v2.webp
git diff --cached --check
git diff --cached --stat
```

Expected: only the active retirement and plan files are staged. Dated historical plans, `.playwright-cli`, logs, screenshots, and `src/data/designStyles.ts.codex-test` are absent.

- [ ] **Step 4: Commit and push**

Run:

```powershell
git commit -m "Retire metaverse design style"
git push origin HEAD
```

Expected: the commit succeeds and the current branch pushes to its tracked origin without unrelated files.
