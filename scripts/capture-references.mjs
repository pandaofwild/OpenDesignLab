/**
 * capture-references.mjs
 *
 * Takes viewport screenshots of reference websites for each design style.
 * Screenshots are saved to public/references/[slug]/ and GITIGNORED.
 *
 * Usage:
 *   node --experimental-strip-types --no-warnings=ExperimentalWarning scripts/capture-references.mjs
 *
 * Requirements:
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 *
 * Optional — capture only specific styles:
 *   node ... scripts/capture-references.mjs brutalism kawaii luxury
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import references from "./style-references.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "references");

// Parse CLI args — if slugs given, only capture those
const targetSlugs = process.argv.slice(2);
const slugsToCapture = targetSlugs.length > 0
  ? targetSlugs
  : Object.keys(references).filter((k) => !k.startsWith("_"));

const VIEWPORT = { width: 1440, height: 900 };
const TIMEOUT = 20_000;

async function capture() {
  console.log(`\n📸 Capturing reference screenshots for: ${slugsToCapture.join(", ")}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });

  let total = 0;
  let failed = 0;

  for (const slug of slugsToCapture) {
    const sites = references[slug];
    if (!sites) {
      console.warn(`⚠️  No references found for: ${slug}`);
      continue;
    }

    const outDir = join(OUT_DIR, slug);
    await mkdir(outDir, { recursive: true });

    for (const { url, title } of sites) {
      const filename = url
        .replace(/^https?:\/\//, "")
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) + ".jpg";

      const outPath = join(outDir, filename);

      if (existsSync(outPath)) {
        console.log(`  ⏭  ${slug}/${filename} — already exists, skipping`);
        continue;
      }

      process.stdout.write(`  📷 ${slug} — ${title} ... `);
      const page = await context.newPage();

      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT });
        // Wait a moment for above-the-fold visuals to settle
        await page.waitForTimeout(2000);

        const buf = await page.screenshot({
          type: "jpeg",
          quality: 88,
          clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
        });

        await writeFile(outPath, buf);
        total++;
        console.log(`✓  saved ${filename}`);
      } catch (err) {
        failed++;
        console.log(`✗  failed — ${err.message.split("\n")[0]}`);
      } finally {
        await page.close();
      }
    }
  }

  await context.close();
  await browser.close();

  console.log(`\n✅ Done — ${total} captured, ${failed} failed`);
  console.log(`📁 Saved to: public/references/\n`);
}

capture().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
