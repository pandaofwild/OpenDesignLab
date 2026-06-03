// scripts/check-data.mjs
import { designStyles, designStyleCategories } from "../src/data/designStyles.ts";

const errors = [];
function assert(cond, msg) { if (!cond) errors.push(msg); }

assert(designStyles.length === 88, `expected 88 styles, got ${designStyles.length}`);
const slugs = new Set(designStyles.map((s) => s.slug));
assert(slugs.size === designStyles.length, "duplicate style slugs found");
assert(designStyleCategories.length === 10, `expected 10 categories, got ${designStyleCategories.length}`);

if (errors.length) { console.error("DATA CHECK FAILED:\n" + errors.join("\n")); process.exit(1); }
console.log(`data check passed: ${designStyles.length} styles, ${designStyleCategories.length} categories`);
