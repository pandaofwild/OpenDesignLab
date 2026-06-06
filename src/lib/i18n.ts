export const locales = ["en", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }

  return pathname || "/";
}

export function withLocalePath(href: string, locale: Locale): string {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const [path, hash = ""] = href.split("#");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const stripped = stripLocalePrefix(normalizedPath);
  const localizedPath = stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const stripped = stripLocalePrefix(pathname);
  return stripped === "/" ? `/${nextLocale}` : `/${nextLocale}${stripped}`;
}
