import type { Metadata } from "next";
import { ExperimentsGrid } from "@/components/experiments/ExperimentsGrid";

export const metadata: Metadata = {
  title: "Experiments",
};

export default function ExperimentsPage() {
  return <ExperimentsGrid />;
}
