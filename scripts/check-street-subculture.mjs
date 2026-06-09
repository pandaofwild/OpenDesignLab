// scripts/check-street-subculture.mjs
import { readFileSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const streetSubcultureSlugs = [
  "streetwear",
  "graffiti",
  "hiphop-style",
  "skate-culture",
  "punk",
  "grunge",
  "indie-sleaze",
  "rave-style",
  "lo-fi",
];

// The user asked to proceed one by one. Expand this list only after a style
// has been researched, implemented, and visually verified.
const completedStreetSubcultureSlugs = ["streetwear", "graffiti", "hiphop-style", "skate-culture", "punk", "grunge", "indie-sleaze", "rave-style", "lo-fi"];

const requiredSites = {
  streetwear: [
    "https://supreme.com/",
    "https://palaceskateboards.com/",
    "https://www.stussy.com/",
    "https://us.bape.com/",
    "https://kith.com/",
  ],
  graffiti: [
    "https://www.montana-cans.com/Products/SPRAY-CANS/",
    "https://brand.molotow.com/en/products/spray-cans/",
    "https://www.bombingscience.com/",
    "https://streetpins.com/",
    "https://streetartcities.com/about",
  ],
  "hiphop-style": [
    "https://www.xxlmag.com/",
    "https://hiphopdx.com/",
    "https://genius.com/",
    "https://www.lyricallemonade.com/",
    "https://www.massappeal.com/",
  ],
  "skate-culture": [
    "https://theberrics.com/",
    "https://www.nikesb.com/",
    "https://independenttrucks.com/",
    "https://santacruzskateboards.com/skate",
    "https://skateparkoftampa.com/",
  ],
  punk: [
    "https://www.punknews.org/",
    "https://fatwreck.com/",
    "https://www.epitaph.com/",
    "https://dischord.com/",
    "https://www.maximumrocknroll.com/about/",
  ],
  grunge: [
    "https://www.nirvana.com/",
    "https://www.subpop.com/",
    "https://www.soundgardenworld.com/",
    "https://pearljam.com/",
    "https://www.subpop.com/artists/mudhoney",
  ],
  "indie-sleaze": [
    "https://www.thecobrasnake.com/",
    "https://cari.institute/aesthetics/indie-sleaze",
    "https://www.dazeddigital.com/",
    "https://www.nylon.com/",
    "https://www.vogue.com/",
    "https://www.asos.com/",
  ],
  "rave-style": [
    "https://ra.co/",
    "https://boilerroom.tv/",
    "https://www.tomorrowland.com/",
    "https://ultramusicfestival.com/",
    "https://www.amsterdam-dance-event.nl/",
  ],
  "lo-fi": [
    "https://lofigirl.com/",
    "https://chillhop.com/",
    "https://bandcamp.com/",
    "https://www.nts.live/",
    "https://soundcloud.com/",
  ],
};

const sampleFunctions = {
  streetwear: "StreetwearDropEditorial",
  graffiti: "GraffitiWallArchive",
  "hiphop-style": "HipHopMixtapeConsole",
  "skate-culture": "SkateCultureSpotBoard",
  punk: "PunkZineDispatch",
  grunge: "GrungeTapeArchive",
  "indie-sleaze": "IndieSleazeFlashFeed",
  "rave-style": "RaveStagePulse",
  "lo-fi": "LoFiLoopDesk",
};

const requiredSampleMarkers = {
  streetwear: [
    "DROP LEDGER",
    "size run matrix",
    "lookbook strip",
    "release clock",
    "streetwear product wall",
  ],
  graffiti: [
    "WALL TAG INDEX",
    "spray color rack",
    "crew tag archive",
    "mural route map",
    "graffiti wall scanner",
  ],
  "hiphop-style": [
    "TRACKLIST INDEX",
    "beat grid mixer",
    "artist card stack",
    "lyric annotation rail",
    "release waveform",
  ],
  "skate-culture": [
    "SPOT CHECKLIST",
    "deck wall grid",
    "trick line map",
    "clip sequence rail",
    "sticker slap index",
  ],
  punk: [
    "ZINE DISPATCH",
    "ransom headline stack",
    "gig flyer rail",
    "patch badge grid",
    "photocopy noise field",
  ],
  grunge: [
    "DISTORTED ARCHIVE",
    "torn photo stack",
    "cassette setlist rail",
    "flannel texture board",
    "basement gig log",
  ],
  "indie-sleaze": [
    "FLASH PHOTO INDEX",
    "disposable camera grid",
    "club stamp rail",
    "bloghaus playlist deck",
    "messy outfit tags",
  ],
  "rave-style": [
    "LASER STAGE MAP",
    "bpm lineup grid",
    "ticket wristband rail",
    "sound system meters",
    "warehouse light tunnel",
  ],
  "lo-fi": [
    "LO-FI LOOP DESK",
    "dusty sampler pads",
    "cassette progress rail",
    "bedroom radio queue",
    "paper note texture",
  ],
};

const forbiddenPrototypeMarkers = {
  streetwear: ["drop</span>", "now</span>", "StreetCampaign"],
  graffiti: ["drop</span>", "now</span>", "StreetCampaign"],
  "hiphop-style": ["drop</span>", "now</span>", "StreetCampaign"],
  "skate-culture": ["drop</span>", "now</span>", "StreetCampaign"],
  punk: ["drop</span>", "now</span>", "StreetCampaign"],
  grunge: ["drop</span>", "now</span>", "StreetCampaign"],
  "indie-sleaze": ["drop</span>", "now</span>", "StreetCampaign"],
  "rave-style": ["drop</span>", "now</span>", "StreetCampaign", "CyberDashboard"],
  "lo-fi": ["drop</span>", "now</span>", "StreetCampaign", "CyberDashboard", "RetroCommerce"],
};

const requiredStructureMarkers = {
  grunge: ["torn archive spine", "pl-12", "rotate-[-1deg]"],
  "indie-sleaze": ["strip-", "pl-14", "grid-cols-[1.36fr_0.64fr]"],
  "rave-style": ["ticker-", "pb-12", "grid-rows-[1.34fr_0.66fr]"],
  "lo-fi": ["lofi-os-mixer", "grid-cols-[0.58fr_1.42fr]", "aspect-square rounded-full", "/generated/lofi-listening-room.png"],
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
  .filter((style) => style.category === "스트리트 / 서브컬처")
  .map((style) => style.slug);

assert(
  JSON.stringify(categorySlugs) === JSON.stringify(streetSubcultureSlugs),
  `street/subculture slug order changed: ${categorySlugs.join(", ")}`,
);

for (const slug of completedStreetSubcultureSlugs) {
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

  for (const marker of forbiddenPrototypeMarkers[slug]) {
    assert(!body.includes(marker), `${sampleFunctions[slug]} still contains generic street prototype marker "${marker}"`);
  }

  for (const marker of requiredStructureMarkers[slug] ?? []) {
    assert(body.includes(marker), `${sampleFunctions[slug]} missing structural distinction marker "${marker}"`);
  }

  assert(
    rendererSource.includes(`style.slug === "${slug}"`) && rendererSource.includes(`<${sampleFunctions[slug]} {...props} />`),
    `${slug} is not routed to ${sampleFunctions[slug]}`,
  );
}

if (errors.length) {
  console.error("STREET SUBCULTURE CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`street/subculture check passed: ${completedStreetSubcultureSlugs.length}/${streetSubcultureSlugs.length} styles completed`);
