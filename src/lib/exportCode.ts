import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import type { DesignStyle } from "@/data/designStyles";
import type { WebLayout } from "@/data/webLayouts";

function cssVars(style: DesignStyle) {
  return Object.entries(styleTokenVars(style))
    .map(([key, value]) => `  ${key}: ${String(value)};`)
    .join("\n");
}

export function exportDesignCode(style: DesignStyle, layout: WebLayout) {
  return `<!-- ${style.nameKo} x ${layout.nameKo} -->
<section class="opendesignlab-export" style="
${cssVars(style)}
">
  <header class="opendesignlab-nav">
    <strong>${style.nameEn}</strong>
    <nav>${layout.nameEn}</nav>
  </header>
  <main class="opendesignlab-hero">
    <p class="opendesignlab-kicker">${layout.previewType}</p>
    <h1>${layout.nameKo}</h1>
    <p>${layout.summary}</p>
    <button>Primary action</button>
  </main>
</section>

<style>
.opendesignlab-export {
  min-height: 100vh;
  padding: calc(2rem * var(--st-pad-scale, 1));
  background: var(--st-base);
  color: var(--st-text);
  font-family: var(--st-font-body);
}
.opendesignlab-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--st-gap);
  border: var(--st-border-width) var(--st-border-style, solid) rgb(var(--st-border-rgb) / 0.22);
  border-radius: var(--st-radius);
  padding: 1rem;
}
.opendesignlab-hero {
  display: grid;
  gap: var(--st-gap);
  max-width: 760px;
  margin-top: 4rem;
}
.opendesignlab-kicker {
  color: var(--st-accent);
  font-weight: 800;
  text-transform: uppercase;
}
.opendesignlab-hero h1 {
  font-family: var(--st-font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: var(--st-tracking);
  font-weight: var(--st-weight-display);
}
.opendesignlab-hero button {
  width: max-content;
  border: var(--st-border-width) var(--st-border-style, solid) var(--st-primary);
  border-radius: var(--st-radius-pill, var(--st-radius));
  background: var(--st-primary);
  color: var(--st-surface);
  padding: 0.85rem 1.1rem;
  box-shadow: var(--st-shadow);
}
</style>`;
}
