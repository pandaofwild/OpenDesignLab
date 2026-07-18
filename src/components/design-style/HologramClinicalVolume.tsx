"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TissueMode = "tissue" | "vessel" | "bone";

type HologramClinicalVolumeProps = {
  compact?: boolean;
};

const MODES: Record<TissueMode, { label: string; series: string; focus: string; measure: string }> = {
  tissue: { label: "Tissue", series: "AX T2 · 1.2 mm", focus: "Soft tissue", measure: "42.8 mm" },
  vessel: { label: "Vessel", series: "CE-MRA · 0.8 mm", focus: "Vascular tree", measure: "18.4 mm" },
  bone: { label: "Bone", series: "CT B70 · 0.6 mm", focus: "Cortical bone", measure: "31.6 mm" },
};

const SCANS = ["S-044", "S-045", "S-046", "S-047", "S-048"];

function OrientationCube({ compact }: { compact: boolean }) {
  return (
    <div className="hologram-clinical-orientation" aria-label="orientation cube">
      <div className="hologram-clinical-cube" aria-hidden="true">
        <span className="hologram-clinical-cube-front">A</span>
        <span className="hologram-clinical-cube-back">P</span>
        <span className="hologram-clinical-cube-right">R</span>
        <span className="hologram-clinical-cube-left">L</span>
      </div>
      {!compact && <span className="hologram-clinical-micro">Orientation</span>}
    </div>
  );
}

export function HologramClinicalVolume({ compact = false }: HologramClinicalVolumeProps) {
  const [mode, setMode] = useState<TissueMode>("tissue");
  const [slice, setSlice] = useState(48);
  const sliceId = useId();
  const active = MODES[mode];

  return (
    <section className={cn("hologram-clinical", compact && "hologram-clinical--compact")} data-mode={mode}>
      <header className="hologram-clinical-header">
        <div className="hologram-clinical-brand">
          <span className="hologram-clinical-kicker">LUMA VOLUME</span>
          <span className="hologram-clinical-title">Clinical Anatomy Viewer</span>
        </div>
        <div className="hologram-clinical-study">
          <span>Study LV-0427</span>
          {!compact && <span>ANON · 34F</span>}
          <span className="hologram-clinical-live"><i aria-hidden="true" />Reconstruction live</span>
        </div>
      </header>

      <div className="hologram-clinical-layout">
        <aside className="hologram-clinical-meta">
          <div>
            <span className="hologram-clinical-micro">Series</span>
            <strong>{active.series}</strong>
          </div>
          <div>
            <span className="hologram-clinical-micro">Focus</span>
            <strong>{active.focus}</strong>
          </div>
          {!compact && (
            <div className="hologram-clinical-vitals">
              <span><i />Voxel <b>0.62 mm³</b></span>
              <span><i />Frames <b>184</b></span>
              <span><i />Quality <b>98.4%</b></span>
            </div>
          )}
        </aside>

        <div className="hologram-clinical-chamber" role="img" aria-label="clinical volume chamber">
          <div className="hologram-clinical-grid-plane" aria-hidden="true" />
          <div
            className="hologram-clinical-coronal-plane"
            aria-hidden="true"
            style={{ "--slice": `${slice}%` } as CSSProperties}
          />
          <div className="hologram-clinical-volume-plane" aria-label={`${active.focus} volumetric reconstruction`}>
            <Image
              src="/generated/design-styles/hologram-style.webp"
              alt="Translucent clinical anatomical volume reconstructed from scan slices"
              fill
              priority={!compact}
              sizes={compact ? "260px" : "(max-width: 720px) 90vw, 48vw"}
            />
          </div>
          <div className="hologram-clinical-measure-plane" aria-label="spatial measurement">
            <span>{active.measure}</span>
            <span>R—L</span>
            <span>Depth {slice}%</span>
          </div>
          <span className="hologram-clinical-sweep" aria-hidden="true" />
          <span className="hologram-clinical-crosshair" aria-hidden="true" />
        </div>

        <aside className="hologram-clinical-controls">
          <div className="hologram-clinical-mode-group" role="group" aria-label="tissue mode">
            <span className="hologram-clinical-micro">Tissue mode</span>
            <div>
              {(Object.entries(MODES) as Array<[TissueMode, (typeof MODES)[TissueMode]]>).map(([key, item]) => (
                <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)}>
                  <i aria-hidden="true" />
                  {compact ? item.label.slice(0, 3).toUpperCase() : item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hologram-clinical-slice">
            <div><label htmlFor={sliceId}>Slice control</label><output htmlFor={sliceId}>{slice}%</output></div>
            <input
              id={sliceId}
              type="range"
              min={12}
              max={88}
              value={slice}
              aria-label="slice control"
              onChange={(event) => setSlice(Number(event.target.value))}
            />
            {!compact && <div className="hologram-clinical-axis"><span>ANT</span><span>POST</span></div>}
          </div>
          <OrientationCube compact={compact} />
        </aside>
      </div>

      {!compact && (
        <footer className="hologram-clinical-series" aria-label="Scan series">
          <div><span className="hologram-clinical-micro">Reconstruction sequence</span><strong>Coronal · 184 frames</strong></div>
          <div className="hologram-clinical-thumbnails">
            {SCANS.map((scan, index) => (
              <button key={scan} type="button" aria-current={scan === "S-046" ? "true" : undefined}>
                <i style={{ "--scan-index": index } as CSSProperties} />
                <span>{scan}</span>
              </button>
            ))}
          </div>
          <div className="hologram-clinical-coordinate"><span>X +12.4</span><span>Y −08.7</span><span>Z +31.2</span></div>
        </footer>
      )}
    </section>
  );
}
