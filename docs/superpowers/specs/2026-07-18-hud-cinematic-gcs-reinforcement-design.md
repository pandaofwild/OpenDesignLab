# HUD Cinematic GCS Reinforcement

## Goal

Reinforce the `hud` style sample so it reads immediately as a premium, operational heads-up display in full, narrow, and compact renderings. Restore the missing moodboard with a newly generated HUD-specific research-board image.

## Concept

The sample remains `KESTREL GCS`, a web-based ground-control station for a survey drone, but moves from a basic FPV overlay to a cinematic live mission view. The scene is the primary surface; flight instrumentation is anchored to it and behaves like a coherent system rather than decorative sci-fi geometry.

This keeps the less-obvious drone-survey framing while making the result unmistakably HUD. It must not become a card dashboard, a generic video-game overlay, a cyberpunk terminal, or a prismatic hologram interface.

## Composition

The full sample uses one dominant first-person viewport with a thin application header and a telemetry rail integrated at the lower edge.

- The center carries the flight-path vector, pitch ladder, horizon line, roll arc, and selected waypoint guidance.
- The left and right edges carry speed and altitude tapes with real tick hierarchy, current-value pointers, and compact unit labels.
- Corner clusters carry mission time, navigation lock, link quality, battery cells, wind, and flight mode.
- The bottom telemetry rail exposes the selected waypoint's distance, ETA, target altitude, and action state without becoming a detached card.
- The generated flight scene remains visible and atmospheric. Vignettes and color casts may improve legibility but may not smother the image.

The compact sample preserves the reticle, horizon, selected waypoint, current speed and altitude, mission state, and one warning signal. Lower-priority tick labels, navigation copy, and telemetry fields may collapse or hide, but the result must still read as a working HUD rather than a dark thumbnail.

## Visual System

- Palette: near-black optical frame, ice blue primary phosphor, pale cyan secondary telemetry, and amber reserved for caution states.
- Typography: narrow monospaced labels and tabular numbers with restrained tracking. Values are brighter than labels.
- Geometry: hairline strokes, calibrated ticks, open brackets, partial arcs, pointers, and reticles. Filled panels are avoided except for tiny active-state indicators.
- Glow: soft and local to active marks; never a broad neon bloom.
- Depth: scene photography, optical vignette, faint glass texture, and restrained scan movement. No floating glass cards or decorative 3D shapes.
- Signature gesture: a guidance line links the selected waypoint to the central flight-path vector, giving the overlay a clear operational purpose.

## Operational Modules

### Flight symbology

The pitch ladder gains a stable horizon line, positive and negative rung treatments, a roll arc, and a flight-path vector distinct from the aiming reticle. These elements share a consistent scale and center point.

### Data tapes

Speed and altitude tapes show major and minor ticks, neighboring values, a fixed current-value pointer, and units. They remain edge-anchored and translucent rather than boxed into dashboard cards.

### Waypoint guidance

The existing waypoint buttons remain the primary interaction. Selecting `WP 3` or `HOME` updates marker emphasis, guidance line, distance, ETA, target altitude, and action status in the telemetry rail. The control retains keyboard focus and an explicit pressed state.

### Mission and vehicle state

The four corner zones communicate mission timer and name, GPS and link lock, battery-cell state, and wind or flight mode. Information density increases through calibrated rows and symbols, not through extra containers.

### Motion

Motion stays functional and quiet: ARMED uses a slow breathing pulse, the low battery cell uses a slower amber warning, and a faint scan line traverses the viewport. Waypoint selection may use a short transition on the guidance line and marker. All nonessential motion is disabled under `prefers-reduced-motion`.

## Representative Traits and Distinction

Keep the existing HUD identity and guardrail concepts present as real modules:

- `FLIGHT OSD` remains the visible operating mode.
- `pitch ladder` is upgraded into complete central flight symbology.
- `battery cell` remains a believable multi-cell vehicle readout with one caution state.
- `KESTREL GCS` remains the application identity.
- `waypoint` remains an interactive, scene-pinned navigation control.

The sample differs from `high-tech` through overlay-on-scene instrumentation rather than control-panel cards, from `hologram-style` through disciplined monochrome optics rather than spectral depth, and from `cyberpunk` through flight logic rather than urban commerce and terminal clutter.

## New Moodboard Image

Generate a new `public/generated/moodboards/hud-realistic-v2.webp`; do not reuse or rename the remaining Techwear asset.

The image is a realistic 16:10 editorial flat lay photographed from above on a matte black instrument bench. It includes ice-blue printed acetate with unlabeled reticles and horizon ladders, open bracket and scale-ruler studies, smoked optical glass, a brushed-aluminum bezel fragment, blue and amber translucent color chips, a fine grid film strip, and a cropped night aerial or cockpit photograph with no readable instruments. Tape corners, paper curl, dust, material thickness, and real shadows make it plausible as a designer's research board.

Reject readable text, logos, watermarks, fake UI gibberish, floating holograms, neon-city imagery, dashboard-card collages, and synthetic poster composition. Inspect the generated image before accepting it and ensure it remains useful when cropped in the style detail page.

## Responsive Behavior

- Full rendering retains all primary symbology, both data tapes, four corner clusters, and the telemetry rail.
- Narrow rendering keeps the scene and central instrument hierarchy while reducing tick and label density before reducing type size.
- Compact rendering keeps the central HUD silhouette, current values, selected waypoint, mission state, and amber warning; it must not overflow or depend on hover.
- Interactive targets remain keyboard accessible, labels do not collide, and horizontal overflow remains zero.

## Implementation Boundaries

- Keep changes localized to the HUD sample leaf, directly related global motion styles, HUD data and prompts, generated HUD assets, guardrail markers, and review documentation.
- Preserve unrelated dirty work in the shared renderer and repository.
- Reuse `SampleFrame`, the existing `hud` route, style tokens, and the `FlightOsdConsole` client leaf.
- Do not add persistence, network calls, routing changes, canvas, WebGL, or shared application state.
- Use real DOM and CSS for all instruments and interactions. Generated imagery supports the scene and moodboard only; it may not fake the interface.

## Verification

- Run `npm run check:data`, `npm run check:future-digital`, and `npm run check:style-distinction`.
- Run `npm run lint` and `npm run build` or the strongest safe equivalent supported by the current shared worktree.
- Render `/ko/styles/hud` with `next dev --webpack` in full desktop, narrow mobile, and compact listing contexts.
- Confirm horizontal overflow is `0`, waypoint selection updates every dependent field, focus states work, reduced motion is respected, the browser console is clean, and neither text nor symbology clips.
- Inspect both generated HUD images directly and in their rendered page crops.
- Mark `hud` as `verified` in `docs/style-sample-web-review-log.md` only after the visual and command checks pass.
- Commit and push only HUD-related files, preserving unrelated workspace changes.
