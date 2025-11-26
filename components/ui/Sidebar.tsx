"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./helpers";

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Manual Paper",
    href: "/manual-paper",
    icon: (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-800 text-sm font-semibold">
        MP
      </span>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-900/80 px-6 py-6 shadow-subtle">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 text-neutral-900 font-black text-xl">H</div>
        <div className="leading-tight">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-300">hayu</p>
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
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                "hover:bg-neutral-800",
                isActive ? "bg-neutral-800 text-white" : "text-neutral-300"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-10 text-xs text-neutral-500">
        Hayu Widyas Office Dashboard
      </div>
    </aside>
  );
}
