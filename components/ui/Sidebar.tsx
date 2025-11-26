"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./helpers";

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  helper?: string;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  {
    name: "Manual Paper",
    helper: "Generate and download",
    href: "/manual-paper",
    icon: (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900 text-xs font-semibold text-white shadow-subtle">
        MP
      </span>
    ),
  },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 px-4 py-3 shadow-subtle backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-300 text-neutral-900 font-black text-2xl shadow-lg">
          H
        </div>
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">hayu</p>
          <p className="text-lg font-semibold text-white">widyas</p>
        </div>
      </div>
      <nav className="space-y-2 text-sm">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all",
                "border-transparent bg-neutral-900/40 text-neutral-300 backdrop-blur hover:-translate-y-0.5 hover:border-neutral-800 hover:bg-neutral-900/70",
                isActive && "border-neutral-800 bg-neutral-900/90 text-white shadow-subtle"
              )}
            >
              {item.icon}
              <div className="flex flex-col">
                <span className="font-semibold">{item.name}</span>
                {item.helper ? <span className="text-xs text-neutral-500">{item.helper}</span> : null}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-4 text-xs text-neutral-400 shadow-subtle backdrop-blur">
        Hayu Widyas Office Dashboard
        <p className="mt-1 text-[11px] text-neutral-500">Modern, responsive internal tooling.</p>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-neutral-800 bg-neutral-950/70 px-6 py-6 shadow-2xl backdrop-blur lg:flex">
        <SidebarContent />
      </aside>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-800 bg-neutral-950/95 px-6 py-6 shadow-2xl backdrop-blur transition-transform duration-200 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <SidebarContent />
      </aside>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      ) : null}
    </>
  );
}
