"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { localeFromPathname, withLocalePath } from "@/lib/i18n";

type LocalizedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> &
  LinkProps & {
    children: ReactNode;
    href: string;
  };

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  return <Link href={withLocalePath(href, locale)} {...props} />;
}
