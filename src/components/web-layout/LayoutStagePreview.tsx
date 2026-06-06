"use client";

import { useId, useState, type ReactNode } from "react";
import type { WebLayout } from "@/data/webLayouts";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
import { Badge } from "@/components/ui/badge";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { layoutForLocale } from "@/lib/localizedContent";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

type LayoutStagePreviewProps = {
  layout: WebLayout;
  className?: string;
  detailHref?: string;
  detailLabel?: string;
  indexLabel?: string;
  showMetrics?: boolean;
};

function densityFor(layout: WebLayout, locale: "en" | "ko") {
  if (["dashboard", "docs", "comparison", "feed"].includes(layout.previewType)) {
    return locale === "ko" ? "높음" : "High";
  }

  if (["single-column", "hero", "split-screen"].includes(layout.previewType)) {
    return locale === "ko" ? "낮음" : "Low";
  }

  return locale === "ko" ? "보통" : "Medium";
}

function mobileFitFor(layout: WebLayout, locale: "en" | "ko") {
  if (layout.previewType === "three-column" || layout.previewType === "dashboard") {
    return locale === "ko" ? "재구성 필요" : "Needs restructuring";
  }

  if (layout.previewType === "feed" || layout.previewType === "single-column") {
    return locale === "ko" ? "강함" : "Strong";
  }

  return locale === "ko" ? "규칙 필요" : "Needs rules";
}

export function LayoutStagePreview({
  layout,
  className,
  detailHref,
  detailLabel,
  indexLabel,
  showMetrics = true,
}: LayoutStagePreviewProps) {
  const locale = useLocale();
  const localizedLayout = layoutForLocale(layout, locale);
  const resolvedDetailLabel = detailLabel ?? (locale === "ko" ? "상세 보기" : "View details");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailPanelId = useId();

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-[var(--specimen-paper)]", className)}
      data-testid="layout-stage-preview"
    >
      <div className="absolute inset-0 bg-[var(--specimen-paper)]" data-testid="layout-preview-background">
        <div className="h-full overflow-hidden md:hidden">
          <div className="min-h-full bg-[var(--specimen-card)] p-3">
            <LayoutPreviewRenderer
              denseContent
              layout={localizedLayout}
              locale={locale}
              showLabels={false}
              viewport="mobile"
            />
          </div>
        </div>
        <div className="hidden h-full overflow-hidden md:block">
          <div className="min-h-full bg-[var(--specimen-card)] p-6">
            <LayoutPreviewRenderer
              denseContent
              layout={localizedLayout}
              locale={locale}
              showLabels={false}
              viewport="desktop"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgb(24_22_15_/_0.24)] via-[rgb(24_22_15_/_0.08)] to-transparent" />

      {indexLabel ? (
        <div className="raw-label absolute right-3 top-3 z-20 flex items-center gap-2 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.88)] px-3 py-2 text-[var(--specimen-ink)] md:right-5 md:top-5">
          <span>{indexLabel}</span>
          <span className="hidden h-1 w-1 bg-[var(--specimen-signal)] sm:block" />
          <span className="hidden sm:inline">{localizedLayout.previewType}</span>
        </div>
      ) : null}

      <div className="absolute bottom-3 left-3 right-3 z-30 sm:right-auto sm:w-[min(440px,calc(100%-1.5rem))] md:bottom-5 md:left-5">
        <div
          className="specimen-surface bg-[rgb(251_250_246_/_0.9)] p-3 text-[var(--specimen-ink)]"
          data-testid="layout-floating-summary"
        >
          <div className="flex items-start gap-3">
            <button
              aria-label={locale === "ko" ? "설명 열기" : "Open details"}
              aria-controls={detailPanelId}
              aria-expanded={isDetailOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--specimen-ink)] text-[var(--specimen-paper)] transition hover:bg-[var(--specimen-signal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)]"
              onClick={() => setIsDetailOpen(true)}
              type="button"
            >
              <InfoIcon />
              <span className="sr-only">{locale === "ko" ? "설명 열기" : "Open details"}</span>
            </button>
            <button
              aria-controls={detailPanelId}
              aria-expanded={isDetailOpen}
              className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--specimen-ink)]"
              onClick={() => setIsDetailOpen(true)}
              type="button"
            >
              <span className="block truncate text-sm font-bold">{localizedLayout.nameKo}</span>
              <span className="mt-1 block truncate text-xs leading-5 text-[var(--specimen-ink-55)]">
                {localizedLayout.summary}
              </span>
            </button>
            <div className="flex shrink-0 gap-1.5">
              {detailHref ? (
                <LocalizedLink
                  aria-label={
                    locale === "ko"
                      ? `${localizedLayout.nameKo} 상세 페이지로 이동`
                      : `Open ${localizedLayout.nameKo} detail page`
                  }
                  className="hidden h-9 w-9 items-center justify-center border border-[var(--specimen-line)] bg-[var(--specimen-card)] text-[var(--specimen-ink)] transition hover:border-[var(--specimen-ink)] hover:bg-[var(--specimen-paper-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)] sm:flex"
                  href={detailHref}
                >
                  <ExternalLinkIcon />
                </LocalizedLink>
              ) : null}
              <button
                aria-controls={detailPanelId}
                aria-expanded={isDetailOpen}
                className="raw-button flex h-9 w-9 items-center justify-center border border-[var(--specimen-line)] bg-[var(--specimen-card)] text-xs font-bold uppercase tracking-[0.1em] text-[var(--specimen-ink)] transition hover:border-[var(--specimen-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)] sm:w-auto sm:gap-1.5 sm:px-2.5"
                onClick={() => setIsDetailOpen(true)}
                type="button"
              >
                <ChevronUpIcon />
                <span className="hidden sm:inline">{locale === "ko" ? "설명" : "Details"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen ? (
        <>
          <button
            aria-label={locale === "ko" ? "설명 닫기" : "Close details"}
            className="absolute inset-0 z-40 bg-[rgb(24_22_15_/_0.36)]"
            onClick={() => setIsDetailOpen(false)}
            type="button"
          />
          <div
            aria-label={
              locale === "ko"
                ? `${localizedLayout.nameKo} 전체 설명`
                : `${localizedLayout.nameKo} full description`
            }
            aria-modal="true"
            className="specimen-surface absolute bottom-3 left-3 right-3 z-50 max-h-[calc(100%-1.5rem)] overflow-y-auto bg-[rgb(251_250_246_/_0.96)] p-4 text-[var(--specimen-ink)] md:bottom-5 md:left-5 md:right-auto md:max-h-[calc(100%-2.5rem)] md:w-[min(720px,calc(100%-2.5rem))] md:p-5"
            data-testid="layout-detail-panel"
            id={detailPanelId}
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge>{localizedLayout.category}</Badge>
                  <Badge className={cn("border", complexityTone(layout.complexity))}>
                    {formatComplexity(layout.complexity, locale)}
                  </Badge>
                  <Badge>{localizedLayout.previewType}</Badge>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-normal md:text-3xl">
                  {localizedLayout.nameKo}
                </h2>
                {localizedLayout.nameEn !== localizedLayout.nameKo ? (
                  <p className="mt-1 text-sm font-medium text-[var(--specimen-ink-55)]">
                    {localizedLayout.nameEn}
                  </p>
                ) : null}
              </div>
              <button
                aria-label={locale === "ko" ? "설명 패널 닫기" : "Close detail panel"}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--specimen-line)] bg-[var(--specimen-card)] text-[var(--specimen-ink)] transition hover:border-[var(--specimen-ink)] hover:bg-[var(--specimen-paper-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)]"
                onClick={() => setIsDetailOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-5 border border-[var(--specimen-line)] bg-[var(--specimen-card)] p-4">
              <p className="text-sm font-bold leading-6 text-[var(--specimen-ink)]">
                {localizedLayout.summary}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--specimen-ink-55)]">
                {localizedLayout.description}
              </p>
            </div>

            {showMetrics ? (
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                <Metric
                  label={locale === "ko" ? "추천" : "Best for"}
                  value={localizedLayout.bestFor[0]}
                />
                <Metric
                  label={locale === "ko" ? "모바일" : "Mobile"}
                  value={mobileFitFor(layout, locale)}
                />
                <Metric
                  label={locale === "ko" ? "밀도" : "Density"}
                  value={densityFor(layout, locale)}
                />
                <Metric
                  label={locale === "ko" ? "난이도" : "Level"}
                  value={formatComplexity(layout.complexity, locale)}
                />
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailBlock
                title={locale === "ko" ? "구조 설명" : "Structure"}
                items={localizedLayout.structure}
              />
              <DetailBlock
                title={locale === "ko" ? "반응형 동작" : "Responsive behavior"}
                items={localizedLayout.responsiveBehavior}
              />
              <DetailBlock
                title={locale === "ko" ? "어울리는 페이지" : "Best for"}
                items={localizedLayout.bestFor}
              />
              <DetailBlock
                title={locale === "ko" ? "피해야 할 상황" : "Avoid when"}
                items={localizedLayout.notGoodFor}
              />
              <DetailBlock title={locale === "ko" ? "장점" : "Pros"} items={localizedLayout.pros} />
              <DetailBlock title={locale === "ko" ? "단점" : "Cons"} items={localizedLayout.cons} />
            </div>

            <DetailBlock
              className="mt-4"
              items={localizedLayout.accessibilityNotes}
              title={locale === "ko" ? "접근성 체크포인트" : "Accessibility checkpoints"}
            />

            {detailHref ? (
              <div className="mt-5 flex justify-end">
                <LocalizedLink
                  className="raw-button inline-flex h-10 items-center gap-2 border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[var(--specimen-paper)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)]"
                  href={detailHref}
                >
                  {resolvedDetailLabel}
                  <ExternalLinkIcon />
                </LocalizedLink>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

function DetailBlock({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <section className={cn("border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)] p-4", className)}>
      <h3 className="raw-label text-[var(--specimen-ink)]">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-[var(--specimen-ink-55)]" key={`${title}-${item}`}>
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)] p-3">
      <p className="raw-label text-[var(--specimen-ink-55)]">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold text-[var(--specimen-ink)]">{value}</p>
    </div>
  );
}

function SvgIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function InfoIcon() {
  return (
    <SvgIcon>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10.5v6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M12 7.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </SvgIcon>
  );
}

function ChevronUpIcon() {
  return (
    <SvgIcon>
      <path
        d="m6 15 6-6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

function ExternalLinkIcon() {
  return (
    <SvgIcon>
      <path
        d="M14 5h5v5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m10 14 9-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

function CloseIcon() {
  return (
    <SvgIcon>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[var(--specimen-signal)]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5 12 4 4 10-10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
