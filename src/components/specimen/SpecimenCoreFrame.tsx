"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CoreTab = "layouts" | "styles" | "studio" | "components";

type SpecimenCoreFrameProps = {
  active: CoreTab | "brand";
  appliedLabel?: string;
  children: React.ReactNode;
  className?: string;
  label: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  searchPlaceholder?: string;
  searchValue?: string;
};

const tabs: Array<{ key: CoreTab; href: string; label: string }> = [
  { key: "layouts", href: "/layouts", label: "Layouts" },
  { key: "styles", href: "/styles", label: "Styles" },
  { key: "studio", href: "/studio", label: "Studio" },
  { key: "components", href: "/components", label: "Components" },
];

export function SpecimenCoreFrame({
  active,
  appliedLabel = "BRUTALISM",
  children,
  className,
  label,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "search the catalog...",
  searchValue = "",
}: SpecimenCoreFrameProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchSubmit?.(searchValue);
  }

  return (
    <section className={cn("specimen-core mx-auto max-w-[1440px]", className)}>
      <div className="specimen-core-kicker mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--specimen-ink-55)]">
        <GripIcon />
        <span>{label}</span>
      </div>
      <div className="specimen-sheet specimen-core-sheet overflow-hidden bg-[rgb(251_250_246_/_0.62)]">
        <header className="specimen-core-header flex flex-col gap-2 border-b border-[var(--specimen-line)] px-4 py-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <LocalizedLink
              className="flex min-w-0 items-center gap-2.5 font-display text-lg font-bold leading-none tracking-normal text-[var(--specimen-ink)]"
              href="/brand"
            >
              <span className="specimen-mark shrink-0" aria-hidden="true">
                <span />
              </span>
              <span>
                OpenDesign<span className="text-[var(--specimen-ink-55)]">Lab</span>
              </span>
            </LocalizedLink>
            <nav className="flex flex-wrap items-center gap-1">
              {tabs.map((tab) => (
                <LocalizedLink
                  data-active={active === tab.key}
                  className={cn(
                    "specimen-tab px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition",
                    active === tab.key
                      ? "bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                      : "text-[var(--specimen-ink-55)] hover:text-[var(--specimen-signal)]",
                  )}
                  href={tab.href}
                  key={tab.key}
                >
                  {tab.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
            <form
              className="specimen-toolbar-field flex h-8 min-w-0 items-center gap-2 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] px-3 text-[var(--specimen-ink-55)] sm:w-[218px]"
              onSubmit={submitSearch}
            >
              <SearchIcon />
              <input
                aria-label="Search catalog"
                className="min-w-0 flex-1 bg-transparent font-mono text-[11px] tracking-[0.08em] text-[var(--specimen-ink)] outline-none placeholder:text-[var(--specimen-ink-55)]"
                onChange={(event) => onSearchChange?.(event.currentTarget.value)}
                placeholder={searchPlaceholder}
                readOnly={!onSearchChange}
                value={searchValue}
              />
              {searchValue ? (
                <button
                  aria-label="Clear search"
                  className="font-mono text-[10px] text-[var(--specimen-signal)]"
                  onClick={() => onSearchChange?.("")}
                  type="button"
                >
                  x
                </button>
              ) : (
                <span className="ml-auto border border-[var(--specimen-line)] px-1.5 font-mono text-[10px]">
                  /
                </span>
              )}
            </form>
            <div className="specimen-applied inline-flex h-8 items-center gap-2 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] px-3">
              <span className="h-2 w-2 bg-[var(--specimen-ink)]" />
              <span className="raw-label text-[var(--specimen-ink-55)]">
                Applied · {appliedLabel}
              </span>
            </div>
            <LanguageToggle locale={locale} pathname={pathname} />
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

function LanguageToggle({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <div
      aria-label="Language"
      className="inline-flex h-8 items-center border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
    >
      {(["en", "ko"] as const).map((item) => {
        const active = locale === item;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-full items-center px-2.5 transition",
              active
                ? "bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                : "text-[var(--specimen-ink-55)] hover:text-[var(--specimen-signal)]",
            )}
            href={switchLocalePath(pathname, item)}
            key={item}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}

export function SpecimenSideSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-2.5">
      <p className="raw-label flex items-center gap-2 text-[var(--specimen-ink-55)]">
        <span className="h-1.5 w-1.5 bg-[var(--specimen-ink)]" />
        {title}
      </p>
      {children}
    </section>
  );
}

export function SpecimenOptionRow({
  active = false,
  count,
  label,
  onClick,
}: {
  active?: boolean;
  count?: number;
  label: string;
  onClick?: () => void;
}) {
  const className = "flex w-full items-center gap-2.5 text-left text-[13px]";
  const content = (
    <>
      <span
        className={cn(
          "grid h-3 w-3 place-items-center border border-[var(--specimen-line)]",
          active ? "border-[var(--specimen-ink)]" : "",
        )}
      >
        {active ? <span className="h-1.5 w-1.5 bg-[var(--specimen-signal)]" /> : null}
      </span>
      <span className={active ? "font-bold text-[var(--specimen-ink)]" : "text-[var(--specimen-ink-55)]"}>
        {label}
      </span>
      {typeof count === "number" ? (
        <span className="ml-auto font-mono text-[11px] text-[var(--specimen-ink-55)]">
          {count}
        </span>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button aria-pressed={active} className={className} onClick={onClick} type="button">
        {content}
      </button>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}

export function SpecimenTinyChip({
  active = false,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const className = cn(
    "inline-flex border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em]",
    active
      ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
      : "border-[var(--specimen-line)] text-[var(--specimen-ink-55)]",
  );

  if (onClick) {
    return (
      <button aria-pressed={active} className={className} onClick={onClick} type="button">
        {children}
      </button>
    );
  }

  return (
    <span className={className}>
      {children}
    </span>
  );
}

function GripIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
      <circle cx="5" cy="3" r="1" />
      <circle cx="10" cy="3" r="1" />
      <circle cx="5" cy="8" r="1" />
      <circle cx="10" cy="8" r="1" />
      <circle cx="5" cy="13" r="1" />
      <circle cx="10" cy="13" r="1" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
