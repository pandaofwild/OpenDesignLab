# Mid-Century Modern Listening Room Redesign

## Goal

Redesign the `mid-century-modern` style sample as a distinctive 1960s hi-fi listening club application that reads immediately as Mid-Century Modern in both full and compact renderings.

## Concept

The sample becomes `MONO HOUSE · Listening Room No. 06`, a members-only listening room built around warm walnut audio furniture, a real receiver interface, record programming, and lounge-session booking.

This avoids the most literal furniture-store treatment while preserving the style's defining materials and product-design language. It must feel like a real, contemporary application for a historically rooted venue, not a decorative retro poster or a generic dashboard with vintage colors.

## Composition

The full sample uses an asymmetric `SIDE A / SIDE B` record-jacket composition.

- `SIDE A` occupies roughly three fifths of the sample and carries the primary listening-room image, club identity, current record, and a small material legend.
- `SIDE B` occupies the remaining width and behaves as a functional hi-fi receiver. It includes a frequency scale, tuned station indicator, track metadata, progress bar, transport controls, volume state, and session availability.
- A compact program queue sits beneath or within the receiver column. Each row presents a believable time, selection, host or format, seat count, and active state.
- The composition must have one dominant visual gesture: the large listening-room image paired with the horizontal receiver scale. All secondary modules stay restrained.

The compact sample preserves the split composition rather than collapsing into a generic vertical card. The image or record art and the tuning interface remain visible side by side, while secondary copy and one lower-priority session row may be hidden.

## Visual System

- Palette: cream paper, walnut brown, espresso, dark olive, burnt orange, muted mustard, and brushed brass.
- Typography: a characterful but controlled display face for the club name, paired with compact utilitarian labels and tabular numeric readouts.
- Surfaces: walnut veneer, woven speaker cloth, brushed metal, lightly textured paper, and glass.
- Geometry: thin rules, shallow or square corners, circular knobs, horizontal scales, speaker-grille rhythm, and record-label circles that belong to real controls or objects.
- Depth: restrained inset lines, material contrast, and one soft equipment shadow. No thick sticker outlines, offset shadows, neon, primary-color slabs, or decorative floating shapes.
- Image treatment: the listening-room image remains clearly visible with minimal overlay. It must show recognizable Mid-Century Modern furniture and hi-fi equipment, not be buried beneath a dark scrim.

## Real Interface Modules

### Club header

The header shows `MONO HOUSE`, the room number, an open or on-air indicator, and a compact membership or booking affordance. Labels must read as controls or status, not filler decoration.

### Listening-room hero

The hero shows a walnut speaker console, molded plywood seating, a turntable or reel-to-reel unit, warm architectural lighting, and period-aware materials. A small now-playing label may sit on a cream paper tab without hiding the scene.

### Receiver

The receiver must look operable. It includes a marked frequency band, a precise tuning needle, source selection, a volume value, real transport controls, elapsed and total time, and a progress scrubber.

### Session queue

The queue includes three believable programmed sessions. Each row exposes a start time, title or record selection, format or host, remaining seat count, and state such as `ON AIR`, `NEXT`, or `SOLD OUT`.

### Representative-trait translations

Existing project traits remain present as real modules so distinction guardrails continue to express the style:

- `MIDCENTURY STUDIO showroom` becomes the visible listening lounge and club identity.
- `Walnut slat product rail` becomes a walnut equipment or source-selection rail.
- `Noguchi glass table index` becomes a material or room-object annotation associated with the hero.
- `Girard textile swatch wall` becomes selectable acoustic-panel or speaker-cloth presets.
- `Catalog-like product labels` become equipment metadata and session labels.

Marker text may be updated where necessary, but the corresponding guardrail must be updated in the same change and continue to distinguish this sample from `seventies-retro`, `retro-futurism`, `bauhaus`, and `japandi`.

## Responsive Behavior

- Full rendering uses a strong asymmetric split with no empty dashboard-like filler.
- Compact rendering retains the club name, listening-room or record imagery, tuning scale, current track, and at least two session states.
- Narrow detail rendering stacks surrounding page content as the application already expects, while the sample itself keeps its internal hierarchy legible.
- Text must not clip, interactive-looking controls must not collide, and horizontal overflow must remain zero.

## Implementation Boundaries

- Keep the redesign localized to the Mid-Century Modern sample and its directly related data, generated style image, guardrail markers, and review documentation.
- Preserve unrelated dirty work in the shared renderer and other files.
- Reuse the existing `SampleFrame`, style tokens, and routing branch.
- Do not introduce a new application-level interaction model or shared abstraction unless the existing component structure requires it.
- Use real DOM and CSS for every control and module. Generated imagery may support the room scene but must not fake the receiver, queue, labels, or controls.

## Verification

- Run the relevant style distinction and data guardrails.
- Run `npm run lint` and the project build or the strongest safe equivalent available in the current shared worktree.
- Render `/en/styles/mid-century-modern` with `next dev --webpack` in desktop and narrow viewports.
- Render the filtered styles listing so the compact card is inspected at its real size.
- Confirm marker presence, usable component anatomy, horizontal overflow of `0`, clean browser console, and no clipping in full or compact modes.
- Record the fresh verification in `docs/style-sample-web-review-log.md`.
- Commit and push only the files belonging to this redesign, preserving unrelated workspace changes.
