import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { StylePresetProvider } from "@/components/style-preset/StylePresetProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenDesignLab",
    template: "%s | OpenDesignLab",
  },
  description: "디자인 속성을 조합해 미리보기, 프롬프트, 구현 힌트로 바꾸는 디자인 랩",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <StylePresetProvider>
          <RawNavigation />
          {children}
          <RawFooter />
        </StylePresetProvider>
      </body>
    </html>
  );
}

function RawNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 text-[#1E1E1E] mix-blend-difference md:mix-blend-normal lg:px-6"
    >
      <div className="mx-auto grid max-w-[1720px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          className="min-w-0 truncate font-display text-2xl font-bold leading-none tracking-[-0.03em] text-white md:text-[#1E1E1E]"
          href="/layouts"
        >
          OpenDesignLab
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {[
            ["Library", "/layouts"],
            ["Styles", "/styles"],
            ["Studio", "/studio"],
            ["Components", "/components"],
            ["Compare", "/layouts/compare"],
            ["Skill", "/layouts#layout-skill"],
          ].map(([label, href]) => (
            <Link
              className="text-sm font-medium uppercase tracking-[0.1em] text-[#1E1E1E] transition hover:text-[#DB4A2B]"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 justify-end gap-2 text-white md:gap-3 md:text-[#1E1E1E]">
          <Link
            aria-label="레이아웃 검색"
            className="flex h-10 w-10 items-center justify-center transition hover:text-[#DB4A2B]"
            href="/layouts"
          >
            <SearchIcon />
          </Link>
          <Link
            aria-label="비교 보관함"
            className="flex h-10 w-10 items-center justify-center transition hover:text-[#DB4A2B]"
            href="/layouts/compare"
          >
            <BagIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function RawFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#1E1E1E] px-5 py-16 text-[#E4E2DD] lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <p className="font-display text-5xl font-bold uppercase leading-[0.8] tracking-[-0.05em]">
            Open
            <br />
            Design
            <br />
            Lab
          </p>
          <div className="mt-6 flex gap-3">
            {["GH", "AI", "UI"].map((item) => (
              <span
                className="flex h-9 w-9 items-center justify-center border border-[#E4E2DD]/30 text-xs font-bold tracking-[0.12em]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <FooterLinks
          items={[
            ["Library", "/layouts"],
            ["Styles", "/styles"],
            ["Studio", "/studio"],
            ["Components", "/components"],
            ["Compare", "/layouts/compare"],
            ["GitHub", "https://github.com/pandaofwild/OpenDesignLab"],
          ]}
          title="Navigate"
        />
        <FooterLinks
          items={[
            ["Layout skill", "/layouts#layout-skill"],
            ["Preview types", "/layouts#preview-types"],
            ["Quality checks", "/layouts#quality"],
          ]}
          title="System"
        />
        <div>
          <p className="raw-label text-[#E4E2DD]/60">Build note</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#E4E2DD]/70">
            디자인 속성을 고르고 조합한 뒤, 프리뷰와 프롬프트로 빠르게
            이어가는 디자인 랩입니다.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl items-end justify-between gap-6 border-t border-white/10 pt-8">
        <p className="font-display text-8xl font-bold leading-[0.7] tracking-[-0.05em] text-white/10 md:text-[9rem] xl:text-[11rem]">
          2026
        </p>
        <p className="pb-3 text-right text-xs font-medium uppercase tracking-[0.14em] text-[#E4E2DD]/60">
          opendesignlab / preview and prompt lab
        </p>
      </div>
    </footer>
  );
}

function FooterLinks({
  items,
  title,
}: {
  items: Array<[string, string]>;
  title: string;
}) {
  return (
    <div>
      <p className="raw-label text-[#E4E2DD]/60">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link
              className="text-sm font-medium text-[#E4E2DD]/76 transition hover:text-[#F8A348]"
              href={href}
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
