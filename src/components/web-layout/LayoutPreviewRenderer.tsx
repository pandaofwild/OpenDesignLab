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

function TextLine({ className }: { className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-current/16", className)} />;
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-8 bg-[#1E1E1E] px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#E4E2DD]">
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-8 border border-[#1E1E1E]/30 bg-[#E4E2DD] px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#1E1E1E]">
      {children}
    </button>
  );
}

function PreviewHeader({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <AnnotatedRegion
      className="flex min-h-10 items-center justify-between gap-3 bg-[#E4E2DD] px-3 py-2"
      data-preview-header="compact"
      label="Header"
      showLabel={showLabels}
    >
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 bg-[#1E1E1E]" />
        <span className="text-[11px] font-bold text-[#1E1E1E]">Layout Co.</span>
      </div>
      {compact ? (
        <button
          aria-label="Menu"
          className="h-6 w-7 shrink-0 border border-[#1E1E1E]/25 text-[13px] font-bold leading-none text-[#1E1E1E]"
        >
          ≡
        </button>
      ) : (
        <nav aria-label="Preview navigation" className="flex items-center gap-3">
          {["Structure", "Cases", "Tips"].map((item) => (
            <span key={item} className="text-[11px] font-medium text-zinc-500">
              {item}
            </span>
          ))}
          <span className="bg-[#F8A348]/35 px-2 py-0.5 text-[11px] font-bold text-[#1E1E1E]">
            {layout.category.split(" ")[0]}
          </span>
        </nav>
      )}
    </AnnotatedRegion>
  );
}

function HeroPreview({
  layout,
  showLabels,
  compact,
  denseContent,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion
        className={cn(
          "grid gap-4 bg-zinc-950 p-5 text-white",
          compact ? "grid-cols-1" : "grid-cols-[1.05fr_0.95fr]",
        )}
        label="Hero"
        showLabel={showLabels}
      >
        <div className="flex min-h-48 flex-col justify-center gap-4">
          <div>
            <p className="text-[11px] font-semibold text-emerald-300">
              {layout.nameEn}
            </p>
            <h3 className="mt-2 max-w-md text-3xl font-bold leading-tight tracking-normal">
              {layout.nameKo}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">
              {layout.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrimaryButton>구조 보기</PrimaryButton>
            <SecondaryButton>예시 코드</SecondaryButton>
          </div>
        </div>
        <AnnotatedRegion
          className="min-h-52 bg-white/8 p-4"
          label="Visual"
          showLabel={showLabels}
        >
          <div className="grid h-full grid-cols-3 gap-2">
            {Array.from({ length: denseContent ? 9 : 6 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "rounded-md border border-white/12",
                  index % 4 === 0 ? "bg-emerald-300/80" : "bg-white/16",
                  index % 5 === 0 ? "row-span-2" : "",
                )}
              />
            ))}
          </div>
        </AnnotatedRegion>
      </AnnotatedRegion>
      <AnnotatedRegion
        className={cn("grid gap-3 bg-white p-4", compact ? "grid-cols-1" : "grid-cols-3")}
        label="Next Section"
        showLabel={showLabels}
      >
        {layout.bestFor.slice(0, 3).map((item) => (
          <div key={item} className="rounded-md bg-zinc-50 p-3">
            <TextLine className="mb-2 w-16 text-zinc-900" />
            <p className="text-[11px] font-semibold text-zinc-700">{item}</p>
          </div>
        ))}
      </AnnotatedRegion>
    </div>
  );
}

function ColumnPreview({
  layout,
  showLabels,
  compact,
  denseContent,
  columns,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
  columns: 1 | 2 | 3;
}) {
  const article = (
    <AnnotatedRegion className="bg-white p-5" label="Main" showLabel={showLabels}>
      <p className="text-[11px] font-semibold text-emerald-700">{layout.nameEn}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-normal text-zinc-950">
        {layout.nameKo}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{layout.summary}</p>
      <div className="mt-5 space-y-3">
        {Array.from({ length: denseContent ? 6 : 4 }).map((_, index) => (
          <TextLine
            key={index}
            className={cn(
              index % 3 === 0 ? "w-full" : "w-10/12",
              "text-zinc-700",
            )}
          />
        ))}
      </div>
    </AnnotatedRegion>
  );

  if (columns === 1 || compact) {
    return (
      <div className="space-y-3">
        <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
        {article}
        <AnnotatedRegion className="bg-zinc-50 p-4" label="CTA" showLabel={showLabels}>
          <PrimaryButton>다음 섹션 보기</PrimaryButton>
        </AnnotatedRegion>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <div
        className={cn(
          "grid gap-3",
          columns === 2 ? "grid-cols-[1fr_280px]" : "grid-cols-[170px_1fr_190px]",
        )}
      >
        {columns === 3 ? (
          <AnnotatedRegion className="bg-zinc-50 p-4" label="Sidebar" showLabel={showLabels}>
            <div className="space-y-2">
              {["Overview", "Blocks", "Rules", "Cases"].map((item) => (
                <div key={item} className="rounded-md bg-white px-2 py-2 text-[11px] text-zinc-600">
                  {item}
                </div>
              ))}
            </div>
          </AnnotatedRegion>
        ) : null}
        {article}
        <AnnotatedRegion className="bg-zinc-50 p-4" label="Aside" showLabel={showLabels}>
          <div className="space-y-3">
            <div className="rounded-md bg-white p-3">
              <p className="text-[11px] font-bold text-zinc-900">추천 용도</p>
              <div className="mt-2 space-y-2">
                {layout.bestFor.slice(0, 3).map((item) => (
                  <p key={item} className="text-[11px] text-zinc-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <PrimaryButton>비교하기</PrimaryButton>
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function SplitScreenPreview({
  layout,
  showLabels,
  compact,
  denseContent,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-2")}>
        <AnnotatedRegion className="bg-white p-5" label="Message" showLabel={showLabels}>
          <h3 className="text-2xl font-bold text-zinc-950">{layout.nameKo}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{layout.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton>Preview</PrimaryButton>
            <SecondaryButton>Docs</SecondaryButton>
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="min-h-72 bg-zinc-950 p-4" label="Media" showLabel={showLabels}>
          <div className="relative h-full">
            <span className="absolute left-2 top-2 h-24 w-24 rounded-lg bg-emerald-300" />
            <span className="absolute bottom-4 right-3 h-32 w-40 rounded-lg bg-white/14" />
            <span className="absolute left-16 top-24 h-28 w-36 rounded-lg bg-amber-300/90" />
            {denseContent ? (
              <span className="absolute bottom-8 left-4 h-20 w-28 rounded-lg bg-sky-300/90" />
            ) : null}
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function CardGridPreview({
  layout,
  showLabels,
  compact,
  denseContent,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-white p-4" label="Filters" showLabel={showLabels}>
        <div className="flex flex-wrap gap-2">
          {["All", "Popular", "New", layout.category.split(" ")[0]].map((item) => (
            <button
              key={item}
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-[11px] font-semibold text-zinc-700"
            >
              {item}
            </button>
          ))}
        </div>
      </AnnotatedRegion>
      <AnnotatedRegion className="bg-zinc-50 p-4" label="Grid" showLabel={showLabels}>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-3")}>
          {Array.from({ length: denseContent ? 9 : 6 }).map((_, index) => (
            <article key={index} className="rounded-md border border-zinc-200 bg-white p-3">
              <div
                className={cn(
                  "mb-3 h-20 rounded-md",
                  index % 4 === 0 ? "bg-zinc-900" : "bg-zinc-200",
                  index % 4 === 1 ? "bg-emerald-200" : "",
                  index % 4 === 2 ? "bg-amber-200" : "",
                )}
              />
              <p className="text-[11px] font-bold text-zinc-900">
                {layout.nameKo.split(" ")[0]} {index + 1}
              </p>
              <TextLine className="mt-2 w-3/4 text-zinc-600" />
            </article>
          ))}
        </div>
      </AnnotatedRegion>
    </div>
  );
}

function BentoPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-zinc-50 p-4" label="Bento Grid" showLabel={showLabels}>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-4")}>
          <article className={cn("rounded-md bg-zinc-950 p-5 text-white", compact ? "" : "col-span-2 row-span-2")}>
            <p className="text-[11px] text-emerald-300">Featured</p>
            <h3 className="mt-2 text-2xl font-bold">{layout.nameKo}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{layout.summary}</p>
          </article>
          {layout.bestFor.slice(0, 4).map((item, index) => (
            <article
              key={item}
              className={cn(
                "rounded-md border border-zinc-200 p-4",
                index === 1 ? "bg-emerald-50" : "bg-white",
                index === 2 ? "bg-amber-50" : "",
              )}
            >
              <p className="text-[11px] font-bold text-zinc-900">{item}</p>
              <TextLine className="mt-3 w-10/12 text-zinc-500" />
            </article>
          ))}
        </div>
      </AnnotatedRegion>
    </div>
  );
}

function DashboardPreview({
  layout,
  showLabels,
  compact,
  denseContent,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
}) {
  if (compact) {
    return (
      <div className="space-y-3">
        <PreviewHeader layout={layout} showLabels={showLabels} compact />
        <AnnotatedRegion className="bg-white p-4" label="Metrics" showLabel={showLabels}>
          <div className="grid grid-cols-2 gap-3">
            {["24", "89", "12", "7"].map((value) => (
              <div key={value} className="rounded-md bg-zinc-50 p-3">
                <p className="text-xl font-bold text-zinc-950">{value}</p>
                <TextLine className="mt-2 w-14 text-zinc-500" />
              </div>
            ))}
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-white p-4" label="Tasks" showLabel={showLabels}>
          <div className="space-y-2">
            {Array.from({ length: denseContent ? 6 : 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 rounded-md bg-zinc-50 p-3">
                <span className="h-8 w-8 rounded-md bg-emerald-200" />
                <TextLine className="flex-1 text-zinc-600" />
              </div>
            ))}
          </div>
        </AnnotatedRegion>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[190px_1fr] gap-3">
      <AnnotatedRegion className="min-h-[520px] bg-zinc-950 p-4 text-white" label="Sidebar" showLabel={showLabels}>
        <div className="mb-6 flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-emerald-300" />
          <span className="text-xs font-bold">Console</span>
        </div>
        <div className="space-y-2">
          {["Overview", "Reports", "Library", "Settings"].map((item) => (
            <div key={item} className="rounded-md bg-white/10 px-3 py-2 text-[11px] text-zinc-200">
              {item}
            </div>
          ))}
        </div>
      </AnnotatedRegion>
      <div className="space-y-3">
        <AnnotatedRegion className="bg-white p-4" label="Top Bar" showLabel={showLabels}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-950">{layout.nameKo}</p>
              <p className="text-[11px] text-zinc-500">{layout.summary}</p>
            </div>
            <PrimaryButton>New report</PrimaryButton>
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-zinc-50 p-4" label="Dashboard" showLabel={showLabels}>
          <div className="grid grid-cols-4 gap-3">
            {["24", "89", "12", "7"].map((value, index) => (
              <div key={value} className="rounded-md border border-zinc-200 bg-white p-3">
                <p className="text-2xl font-bold text-zinc-950">{value}</p>
                <TextLine className={cn("mt-3 w-16", index === 1 ? "text-emerald-600" : "text-zinc-500")} />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_260px] gap-3">
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <div className="flex h-44 items-end gap-2">
                {[34, 68, 42, 80, 58, 92, 64].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t-sm bg-emerald-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: denseContent ? 6 : 4 }).map((_, index) => (
                <div key={index} className="rounded-md border border-zinc-200 bg-white p-3">
                  <TextLine className="w-10/12 text-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function EditorialPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-white p-6" label="Article" showLabel={showLabels}>
        <div className={cn("grid gap-6", compact ? "grid-cols-1" : "grid-cols-[0.8fr_1.2fr]")}>
          <div>
            <p className="text-[11px] font-bold text-rose-600">{layout.category}</p>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-zinc-950">
              {layout.nameKo}
            </h3>
          </div>
          <div className="space-y-4 text-sm leading-6 text-zinc-600">
            <p>{layout.summary}</p>
            <div className="rounded-md border-l-4 border-emerald-300 bg-emerald-50 p-4 text-zinc-700">
              {layout.bestFor.join(", ")}
            </div>
            <TextLine className="w-full text-zinc-600" />
            <TextLine className="w-11/12 text-zinc-600" />
            <TextLine className="w-9/12 text-zinc-600" />
          </div>
        </div>
      </AnnotatedRegion>
    </div>
  );
}

function CommercePreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[1.05fr_0.95fr]")}>
        <AnnotatedRegion className="min-h-80 bg-zinc-100 p-4" label="Product Media" showLabel={showLabels}>
          <div className="grid h-full grid-cols-2 gap-3">
            <span className="col-span-2 rounded-md bg-zinc-950" />
            <span className="rounded-md bg-emerald-200" />
            <span className="rounded-md bg-amber-200" />
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-white p-5" label="Purchase Panel" showLabel={showLabels}>
          <p className="text-[11px] font-semibold text-emerald-700">{layout.nameEn}</p>
          <h3 className="mt-2 text-2xl font-bold text-zinc-950">{layout.nameKo}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{layout.summary}</p>
          <p className="mt-5 text-3xl font-bold text-zinc-950">₩129,000</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["S", "M", "L"].map((size) => (
              <button key={size} className="h-9 rounded-md border border-zinc-300 text-xs font-bold text-zinc-700">
                {size}
              </button>
            ))}
          </div>
          <button className="mt-4 h-10 w-full rounded-md bg-zinc-950 text-sm font-bold text-white">
            장바구니 담기
          </button>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function DocsPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  if (compact) {
    return (
      <div className="space-y-3">
        <PreviewHeader layout={layout} showLabels={showLabels} compact />
        <ColumnPreview
          columns={1}
          compact
          denseContent
          layout={layout}
          showLabels={showLabels}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={false} />
      <div className="grid grid-cols-[180px_1fr_180px] gap-3">
        <AnnotatedRegion className="bg-zinc-50 p-4" label="Nav" showLabel={showLabels}>
          <div className="space-y-2">
            {["Start", "Structure", "Patterns", "Code"].map((item) => (
              <div key={item} className="rounded-md bg-white px-3 py-2 text-[11px] text-zinc-600">
                {item}
              </div>
            ))}
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-white p-5" label="Docs Main" showLabel={showLabels}>
          <h3 className="text-2xl font-bold text-zinc-950">{layout.nameKo}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{layout.summary}</p>
          <div className="mt-5 rounded-md bg-zinc-950 p-4 font-mono text-[11px] text-emerald-200">
            &lt;section className=&quot;grid gap-6&quot;&gt;
          </div>
          <div className="mt-4 space-y-3">
            <TextLine className="w-full text-zinc-600" />
            <TextLine className="w-11/12 text-zinc-600" />
            <TextLine className="w-8/12 text-zinc-600" />
          </div>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-zinc-50 p-4" label="On This Page" showLabel={showLabels}>
          <div className="space-y-2 text-[11px] text-zinc-600">
            {["구조", "반응형", "접근성", "예시 코드"].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function FeedPreview({
  layout,
  showLabels,
  compact,
  denseContent,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
  denseContent: boolean;
}) {
  return (
    <div className={cn("mx-auto space-y-3", compact ? "max-w-sm" : "max-w-2xl")}>
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-white p-4" label="Feed" showLabel={showLabels}>
        <div className="space-y-3">
          {Array.from({ length: denseContent ? 6 : 4 }).map((_, index) => (
            <article key={index} className="rounded-md border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-zinc-900" />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-zinc-900">Layout note {index + 1}</p>
                  <TextLine className="mt-1 w-20 text-zinc-500" />
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-600">{layout.summary}</p>
            </article>
          ))}
        </div>
      </AnnotatedRegion>
      {compact ? (
        <AnnotatedRegion className="grid grid-cols-4 gap-1 bg-white p-2" label="Bottom Tabs" showLabel={showLabels}>
          {["Home", "Search", "Saved", "Me"].map((item) => (
            <button key={item} className="rounded-md py-2 text-[10px] font-semibold text-zinc-600">
              {item}
            </button>
          ))}
        </AnnotatedRegion>
      ) : null}
    </div>
  );
}

function MapListPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[1fr_310px]")}>
        <AnnotatedRegion className="relative min-h-80 bg-[#F8A348]/15 p-4" label="Map" showLabel={showLabels}>
          <div className="absolute inset-4 border border-[#DB4A2B]/25 bg-[linear-gradient(90deg,rgba(219,74,43,0.18)_1px,transparent_1px),linear-gradient(rgba(219,74,43,0.18)_1px,transparent_1px)] bg-[length:36px_36px]" />
          {[20, 44, 66, 78].map((left, index) => (
            <span
              key={left}
              className="absolute h-4 w-4 rounded-full border-2 border-white bg-zinc-950 shadow"
              style={{ left: `${left}%`, top: `${24 + index * 13}%` }}
            />
          ))}
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-white p-4" label="Results" showLabel={showLabels}>
          <div className="space-y-3">
            {layout.bestFor.slice(0, 4).map((item) => (
              <div key={item} className="rounded-md border border-zinc-200 p-3">
                <p className="text-[11px] font-bold text-zinc-900">{item}</p>
                <TextLine className="mt-2 w-3/4 text-zinc-500" />
              </div>
            ))}
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function ComparisonPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-white p-4" label="Comparison" showLabel={showLabels}>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-3")}>
          {["A", "B", "C"].map((item, index) => (
            <article
              key={item}
              className={cn(
                "rounded-md border p-4",
                index === 1 ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-zinc-50 text-zinc-900",
              )}
            >
              <p className="text-xs font-bold">Option {item}</p>
              <p className="mt-3 text-2xl font-bold">{index === 1 ? "Best" : "Fit"}</p>
              <div className="mt-4 space-y-2">
                {layout.bestFor.slice(0, 3).map((purpose) => (
                  <p key={purpose} className="text-[11px] opacity-80">
                    {purpose}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </AnnotatedRegion>
    </div>
  );
}

function TimelinePreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <AnnotatedRegion className="bg-white p-5" label="Timeline" showLabel={showLabels}>
        <ol className="relative space-y-5 border-l border-zinc-300 pl-6">
          {["Discover", "Design", "Build", "Launch"].map((item, index) => (
            <li key={item} className="relative">
              <span
                className={cn(
                  "absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white",
                  index < 2 ? "bg-zinc-950" : "bg-emerald-300",
                )}
              />
              <p className="text-xs font-bold text-zinc-950">{item}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">
                {index === 0 ? layout.summary : layout.responsiveBehavior[index - 1]}
              </p>
            </li>
          ))}
        </ol>
      </AnnotatedRegion>
    </div>
  );
}

function ScrollStoryPreview({
  layout,
  showLabels,
  compact,
}: {
  layout: WebLayout;
  showLabels: boolean;
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      <PreviewHeader layout={layout} showLabels={showLabels} compact={compact} />
      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-[0.85fr_1.15fr]")}>
        <AnnotatedRegion className="bg-zinc-950 p-5 text-white" label="Sticky Scene" showLabel={showLabels}>
          <p className="text-[11px] font-bold text-emerald-300">Scene 01</p>
          <h3 className="mt-3 text-2xl font-bold leading-tight">{layout.nameKo}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{layout.summary}</p>
        </AnnotatedRegion>
        <AnnotatedRegion className="bg-white p-4" label="Story Steps" showLabel={showLabels}>
          <div className="space-y-3">
            {layout.structure.map((item, index) => (
              <div key={item} className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-[11px] font-bold text-zinc-950">0{index + 1}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-600">{item}</p>
              </div>
            ))}
          </div>
        </AnnotatedRegion>
      </div>
    </div>
  );
}

function LayoutPreviewContent({
  layout,
  viewport,
  showLabels,
  denseContent,
}: LayoutPreviewRendererProps) {
  const compact = viewport !== "desktop";

  if (layout.previewType === "two-column") {
    return (
      <ColumnPreview
        columns={2}
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "three-column") {
    return (
      <ColumnPreview
        columns={3}
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "split-screen") {
    return (
      <SplitScreenPreview
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "card-grid") {
    return (
      <CardGridPreview
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "bento-grid") {
    return <BentoPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "dashboard") {
    return (
      <DashboardPreview
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "editorial") {
    return <EditorialPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "ecommerce-product") {
    return <CommercePreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "docs") {
    return <DocsPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "feed") {
    return (
      <FeedPreview
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  if (layout.previewType === "map-list") {
    return <MapListPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "comparison") {
    return <ComparisonPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "timeline") {
    return <TimelinePreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "scroll-story") {
    return <ScrollStoryPreview compact={compact} layout={layout} showLabels={showLabels} />;
  }

  if (layout.previewType === "hero") {
    return (
      <HeroPreview
        compact={compact}
        denseContent={denseContent}
        layout={layout}
        showLabels={showLabels}
      />
    );
  }

  return (
    <ColumnPreview
      columns={1}
      compact={compact}
      denseContent={denseContent}
      layout={layout}
      showLabels={showLabels}
    />
  );
}

export function LayoutPreviewRenderer(props: LayoutPreviewRendererProps) {
  const compact = props.viewport !== "desktop";

  return (
    <div
      className={cn(
        "raw-preview-canvas min-w-0",
        compact ? "raw-preview-canvas-mobile" : "raw-preview-canvas-desktop",
      )}
    >
      <LayoutPreviewContent {...props} />
    </div>
  );
}
