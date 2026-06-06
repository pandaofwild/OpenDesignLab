import { SpecimenCoreFrame, SpecimenTinyChip } from "@/components/specimen/SpecimenCoreFrame";
import type { Locale } from "@/lib/i18n";

const swatches = [
  ["Paper", "#F2EFE8"],
  ["Paper 2", "#EAE6DC"],
  ["Card", "#FBFAF6"],
  ["Ink", "#18160F"],
  ["Ink 55", "#6E685B"],
  ["Signal", "#D8431B"],
] as const;

const principles = ["Indexed", "Monochrome chrome", "Color from content", "Instrument-grade"];

export function BrandSheetScreen({ locale }: { locale: Locale }) {
  return (
    <SpecimenCoreFrame
      active="brand"
      appliedLabel="DIRECTION"
      label="Brand sheet · the direction"
      searchPlaceholder={locale === "ko" ? "브랜드 시트" : "brand sheet"}
    >
      <section className="min-h-[calc(100dvh-96px)] p-4 md:p-6">
        <div className="grid min-h-[calc(100dvh-144px)] gap-8 border-t border-[var(--specimen-ink)] pt-7 xl:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]">
          <div className="flex min-w-0 flex-col">
            <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
              <span className="specimen-bullet" aria-hidden="true" />
              The direction
            </p>
            <h1 className="raw-display mt-5 max-w-2xl text-[4rem] leading-[0.84] md:text-[5.4rem]">
              A catalog of design decisions.
            </h1>
            <div className="mt-8 max-w-[34rem] space-y-4 text-[15px] leading-7 text-[var(--specimen-ink-55)]">
              <p>
                OpenDesignLab is an instrument, not a moodboard. The interface behaves like a precision catalog:
                hairline grids, registration marks, mono spec-labels and indexed specimens.
              </p>
              <p>
                The chrome stays monochrome ink-on-paper on purpose. The product is about palettes and styles, so
                the specimens carry every drop of colour. Selection inverts to a solid ink block, and the only accent
                is a single recording-light vermilion.
              </p>
            </div>
            <div className="mt-10 border-t border-[var(--specimen-ink)] pt-3">
              <div className="flex flex-wrap gap-2">
                {principles.map((principle, index) => (
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--specimen-ink-55)]"
                    key={principle}
                  >
                    <span className="text-[rgb(110_104_91_/_0.6)]">0{index + 1}</span> {principle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-5">
            <BrandPanel title="Typefaces">
              <SpecimenRow label="DISPLAY · 700/800" value="Bricolage Grotesque" variant="display" />
              <SpecimenRow label="BODY · 400-700" value="Hanken Grotesk - interface" />
              <SpecimenRow label="META · 400/700" value="Space Mono / labels · tokens · 001" variant="mono" />
            </BrandPanel>

            <BrandPanel title="Chrome palette">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {swatches.map(([name, hex]) => (
                  <div key={name}>
                    <div className="h-14 border border-[var(--specimen-line)]" style={{ backgroundColor: hex }} />
                    <p className="mt-2 font-mono text-[10px] text-[var(--specimen-ink)]">{name}</p>
                    <p className="font-mono text-[9px] text-[var(--specimen-ink-55)]">{hex}</p>
                  </div>
                ))}
              </div>
            </BrandPanel>

            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_196px]">
              <BrandPanel title="Motifs">
                <div className="flex flex-wrap items-center gap-6">
                  <Motif label="Target">
                    <span className="specimen-mark">
                      <span />
                    </span>
                  </Motif>
                  <Motif label="Crop">
                    <span className="relative block h-10 w-12">
                      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--specimen-ink)]" />
                      <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[var(--specimen-ink)]" />
                      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[var(--specimen-ink)]" />
                      <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[var(--specimen-ink)]" />
                    </span>
                  </Motif>
                  <Motif label="Scale">
                    <span className="inline-flex gap-1">
                      <i className="h-1.5 w-1.5 rounded-full bg-[var(--specimen-ink)]" />
                      <i className="h-1.5 w-1.5 rounded-full bg-[var(--specimen-ink)]" />
                      <i className="h-1.5 w-1.5 rounded-full border border-[var(--specimen-ink)]" />
                    </span>
                  </Motif>
                  <Motif label="Live">
                    <span className="specimen-live-pulse" />
                  </Motif>
                </div>
              </BrandPanel>

              <div className="flex min-h-[180px] flex-col justify-between border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] p-5 text-[var(--specimen-paper)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(242_239_232_/_0.58)]">
                  Selection
                </p>
                <p className="raw-display text-4xl leading-[0.88] text-[var(--specimen-paper)]">
                  Ink
                  <br />
                  block
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[rgb(242_239_232_/_0.58)]">
                  active · focus · primary
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <SpecimenTinyChip active>v1.0</SpecimenTinyChip>
              <SpecimenTinyChip>2026.06</SpecimenTinyChip>
              <SpecimenTinyChip>SPECIMEN</SpecimenTinyChip>
            </div>
          </div>
        </div>
      </section>
    </SpecimenCoreFrame>
  );
}

function BrandPanel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.68)] p-5">
      <p className="raw-label mb-4 flex items-center gap-2 text-[var(--specimen-ink-55)]">
        <span className="h-1.5 w-1.5 bg-[var(--specimen-ink)]" />
        {title}
      </p>
      {children}
    </section>
  );
}

function SpecimenRow({
  label,
  value,
  variant = "body",
}: {
  label: string;
  value: string;
  variant?: "body" | "display" | "mono";
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--specimen-line-soft)] py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between">
      <span
        className={
          variant === "display"
            ? "font-display text-3xl font-bold leading-none"
            : variant === "mono"
              ? "font-mono text-base"
              : "text-xl font-semibold"
        }
      >
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--specimen-ink-55)]">
        {label}
      </span>
    </div>
  );
}

function Motif({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="grid justify-items-center gap-2">
      <span className="grid h-10 place-items-center">{children}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--specimen-ink-55)]">{label}</span>
    </div>
  );
}
