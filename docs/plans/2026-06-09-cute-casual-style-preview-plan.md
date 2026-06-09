# Cute and Casual Style Preview Plan

Date: 2026-06-09

## Status

Planning document for the later goal run.

Objective:

> Cute/Casual 9 styles should each have at least 3 real web references and a professional preview that is visually distinct enough to identify without reading the style label.

Current category URL:

- `http://127.0.0.1:3000/en/styles?category=%EA%B7%80%EC%97%AC%EC%9B%80+%2F+%EC%BA%90%EC%A3%BC%EC%96%BC`

## Scope

The current Cute/Casual category contains 9 styles:

| Slug | English name | Korean name | Current risk |
| --- | --- | --- | --- |
| `kitsch` | Kitsch | 키치 | Can collapse into generic colorful/cute ecommerce. |
| `kawaii` | Kawaii | 카와이 | Can become the shared default for every cute style. |
| `dopamine-design` | Dopamine Design | 도파민 디자인 | Can overlap with kitsch unless the mood is cleaner and more color-system driven. |
| `pop-art` | Pop Art | 팝아트 | Can overlap with comic unless it uses art-poster language, not panel storytelling. |
| `comic-book-style` | Comic Book Style | 코믹북 스타일 | Can overlap with pop art unless the layout uses panels, speech balloons, issue metadata, and sequential reading. |
| `toy-design` | Toy Design | 토이 디자인 | Can overlap with bubble/pastel unless it has modular physical-toy construction. |
| `playful-design` | Playful Design | 플레이풀 디자인 | Can become generic rounded SaaS unless interaction, illustration, and friendly product flows are explicit. |
| `pastel-style` | Pastel Style | 파스텔 스타일 | Can become kawaii unless it stays soft, editorial, airy, and low-contrast. |
| `bubble-design` | Bubble Design | 버블 디자인 | Can become pastel unless inflated volume, liquid/capsule forms, and buoyant product language are visible. |

## Reference Set

Each style needs at least 3 actual web samples. These are first-pass source candidates verified as live targets on 2026-06-09.

| Style | Source | URL | What to study |
| --- | --- | --- | --- |
| Kitsch | ban.do | https://www.bando.com/ | Novelty retail, dense product categories, playful object photography, intentionally loud merch language. |
| Kitsch | Lazy Oaf | https://www.lazyoaf.com/ | Oddball fashion tone, graphic apparel framing, attitude-heavy product cards. |
| Kitsch | Lisa Says Gah | https://lisasaysgah.com/ | Pattern-heavy fashion retail, expressive product curation, playful boutique voice. |
| Kawaii | Sanrio | https://www.sanrio.com/ | Character-first cuteness, pink retail surface, rounded icon/product rhythm. |
| Kawaii | Pusheen | https://pusheen.com/ | Soft mascot world, simple navigation, comics/news/fun sections. |
| Kawaii | tokidoki | https://www.tokidoki.it/ | Mascot collectibles, candy color, blind-box/product-card language. |
| Dopamine Design | Happy Socks | https://www.happysocks.com/us | High-saturation product grids, joyful pattern repetition, color as immediate stimulus. |
| Dopamine Design | BAGGU | https://www.baggu.com/ | Clean commerce shell with strong color/product rhythm and reusable object systems. |
| Dopamine Design | Duolingo | https://www.duolingo.com/ | Bright mascot-led product UX, cheerful CTAs, gamified learning energy. |
| Pop Art | The Andy Warhol Museum | https://www.warhol.org/ | Pop art archive language, iconic consumer/celebrity imagery, bold museum storytelling. |
| Pop Art | Keith Haring Foundation | https://www.haring.com/ | Flat figure icons, thick black contour, public-art archive rhythm. |
| Pop Art | Guggenheim Pop | https://www.guggenheim.org/exhibition/guggenheim-pop | Exhibition framing for Pop Art history, poster-like art/event metadata. |
| Comic Book Style | Marvel | https://www.marvel.com/comics | Issue grids, character franchise navigation, high-contrast comic media cards. |
| Comic Book Style | DC Comics | https://www.dc.com/comics | Comic catalog search, issue metadata, hero-driven card density. |
| Comic Book Style | WEBTOON | https://www.webtoons.com/en | Vertical comic platform rhythm, episode cards, genre/tag browsing. |
| Toy Design | LEGO | https://www.lego.com/en-us | Brick modularity, age/theme filters, bold primary color commerce. |
| Toy Design | Play-Doh / Hasbro | https://play.hasbro.com/en-us/brand/play-doh | Soft clay visuals, activity/download language, kid-safe brand tone. |
| Toy Design | Fisher-Price / Mattel | https://shop.mattel.com/pages/fisher-price | Preschool toy language, age-based browsing, chunky friendly product UI. |
| Playful Design | Duolingo | https://www.duolingo.com/ | Product onboarding energy, mascot feedback, simple high-confidence CTAs. |
| Playful Design | Mailchimp | https://mailchimp.com/ | Friendly business tool tone, expressive illustration, approachable SaaS flow. |
| Playful Design | Headspace | https://www.headspace.com/ | Warm illustration, calm playful characters, human-centered app storytelling. |
| Pastel Style | Glossier | https://www.glossier.com/ | Soft beauty ecommerce, airy whitespace, pale pink/neutral editorial surfaces. |
| Pastel Style | Starface | https://starface.world/products/hydro-stars-refill | Pastel/yellow skincare product language, cute-but-clean product detail page. |
| Pastel Style | Bubble Skincare | https://www.bubbleskincare.com/ | Gentle skincare color, rounded product architecture, soft youth-market polish. |
| Bubble Design | Bubble Skincare | https://www.bubbleskincare.com/ | Rounded skincare packaging, soft capsule naming, clean bubble-adjacent brand system. |
| Bubble Design | poppi | https://drinkpoppi.com/ | Soda bubbles, round can/product language, lively circular product sections. |
| Bubble Design | bubly | https://www.bubly.com/ | Sparkling-water brand with bubble identity and simple bubbly surface language. |

## Style Separation Rules

The previews should not share one `kawaii-app` rendering with recolored tokens. Each style needs a different layout grammar.

| Pair to separate | Difference to enforce |
| --- | --- |
| Kitsch vs Dopamine | Kitsch is intentionally quirky, novelty-rich, and a little overstuffed. Dopamine is cleaner, punchier, and driven by bright color hits and reward loops. |
| Kawaii vs Pastel | Kawaii is mascot/character-led and sticker-like. Pastel is soft, airy, beauty/editorial, and lower contrast. |
| Pop Art vs Comic Book | Pop Art uses poster/archive/gallery composition, repeated art objects, halftone, and consumer iconography. Comic Book uses sequential panels, speech balloons, issue covers, and episode metadata. |
| Toy Design vs Bubble Design | Toy Design uses modular blocks, age filters, parts, and physical assembly. Bubble Design uses inflated capsules, liquid curves, circular product modules, and buoyant motion. |
| Playful Design vs Kawaii | Playful Design is an approachable product/service interface. Kawaii is a character-world interface. |

## Preview Directions

| Style | Preview concept | Must-have markers | Avoid |
| --- | --- | --- | --- |
| Kitsch | Novelty shop drop board | `ODD SHOP DROP`, sticker price bursts, mixed object cards, clashing pattern strips | Clean pastel beauty grid, generic mascot app |
| Kawaii | Character club dashboard | `CHARACTER CLUB`, mascot tiles, heart/sticker badges, soft rounded room modules | Loud pop-art halftone, business SaaS UI |
| Dopamine Design | Reward-color habit/product loop | `COLOR REWARD LOOP`, high-saturation modules, confetti-like progress, fast CTA hierarchy | Random clutter, retro kitsch irony |
| Pop Art | Museum poster/archive screen | `POP OBJECT ARCHIVE`, halftone block, repeated product/object imagery, large flat color fields | Comic issue panels, speech balloon story flow |
| Comic Book Style | Issue/episode reader storefront | `ISSUE DROP`, panel grid, speech balloon, page/episode metadata, heavy ink borders | Warhol/Haring museum poster treatment |
| Toy Design | Modular playset builder | `PLAYSET BUILDER`, block parts, age/theme tabs, assembly tray, chunky physical controls | Liquid bubble capsules, skincare-style polish |
| Playful Design | Friendly app onboarding/workflow | `PLAYFUL ONBOARD`, mascot helper, gentle task cards, delightful feedback states | Character collectible shop, childish toy catalog |
| Pastel Style | Soft beauty/editorial product page | `SOFT EDIT`, low-contrast palette, airy product rows, editorial beauty copy | Mascot-heavy kawaii stickers, saturated dopamine cards |
| Bubble Design | Floating product capsule interface | `BUBBLE FLOW`, inflated capsules, circular drink/skincare modules, liquid progress | LEGO-like modular blocks, flat pastel editorial |

## Implementation Plan

1. Replace shared Cute/Casual reference data.
   - Update `scripts/style-references.json` for all 9 slugs.
   - Add or refresh matching `research` entries in `src/data/designStyles.ts`.
   - Use style-specific notes, not copied generic notes.

2. Add a failing validation script first.
   - Create `scripts/check-cute-casual.mjs`.
   - Add `check:cute-casual` to `package.json`.
   - Assert 3+ site references for every Cute/Casual slug.
   - Assert required preview markers for every style.
   - Assert forbidden overlap markers between similar pairs.

3. Implement 9 distinct preview renderers.
   - Work in `src/components/design-style/DesignStyleSampleRenderer.tsx`.
   - Replace or branch away from the current shared `kawaii-app` path.
   - Keep each preview compact enough for card/detail rendering.
   - Use stable dimensions so text and cards do not jump or overlap.

4. Refresh tokens only where needed.
   - Tune typography, radius, density, border, and shadow in `src/data/designStyles.ts`.
   - Keep color palettes distinct without making every style a one-note pink/yellow palette.

5. Verify locally.
   - `npm run check:cute-casual`
   - `npm run check:data`
   - `npm run check:style-refs`
   - `npm run lint`
   - `npm run build`
   - Browser check:
     - `/en/styles?category=%EA%B7%80%EC%97%AC%EC%9B%80+%2F+%EC%BA%90%EC%A3%BC%EC%96%BC`
     - Each detail route for the 9 slugs.

## Quality Gate

A Cute/Casual preview is acceptable only when:

- It can be identified from the preview surface without reading the title.
- It uses at least 3 real references that fit the specific style, not only the broad category.
- It does not reuse the same layout mechanics as its adjacent styles.
- It avoids text overlap on desktop and mobile.
- It looks like a professional designer could use it as a direction board, not a placeholder demo.

## Suggested Goal Objective

Use this exact objective when starting the later goal feature:

> Cute/Casual 9개 스타일의 실제 웹 레퍼런스를 스타일별 3개 이상 수집하고, 각 스타일이 서로 겹치지 않는 프로덕션급 미리보기로 교체한다.
