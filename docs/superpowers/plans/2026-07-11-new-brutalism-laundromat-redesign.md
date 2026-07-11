# New Brutalism "LOUD LAUNDRY" Laundromat Kiosk Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Gumroad-clone `NeoBrutalistApp` sample with `NeoBrutalistLaundromat` — a coin-laundry self-service kiosk whose machine-status grid, cycle-builder form, and rates table restore the style's representativeTraits, and repair the drifted guardrail markers.

**Architecture:** One render function inside `src/components/design-style/DesignStyleSampleRenderer.tsx` (project pattern: all samples in this file). Guardrail markers in `scripts/check-style-distinction.mjs` are currently FAILING for NeoBrutalistApp (stale markers from a previous redesign) — this plan replaces them, so after Task 1 the new-brutalism asserts pass for the first time in a while. Style copy in `src/data/designStyles.ts`.

**Tech Stack:** Next.js (this repo's patched version — see AGENTS.md), Tailwind arbitrary values with `--sample-*` CSS vars, Playwright MCP for render verification.

**Spec:** `docs/superpowers/specs/2026-07-11-new-brutalism-laundromat-redesign-design.md`

## Global Constraints

- Neo-brutalist visual language STAYS: `border-[3px]`/`border-2` black borders, zero-blur offset shadows (`6px 6px 0` / `4px 4px 0 var(--sample-border)`), flat saturated panels. Do not soften it.
- Copy rules: real laundromat language only (machine ids W1–W4/D1–D2, minutes remaining, `$4.50`, "card ok"). NO SaaS copy, NO style-commentary labels.
- Required strings in the new function body (guardrail): `LOUD LAUNDRY`, `machine status`, `cycle builder`, `wash rates`.
- Forbidden strings in the new function body: `PALLADIO & POP`, `The Quotation Sale`, `browse by era`, `catalogue foreword` (postmodern markers).
- Form controls are spans styled to LOOK native (select ▾ / radio dots / checkbox squares) — no real `<select>/<input>/<button>` elements.
- No generated image in this sample (flat graphic style; do not remove the `GENERATED_STYLE_IMAGES["new-brutalism"]` map entry itself).
- Grid gotcha (hit in the postmodernism task): a grid with only `grid-rows-*` gets an implicit column that will NOT shrink below children's min-content and clips. Explicit `grid-cols-[minmax(0,1fr)]` or `min-w-0` on children where needed.
- Decorations stay inside the `SampleFrame` (overflow-hidden).
- `npm run check:style-distinction` has PRE-EXISTING failures for glitch-art / hiphop-style. OUT OF SCOPE. Success = zero error lines mentioning NeoBrutalist/LAUNDRY (note: unlike the postmodern task, the NeoBrutalistApp failures ARE in scope and must disappear).
- Dev server already running at `http://localhost:3000` — do not start another.
- Commits directly to `main`; messages end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Guardrail update + component rewrite

**Files:**
- Modify: `scripts/check-style-distinction.mjs:19` (functionBody name)
- Modify: `scripts/check-style-distinction.mjs:144` (slug→function map)
- Modify: `scripts/check-style-distinction.mjs:235` (requiredFamilyMarkers)
- Modify: `scripts/check-style-distinction.mjs:313` (assert message)
- Modify: `scripts/check-style-distinction.mjs:332-346` (three marker loops)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx:1534-1676` (replace `NeoBrutalistApp` with `NeoBrutalistLaundromat`; line numbers may drift — match on content)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx` router branch `if (style.slug === "new-brutalism")` (search by content)

**Interfaces:**
- Consumes: existing helpers in the same file — `SampleFrame` (`{children, className, compact, style}`), `cn`, `Props` type. (No `GeneratedStyleImageSurface`, no icon components needed.)
- Produces: `function NeoBrutalistLaundromat({ className, compact = false, style }: Props)` — referenced by the router branch and by `scripts/check-style-distinction.mjs` via `functionBody("NeoBrutalistLaundromat")`.

- [ ] **Step 1: Update the guardrail script (the failing test)**

In `scripts/check-style-distinction.mjs`:

Line 19:
```js
const neoBrutalistBody = functionBody("NeoBrutalistLaundromat");
```

Line 144:
```js
  "new-brutalism": "NeoBrutalistLaundromat",
```

Line 235:
```js
  "new-brutalism": ["LOUD LAUNDRY", "machine status", "cycle builder"],
```

Line 313:
```js
assert(neoBrutalistBody, "NeoBrutalistLaundromat function is missing");
```

Lines 332-334 (required new-brutalism markers):
```js
for (const marker of ["LOUD LAUNDRY", "machine status", "cycle builder", "wash rates"]) {
  assert(neoBrutalistBody.includes(marker), `NeoBrutalistLaundromat missing new-brutalism marker "${marker}"`);
}
```

Lines 340-342 (message rename only; postmodern marker list unchanged):
```js
for (const marker of ["PALLADIO & POP", "The Quotation Sale", "browse by era", "catalogue foreword"]) {
  assert(!neoBrutalistBody.includes(marker), `NeoBrutalistLaundromat still contains postmodern marker "${marker}"`);
}
```

Lines 344-346 (sync the postmodern-side forbidden list to the new markers):
```js
for (const marker of ["LOUD LAUNDRY", "machine status", "cycle builder", "wash rates"]) {
  assert(!postmodernBody.includes(marker), `PostmodernAuctionHouse still contains new-brutalism marker "${marker}"`);
}
```

- [ ] **Step 2: Run the check to verify it fails**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "NeoBrutalist|LAUNDRY"`
Expected: FAIL lines including `NeoBrutalistLaundromat function is missing` and a routing error for new-brutalism (pre-existing glitch/hiphop failures do not match this filter — ignore them).

- [ ] **Step 3: Replace the component**

In `src/components/design-style/DesignStyleSampleRenderer.tsx`, delete the entire `NeoBrutalistApp` function (starts at `function NeoBrutalistApp({ className, compact = false, style }: Props) {`, ends at the closing `}` just before `function AntiDesignLanding`) and put this in its place:

```tsx
function NeoBrutalistLaundromat({ className, compact = false, style }: Props) {
  const box = "border-[3px] border-[var(--sample-border)]";
  const box2 = "border-2 border-[var(--sample-border)]";
  const hardShadow = { boxShadow: "6px 6px 0 var(--sample-border)" };
  const smallShadow = { boxShadow: "4px 4px 0 var(--sample-border)" };
  const machines: Array<{ id: string; kind: string; state: "busy" | "free" | "out"; big: string; note: string }> = [
    { id: "W1", kind: "WASH 8KG", state: "free", big: "READY", note: "door open" },
    { id: "W2", kind: "WASH 8KG", state: "busy", big: "32 MIN", note: "ends 2:14 PM" },
    { id: "W3", kind: "WASH 12KG", state: "free", big: "READY", note: "big loads" },
    { id: "D1", kind: "DRY", state: "busy", big: "8 MIN", note: "ends 1:50 PM" },
    { id: "D2", kind: "DRY", state: "free", big: "READY", note: "lint tray ok" },
    { id: "W4", kind: "WASH 8KG", state: "out", big: "OUT", note: "parts coming" },
  ];
  const temps: Array<[string, boolean]> = [
    ["hot", true],
    ["warm", false],
    ["cold", false],
  ];
  const extras: Array<[string, string, boolean]> = [
    ["softener", "+$0.50", true],
    ["turbo dry", "+$1.00", false],
  ];
  const rates: Array<[string, string]> = [
    ["normal wash", "$4.50"],
    ["heavy soil", "+$1.00"],
    ["express", "+$2.00"],
    ["dry 15 min", "$2.25"],
  ];
  const stateBg = (state: string) =>
    state === "free" ? "bg-[var(--sample-accent-3)]" : state === "busy" ? "bg-[var(--sample-accent)]" : "bg-[var(--sample-surface)]";

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--sample-border) 1px, transparent 1px), linear-gradient(90deg, var(--sample-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col gap-3">
        <header className="flex min-w-0 items-center gap-2">
          <span className={cn("grid h-7 w-7 shrink-0 place-items-center bg-[var(--sample-accent)] font-display text-sm font-black", box)} style={smallShadow}>
            LL
          </span>
          <div className="min-w-0">
            <span className="block font-display text-sm font-black leading-none" style={{ letterSpacing: "-0.01em" }}>
              LOUD LAUNDRY
            </span>
            <span className="block truncate text-[8px] font-black uppercase text-[var(--sample-muted)]">24h · Elm St. corner · self service</span>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2 text-[9px] font-black uppercase">
            <span className={cn("bg-[var(--sample-accent-3)] px-2 py-1", box2, compact ? "hidden" : "")}>card ok</span>
            <span className={cn("bg-[var(--sample-text)] px-2 py-1 text-[var(--sample-base)]", box2)} style={smallShadow}>
              no coins
            </span>
          </div>
        </header>

        <div className={cn("grid min-h-0 flex-1 gap-3", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-[1.35fr_1fr] gap-4")}>
          <section className="flex min-h-0 min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between text-[9px] font-black uppercase">
              <span className={cn("bg-[var(--sample-accent-2)] px-2 py-1", box2)} style={smallShadow}>
                machine status
              </span>
              <span className={cn(compact ? "hidden" : "")}>3 free · 2 busy · 1 down</span>
            </div>
            <div className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-2" : "grid-cols-3")}>
              {machines.map((machine, index) => (
                <div className={cn("relative grid min-w-0 content-between gap-1 overflow-hidden p-2", box, stateBg(machine.state), compact && index > 3 ? "hidden" : "")} key={machine.id} style={smallShadow}>
                  {machine.state === "out" ? (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--sample-border) 0 6px, transparent 6px 14px)" }} />
                  ) : null}
                  <div className="relative flex items-center justify-between gap-1 text-[9px] font-black">
                    <span className={cn("bg-[var(--sample-surface)] px-1.5 py-0.5", box2)}>{machine.id}</span>
                    <span className="truncate uppercase">{machine.kind}</span>
                  </div>
                  <p className={cn("relative font-display font-black leading-none", compact ? "text-lg" : "text-2xl")}>{machine.big}</p>
                  <p className="relative truncate text-[8px] font-bold uppercase text-[var(--sample-muted)]">{machine.note}</p>
                </div>
              ))}
            </div>
            <div className={cn("items-stretch text-[9px] font-black uppercase", box, compact ? "hidden" : "grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]")} style={smallShadow}>
              <span className="flex items-center bg-[var(--sample-text)] px-2 py-1.5 text-[var(--sample-base)]">wash rates</span>
              {rates.map(([label, price], index) => (
                <span className={cn("flex min-w-0 items-center justify-between gap-1 bg-[var(--sample-surface)] px-2 py-1.5", index < 3 ? "border-r-2 border-[var(--sample-border)]" : "")} key={label}>
                  <span className="truncate">{label}</span>
                  <span className={cn("shrink-0 bg-[var(--sample-accent)] px-1 py-0.5", box2)}>{price}</span>
                </span>
              ))}
            </div>
          </section>

          <aside className={cn("grid min-h-0 min-w-0 content-start gap-2 bg-[var(--sample-surface)] p-3", box)} style={hardShadow}>
            <div className="flex items-center justify-between gap-1">
              <span className={cn("bg-[var(--sample-accent)] px-2 py-1 text-[9px] font-black uppercase", box2)}>cycle builder</span>
              <span className="shrink-0 text-[8px] font-black uppercase text-[var(--sample-muted)]">step 2/3</span>
            </div>
            <div className="grid gap-1">
              <span className="text-[8px] font-black uppercase">machine</span>
              <span className={cn("flex items-center justify-between gap-1 bg-[var(--sample-base)] px-2 py-1.5 text-[10px] font-black", box2)}>
                <span className="truncate">W3 — 12kg, ready</span>
                <span className="shrink-0">▾</span>
              </span>
            </div>
            <div className={cn("grid gap-1", compact ? "hidden" : "")}>
              <span className="text-[8px] font-black uppercase">water temp</span>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-black">
                {temps.map(([label, on]) => (
                  <span className={cn("flex items-center gap-1 px-1.5 py-1", box2, on ? "bg-[var(--sample-accent)]" : "bg-[var(--sample-surface)]")} key={label}>
                    <span className={cn("grid h-3 w-3 place-items-center rounded-full bg-[var(--sample-surface)]", box2)}>
                      {on ? <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-text)]" /> : null}
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className={cn("grid gap-1", compact ? "hidden" : "")}>
              <span className="text-[8px] font-black uppercase">extras</span>
              {extras.map(([label, price, on]) => (
                <span className="flex items-center gap-1.5 text-[9px] font-black" key={label}>
                  <span className={cn("grid h-3.5 w-3.5 shrink-0 place-items-center bg-[var(--sample-surface)] text-[9px] leading-none", box2)}>{on ? "✕" : ""}</span>
                  {label}
                  <span className="ml-auto text-[var(--sample-muted)]">{price}</span>
                </span>
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between border-t-[3px] border-[var(--sample-border)] pt-2">
              <span className="text-[9px] font-black uppercase">total</span>
              <span className="font-display text-xl font-black">$5.50</span>
            </div>
            <span className={cn("flex items-center justify-center bg-[var(--sample-text)] px-3 py-2.5 text-[11px] font-black uppercase text-[var(--sample-base)]", box)} style={smallShadow}>
              Start W3 — $5.50
            </span>
            <span className={cn("text-center text-[7px] font-bold uppercase text-[var(--sample-muted)]", compact ? "hidden" : "")}>tap card on machine to confirm</span>
          </aside>
        </div>

        <footer className={cn("items-center justify-between gap-2 bg-[var(--sample-accent-2)] px-3 py-1.5 text-[8px] font-black uppercase", box, compact ? "hidden" : "flex")} style={smallShadow}>
          <span className="truncate">house rule: leave the machine how you found it</span>
          <span className={cn("flex shrink-0 items-center gap-1 bg-[var(--sample-surface)] px-2 py-0.5", box2)}>punch card 07/10</span>
        </footer>
      </div>
    </SampleFrame>
  );
}
```

- [ ] **Step 4: Update the router branch**

Find `if (style.slug === "new-brutalism")` in the same file and change its return:

```tsx
  if (style.slug === "new-brutalism") {
    return <NeoBrutalistLaundromat {...props} />;
  }
```

- [ ] **Step 5: Run the check to verify new-brutalism asserts pass**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "NeoBrutalist|LAUNDRY"`
Expected: no output. (This is stricter than the old baseline — the previous NeoBrutalistApp marker failures must be gone. Overall exit stays 1 from glitch-art/hiphop failures only.)

- [ ] **Step 6: Lint**

Run: `npx eslint src/components/design-style/DesignStyleSampleRenderer.tsx`
Expected: exit 0 (a `[BABEL] ... deoptimised` note about file size is informational, not an error).

- [ ] **Step 7: Commit**

```bash
git add src/components/design-style/DesignStyleSampleRenderer.tsx scripts/check-style-distinction.mjs
git commit -m "Redesign new-brutalism sample as LOUD LAUNDRY laundromat kiosk

Also repairs the drifted NeoBrutalistApp guardrail markers.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: designStyles.ts copy refresh

**Files:**
- Modify: `src/data/designStyles.ts:1944` (layoutTraits first item)

**Interfaces:**
- Consumes: nothing from Task 1 (data-only change).
- Produces: updated style copy on `/ko/styles/new-brutalism`. `representativeTraits`, `tokenIntent`, and everything else in the new-brutalism entry stay EXACTLY as-is.

- [ ] **Step 1: Update layoutTraits**

At line 1944, replace only the first array item:

Old:
```
"대시보드, 가격 카드, 폼, 체크리스트가 실제 제품처럼 구성됩니다."
```
New:
```
"셀프 키오스크 상태보드와 컨트롤 패널처럼 구성됩니다 — 머신 타일, 코스 폼, 요금표가 실제 앱처럼 놓입니다."
```
(Second and third items stay unchanged.)

- [ ] **Step 2: Verify guardrail still passes and lint**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "NeoBrutalist|LAUNDRY"`
Expected: no output.

Run: `npx eslint src/data/designStyles.ts`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/data/designStyles.ts
git commit -m "Refresh new-brutalism layout copy for laundromat kiosk concept

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Render verification + review log + push

**Files:**
- Modify: `docs/style-sample-web-review-log.md:45`
- Fix regressions in `DesignStyleSampleRenderer.tsx` only if verification finds them.

**Interfaces:**
- Consumes: `NeoBrutalistLaundromat` from Task 1, dev server at `http://localhost:3000`.
- Produces: verified log row + pushed `main`.

- [ ] **Step 1: Verify full sample render**

Using Playwright MCP tools (`mcp__plugin_playwright_playwright__*`):
1. `browser_navigate` to `http://localhost:3000/ko/styles/new-brutalism`
2. `browser_resize` to 1440×960
3. `browser_evaluate`: `() => document.documentElement.scrollWidth - document.documentElement.clientWidth` — expected `0`
4. Element-screenshot the sample frame (find the element containing "LOUD LAUNDRY", walk up to the `st-border` frame). Confirm: 6 machine tiles with distinct states (READY blue / countdown yellow / OUT hatched), rates table row readable, cycle builder panel with select/radio/checkbox visuals, big black START button, no clipping at panel edges (check the aside's right edge especially).

- [ ] **Step 2: Verify compact sample render**

1. `browser_navigate` to `http://localhost:3000/ko/styles`
2. Overflow check — expected `0`
3. Element-screenshot the new-brutalism card. Confirm: header + 4 tiles (2×2) + mini cycle panel with total and START visible, nothing clipped mid-glyph, no vertical overflow (red sliver at card bottom = failure).

If a defect appears, fix it in `NeoBrutalistLaundromat`, re-run the same checks, fold the fix into the Step 4 commit.

- [ ] **Step 3: Update the review log**

In `docs/style-sample-web-review-log.md` line 45, replace the row with:

```
| 11 | 강렬 / 실험 | new-brutalism | brutalist-poster | verified | LOUD LAUNDRY kiosk — machine status grid, cycle builder form, wash rates table |
```

- [ ] **Step 4: Commit and push**

```bash
git add docs/style-sample-web-review-log.md src/components/design-style/DesignStyleSampleRenderer.tsx
git commit -m "Verify new-brutalism laundromat sample and update review log

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push
```

(If Step 2 required no component fixes, the renderer file will have nothing staged — fine.)
