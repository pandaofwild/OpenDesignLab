import type { CSSProperties } from "react";
import type { ComponentSpec } from "@/data/componentSpecs";

export function ComponentPreviewRenderer({ component }: { component: ComponentSpec }) {
  if (component.type === "button") {
    return (
      <button
        className="st-border bg-[var(--st-primary)] px-5 py-3 text-sm font-bold text-[var(--st-surface)]"
        style={{ borderRadius: "var(--st-radius-pill)", boxShadow: "var(--st-shadow)" }}
        type="button"
      >
        Primary action
      </button>
    );
  }

  if (component.type === "card") {
    return (
      <article className="st-card st-pad max-w-sm">
        <p
          className="st-display uppercase leading-none"
          style={{ "--st-display-size": "1.875rem" } as CSSProperties}
        >
          Card title
        </p>
        <p className="mt-3 text-sm leading-6 text-[rgb(var(--st-text-rgb)_/_0.68)]">
          A reusable surface that follows the selected style tokens.
        </p>
      </article>
    );
  }

  if (component.type === "nav") {
    return (
      <nav
        className="st-border st-gap flex flex-wrap items-center bg-[rgb(var(--st-surface-rgb)_/_0.78)] p-3"
        style={{ borderRadius: "var(--st-radius)" }}
      >
        <strong className="st-display" style={{ "--st-display-size": "1rem" } as CSSProperties}>
          Brand
        </strong>
        <span>Work</span>
        <span>System</span>
        <span>Contact</span>
      </nav>
    );
  }

  if (component.type === "input") {
    return (
      <label className="grid max-w-sm gap-2 text-sm font-bold">
        <span>Search</span>
        <input
          className="st-border bg-[var(--st-surface)] px-3 py-3 text-[var(--st-text)] outline-none placeholder:text-[rgb(var(--st-text-rgb)_/_0.42)]"
          placeholder="Type a style..."
          style={{ borderRadius: "var(--st-radius)" }}
        />
      </label>
    );
  }

  return (
    <span
      className="st-border inline-flex bg-[rgb(var(--st-accent-rgb)_/_0.18)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--st-accent)]"
      style={{ borderRadius: "var(--st-radius-pill)" }}
    >
      Status badge
    </span>
  );
}
