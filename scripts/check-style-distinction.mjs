// scripts/check-style-distinction.mjs
import { readFileSync } from "node:fs";
import { designStyles } from "../src/data/designStyles.ts";

const rendererSource = readFileSync(
  new URL("../src/components/design-style/DesignStyleSampleRenderer.tsx", import.meta.url),
  "utf8",
);

// Sample components that live in their own client files (hooks-based
// interactivity); routing still happens in DesignStyleSampleRenderer.tsx.
const externalSampleSources = {
  GlitchArtEditionsGallery: readFileSync(
    new URL("../src/components/design-style/GlitchArtEditionsGallery.tsx", import.meta.url),
    "utf8",
  ),
};

const delegatedSampleSources = {
  AiAestheticStudio: "../src/components/design-style/LatentStudioPanel.tsx",
  ChromecoreFaceplateShop: "../src/components/design-style/ChromeworksFaceplateShop.tsx",
  CyberpunkNightMarket: "../src/components/design-style/NightMarketClinic.tsx",
  FuturismMachCorridor: "../src/components/design-style/OrbitalTransitConsole.tsx",
  HighTechQuantumConsole: "../src/components/design-style/MillikelvinControlPlane.tsx",
  HudFlightOsd: "../src/components/design-style/FlightOsdConsole.tsx",
  NeonNoirCaseDesk: "../src/components/design-style/RedRoomCaseDesk.tsx",
  RetroDriveIn: "../src/components/design-style/SunnysideDriveIn.tsx",
  VintageApothecary: "../src/components/design-style/HollowayApothecary.tsx",
  Y2KMediaPlayer: "../src/components/design-style/CybershockPlayer.tsx",
  RetroFuturismSpecimen: "../src/components/design-style/WorldOfTomorrowSpecimen.tsx",
  SeventiesRollerDisco: "../src/components/design-style/RolleramaRink.tsx",
  MaximalistPatternAtelier: "../src/components/design-style/MaximalistSalonWall.tsx",
  MidCenturyModernStudio: "../src/components/design-style/AtomicInteriorsJournal.tsx",
};

function wrapperSlice(name) {
  const start = rendererSource.indexOf(`function ${name}`);
  if (start === -1) return "";
  const nextFunction = rendererSource.indexOf("\nfunction ", start + 1);
  return rendererSource.slice(start, nextFunction === -1 ? rendererSource.length : nextFunction);
}

function functionBody(name) {
  if (externalSampleSources[name]) return externalSampleSources[name];
  const wrapperSource = wrapperSlice(name);
  if (!wrapperSource) return "";
  return delegatedSampleSources[name]
    ? `${wrapperSource}\n${readFileSync(new URL(delegatedSampleSources[name], import.meta.url), "utf8")}`
    : wrapperSource;
}

const cyberpunkBody = functionBody("CyberpunkNightMarket");
const glitchBody = functionBody("GlitchArtEditionsGallery");
const neoBrutalistBody = functionBody("NeoBrutalistLaundromat");
const postmodernBody = functionBody("PostmodernAuctionHouse");

const categorySlugOrder = {
  "모던 / 미니멀": [
    "minimalism",
    "modernism",
    "swiss-design",
    "international-style",
    "scandinavian",
    "japandi",
    "warm-minimal",
    "soft-minimal",
    "high-end-minimal",
  ],
  "강렬 / 실험": [
    "brutalism",
    "new-brutalism",
    "anti-design",
    "maximalism",
    "glitch-art",
    "deconstructivism",
    "avant-garde",
    "postmodernism",
  ],
  "레트로 / 빈티지": [
    "retro",
    "vintage",
    "seventies-retro",
    "eighties-retro",
    "nineties-graphic",
    "y2k",
    "retro-futurism",
    "mid-century-modern",
    "bauhaus",
  ],
  "미래 / 디지털": [
    "futurism",
    "cyberpunk",
    "neon-noir",
    "hud",
    "high-tech",
    "ai-aesthetic",
    "hologram-style",
    "chromecore",
  ],
  "럭셔리 / 클래식": [
    "classic",
    "neoclassic",
    "luxury",
    "old-money",
    "art-deco",
    "art-nouveau",
    "baroque",
    "rococo",
    "gothic",
  ],
  "자연 / 수공예": [
    "organic-design",
    "natural",
    "botanical",
    "eco-design",
    "rustic",
    "kinfolk",
    "handmade",
    "craft",
    "wabi-sabi",
  ],
  "귀여움 / 캐주얼": [
    "kitsch",
    "kawaii",
    "dopamine-design",
    "pop-art",
    "comic-book-style",
    "toy-design",
    "playful-design",
    "pastel-style",
    "bubble-design",
  ],
  "스트리트 / 서브컬처": [
    "streetwear",
    "graffiti",
    "hiphop-style",
    "skate-culture",
    "punk",
    "grunge",
    "indie-sleaze",
    "rave-style",
    "lo-fi",
  ],
  "편집 / 타이포그래피": [
    "typography-focused",
    "editorial-design",
    "magazine-style",
    "posterism",
    "grid-system",
    "collage",
    "photomontage",
    "experimental-type",
    "newspaper-style",
  ],
  "UI / 웹": [
    "flat-design",
    "material-design",
    "neumorphism",
    "glassmorphism",
    "claymorphism",
    "dark-mode-design",
    "saas-style",
    "startup-landing-page",
  ],
};

const styleSampleFunctions = {
  minimalism: "MinimalismProductSystem",
  modernism: "ModernismFunctionalGrid",
  "swiss-design": "SwissInformationGrid",
  "international-style": "InternationalSystemPortal",
  scandinavian: "ScandinavianCommerceHome",
  japandi: "JapandiSpatialLanding",
  "warm-minimal": "WarmMinimalStudio",
  "soft-minimal": "SoftMinimalService",
  "high-end-minimal": "HighEndMinimalProduct",
  brutalism: "RawBrutalistIndex",
  "new-brutalism": "NeoBrutalistLaundromat",
  "anti-design": "AntiDesignLanding",
  maximalism: "MaximalistPatternAtelier",
  "glitch-art": "GlitchArtEditionsGallery",
  deconstructivism: "DeconstructiveExhibition",
  "avant-garde": "AvantGardeEditorial",
  postmodernism: "PostmodernAuctionHouse",
  retro: "RetroDriveIn",
  vintage: "VintageApothecary",
  "seventies-retro": "SeventiesRollerDisco",
  "eighties-retro": "EightiesVideoRental",
  "nineties-graphic": "NinetiesMultimediaCdRom",
  y2k: "Y2KMediaPlayer",
  "retro-futurism": "RetroFuturismSpecimen",
  "mid-century-modern": "MidCenturyModernStudio",
  bauhaus: "BauhausSchool",
  futurism: "FuturismMachCorridor",
  cyberpunk: "CyberpunkNightMarket",
  "neon-noir": "NeonNoirCaseDesk",
  hud: "HudFlightOsd",
  "high-tech": "HighTechQuantumConsole",
  "ai-aesthetic": "AiAestheticStudio",
  "hologram-style": "HologramClinicalVolumeSample",
  chromecore: "ChromecoreFaceplateShop",
  classic: "ClassicHeritageCommerce",
  neoclassic: "NeoclassicHotelHome",
  luxury: "LuxuryEditorialProduct",
  "old-money": "OldMoneyClubShop",
  "art-deco": "ArtDecoLinerBooking",
  "art-nouveau": "ArtNouveauBotanicalShop",
  baroque: "BaroqueGalleryCommerce",
  rococo: "RococoSalonMarket",
  gothic: "GothicCathedralArchive",
  "organic-design": "OrganicDesignApothecary",
  natural: "NaturalMarketShelf",
  botanical: "BotanicalGlasshouse",
  "eco-design": "EcoImpactSystem",
  rustic: "RusticLodgeCommerce",
  kinfolk: "KinfolkSlowJournal",
  handmade: "HandmadePatchMarket",
  craft: "CraftWorkshopLedger",
  "wabi-sabi": "WabiSabiTeaGallery",
  kitsch: "KitschNoveltyDrop",
  kawaii: "KawaiiCharacterClub",
  "dopamine-design": "DopamineRewardLoop",
  "pop-art": "PopArtObjectArchive",
  "comic-book-style": "ComicIssueDrop",
  "toy-design": "ToyPlaysetBuilder",
  "playful-design": "PlayfulOnboardFlow",
  "pastel-style": "PastelSoftEdit",
  "bubble-design": "BubbleFlowCapsules",
  streetwear: "StreetwearDropEditorial",
  graffiti: "GraffitiWallArchive",
  "hiphop-style": "HipHopAlbumStudio",
  "skate-culture": "SkateCultureSpotBoard",
  punk: "PunkZineDispatch",
  grunge: "GrungeTapeArchive",
  "indie-sleaze": "IndieSleazeFlashFeed",
  "rave-style": "RaveStagePulse",
  "lo-fi": "LoFiLoopDesk",
  "typography-focused": "TypographyFocusedSpecimen",
  "editorial-design": "EditorialLongformIndex",
  "magazine-style": "MagazineIssueBrowser",
  posterism: "PosterismPasteupWall",
  "grid-system": "GridSystemManual",
  collage: "CollageLayerDesk",
  photomontage: "PhotomontageCampaign",
  "experimental-type": "ExperimentalTypeLab",
  "newspaper-style": "NewspaperEditionGrid",
  "flat-design": "FlatDesignControlBoard",
  "material-design": "MaterialDesignStateSheet",
  neumorphism: "NeumorphismSoftPanel",
  glassmorphism: "GlassmorphismDepthDesk",
  claymorphism: "ClaymorphismAppWorkshop",
  "dark-mode-design": "DarkModeOpsConsole",
  "saas-style": "SaasStyleOperationsHome",
  "startup-landing-page": "StartupLandingStory",
};

const requiredFamilyMarkers = {
  minimalism: ["MINIMAL PRODUCT CANVAS", "negative-space product stage", "thin-rule material index"],
  modernism: ["MODERNIST PROGRAM GRID", "function-led object index", "primary geometry modules"],
  "swiss-design": ["SWISS BASELINE GRID", "multilingual public-service nav", "timetable information rail"],
  "international-style": ["GLOBAL SYSTEM PORTAL", "2x component rail", "cross-market content matrix"],
  scandinavian: ["NORDIC ROOM SHOP", "room-by-room category shelf", "soft utility product cards"],
  japandi: ["LOW HORIZONTAL RESIDENCE", "shoji material index", "slow case-study sequence"],
  "warm-minimal": ["WARM STUDIO PORTFOLIO", "terracotta consultation CTA", "linen project stack"],
  "soft-minimal": ["SOFT SERVICE FLOW", "frosted consultation card", "low-contrast session rail"],
  "high-end-minimal": ["QUIET COMMERCE FRAME", "severe product crop", "material provenance rail"],
  brutalism: ["RAW WEB INDEX", "default submit queue", "institutional link map"],
  "new-brutalism": ["LOUD LAUNDRY", "machine status", "cycle builder"],
  "anti-design": ["OFF-GRID PORTFOLIO", "wrong-way project rail", "scribble navigation path"],
  maximalism: ["PAVONE HOUSE", "Print index", "Pattern clash console"],
  "glitch-art": ["UNSTABLE MEDIA", "file integrity manifest", "edition activity"],
  deconstructivism: ["STRUCTURAL FAULT", "fracture section index", "displaced project axis"],
  "avant-garde": ["MANIFESTO PROGRAM", "critical lecture rail", "art-into-life agenda"],
  postmodernism: ["PALLADIO & POP", "The Quotation Sale", "browse by era"],
  "art-deco": ["Meridian Line", "Sailings board", "Stateroom classes", "Grand salon"],
  "ai-aesthetic": ["MODEL CANVAS", "World-model preview", "Prompt bar", "Latent queue"],
  chromecore: ["CHROMEWORKS", "Faceplate carousel", "Fitment rail", "Order bar"],
  retro: ["SUNNYSIDE", "menu board", "car hop ticket", "checkerboard"],
  vintage: ["HOLLOWAY'S APOTHECARY", "formulary", "apothecary label", "materia medica"],
  "seventies-retro": ["ROLLERAMA", "session board", "skate hire", "rainbow arch"],
  "eighties-retro": ["Neon Nights Video", "new-release wall", "be kind rewind"],
  "nineties-graphic": ["Mega Media", "topic explorer", "now loading"],
  y2k: ["CYBERSHOCK", "now playing", "spectrum visualizer", "transport controls"],
  "retro-futurism": ["WORLD OF TOMORROW", "exhibit viewer", "motif index", "atomic orbit"],
  "mid-century-modern": ["ATOMIC", "mid-century living", "HOUSE STUDY", "the pieces", "Eames Lounge Chair"],
  bauhaus: ["BAUHAUS SCHOOL", "workshop method grid", "circle square triangle lab"],
  futurism: ["ORBITAL TRANSIT", "Mach corridor map", "Launch window board", "Live telemetry"],
  cyberpunk: ["Lucky Chrome Clinic", "Implant menu", "Install queue", "Checkout ledger"],
  "neon-noir": ["RED ROOM", "Case file rail", "rain index", "night desk"],
  hud: ["KESTREL GCS", "FLIGHT OSD", "pitch ladder", "waypoint", "guidance line", "data tape"],
  "high-tech": ["MILLIKELVIN", "QUANTUM CONTROL PLANE", "qubit lattice", "cryostat rail", "job queue"],
  "typography-focused": ["TYPE SCALE SPECIMEN", "baseline strips", "font pairing shelf"],
  "editorial-design": ["LONGFORM EDIT DESK", "pull quote rail", "photo essay stack"],
  "magazine-style": ["ISSUE BROWSER", "cover wall", "contents grid"],
  posterism: ["POSTER WALL", "single-message field", "paste-up rail"],
  "grid-system": ["GRID METHOD", "column ruler", "module matrix"],
  collage: ["PAPER COLLAGE DESK", "tape layer stack", "cutout tray"],
  photomontage: ["PHOTO MONTAGE ROOM", "image collision grid", "mask stack"],
  "experimental-type": ["TYPE MUTATION LAB", "variable glyph field", "distortion rail"],
  "newspaper-style": ["DAILY EDITION", "masthead bar", "headline stack"],
  "flat-design": ["FLAT CONTROL BOARD", "solid fill modules", "no-depth buttons"],
  "material-design": ["MATERIAL STATE SHEET", "elevation stack", "ripple state rail"],
  neumorphism: ["SOFT EMBOSS PANEL", "inset controls", "double shadow wells"],
  glassmorphism: ["FROSTED DEPTH DESK", "blurred weather map", "translucent cards"],
  claymorphism: ["CLAY APP WORKSHOP", "puffy task cards", "soft 3D modules"],
  "dark-mode-design": ["DARK MODE OPS", "contrast ladder", "focus ring audit"],
  "saas-style": ["SAAS OPERATIONS HOME", "feature proof grid", "pricing matrix"],
  "startup-landing-page": ["STARTUP CONVERSION STORY", "hero CTA ladder", "funnel sequence"],
};

const errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

for (const [category, expectedSlugs] of Object.entries(categorySlugOrder)) {
  const actualSlugs = designStyles
    .filter((style) => style.category === category)
    .map((style) => style.slug);
  assert(
    JSON.stringify(actualSlugs) === JSON.stringify(expectedSlugs),
    `${category} slug order changed: ${actualSlugs.join(", ")}`,
  );
}

for (const style of designStyles) {
  assert(styleSampleFunctions[style.slug], `style ${style.slug} has no required sample function entry`);
}

for (const slug of Object.keys(styleSampleFunctions)) {
  assert(
    designStyles.some((style) => style.slug === slug),
    `sample function entry references unknown slug: ${slug}`,
  );
}

for (const [slug, functionName] of Object.entries(styleSampleFunctions)) {
  const body = functionBody(functionName);
  assert(body, `${functionName} function is missing for ${slug}`);
  assert(
    rendererSource.includes(`style.slug === "${slug}"`) &&
      rendererSource.includes(`<${functionName} {...props} />`),
    `${slug} is not routed to ${functionName}; it may still be using a shared fallback template`,
  );

  for (const marker of requiredFamilyMarkers[slug] ?? []) {
    assert(body.includes(marker), `${functionName} missing distinction marker "${marker}"`);
  }
}

// A delegated wrapper must not carry its own markers. Twice now a wrapper has
// listed them in a comment, which kept this check green while the real UI
// drifted — markers have to be satisfied by the component file itself.
for (const [functionName, sourcePath] of Object.entries(delegatedSampleSources)) {
  const slug = Object.entries(styleSampleFunctions).find(([, name]) => name === functionName)?.[0];
  assert(slug, `delegatedSampleSources entry ${functionName} maps to no slug in styleSampleFunctions`);
  const wrapperOnly = wrapperSlice(functionName);

  for (const marker of requiredFamilyMarkers[slug] ?? []) {
    assert(
      !wrapperOnly.includes(marker),
      `${functionName} wrapper itself contains distinction marker "${marker}"; keep markers in ${sourcePath} so a stale comment cannot satisfy this check`,
    );
  }
}

assert(cyberpunkBody, "CyberpunkCity function is missing");
assert(glitchBody, "GlitchArtEditionsGallery function is missing");
assert(neoBrutalistBody, "NeoBrutalistLaundromat function is missing");
assert(postmodernBody, "PostmodernAuctionHouse function is missing");

for (const marker of ["BRAINDANCE", "black-market deck", "city protocol", "Night market", "Ripper lane"]) {
  assert(cyberpunkBody.includes(marker), `CyberpunkCity missing cyberpunk marker "${marker}"`);
}

for (const marker of ["Dropped Frames", "sha-256", "macroblock", "channel drift"]) {
  assert(glitchBody.includes(marker), `GlitchArtEditionsGallery missing glitch marker "${marker}"`);
}

for (const marker of ["UNSTABLE MEDIA", "file integrity manifest", "sha-256", "Dropped Frames"]) {
  assert(!cyberpunkBody.includes(marker), `CyberpunkCity still contains glitch marker "${marker}"`);
}

for (const marker of ["neon-noir action RPG", "night city grid", "Pre-order", "Watch trailer", "BRAINDANCE", "black-market deck"]) {
  assert(!glitchBody.includes(marker), `GlitchArtEditionsGallery still contains cyberpunk/game marker "${marker}"`);
}

for (const marker of ["LOUD LAUNDRY", "machine status", "cycle builder", "wash rates"]) {
  assert(neoBrutalistBody.includes(marker), `NeoBrutalistLaundromat missing new-brutalism marker "${marker}"`);
}

for (const marker of ["PALLADIO & POP", "The Quotation Sale", "catalogue foreword"]) {
  assert(postmodernBody.includes(marker), `PostmodernAuctionHouse missing postmodern marker "${marker}"`);
}

for (const marker of ["PALLADIO & POP", "The Quotation Sale", "browse by era", "catalogue foreword"]) {
  assert(!neoBrutalistBody.includes(marker), `NeoBrutalistLaundromat still contains postmodern marker "${marker}"`);
}

for (const marker of ["LOUD LAUNDRY", "machine status", "cycle builder", "wash rates"]) {
  assert(!postmodernBody.includes(marker), `PostmodernAuctionHouse still contains new-brutalism marker "${marker}"`);
}

if (errors.length) {
  console.error("STYLE DISTINCTION CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`style distinction check passed: ${designStyles.length} styles use slug-specific samples`);
