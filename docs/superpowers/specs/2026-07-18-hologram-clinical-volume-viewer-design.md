# Hologram Clinical Volume Viewer Redesign

## Goal

Redesign `hologram-style` as a distinctive, production-grade clinical volumetric anatomy viewer that reads immediately as holographic light-field design in full, narrow, and compact renderings.

## Concept

The sample becomes `LUMA VOLUME · Clinical Anatomy Viewer`, a bright medical-research application for inspecting a volumetric thoracic or cardiac scan. A translucent anatomical subject floats inside a calibrated light-field chamber while slice planes, measurements, and spatial labels occupy distinct depths.

This concept avoids the expected dark spacecraft interface and separates Hologram Style from glassmorphism, HUD, and High-Tech. The interface must feel like a plausible diagnostic instrument rather than rainbow gradients, frosted cards, decorative sci-fi circles, or an image with fake UI baked into it.

## Composition

The full sample uses an asymmetric clinical workstation layout.

- A thin clinical header carries `LUMA VOLUME`, anonymized study identity, acquisition state, and export or compare affordances.
- The central light-field chamber occupies the majority of the sample. It contains the anatomical volume and four visually distinct depth planes.
- A narrow right control rail holds tissue mode, slice position, depth, opacity, and orientation controls.
- A restrained bottom sequence strip lists believable scan series and measurement status without becoming a card dashboard.

The central chamber is the single dominant visual gesture. Secondary controls remain pale, precise, and quiet so the floating anatomical volume and its spectral edges define the style.

## Four-Plane Light-Field System

### Rear calibration plane

A low-contrast spatial grid and anatomical orientation marks establish a measurable field behind the subject. It stays sharp enough to prove depth but never competes with the volume.

### Coronal slice plane

A translucent diagnostic slice intersects or sits immediately behind the volume. Its position responds to the selected slice and uses a single clean contour treatment rather than a frosted panel.

### Volumetric anatomy plane

The heart or thoracic anatomy is the primary subject. It appears suspended, translucent, and internally layered, with spectral separation limited to thin cyan, violet, and pale amber edge light. The volume must remain medically legible and must not resemble a fantasy crystal, jelly object, or generic abstract blob.

### Foreground measurement plane

Hairline measurement guides and spatial labels sit in front of the anatomy. They connect to real landmarks and report believable values such as chamber diameter, vessel length, slice depth, voxel spacing, and orientation.

Pointer movement may create restrained parallax between these four planes. The effect must be bounded, subtle, and disabled under reduced motion.

## Operational Modules

### Tissue mode selector

Three real buttons select `TISSUE`, `VESSEL`, or `BONE`. The selected mode changes anatomical emphasis, spectral edge color balance, active measurements, and the scan-series label. It does not navigate or persist.

### Slice and depth controls

The right rail includes a real range input for slice position and a compact depth or opacity control. Changing the slice updates the intersecting plane position, numeric slice readout, and one spatial measurement.

### Orientation control

A small orientation cube or tri-axis indicator communicates anterior/posterior, left/right, and superior/inferior direction. It is an actual orientation aid, not decorative geometry.

### Clinical metadata

Use anonymized, believable metadata: study ID, modality, series, voxel spacing, acquisition status, selected slice, and reconstruction state. Avoid patient names, diagnoses, claims of clinical accuracy, or alarming medical language.

### Scan sequence strip

The lower strip includes three compact series rows or tabs such as `CTA CHEST`, `VESSEL MAP`, and `CARDIAC PHASE`, with slice counts, state, and current selection. Selection stays synchronized with the tissue mode where appropriate.

## Visual System

- Background: bright clinical white with a faint cool-grey cast.
- Surfaces: clear optical glass, subtle acrylic edges, and hairline grey dividers; no broad blur fields.
- Primary spectral colors: surgical cyan, restrained violet, and pale amber used at thin refractive edges rather than filled gradients.
- Typography: neutral medical sans-serif paired with tabular numeric readouts and compact uppercase technical labels.
- Geometry: hairlines, calibrated ticks, transparent planes, axial guides, fine brackets, and one orientation cube.
- Depth: produced by real layer separation, translucency, parallax, refraction, and subject occlusion—not by stacked rounded cards or heavy shadows.
- Motion: a slow reconstruction sweep, subtle active-plane shimmer, and short state transitions only. No flashing or constant rotating globe.

## Representative Traits and Distinction

Translate the existing guardrail concepts into real modules:

- `LIGHT FIELD` becomes the named clinical reconstruction chamber.
- `depth layer` becomes the four-plane optical stack.
- `prism stack` becomes restrained spectral separation around anatomical edges and transparent diagnostic planes.
- `floating spatial labels` become measurement guides anchored to anatomy landmarks.
- `spectral edge light` remains the signature visual treatment.

The sample differs from:

- `glassmorphism` through clear spatial planes and light-field occlusion rather than frosted blurred cards;
- `hud` through a bright stationary clinical chamber rather than first-person scene instrumentation;
- `high-tech` through a volumetric subject and depth manipulation rather than control-plane dashboard cards;
- `chromecore` through transparent spectral light rather than dense reflective metal.

## Generated Image Requirements

### Clinical volume subject

Generate a new supporting image at `public/generated/design-styles/hologram-style.webp`. It must contain only a medically inspired translucent thoracic or cardiac volume on a clean transparent-looking or pale neutral field, without readable text, UI, labels, people, logos, or equipment branding. The DOM supplies every control, label, guide, plane, and measurement.

The selected subject must remain recognizable when cropped into the central chamber and must support restrained cyan, violet, and pale amber edge treatment. Reject grotesque gore, photoreal surgery, fantasy crystal anatomy, abstract jelly forms, dark sci-fi staging, and baked-in interface graphics.

### New moodboard

Replace `public/generated/moodboards/hologram-style-realistic-v2.webp` with a new 16:10 realistic clinical optics research board photographed from above. Include clear optical glass, diffraction film used sparingly, translucent anatomical film, calibration grid sheets, medical imaging crop studies without readable data, acrylic layer spacers, cyan/violet/pale amber chips, and brushed-white equipment material samples.

The moodboard must look like a real clinical-interface designer's research desk. Reject synthetic UI collages, rainbow foil dominance, floating holograms, readable text, logos, patient imagery, and generic VR imagery.

Follow `docs/style-moodboard-imagegen-guidelines.md`, inspect both generated images directly, and update the stored prompt so it matches the accepted output direction.

## Responsive Behavior

- Full rendering retains the header, four-plane chamber, right control rail, and scan sequence strip.
- Narrow rendering keeps the chamber first and moves or condenses the control rail without hiding the volume.
- Compact rendering retains `LUMA VOLUME`, the anatomical subject, visible slice plane, orientation aid, selected tissue mode, and one measurement. Lower-priority metadata and extra series rows may hide.
- Text, range controls, planes, and labels must not collide; horizontal overflow remains zero.
- Controls must work by keyboard and not depend on hover.

## Implementation Boundaries

- Keep the redesign localized to the Hologram sample leaf, directly related style data, HUD-family guardrails, generated Hologram assets, and current review documentation.
- Prefer a dedicated client leaf component rather than expanding the already large shared renderer.
- Reuse `SampleFrame`, the existing `hologram-style` route, style tokens, and project utility patterns.
- Do not add WebGL, canvas, 3D libraries, network calls, persistence, medical APIs, or shared application state.
- Build all interface planes, controls, labels, and measurement guides with real DOM and CSS.
- Preserve unrelated untracked files and other style work.

## Verification

- Add RED guardrail markers for the clinical chamber, tissue modes, slice control, orientation, and spatial measurement before implementation.
- Run `npm run check:data`, `npm run check:future-digital`, `npm run check:style-distinction`, and `npm run check:style-refs`.
- Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
- Render `/ko/styles/hologram-style` at full desktop and narrow mobile sizes, plus its compact listing card.
- Confirm tissue and slice controls update every dependent value, keyboard focus is visible, reduced motion disables parallax and reconstruction motion, browser console is clean on the detail page, and horizontal overflow is zero.
- Inspect the two generated images at original resolution and in their rendered crops.
- Mark `hologram-style` as `verified` in `docs/style-sample-web-review-log.md` only after all visual and command checks pass.
- Commit and push only Hologram-related files and the approved planning chain.
