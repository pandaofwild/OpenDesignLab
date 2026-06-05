// scripts/check-style-references.mjs
import { designStyles } from "../src/data/designStyles.ts";
import references from "./style-references.json" with { type: "json" };

const args = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const allSlugs = designStyles.map((style) => style.slug);
const knownSlugs = new Set(allSlugs);
const slugsToCheck = args.length > 0 ? args : allSlugs;
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function itemLabel(slug, groupName, index) {
  return `${slug}.${groupName}[${index}]`;
}

for (const slug of args) {
  assert(knownSlugs.has(slug), `unknown style slug requested: ${slug}`);
}

for (const key of Object.keys(references)) {
  if (key.startsWith("_")) continue;
  assert(knownSlugs.has(key), `reference entry has unknown style slug: ${key}`);
}

for (const slug of slugsToCheck) {
  const entry = references[slug];
  assert(entry, `missing references for ${slug}`);
  if (!entry) continue;

  const sites = entry.sites ?? [];
  const galleries = entry.galleries ?? [];

  assert(Array.isArray(entry.sites), `references.${slug}.sites must be an array`);
  assert(Array.isArray(entry.galleries), `references.${slug}.galleries must be an array`);
  assert(sites.length >= 2, `${slug} needs at least 2 real site or archive references`);
  assert(galleries.length >= 3, `${slug} needs Pinterest, Awwwards, and Dribbble references`);

  const galleryUrls = galleries.map((item) => item.url);
  assert(galleryUrls.some((url) => typeof url === "string" && url.includes("pinterest.")), `${slug} missing Pinterest reference`);
  assert(galleryUrls.some((url) => typeof url === "string" && url.includes("awwwards.")), `${slug} missing Awwwards reference`);
  assert(galleryUrls.some((url) => typeof url === "string" && url.includes("dribbble.")), `${slug} missing Dribbble reference`);

  for (const [groupName, items] of [["sites", sites], ["galleries", galleries]]) {
    for (const [index, item] of items.entries()) {
      const label = itemLabel(slug, groupName, index);
      assert(typeof item.url === "string" && item.url.startsWith("https://"), `${label} has bad url`);
      assert(typeof item.title === "string" && item.title.trim().length > 0, `${label} missing title`);
      assert(typeof item.note === "string" && item.note.trim().length >= 24, `${label} needs a specific note`);
    }
  }
}

if (errors.length) {
  console.error("STYLE REFERENCE CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log(`style reference check passed: ${slugsToCheck.length} styles covered`);
