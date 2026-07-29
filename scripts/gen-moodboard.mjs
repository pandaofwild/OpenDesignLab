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
    "Create a realistic editorial moodboard for Art Nouveau in web design. The board should look like a real designer's ornament-and-ironwork research board photographed from above on a warm parchment studio table. The organising idea of the board is the coup de fouet, the whiplash line: a long sinuous asymmetric curve that changes speed and bends back on itself like an unfurling fern frond. Include printed website layout references without readable text in which one continuous sinuous line, not a grid, organises the page; blackened cast-iron ornament fragments with curling plant stems; a patinated bronze curl; leaded stained-glass fragments in amber and peacock blue-green held by lead came; a piece of amber lamp glass; ink line drawings of stems that curl back on themselves; a real pressed fern crozier still coiled; sage and aubergine colour chips; a peacock feather fragment; and parchment papers of varied thickness. The visual language should communicate ornament integrated into the structural form rather than applied on top of it, asymmetric growth, and hand-worked iron and glass for web pages. It should not look like Art Deco geometry, Rococo pastel shell ornament, a generic olive eco or plant-shop board, or evenly repeating wave trim. Use real-world imperfections: slight paper curl, tape corners, pin marks, uneven crop edges, paper fibres, iron patina, glass edge chips, soft natural shadows, and subtle dust. Palette: warm parchment, cream, deep green-black, peacock blue-green, burnished amber, aubergine, sage green, patinated bronze. No readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake interface text, no floating cards, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
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
