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
      className="specimen-button specimen-button-sm specimen-button-secondary"
      onClick={copy}
      type="button"
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
