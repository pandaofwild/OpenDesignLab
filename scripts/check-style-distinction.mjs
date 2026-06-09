// scripts/check-style-distinction.mjs
import { readFileSync } from "node:fs";

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

const cyberpunkBody = functionBody("CyberpunkCity");
const glitchBody = functionBody("GlitchArtInterface");
const neoBrutalistBody = functionBody("NeoBrutalistApp");
const postmodernBody = functionBody("PostmodernArchivePortal");

const errors = [];
function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(cyberpunkBody, "CyberpunkCity function is missing");
assert(glitchBody, "GlitchArtInterface function is missing");
assert(neoBrutalistBody, "NeoBrutalistApp function is missing");
assert(postmodernBody, "PostmodernArchivePortal function is missing");

for (const marker of ["BRAINDANCE", "black-market deck", "city protocol", "Night market", "Ripper lane"]) {
  assert(cyberpunkBody.includes(marker), `CyberpunkCity missing cyberpunk marker "${marker}"`);
}

for (const marker of ["SIGNAL DAMAGE", "checksum drift", "macroblock map", "codec fault"]) {
  assert(glitchBody.includes(marker), `GlitchArtInterface missing glitch marker "${marker}"`);
}

for (const marker of ["GlitchHeading", "SIGNAL DAMAGE", "checksum drift", "macroblock map"]) {
  assert(!cyberpunkBody.includes(marker), `CyberpunkCity still contains glitch marker "${marker}"`);
}

for (const marker of ["neon-noir action RPG", "night city grid", "Pre-order", "Watch trailer", "BRAINDANCE", "black-market deck"]) {
  assert(!glitchBody.includes(marker), `GlitchArtInterface still contains cyberpunk/game marker "${marker}"`);
}

for (const marker of ["RAW COMPONENT KIT", "native form controls", "pricing table"]) {
  assert(neoBrutalistBody.includes(marker), `NeoBrutalistApp missing new-brutalism marker "${marker}"`);
}

for (const marker of ["CLASSICAL QUOTE", "culture collage", "ironic object index"]) {
  assert(postmodernBody.includes(marker), `PostmodernArchivePortal missing postmodern marker "${marker}"`);
}

for (const marker of ["CLASSICAL QUOTE", "culture collage", "ironic object index", "Mixed canon"]) {
  assert(!neoBrutalistBody.includes(marker), `NeoBrutalistApp still contains postmodern marker "${marker}"`);
}

for (const marker of ["RAW COMPONENT KIT", "native form controls", "pricing table", "BRUTAL/UI"]) {
  assert(!postmodernBody.includes(marker), `PostmodernArchivePortal still contains new-brutalism marker "${marker}"`);
}

if (errors.length) {
  console.error("STYLE DISTINCTION CHECK FAILED:\n" + errors.join("\n"));
  process.exit(1);
}

console.log("style distinction check passed: cyberpunk/glitch and new-brutalism/postmodernism separated");
