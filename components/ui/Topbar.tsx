import type { ReactNode } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actionSlot?: ReactNode;
}

export default function Topbar({ title, subtitle, actionSlot }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/60 px-8 py-5 backdrop-blur">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-neutral-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3 text-sm text-neutral-400">
        {actionSlot}
        <div className="rounded-full bg-neutral-800 px-4 py-2 text-neutral-200">Admin</div>
      </div>
    </header>
  );
}
