// scripts/check-future-digital.mjs
import { readFileSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const futureDigitalSlugs = [
  "futurism",
  "cyberpunk",
  "neon-noir",
  "techwear",
  "high-tech",
  "ai-aesthetic",
  "hologram-style",
  "chromecore",
  "metaverse-style",
];

const requiredSampleMarkers = {
  futurism: ["ORBITAL", "Mach corridor", "Launch window"],
  cyberpunk: ["BRAINDANCE", "black-market deck", "city protocol"],
  "neon-noir": ["RED ROOM", "rain index", "case file"],
  techwear: ["SHELL SYSTEM", "garment matrix", "storm proof"],
  "high-tech": ["CONTROL PLANE", "deploy graph", "edge regions"],
  "ai-aesthetic": ["MODEL CANVAS", "latent queue", "world model"],
  "hologram-style": ["LIGHT FIELD", "depth layer", "prism stack"],
  chromecore: ["Y2K CHROME", "molded chrome shell", "specular flash"],
  "metaverse-style": ["SPATIAL LOBBY", "avatar mesh", "world shard"],
};

const retiredSampleMarkers = [
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

const rendererSource = readFileSync(new URL("../src/components/design-style/DesignStyleSampleRenderer.tsx", import.meta.url), "utf8");

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
