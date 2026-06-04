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
      className="border border-[#1E1E1E]/25 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
      onClick={copy}
      type="button"
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
