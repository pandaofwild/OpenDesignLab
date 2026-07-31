// Generator for style moodboard images.
// Follows docs/style-moodboard-imagegen-guidelines.md: realistic research-board
// flat lays, no readable text, palette taken from src/data/designStyles.ts.
//
// Uses an OpenAI-compatible /responses endpoint with the built-in
// image_generation tool, then writes a 16:10 webp into
// public/generated/moodboards.
//
// Usage: OPENAI_BASE_URL=http://127.0.0.1:10100/v1 node scripts/gen-moodboard.mjs <slug> [<slug> ...]
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { generateImage } from "./lib/imagegen.mjs";

const OUT_WIDTH = 1600;
const OUT_HEIGHT = 1001;

export const PROMPTS = {
  baroque:
    "Create a realistic editorial moodboard for Baroque in web design. The board should look like a real designer's theatrical research board photographed from above on a near-black lacquered studio table, and it must be lit the way a Baroque painting is lit: a single warm raking light entering from the upper left, so one cluster of the board is brightly lit while the far corners fall into deep, almost total darkness. Include printed website layout references without readable text, curved scrollwork and volute ornament engravings, acanthus leaf ornament studies, oval cartouche outline studies, a broken gilded frame corner fragment, crimson silk velvet and brocade swatches, a deep verdigris green fabric piece, antique gold leaf samples and tarnished gilt strips, dark walnut veneer, a small marble fragment, candlelit ivory laid papers of varied thickness, a blank dark wax seal, and a hand-drawn horseshoe auditorium plan with no labels. The visual language should communicate tenebrism, curved ornament used as structure rather than as edging, ceremonial hierarchy and theatrical drama for web pages. It should not look like Art Deco stepped geometry, Rococo pastel lightness, or an evenly lit maroon board with no true black and no true gold. Use real-world imperfections: slight paper curl, tape corners, pin marks, uneven crop edges, gilt wear, velvet lint, subtle dust, and strong directional shadows. Palette: near-black, dark umber, antique gold, lit gilt highlight, crimson lake, veiled verdigris green, candlelit ivory, bronze. No readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake interface text, no floating cards, no rectangular borders standing in for ornament, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  "art-nouveau":
    "Create a realistic editorial moodboard for Art Nouveau in web design. The board should look like a real designer's ornament-and-ironwork research board photographed from above on a warm parchment studio table. Its organising idea is the coup de fouet, the whiplash line - a long sinuous asymmetric curve that changes speed and bends back on itself like an unfurling fern frond - and the material is arranged along one such sweeping curve rather than on a grid. Include printed layout proofs without readable text in which a single sinuous line, not a grid, organises the page; a torn strip of 1900 colour lithograph showing iris and lily stems in flat chalky ink; blackened cast-iron ornament fragments with curling plant stems; a patinated bronze curl; leaded stained-glass fragments in muted amber and faded teal held by lead came; ink line studies of stems that curl back on themselves; a real pressed fern crozier still coiled; dusty rose and sage colour chips; a peacock feather fragment; and parchment papers of varied thickness. Every colour is muted, dusty and low in saturation, like aged poster ink on cream - never bright, never candy. The visual language should communicate ornament integrated into the structural form rather than applied on top of it, and hand-worked iron and glass. It should not look like Art Deco geometry, Rococo pastel shell ornament, a generic olive eco or plant-shop board, or evenly repeating wave trim. Use real-world imperfections: slight paper curl, tape corners, pin marks, uneven crop edges, paper fibres, iron patina, glass edge chips, soft natural shadows, and subtle dust. Palette: warm cream paper, muted sage, dusty olive, soft muted gold, dusty rose, faded soft teal, olive-brown ink. No readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake interface text, no floating cards, no saturated colour, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  gothic:
    "Create a realistic editorial moodboard for Gothic in web design. The board should look like a real designer's cathedral-works research board photographed from above on a slab of cool pale limestone. One thing must be true of the photograph: the coloured glass is by far the brightest thing on the board, lit from beneath as if the slab were a light table, while the stone and paper around it stay cool and calm - because the whole Gothic structural system exists to free the wall for light. Include offcuts of medieval-style stained glass in brilliant cobalt, ruby, emerald and warm gold, some still held in H-section lead came; a coil of spare lead came; printed layout proofs without readable text in which tall narrow lancet columns replace a grid; ink tracery studies of pointed arches, trefoils and quatrefoils drawn on gridded paper; a mason's setting-out drawing of a rib vault; a small carved limestone boss and a scatter of stone dust; a steel setting-out square and a pair of dividers; cool grey and bone paper samples of varied thickness. The visual language should communicate structure that carries load - pointed arch, rib, tracery - and verticality as proportion rather than as decoration. It should not look like Baroque warm gilt gloom, a Halloween novelty board, a dark neon page, or a black fashion moodboard. Use real-world imperfections: stone dust, chipped glass edges, solder blobs, pencil setting-out lines, pin marks, tape corners, uneven crop edges, and cool directional shadows. Palette: cool limestone grey, bone white, cobalt blue, ruby red, emerald green, warm gold glass, lead grey, ink black. No readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no religious figures, no candles, no fake interface text, no floating cards, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  neoclassic:
    "Create a realistic editorial moodboard for Neoclassicism in web design. The board should look like an antiquarian survey office's research board photographed from above on a cool grey stone-topped drawing table. Everything on it is line rather than colour, and measured rather than invented - the movement was a revolt against Baroque and Rococo excess, and after Pompeii it drew the antique accurately instead of embellishing it. Include copperplate line engravings of classical orders on laid paper, drawn in fine black contour and parallel hatching with slender dimension lines and plain unlabelled scale bars; a sheet of squared setting-out paper with a column elevation ruled on it in pencil; a pair of brass dividers and a boxwood scale rule; a plaster cast fragment of an egg-and-dart moulding; a Wedgwood-style pale blue jasper medallion with a plain white relief and no face detail; a chip of black basalt; a fragment of Pompeian red wall plaster; celadon and stone-grey colour chips; and cool bone papers of varied thickness with plate marks and light foxing. Keep the board austere, orderly and calm - restraint, clarity and civic sobriety, not luxury. It should not look like a champagne-gold luxury board, a Baroque gilt drama board, a Rococo pastel workshop, or a marble hotel interior. Use real-world imperfections: plate marks, foxing, pencil setting-out lines, plaster dust, tape corners, pin marks, uneven deckle edges, and cool even shadows. Palette: cool stone grey, bone white, ink black, Wedgwood jasper blue, Pompeian red, celadon green, basalt black. No readable text, no tiny text, no letters, no numbers, no captions, no plate titles, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake interface text, no floating cards, no gilding, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  rococo:
    "Create a realistic editorial moodboard for Rococo in web design. The board should look like a real carver-and-gilder's workshop research board photographed from above on an ivory-painted limewood bench. Asymmetry is the rule the period called contraste, so the board must be composed deliberately off-balance: the material is gathered heavily toward one side and one corner is left almost bare, and no arrangement on it mirrors another. Include a carved limewood offcut of rocaille ornament - intertwined C-scrolls and S-scrolls with a small shell - part water-gilded and part still bare wood; a book of loose gold leaf with one leaf lifting; a gilder's tip brush and an agate burnisher; a shallow dish of red bole; printed layout proofs without readable text in which the fields are deliberately unequal; ink design drawings of asymmetric scrollwork where the left and right halves plainly differ; small paint-out cards in pale rose, vert d'eau and sky blue; a fragment of moulded plaster; a scrap of pale silk; and ivory papers of varied thickness. The gilt is warm matte gold with burnished highlights, never brassy. The visual language should communicate light carved ornament, deliberate asymmetry, and pastel fields held by gilding. It should not look like Baroque darkness and heavy gilt drama, a candy pastel or kawaii board, a Neoclassical measured plate, or a wedding-stationery board. Use real-world imperfections: wood shavings, gesso dust, fingerprints in the bole, gold leaf scraps, tape corners, pin marks, slight paper curl, and soft warm shadows. Palette: ivory white, warm matte gold, pale rose, vert d'eau grey-green, sky blue, red bole, warm shadow brown. No readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no putti faces, no fake interface text, no floating cards, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
};

async function generate(slug) {
  const prompt = PROMPTS[slug];
  if (!prompt) throw new Error(`No prompt configured for slug: ${slug}`);

  const png = await generateImage(prompt);
  const outDir = path.join(process.cwd(), "public", "generated", "moodboards");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.webp`);
  const meta = await sharp(png)
    .resize(OUT_WIDTH, OUT_HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: 86 })
    .toFile(outPath);
  console.log(`✓ ${slug}: ${meta.width}x${meta.height} -> ${outPath} (${meta.size} bytes)`);
}

// Importing this module (to reuse PROMPTS) must not run the CLI.
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const slugs = process.argv.slice(2);
  if (!slugs.length) {
    console.error("Usage: node scripts/gen-moodboard.mjs <slug> [<slug> ...]");
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
}
