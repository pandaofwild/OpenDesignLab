"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

/* Classic, read as a classics imprint rather than a heritage fashion shop: a
   printed title page turned into a web page. Deliberately photography-free —
   the style is carried by book typography alone (centre axis, thick-thin double
   rule, small caps, fleuron, drop cap, dot leaders, cloth spines, colophon) on
   ivory paper with navy, oxblood and gilt. */

type Volume = {
  readonly author: string;
  readonly binding: string;
  readonly cloth: string;
  readonly firstIssued: string;
  readonly height: string;
  readonly id: string;
  readonly ink: string;
  readonly note: string;
  readonly numeral: string;
  readonly pages: string;
  readonly price: string;
  /* spine thickness, driven by the extent — a real shelf is never even */
  readonly thickness: number;
  readonly title: string;
  readonly translator: string;
};

/* Cloth curvature: the shading that keeps a spine from reading as a flat block. */
const CLOTH_SHADING =
  "linear-gradient(90deg, rgb(0 0 0 / 0.26) 0%, rgb(0 0 0 / 0.04) 14%, rgb(255 255 255 / 0.07) 42%, rgb(0 0 0 / 0.08) 82%, rgb(0 0 0 / 0.3) 100%)" as const;

const VOLUMES: readonly Volume[] = [
  {
    author: "Marcus Aurelius",
    binding: "Navy cloth, gilt",
    cloth: "var(--sample-primary)",
    firstIssued: "1887",
    height: "100%",
    id: "meditations",
    ink: "var(--sample-surface)",
    note: "Reset from the 1887 sheets and corrected against the Greek, with the emperor's night notes kept in their original order.",
    numeral: "XXVIII",
    pages: "324 pp.",
    price: "£24",
    thickness: 1,
    title: "Meditations",
    translator: "M. R. Fenwick",
  },
  {
    author: "John Stuart Mill",
    binding: "Olive cloth",
    cloth: "var(--sample-muted)",
    firstIssued: "1889",
    height: "83%",
    id: "liberty",
    ink: "var(--sample-surface)",
    note: "The 1859 text entire, set wide enough that the long argumentative sentences are never broken across a turn of the page.",
    numeral: "XXIX",
    pages: "168 pp.",
    price: "£18",
    thickness: 0.7,
    title: "On Liberty",
    translator: "—",
  },
  {
    author: "Plato",
    binding: "Cream buckram",
    cloth: "var(--sample-accent-3)",
    firstIssued: "1893",
    height: "93%",
    id: "republic",
    ink: "var(--sample-text)",
    note: "The ten books unabridged, with the Stephanus numbers set in the outer margin so a reader can still follow a lecture.",
    numeral: "XXX",
    pages: "480 pp.",
    price: "£27",
    thickness: 1.2,
    title: "The Republic",
    translator: "C. Ayrton",
  },
  {
    author: "Mary Shelley",
    binding: "Oxblood cloth",
    cloth: "var(--sample-accent)",
    firstIssued: "1896",
    height: "87%",
    id: "frankenstein",
    ink: "var(--sample-surface)",
    note: "The 1818 first text rather than the softened revision, with the author's own preface restored to the front of the book.",
    numeral: "XXXI",
    pages: "264 pp.",
    price: "£21",
    thickness: 0.9,
    title: "Frankenstein",
    translator: "—",
  },
  {
    author: "Michel de Montaigne",
    binding: "Ink cloth, blind stamp",
    cloth: "var(--sample-text)",
    firstIssued: "1908",
    height: "96%",
    id: "essays",
    ink: "var(--sample-surface)",
    note: "All three books complete, printed on a laid stock light enough to carry a thousand pages without a second binding.",
    numeral: "XXXII",
    pages: "1,024 pp.",
    price: "£34",
    thickness: 1.85,
    title: "Essays",
    translator: "J. Hale",
  },
  {
    author: "Homer",
    binding: "Ochre cloth, gilt",
    cloth: "var(--sample-accent-2)",
    firstIssued: "1902",
    height: "100%",
    id: "odyssey",
    ink: "var(--sample-text)",
    note: "A verse rendering set in long measure so the lines are never broken, with the Ithaca charts engraved on the endpapers.",
    numeral: "XXXIII",
    pages: "544 pp.",
    price: "£28",
    thickness: 1.3,
    title: "The Odyssey",
    translator: "A. T. Ward",
  },
  {
    author: "George Eliot",
    binding: "Oxblood cloth",
    cloth: "var(--sample-accent)",
    firstIssued: "1891",
    height: "97%",
    id: "middlemarch",
    ink: "var(--sample-surface)",
    note: "The full eight books in one sewn volume, with the 1874 revisions restored and a fold-out map of the parish.",
    numeral: "XXXIV",
    pages: "912 pp.",
    price: "£32",
    thickness: 1.7,
    title: "Middlemarch",
    translator: "—",
  },
  {
    author: "Jane Austen",
    binding: "Cream buckram",
    cloth: "var(--sample-accent-3)",
    firstIssued: "1913",
    height: "82%",
    id: "persuasion",
    ink: "var(--sample-text)",
    note: "Set from the first edition of 1817, with the two cancelled chapters printed as an appendix rather than folded into the text.",
    numeral: "XXXV",
    pages: "288 pp.",
    price: "£22",
    thickness: 0.92,
    title: "Persuasion",
    translator: "—",
  },
  {
    author: "Henry David Thoreau",
    binding: "Olive cloth",
    cloth: "var(--sample-muted)",
    firstIssued: "1911",
    height: "89%",
    id: "walden",
    ink: "var(--sample-surface)",
    note: "The Concord text with the account of the year's expenses set as a table, exactly as it stood in the first printing.",
    numeral: "XXXVI",
    pages: "352 pp.",
    price: "£23",
    thickness: 1,
    title: "Walden",
    translator: "—",
  },
  {
    author: "Miguel de Cervantes",
    binding: "Navy cloth, gilt",
    cloth: "var(--sample-primary)",
    firstIssued: "1900",
    height: "99%",
    id: "quixote",
    ink: "var(--sample-surface)",
    note: "Both parts in one volume, on a thin laid stock, with the interpolated tales left where the author put them.",
    numeral: "XXXVII",
    pages: "1,072 pp.",
    price: "£38",
    thickness: 1.95,
    title: "Don Quixote",
    translator: "P. Ellery",
  },
  {
    author: "Emily Brontë",
    binding: "Cream buckram",
    cloth: "var(--sample-accent-3)",
    firstIssued: "1905",
    height: "84%",
    id: "wuthering",
    ink: "var(--sample-text)",
    note: "Printed from the 1847 text rather than her sister's edited reprint, with the dialect spellings left exactly as written.",
    numeral: "XXXVIII",
    pages: "368 pp.",
    price: "£23",
    thickness: 1.05,
    title: "Wuthering Heights",
    translator: "—",
  },
  {
    author: "Charles Dickens",
    binding: "Ink cloth, gilt",
    cloth: "var(--sample-text)",
    firstIssued: "1917",
    height: "91%",
    id: "expectations",
    ink: "var(--sample-surface)",
    note: "The serial ending printed alongside the revised one, so both closes of the story stand in the same volume.",
    numeral: "XXXIX",
    pages: "528 pp.",
    price: "£29",
    thickness: 1.28,
    title: "Great Expectations",
    translator: "—",
  },
  {
    author: "Walt Whitman",
    binding: "Olive cloth",
    cloth: "var(--sample-muted)",
    firstIssued: "1921",
    height: "99%",
    id: "leaves",
    ink: "var(--sample-surface)",
    note: "The deathbed edition, wide-margined so the long line runs unbroken, with the poet's own arrangement of the clusters kept.",
    numeral: "XL",
    pages: "412 pp.",
    price: "£26",
    thickness: 1.12,
    title: "Leaves of Grass",
    translator: "—",
  },
  {
    author: "Virgil",
    binding: "Ochre cloth, gilt",
    cloth: "var(--sample-accent-2)",
    firstIssued: "1907",
    height: "92%",
    id: "aeneid",
    ink: "var(--sample-text)",
    note: "Twelve books in blank verse, the Latin line numbers carried in the margin for readers working from the original.",
    numeral: "XLI",
    pages: "432 pp.",
    price: "£27",
    thickness: 1.15,
    title: "The Aeneid",
    translator: "R. Calder",
  },
  {
    author: "Charlotte Brontë",
    binding: "Oxblood cloth",
    cloth: "var(--sample-accent)",
    firstIssued: "1909",
    height: "95%",
    id: "eyre",
    ink: "var(--sample-surface)",
    note: "The three-volume novel gathered into one, with the original chapter breaks kept rather than run together to save paper.",
    numeral: "XLII",
    pages: "624 pp.",
    price: "£30",
    thickness: 1.4,
    title: "Jane Eyre",
    translator: "—",
  },
  {
    author: "Dante Alighieri",
    binding: "Navy cloth, gilt",
    cloth: "var(--sample-primary)",
    firstIssued: "1898",
    height: "88%",
    id: "commedia",
    ink: "var(--sample-surface)",
    note: "Terza rima kept throughout, the Italian on the verso, and the three cantiche paginated as one continuous poem.",
    numeral: "XLIII",
    pages: "736 pp.",
    price: "£36",
    thickness: 1.5,
    title: "The Divine Comedy",
    translator: "H. Grenfell",
  },
  {
    author: "Confucius",
    binding: "Ink cloth, gilt",
    cloth: "var(--sample-text)",
    firstIssued: "1926",
    height: "80%",
    id: "analects",
    ink: "var(--sample-surface)",
    note: "Twenty books in facing-page arrangement, the received text on the verso and the reading on the recto.",
    numeral: "XLIV",
    pages: "236 pp.",
    price: "£26",
    thickness: 0.85,
    title: "The Analects",
    translator: "L. Song",
  },
];

type Plan = {
  readonly detail: string;
  readonly id: string;
  readonly name: string;
  readonly price: string;
};

const PLANS: readonly Plan[] = [
  { detail: "Four volumes a year, carriage paid", id: "quarterly", name: "Quarterly", price: "£96 / yr" },
  { detail: "Two volumes, spring and autumn", id: "biannual", name: "Twice yearly", price: "£52 / yr" },
  { detail: "Twenty-four volumes, slipcased", id: "series", name: "Complete Series XI", price: "£498" },
];

function DoubleRule({ className }: { readonly className?: string }) {
  // The classic thick-over-thin rule that sits under a printed masthead.
  return (
    <span aria-hidden="true" className={cn("block", className)}>
      <span className="block h-[2px] bg-[var(--sample-border)]" />
      <span className="mt-[2px] block h-px bg-[var(--sample-border)]" />
    </span>
  );
}

function Fleuron({ compact }: { readonly compact: boolean }) {
  // Rule — lozenge — rule: the printer's ornament that centres a title page.
  return (
    <span aria-hidden="true" className={cn("flex items-center justify-center", compact ? "my-1 gap-1.5" : "my-2.5 gap-2")}>
      <span className={cn("block h-px bg-[var(--sample-border)] opacity-45", compact ? "w-8" : "w-14")} />
      <span className={cn("block rotate-45 border border-[var(--sample-accent-2)] bg-[var(--sample-accent-2)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
      <span className={cn("block rotate-45 border border-[var(--sample-border)]", compact ? "h-1.5 w-1.5" : "h-2 w-2")} />
      <span className={cn("block rotate-45 border border-[var(--sample-accent-2)] bg-[var(--sample-accent-2)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
      <span className={cn("block h-px bg-[var(--sample-border)] opacity-45", compact ? "w-8" : "w-14")} />
    </span>
  );
}

export function ClarendonHouseLibrary({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<string>("persuasion");
  const [planId, setPlanId] = useState<string>("quarterly");
  const selected = VOLUMES.find((volume) => volume.id === selectedId) ?? VOLUMES[0];
  const spines = compact ? VOLUMES.slice(0, 13) : VOLUMES;
  const records: Array<[string, string]> = [
    ["Translated", selected.translator],
    ["Extent", selected.pages],
    ["Binding", selected.binding],
    ["First issued", selected.firstIssued],
  ];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── masthead: centred imprint, thick-thin rule, catalogue nav ── */}
      <header className="shrink-0">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span className={cn("truncate uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[0px]" : "text-[7.5px]")}>
            Est. MDCCCXXXIV
          </span>
          <h1 className={cn("text-center uppercase leading-none", compact ? "text-[0.66rem] tracking-[0.2em]" : "text-[1.05rem] tracking-[0.34em]")}>
            Clarendon House
          </h1>
          <span className={cn("truncate text-right uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[0px]" : "text-[7.5px]")}>
            London &middot; Oxford
          </span>
        </div>
        <p className={cn("text-center italic text-[var(--sample-muted)]", compact ? "hidden" : "mt-1 text-[8.5px]")}>
          Publishers of the classics in permanent editions
        </p>
        <DoubleRule className={compact ? "mt-1" : "mt-2"} />
        <nav className={cn("items-center justify-center text-[var(--sample-muted)]", compact ? "hidden" : "flex gap-3.5 pt-1.5 text-[8px]")}>
          {["Series", "Catalogue", "Standing order", "Bindings", "The press"].map((item, index) => (
            <span
              className={cn("items-center gap-3.5 whitespace-nowrap uppercase tracking-[0.14em]", index > 2 ? "hidden md:flex" : "flex")}
              key={item}
            >
              {index > 0 ? <span aria-hidden="true" className="text-[var(--sample-accent-2)]">&middot;</span> : null}
              <span className="transition-colors hover:text-[var(--sample-text)]">{item}</span>
            </span>
          ))}
        </nav>
        <span aria-hidden="true" className={cn("block h-px bg-[var(--sample-border)] opacity-40", compact ? "hidden" : "mt-1.5")} />
      </header>

      {/* ── title page: strict centre axis ── */}
      <section className={cn("shrink-0 text-center", compact ? "pt-1" : "pt-4")}>
        <p className={cn("truncate uppercase text-[var(--sample-muted)]", compact ? "text-[5.5px] tracking-[0.18em]" : "text-[8px] tracking-[0.28em]")}>
          THE PERMANENT EDITION &middot; SERIES XI
        </p>
        <h2 className={cn("leading-[1.02]", compact ? "mt-0.5 text-[0.82rem]" : "mt-2 text-[1.9rem] md:text-[2.3rem]")}>
          Books bound to be kept.
        </h2>
        <Fleuron compact={compact} />
        <p className={cn("mx-auto italic leading-snug text-[var(--sample-muted)]", compact ? "hidden" : "max-w-[46ch] text-[10px]")}>
          Twenty-four titles of the canon, newly set in Bembo and sewn in signatures &mdash; four volumes a year.
        </p>
        <div className={cn("flex-col items-center justify-center gap-2 pt-3 md:flex-row md:gap-4", compact ? "hidden" : "flex")}>
          <span className="inline-flex h-8 items-center whitespace-nowrap bg-[var(--sample-primary)] px-5 text-[9.5px] uppercase tracking-[0.18em] text-[var(--sample-surface)]">
            Begin a standing order
          </span>
          <span className="whitespace-nowrap border-b border-[var(--sample-border)] pb-0.5 text-[9.5px] italic text-[var(--sample-text)]">
            Browse the catalogue
          </span>
        </div>
      </section>

      {/* ── the shelf: cloth spines instead of product photography ── */}
      <section aria-label="cloth spine shelf" className={cn("flex min-h-0 flex-1 flex-col", compact ? "pt-1.5" : "pt-3.5")}>
        {/* packed tight: real shelves have no air between spines */}
        <div className={cn("flex min-h-0 flex-1 items-end justify-center gap-0", compact ? "min-h-[3.5rem]" : "min-h-[8.5rem]")}>
          {spines.map((volume, index) => {
            const active = volume.id === selectedId;
            return (
              <button
                aria-pressed={active}
                className={cn(
                  "relative min-w-0 flex-col items-center justify-between overflow-hidden border border-[rgb(var(--st-text-rgb)/0.25)] transition-transform",
                  FOCUS,
                  compact ? "flex py-1" : "py-1.5",
                  /* a narrow shelf holds fewer books rather than thinner ones */
                  !compact && index >= 11 ? "hidden md:flex" : "flex",
                )}
                key={volume.id}
                onClick={() => setSelectedId(volume.id)}
                style={{
                  backgroundColor: volume.cloth,
                  backgroundImage: CLOTH_SHADING,
                  color: volume.ink,
                  flexBasis: 0,
                  flexGrow: volume.thickness,
                  height: volume.height,
                  transform: active ? "translateY(-8px)" : undefined,
                }}
                title={`${volume.title} — ${volume.author}`}
                type="button"
              >
                {/* gilt head bands + label panel */}
                <span aria-hidden="true" className="flex w-full shrink-0 flex-col items-center gap-[2px] px-[3px]">
                  <span className="block h-px w-full bg-current opacity-55" />
                  <span className="block h-px w-full bg-current opacity-55" />
                  {compact ? (
                    <span className="mt-1 block h-1.5 w-full border border-current opacity-70" />
                  ) : (
                    <span
                      className="mt-0.5 block w-full overflow-hidden text-center leading-[1.5] tracking-[0.02em] opacity-90 outline outline-1 outline-current"
                      style={{ fontSize: `${volume.thickness < 1.1 ? 5 : 6}px` }}
                    >
                      {volume.numeral}
                    </span>
                  )}
                </span>
                <span className={cn("flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden py-1", compact ? "hidden" : "")}>
                  <span
                    className="[writing-mode:vertical-rl] whitespace-nowrap uppercase leading-none tracking-[0.05em]"
                    style={{ fontSize: `${volume.title.length > 15 ? 5.8 : volume.title.length > 12 ? 6.4 : 7}px` }}
                  >
                    {volume.title}
                  </span>
                </span>
                <span aria-hidden="true" className="flex w-full shrink-0 flex-col items-center gap-[2px] px-1">
                  <span className="block h-px w-full bg-current opacity-55" />
                  <span className="block h-px w-full bg-current opacity-55" />
                  <span className={cn("mt-0.5 truncate uppercase tracking-[0.08em] opacity-75", compact || volume.thickness < 1.45 ? "hidden" : "hidden max-w-full text-[5.5px] md:block")}>
                    Clarendon
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {/* shelf plank */}
        <span aria-hidden="true" className="mt-0 block h-[3px] shrink-0 bg-[var(--sample-border)]" />
        <span aria-hidden="true" className="mt-px block h-px shrink-0 bg-[var(--sample-border)] opacity-40" />
        <p className={cn("shrink-0 truncate text-center uppercase text-[var(--sample-muted)]", compact ? "pt-0.5 text-[5px] tracking-[0.1em]" : "pt-1.5 text-[7.5px] tracking-[0.2em]")}>
          Series XI &middot; volumes XXVIII&ndash;XLIV &middot; select a spine
        </p>
      </section>

      {/* ── volume record + standing order ── */}
      <section className={cn("shrink-0 border-t border-[var(--sample-border)]", compact ? "hidden" : "mt-3 grid grid-cols-1 gap-5 pt-3 md:grid-cols-[1.1fr_0.9fr]")}>
        <article aria-label="volume record" className="min-w-0 md:border-r md:border-[rgb(var(--st-border-rgb)/0.3)] md:pr-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate text-[7.5px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Volume {selected.numeral}</span>
            <span className="shrink-0 tabular-nums text-[10px] text-[var(--sample-accent)]">{selected.price}</span>
          </div>
          <h3 className="mt-1 truncate text-[1.05rem] leading-tight">{selected.title}</h3>
          <p className="truncate text-[9px] italic text-[var(--sample-muted)]">{selected.author}</p>
          <p className="mt-2 line-clamp-2 text-[9px] leading-[1.55] first-letter:float-left first-letter:pr-1.5 first-letter:text-[1.85rem] first-letter:leading-[0.78] first-letter:text-[var(--sample-primary)]">
            {selected.note}
          </p>
          <dl className="mt-2.5 grid gap-[3px]">
            {records.map(([label, value]) => (
              <div className="flex items-baseline gap-1.5" key={label}>
                <dt className="shrink-0 whitespace-nowrap text-[7.5px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">{label}</dt>
                <span aria-hidden="true" className="min-w-0 flex-1 translate-y-[-2px] border-b border-dotted border-[rgb(var(--st-border-rgb)/0.5)]" />
                <dd className="shrink-0 max-w-[52%] truncate text-[8.5px] text-[var(--sample-text)]">{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <aside aria-label="standing order" className="hidden min-w-0 flex-col md:flex">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[7.5px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Standing order</span>
            <span className="shrink-0 text-[7.5px] italic text-[var(--sample-muted)]">cancel any time</span>
          </div>
          <div className="mt-1.5 flex flex-col">
            {PLANS.map((plan) => {
              const active = plan.id === planId;
              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    "flex w-full min-w-0 items-center gap-2 border-t border-[rgb(var(--st-border-rgb)/0.28)] py-1.5 text-left transition-colors last:border-b",
                    FOCUS,
                    active ? "bg-[var(--sample-surface)]" : "",
                  )}
                  key={plan.id}
                  onClick={() => setPlanId(plan.id)}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn("grid h-[11px] w-[11px] shrink-0 place-items-center rounded-full border", active ? "border-[var(--sample-primary)]" : "border-[var(--sample-muted)]")}
                  >
                    {active ? <span className="block h-[5px] w-[5px] rounded-full bg-[var(--sample-primary)]" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[9.5px] leading-tight">{plan.name}</span>
                    <span className="block truncate text-[7.5px] italic leading-tight text-[var(--sample-muted)]">{plan.detail}</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap tabular-nums text-[9px] text-[var(--sample-text)]">{plan.price}</span>
                </button>
              );
            })}
          </div>
          <span className="mt-auto flex h-8 items-center justify-center whitespace-nowrap bg-[var(--sample-primary)] text-[9px] uppercase tracking-[0.18em] text-[var(--sample-surface)]">
            Enrol &mdash; first volume in March
          </span>
          <p className="mt-1.5 truncate text-center text-[7.5px] italic text-[var(--sample-muted)]">
            Ribbon marker, head &amp; tail bands, engraved endpapers
          </p>
        </aside>
      </section>

      {/* ── colophon ── */}
      <footer
        aria-label="colophon"
        className={cn("flex shrink-0 items-baseline justify-between gap-3 border-t border-[var(--sample-border)] text-[var(--sample-muted)]", compact ? "mt-1 pt-1 text-[5.5px]" : "mt-2.5 pt-1.5 text-[7.5px]")}
      >
        <span className="truncate italic">
          Set in Bembo, 11 on 14 &middot; laid paper &middot; sewn in signatures &middot; bound in Lancashire cloth
        </span>
        <span className={cn("shrink-0 whitespace-nowrap tabular-nums", compact ? "hidden" : "")}>&mdash; vii &mdash;</span>
      </footer>
    </div>
  );
}
