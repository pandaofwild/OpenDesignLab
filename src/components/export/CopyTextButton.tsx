"use client";

import { useState } from "react";

type CopyTextButtonProps = {
  copiedLabel: string;
  idleLabel: string;
  text: string;
};

export function CopyTextButton({ copiedLabel, idleLabel, text }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="raw-button border border-[var(--specimen-line)] bg-[var(--specimen-card)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--specimen-ink-55)] transition-colors hover:border-[var(--specimen-ink)] hover:text-[var(--specimen-paper)]"
      onClick={copy}
      type="button"
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
