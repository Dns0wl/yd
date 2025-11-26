"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actionSlot?: ReactNode;
  onMenuToggle?: () => void;
}

export default function Topbar({ title, subtitle, actionSlot, onMenuToggle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/70 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full border border-neutral-800/80 px-2 py-2 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-900 md:hidden"
          aria-label="Open navigation"
          onClick={onMenuToggle}
        >
          ☰
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-white md:text-2xl">{title}</h1>
          {subtitle ? <p className="text-xs text-neutral-400 md:text-sm">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-neutral-400">
        {actionSlot}
        <div className="flex items-center gap-2 rounded-full border border-neutral-800/70 bg-neutral-900/60 px-4 py-2 shadow-subtle">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-900">HW</span>
          <span className="hidden text-neutral-200 sm:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
