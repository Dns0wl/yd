import type { ReactNode } from "react";
import { DashboardChrome } from "@/components/ui/DashboardChrome";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardChrome title="Manual Paper Generator" subtitle="Hayu Widyas Office Dashboard">
      {children}
    </DashboardChrome>
  );
}
