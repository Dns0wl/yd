import type { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-accent">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar title="Manual Paper Generator" subtitle="Hayu Widyas Office Dashboard" />
        <main className="flex-1 overflow-y-auto bg-[#0c0c0c]">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
