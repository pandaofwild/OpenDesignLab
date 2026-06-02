"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import type { WebLayout } from "@/data/webLayouts";
import { Badge } from "@/components/ui/badge";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

type LayoutStagePreviewProps = {
  layout: WebLayout;
  className?: string;
  detailHref?: string;
  detailLabel?: string;
  indexLabel?: string;
  showMetrics?: boolean;
};

function densityFor(layout: WebLayout) {
  if (["dashboard", "docs", "comparison", "feed"].includes(layout.previewType)) {
    return "높음";
  }

  if (["single-column", "hero", "split-screen"].includes(layout.previewType)) {
    return "낮음";
  }

  return "보통";
}

function mobileFitFor(layout: WebLayout) {
  if (layout.previewType === "three-column" || layout.previewType === "dashboard") {
    return "재구성 필요";
  }

  if (layout.previewType === "feed" || layout.previewType === "single-column") {
    return "강함";
  }

  return "규칙 필요";
}

export function LayoutStagePreview({
  layout,
  className,
  detailHref,
  detailLabel = "상세 보기",
  indexLabel,
  showMetrics = true,
}: LayoutStagePreviewProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailPanelId = useId();

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-[#E4E2DD]", className)}
      data-testid="layout-stage-preview"
    >
      <div className="absolute inset-0 bg-[#E4E2DD]" data-testid="layout-preview-background">
        <div className="h-full overflow-hidden md:hidden">
          <div className="min-h-full bg-[#F0EEE8] p-3">
            <LayoutPreviewRenderer
              denseContent
              layout={layout}
              showLabels={false}
              viewport="mobile"
            />
          </div>
        </div>
        <div className="hidden h-full overflow-hidden md:block">
          <div className="min-h-full bg-[#F0EEE8] p-6">
            <LayoutPreviewRenderer
              denseContent
              layout={layout}
              showLabels={false}
              viewport="desktop"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1E1E1E]/50 via-[#1E1E1E]/20 to-transparent" />

      {indexLabel ? (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-[#1E1E1E]/20 bg-[#E4E2DD]/90 px-3 py-2 text-xs font-bold text-[#1E1E1E] shadow-lg backdrop-blur md:right-5 md:top-5">
          <span>{indexLabel}</span>
          <span className="hidden h-1 w-1 rounded-full bg-zinc-400 sm:block" />
          <span className="hidden sm:inline">{layout.previewType}</span>
        </div>
      ) : null}

      <div className="absolute bottom-3 left-3 right-3 z-30 sm:right-auto sm:w-[min(440px,calc(100%-1.5rem))] md:bottom-5 md:left-5">
        <div
          className="border border-[#1E1E1E]/20 bg-[#E4E2DD]/92 p-3 text-[#1E1E1E] shadow-2xl backdrop-blur-xl"
          data-testid="layout-floating-summary"
        >
          <div className="flex items-start gap-3">
            <button
              aria-label="설명 열기"
              aria-controls={detailPanelId}
              aria-expanded={isDetailOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1E1E1E] text-[#E4E2DD] transition hover:bg-[#DB4A2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
              onClick={() => setIsDetailOpen(true)}
              type="button"
            >
              <InfoIcon />
              <span className="sr-only">설명 열기</span>
            </button>
            <button
              aria-controls={detailPanelId}
              aria-expanded={isDetailOpen}
              className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E1E1E]"
              onClick={() => setIsDetailOpen(true)}
              type="button"
            >
              <span className="block truncate text-sm font-bold">{layout.nameKo}</span>
              <span className="mt-1 block truncate text-xs leading-5 text-[#1E1E1E]/62">
                {layout.summary}
              </span>
            </button>
            <div className="flex shrink-0 gap-1.5">
              {detailHref ? (
                <Link
                  aria-label={`${layout.nameKo} 상세 페이지로 이동`}
                  className="hidden h-9 w-9 items-center justify-center border border-[#1E1E1E]/25 bg-[#F0EEE8] text-[#1E1E1E] transition hover:bg-[#FF89A9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E] sm:flex"
                  href={detailHref}
                >
                  <ExternalLinkIcon />
                </Link>
              ) : null}
              <button
                aria-controls={detailPanelId}
                aria-expanded={isDetailOpen}
                className="flex h-9 w-9 items-center justify-center border border-[#1E1E1E]/25 bg-[#F0EEE8] text-xs font-bold uppercase tracking-[0.1em] text-[#1E1E1E] transition hover:bg-[#F8A348] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E] sm:w-auto sm:gap-1.5 sm:px-2.5"
                onClick={() => setIsDetailOpen(true)}
                type="button"
              >
                <ChevronUpIcon />
                <span className="hidden sm:inline">설명</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen ? (
        <>
          <button
            aria-label="설명 닫기"
            className="absolute inset-0 z-40 bg-[#1E1E1E]/40 backdrop-blur-[2px]"
            onClick={() => setIsDetailOpen(false)}
            type="button"
          />
          <div
            aria-label={`${layout.nameKo} 전체 설명`}
            aria-modal="true"
            className="absolute bottom-3 left-3 right-3 z-50 max-h-[calc(100%-1.5rem)] overflow-y-auto border border-[#1E1E1E]/20 bg-[#E4E2DD]/96 p-4 text-[#1E1E1E] shadow-2xl backdrop-blur-xl md:bottom-5 md:left-5 md:right-auto md:max-h-[calc(100%-2.5rem)] md:w-[min(720px,calc(100%-2.5rem))] md:p-5"
            data-testid="layout-detail-panel"
            id={detailPanelId}
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge>{layout.category}</Badge>
                  <Badge className={cn("border", complexityTone(layout.complexity))}>
                    {formatComplexity(layout.complexity)}
                  </Badge>
                  <Badge>{layout.previewType}</Badge>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-normal md:text-3xl">
                  {layout.nameKo}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#1E1E1E]/55">
                  {layout.nameEn}
                </p>
              </div>
              <button
                aria-label="설명 패널 닫기"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#1E1E1E]/25 bg-[#F0EEE8] text-[#1E1E1E] transition hover:bg-[#FF89A9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
                onClick={() => setIsDetailOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-5 border border-[#1E1E1E]/20 bg-[#F0EEE8] p-4">
              <p className="text-sm font-bold leading-6 text-[#1E1E1E]">
                {layout.summary}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#1E1E1E]/64">
                {layout.description}
              </p>
            </div>

            {showMetrics ? (
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                <Metric label="추천" value={layout.bestFor[0]} />
                <Metric label="모바일" value={mobileFitFor(layout)} />
                <Metric label="밀도" value={densityFor(layout)} />
                <Metric label="난이도" value={formatComplexity(layout.complexity)} />
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailBlock title="구조 설명" items={layout.structure} />
              <DetailBlock title="반응형 동작" items={layout.responsiveBehavior} />
              <DetailBlock title="어울리는 페이지" items={layout.bestFor} />
              <DetailBlock title="피해야 할 상황" items={layout.notGoodFor} />
              <DetailBlock title="장점" items={layout.pros} />
              <DetailBlock title="단점" items={layout.cons} />
            </div>

            <DetailBlock
              className="mt-4"
              items={layout.accessibilityNotes}
              title="접근성 체크포인트"
            />

            {detailHref ? (
              <div className="mt-5 flex justify-end">
                <Link
                  className="raw-button inline-flex h-10 items-center gap-2 border border-[#1E1E1E] bg-[#1E1E1E] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
                  href={detailHref}
                >
                  {detailLabel}
                  <ExternalLinkIcon />
                </Link>
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
    <section className={cn("border border-[#1E1E1E]/18 bg-[#F0EEE8] p-4", className)}>
      <h3 className="raw-label text-[#1E1E1E]">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-[#1E1E1E]/65" key={`${title}-${item}`}>
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
    <div className="border border-[#1E1E1E]/18 bg-[#F0EEE8] p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E1E1E]/45">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold text-[#1E1E1E]">{value}</p>
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
      className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[#DB4A2B]"
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
