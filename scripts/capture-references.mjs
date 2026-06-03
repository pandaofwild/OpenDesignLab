/**
 * capture-references.mjs
 *
 * Takes viewport screenshots of reference websites for each design style.
 * Screenshots are saved to public/references/[slug]/ and GITIGNORED.
 * Captures both "sites" (real brand pages) and "galleries" (inspiration platforms).
 *
 * Usage:
 *   npm run capture:refs                        # all 12 styles
 *   npm run capture:refs brutalism kawaii luxury # specific styles only
 *   npm run capture:refs -- --sites-only        # skip galleries
 *
 * First-time setup:
 *   npm install
 *   npx playwright install chromium
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import references from "./style-references.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "references");

// Parse CLI args
const rawArgs = process.argv.slice(2);
const sitesOnly = rawArgs.includes("--sites-only");
const targetSlugs = rawArgs.filter((a) => !a.startsWith("--"));

const slugsToCapture = targetSlugs.length > 0
  ? targetSlugs
  : Object.keys(references).filter((k) => !k.startsWith("_"));

const VIEWPORT = { width: 1440, height: 900 };
const TIMEOUT = 20_000;

function makeFilename(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) + ".jpg";
}

async function capturePage(page, { url, title, note }, outDir, label) {
  const filename = makeFilename(url);
  const outPath = join(outDir, filename);

  if (existsSync(outPath)) {
    console.log(`    ⏭  ${label} — already exists, skipping`);
    return { ok: true, skipped: true };
  }

  process.stdout.write(`    📷 ${label} (${title}) ... `);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT });
    await page.waitForTimeout(2500);

    const buf = await page.screenshot({
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });

    await writeFile(outPath, buf);
    console.log(`✓`);

    // Write a sidecar .txt with metadata for token research reference
    const meta = [
      `url: ${url}`,
      `title: ${title}`,
      note ? `note: ${note}` : null,
      `captured: ${new Date().toISOString()}`,
    ].filter(Boolean).join("\n");
    await writeFile(outPath.replace(".jpg", ".txt"), meta);

    return { ok: true, skipped: false };
  } catch (err) {
    console.log(`✗  ${err.message.split("\n")[0]}`);
    return { ok: false, skipped: false };
  }
}

async function capture() {
  console.log(`\n📸 Capturing reference screenshots`);
  console.log(`   Styles: ${slugsToCapture.join(", ")}`);
  console.log(`   Mode: ${sitesOnly ? "sites only" : "sites + galleries"}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });

  let total = 0;
  let failed = 0;
  let skipped = 0;

  for (const slug of slugsToCapture) {
    const entry = references[slug];
    if (!entry) {
      console.warn(`⚠️  No references found for: ${slug}`);
      continue;
    }

    const outDir = join(OUT_DIR, slug);
    await mkdir(outDir, { recursive: true });

    console.log(`\n▸ ${slug}`);

    const sites = entry.sites ?? [];
    const galleries = sitesOnly ? [] : (entry.galleries ?? []);

    const page = await context.newPage();

    for (const item of sites) {
      const result = await capturePage(page, item, outDir, `site`);
      if (result.ok && !result.skipped) total++;
      else if (!result.ok) failed++;
      else skipped++;
    }

    for (const item of galleries) {
      const result = await capturePage(page, item, outDir, `gallery`);
      if (result.ok && !result.skipped) total++;
      else if (!result.ok) failed++;
      else skipped++;
    }

    await page.close();
  }

  await context.close();
  await browser.close();

  console.log(`\n✅ Done`);
  console.log(`   Captured: ${total}  Failed: ${failed}  Skipped (exists): ${skipped}`);
  console.log(`   📁 public/references/\n`);
}

capture().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
