# Art Deco "MERIDIAN LINE" Ocean Liner Booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hotel-cliché `ArtDecoHotelPortal` sample with `ArtDecoLinerBooking` — a 1930s transatlantic liner booking page (Cassandre-poster panel + sailings board + stepped stateroom cards + grand salon strip) with real UI values, and add art-deco guardrail markers.

**Architecture:** One render function inside `src/components/design-style/DesignStyleSampleRenderer.tsx` (project pattern: all samples in this file). New generated poster image replaces `public/generated/design-styles/art-deco.webp`. Guardrail markers added to `scripts/check-style-distinction.mjs` (art-deco currently has NO markers — only the function-name mapping).

**Tech Stack:** Next.js (this repo's patched version — see AGENTS.md), Tailwind arbitrary values with `--sample-*` CSS vars, codex imagegen via `scripts/gen-style-image.mjs`, Playwright MCP for render verification.

**Spec:** `docs/superpowers/specs/2026-07-11-art-deco-liner-redesign-design.md`

## Global Constraints

- Palette/tokens unchanged: black lacquer `#080806`, brass `#D8A94B`, champagne `#F7E7BD`, emerald `#0E6B56`. Style tokens give `borderStyle: double`, `radius: 0`.
- Copy rules: real 1930s liner-booking language (sailing dates, `$385` fares, deck letters, seatings). NO style-commentary labels, NO "Art Deco" as headline.
- Required strings in the new function body (guardrail, exact case — displayed uppercase via CSS): `Meridian Line`, `Sailings board`, `Stateroom classes`, `Grand salon`.
- All modules must be real UI with believable values — no empty outlined boxes, no abstract geometric stand-ins.
- Image reveal rule (`[[generated-style-image-surface-gotcha]]`): `GeneratedStyleImageSurface` children wrapper is already `h-full w-full`; do NOT bury the image under heavy scrims — one light gradient max.
- Grid gotcha: grids need `min-h-0`/`min-w-0` on children to avoid min-content clipping; long route strings get `truncate`.
- Decorations stay inside the `SampleFrame` (overflow-hidden). Horizontal overflow must be 0 in full and compact.
- `npm run check:style-distinction` has PRE-EXISTING failures for other styles. OUT OF SCOPE. Success = zero error lines mentioning ArtDeco/Meridian.
- Dev server already running at `http://localhost:3247` (webpack). Do not start another.
- Commits directly to `main`; messages end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Imagegen endpoint: `OPENAI_BASE_URL=http://127.0.0.1:18632/v1` (NOT the script default 10632).

---

### Task 1: Generate the Cassandre-style liner poster image

**Files:**
- Modify: `scripts/gen-style-image.mjs:59-61` (append `"art-deco"` entry to `PROMPTS`)
- Replace (generated): `public/generated/design-styles/art-deco.webp`

**Interfaces:**
- Consumes: local imagegen endpoint at `http://127.0.0.1:18632/v1`.
- Produces: `public/generated/design-styles/art-deco.webp` — referenced by `GENERATED_STYLE_IMAGES["art-deco"]` (map entry already exists; no renderer change needed for the path).

- [ ] **Step 1: Add the prompt**

In `scripts/gen-style-image.mjs`, inside `PROMPTS` after the `streetwear` entry, add:

```js
  "art-deco":
    "A vintage 1930s Art Deco travel poster illustration in the style of classic French poster art (Cassandre's Normandie) — absolutely NOT a photograph, no people. A colossal ocean liner bow seen head-on from a dramatic low angle, towering monumental near-black hull filling the frame, crisp champagne-gold rim light tracing the prow edge, stepped geometric funnels, a radiating brass sunburst sky with stepped stylized clouds behind the ship, calm dark emerald geometric sea with thin gold wave lines below, a small sharp white bow wave. Flat poster shading, bold simplified geometric forms, subtle airbrush gradients, strict symmetrical composition. Palette: black lacquer, champagne gold, brass, deep emerald green, ivory. No text, no letters, no numbers, no flags with symbols, no logos, no watermark, no people, no UI.",
```

- [ ] **Step 2: Generate**

Run: `OPENAI_BASE_URL=http://127.0.0.1:18632/v1 node scripts/gen-style-image.mjs art-deco` (Bash tool)
Expected: `✓ art-deco: 1536x1024 -> ...\public\generated\design-styles\art-deco.webp`

- [ ] **Step 3: Review the image**

Read the webp with the Read tool. Check: liner bow reads instantly as Cassandre-style deco poster; symmetric; no text artifacts. If it fails, tweak prompt and regenerate (max 2 retries, then flag).

- [ ] **Step 4: Commit**

```bash
git add scripts/gen-style-image.mjs public/generated/design-styles/art-deco.webp
git commit -m "Generate Cassandre-style ocean liner poster image for art-deco sample

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Guardrail update + component rewrite

**Files:**
- Modify: `scripts/check-style-distinction.mjs:173` (slug→function map)
- Modify: `scripts/check-style-distinction.mjs` `requiredFamilyMarkers` object (add art-deco entry; object ends at line 269)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx:4186-4217` (replace `ArtDecoHotelPortal` with `ArtDecoLinerBooking`; line numbers may drift — match on content)
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx:8969-8970` router branch (search `style.slug === "art-deco"`)

**Interfaces:**
- Consumes: existing helpers in the same file — `SampleFrame` (`{children, className, compact, style}`), `GeneratedStyleImageSurface` (`{children, className, overlay, position, slug, style}`), `cn`, `Props` type.
- Produces: `function ArtDecoLinerBooking({ className, compact = false, style }: Props)` — referenced by the router branch and by `scripts/check-style-distinction.mjs` via `styleSampleFunctions`.

- [ ] **Step 1: Update the guardrail script (the failing test)**

In `scripts/check-style-distinction.mjs` line 173:

```js
  "art-deco": "ArtDecoLinerBooking",
```

In `requiredFamilyMarkers`, add (alphabetical position doesn't matter; put near other luxury entries if present, else anywhere):

```js
  "art-deco": ["Meridian Line", "Sailings board", "Stateroom classes", "Grand salon"],
```

- [ ] **Step 2: Run the check to verify it fails**

Run: `node scripts/check-style-distinction.mjs 2>&1 | grep -i "artdeco\|meridian"` (Bash tool)
Expected: FAIL lines — `ArtDecoLinerBooking function is missing for art-deco` and a routing error.

- [ ] **Step 3: Replace the component**

In `src/components/design-style/DesignStyleSampleRenderer.tsx`, delete the entire `ArtDecoHotelPortal` function (starts at `function ArtDecoHotelPortal({ className, compact = false, style }: Props) {`, ends at the closing `}` just before `function ArtNouveauBotanicalShop`) and put this in its place:

```tsx
function ArtDecoLinerBooking({ className, compact = false, style }: Props) {
  const sailings: Array<{ date: string; ship: string; route: string; nights: string; fare: string; state: "reserve" | "waitlist" }> = [
    { date: "May 14", ship: "S.S. Aurelia", route: "New York — Cherbourg", nights: "5 nights", fare: "$385", state: "reserve" },
    { date: "May 28", ship: "S.S. Aurelia", route: "New York — Cherbourg", nights: "5 nights", fare: "$385", state: "reserve" },
    { date: "Jun 11", ship: "S.S. Cascadia", route: "New York — Southampton", nights: "6 nights", fare: "$340", state: "waitlist" },
  ];
  const staterooms: Array<{ name: string; deck: string; fare: string; detail: string }> = [
    { name: "First Class", deck: "Promenade deck A", fare: "$385", detail: "Private bath · veranda salon" },
    { name: "Cabin Class", deck: "Deck C midship", fare: "$215", detail: "Two berths · porthole" },
    { name: "Tourist", deck: "Deck E aft", fare: "$118", detail: "Four berths · shared bath" },
  ];
  const visibleSailings = compact ? sailings.slice(0, 2) : sailings;
  const visibleRooms = compact ? staterooms.slice(0, 2) : staterooms;
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full min-h-0 grid-cols-[0.42fr_0.58fr] gap-3">
        <GeneratedStyleImageSurface className="relative h-full min-h-0 border border-[var(--sample-accent)]" overlay="none" position="center 32%" slug="art-deco">
          <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(0 0 0 / 0.5) 0%, transparent 26%, transparent 60%, rgb(0 0 0 / 0.62) 100%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-[var(--sample-accent)] opacity-70" />
          <div className={cn("relative flex h-full w-full flex-col justify-between text-center", compact ? "p-3" : "p-5")}>
            <div>
              <p className="text-[8px] uppercase tracking-[0.44em] text-[var(--sample-primary)]">Meridian Line</p>
              <p className={cn("font-display uppercase text-[var(--sample-primary)]", compact ? "mt-1 text-lg tracking-[0.2em]" : "mt-2 text-3xl tracking-[0.24em]")} style={{ fontFamily: "var(--st-font-display)" }}>
                S.S. Aurelia
              </p>
            </div>
            <div>
              <svg aria-hidden="true" className="mx-auto text-[var(--sample-accent)]" fill="none" height={compact ? 16 : 22} stroke="currentColor" strokeWidth={1.2} viewBox="0 0 88 44" width={compact ? 32 : 44}>
                <path d="M44 42 44 4M44 42 24 8M44 42 64 8M44 42 8 18M44 42 80 18M44 42 2 34M44 42 86 34" />
                <path d="M14 34a30 30 0 0 1 60 0M26 38a18 18 0 0 1 36 0" />
              </svg>
              <p className={cn("uppercase text-[var(--sample-primary)]", compact ? "mt-1 text-[8px] tracking-[0.22em]" : "mt-2 text-[10px] tracking-[0.3em]")}>New York — Cherbourg</p>
              <p className={cn("uppercase text-[var(--sample-muted)]", compact ? "text-[7px] tracking-[0.18em]" : "mt-1 text-[8px] tracking-[0.24em]")}>Sails May 14 · Pier 88</p>
            </div>
          </div>
        </GeneratedStyleImageSurface>
        <div className="grid min-h-0 grid-rows-[auto_auto_1fr_auto] gap-3">
          <header className="border-y-[3px] border-double border-[var(--sample-accent)] py-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className={cn("font-display uppercase text-[var(--sample-primary)]", compact ? "text-xs tracking-[0.2em]" : "text-sm tracking-[0.3em]")} style={{ fontFamily: "var(--st-font-display)" }}>
                Meridian Line
              </span>
              <span className={cn("flex gap-3 text-[8px] uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
                {["Sailings", "Staterooms", "Salon"].map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </span>
            </div>
            <p className={cn("mt-1 text-[8px] uppercase tracking-[0.3em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>Transatlantic service · est. 1927</p>
          </header>
          <section className="min-h-0 border border-[var(--sample-border-soft)]">
            <header className="flex items-center justify-between gap-3 border-b border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-1.5">
              <span className="text-[9px] uppercase tracking-[0.26em] text-[var(--sample-accent)]">Sailings board</span>
              <span className={cn("text-[8px] uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>May — June 1935 · Pier 88</span>
            </header>
            {visibleSailings.map((sailing) => (
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--sample-border-soft)] px-3 py-2 last:border-b-0" key={sailing.date}>
                <span className="font-display text-xs uppercase tracking-[0.1em] text-[var(--sample-accent)]" style={{ fontFamily: "var(--st-font-display)" }}>{sailing.date}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[9px] uppercase tracking-[0.14em]">{sailing.ship} · {sailing.route}</span>
                  <span className={cn("block text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{sailing.nights} · from {sailing.fare}</span>
                </span>
                <span className={cn("border px-2 py-1 text-[8px] uppercase tracking-[0.16em]", sailing.state === "reserve" ? "border-[var(--sample-accent)] text-[var(--sample-primary)]" : "border-[var(--sample-border-soft)] text-[var(--sample-muted)]")}>
                  {sailing.state === "reserve" ? "Reserve" : "Waitlist"}
                </span>
              </div>
            ))}
          </section>
          <section className="grid min-h-0 grid-rows-[auto_1fr] gap-2">
            <header className="flex items-baseline justify-between gap-3">
              <span className="text-[9px] uppercase tracking-[0.26em] text-[var(--sample-accent)]">Stateroom classes</span>
              <span className="text-[8px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">Deck plan G-4</span>
            </header>
            <div className={cn("grid min-h-0 gap-2", compact ? "grid-cols-2" : "grid-cols-3")}>
              {visibleRooms.map((room) => (
                <div className="flex min-h-0 flex-col" key={room.name}>
                  <span aria-hidden="true" className="mx-auto h-2.5 w-[72%] bg-[var(--sample-accent)]" style={{ clipPath: "polygon(0 100%, 0 60%, 14% 60%, 14% 25%, 32% 25%, 32% 0, 68% 0, 68% 25%, 86% 25%, 86% 60%, 100% 60%, 100% 100%)" }} />
                  <div className="flex min-h-0 flex-1 flex-col justify-between border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2.5">
                    <div>
                      <p className="font-display text-[11px] uppercase tracking-[0.14em] text-[var(--sample-primary)]" style={{ fontFamily: "var(--st-font-display)" }}>{room.name}</p>
                      <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">{room.deck}</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-display text-lg leading-none text-[var(--sample-accent)]" style={{ fontFamily: "var(--st-font-display)" }}>{room.fare}</p>
                      <p className={cn("mt-1 text-[8px] uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{room.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="flex items-center justify-between gap-3 border border-[var(--sample-accent-2)] bg-[var(--sample-surface)] px-3 py-2">
            <span className="min-w-0">
              <span className="block text-[9px] uppercase tracking-[0.24em] text-[var(--sample-accent)]">Grand salon</span>
              <span className="block truncate text-[8px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">First seating 7:00 · black tie — Second seating 9:00 · jazz set</span>
            </span>
            <span className="shrink-0 border border-[var(--sample-accent)] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[var(--sample-primary)]">Reserve passage</span>
          </section>
        </div>
      </div>
    </SampleFrame>
  );
}
```

- [ ] **Step 4: Update the router branch**

Search `style.slug === "art-deco"` (~line 8969); replace the return:

```tsx
  if (style.slug === "art-deco") {
    return <ArtDecoLinerBooking {...props} />;
  }
```

- [ ] **Step 5: Run the check to verify art-deco passes**

Run: `node scripts/check-style-distinction.mjs 2>&1 | grep -i "artdeco\|meridian"` (Bash tool)
Expected: no output (zero art-deco error lines; pre-existing other-style failures don't match the filter).

- [ ] **Step 6: Commit**

```bash
git add src/components/design-style/DesignStyleSampleRenderer.tsx scripts/check-style-distinction.mjs
git commit -m "Redesign art-deco sample as MERIDIAN LINE ocean liner booking

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Style copy updates in designStyles.ts

**Files:**
- Modify: `src/data/designStyles.ts:1487` (tokenIntent)
- Modify: `src/data/designStyles.ts:2195` (layoutTraits[0])

**Interfaces:**
- Consumes: nothing new.
- Produces: copy only — no shape changes, `check:data` unaffected.

- [ ] **Step 1: Update tokenIntent (line 1487)**

```ts
    tokenIntent: "Use black lacquer, brass, emerald, double borders, fan arcs, and symmetrical ocean-liner booking modules so Art Deco reads as polished geometric glamour.",
```

- [ ] **Step 2: Update layoutTraits[0] (line 2195, first array item only)**

```ts
    layoutTraits: ["세로 포스터 패널과 예약 컬럼의 비대칭 분할, 마퀴형 스케줄 보드가 잘 맞습니다.", "기하학 장식은 배경이 아니라 예약, 룸 카드, 바 카드의 구조에 붙습니다.", "모바일에서는 팬 장식을 단순화하고 CTA 대비를 우선합니다."],
```

- [ ] **Step 3: Commit**

```bash
git add src/data/designStyles.ts
git commit -m "Update art-deco layout and token copy for liner booking framing

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Verification + review log + push

**Files:**
- Modify: `docs/style-sample-web-review-log.md:74` (art-deco row)

- [ ] **Step 1: Render check — full**

Playwright MCP: navigate `http://localhost:3247/ko/styles/art-deco`, screenshot, inspect. Check: poster panel reveals the liner image; sailings board 3 rows with fares; 3 stepped stateroom cards; grand salon strip; no empty boxes; no "Art Deco" headline.

- [ ] **Step 2: Render check — compact**

Navigate `http://localhost:3247/ko/styles` (grid shows compact cards), screenshot the art-deco card. Check: 2 sailings, 2 stateroom cards, no clipping.

- [ ] **Step 3: Horizontal overflow check (both pages)**

Playwright `browser_run_code_unsafe`:
```js
async (page) => {
  const r = [];
  for (const url of ["http://localhost:3247/ko/styles/art-deco", "http://localhost:3247/ko/styles"]) {
    await page.goto(url);
    await page.waitForTimeout(800);
    r.push(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
  }
  return r;
}
```
Expected: `[0, 0]`

- [ ] **Step 4: Lint**

Run: `npm run lint` — Expected: exit 0 (or only pre-existing warnings untouched by this change).

- [ ] **Step 5: Full check script**

Run: `node scripts/check-style-distinction.mjs 2>&1 | grep -i "artdeco\|meridian"` — Expected: no output.

- [ ] **Step 6: Update review log row 40**

In `docs/style-sample-web-review-log.md` line 74, set status `verified` and notes `ocean liner booking, poster panel, sailings board, stepped stateroom cards` (match the table's existing column format).

- [ ] **Step 7: Commit + push**

```bash
git add docs/style-sample-web-review-log.md
git commit -m "Verify art-deco liner booking sample and update review log

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push
```
