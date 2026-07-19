// scripts/check-data.mjs
import { designStyles, designStyleCategories, tunedStyleTokenSlugs } from "../src/data/designStyles.ts";

const errors = [];
function assert(cond, msg) { if (!cond) errors.push(msg); }

// Minimum counts guard against accidental mass-deletion.
// Raise these if new styles / categories are intentionally added.
assert(designStyles.length >= 78, `expected at least 78 styles, got ${designStyles.length}`);
const slugs = new Set(designStyles.map((s) => s.slug));
assert(slugs.size === designStyles.length, "duplicate style slugs found");
assert(designStyleCategories.length >= 10, `expected at least 10 categories, got ${designStyleCategories.length}`);

const slugSet = new Set(designStyles.map((s) => s.slug));
assert(tunedStyleTokenSlugs.length >= 24, `expected at least 24 tuned style token overrides, got ${tunedStyleTokenSlugs.length}`);
for (const slug of tunedStyleTokenSlugs) {
  assert(slugSet.has(slug), `tuned style slug "${slug}" does not exist`);
}

for (const s of designStyles) {
  for (const rel of s.related) {
    assert(slugSet.has(rel), `style ${s.slug}: related slug "${rel}" does not exist`);
  }
}

const categorySet = new Set(designStyleCategories);
for (const s of designStyles) {
  assert(categorySet.has(s.category), `style ${s.slug}: unknown category "${s.category}"`);
}

for (const s of designStyles) {
  assert(s.tokens !== undefined, `style ${s.slug} missing tokens`);
  assert(["airy","normal","tight"].includes(s.tokens.space.density), `style ${s.slug} bad density: ${s.tokens.space.density}`);
  assert(typeof s.tokens.typography.weightDisplay === "number", `style ${s.slug} bad weightDisplay`);
  assert(typeof s.tokens.typography.headingScale === "number", `style ${s.slug} bad headingScale`);
  assert(typeof s.tokens.shape.radius === "string" && s.tokens.shape.radius.length > 0, `style ${s.slug} missing shape.radius`);
  assert(typeof s.tokens.shape.radiusPill === "string" && s.tokens.shape.radiusPill.length > 0, `style ${s.slug} missing shape.radiusPill`);
  assert(["solid","dashed","double"].includes(s.tokens.shape.borderStyle), `style ${s.slug} bad borderStyle`);
  assert(typeof s.tokens.space.gap === "string" && s.tokens.space.gap.length > 0, `style ${s.slug} missing space.gap`);
  assert(typeof s.tokens.space.padScale === "number", `style ${s.slug} bad padScale`);
  assert(s.tokens.color.base === s.palette.base, `style ${s.slug} tokens.color.base mismatch`);
}

if (errors.length) { console.error("DATA CHECK FAILED:\n" + errors.join("\n")); process.exit(1); }
console.log(`data check passed: ${designStyles.length} styles, ${designStyleCategories.length} categories`);
