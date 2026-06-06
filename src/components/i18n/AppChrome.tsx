"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPathname, stripLocalePrefix, switchLocalePath, withLocalePath, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    ariaBag: "Compare saved layouts",
    ariaSearch: "Search layouts",
    buildNote:
      "A design lab that combines design attributes into previews, prompts, and implementation-ready guidance.",
    language: "Language",
    navigate: "Navigate",
    system: "System",
  },
  ko: {
    ariaBag: "비교 보관함",
    ariaSearch: "레이아웃 검색",
    buildNote:
      "디자인 속성을 고르고 조합한 뒤, 프리뷰와 프롬프트로 빠르게 이어가는 디자인 랩입니다.",
    language: "Language",
    navigate: "Navigate",
    system: "System",
  },
} satisfies Record<Locale, Record<string, string>>;

const navItems = [
  ["Library", "/layouts"],
  ["Styles", "/styles"],
  ["Studio", "/studio"],
  ["Components", "/components"],
  ["Compare", "/layouts/compare"],
  ["Skill", "/layouts#layout-skill"],
] as const;

const systemItems = [
  ["Layout skill", "/layouts#layout-skill"],
  ["Preview types", "/layouts#preview-types"],
  ["Quality checks", "/layouts#quality"],
] as const;

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dictionary = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const strippedPathname = stripLocalePrefix(pathname);
  const usesCoreScreenChrome = ["/brand", "/layouts", "/styles", "/studio", "/components"].includes(
    strippedPathname,
  );

  if (usesCoreScreenChrome) {
    return <PageTransition pathname={pathname}>{children}</PageTransition>;
  }

  return (
    <>
      <RawNavigation dictionary={dictionary} locale={locale} pathname={pathname} />
      <PageTransition pathname={pathname}>{children}</PageTransition>
      <RawFooter dictionary={dictionary} locale={locale} pathname={pathname} />
    </>
  );
}

function PageTransition({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  return (
    <div className="odl-page-transition flex-1" key={pathname}>
      {children}
    </div>
  );
}

function RawNavigation({
  dictionary,
  locale,
  pathname,
}: {
  dictionary: typeof copy[Locale];
  locale: Locale;
  pathname: string;
}) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--specimen-line)] bg-[rgb(242_239_232_/_0.88)] px-4 py-3 text-[var(--specimen-ink)] backdrop-blur-md lg:px-6"
    >
      <div className="mx-auto grid max-w-[1720px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          className="flex min-w-0 items-center gap-3 truncate font-display text-2xl font-bold leading-none tracking-[-0.03em] text-[var(--specimen-ink)]"
          href={withLocalePath("/brand", locale)}
        >
          <span className="specimen-mark shrink-0" aria-hidden="true">
            <span />
          </span>
          <span>
            OpenDesign<span className="text-[var(--specimen-ink-55)]">Lab</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => (
            <Link
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--specimen-ink-55)] transition hover:text-[var(--specimen-signal)]"
              href={withLocalePath(href, locale)}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 justify-end gap-2 text-[var(--specimen-ink)] md:gap-3">
          <div
            aria-label={dictionary.language}
            className="hidden h-9 items-center border border-[var(--specimen-line)] font-mono text-[11px] font-bold uppercase tracking-[0.16em] md:flex"
          >
            {(["en", "ko"] as const).map((item) => (
              <Link
                aria-current={locale === item ? "page" : undefined}
                className={
                  locale === item
                    ? "flex h-full items-center bg-[var(--specimen-ink)] px-3 text-[var(--specimen-paper)]"
                    : "flex h-full items-center px-3 transition hover:text-[var(--specimen-signal)]"
                }
                href={switchLocalePath(pathname, item)}
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            aria-label={dictionary.ariaSearch}
            className="flex h-9 w-9 items-center justify-center border border-transparent transition hover:border-[var(--specimen-line)] hover:text-[var(--specimen-signal)]"
            href={withLocalePath("/layouts", locale)}
          >
            <SearchIcon />
          </Link>
          <Link
            aria-label={dictionary.ariaBag}
            className="flex h-9 w-9 items-center justify-center border border-transparent transition hover:border-[var(--specimen-line)] hover:text-[var(--specimen-signal)]"
            href={withLocalePath("/layouts/compare", locale)}
          >
            <BagIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function RawFooter({
  dictionary,
  locale,
  pathname,
}: {
  dictionary: typeof copy[Locale];
  locale: Locale;
  pathname: string;
}) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--specimen-line)] bg-[var(--specimen-ink)] px-5 py-16 text-[var(--specimen-paper)] lg:px-8">
      <div className="mx-auto grid max-w-[1720px] gap-12 md:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-5xl font-bold uppercase leading-[0.86] tracking-[-0.035em]">
            Open
            <br />
            Design
            <br />
            Lab
          </p>
          <div className="mt-6 flex gap-3">
            {["GH", "AI", "UI"].map((item) => (
              <span
                className="flex h-9 w-9 items-center justify-center border border-[rgb(242_239_232_/_0.28)] font-mono text-xs font-bold tracking-[0.12em]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <FooterLinks items={[...navItems, ["GitHub", "https://github.com/pandaofwild/OpenDesignLab"]]} locale={locale} title={dictionary.navigate} />
        <FooterLinks items={systemItems} locale={locale} title={dictionary.system} />
        <div>
          <p className="raw-label text-[rgb(242_239_232_/_0.58)]">Build note</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[rgb(242_239_232_/_0.70)]">
            {dictionary.buildNote}
          </p>
          <div className="mt-6 flex gap-2 text-xs font-bold uppercase tracking-[0.12em]">
            {(["en", "ko"] as const).map((item) => (
              <Link
                className={
                  locale === item
                    ? "border border-[var(--specimen-paper)] bg-[var(--specimen-paper)] px-3 py-2 text-[var(--specimen-ink)]"
                    : "border border-[rgb(242_239_232_/_0.28)] px-3 py-2 text-[rgb(242_239_232_/_0.70)] transition hover:text-[var(--specimen-signal)]"
                }
                href={switchLocalePath(pathname, item)}
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1720px] items-end justify-between gap-6 border-t border-[rgb(242_239_232_/_0.12)] pt-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[rgb(242_239_232_/_0.46)]">
          SPECIMEN / v1.0 / 2026.06
        </p>
        <p className="pb-1 text-right font-mono text-xs font-bold uppercase tracking-[0.14em] text-[rgb(242_239_232_/_0.58)]">
          opendesignlab / preview and prompt lab
        </p>
      </div>
    </footer>
  );
}

function FooterLinks({
  items,
  locale,
  title,
}: {
  items: ReadonlyArray<readonly [string, string]>;
  locale: Locale;
  title: string;
}) {
  return (
    <div>
      <p className="raw-label text-[rgb(242_239_232_/_0.58)]">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link
              className="text-sm font-medium text-[rgb(242_239_232_/_0.76)] transition hover:text-[var(--specimen-signal)]"
              href={withLocalePath(href, locale)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
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

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9 8a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
