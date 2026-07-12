// One-off generator for design-style sample backdrop images.
// Uses an OpenAI-compatible /responses endpoint with the built-in
// image_generation tool, then writes a webp into public/generated/design-styles.
//
// Usage: node scripts/gen-style-image.mjs <slug> [<slug> ...]
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BASE = process.env.OPENAI_BASE_URL || "http://127.0.0.1:10632/v1";
const KEY = process.env.OPENAI_API_KEY || "local";
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-5.5";

// Scene (not flat-lay) prompts: domain product/interior photography that crops
// cleanly into the sample image block. Palettes mirror src/data/designStyles.ts.
const PROMPTS = {
  maximalism:
    "An opulent maximalist interior in the style of a high-end London pattern house, no people and no text. A moody drawing room wrapped floor-to-ceiling in dense dark botanical patterned wallpaper (deep aubergine-plum ground, trailing emerald vines, peony-pink blooms, small gold accents), a wall of salon-hung ornate gilt picture frames of different sizes, a deep emerald green velvet sofa in the centre stacked with clashing patterned cushions (leopard print, pink chintz, gold fringe) on the right side, an ornate brass table lamp with a patterned pleated shade glowing warmly on a dark marble side table at the left side, a layered antique rug, a trailing potted fern. Rich moody warm evening light, jewel tones, glossy brass highlights, dense but composed styling, shallow depth of field. Realistic high-end editorial interiors photography, wide composition, luxurious more-is-more abundance. Palette: deep plum-aubergine, bottle emerald green, peony pink, antique gold, warm cream. No text, no letters, no numbers, no logos, no watermark, no people, no UI.",
  botanical:
    "A bright botanical plant shop interior. Lush green leafy potted plants and trailing foliage on pale wooden shelves, soft natural daylight from a window, fresh chlorophyll greens, terracotta pots, shallow depth of field. Calm editorial product photography, realistic, clean composition. Palette: cream, chlorophyll green, deep leaf green, sage, pale terracotta. No text, no letters, no logos, no watermark, no people, no UI.",
  "organic-design":
    "A natural apothecary product still life. Amber and frosted glass bottles of botanical oils and extracts with soft organic rounded silhouettes, arranged on a warm stone surface with a sprig of dried herb. Soft earthy diffuse light, muted sage, olive and terracotta palette. Editorial product photography, realistic, calm. No text, no letters, no logos, no watermark, no UI.",
  natural:
    "Undyed natural material goods arranged on a warm neutral linen surface: folded raw cotton and linen cloth, a rattan basket, a pale stone soap bar, a jar of raw honey. Soft daylight, gentle shadows, calm earthy oat-and-clay palette. Editorial product photography, realistic, tactile. No text, no letters, no logos, no watermark, no UI.",
  craft:
    "Handmade ceramic stoneware on a potter's workshop table. Several thrown clay bowls and a tall vase with matte earthy speckled glaze, a little raw clay and a wooden trimming tool nearby. Soft natural window light, warm clay, cream and umber palette, shallow depth of field. Editorial craft photography, realistic. No text, no letters, no logos, no watermark, no UI.",
  handmade:
    "Small-batch handmade goods on a craft worktable: a stack of deckle-edge handmade paper, natural soap bars wrapped in kraft, a ball of cotton twine, stamped blank kraft tags. Soft warm light, uneven artisanal textures, warm neutral palette with one muted accent. Editorial product photography, realistic, tactile imperfection. No text, no letters, no logos, no watermark, no UI.",
  "wabi-sabi":
    "A single imperfect wabi-sabi ceramic tea bowl on a quiet neutral surface, rough uneven texture and a subtle kintsugi repair line, soft directional light and a long calm shadow, lots of negative space, asymmetric composition. Muted stone, clay and ash palette. Minimal still-life editorial photography, realistic, serene. No text, no letters, no logos, no watermark, no UI.",
  kawaii:
    "A soft studio photograph of several adorable pastel plush toy characters arranged together: a round blush-pink bunny plush, a baby-blue cat plush, a butter-yellow star plush, and a mint round puff plush, each with simple embroidered cute faces and rosy cheeks, plus a few small felt star and heart props scattered around. Soft pastel pink seamless background, gentle soft daylight, fluffy chenille and velvet textures, shallow depth of field, soft shadows. Cute editorial kawaii product photography, realistic, professional, wide composition, plenty of charm. Palette: pastel pink, cream, baby blue, butter yellow, mint, lavender, soft coral. No text, no letters, no logos, no watermark, no people, no UI.",
  graffiti:
    "A wide daylight photograph of a large legal graffiti wall in an urban paint yard. One dominant wildstyle burner piece painted across weathered concrete: abstract interlocking letter-like shapes that are NOT readable as any word, chrome-silver fills, heavy black outlines, hot pink and electric blue color blends, yellow highlights, paint drips and soft overspray halos. Around it, faded older layers of throw-ups and tags, a strip of brick at the edge, cracked asphalt below with a few used spray cans. Slightly low camera angle, crisp editorial documentary photography, realistic. Palette: concrete grey, chrome silver, black, hot pink, electric blue, cab yellow. No readable words, no real letters, no numbers, no logos, no watermark, no people, no UI.",
  grunge:
    "A dark, grainy, moody photograph of a worn basement rock rehearsal space, early-90s Seattle grunge mood. A battered tube guitar amplifier stack and a scuffed electric guitar leaning against a dirty scratched concrete wall, a coiled cable and a strip of worn gaffer tape on the floor, a single dim warm work-light from one side, deep shadows, heavy film grain and dust, low saturation with a faint rust and cold-denim tint. Distressed analog documentary photography, desaturated, high grain, shallow depth of field. Palette: warm charcoal, dirty near-black, aged bone, oxidized rust brown, muted moss green, faded denim blue. No text, no letters, no logos, no watermark, no people, no UI.",
  kitsch:
    "A vibrant kitsch novelty-shop product photograph with fun maximalist commercial styling. A playful arrangement of quirky lifestyle objects spread across bold clashing color-block panels (hot pink, lemon yellow, violet): a wavy bright-orange ceramic bud vase, a glossy smiley-face mug, a checkerboard tote bag, retro heart-shaped sunglasses, a squiggle candle, a stack of enamel pin badges, and a small disco-ball trinket. Bright even studio lighting, glossy ceramic and plastic surfaces, saturated playful colors, crisp clean shadows, objects clearly separated with space around them. Realistic high-quality editorial product photography, wide composition. Palette: hot pink, hot orange, violet, lemon yellow, cream, glossy black. No text, no letters, no logos, no watermark, no people, no UI.",
  "hiphop-style":
    "A dark, moody, cinematic black-and-gold hip-hop recording studio still life. On a deep matte-black surface: a vinyl record catching a thin line of golden light along its grooves, a heavy gold curb chain coiled beside it, a chrome-and-gold condenser studio microphone on a small stand, a short stack of black vinyl sleeves, and a pair of studio headphones. Warm golden rim light from one side, rich deep blacks, brass and gold highlights, subtle haze, shallow depth of field. Premium editorial music-culture photography, realistic, high contrast. Distinct from raw graffiti walls and distressed grunge gear: this is polished black-and-gold studio luxury. Palette: deep black, warm charcoal, gold, brass, warm cream, a touch of signal red. No text, no letters, no logos, no watermark, no people, no UI.",
  "indie-sleaze":
    "A dark house-party corner shot with a harsh on-camera flash, early-2000s indie sleaze / bloghaus aesthetic. The blown-out flash blasts a messy low table: spilled drinks and red plastic cups, empty beer bottles, scattered silver glitter and confetti, a disposable film camera, tangled fairy lights, and a small cracked disco ball throwing light dots on the wall. Deep crushed-black shadows around the bright overexposed flash core, harsh direct light, heavy contrast, visible film grain and faint red-eye colour halos, slightly crooked snapshot framing. Gritty amateur flash snapshot photography, realistic, raw, high contrast. Palette: black, hot magenta pink, cyan, acid lime green, blown-out white. No text, no letters, no logos, no watermark, no people, no UI.",
  punk:
    "A high-contrast, heavily grained near black-and-white photograph of a classic punk battle jacket pinned flat against a rough photocopied concrete wall. A battered black leather-and-denim vest densely covered with cloth band patches, rows of metal studs and cone spikes across the shoulders, clusters of safety pins and a few small enamel pins. Harsh single-source hard light, deep crushed blacks and blown-out highlights, thick photocopy toner grain and dust speckle, near monochrome with a single bleeding blood-red spray accent. Gritty DIY xerox-fanzine documentary photography, realistic, raw, very high contrast. The patches show abstract torn shapes and are NOT readable as words. Palette: near-black, bone white, concrete grey, blood red. No readable text, no real letters, no numbers, no logos, no watermark, no people, no UI.",
  "rave-style":
    "A dark, hazy underground warehouse rave interior with no people. Intense electric lime-green and cyan laser beams fanning across thick volumetric fog from a raised DJ booth with a glowing equipment rig, metal truss lighting and a white strobe flare, wet concrete floor reflecting neon, deep crushed blacks and saturated neon glow, long light shafts cutting the haze. Moody cinematic electronic-music venue photography, realistic, very high contrast. Palette: near-black, electric lime green, cyan blue, hot orange accents, blown-out white. No text, no letters, no numbers, no logos, no watermark, no people, no signage, no UI.",
  "skate-culture":
    "A low-angle wide fisheye photograph of a weathered urban concrete skate spot in harsh daylight, no people. A marble-capped ledge and a short set of stairs with a scuffed metal handrail, heavy black skate-wax marks and grip scratches along the ledge edge, a single worn skateboard resting deck-down on the cracked asphalt at the base, scattered bottle caps, faint spray tags on a far concrete wall, strong direct sun and long hard shadows. Gritty skate-video documentary photography, wide fisheye lens distortion, realistic, high contrast, slightly desaturated warm concrete tones. Palette: concrete grey, asphalt black, warm tan, faded safety-yellow curb paint, pale sky blue. No text, no letters, no numbers, no logos, no watermark, no people, no signage, no UI.",
  "bubble-design":
    "A glossy Frutiger Aero desktop wallpaper photograph, early-2000s aqua tech-optimism, no people and no text. A pristine sunlit water surface seen close up: crystal-clear air bubbles and shimmering spherical water droplets floating and rising through bright turquoise-to-sky-blue water, glossy specular highlights and soft caustic light patterns dancing across it, tiny sparkles and gentle lens bloom, a smooth gradient from fresh sky blue at the top to clean aqua-green at the bottom, dewy wet freshness. Bright clean studio-clear lighting, high gloss, vivid but clean palette, shallow depth of field with soft round bokeh orbs. Realistic high-quality macro water photography, wide composition, luminous and airy. Palette: sky blue, turquoise, aqua teal, fresh spring green, glossy white highlights. No text, no letters, no numbers, no logos, no watermark, no people, no UI.",
  "comic-book-style":
    "A bold retro sci-fi comic-book cover illustration, hand-inked and cel-shaded — absolutely NOT a photograph, and no people. A dramatic vintage rocket ship blasting diagonally through a starry night sky above a stylized comic city skyline, heavy confident black ink outlines, flat bold cel-shaded colors, Ben-Day halftone dots in the sky and shadows, dynamic speed lines and a radiating energy burst around the rocket, a distant ringed planet and a crescent moon. Vivid Silver-Age palette: cobalt blue and cyan sky, hero-red rocket, yellow stars and highlights, magenta accents, warm cream newsprint tone. Vintage screen-print / newsprint texture, very high contrast, dynamic splash-page composition. No text, no letters, no numbers, no logos, no speech bubbles, no captions, no panel borders, no watermark, no signature, no people, no characters.",
  "pastel-style":
    "A soft, airy editorial beauty product photograph, Glossier / Bubble Skincare aesthetic, no people. A calm minimalist arrangement of pastel skincare and makeup products on a pale millennial-pink seamless surface: a frosted lilac serum dropper bottle, a soft matte baby-pink squeeze tube of moisturizer, a small round blush-pink cream-blush pot with the lid off, a milky-white pump bottle, a pale mint frosted glass jar, and a couple of smooth pastel tint sticks, with a few soft swatches of cream product gently smeared nearby. Bright soft diffuse daylight, gentle long soft shadows, very low-contrast pastel palette, generous negative space, shallow depth of field, clean skin-tint tones, glossy and frosted surfaces. Realistic high-end editorial cosmetics photography, minimal, soft, quietly expensive. Palette: millennial pink, blush, lilac, pale mint, cream, soft peach, milky white. No text, no letters, no numbers, no logos, no watermark, no people, no UI.",
  "nineties-graphic":
    "A bright, cheerful studio photograph of one adorable fluffy golden retriever puppy sitting and looking at the camera with a happy expression, soft golden fur, big friendly eyes, warm even lighting, clean simple pale cream background, shallow depth of field, wholesome and approachable. Realistic high-quality pet photography, wide composition, crisp and clean like an encyclopedia animal photo. Palette: warm golden, cream, soft brown, gentle highlights. No text, no letters, no numbers, no logos, no watermark, no people, no collar tag, no UI.",
  "eighties-retro":
    "A moody 1980s video-rental store horror aisle at night, no people and no text. Rows of VHS tape cases standing upright on dark shelves with worn blank spine labels, a glowing neon sign shape casting magenta and cyan light across the aisle, a boxy cathode CRT television on the rental counter glowing with static, a small desk lamp, deep navy-black shadows, blood-red and magenta neon reflections on the floor. Nostalgic analog 1980s mood, faint VHS grain and scanlines, deep shadows, high-contrast neon glow, atmospheric haze. Realistic cinematic photography, wide composition, cozy but eerie. Palette: dark navy, black, neon magenta, electric cyan, blood red, electric yellow. No readable text, no letters, no numbers, no logos, no watermark, no people, no UI.",
  "seventies-retro":
    "A warm 1970s home-kitchen food still life, no people and no text. A bubbling cheese fondue pot on a harvest-gold enamel stand at the centre of a wood-panelled kitchen table, avocado-green ceramic dishes, a burnt-orange casserole crock, cubes of crusty bread and a fondue fork, a checkered mustard tablecloth, a small houseplant and a chunky ceramic mug nearby. Warm tungsten light, cozy nostalgic 1970s domestic mood, slightly faded Kodachrome film tone, soft grain, shallow depth of field. Realistic vintage 1970s cookbook photography, wide composition, appetising and homey. Palette: harvest gold, mustard, avocado green, burnt orange, warm brown, cream. No text, no letters, no numbers, no logos, no watermark, no people, no UI.",
  streetwear:
    "A premium streetwear boutique interior, no people. A clean matte-steel clothing rail of neatly spaced hanging garments — heavyweight hoodies, boxy coach jackets and cargo pants in washed earth tones of bone, faded olive, charcoal and warm tan, with one single bright signal-red hooded piece as the focal accent — beside a pale plywood shelf holding tidy folded tee stacks and two caps. Soft even daylight from a large window, minimalist high-end retail styling, polished concrete floor, shallow depth of field. Realistic calm editorial retail photography, refined, uncluttered. Palette: bone white, washed olive, charcoal grey, warm tan, concrete grey, one signal red. No text, no letters, no numbers, no logos, no watermark, no people, no signage, no UI.",
  "mid-century-modern":
    "A wide editorial interior photograph of a sophisticated early-1960s members-only hi-fi listening lounge, no people and no text. The focal object is a substantial walnut stereo console with woven oatmeal speaker cloth, a period turntable with a black vinyl record, brushed aluminum receiver controls, and a visible reel-to-reel deck. Beside it sits one sculptural molded-plywood lounge chair with restrained olive upholstery and a low organic glass coffee table on a walnut base. Warm cream plaster walls, vertical walnut slats, one slim brass floor lamp, a small burnt-orange and muted-teal geometric acoustic textile panel, and soft afternoon architectural light. Camera at seated eye level, wide horizontal composition, audio equipment clearly visible in the center and right, useful negative space, realistic wood grain, woven fibers, brushed metal, glass reflections, gentle Kodachrome warmth without faded sepia. Refined contemporary editorial interiors photography with authentic Mid-Century Modern material design, not a generic furniture showroom. Palette: cream, walnut brown, espresso, dark olive, burnt orange, muted mustard, brushed brass, small muted teal accent. No readable text, no letters, no numbers, no logos, no watermark, no people, no fake UI, no 1970s groovy curves, no disco styling, no Bauhaus primary-color geometry, no synthwave neon, no futuristic spaceship controls.",
  "art-deco":
    "A vintage 1930s Art Deco travel poster illustration in the style of classic French poster art (Cassandre's Normandie) — absolutely NOT a photograph, no people. A colossal ocean liner bow seen head-on from a dramatic low angle, towering monumental near-black hull filling the frame, crisp champagne-gold rim light tracing the prow edge, stepped geometric funnels, a radiating brass sunburst sky with stepped stylized clouds behind the ship, calm dark emerald geometric sea with thin gold wave lines below, a small sharp white bow wave. Flat poster shading, bold simplified geometric forms, subtle airbrush gradients, strict symmetrical composition. Palette: black lacquer, champagne gold, brass, deep emerald green, ivory. No text, no letters, no numbers, no flags with symbols, no logos, no watermark, no people, no UI.",
};

async function generate(slug) {
  const prompt = PROMPTS[slug];
  if (!prompt) throw new Error(`No prompt configured for slug: ${slug}`);

  const res = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      input: [{ role: "user", content: `Generate a single high-quality photographic image. ${prompt}` }],
      tools: [{ type: "image_generation", size: "1536x1024", quality: "high", output_format: "png" }],
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);

  const call = (json.output || []).find((o) => o.type === "image_generation_call");
  if (!call?.result) {
    throw new Error(`No image in response: ${JSON.stringify(json).slice(0, 400)}`);
  }

  const png = Buffer.from(call.result, "base64");
  const outDir = path.join(process.cwd(), "public", "generated", "design-styles");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.webp`);
  const meta = await sharp(png).webp({ quality: 86 }).toFile(outPath);
  console.log(`✓ ${slug}: ${meta.width}x${meta.height} -> ${outPath} (${meta.size} bytes)`);
}

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("Usage: node scripts/gen-style-image.mjs <slug> [<slug> ...]");
  process.exit(1);
}
for (const slug of slugs) {
  try {
    await generate(slug);
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`);
    process.exitCode = 1;
  }
}
