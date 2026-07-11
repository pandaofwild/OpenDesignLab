# Postmodernism "PALLADIO & POP" Auction House Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the neo-brutalist-looking `PostmodernArchivePortal` sample with `PostmodernAuctionHouse` — a live design-auction catalogue page that expresses postmodernism through real auction UI.

**Architecture:** One render function inside `src/components/design-style/DesignStyleSampleRenderer.tsx` (project keeps all style samples in this one file — follow that pattern). Guardrail markers live in `scripts/check-style-distinction.mjs`; style copy lives in `src/data/designStyles.ts`. TDD here means: update the guardrail markers first (failing), then implement the component until they pass.

**Tech Stack:** Next.js (this repo's patched version — see AGENTS.md), Tailwind arbitrary values with `--sample-*` CSS vars, Playwright MCP for render verification.

**Spec:** `docs/superpowers/specs/2026-07-11-postmodernism-auction-redesign-design.md`

## Global Constraints

- Copy rules: sample copy must be real auction-site language (lot numbers, `est.`, current bid, paddle). NO style-commentary labels ("ironic object index" etc.).
- Forbidden strings in the postmodern function body (guardrail asserts): `RAW COMPONENT KIT`, `native form controls`, `pricing table`, `BRUTAL/UI`.
- Required strings in the postmodern function body: `PALLADIO & POP`, `The Quotation Sale`, `browse by era`, `catalogue foreword`.
- No uniform black-outline boxes, no hard offset shadows (that is the neo-brutalism look we are removing). Hairlines use `var(--sample-border-soft)`; strong rules use `border-t-2 border-[var(--sample-text)]`.
- Decorative absolutely-positioned elements must stay inside the `SampleFrame` (it is `overflow-hidden`); do not let decorations bleed past it (Chromium `scrollWidth` counts clipped children on children of scroll containers elsewhere — keep decorations inside).
- Interactive-looking controls are rendered as `<span>`, never `<button>`/`<input>` (existing file idiom).
- `npm run check:style-distinction` has PRE-EXISTING failures for glitch-art / hiphop-style / NeoBrutalistApp markers. Those are OUT OF SCOPE. Success = zero error lines mentioning postmodern/PALLADIO/Auction.
- Dev server: already running at `http://localhost:3000` (webpack dev). Do not start a second one.
- Commits go directly to `main` (project convention), commit messages end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Guardrail update + component rewrite

**Files:**
- Modify: `scripts/check-style-distinction.mjs:20` (functionBody name)
- Modify: `scripts/check-style-distinction.mjs:150` (routing map entry)
- Modify: `scripts/check-style-distinction.mjs:241` (requiredFamilyMarkers)
- Modify: `scripts/check-style-distinction.mjs:314` (assert message)
- Modify: `scripts/check-style-distinction.mjs:336-346` (marker loops)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx:2126-2224` (replace `PostmodernArchivePortal` with `PostmodernAuctionHouse`)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx:8923-8925` (routing)

**Interfaces:**
- Consumes: existing helpers in the same file — `SampleFrame` (props `{children, className, compact, style}`), `GeneratedStyleImageSurface` (props `{children?, className?, overlay?, position?, slug, style?}`), `GENERATED_STYLE_IMAGES.postmodernism` (`"/generated/design-styles/postmodernism.webp"`), `cn`, `Props` type.
- Produces: `function PostmodernAuctionHouse({ className, compact = false, style }: Props)` — referenced by the router branch and by `scripts/check-style-distinction.mjs` via `functionBody("PostmodernAuctionHouse")`.

- [ ] **Step 1: Update the guardrail script (the failing test)**

In `scripts/check-style-distinction.mjs` make these five edits:

Line 20:
```js
const postmodernBody = functionBody("PostmodernAuctionHouse");
```

Line 150 (slug→function map):
```js
  postmodernism: "PostmodernAuctionHouse",
```

Line 241 (requiredFamilyMarkers):
```js
  postmodernism: ["PALLADIO & POP", "The Quotation Sale", "browse by era"],
```

Line 314:
```js
assert(postmodernBody, "PostmodernAuctionHouse function is missing");
```

Lines 336-346 (three loops — new marker strings, same logic):
```js
for (const marker of ["PALLADIO & POP", "The Quotation Sale", "catalogue foreword"]) {
  assert(postmodernBody.includes(marker), `PostmodernAuctionHouse missing postmodern marker "${marker}"`);
}

for (const marker of ["PALLADIO & POP", "The Quotation Sale", "browse by era", "catalogue foreword"]) {
  assert(!neoBrutalistBody.includes(marker), `NeoBrutalistApp still contains postmodern marker "${marker}"`);
}

for (const marker of ["RAW COMPONENT KIT", "native form controls", "pricing table", "BRUTAL/UI"]) {
  assert(!postmodernBody.includes(marker), `PostmodernAuctionHouse still contains new-brutalism marker "${marker}"`);
}
```

- [ ] **Step 2: Run the check to verify it fails**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "Postmodern|PALLADIO"`
Expected: FAIL lines including `PostmodernAuctionHouse function is missing` and `postmodernism is not routed to PostmodernAuctionHouse...` (plus unrelated pre-existing failures without those keywords — ignore).

- [ ] **Step 3: Replace the component**

In `src/components/design-style/DesignStyleSampleRenderer.tsx`, delete the entire `PostmodernArchivePortal` function (currently lines 2126-2224, from `function PostmodernArchivePortal...` to its closing `}`) and put this in its place:

```tsx
function PostmodernAuctionHouse({ className, compact = false, style }: Props) {
  const upcomingLots: Array<{ lot: string; title: string; era: string; estimate: string; crop: string }> = [
    { lot: "13", title: "Roman bust, after the antique", era: "Antiquity, quoted", estimate: "$4,000–6,000", crop: "14% 24%" },
    { lot: "14", title: "Warhol, Brillo screenprint", era: "Pop, 1968", estimate: "$18,000–24,000", crop: "82% 30%" },
    { lot: "15", title: "Sottsass 'Carlton' divider", era: "Memphis, 1981", estimate: "$22,000–28,000", crop: "62% 84%" },
  ];
  const eras = ["Antiquity", "Baroque", "Pop", "Memphis", "Tomorrow"];
  const bidSteps = ["+250", "+500", "+1,000"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(rgb(var(--st-text-rgb) / 0.9) 1px, transparent 1.4px)", backgroundSize: "26px 26px" }}
      />

      <div className="relative grid h-full min-h-0 grid-rows-[auto_auto_1fr_auto] gap-2">
        <header className="flex min-w-0 items-end justify-between gap-2 pb-0.5">
          <div className="min-w-0">
            <span className={cn("block font-serif font-bold leading-none tracking-tight", compact ? "text-[15px]" : "text-[19px]")}>PALLADIO & POP</span>
            <span className="mt-0.5 block truncate text-[7px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">Auctioneers of the recent past — est. 1981</span>
          </div>
          <nav className={cn("items-center gap-2.5 text-[8px] font-bold", compact ? "hidden" : "flex")}>
            <span className="text-[var(--sample-accent-2)]">sales</span>
            <span>departments</span>
            <span>results</span>
          </nav>
          <span className="shrink-0 bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black">PADDLE 204</span>
        </header>

        <div className="flex min-w-0 items-center gap-2 bg-[var(--sample-accent-2)] px-2.5 py-1.5 text-[8px] font-bold text-[var(--sample-surface)]">
          <span className="flex shrink-0 items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent)]" />
            LIVE
          </span>
          <span className="truncate font-serif italic">Design Sale No.44 — The Quotation Sale</span>
          <span className={cn("ml-auto shrink-0", compact ? "hidden" : "")}>Lot 12 of 48</span>
          <span className={cn("shrink-0 border-l border-[var(--sample-surface)]/40 pl-2", compact ? "ml-auto" : "")}>next lot 02:14</span>
        </div>

        <main className={cn("grid min-h-0 gap-2.5", compact ? "grid-cols-[1.3fr_1fr]" : "grid-cols-[0.6fr_1.5fr_0.9fr]")}>
          <aside className={cn("min-w-0 border-t-2 border-[var(--sample-text)] pt-1.5", compact ? "hidden" : "flex flex-col")}>
            <span className="text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]">catalogue foreword</span>
            <p className="mt-1.5 text-[8.5px] leading-[1.5]">
              <span className="float-left mr-1 font-serif text-[24px] font-bold leading-[0.8]">E</span>
              very object in this sale has already quoted something older. The gavel simply makes the joke official.
            </p>
            <div className="mt-auto grid gap-1 border-t border-[var(--sample-border-soft)] pt-1.5 text-[7px]">
              <span className="flex justify-between gap-2"><span className="text-[var(--sample-muted)]">Viewing</span><span className="font-bold">Sat–Sun, 10–18</span></span>
              <span className="flex justify-between gap-2"><span className="text-[var(--sample-muted)]">Salesroom</span><span className="font-bold">Gallery II</span></span>
              <span className="flex justify-between gap-2"><span className="text-[var(--sample-muted)]">Premium</span><span className="font-bold">26%</span></span>
            </div>
          </aside>

          <section className="relative grid min-h-0 min-w-0 grid-rows-[1fr_auto] overflow-hidden">
            <GeneratedStyleImageSurface className="min-h-[72px]" overlay="soft" position="50% 42%" slug="postmodernism">
              <span className="absolute left-2 top-2 bg-[var(--sample-surface)]/92 px-1.5 py-0.5 font-serif text-[9px] font-bold">LOT 12</span>
              <span className="absolute right-2 top-2 bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[7px] font-black uppercase">on view</span>
            </GeneratedStyleImageSurface>
            <div className="border-t-2 border-[var(--sample-text)] bg-[var(--sample-surface)] p-2">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className={cn("min-w-0 truncate font-serif font-bold leading-none", compact ? "text-[13px]" : "text-[17px]")}>Graves kettle, whistling bird spout</h3>
                <span className="shrink-0 text-[7px] text-[var(--sample-muted)]">Alessi, 1985</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="min-w-0 truncate text-[7.5px] text-[var(--sample-muted)]">
                  est. $9,000–12,000 · current <span className="font-black text-[var(--sample-text)]">$9,500</span>
                </span>
                <span className="ml-auto shrink-0 bg-[var(--sample-accent)] px-2.5 py-1 text-[8px] font-black text-[var(--sample-surface)]">BID $9,750</span>
              </div>
              <div className={cn("mt-1.5 flex items-center gap-1 text-[7px] font-bold text-[var(--sample-accent-2)]", compact ? "hidden" : "")}>
                {bidSteps.map((step) => (
                  <span className="border border-[var(--sample-border-soft)] px-1.5 py-0.5" key={step}>{step}</span>
                ))}
                <span className="ml-auto text-[var(--sample-muted)]">14 bidders on the book</span>
              </div>
            </div>
          </section>

          <aside className="grid min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-1.5">
            <span className="border-t-2 border-[var(--sample-text)] pt-1.5 text-[7px] font-black uppercase tracking-[0.16em]">next in sale</span>
            <div className="grid min-h-0 content-start gap-1.5">
              {upcomingLots.map((item, index) => (
                <div className={cn("grid grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-[var(--sample-border-soft)] pb-1.5", compact && index === 2 ? "hidden" : "")} key={item.lot}>
                  <span
                    className="h-[34px] w-[38px]"
                    style={{ backgroundImage: `url('${GENERATED_STYLE_IMAGES.postmodernism}')`, backgroundPosition: item.crop, backgroundSize: "320%" }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-[9px] font-bold leading-tight">Lot {item.lot} · {item.title}</span>
                    <span className="mt-0.5 flex items-baseline justify-between gap-1 text-[7px]">
                      <span className="truncate italic text-[var(--sample-accent-2)]">{item.era}</span>
                      <span className="shrink-0 font-bold text-[var(--sample-muted)]">{item.estimate}</span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-[var(--sample-accent)]/10 px-1.5 py-1 text-[7px]">
              <span className="font-black text-[var(--sample-accent)]">SOLD</span>{" "}
              <span className="font-bold">Lot 11 · Venturi chair — $13,750</span>
            </div>
          </aside>
        </main>

        <footer className="flex min-w-0 items-center gap-1.5 border-t-2 border-[var(--sample-text)] pt-1.5 text-[7px] font-bold">
          <span className="shrink-0 uppercase tracking-[0.14em] text-[var(--sample-muted)]">browse by era</span>
          {eras.map((era, index) => (
            <span
              className={cn("border border-[var(--sample-border-soft)] px-1.5 py-0.5", index === 3 ? "bg-[var(--sample-text)] text-[var(--sample-base)]" : "", compact && index > 2 ? "hidden" : "")}
              key={era}
            >
              {era}
            </span>
          ))}
          <span className={cn("ml-auto shrink-0 text-[var(--sample-accent-2)]", compact ? "hidden" : "")}>results archive →</span>
        </footer>
      </div>
    </SampleFrame>
  );
}
```

- [ ] **Step 4: Update the router branch**

At `src/components/design-style/DesignStyleSampleRenderer.tsx:8923-8925`:

```tsx
  if (style.slug === "postmodernism") {
    return <PostmodernAuctionHouse {...props} />;
  }
```

- [ ] **Step 5: Run the check to verify postmodern asserts pass**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "Postmodern|PALLADIO"`
Expected: no output (zero postmodern-related errors). The script overall still exits 1 from pre-existing glitch-art/hiphop/NeoBrutalist failures — that is the accepted baseline.

- [ ] **Step 6: Lint**

Run: `npx eslint src/components/design-style/DesignStyleSampleRenderer.tsx`
Expected: exit 0, no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/design-style/DesignStyleSampleRenderer.tsx scripts/check-style-distinction.mjs
git commit -m "Redesign postmodernism sample as PALLADIO & POP auction house

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: designStyles.ts copy refresh

**Files:**
- Modify: `src/data/designStyles.ts:2127` (layoutTraits first item)
- Modify: `src/data/designStyles.ts:2146-2147` (tokenIntent)

**Interfaces:**
- Consumes: nothing from Task 1 (data-only change).
- Produces: updated style copy rendered on `/ko/styles/postmodernism`; `representativeTraits` stay EXACTLY as-is (`["Classical quotation", "Culture collage", "Ironic object index", "Mixed cultural forms", "Editorial commerce"]`).

- [ ] **Step 1: Update layoutTraits**

At line 2127, replace only the first array item:

Old:
```
"전시, 아카이브, 숍이 섞인 문화 포털처럼 구성합니다."
```
New:
```
"경매 카탈로그 스프레드처럼 구성합니다 — 세리프 서문, 대표 롯, 다음 롯 인덱스가 한 화면에 놓입니다."
```
(Second and third items stay unchanged.)

- [ ] **Step 2: Update tokenIntent**

At lines 2146-2147, replace the tokenIntent string:

Old:
```
"Use classical quotation, culture collage, ironic object indexes, selective Memphis geometry, museum labels, and cultural commerce modules so the style reads as broader postmodernism rather than neo-brutalist UI."
```
New:
```
"Use classical quotation, culture collage, ironic lot indexes, selective Memphis geometry, auction catalogue labels, and live-sale commerce modules so the style reads as broader postmodernism rather than neo-brutalist UI."
```

- [ ] **Step 3: Verify nothing else changed and the guardrail still passes**

Run: `npm run check:style-distinction 2>&1 | Select-String -Pattern "Postmodern|PALLADIO"`
Expected: no output.

Run: `npx eslint src/data/designStyles.ts`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/data/designStyles.ts
git commit -m "Refresh postmodernism layout/token copy for auction concept

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Render verification + review log + push

**Files:**
- Modify: `docs/style-sample-web-review-log.md:51`
- No code files expected; fix regressions in `DesignStyleSampleRenderer.tsx` only if verification finds them.

**Interfaces:**
- Consumes: `PostmodernAuctionHouse` from Task 1, live dev server at `http://localhost:3000`.
- Produces: verified log row + pushed `main`.

- [ ] **Step 1: Verify full sample render**

Using Playwright MCP tools (`mcp__plugin_playwright_playwright__*` — the preview_screenshot tool times out, do not use it):
1. `browser_navigate` to `http://localhost:3000/ko/styles/postmodernism`
2. `browser_resize` to 1440×960
3. `browser_evaluate`: `() => document.documentElement.scrollWidth - document.documentElement.clientWidth`
   Expected: `0`
4. Mark the sample element and take an element screenshot (same technique as review: find the `h3` containing "Graves kettle", walk up 4 parents to the `SampleFrame`, set a data attribute, screenshot it). Visually confirm: cobalt ticker, serif lot title, three thumbnail crops look like distinct objects (not obviously the same photo), essay column readable, no text overlap.

- [ ] **Step 2: Verify compact sample render**

1. `browser_navigate` to `http://localhost:3000/ko/styles`
2. Same overflow check — expected `0`
3. Element-screenshot the postmodernism card ("Graves kettle" h3, walk up to frame). Confirm: essay hidden, ticker + featured lot + 2 upcoming lots visible, nothing overlapping or clipped mid-glyph.

If either render shows a defect (bad crop, overlap, collapsed image row), fix it in `PostmodernAuctionHouse` (e.g. adjust `crop` percentages / `backgroundSize` / `min-h`), re-run the same checks, and fold the fix into the Step 4 commit.

- [ ] **Step 3: Update the review log**

In `docs/style-sample-web-review-log.md` line 51, replace the row with:

```
| 17 | 강렬 / 실험 | postmodernism | retro-commerce | verified | PALLADIO & POP auction house — live sale ticker, featured lot bid module, browse-by-era chips |
```

- [ ] **Step 4: Commit and push**

```bash
git add docs/style-sample-web-review-log.md src/components/design-style/DesignStyleSampleRenderer.tsx
git commit -m "Verify postmodernism auction sample and update review log

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push
```

(If Step 2 required no component fixes, the renderer file will simply have nothing staged — that is fine.)
