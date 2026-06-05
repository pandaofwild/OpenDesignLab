import type { Metadata } from "next";
import { StudioView } from "@/components/studio/StudioView";

export const metadata: Metadata = {
  title: "Studio",
  description: "Combine a design style with a layout and preview the result.",
};

export default function StudioPage() {
  return <StudioView />;
}
