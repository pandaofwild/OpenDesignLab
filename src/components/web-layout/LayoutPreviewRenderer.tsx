import type { ReactNode } from "react";
import type { WebLayout } from "@/data/webLayouts";
import { AnnotatedRegion } from "@/components/web-layout/LayoutAnnotations";
import type { PreviewViewport } from "@/components/web-layout/ViewportSwitcher";
import { cn } from "@/lib/utils";

type LayoutPreviewRendererProps = {
  layout: WebLayout;
  viewport: PreviewViewport;
  showLabels: boolean;
  denseContent: boolean;
};

type SampleProps = {
  layout: WebLayout;
  compact: boolean;
  showLabels: boolean;
  denseContent: boolean;
};

const navItems = ["Shop", "Journal", "Studio"];
const productNames = ["Raw tote", "Grid coat", "Poster tee", "Field knit", "Form bag", "Studio cap"];
const stepNames = ["Brief", "Wire", "Prototype", "Ship"];

function Region({
  label,
  showLabels,
  className,
  children,
}: {
  label: string;
  showLabels: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnnotatedRegion
      className={cn("min-w-0 max-w-full border-[#1E1E1E]/18 bg-[#F0EEE8]/72", className)}
      label={label}
      showLabel={showLabels}
    >
      {children}
    </AnnotatedRegion>
  );
}

function SampleHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="flex min-h-11 items-center justify-between border border-[#1E1E1E]/18 bg-[#E4E2DD]/78 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 bg-[#1E1E1E]" />
        <span className="font-display text-sm font-bold uppercase leading-none tracking-[-0.05em]">
          Raw Co.
        </span>
      </div>
      {compact ? (
        <span className="border border-[#1E1E1E]/25 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em]">
          Menu
        </span>
      ) : (
        <nav className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E1E1E]/62">
          {navItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <span className="bg-[#F8A348]/45 px-2 py-1 text-[#1E1E1E]">Bag 02</span>
        </nav>
      )}
    </header>
  );
}

function RawLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-bold uppercase tracking-[0.14em] text-[#DB4A2B]", className)}>
      {children}
    </p>
  );
}

function RawHeading({
  children,
  className,
  compact,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <h3
      className={cn(
        "max-w-full break-words font-display font-bold uppercase leading-[0.78] tracking-[-0.05em] text-[#1E1E1E]",
        compact ? "text-[2.35rem] leading-[0.86]" : "text-7xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function RawButton({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <button
      className={cn(
        "h-9 border px-4 text-[11px] font-bold uppercase tracking-[0.12em]",
        tone === "dark"
          ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD]"
          : "border-[#1E1E1E]/28 bg-[#F0EEE8]/80 text-[#1E1E1E]",
      )}
      type="button"
    >
      {children}
    </button>
  );
}

function SoftScene({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[#1E1E1E]/16 bg-[#E4E2DD] p-4",
        "before:absolute before:left-[-20%] before:top-[-20%] before:h-56 before:w-56 before:bg-[#DB4A2B]/42 before:blur-[70px] before:content-['']",
        "after:absolute after:bottom-[-22%] after:right-[-15%] after:h-56 after:w-56 after:bg-[#F8A348]/42 after:blur-[70px] after:content-['']",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ProductTile({ name, index }: { name: string; index: number }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden border border-[#1E1E1E]/16 bg-[#E4E2DD]">
        <span
          className={cn(
            "absolute inset-x-5 top-5 h-1/2",
            index % 3 === 0 && "bg-[#1E1E1E]",
            index % 3 === 1 && "bg-[#DB4A2B]/55",
            index % 3 === 2 && "bg-[#F8A348]/58",
          )}
        />
        <span className="absolute bottom-5 left-5 h-20 w-20 bg-[#FF89A9]/55" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.15em]">{name}</p>
        <p className="shrink-0 text-[11px] font-medium text-[#1E1E1E]/55">₩{128 + index * 17}</p>
      </div>
    </article>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#1E1E1E]/16 bg-[#F0EEE8]/78 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1E1E1E]/50">{label}</p>
      <p className="mt-2 font-display text-4xl font-bold leading-none tracking-[-0.05em]">{value}</p>
    </div>
  );
}

function SingleColumnSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className="space-y-3">
      <Region label="Header" showLabels={showLabels}>
        <SampleHeader compact={compact} />
      </Region>
      <Region label="Article Flow" showLabels={showLabels}>
        <article
          className={cn(
            "mx-auto w-full min-w-0 max-w-3xl px-5 py-8",
            compact && "max-w-full px-4 py-6",
          )}
        >
          <RawLabel>{layout.nameEn}</RawLabel>
          <RawHeading className={cn("mt-4", compact && "max-w-[14rem]")} compact={compact}>
            {compact ? "One clear read" : "One clear read"}
          </RawHeading>
          <p className={cn("mt-5 max-w-xl text-sm leading-6 text-[#1E1E1E]/68", compact && "text-xs leading-5")}>
            {layout.summary}
          </p>
          <div className={cn("mt-8 border-y border-[#1E1E1E]/18 py-5", compact && "mt-5 py-4")}>
            <p className={cn("break-words font-display text-3xl font-bold uppercase leading-[0.9] tracking-[-0.05em]", compact && "text-2xl")}>
              {layout.nameKo}
            </p>
            <p className={cn("mt-3 text-sm leading-6 text-[#1E1E1E]/68", compact && "text-xs leading-5")}>
              본문 폭을 제한하고 큰 제목, 짧은 설명, 반복 CTA를 같은 흐름 안에 둔 실제
              읽기형 페이지입니다.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <RawButton>Read structure</RawButton>
            <RawButton tone="light">Save layout</RawButton>
          </div>
        </article>
      </Region>
    </div>
  );
}

function TwoColumnSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className="space-y-3">
      <Region label="Header" showLabels={showLabels}>
        <SampleHeader compact={compact} />
      </Region>
      <Region label="Split Content" showLabels={showLabels}>
        <div className={cn("grid gap-4 p-5", compact ? "grid-cols-1" : "grid-cols-[1.15fr_0.85fr]")}>
          <SoftScene className="min-h-72">
            <RawLabel>{layout.category}</RawLabel>
            <RawHeading className="mt-4" compact={compact}>
              Raw
              <br />
              method
            </RawHeading>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#1E1E1E]/68">{layout.summary}</p>
          </SoftScene>
          <aside className="space-y-3">
            {layout.bestFor.slice(0, 3).map((item, index) => (
              <div className="border-t border-[#1E1E1E]/20 py-4" key={item}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DB4A2B]">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm font-bold">{item}</p>
                <p className="mt-2 text-xs leading-5 text-[#1E1E1E]/60">
                  보조 정보가 주 메시지 옆에서 바로 결정을 돕습니다.
                </p>
              </div>
            ))}
            <RawButton>Compare</RawButton>
          </aside>
        </div>
      </Region>
    </div>
  );
}

function ThreeColumnSample({ layout, compact, showLabels }: SampleProps) {
  if (compact) return <TwoColumnSample layout={layout} compact showLabels={showLabels} denseContent />;

  return (
    <div className="space-y-3">
      <Region label="Header" showLabels={showLabels}>
        <SampleHeader />
      </Region>
      <div className="grid grid-cols-[180px_1fr_210px] gap-3">
        <Region className="bg-[#1E1E1E] p-4 text-[#E4E2DD]" label="Nav" showLabels={showLabels}>
          <RawLabel className="text-[#F8A348]">Index</RawLabel>
          <div className="mt-5 space-y-3 text-xs font-bold uppercase tracking-[0.12em]">
            {["Overview", "Blocks", "Rules", "Cases"].map((item) => (
              <p className="border-t border-[#E4E2DD]/18 pt-3" key={item}>{item}</p>
            ))}
          </div>
        </Region>
        <Region className="p-6" label="Main Story" showLabels={showLabels}>
          <RawLabel>{layout.nameEn}</RawLabel>
          <RawHeading className="mt-4">Center voice</RawHeading>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#1E1E1E]/68">{layout.summary}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <SoftScene className="min-h-32" />
            <SoftScene className="min-h-32 before:bg-[#FF89A9]/38" />
          </div>
        </Region>
        <Region className="p-4" label="TOC" showLabels={showLabels}>
          <RawLabel>On page</RawLabel>
          <div className="mt-4 space-y-3">
            {layout.structure.slice(0, 4).map((item) => (
              <p className="border-t border-[#1E1E1E]/18 pt-3 text-xs leading-5 text-[#1E1E1E]/68" key={item}>
                {item}
              </p>
            ))}
          </div>
        </Region>
      </div>
    </div>
  );
}

function HeroSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className="space-y-3">
      <Region label="Header" showLabels={showLabels}>
        <SampleHeader compact={compact} />
      </Region>
      <Region label="Hero" showLabels={showLabels}>
        <SoftScene className={cn("min-h-[420px] p-6", compact && "min-h-[340px] p-4")}>
          <div className={cn("grid h-full gap-6", compact ? "grid-cols-1" : "grid-cols-[1fr_360px] items-end")}>
            <div>
              <RawLabel>{layout.nameEn}</RawLabel>
              <RawHeading
                className={cn("mt-5", compact ? "text-[3.25rem] leading-[0.8]" : "text-6xl md:text-8xl")}
                compact={compact}
              >
                Raw
                <br />
                form
              </RawHeading>
            </div>
            <div className="max-w-sm">
              <p className="text-sm leading-6 text-[#1E1E1E]/70">{layout.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <RawButton>Shop now</RawButton>
                <RawButton tone="light">Campaign</RawButton>
              </div>
            </div>
          </div>
        </SoftScene>
      </Region>
      <Region className="p-4" label="Next Section" showLabels={showLabels}>
        <div className="grid gap-3 sm:grid-cols-3">
          {layout.bestFor.slice(0, 3).map((item) => (
            <p className="border-t border-[#1E1E1E]/18 pt-3 text-xs font-bold uppercase tracking-[0.1em]" key={item}>
              {item}
            </p>
          ))}
        </div>
      </Region>
    </div>
  );
}

function SplitScreenSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className={cn("grid min-h-[460px] gap-3", compact ? "min-h-0 grid-cols-1" : "grid-cols-2")}>
      <Region className={cn("flex items-end p-6", compact && "p-4")} label="Message" showLabels={showLabels}>
        <div>
          <RawLabel>{layout.category}</RawLabel>
          <RawHeading className="mt-4" compact={compact}>
            Two
            <br />
            sides
          </RawHeading>
          <p className={cn("mt-5 max-w-md text-sm leading-6 text-[#1E1E1E]/68", compact && "text-xs leading-5")}>
            {layout.summary}
          </p>
          <div className="mt-6"><RawButton>Open side</RawButton></div>
        </div>
      </Region>
      <Region className="p-0" label="Visual" showLabels={showLabels}>
        <SoftScene className={cn("h-full min-h-80 border-0", compact && "min-h-52")}>
          <div className="absolute left-8 top-8 h-32 w-36 bg-[#DB4A2B]/72" />
          <div className="absolute bottom-12 right-10 h-40 w-52 bg-[#F8A348]/62" />
          <div className="absolute bottom-24 left-20 h-28 w-44 bg-[#FF89A9]/55" />
        </SoftScene>
      </Region>
    </div>
  );
}

function CardGridSample({ layout, compact, showLabels, denseContent }: SampleProps) {
  const count = denseContent ? 6 : 4;
  return (
    <div className="space-y-3">
      <Region className={cn("p-5", compact && "p-4")} label="Collection Header" showLabels={showLabels}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <RawLabel>{layout.category}</RawLabel>
            <RawHeading className="mt-3" compact={compact}>Studio goods</RawHeading>
          </div>
          <p className={cn("max-w-xs text-sm leading-6 text-[#1E1E1E]/68", compact && "text-xs leading-5")}>
            {layout.summary}
          </p>
        </div>
      </Region>
      <Region className={cn("p-5", compact && "p-4")} label="Product Grid" showLabels={showLabels}>
        <div className={cn("grid gap-x-4 gap-y-8", compact ? "grid-cols-1" : "grid-cols-3")}>
          {productNames.slice(0, count).map((name, index) => (
            <ProductTile index={index} key={name} name={name} />
          ))}
        </div>
      </Region>
    </div>
  );
}

function BentoSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-4 auto-rows-[150px]")}>
      <Region className={cn("p-5", compact ? "p-4" : "col-span-2 row-span-2")} label="Feature" showLabels={showLabels}>
        <RawLabel>{layout.nameEn}</RawLabel>
        <RawHeading className="mt-4" compact={compact}>Bento signal</RawHeading>
        <p className="mt-5 text-sm leading-6 text-[#1E1E1E]/68">{layout.summary}</p>
      </Region>
      <Region className="bg-[#DB4A2B]/28 p-4" label="Drop" showLabels={showLabels}>
        <p className={cn("font-display font-bold leading-none tracking-[-0.05em]", compact ? "text-4xl" : "text-5xl")}>47</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em]">Live blocks</p>
      </Region>
      <Region className="bg-[#F8A348]/30 p-4" label="Note" showLabels={showLabels}>
        <p className="text-sm font-bold">{layout.bestFor[0]}</p>
      </Region>
      <Region className={cn("p-4", compact ? "" : "col-span-2")} label="Strip" showLabels={showLabels}>
        <div className="flex h-full items-center gap-4">
          <span className="h-20 w-20 bg-[#FF89A9]/58" />
          <p className="text-sm leading-6 text-[#1E1E1E]/68">서로 다른 크기의 모듈이 실제 콘텐츠 허브처럼 조합됩니다.</p>
        </div>
      </Region>
      <Region className="bg-[#1E1E1E] p-4 text-[#E4E2DD]" label="Action" showLabels={showLabels}>
        <p className="text-sm font-bold">Open layout</p>
      </Region>
    </div>
  );
}

function DashboardSample({ layout, compact, showLabels, denseContent }: SampleProps) {
  if (compact) {
    return (
      <div className="space-y-3">
        <Region className="p-4" label="Mobile Dashboard" showLabels={showLabels}>
          <RawLabel>Control room</RawLabel>
          <RawHeading className="mt-3 max-w-[14rem]" compact>Daily board</RawHeading>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricCard label="Active" value="47" />
            <MetricCard label="Queued" value="18" />
          </div>
        </Region>
        <Region className="p-4" label="Tasks" showLabels={showLabels}>
          <TaskList count={denseContent ? 6 : 4} />
        </Region>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[210px_1fr] gap-3">
      <Region className="bg-[#1E1E1E] p-4 text-[#E4E2DD]" label="Sidebar" showLabels={showLabels}>
        <p className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.05em]">Raw Ops</p>
        <div className="mt-8 space-y-3 text-xs font-bold uppercase tracking-[0.12em]">
          {["Queue", "Orders", "Stock", "Studio"].map((item) => (
            <p className="border-t border-[#E4E2DD]/16 pt-3" key={item}>{item}</p>
          ))}
        </div>
      </Region>
      <div className="space-y-3">
        <Region className="p-4" label="Top Bar" showLabels={showLabels}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <RawLabel>{layout.nameEn}</RawLabel>
              <p className="mt-1 text-sm font-bold">{layout.nameKo}</p>
            </div>
            <RawButton>New report</RawButton>
          </div>
        </Region>
        <Region className="p-4" label="Metrics" showLabels={showLabels}>
          <div className="grid grid-cols-4 gap-3">
            <MetricCard label="Revenue" value="82" />
            <MetricCard label="Orders" value="149" />
            <MetricCard label="Return" value="06" />
            <MetricCard label="Drops" value="12" />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_260px] gap-3">
            <div className="flex h-44 items-end gap-2 border border-[#1E1E1E]/16 bg-[#F0EEE8]/78 p-4">
              {[34, 68, 42, 80, 58, 92, 64].map((height, index) => (
                <span
                  className={cn("flex-1", index % 2 ? "bg-[#DB4A2B]" : "bg-[#1E1E1E]")}
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <TaskList count={denseContent ? 6 : 4} />
          </div>
        </Region>
      </div>
    </div>
  );
}

function TaskList({ count }: { count: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex items-center gap-3 border border-[#1E1E1E]/14 bg-[#F0EEE8]/78 p-3" key={index}>
          <span className={cn("h-8 w-8", index % 2 ? "bg-[#F8A348]/60" : "bg-[#DB4A2B]/60")} />
          <div>
            <p className="text-xs font-bold">Batch {index + 1}</p>
            <p className="mt-1 text-[11px] text-[#1E1E1E]/55">Ready for review</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EditorialSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className="space-y-3">
      <Region className="p-6" label="Editorial" showLabels={showLabels}>
        <div className={cn("grid gap-8", compact ? "grid-cols-1" : "grid-cols-[0.8fr_1.2fr]")}>
          <div>
            <RawLabel>{layout.category}</RawLabel>
            <RawHeading className={cn("mt-4", compact && "max-w-[15rem]")} compact={compact}>Printed web</RawHeading>
          </div>
          <div className="space-y-5 text-sm leading-6 text-[#1E1E1E]/68">
            <p>{layout.summary}</p>
            <blockquote className="border-l-4 border-[#DB4A2B] bg-[#F8A348]/18 p-4 font-bold text-[#1E1E1E]">
              {layout.bestFor.join(" / ")}
            </blockquote>
            <p>큰 제목과 짧은 본문, 강조 인용을 실제 매거진 페이지처럼 배치합니다.</p>
          </div>
        </div>
      </Region>
    </div>
  );
}

function CommerceSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[1.05fr_0.95fr]")}>
      <Region className="p-4" label="Product Media" showLabels={showLabels}>
        <div className={cn("grid min-h-80 grid-cols-2 gap-3", compact && "min-h-60")}>
          <SoftScene className="col-span-2 min-h-44" />
          <SoftScene className="min-h-28 before:bg-[#FF89A9]/42" />
          <SoftScene className="min-h-28 after:bg-[#DB4A2B]/36" />
        </div>
      </Region>
      <Region className="p-5" label="Purchase Panel" showLabels={showLabels}>
        <RawLabel>{layout.nameEn}</RawLabel>
        <RawHeading className="mt-3" compact={compact}>Raw object</RawHeading>
        <p className="mt-4 text-sm leading-6 text-[#1E1E1E]/68">{layout.summary}</p>
        <p className={cn("mt-6 font-display font-bold leading-none tracking-[-0.05em]", compact ? "text-3xl" : "text-5xl")}>₩129,000</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["S", "M", "L"].map((size) => (
            <button className="h-10 border border-[#1E1E1E]/25 text-xs font-bold" key={size} type="button">
              {size}
            </button>
          ))}
        </div>
        <button className="mt-4 h-11 w-full bg-[#1E1E1E] text-sm font-bold text-[#E4E2DD]" type="button">
          장바구니 담기
        </button>
      </Region>
    </div>
  );
}

function DocsSample({ layout, compact, showLabels }: SampleProps) {
  if (compact) return <SingleColumnSample layout={layout} compact showLabels={showLabels} denseContent />;

  return (
    <div className="grid grid-cols-[190px_1fr_190px] gap-3">
      <Region className="p-4" label="Docs Nav" showLabels={showLabels}>
        <RawLabel>Docs</RawLabel>
        <div className="mt-4 space-y-2 text-xs font-bold">
          {["Start", "Structure", "Patterns", "Code"].map((item) => (
            <p className="border-t border-[#1E1E1E]/18 pt-3" key={item}>{item}</p>
          ))}
        </div>
      </Region>
      <Region className="p-5" label="Docs Main" showLabels={showLabels}>
        <RawLabel>{layout.nameEn}</RawLabel>
        <RawHeading className="mt-3">Build notes</RawHeading>
        <p className="mt-4 text-sm leading-6 text-[#1E1E1E]/68">{layout.summary}</p>
        <pre className="mt-6 overflow-hidden bg-[#1E1E1E] p-4 font-mono text-[11px] leading-5 text-[#F8A348]">
          {`<section class="raw-display">\n  ${layout.previewType}\n</section>`}
        </pre>
      </Region>
      <Region className="p-4" label="On Page" showLabels={showLabels}>
        <RawLabel>Index</RawLabel>
        <div className="mt-4 space-y-3 text-xs text-[#1E1E1E]/65">
          {layout.structure.slice(0, 4).map((item) => <p key={item}>{item}</p>)}
        </div>
      </Region>
    </div>
  );
}

function FeedSample({ layout, compact, showLabels, denseContent }: SampleProps) {
  return (
    <div className={cn("mx-auto space-y-3", compact ? "max-w-sm" : "max-w-2xl")}>
      <Region className="p-4" label="Feed Header" showLabels={showLabels}>
        <RawLabel>Live notes</RawLabel>
        <RawHeading className={cn("mt-3", compact && "max-w-[13rem]")} compact={compact}>Dispatch</RawHeading>
      </Region>
      <Region className="p-4" label="Feed" showLabels={showLabels}>
        <div className="space-y-3">
          {Array.from({ length: denseContent ? 6 : 4 }).map((_, index) => (
            <article className="border border-[#1E1E1E]/16 bg-[#F0EEE8]/78 p-4" key={index}>
              <div className="flex items-center gap-3">
                <span className={cn("h-9 w-9", index % 2 ? "bg-[#DB4A2B]/60" : "bg-[#1E1E1E]")} />
                <div>
                  <p className="text-xs font-bold">Layout note {index + 1}</p>
                  <p className="mt-1 text-[11px] text-[#1E1E1E]/55">{layout.nameEn}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#1E1E1E]/68">{layout.summary}</p>
            </article>
          ))}
        </div>
      </Region>
    </div>
  );
}

function MapListSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[1fr_320px]")}>
      <Region className="relative min-h-96 bg-[#F8A348]/18 p-4" label="Map" showLabels={showLabels}>
        <div className="absolute inset-5 border border-[#DB4A2B]/28 bg-[linear-gradient(90deg,rgba(219,74,43,0.18)_1px,transparent_1px),linear-gradient(rgba(219,74,43,0.18)_1px,transparent_1px)] bg-[length:36px_36px]" />
        {[20, 44, 66, 78].map((left, index) => (
          <span
            className="absolute h-5 w-5 border-2 border-[#E4E2DD] bg-[#1E1E1E]"
            key={left}
            style={{ left: `${left}%`, top: `${24 + index * 13}%` }}
          />
        ))}
      </Region>
      <Region className="p-4" label="Results" showLabels={showLabels}>
        <RawLabel>{layout.nameEn}</RawLabel>
        <div className="mt-4 space-y-3">
          {layout.bestFor.slice(0, 4).map((item, index) => (
            <div className="border border-[#1E1E1E]/16 bg-[#F0EEE8]/78 p-3" key={item}>
              <p className="text-xs font-bold">{item}</p>
              <p className="mt-2 text-[11px] text-[#1E1E1E]/55">Zone 0{index + 1}</p>
            </div>
          ))}
        </div>
      </Region>
    </div>
  );
}

function ComparisonSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className="space-y-3">
      <Region className={cn("p-5", compact && "p-4")} label="Comparison Header" showLabels={showLabels}>
        <RawLabel>{layout.category}</RawLabel>
        <RawHeading className={cn("mt-3", compact && "max-w-[14rem]")} compact={compact}>Choose a cut</RawHeading>
      </Region>
      <Region className="p-4" label="Plans" showLabels={showLabels}>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-3")}>
          {["Basic", "Best", "Pro"].map((item, index) => (
            <article
              className={cn(
                "border p-4",
                index === 1
                  ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD]"
                  : "border-[#1E1E1E]/16 bg-[#F0EEE8]/78 text-[#1E1E1E]",
              )}
              key={item}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em]">{item}</p>
              <p className={cn("mt-4 font-display font-bold leading-none tracking-[-0.05em]", compact ? "text-4xl" : "text-5xl")}>
                {index === 1 ? "Fit" : "Raw"}
              </p>
              <div className="mt-5 space-y-2 text-[11px] opacity-80">
                {layout.bestFor.slice(0, 3).map((purpose) => <p key={purpose}>{purpose}</p>)}
              </div>
            </article>
          ))}
        </div>
      </Region>
    </div>
  );
}

function TimelineSample({ layout, compact, showLabels }: SampleProps) {
  return (
    <Region className={cn("p-6", compact && "p-4")} label="Timeline" showLabels={showLabels}>
      <RawLabel>{layout.nameEn}</RawLabel>
      <RawHeading className={cn("mt-3", compact && "max-w-[14rem]")} compact={compact}>Process line</RawHeading>
      <ol className={cn("relative mt-8 space-y-5 border-l border-[#1E1E1E]/22 pl-7", compact && "mt-6 space-y-4 pl-6")}>
        {stepNames.map((item, index) => (
          <li className="relative" key={item}>
            <span className={cn("absolute -left-[34px] top-1 h-4 w-4 border-2 border-[#E4E2DD]", index < 2 ? "bg-[#1E1E1E]" : "bg-[#DB4A2B]")} />
            <p className="text-xs font-bold uppercase tracking-[0.12em]">{item}</p>
            <p className="mt-2 text-xs leading-5 text-[#1E1E1E]/66">
              {index === 0 ? layout.summary : layout.responsiveBehavior[index - 1]}
            </p>
          </li>
        ))}
      </ol>
    </Region>
  );
}

function ScrollStorySample({ layout, compact, showLabels }: SampleProps) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[0.85fr_1.15fr]")}>
      <Region className={cn("bg-[#1E1E1E] p-6 text-[#E4E2DD]", compact && "p-4")} label="Sticky Scene" showLabels={showLabels}>
        <RawLabel className="text-[#F8A348]">Scene 01</RawLabel>
        <h3 className={cn("mt-4 break-words font-display font-bold uppercase leading-[0.78] tracking-[-0.05em]", compact ? "text-[2.75rem] leading-[0.84]" : "text-6xl")}>
          Scroll
          <br />
          story
        </h3>
        <p className="mt-5 text-sm leading-6 text-[#E4E2DD]/70">{layout.summary}</p>
        <div className={cn("mt-8 h-32 bg-[#DB4A2B]", compact && "mt-6 h-24")} />
      </Region>
      <Region className="p-4" label="Story Steps" showLabels={showLabels}>
        <div className="space-y-3">
          {layout.structure.slice(0, 4).map((item, index) => (
            <article className="border border-[#1E1E1E]/16 bg-[#F0EEE8]/78 p-4" key={item}>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DB4A2B]">0{index + 1}</p>
              <p className="mt-2 text-xs leading-5 text-[#1E1E1E]/68">{item}</p>
            </article>
          ))}
        </div>
      </Region>
    </div>
  );
}

function LayoutPreviewContent(props: LayoutPreviewRendererProps) {
  const compact = props.viewport !== "desktop";
  const sampleProps: SampleProps = { ...props, compact };

  if (props.layout.previewType === "two-column") return <TwoColumnSample {...sampleProps} />;
  if (props.layout.previewType === "three-column") return <ThreeColumnSample {...sampleProps} />;
  if (props.layout.previewType === "hero") return <HeroSample {...sampleProps} />;
  if (props.layout.previewType === "split-screen") return <SplitScreenSample {...sampleProps} />;
  if (props.layout.previewType === "card-grid") return <CardGridSample {...sampleProps} />;
  if (props.layout.previewType === "bento-grid") return <BentoSample {...sampleProps} />;
  if (props.layout.previewType === "dashboard") return <DashboardSample {...sampleProps} />;
  if (props.layout.previewType === "editorial") return <EditorialSample {...sampleProps} />;
  if (props.layout.previewType === "ecommerce-product") return <CommerceSample {...sampleProps} />;
  if (props.layout.previewType === "docs") return <DocsSample {...sampleProps} />;
  if (props.layout.previewType === "feed") return <FeedSample {...sampleProps} />;
  if (props.layout.previewType === "map-list") return <MapListSample {...sampleProps} />;
  if (props.layout.previewType === "comparison") return <ComparisonSample {...sampleProps} />;
  if (props.layout.previewType === "timeline") return <TimelineSample {...sampleProps} />;
  if (props.layout.previewType === "scroll-story") return <ScrollStorySample {...sampleProps} />;

  return <SingleColumnSample {...sampleProps} />;
}

export function LayoutPreviewRenderer(props: LayoutPreviewRendererProps) {
  const compact = props.viewport !== "desktop";

  return (
    <div
      className={cn(
        "raw-preview-canvas w-full min-w-0 max-w-full overflow-hidden p-3",
        compact ? "raw-preview-canvas-mobile" : "raw-preview-canvas-desktop",
      )}
    >
      <LayoutPreviewContent {...props} />
    </div>
  );
}
