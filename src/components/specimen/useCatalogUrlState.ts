"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SetParamOptions = {
  clear?: string[];
};

export function useCatalogUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null, options: SetParamOptions = {}) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const clearKey of options.clear ?? []) {
        next.delete(clearKey);
      }

      if (value && value !== "all") {
        next.set(key, value);
      } else {
        next.delete(key);
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    q: searchParams.get("q") ?? "",
    searchParams,
    setParam,
    setQuery: (value: string) => setParam("q", value),
  };
}

export function normalizedText(value: string) {
  return value.trim().toLowerCase();
}

export function includesQuery(values: string[], query: string) {
  const normalizedQuery = normalizedText(query);

  if (!normalizedQuery) return true;

  return values.some((value) => normalizedText(value).includes(normalizedQuery));
}
