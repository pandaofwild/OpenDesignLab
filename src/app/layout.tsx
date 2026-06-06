import type { Metadata, Viewport } from "next";
import { AppChrome } from "@/components/i18n/AppChrome";
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
          <AppChrome>{children}</AppChrome>
        </StylePresetProvider>
      </body>
    </html>
  );
}
