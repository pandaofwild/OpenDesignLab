import { cn } from "@/lib/utils";

type WireframeThumbnailProps = {
  previewType: string;
  className?: string;
};

function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-sm bg-white text-[8px] text-zinc-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Panel({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-zinc-300 bg-zinc-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-sm px-1 py-0.5 text-[7px] font-bold uppercase tracking-normal",
        dark ? "bg-white/15 text-white" : "bg-emerald-100 text-emerald-800",
      )}
    >
      {children}
    </span>
  );
}

function Line({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-zinc-300", className)} />;
}

function MiniButton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 w-12 rounded-sm bg-zinc-950 shadow-sm",
        className,
      )}
    />
  );
}

function Dots() {
  return (
    <div className="flex gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </div>
  );
}

function Header({ compact = false }: { compact?: boolean }) {
  return (
    <Panel className="flex items-center justify-between bg-white px-2 py-1.5">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-zinc-950" />
        <Line className="w-10 bg-zinc-800" />
      </div>
      {compact ? (
        <span className="rounded-sm border border-zinc-300 px-1 text-[7px] font-bold">
          Menu
        </span>
      ) : (
        <div className="flex gap-1.5">
          <Line className="w-8 bg-zinc-300" />
          <Line className="w-8 bg-zinc-300" />
          <Line className="w-8 bg-zinc-300" />
        </div>
      )}
    </Panel>
  );
}

function ArticleContent({ label = "Main" }: { label?: string }) {
  return (
    <Panel className="space-y-2 bg-white p-2">
      <Label>{label}</Label>
      <Line className="h-2.5 w-2/3 bg-zinc-900" />
      <Line className="w-full" />
      <Line className="w-11/12" />
      <Line className="w-4/5" />
    </Panel>
  );
}

function MetricCards() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <Panel className="space-y-1 bg-white p-1.5">
        <Line className="w-5 bg-emerald-400" />
        <Line className="h-2 w-8 bg-zinc-900" />
      </Panel>
      <Panel className="space-y-1 bg-white p-1.5">
        <Line className="w-5 bg-sky-400" />
        <Line className="h-2 w-8 bg-zinc-900" />
      </Panel>
      <Panel className="space-y-1 bg-white p-1.5">
        <Line className="w-5 bg-amber-400" />
        <Line className="h-2 w-8 bg-zinc-900" />
      </Panel>
    </div>
  );
}

function Chart() {
  return (
    <Panel className="flex items-end gap-1 bg-white p-2">
      {[42, 70, 52, 88, 62, 78].map((height, index) => (
        <span
          className={cn(
            "flex-1 rounded-t-sm",
            index % 2 === 0 ? "bg-emerald-300" : "bg-zinc-800",
          )}
          key={index}
          style={{ height: `${height}%` }}
        />
      ))}
    </Panel>
  );
}

function Card({ accent = "zinc" }: { accent?: "zinc" | "emerald" | "amber" | "sky" }) {
  const accentClass = {
    amber: "bg-amber-200",
    emerald: "bg-emerald-200",
    sky: "bg-sky-200",
    zinc: "bg-zinc-900",
  }[accent];

  return (
    <Panel className="space-y-1.5 bg-white p-1.5">
      <span className={cn("block h-8 rounded-sm", accentClass)} />
      <Line className="h-1.5 w-4/5 bg-zinc-800" />
      <Line className="w-full" />
      <Line className="w-2/3" />
    </Panel>
  );
}

function HeroDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Header />
      <div className="grid h-[calc(100%-1.875rem)] grid-cols-[0.95fr_1.05fr] gap-1.5">
        <Panel className="space-y-2 bg-zinc-950 p-2 text-white">
          <Label dark>Hero</Label>
          <Line className="h-2.5 w-4/5 bg-white" />
          <Line className="w-full bg-white/35" />
          <Line className="w-10/12 bg-white/35" />
          <MiniButton className="bg-emerald-300" />
        </Panel>
        <Panel className="grid grid-cols-3 gap-1 bg-zinc-100 p-2">
          <span className="col-span-2 row-span-2 rounded-sm bg-zinc-900" />
          <span className="rounded-sm bg-emerald-300" />
          <span className="rounded-sm bg-amber-200" />
          <span className="col-span-2 rounded-sm bg-white" />
        </Panel>
      </div>
    </Shell>
  );
}

function SingleColumnDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Header />
      <ArticleContent label="Article" />
      <Panel className="flex items-center justify-between bg-zinc-50 p-2">
        <Label>CTA</Label>
        <MiniButton />
      </Panel>
    </Shell>
  );
}

function TwoColumnDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Header />
      <div className="grid h-[calc(100%-1.875rem)] grid-cols-[1fr_38%] gap-1.5">
        <ArticleContent />
        <Panel className="space-y-2 bg-zinc-50 p-2">
          <Label>Aside</Label>
          <Line className="w-full bg-zinc-800" />
          <Line className="w-4/5" />
          <MiniButton className="w-10 bg-emerald-300" />
          <Line className="w-full" />
        </Panel>
      </div>
    </Shell>
  );
}

function ThreeColumnDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Header />
      <div className="grid h-[calc(100%-1.875rem)] grid-cols-[22%_1fr_22%] gap-1.5">
        <Panel className="space-y-1.5 bg-zinc-950 p-1.5 text-white">
          <Label dark>Nav</Label>
          <Line className="w-full bg-white/35" />
          <Line className="w-4/5 bg-white/35" />
          <Line className="w-full bg-emerald-300" />
        </Panel>
        <ArticleContent />
        <Panel className="space-y-1.5 bg-zinc-50 p-1.5">
          <Label>TOC</Label>
          <Line className="w-full" />
          <Line className="w-3/4" />
          <Line className="w-full" />
        </Panel>
      </div>
    </Shell>
  );
}

function SplitScreenDiagram() {
  return (
    <Shell className="grid grid-cols-2 gap-1.5">
      <Panel className="space-y-2 bg-white p-2">
        <Label>Message</Label>
        <Line className="h-2.5 w-4/5 bg-zinc-900" />
        <Line className="w-full" />
        <Line className="w-10/12" />
        <MiniButton />
      </Panel>
      <Panel className="relative bg-zinc-950 p-2">
        <Label dark>Visual</Label>
        <span className="absolute bottom-2 left-2 h-10 w-12 rounded-sm bg-emerald-300" />
        <span className="absolute right-2 top-6 h-16 w-14 rounded-sm bg-white/20" />
        <span className="absolute bottom-5 right-6 h-9 w-16 rounded-sm bg-amber-200" />
      </Panel>
    </Shell>
  );
}

function CardGridDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Panel className="flex items-center justify-between bg-white p-1.5">
        <Label>Filters</Label>
        <div className="flex gap-1">
          <span className="h-3 w-8 rounded-sm bg-zinc-100" />
          <span className="h-3 w-8 rounded-sm bg-zinc-100" />
        </div>
      </Panel>
      <div className="grid grid-cols-3 gap-1.5">
        <Card accent="zinc" />
        <Card accent="emerald" />
        <Card accent="amber" />
        <Card accent="sky" />
        <Card accent="zinc" />
        <Card accent="emerald" />
      </div>
    </Shell>
  );
}

function BentoDiagram() {
  return (
    <Shell className="grid grid-cols-4 grid-rows-3 gap-1.5">
      <Panel className="col-span-2 row-span-2 space-y-2 bg-zinc-950 p-2 text-white">
        <Label dark>Feature</Label>
        <Line className="h-2.5 w-4/5 bg-white" />
        <Line className="w-full bg-white/35" />
        <MiniButton className="bg-emerald-300" />
      </Panel>
      <Panel className="col-span-2 space-y-1 bg-emerald-50 p-1.5">
        <Label>Insight</Label>
        <Line className="w-full" />
      </Panel>
      <Panel className="space-y-1 bg-white p-1.5">
        <Label>Stat</Label>
        <Line className="h-2 w-7 bg-zinc-900" />
      </Panel>
      <Panel className="space-y-1 bg-amber-50 p-1.5">
        <Label>Note</Label>
        <Line className="w-full" />
      </Panel>
      <Panel className="col-span-2 flex items-center gap-1.5 bg-white p-1.5">
        <span className="h-5 w-5 rounded-sm bg-sky-200" />
        <div className="flex-1 space-y-1">
          <Line className="w-full" />
          <Line className="w-2/3" />
        </div>
      </Panel>
      <Panel className="col-span-2 flex items-center gap-1.5 bg-rose-50 p-1.5">
        <span className="h-5 w-5 rounded-sm bg-rose-200" />
        <div className="flex-1 space-y-1">
          <Line className="w-full" />
          <Line className="w-3/4" />
        </div>
      </Panel>
    </Shell>
  );
}

function DashboardDiagram() {
  return (
    <Shell className="grid grid-cols-[24%_1fr] gap-1.5">
      <Panel className="space-y-2 bg-zinc-950 p-2 text-white">
        <Label dark>App nav</Label>
        <Line className="w-full bg-white/35" />
        <Line className="w-4/5 bg-emerald-300" />
        <Line className="w-full bg-white/25" />
        <Line className="w-3/4 bg-white/25" />
      </Panel>
      <div className="space-y-1.5">
        <Panel className="flex items-center justify-between bg-white p-1.5">
          <Label>Top bar</Label>
          <Dots />
        </Panel>
        <MetricCards />
        <div className="grid grid-cols-[1fr_34%] gap-1.5">
          <Chart />
          <Panel className="space-y-1.5 bg-white p-1.5">
            <Label>Tasks</Label>
            <Line className="w-full" />
            <Line className="w-4/5" />
            <Line className="w-full" />
          </Panel>
        </div>
      </div>
    </Shell>
  );
}

function EditorialDiagram() {
  return (
    <Shell className="grid grid-cols-[38%_1fr] gap-1.5">
      <Panel className="space-y-2 bg-white p-2">
        <Label>Headline</Label>
        <Line className="h-3 w-full bg-zinc-900" />
        <Line className="h-3 w-4/5 bg-zinc-900" />
        <Line className="w-2/3 bg-rose-300" />
      </Panel>
      <Panel className="space-y-2 bg-zinc-50 p-2">
        <Label>Story</Label>
        <Line className="w-full" />
        <Line className="w-11/12" />
        <Panel className="border-l-4 border-emerald-300 bg-white p-1.5">
          <Line className="w-4/5 bg-zinc-500" />
        </Panel>
        <Line className="w-10/12" />
      </Panel>
    </Shell>
  );
}

function CommerceDiagram() {
  return (
    <Shell className="grid grid-cols-[1.05fr_0.95fr] gap-1.5">
      <Panel className="grid grid-cols-2 gap-1.5 bg-zinc-50 p-2">
        <Label>Media</Label>
        <span className="col-span-2 h-12 rounded-sm bg-zinc-950" />
        <span className="rounded-sm bg-emerald-200" />
        <span className="rounded-sm bg-amber-200" />
      </Panel>
      <Panel className="space-y-1.5 bg-white p-2">
        <Label>Product</Label>
        <Line className="h-2.5 w-4/5 bg-zinc-900" />
        <Line className="w-full" />
        <Line className="h-2.5 w-12 bg-zinc-900" />
        <div className="grid grid-cols-3 gap-1">
          <span className="h-4 rounded-sm border border-zinc-300" />
          <span className="h-4 rounded-sm border border-zinc-300" />
          <span className="h-4 rounded-sm border border-zinc-300" />
        </div>
        <MiniButton className="w-full" />
      </Panel>
    </Shell>
  );
}

function DocsDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Header />
      <div className="grid h-[calc(100%-1.875rem)] grid-cols-[22%_1fr_22%] gap-1.5">
        <Panel className="space-y-1.5 bg-zinc-50 p-1.5">
          <Label>Docs nav</Label>
          <Line className="w-full bg-zinc-800" />
          <Line className="w-4/5" />
          <Line className="w-full" />
          <Line className="w-3/4" />
        </Panel>
        <Panel className="space-y-2 bg-white p-2">
          <Label>Article</Label>
          <Line className="h-2.5 w-4/5 bg-zinc-900" />
          <Line className="w-full" />
          <Panel className="space-y-1 bg-zinc-950 p-1.5">
            <Line className="w-full bg-emerald-300" />
            <Line className="w-4/5 bg-emerald-200" />
          </Panel>
        </Panel>
        <Panel className="space-y-1.5 bg-zinc-50 p-1.5">
          <Label>On page</Label>
          <Line className="w-full" />
          <Line className="w-2/3" />
          <Line className="w-5/6" />
        </Panel>
      </div>
    </Shell>
  );
}

function FeedDiagram() {
  return (
    <Shell className="mx-auto max-w-[70%] space-y-1.5">
      <Panel className="flex items-center justify-between bg-white p-1.5">
        <Label>Feed</Label>
        <MiniButton className="h-3 w-8 bg-emerald-300" />
      </Panel>
      {[0, 1, 2].map((item) => (
        <Panel className="space-y-1.5 bg-zinc-50 p-1.5" key={item}>
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-zinc-900" />
            <div className="flex-1 space-y-1">
              <Line className="w-1/2 bg-zinc-800" />
              <Line className="w-1/3" />
            </div>
          </div>
          <Line className="w-full" />
          <Line className="w-4/5" />
        </Panel>
      ))}
    </Shell>
  );
}

function MapListDiagram() {
  return (
    <Shell className="grid grid-cols-[1fr_34%] gap-1.5">
      <Panel className="relative bg-emerald-50">
        <div className="absolute inset-1 rounded-sm bg-[linear-gradient(90deg,rgba(16,185,129,0.24)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.24)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <Label>Map</Label>
        {[22, 44, 66, 78].map((left, index) => (
          <span
            className="absolute h-2.5 w-2.5 rounded-full border border-white bg-zinc-950"
            key={left}
            style={{ left: `${left}%`, top: `${24 + index * 14}%` }}
          />
        ))}
      </Panel>
      <Panel className="space-y-1.5 bg-white p-1.5">
        <Label>Results</Label>
        {[0, 1, 2, 3].map((item) => (
          <div className="rounded-sm border border-zinc-200 p-1" key={item}>
            <Line className="w-full bg-zinc-800" />
            <Line className="mt-1 w-2/3" />
          </div>
        ))}
      </Panel>
    </Shell>
  );
}

function ComparisonDiagram() {
  return (
    <Shell className="space-y-1.5">
      <Panel className="flex items-center justify-between bg-white p-1.5">
        <Label>Compare</Label>
        <Line className="w-16 bg-zinc-300" />
      </Panel>
      <div className="grid grid-cols-3 gap-1.5">
        {["Basic", "Best", "Pro"].map((name, index) => (
          <Panel
            className={cn(
              "space-y-1.5 p-1.5",
              index === 1 ? "bg-zinc-950 text-white" : "bg-zinc-50",
            )}
            key={name}
          >
            <Label dark={index === 1}>{name}</Label>
            <Line className={cn("w-full", index === 1 ? "bg-white/45" : "")} />
            <Line className={cn("w-4/5", index === 1 ? "bg-emerald-300" : "")} />
            <Line className={cn("w-full", index === 1 ? "bg-white/45" : "")} />
          </Panel>
        ))}
      </div>
      <Panel className="grid grid-cols-3 gap-1 bg-white p-1.5">
        <Line className="w-full" />
        <Line className="w-full bg-emerald-300" />
        <Line className="w-full" />
      </Panel>
    </Shell>
  );
}

function TimelineDiagram() {
  return (
    <Shell className="relative p-2">
      <span className="absolute bottom-3 left-6 top-3 w-px bg-zinc-300" />
      {[0, 1, 2, 3].map((item) => (
        <div className="relative mb-2 ml-8" key={item}>
          <span
            className={cn(
              "absolute -left-[22px] top-2 h-2.5 w-2.5 rounded-full border border-white",
              item < 2 ? "bg-zinc-950" : "bg-emerald-300",
            )}
          />
          <Panel className="space-y-1 bg-white p-1.5">
            <Label>Step {item + 1}</Label>
            <Line className="w-full" />
            <Line className="w-2/3" />
          </Panel>
        </div>
      ))}
    </Shell>
  );
}

function ScrollStoryDiagram() {
  return (
    <Shell className="grid grid-cols-[42%_1fr] gap-1.5">
      <Panel className="space-y-2 bg-zinc-950 p-2 text-white">
        <Label dark>Sticky scene</Label>
        <Line className="h-2.5 w-4/5 bg-white" />
        <Line className="w-full bg-white/35" />
        <span className="block h-16 rounded-sm bg-emerald-300" />
      </Panel>
      <div className="space-y-1.5">
        {[1, 2, 3, 4].map((item) => (
          <Panel className="space-y-1 bg-white p-1.5" key={item}>
            <Label>Scene {item}</Label>
            <Line className="w-full" />
            <Line className="w-2/3" />
          </Panel>
        ))}
      </div>
    </Shell>
  );
}

export function WireframeThumbnail({
  previewType,
  className,
}: WireframeThumbnailProps) {
  const diagram = (() => {
    if (previewType === "dashboard") return <DashboardDiagram />;
    if (previewType === "bento-grid") return <BentoDiagram />;
    if (previewType === "comparison") return <ComparisonDiagram />;
    if (previewType === "timeline") return <TimelineDiagram />;
    if (previewType === "split-screen") return <SplitScreenDiagram />;
    if (previewType === "docs") return <DocsDiagram />;
    if (previewType === "three-column") return <ThreeColumnDiagram />;
    if (previewType === "two-column") return <TwoColumnDiagram />;
    if (previewType === "map-list") return <MapListDiagram />;
    if (previewType === "card-grid") return <CardGridDiagram />;
    if (previewType === "feed") return <FeedDiagram />;
    if (previewType === "scroll-story") return <ScrollStoryDiagram />;
    if (previewType === "editorial") return <EditorialDiagram />;
    if (previewType === "ecommerce-product") return <CommerceDiagram />;
    if (previewType === "hero") return <HeroDiagram />;

    return <SingleColumnDiagram />;
  })();

  return <div className={cn("h-full w-full", className)}>{diagram}</div>;
}
