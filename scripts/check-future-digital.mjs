// scripts/check-future-digital.mjs
import { readFileSync, readdirSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const futureDigitalSlugs = [
  "futurism",
  "cyberpunk",
  "neon-noir",
  "hud",
  "high-tech",
  "ai-aesthetic",
  "hologram-style",
  "chromecore",
];

const requiredSampleMarkers = {
  futurism: ["ORBITAL", "Mach corridor", "Launch window"],
  cyberpunk: ["BRAINDANCE", "black-market deck", "city protocol"],
  "neon-noir": ["RED ROOM", "rain index", "case file"],
  hud: ["FLIGHT OSD", "pitch ladder", "battery cell", "flight path vector", "telemetry rail"],
  "high-tech": ["CONTROL PLANE", "qubit lattice", "cryostat", "gate fidelity"],
  "ai-aesthetic": ["MODEL CANVAS", "Latent queue", "World-model preview"],
    "hologram-style": [
      "LUMA VOLUME",
      "clinical volume chamber",
      "tissue mode",
      "slice control",
      "orientation cube",
      "spatial measurement",
    ],
  chromecore: ["CHROMEWORKS", "Faceplate carousel", "Fitment rail"],
};

const retiredSampleMarkers = [
  "ORBITAL VELOCITY",
  "carbon telemetry spine",
  "SHELL SYSTEM",
    "garment matrix",
    "prism stack,",
    "Volumetric layer",
  "VELOCE",
  "KIROSHI",
  "NOIR",
  "ACRONYM®",
  "Hyperscale",
  "runway",
  "PRISM",
  "CHROME°",
  "MIRROR INDEX",
  "Decentral",
  "deploy graph",
  "edge regions",
];

const errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

const stylesBySlug = new Map(designStyles.map((style) => [style.slug, style]));
const categorySlugs = designStyles
  .filter((style) => style.category === "미래 / 디지털")
  .map((style) => style.slug);

assert(
  JSON.stringify(categorySlugs) === JSON.stringify(futureDigitalSlugs),
  `future/digital slug order changed: ${categorySlugs.join(", ")}`,
);

for (const slug of futureDigitalSlugs) {
  const style = stylesBySlug.get(slug);
  assert(style, `missing style ${slug}`);

  const styleSites = style?.research?.referenceSites ?? [];
  const styleGalleries = style?.research?.referenceGalleries ?? [];
  assert(styleSites.length >= 3, `${slug} needs at least 3 source/brand/archive references in designStyles.ts`);
  assert(styleGalleries.length >= 3, `${slug} needs at least 3 gallery/search references in designStyles.ts`);
  assert(styleSites.length + styleGalleries.length >= 6, `${slug} needs at least 6 total references in designStyles.ts`);

  const jsonEntry = references[slug];
  assert(jsonEntry, `missing style-references entry for ${slug}`);
  const jsonSites = jsonEntry?.sites ?? [];
  const jsonGalleries = jsonEntry?.galleries ?? [];
  assert(jsonSites.length >= 3, `${slug} needs at least 3 source/brand/archive references in style-references.json`);
  assert(jsonGalleries.length >= 3, `${slug} needs at least 3 gallery/search references in style-references.json`);
  assert(jsonSites.length + jsonGalleries.length >= 6, `${slug} needs at least 6 total references in style-references.json`);
}

// Samples live in DesignStyleSampleRenderer.tsx plus per-style extracted
// components (e.g. ChromeworksFaceplateShop, LatentStudioPanel), so marker
// checks scan every component source in the design-style folder.
const componentDir = new URL("../src/components/design-style/", import.meta.url);
const rendererSource = readdirSync(componentDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => readFileSync(new URL(file, componentDir), "utf8"))
  .join("\n");

for (const [slug, markers] of Object.entries(requiredSampleMarkers)) {
  for (const marker of markers) {
    assert(rendererSource.includes(marker), `${slug} sample missing marker "${marker}"`);
  }
}

for (const marker of retiredSampleMarkers) {
  assert(!rendererSource.includes(marker), `retired Future/Digital sample marker still present: ${marker}`);
}

if (errors.length) {
  console.error("FUTURE DIGITAL CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`future/digital check passed: ${futureDigitalSlugs.length} styles refreshed`);
