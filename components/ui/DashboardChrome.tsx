"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardChromeProps {
  title: string;
  subtitle?: string;
  actionSlot?: ReactNode;
  children: ReactNode;
}

export function DashboardChrome({ title, subtitle, actionSlot, children }: DashboardChromeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-neutral-950 via-[#0c0c10] to-neutral-900 text-[var(--foreground)]">
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <Topbar
          title={title}
          subtitle={subtitle}
          actionSlot={actionSlot}
          onMenuToggle={() => setMobileOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-8 lg:px-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
