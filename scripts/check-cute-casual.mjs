// scripts/check-cute-casual.mjs
import { readFileSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const cuteCasualSlugs = [
  "kitsch",
  "kawaii",
  "dopamine-design",
  "pop-art",
  "comic-book-style",
  "toy-design",
  "playful-design",
  "pastel-style",
  "bubble-design",
];

const sampleFunctions = {
  kitsch: "KitschNoveltyDrop",
  kawaii: "KawaiiCharacterClub",
  "dopamine-design": "DopamineRewardLoop",
  "pop-art": "PopArtObjectArchive",
  "comic-book-style": "ComicIssueDrop",
  "toy-design": "ToyPlaysetBuilder",
  "playful-design": "PlayfulOnboardFlow",
  "pastel-style": "PastelSoftEdit",
  "bubble-design": "BubbleFlowCapsules",
};

const requiredSampleMarkers = {
  kitsch: ["ODD SHOP DROP", "sticker price bursts", "clashing pattern strips"],
  kawaii: ["CHARACTER CLUB", "mascot tiles", "heart badges"],
  "dopamine-design": ["COLOR REWARD LOOP", "reward meter", "dopamine spectrum"],
  "pop-art": ["POP OBJECT ARCHIVE", "halftone block", "repeated object"],
  "comic-book-style": ["ISSUE DROP", "speech balloon", "episode metadata"],
  "toy-design": ["PLAYSET BUILDER", "block parts", "assembly tray"],
  "playful-design": ["PLAYFUL ONBOARD", "mascot helper", "gentle task cards"],
  "pastel-style": ["SOFT EDIT", "airy product rows", "low-contrast set"],
  "bubble-design": ["BUBBLE FLOW", "inflated capsules", "liquid progress"],
};

const requiredExperienceMarkers = {
  kitsch: ["LIMITED ODDITIES", "pattern clash rail", "giftable product finder", "drop countdown"],
  kawaii: ["FRIEND CLUB DASHBOARD", "character mood ring", "stamp rewards", "shop tiny treats"],
  "dopamine-design": ["STREAK ENERGY ENGINE", "reward ladder", "color pulse cards", "habit orbit"],
  "pop-art": ["SERIAL POP WALL", "museum shop wall", "halftone caption rail", "object edition grid"],
  "comic-book-style": ["COVER READER SHELF", "panel preview", "creator credit line", "series queue"],
  "toy-design": ["MODULAR PLAYSET SHOP", "age range selector", "instruction rail", "build pattern chooser"],
  "playful-design": ["GUIDED JOY FLOW", "mascot walkthrough", "task completion stack", "soft progress path"],
  "pastel-style": ["PASTEL BEAUTY EDIT", "shade story", "skin tint planner", "editorial product shelf"],
  "bubble-design": ["EFFERVESCENT FLAVOR LAB", "flavor carousel", "nutrition bubbles", "can shelf"],
};

const forbiddenSampleMarkers = {
  kitsch: ["COLOR REWARD LOOP", "SOFT EDIT", "CHARACTER CLUB"],
  kawaii: ["POP OBJECT ARCHIVE", "COLOR REWARD LOOP", "SOFT EDIT"],
  "dopamine-design": ["ODD SHOP DROP", "CHARACTER CLUB", "SOFT EDIT"],
  "pop-art": ["ISSUE DROP", "speech balloon", "episode metadata"],
  "comic-book-style": ["POP OBJECT ARCHIVE", "museum poster", "halftone archive"],
  "toy-design": ["BUBBLE FLOW", "liquid progress", "SOFT EDIT"],
  "playful-design": ["CHARACTER CLUB", "PLAYSET BUILDER", "BUBBLE FLOW"],
  "pastel-style": ["CHARACTER CLUB", "COLOR REWARD LOOP", "BUBBLE FLOW"],
  "bubble-design": ["PLAYSET BUILDER", "block parts", "SOFT EDIT"],
};

const forbiddenPrototypeCopy = {
  kitsch: ["Odd Goods", "Gloss", "Gift"],
  kawaii: ["Mochi Room", "Sticker mail", "Room gift", "Friend pass"],
  "dopamine-design": ["Joy Habit", "Bright wins", "Claim color"],
  "pop-art": ["Pop Index", "1963"],
  "comic-book-style": ["Panel Rack", "Chapter 24"],
  "toy-design": ["Brick Lab", "Build kit"],
  "playful-design": ["Sunny Steps", "Start light", "Ship today"],
  "pastel-style": ["Soft Shelf", "Calm product notes", "cream finish", "soft beauty shelf"],
  "bubble-design": ["Fizz Lab", "Float fresh"],
};

const requiredSites = {
  kitsch: ["https://www.bando.com/", "https://www.lazyoaf.com/", "https://lisasaysgah.com/"],
  kawaii: ["https://www.sanrio.com/", "https://pusheen.com/", "https://www.tokidoki.it/"],
  "dopamine-design": ["https://www.happysocks.com/us", "https://www.baggu.com/", "https://www.duolingo.com/"],
  "pop-art": ["https://www.warhol.org/", "https://www.haring.com/", "https://www.guggenheim.org/exhibition/guggenheim-pop"],
  "comic-book-style": ["https://www.marvel.com/comics", "https://www.dc.com/comics", "https://www.webtoons.com/en"],
  "toy-design": ["https://www.lego.com/en-us", "https://play.hasbro.com/en-us/brand/play-doh", "https://shop.mattel.com/pages/fisher-price"],
  "playful-design": ["https://www.duolingo.com/", "https://mailchimp.com/", "https://www.headspace.com/"],
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
