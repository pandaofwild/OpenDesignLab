// scripts/check-cute-casual.mjs
import { readFileSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const cuteCasualSlugs = [
  "kitsch",
  "dopamine-design",
  "pop-art",
  "comic-book-style",
  "toy-design",
  "pastel-style",
  "bubble-design",
];

const sampleFunctions = {
  kitsch: "KitschNoveltyDrop",
  "dopamine-design": "DopamineSpectrumShop",
  "pop-art": "PopArtObjectArchive",
  "comic-book-style": "ComicIssueDrop",
  "toy-design": "ToyPlaysetBuilder",
  "pastel-style": "PastelSoftEdit",
  "bubble-design": "BubbleFlowCapsules",
};

const requiredSampleMarkers = {
  kitsch: ["ODD SHOP DROP", "sticker price bursts", "clashing pattern strips"],
  "dopamine-design": ["SPECTRUM SHOP", "color filter spine", "saturated swatch grid"],
  "pop-art": ["POP OBJECT ARCHIVE", "halftone block", "repeated object"],
  "comic-book-style": ["ISSUE DROP", "speech balloon", "episode metadata"],
  "toy-design": ["PLAYSET BUILDER", "block parts", "assembly tray"],
  "pastel-style": ["SOFT EDIT", "airy product rows", "low-contrast set"],
  "bubble-design": ["BUBBLE FLOW", "inflated capsules", "liquid progress"],
};

const requiredExperienceMarkers = {
  kitsch: ["LIMITED ODDITIES", "pattern clash rail", "giftable product finder", "drop countdown"],
  "dopamine-design": ["SINGLE PIGMENT HOUSE", "colorway cart", "pigment record", "family result count"],
  "pop-art": ["SERIAL POP WALL", "museum shop wall", "halftone caption rail", "object edition grid"],
  "comic-book-style": ["COVER READER SHELF", "panel preview", "creator credit line", "series queue"],
  "toy-design": ["MODULAR PLAYSET SHOP", "age range selector", "instruction rail", "build pattern chooser"],
  "pastel-style": ["PASTEL BEAUTY EDIT", "shade story", "skin tint planner", "editorial product shelf"],
  "bubble-design": ["AQUA DESKTOP", "glass dock", "droplet widget", "window shelf"],
};

const forbiddenSampleMarkers = {
  kitsch: ["SPECTRUM SHOP", "SOFT EDIT"],
  "dopamine-design": ["ODD SHOP DROP", "SOFT EDIT"],
  "pop-art": ["ISSUE DROP", "speech balloon", "episode metadata"],
  "comic-book-style": ["POP OBJECT ARCHIVE", "museum poster", "halftone archive"],
  "toy-design": ["BUBBLE FLOW", "liquid progress", "SOFT EDIT"],
  "pastel-style": ["SPECTRUM SHOP", "BUBBLE FLOW"],
  "bubble-design": ["PLAYSET BUILDER", "block parts", "SOFT EDIT"],
};

const forbiddenPrototypeCopy = {
  kitsch: ["Odd Goods", "Gloss", "Gift"],
  "dopamine-design": ["Joy Habit", "Bright wins", "Claim color", "STREAK ENERGY ENGINE", "habit orbit", "reward ladder"],
  "pop-art": ["Pop Index", "1963"],
  "comic-book-style": ["Panel Rack", "Chapter 24"],
  "toy-design": ["Brick Lab", "Build kit"],
  "pastel-style": ["Soft Shelf", "Calm product notes", "cream finish", "soft beauty shelf"],
  "bubble-design": ["Pop Fizz", "sparkling drinks", "EFFERVESCENT FLAVOR LAB", "can shelf"],
};

const requiredSites = {
  kitsch: ["https://www.bando.com/", "https://www.lazyoaf.com/", "https://lisasaysgah.com/"],
  "dopamine-design": ["https://www.happysocks.com/us", "https://www.baggu.com/", "https://www.duolingo.com/"],
  "pop-art": ["https://www.warhol.org/", "https://www.haring.com/", "https://www.guggenheim.org/exhibition/guggenheim-pop"],
  "comic-book-style": ["https://www.marvel.com/comics", "https://www.dc.com/comics", "https://www.webtoons.com/en"],
  "toy-design": ["https://www.lego.com/en-us", "https://play.hasbro.com/en-us/brand/play-doh", "https://shop.mattel.com/pages/fisher-price"],
  "pastel-style": ["https://www.glossier.com/", "https://starface.world/products/hydro-stars-refill", "https://www.bubbleskincare.com/"],
  "bubble-design": ["https://www.bubbleskincare.com/", "https://drinkpoppi.com/", "https://www.bubly.com/"],
};

const rendererSource = readFileSync(
  new URL("../src/components/design-style/DesignStyleSampleRenderer.tsx", import.meta.url),
  "utf8",
);

function functionBody(name) {
  const start = rendererSource.indexOf(`function ${name}`);
  if (start === -1) return "";
  const nextFunction = rendererSource.indexOf("\nfunction ", start + 1);
  return rendererSource.slice(start, nextFunction === -1 ? rendererSource.length : nextFunction);
}

const errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

const stylesBySlug = new Map(designStyles.map((style) => [style.slug, style]));
const categorySlugs = designStyles
  .filter((style) => style.category === "귀여움 / 캐주얼")
  .map((style) => style.slug);

assert(
  JSON.stringify(categorySlugs) === JSON.stringify(cuteCasualSlugs),
  `cute/casual slug order changed: ${categorySlugs.join(", ")}`,
);

for (const slug of cuteCasualSlugs) {
  const style = stylesBySlug.get(slug);
  assert(style, `missing style ${slug}`);

  const styleSites = style?.research?.referenceSites ?? [];
  const styleGalleries = style?.research?.referenceGalleries ?? [];
  assert(styleSites.length >= 3, `${slug} needs at least 3 real site references in designStyles.ts`);
  assert(styleGalleries.length >= 3, `${slug} needs at least 3 gallery/search references in designStyles.ts`);

  const jsonEntry = references[slug];
  assert(jsonEntry, `missing style-references entry for ${slug}`);
  const jsonSites = jsonEntry?.sites ?? [];
  const jsonGalleries = jsonEntry?.galleries ?? [];
  assert(jsonSites.length >= 3, `${slug} needs at least 3 real site references in style-references.json`);
  assert(jsonGalleries.length >= 3, `${slug} needs at least 3 gallery/search references in style-references.json`);

  for (const url of requiredSites[slug]) {
    assert(styleSites.some((item) => item.url === url), `${slug} designStyles.ts missing source URL: ${url}`);
    assert(jsonSites.some((item) => item.url === url), `${slug} style-references.json missing source URL: ${url}`);
  }

  const body = functionBody(sampleFunctions[slug]);
  assert(body, `${sampleFunctions[slug]} function is missing for ${slug}`);

  for (const marker of requiredSampleMarkers[slug]) {
    assert(body.includes(marker), `${sampleFunctions[slug]} missing marker "${marker}"`);
  }

  for (const marker of requiredExperienceMarkers[slug]) {
    assert(body.includes(marker), `${sampleFunctions[slug]} missing source-grounded experience marker "${marker}"`);
  }

  for (const marker of forbiddenSampleMarkers[slug]) {
    assert(!body.includes(marker), `${sampleFunctions[slug]} contains overlap marker "${marker}"`);
  }

  for (const marker of forbiddenPrototypeCopy[slug]) {
    assert(!body.includes(marker), `${sampleFunctions[slug]} still contains prototype copy "${marker}"`);
  }
}

for (const marker of ["daily app", "kawaii-app shared", "Generic cute card"]) {
  assert(!rendererSource.includes(marker), `retired generic Cute/Casual marker still present: ${marker}`);
}

if (errors.length) {
  console.error("CUTE CASUAL CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`cute/casual check passed: ${cuteCasualSlugs.length} styles separated`);
